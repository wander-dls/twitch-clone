import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


const publicRoutes = createRouteMatcher(['/login(.*)'])
export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth()
    if(!userId && !publicRoutes(req)) {
        const loginUrl = new URL('/login', req.url);
        return NextResponse.redirect(loginUrl);
    }

    if(userId && !publicRoutes(req)) return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};