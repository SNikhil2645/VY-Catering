import { Router } from 'express';
import prisma from '../../db/prisma';
import { requireAdmin } from '../../middleware/require-admin';

const router = Router();
router.use(requireAdmin);

router.get('/', async (_req, res) => {
  try {
    const profiles = await prisma.businessProfile.findMany();
    return res.json({ success: true, profiles });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { businessType, phone, alternatePhone, address, operatingHours, serviceAreas } =
      req.body ?? {};

    if (!businessType) {
      return res.status(400).json({ error: 'Business type is required' });
    }

    const updated = await prisma.businessProfile.update({
      where: { businessType },
      data: {
        ...(phone ? { phone } : {}),
        ...(alternatePhone !== undefined ? { alternatePhone } : {}),
        ...(address ? { address } : {}),
        ...(operatingHours ? { operatingHours } : {}),
        ...(serviceAreas
          ? {
              serviceAreas:
                typeof serviceAreas === 'string' ? serviceAreas : JSON.stringify(serviceAreas),
            }
          : {}),
      },
    });

    await prisma.auditLog.create({
      data: {
        adminUserId: req.admin!.userId,
        action: 'UPDATE',
        resourceType: 'SETTINGS',
        resourceId: businessType,
      },
    });

    return res.json({ success: true, profile: updated });
  } catch (error) {
    console.error('Error updating settings:', error);
    return res.status(500).json({ error: 'Failed to update settings' });
  }
});

export default router;
