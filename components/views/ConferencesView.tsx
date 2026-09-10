'use client';

import React from 'react';
import {
  Calendar,
  MapPin,
  FileText,
  Users,
  Award,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Send,
  Globe2
} from 'lucide-react';
import { DatabaseState, EventItem } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface ConferencesViewProps {
  data: DatabaseState;
  onOpenEvent?: (event: EventItem) => void;
  onRequestQuote?: (serviceTitle?: string) => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const ConferencesView: React.FC<ConferencesViewProps> = ({
  data,
  onOpenEvent,
  onRequestQuote,
  onSelectTab,
}) => {
  const pageContent = data.siteContent?.conferencesPage || initialDatabase.siteContent.conferencesPage;

  const activeConfs = pageContent?.activeConferences || [
    {
      id: 'conf-act-1',
      badge: 'Flagship EGE Annual Conference',
      name: 'ICCSEIT 2026: 4th International Conference on Computer Science, Engineering & Information Technology',
      format: 'Hybrid Format · In-Person',
      location: '(Kuala Lumpur, Malaysia) & Virtual Live Stream Worldwide',
      submitPaperUrl: 'https://www.eliteglobalexcellence.com/submit',
      dates: 'October 24–25, 2026',
      datesSubtitle: '2 Full Conference Days',
      submissionDeadline: 'August 15, 2026',
      deadlineSubtitle: 'Double-Blind Peer Review',
      notificationDate: 'September 10, 2026',
      notificationSubtitle: 'With Reviewer Comments',
      proceedings: 'Scopus / WoS Indexed',
      proceedingsSubtitle: 'Crossref DOI Assigned',
      themeText: 'Artificial Intelligence, Generative Models & LLMs, Cybersecurity, Computer Vision, IoT, Cloud Computing, Autonomous Systems',
      coOrganizedText: 'Co-Organized with University Partners across Malaysia, Portugal, and the UK.',
      visitNowUrl: 'https://www.eliteglobalexcellence.com'
    }
  ];

  const futureConfs = pageContent?.futureConferences || [
    {
      id: 'conf-fut-1',
      title: 'EGE-MLDL: International Conference on Machine Learning & Deep Learning',
      description: 'Focused specifically on theoretical advancements and practical implementations in deep neural networks, transformer architectures, reinforcement learning, computer vision, natural language understanding, and ethical AI.',
      highlights: [
        'Keynotes from leading global AI researchers',
        'Hands-on algorithmic workshops & code tutorials',
        'Best Paper & Best Presentation Awards'
      ],
      date: 'Dec 12–13, 2026',
      inquireActionUrl: 'contact'
    }
  ];

  const timelineRows = pageContent?.timelineRows || [
    {
      id: 'row-1',
      title: 'ICCSEIT 2026 (4th Edition)',
      subtitle: 'Computer Science & IT',
      eventDate: 'Oct 24–25, 2026',
      paperDeadline: 'Aug 15, 2026',
      actionText: 'Submit Paper',
      actionUrl: 'contact'
    },
    {
      id: 'row-2',
      title: 'IURC 2026',
      subtitle: 'Undergraduate Research',
      eventDate: 'Nov 05, 2026',
      paperDeadline: 'Sep 20, 2026',
      actionText: 'Submit Abstract',
      actionUrl: 'contact'
    },
    {
      id: 'row-3',
      title: 'EGE-MLDL 2026',
      subtitle: 'Machine Learning & Deep Learning',
      eventDate: 'Dec 12–13, 2026',
      paperDeadline: 'Oct 10, 2026',
      actionText: 'Submit Paper',
      actionUrl: 'contact'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {pageContent?.heroBadge || 'ACADEMIC GATHERINGS'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{pageContent?.heroTitle || 'International Research Conferences'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {pageContent?.heroDescription || 'Flagship annual academic gatherings uniting scholars, doctoral candidates, keynote speakers, and technological innovators across the globe.'}
          </p>
        </div>
      </section>

      {/* 2. Active Conferences Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              ACTIVE CONFERENCES
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Featured Active Conference
            </h2>
          </div>
        </div>

        {activeConfs.map((conf) => (
          <div key={conf.id} className="bg-white rounded-3xl border-2 border-blue-200/80 shadow-md overflow-hidden space-y-0">
            <div className="bg-gradient-to-r from-[#045494] to-[#033b68] text-white p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="bg-white/20 text-white font-mono text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                  {conf.badge || 'Flagship EGE Annual Conference'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black">
                  {conf.name}
                </h2>
                {(conf.format || conf.location) && (
                  <p className="text-xs text-blue-100">
                    {conf.format} {conf.location ? `· ${conf.location}` : ''}
                  </p>
                )}
              </div>
              <div className="shrink-0 flex items-center gap-3">
                {conf.submitPaperUrl ? (
                  <a
                    href={conf.submitPaperUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-[#045494] hover:bg-blue-50 font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs flex items-center gap-1.5"
                  >
                    <span>Submit Paper / Abstract</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => onSelectTab('contact')}
                    className="bg-white text-[#045494] hover:bg-blue-50 font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
                  >
                    Submit Paper / Abstract
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Conference Dates</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5">{conf.dates || 'October 24–25, 2026'}</div>
                  {conf.datesSubtitle && <div className="text-[11px] text-blue-700 font-medium mt-1">{conf.datesSubtitle}</div>}
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Submission Deadline</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5">{conf.submissionDeadline || 'August 15, 2026'}</div>
                  {conf.deadlineSubtitle && <div className="text-[11px] text-amber-600 font-medium mt-1">{conf.deadlineSubtitle}</div>}
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Notification of Acceptance</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5">{conf.notificationDate || 'September 10, 2026'}</div>
                  {conf.notificationSubtitle && <div className="text-[11px] text-emerald-600 font-medium mt-1">{conf.notificationSubtitle}</div>}
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="text-slate-400 font-medium">Proceedings Publication</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5">{conf.proceedings || 'Scopus / WoS Indexed'}</div>
                  {conf.proceedingsSubtitle && <div className="text-[11px] text-[#045494] font-medium mt-1">{conf.proceedingsSubtitle}</div>}
                </div>
              </div>

              {conf.themeText && (
                <div className="space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm">Conference Theme & Focus Scope</h4>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
                    {conf.themeText}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  {conf.coOrganizedText || 'Co-Organized with University Partners across Malaysia, Portugal, and the UK.'}
                </div>
                <div className="flex items-center gap-3">
                  {conf.visitNowUrl && (
                    <a
                      href={conf.visitNowUrl.startsWith('http') ? conf.visitNowUrl : `https://${conf.visitNowUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Visit Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => onSelectTab('contact')}
                    className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
                  >
                    Direct Inquiry
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 3. Future Conferences Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
            FUTURE CONFERENCES
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Upcoming & Future Symposia
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {futureConfs.map((fc) => (
            <div key={fc.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-[#045494] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    Future Event
                  </span>
                  {fc.date && <span className="text-xs font-mono text-slate-500 font-semibold">{fc.date}</span>}
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {fc.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {fc.description}
                </p>
                {fc.highlights && fc.highlights.length > 0 && (
                  <div className="space-y-1.5 pt-2 text-xs text-slate-700">
                    {fc.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">EGE Academic Portfolio</span>
                <button
                  onClick={() => onSelectTab(fc.inquireActionUrl || 'contact')}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
                >
                  Inquire Submission
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Annual Timeline Calendar Section */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {pageContent?.timelineBadge || 'ANNUAL TIMELINE'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {pageContent?.timelineTitle || 'Calendar of Academic Deadlines'}
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-12 p-4 font-bold bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                <div className="col-span-5 sm:col-span-4">Conference / Symposium</div>
                <div className="col-span-3 sm:col-span-3">Event Date</div>
                <div className="col-span-4 sm:col-span-3">Paper Deadline</div>
                <div className="hidden sm:block sm:col-span-2 text-right">Action</div>
              </div>

              {timelineRows.map((row) => (
                <div key={row.id} className="grid grid-cols-12 p-4 items-center hover:bg-slate-50/80 transition">
                  <div className="col-span-5 sm:col-span-4">
                    <div className="font-bold text-slate-900">{row.title}</div>
                    {row.subtitle && <div className="text-[11px] text-slate-500">{row.subtitle}</div>}
                  </div>
                  <div className="col-span-3 sm:col-span-3 text-slate-700 font-medium">{row.eventDate}</div>
                  <div className="col-span-4 sm:col-span-3 text-amber-700 font-semibold">{row.paperDeadline}</div>
                  <div className="hidden sm:block sm:col-span-2 text-right">
                    <button
                      onClick={() => onSelectTab(row.actionUrl || 'contact')}
                      className="text-[#045494] font-bold hover:underline cursor-pointer"
                    >
                      {row.actionText || 'Submit Paper'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
