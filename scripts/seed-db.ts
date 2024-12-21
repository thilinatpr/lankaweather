// scripts/seed-db.ts
import { turso } from "../lib/turso";

async function seedDb() {
  try {
    // Clear existing data
    await turso.execute('DELETE FROM alerts');
    await turso.execute('DELETE FROM weather');

    // Seed alerts
    const alerts = [
      {
        id: crypto.randomUUID(),
        type: 'high',
        message: 'Severe thunderstorm warning',
        icon: 'fa-bolt',
        status: 'published'
      },
      {
        id: crypto.randomUUID(),
        type: 'medium',
        message: 'Heavy rainfall expected',
        icon: 'fa-cloud-rain',
        status: 'published'
      },
      {
        id: crypto.randomUUID(),
        type: 'low',
        message: 'Light winds expected',
        icon: 'fa-wind',
        status: 'draft'
      }
    ];

    for (const alert of alerts) {
      await turso.execute({
        sql: `INSERT INTO alerts (id, type, message, icon, status)
              VALUES (?, ?, ?, ?, ?)`,
        args: [alert.id, alert.type, alert.message, alert.icon, alert.status]
      });
    }

    // Seed weather data
    const weatherData = [
      {
        id: crypto.randomUUID(),
        location: 'New York',
        temperature: 22,
        condition: 'sunny'
      },
      {
        id: crypto.randomUUID(),
        location: 'London',
        temperature: 18,
        condition: 'cloudy'
      },
      {
        id: crypto.randomUUID(),
        location: 'Tokyo',
        temperature: 25,
        condition: 'rainy'
      }
    ];

    for (const weather of weatherData) {
      await turso.execute({
        sql: `INSERT INTO weather (id, location, temperature, condition)
              VALUES (?, ?, ?, ?)`,
        args: [weather.id, weather.location, weather.temperature, weather.condition]
      });
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Failed to seed database:', error);
  }
}

seedDb();