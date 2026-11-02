import React from 'react';

interface DietaryIndicatorProps {
  type: 'VEG' | 'NON_VEG' | 'SATVIK' | 'JAIN' | 'HALAL' | string;
  showLabel?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export default function DietaryIndicator({
  type,
  showLabel = true,
  size = 'sm',
  className = '',
}: DietaryIndicatorProps) {
  const isVeg = type === 'VEG' || type === 'SATVIK' || type === 'JAIN';

  const label =
    type === 'VEG'
      ? 'Vegetarian'
      : type === 'NON_VEG'
      ? 'Non-Veg'
      : type === 'SATVIK'
      ? 'Satvik'
      : type === 'JAIN'
      ? 'Jain'
      : type === 'HALAL'
      ? 'Halal'
      : type;

  const boxSize = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';

  return (
    <div
      className={`inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-sm backdrop-blur-md border ${
        isVeg
          ? 'bg-emerald-950/70 border-emerald-600/40 text-emerald-300'
          : 'bg-red-950/70 border-red-700/40 text-red-300'
      } ${className}`}
      title={label}
    >
      {/* Authentic Indian Standard FSSAI-style Dietary Symbol */}
      <span
        aria-hidden="true"
        className={`flex items-center justify-center rounded-[2px] border ${boxSize} ${
          isVeg ? 'border-emerald-500 bg-transparent' : 'border-red-500 bg-transparent'
        }`}
      >
        <span
          className={`rounded-full ${dotSize} ${
            isVeg ? 'bg-emerald-500' : 'bg-red-500'
          }`}
        />
      </span>

      {showLabel && (
        <span className="text-[10px] font-semibold tracking-wider uppercase">
          {label}
        </span>
      )}
    </div>
  );
}
