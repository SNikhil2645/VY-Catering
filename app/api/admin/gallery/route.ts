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
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
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
    const { title, description, category, imageUrl, thumbnailUrl, altText, published, displayOrder } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }
    if (!imageUrl || !imageUrl.trim()) {
      return NextResponse.json({ error: 'Image URL is required' }, { status: 400 });
    }

    const validCategory = [
      'WEDDINGS',
      'OUTDOOR_COOKING',
      'BUFFETS',
      'SIGNATURE_DISHES',
      'BEHIND_THE_SCENES',
    ].includes(category)
      ? category
      : 'WEDDINGS';

    const asset = await prisma.galleryAsset.create({
      data: {
        title: title.trim(),
        description: description ? description.trim() : null,
        category: validCategory,
        imageUrl: imageUrl.trim(),
        thumbnailUrl: thumbnailUrl ? thumbnailUrl.trim() : imageUrl.trim(),
        altText: altText && altText.trim() ? altText.trim() : title.trim(),
        published: published !== undefined ? Boolean(published) : true,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) || 0 : 0,
        source: 'ADMIN_UPLOAD',
        usagePermissionStatus: 'OWNER_APPROVED',
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
    console.error('Error adding gallery asset:', error);
    return NextResponse.json({ error: 'Failed to add gallery asset' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, title, description, category, imageUrl, thumbnailUrl, altText, published, displayOrder } = body;

    if (!id) {
      return NextResponse.json({ error: 'Asset ID is required' }, { status: 400 });
    }

    const updated = await prisma.galleryAsset.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: title.trim() } : {}),
        ...(description !== undefined ? { description: description ? description.trim() : null } : {}),
        ...(category !== undefined ? { category } : {}),
        ...(imageUrl !== undefined ? { imageUrl: imageUrl.trim() } : {}),
        ...(thumbnailUrl !== undefined ? { thumbnailUrl: thumbnailUrl.trim() } : {}),
        ...(altText !== undefined ? { altText: altText.trim() } : {}),
        ...(published !== undefined ? { published: Boolean(published) } : {}),
        ...(displayOrder !== undefined ? { displayOrder: parseInt(displayOrder, 10) || 0 } : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: admin.userId,
        action: 'UPDATE',
        resourceType: 'GALLERY',
        resourceId: id,
      },
    });

    return NextResponse.json({ success: true, asset: updated });
  } catch (error) {
    console.error('Error updating gallery asset:', error);
    return NextResponse.json({ error: 'Failed to update gallery asset' }, { status: 500 });
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
