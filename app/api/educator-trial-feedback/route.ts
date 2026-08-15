import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type FeedbackType = 'quick' | 'overall';

type QuickRating =
  | 'helpful'
  | 'not_sure'
  | 'not_relevant';

type ContentType =
  | 'ladder_rung'
  | 'practice_scenario'
  | 'overall_trial';

type FeedbackRequestBody = {
  feedbackType?: unknown;
  pagePath?: unknown;

  contentType?: unknown;
  contentId?: unknown;
  contentTitle?: unknown;
  quickRating?: unknown;

  name?: unknown;
  email?: unknown;
  role?: unknown;
  serviceName?: unknown;
  ageGroup?: unknown;

  contentTried?: unknown;
  usefulFeedback?: unknown;
  unclearFeedback?: unknown;
  improvementFeedback?: unknown;

  wouldUseWithTeam?: unknown;
  contactPermission?: unknown;
};

const MAX_REQUEST_BYTES = 50_000;

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const allowedFeedbackTypes: FeedbackType[] = [
  'quick',
  'overall',
];

const allowedQuickRatings: QuickRating[] = [
  'helpful',
  'not_sure',
  'not_relevant',
];

const allowedContentTypes: ContentType[] = [
  'ladder_rung',
  'practice_scenario',
  'overall_trial',
];

function cleanText(
  value: unknown,
  maximumLength: number,
): string | null {
  if (typeof value !== 'string') {
    return null;
  }

  const cleaned = value.trim();

  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, maximumLength);
}

function cleanEmail(
  value: unknown,
): string | null {
  const email = cleanText(value, 254);

  if (!email) {
    return null;
  }

  return email.toLowerCase();
}

function isValidEmail(
  value: string,
): boolean {
  return emailPattern.test(value);
}

function isValidPagePath(
  value: string,
): boolean {
  return (
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('://')
  );
}

function containsLikelyIdentifyingCaseInfo(
  value: string,
): boolean {
  const lower = value.toLowerCase();

  const riskyPhrases = [
    'date of birth',
    'dob',
    'home address',
    'medicare number',
    'medical record',
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
      Number(contentLength) >
        MAX_REQUEST_BYTES
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The feedback submission is too large. Please shorten your response and try again.',
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
        'Educator trial feedback environment variables are missing.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'The feedback form is not connected yet. Please contact Play Move Improve.',
        },
        { status: 500 },
      );
    }

    const body =
      (await request.json()) as FeedbackRequestBody;

    const feedbackType =
      cleanText(
        body.feedbackType,
        20,
      ) as FeedbackType | null;

    if (
      !feedbackType ||
      !allowedFeedbackTypes.includes(
        feedbackType,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Invalid feedback type.',
        },
        { status: 400 },
      );
    }

    const rawPagePath = cleanText(
      body.pagePath,
      250,
    );

    const pagePath =
      rawPagePath &&
      isValidPagePath(rawPagePath)
        ? rawPagePath
        : '/educator-trial';

    const rawContentType = cleanText(
      body.contentType,
      100,
    );

    const contentType =
      rawContentType &&
      allowedContentTypes.includes(
        rawContentType as ContentType,
      )
        ? (rawContentType as ContentType)
        : feedbackType === 'overall'
          ? 'overall_trial'
          : null;

    const contentId = cleanText(
      body.contentId,
      150,
    );

    const contentTitle = cleanText(
      body.contentTitle,
      300,
    );

    const email = cleanEmail(
      body.email,
    );

    const name = cleanText(
      body.name,
      150,
    );

    const role = cleanText(
      body.role,
      150,
    );

    const serviceName = cleanText(
      body.serviceName,
      250,
    );

    const ageGroup = cleanText(
      body.ageGroup,
      150,
    );

    const contentTried = cleanText(
      body.contentTried,
      1000,
    );

    const usefulFeedback = cleanText(
      body.usefulFeedback,
      3000,
    );

    const unclearFeedback = cleanText(
      body.unclearFeedback,
      3000,
    );

    const improvementFeedback =
      cleanText(
        body.improvementFeedback,
        3000,
      );

    const contactPermission =
      body.contactPermission === true;

    const wouldUseWithTeam =
      typeof body.wouldUseWithTeam ===
      'boolean'
        ? body.wouldUseWithTeam
        : null;

    if (
      email &&
      !isValidEmail(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please enter a valid email address.',
        },
        { status: 400 },
      );
    }

    if (
      contactPermission &&
      !email
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please add your email address if you would like Play Move Improve to contact you.',
        },
        { status: 400 },
      );
    }

    if (feedbackType === 'quick') {
      const quickRating =
        cleanText(
          body.quickRating,
          50,
        ) as QuickRating | null;

      if (
        !quickRating ||
        !allowedQuickRatings.includes(
          quickRating,
        )
      ) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Choose a valid quick feedback option.',
          },
          { status: 400 },
        );
      }

      if (!contentId) {
        return NextResponse.json(
          {
            success: false,
            error:
              'The content item could not be identified.',
          },
          { status: 400 },
        );
      }
    }

    if (feedbackType === 'overall') {
      if (!name) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Please add your name.',
          },
          { status: 400 },
        );
      }

      if (!usefulFeedback) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Please tell us what was useful about the trial.',
          },
          { status: 400 },
        );
      }
    }

    const freeTextFields = [
      contentTried,
      usefulFeedback,
      unclearFeedback,
      improvementFeedback,
    ].filter(
      (value): value is string =>
        Boolean(value),
    );

    if (
      freeTextFields.some(
        containsLikelyIdentifyingCaseInfo,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please remove identifying child, family, medical or case-record information before submitting feedback.',
        },
        { status: 400 },
      );
    }

    const quickRating =
      feedbackType === 'quick'
        ? (cleanText(
            body.quickRating,
            50,
          ) as QuickRating)
        : null;

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const { error } = await supabase
      .from('educator_trial_feedback')
      .insert({
        feedback_type: feedbackType,

        page_path: pagePath,

        content_type: contentType,

        content_id: contentId,

        content_title: contentTitle,

        quick_rating: quickRating,

        name:
          feedbackType === 'overall'
            ? name
            : name || null,

        email,

        role,

        service_name: serviceName,

        age_group: ageGroup,

        content_tried: contentTried,

        useful_feedback:
          usefulFeedback,

        unclear_feedback:
          unclearFeedback,

        improvement_feedback:
          improvementFeedback,

        would_use_with_team:
          wouldUseWithTeam,

        contact_permission:
          contactPermission,

        user_agent:
          request.headers
            .get('user-agent')
            ?.slice(0, 500) || null,
      });

    if (error) {
      console.error(
        'Educator trial feedback insert failed:',
        {
          code: error.code,
          message: error.message,
        },
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your feedback could not be submitted. Please try again.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,

        message:
          feedbackType === 'quick'
            ? 'Your response has been recorded.'
            : 'Thank you. Your feedback will help shape the next Regulation Ladder release.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(
      'Unexpected educator trial feedback error:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Something went wrong while submitting your feedback.',
      },
      { status: 500 },
    );
  }
}