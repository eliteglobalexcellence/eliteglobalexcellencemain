'use client';

import React from 'react';
import { X, Calendar, User, Tag, Share2 } from 'lucide-react';
import { NewsArticle } from '@/lib/types';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-[#045494] text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            {article.category}
          </span>
          <span className="text-slate-400 text-xs flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{article.publishDate}</span>
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight mb-4">
          {article.title}
        </h2>

        {article.imageUrl && (
          <div className="rounded-xl overflow-hidden mb-5 border border-slate-100 aspect-video relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between py-2.5 border-y border-slate-100 text-xs text-slate-500 mb-5">
          <div className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-[#045494]" />
            <span>Published by: <strong className="text-slate-700">{article.author}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>{article.viewsCount || 1200}+ reads</span>
          </div>
        </div>

        <div className="prose prose-slate prose-sm max-w-none text-slate-700 leading-relaxed space-y-4 whitespace-pre-line text-sm">
          {article.content}
        </div>

        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            Elite Global Excellence Sdn. Bhd. · Official Media Release
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#045494] hover:bg-[#033b68] text-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
