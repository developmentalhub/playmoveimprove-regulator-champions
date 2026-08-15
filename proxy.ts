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
];

function isProtectedPath(
  pathname: string,
): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(`${prefix}/`),
  );
}

export function proxy(
  request: NextRequest,
) {
  const pathname =
    request.nextUrl.pathname;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get(
      MEMBER_ACCESS_COOKIE,
    )?.value;

  const session =
    getMemberSession(token);

  if (session) {
    return NextResponse.next();
  }

  const accessUrl =
    new URL(
      '/member-access',
      request.url,
    );

  accessUrl.searchParams.set(
    'returnTo',
    `${pathname}${request.nextUrl.search}`,
  );

  const response =
    NextResponse.redirect(accessUrl);

  if (token) {
    response.cookies.set({
      name: MEMBER_ACCESS_COOKIE,
      value: '',
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        'production',
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
  ],
};