'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Command, ArrowRight, BookOpen, GraduationCap, Calendar, FileText, Briefcase } from 'lucide-react';
import { DatabaseState } from '@/lib/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: DatabaseState;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  data,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search through services, workshops, courses, articles, careers
  const servicesList = (data as any).services || [];
  const workshopsList = data.workshops || [];
  const coursesList = data.courses || [];
  const newsList = data.newsArticles || (data as any).news || [];

  const filteredServices = q
    ? servicesList.filter((s: any) => s.title?.toLowerCase().includes(q) || s.description?.toLowerCase().includes(q))
    : servicesList.slice(0, 3);

  const filteredWorkshops = q
    ? workshopsList.filter((w: any) => w.title?.toLowerCase().includes(q) || (w.description || '').toLowerCase().includes(q))
    : workshopsList.slice(0, 3);

  const filteredCourses = q
    ? coursesList.filter((c: any) => c.title?.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q))
    : coursesList.slice(0, 2);

  const filteredNews = q
    ? newsList.filter((n: any) => n.title?.toLowerCase().includes(q) || (n.excerpt || '').toLowerCase().includes(q))
    : newsList.slice(0, 2);

  const handleNavigate = (tab: string, subTab?: string) => {
    onSelectTab(tab, subTab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="relative p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search services, workshops, courses, news..."
            className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-hidden font-medium"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
              <X className="w-4 h-4" />
            </button>
          )}
          <span className="text-[10px] font-mono font-bold bg-slate-800 text-slate-400 px-2 py-1 rounded border border-slate-700 select-none">
            ESC
          </span>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 text-xs">
          {/* Quick Shortcuts if query is empty */}
          {!query && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Quick Navigation Shortcuts
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { label: 'Mock Viva Defense', tab: 'mock-viva', icon: GraduationCap },
                  { label: 'Academic Services', tab: 'services', icon: BookOpen },
                  { label: 'Workshops', tab: 'workshops', icon: Calendar },
                  { label: 'Research Network', tab: 'research-network', icon: Command },
                  { label: 'EGE Conferences', tab: 'conferences', icon: FileText },
                  { label: 'Open Careers', tab: 'careers', icon: Briefcase },
                ].map((item) => (
                  <button
                    key={item.tab}
                    onClick={() => handleNavigate(item.tab)}
                    className="flex items-center gap-2.5 p-2.5 bg-slate-800/60 hover:bg-blue-600/20 hover:border-blue-500/40 border border-slate-800 rounded-xl transition text-left cursor-pointer"
                  >
                    <item.icon className="w-4 h-4 text-blue-400 shrink-0" />
                    <span className="font-semibold text-slate-200 text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Services */}
          {filteredServices.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#008DDA] mb-2 flex items-center justify-between">
                <span>Services ({filteredServices.length})</span>
              </div>
              <div className="space-y-1.5">
                {filteredServices.map((s: any) => (
                  <button
                    key={s.id}
                    onClick={() => handleNavigate('services')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition text-left cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-100 text-xs group-hover:text-blue-300 transition">
                        {s.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{s.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Workshops */}
          {filteredWorkshops.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Workshops ({filteredWorkshops.length})
              </div>
              <div className="space-y-1.5">
                {filteredWorkshops.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleNavigate('workshops')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition text-left cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-100 text-xs group-hover:text-emerald-300 transition">
                        {w.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{w.date} · {w.mode}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Courses */}
          {filteredCourses.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 mb-2">
                Courses ({filteredCourses.length})
              </div>
              <div className="space-y-1.5">
                {filteredCourses.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleNavigate('courses')}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/80 transition text-left cursor-pointer group"
                  >
                    <div>
                      <div className="font-bold text-slate-100 text-xs group-hover:text-indigo-300 transition">
                        {c.title}
                      </div>
                      <div className="text-[11px] text-slate-400 line-clamp-1">{c.description || (c as any).overview}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 transition" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-300">Ctrl + K</span>
            <span>to toggle search anytime</span>
          </div>
          <button onClick={onClose} className="hover:text-white transition">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
