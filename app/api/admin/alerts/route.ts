// app/api/admin/alerts/route.ts
import { db } from '@/lib/db';
import { redis } from '@/lib/realtime';
import { alerts } from '@/schema/schema';
import { desc } from 'drizzle-orm';
import { nanoid } from 'nanoid';

export async function GET() {
  try {
    const data = await db
      .select()
      .from(alerts)
      .orderBy(desc(alerts.createdAt));
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, message, icon } = await request.json();
    
    const alert = {
      id: nanoid(),
      type,
      message,
      icon,
      createdAt: Date.now(),
    };

    await db.insert(alerts).values(alert);
    await redis.publish('new-alert', JSON.stringify(alert));
    
    return Response.json(alert);
  } catch (error) {
    return Response.json({ error: 'Failed to create alert' }, { status: 500 });
  }
}