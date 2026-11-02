import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'maroon' | 'veg' | 'non-veg' | 'charcoal' | 'banana';
  className?: string;
}

export default function Badge({ children, variant = 'gold', className = '' }: BadgeProps) {
  const variantStyles = {
    gold: 'bg-gold/15 text-gold border-gold/30',
    maroon: 'bg-maroon/20 text-maroon-500 border-maroon/40',
    veg: 'bg-green-950/40 text-green-400 border-green-600/40',
    'non-veg': 'bg-red-950/40 text-red-400 border-red-600/40',
    charcoal: 'bg-charcoal-700 text-ivory/80 border-white/10',
    banana: 'bg-banana/20 text-banana-light border-banana/40',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border tracking-wide uppercase ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
