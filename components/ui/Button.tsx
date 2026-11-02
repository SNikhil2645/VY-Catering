'use client';

import React from 'react';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'cafe';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  loading = false,
  icon,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-sm';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 space-x-1.5',
    md: 'text-sm px-5 py-2.5 space-x-2',
    lg: 'text-base px-7 py-3.5 space-x-2.5',
  };

  const variantStyles = {
    primary:
      'bg-maroon hover:bg-maroon-600 text-ivory border border-gold/40 shadow-md hover:shadow-maroon/20 hover:border-gold focus:ring-maroon',
    gold:
      'bg-gold hover:bg-gold-light text-charcoal font-semibold shadow-md hover:shadow-gold/30 focus:ring-gold',
    outline:
      'bg-transparent border border-gold text-gold hover:bg-gold/10 hover:border-gold-light focus:ring-gold',
    ghost:
      'bg-transparent text-ivory/80 hover:text-ivory hover:bg-white/5 focus:ring-gold/50',
    cafe:
      'bg-marigold hover:bg-marigold-hover text-charcoal font-semibold shadow-md focus:ring-marigold',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {loading ? (
          <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        <span>{children}</span>
      </Link>
    );
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="flex-shrink-0">{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
}
