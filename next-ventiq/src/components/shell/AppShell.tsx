'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { apiFetch } from '@/lib/api';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
 IconLayoutDashboard,
 IconBulb,
 IconSend,
 IconCompass,
 IconHeart,
 IconShieldCheck,
 IconLogout,
 IconMenu2,
 IconX,
 IconChevronLeft,
 IconChevronRight,
} from '@tabler/icons-react';

// ── Types ──
interface UserInfo {
 userId: string;
 name: string;
 email: string;
 picture?: string;
 role: 'founder' | 'investor' | 'admin';
}

interface NavItem {
 label: string;
 href: string;
 icon: React.ReactNode;
 roles: string[];
}

interface ShellContextValue {
 user: UserInfo | null;
 collapsed: boolean;
}

const ShellContext = createContext<ShellContextValue>({ user: null, collapsed: false });
export function useShell() { return useContext(ShellContext); }

// ── Nav Items ──
const NAV_ITEMS: NavItem[] = [
 { label: 'Dashboard', href: '/dashboard', icon: <IconLayoutDashboard size={20} stroke={1.5} />, roles: ['founder', 'investor', 'admin'] },
 { label: 'My Pitches', href: '/ideas', icon: <IconBulb size={20} stroke={1.5} />, roles: ['founder'] },
 { label: 'Submit Idea', href: '/submit', icon: <IconSend size={20} stroke={1.5} />, roles: ['founder'] },
 { label: 'Explore', href: '/explore', icon: <IconCompass size={20} stroke={1.5} />, roles: ['investor'] },
 { label: 'My Interests', href: '/interests', icon: <IconHeart size={20} stroke={1.5} />, roles: ['investor'] },
 { label: 'Verification', href: '/admin/investors', icon: <IconShieldCheck size={20} stroke={1.5} />, roles: ['admin'] },
];

