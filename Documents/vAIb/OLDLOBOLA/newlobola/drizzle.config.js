// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';

export default defineConfig({
  schema: './server/db/schema.ts', // Adjust path if necessary
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!, // The '!' asserts that this variable exists
  },
  verbose: true,
  strict: true,
});