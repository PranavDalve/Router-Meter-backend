import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service.js';
import { ConflictError, UnauthorizedError } from '../utils/errors.js';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Correct: one object argument
    const user = await authService.register({ email, password });

    res.status(201).json({ message: "User created", user });
  } catch (err: any) {
    if (err instanceof ConflictError) {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { user, token } = await authService.login({ email, password });

    res.cookie('accessToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
      path: '/',
    });

    res.status(200).json({
      message: 'Logged in successfully',
      user: { id: user.id, email: user.email }
    });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      return res.status(401).json({ error: err.message });
    }
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};