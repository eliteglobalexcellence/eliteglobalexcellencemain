'use client';

import React from 'react';
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle2,
  Users,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Building2,
  FileText,
  ExternalLink,
  Download
} from 'lucide-react';
import { DatabaseState, CourseItem } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface CoursesViewProps {
  data: DatabaseState;
  onRequestQuote: (courseTitle?: string) => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  data,
  onRequestQuote,
  onSelectTab,
}) => {
  const { courses } = data;
  const coursesPage = data.siteContent?.coursesPage || initialDatabase.siteContent.coursesPage || {};

  const frameworkSteps = coursesPage.frameworkSteps || [
    {
      number: '01',
      title: 'Synchronous Masterclasses',
      description: 'Live, interactive theoretical foundations and demonstration by senior research fellows.'
    },
    {
      number: '02',
      title: 'Hands-On Dataset Labs',
      description: 'Real-world data modeling in Python, R, SPSS, SmartPLS, and Overleaf LaTeX workspaces.'
    },
    {
      number: '03',
      title: 'Capstone Manuscript / Analysis',
      description: 'Complete a peer-review-ready empirical paper or thesis chapter under guided rubric.'
    },
    {
      number: '04',
      title: 'Serialized Certification',
      description: 'QR-coded verified credentials issued upon defense and project evaluation completion.'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* 7.1 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {coursesPage.heroBadge || 'SPECIALIZED LEARNING'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{coursesPage.heroTitle || 'Academic & Professional Courses'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {coursesPage.heroDescription || 'In-depth modular courses engineered to build robust competencies in scientific publishing, structural equation modeling, advanced Python data science, and doctoral research execution.'}
          </p>
        </div>
      </section>

      {/* 7.2 Course Catalog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {courses.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-4 max-w-2xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#045494] flex items-center justify-center mx-auto shadow-xs">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900">No Academic Courses Listed At The Moment</h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                We are currently updating our specialized course catalog for the upcoming session. Please check back soon or request a custom course syllabus tailored for your institution.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onRequestQuote('Custom Academic Course Inquiry')}
                className="inline-flex items-center gap-2 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-6 py-3 rounded-xl shadow-md transition cursor-pointer"
              >
                <span>Inquire Custom Course Track</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs hover:border-[#045494] hover:shadow-md transition flex flex-col justify-between space-y-6 overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Course Header & Badges */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      {course.code && (
                        <span className="font-mono text-xs font-bold text-[#045494] bg-blue-50 px-2.5 py-1 rounded-md">
                          {course.code}
                        </span>
                      )}
                      {course.category && (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md uppercase tracking-wider">
                          {course.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        <span>{course.duration}</span>
                      </span>
                      {course.level && (
                        <>
                          <span>·</span>
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold text-slate-700">
                            {course.level}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* FULL UNCROPPED COURSE POSTER IMAGE */}
                  {course.imageUrl && (
                    <div className="w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 flex items-center justify-center p-1.5 shadow-inner">
                      <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-auto max-h-[550px] object-contain rounded-xl shadow-xs"
                      />
                    </div>
                  )}

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {course.description}
                    </p>
                  </div>

                  {/* Objective */}
                  {course.objective && (
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-1">
                      <span className="font-bold text-[#045494] text-[11px] uppercase tracking-wider block">Course Objective:</span>
                      <p className="text-slate-700 font-medium leading-relaxed">{course.objective}</p>
                    </div>
                  )}

                  {/* Benefits List */}
                  {course.benefits && course.benefits.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        Key Benefits & Deliverables:
                      </span>
                      <div className="space-y-1.5">
                        {course.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Modules Outline */}
                  {course.modules && course.modules.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                        Core Modules:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {course.modules.map((mod, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                            <Sparkles className="w-3.5 h-3.5 text-[#045494] shrink-0" />
                            <span className="line-clamp-1">{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Course Outline PDF Download Link */}
                  {course.outlinePdfUrl && (
                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href={course.outlinePdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#045494] hover:underline bg-blue-50/80 px-3 py-1.5 rounded-lg border border-blue-100"
                      >
                        <FileText className="w-3.5 h-3.5 text-[#045494]" />
                        <span>Download Course Outline (PDF)</span>
                        <Download className="w-3 h-3 text-[#045494]" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-xs font-mono text-slate-500">
                    Mode: <span className="font-semibold text-slate-700">{course.mode}</span>
                  </div>
                  {course.googleFormLink ? (
                    <a
                      href={course.googleFormLink}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Register Now</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <button
                      onClick={() => onRequestQuote(course.title)}
                      className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <span>Enroll / Inquire Syllabus</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7.3 Pedagogical Design / Delivery Framework */}
      <section className="bg-slate-50/70 border-y border-slate-200/80 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              {coursesPage.frameworkBadge || 'PEDAGOGICAL DESIGN'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {coursesPage.frameworkTitle || 'The EGE Course Delivery Framework'}
            </h2>
            <p className="text-xs text-slate-500">
              {coursesPage.frameworkSubtitle || 'Rigorous, hands-on, and outcome-oriented course structure ensuring tangible academic deliverables.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworkSteps.map((step, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-2xl font-black text-[#045494]">{step.number || `0${idx + 1}`}</span>
                <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7.4 Institutional Licensing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#045494]">
              <Building2 className="w-4 h-4" />
              <span>{coursesPage.licensingBadge || 'UNIVERSITY & FACULTY LICENSING'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {coursesPage.licensingTitle || 'Sponsor a Cohort for Your Postgraduate Faculty'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {coursesPage.licensingDescription || 'Universities and research centers can license EGE courses for cohorts of 10 to 100+ postgraduate students and early-career faculty, customized to university KPIs.'}
            </p>
          </div>
          {coursesPage.licensingButtonLink ? (
            <a
              href={coursesPage.licensingButtonLink}
              target="_blank"
              rel="noreferrer"
              className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <span>{coursesPage.licensingButtonText || 'Request Cohort Quotation'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              onClick={() => onRequestQuote('Institutional Course Cohort Package')}
              className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-bold px-6 py-3 rounded-xl transition cursor-pointer shrink-0 shadow-xs"
            >
              {coursesPage.licensingButtonText || 'Request Cohort Quotation'}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

