import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_DB_HOST,
  user: process.env.MYSQL_DB_USER,
  password: process.env.MYSQL_DB_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  port: Number(process.env.MYSQL_DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function query(sql: string, values?: any[]) {
  const [results] = await pool.execute(sql, values);
  return results;
}
