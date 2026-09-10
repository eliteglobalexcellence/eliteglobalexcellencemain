'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Target,
  Compass,
  CheckCircle2,
  Users,
  Building2,
  Globe2,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  X
} from 'lucide-react';
import { DatabaseState, ExecutiveMember } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface AboutViewProps {
  data: DatabaseState;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ data, onSelectTab }) => {
  const [selectedMemberModal, setSelectedMemberModal] = useState<ExecutiveMember | null>(null);

  const { siteContent } = data;
  const aboutPage = siteContent?.aboutPage || initialDatabase.siteContent?.aboutPage || {};

  const heroBadge = aboutPage?.heroBadge || 'ABOUT ELITE GLOBAL EXCELLENCE';
  const heroTitle = aboutPage?.heroTitle || 'Bridging borders, building knowledge.';
  const heroSubheadline = aboutPage?.heroSubheadline || 'Empowering research. Transforming knowledge. Creating global impact.';

  const establishedBadge = aboutPage?.establishedBadge || 'ESTABLISHED 2020 · MALAYSIA';
  const overviewTitle = aboutPage?.overviewTitle || 'About Elite Global Excellence Sdn. Bhd.';
  const overviewParagraphs = (aboutPage?.overviewParagraphs && aboutPage.overviewParagraphs.length > 0)
    ? aboutPage.overviewParagraphs
    : [
      'Elite Global Excellence Sdn. Bhd. (EGE) is a Malaysia-based academic and research services company dedicated to supporting researchers, students, educators, universities, and research institutions worldwide.',
      'Our mission is to make research, academic publishing, and professional development more accessible by providing high-quality services that help individuals and institutions succeed. Headquartered in Malaysia with operational presence spanning Asia, Europe, and North America, EGE brings together an international network of distinguished academics, senior journal editors, and university leaders.',
      'Through annual flagship conferences (ICCSEIT, EGE-MLDL), indexed journal publication pathways, continuous free academic workshops, and our specialized Mock Viva defense clinic, we guide emerging and established scholars through every phase of the research lifecycle.'
    ];

  const overviewBadges = (aboutPage?.overviewBadges && aboutPage.overviewBadges.length > 0)
    ? aboutPage.overviewBadges
    : [
      'Incorporated under Companies Commission of Malaysia (SSM)',
      'Global Scholarly & Peer-Review Standards'
    ];

  const pillars = (aboutPage?.pillars && aboutPage.pillars.length > 0)
    ? aboutPage.pillars
    : [
      { title: 'Global Academic Outreach', description: 'Connecting scholars across 33+ nations with collaborative research pipelines.' },
      { title: 'Scholarly Publishing Integrity', description: 'Rigorous double-blind peer-review upholding international COPE ethics.' },
      { title: 'Postgraduate Defense Excellence', description: 'Structured mock viva defense panels led by international examiners.' }
    ];

  const missionTitle = aboutPage?.missionTitle || 'Our Mission';
  const missionText = aboutPage?.missionText || siteContent?.mission || 'To empower students, researchers, and academic institutions worldwide by providing expert research consultancy, peer-reviewed publishing assistance, high-impact conferences, and structured thesis defense coaching that transforms academic ambition into global excellence.';

  const visionTitle = aboutPage?.visionTitle || 'Our Vision';
  const visionText = aboutPage?.visionText || siteContent?.vision || 'To be the world’s most trusted catalyst for academic and research advancement—a global nexus where every researcher and institution, regardless of geography, has the guidance, network, and opportunity to publish, innovate, and lead.';

  const goalsBadge = aboutPage?.goalsBadge || 'OUR COMMITMENTS';
  const goalsTitle = aboutPage?.goalsTitle || 'Goals';
  const goalsSubtitle = aboutPage?.goalsSubtitle || 'The enduring principles guiding our research initiatives and academic partnerships.';
  const goalsList = (aboutPage?.goalsList && aboutPage.goalsList.length > 0) ? aboutPage.goalsList : (siteContent?.goals || []);

  const objectivesBadge = aboutPage?.objectivesBadge || 'HOW WE DELIVER';
  const objectivesTitle = aboutPage?.objectivesTitle || 'Objectives';
  const objectivesSubtitle = aboutPage?.objectivesSubtitle || 'Concrete programmatic actions executed across our academic divisions.';
  const objectivesList = (aboutPage?.objectivesList && aboutPage.objectivesList.length > 0) ? aboutPage.objectivesList : (siteContent?.objectives || []);

  const governanceBadge = aboutPage?.governanceBadge || 'GOVERNANCE & STRUCTURE';
  const governanceTitle = aboutPage?.governanceTitle || 'Organization Chart / Leadership';
  const governanceSubtitle = aboutPage?.governanceSubtitle || 'Clear administrative hierarchy ensuring academic rigor, ethical publishing, and international compliance.';

  const membersList: ExecutiveMember[] = (aboutPage?.governanceMembers && aboutPage.governanceMembers.length > 0)
    ? aboutPage.governanceMembers
    : (initialDatabase.siteContent?.aboutPage?.governanceMembers || []);

  // Filter executive leadership vs board members
  const ceoMember = membersList.find(m => m.category === 'CEO') || membersList[0];
  const coFounderMember = membersList.find(m => m.category === 'CO_FOUNDER') || membersList[1];
  const boardMembers = membersList.filter(m => m.id !== ceoMember?.id && m.id !== coFounderMember?.id);

  const ctaText = aboutPage.ctaText || 'Connect with EGE Leadership & Directorate';

  const getPillarIcon = (idx: number) => {
    if (idx === 0) return Globe2;
    if (idx === 1) return BookOpen;
    return GraduationCap;
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 3.1 Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {heroBadge}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{heroTitle}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {heroSubheadline}
          </p>
        </div>
      </section>

      {/* 3.2 About Company */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {establishedBadge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {overviewTitle}
            </h2>
            <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
              {overviewParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  dangerouslySetInnerHTML={{ __html: para }}
                  className="[&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
                />
              ))}
            </div>
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              {overviewBadges.map((badgeText, idx) => (
                <div key={idx} className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{badgeText}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Key Institutional Pillars
              </h3>
              <div className="space-y-4 text-xs">
                {pillars.map((pil, idx) => {
                  const IconComp = getPillarIcon(idx);
                  return (
                    <div key={pil.id || idx} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#045494] flex items-center justify-center shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900">{pil.title}</h4>
                        <p className="text-slate-500 mt-0.5">{pil.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3.3 Mission and Vision */}
      <section className="bg-slate-50/80 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{missionTitle}</h3>
              <div
                className="text-sm text-slate-600 leading-relaxed [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
                dangerouslySetInnerHTML={{ __html: missionText }}
              />
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{visionTitle}</h3>
              <div
                className="text-sm text-slate-600 leading-relaxed [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
                dangerouslySetInnerHTML={{ __html: visionText }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3.4 Goals & 3.5 Objectives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Goals (Our Commitments) */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
                {goalsBadge}
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                {goalsTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {goalsSubtitle}
              </p>
            </div>

            <div className="space-y-3">
              {goalsList.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 hover:border-blue-300 transition"
                >
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-[#045494] font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span
                    className="leading-relaxed font-medium [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
                    dangerouslySetInnerHTML={{ __html: goal }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Objectives (How We Deliver) */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
                {objectivesBadge}
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                {objectivesTitle}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {objectivesSubtitle}
              </p>
            </div>

            <div className="space-y-3">
              {objectivesList.map((obj, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 hover:border-blue-300 transition"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <span
                    className="leading-relaxed font-medium [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
                    dangerouslySetInnerHTML={{ __html: obj }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3.6 Organization Chart / Executive Leadership & Board */}
      <section className="bg-slate-50/70 border-t border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {governanceBadge}
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              {governanceTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {governanceSubtitle}
            </p>
          </div>

          {/* Executive Leadership Team Section */}
          <div className="space-y-8 mb-16">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#045494] bg-blue-100/80 px-4 py-1.5 rounded-full border border-blue-200">
                EXECUTIVE LEADERSHIP TEAM
              </span>
            </div>

            {/* CEO Card & Co-Founder Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* CEO Card */}
              {ceoMember && (
                <div className="bg-white rounded-3xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col justify-between group">
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-2xl overflow-hidden border-4 border-blue-50 shadow-md">
                      <img
                        src={ceoMember.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'}
                        alt={ceoMember.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="text-center space-y-1.5">
                      <span className="inline-block bg-blue-50 text-[#045494] font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        Chief Executive Officer
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">{ceoMember.name}</h3>
                      <p className="text-xs font-bold text-[#045494]">{ceoMember.title}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedMemberModal(ceoMember)}
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Co-Founder / Executive VP Card */}
              {coFounderMember && (
                <div className="bg-white rounded-3xl border-2 border-blue-600/30 shadow-lg hover:shadow-xl transition overflow-hidden flex flex-col justify-between group">
                  <div className="p-6 sm:p-8 space-y-4">
                    <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-2xl overflow-hidden border-4 border-blue-50 shadow-md">
                      <img
                        src={coFounderMember.photoUrl || 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800'}
                        alt={coFounderMember.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    </div>
                    <div className="text-center space-y-1.5">
                      <span className="inline-block bg-slate-100 text-slate-700 font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                        Co-Founder / Executive VP
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-slate-900">{coFounderMember.name}</h3>
                      <p className="text-xs font-bold text-[#045494]">{coFounderMember.title}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedMemberModal(coFounderMember)}
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Organizational Connecting Line */}
          <div className="flex flex-col items-center justify-center mb-10">
            <div className="w-0.5 h-12 bg-gradient-to-b from-blue-600 to-slate-400" />
            <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-md" />
            <div className="w-0.5 h-8 bg-slate-400" />
          </div>

          {/* Board of Directors Tree Section */}
          <div className="space-y-8">
            <div className="text-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-700 bg-slate-200 px-4 py-1.5 rounded-full border border-slate-300">
                BOARD OF DIRECTORS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {boardMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-md transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-blue-100 shrink-0 bg-slate-100">
                        <img
                          src={member.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#045494] uppercase bg-blue-50 px-2 py-0.5 rounded">
                          Board Member
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-1">{member.name}</h4>
                        <p className="text-[11px] font-semibold text-slate-500">{member.title}</p>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedMemberModal(member)}
                    className="w-full bg-slate-100 hover:bg-blue-50 hover:text-[#045494] text-slate-700 text-xs font-bold py-2 rounded-xl border border-slate-200 transition flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-16 text-center">
            <button
              onClick={() => onSelectTab('contact')}
              className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* MEMBER DETAIL MODAL POPUP */}
      {selectedMemberModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-blue-200 shrink-0 bg-slate-100 shadow-sm">
                  <img
                    src={selectedMemberModal.photoUrl || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800'}
                    alt={selectedMemberModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider bg-blue-100 text-[#045494] px-2.5 py-0.5 rounded-full">
                    {selectedMemberModal.category === 'CEO'
                      ? 'Chief Executive Officer'
                      : selectedMemberModal.category === 'CO_FOUNDER'
                        ? 'Co-Founder & Executive Leader'
                        : 'Board of Directors'}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">{selectedMemberModal.name}</h3>
                  <p className="text-xs font-bold text-[#045494]">{selectedMemberModal.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedMemberModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase mb-1.5">Biography & Profile</span>
                <div className="bg-white p-4 rounded-2xl border border-slate-200 whitespace-pre-wrap text-slate-800 leading-relaxed font-medium">
                  {selectedMemberModal.fullBio || ''}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedMemberModal(null)}
                className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
