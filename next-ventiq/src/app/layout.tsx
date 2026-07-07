import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
 variable: "--font-geist-sans",
 subsets: ["latin"],
});

const geistMono = Geist_Mono({
 variable: "--font-geist-mono",
 subsets: ["latin"],
});

export const metadata: Metadata = {
 title: "Ventiq — AI-Judged Startup Pitch Evaluation",
 description:
 "Submit your startup pitch. Get scored by a multi-agent AI system across team strength, traction, market, and more. Connect with verified investors.",
 keywords: [
 "startup pitch",
 "AI evaluation",
 "investor matching",
 "startup scoring",
 "venture capital",
 ],
};

/**
 * Inline script to prevent flash of wrong theme (FOUC).
 * Runs synchronously before React hydration to set the correct
 * `dark` class on <html> based on localStorage or system preference.
 */
const themeScript = `
(function() {
 try {
 var stored = localStorage.getItem('ventiq-theme');
 var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
 var theme = stored || (prefersDark ? 'dark' : 'light');
 if (theme === 'dark') {
 document.documentElement.classList.add('dark');
 } else {
 document.documentElement.classList.remove('dark');
 }
 } catch (e) {}
})();
`;

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode;
}>) {
 return (
 <html
 lang="en"
 className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
 suppressHydrationWarning
 >
 <head>
 <script dangerouslySetInnerHTML={{ __html: themeScript }} />
 </head>
 <body className="min-h-full flex flex-col bg-bg text-fg">
 <ThemeProvider>
 {children}
 <Toaster position="bottom-right" />
 </ThemeProvider>
 </body>
 </html>
 );
}
