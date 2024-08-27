import { NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

type Place = {
  id: number;
  name: string;
  location: string;
};

export async function GET() {
  try {
    const places: Place[] = await query('SELECT id, name, ST_AsText(location) as location FROM places');
    return NextResponse.json(places);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { name, latitude, longitude } = await request.json();

    // Validar los datos
    if (!name || typeof latitude !== 'number' || typeof longitude !== 'number') {
      return NextResponse.json({ message: 'Datos inválidos' }, { status: 400 });
    }

    // Insertar el nuevo lugar en la base de datos
    await query(
      'INSERT INTO places (name, location) VALUES ($1, ST_SetSRID(ST_MakePoint($2, $3), 4326))',
      [name, longitude, latitude]
    );

    return NextResponse.json({ message: 'Lugar agregado correctamente' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
