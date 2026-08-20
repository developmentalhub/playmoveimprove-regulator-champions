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
  reflection_text?: string;
  evidence_text?: string;
  review_status?: string;
  updated_at?: string;
};

const MAX_REQUEST_BYTES = 5_000;

const PREVIEW_LADDER_IDS = new Set([
  'morning-routine',
  'escalation-support',
  'play-schemas',

  // Keep older IDs temporarily for backwards compatibility
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
    /*
     * MEMBER SESSION
     */
    const token =
      request.cookies.get(
        MEMBER_ACCESS_COOKIE,
      )?.value;

    const session =
      await getMemberSession(token);

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

    /*
     * REQUEST SIZE
     */
    const contentLength =
      request.headers.get('content-length');

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

    /*
     * REQUEST BODY
     */
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

    /*
     * SUPABASE CONFIG
     */
    const supabaseUrl =
      process.env
        .NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env
        .SUPABASE_SERVICE_ROLE_KEY;

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

    /*
     * LOAD SAVED PRACTICE REFLECTIONS
     *
     * We now include reflection_text and evidence_text
     * so ProgressSummary can produce useful documentation,
     * not simply show that a rung was saved.
     */
    const encodedEmail =
      encodeURIComponent(userEmail);

    const response = await fetch(
      `${supabaseUrl}/rest/v1/ladder_rung_logs?user_email=eq.${encodedEmail}&select=ladder_id,ladder_title,rung_number,rung_title,reflection_text,evidence_text,review_status,updated_at&order=updated_at.desc`,
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

    /*
     * SUPABASE ERROR
     */
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

    /*
     * READ LOGS
     */
    const rawLogs =
      (await response.json()) as ProgressLog[];

    /*
     * PREVIEW FILTER
     */
    const filteredLogs =
      session.plan === 'preview'
        ? rawLogs.filter((log) =>
            log.ladder_id
              ? PREVIEW_LADDER_IDS.has(
                  log.ladder_id,
                )
              : false,
          )
        : rawLogs;

    /*
     * SANITISE RESPONSE
     */
    const logs = filteredLogs.map(
      (log) => ({
        ladder_id:
          cleanString(
            log.ladder_id,
            100,
          ),

        ladder_title:
          cleanString(
            log.ladder_title,
            200,
          ),

        rung_number:
          typeof log.rung_number ===
          'number'
            ? log.rung_number
            : 0,

        rung_title:
          cleanString(
            log.rung_title,
            200,
          ),

        reflection_text:
          cleanString(
            log.reflection_text,
            5000,
          ),

        evidence_text:
          cleanString(
            log.evidence_text,
            5000,
          ),

        review_status:
          cleanString(
            log.review_status,
            100,
          ),

        updated_at:
          cleanString(
            log.updated_at,
            100,
          ),
      }),
    );

    /*
     * SUMMARY DATA
     *
     * This gives the front end useful counts
     * without inventing quality or compliance scores.
     */
    const completedRungs =
      logs.filter(
        (log) =>
          log.review_status === 'saved',
      ).length;

    const uniqueLadders =
      new Set(
        logs
          .map((log) => log.ladder_id)
          .filter(Boolean),
      ).size;

    const latestReflection =
      logs[0]?.updated_at ?? null;

    /*
     * SUCCESS
     */
    return NextResponse.json(
      {
        success: true,

        plan: session.plan,

        logs,

        summary: {
          totalReflections:
            logs.length,

          completedRungs,

          laddersUsed:
            uniqueLadders,

          latestReflection,
        },
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