import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  synchronize: false, // NEVER true in prod
  logging: !isProd,
  entities: [
    isProd
      ? path.join(__dirname, '../entities/**/*.js')
      : path.join(__dirname, '../entities/**/*.ts')
  ],
  migrations: [
    isProd
      ? path.join(__dirname, '../migrations/**/*.js')
      : path.join(__dirname, '../migrations/**/*.ts')
  ],
  ssl: isProd ? { rejectUnauthorized: false } : false,
});
