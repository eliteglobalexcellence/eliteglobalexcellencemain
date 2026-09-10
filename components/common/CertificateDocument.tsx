'use client';

import React, { useRef, useState } from 'react';
import { Download, ShieldCheck, Award, Lock } from 'lucide-react';

export interface CertificateData {
  certId: string;
  participantName: string;
  workshopTitle: string;
  issueDate: string;
  institution?: string;
}

interface CertificateDocumentProps {
  data: CertificateData;
  showActions?: boolean;
}

export const CertificateDocument: React.FC<CertificateDocumentProps> = ({
  data,
  showActions = true,
}) => {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [downloadingJpg, setDownloadingJpg] = useState(false);

  // Helper to ensure fonts and images are ready for 100% accurate canvas rendering
  const prepareCanvasSource = async () => {
    if (!certRef.current) return;
    try {
      if (typeof document !== 'undefined' && document.fonts) {
        await Promise.race([
          document.fonts.ready,
          new Promise((resolve) => setTimeout(resolve, 800)),
        ]);
      }
      const images = Array.from(certRef.current.querySelectorAll('img'));
      await Promise.race([
        Promise.all(
          images.map((img) => {
            if (img.complete) return Promise.resolve();
            return new Promise((resolve) => {
              img.onload = resolve;
              img.onerror = resolve;
            });
          })
        ),
        new Promise((resolve) => setTimeout(resolve, 800)),
      ]);
    } catch (e) {
      console.warn('Canvas prep warning:', e);
    }
  };

  // Helper to pre-convert images to Base64 Data URLs for 100% CORS-safe canvas rendering
  const fetchAsDataUrl = async (url: string): Promise<string> => {
    try {
      const res = await fetch(url);
      const blob = await res.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = () => resolve(url);
        reader.readAsDataURL(blob);
      });
    } catch {
      return url;
    }
  };

  // Temporarily sanitize oklch/oklab/color-mix functions from ALL document <style> tags
  // to prevent html2canvas CSS parser from crashing on Tailwind CSS v4 rules
  const withSanitizedDocumentStyles = async <T,>(fn: () => Promise<T>): Promise<T> => {
    const styleEls = Array.from(document.querySelectorAll('style'));
    const originals = new Map<HTMLStyleElement, string>();

    styleEls.forEach((styleEl) => {
      if (
        styleEl.textContent &&
        (styleEl.textContent.includes('oklch') ||
          styleEl.textContent.includes('oklab') ||
          styleEl.textContent.includes('color-mix'))
      ) {
        originals.set(styleEl, styleEl.textContent);
        styleEl.textContent = styleEl.textContent
          .replace(/color-mix\([^)]+\)/gi, '#045494')
          .replace(/oklch\([^)]+\)/gi, '#045494')
          .replace(/oklab\([^)]+\)/gi, '#045494');
      }
    });

    try {
      return await fn();
    } finally {
      originals.forEach((text, styleEl) => {
        styleEl.textContent = text;
      });
    }
  };

  // Fallback helper to trigger 100% clean 1-page A4 print dialog with Base64 embedded images (logo & signatures)
  const printSinglePageCertificate = async (certNode: HTMLElement) => {
    const container = document.createElement('div');
    container.id = 'single-cert-print-container';

    // Pre-convert images inside clone to Base64 Data URLs so images are NEVER missing
    const imgs = Array.from(certNode.querySelectorAll('img'));
    const dataUrls = await Promise.all(
      imgs.map((img) => fetchAsDataUrl(img.getAttribute('src') || img.src))
    );

    const clone = certNode.cloneNode(true) as HTMLElement;
    const cloneImgs = Array.from(clone.querySelectorAll('img'));
    cloneImgs.forEach((img, idx) => {
      img.src = dataUrls[idx];
    });

    clone.style.width = '297mm';
    clone.style.height = '210mm';
    clone.style.margin = '0';
    clone.style.boxSizing = 'border-box';
    clone.style.transform = 'none';

    container.appendChild(clone);
    document.body.appendChild(container);

    // Wait a moment for browser renderer to process Base64 image data
    await new Promise((r) => setTimeout(r, 150));

    window.print();

    setTimeout(() => {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }, 1000);
  };

  const handleDownloadPdf = async () => {
    if (!certRef.current) return;
    setDownloadingPdf(true);
    const filename = `Certificate_${data.participantName.replace(/\s+/g, '_')}_${data.certId}.pdf`;

    try {
      await prepareCanvasSource();
      const certElement = certRef.current;

      // 1. Temporarily replace image sources with Base64 Data URLs for 100% CORS-safe capture
      const imgs = Array.from(certElement.querySelectorAll('img'));
      const originalSrcs = imgs.map((img) => img.src);
      const dataUrls = await Promise.all(
        imgs.map((img) => fetchAsDataUrl(img.getAttribute('src') || img.src))
      );
      imgs.forEach((img, idx) => {
        img.src = dataUrls[idx];
      });

      let canvasDataUrl = '';

      try {
        const html2canvas = (await import('html2canvas')).default;
        // Render canvas on native DOM node at 3x scale (2673px x 1890px) for 100% exact design match & crispness
        const canvas = await withSanitizedDocumentStyles(async () => {
          return await html2canvas(certElement, {
            scale: 3,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#FAF9F5',
            width: 891,
            height: 630,
          });
        });
        canvasDataUrl = canvas.toDataURL('image/png', 1.0);
      } finally {
        // Restore original image sources immediately
        imgs.forEach((img, idx) => {
          img.src = originalSrcs[idx];
        });
      }

      if (canvasDataUrl) {
        const { jsPDF } = await import('jspdf');
        // Create 1-page A4 landscape PDF (297mm x 210mm)
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        pdf.addImage(canvasDataUrl, 'PNG', 0, 0, 297, 210, undefined, 'FAST');

        // Trigger direct download via Blob URL link
        const pdfBlob = pdf.output('blob');
        const downloadUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 8000);
      } else {
        await printSinglePageCertificate(certElement);
      }
    } catch (err) {
      console.error('PDF Export error, launching print fallback:', err);
      if (certRef.current) await printSinglePageCertificate(certRef.current);
    } finally {
      setDownloadingPdf(false);
    }
  };

  const handleDownloadJpg = async () => {
    if (!certRef.current) return;
    setDownloadingJpg(true);
    const filename = `Certificate_${data.participantName.replace(/\s+/g, '_')}_${data.certId}.jpg`;

    try {
      await prepareCanvasSource();
      const certElement = certRef.current;

      const imgs = Array.from(certElement.querySelectorAll('img'));
      const originalSrcs = imgs.map((img) => img.src);
      const dataUrls = await Promise.all(
        imgs.map((img) => fetchAsDataUrl(img.getAttribute('src') || img.src))
      );
      imgs.forEach((img, idx) => {
        img.src = dataUrls[idx];
      });

      let canvasDataUrl = '';

      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await withSanitizedDocumentStyles(async () => {
          return await html2canvas(certElement, {
            scale: 3,
            useCORS: true,
            allowTaint: true,
            logging: false,
            backgroundColor: '#FAF9F5',
            width: 891,
            height: 630,
          });
        });
        canvasDataUrl = canvas.toDataURL('image/jpeg', 0.98);
      } finally {
        imgs.forEach((img, idx) => {
          img.src = originalSrcs[idx];
        });
      }

      if (canvasDataUrl) {
        const link = document.createElement('a');
        link.href = canvasDataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        await printSinglePageCertificate(certElement);
      }
    } catch (err) {
      console.error('JPG Export error:', err);
      if (certRef.current) await printSinglePageCertificate(certRef.current);
    } finally {
      setDownloadingJpg(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      {/* Strict 1-Page A4 Landscape Print Styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            html, body {
              width: 297mm !important;
              height: 210mm !important;
              overflow: hidden !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            body > *:not(#single-cert-print-container) {
              display: none !important;
            }
            #single-cert-print-container, #single-cert-print-container * {
              visibility: visible !important;
            }
            #single-cert-print-container {
              display: flex !important;
              position: absolute !important;
              left: 0 !important;
              top: 0 !important;
              width: 297mm !important;
              height: 210mm !important;
              margin: 0 !important;
              padding: 0 !important;
              box-shadow: none !important;
              background: linear-gradient(180deg, #FFFFFF 0%, #FAF9F5 45%, #F4F2EA 100%) !important;
              z-index: 9999999 !important;
              page-break-after: avoid !important;
              page-break-before: avoid !important;
              page-break-inside: avoid !important;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: A4 landscape;
              margin: 0;
            }
          }
        `
      }} />

      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/90 border border-slate-700 p-3.5 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-2.5 text-xs font-bold text-amber-400">
            <Award className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Official Verified Digital Credential • Elite Global Excellence</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPdf}
              disabled={downloadingPdf || downloadingJpg}
              className="bg-gradient-to-r from-[#045494] to-[#033b68] hover:from-[#033b68] hover:to-[#022847] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md transition disabled:opacity-50 border border-blue-400/30"
            >
              {downloadingPdf ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-amber-300" />
              )}
              <span>{downloadingPdf ? 'Generating PDF...' : 'Download Official PDF Certificate'}</span>
            </button>

            {/* Download JPG Button */}
            <button
              onClick={handleDownloadJpg}
              disabled={downloadingPdf || downloadingJpg}
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-md transition disabled:opacity-50 border border-amber-400/30"
            >
              {downloadingJpg ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-amber-200" />
              )}
              <span>{downloadingJpg ? 'Generating JPG...' : 'Download JPG Certificate'}</span>
            </button>
          </div>
        </div>
      )}

      {/* CANVAS CONTAINER - FIXED 891px x 630px FOR 1:1 PERFECT A4 LANDSCAPE RATIO */}
      <div className="overflow-x-auto p-2 bg-slate-950/60 rounded-3xl border border-slate-800 shadow-2xl flex justify-center">
        <div
          ref={certRef}
          className="certificate-print-area w-[891px] min-w-[891px] h-[630px] min-h-[630px] text-slate-900 p-8 relative flex flex-col justify-between select-none shadow-2xl overflow-hidden box-border isolate"
          style={{
            background: 'linear-gradient(180deg, #FFFFFF 0%, #FAF9F5 45%, #F4F2EA 100%)',
            border: '6px solid',
            borderImage: 'linear-gradient(135deg, #B8860B 0%, #FFD700 25%, #DAA520 50%, #FFF8DC 75%, #B8860B 100%) 1',
          }}
        >
          {/* ========================================================================= */}
          {/* FADED SVG BACKGROUND PATTERNS & WATERMARKS */}
          {/* ========================================================================= */}

          {/* 1. Micro Security Diamond Grid Weave Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.035] z-0">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="sec-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 24 M 0 0 L 24 24" fill="none" stroke="#045494" strokeWidth="0.75" />
                  <circle cx="12" cy="12" r="1.5" fill="#B8860B" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sec-grid)" />
            </svg>
          </div>

          {/* 2. Central Faded Guilloche Sacred Rosette Watermark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.045] z-0">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
              <g stroke="#045494" strokeWidth="1">
                <circle cx="200" cy="200" r="190" strokeDasharray="4 4" />
                <circle cx="200" cy="200" r="175" />
                <circle cx="200" cy="200" r="160" stroke="#B8860B" strokeWidth="1.5" />
                <circle cx="200" cy="200" r="140" strokeDasharray="6 3" />
                <circle cx="200" cy="200" r="110" />
                <circle cx="200" cy="200" r="80" stroke="#B8860B" />
                {/* 16 Rosette Petals */}
                {Array.from({ length: 16 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx="200"
                    cy="200"
                    rx="140"
                    ry="45"
                    transform={`rotate(${i * 22.5} 200 200)`}
                  />
                ))}
              </g>
            </svg>
          </div>

          {/* 3. Outer Frame & Inner Double Pinstripes */}
          <div className="absolute inset-[10px] border-2 border-[#045494] pointer-events-none z-0" />
          <div className="absolute inset-[15px] border border-[#B8860B]/60 pointer-events-none z-0" />
          <div className="absolute inset-[18px] border border-[#045494]/30 pointer-events-none z-0" />

          {/* 4. Elegant Classical Gold Corner Flourish Ornaments */}
          {/* Top-Left Corner Ornament */}
          <div className="absolute top-[20px] left-[20px] w-14 h-14 pointer-events-none z-0">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#B8860B]">
              <path d="M0 0 H60 V8 H12 V60 H0 V0Z" fill="currentColor" />
              <path d="M16 16 H45 V22 H22 V45 H16 V16Z" fill="#045494" />
              <circle cx="8" cy="8" r="4" fill="#B8860B" />
              <circle cx="52" cy="8" r="3" fill="#B8860B" />
              <circle cx="8" cy="52" r="3" fill="#B8860B" />
            </svg>
          </div>
          {/* Top-Right Corner Ornament */}
          <div className="absolute top-[20px] right-[20px] w-14 h-14 pointer-events-none z-0 transform scale-x-[-1]">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#B8860B]">
              <path d="M0 0 H60 V8 H12 V60 H0 V0Z" fill="currentColor" />
              <path d="M16 16 H45 V22 H22 V45 H16 V16Z" fill="#045494" />
              <circle cx="8" cy="8" r="4" fill="#B8860B" />
              <circle cx="52" cy="8" r="3" fill="#B8860B" />
              <circle cx="8" cy="52" r="3" fill="#B8860B" />
            </svg>
          </div>
          {/* Bottom-Left Corner Ornament */}
          <div className="absolute bottom-[20px] left-[20px] w-14 h-14 pointer-events-none z-0 transform scale-y-[-1]">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#B8860B]">
              <path d="M0 0 H60 V8 H12 V60 H0 V0Z" fill="currentColor" />
              <path d="M16 16 H45 V22 H22 V45 H16 V16Z" fill="#045494" />
              <circle cx="8" cy="8" r="4" fill="#B8860B" />
              <circle cx="52" cy="8" r="3" fill="#B8860B" />
              <circle cx="8" cy="52" r="3" fill="#B8860B" />
            </svg>
          </div>
          {/* Bottom-Right Corner Ornament */}
          <div className="absolute bottom-[20px] right-[20px] w-14 h-14 pointer-events-none z-0 transform scale-[-1]">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-[#B8860B]">
              <path d="M0 0 H60 V8 H12 V60 H0 V0Z" fill="currentColor" />
              <path d="M16 16 H45 V22 H22 V45 H16 V16Z" fill="#045494" />
              <circle cx="8" cy="8" r="4" fill="#B8860B" />
              <circle cx="52" cy="8" r="3" fill="#B8860B" />
              <circle cx="8" cy="52" r="3" fill="#B8860B" />
            </svg>
          </div>

          {/* ========================================================================= */}
          {/* HEADER ROW: TOP BADGES & EGE OFFICIAL LOGO */}
          {/* ========================================================================= */}
          <div className="relative z-10 flex items-center justify-between px-8 pt-3">
            {/* Top Left Security Badge */}
            <div className="flex items-center gap-1.5 bg-[#045494]/10 border border-[#045494]/30 rounded-md px-2.5 py-1">
              <Lock className="w-3 h-3 text-[#045494]" />
              <span className="cert-font-sans text-[8.5px] font-black text-[#045494] uppercase tracking-widest">
                VERIFIED CREDENTIAL
              </span>
            </div>

            {/* Top Center Logo */}
            <div className="text-center">
              <img
                src="/images/ege_full_logo.png"
                alt="Elite Global Excellence"
                className="h-14 max-h-14 object-contain mx-auto drop-shadow-xs"
              />
            </div>

            {/* Top Right Certificate ID Badge */}
            <div className="bg-[#0B192C] text-white border border-[#B8860B] rounded-lg px-3 py-1 text-[9.5px] cert-font-sans font-bold shadow-sm">
              <span className="text-amber-400 font-extrabold mr-1">ID:</span>
              <span className="font-mono text-white font-extrabold tracking-wider">{data.certId}</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* MAIN CONTENT BODY */}
          {/* ========================================================================= */}
          <div className="text-center space-y-2.5 my-auto relative z-10 px-8">
            <div>
              <h2 className="cert-font-title text-3xl font-black tracking-[0.25em] text-[#045494] uppercase drop-shadow-2xs">
                CERTIFICATE
              </h2>
              <div className="flex items-center justify-center gap-3 mt-0.5">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />
                <p className="cert-font-sans text-[10.5px] font-extrabold tracking-[0.35em] text-[#B8860B] uppercase">
                  OF WORKSHOP ATTENDANCE
                </p>
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent" />
              </div>
            </div>

            <p className="cert-font-serif text-sm italic text-slate-600 font-medium pt-1">
              This is to certify that
            </p>

            {/* RECIPIENT NAME WITH EMBOSSED GOLD UNDERLINE */}
            <div className="py-1">
              <h3 className="cert-font-title text-3xl font-extrabold text-[#045494] tracking-wide px-10 pb-1.5 inline-block border-b-2 border-[#B8860B] drop-shadow-2xs">
                {data.participantName}
              </h3>
            </div>

            <p className="cert-font-sans text-[11px] text-slate-600 max-w-xl mx-auto leading-relaxed">
              has successfully participated in and completed the executive technical masterclass on
            </p>

            {/* WORKSHOP TITLE BANNER */}
            <div className="bg-gradient-to-r from-[#045494]/10 via-[#045494]/5 to-[#045494]/10 border border-[#045494]/30 rounded-xl px-6 py-2.5 max-w-xl mx-auto shadow-2xs">
              <h4 className="cert-font-sans text-xs sm:text-sm font-black text-[#0B192C] uppercase tracking-wide leading-snug">
                {data.workshopTitle}
              </h4>
            </div>

            {/* DATE & ORGANIZER META */}
            <div className="flex items-center justify-center gap-6 cert-font-sans text-[9px] font-bold text-slate-700 tracking-wider pt-1 uppercase">
              <div className="bg-slate-200/70 border border-slate-300 rounded-md px-3 py-1">
                <span className="text-slate-500 font-normal">DATE OF ISSUANCE:</span> <span className="text-[#045494] font-black">{data.issueDate}</span>
              </div>
              <div className="bg-slate-200/70 border border-slate-300 rounded-md px-3 py-1">
                <span className="text-slate-500 font-normal">ISSUING AUTHORITY:</span> <span className="text-[#045494] font-black">{data.institution || 'ELITE GLOBAL EXCELLENCE ACADEMIC COUNCIL'}</span>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SIGNATURES ROW (ENLARGED SIGNATURES) & EMBOSSED GOLD MEDALLION */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-3 items-end text-center relative z-10 px-8 pb-2">
            {/* Left Executive Signature: Mr. Sajid Shah */}
            <div className="flex flex-col items-center">
              <div className="h-16 flex items-center justify-center mb-1">
                <img
                  src="/images/sajid_signature.png"
                  alt="Sajid Shah Signature"
                  className="h-16 max-h-16 object-contain mx-auto filter drop-shadow-xs"
                />
              </div>
              <div className="w-48 border-t-2 border-[#045494]/60 pt-1" />
              <p className="cert-font-sans text-[11.5px] font-extrabold text-[#0B192C]">
                Mr. Sajid Shah
              </p>
              <p className="cert-font-sans text-[8.5px] font-bold text-[#045494] uppercase tracking-wider">
                Research & Development Director
              </p>
            </div>

            {/* Center Gold Embossed Scalloped Medallion */}
            <div className="flex flex-col items-center justify-end pb-1">
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#FFD700] via-[#DAA520] to-[#B8860B] p-1 shadow-lg flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#0B192C] border border-[#FFD700]/70 flex flex-col items-center justify-center text-amber-400 p-1">
                  <ShieldCheck className="w-5 h-5 text-[#FFD700]" />
                  <span className="text-[6.5px] font-black uppercase tracking-tighter text-amber-300 mt-0.5">
                    VERIFIED
                  </span>
                </div>
              </div>
              <span className="cert-font-sans text-[7px] font-black text-[#B8860B] uppercase tracking-widest mt-1">
                ★ OFFICIAL SEAL ★
              </span>
            </div>

            {/* Right Executive Signature: Dr. Syed Hamid Hussain Madni */}
            <div className="flex flex-col items-center">
              <div className="h-16 flex items-center justify-center mb-1">
                <img
                  src="/images/madni_signature.png"
                  alt="Dr. Syed Hamid Hussain Madni Signature"
                  className="h-16 max-h-16 object-contain mx-auto filter drop-shadow-xs"
                />
              </div>
              <div className="w-48 border-t-2 border-[#045494]/60 pt-1" />
              <p className="cert-font-sans text-[11.5px] font-extrabold text-[#0B192C]">
                Dr. Syed Hamid Hussain Madni
              </p>
              <p className="cert-font-sans text-[8.5px] font-bold text-[#045494] uppercase tracking-wider">
                Founder & Chief Executive Officer
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM VERIFICATION BAR (CENTERED, CONSTRAINED WIDTH TO PREVENT CORNER OVERLAP) */}
          {/* ========================================================================= */}
          <div className="relative z-10 px-12">
            <div className="bg-[#0B192C] text-white border border-[#B8860B]/60 text-[9px] cert-font-sans font-bold tracking-widest text-center py-2 px-6 rounded-xl uppercase shadow-md flex items-center justify-center gap-2 max-w-lg mx-auto">
              <span className="text-slate-300 font-semibold">VERIFY AUTHENTICITY AT:</span>
              <span className="text-amber-300 font-extrabold font-mono underline tracking-wider">WWW.ELITEGLOBALEXCELLENCE.COM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};





