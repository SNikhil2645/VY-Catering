import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentAdmin } from '@/lib/auth/session';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const assets = await prisma.galleryAsset.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ success: true, assets });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { title, description, category, imageUrl, thumbnailUrl, altText, published, usagePermissionStatus } = body;

    const asset = await prisma.galleryAsset.create({
      data: {
        title,
        description: description || '',
        category: category || 'WEDDINGS',
        imageUrl,
        thumbnailUrl: thumbnailUrl || imageUrl,
        altText: altText || title,
        published: published !== undefined ? published : true,
        usagePermissionStatus: usagePermissionStatus || 'VERIFIED_PLACEHOLDER',
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: admin.userId,
        action: 'CREATE',
        resourceType: 'GALLERY',
        resourceId: asset.id,
      },
    });

    return NextResponse.json({ success: true, asset }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add gallery asset' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

    await prisma.galleryAsset.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        adminUserId: admin.userId,
        action: 'DELETE',
        resourceType: 'GALLERY',
        resourceId: id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete asset' }, { status: 500 });
  }
}
