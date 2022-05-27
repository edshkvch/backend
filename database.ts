import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  migrations: ['migrations/*.ts'],
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  type: 'postgres',
  url: process.env.APPLICATION_POSTGRES_URL,
});
