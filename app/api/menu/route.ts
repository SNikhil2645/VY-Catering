import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const businessType = searchParams.get('type') || 'CATERING';
  const categorySlug = searchParams.get('category');
  const dietary = searchParams.get('dietary');
  const search = searchParams.get('search');

  try {
    const categories = await prisma.menuCategory.findMany({
      where: { active: true },
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

    return NextResponse.json({ success: true, categories: result });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
