const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 7000;

app.use(cors());

app.get('/node-service/api/hello', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({
      message: '✅ Connected to PostgreSQL database',
      time: result.rows[0].now
    });
  } catch (err) {
    console.error('Erreur PG:', err);
    res.status(500).json({ error: 'Erreur PostgreSQL' });
  }
});

app.listen(port, () => {
  console.log(`✅ Backend connecté à http://localhost:${port}`);
});