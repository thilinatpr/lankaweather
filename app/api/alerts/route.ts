// app/api/alerts/route.ts
import { NextResponse } from 'next/server';
import { turso } from '@/lib/turso';
import { pusher } from '@/lib/pusher';

export async function GET() {
  try {
    const result = await turso.execute({
      sql: `
        SELECT * FROM alerts
        WHERE status = 'published'
        ORDER BY created_at DESC
      `,
      args: []
    });
    
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error('Failed to fetch alerts:', err);
    return NextResponse.json(
      { error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, message, icon } = body;
    
    const id = crypto.randomUUID();
    const timestamp = Math.floor(Date.now() / 1000);

    await turso.execute({
      sql: `
        INSERT INTO alerts (id, type, message, icon, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      args: [id, type, message, icon, 'published', timestamp]
    });

    const newAlert = { id, type, message, icon, status: 'published', created_at: timestamp };
    console.log('Triggering Pusher event with:', newAlert); // Add this log
    await pusher.trigger('alerts', 'new-alert', newAlert);
    console.log('Pusher event triggered successfully'); // Add this log
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Failed to create alert:', err);
    return NextResponse.json(
      { error: 'Failed to create alert' },
      { status: 500 }
    );
  }
}