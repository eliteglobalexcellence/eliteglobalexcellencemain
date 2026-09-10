'use client';

import React from 'react';
import { X, Globe, Award, BookOpen, GraduationCap, Linkedin } from 'lucide-react';
import { Ambassador } from '@/lib/types';

interface AmbassadorBioModalProps {
  ambassador: Ambassador | null;
  onClose: () => void;
  onSelectCollab?: () => void;
}

export const AmbassadorBioModal: React.FC<AmbassadorBioModalProps> = ({
  ambassador,
  onClose,
  onSelectCollab,
}) => {
  if (!ambassador) return null;

  const memberImage = ambassador.imageUrl || ambassador.photoUrl || ambassador.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
  const linkedinLink = ambassador.linkedinUrl || ambassador.linkedin;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-5 text-center sm:text-left">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-blue-100 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={memberImage}
              alt={ambassador.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 flex-wrap">
              <span className="bg-blue-50 text-[#045494] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Global Advisory Board Member
              </span>
              <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-500" />
                <span>{ambassador.country}</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-900">{ambassador.name}</h2>
            <p className="text-xs font-medium text-slate-600 mt-0.5">{ambassador.title}</p>
            {linkedinLink && (
              <a
                href={linkedinLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#0a66c2] hover:text-white hover:bg-[#0a66c2] bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100 transition"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
            )}
          </div>
        </div>

        <div className="space-y-4 text-xs text-slate-700">
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5 text-[#045494]">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Background & Overview</span>
            </h4>
            <p className="leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
              {ambassador.bio}
            </p>
          </div>

          {ambassador.researchInterests && ambassador.researchInterests.length > 0 && (
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5 text-[#045494]">
                <BookOpen className="w-4 h-4" />
                <span>Research Interests & Specializations</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {ambassador.researchInterests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-50 text-[#045494] font-semibold px-2.5 py-1 rounded-lg border border-blue-100"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {ambassador.collaborationHighlights && (
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1 flex items-center gap-1.5 text-[#045494]">
                <Award className="w-4 h-4" />
                <span>EGE Collaboration Highlights</span>
              </h4>
              <p className="leading-relaxed bg-amber-50/50 p-3 rounded-xl border border-amber-200/60 text-amber-950">
                {ambassador.collaborationHighlights}
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Elite Global Excellence Academic Network
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold rounded-xl cursor-pointer shadow-xs transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
