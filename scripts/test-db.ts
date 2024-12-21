// scripts/test-db.ts
import { turso } from "../lib/turso";

async function testDb() {
  try {
    // Test alerts table
    const alerts = await turso.execute('SELECT * FROM alerts');
    console.log('\n=== ALERTS ===');
    console.log('Count:', alerts.rows.length);
    console.log('Data:', alerts.rows);

    // Test weather table
    const weather = await turso.execute('SELECT * FROM weather');
    console.log('\n=== WEATHER ===');
    console.log('Count:', weather.rows.length);
    console.log('Data:', weather.rows);

  } catch (error) {
    console.error('Error testing database:', error);
  }
}

testDb();