import { Router } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma';
import { createAdminToken } from '../auth/token';
import { getCurrentAdminFromRequest } from '../auth/session';
import { ADMIN_COOKIE_NAME, COOKIE_MAX_AGE_MS, NODE_ENV } from '../config/env';

const router = Router();

const cookieOptions = {
  httpOnly: true,
  secure: NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
};

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: String(email).toLowerCase().trim() },
    });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordValid = await bcrypt.compare(String(password), admin.passwordHash);
    if (!passwordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createAdminToken({
      userId: admin.id,
      email: admin.email,
      role: admin.role,
    });

    res.cookie(ADMIN_COOKIE_NAME, token, { ...cookieOptions, maxAge: COOKIE_MAX_AGE_MS });

    return res.json({
      success: true,
      user: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Server error during authentication' });
  }
});

router.post('/logout', (_req, res) => {
  res.clearCookie(ADMIN_COOKIE_NAME, cookieOptions);
  return res.json({ success: true, message: 'Logged out successfully' });
});

router.get('/me', async (req, res) => {
  const admin = getCurrentAdminFromRequest(req);
  if (!admin) {
    return res.status(401).json({ authenticated: false });
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: admin.userId },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    return res.status(401).json({ authenticated: false });
  }

  return res.json({ authenticated: true, user });
});

export default router;
