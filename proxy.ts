import { NextRequest, NextResponse } from 'next/server';
import {
  getMemberSession,
  MEMBER_ACCESS_COOKIE,
} from '@/lib/memberAccess';

const PROTECTED_PREFIXES = [
  '/portal',
  '/playbooks',
  '/month-2-ease',
  '/nqs-mapping',
  '/educator-confidence',
  '/learning-journey',
  '/platform',
];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(MEMBER_ACCESS_COOKIE)?.value;
  const regulatorSession = request.cookies.get('regulator_session')?.value;

  const hasMemberSession = await getMemberSession(token);
  const hasAccess = Boolean(hasMemberSession || regulatorSession);

  if (hasAccess) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set(
    'returnTo',
    `${pathname}${request.nextUrl.search}`
  );

  const response = NextResponse.redirect(loginUrl);

  if (token && !hasMemberSession) {
    response.cookies.set({
      name: MEMBER_ACCESS_COOKIE,
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/playbooks/:path*',
    '/month-2-ease/:path*',
    '/nqs-mapping/:path*',
    '/educator-confidence/:path*',
    '/learning-journey/:path*',
    '/platform/:path*',
  ],
};