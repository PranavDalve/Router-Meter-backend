// src/config/database.ts
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
// Load environment variables
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProd = process.env.NODE_ENV === 'production';
export const AppDataSource = new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // VERY IMPORTANT: never use synchronize: true in production!
    synchronize: false, // ← changed to false (use migrations instead)
    logging: isProd ? ['error'] : true, // less noisy in production
    // ──────────────────────────────────────────────
    // Entities – this is the most common reason for "No metadata for \"User\" was found"
    // ──────────────────────────────────────────────
    entities: [
        // Best way for both development and production after build
        path.join(__dirname, isProd ? '../entities/**/*.js' : '../entities/**/*.ts')
    ],
    // ──────────────────────────────────────────────
    // Migrations – same logic as entities
    // ──────────────────────────────────────────────
    migrations: [
        path.join(__dirname, isProd ? '../migrations/**/*.js' : '../migrations/**/*.ts')
    ],
    // Optional: subscribers if you use them
    subscribers: [],
    // SSL configuration (good practice)
    ssl: isProd ? {
        rejectUnauthorized: false // ← common for AWS RDS / Heroku / Render
    } : false,
    // Recommended extra settings
    extra: {
        max: 20, // connection pool size
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 2000,
    },
});
