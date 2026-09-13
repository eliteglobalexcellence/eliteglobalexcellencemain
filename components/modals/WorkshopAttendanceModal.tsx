'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertCircle, Send } from 'lucide-react';
import { DatabaseState, Workshop } from '@/lib/types';

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
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [satisfaction, setSatisfaction] = useState('Yes, Very Satisfied');
  const [learnedSomething, setLearnedSomething] = useState('Yes, Extremely Valuable');
  const [comments, setComments] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

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

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = fullName.trim();

    if (!trimmedEmail || !trimmedName) {
      setErrorMsg('Please fill in all required fields marked with *.');
      return;
    }

    setSubmitting(true);

    try {
      // Calculate next Certificate ID for this workshop (e.g. EGEW14-CERT01)
      const existingAtts = (data?.workshopAttendances || []).filter(
        (a) => String(a.workshopId || '').toUpperCase() === targetWorkshopId.toUpperCase()
      );
      let maxNumber = 0;
      existingAtts.forEach((a) => {
        const match = String(a.certId || '').match(/-CERT(\d+)$/i);
        if (match) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxNumber) maxNumber = num;
        }
      });
      const generatedCertId = `${targetWorkshopId}-CERT${String(maxNumber + 1).padStart(2, '0')}`;

      const newAttendance = {
        id: `att-${Date.now()}`,
        workshopId: targetWorkshopId,
        certId: generatedCertId,
        fullName: trimmedName,
        email: trimmedEmail,
        satisfied: satisfaction,
        learned: learnedSomething,
        feedback: comments.trim(),
        submittedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        certIssued: false,
      };

      // 1. Save attendance entry to server database
      await fetch('/api/admin/crud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CREATE',
          entity: 'workshopAttendances',
          payload: newAttendance,
        }),
      }).catch((err) => console.warn('Attendance save fallback:', err));

      // 2. Optional: Mark matching registration as attended in database
      const matchingReg = (data?.workshopRegistrations || []).find(
        (r) => String(r.email).trim().toLowerCase() === trimmedEmail &&
               (r.workshopId.toUpperCase() === targetWorkshopId.toUpperCase())
      );

      if (matchingReg) {
        fetch('/api/admin/crud', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'UPDATE',
            entity: 'workshopRegistrations',
            payload: {
              id: matchingReg.id,
              attended: true,
              certId: generatedCertId,
            },
          }),
        }).catch((err) => console.warn('Reg update fallback:', err));
      }

      setSubmitted(true);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('ege_data_updated'));
      }
      onSuccess();
    } catch (err: any) {
      console.error('Attendance submit error:', err);
      setErrorMsg('Failed to record attendance. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    const wasSubmitted = submitted;
    setEmail('');
    setFullName('');
    setSatisfaction('Yes, Very Satisfied');
    setLearnedSomething('Yes, Extremely Valuable');
    setComments('');
    setErrorMsg('');
    setSubmitted(false);
    onClose();
    if (wasSubmitted && typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#045494] text-white p-6 relative shrink-0">
          <button
            onClick={resetForm}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Close"
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
            Please fill out the feedback form to mark your attendance to receive your digital certificate.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
          {submitted ? (
            /* Success Screen */
            <div className="text-center space-y-6 animate-in zoom-in-95 py-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900">Attendance Submitted Successfully!</h3>
                <p className="text-xs text-slate-700 max-w-md mx-auto leading-relaxed font-medium">
                  Thanks for attending workshop on <strong>{activeWorkshop.title}</strong>, you will receive your certificate within a week.
                </p>
              </div>

              <button
                onClick={resetForm}
                className="w-full bg-[#045494] hover:bg-[#033b68] text-white font-bold text-xs py-3 rounded-xl shadow-md transition cursor-pointer"
              >
                Close
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
                  Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. participant@example.com"
                  className="w-full px-3.5 py-2.5 border border-slate-300 focus:border-[#045494] focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name to be displayed on Certificate <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. Sajid Shah"
                  className="w-full px-3.5 py-2.5 border border-slate-300 focus:border-[#045494] focus:ring-2 focus:ring-blue-100 rounded-xl text-xs font-medium text-slate-900 placeholder:text-slate-400"
                />
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
