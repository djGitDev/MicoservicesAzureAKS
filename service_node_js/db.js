const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  database: 'postgres',
  host: process.env.PGHOST || 'localhost',
  password: 'pass',
  port: 5432,
});

module.exports = pool;