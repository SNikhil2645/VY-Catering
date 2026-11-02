import { Router } from 'express';
import { Prisma } from '@prisma/client';
import prisma from '../db/prisma';
import { enquirySchema } from '../validation/enquirySchema';
import { generateReferenceCode } from '../utils/referenceCode';
import { requireAdmin } from '../middleware/require-admin';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const body = req.body ?? {};

    // Check honeypot for spam
    if (typeof body.website_hp === 'string' && body.website_hp.length > 0) {
      return res.status(200).json({ success: true, message: 'Enquiry received' });
    }

    const parseResult = enquirySchema.safeParse(body);
    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        errors: parseResult.error.flatten().fieldErrors,
      });
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

    console.log(
      `[Enquiry Created] Ref: ${referenceCode} | Customer: ${data.customerName} | Guests: ${data.guestCount}`
    );

    return res.status(201).json({
      success: true,
      referenceCode: enquiry.referenceCode,
      message: 'Your catering enquiry has been registered successfully.',
    });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error while processing your enquiry. Please contact us directly.',
    });
  }
});

router.get('/', requireAdmin, async (req, res) => {
  const status = typeof req.query.status === 'string' ? req.query.status : undefined;
  const search = typeof req.query.search === 'string' ? req.query.search : undefined;

  try {
    const where: Prisma.EnquiryWhereInput = {};

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

    return res.json({ success: true, enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
});

router.get('/:id', requireAdmin, async (req, res) => {
  try {
    const enquiry = await prisma.enquiry.findUnique({ where: { id: req.params.id } });

    if (!enquiry) {
      return res.status(404).json({ error: 'Enquiry not found' });
    }

    return res.json({ success: true, enquiry });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch enquiry' });
  }
});

router.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { status, internalNotes } = req.body ?? {};

    const updated = await prisma.enquiry.update({
      where: { id: req.params.id },
      data: {
        ...(status ? { status } : {}),
        ...(internalNotes !== undefined ? { internalNotes } : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'STATUS_CHANGE',
        resourceType: 'ENQUIRY',
        resourceId: req.params.id,
      },
    });

    return res.json({ success: true, enquiry: updated });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return res.status(500).json({ error: 'Failed to update enquiry' });
  }
});

export default router;
