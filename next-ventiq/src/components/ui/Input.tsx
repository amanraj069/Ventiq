import { InputHTMLAttributes, forwardRef, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
 label?: string;
 error?: string;
 hint?: string;
 leftIcon?: ReactNode;
 rightIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
 ({ label, error, hint, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
 const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

 return (
 <div className="flex flex-col gap-1.5">
 {label && (
 <label
 htmlFor={inputId}
 className="text-sm font-medium text-fg-secondary cursor-pointer"
 >
 {label}
 </label>
 )}
 <div className="relative">
 {leftIcon && (
 <div className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted">
 {leftIcon}
 </div>
 )}
 <input
 ref={ref}
 id={inputId}
 className={`
 w-full h-10 px-3 text-sm text-fg
 bg-bg-elevated border rounded-[var(--radius-md)]
 placeholder:text-fg-faint
 transition-colors duration-[var(--duration-fast)]
 focus:outline-none focus:border-[var(--color-border-focus)] focus:ring-1 focus:ring-[var(--color-border-focus)]
 disabled:opacity-50 disabled:cursor-not-allowed
 ${error ? 'border-danger focus:border-danger focus:ring-danger' : 'border-border hover:border-border-strong'}
 ${leftIcon ? 'pl-10' : ''}
 ${rightIcon ? 'pr-10' : ''}
 ${className}
 `.trim()}
 aria-invalid={!!error}
 aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
 {...props}
 />
 {rightIcon && (
 <div className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted">
 {rightIcon}
 </div>
 )}
 </div>
 {error && (
 <p id={`${inputId}-error`} className="text-xs text-danger" role="alert">
 {error}
 </p>
 )}
 {!error && hint && (
 <p id={`${inputId}-hint`} className="text-xs text-fg-muted">
 {hint}
 </p>
 )}
 </div>
 );
 }
);

Input.displayName = 'Input';
