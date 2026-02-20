import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  // First try to get from cookie (new preferred method)
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  }
  // Fallback: still support Bearer token (useful for Postman/testing or old clients)
  else {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
    req.user = decoded;
    next();
  } catch (err) {
    // Optional: clear invalid cookie so browser doesn't keep sending it
    res.clearCookie('accessToken', { path: '/' });
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};