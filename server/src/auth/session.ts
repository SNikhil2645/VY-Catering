import { Request } from 'express';
import { verifyAdminToken, AdminPayload } from './token';

export const ADMIN_COOKIE_NAME = 'vyc_admin_session';

export function getCurrentAdminFromRequest(req: Request): AdminPayload | null {
  const token = req.cookies?.[ADMIN_COOKIE_NAME] || req.headers.authorization?.replace('Bearer ', '');
  return verifyAdminToken(token);
}

export function requireAdminFromRequest(req: Request): AdminPayload {
  const admin = getCurrentAdminFromRequest(req);
  if (!admin) {
    throw new Error('Unauthorized');
  }
  return admin;
}
