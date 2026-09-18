import {
  NextRequest,
  NextResponse,
} from 'next/server';

import {
  Resend,
} from 'resend';

import {
  createRcAdminClient,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

function escapeHtml(
  value: string,
) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function findAuthUserByEmail(
  email: string,
) {
  const supabase =
    createRcAdminClient();

  let page = 1;
  const perPage = 100;

  while (page <= 20) {
    const {
      data,
      error,
    } =
      await supabase.auth.admin
        .listUsers({
          page,
          perPage,
        });

    if (error) {
      console.error(
        'Could not list Supabase users:',
        error,
      );

      return null;
    }

    const found =
      data.users.find(
        (user) =>
          user.email
            ?.toLowerCase() ===
          email.toLowerCase(),
      );

    if (found) {
      return found;
    }

    if (
      data.users.length <
      perPage
    ) {
      break;
    }

    page += 1;
  }

  return null;
}

export async function POST(
  request: NextRequest,
) {
  try {
    const body =
      await request.json();

    const email =
      typeof body?.email ===
      'string'
        ? body.email
            .trim()
            .toLowerCase()
        : '';

    if (
      !email ||
      !email.includes('@')
    ) {
      return NextResponse.json(
        {
          error:
            'Please enter a valid email address.',
        },
        {
          status: 400,
        },
      );
    }

    const supabase =
      createRcAdminClient();

    /*
     * Check Supabase Auth directly.
     */

    const authUser =
      await findAuthUserByEmail(
        email,
      );

    if (!authUser) {
      console.log(
        'No Supabase Auth user found for password reset:',
        email,
      );

      /*
       * Keep this response generic so
       * the public page does not reveal
       * which email addresses have accounts.
       */

      return NextResponse.json(
        {
          success: true,
          message:
            'If that email is connected to a Regulator Champions account, a password reset link will be sent.',
        },
        {
          status: 200,
        },
      );
    }

    /*
     * Use localhost while testing locally.
     * Use NEXT_PUBLIC_SITE_URL on Vercel.
     */

    const requestOrigin =
      request.nextUrl.origin;

    const isLocal =
      requestOrigin.includes(
        'localhost',
      );

    const configuredSite =
      process.env
        .NEXT_PUBLIC_SITE_URL;

    const siteUrl =
      (
        isLocal
          ? requestOrigin
          : configuredSite ||
            requestOrigin
      ).replace(
        /\/$/,
        '',
      );

    const {
      data:
        recoveryData,
      error:
        recoveryError,
    } =
      await supabase.auth.admin
        .generateLink({
          type:
            'recovery',

          email,

          options: {
            redirectTo:
              `${siteUrl}/set-password`,
          },
        });

    if (
      recoveryError
    ) {
      console.error(
        'Supabase recovery link generation failed:',
        recoveryError,
      );

      return NextResponse.json(
        {
          error:
            'We found your account, but could not create the password reset link.',
        },
        {
          status: 500,
        },
      );
    }

    const resetUrl =
      recoveryData
        ?.properties
        ?.action_link;

    if (!resetUrl) {
      console.error(
        'Supabase did not return a recovery action link.',
        recoveryData,
      );

      return NextResponse.json(
        {
          error:
            'We found your account, but could not create the password reset link.',
        },
        {
          status: 500,
        },
      );
    }

    if (
      !process.env
        .RESEND_API_KEY
    ) {
      console.error(
        'RESEND_API_KEY is missing.',
      );

      return NextResponse.json(
        {
          error:
            'The password reset email service is not configured.',
        },
        {
          status: 500,
        },
      );
    }

    /*
     * Try to find the person's name.
     * This is optional and does not
     * control whether they receive
     * their password reset.
     */

    let fullName =
      authUser.user_metadata
        ?.full_name ||
      '';

    const {
      data:
        teamMember,
    } =
      await supabase
        .from(
          'rc_team_members',
        )
        .select(
          'full_name',
        )
        .ilike(
          'email',
          email,
        )
        .maybeSingle();

    if (
      teamMember?.full_name
    ) {
      fullName =
        teamMember.full_name;
    }

    const safeName =
      escapeHtml(
        fullName ||
          'there',
      );

    const resend =
      new Resend(
        process.env
          .RESEND_API_KEY,
      );

    const {
      data:
        resendData,
      error:
        resendError,
    } =
      await resend.emails.send({
        from:
          'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',

        to: [
          email,
        ],

        subject:
          'Reset your Regulator Champions password',

        html: `
          <!DOCTYPE html>
          <html>
            <body
              style="
                margin:0;
                padding:24px;
                background:#FAF8F5;
                color:#12362F;
                font-family:Arial,sans-serif;
              "
            >
              <div
                style="
                  max-width:620px;
                  margin:0 auto;
                  background:#ffffff;
                  border:1px solid #E5DED4;
                  border-radius:20px;
                  padding:32px;
                "
              >
                <p
                  style="
                    margin:0;
                    color:#9A793D;
                    font-size:12px;
                    font-weight:700;
                    text-transform:uppercase;
                    letter-spacing:1.4px;
                  "
                >
                  Play Move Improve
                </p>

                <h1
                  style="
                    margin:10px 0 18px;
                    color:#12362F;
                    font-size:28px;
                    line-height:1.2;
                  "
                >
                  Reset your password
                </h1>

                <p
                  style="
                    margin:0 0 16px;
                    color:#42544D;
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  Hi ${safeName},
                </p>

                <p
                  style="
                    margin:0 0 24px;
                    color:#42544D;
                    font-size:16px;
                    line-height:1.7;
                  "
                >
                  Use the secure button below to choose a new password for your Regulator Champions account.
                </p>

                <a
                  href="${resetUrl}"
                  style="
                    display:inline-block;
                    padding:14px 24px;
                    background:#12362F;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:12px;
                    font-size:15px;
                    font-weight:700;
                  "
                >
                  Reset my password
                </a>

                <p
                  style="
                    margin:25px 0 0;
                    color:#657B6C;
                    font-size:13px;
                    line-height:1.7;
                  "
                >
                  If you did not request this password reset, you can ignore this email.
                </p>

                <p
                  style="
                    margin:22px 0 0;
                    color:#42544D;
                    font-size:15px;
                    line-height:1.7;
                  "
                >
                  Robyn
                  <br />
                  Play Move Improve
                </p>
              </div>
            </body>
          </html>
        `,
      });

    if (
      resendError
    ) {
      console.error(
        'Resend password email failed:',
        resendError,
      );

      return NextResponse.json(
        {
          error:
            'Your reset link was created, but the email could not be sent.',
        },
        {
          status: 500,
        },
      );
    }

    console.log(
      'Password reset email sent:',
      {
        email,
        resendId:
          resendData?.id,
      },
    );

    return NextResponse.json(
      {
        success: true,
        message:
          'Your password reset email has been sent. Please check your inbox and junk folder.',
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      'Unexpected password reset error:',
      error,
    );

    return NextResponse.json(
      {
        error:
          'Something went wrong while preparing your password reset.',
      },
      {
        status: 500,
      },
    );
  }
}