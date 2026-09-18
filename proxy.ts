import {
  NextRequest,
  NextResponse,
} from 'next/server';

import {
  createServerClient,
} from '@supabase/ssr';

const PROTECTED_PREFIXES = [
  '/portal',
  '/platform',
  '/playbooks',
  '/month-2-ease',
  '/nqs-mapping',
  '/educator-confidence',
  '/learning-journey',
];

function isProtectedPath(
  pathname: string,
) {
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

  let response =
    NextResponse.next({
      request,
    });

  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const supabaseAnonKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey
  ) {
    console.error(
      'Missing Supabase environment variables in proxy.',
    );

    return NextResponse.redirect(
      new URL(
        '/member-access',
        request.url,
      ),
    );
  }

  const supabase =
    createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },

          setAll(
            cookiesToSet,
          ) {
            cookiesToSet.forEach(
              ({
                name,
                value,
              }) => {
                request.cookies.set(
                  name,
                  value,
                );
              },
            );

            response =
              NextResponse.next({
                request,
              });

            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                response.cookies.set(
                  name,
                  value,
                  options,
                );
              },
            );
          },
        },
      },
    );

  const {
    data: {
      user,
    },
    error,
  } =
    await supabase.auth
      .getUser();

  if (
    error ||
    !user
  ) {
    const loginUrl =
      new URL(
        '/member-access',
        request.url,
      );

    loginUrl.searchParams.set(
      'returnTo',
      `${pathname}${request.nextUrl.search}`,
    );

    return NextResponse.redirect(
      loginUrl,
    );
  }

  return response;
}

export const config = {
  matcher: [
    '/portal/:path*',
    '/platform/:path*',
    '/playbooks/:path*',
    '/month-2-ease/:path*',
    '/nqs-mapping/:path*',
    '/educator-confidence/:path*',
    '/learning-journey/:path*',
  ],
};