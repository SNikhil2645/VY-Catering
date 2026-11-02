import { Router } from 'express';
import prisma from '../db/prisma';

const router = Router();

router.get('/home', async (_req, res) => {
  try {
    const [testimonials, faqs] = await Promise.all([
      prisma.testimonial.findMany({
        where: { verified: true },
        orderBy: { displayOrder: 'asc' },
        take: 3,
      }),
      prisma.faq.findMany({
        where: { published: true },
        orderBy: { displayOrder: 'asc' },
        take: 4,
      }),
    ]);

    return res.json({ success: true, testimonials, faqs });
  } catch (error) {
    console.error('Error fetching home content:', error);
    return res.status(500).json({ error: 'Failed to fetch home content' });
  }
});

export default router;
