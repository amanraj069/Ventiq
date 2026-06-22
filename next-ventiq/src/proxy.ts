import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAuthRoute = nextUrl.pathname.startsWith('/sign-in');
  const isApiRoute = nextUrl.pathname.startsWith('/api');
  const isOnboardingRoute = nextUrl.pathname.startsWith('/onboarding');
  const isPublicRoute = nextUrl.pathname === '/';

  // Allow API routes
  if (isApiRoute) {
    return NextResponse.next();
  }

  // Handle auth routes
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/ideas', nextUrl));
    }
    return NextResponse.next();
  }

  // Require auth for protected routes
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/sign-in', nextUrl));
  }

  // Handle onboarding redirects
  if (isLoggedIn) {
    const user = req.auth?.user;
    
    // If onboarding is not complete and they are not on the onboarding page
    if (!user?.onboardingComplete && !isOnboardingRoute) {
      return NextResponse.redirect(new URL('/onboarding', nextUrl));
    }
    
    // If onboarding is complete and they try to access onboarding
    if (user?.onboardingComplete && isOnboardingRoute) {
      return NextResponse.redirect(new URL('/ideas', nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
