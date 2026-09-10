'use client';

import React, { useState } from 'react';

interface EgeLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  textColor?: string;
}

export const EgeLogo: React.FC<EgeLogoProps> = ({
  className = '',
  size = 56,
  showText = false,
  textColor = 'text-[#045494]',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {!imgError ? (
        <img
          src="/images/ege_full_logo.png"
          alt="Elite Global Excellence Logo"
          style={{ height: size, width: 'auto' }}
          className="shrink-0 object-contain drop-shadow-xs"
          onError={() => setImgError(true)}
        />
      ) : (
        <svg
          width={size}
          height={size}
          viewBox="0 0 500 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 drop-shadow-xs"
        >
          <defs>
            <linearGradient id="egeOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* GRADUATION CAP (MORTARBOARD) */}
          <path
            d="M250 15 L490 145 L250 275 L10 145 Z"
            fill="#045494"
          />
          {/* Cap Tassel */}
          <path
            d="M20 145 L20 280 M20 280 C10 280, 10 310, 20 310 C30 310, 30 280, 20 280"
            stroke="#045494"
            strokeWidth="12"
            strokeLinecap="round"
            fill="#045494"
          />
          {/* Cap Underside Base */}
          <path
            d="M105 197 L105 270 C105 315, 395 315, 395 270 L395 197"
            fill="#045494"
          />

          {/* ORANGE GRADIENT RING (OUTER CIRCLE WITH BREAK AT BOTTOM RIGHT) */}
          <path
            d="M 370 540 A 220 220 0 1 1 450 360"
            fill="none"
            stroke="url(#egeOrangeGrad)"
            strokeWidth="48"
            strokeLinecap="round"
          />

          {/* INNER MONOGRAM EGE IN CIRCLE */}
          <g transform="translate(250, 380)">
            <circle cx="0" cy="0" r="160" fill="#FFFFFF" />
            <path
              d="M -130 -60 C -130 -120, -70 -140, -10 -140 L -10 -80 C -40 -80, -70 -70, -70 -40 L -10 -40 L -10 10 L -70 10 L -70 40 C -70 70, -40 80, -10 80 L -10 140 C -70 140, -130 120, -130 60 Z"
              fill="#045494"
            />
            <path
              d="M -40 -150 L 20 -150 L 20 150 L -40 150 L -40 30 L 0 30 L 0 -30 L -40 -30 Z"
              fill="#045494"
            />
            <path
              d="M 10 -140 C 70 -140, 130 -120, 130 -60 L 70 -60 C 70 -70, 40 -80, 10 -80 L 10 -40 L 70 -40 L 70 10 L 10 10 L 10 40 C 10 70, 40 80, 70 80 L 130 80 C 130 120, 70 140, 10 140 Z"
              fill="#045494"
            />
          </g>
        </svg>
      )}

      {showText && (
        <div className="flex flex-col leading-tight">
          <span className={`font-black tracking-tight text-lg uppercase font-serif ${textColor}`}>
            Elite Global Excellence
          </span>
          <span className="text-[10px] font-extrabold tracking-widest text-amber-600 uppercase">
            Research & Innovation Council
          </span>
        </div>
      )}
    </div>
  );
};
