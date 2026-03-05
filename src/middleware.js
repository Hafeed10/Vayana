
import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register'];

export async function middleware(request) {
    const { pathname } = request.nextUrl;

    // Allow API routes to pass through
    if (pathname.startsWith('/api')) {
        return NextResponse.next();
    }

    // Allow public routes
    if (publicRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Allow static files and Next.js internals
    if (pathname.startsWith('/_next') || pathname.includes('.')) {
        return NextResponse.next();
    }

    // All other routes require authentication
    // This includes /dashboard, /add-book, /edit-book and any route groups like /(main)/dashboard
    const token = request.cookies.get('token');

    if (!token) {
        // Redirect to login if no token
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    try {
        // Verify the token using jose
        const secret = new TextEncoder().encode(JWT_SECRET);
        await jwtVerify(token.value, secret, {
            algorithms: ['HS256'],
        });
        return NextResponse.next();
    } catch (error) {
        // Log the error for debugging
        console.error('Middleware JWT Verification Error:', error.message);

        // Invalid token, redirect to login
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        // Clear the invalid token
        const response = NextResponse.redirect(loginUrl);
        response.cookies.delete('token');
        return response;
    }
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
