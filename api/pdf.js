import PDFDocument from 'pdfkit';

export default async function handler(req, res) {
  try {
    const doc = new PDFDocument({ margin: 50 });
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="reporte-simulacion.pdf"');

    doc.pipe(res);

    doc.fontSize(20).text('Simulador FABCOM', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text('Reporte de Simulación Crediticia', { underline: true });
    doc.moveDown();

    const { monto = '0', plazo = '0', cuota = '0' } = req.query;

    doc.fontSize(12).text(`Monto Solicitado: $${monto}`);
    doc.text(`Plazo Solicitado: ${plazo} meses`);
    doc.text(`Cuota estimada: $${cuota} / mes`);
    
    doc.moveDown();
    doc.fontSize(10).text('Este documento es solo una simulación informativa y no representa un compromiso contractual.', {
      align: 'justify'
    });

    doc.end();
  } catch (error) {
    res.status(500).json({ error: 'Error al generar el documento PDF' });
  }
}