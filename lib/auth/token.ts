import crypto from 'crypto';

const SECRET = process.env.ADMIN_JWT_SECRET || 'venky-yadav-catering-dev-secret-key-2026';

export interface AdminPayload {
  userId: string;
  email: string;
  role: string;
  exp: number; // Unix timestamp
}

export function createAdminToken(payload: Omit<AdminPayload, 'exp'>, expiresInDays = 7): string {
  const exp = Math.floor(Date.now() / 1000) + expiresInDays * 24 * 60 * 60;
  const data: AdminPayload = { ...payload, exp };
  const encoded = Buffer.from(JSON.stringify(data)).toString('base64url');
  const signature = crypto.createHmac('sha256', SECRET).update(encoded).digest('base64url');
  return `${encoded}.${signature}`;
}

export function verifyAdminToken(token: string | undefined): AdminPayload | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encoded, signature] = parts;
  const expectedSig = crypto.createHmac('sha256', SECRET).update(encoded).digest('base64url');

  if (signature !== expectedSig) return null;

  try {
    const payload: AdminPayload = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}
