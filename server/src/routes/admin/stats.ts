import { Router } from 'express';
import prisma from '../../db/prisma';
import { requireAdmin } from '../../middleware/require-admin';

const router = Router();
router.use(requireAdmin);

router.get('/', async (_req, res) => {
  try {
    const totalEnquiries = await prisma.enquiry.count();
    const newEnquiries = await prisma.enquiry.count({ where: { status: 'NEW' } });
    const confirmedEnquiries = await prisma.enquiry.count({ where: { status: 'CONFIRMED' } });
    const totalMenuItems = await prisma.menuItem.count();
    const totalGalleryAssets = await prisma.galleryAsset.count();

    const recentEnquiries = await prisma.enquiry.findMany({
      take: 6,
      orderBy: { createdAt: 'desc' },
    });

    const statusBreakdown = await prisma.enquiry.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    return res.json({
      success: true,
      stats: {
        totalEnquiries,
        newEnquiries,
        confirmedEnquiries,
        totalMenuItems,
        totalGalleryAssets,
        recentEnquiries,
        statusBreakdown,
      },
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
