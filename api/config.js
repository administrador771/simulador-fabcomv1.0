import db from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM ajustes LIMIT 1');
    return res.status(200).json({ status: 'success', data: rows[0] || {} });
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message });
  }
}