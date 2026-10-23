import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function enviarCorreo({ para, asunto, html, adjuntos = [] }) {
  const mailOptions = {
    from: `"Simulador FABCOM" <${process.env.SMTP_USER}>`,
    to: para,
    subject: asunto,
    html: html,
    attachments: adjuntos
  };

  return await transporter.sendMail(mailOptions);
}