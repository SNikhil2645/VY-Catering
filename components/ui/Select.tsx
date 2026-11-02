import React, { forwardRef } from 'react';

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className = '', id, ...props }, ref) => {
    const selectId = id || props.name || Math.random().toString(36).substring(2, 9);

    return (
      <div className="w-full text-left">
        {label && (
          <label htmlFor={selectId} className="block text-xs uppercase tracking-wider font-semibold text-ivory/80 mb-1.5">
            {label}
            {props.required && <span className="text-marigold ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={`w-full bg-charcoal-700/80 border text-ivory text-sm rounded-sm px-3.5 py-2.5 transition-all focus:outline-none focus:ring-1 appearance-none cursor-pointer ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                : 'border-white/15 hover:border-gold/50 focus:border-gold focus:ring-gold'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-charcoal text-ivory">
                {opt.label}
              </option>
            ))}
          </select>
          {/* Custom Chevron icon */}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gold">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
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

Select.displayName = 'Select';
