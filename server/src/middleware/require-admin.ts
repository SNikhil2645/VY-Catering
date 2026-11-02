import type { Request, Response, NextFunction } from 'express';
import { getCurrentAdminFromRequest } from '../auth/session';

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const admin = getCurrentAdminFromRequest(req);
  if (!admin) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }
  req.admin = admin;
  next();
}
