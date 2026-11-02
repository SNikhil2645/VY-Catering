import type { AdminPayload } from '../auth/token';

declare global {
  namespace Express {
    interface Request {
      admin?: AdminPayload;
    }
  }
}

export {};
