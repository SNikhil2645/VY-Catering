import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = Number(process.env.PORT) || 4000;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000';
export const ADMIN_JWT_SECRET =
  process.env.ADMIN_JWT_SECRET || 'venky-yadav-catering-dev-secret-key-2026';
export const ADMIN_COOKIE_NAME = 'vyc_admin_session';
export const COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
