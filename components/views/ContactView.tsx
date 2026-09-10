'use client';

import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Globe2,
  Loader2,
  Building2,
  Share2,
  MessageCircle,
  Video,
  ExternalLink
} from 'lucide-react';
import { DatabaseState } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface ContactViewProps {
  data: DatabaseState;
  onRefreshData?: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ data, onRefreshData }) => {
  const pageContent = {
    ...initialDatabase.siteContent.contactPage,
    ...(data.siteContent?.contactPage || {}),
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('GENERAL_CONTACT');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const socialLinks = pageContent?.socialLinks || [
    { id: 'soc-1', platform: 'Facebook', url: 'https://facebook.com/eliteglobalexcellence' },
    { id: 'soc-2', platform: 'Instagram', url: 'https://instagram.com/eliteglobalexcellence' },
    { id: 'soc-3', platform: 'YouTube', url: 'https://youtube.com/@eliteglobalexcellence' },
    { id: 'soc-4', platform: 'Telegram', url: 'https://t.me/eliteglobalexcellence' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Name, Email, and Message are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/inbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: inquiryType,
          name,
          email,
          phone,
          subject: subject || `${inquiryType}: Inbound Message from ${name}`,
          message,
          metadata: {
            source: 'Website Contact Page',
            isContactPageSubmission: true,
            inquiryType,
          },
        }),
      });

      const resData = await res.json();
      if (res.ok) {
        setSubmitted(true);
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new Event('ege_data_updated'));
          try {
            localStorage.setItem('ege_data_updated', String(Date.now()));
          } catch (e) { }
        }
        if (onRefreshData) onRefreshData();
      } else {
        setError(resData.error || 'Failed to send message.');
      }
    } catch (err) {
      setError('Network communication failure. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getSocialIcon = (platform: string) => {
    const lower = platform.toLowerCase();
    if (lower.includes('facebook')) return <Share2 className="w-4 h-4 text-blue-600" />;
    if (lower.includes('instagram')) return <Share2 className="w-4 h-4 text-pink-600" />;
    if (lower.includes('youtube')) return <Video className="w-4 h-4 text-red-600" />;
    if (lower.includes('telegram')) return <MessageCircle className="w-4 h-4 text-sky-500" />;
    return <Globe2 className="w-4 h-4 text-[#045494]" />;
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 14.1 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {pageContent?.heroBadge || 'GET IN TOUCH'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{pageContent?.heroTitle || 'Send Us a Message'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {pageContent?.heroDescription ||
              'Have a question, need assistance, or want to work with EGE? Send us a message and our team will get back to you.'}
          </p>
        </div>
      </section>

      {/* 14.2 & 14.3 Contact Channels & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left info column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                {pageContent?.correspondenceBadge || 'Official Correspondence'}
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">General Communications</span>
                    <a href={`mailto:${pageContent?.generalEmail || 'info@eliteglobalexcellence.com'}`} className="text-[#045494] hover:underline font-medium">
                      {pageContent?.generalEmail || 'info@eliteglobalexcellence.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Editorial & Publications Office</span>
                    <a href={`mailto:${pageContent?.editorialEmail || 'editorial@eliteglobalexcellence.com'}`} className="text-slate-600 hover:underline">
                      {pageContent?.editorialEmail || 'editorial@eliteglobalexcellence.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center shrink-0">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Conferences Directorate</span>
                    <a href={`mailto:${pageContent?.conferencesEmail || 'conferences@eliteglobalexcellence.com'}`} className="text-slate-600 hover:underline">
                      {pageContent?.conferencesEmail || 'conferences@eliteglobalexcellence.com'}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Headquarters & Registry</span>
                    <p className="text-slate-600 leading-relaxed mt-0.5 whitespace-pre-line">
                      {pageContent?.headquartersAddress || 'Elite Global Excellence Sdn. Bhd.\nKuala Lumpur & Johor Bahru, Malaysia'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-sm">Support Availability</span>
                    <p className="text-slate-500 mt-0.5">
                      {pageContent?.supportHours || 'Monday – Friday: 9:00 AM – 6:00 PM (MYT / UTC+8)'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Channels */}
            {socialLinks && socialLinks.length > 0 && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-100 pb-2">
                  Connect via Official Social Platforms
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {socialLinks.map((soc) => (
                    <a
                      key={soc.id}
                      href={soc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-blue-300 bg-slate-50/60 text-xs font-bold text-slate-800 transition cursor-pointer"
                    >
                      {getSocialIcon(soc.platform)}
                      <span className="truncate">{soc.platform}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400 ml-auto shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right form column */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">Message Transmitted Successfully</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Thank you, <strong className="text-slate-900">{name}</strong>. Your message has been routed to the EGE Central Inbox.
                  </p>
                  <p className="text-xs text-slate-500">
                    An EGE directorate officer will respond to <strong>{email}</strong> within 24 hours.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="bg-[#045494] text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">
                      {pageContent?.inboundPortalTitle || 'Direct Inbound Portal'}
                    </h3>
                    <p className="text-slate-500">
                      {pageContent?.inboundPortalDescription || 'All submissions are monitored and assigned directly within the EGE Central Inbox.'}
                    </p>
                  </div>

                  {error && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {pageContent?.nameLabel || 'Full Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={pageContent?.namePlaceholder || 'e.g. Dr. Aiman Azman'}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {pageContent?.emailLabel || 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={pageContent?.emailPlaceholder || 'e.g. aiman@utm.my'}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {pageContent?.phoneLabel || 'Phone / WhatsApp'}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder={pageContent?.phonePlaceholder || 'e.g. +60 12-345 6789'}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        {pageContent?.categoryLabel || 'Inquiry Category'}
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl bg-white text-slate-900 font-medium"
                      >
                        <option value="GENERAL_CONTACT">General Information</option>
                        <option value="CONFERENCE_INQUIRY">Conference Paper / Registration</option>
                        <option value="MOCK_VIVA_BOOKING">Mock Viva Defense Inquiry</option>
                        <option value="QUOTATION">Publication Assistance Quotation</option>
                        <option value="WORKSHOP_REGISTRATION">Workshops & Training Inquiries</option>
                        <option value="COLLABORATION">Institutional MoU / Collaboration</option>
                        <option value="JOB_APPLICATION">Career & Talent Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {pageContent?.subjectLabel || 'Subject'}
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder={pageContent?.subjectPlaceholder || 'e.g. Inquiry regarding ICCSEIT 2026 Paper Submission'}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      {pageContent?.messageLabel || 'Message Details *'}
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={pageContent?.messagePlaceholder || 'Please describe your academic objectives, institutional background, or specific assistance required...'}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-slate-900 bg-white placeholder:text-slate-400 font-medium"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Transmitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Submit Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
