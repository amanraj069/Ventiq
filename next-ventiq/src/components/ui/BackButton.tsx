'use client';

import { useRouter } from 'next/navigation';
import { ButtonHTMLAttributes } from 'react';

interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
 onClick?: () => void;
}

export function BackButton({ onClick, className = '', ...props }: BackButtonProps) {
 const router = useRouter();

 const handleBack = () => {
 if (onClick) {
 onClick();
 } else {
 router.back();
 }
 };

 return (
 <button
 onClick={handleBack}
 className={`
 inline-flex items-center justify-center w-10 h-10 rounded-full
 bg-bg text-fg-secondary hover:bg-bg-elevated hover:text-fg
 transition-all duration-[var(--duration-fast)] ease-[var(--ease-out-expo)]
 active:scale-[0.95] cursor-pointer border border-transparent
 hover:border-border hover:shadow-sm
 ${className}
 `.trim()}
 aria-label="Go back"
 {...props}
 >
 <svg
 width="20"
 height="20"
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth="2"
 strokeLinecap="round"
 strokeLinejoin="round"
 >
 <path d="M15 18l-6-6 6-6" />
 </svg>
 </button>
 );
}
