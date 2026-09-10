'use client';

import React from 'react';
import {
  Globe2,
  Award,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Sparkles,
  Users,
  CheckCircle2,
  MapPin,
  Linkedin
} from 'lucide-react';
import { DatabaseState, Ambassador } from '@/lib/types';

interface AmbassadorsViewProps {
  data: DatabaseState;
  onSelectAmbassador: (ambassador: Ambassador) => void;
  onRequestQuote: (title?: string) => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const AmbassadorsView: React.FC<AmbassadorsViewProps> = ({
  data,
  onSelectAmbassador,
  onRequestQuote,
  onSelectTab,
}) => {
  const { ambassadors, siteContent } = data;
  const pageContent = siteContent?.ambassadorsPage || {};

  const roleHighlights = pageContent.responsibilitiesList || [
    {
      number: '01',
      title: 'Global Conference Promotion',
      description: 'Representing EGE academic conferences and calling for papers within regional university faculties.',
    },
    {
      number: '02',
      title: 'Peer Review & Technical Program Committee',
      description: 'Participating on double-blind review committees and evaluating cutting-edge scientific manuscripts.',
    },
    {
      number: '03',
      title: 'Institutional Linkages & MoUs',
      description: 'Connecting university leadership and research institutes with bilateral EGE academic partnership agreements.',
    },
    {
      number: '04',
      title: 'Doctoral Mentorship & Defense Panels',
      description: 'Serving as external examiners and guest speakers for mock viva defense simulations and workshops.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 9.1 Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {pageContent.heroBadge || 'GLOBAL ADVISORY BOARD'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{pageContent.heroTitle || 'Global Advisory Board'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {pageContent.heroDescription || 'Meet our distinguished Global Advisory Board members representing prestigious universities worldwide, advancing collaborative research and scholarly excellence across international borders'}
          </p>
        </div>
      </section>

      {/* 9.2 Ambassador Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ambassadors.map((ambassador) => {
            const memberImage = ambassador.imageUrl || ambassador.photoUrl || ambassador.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
            const linkedinLink = ambassador.linkedinUrl || ambassador.linkedin;
            return (
              <div
                key={ambassador.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                {/* Big Image Top */}
                <div className="relative w-full h-72 sm:h-80 bg-slate-100 overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={memberImage}
                    alt={ambassador.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#045494] bg-white/95 backdrop-blur-md px-3 py-1 rounded-full shadow-sm">
                    <Globe2 className="w-3.5 h-3.5 text-[#045494]" />
                    <span>{ambassador.country}</span>
                  </span>
                </div>

                {/* Details Container Below Image */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-black text-slate-900 text-lg leading-snug group-hover:text-[#045494] transition">
                        {ambassador.name}
                      </h3>
                      <p className="text-xs font-bold text-[#045494] mt-0.5 leading-relaxed">
                        {ambassador.title}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {ambassador.bio}
                    </p>

                    {ambassador.researchInterests && ambassador.researchInterests.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {ambassador.researchInterests.slice(0, 3).map((item, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-50 text-slate-700 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-slate-200/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer: Read More & LinkedIn Link (Connect button removed) */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <button
                      onClick={() => onSelectAmbassador(ambassador)}
                      className="text-xs font-bold text-[#045494] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read More Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {linkedinLink ? (
                      <a
                        href={linkedinLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#0a66c2] hover:bg-[#004182] text-white rounded-xl transition flex items-center gap-1.5 text-xs font-bold shadow-xs"
                        title="View LinkedIn Profile"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    ) : (
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-slate-100 hover:bg-[#0a66c2] text-slate-600 hover:text-white rounded-xl transition flex items-center gap-1.5 text-xs font-bold"
                        title="LinkedIn Profile"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 9.3 Ambassador Role & Responsibilities */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {pageContent.responsibilitiesBadge || 'LEADERSHIP IN ACTION'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {pageContent.responsibilitiesTitle || 'Role & Responsibilities of EGE Global Advisory Board'}
            </h2>
            <p className="text-xs text-slate-500">
              {pageContent.responsibilitiesSubtitle || 'Board members are vital leaders expanding high-integrity scholarly communities worldwide.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {roleHighlights.map((role, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#045494] font-bold text-xs flex items-center justify-center">
                  {role.number || `0${idx + 1}`}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-2">{role.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.4 Join the Ambassador Program */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#045494] to-[#033b68] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-[10px] font-mono tracking-widest text-blue-200 uppercase font-bold">
              {pageContent.callBadge || 'CALL FOR DISTINGUISHED SCHOLARS'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              {pageContent.callTitle || 'Join EGE Global Advisory Board'}
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              {pageContent.callDescription || 'Are you a faculty member, senior researcher, or academic leader passionate about international collaboration? Join our Global Advisory Board to expand research networks and co-host international events in your region.'}
            </p>
          </div>
          {pageContent.applyFormLink ? (
            <a
              href={pageContent.applyFormLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-blue-50 text-[#045494] font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs transition cursor-pointer shrink-0 inline-flex items-center gap-1.5"
            >
              <span>{pageContent.applyButtonText || 'Apply for Global Advisory Board'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <button
              onClick={() => onSelectTab('contact')}
              className="bg-white hover:bg-blue-50 text-[#045494] font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs transition cursor-pointer shrink-0"
            >
              {pageContent.applyButtonText || 'Apply for Global Advisory Board'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
