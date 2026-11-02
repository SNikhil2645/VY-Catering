import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { getCurrentAdmin } from '@/lib/auth/session';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const profiles = await prisma.businessProfile.findMany();
    return NextResponse.json({ success: true, profiles });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { businessType, phone, alternatePhone, address, operatingHours, serviceAreas } = body;

    const updated = await prisma.businessProfile.update({
      where: { businessType },
      data: {
        ...(phone ? { phone } : {}),
        ...(alternatePhone !== undefined ? { alternatePhone } : {}),
        ...(address ? { address } : {}),
        ...(operatingHours ? { operatingHours } : {}),
        ...(serviceAreas ? { serviceAreas: typeof serviceAreas === 'string' ? serviceAreas : JSON.stringify(serviceAreas) } : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: admin.userId,
        action: 'UPDATE',
        resourceType: 'SETTINGS',
        resourceId: businessType,
      },
    });

    return NextResponse.json({ success: true, profile: updated });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
