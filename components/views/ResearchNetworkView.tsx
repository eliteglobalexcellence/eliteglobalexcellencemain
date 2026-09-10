'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Globe2,
  BookOpen,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Filter,
  UserPlus
} from 'lucide-react';
import { DatabaseState, ResearchMember } from '@/lib/types';

interface ResearchNetworkViewProps {
  data: DatabaseState;
  onRequestQuote: (title?: string) => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const ResearchNetworkView: React.FC<ResearchNetworkViewProps> = ({
  data,
  onRequestQuote,
  onSelectTab,
}) => {
  const { researchMembers, siteContent } = data;
  const pageContent = siteContent?.researchNetworkPage || {};

  // Combine research members from DB state and page content list without duplicates
  const dbMembers = researchMembers || [];
  const contentMembers = pageContent.membersList || [];
  const combinedMembers: ResearchMember[] = [...dbMembers];
  contentMembers.forEach((cm) => {
    if (!combinedMembers.some((m) => String(m.id) === String(cm.id))) {
      combinedMembers.push(cm);
    }
  });

  const defaultPillars = [
    {
      id: 'p1',
      title: 'Global Collaboration',
      description: 'Connecting researchers, professors, and scholars across institutions and countries to promote international knowledge exchange and collaborative research.'
    },
    {
      id: 'p2',
      title: 'Interdisciplinary Innovation',
      description: 'Bringing together expertise from multiple fields to develop comprehensive solutions for complex academic, technological, and societal challenges.'
    },
    {
      id: 'p3',
      title: 'Research Excellence',
      description: 'Supporting high-quality research through scientific methodologies, rigorous experimentation, and continuous improvement.'
    },
    {
      id: 'p4',
      title: 'Knowledge Translation',
      description: 'Transforming research findings into practical applications, technologies, publications, and solutions that benefit academia, communities and industries.'
    }
  ];

  const pillarsList = pageContent.pillars || defaultPillars;

  const defaultActivities = [
    'Research and development projects',
    'International academic collaborations',
    'Scientific publications',
    'Conference presentations',
    'Technology innovation initiatives',
    'Research mentorship programs',
    'Student and scholar development activities'
  ];

  const activitiesList = pageContent.activitiesList || defaultActivities;

  return (
    <div className="space-y-20 pb-20">
      {/* 10.1 Hero & Research Philosophy */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {pageContent.philosophyBadge || pageContent.heroBadge || 'OUR RESEARCH PHILOSOPHY'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{pageContent.philosophyTitle || pageContent.heroTitle || 'Collaborate. Innovate. Impact.'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {pageContent.philosophyDescription || pageContent.heroDescription || 'EGE follows a collaborative research model where researchers from different backgrounds work together to exchange knowledge, develop innovative methodologies, and create impactful solutions.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onSelectTab('contact')}
              className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Apply for Research Network Membership</span>
            </button>
          </div>
        </div>
      </section>

      {/* 10.2 Four Research Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillarsList.map((pillar, idx) => (
            <div key={pillar.id || idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center font-bold text-sm">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{pillar.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10.3 Our Research Activities */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              {pageContent.activitiesBadge || 'OUR RESEARCH ACTIVITIES'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {pageContent.activitiesTitle || 'The EGE Global Research & Innovation Network actively contributes to:'}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
              {activitiesList.map((act, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10.4 Member Directory Section Header & Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {pageContent.membersTitle || 'Our Research Members'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {pageContent.membersSubtitle || 'Professors, researchers, and research assistants collaborating across disciplines and borders.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {combinedMembers.map((member) => {
            const memberImage = member.imageUrl || member.photoUrl || member.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
            return (
              <div
                key={member.id}
                className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-md transition flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 group-hover:scale-105 transition-transform duration-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={memberImage}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-bold text-[#045494] uppercase bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                          {member.role || 'MEMBER'}
                        </span>
                        {member.country && (
                          <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                            <Globe2 className="w-3 h-3 text-blue-500" />
                            <span>{member.country}</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm truncate group-hover:text-[#045494] transition">
                        {member.name}
                      </h3>
                      {member.institution && (
                        <p className="text-[11px] text-slate-500 truncate leading-tight font-medium mt-0.5">
                          {member.institution}
                        </p>
                      )}
                    </div>
                  </div>

                  {member.specialization && member.specialization.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {member.specialization.map((spec, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-50 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-100"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end text-xs mt-auto">
                  <button
                    onClick={() => onSelectTab('contact')}
                    className="text-[#045494] font-bold hover:underline cursor-pointer flex items-center gap-1 text-xs"
                  >
                    <span>Contact Member</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10.5 Bottom Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#045494] to-[#033b68] rounded-3xl p-8 sm:p-12 text-white text-center space-y-3 shadow-xl">
          <h3 className="text-2xl sm:text-4xl font-black">
            {pageContent.bannerTitle || pageContent.bannerText || 'EGE Global Research & Innovation Network'}
          </h3>
          <p className="text-sm sm:text-base text-blue-100 font-medium">
            {pageContent.bannerSubtitle || pageContent.bannerSubtext || 'Connecting Global Expertise, Advancing Research, Creating Impact.'}
          </p>
        </div>
      </section>
    </div>
  );
};
