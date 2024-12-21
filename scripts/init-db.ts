// scripts/init-db.ts
import { turso } from "../lib/turso";

async function initDb() {
  try {
    // Create alerts table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS alerts (
        id TEXT PRIMARY KEY,
        type TEXT NOT NULL CHECK(type IN ('high', 'medium', 'low')),
        message TEXT NOT NULL,
        icon TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'published' CHECK(status IN ('draft', 'published', 'archived')),
        created_at INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `);

    // Create weather table
    await turso.execute(`
      CREATE TABLE IF NOT EXISTS weather (
        id TEXT PRIMARY KEY,
        location TEXT NOT NULL,
        temperature INTEGER NOT NULL,
        condition TEXT NOT NULL,
        timestamp INTEGER NOT NULL DEFAULT (unixepoch())
      )
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
}

initDb();