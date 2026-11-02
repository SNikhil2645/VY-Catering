import React from 'react';
import { Flame } from 'lucide-react';

interface SpiceIndicatorProps {
  level: number | null | undefined;
  className?: string;
  showText?: boolean;
}

export default function SpiceIndicator({
  level = 2,
  className = '',
  showText = true,
}: SpiceIndicatorProps) {
  if (!level) {
    return <span className={`text-[11px] text-ivory/50 ${className}`}>Mild</span>;
  }

  const spiceLabels: Record<number, string> = {
    1: 'Mild',
    2: 'Medium',
    3: 'Traditional Spice',
    4: 'Fiery Rayalaseema',
    5: 'Extra Hot Guntur',
  };

  const label = spiceLabels[level] || `Spice: Level ${level}`;

  return (
    <div
      className={`inline-flex items-center space-x-1.5 text-xs ${className}`}
      title={label}
    >
      <div className="flex items-center space-x-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((i) => (
          <Flame
            key={i}
            className={`w-3 h-3 transition-colors ${
              i <= level
                ? level >= 4
                  ? 'fill-red-500 text-red-500'
                  : level === 3
                  ? 'fill-amber-500 text-amber-500'
                  : 'fill-gold text-gold'
                : 'text-white/15'
            }`}
          />
        ))}
      </div>
      {showText && (
        <span className="text-[10px] text-ivory/70 font-medium">
          {label}
        </span>
      )}
    </div>
  );
}
