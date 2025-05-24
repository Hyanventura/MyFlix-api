import { Pool } from 'pg';

// Pega a URL completa do Railway
const connectionString = process.env.DATABASE_PUBLIC_URL || process.env.DATABASE_URL;

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // Necessário para Railway
  }
});

export default pool;