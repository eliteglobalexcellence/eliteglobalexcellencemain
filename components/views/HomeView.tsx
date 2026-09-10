'use client';

import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Users,
  BookOpen,
  Award,
  Globe2,
  Sparkles,
  ChevronRight,
  GraduationCap,
  Building2,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  ExternalLink,
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize2,
  MoreVertical,
  FastForward,
  X,
  Star,
  FileCheck,
  Send
} from 'lucide-react';
import { DatabaseState, EventItem, NewsArticle } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface HomeViewProps {
  data: DatabaseState;
  onSelectTab: (tab: string, subTab?: string) => void;
  onOpenArticle: (article: NewsArticle) => void;
  onOpenEvent?: (event: EventItem) => void;
  onRequestQuote: (serviceTitle?: string) => void;
  onOpenBrochure?: () => void;
  onOpenMockVivaBooking?: (packageName?: string) => void;
  onSelectAmbassador?: (ambassador: any) => void;
  onRegisterWorkshop?: (workshop: any) => void;
}

function getYouTubeEmbedUrl(url?: string): string | null {
  if (!url || !url.trim()) return null;
  const trimmed = url.trim();
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = trimmed.match(regExp);
  let videoId: string | null = null;
  if (match && match[1]) {
    videoId = match[1];
  } else if (trimmed.length === 11 && !trimmed.includes('/')) {
    videoId = trimmed;
  }
  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&playsinline=1&rel=0`;
  }
  return null;
}

export const HomeView: React.FC<HomeViewProps> = ({
  data,
  onSelectTab,
  onOpenArticle,
  onOpenEvent,
  onRequestQuote,
  onOpenBrochure,
  onOpenMockVivaBooking,
  onSelectAmbassador,
  onRegisterWorkshop,
}) => {
  const { siteContent, events, newsArticles, partners } = data;
  const upcomingEvents = events.filter((e) => e.status === 'UPCOMING');
  const pastEvents = events.filter((e) => e.status === 'PAST');
  const publishedNews = newsArticles.filter((n) => n.isPublished);
  const ytEmbedUrl = getYouTubeEmbedUrl(siteContent.connectingMindsVideoUrl);

  // Rotating Taglines State
  const taglines = (siteContent.heroBadges && siteContent.heroBadges.length > 0)
    ? siteContent.heroBadges
    : [
      siteContent.heroSubheadline || 'WHERE RESEARCH MEETS EXCELLENCE',
      'SUPPORTING EXCELLENCE AT EVERY RESEARCH STAGE',
      'ADVANCING ACADEMIC PUBLISHING & INNOVATION',
      'BRIDGING RESEARCHERS, UNIVERSITIES & INDUSTRY WORLDWIDE',
    ];
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [taglines.length]);

  // Interactive Video Player State matching user screenshot
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoTime, setVideoTime] = useState(6);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setVideoTime((prev) => (prev >= 8 ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Lightbox Image Popup Modal State
  const [lightboxEvent, setLightboxEvent] = useState<EventItem | null>(null);

  const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
    Users,
    BookOpen,
    Award,
    Calendar,
    GraduationCap,
    Building2,
    Sparkles,
    FileCheck,
    Send,
  };

  const dynamicServicesList = siteContent.servicesPage?.services || initialDatabase.siteContent.servicesPage!.services!;

  const handleServiceCardClick = (service: any) => {
    const actionType = service.ctaActionType;
    const target = service.ctaTarget;

    if (actionType === 'quote') {
      onRequestQuote(target || service.title);
    } else if (actionType === 'workshop') {
      onSelectTab('workshops');
    } else if (actionType === 'viva') {
      if (onOpenMockVivaBooking) onOpenMockVivaBooking();
      else onSelectTab('mock-viva');
    } else if (actionType === 'contact') {
      onSelectTab('contact');
    } else if (actionType === 'tab' && target) {
      onSelectTab(target);
    } else {
      onSelectTab('services', service.anchorId);
    }
  };

  return (
    <div className="space-y-24 pb-20">
      {/* 2.1 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-20 border-b border-slate-200/80">
        {/* Subtle background graphic */}
        <div className="absolute inset-0 bg-[radial-gradient(#045494_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Sub-headline / Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200/80 px-4 py-1.5 rounded-full text-xs font-bold text-[#045494] uppercase tracking-wider shadow-2xs min-h-[34px] transition-all">
              <Sparkles className="w-3.5 h-3.5 text-[#045494] animate-pulse shrink-0" />
              <span key={taglineIndex} className="animate-in fade-in slide-in-from-bottom-1 duration-400">
                {taglines[taglineIndex]}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
              {(() => {
                const rawTitle = siteContent.heroTitle || siteContent.heroHeadline || 'Elite Global Excellence (EGE)';
                if (rawTitle.includes('Elite Global Excellence')) {
                  const parts = rawTitle.split('Elite Global Excellence');
                  return (
                    <>
                      {parts[0]}
                      <span className="text-orange-gradient-animate drop-shadow-xs">
                        Elite Global Excellence
                      </span>
                      {parts[1]}
                    </>
                  );
                }
                return <span className="text-orange-gradient-animate drop-shadow-xs">{rawTitle}</span>;
              })()}
            </h1>

            {/* Supporting Statement */}
            <div
              className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_strong]:text-slate-900 [&_i]:italic [&_u]:underline"
              dangerouslySetInnerHTML={{
                __html: siteContent.heroStatement ||
                  'Aspire, Achieve, Advance with EGE. Bridging borders, empowering researchers, and advancing scientific knowledge across 33+ nations worldwide.'
              }}
            />

            {/* Primary Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              {(siteContent.heroCtaButtons && siteContent.heroCtaButtons.length > 0
                ? siteContent.heroCtaButtons
                : [
                  { id: 'cta-1', label: siteContent.heroPrimaryCtaText || 'Check Upcoming Events', targetTab: 'workshops', variant: 'primary' },
                  { id: 'cta-2', label: siteContent.heroSecondaryCtaText || 'View All Services', targetTab: 'services', variant: 'secondary' },
                ]
              ).map((btn, idx) => {
                const isPrimary = btn.variant === 'primary' || (!btn.variant && idx === 0);
                const isDark = btn.variant === 'dark';
                return (
                  <button
                    key={btn.id || idx}
                    onClick={() => onSelectTab(btn.targetTab, btn.targetSubTab)}
                    className={`font-bold text-xs sm:text-sm px-7 py-3.5 rounded-[22px] transition-all duration-300 flex items-center gap-2 cursor-pointer ${isPrimary
                      ? 'clay-button bg-[#045494] text-white'
                      : isDark
                        ? 'clay-button bg-slate-900 text-white'
                        : 'clay-button-secondary text-slate-800'
                      }`}
                  >
                    {isPrimary && <Calendar className="w-4 h-4 text-blue-200" />}
                    <span>{btn.label}</span>
                    {!isPrimary && <ArrowRight className="w-4 h-4 text-[#045494]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Key Statistics Displayed as Metric Cards with Motion Borders */}
          {(() => {
            const activeMetrics = (siteContent.metrics && siteContent.metrics.length > 0)
              ? siteContent.metrics
              : [
                { count: siteContent.stats?.collaborators || '50+', label: 'Academic Collaborators', subtext: 'Global university network' },
                { count: siteContent.stats?.database || '8,000+', label: 'Researchers Database', subtext: 'Active scholars & authors' },
                { count: siteContent.stats?.countries || '33+', label: 'Countries Worldwide', subtext: 'Asia, Europe & Americas' },
                { count: siteContent.stats?.events || '30+', label: 'Successful Events Delivered', subtext: 'Conferences & workshops' },
              ];

            const gridColsClass =
              activeMetrics.length === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : activeMetrics.length === 2
                  ? 'grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto'
                  : activeMetrics.length === 3
                    ? 'grid-cols-1 sm:grid-cols-3'
                    : 'grid-cols-2 lg:grid-cols-4';

            const STAT_ICONS = [Building2, Users, Globe2, Award];

            return (
              <div className={`mt-16 grid gap-5 sm:gap-6 ${gridColsClass}`}>
                {activeMetrics.map((card, idx) => {
                  const CardIcon = STAT_ICONS[idx % STAT_ICONS.length];
                  return (
                    <div
                      key={idx}
                      className="motion-border-card group cursor-pointer"
                    >
                      <div className="motion-border-card-inner space-y-2">
                        <div className="w-12 h-12 rounded-[20px] bg-gradient-to-br from-orange-100/80 via-white to-blue-100/80 border border-white text-[#045494] shadow-clay-orb flex items-center justify-center mb-1 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                          <CardIcon className="w-6 h-6 text-[#E65100] group-hover:text-[#045494] transition-colors duration-300" />
                        </div>
                        <div className="text-3xl sm:text-4xl font-black text-orange-gradient-animate tracking-tight">
                          {card.count}
                        </div>
                        <div className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                          {card.label}
                        </div>
                        <div className="text-[11px] font-bold text-slate-500 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60">
                          {card.subtext}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 2.2 Connecting Minds & Expanded Video Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {siteContent.sinceYear || 'SINCE 2020'}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            {siteContent.connectingMindsHeading || 'Connecting Minds'}
          </h2>
          <div
            className="text-slate-600 leading-relaxed text-base sm:text-lg [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
            dangerouslySetInnerHTML={{ __html: siteContent.connectingMindsBody || '' }}
          />
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onSelectTab(siteContent.connectingMindsPrimaryBtnTarget || 'about')}
              className="bg-[#045494] hover:bg-[#033b68] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <span>{siteContent.connectingMindsPrimaryBtnText || 'Explore more'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expanded Video Showcase Frame matching User Screenshot */}
        <div className="w-full max-w-5xl mx-auto">
          <div className="bg-white border-4 border-[#045494] rounded-[36px] p-2.5 sm:p-4 shadow-2xl relative overflow-hidden transition-all duration-300">
            {/* Inner Video Container */}
            <div className="relative w-full aspect-video min-h-[300px] sm:min-h-[440px] md:min-h-[500px] rounded-[26px] overflow-hidden bg-slate-950 flex flex-col justify-between shadow-inner">
              {ytEmbedUrl ? (
                <iframe
                  src={ytEmbedUrl}
                  title="EGE Featured YouTube Video"
                  className="w-full h-full rounded-[24px] absolute inset-0 border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="p-4 sm:p-6 flex flex-col justify-between h-full relative">
                  {/* Top Control Buttons Overlay */}
                  <div className="flex items-center justify-center gap-2 relative z-30 pt-2">
                    <button
                      title="Expand Window"
                      className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-white" />
                    </button>
                    <button
                      title="Fast Forward"
                      className="w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition cursor-pointer"
                    >
                      <FastForward className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>

                  {/* Main Video Canvas / EGE Official Branding Display */}
                  <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center z-10">
                    <div className="absolute inset-0 bg-[radial-gradient(#045494_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

                    <div className="relative flex flex-col items-center gap-4">
                      <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-[#045494] to-blue-500 flex items-center justify-center text-white shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-300">
                        <GraduationCap className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                      </div>
                      <div className="space-y-1.5 max-w-xl">
                        <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                          ELITE GLOBAL EXCELLENCE
                        </h3>
                        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-[#045494]">
                          RESEARCH & INNOVATION CENTRE
                        </p>
                        <p className="text-xs font-mono text-slate-500 pt-0.5">
                          www.eliteglobalexcellence.com
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dark Gradient Video Control Overlay Bar */}
                  <div className="relative z-30 w-full mt-auto pt-16 bg-gradient-to-t from-slate-950 via-slate-950/85 to-transparent p-4 sm:p-5 rounded-b-[22px] text-white space-y-3.5">
                    <div className="text-center space-y-0.5">
                      <div className="text-sm sm:text-base font-extrabold tracking-wide text-white">
                        RESEARCH & INNOVATION CENTRE
                      </div>
                      <div className="text-xs font-mono text-slate-300">
                        www.eliteglobalexcellence.com
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs pt-1">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="text-white hover:text-blue-300 transition cursor-pointer"
                      >
                        {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                      </button>
                      <span className="font-mono text-xs text-slate-200">0:0{videoTime} / 0:08</span>

                      <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden relative cursor-pointer">
                        <div
                          className="h-full bg-white rounded-full transition-all duration-300"
                          style={{ width: `${(videoTime / 8) * 100}%` }}
                        />
                      </div>

                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                      <button className="text-slate-300 hover:text-white transition cursor-pointer">
                        <Maximize2 className="w-4 h-4" />
                      </button>
                      <button className="text-slate-300 hover:text-white transition cursor-pointer">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2.3 Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {siteContent.upcomingEventsBadge || 'WHAT’S NEXT'}
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              {siteContent.upcomingEventsTitle || 'Upcoming Events'}
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              {siteContent.upcomingEventsSubtitle || 'Discover our latest workshops, webinars, and education fairs designed to help you on your academic journey.'}
            </p>
          </div>
          <button
            onClick={() => {
              const target = siteContent.upcomingEventsCtaLink || 'conferences';
              if (target.startsWith('http')) window.open(target, '_blank');
              else onSelectTab(target);
            }}
            className="text-xs font-bold text-[#045494] hover:underline flex items-center gap-1 cursor-pointer self-start md:self-auto"
          >
            <span>{siteContent.upcomingEventsCtaText || 'View All Conferences & Events'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {upcomingEvents.slice(0, 2).map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              {event.imageUrl && (
                <div className="h-48 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-[#045494] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {event.category}
                  </span>
                </div>
              )}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-xs text-slate-500 font-semibold flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-[#045494]" />
                    <span>{event.date}</span>
                    <span>·</span>
                    <span>{event.locationMode}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#045494] transition">
                    {event.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenEvent?.(event)}
                    className="text-xs font-bold text-[#045494] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSelectTab('contact')}
                    className="bg-blue-50 hover:bg-blue-100 text-[#045494] text-xs font-semibold px-3 py-1.5 rounded-lg transition cursor-pointer"
                  >
                    Register Interest
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.4 Core Services Section */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {siteContent.servicesSectionBadge || 'WHAT WE OFFER'}
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              <span className="text-orange-gradient-animate drop-shadow-xs">{siteContent.servicesSectionTitle || siteContent.servicesPage?.heroTitle || 'Our Services'}</span>
            </h2>
            <p className="text-sm text-slate-600">
              {siteContent.servicesSectionSubtitle || siteContent.servicesPage?.heroDescription || 'Comprehensive academic and research services — from international conferences and journal publishing to publication support, professional training, mock viva preparation, and institutional collaboration.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dynamicServicesList.map((srv, idx) => {
              const IconComp = ICON_MAP[srv.icon || ''] || Users;
              return (
                <div
                  key={srv.id || idx}
                  onClick={() => handleServiceCardClick(srv)}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center group-hover:bg-[#045494] group-hover:text-white transition">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-[#045494] transition">
                      {srv.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {srv.overviewDescription}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-bold text-[#045494] gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Learn more</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              );
            })}

            {/* Seventh Card: See All Services */}
            <div
              onClick={() => onSelectTab('services')}
              className="bg-gradient-to-br from-[#045494] to-[#033b68] rounded-2xl p-6 text-white shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <span className="text-[11px] uppercase tracking-wider text-blue-200 font-bold">
                  EXPANDED PORTFOLIO
                </span>
                <h3 className="text-xl font-black">See all EGE Services</h3>
                <p className="text-xs text-blue-100/90 leading-relaxed">
                  Discover institutional consulting, international symposium organization, PhD mock viva preparation, and journal indexing advisory.
                </p>
              </div>
              <div className="pt-4 flex items-center gap-2 text-xs font-bold text-white">
                <span>Explore Full Services Catalog</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2.5 Events Gallery Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {siteContent.eventsGalleryBadge || 'MOMENTS THAT MATTER'}
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              {siteContent.eventsGalleryTitle || 'Events Gallery'}
            </h2>
          </div>
          <button
            onClick={() => {
              const target = siteContent.eventsGalleryCtaLink || 'workshops';
              if (target.startsWith('http')) window.open(target, '_blank');
              else onSelectTab(target);
            }}
            className="text-xs font-bold text-[#045494] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{siteContent.eventsGalleryCtaText || 'View All Past Events'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastEvents.slice(0, 4).map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col group cursor-pointer"
              onClick={() => setLightboxEvent(event)}
            >
              <div className="h-44 overflow-hidden relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={event.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80'}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 space-y-2">
                <div className="text-xs text-slate-500 font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#045494]" />
                  <span>{event.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#045494] transition">
                  {event.title}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Event Image Popup Modal */}
        {lightboxEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setLightboxEvent(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl space-y-0 text-white animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Close Button */}
              <button
                onClick={() => setLightboxEvent(null)}
                className="absolute top-4 right-4 z-20 bg-slate-950/80 hover:bg-slate-950 text-white p-2 rounded-full border border-white/20 transition cursor-pointer shadow-lg"
                aria-label="Close picture popup"
              >
                <X className="w-5 h-5 text-white" />
              </button>

              {/* Full Image Display Container */}
              <div className="relative max-h-[75vh] w-full bg-slate-950 overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={lightboxEvent.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80'}
                  alt={lightboxEvent.title}
                  className="max-h-[75vh] w-full object-contain"
                />
              </div>

              {/* Caption Footer Bar */}
              <div className="p-5 bg-slate-900 border-t border-slate-800 text-slate-200">
                <div className="space-y-1">
                  <div className="text-xs text-blue-400 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{lightboxEvent.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug">
                    {lightboxEvent.title}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2.6 Trusted Collaborators Section - Moving Logo Marquee */}
      <section className="bg-slate-50 py-14 border-y border-slate-200/80 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              {siteContent.collaboratorsBadge || 'TRUSTED COLLABORATORS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {siteContent.collaboratorsSubtitle || 'Partnering with leading institutions and academic collaborators worldwide'}
            </h2>
          </div>

          {/* Continuous Right-to-Left Infinite Logo Marquee */}
          <div className="relative w-full overflow-hidden py-2">
            {/* Left & Right Gradient Fades */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

            <div className="flex flex-wrap items-center justify-center gap-5 py-2">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  onClick={() => onSelectTab('partners')}
                  className="bg-white p-3 sm:p-4 rounded-2xl border-2 border-slate-200/90 shadow-xs hover:border-[#045494] hover:shadow-md transition cursor-pointer flex items-center justify-center w-36 sm:w-44 h-24 sm:h-28 shrink-0 group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={partner.logoUrl}
                    alt={partner.name}
                    className="h-16 sm:h-20 w-full max-w-[130px] sm:max-w-[150px] object-contain group-hover:scale-110 transition-transform duration-300 drop-shadow-xs"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => {
                const target = siteContent.collaboratorsCtaLink || 'partners';
                if (target.startsWith('http')) window.open(target, '_blank');
                else onSelectTab(target);
              }}
              className="text-xs font-bold text-[#045494] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>{siteContent.collaboratorsCtaText || 'Explore All Academic Partners & Collaborations'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 2.7 Global Reach Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
            {siteContent.globalReachBadge || 'GLOBAL REACH'}
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {siteContent.globalReachTitle || 'Where We Work'}
          </h2>
          <div
            className="text-sm text-slate-600 leading-relaxed [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
            dangerouslySetInnerHTML={{
              __html: siteContent.globalReachDescription || 'We connect researchers, students, educators, universities, and research institutions worldwide through international conferences, scholarly publishing, professional training, research support, and academic collaboration.'
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(siteContent.globalRegions && siteContent.globalRegions.length > 0
            ? siteContent.globalRegions
            : [
              {
                id: 'reg-1',
                regionName: 'Asia',
                countriesList: 'Malaysia, Singapore, India, Pakistan, Bangladesh, Nepal, Sri Lanka, Vietnam, Philippines.',
                hubFocus: 'Regional Hub: Kuala Lumpur & Johor Bahru',
              },
              {
                id: 'reg-2',
                regionName: 'Europe',
                countriesList: 'United Kingdom, Germany, Poland, France, Italy, Netherlands, Spain, Portugal.',
                hubFocus: 'Bilateral Chapter: Lisbon & European Collaborators',
              },
              {
                id: 'reg-3',
                regionName: 'North America',
                countriesList: 'United States and Canada (Scientific dissemination and conference committees).',
                hubFocus: 'Strategic Outreach & Peer-Review Panels',
              },
            ]
          ).map((reg, idx) => (
            <div key={reg.id || idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center font-bold">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{reg.regionName}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                {reg.countriesList}
              </p>
              <div className="pt-2 text-[11px] font-semibold text-[#045494]">
                {reg.hubFocus}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <span className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 font-semibold text-xs px-4 py-2 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-[#045494]" />
            <span>{siteContent.globalReachTagline || 'Expanding Worldwide · Connecting Emerging & Established Scholars'}</span>
          </span>
        </div>
      </section>

      {/* 2.8 Latest News Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {siteContent.latestNewsBadge || 'FRESH FROM EGE'}
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              {siteContent.latestNewsTitle || 'Latest News'}
            </h2>
          </div>
          <button
            onClick={() => {
              const target = siteContent.latestNewsCtaLink || 'news';
              if (target.startsWith('http')) window.open(target, '_blank');
              else onSelectTab(target);
            }}
            className="text-xs font-bold text-[#045494] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{siteContent.latestNewsCtaText || 'View all news'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishedNews.slice(0, 2).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              {article.imageUrl && (
                <div className="h-48 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              )}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-semibold">
                    <span className="bg-blue-50 text-[#045494] px-2 py-0.5 rounded font-bold uppercase">
                      {article.category}
                    </span>
                    <span>{article.publishDate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug group-hover:text-[#045494] transition">
                    {article.title}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => onOpenArticle(article)}
                    className="text-xs font-bold text-[#045494] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2.9 Testimonials Section - Infinite Single-Line Marquee Slider */}
      <section className="bg-slate-50/70 border-t border-slate-200/80 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              {siteContent.testimonialsBadge || 'WHAT PEOPLE SAY ABOUT US'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {siteContent.testimonialsTitle || 'Delivering Excellence Through Every Experience'}
            </h2>
          </div>

          {(() => {
            const approvedTestimonials = (siteContent.testimonials || []).filter(
              (t) => t.status === 'APPROVED' || !t.status
            );

            if (approvedTestimonials.length === 0) {
              return (
                <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center mx-auto font-bold">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-slate-900">Be the first to leave a review!</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Have you collaborated with Elite Global Excellence? Share your experience regarding our conferences, research support, or workshops.
                    </p>
                  </div>
                  <a
                    href="/feedback"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <span>Submit Your Feedback</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            }

            return (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto text-left">
                  {approvedTestimonials.map((testi) => (
                    <div
                      key={testi.id}
                      className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-[#045494] hover:shadow-md transition flex flex-col justify-between space-y-4 group text-left"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-3.5 h-3.5 ${star <= (testi.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed italic line-clamp-4">
                          “{testi.quote}”
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-[#045494] font-bold flex items-center justify-center text-xs shrink-0 border border-blue-100 uppercase">
                          {testi.name ? testi.name.charAt(0) : 'U'}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{testi.name}</h4>
                          <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                            {testi.role} {testi.institution ? `· ${testi.institution}` : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex items-center justify-center">
                  <a
                    href="/feedback"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#045494] hover:bg-[#033b68] text-white text-xs sm:text-sm font-black px-6 py-3 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition duration-300 border border-blue-400/30 cursor-pointer group"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-200 group-hover:scale-110 transition-transform" />
                    <span>Submit Your Feedback</span>
                    <ArrowRight className="w-4 h-4 text-blue-200 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
};
