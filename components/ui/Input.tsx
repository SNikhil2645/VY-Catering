import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || props.name || Math.random().toString(36).substring(2, 9);

    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={inputId} className="block text-xs uppercase tracking-wider font-semibold text-ivory/80 mb-1.5">
            {label}
            {props.required && <span className="text-marigold ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            className={`w-full bg-charcoal-700/80 border text-ivory placeholder-ivory/40 text-sm rounded-sm px-3.5 py-2.5 transition-all focus:outline-none focus:ring-1 ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-white/15 hover:border-gold/50 focus:border-gold focus:ring-gold'
            } ${className}`}
            {...props}
          />
        </div>
        {error ? (
          <p className="mt-1 text-xs text-red-400 font-medium">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-ivory/50">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