// ── Sidebar ──
function Sidebar({
 user,
 collapsed,
 setCollapsed,
}: {
 user: UserInfo | null;
 collapsed: boolean;
 setCollapsed: (v: boolean) => void;
}) {
 const pathname = usePathname();
 const router = useRouter();
 const visibleItems = NAV_ITEMS.filter((item) => user && item.roles.includes(user.role));

 return (
 <aside
 className={`hidden md:flex flex-col fixed top-0 left-0 h-full z-40 border-r border-border bg-sidebar transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
 collapsed ? 'w-[68px]' : 'w-[240px]'
 }`}
 >
 {/* Logo */}
 <Link href="/" className="h-14 flex items-center px-5 border-b border-border gap-3 flex-shrink-0 group hover:opacity-80 transition-opacity cursor-pointer">
 <Image src="/Ventiq_w.png" alt="Ventiq" width={28} height={28} className="dark:invert-0 invert flex-shrink-0" />
 <AnimatePresence>
 {!collapsed && (
 <motion.span
 initial={{ opacity: 0, width: 0 }}
 animate={{ opacity: 1, width: 'auto' }}
 exit={{ opacity: 0, width: 0 }}
 transition={{ duration: 0.2 }}
 className="text-sm font-semibold text-fg whitespace-nowrap overflow-hidden"
 >
 Ventiq
 </motion.span>
 )}
 </AnimatePresence>
 </Link>

 {/* Nav Links */}
 <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
 {visibleItems.map((item) => {
 const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
 return (
 <button
 key={item.href}
 onClick={() => router.push(item.href)}
 className={`w-full flex items-center gap-3 h-10 rounded-lg transition-all duration-150 cursor-pointer group ${
 collapsed ? 'justify-center px-0' : 'px-3'
 } ${
 isActive
 ? 'bg-bg-elevated text-fg'
 : 'text-fg-muted hover:text-fg hover:bg-bg-elevated'
 }`}
 title={collapsed ? item.label : undefined}
 >
 <span className={`flex-shrink-0 ${isActive ? 'text-fg-secondary' : 'group-hover:text-fg'}`}>
 {item.icon}
 </span>
 <AnimatePresence>
 {!collapsed && (
 <motion.span
 initial={{ opacity: 0, width: 0 }}
 animate={{ opacity: 1, width: 'auto' }}
 exit={{ opacity: 0, width: 0 }}
 transition={{ duration: 0.15 }}
 className="text-sm font-medium whitespace-nowrap overflow-hidden"
 >
 {item.label}
 </motion.span>
 )}
 </AnimatePresence>
 </button>
 );
 })}
 </nav>

 {/* Footer */}
 <div className="border-t border-border px-3 py-3 space-y-2 flex-shrink-0">
 {/* Theme toggle */}
 <div className={`flex items-center ${collapsed ? 'justify-center' : 'px-1'}`}>
 <ThemeToggle />
 </div>

 {/* Collapse toggle */}
 <button
 onClick={() => setCollapsed(!collapsed)}
 className={`w-full flex items-center gap-3 h-9 rounded-lg text-fg-faint hover:text-fg hover:bg-bg-elevated transition-all duration-150 cursor-pointer ${
 collapsed ? 'justify-center px-0' : 'px-3'
 }`}
 >
 {collapsed ? <IconChevronRight size={18} stroke={1.5} /> : <IconChevronLeft size={18} stroke={1.5} />}
 <AnimatePresence>
 {!collapsed && (
 <motion.span
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="text-xs font-medium"
 >
 Collapse
 </motion.span>
 )}
 </AnimatePresence>
 </button>

 {/* User + Logout */}
 {user && (
 <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : 'px-1'}`}>
 {user.picture ? (
 <img src={user.picture} alt="" className="w-8 h-8 rounded-full border border-border flex-shrink-0" />
 ) : (
 <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center text-fg-muted text-sm font-medium flex-shrink-0">
 {user.name?.charAt(0) || '?'}
 </div>
 )}
 <AnimatePresence>
 {!collapsed && (
 <motion.div
 initial={{ opacity: 0, width: 0 }}
 animate={{ opacity: 1, width: 'auto' }}
 exit={{ opacity: 0, width: 0 }}
 transition={{ duration: 0.15 }}
 className="flex-1 min-w-0 overflow-hidden"
 >
 <p className="text-sm font-medium text-fg truncate">{user.name}</p>
 <p className="text-[11px] text-fg-faint truncate">{user.email}</p>
 </motion.div>
 )}
 </AnimatePresence>
 <AnimatePresence>
 {!collapsed && (
 <motion.button
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={() => signOut({ callbackUrl: '/' })}
 className="text-fg-faint hover:text-red-400 transition-colors cursor-pointer flex-shrink-0"
 title="Sign out"
 >
 <IconLogout size={16} stroke={1.5} />
 </motion.button>
 )}
 </AnimatePresence>
 </div>
 )}
 </div>
 </aside>
 );
}

// ── Mobile Drawer ──
function MobileDrawer({
 open,
 onClose,
 user,
}: {
 open: boolean;
 onClose: () => void;
 user: UserInfo | null;
}) {
 const pathname = usePathname();
 const router = useRouter();
 const visibleItems = NAV_ITEMS.filter((item) => user && item.roles.includes(user.role));

 return (
 <AnimatePresence>
 {open && (
 <>
 {/* Backdrop */}
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 onClick={onClose}
 className="fixed inset-0 bg-bg/60 backdrop-blur-sm z-50 md:hidden"
 />
 {/* Drawer */}
 <motion.div
 initial={{ x: '-100%' }}
 animate={{ x: 0 }}
 exit={{ x: '-100%' }}
 transition={{ type: 'spring', damping: 30, stiffness: 300 }}
 className="fixed top-0 left-0 h-full w-[280px] bg-sidebar border-r border-border z-50 flex flex-col md:hidden"
 >
 {/* Header */}
 <div className="h-14 flex items-center justify-between px-4 border-b border-border bg-sidebar relative z-50">
 <Link href="/" onClick={onClose} className="flex items-center gap-3 group hover:opacity-80 transition-opacity cursor-pointer">
 <Image src="/Ventiq_w.png" alt="Ventiq" width={28} height={28} className="dark:invert-0 invert flex-shrink-0" />
 <span className="text-sm font-semibold text-fg">Ventiq</span>
 </Link>
 <button onClick={onClose} className="text-fg-muted hover:text-fg cursor-pointer">
 <IconX size={20} stroke={1.5} />
 </button>
 </div>

 {/* Nav */}
 <nav className="flex-1 py-3 px-3 space-y-1 overflow-y-auto">
 {visibleItems.map((item) => {
 const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
 return (
 <button
 key={item.href}
 onClick={() => {
 router.push(item.href);
 onClose();
 }}
 className={`w-full flex items-center gap-3 h-11 px-3 rounded-lg transition-all duration-150 cursor-pointer ${
 isActive
 ? 'bg-bg-elevated text-fg'
 : 'text-fg-muted hover:text-fg hover:bg-bg-elevated'
 }`}
 >
 <span className={isActive ? 'text-fg-secondary' : ''}>{item.icon}</span>
 <span className="text-sm font-medium">{item.label}</span>
 </button>
 );
 })}
 </nav>

 {/* Footer */}
 <div className="border-t border-border p-4 space-y-3">
 <div className="flex items-center justify-between">
 <ThemeToggle />
 <button
 onClick={() => signOut({ callbackUrl: '/' })}
 className="text-fg-faint hover:text-red-400 text-sm flex items-center gap-1.5 cursor-pointer transition-colors"
 >
 <IconLogout size={16} stroke={1.5} />
 Sign out
 </button>
 </div>
 {user && (
 <div className="flex items-center gap-3">
 {user.picture ? (
 <img src={user.picture} alt="" className="w-8 h-8 rounded-full border border-border" />
 ) : (
 <div className="w-8 h-8 rounded-full bg-bg-elevated flex items-center justify-center text-fg-muted text-sm font-medium">
 {user.name?.charAt(0) || '?'}
 </div>
 )}
 <div className="min-w-0">
 <p className="text-sm font-medium text-fg truncate">{user.name}</p>
 <p className="text-[11px] text-fg-faint truncate">{user.email}</p>
 </div>
 </div>
 )}
 </div>
 </motion.div>
 </>
 )}
 </AnimatePresence>
 );
}

// ── Topbar (mobile only) ──
function MobileTopbar({ onMenuClick }: { onMenuClick: () => void }) {
 return (
 <header className="md:hidden fixed top-0 left-0 right-0 h-14 bg-sidebar/90 backdrop-blur-xl border-b border-border z-40 flex items-center justify-between px-4">
 <button onClick={onMenuClick} className="text-fg-secondary hover:text-fg cursor-pointer">
 <IconMenu2 size={22} stroke={1.5} />
 </button>
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-md bg-fg text-bg flex items-center justify-center text-fg font-bold text-[10px]">
 V
 </div>
 <span className="text-sm font-semibold text-fg">Ventiq</span>
 </div>
 <div className="w-[22px]" /> {/* Spacer for centering */}
 </header>
 );
}

// ── Main Shell ──
export function AppShell({ children }: { children: React.ReactNode }) {
 const { data: session } = useSession();
 const [user, setUser] = useState<UserInfo | null>(null);
 const [collapsed, setCollapsed] = useState(false);
 const [mobileOpen, setMobileOpen] = useState(false);
 const pathname = usePathname();

 // Close mobile drawer on route change
 useEffect(() => {
 setMobileOpen(false);
 }, [pathname]);

 // Fetch user info
 useEffect(() => {
 if (session?.accessToken) {
 apiFetch<UserInfo>('/api/users/me')
 .then(setUser)
 .catch(() => {});
 }
 }, [session?.accessToken]);

 // Restore collapse state from localStorage
 useEffect(() => {
 const saved = localStorage.getItem('ventiq-sidebar-collapsed');
 if (saved === 'true') setCollapsed(true);
 }, []);

 useEffect(() => {
 localStorage.setItem('ventiq-sidebar-collapsed', String(collapsed));
 }, [collapsed]);

 return (
 <ShellContext.Provider value={{ user, collapsed }}>
 <div className="min-h-screen bg-bg text-fg">
 {/* Desktop Sidebar */}
 <Sidebar user={user} collapsed={collapsed} setCollapsed={setCollapsed} />

 {/* Mobile Topbar */}
 <MobileTopbar onMenuClick={() => setMobileOpen(true)} />

 {/* Mobile Drawer */}
 <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} user={user} />

 {/* Content area */}
 <main
 className={`transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
 collapsed ? 'md:ml-[68px]' : 'md:ml-[240px]'
 } pt-14 md:pt-0`}
 >
 <div className="relative min-h-screen">
 {/* Subtle background ambience */}
 
 <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
 {children}
 </div>
 </div>
 </main>
 </div>
 </ShellContext.Provider>
 );
}
