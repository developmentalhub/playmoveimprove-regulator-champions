import { NextResponse } from 'next/server';

type LeadGuideRequest = {
  name?: unknown;
  email?: unknown;
  organisationName?: unknown;
  role?: unknown;
  consentToContact?: unknown;
  guide?: unknown;
};

const MAX_REQUEST_BYTES = 10_000;

function cleanText(
  value: unknown,
  maxLength: number,
): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, maxLength);
}

function cleanEmail(value: unknown): string {
  const email = cleanText(value, 254).toLowerCase();

  if (
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return '';
  }

  return email;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendLeadNotification({
  name,
  email,
  organisationName,
  role,
  consentToContact,
}: {
  name: string;
  email: string;
  organisationName: string;
  role: string;
  consentToContact: boolean;
}) {
  const resendApiKey =
    process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.warn(
      'RESEND_API_KEY is missing. Lead was saved but notification email was not sent.',
    );

    return;
  }

  const notificationEmail =
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    'robyn@playmoveimprove.com.au';

  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ||
    'Play Move Improve <enquiries@playmoveimprove.com.au>';

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
        to: [notificationEmail],
        reply_to: email,

        subject:
          `New Safe Touch guide lead from ${name}`,

        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#24332e;">
            <h2>New Safe Touch Guide Lead</h2>

            <p>
              Someone has requested the free
              <strong>Can I Still Comfort a Distressed Child?</strong>
              guide.
            </p>

            <table style="border-collapse:collapse;width:100%;max-width:600px;">
              <tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Name</strong></td>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(name)}</td>
              </tr>

              <tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Email</strong></td>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(email)}</td>
              </tr>

              <tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Organisation</strong></td>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(
                  organisationName || 'Not supplied',
                )}</td>
              </tr>

              <tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Role</strong></td>
                <td style="padding:8px;border-bottom:1px solid #ddd;">${escapeHtml(
                  role || 'Not supplied',
                )}</td>
              </tr>

              <tr>
                <td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Marketing consent</strong></td>
                <td style="padding:8px;border-bottom:1px solid #ddd;">
                  ${consentToContact ? 'Yes' : 'No'}
                </td>
              </tr>
            </table>
          </div>
        `,
      }),

      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      'Safe Touch lead notification failed:',
      errorText,
    );
  }
}

export async function POST(
  request: Request,
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
          message:
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
      (await request.json()) as LeadGuideRequest;

    const name =
      cleanText(body.name, 120);

    const email =
      cleanEmail(body.email);

    const organisationName =
      cleanText(
        body.organisationName,
        180,
      );

    const role =
      cleanText(body.role, 120);

    const guide =
      cleanText(body.guide, 100) ||
      'safe-touch-early-childhood';

    const consentToContact =
      body.consentToContact === true;

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Please enter your name.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message:
            'Please enter a valid work email address.',
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
        'Supabase environment variables are missing.',
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'The guide request service is not configured correctly.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const saveResponse = await fetch(
      `${supabaseUrl}/rest/v1/regulator_leads`,
      {
        method: 'POST',

        headers: {
          apikey: serviceRoleKey,

          Authorization:
            `Bearer ${serviceRoleKey}`,

          'Content-Type':
            'application/json',

          Prefer:
            'return=minimal',
        },

        body: JSON.stringify({
          name,
          email,
          organisation_name:
            organisationName || null,
          role:
            role || null,
          guide,
          consent_to_contact:
            consentToContact,
          source:
            'free-guide-page',
          status:
            'new',
          created_at:
            new Date().toISOString(),
        }),

        cache: 'no-store',
      },
    );

    if (!saveResponse.ok) {
      const errorText =
        await saveResponse.text();

      console.error(
        'Safe Touch guide lead save failed:',
        errorText,
      );

      return NextResponse.json(
        {
          success: false,
          message:
            'Your guide request could not be saved. Please try again.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    await sendLeadNotification({
      name,
      email,
      organisationName,
      role,
      consentToContact,
    });

    return NextResponse.json(
      {
        success: true,

        message:
          'Thank you. Your Safe Touch guide and printable checklist are ready.',

        downloadUrl:
          '/pdf/Safe-Touch-Early-Childhood-Guide.pdf',
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
      'Safe Touch guide lead route failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          'Your guide request could not be completed. Please try again.',
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