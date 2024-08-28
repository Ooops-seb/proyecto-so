import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongo';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('traccar');
    const collection = db.collection('personas');
    const results = await collection.find({}).toArray();

    return NextResponse.json(results);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
