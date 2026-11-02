import { NextRequest, NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth/session';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/jpg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
]);

// Verify magic bytes of common image formats to prevent disguised uploads
function verifyMagicBytes(buffer: Buffer, mime: string): boolean {
  if (buffer.length < 4) return false;

  // PNG: 89 50 4E 47
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    return true;
  }

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return true;
  }

  // WebP: RIFF .... WEBP
  if (buffer.length >= 12) {
    const riff = buffer.toString('ascii', 0, 4);
    const webp = buffer.toString('ascii', 8, 12);
    if (riff === 'RIFF' && webp === 'WEBP') {
      return true;
    }
  }

  // AVIF / ISO BMFF: .... ftyp
  if (buffer.length >= 8 && buffer.toString('ascii', 4, 8) === 'ftyp') {
    return true;
  }

  return false;
}

export async function POST(req: NextRequest) {
  // 1. Authorize admin
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized. Admin credentials required.' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file');
    const folderField = formData.get('folder');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file provided or invalid payload.' }, { status: 400 });
    }

    // Sanitize destination subfolder
    const rawFolder = typeof folderField === 'string' ? folderField.toLowerCase().trim() : 'general';
    const safeFolder = ['gallery', 'menu', 'general'].includes(rawFolder) ? rawFolder : 'general';

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `File size exceeds the 10MB limit. Provided size: ${(file.size / (1024 * 1024)).toFixed(2)}MB` },
        { status: 400 }
      );
    }

    // Validate MIME type
    const mimeType = file.type.toLowerCase();
    const extension = ALLOWED_MIME_TYPES.get(mimeType);
    if (!extension) {
      return NextResponse.json(
        { error: 'Invalid file format. Only JPEG, PNG, WebP, and AVIF images are permitted.' },
        { status: 400 }
      );
    }

    // Read bytes & verify magic bytes
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    if (!verifyMagicBytes(buffer, mimeType)) {
      return NextResponse.json(
        { error: 'File content does not match genuine image signatures.' },
        { status: 400 }
      );
    }

    // Target upload directory
    const uploadsRoot = path.join(process.cwd(), 'public', 'uploads', safeFolder);
    if (!fs.existsSync(uploadsRoot)) {
      fs.mkdirSync(uploadsRoot, { recursive: true });
    }

    // Generate safe unique filename
    const uniqueId = crypto.randomBytes(8).toString('hex');
    const filename = `${Date.now()}-${uniqueId}.${extension}`;
    const destinationPath = path.join(uploadsRoot, filename);

    // Verify resolved path stays strictly within uploadsRoot to prevent path traversal
    const resolvedPath = path.resolve(destinationPath);
    if (!resolvedPath.startsWith(path.resolve(uploadsRoot))) {
      return NextResponse.json({ error: 'Illegal file path resolution.' }, { status: 400 });
    }

    // Write file to disk
    fs.writeFileSync(resolvedPath, buffer);

    const publicUrl = `/uploads/${safeFolder}/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      folder: safeFolder,
    });
  } catch (error) {
    console.error('Error in /api/admin/upload:', error);
    return NextResponse.json(
      { error: 'Internal server error processing file upload.' },
      { status: 500 }
    );
  }
}
