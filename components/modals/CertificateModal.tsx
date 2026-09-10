'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, CheckCircle2, AlertCircle, ShieldCheck, Award, Loader2 } from 'lucide-react';
import { CertificateRecord } from '@/lib/types';
import { CertificateDocument } from '@/components/common/CertificateDocument';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ found: boolean; certificate?: CertificateRecord; message?: string } | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResult(null);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setQuery('');
    setResult(null);
    setLoading(false);
    onClose();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/verify-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ found: false, message: 'Server communication error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (id: string) => {
    setQuery(id);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md overflow-y-auto">
      <div className="bg-white/95 backdrop-blur-2xl rounded-[36px] max-w-5xl w-full p-6 sm:p-8 shadow-clay-deep border border-white/90 relative my-auto max-h-[94vh] flex flex-col overflow-y-auto scrollbar-none">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer z-20 transition-transform active:scale-95"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-[20px] bg-gradient-to-br from-blue-50 to-blue-100/60 border border-white text-[#045494] flex items-center justify-center shadow-clay-orb shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#045494]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">Verify Workshop Digital Certificate</h3>
            <p className="text-xs text-slate-500 font-bold">Official Elite Global Excellence Academic Credentials Registry</p>
          </div>
        </div>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-slate-700 mb-2">
              Enter Certificate ID or Participant Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. EGEW18-CERT01 or Sajid Shah"
                className="clay-input w-full pl-4 pr-32 py-3.5 text-xs font-mono font-bold text-slate-900 uppercase placeholder:text-slate-400"
              />
              <button
                type="submit"
                disabled={loading || !query.trim()}
                className="clay-button absolute right-2 top-2 bottom-2 bg-[#045494] text-white px-5 rounded-[16px] text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
                <span>Verify</span>
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex flex-wrap items-center gap-2 font-semibold">
            <span>Try sample ID:</span>
            <button
              type="button"
              onClick={() => handleQuickDemo('EGEW18-CERT01')}
              className="clay-badge text-[#045494] font-mono font-extrabold px-3 py-1 rounded-full text-[11px] cursor-pointer"
            >
              EGEW18-CERT01
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('EGE-WS-2024-8841')}
              className="clay-badge text-[#045494] font-mono font-extrabold px-3 py-1 rounded-full text-[11px] cursor-pointer"
            >
              EGE-WS-2024-8841
            </button>
          </div>
        </form>

        {/* Verification Result */}
        {result && (
          <div className="mt-5 pt-4 border-t border-slate-100 space-y-4">
            {result.found && result.certificate ? (
              <div className="space-y-4">
                <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-[28px] p-5 text-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-emerald-900 font-black text-base">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Authentic Verified Credential</span>
                    </span>
                    <span className="bg-emerald-600 text-white font-mono text-[10px] font-black px-3.5 py-1 rounded-full uppercase shadow-xs">
                      {result.certificate.status || 'VALID'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-slate-800 border-t border-emerald-200/60">
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">Certificate Serial ID</span>
                      <span className="font-mono font-black text-slate-900 text-sm">{result.certificate.id}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">Issue Date</span>
                      <span className="font-bold text-slate-900">{result.certificate.issueDate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">Participant Name</span>
                      <span className="font-black text-slate-900">{result.certificate.participantName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-extrabold text-slate-500 block">Status</span>
                      <span className="font-bold text-emerald-700">Official Record</span>
                    </div>
                  </div>
                </div>

                {/* Direct Clean Render of Redesigned Certificate */}
                <div className="pt-2">
                  <CertificateDocument
                    data={{
                      certId: result.certificate.id,
                      participantName: result.certificate.participantName,
                      workshopTitle: result.certificate.workshopTitle,
                      issueDate: result.certificate.issueDate,
                      institution: result.certificate.institution,
                    }}
                    showActions={true}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-rose-50 border border-rose-200 rounded-[28px] p-5 text-xs flex items-start gap-3 text-rose-800 font-medium">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-black text-sm">Credential Not Found</p>
                  <p className="text-xs text-rose-700 leading-relaxed font-medium">
                    {result.message || 'No record matches this query. Please ensure the Certificate ID is typed accurately.'}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-[16px] cursor-pointer transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

