import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  try {
    const assets = await prisma.galleryAsset.findMany({
      where: {
        published: true,
        ...(category && category !== 'ALL' ? { category } : {}),
      },
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json({ success: true, assets });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch gallery assets' }, { status: 500 });
  }
}
