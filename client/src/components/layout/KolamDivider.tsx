'use client';

import React from 'react';

interface KolamDividerProps {
  className?: string;
  variant?: 'gold' | 'maroon' | 'ivory';
}

export default function KolamDivider({ className = '', variant = 'gold' }: KolamDividerProps) {
  const strokeColor =
    variant === 'gold' ? '#C6A15B' : variant === 'maroon' ? '#681F2B' : '#F8F3E9';

  return (
    <div className={`flex items-center justify-center py-6 overflow-hidden ${className}`}>
      <div className="flex items-center w-full max-w-lg px-4 space-x-3 opacity-80">
        <div
          className="flex-1 h-[1px]"
          style={{
            background: `linear-gradient(to right, transparent, ${strokeColor})`,
          }}
        />
        
        {/* Kolam Central Floral Knot Motif */}
        <svg
          width="48"
          height="24"
          viewBox="0 0 48 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0 animate-pulse duration-1000"
        >
          {/* Diamond Central Knot */}
          <path
            d="M24 2L30 12L24 22L18 12L24 2Z"
            stroke={strokeColor}
            strokeWidth="1.2"
            fill="none"
          />
          {/* Interlocking Petal Loops */}
          <path
            d="M12 12C12 7 18 7 24 12C30 7 36 7 36 12C36 17 30 17 24 12C18 17 12 17 12 12Z"
            stroke={strokeColor}
            strokeWidth="1.2"
            strokeDasharray="1 1"
          />
          {/* Outer Dots */}
          <circle cx="6" cy="12" r="1.5" fill={strokeColor} />
          <circle cx="42" cy="12" r="1.5" fill={strokeColor} />
          <circle cx="24" cy="12" r="1" fill={strokeColor} />
        </svg>

        <div
          className="flex-1 h-[1px]"
          style={{
            background: `linear-gradient(to left, transparent, ${strokeColor})`,
          }}
        />
      </div>
    </div>
  );
}
