import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentAdmin } from '@/lib/auth/session';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
      orderBy: { displayOrder: 'asc' },
    });
    const categories = await prisma.menuCategory.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return NextResponse.json({ success: true, items, categories });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch admin menu data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { name, categoryId, description, price, dietaryType, businessType, availability, featured, imageUrl } = body;

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Math.floor(Math.random() * 1000);

    const newItem = await prisma.menuItem.create({
      data: {
        name,
        slug,
        categoryId,
        description: description || '',
        price: price ? parseFloat(price) : null,
        dietaryType: dietaryType || 'VEG',
        businessType: businessType || 'CATERING',
        availability: availability !== undefined ? availability : true,
        featured: featured || false,
        imageUrl: imageUrl || null,
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: admin.userId,
        action: 'CREATE',
        resourceType: 'MENU',
        resourceId: newItem.id,
      },
    });

    return NextResponse.json({ success: true, item: newItem }, { status: 201 });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return NextResponse.json({ error: 'Failed to create menu item' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, name, categoryId, description, price, dietaryType, businessType, availability, featured, imageUrl } = body;

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(name ? { name } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(description !== undefined ? { description } : {}),
        price: price ? parseFloat(price) : null,
        ...(dietaryType ? { dietaryType } : {}),
        ...(businessType ? { businessType } : {}),
        ...(availability !== undefined ? { availability } : {}),
        ...(featured !== undefined ? { featured } : {}),
        ...(imageUrl !== undefined ? { imageUrl } : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: admin.userId,
        action: 'UPDATE',
        resourceType: 'MENU',
        resourceId: id,
      },
    });

    return NextResponse.json({ success: true, item: updated });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return NextResponse.json({ error: 'Failed to update menu item' }, { status: 500 });
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

    await prisma.menuItem.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        adminUserId: admin.userId,
        action: 'DELETE',
        resourceType: 'MENU',
        resourceId: id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete menu item' }, { status: 500 });
  }
}
