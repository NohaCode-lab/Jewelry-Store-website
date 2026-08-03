import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  DATABASE_URL: z.string().optional().default(''),
  JWT_SECRET: z.string().default('mangatagallo_super_secret_jwt_key_2026'),
  REFRESH_TOKEN_SECRET: z.string().default('mangatagallo_super_secret_refresh_key_2026'),
  ALLOWED_ORIGINS: z.string().optional().default('http://localhost:5173,http://localhost:3000,https://mangatagallo.com'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variable configuration:', parsedEnv.error.format());
  process.exit(1);
}

export const ENV = parsedEnv.data;
