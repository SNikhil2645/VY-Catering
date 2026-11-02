import { Router } from 'express';
import prisma from '../db/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const category = typeof req.query.category === 'string' ? req.query.category : undefined;

  try {
    const assets = await prisma.galleryAsset.findMany({
      where: {
        published: true,
        ...(category && category !== 'ALL' ? { category } : {}),
      },
      orderBy: { displayOrder: 'asc' },
    });

    return res.json({ success: true, assets });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    return res.status(500).json({ error: 'Failed to fetch gallery assets' });
  }
});

export default router;
