'use client';

import React from 'react';

export const CardSkeleton: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-slate-800 rounded-md w-1/3" />
      <div className="h-8 bg-slate-800 rounded-lg w-2/3" />
      <div className="space-y-2 pt-2">
        <div className="h-3 bg-slate-800/80 rounded-md w-full" />
        <div className="h-3 bg-slate-800/80 rounded-md w-4/5" />
      </div>
    </div>
  );
};

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 5 }) => {
  return (
    <div className="w-full space-y-3 animate-pulse">
      {Array.from({ length: rows }).map((_, idx) => (
        <div key={idx} className="h-12 bg-slate-800/60 rounded-xl w-full border border-slate-800/40" />
      ))}
    </div>
  );
};
