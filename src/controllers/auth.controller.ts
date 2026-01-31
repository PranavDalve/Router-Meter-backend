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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Correct: one object argument
    const { user, token } = await authService.login({ email, password });

    res.json({ user, token });
  } catch (err: any) {
    if (err instanceof UnauthorizedError) {
      return res.status(401).json({ error: err.message });
    }
    res.status(500).json({ error: err.message || "Internal server error" });
  }
};