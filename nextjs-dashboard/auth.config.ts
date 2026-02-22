import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname === '/login';
      const isOnRoot = nextUrl.pathname === '/';

      if (isOnDashboard) {
        return isLoggedIn;
      }

      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      if (isOnRoot && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      if (isOnLogin || isOnRoot) {
        return true;
      }

      if (!isLoggedIn) {
        return false;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
