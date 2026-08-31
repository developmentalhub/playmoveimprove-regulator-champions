import {
  NextRequest,
  NextResponse,
} from 'next/server';

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

function isProtectedPath(
  pathname: string,
): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) =>
      pathname === prefix ||
      pathname.startsWith(
        `${prefix}/`,
      ),
  );
}

export async function proxy(
  request: NextRequest,
) {
  const { pathname } =
    request.nextUrl;

  if (
    !isProtectedPath(
      pathname,
    )
  ) {
    return NextResponse.next();
  }

  /*
   * Only the new signed
   * member_access_token is valid.
   *
   * The old regulator_session
   * cookie is deliberately no
   * longer accepted.
   */
  const token =
    request.cookies.get(
      MEMBER_ACCESS_COOKIE,
    )?.value;

  const memberSession =
    await getMemberSession(
      token,
    );

  if (memberSession) {
    return NextResponse.next();
  }

  /*
   * Send the educator to the
   * correct Regulator Champions
   * member access page.
   */
  const loginUrl =
    new URL(
      '/member-access',
      request.url,
    );

  loginUrl.searchParams.set(
    'returnTo',
    `${pathname}${request.nextUrl.search}`,
  );

  const response =
    NextResponse.redirect(
      loginUrl,
    );

  /*
   * If an invalid or old signed
   * member cookie exists, clear it
   * so the educator can log in
   * cleanly with their existing
   * service access code.
   */
  if (token) {
    response.cookies.set({
      name:
        MEMBER_ACCESS_COOKIE,
      value: '',
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
      expires:
        new Date(0),
    });
  }

  /*
   * Also remove the old legacy
   * regulator_session cookie.
   *
   * This does not change anyone's
   * actual service access code.
   */
  if (
    request.cookies.get(
      'regulator_session',
    )
  ) {
    response.cookies.set({
      name:
        'regulator_session',
      value: '',
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
      expires:
        new Date(0),
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