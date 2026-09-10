'use client';

import React from 'react';
import { X, Download, FileText, CheckCircle, ShieldCheck, Printer } from 'lucide-react';

interface PdfBrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookNow: () => void;
}

export const PdfBrochureModal: React.FC<PdfBrochureModalProps> = ({
  isOpen,
  onClose,
  onBookNow,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brochure Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-2 py-0.5 rounded">
                Official Document Preview · PDF
              </span>
              <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                EGE Mock Viva Preparation Service Brochure (2026/2027)
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document Content View */}
        <div className="border border-slate-200 rounded-xl p-6 bg-slate-50 text-xs text-slate-800 space-y-5 font-sans">
          <div className="text-center border-b border-slate-200 pb-4">
            <h4 className="text-base font-black text-[#045494] uppercase tracking-wide">
              Elite Global Excellence Sdn. Bhd.
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Kuala Lumpur · Johor Bahru · Malaysia | www.eliteglobalexcellence.com
            </p>
            <h5 className="text-sm font-bold text-slate-900 mt-2">
              Master’s & PhD Mock Viva Defense Preparation Syllabus & Roadmap
            </h5>
          </div>

          <div className="space-y-3">
            <h6 className="font-bold text-[#045494] text-xs uppercase tracking-wider">
              1. Program Purpose & Defense Methodology
            </h6>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Preparing for a Master’s or PhD viva examination requires far more than reviewing slides. The EGE defense preparation program pairs candidates with senior international examiners to evaluate research soundness, methodology justifications, novelty gaps, and oral defense communication under realistic committee questioning.
            </p>
          </div>

          <div className="space-y-2">
            <h6 className="font-bold text-[#045494] text-xs uppercase tracking-wider">
              2. Preparation Packages Overview
            </h6>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">Essential Package</div>
                <div className="text-[10px] text-blue-700 font-semibold">4 Weeks · 1 Month</div>
                <p className="text-[10px] text-slate-500 mt-1">
                  Document evaluation, slide coaching, examiner question bank, 1 final simulation.
                </p>
              </div>
              <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
                <div className="font-bold text-[#045494] text-xs">Professional Package</div>
                <div className="text-[10px] text-[#045494] font-bold">8 Weeks · 2 Months (Popular)</div>
                <p className="text-[10px] text-slate-600 mt-1">
                  Full assessment, regular consultation, novelty gap analysis, 1 complete mock viva.
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900 text-xs">Premium Defense Package</div>
                <div className="text-[10px] text-slate-700 font-semibold">12 Weeks · 3 Months</div>
                <p className="text-[10px] text-slate-500 mt-1">
                  End-to-end dissertation refinement, multiple examiner trials, defense roadmap.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h6 className="font-bold text-[#045494] text-xs uppercase tracking-wider">
              3. Deliverables & Certification
            </h6>
            <ul className="space-y-1 text-[11px] text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Formal Research Document Evaluation Report (30-45 pages)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Examiner Questioning Strategy & Expected Committee Angle Guide</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Recorded Simulated Defense Session with Panel Timestamped Critique</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Official EGE Certificate of Defense Readiness</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified EGE Academic Council Syllabus</span>
          </div>
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handlePrint}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Save / Print PDF</span>
            </button>
            <button
              onClick={() => {
                onClose();
                onBookNow();
              }}
              className="px-5 py-2 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Book Preparation Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
