'use client';

import React from 'react';
import {
  Users,
  BookOpen,
  Award,
  Calendar,
  GraduationCap,
  Building2,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  FileCheck,
  Send
} from 'lucide-react';
import { DatabaseState, ServiceItem } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface ServicesViewProps {
  data?: DatabaseState;
  initialCategory?: string;
  onSelectTab: (tab: string, subTab?: string) => void;
  onRequestQuote: (serviceTitle?: string) => void;
  onOpenWorkshopReg?: (title?: any) => void;
  onOpenMockVivaBooking?: () => void;
}

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

export const ServicesView: React.FC<ServicesViewProps> = ({
  data,
  onSelectTab,
  onRequestQuote,
  onOpenWorkshopReg,
  onOpenMockVivaBooking,
}) => {
  const servicesPage = data?.siteContent?.servicesPage || initialDatabase.siteContent.servicesPage!;
  const services = servicesPage.services || [];

  const handleCtaClick = (actionType?: string, target?: string) => {
    if (actionType === 'quote') {
      onRequestQuote(target || 'Service Quotation');
    } else if (actionType === 'workshop') {
      if (onOpenWorkshopReg) onOpenWorkshopReg(target || 'Upcoming Workshops');
      else onSelectTab('workshops');
    } else if (actionType === 'viva') {
      if (onOpenMockVivaBooking) onOpenMockVivaBooking();
      else onSelectTab('mock-viva');
    } else if (actionType === 'contact') {
      onSelectTab('contact');
    } else {
      onSelectTab(target || 'contact');
    }
  };

  return (
    <div className="space-y-20 pb-20">
      {/* 4.1 Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {servicesPage.heroBadge || 'WHAT WE DO'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{servicesPage.heroTitle || 'Our Services'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {servicesPage.heroDescription ||
              'Comprehensive academic and research services — from international conferences and journal publishing to publication support, professional training, mock viva preparation, and institutional collaboration.'}
          </p>
        </div>
      </section>

      {/* 4.2 Service Overview Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const IconComp = ICON_MAP[service.icon || ''] || Users;
            return (
              <a
                key={service.id || idx}
                href={`#${service.anchorId}`}
                className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-md transition group block"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#045494] flex items-center justify-center mb-3 group-hover:bg-[#045494] group-hover:text-white transition">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-[#045494] transition">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                  {service.overviewDescription}
                </p>
                <div className="text-xs text-[#045494] font-bold mt-4 flex items-center gap-1">
                  <span>View details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* 4.3 Detailed Services Sections */}
      {services.map((service, idx) => {
        const IconComp = ICON_MAP[service.icon || ''] || Users;
        const isAlternate = idx % 2 === 1;

        return (
          <section
            key={service.id || idx}
            id={service.anchorId}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
          >
            <div
              className={`rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-xs space-y-6 ${isAlternate ? 'bg-slate-50/80' : 'bg-white'
                }`}
            >
              {/* Badge & Title */}
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full w-fit">
                <IconComp className="w-4 h-4" />
                <span>{service.badge || `Core Service 0${idx + 1}`}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {service.title}
              </h2>
              <div
                className="text-sm text-slate-600 leading-relaxed [&_b]:font-bold [&_b]:text-slate-900 [&_strong]:font-bold [&_i]:italic [&_u]:underline"
                dangerouslySetInnerHTML={{ __html: service.detailDescription }}
              />

              {/* Sub-Tracks / Special Focus Cards (e.g. Core Service 01) */}
              {service.subTracks && service.subTracks.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  {service.subTracks.map((track, tIdx) => (
                    <div key={track.id || tIdx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2">
                      {track.badge && (
                        <span className="text-[10px] font-bold text-[#045494] uppercase bg-blue-100/70 px-2 py-0.5 rounded">
                          {track.badge}
                        </span>
                      )}
                      <h4 className="text-sm font-bold text-slate-900">{track.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{track.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Features List (Checks, Cards, or Grid) */}
              {service.features && service.features.length > 0 && (
                <>
                  {service.featureStyle === 'cards' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {service.features.map((f, fIdx) => (
                        <div
                          key={fIdx}
                          className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 text-center"
                        >
                          {f}
                        </div>
                      ))}
                    </div>
                  ) : service.featureStyle === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                      {service.features.map((f, fIdx) => (
                        <div
                          key={fIdx}
                          className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium flex items-center gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-[#045494] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
                      {service.features.map((f, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#045494] shrink-0" />
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Info Highlight Box */}
              {(service.infoBoxHeader || service.infoBoxText) && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-600">
                  {service.infoBoxHeader && (
                    <h4 className="font-bold text-slate-900 text-sm">{service.infoBoxHeader}</h4>
                  )}
                  {service.infoBoxText && <p className="leading-relaxed">{service.infoBoxText}</p>}
                  {service.infoBoxTags && service.infoBoxTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {service.infoBoxTags.map((tag, tgIdx) => (
                        <span key={tgIdx} className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Footer Text */}
              {service.footerText && (
                <p className="text-xs text-slate-500 leading-relaxed">{service.footerText}</p>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                {service.ctaText && (
                  <button
                    onClick={() => handleCtaClick(service.ctaActionType, service.ctaTarget)}
                    className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold px-6 py-3 rounded-xl shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
                {service.secondaryCtaText && (
                  <button
                    onClick={() => handleCtaClick(service.secondaryCtaActionType, service.secondaryCtaTarget)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold px-5 py-3 rounded-xl transition cursor-pointer"
                  >
                    {service.secondaryCtaText}
                  </button>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* 4.4 Closing Call-to-Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#045494] to-[#033b68] rounded-3xl p-10 lg:p-14 text-white text-center space-y-4 shadow-xl">
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
            {servicesPage.closingTitle || 'Let’s build something excellent, together.'}
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto leading-relaxed">
            {servicesPage.closingDescription ||
              'Reach out to discuss conferences, publishing, training, or long-term academic partnerships.'}
          </p>
          <div className="pt-3">
            <button
              onClick={() => onSelectTab(servicesPage.closingButtonTarget || 'contact')}
              className="bg-white hover:bg-blue-50 text-[#045494] font-bold text-sm px-8 py-3.5 rounded-xl shadow-xs hover:shadow transition cursor-pointer"
            >
              {servicesPage.closingButtonText || 'Contact EGE'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
