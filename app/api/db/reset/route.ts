import { NextResponse } from 'next/server';
import { resetDatabase } from '@/lib/db';

export async function POST() {
  try {
    const db = resetDatabase();
    return NextResponse.json({ success: true, message: 'Database reset to default seed data successfully.', data: db });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
