import { useState } from 'react';
import { Download } from 'lucide-react';

interface Props {
  targetRef: React.RefObject<HTMLElement>;
  filename: string;
}

export default function PdfExportButton({ targetRef, filename }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    if (!targetRef.current) return;
    setBusy(true);
    setError(null);
    try {
      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([import('html2canvas'), import('jspdf')]);
      const canvas = await html2canvas(targetRef.current, { scale: 2, backgroundColor: '#FDFBF7' });
      const pdf = new jsPDF({ unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height * imgW) / canvas.width;
      const img = canvas.toDataURL('image/png');

      // Slice tall content across multiple A4 pages.
      const usableH = pageH - margin * 2;
      let offset = 0;
      let first = true;
      while (offset < imgH) {
        if (!first) pdf.addPage();
        pdf.addImage(img, 'PNG', margin, margin - offset, imgW, imgH);
        // Mask margins so sliced content doesn't bleed outside the page area.
        pdf.setFillColor(253, 251, 247);
        pdf.rect(0, 0, pageW, margin, 'F');
        pdf.rect(0, pageH - margin, pageW, margin, 'F');
        offset += usableH;
        first = false;
      }
      pdf.save(`${filename}.pdf`);
    } catch (e) {
      console.error('PDF export failed', e);
      setError("We couldn't create your PDF just now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div data-html2canvas-ignore>
      <button
        onClick={handleExport}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-full bg-sage px-5 py-2 text-white shadow hover:bg-sage-dark disabled:opacity-60"
      >
        <Download size={18} aria-hidden /> {busy ? 'Preparing…' : 'Export to PDF'}
      </button>
      {error && (
        <p role="alert" className="mt-2 text-sm text-terracotta">
          {error}
        </p>
      )}
    </div>
  );
}
