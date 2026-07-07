import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 variant?: ButtonVariant;
 size?: ButtonSize;
 isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
 primary:
 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-xs active:scale-[0.97]',
 secondary:
 'bg-bg-elevated text-fg border border-border hover:bg-card-hover active:scale-[0.97]',
 ghost:
 'bg-transparent text-fg-secondary hover:bg-bg-sunken active:scale-[0.97]',
 danger:
 'bg-danger text-fg hover:bg-danger/90 shadow-xs active:scale-[0.97]',
 outline:
 'bg-transparent text-accent border border-accent hover:bg-accent-subtle active:scale-[0.97]',
};

const sizeStyles: Record<ButtonSize, string> = {
 sm: 'h-8 px-3 text-sm gap-1.5 rounded-[var(--radius-sm)]',
 md: 'h-10 px-4 text-sm gap-2 rounded-[var(--radius-md)]',
 lg: 'h-12 px-6 text-base gap-2.5 rounded-[var(--radius-md)]',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
 (
 { variant = 'primary', size = 'md', isLoading, className = '', children, disabled, ...props },
 ref
 ) => {
 return (
 <button
 ref={ref}
 className={`
 inline-flex items-center justify-center font-medium
 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]
 focus-ring cursor-pointer
 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
 ${variantStyles[variant]}
 ${sizeStyles[size]}
 ${className}
 `.trim()}
 disabled={disabled || isLoading}
 {...props}
 >
 {isLoading && (
 <svg
 className="animate-spin -ml-1 h-4 w-4"
 xmlns="http://www.w3.org/2000/svg"
 fill="none"
 viewBox="0 0 24 24"
 >
 <circle
 className="opacity-25"
 cx="12"
 cy="12"
 r="10"
 stroke="currentColor"
 strokeWidth="4"
 />
 <path
 className="opacity-75"
 fill="currentColor"
 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
 />
 </svg>
 )}
 {children}
 </button>
 );
 }
);

Button.displayName = 'Button';
