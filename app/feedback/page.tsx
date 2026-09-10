'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Send,
  Building2,
  User,
  Briefcase
} from 'lucide-react';

export default function FeedbackPage() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [institution, setInstitution] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !role.trim() || !quote.trim()) {
      setErrorMsg('Please fill in your name, designation/role, and review feedback.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/testimonials/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          institution: institution.trim(),
          quote: quote.trim(),
          rating,
          avatarUrl: avatarUrl.trim(),
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('ege_data_last_saved', Date.now().toString());
          window.dispatchEvent(new Event('ege_data_updated'));
        }
      } else {
        setErrorMsg(data.error || 'Failed to submit feedback. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error submitting feedback. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#045494]/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="max-w-3xl w-full mx-auto flex items-center justify-center z-10 py-2">
        <div className="flex items-center gap-2 text-white">
          <div className="w-8 h-8 rounded-lg bg-[#045494] flex items-center justify-center font-bold shadow-md">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs font-extrabold tracking-wider uppercase text-blue-200">
            ELITE GLOBAL EXCELLENCE
          </span>
        </div>
      </header>

      {/* Main Form Container */}
      <main className="max-w-2xl w-full mx-auto my-auto z-10 py-6">
        <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95">
          {!submitted ? (
            <>
              <div className="text-center space-y-2 border-b border-slate-100 pb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                  PUBLIC FEEDBACK FORM
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Share Your Experience With EGE
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                  Your feedback helps us continuously elevate our international conferences, journal publishing support, and academic workshops.
                </p>
              </div>

              {errorMsg && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold p-3.5 rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1 text-xs flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#045494]" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Fatima Zahra"
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] focus:outline-none font-semibold text-slate-900 bg-white placeholder:text-slate-400 text-xs shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Designation / Role */}
                  <div>
                    <label className="block font-bold text-slate-800 mb-1 text-xs flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5 text-[#045494]" />
                      <span>Designation / Role *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Assistant Professor, Computer Science"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] focus:outline-none font-semibold text-slate-900 bg-white placeholder:text-slate-400 text-xs shadow-2xs"
                    />
                  </div>

                  {/* University / Institution */}
                  <div>
                    <label className="block font-bold text-slate-800 mb-1 text-xs flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-[#045494]" />
                      <span>University / Organization</span>
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="e.g. Universiti Malaya / IIUM"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] focus:outline-none font-medium text-slate-900 bg-white placeholder:text-slate-400 text-xs shadow-2xs"
                    />
                  </div>
                </div>

                {/* Rating Selector */}
                <div className="space-y-1.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <label className="block font-bold text-slate-800 text-xs">
                    Overall Experience Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="p-1 cursor-pointer transition transform hover:scale-110"
                      >
                        <Star
                          className={`w-6 h-6 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-[#045494] ml-2">
                      {rating} / 5 Stars
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1 text-xs flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#045494]" />
                    <span>Your Review & Testimonial *</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={quote}
                    onChange={(e) => setQuote(e.target.value)}
                    placeholder="Share your experience regarding our conferences, workshops, peer review support, or publication services..."
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#045494] focus:outline-none font-medium text-slate-900 bg-white placeholder:text-slate-400 text-xs resize-y shadow-2xs leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#045494] hover:bg-[#033b68] text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Submitting Feedback...' : 'Submit Feedback for Admin Review'}</span>
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-2">
                    Submissions are reviewed by the Elite Global Excellence editorial board before publication on the public site.
                  </p>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-8 space-y-5 animate-in zoom-in-95">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-slate-900">Thank You For Your Feedback!</h2>
                <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                  Your feedback has been successfully transmitted directly to the Elite Global Excellence admin team for review. Upon approval, your review will be displayed under the <strong>WHAT PEOPLE SAY ABOUT US</strong> section on our homepage.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setRole('');
                    setInstitution('');
                    setQuote('');
                    setRating(5);
                  }}
                  className="px-6 py-2.5 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold rounded-xl transition cursor-pointer shadow-xs"
                >
                  Submit Another Response
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="text-center text-[11px] text-slate-500 z-10 py-2 font-mono">
        © 2026 Elite Global Excellence Sdn. Bhd. (EGE). All rights reserved.
      </footer>
    </div>
  );
}
