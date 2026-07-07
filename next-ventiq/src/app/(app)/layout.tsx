'use client';

import { SessionProvider } from 'next-auth/react';
import { AppShell } from '@/components/shell/AppShell';
import { PageTransition } from '@/components/motion/PageTransition';

export default function AppLayout({ children }: { children: React.ReactNode }) {
 return (
 <SessionProvider>
 <AppShell>
 <PageTransition>{children}</PageTransition>
 </AppShell>
 </SessionProvider>
 );
}
