import { NextRequest, NextResponse } from 'next/server';

import {
  MEMBER_ACCESS_COOKIE,
} from '@/lib/memberAccess';

export async function POST(
  request: NextRequest,
) {
  try {
    const response = NextResponse.json(
      {
        success: true,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );

    response.cookies.set({
      name: MEMBER_ACCESS_COOKIE,
      value: '',
      httpOnly: true,
      secure:
        process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error(
      'Member sign-out failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Member access could not be cleared. Please try again.',
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