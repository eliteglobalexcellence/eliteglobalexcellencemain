'use client';

import React, { useState } from 'react';
import {
  Globe2,
  CheckCircle2,
  ExternalLink,
  Building2,
  X,
  Info
} from 'lucide-react';
import { DatabaseState, Partner } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface PartnersViewProps {
  data: DatabaseState;
  onRequestQuote?: (title?: string) => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const PartnersView: React.FC<PartnersViewProps> = ({
  data,
  onSelectTab,
}) => {
  const pageContent = data.siteContent?.partnersPage || initialDatabase.siteContent.partnersPage;
  const partnersList = data.partners && data.partners.length > 0
    ? data.partners
    : (pageContent?.partnersList || initialDatabase.partners);

  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedPartnerModal, setSelectedPartnerModal] = useState<Partner | null>(null);

  const filteredPartners = partnersList.filter((p) => {
    if (selectedType === 'ALL') return true;
    return (p.partnershipType || 'UNIVERSITY').toUpperCase() === selectedType.toUpperCase();
  });

  const partnerModels = pageContent?.frameworksList || [
    {
      title: 'Institutional Memorandum of Understanding (MoU / MoC)',
      description: 'Formal bilateral agreements governing joint scientific projects, researcher exchange visits, and credit-bearing co-curricular training.',
    },
    {
      title: 'International Conference Co-Hosting',
      description: 'Partnering universities co-organize ICCSEIT, EGE-MLDL, or localized symposia with shared technical program committees and indexed proceedings.',
    },
    {
      title: 'Affiliated Journal Publishing Tracks',
      description: 'Academic faculties create dedicated Special Issues or affiliated journal publishing pathways with rigorous peer-review management.',
    },
    {
      title: 'Faculty Development & Research Training',
      description: 'Customized hands-on research methodology workshops and mock viva defense coaching tailored to institutional faculty KPIs.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 11.1 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {pageContent?.heroBadge || 'STRATEGIC ALLIANCES'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{pageContent?.heroTitle || 'Academic & Institutional Partners'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {pageContent?.heroDescription ||
              'Collaborating with leading universities, research institutes, scientific societies, and publishers across Asia, Europe, and North America.'}
          </p>
        </div>
      </section>

      {/* 11.2 Partner Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['ALL', 'UNIVERSITY', 'INSTITUTE', 'SOCIETY'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition whitespace-nowrap ${selectedType === type
                  ? 'bg-[#045494] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                {type === 'ALL' ? 'All Partners' : type}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Showing {filteredPartners.length} partner organizations
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-xl transition-all duration-200 flex flex-col justify-between items-center text-center space-y-5 group"
            >
              {/* Top: Enlarged Logo */}
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-slate-50 border border-slate-200/80 p-4 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200">
                {partner.logoUrl || partner.imageUrl || partner.image ? (
                  <img
                    src={partner.logoUrl || partner.imageUrl || partner.image}
                    alt={partner.name}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <Building2 className="w-16 h-16 text-[#045494]" />
                )}
              </div>

              {/* Middle: Name & Details below logo */}
              <div className="space-y-2 w-full">
                <span className="text-[10px] font-bold text-[#045494] uppercase bg-blue-50 px-2.5 py-0.5 rounded-full inline-block border border-blue-100">
                  {partner.partnershipType || partner.category || 'UNIVERSITY'}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg sm:text-xl leading-tight group-hover:text-[#045494] transition">
                  {partner.name}
                </h3>
                {partner.country && (
                  <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1">
                    <Globe2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>{partner.country}</span>
                  </p>
                )}
              </div>

              {/* Bottom: Read More Details button */}
              <button
                onClick={() => setSelectedPartnerModal(partner)}
                className="w-full bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold py-3 px-4 rounded-xl shadow-xs transition duration-200 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Info className="w-4 h-4" />
                <span>Read More Details</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 11.3 Partnership Models */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {pageContent?.frameworksBadge || 'ENGAGEMENT FRAMEWORKS'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {pageContent?.frameworksTitle || 'Institutional Partnership Models'}
            </h2>
            <p className="text-xs text-slate-500">
              {pageContent?.frameworksSubtitle ||
                'Flexible, mutually advantageous agreements crafted for universities and research agencies.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {partnerModels.map((model, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <h4 className="font-bold text-slate-900 text-sm">{model.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{model.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11.4 Partner With EGE Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#045494] to-[#033b68] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] font-mono tracking-widest text-blue-200 uppercase font-bold">
              {pageContent?.callBadge || 'ESTABLISH ACADEMIC LINKAGES'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              {pageContent?.callTitle || 'Partner With Elite Global Excellence'}
            </h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              {pageContent?.callDescription ||
                'We welcome universities, faculties, and scientific publishers to establish bilateral MoUs and co-organize high-impact conferences and research development initiatives.'}
            </p>
          </div>
          <button
            onClick={() => onSelectTab('contact')}
            className="bg-white hover:bg-blue-50 text-[#045494] font-bold text-xs px-6 py-3.5 rounded-xl shadow-xs transition cursor-pointer shrink-0"
          >
            {pageContent?.callCtaText || 'Inquire Institutional Partnership'}
          </button>
        </div>
      </section>

      {/* READ MORE DETAILS MODAL */}
      {selectedPartnerModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 text-center">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-bold text-[#045494] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Partner Details
              </span>
              <button
                onClick={() => setSelectedPartnerModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-3xl bg-slate-50 border border-slate-200 p-4 flex items-center justify-center shadow-xs">
                {selectedPartnerModal.logoUrl || selectedPartnerModal.imageUrl || selectedPartnerModal.image ? (
                  <img
                    src={selectedPartnerModal.logoUrl || selectedPartnerModal.imageUrl || selectedPartnerModal.image}
                    alt={selectedPartnerModal.name}
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <Building2 className="w-16 h-16 text-[#045494]" />
                )}
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#045494] uppercase bg-blue-50 px-2.5 py-0.5 rounded-full inline-block">
                  {selectedPartnerModal.partnershipType || 'UNIVERSITY'}
                </span>
                <h3 className="font-black text-slate-900 text-xl leading-tight mt-1">
                  {selectedPartnerModal.name}
                </h3>
                {selectedPartnerModal.country && (
                  <p className="text-xs text-slate-500 font-medium flex items-center justify-center gap-1 mt-1">
                    <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                    <span>{selectedPartnerModal.country}</span>
                  </p>
                )}
              </div>

              {(selectedPartnerModal.description || selectedPartnerModal.bio) && (
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed text-left">
                  <span className="font-bold text-slate-900 text-xs block mb-1">About Partner:</span>
                  <p className="whitespace-pre-line">{selectedPartnerModal.description || selectedPartnerModal.bio}</p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedPartnerModal(null)}
                className="w-full bg-[#045494] hover:bg-[#033b68] text-white px-5 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
