import { NextRequest, NextResponse } from 'next/server';

import {
  getMemberSession,
  MEMBER_ACCESS_COOKIE,
} from '@/lib/memberAccess';

type ProgressRequest = {
  userEmail?: unknown;
};

type ProgressLog = {
  ladder_id?: string;
  ladder_title?: string;
  rung_number?: number;
  rung_title?: string;
  review_status?: string;
  updated_at?: string;
};

const MAX_REQUEST_BYTES = 5_000;

const PREVIEW_LADDER_IDS = new Set([
  'regulated-educator',
  'connected-drop-offs',
  'participation-beyond-sitting',
]);

function cleanString(
  value: unknown,
  maxLength: number,
): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function cleanEmail(value: unknown): string {
  const email = cleanString(value, 254).toLowerCase();

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return '';
  }

  return email;
}

export async function POST(
  request: NextRequest,
) {
  try {
    const token =
      request.cookies.get(
        MEMBER_ACCESS_COOKIE,
      )?.value;

    const session =
      getMemberSession(token);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your member session has expired. Please enter your service access code again.',
        },
        {
          status: 401,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const contentLength =
      request.headers.get(
        'content-length',
      );

    if (
      contentLength &&
      Number(contentLength) >
        MAX_REQUEST_BYTES
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The request could not be processed.',
        },
        {
          status: 413,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const body =
      (await request.json()) as ProgressRequest;

    const userEmail =
      cleanEmail(body.userEmail);

    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Enter a valid work email to view progress.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      console.error(
        'Supabase server environment variables are missing.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Progress storage is not configured.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const encodedEmail =
      encodeURIComponent(userEmail);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/ladder_rung_logs?user_email=eq.${encodedEmail}&select=ladder_id,ladder_title,rung_number,rung_title,review_status,updated_at&order=ladder_id.asc,rung_number.asc`,
      {
        method: 'GET',

        headers: {
          apikey: serviceRoleKey,

          Authorization:
            `Bearer ${serviceRoleKey}`,

          Accept: 'application/json',
        },

        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        'Progress fetch failed:',
        errorText,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your progress could not be loaded. Please try again.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const rawLogs =
      (await response.json()) as ProgressLog[];

    const logs =
      session.plan === 'preview'
        ? rawLogs.filter((log) =>
            log.ladder_id
              ? PREVIEW_LADDER_IDS.has(
                  log.ladder_id,
                )
              : false,
          )
        : rawLogs;

    return NextResponse.json(
      {
        success: true,
        plan: session.plan,
        logs,
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    console.error(
      'Progress summary route failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your progress could not be loaded. Please try again.',
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