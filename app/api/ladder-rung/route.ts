import { NextRequest, NextResponse } from 'next/server';

import {
  getMemberSession,
  MEMBER_ACCESS_COOKIE,
} from '@/lib/memberAccess';

type LadderRungRequest = {
  userEmail?: unknown;
  ladderId?: unknown;
  ladderTitle?: unknown;
  rungNumber?: unknown;
  rungTitle?: unknown;
  reflectionText?: unknown;
  evidenceText?: unknown;
};

const MAX_REQUEST_BYTES = 20_000;

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

function cleanRungNumber(
  value: unknown,
): number | null {
  const number =
    typeof value === 'number'
      ? value
      : Number(value);

  if (
    !Number.isInteger(number) ||
    number < 1 ||
    number > 20
  ) {
    return null;
  }

  return number;
}

function containsIdentifyingInformation(
  value: string,
): boolean {
  const riskyPatterns = [
    /\bdate of birth\b/i,
    /\bdob\b/i,
    /\bndis\b/i,
    /\bmedical record\b/i,
    /\bmedicare\b/i,
    /\bdiagnosis\b/i,
    /\bincident report\b/i,
  ];

  return riskyPatterns.some((pattern) =>
    pattern.test(value),
  );
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
            'The reflection is too large to submit.',
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
      (await request.json()) as LadderRungRequest;

    const userEmail =
      cleanEmail(body.userEmail);

    const ladderId =
      cleanString(body.ladderId, 100);

    const ladderTitle =
      cleanString(body.ladderTitle, 200);

    const rungNumber =
      cleanRungNumber(body.rungNumber);

    const rungTitle =
      cleanString(body.rungTitle, 200);

    const reflectionText =
      cleanString(
        body.reflectionText,
        5_000,
      );

    const evidenceText =
      cleanString(
        body.evidenceText,
        5_000,
      );

    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Enter a valid work email before saving your reflection.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (
      !ladderId ||
      !ladderTitle ||
      rungNumber === null ||
      !rungTitle
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The ladder information is incomplete.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (
      session.plan === 'preview' &&
      !PREVIEW_LADDER_IDS.has(ladderId)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This ladder is not included in your 3-Ladder Preview access.',
        },
        {
          status: 403,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (
      reflectionText.length < 40
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Add a little more detail about what you noticed, changed or learned.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (
      evidenceText.length < 30
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Add a brief practice example before saving.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const combinedReflection =
      `${reflectionText} ${evidenceText}`;

    if (
      containsIdentifyingInformation(
        combinedReflection,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please remove identifying or sensitive child or family information before saving.',
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
            'Reflection storage is not configured.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const response = await fetch(
      `${supabaseUrl}/rest/v1/ladder_rung_logs?on_conflict=user_email,ladder_id,rung_number`,
      {
        method: 'POST',

        headers: {
          apikey: serviceRoleKey,

          Authorization:
            `Bearer ${serviceRoleKey}`,

          'Content-Type':
            'application/json',

          Prefer:
            'resolution=merge-duplicates,return=minimal',
        },

        body: JSON.stringify({
          user_email: userEmail,
          ladder_id: ladderId,
          ladder_title: ladderTitle,
          rung_number: rungNumber,
          rung_title: rungTitle,
          reflection_text:
            reflectionText,
          evidence_text:
            evidenceText,
          review_status: 'saved',
          updated_at:
            new Date().toISOString(),
        }),

        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        'Ladder reflection save failed:',
        errorText,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your ladder reflection could not be saved. Please try again.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
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
          'Cache-Control': 'no-store',
        },
      },
    );
  } catch (error) {
    console.error(
      'Ladder reflection route failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your ladder reflection could not be saved. Please try again.',
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