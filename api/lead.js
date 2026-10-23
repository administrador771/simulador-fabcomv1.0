import db from '../lib/db.js';
import { enviarCorreo } from '../lib/mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { nombre, email, telefono, mensaje } = req.body || {};

    if (!nombre || !email) {
      return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
    }

    const [result] = await db.query(
      'INSERT INTO leads (nombre, email, telefono, mensaje, creado_at) VALUES (?, ?, ?, ?, NOW())',
      [nombre, email, telefono || '', mensaje || '']
    );

    await enviarCorreo({
      para: email,
      asunto: 'Gracias por solicitar tu simulación - FABCOM',
      html: `<h2>Hola ${nombre},</h2><p>Hemos recibido tu solicitud correctamente. Un asesor se pondrá en contacto contigo pronto.</p>`
    });

    return res.status(200).json({
      exito: true,
      id: result.insertId,
      mensaje: 'Lead registrado exitosamente'
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}