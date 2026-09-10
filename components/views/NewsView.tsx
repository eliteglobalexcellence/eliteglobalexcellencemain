'use client';

import React, { useState } from 'react';
import {
  Calendar,
  User,
  ArrowRight,
  Eye,
  X,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { DatabaseState, NewsArticle } from '@/lib/types';
import { initialDatabase } from '@/lib/seedData';

interface NewsViewProps {
  data: DatabaseState;
  onOpenArticle?: (article: NewsArticle) => void;
  onSelectTab: (tab: string, subTab?: string) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({
  data,
  onSelectTab,
}) => {
  const pageContent = data.siteContent?.newsPage || initialDatabase.siteContent.newsPage;
  const articlesList = data.newsArticles && data.newsArticles.length > 0
    ? data.newsArticles
    : (pageContent?.articlesList || initialDatabase.newsArticles);

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [activeArticleModal, setActiveArticleModal] = useState<NewsArticle | null>(null);

  const categories = ['ALL', 'CONFERENCES', 'PARTNERSHIPS', 'WORKSHOPS', 'PUBLISHING'];

  const filteredNews = articlesList
    .filter((n) => n.isPublished !== false)
    .filter((n) => {
      if (selectedCategory === 'ALL') return true;
      return (n.category || 'PRESS RELEASE').toUpperCase() === selectedCategory.toUpperCase();
    });

  return (
    <div className="space-y-20 pb-20">
      {/* 12.1 Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50/50 pt-16 pb-16 border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
            {pageContent?.heroBadge || 'MEDIA & PRESS'}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-950 tracking-tight leading-tight">
            <span className="text-orange-gradient-animate drop-shadow-xs">{pageContent?.heroTitle || 'News & Announcements'}</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            {pageContent?.heroDescription ||
              'Latest press releases, conference announcements, university partnership milestones, and academic initiatives from Elite Global Excellence.'}
          </p>
        </div>
      </section>

      {/* 12.2 Category Filters & Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition ${selectedCategory === cat
                  ? 'bg-[#045494] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
              >
                {cat === 'ALL' ? 'All Updates' : cat}
              </button>
            ))}
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {filteredNews.length} published press releases
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:border-[#045494] hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {article.imageUrl && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-[#045494] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {article.category || 'PRESS RELEASE'}
                    </span>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1 font-semibold text-[#045494]">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{article.publishDate || article.date}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{article.publishedBy || article.author || 'EGE Strategic Communications'}</span>
                    </span>
                    {article.readsCount && (
                      <>
                        <span>·</span>
                        <span className="flex items-center gap-1 text-slate-500 font-mono">
                          <Eye className="w-3 h-3 text-slate-400" />
                          <span>{article.readsCount}</span>
                        </span>
                      </>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#045494] transition">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => setActiveArticleModal(article)}
                  className="text-xs font-bold text-[#045494] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Read Full Release</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 12.3 Media Kit & Press Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              {pageContent?.mediaBoxTitle || 'Media Relations & Press Inquiries'}
            </h3>
            <p className="text-xs text-slate-500">
              {pageContent?.mediaBoxDescription ||
                'For press inquiries, official media interviews, or brand asset requests, contact our corporate communications office.'}
            </p>
          </div>
          <button
            onClick={() => onSelectTab('contact')}
            className="bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer shrink-0"
          >
            {pageContent?.mediaBoxCtaText || 'Contact Media Office'}
          </button>
        </div>
      </section>

      {/* FULL PRESS RELEASE MODAL */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-100 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#045494] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {activeArticleModal.category || 'Press Release'}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 leading-snug">
                  {activeArticleModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticleModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100 text-slate-600 font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-[#045494]" />
                  <span>{activeArticleModal.publishDate || activeArticleModal.date}</span>
                </div>
                <div>
                  Published by: <strong className="text-slate-900">{activeArticleModal.publishedBy || activeArticleModal.author || 'EGE Strategic Communications'}</strong>
                </div>
                {activeArticleModal.readsCount && (
                  <div className="font-mono text-[#045494] font-bold">
                    {activeArticleModal.readsCount}
                  </div>
                )}
              </div>

              {activeArticleModal.imageUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs max-h-72">
                  <img
                    src={activeArticleModal.imageUrl}
                    alt={activeArticleModal.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="prose prose-sm max-w-none text-slate-700 leading-relaxed space-y-3 whitespace-pre-line text-xs">
                <p className="font-semibold text-slate-900 leading-relaxed text-xs">
                  {activeArticleModal.excerpt}
                </p>
                <div
                  className="pt-2 border-t border-slate-100 text-slate-700 leading-relaxed text-xs space-y-2"
                  dangerouslySetInnerHTML={{ __html: activeArticleModal.content || activeArticleModal.excerpt }}
                />
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-[11px] text-[#045494] font-semibold text-center">
                Elite Global Excellence Sdn. Bhd. · Official Media Release
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setActiveArticleModal(null)}
                className="bg-[#045494] hover:bg-[#033b68] text-white px-6 py-2.5 rounded-xl font-bold cursor-pointer text-xs shadow-xs flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Done Reading</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
