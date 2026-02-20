// src/config/database.ts
import 'reflect-metadata'; // Required for TypeORM decorators to work
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { User } from '../entities/user.entity.js'; // ← Explicit import — this fixes "No metadata" error
// Load environment variables early
dotenv.config();
export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // IMPORTANT: NEVER use true in production — it drops/recreates tables!
    synchronize: false,
    // Logging: full in development, errors only in production
    logging: process.env.NODE_ENV !== 'production' ? true : ['error'],
    // Explicit entities — no glob issues after build
    entities: [
        User,
        // Add other entities here when you create them, e.g.:
        // Product, Order, etc.
    ],
    // Migrations (keep your original path logic)
    migrations: [
        process.env.NODE_ENV === 'production'
            ? 'dist/migrations/**/*.js'
            : 'src/migrations/**/*.ts'
    ],
    // Optional: subscribers (if you use event subscribers later)
    subscribers: [],
    // SSL configuration (good for AWS RDS, Render, etc.)
    ssl: process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
    // Recommended connection pool settings (prevents "too many connections" errors)
    extra: {
        max: 20, // max connections in pool
        idleTimeoutMillis: 30000, // close idle connections after 30s
        connectionTimeoutMillis: 2000, // timeout if connection can't be established
    },
});
