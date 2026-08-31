import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

import {
  MEMBER_ACCESS_COOKIE,
  getMemberSession,
} from '@/lib/memberAccess';

type SessionVoteRequest = {
  preferredDays?: unknown;
  preferredTimes?: unknown;
  otherTime?: unknown;
  attendancePreference?: unknown;
  firstName?: unknown;
  serviceName?: unknown;
};

const ALLOWED_DAYS = [
  'Tuesday',
  'Wednesday',
  'Thursday',
] as const;

const ALLOWED_TIMES = [
  '10:00 am',
  '12:00 pm',
  '1:00 pm',
  '3:30 pm',
  '4:00 pm',
  'Other',
] as const;

const ALLOWED_ATTENDANCE = [
  'Live individually',
  'Live with colleagues',
  'Recording afterwards',
  'A mixture depending on the month',
] as const;

function cleanText(
  value: unknown,
  maxLength: number,
) {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .replace(/\u0000/g, '')
    .slice(0, maxLength);
}

function cleanStringArray(
  value: unknown,
  allowedValues: readonly string[],
) {
  if (!Array.isArray(value)) {
    return [];
  }

  return Array.from(
    new Set(
      value
        .filter(
          (item): item is string =>
            typeof item === 'string',
        )
        .map((item) => item.trim())
        .filter((item) =>
          allowedValues.includes(item),
        ),
    ),
  );
}

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL environment variable.',
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable.',
    );
  }

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

export async function POST(
  request: Request,
) {
  try {
    /*
     * Verify the signed member session
     * directly from the secure cookie.
     */
    const cookieStore =
      await cookies();

    const memberToken =
      cookieStore.get(
        MEMBER_ACCESS_COOKIE,
      )?.value;

    const memberSession =
      await getMemberSession(
        memberToken,
      );

    if (!memberSession) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your Regulator Champions member session has expired. Please sign in again before submitting your preferences.',
        },
        {
          status: 401,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    /*
     * Read submitted preferences.
     */
    let body: SessionVoteRequest;

    try {
      body =
        (await request.json()) as SessionVoteRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your session preferences could not be read. Please refresh the page and try again.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    const preferredDays =
      cleanStringArray(
        body.preferredDays,
        ALLOWED_DAYS,
      );

    const preferredTimes =
      cleanStringArray(
        body.preferredTimes,
        ALLOWED_TIMES,
      );

    const otherTime =
      cleanText(
        body.otherTime,
        150,
      );

    const attendancePreference =
      cleanText(
        body.attendancePreference,
        100,
      );

    const firstName =
      cleanText(
        body.firstName,
        100,
      );

    /*
     * Always use the verified centre
     * attached to the educator's access.
     */
    const serviceName =
      memberSession.centreName.trim();

    if (
      preferredDays.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please select at least one day that could work for you.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    if (
      preferredTimes.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please select at least one time that could work for you.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    if (
      preferredTimes.includes(
        'Other',
      ) &&
      !otherTime
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please tell me what other time would suit you.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    if (
      !ALLOWED_ATTENDANCE.includes(
        attendancePreference as
          | (typeof ALLOWED_ATTENDANCE)[number],
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please select how you are most likely to attend.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    if (!firstName) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please add your first name.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    if (!serviceName) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your service could not be identified from your member access. Please sign in again.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    const supabase =
      getSupabaseAdmin();

    const { error } =
      await supabase
        .from(
          'regulator_champion_session_votes',
        )
        .insert({
          month_key:
            '2026-09',

          first_name:
            firstName,

          service_name:
            serviceName,

          preferred_days:
            preferredDays,

          preferred_times:
            preferredTimes,

          other_time:
            preferredTimes.includes(
              'Other',
            )
              ? otherTime || null
              : null,

          attendance_preference:
            attendancePreference,
        });

    if (error) {
      console.error(
        'Regulator Champions session vote insert failed:',
        error,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your session preferences could not be saved. Please try again.',
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

    return NextResponse.json(
      {
        success: true,
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
      'Monthly session vote API failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your session preferences could not be submitted right now. Please try again.',
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