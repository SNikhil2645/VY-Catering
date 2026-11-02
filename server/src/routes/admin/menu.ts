import { Router } from 'express';
import prisma from '../../db/prisma';
import { requireAdmin } from '../../middleware/require-admin';

const router = Router();
router.use(requireAdmin);

async function generateUniqueSlug(name: string): Promise<string> {
  const baseSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  let candidate = baseSlug || 'dish';
  let counter = 1;

  while (true) {
    const existing = await prisma.menuItem.findUnique({ where: { slug: candidate } });
    if (!existing) {
      return candidate;
    }
    candidate = `${baseSlug}-${counter}`;
    counter++;
  }
}

router.get('/', async (_req, res) => {
  try {
    const items = await prisma.menuItem.findMany({
      include: { category: true },
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    const categories = await prisma.menuCategory.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    return res.json({ success: true, items, categories });
  } catch (error) {
    console.error('Error fetching admin menu:', error);
    return res.status(500).json({ error: 'Failed to fetch admin menu data' });
  }
});

router.post('/', async (req, res) => {
  try {
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
    } = req.body ?? {};

    if (!name || !String(name).trim()) {
      return res.status(400).json({ error: 'Dish name is required.' });
    }
    if (!categoryId) {
      return res.status(400).json({ error: 'Category is required.' });
    }

    const categoryExists = await prisma.menuCategory.findUnique({ where: { id: categoryId } });
    if (!categoryExists) {
      return res.status(400).json({ error: 'Selected category does not exist.' });
    }

    const slug = await generateUniqueSlug(String(name).trim());

    const newItem = await prisma.menuItem.create({
      data: {
        name: String(name).trim(),
        slug,
        categoryId,
        description: description ? String(description).trim() : '',
        price: price !== undefined && price !== null && price !== '' ? parseFloat(price) : null,
        dietaryType: dietaryType || 'VEG',
        businessType: businessType || 'CATERING',
        availability: availability !== undefined ? Boolean(availability) : true,
        featured: Boolean(featured),
        imageUrl: imageUrl ? String(imageUrl).trim() : null,
        spiceLevel:
          spiceLevel !== undefined && spiceLevel !== null ? parseInt(spiceLevel, 10) : 2,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) || 0 : 0,
      },
      include: { category: true },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'CREATE',
        resourceType: 'MENU',
        resourceId: newItem.id,
      },
    });

    return res.status(201).json({ success: true, item: newItem });
  } catch (error) {
    console.error('Error creating menu item:', error);
    return res.status(500).json({ error: 'Failed to create menu item' });
  }
});

router.put('/', async (req, res) => {
  try {
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
    } = req.body ?? {};

    if (!id) {
      return res.status(400).json({ error: 'Dish ID is required' });
    }

    const updated = await prisma.menuItem.update({
      where: { id },
      data: {
        ...(name ? { name: String(name).trim() } : {}),
        ...(categoryId ? { categoryId } : {}),
        ...(description !== undefined ? { description: String(description).trim() } : {}),
        price: price !== undefined && price !== null && price !== '' ? parseFloat(price) : null,
        ...(dietaryType ? { dietaryType } : {}),
        ...(businessType ? { businessType } : {}),
        ...(availability !== undefined ? { availability: Boolean(availability) } : {}),
        ...(featured !== undefined ? { featured: Boolean(featured) } : {}),
        ...(imageUrl !== undefined ? { imageUrl: imageUrl ? String(imageUrl).trim() : null } : {}),
        ...(spiceLevel !== undefined ? { spiceLevel: parseInt(spiceLevel, 10) } : {}),
        ...(displayOrder !== undefined ? { displayOrder: parseInt(displayOrder, 10) || 0 } : {}),
      },
      include: { category: true },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'UPDATE',
        resourceType: 'MENU',
        resourceId: id,
      },
    });

    return res.json({ success: true, item: updated });
  } catch (error) {
    console.error('Error updating menu item:', error);
    return res.status(500).json({ error: 'Failed to update menu item' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const id = typeof req.query.id === 'string' ? req.query.id : undefined;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }

    await prisma.menuItem.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'DELETE',
        resourceType: 'MENU',
        resourceId: id,
      },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Error deleting menu item:', error);
    return res.status(500).json({ error: 'Failed to delete menu item' });
  }
});

export default router;
