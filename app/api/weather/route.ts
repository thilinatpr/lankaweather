// app/api/weather/route.ts
import { NextResponse } from 'next/server';
import { turso } from '@/lib/turso';

export async function GET() {
  try {
    const result = await turso.execute(`
      SELECT * FROM weather 
      ORDER BY timestamp DESC 
      LIMIT 5
    `);
    
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' }, 
      { status: 500 }
    );
  }
}