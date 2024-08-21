import { NextResponse } from 'next/server';
import { query } from '@/lib/postgres';

type Place = {
  id: number;
  name: string;
  location: string; // Debe ser en formato WKT
};

export async function GET() {
  try {
    // Ejecutar la consulta y convertir la columna 'location' a formato WKT usando ST_AsText
    const places: Place[] = await query('SELECT id, name, ST_AsText(location) as location FROM places');
    return NextResponse.json(places); // Utiliza directamente 'places' ya que es el formato esperado
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
