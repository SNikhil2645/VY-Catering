import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  borderVariant?: 'gold' | 'maroon' | 'subtle' | 'none';
}

export default function Card({
  children,
  className = '',
  hoverEffect = false,
  borderVariant = 'subtle',
}: CardProps) {
  const borderClasses = {
    gold: 'border border-gold/40 hover:border-gold',
    maroon: 'border border-maroon/40 hover:border-maroon',
    subtle: 'border border-white/10 hover:border-gold/30',
    none: 'border-0',
  };

  const hoverClasses = hoverEffect
    ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40'
    : '';

  return (
    <div
      className={`bg-charcoal-700/60 backdrop-blur-sm rounded-sm p-6 ${borderClasses[borderVariant]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}
