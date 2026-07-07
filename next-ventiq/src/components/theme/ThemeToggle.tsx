'use client';

import { useTheme } from './ThemeProvider';

/**
 * Custom sun/moon theme toggle with smooth CSS transition.
 * Replaces @theme-toggles/react which ships raw TypeScript that
 * Turbopack cannot process. The animation mimics the "Classic" toggle style.
 */
export function ThemeToggle() {
 const { theme, toggleTheme } = useTheme();
 const isDark = theme === 'dark';

 return (
 <button
 onClick={toggleTheme}
 aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
 className="relative w-9 h-9 flex items-center justify-center rounded-[var(--radius-md)] text-fg-muted hover:text-fg hover:bg-bg-sunken transition-all duration-[var(--duration-normal)] ease-[var(--ease-out-expo)] cursor-pointer focus-ring"
 >
 {/* Sun icon */}
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth={1.5}
 strokeLinecap="round"
 strokeLinejoin="round"
 className={`w-5 h-5 absolute transition-all duration-500 ease-[var(--ease-out-expo)] ${
 isDark
 ? 'opacity-0 rotate-90 scale-0'
 : 'opacity-100 rotate-0 scale-100'
 }`}
 >
 <circle cx="12" cy="12" r="5" />
 <line x1="12" y1="1" x2="12" y2="3" />
 <line x1="12" y1="21" x2="12" y2="23" />
 <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
 <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
 <line x1="1" y1="12" x2="3" y2="12" />
 <line x1="21" y1="12" x2="23" y2="12" />
 <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
 <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
 </svg>

 {/* Moon icon */}
 <svg
 viewBox="0 0 24 24"
 fill="none"
 stroke="currentColor"
 strokeWidth={1.5}
 strokeLinecap="round"
 strokeLinejoin="round"
 className={`w-5 h-5 absolute transition-all duration-500 ease-[var(--ease-out-expo)] ${
 isDark
 ? 'opacity-100 rotate-0 scale-100'
 : 'opacity-0 -rotate-90 scale-0'
 }`}
 >
 <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
 </svg>
 </button>
 );
}
