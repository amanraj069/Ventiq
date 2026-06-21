import { HTMLAttributes, forwardRef } from 'react';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'info' | 'outline';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-bg-sunken text-fg-secondary border-transparent',
  accent: 'bg-accent-subtle text-accent border-transparent',
  success: 'bg-success-subtle text-success border-transparent',
  warning: 'bg-warning-subtle text-warning border-transparent',
  danger: 'bg-danger-subtle text-danger border-transparent',
  info: 'bg-info-subtle text-info border-transparent',
  outline: 'bg-transparent text-fg-secondary border-border',
};

const sizeStyles = {
  sm: 'h-5 px-1.5 text-[11px]',
  md: 'h-6 px-2 text-xs',
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={`
          inline-flex items-center justify-center
          font-medium rounded-[var(--radius-full)]
          border whitespace-nowrap
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `.trim()}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
