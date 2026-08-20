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

  // New quick-reflection format
  tankLevel?: unknown;
  primaryStressor?: unknown;
  notes?: unknown;

  // Older reflection format kept for compatibility
  reflectionText?: unknown;
  evidenceText?: unknown;
};

const MAX_REQUEST_BYTES = 20_000;

const PREVIEW_LADDER_IDS = new Set([
  'morning-routine',
  'escalation-support',
  'play-schemas',

  // Keep these temporarily so older saved links/data do not break
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

function containsSensitiveInformation(
  value: string,
): boolean {
  const riskyPatterns = [
    /\bdate of birth\b/i,
    /\bdob\b/i,
    /\bmedicare\b/i,
    /\bmedical record\b/i,
    /\bdiagnosis\b/i,
    /\bincident report\b/i,
    /\bndis number\b/i,
    /\bmedicare number\b/i,
  ];

  return riskyPatterns.some((pattern) =>
    pattern.test(value),
  );
}

export async function POST(
  request: NextRequest,
) {
  try {
    /*
     * MEMBER ACCESS
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

    /*
     * READ REQUEST
     */
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

    /*
     * NEW QUICK REFLECTION FIELDS
     */
    const tankLevel =
      cleanString(body.tankLevel, 200);

    const primaryStressor =
      cleanString(
        body.primaryStressor,
        200,
      );

    const notes =
      cleanString(body.notes, 1000);

    /*
     * LEGACY LONG-FORM FIELDS
     */
    const legacyReflection =
      cleanString(
        body.reflectionText,
        5000,
      );

    const legacyEvidence =
      cleanString(
        body.evidenceText,
        5000,
      );

    /*
     * VALIDATE CORE INFORMATION
     */
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

    /*
     * PREVIEW ACCESS
     */
    if (
      session.plan === 'preview' &&
      !PREVIEW_LADDER_IDS.has(ladderId)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This ladder is not included in your preview access.',
        },
        {
          status: 403,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    /*
     * BUILD REFLECTION
     *
     * New interface uses tap choices.
     * Old interface used two text boxes.
     *
     * Both are supported so existing pages
     * and previously saved data continue working.
     */
    const isQuickReflection =
      Boolean(tankLevel || primaryStressor || notes);

    let reflectionText = '';
    let evidenceText = '';

    if (isQuickReflection) {
      const reflectionParts = [
        tankLevel
          ? `Educator capacity: ${tankLevel}.`
          : '',
        primaryStressor
          ? `Room factor: ${primaryStressor}.`
          : '',
        notes ? notes : '',
      ].filter(Boolean);

      reflectionText =
        reflectionParts.join(' ');

      const evidenceParts = [
        `Practice rung: ${rungTitle}.`,
        primaryStressor
          ? `Factor noticed: ${primaryStressor}.`
          : '',
      ].filter(Boolean);

      evidenceText =
        evidenceParts.join(' ');
    } else {
      reflectionText =
        legacyReflection;

      evidenceText =
        legacyEvidence;
    }

    /*
     * REQUIRE SOMETHING MEANINGFUL
     *
     * We no longer require educators to type
     * 40 or 30 characters.
     */
    if (!reflectionText) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Choose the option that feels closest before saving.',
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
     * PRIVACY CHECK
     */
    const combinedReflection =
      `${reflectionText} ${evidenceText}`;

    if (
      containsSensitiveInformation(
        combinedReflection,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please remove sensitive child or family information before saving.',
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
     * SUPABASE CONFIGURATION
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

    /*
     * SAVE / UPDATE REFLECTION
     *
     * Existing database columns are retained.
     * No Supabase schema change is required.
     */
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

    /*
     * SUPABASE ERROR
     */
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

    /*
     * SUCCESS
     */
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