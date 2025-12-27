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
      
      // Allow authenticated users to access dashboard
      if (isOnDashboard) {
        return isLoggedIn;
      }
      
      // Redirect authenticated users away from login page to dashboard
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      
      // Allow unauthenticated users to access login page
      if (isOnLogin) {
        return true;
      }
      
      // Redirect unauthenticated users to login
      if (!isLoggedIn) {
        return false;
      }
      
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;