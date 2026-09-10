'use client';

import React from 'react';
import {
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
  ExternalLink
} from 'lucide-react';
import { DatabaseState, CareerRole } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface CareersViewProps {
  data: DatabaseState;
  onApplyJob?: (job: CareerRole) => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const CareersView: React.FC<CareersViewProps> = ({
  data,
  onSelectTab,
}) => {
  const pageContent = data.siteContent?.careersPage || initialDatabase.siteContent.careersPage;
  const rolesList = data.careerRoles || data.careers || [];

  const activeRoles = rolesList.filter((j) => j.status === 'OPEN');

  const culturePillars = pageContent?.pillarsList || [
    {
      number: '01',
      title: 'Academic Rigor',
      description: 'We hold all conferences, journals, and workshops to the highest standards of scientific ethics and peer review.',
    },
    {
      number: '02',
      title: 'Global Inclusion',
      description: 'Democratizing access for emerging scholars in developing regions while working alongside world-leading professors.',
    },
    {
      number: '03',
      title: 'Continuous Upskilling',
      description: 'Every team member receives sponsored access to our courses, statistical certifications, and global conference tickets.',
    },
    {
      number: '04',
      title: 'Remote-First Flexibility',
      description: 'Modern digital infrastructure supporting asynchronous teamwork across multiple timezones.',
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 13.1 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {pageContent?.heroBadge || 'JOIN OUR TEAM'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{pageContent?.heroTitle || 'Careers at Elite Global Excellence'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {pageContent?.heroDescription ||
              'Build the future of global academic collaboration. We are seeking passionate researchers, editorial coordinators, conference managers, and educators to expand our international impact.'}
          </p>
        </div>
      </section>

      {/* 13.2 Culture & Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {culturePillars.map((pil, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#045494] font-bold text-xs flex items-center justify-center">
                {pil.number || `0${idx + 1}`}
              </span>
              <h4 className="font-bold text-slate-900 text-sm mt-2">{pil.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{pil.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 13.3 Open Positions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full">
              {pageContent?.positionsTitle || 'Open Academic Positions'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Active Openings ({activeRoles.length})
            </h2>
          </div>
        </div>

        {activeRoles.length > 0 ? (
          <div className="space-y-4">
            {activeRoles.map((role) => (
              <div
                key={role.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-[#045494] transition flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-blue-50 text-[#045494] font-bold px-2.5 py-0.5 rounded-full uppercase">
                      {role.division || role.department || 'Academic Division'}
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{role.location}</span>
                    </span>
                    <span className="text-slate-400">·</span>
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{role.type}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">{role.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{role.description}</p>

                  {role.requirements && role.requirements.length > 0 && (
                    <div className="pt-1 flex flex-wrap gap-2 text-[11px] text-slate-600">
                      {role.requirements.map((req, idx) => (
                        <span
                          key={idx}
                          className="bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100"
                        >
                          ✓ {req}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="shrink-0">
                  {role.googleFormLink || role.applyFormLink ? (
                    <a
                      href={role.googleFormLink || role.applyFormLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs"
                    >
                      <span>Apply for Role</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onSelectTab('contact')}
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs"
                    >
                      <span>Apply for Role</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {pageContent?.noPositionsText || 'No position available currently.'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Please check back later or submit a spontaneous application to join our talent pool.
            </p>
          </div>
        )}
      </section>

      {/* 13.4 General Application / Talent Pool */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center space-y-3">
          <h3 className="text-lg font-bold text-slate-900">
            {pageContent?.spontaneousTitle || 'Don’t see your exact academic role?'}
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            {pageContent?.spontaneousDescription ||
              'We are always interested in meeting talented academic editors, workshop facilitators, and conference organizers.'}
          </p>
          <div className="pt-2">
            {pageContent?.spontaneousFormLink ? (
              <a
                href={pageContent.spontaneousFormLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-3 rounded-xl cursor-pointer inline-flex items-center gap-2 shadow-xs"
              >
                <span>Submit Spontaneous Application</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={() => onSelectTab('contact')}
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-6 py-2.5 rounded-xl cursor-pointer"
              >
                Submit Spontaneous Application
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
