'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Download,
  ShieldCheck,
  Users,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Sparkles,
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import { DatabaseState } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface MockVivaViewProps {
  data: DatabaseState;
  onOpenBooking: (packageName?: string) => void;
  onOpenBrochure: () => void;
  onRequestQuote: (title?: string) => void;
}

export const MockVivaView: React.FC<MockVivaViewProps> = ({
  data,
  onOpenBooking,
  onOpenBrochure,
  onRequestQuote,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const mockVivaPage = data.siteContent?.mockVivaPage || initialDatabase.siteContent.mockVivaPage || {};

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const realitiesItems = mockVivaPage.realitiesItems || [
    {
      title: 'Examiner Questioning Shock',
      description: 'Unrehearsed candidates often freeze when external examiners aggressively interrogate underlying assumptions or edge cases.'
    },
    {
      title: 'Methodology Defense Gaps',
      description: 'Failure to justify why chosen algorithms, sample sizes, or baseline models were selected over established alternatives.'
    },
    {
      title: 'Ambiguous Novelty Claims',
      description: 'Inability to clearly state the exact novel contribution to knowledge in 2 concise sentences without rambling.'
    },
    {
      title: 'Presentation Overrun',
      description: 'Spending 80% of slide time on background literature instead of results, exhausting the panel before reaching contributions.'
    }
  ];

  const methodologyPhases = (mockVivaPage.methodologyPhases || mockVivaPage.phases || [
    {
      phaseNumber: 'Phase 01',
      title: 'Thesis Document Review',
      description: 'The panel reads your complete draft, mapping conceptual weaknesses, statistical ambiguities, and likely points of examiner friction.'
    },
    {
      phaseNumber: 'Phase 02',
      title: 'Slide Deck & Strategy Coaching',
      description: 'We restructure your 20-minute presentation: tightening narrative arc, emphasizing findings, and cutting redundant background slides.'
    },
    {
      phaseNumber: 'Phase 03',
      title: 'Live Simulated Viva Voce',
      description: 'Realistic 90-120 minute oral examination. The panel cross-examines you under authentic academic committee conditions.'
    },
    {
      phaseNumber: 'Phase 04',
      title: 'Diagnostic Report & Action Plan',
      description: 'Receive the recorded video, written panel evaluation scores, examiner question bank, and specific revisions needed before defense day.'
    }
  ]).map((ph: any, idx: number) => ({
    id: ph.id || `phase-${idx}`,
    phaseNumber: ph.phaseNumber || ph.phase || `Phase 0${idx + 1}`,
    title: ph.title || '',
    description: ph.description || ''
  }));

  const mainPackages = (mockVivaPage.mainPackages || mockVivaPage.mainPackagesList || [
    {
      id: 'pkg-essential',
      title: 'Essential Preparation Package',
      duration: '4 Weeks · 1 Month',
      isPopular: false,
      tagline: 'Rapid readiness audit for candidates with an imminent defense date.',
      features: [
        'Complete thesis draft review (Up to 250 pages)',
        '1 Comprehensive 90-minute Mock Viva Simulation',
        '2-Member Expert Academic Examiner Panel',
        'Presentation slide deck optimization (Up to 30 slides)',
        'Full Written Examiner Critique & Question Bank',
        'High-probability defense question guide',
        'Full HD video recording of simulated defense',
        'EGE Certificate of Mock Viva Completion',
      ],
      whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Essential%20Preparation%20Package%20(4%20Weeks)',
      buttonText: 'Book This Package',
      secondaryText: 'Need a custom installment or institutional invoice?',
    },
    {
      id: 'pkg-professional',
      title: 'Professional Preparation Package',
      duration: '8 Weeks · 2 Months',
      isPopular: true,
      badge: 'MOST POPULAR PACKAGE',
      tagline: 'Our most popular comprehensive preparation protocol for PhD candidates.',
      features: [
        'In-depth thesis & methodology stress test (Up to 350 pages)',
        '2 Full Mock Viva Defense Simulations (Midpoint & Final)',
        '3-Member International Academic Examiner Panel',
        'Slide deck design, structure & speech timing coaching',
        'Novelty gap analysis & theoretical framework audit',
        'Examiner psychological strategy & counter-question clinic',
        'Two Comprehensive Written Panel Evaluation Reports',
        '2 One-on-one follow-up mentoring sessions (60 mins each)',
        'Detailed examiner question bank with suggested response outlines',
        'Full HD video recordings of both simulations',
        'EGE Certificate of Defense Readiness',
      ],
      whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Professional%20Preparation%20Package%20(8%20Weeks)',
      buttonText: 'Book This Package',
      secondaryText: 'Need a custom installment or institutional invoice?',
    },
    {
      id: 'pkg-premium',
      title: 'Premium Research Defense Package',
      duration: '12 Weeks · 3 Months',
      isPopular: false,
      tagline: 'Total mastery for high-stakes doctoral defenses and complex interdisciplinary theses.',
      features: [
        'End-to-end dissertation critique (Unlimited page length)',
        '3 Milestone Defense Simulations (Preliminary, Panel Stress Test, Final)',
        '4-Member Elite International Panel (inc. Subject Specialist & Statistician)',
        'Complete presentation redesign with professional scientific formatting',
        'Methodological defense rebuttals & statistical verification',
        'Unlimited one-on-one coaching checkpoints during 12 weeks',
        'Three Comprehensive Diagnostic Evaluation Reports',
        'Rebuttal letter strategy for post-viva corrections guidance',
        'Full HD recordings with examiner commentary timestamps',
        'Priority 24/7 WhatsApp coordinator channel',
        'EGE Distinguished Scholar Defense Honors Certificate',
      ],
      whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20book%20the%20Premium%20Research%20Defense%20Package%20(12%20Weeks)',
      buttonText: 'Book This Package',
      secondaryText: 'Need a custom installment or institutional invoice?',
    },
  ]).map((p: any, idx: number) => ({
    id: p.id || `pkg-${idx}`,
    duration: p.duration || '',
    title: p.title || p.name || '',
    tagline: p.tagline || p.description || '',
    isPopular: Boolean(p.isPopular || (p.badge && (p.badge.toLowerCase().includes('popular') || p.badge === 'MOST POPULAR PACKAGE'))),
    badge: p.badge || (p.isPopular ? 'MOST POPULAR PACKAGE' : ''),
    features: Array.isArray(p.features) ? p.features : String(p.features || '').split('\n').filter(Boolean),
    whatsappLink: p.whatsappLink || p.whatsappUrl || '',
    buttonText: p.buttonText || 'Book This Package',
    secondaryText: p.secondaryText || p.invoiceText || 'Need a custom installment or institutional invoice?',
  }));

  const proposalPackages = (mockVivaPage.proposalPackages || mockVivaPage.proposalPackagesList || [
    {
      name: '1-Month Proposal Preparation',
      duration: '4 Weeks',
      focus: 'Problem statement alignment, scope refinement, and 1 simulated proposal defense.',
      whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%201-Month%20Proposal%20Preparation',
      buttonText: 'Enrol Candidate'
    },
    {
      name: '2-Month Proposal Preparation',
      duration: '8 Weeks',
      focus: 'Methodological framework validation, literature gap audit, and 2 simulated defenses.',
      whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%202-Month%20Proposal%20Preparation',
      buttonText: 'Enrol Candidate'
    },
    {
      name: '3-Month Premium Proposal Track',
      duration: '12 Weeks',
      focus: 'Full proposal manuscript review, ethical clearance preparation, and panel question mastery.',
      whatsappLink: 'https://wa.me/60123456789?text=Hello%20EGE,%20I%20want%20to%20enrol%20in%20the%203-Month%20Premium%20Proposal%20Track',
      buttonText: 'Enrol Candidate'
    },
  ]).map((p: any, idx: number) => ({
    id: p.id || `prop-${idx}`,
    name: p.name || p.title || '',
    duration: p.duration || '',
    focus: p.focus || p.description || '',
    whatsappLink: p.whatsappLink || p.whatsappUrl || '',
    buttonText: p.buttonText || 'Enrol Candidate'
  }));

  const faqItems = mockVivaPage.faqItems || [
    {
      q: 'Who serves on the EGE Mock Viva defense examination panel?',
      a: 'Our mock viva panels are composed of senior university professors, active international external examiners, and subject-matter experts who have supervised and examined dozens of Master’s and PhD viva voces across leading institutions in Malaysia, the UK, Europe, and Australia.',
    },
    {
      q: 'How far in advance of my real university defense should I start?',
      a: 'We strongly recommend candidates begin between 4 to 12 weeks before their scheduled university defense date. This provides sufficient lead time to identify critical thesis gaps, refine presentation slide decks, practice stressful counter-arguments, and implement panel recommendations without last-minute panic.',
    },
    {
      q: 'Is the mock viva conducted virtually or in person?',
      a: 'Sessions are conducted via secure, high-definition virtual meeting platforms (Zoom / Google Meet / Microsoft Teams). The session is recorded and delivered to you alongside a timestamped critique report, allowing you to replay examiner feedback at your own pace.',
    },
    {
      q: 'What degree types and defense stages does EGE support?',
      a: 'We support PhD candidates (final thesis viva & qualifying examinations), Master by Research students, FYP capstones, as well as Research Proposal Defenses (Defense of Proposal) for candidates transitioning from proposal to full candidacy.',
    },
    {
      q: 'What happens if the panel identifies major methodological errors in my draft?',
      a: 'Identifying vulnerabilities before your university examiners do is the primary purpose of mock viva preparation. Our panel will provide explicit, actionable scientific guidance on how to defend or constructively caveat your methodology, address limitations, and present your findings authoritatively.',
    },
    {
      q: 'Can my university supervisor participate or observe?',
      a: 'Yes, candidates are welcome to invite their university supervisors to observe the simulated defense session. Many supervisors actively appreciate our external review as an objective benchmark of student readiness.',
    },
    {
      q: 'What is included in the Written Evaluation Report?',
      a: 'The report includes a 30-to-45-point diagnostic rubric grading your presentation flow, conceptual clarity, novelty articulation, methodology defense, answer poise under pressure, and a list of high-probability questions anticipated from your university examiners.',
    },
    {
      q: 'How do I submit my thesis chapters and book my package?',
      a: 'Click any "Book Package" button, fill in your degree level, thesis title, and expected defense date. An Academic Defense Coordinator will contact you within 24 hours to coordinate non-disclosure agreements (NDA), document transfer, and panel scheduling.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 8.1 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {mockVivaPage.heroBadge || 'POSTGRADUATE DEFENSE CLINIC'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{mockVivaPage.heroTitle || 'Master’s & PhD Mock Viva Defense Preparation'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {mockVivaPage.heroDescription || 'Eliminate defense anxiety, anticipate rigorous examiner questioning, and defend your doctoral or master’s dissertation with supreme confidence.'}
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            {mockVivaPage.heroButton1Whatsapp ? (
              <a
                href={mockVivaPage.heroButton1Whatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-[#045494] hover:bg-[#033b68] text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-300" />
                <span>{mockVivaPage.heroButton1Text || 'Book Mock Viva Defense'}</span>
              </a>
            ) : (
              <button
                onClick={() => onOpenBooking('Professional Preparation Package (8 Weeks · 2 Months)')}
                className="bg-[#045494] hover:bg-[#033b68] text-white font-semibold text-xs px-6 py-3 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{mockVivaPage.heroButton1Text || 'Book Mock Viva Defense'}</span>
              </button>
            )}

            {mockVivaPage.heroButton2PdfUrl ? (
              <a
                href={mockVivaPage.heroButton2PdfUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs px-5 py-3 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>{mockVivaPage.heroButton2Text || 'Download Defense Brochure (PDF)'}</span>
              </a>
            ) : (
              <button
                onClick={onOpenBrochure}
                className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs px-5 py-3 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-500" />
                <span>{mockVivaPage.heroButton2Text || 'Download Defense Brochure (PDF)'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 8.2 Realities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {mockVivaPage.realitiesBadge || 'THE REALITIES OF POSTGRADUATE DEFENSE'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {mockVivaPage.realitiesTitle || 'Why Mock Viva Preparation Matters'}
          </h2>
          <p className="text-xs text-slate-500">
            {mockVivaPage.realitiesDescription || 'A brilliant thesis can still face difficult outcomes if the candidate is unprepared for hostile or probing oral cross-examination.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {realitiesItems.map((item, idx) => {
            const iconList = [AlertTriangle, BookOpen, Award, ShieldCheck];
            const IconComp = iconList[idx % iconList.length];
            const colorList = ['bg-rose-50 text-rose-600', 'bg-amber-50 text-amber-600', 'bg-blue-50 text-[#045494]', 'bg-emerald-50 text-emerald-600'];
            const colorClass = colorList[idx % colorList.length];
            return (
              <div key={item.id || idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8.3 Structured Methodology (4 Phases) */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {mockVivaPage.methodologyBadge || 'STRUCTURED METHODOLOGY'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {mockVivaPage.methodologyTitle || 'The 4-Phase EGE Defense Preparation Protocol'}
            </h2>
            <p className="text-xs text-slate-500">
              {mockVivaPage.methodologyDescription || 'A scientific, step-by-step roadmap designed to transform anxious candidates into commanding authorities.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologyPhases.map((phase, idx) => (
              <div key={phase.id || idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3 relative">
                <span className="text-xs font-bold text-[#045494] bg-blue-50 px-2.5 py-1 rounded uppercase">
                  {phase.phaseNumber || `Phase 0${idx + 1}`}
                </span>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{phase.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.4 Main Defense Clinic Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {mockVivaPage.packagesBadge || 'DEFENSE CLINIC PACKAGES'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {mockVivaPage.packagesTitle || 'Comprehensive Mock Viva Packages'}
          </h2>
          <p className="text-xs text-slate-500">
            {mockVivaPage.packagesSubtitle || 'Tailored to your defense timeline and degree requirements. All packages include verified EGE credentialing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {mainPackages.map((pkg, idx) => (
            <div
              key={pkg.id || idx}
              className="relative pt-4 flex flex-col group transition-all duration-500 hover:scale-[1.015] flex-1"
            >
              {pkg.isPopular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#045494] via-blue-800 to-indigo-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5 z-30 whitespace-nowrap border border-blue-400/30">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                  <span>{pkg.badge || 'MOST POPULAR PACKAGE'}</span>
                </span>
              )}

              {/* Card Container with Animated Conic Border */}
              <div className="relative p-[2.5px] rounded-[28px] overflow-hidden flex-1 flex flex-col shadow-2xl">
                {/* Moving Animated Gradient Border */}
                <div
                  className={`absolute inset-[-200%] animate-[spin_5s_linear_infinite] transition-opacity duration-500 ${pkg.isPopular
                    ? 'bg-[conic-gradient(from_0deg,#045494_0%,#f59e0b_25%,#10b981_50%,#00d2ff_75%,#045494_100%)] opacity-100'
                    : 'bg-[conic-gradient(from_0deg,#045494_0%,#3b82f6_25%,#10b981_50%,#6366f1_75%,#045494_100%)] opacity-60 group-hover:opacity-100'
                    }`}
                />

                <div
                  className={`relative rounded-[25px] p-8 bg-white h-full flex flex-col justify-between space-y-6 ${pkg.isPopular ? 'shadow-xl' : 'shadow-xs'
                    }`}
                >
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-bold text-[#045494] uppercase tracking-wider block">
                        {pkg.duration}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-1">{pkg.title}</h3>
                      <p className="text-xs text-slate-500 mt-2 leading-relaxed">{pkg.tagline}</p>
                    </div>

                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        What’s Included:
                      </span>
                      {pkg.features.map((feat: string, fIdx: number) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-3">
                    {pkg.whatsappLink ? (
                      <a
                        href={pkg.whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className={`w-full py-3 rounded-xl font-bold text-xs cursor-pointer shadow-xs transition flex items-center justify-center gap-2 ${pkg.isPopular
                          ? 'bg-[#045494] hover:bg-[#033b68] text-white shadow-md'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                        <span>{pkg.buttonText || 'Book This Package'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenBooking(pkg.title)}
                        className={`w-full py-3 rounded-xl font-bold text-xs cursor-pointer shadow-xs transition flex items-center justify-center gap-2 ${pkg.isPopular
                          ? 'bg-[#045494] hover:bg-[#033b68] text-white'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                      >
                        <GraduationCap className="w-4 h-4" />
                        <span>{pkg.buttonText || 'Book This Package'}</span>
                      </button>
                    )}
                    <div className="text-center">
                      <button
                        onClick={() => onRequestQuote(`Customization for ${pkg.title}`)}
                        className="text-[11px] text-slate-500 hover:text-[#045494] font-medium"
                      >
                        {pkg.secondaryText || 'Need a custom installment or institutional invoice?'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8.5 Proposal Defense Preparation Packages */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-100/70 px-3 py-1 rounded-full">
                {mockVivaPage.proposalBadge || 'EARLY-STAGE POSTGRADUATE DEFENSE'}
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mt-2">
                {mockVivaPage.proposalTitle || 'Proposal Defense Preparation Packages (Defense of Proposal)'}
              </h3>
              <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                {mockVivaPage.proposalDescription || 'Securing approval for your PhD or Master’s research proposal is crucial. We prepare candidates to defend their research problem, research questions, theoretical frameworks, and research design before faculty confirmation committees.'}
              </p>
            </div>
            {mockVivaPage.proposalMainWhatsapp ? (
              <a
                href={mockVivaPage.proposalMainWhatsapp}
                target="_blank"
                rel="noreferrer"
                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-300" />
                <span>{mockVivaPage.proposalMainButtonText || 'Book Proposal Defense'}</span>
              </a>
            ) : (
              <button
                onClick={() => onOpenBooking('Proposal Defense Preparation Package')}
                className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer shrink-0"
              >
                {mockVivaPage.proposalMainButtonText || 'Book Proposal Defense'}
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {proposalPackages.map((pp, idx) => (
              <div
                key={pp.id || idx}
                className="relative p-[2px] rounded-[22px] overflow-hidden group transition-all duration-300 hover:scale-[1.015] hover:shadow-lg flex flex-col"
              >
                {/* Moving Animated Border */}
                <div className="absolute inset-[-200%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,#045494_0%,#10b981_33%,#0284c7_66%,#045494_100%)] opacity-50 group-hover:opacity-100 transition-opacity" />

                <div className="relative rounded-[20px] bg-white p-5 space-y-3 flex flex-col justify-between h-full">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {pp.duration}
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{pp.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{pp.focus}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100">
                    {pp.whatsappLink ? (
                      <a
                        href={pp.whatsappLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#045494] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{pp.buttonText || 'Enrol Candidate'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={() => onOpenBooking(pp.name)}
                        className="text-xs text-[#045494] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>{pp.buttonText || 'Enrol Candidate'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.6 Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            {mockVivaPage.faqBadge || 'GOT QUESTIONS?'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {mockVivaPage.faqTitle || 'Frequently Asked Questions'}
          </h2>
          <p className="text-xs text-slate-500">
            {mockVivaPage.faqSubtitle || 'Everything you need to know about the EGE mock viva defense preparation service.'}
          </p>
        </div>

        <div className="space-y-3">
          {faqItems.map((faq, idx) => (
            <div
              key={faq.id || idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#045494] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8.7 Brochure Download Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#045494] to-[#022c4f] rounded-3xl p-8 lg:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-mono tracking-widest text-blue-200 uppercase font-bold">
              {mockVivaPage.brochureBadge || 'OFFICIAL SYLLABUS & PREPARATION GUIDE'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              {mockVivaPage.brochureTitle || 'Download the Complete Mock Viva Service Brochure'}
            </h3>
            <p className="text-xs text-blue-100/90 leading-relaxed">
              {mockVivaPage.brochureDescription || 'Explore the detailed 12-week preparation breakdown, examiner rubric scoring sheets, and sample committee questioning categories in PDF format.'}
            </p>
          </div>
          {mockVivaPage.brochurePdfUrl ? (
            <a
              href={mockVivaPage.brochurePdfUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white hover:bg-blue-50 text-[#045494] font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{mockVivaPage.brochureButtonText || 'Open & Save PDF Brochure'}</span>
            </a>
          ) : (
            <button
              onClick={onOpenBrochure}
              className="bg-white hover:bg-blue-50 text-[#045494] font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Download className="w-4 h-4" />
              <span>{mockVivaPage.brochureButtonText || 'Open & Save PDF Brochure'}</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

