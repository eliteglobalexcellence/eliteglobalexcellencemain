'use client';

import React, { useState } from 'react';
import { X, Award, CheckCircle2, AlertCircle, Send, FileCheck } from 'lucide-react';
import { DatabaseState, Workshop } from '@/lib/types';
import { CertificateDocument } from '@/components/common/CertificateDocument';

interface WorkshopAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  workshop: Workshop | null;
  data: DatabaseState;
  onSuccess: () => void;
}

export const WorkshopAttendanceModal: React.FC<WorkshopAttendanceModalProps> = ({
  isOpen,
  onClose,
  workshop,
  data,
  onSuccess,
}) => {
  const [registrationId, setRegistrationId] = useState('');
  const [satisfaction, setSatisfaction] = useState('Yes, Very Satisfied');
  const [learnedSomething, setLearnedSomething] = useState('Yes, Extremely Valuable');
  const [comments, setComments] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedCert, setSubmittedCert] = useState<{ certId: string; registrationId: string; name: string } | null>(null);

  if (!isOpen) return null;

  const fallbackWorkshop: Workshop = {
    id: '1',
    workshopId: 'EGEW15',
    title: 'AI in Education & Academic Research',
    date: 'March 15, 2026',
    time: '10:00 AM - 1:00 PM',
    mode: 'Online (Zoom)',
    venue: '—',
    fee: 'Free',
    isFree: true,
    status: 'UPCOMING',
    attendanceOpen: true,
    description: 'Elite Global Excellence Academic Masterclass',
  };

  const activeWorkshop = workshop || (data?.workshops && data.workshops.length > 0 ? data.workshops[0] : fallbackWorkshop);
  const targetWorkshopId = activeWorkshop.workshopId || `EGEW${activeWorkshop.id}`;
  const isAttendanceOpen = activeWorkshop.attendanceOpen !== false; // Default true if unspecified

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!isAttendanceOpen) {
      setErrorMsg('Attendance portal for this workshop is currently closed by the administrator.');
      return;
    }

    const trimmedId = registrationId.trim().toUpperCase();
    if (!trimmedId) {
      setErrorMsg('Please enter your valid Registration ID (e.g. EGEW15-001) or Email Address.');
      return;
    }

    setSubmitting(true);

    try {
      // Find matching registration in data by Registration ID or Email
      const allRegs = data.workshopRegistrations || [];
      const match = allRegs.find(
        (r) => r.registrationId.toUpperCase() === trimmedId || r.email.trim().toUpperCase() === trimmedId
      );

      let participantName = match ? match.fullName : 'Workshop Participant';

      // Calculate Cert ID
      const certCount = (data.certificates || []).filter((c) => c.id.startsWith(targetWorkshopId)).length + 1;
      const generatedCertId = `${targetWorkshopId}-CERT${String(certCount).padStart(2, '0')}`;

      // 1. Await saving attendance state to server database
      if (match) {
        await fetch('/api/admin/crud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'UPDATE',
            entity: 'workshopRegistrations',
            payload: {
              id: match.id,
              attended: true,
              certId: generatedCertId,
            },
          }),
        }).catch((err) => console.warn('Attendance update fallback:', err));
      }

      // 2. Await adding verified certificate record to database
      const newCert = {
        id: generatedCertId,
        participantName: participantName,
        workshopTitle: activeWorkshop.title,
        issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: 'VALID',
        institution: 'Elite Global Excellence Academic Council',
      };

      await fetch('/api/admin/crud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE',
          entity: 'certificates',
          payload: newCert,
        }),
      }).catch((err) => console.warn('Cert create fallback:', err));

      setSubmittedCert({
        certId: generatedCertId,
        registrationId: match ? match.registrationId : trimmedId,
        name: participantName,
      });

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('ege_data_updated'));
      }
      onSuccess();

      // 3. Directly navigate user to official Certificate Page
      if (typeof window !== 'undefined') {
        window.location.href = `/certificate?id=${encodeURIComponent(generatedCertId)}`;
      }
    } catch (err: any) {
      setErrorMsg('Failed to record attendance. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setRegistrationId('');
    setSatisfaction('Yes, Very Satisfied');
    setLearnedSomething('Yes, Extremely Valuable');
    setComments('');
    setErrorMsg('');
    setSubmittedCert(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className={`bg-white w-full ${submittedCert ? 'max-w-4xl' : 'max-w-lg'} rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-auto max-h-[92vh] flex flex-col`}>
        {/* Header */}
        <div className="bg-[#045494] text-white p-6 relative shrink-0">
          <button
            onClick={resetForm}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white/20 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {targetWorkshopId}
            </span>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${isAttendanceOpen ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/30' : 'bg-rose-500/20 text-rose-200 border border-rose-400/30'}`}>
              {isAttendanceOpen ? '● Attendance OPEN' : '● Attendance CLOSED'}
            </span>
          </div>
          <h2 className="text-xl font-extrabold leading-tight">Workshop Attendance & Verification</h2>
          <p className="text-xs text-blue-100 mt-1">
            Please fill out the feedback form to mark your attendance and receive your digital certificate.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {submittedCert ? (
            /* Success Screen */
            <div className="text-center space-y-6 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Attendance Recorded Successfully!</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Thank you, <strong className="text-slate-900">{submittedCert.name}</strong>. Your attendance has been confirmed for <strong>{activeWorkshop.title}</strong>.
                </p>
              </div>

              {/* Certificate Box */}
              <div className="bg-blue-50/80 border-2 border-blue-200 rounded-2xl p-5 text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#045494] uppercase tracking-wider">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>Issued Certificate Serial ID</span>
                </div>
                <div className="text-xl font-black text-[#045494] font-mono tracking-widest bg-white py-2 px-4 rounded-xl border border-blue-200 shadow-xs inline-block">
                  {submittedCert.certId}
                </div>
                <p className="text-[11px] text-slate-600 font-medium">
                  Your certificate has been generated and opened in a new tab. If your browser blocked popups, click the button below to download your certificate:
                </p>

                <a
                  href={`/certificate?id=${encodeURIComponent(submittedCert.certId)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Download Certificate in New Tab</span>
                </a>
              </div>

              {/* LIVE CERTIFICATE PREVIEW */}
              <div className="pt-2">
                <CertificateDocument
                  data={{
                    certId: submittedCert.certId,
                    participantName: submittedCert.name,
                    workshopTitle: activeWorkshop.title,
                    issueDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                  }}
                  showActions={true}
                />
              </div>

              <button
                onClick={resetForm}
                className="w-full bg-[#045494] hover:bg-[#033b68] text-white font-bold text-xs py-3 rounded-xl shadow-md transition cursor-pointer"
              >
                Close Window
              </button>
            </div>
          ) : (
            /* Form Screen */
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isAttendanceOpen && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-bold">Attendance Closed</strong>
                    The attendance portal for this workshop is currently closed by the administrator.
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Registration ID <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={registrationId}
                  onChange={(e) => setRegistrationId(e.target.value)}
                  placeholder="e.g. EGEW15-001 or EGEWS05-021"
                  className="w-full px-3.5 py-2.5 border border-slate-300 focus:border-[#045494] focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-mono font-bold text-slate-900 placeholder:text-slate-400 uppercase"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  You can find this ID in the confirmation email sent to you upon registration.
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Workshop Feedback</h4>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Are you satisfied from this workshop? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={satisfaction}
                    onChange={(e) => setSatisfaction(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 bg-white font-medium focus:ring-2 focus:ring-[#045494]"
                  >
                    <option value="Yes, Very Satisfied">Yes, Very Satisfied</option>
                    <option value="Satisfied">Satisfied</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Unsatisfied">Unsatisfied</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Did you learn something in this workshop? <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={learnedSomething}
                    onChange={(e) => setLearnedSomething(e.target.value)}
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 bg-white font-medium focus:ring-2 focus:ring-[#045494]"
                  >
                    <option value="Yes, Extremely Valuable">Yes, Extremely Valuable</option>
                    <option value="Yes, Learned New Skills">Yes, Learned New Skills</option>
                    <option value="Somewhat">Somewhat</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Additional Feedback / Suggestions (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share any key takeaways or suggestions for future masterclasses..."
                    className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-xs text-slate-900 bg-white placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || !isAttendanceOpen}
                  className="bg-[#045494] hover:bg-[#033b68] disabled:opacity-50 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md transition flex items-center gap-2 cursor-pointer"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Attendance</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
