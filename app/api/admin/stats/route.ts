import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentAdmin } from '@/lib/auth/session';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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

    return NextResponse.json({
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
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
