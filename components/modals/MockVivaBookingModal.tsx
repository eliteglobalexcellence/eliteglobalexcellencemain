'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Award, Calendar, Loader2, Send } from 'lucide-react';

interface MockVivaBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPackage?: string;
  onSuccess?: () => void;
}

export const MockVivaBookingModal: React.FC<MockVivaBookingModalProps> = ({
  isOpen,
  onClose,
  defaultPackage = 'Professional Preparation Package (8 Weeks · 2 Months)',
  onSuccess,
}) => {
  const [selectedPkg, setSelectedPkg] = useState(defaultPackage);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [programLevel, setProgramLevel] = useState('PhD Candidate');
  const [university, setUniversity] = useState('');
  const [expectedDefenseDate, setExpectedDefenseDate] = useState('');
  const [thesisTitle, setThesisTitle] = useState('');
  const [comments, setComments] = useState('');
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
          type: 'MOCK_VIVA_BOOKING',
          name,
          email,
          phone,
          subject: `Mock Viva Booking: ${selectedPkg} - ${name}`,
          packageSelected: selectedPkg,
          message: `Degree Level: ${programLevel}\nUniversity: ${university}\nExpected Defense: ${expectedDefenseDate}\nThesis Topic: ${thesisTitle}\n\nCandidate Notes: ${comments}`,
          metadata: {
            selectedPackage: selectedPkg,
            programLevel,
            university,
            expectedDefenseDate,
            thesisTitle,
          },
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || 'Failed to submit booking.');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
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
            <h3 className="text-2xl font-bold text-slate-900">Mock Viva Enrolment Initiated</h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Thank you, <strong className="text-slate-900">{name}</strong>. Your application for the <strong>{selectedPkg}</strong> has been logged into the EGE Postgraduate Defense Clinic.
            </p>
            <p className="text-xs text-slate-500">
              An Academic Defense Coordinator will contact you at <strong>{email}</strong> within 24 hours with document submission instructions and panel assignment.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#045494] hover:bg-[#033b68] text-white text-sm font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Book Mock Viva Defense Preparation</h3>
                <p className="text-xs text-slate-500 font-medium">Expert panel questioning and structured defense preparation</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Preparation Package <span className="text-rose-500">*</span>
                </label>
                <select
                  value={selectedPkg}
                  onChange={(e) => setSelectedPkg(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] bg-white font-medium text-slate-800"
                >
                  <option value="Essential Preparation Package (4 Weeks · 1 Month)">
                    Essential Preparation Package (4 Weeks · 1 Month)
                  </option>
                  <option value="Professional Preparation Package (8 Weeks · 2 Months)">
                    Professional Preparation Package (8 Weeks · 2 Months) — MOST POPULAR
                  </option>
                  <option value="Premium Research Defense Package (12 Weeks · 3 Months)">
                    Premium Research Defense Package (12 Weeks · 3 Months)
                  </option>
                  <option value="1-Month Proposal Preparation (Proposal Package 1)">
                    1-Month Proposal Preparation (Proposal Package 1)
                  </option>
                  <option value="2-Month Proposal Preparation (Proposal Package 2)">
                    2-Month Proposal Preparation (Proposal Package 2)
                  </option>
                  <option value="3-Month Premium Proposal Preparation (Proposal Package 3)">
                    3-Month Premium Proposal Preparation (Proposal Package 3)
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Candidate Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tan Wei Jin"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. weijin.tan@university.edu"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    WhatsApp / Phone Number
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
                    Degree / Defense Type
                  </label>
                  <select
                    value={programLevel}
                    onChange={(e) => setProgramLevel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] bg-white text-slate-900 font-medium"
                  >
                    <option>PhD Candidate (Thesis Viva)</option>
                    <option>Master’s Student (Thesis Defense)</option>
                    <option>Undergraduate FYP Defense</option>
                    <option>PhD Research Proposal Defense</option>
                    <option>Master’s Proposal Defense</option>
                    <option>Re-Viva Examination Preparation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    University / Faculty
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. Universiti Teknologi Malaysia"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Expected Defense Month/Date
                  </label>
                  <input
                    type="text"
                    value={expectedDefenseDate}
                    onChange={(e) => setExpectedDefenseDate(e.target.value)}
                    placeholder="e.g. November 2026"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Thesis / Dissertation Title
                </label>
                <input
                  type="text"
                  value={thesisTitle}
                  onChange={(e) => setThesisTitle(e.target.value)}
                  placeholder="e.g. Deep Reinforcement Learning for Autonomous Drone Swarms"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#045494] text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Primary Areas of Concern (Methodology, Examiner Questions, Presentation Flow)
                </label>
                <textarea
                  rows={2}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Share details on your examiner panel structure or specific weaknesses you wish to target..."
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
                      <span>Confirm Package Booking</span>
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
