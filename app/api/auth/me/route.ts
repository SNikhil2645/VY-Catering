import { NextResponse } from 'next/server';
import { getCurrentAdmin } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: admin.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ authenticated: true, user });
}
