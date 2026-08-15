import { NextRequest, NextResponse } from 'next/server';

import {
  getMemberSession,
  MEMBER_ACCESS_COOKIE,
} from '@/lib/memberAccess';

export async function GET(
  request: NextRequest,
) {
  try {
    const token =
      request.cookies.get(
        MEMBER_ACCESS_COOKIE,
      )?.value;

    const session =
      getMemberSession(token);

    const hasAccess =
      session !== null;

    const response =
      NextResponse.json(
        {
          success: true,
          hasAccess,
          plan: session?.plan ?? null,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );

    if (!hasAccess && token) {
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
  } catch (error) {
    console.error(
      'Member access status check failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        hasAccess: false,
        plan: null,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  }
}