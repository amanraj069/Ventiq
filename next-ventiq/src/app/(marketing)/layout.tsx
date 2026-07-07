'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, SessionProvider } from 'next-auth/react';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { PageTransition } from '@/components/motion/PageTransition';
import Image from 'next/image';

const NAV_LINKS = [
 { label: 'How It Works', href: '/how-it-works' },
 { label: 'For Investors', href: '/for-investors' },
 { label: 'Pricing', href: '/pricing' },
 { label: 'About', href: '/about' },
];

const FOOTER_LINKS = {
 Product: [
 { label: 'How It Works', href: '/how-it-works' },
 { label: 'For Investors', href: '/for-investors' },
 { label: 'Pricing', href: '/pricing' },
 ],
 Company: [
 { label: 'About', href: '/about' },
 ],
 Legal: [
 { label: 'Privacy Policy', href: '/legal/privacy' },
 { label: 'Terms of Service', href: '/legal/terms' },
 ],
};

function MarketingTopbar() {
 const pathname = usePathname();
 const { status } = useSession();

 return (
 <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-border">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
 {/* Logo */}
 <Link href="/" className="flex items-center gap-2.5 group cursor-pointer hover:opacity-80 transition-opacity">
 <Image src="/Ventiq_w.png" alt="Ventiq" width={28} height={28} className="dark:invert-0 invert" />
 <span className="text-base font-semibold text-fg group-hover:text-fg-secondary transition-colors">Ventiq</span>
 </Link>

 {/* Nav Links — Desktop */}
 <nav className="hidden md:flex items-center gap-1">
 {NAV_LINKS.map((link) => {
 const isActive = pathname === link.href;
 return (
 <Link
 key={link.href}
 href={link.href}
 className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
 isActive ? 'text-fg bg-bg-elevated' : 'text-fg-muted hover:text-fg hover:bg-bg-elevated'
 }`}
 >
 {link.label}
 </Link>
 );
 })}
 </nav>

 {/* Right */}
 <div className="flex items-center gap-3">
 <ThemeToggle />
          {status === 'authenticated' ? (
            <Link
              href="/dashboard"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-fg text-bg hover:opacity-90 transition-opacity"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-fg text-bg hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          )}
 </div>
 </div>
 </header>
 );
}

function MarketingFooter() {
 return (
 <footer className="border-t border-border bg-bg">
 <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
 <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
 {/* Brand */}
 <div className="col-span-2 sm:col-span-1">
 <Link href="/" className="flex items-center gap-2.5 mb-4 group hover:opacity-80 transition-opacity cursor-pointer">
 <Image src="/Ventiq_w.png" alt="Ventiq" width={28} height={28} className="dark:invert-0 invert" />
 <span className="text-sm font-semibold text-fg">Ventiq</span>
 </Link>
 <p className="text-fg-faint text-sm leading-relaxed">
 AI-powered startup pitch evaluation and investor matching.
 </p>
 </div>

 {/* Link groups */}
 {Object.entries(FOOTER_LINKS).map(([group, links]) => (
 <div key={group}>
 <h4 className="text-sm font-semibold text-fg-secondary mb-3">{group}</h4>
 <ul className="space-y-2">
 {links.map((link) => (
 <li key={link.href}>
 <Link href={link.href} className="text-sm text-fg-faint hover:text-fg transition-colors">
 {link.label}
 </Link>
 </li>
 ))}
 </ul>
 </div>
 ))}
 </div>

 <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
 <p className="text-xs text-fg-faint">
 © {new Date().getFullYear()} Ventiq. All rights reserved.
 </p>
 <div className="flex gap-4 text-fg-faint">
 <Link href="/legal/privacy" className="text-xs hover:text-fg transition-colors">Privacy</Link>
 <Link href="/legal/terms" className="text-xs hover:text-fg transition-colors">Terms</Link>
 </div>
 </div>
 </div>
 </footer>
 );
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen bg-bg text-fg flex flex-col">
        <MarketingTopbar />
        <main className="flex-1 pt-16">
          <PageTransition>{children}</PageTransition>
        </main>
        <MarketingFooter />
      </div>
    </SessionProvider>
  );
}
