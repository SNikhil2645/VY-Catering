import { Router } from 'express';
import prisma from '../../db/prisma';
import { requireAdmin } from '../../middleware/require-admin';

const router = Router();
router.use(requireAdmin);

router.get('/', async (_req, res) => {
  try {
    const assets = await prisma.galleryAsset.findMany({
      orderBy: [{ displayOrder: 'asc' }, { createdAt: 'desc' }],
    });
    return res.json({ success: true, assets });
  } catch (error) {
    console.error('Error fetching admin gallery:', error);
    return res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      imageUrl,
      thumbnailUrl,
      altText,
      published,
      displayOrder,
    } = req.body ?? {};

    if (!title || !String(title).trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!imageUrl || !String(imageUrl).trim()) {
      return res.status(400).json({ error: 'Image URL is required' });
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
        title: String(title).trim(),
        description: description ? String(description).trim() : null,
        category: validCategory,
        imageUrl: String(imageUrl).trim(),
        thumbnailUrl: thumbnailUrl ? String(thumbnailUrl).trim() : String(imageUrl).trim(),
        altText: altText && String(altText).trim() ? String(altText).trim() : String(title).trim(),
        published: published !== undefined ? Boolean(published) : true,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder, 10) || 0 : 0,
        source: 'ADMIN_UPLOAD',
        usagePermissionStatus: 'OWNER_APPROVED',
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'CREATE',
        resourceType: 'GALLERY',
        resourceId: asset.id,
      },
    });

    return res.status(201).json({ success: true, asset });
  } catch (error) {
    console.error('Error adding gallery asset:', error);
    return res.status(500).json({ error: 'Failed to add gallery asset' });
  }
});

router.put('/', async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      category,
      imageUrl,
      thumbnailUrl,
      altText,
      published,
      displayOrder,
    } = req.body ?? {};

    if (!id) {
      return res.status(400).json({ error: 'Asset ID is required' });
    }

    const updated = await prisma.galleryAsset.update({
      where: { id },
      data: {
        ...(title !== undefined ? { title: String(title).trim() } : {}),
        ...(description !== undefined
          ? { description: description ? String(description).trim() : null }
          : {}),
        ...(category !== undefined ? { category } : {}),
        ...(imageUrl !== undefined ? { imageUrl: String(imageUrl).trim() } : {}),
        ...(thumbnailUrl !== undefined ? { thumbnailUrl: String(thumbnailUrl).trim() } : {}),
        ...(altText !== undefined ? { altText: String(altText).trim() } : {}),
        ...(published !== undefined ? { published: Boolean(published) } : {}),
        ...(displayOrder !== undefined ? { displayOrder: parseInt(displayOrder, 10) || 0 } : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'UPDATE',
        resourceType: 'GALLERY',
        resourceId: id,
      },
    });

    return res.json({ success: true, asset: updated });
  } catch (error) {
    console.error('Error updating gallery asset:', error);
    return res.status(500).json({ error: 'Failed to update gallery asset' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const id = typeof req.query.id === 'string' ? req.query.id : undefined;
    if (!id) {
      return res.status(400).json({ error: 'Missing ID' });
    }

    await prisma.galleryAsset.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'DELETE',
        resourceType: 'GALLERY',
        resourceId: id,
      },
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Error deleting gallery asset:', error);
    return res.status(500).json({ error: 'Failed to delete asset' });
  }
});

export default router;
