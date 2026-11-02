import { cookies } from 'next/headers';
import { verifyAdminToken, AdminPayload } from './token';

export const ADMIN_COOKIE_NAME = 'vyc_admin_session';

export async function getCurrentAdmin(): Promise<AdminPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifyAdminToken(token);
}

export async function requireAdmin(): Promise<AdminPayload> {
  const admin = await getCurrentAdmin();
  if (!admin) {
    throw new Error('Unauthorized');
  }
  return admin;
}
