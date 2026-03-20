// hooks/usePdfExport.ts
//
// Uses html2canvas-pro (fork of html2canvas with native oklch/lab/lch support)
// so Tailwind v4's CSS Color Level 4 variables render correctly.
import { useState, useCallback } from 'react';

export function usePdfExport(filename = 'site-analysis-report.pdf') {
  const [isGenerating, setIsGenerating] = useState(false);

  const exportToPdf = useCallback(
    async (element: HTMLElement | null) => {
      if (!element || isGenerating) return;
      setIsGenerating(true);

      try {
        // html2canvas-pro: drop-in replacement with native oklch() support
        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
          import('html2canvas-pro'),
          import('jspdf'),
        ]);

        const canvas = await html2canvas(element, {
          // Optimized for the dedicated PdfReport component (1024px width)
          ignoreElements: (el) =>
            el.getAttribute('data-pdf-ignore') !== null || el.tagName === 'SCRIPT',

          // Use fixed width for the dedicated report container
          width: 1024,
          windowWidth: 1024,
          scale: 2,
          useCORS: true,
          allowTaint: false,
          imageTimeout: 15000,
          logging: false,
          onclone: (_clonedDoc, clonedEl) => {
            // Ensure ApexCharts SVGs have explicit dimensions for stable capture
            const origSvgs = Array.from(element.querySelectorAll<SVGElement>('.apexcharts-svg'));
            const cloneSvgs = Array.from(clonedEl.querySelectorAll<SVGElement>('.apexcharts-svg'));
            origSvgs.forEach((origSvg, i) => {
              const cloneSvg = cloneSvgs[i];
              if (!cloneSvg) return;
              const { width, height } = origSvg.getBoundingClientRect();
              if (width) cloneSvg.setAttribute('width', String(width));
              if (height) cloneSvg.setAttribute('height', String(height));
            });
          },
        });

        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: 'a4',
          hotfixes: ['px_scaling'],
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const scaledHeight = (canvas.height / canvas.width) * pdfWidth;

        let yOffset = 0;
        let remaining = scaledHeight;

        while (remaining > 0) {
          pdf.addImage(imgData, 'JPEG', 0, -yOffset, pdfWidth, scaledHeight);
          remaining -= pdfHeight;
          if (remaining > 0) {
            yOffset += pdfHeight;
            pdf.addPage();
          }
        }

        pdf.save(filename);
      } catch (err) {
        console.error('[usePdfExport] Failed to generate PDF:', err);
      } finally {
        setIsGenerating(false);
      }
    },
    [isGenerating, filename]
  );

  return { exportToPdf, isGenerating };
}
