import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.POSTGRES_DB_USER,
  host: process.env.POSTGRES_DB_HOST,
  database: process.env.POSTGRES_DB_NAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  port: Number(process.env.POSTGRES_DB_PORT),
});

export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res.rows;
}
