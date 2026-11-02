import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { requireAdmin } from '../../middleware/require-admin';

const router = Router();

// Max file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Map<string, string>([
  ['image/jpeg', 'jpg'],
  ['image/jpg', 'jpg'],
  ['image/png', 'png'],
  ['image/webp', 'webp'],
  ['image/avif', 'avif'],
]);

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
});

// Verify magic bytes of common image formats to prevent disguised uploads
function verifyMagicBytes(buffer: Buffer): boolean {
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

router.use(requireAdmin);

router.post(
  '/',
  (req, res, next) => {
    upload.single('file')(req, res, (error: unknown) => {
      if (error) {
        if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
          res.status(400).json({ error: 'File size exceeds the 10MB limit.' });
          return;
        }
        res.status(400).json({ error: 'Invalid upload payload.' });
        return;
      }
      next();
    });
  },
  async (req, res) => {
    try {
      const file = req.file;
      const folderField = req.body?.folder;

      if (!file) {
        return res.status(400).json({ error: 'No file provided or invalid payload.' });
      }

      // Sanitize destination subfolder
      const rawFolder =
        typeof folderField === 'string' ? folderField.toLowerCase().trim() : 'general';
      const safeFolder = ['gallery', 'menu', 'general'].includes(rawFolder) ? rawFolder : 'general';

      // Validate MIME type
      const mimeType = (file.mimetype || '').toLowerCase();
      const extension = ALLOWED_MIME_TYPES.get(mimeType);
      if (!extension) {
        return res.status(400).json({
          error: 'Invalid file format. Only JPEG, PNG, WebP, and AVIF images are permitted.',
        });
      }

      // Verify magic bytes
      if (!verifyMagicBytes(file.buffer)) {
        return res.status(400).json({
          error: 'File content does not match genuine image signatures.',
        });
      }

      // Target upload directory (server/uploads/<folder>)
      const uploadsRoot = path.join(process.cwd(), 'uploads', safeFolder);
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
        return res.status(400).json({ error: 'Illegal file path resolution.' });
      }

      fs.writeFileSync(resolvedPath, file.buffer);

      const publicUrl = `/uploads/${safeFolder}/${filename}`;

      return res.json({
        success: true,
        url: publicUrl,
        filename,
        size: file.size,
        folder: safeFolder,
      });
    } catch (error) {
      console.error('Error in /api/admin/upload:', error);
      return res.status(500).json({ error: 'Internal server error processing file upload.' });
    }
  }
);

export default router;
