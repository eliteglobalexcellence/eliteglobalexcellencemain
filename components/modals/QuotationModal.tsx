'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Send, Loader2, FileText } from 'lucide-react';

interface QuotationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
  onSuccess?: () => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({
  isOpen,
  onClose,
  serviceTitle = 'Research Publication Assistance',
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [institution, setInstitution] = useState('');
  const [manuscriptTitle, setManuscriptTitle] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('Computer Science & IT');
  const [targetJournal, setTargetJournal] = useState('Scopus Q1 / Q2');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      setError('Please provide your name and email.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'QUOTATION',
          name,
          email,
          phone,
          subject: `Quotation Request: ${serviceTitle} (${manuscriptTitle || 'Manuscript'})`,
          packageSelected: serviceTitle,
          message: `Field: ${fieldOfStudy}\nTarget Indexing: ${targetJournal}\nInstitution: ${institution}\n\nClient notes: ${message}`,
          metadata: {
            serviceTitle,
            manuscriptTitle,
            fieldOfStudy,
            targetJournal,
            institution,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || 'Failed to submit quotation request.');
      }
    } catch (err: any) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Quotation Request Received</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-slate-800">{name}</strong>. Our academic publishing advisory committee has received your inquiry for <em>{serviceTitle}</em>. A personalized quotation and timeline evaluation will be dispatched to <strong>{email}</strong> within 24 business hours.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#045494] hover:bg-[#033b68] text-white text-sm font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Request a Service Quotation</h3>
                <p className="text-xs text-slate-500 font-medium">{serviceTitle}</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Muhammad Hassan"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Official Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. scholar@university.edu"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +60 12-345 6789"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    University / Institution
                  </label>
                  <input
                    type="text"
                    value={institution}
                    onChange={(e) => setInstitution(e.target.value)}
                    placeholder="e.g. Universiti Teknologi Malaysia"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Field of Study / Discipline
                  </label>
                  <select
                    value={fieldOfStudy}
                    onChange={(e) => setFieldOfStudy(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] bg-white text-slate-900 font-medium"
                  >
                    <option>Computer Science & IT</option>
                    <option>Artificial Intelligence & ML</option>
                    <option>Engineering & Robotics</option>
                    <option>Environmental Science</option>
                    <option>Medical & Health Sciences</option>
                    <option>Business & Economics</option>
                    <option>Social Sciences</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Target Publication Indexing
                  </label>
                  <select
                    value={targetJournal}
                    onChange={(e) => setTargetJournal(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] bg-white text-slate-900 font-medium"
                  >
                    <option>Scopus Q1 (High Impact)</option>
                    <option>Scopus Q2 / Q3</option>
                    <option>Web of Science (WoS) / SCI-E</option>
                    <option>Peer-Reviewed International Conference</option>
                    <option>EGE Affiliated Journal Track</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Draft Manuscript Title / Research Topic
                </label>
                <input
                  type="text"
                  value={manuscriptTitle}
                  onChange={(e) => setManuscriptTitle(e.target.value)}
                  placeholder="e.g. Deep Neural Architectures for Real-Time Satellite Image Segmentation"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Specific Requirements or Target Deadlines
                </label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current draft status (word count, figures, feedback received from reviewers, or specific services needed)..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2.5 rounded-xl font-semibold flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Quotation Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
