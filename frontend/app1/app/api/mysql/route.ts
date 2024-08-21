import { NextResponse } from 'next/server';
import { query } from '../../../lib/mysql';

export async function GET() {
  try {
    const results = await query('SELECT * FROM personas');
    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
