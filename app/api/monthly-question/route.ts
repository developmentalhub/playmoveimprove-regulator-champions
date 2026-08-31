import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

import {
  MEMBER_ACCESS_COOKIE,
  getMemberSession,
} from '@/lib/memberAccess';

type MonthlyQuestionRequest = {
  whatNoticing?: unknown;
  whatTried?: unknown;
  whatHelpUnderstanding?: unknown;
  firstName?: unknown;
  serviceName?: unknown;
};

type SavedQuestion = {
  id: string;
  created_at: string;
};

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

async function sendQuestionNotification({
  firstName,
  serviceName,
  questionId,
  createdAt,
}: {
  firstName: string;
  serviceName: string;
  questionId: string;
  createdAt: string;
}) {
  const resendApiKey =
    process.env.RESEND_API_KEY;

  const notificationEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    'robyn@playmoveimprove.com.au';

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    'Regulator Champions <enquiries@playmoveimprove.com.au>';

  if (!resendApiKey) {
    console.warn(
      'RESEND_API_KEY is missing. The Regulator Champions question was saved, but no notification email was sent.',
    );

    return;
  }

  const submittedDate =
    new Intl.DateTimeFormat(
      'en-AU',
      {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone:
          'Australia/Melbourne',
      },
    ).format(
      new Date(createdAt),
    );

  const response = await fetch(
    'https://api.resend.com/emails',
    {
      method: 'POST',

      headers: {
        Authorization:
          `Bearer ${resendApiKey}`,
        'Content-Type':
          'application/json',
      },

      body: JSON.stringify({
        from: fromEmail,

        to: [
          notificationEmail,
        ],

        subject:
          `New Regulator Champions question from ${serviceName}`,

        text: [
          'A new Regulator Champions educator question has been submitted.',
          '',
          `First name: ${firstName}`,
          `Service: ${serviceName}`,
          `Submitted: ${submittedDate}`,
          `Reference: ${questionId}`,
          '',
          'The educator’s question has not been included in this email to keep the submitted information within the secure Regulator Champions system.',
          '',
          'Open your Regulator Champions admin area to review the full de-identified submission.',
        ].join('\n'),
      }),

      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      'Regulator Champions question notification email failed:',
      errorText,
    );
  }
}

export async function POST(
  request: Request,
) {
  try {
    /*
     * Check the signed educator/member
     * session directly.
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
            'Your Regulator Champions member session has expired. Please sign in again before submitting your question.',
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
     * Read submission.
     */
    let body: MonthlyQuestionRequest;

    try {
      body =
        (await request.json()) as MonthlyQuestionRequest;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error:
            'The question could not be read. Please refresh the page and try again.',
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

    /*
     * Clean incoming educator text.
     */
    const whatNoticing =
      cleanText(
        body.whatNoticing,
        5000,
      );

    const whatTried =
      cleanText(
        body.whatTried,
        4000,
      );

    const whatHelpUnderstanding =
      cleanText(
        body.whatHelpUnderstanding,
        4000,
      );

    const firstName =
      cleanText(
        body.firstName,
        100,
      );

    /*
     * The service name comes from
     * the verified member session.
     *
     * This prevents an educator
     * accidentally or deliberately
     * submitting under another service.
     */
    const serviceName =
      memberSession.centreName.trim();

    /*
     * Server-side validation.
     */
    if (
      whatNoticing.length < 10
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please tell me a little more about what you are noticing.',
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

    /*
     * Save securely using the
     * Supabase service role.
     */
    const supabase =
      getSupabaseAdmin();

    const {
      data,
      error,
    } = await supabase
      .from(
        'regulator_champion_questions',
      )
      .insert({
        first_name:
          firstName,

        service_name:
          serviceName,

        what_noticing:
          whatNoticing,

        what_tried:
          whatTried || null,

        help_understanding:
          whatHelpUnderstanding ||
          null,

        month_key:
          '2026-09',

        status:
          'new',
      })
      .select(
        'id, created_at',
      )
      .single();

    if (
      error ||
      !data
    ) {
      console.error(
        'Regulator Champions monthly question insert failed:',
        error,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Your question could not be saved. Please try again.',
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

    const savedQuestion =
      data as SavedQuestion;

    /*
     * Notify Robyn without putting
     * the educator's actual question
     * content into an email.
     */
    try {
      await sendQuestionNotification({
        firstName,
        serviceName,
        questionId:
          savedQuestion.id,
        createdAt:
          savedQuestion.created_at,
      });
    } catch (emailError) {
      /*
       * Do not reject the educator's
       * submission if the notification
       * email fails.
       */
      console.error(
        'Regulator Champions notification email error:',
        emailError,
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
      'Monthly question API failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your question could not be submitted right now. Please try again.',
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