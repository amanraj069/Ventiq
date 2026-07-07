import { HTMLAttributes, forwardRef } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
 variant?: 'default' | 'interactive' | 'bordered';
 padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantStyles = {
 default: 'bg-card shadow-sm border border-border',
 interactive:
 'bg-card shadow-sm border border-border hover:shadow-md hover:-translate-y-0.5 hover:border-border-strong transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] cursor-pointer',
 bordered: 'bg-transparent border border-border',
};

const paddingStyles = {
 none: '',
 sm: 'p-4',
 md: 'p-6',
 lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
 ({ variant = 'default', padding = 'md', className = '', children, ...props }, ref) => {
 return (
 <div
 ref={ref}
 className={`
 rounded-[var(--radius-lg)]
 ${variantStyles[variant]}
 ${paddingStyles[padding]}
 ${className}
 `.trim()}
 {...props}
 >
 {children}
 </div>
 );
 }
);

Card.displayName = 'Card';

/* Card sub-components for structured content */
export function CardHeader({
 className = '',
 children,
 ...props
}: HTMLAttributes<HTMLDivElement>) {
 return (
 <div className={`flex flex-col gap-1.5 ${className}`} {...props}>
 {children}
 </div>
 );
}

export function CardTitle({
 className = '',
 children,
 ...props
}: HTMLAttributes<HTMLHeadingElement>) {
 return (
 <h3
 className={`text-lg font-semibold text-fg leading-tight ${className}`}
 {...props}
 >
 {children}
 </h3>
 );
}

export function CardDescription({
 className = '',
 children,
 ...props
}: HTMLAttributes<HTMLParagraphElement>) {
 return (
 <p className={`text-sm text-fg-muted leading-relaxed ${className}`} {...props}>
 {children}
 </p>
 );
}

export function CardContent({
 className = '',
 children,
 ...props
}: HTMLAttributes<HTMLDivElement>) {
 return (
 <div className={`${className}`} {...props}>
 {children}
 </div>
 );
}

export function CardFooter({
 className = '',
 children,
 ...props
}: HTMLAttributes<HTMLDivElement>) {
 return (
 <div
 className={`flex items-center pt-4 border-t border-border ${className}`}
 {...props}
 >
 {children}
 </div>
 );
}
