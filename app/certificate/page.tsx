'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Award, ArrowLeft, ShieldCheck, CheckCircle2, Loader2, Search, AlertCircle, FileCheck } from 'lucide-react';
import { CertificateDocument, CertificateData } from '@/components/common/CertificateDocument';
import Link from 'next/link';

function CertificateViewerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlId = searchParams.get('id') || searchParams.get('certId') || '';

  const [query, setQuery] = useState(urlId);
  const [loading, setLoading] = useState(false);
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [searched, setSearched] = useState(false);

  const fetchCertificate = async (searchId: string) => {
    if (!searchId.trim()) return;
    setLoading(true);
    setErrorMsg('');
    setCertData(null);
    setSearched(true);

    try {
      const res = await fetch('/api/verify-certificate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchId.trim() }),
      });
      const data = await res.json();
      if (data.found && data.certificate) {
        setCertData({
          certId: data.certificate.id,
          participantName: data.certificate.participantName,
          workshopTitle: data.certificate.workshopTitle,
          issueDate: data.certificate.issueDate,
          institution: data.certificate.institution || 'Elite Global Excellence Academic Council',
        });
      } else {
        setErrorMsg(
          data.message || `No verified certificate record found matching "${searchId}". Please check the ID or contact support.`
        );
      }
    } catch (err) {
      console.error('Certificate verification error:', err);
      setErrorMsg('Failed to communicate with the verification server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (urlId) {
      setQuery(urlId);
      fetchCertificate(urlId);
    }
  }, [urlId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/certificate?id=${encodeURIComponent(query.trim())}`);
    fetchCertificate(query.trim());
  };

  const handleQuickSample = (sampleId: string) => {
    setQuery(sampleId);
    router.push(`/certificate?id=${encodeURIComponent(sampleId)}`);
    fetchCertificate(sampleId);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-[#045494] selection:text-white">
      {/* Top Fixed Navigation Header */}
      <header className="bg-[#0B192C] border-b border-slate-800 px-4 py-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xl">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3 py-2 text-slate-300 hover:text-white rounded-xl bg-slate-800/90 hover:bg-slate-800 transition flex items-center gap-2 text-xs font-bold border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4 text-blue-400" />
            <span>Return to Main Site</span>
          </Link>
          <div className="h-5 w-px bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Official Credentials Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Verified Registry</span>
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 sm:p-8 space-y-8 flex flex-col justify-center">
        {/* TOP SEARCH BAR SECTION (Only displayed when searching without an ID or when an error occurs) */}
        {(!certData && !urlId) || errorMsg ? (
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="w-12 h-12 bg-blue-900/40 text-blue-400 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Verify Digital Certificate
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
                Enter your official Certificate Serial ID or Participant Name below to instantly verify and view your authentic credential.
              </p>
            </div>

            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto space-y-3">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Enter Certificate Serial ID (e.g. EGEW18-CERT01 or Sajid Shah)"
                  className="w-full pl-4 pr-36 py-3.5 text-xs sm:text-sm border border-slate-700 rounded-2xl bg-slate-950 text-white placeholder:text-slate-500 font-mono font-bold focus:ring-2 focus:ring-[#045494] focus:border-transparent outline-none uppercase shadow-inner"
                />
                <button
                  type="submit"
                  disabled={loading || !query.trim()}
                  className="absolute right-1.5 top-1.5 bottom-1.5 bg-gradient-to-r from-[#045494] to-[#033b68] hover:from-[#033b68] hover:to-[#022847] text-white px-5 rounded-xl text-xs font-extrabold flex items-center gap-2 cursor-pointer disabled:opacity-50 transition border border-blue-400/30 shadow-md"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin text-amber-300" /> : <Search className="w-4 h-4 text-amber-300" />}
                  <span>Verify</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-400 pt-1">
                <span className="text-[11px] text-slate-500">Sample Records:</span>
                <button
                  type="button"
                  onClick={() => handleQuickSample('EGEW18-CERT01')}
                  className="text-amber-400 hover:text-amber-300 font-mono font-bold bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] cursor-pointer transition"
                >
                  EGEW18-CERT01
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSample('EGE-WS-2024-8841')}
                  className="text-amber-400 hover:text-amber-300 font-mono font-bold bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] cursor-pointer transition"
                >
                  EGE-WS-2024-8841
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickSample('EGE-WS-2025-1029')}
                  className="text-amber-400 hover:text-amber-300 font-mono font-bold bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] cursor-pointer transition"
                >
                  EGE-WS-2025-1029
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* RESULTS CONTAINER */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-10 h-10 text-[#045494] animate-spin" />
            <p className="text-xs font-semibold text-slate-400">Verifying official digital credential record...</p>
          </div>
        ) : certData ? (
          <div className="w-full space-y-6 animate-in fade-in zoom-in-95 duration-300">
            {/* Status Summary Banner */}
            <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-900/60 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-extrabold text-white">Verified Certificate Record Found</h2>
                  <p className="text-xs text-slate-300">
                    Issued to <strong className="text-white">{certData.participantName}</strong> • Serial ID: <span className="font-mono text-amber-400 font-bold">{certData.certId}</span>
                  </p>
                </div>
              </div>

              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-mono text-[10px] font-black px-3 py-1 rounded-full uppercase">
                AUTHENTIC VALID RECORD
              </span>
            </div>

            {/* Redesigned Certificate Document */}
            <CertificateDocument data={certData} showActions={true} />
          </div>
        ) : errorMsg ? (
          <div className="bg-rose-950/40 border border-rose-800 text-rose-200 p-6 rounded-3xl text-center space-y-3 max-w-md mx-auto shadow-xl">
            <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
            <p className="font-bold text-sm text-white">Certificate Record Not Found</p>
            <p className="text-xs text-rose-300 leading-relaxed">{errorMsg}</p>
          </div>
        ) : !searched ? (
          <div className="bg-slate-900/50 border border-slate-800/60 rounded-3xl p-8 text-center text-slate-400 space-y-2">
            <FileCheck className="w-10 h-10 mx-auto text-slate-600" />
            <p className="text-sm font-bold text-slate-300">Awaiting Certificate Verification Search</p>
            <p className="text-xs text-slate-500">
              Type your Certificate Serial ID in the search bar above to verify and download your certificate.
            </p>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default function CertificatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin text-[#045494]" />
        </div>
      }
    >
      <CertificateViewerContent />
    </Suspense>
  );
}

