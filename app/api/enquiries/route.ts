import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { enquirySchema } from '@/lib/validation/enquirySchema';
import { generateReferenceCode } from '@/lib/utils/referenceCode';
import { getCurrentAdmin } from '@/lib/auth/session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check honeypot for spam
    if (body.website_hp && body.website_hp.length > 0) {
      return NextResponse.json({ success: true, message: 'Enquiry received' }, { status: 200 });
    }

    const parseResult = enquirySchema.safeParse(body);
    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;
    const referenceCode = generateReferenceCode('VYC');

    const enquiry = await prisma.enquiry.create({
      data: {
        referenceCode,
        customerName: data.customerName,
        phone: data.phone,
        email: data.email || null,
        preferredContactMethod: data.preferredContactMethod,
        eventType: data.eventType,
        eventDate: data.eventDate,
        eventStartTime: data.eventStartTime || '11:00 AM',
        guestCount: data.guestCount,
        venue: data.venue || null,
        eventFormat: data.eventFormat,
        foodPreference: data.foodPreference,
        specialRequests: data.specialRequests || null,
        status: 'NEW',
        source: 'WEBSITE',
        consentTimestamp: new Date(),
      },
    });

    console.log(`[Enquiry Created] Ref: ${referenceCode} | Customer: ${data.customerName} | Guests: ${data.guestCount}`);

    return NextResponse.json(
      {
        success: true,
        referenceCode: enquiry.referenceCode,
        message: 'Your catering enquiry has been registered successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error while processing your enquiry. Please contact us directly.',
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  try {
    const where: any = {};
    if (status && status !== 'ALL') {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { customerName: { contains: search } },
        { phone: { contains: search } },
        { referenceCode: { contains: search } },
        { eventType: { contains: search } },
      ];
    }

    const enquiries = await prisma.enquiry.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
