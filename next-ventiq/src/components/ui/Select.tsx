'use client';

import { SelectHTMLAttributes, forwardRef, ReactNode } from 'react';

interface SelectOption {
 value: string;
 label: string;
 disabled?: boolean;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
 label?: string;
 error?: string;
 hint?: string;
 options: SelectOption[];
 placeholder?: string;
 leftIcon?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
 ({ label, error, hint, options, placeholder, leftIcon, className = '', id, ...props }, ref) => {
 const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');

 return (
 <div className="flex flex-col gap-1.5">
 {label && (
 <label
 htmlFor={selectId}
 className="text-sm font-medium text-fg-secondary cursor-pointer"
 >
 {label}
 </label>
 )}
 <div className="relative">
 {leftIcon && (
 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none">
 {leftIcon}
 </div>
 )}
 <select
 ref={ref}
 id={selectId}
 className={`
 w-full h-10 px-3 pr-8 text-sm text-fg appearance-none
 bg-bg-elevated border rounded-[var(--radius-md)]
 transition-colors duration-[var(--duration-fast)]
 focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)]
 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
 ${error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border hover:border-border-strong'}
 ${leftIcon ? 'pl-10' : ''}
 ${className}
 `.trim()}
 aria-invalid={!!error}
 aria-describedby={error ? `${selectId}-error` : hint ? `${selectId}-hint` : undefined}
 {...props}
 >
 {placeholder && (
 <option value="" disabled>
 {placeholder}
 </option>
 )}
 {options.map((opt) => (
 <option key={opt.value} value={opt.value} disabled={opt.disabled}>
 {opt.label}
 </option>
 ))}
 </select>
 {/* Dropdown chevron */}
 <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-fg-muted">
 <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
 <path d="M3 4.5L6 7.5L9 4.5" />
 </svg>
 </div>
 </div>
 {error && (
 <p id={`${selectId}-error`} className="text-xs text-danger" role="alert">
 {error}
 </p>
 )}
 {!error && hint && (
 <p id={`${selectId}-hint`} className="text-xs text-fg-muted">
 {hint}
 </p>
 )}
 </div>
 );
 }
);

Select.displayName = 'Select';
