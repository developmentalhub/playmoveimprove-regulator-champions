import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

import {
  MEMBER_ACCESS_COOKIE,
  getMemberSession,
} from '@/lib/memberAccess';

export async function GET() {
  try {
    const cookieStore =
      await cookies();

    const token =
      cookieStore.get(
        MEMBER_ACCESS_COOKIE,
      )?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: true,
          hasAccess: false,
        },
        {
          status: 200,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    const session =
      await getMemberSession(
        token,
      );

    if (!session) {
      return NextResponse.json(
        {
          success: true,
          hasAccess: false,
        },
        {
          status: 200,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        hasAccess: true,
        role: session.role,
        centreName:
          session.centreName,
        plan:
          session.plan ?? null,
      },
      {
        status: 200,
        headers: {
          'Cache-Control':
            'no-store',
        },
      },
    );
  } catch (error) {
    console.error(
      'Member access status check failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        hasAccess: false,
      },
      {
        status: 500,
        headers: {
          'Cache-Control':
            'no-store',
        },
      },
    );
  }
}