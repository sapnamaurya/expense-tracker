import { Pool } from 'pg'; 
import dotenv from 'dotenv'; 

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectDb = async () => {
  try {
    await pool.connect();
    console.log('PostgreSQL Connected');
  } catch (error) {
    console.error('PostgreSQL Connection Error:', error);
  }
};

export { pool, connectDb };