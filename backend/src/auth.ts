// Password hashing and sessions. Uses Node's built-in crypto (scrypt),
// so there are no native packages to install.
import crypto from 'node:crypto';
import type { Request, Response, NextFunction } from 'express';

export const SESSION_COOKIE = 'ko_session';

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(':');
  const candidate = crypto.scryptSync(password, salt, 64);
  return crypto.timingSafeEqual(candidate, Buffer.from(hash, 'hex'));
}

export function newToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

// Rules shown to the shopper on the sign-up and change-password forms.
export function passwordProblem(password: string): string | null {
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return 'Password must include a letter and a number.';
  return null;
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export interface AuthedRequest extends Request {
  userId?: number;
}

export function requireUser(req: AuthedRequest, res: Response, next: NextFunction) {
  if (!req.userId) {
    res.status(401).json({ error: 'Sign in to continue.' });
    return;
  }
  next();
}
