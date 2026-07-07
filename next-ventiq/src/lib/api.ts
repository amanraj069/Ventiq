import { getSession, signOut } from 'next-auth/react';

/**
 * Helper to fetch data from the Ventiq Backend API.
 * Automatically attaches the JWT access token from NextAuth session.
 */
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
 // Try to get session from next-auth/react (client side)
 // Note: For server components, you should pass the token explicitly 
 // or use the server-side auth() function instead of this wrapper.
 const session = await getSession();
 
 const headers = new Headers(options.headers);
 if (session?.accessToken) {
 headers.set('Authorization', `Bearer ${session.accessToken}`);
 }
 
 if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
 headers.set('Content-Type', 'application/json');
 }

 const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:9000';
 const url = `${baseUrl}${endpoint}`;
 
 const response = await fetch(url, {
 ...options,
 headers,
 });

 if (!response.ok) {
 if (response.status === 401) {
 if (typeof window !== 'undefined') {
 signOut({ callbackUrl: '/sign-in' });
 }
 throw new Error('Session expired. Redirecting to login...');
 }

 let errorMessage = `API Error: ${response.status}`;
 try {
 const errorData = await response.json();
 errorMessage = errorData.message || errorMessage;
 } catch {
 // Ignore JSON parse error for error responses
 }
 throw new Error(errorMessage);
 }

 // Handle 204 No Content
 if (response.status === 204) {
 return {} as T;
 }

 return response.json();
}
