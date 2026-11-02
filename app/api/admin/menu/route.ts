import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentAdmin } from '@/lib/auth/session';

// Helper to generate guaranteed unique slug
async function generateUniqueSlug(name: string): Promise<string> {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  let candidate = baseSlug || 'dish';
  let counter = 1;

  while (true) {
    const existing = await prisma.menuItem.findUnique({
      where: { slug: candidate },
    });
    if (!existing) {
      return candidate;
    }
    candidate = `${baseSlug}-${counter}`;
    counter++;
  }
}

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
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
    const {
      name,
      categoryId,
      description,
      price,
      dietaryType,
      businessType,
      availability,
      featured,
      imageUrl,
      spiceLevel,
      displayOrder,
    } = body;

    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Dish name is required.' }, { status: 400 });
    }
    if (!categoryId) {
      return NextResponse.json({ error: 'Category is required.' }, { status: 400 });
    }

    // Verify category exists
    const categoryExists = await prisma.menuCategory.findUnique({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      return NextResponse.json({ error: 'Selected category does not exist.' }, { status: 400 });
    }

    const slug = await generateUniqueSlug(name.trim());

    const newItem = await prisma.menuItem.create({
      data: {
        name: name.trim(),
        slug,
        categoryId,
        description: description ? description.trim() : '',
        price: price !== undefined && price !== null && price !== '' ? parseFloat(price) : null,
        dietaryType: dietaryType || 'VEG',
        businessType: businessType || 'CATERING',
        availability: availability !== undefined ? Boolean(availability) : true,
        featured: Boolean(featured),
        imageUrl: imageUrl ? imageUrl.trim() : null,
        spiceLevel: spiceLevel !== undefined && spiceLevel !== null ? parseInt(spiceLevel, 10) : 2,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) || 0 : 0,
      },
      include: { category: true },
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
    const {
      id,
      name,
      categoryId,
      description,
      price,
      dietaryType,
      businessType,
      availability,
      featured,
      imageUrl,
      spiceLevel,
      displayOrder,
    } = body;

    if (!id) {
      return NextResponse.json({ error: 'Dish ID is required' }, { status: 400 });
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(name ? { name: name.trim() } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(description !== undefined ? { description: description.trim() } : {}),
        price: price !== undefined && price !== null && price !== '' ? parseFloat(price) : null,
        ...(dietaryType ? { dietaryType } : {}),
        ...(businessType ? { businessType } : {}),
        ...(availability !== undefined ? { availability: Boolean(availability) } : {}),
        ...(featured !== undefined ? { featured: Boolean(featured) } : {}),
        ...(imageUrl !== undefined ? { imageUrl: imageUrl ? imageUrl.trim() : null } : {}),
        ...(spiceLevel !== undefined ? { spiceLevel: parseInt(spiceLevel, 10) } : {}),
        ...(displayOrder !== undefined ? { displayOrder: parseInt(displayOrder, 10) || 0 } : {}),
      },
      include: { category: true },
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
