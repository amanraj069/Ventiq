import NextAuth, { type DefaultSession } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import 'next-auth/jwt';

declare module 'next-auth' {
 interface Session {
 user: {
 id: string;
 email: string;
 name: string;
 picture: string | null;
 role: string | null;
 onboardingComplete: boolean;
 investorVerificationStatus: string | null;
 tier: string;
 } & DefaultSession['user'];
 accessToken: string;
 }
}

declare module 'next-auth/jwt' {
 interface JWT {
 accessToken?: string;
 user?: any;
 }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
 providers: [
 Google({
 clientId: process.env.GOOGLE_CLIENT_ID,
 clientSecret: process.env.GOOGLE_CLIENT_SECRET,
 authorization: {
 params: {
 prompt: 'consent',
 access_type: 'offline',
 response_type: 'code',
 },
 },
 }),
 Credentials({
 name: 'credentials',
 credentials: {
 email: { label: 'Email', type: 'email' },
 password: { label: 'Password', type: 'password' },
 },
 async authorize(credentials) {
 if (!credentials?.email || !credentials?.password) {
 return null;
 }

 try {
 const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';
 const res = await fetch(`${baseUrl}/api/auth/login`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 email: credentials.email,
 password: credentials.password,
 }),
 });

 if (!res.ok) {
 return null;
 }

 const data = await res.json();
 // NextAuth expects `authorize` to return a user object.
 // We will stuff both the user and the accessToken inside it.
 return {
 id: data.user.id,
 email: data.user.email,
 accessToken: data.accessToken,
 user: data.user,
 } as any;
 } catch (error) {
 return null;
 }
 },
 }),
 ],
 callbacks: {
 async jwt({ token, account, user }) {
 // Initial sign in
 if (account && user) {
 if (account.provider === 'credentials') {
 // Credentials flow
 token.accessToken = (user as any).accessToken;
 token.user = (user as any).user;
 } else if (account.provider === 'google' && account.id_token) {
 // Google OAuth flow
 try {
 const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';
 const res = await fetch(`${baseUrl}/api/auth/google/verify`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({ idToken: account.id_token }),
 });

 if (!res.ok) {
 throw new Error(`Backend auth failed with status ${res.status}`);
 }

 const data = await res.json();
 token.accessToken = data.accessToken;
 token.user = data.user;
 } catch (error) {
 console.error('Auth backend error:', error);
 }
 }
 }
 return token;
 },
 async session({ session, token }) {
 if (token.user) {
 session.user = token.user as any;
 session.accessToken = token.accessToken as string;
 }
 return session;
 },
 },
 pages: {
 signIn: '/sign-in',
 },
 session: {
 strategy: 'jwt',
 },
});
