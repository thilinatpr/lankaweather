// lib/turso.ts
import { createClient } from "@libsql/client";
import dotenv from 'dotenv';

dotenv.config(); // Load .env file

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

export const turso = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN
});