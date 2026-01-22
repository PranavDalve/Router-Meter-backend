// src/config/rdsDataSource.ts
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { RouterEvent } from '../entities/RouterEvent';

dotenv.config();

export const RDSDataSource = new DataSource({
  type: 'postgres',
  host: process.env.RDS_HOST,
  port: Number(process.env.RDS_PORT) || 5432,
  username: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB,
  synchronize: false,
  logging: process.env.NODE_ENV !== 'production',
  entities: [RouterEvent], // ✅ explicitly add the entity
  ssl: { rejectUnauthorized: false },
});