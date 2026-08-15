import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type CommunityTopicRequest = {
  authorName?: unknown;
  authorRole?: unknown;
  serviceName?: unknown;
  roomCategory?: unknown;
  questionText?: unknown;
  privacyConfirmed?: unknown;
};

const MAX_REQUEST_BYTES = 30_000;

const ALLOWED_ROLES = [
  'Educator',
  'Room Leader',
  'Early Childhood Teacher',
  'Educational Leader',
  'Centre Director',
  'Approved Provider',
  'Other',
] as const;

const ALLOWED_AREAS = [
  'Babies and Nursery',
  'Toddlers',
  'Preschool and Kindergarten',
  'Whole Centre',
  'Leadership',
  'Family Communication',
] as const;

function cleanString(
  value: unknown,
  maxLength = 500,
): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function isAllowedValue(
  value: string,
  allowedValues: readonly string[],
): boolean {
  return allowedValues.includes(value);
}

function containsLikelyIdentifyingInformation(
  value: string,
): boolean {
  const lower = value.toLowerCase();

  const riskyPhrases = [
    'date of birth',
    'dob',
    'home address',
    'medicare number',
    'ndis number',
    'medical record',
    'medical report',
    'diagnosis report',
    'child full name',
    'family surname',
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
            'The topic submission is too large. Please shorten your response and try again.',
        },
        {
          status: 413,
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

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        'Community topic API is missing Supabase environment variables.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'The topic form is not connected yet. Please contact Play Move Improve.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const body =
      (await request.json()) as CommunityTopicRequest;

    const authorName = cleanString(
      body.authorName,
      150,
    );

    const authorRole = cleanString(
      body.authorRole,
      100,
    );

    const serviceName = cleanString(
      body.serviceName,
      200,
    );

    const roomCategory = cleanString(
      body.roomCategory,
      100,
    );

    const questionText = cleanString(
      body.questionText,
      2000,
    );

    const privacyConfirmed =
      body.privacyConfirmed === true;

    if (!authorName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please add your name.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (!questionText) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please add a general topic or question.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (questionText.length < 20) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please add a little more detail about the general topic.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (!privacyConfirmed) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please confirm that you have not included identifying child or family information.',
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
      authorRole &&
      !isAllowedValue(
        authorRole,
        ALLOWED_ROLES,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please choose a valid role.',
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
      roomCategory &&
      !isAllowedValue(
        roomCategory,
        ALLOWED_AREAS,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please choose a valid area.',
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
      containsLikelyIdentifyingInformation(
        questionText,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please remove identifying child, family, medical or case-record information before submitting your topic.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
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
      .from('community_questions')
      .insert({
        author_name: authorName,

        role:
          authorRole || null,

        service_name:
          serviceName || null,

        category:
          roomCategory || null,

        question:
          questionText,

        publication_status:
          'pending',
      });

    if (error) {
      console.error(
        'Community topic database insert failed:',
        {
          code: error.code,
          message: error.message,
        },
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your topic could not be submitted. Please try again.',
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
        message:
          'Your topic suggestion has been received.',
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
      'Community topic API failure:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your topic could not be submitted. Please try again.',
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