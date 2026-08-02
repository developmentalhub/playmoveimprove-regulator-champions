import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

type FeedbackType = 'quick' | 'overall';

type QuickRating =
  | 'helpful'
  | 'not_sure'
  | 'not_relevant';

type FeedbackRequestBody = {
  feedbackType?: FeedbackType;
  pagePath?: string;

  contentType?:
    | 'ladder_rung'
    | 'practice_scenario'
    | 'overall_trial';

  contentId?: string;
  contentTitle?: string;
  quickRating?: QuickRating;

  name?: string;
  email?: string;
  role?: string;
  serviceName?: string;
  ageGroup?: string;

  contentTried?: string;
  usefulFeedback?: string;
  unclearFeedback?: string;
  improvementFeedback?: string;

  wouldUseWithTeam?: boolean | null;
  contactPermission?: boolean;
};

const cleanText = (
  value: unknown,
  maximumLength: number,
): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const cleaned = value.trim();

  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, maximumLength);
};

const isValidEmail = (value: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: NextRequest) {
  try {
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
          error:
            'The feedback form is not connected yet. Please contact Play Move Improve.',
        },
        { status: 500 },
      );
    }

    const body =
      (await request.json()) as FeedbackRequestBody;

    const feedbackType = body.feedbackType;

    if (
      feedbackType !== 'quick' &&
      feedbackType !== 'overall'
    ) {
      return NextResponse.json(
        {
          error: 'Invalid feedback type.',
        },
        { status: 400 },
      );
    }

    const email = cleanText(body.email, 200);

    if (email && !isValidEmail(email)) {
      return NextResponse.json(
        {
          error:
            'Please enter a valid email address.',
        },
        { status: 400 },
      );
    }

    if (feedbackType === 'quick') {
      const allowedRatings: QuickRating[] = [
        'helpful',
        'not_sure',
        'not_relevant',
      ];

      if (
        !body.quickRating ||
        !allowedRatings.includes(body.quickRating)
      ) {
        return NextResponse.json(
          {
            error:
              'Choose a valid quick feedback option.',
          },
          { status: 400 },
        );
      }

      if (!cleanText(body.contentId, 150)) {
        return NextResponse.json(
          {
            error:
              'The content item could not be identified.',
          },
          { status: 400 },
        );
      }
    }

    if (feedbackType === 'overall') {
      const name = cleanText(body.name, 150);

      const usefulFeedback = cleanText(
        body.usefulFeedback,
        3000,
      );

      if (!name) {
        return NextResponse.json(
          {
            error: 'Please add your name.',
          },
          { status: 400 },
        );
      }

      if (!usefulFeedback) {
        return NextResponse.json(
          {
            error:
              'Please tell us what was useful about the trial.',
          },
          { status: 400 },
        );
      }
    }

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

        page_path:
          cleanText(body.pagePath, 250) ||
          '/educator-trial',

        content_type:
          cleanText(body.contentType, 100) ||
          (feedbackType === 'overall'
            ? 'overall_trial'
            : null),

        content_id: cleanText(
          body.contentId,
          150,
        ),

        content_title: cleanText(
          body.contentTitle,
          300,
        ),

        quick_rating:
          feedbackType === 'quick'
            ? body.quickRating
            : null,

        name: cleanText(body.name, 150),

        email,

        role: cleanText(body.role, 150),

        service_name: cleanText(
          body.serviceName,
          250,
        ),

        age_group: cleanText(
          body.ageGroup,
          150,
        ),

        content_tried: cleanText(
          body.contentTried,
          1000,
        ),

        useful_feedback: cleanText(
          body.usefulFeedback,
          3000,
        ),

        unclear_feedback: cleanText(
          body.unclearFeedback,
          3000,
        ),

        improvement_feedback: cleanText(
          body.improvementFeedback,
          3000,
        ),

        would_use_with_team:
          typeof body.wouldUseWithTeam ===
          'boolean'
            ? body.wouldUseWithTeam
            : null,

        contact_permission:
          body.contactPermission === true,

        user_agent:
          request.headers
            .get('user-agent')
            ?.slice(0, 500) || null,
      });

    if (error) {
      console.error(
        'Educator trial feedback insert failed:',
        error,
      );

      return NextResponse.json(
        {
          error:
            'Your feedback could not be submitted. Please try again.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,

      message:
        feedbackType === 'quick'
          ? 'Your response has been recorded.'
          : 'Thank you. Your feedback will help shape the next Regulation Ladder release.',
    });
  } catch (error) {
    console.error(
      'Unexpected educator trial feedback error:',
      error,
    );

    return NextResponse.json(
      {
        error:
          'Something went wrong while submitting your feedback.',
      },
      { status: 500 },
    );
  }
}