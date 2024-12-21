// app/api/alerts/route.ts
import { NextResponse } from 'next/server';
import { turso } from '@/lib/turso';

export async function GET() {
  try {
    const result = await turso.execute(`
      SELECT * FROM alerts 
      WHERE status = 'published' 
      ORDER BY created_at DESC
    `);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
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
    
    const result = await turso.execute(`
      INSERT INTO alerts (id, type, message, icon, status, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [
      crypto.randomUUID(),
      type,
      message,
      icon,
      'published',
      Math.floor(Date.now() / 1000)
    ]);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to create alert' }, 
      { status: 500 }
    );
  }
}