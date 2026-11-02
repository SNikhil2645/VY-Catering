import { Router } from 'express';
import prisma from '../db/prisma';

const router = Router();

router.get('/', async (req, res) => {
  const businessType = typeof req.query.type === 'string' ? req.query.type : 'CATERING';
  const categorySlug = typeof req.query.category === 'string' ? req.query.category : undefined;
  const dietary = typeof req.query.dietary === 'string' ? req.query.dietary : undefined;
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;

  try {
    const categories = await prisma.menuCategory.findMany({
      where: {
        active: true,
        ...(categorySlug ? { slug: categorySlug } : {}),
      },
      orderBy: { displayOrder: 'asc' },
      include: {
        items: {
          where: {
            availability: true,
            ...(businessType !== 'ALL' ? { businessType } : {}),
            ...(dietary && dietary !== 'ALL' ? { dietaryType: dietary } : {}),
            ...(search
              ? {
                  OR: [
                    { name: { contains: search } },
                    { description: { contains: search } },
                  ],
                }
              : {}),
          },
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    // Filter out categories with 0 matching items if filtering
    const result = categories.filter((cat) => cat.items.length > 0 || !dietary);

    return res.json({ success: true, categories: result });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return res.status(500).json({ error: 'Failed to fetch menu' });
  }
});

export default router;
