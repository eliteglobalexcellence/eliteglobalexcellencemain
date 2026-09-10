'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  ArrowRight,
  BookOpen,
  Search,
  Sparkles,
  UserCheck,
  MapPin,
  Tag,
  Check,
  X,
  ExternalLink
} from 'lucide-react';
import { DatabaseState, Workshop } from '@/lib/types';
import { WorkshopAttendanceModal } from '@/components/modals/WorkshopAttendanceModal';

interface WorkshopsViewProps {
  data: DatabaseState;
  onOpenWorkshopReg: (workshop?: Workshop | null, title?: string, isCustomRequest?: boolean) => void;
  onOpenCertificateVerify: () => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const WorkshopsView: React.FC<WorkshopsViewProps> = ({
  data,
  onOpenWorkshopReg,
  onOpenCertificateVerify,
  onSelectTab,
}) => {
  const { workshops, siteContent } = data;
  const wm = siteContent?.workshopManagement || {};

  const [filterType, setFilterType] = useState<'ALL' | 'UPCOMING' | 'PAST'>('ALL');
  const [selectedWorkshopModal, setSelectedWorkshopModal] = useState<Workshop | null>(null);
  const [attendanceModalWorkshop, setAttendanceModalWorkshop] = useState<Workshop | null>(null);

  // Check URL query param for ?attend=WORKSHOP_ID
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const attendParam = urlParams.get('attend');
      if (attendParam) {
        const found = workshops.find(
          (w) => String(w.workshopId).toUpperCase() === attendParam.toUpperCase() ||
            String(w.id).toUpperCase() === attendParam.toUpperCase() ||
            `EGEW${w.id}`.toUpperCase() === attendParam.toUpperCase()
        );
        if (found) {
          setAttendanceModalWorkshop(found);
        } else if (workshops.length > 0) {
          setAttendanceModalWorkshop(workshops[0]);
        }
      }
    }
  }, [workshops]);

  // Helper to check if a date is past
  const isPastWorkshop = (ws: Workshop) => {
    if (ws.status === 'PAST') return true;
    if (!ws.date) return false;
    const parsedDate = new Date(ws.date);
    if (!isNaN(parsedDate.getTime())) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return parsedDate < today;
    }
    return false;
  };

  const upcomingWorkshops = workshops.filter((w) => !isPastWorkshop(w));
  const pastWorkshops = workshops.filter((w) => isPastWorkshop(w));

  const popularTopics = wm.topicsList || [
    {
      category: 'Research Methodology',
      title: 'Systematic Literature Review (SLR) with PRISMA & Bibliometrics',
      description: 'Conducting structured bibliometric mapping using VOSviewer, Biblioshiny, and PRISMA 2020 protocol.',
    },
    {
      category: 'Statistical Analysis',
      title: 'Quantitative Data Analysis using SmartPLS 4 & SEM',
      description: 'Structural equation modeling, bootstrapping, mediating-moderating effect hypotheses testing.',
    },
    {
      category: 'Artificial Intelligence',
      title: 'Hands-on Deep Learning with PyTorch & Transformers',
      description: 'Fine-tuning modern foundation models, attention layers, and GPU accelerated workflows.',
    },
    {
      category: 'Publishing Tools',
      title: 'LaTeX for Academic Publishing & Elsevier/IEEE Templates',
      description: 'Overleaf workflows, BibTeX reference databases, mathematical equation typesetting and vector figures.',
    },
    {
      category: 'Scholarly Writing',
      title: 'Mastering the Peer-Review Process & Rebuttal Strategies',
      description: 'Navigating Revise & Resubmit (R&R), point-by-point author rebuttal letters, and ethical disclosures.',
    },
    {
      category: 'Interdisciplinary AI',
      title: 'Applied Machine Learning for Non-CS Researchers',
      description: 'Demystifying regression, classification, random forests, and scikit-learn for healthcare and social sciences.',
    },
  ];

  return (
    <div className="space-y-16 pb-20 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100 shadow-2xs">
            {wm.heroBadge || 'CONTINUOUS LEARNING'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{wm.heroTitle || 'Free Workshops, Seminars & Professional Training'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto">
            {wm.heroDescription || 'Accessible world-class academic masterclasses, research methodology workshops, and custom institutional training designed to upskill researchers across all career stages.'}
          </p>
        </div>
      </section>

      {/* 2. ACTION & FILTER BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            <button
              onClick={() => setFilterType('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap ${filterType === 'ALL' ? 'bg-[#045494] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              All Programs ({workshops.length})
            </button>
            <button
              onClick={() => setFilterType('UPCOMING')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap ${filterType === 'UPCOMING' ? 'bg-[#045494] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              Upcoming ({upcomingWorkshops.length})
            </button>
            <button
              onClick={() => setFilterType('PAST')}
              className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition whitespace-nowrap ${filterType === 'PAST' ? 'bg-[#045494] text-white shadow-xs' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              3. Past Archive ({pastWorkshops.length})
            </button>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onOpenCertificateVerify}
              className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer shadow-2xs transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verify Digital Certificate</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. UPCOMING WORKSHOPS SECTION */}
      {(filterType === 'ALL' || filterType === 'UPCOMING') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#045494]" />
                <span>Upcoming Workshops, Seminars & Professional Training Programs</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Explore active masterclasses and reserve your seat.</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full">
              {upcomingWorkshops.length} Active Events
            </span>
          </div>

          {upcomingWorkshops.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-2">
              <Calendar className="w-10 h-10 mx-auto text-slate-400" />
              <p className="text-sm font-bold">No upcoming workshops scheduled at the moment.</p>
              <p className="text-xs">Check back soon for new additions or explore our Past Archive below.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingWorkshops.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#045494] hover:shadow-lg transition flex flex-col justify-between group"
                >
                  <div>
                    {/* INSTAGRAM SQUARE COVER IMAGE */}
                    <div className="relative aspect-square bg-slate-900 overflow-hidden">
                      <img
                        src={ws.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
                        alt={ws.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="bg-[#045494] text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md">
                            {ws.workshopId || `EGEW${ws.id}`}
                          </span>
                          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase shadow-md">
                            {ws.fee || (ws.isFree ? 'Free Access' : 'Paid')}
                          </span>
                        </div>

                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                          {ws.mode || 'Online & Physical'}
                        </span>
                        <h3 className="text-base font-extrabold leading-snug line-clamp-2">
                          {ws.title}
                        </h3>
                      </div>
                    </div>

                    {/* DETAILS BODY */}
                    <div className="p-5 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Date</span>
                          <span className="font-bold text-slate-800">{ws.date || 'TBA'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Time</span>
                          <span className="font-bold text-slate-800">{ws.time || 'TBA'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Mode</span>
                          <span className="font-bold text-slate-800">{ws.mode || 'Online (Zoom)'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Venue</span>
                          <span className="font-bold text-slate-800">{ws.venue || '—'}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {ws.description}
                      </p>

                      {/* OBJECTIVES PREVIEW */}
                      {ws.objectives && ws.objectives.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-bold text-[#045494] uppercase tracking-wider block">
                            Key Objectives ({ws.objectives.length})
                          </span>
                          <ul className="space-y-1">
                            {ws.objectives.slice(0, 3).map((obj, i) => (
                              <li key={i} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="line-clamp-1">{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedWorkshopModal(ws)}
                      className="flex-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer text-center"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => onOpenWorkshopReg(ws, ws.title)}
                      className="flex-1 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer text-center shadow-xs"
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 4. PAST ARCHIVE SECTION */}
      {(filterType === 'ALL' || filterType === 'PAST') && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-slate-600" />
                <span>3. Past Workshops & Training Archive</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Concluded masterclasses with verified digital certificate validation.</p>
            </div>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">
              {pastWorkshops.length} Past Records
            </span>
          </div>

          {pastWorkshops.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-2">
              <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
              <p className="text-sm font-bold">No past workshop records in archive yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastWorkshops.map((ws) => (
                <div
                  key={ws.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-slate-400 hover:shadow-md transition flex flex-col justify-between group"
                >
                  <div>
                    {/* INSTAGRAM SQUARE COVER POSTER IMAGE */}
                    <div className="relative aspect-square bg-slate-900 overflow-hidden">
                      <img
                        src={ws.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
                        alt={ws.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                        <span className="bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-md font-mono">
                          {ws.workshopId || `EGEW${ws.id}`}
                        </span>
                        <span className="bg-slate-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase shadow-md">
                          Concluded
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                          {ws.mode || 'Online Masterclass'}
                        </span>
                        <h3 className="text-base font-extrabold leading-snug line-clamp-2">
                          {ws.title}
                        </h3>
                      </div>
                    </div>

                    {/* DETAILS BODY */}
                    <div className="p-5 space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Concluded Date</span>
                          <span className="font-bold text-slate-800">{ws.date || 'Past Session'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 block uppercase">Status</span>
                          <span className="font-bold text-slate-600">Archived</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {ws.description}
                      </p>
                    </div>
                  </div>

                  {/* FOOTER ACTIONS */}
                  <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedWorkshopModal(ws)}
                      className="w-full bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer text-center"
                    >
                      View Archive Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 5. PHILOSOPHY CARD */}
      <section className="bg-slate-50/80 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-900 via-[#045494] to-blue-800 rounded-3xl p-8 lg:p-12 text-white space-y-4 shadow-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span className="text-xs font-extrabold uppercase tracking-wider text-blue-200">
                {wm.philosophyBadge || 'OUR COMMITMENT TO DEMOCRATIZING RESEARCH'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black">
              {wm.philosophyTitle || 'EGE Free Academic Learning Philosophy'}
            </h2>
            <p className="text-sm sm:text-base text-blue-100 leading-relaxed max-w-3xl">
              {wm.philosophyDescription || 'High fees should never stand between a dedicated scholar and mastery of empirical research tools. That is why Elite Global Excellence conducts selected zero-cost, high-impact virtual workshops every year. From early-career researchers in developing nations to faculty pursuing top-tier publications, our sessions equip participants with practical tools, live Q&A, and verified digital certificates.'}
            </p>
          </div>
        </div>
      </section>

      {/* 6. POPULAR WORKSHOP TOPICS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {wm.topicsBadge || 'CURRICULUM HIGHLIGHTS'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {wm.topicsTitle || 'Popular Workshop Topics'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {wm.topicsSubtitle || 'Field-tested curriculum delivered by active journal reviewers and university educators.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularTopics.map((top, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3 hover:border-[#045494] hover:shadow-md transition group"
            >
              <span className="text-[10px] font-extrabold text-[#045494] uppercase bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                {top.category}
              </span>
              <h4 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#045494] transition">
                {top.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {top.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. CUSTOMIZED TRAINING & VERIFIED CREDENTIALING */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Custom Training Card */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-[#045494] transition">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {wm.bespokeTitle || 'Customized Training for Universities & Organizations'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {wm.bespokeDescription || 'We design and deliver bespoke training tracks for faculties, research centers, and government bodies. Syllabus, schedule, hands-on dataset exercises, and assessment rubrics are matched exactly to your department’s KPIs.'}
            </p>
          </div>

          {/* Credentialing Banner */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-emerald-500 transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              {wm.credentialingTitle || 'Verified Digital Credentialing'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {wm.credentialingDescription || 'Every EGE workshop participant receives a uniquely serialized, QR-coded digital Certificate of Completion. Academic institutions and hiring committees can independently authenticate credentials in real-time through our public verification portal.'}
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenCertificateVerify}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer shadow-md"
              >
                {wm.credentialingButtonText || 'Launch Verification Portal'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* DETAILED WORKSHOP MODAL */}
      {selectedWorkshopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden relative max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedWorkshopModal(null)}
              className="absolute top-4 right-4 bg-slate-900/60 text-white hover:bg-slate-900 p-1.5 rounded-full transition cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="overflow-y-auto">
              <div className="relative aspect-square sm:aspect-video bg-slate-900">
                <img
                  src={selectedWorkshopModal.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedWorkshopModal.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#045494] text-white text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase font-mono">
                      {selectedWorkshopModal.workshopId || `EGEW${selectedWorkshopModal.id}`}
                    </span>
                    {isPastWorkshop(selectedWorkshopModal) && (
                      <span className="bg-slate-700/90 text-slate-200 text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase">
                        Concluded Session
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-extrabold leading-snug">{selectedWorkshopModal.title}</h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Date</span>
                    <span className="font-bold text-slate-900">{selectedWorkshopModal.date || 'TBA'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Time</span>
                    <span className="font-bold text-slate-900">{selectedWorkshopModal.time || 'TBA'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Mode</span>
                    <span className="font-bold text-slate-900">{selectedWorkshopModal.mode || 'Online'}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">Fee</span>
                    <span className="font-bold text-emerald-600">{selectedWorkshopModal.fee || 'Free'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Workshop Description</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {selectedWorkshopModal.description}
                  </p>
                </div>

                {selectedWorkshopModal.objectives && selectedWorkshopModal.objectives.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#045494]">Program Objectives</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedWorkshopModal.objectives.map((obj, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedWorkshopModal(null)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Close
                  </button>
                  {!isPastWorkshop(selectedWorkshopModal) ? (
                    <button
                      onClick={() => {
                        const ws = selectedWorkshopModal;
                        setSelectedWorkshopModal(null);
                        onOpenWorkshopReg(ws, ws.title);
                      }}
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md transition cursor-pointer"
                    >
                      Register Now
                    </button>
                  ) : (
                    <span className="bg-slate-100 text-slate-500 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl">
                      Registration Closed (Archive Only)
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* WORKSHOP ATTENDANCE SUBMISSION MODAL */}
      <WorkshopAttendanceModal
        isOpen={!!attendanceModalWorkshop}
        onClose={() => setAttendanceModalWorkshop(null)}
        workshop={attendanceModalWorkshop}
        data={data}
        onSuccess={() => {
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('ege_data_updated'));
          }
        }}
      />
    </div>
  );
};
