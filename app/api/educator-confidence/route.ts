import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type EducatorConfidenceRequest = {
  educatorName?: unknown;
  educatorEmail?: unknown;
  centreName?: unknown;
  educatorRole?: unknown;

  bodyAwareness?: unknown;
  bodyNoticeText?: unknown;

  challengingRoutines?: unknown;
  roomPressureText?: unknown;

  selectedStrategies?: unknown;
  strategyConfidence?: unknown;

  learningGoal?: unknown;
  supportPreference?: unknown;
};

const MAX_REQUEST_BYTES = 50_000;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanString(
  value: unknown,
  maxLength = 500,
): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function cleanEmail(value: unknown): string {
  return cleanString(value, 254).toLowerCase();
}

function cleanStringArray(
  value: unknown,
  maxItems = 20,
  maxItemLength = 150,
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === 'string')
    .map((item) => item.trim().slice(0, maxItemLength))
    .filter(Boolean)
    .slice(0, maxItems);
}

function containsLikelyChildIdentifyingLanguage(
  value: string,
): boolean {
  const lower = value.toLowerCase();

  const riskyPhrases = [
    'date of birth',
    'dob',
    'home address',
    'medical record',
    'medicare number',
    'ndis number',
    'diagnosis report',
  ];

  return riskyPhrases.some((phrase) =>
    lower.includes(phrase),
  );
}

export async function POST(
  request: NextRequest,
) {
  try {
    const contentLength =
      request.headers.get('content-length');

    if (
      contentLength &&
      Number(contentLength) > MAX_REQUEST_BYTES
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The reflection is too large. Please shorten your responses and try again.',
        },
        { status: 413 },
      );
    }

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        'Educator confidence API is missing Supabase environment variables.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'The reflection form is not connected yet. Please contact Robyn.',
        },
        { status: 500 },
      );
    }

    const body =
      (await request.json()) as EducatorConfidenceRequest;

    const educatorName = cleanString(
      body.educatorName,
      150,
    );

    const educatorEmail = cleanEmail(
      body.educatorEmail,
    );

    const centreName = cleanString(
      body.centreName,
      200,
    );

    const educatorRole = cleanString(
      body.educatorRole,
      100,
    );

    const bodyAwareness = cleanString(
      body.bodyAwareness,
      200,
    );

    const bodyNoticeText = cleanString(
      body.bodyNoticeText,
      1500,
    );

    const challengingRoutines =
      cleanStringArray(
        body.challengingRoutines,
        20,
        150,
      );

    const roomPressureText = cleanString(
      body.roomPressureText,
      2000,
    );

    const selectedStrategies =
      cleanStringArray(
        body.selectedStrategies,
        20,
        150,
      );

    const strategyConfidence = cleanString(
      body.strategyConfidence,
      200,
    );

    const learningGoal = cleanString(
      body.learningGoal,
      2000,
    );

    const supportPreference = cleanString(
      body.supportPreference,
      500,
    );

    if (
      !educatorName ||
      !educatorEmail ||
      !centreName ||
      !educatorRole
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your name, work email, service name and role are required.',
        },
        { status: 400 },
      );
    }

    if (!emailPattern.test(educatorEmail)) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Enter a valid work email address.',
        },
        { status: 400 },
      );
    }

    if (!bodyAwareness) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Select the option that best describes your current body awareness.',
        },
        { status: 400 },
      );
    }

    if (challengingRoutines.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Select at least one routine you would like more support with.',
        },
        { status: 400 },
      );
    }

    if (!strategyConfidence) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Select the option that best describes your current confidence.',
        },
        { status: 400 },
      );
    }

    if (learningGoal.length < 20) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Add a little more detail about what you would like to learn.',
        },
        { status: 400 },
      );
    }

    const freeTextFields = [
      bodyNoticeText,
      roomPressureText,
      learningGoal,
      supportPreference,
    ];

    if (
      freeTextFields.some(
        containsLikelyChildIdentifyingLanguage,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please remove identifying child, family, medical or case-record information before submitting this reflection.',
        },
        { status: 400 },
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      },
    );

    const { error } = await supabase
      .from('educator_confidence_responses')
      .insert({
        educator_name: educatorName,
        educator_email: educatorEmail,
        centre_name: centreName,
        educator_role: educatorRole,

        body_awareness: bodyAwareness,

        body_notice_text:
          bodyNoticeText || null,

        challenging_routines:
          challengingRoutines,

        room_pressure_text:
          roomPressureText || null,

        selected_strategies:
          selectedStrategies,

        strategy_confidence:
          strategyConfidence,

        learning_goal: learningGoal,

        support_preference:
          supportPreference || null,

        submission_status: 'received',
      });

    if (error) {
      console.error(
        'Educator confidence database error:',
        {
          code: error.code,
          message: error.message,
        },
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your reflection could not be saved. Please try again or contact Robyn.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      'Educator confidence API failure:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your reflection could not be submitted. Please try again.',
      },
      { status: 500 },
    );
  }
}