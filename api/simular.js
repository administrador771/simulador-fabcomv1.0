import db from '../lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { producto_id, monto, plazo } = req.body || {};

    if (!monto || !plazo) {
      return res.status(400).json({ error: 'Faltan parámetros requeridos (monto, plazo)' });
    }

    const tasaAnual = 0.12; 
    const tasaMensual = tasaAnual / 12;
    const cuotaMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo));
    const totalPagar = cuotaMensual * plazo;

    return res.status(200).json({
      exito: true,
      resultado: {
        monto: Number(monto),
        plazo: Number(plazo),
        cuotaMensual: Math.round(cuotaMensual * 100) / 100,
        totalPagar: Math.round(totalPagar * 100) / 100
      }
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}