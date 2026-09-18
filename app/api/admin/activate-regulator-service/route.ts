import {
  NextRequest,
  NextResponse,
} from 'next/server';

import {
  randomUUID,
} from 'crypto';

import {
  Resend,
} from 'resend';

import {
  createRcAdminClient,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

type RcService = {
  id: string;
  service_name: string;
  manager_name: string;
  manager_email: string;
};

function escapeHtml(
  value: string,
) {
  return value
    .replace(
      /&/g,
      '&amp;',
    )
    .replace(
      /</g,
      '&lt;',
    )
    .replace(
      />/g,
      '&gt;',
    )
    .replace(
      /"/g,
      '&quot;',
    )
    .replace(
      /'/g,
      '&#039;',
    );
}

function isAdmin(
  request: NextRequest,
) {
  const adminToken =
    process.env
      .REGULATOR_ADMIN_TOKEN;

  if (!adminToken) {
    return false;
  }

  const session =
    request.cookies.get(
      'regulator_admin_session',
    )?.value;

  return (
    Boolean(session) &&
    session === adminToken
  );
}

async function findExistingUserByEmail(
  supabase: ReturnType<
    typeof createRcAdminClient
  >,
  email: string,
) {
  const normalisedEmail =
    email
      .trim()
      .toLowerCase();

  let page = 1;

  const perPage = 100;

  while (page <= 20) {
    const {
      data,
      error,
    } =
      await supabase.auth
        .admin
        .listUsers({
          page,
          perPage,
        });

    if (error) {
      console.error(
        'Could not search Supabase users:',
        error,
      );

      return null;
    }

    const foundUser =
      data.users.find(
        (user) =>
          user.email
            ?.toLowerCase() ===
          normalisedEmail,
      );

    if (foundUser) {
      return foundUser;
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
    if (
      !isAdmin(
        request,
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Unauthorised.',
        },
        {
          status: 401,
        },
      );
    }

    const body =
      await request.json();

    const leadId =
      typeof body?.leadId ===
      'string'
        ? body.leadId.trim()
        : '';

    if (!leadId) {
      return NextResponse.json(
        {
          error:
            'Missing lead ID.',
        },
        {
          status: 400,
        },
      );
    }

    const supabase =
      createRcAdminClient();

    /*
     * -------------------------------------------------------
     * 1. ACTIVATE THE PAID SERVICE
     * -------------------------------------------------------
     */

    const {
      data:
        activationResult,
      error:
        activationError,
    } =
      await supabase.rpc(
        'rc_activate_paid_service',
        {
          p_lead_id:
            leadId,
        },
      );

    if (
      activationError
    ) {
      console.error(
        'Regulator Champions activation RPC failed:',
        activationError,
      );

      return NextResponse.json(
        {
          error:
            'The paid service could not be activated.',
        },
        {
          status: 500,
        },
      );
    }

    /*
     * The database function returns
     * the service UUID.
     */

    let serviceId = '';

    if (
      typeof activationResult ===
      'string'
    ) {
      serviceId =
        activationResult;
    } else if (
      Array.isArray(
        activationResult,
      ) &&
      typeof activationResult[0] ===
        'string'
    ) {
      serviceId =
        activationResult[0];
    } else if (
      activationResult &&
      typeof activationResult ===
        'object'
    ) {
      const possibleResult =
        activationResult as Record<
          string,
          unknown
        >;

      const possibleId =
        possibleResult.id ??
        possibleResult.service_id ??
        possibleResult.rc_activate_paid_service;

      if (
        typeof possibleId ===
        'string'
      ) {
        serviceId =
          possibleId;
      }
    }

    /*
     * If the RPC result shape changes,
     * we can still locate the service
     * using the source lead.
     */

    let service:
      | RcService
      | null =
      null;

    if (serviceId) {
      const {
        data,
        error,
      } =
        await supabase
          .from(
            'rc_services',
          )
          .select(
            `
              id,
              service_name,
              manager_name,
              manager_email
            `,
          )
          .eq(
            'id',
            serviceId,
          )
          .maybeSingle();

      if (error) {
        console.error(
          'Could not load activated service by ID:',
          error,
        );
      }

      service =
        data as
          | RcService
          | null;
    }

    if (!service) {
      const {
        data,
        error,
      } =
        await supabase
          .from(
            'rc_services',
          )
          .select(
            `
              id,
              service_name,
              manager_name,
              manager_email
            `,
          )
          .eq(
            'source_lead_id',
            leadId,
          )
          .maybeSingle();

      if (error) {
        console.error(
          'Could not load activated service by lead:',
          error,
        );
      }

      service =
        data as
          | RcService
          | null;
    }

    if (!service) {
      return NextResponse.json(
        {
          error:
            'The service was activated, but its service record could not be loaded.',
        },
        {
          status: 500,
        },
      );
    }

    serviceId =
      service.id;

    const managerName =
      service.manager_name
        .trim();

    const managerEmail =
      service.manager_email
        .trim()
        .toLowerCase();

    if (!managerEmail) {
      return NextResponse.json(
        {
          error:
            'The service does not have a manager email address.',
        },
        {
          status: 500,
        },
      );
    }

    /*
     * -------------------------------------------------------
     * 2. FIND OR CREATE MANAGER AUTH ACCOUNT
     * -------------------------------------------------------
     */

    let authUser =
      await findExistingUserByEmail(
        supabase,
        managerEmail,
      );

    if (!authUser) {
      const temporaryPassword =
        `${randomUUID()}Aa1!`;

      const {
        data:
          createdUserData,
        error:
          createUserError,
      } =
        await supabase.auth
          .admin
          .createUser({
            email:
              managerEmail,

            password:
              temporaryPassword,

            email_confirm:
              true,

            user_metadata:
              {
                full_name:
                  managerName,
              },
          });

      if (
        createUserError ||
        !createdUserData.user
      ) {
        console.error(
          'Could not create manager Supabase account:',
          createUserError,
        );

        return NextResponse.json(
          {
            error:
              'The service was activated, but the manager account could not be created.',
          },
          {
            status: 500,
          },
        );
      }

      authUser =
        createdUserData.user;
    }

    /*
     * -------------------------------------------------------
     * 3. CONNECT AUTH USER TO MANAGER TEAM RECORD
     * -------------------------------------------------------
     */

    const {
      error:
        managerUpdateError,
    } =
      await supabase
        .from(
          'rc_team_members',
        )
        .update({
          user_id:
            authUser.id,

          full_name:
            managerName,

          email:
            managerEmail,

          status:
            'active',

          removed_at:
            null,

          updated_at:
            new Date()
              .toISOString(),
        })
        .eq(
          'service_id',
          service.id,
        )
        .eq(
          'role',
          'manager',
        );

    if (
      managerUpdateError
    ) {
      console.error(
        'Could not connect manager account to service:',
        managerUpdateError,
      );

      return NextResponse.json(
        {
          error:
            'The manager account was created, but it could not be connected to the service.',
        },
        {
          status: 500,
        },
      );
    }

    /*
     * -------------------------------------------------------
     * 4. PASSWORD SETUP EMAIL
     * -------------------------------------------------------
     *
     * Local:
     * NEXT_PUBLIC_SITE_URL=http://localhost:3000
     *
     * Vercel:
     * NEXT_PUBLIC_SITE_URL=
     * https://playmoveimprove-regulator-champions.vercel.app
     */

    const siteUrl =
      (
        process.env
          .NEXT_PUBLIC_SITE_URL ||
        'https://playmoveimprove-regulator-champions.vercel.app'
      ).replace(
        /\/$/,
        '',
      );

    const {
      error:
        passwordEmailError,
    } =
      await supabase.auth
        .resetPasswordForEmail(
          managerEmail,
          {
            redirectTo:
              `${siteUrl}/set-password`,
          },
        );

    if (
      passwordEmailError
    ) {
      console.error(
        'Manager password setup email failed:',
        passwordEmailError,
      );

      /*
       * The service and manager account
       * have already been created, so
       * we don't undo the activation.
       */
    }

    /*
     * -------------------------------------------------------
     * 5. BRANDED WELCOME EMAIL
     * -------------------------------------------------------
     */

    if (
      process.env
        .RESEND_API_KEY
    ) {
      try {
        const resend =
          new Resend(
            process.env
              .RESEND_API_KEY,
          );

        const safeName =
          escapeHtml(
            managerName ||
              'there',
          );

        const safeService =
          escapeHtml(
            service.service_name,
          );

        await resend.emails.send({
          from:
            'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',

          to:
            managerEmail,

          subject:
            'Your Regulator Champions service is ready',

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
                    Welcome to Regulator Champions
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
                      margin:0 0 16px;
                      color:#42544D;
                      font-size:16px;
                      line-height:1.7;
                    "
                  >
                    Your Regulator Champions service for
                    <strong>${safeService}</strong>
                    is now active.
                  </p>

                  <p
                    style="
                      margin:0 0 20px;
                      color:#42544D;
                      font-size:16px;
                      line-height:1.7;
                    "
                  >
                    You will also receive a secure password email.
                    Use that link to choose your password and enter
                    your manager dashboard.
                  </p>

                  <div
                    style="
                      margin:24px 0;
                      padding:22px;
                      border-radius:16px;
                      background:#FAF5EC;
                    "
                  >
                    <p
                      style="
                        margin:0 0 12px;
                        color:#12362F;
                        font-size:16px;
                        font-weight:700;
                      "
                    >
                      Once you are logged in, you can:
                    </p>

                    <p
                      style="
                        margin:6px 0;
                        color:#42544D;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      1. Review your manager dashboard
                    </p>

                    <p
                      style="
                        margin:6px 0;
                        color:#42544D;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      2. Invite up to 15 educators from your service
                    </p>

                    <p
                      style="
                        margin:6px 0;
                        color:#42544D;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      3. Open your available Regulator Champions learning
                    </p>

                    <p
                      style="
                        margin:6px 0;
                        color:#42544D;
                        font-size:15px;
                        line-height:1.7;
                      "
                    >
                      4. Access Family Voice and other service tools as they become available
                    </p>
                  </div>

                  <a
                    href="${siteUrl}/member-access"
                    style="
                      display:inline-block;
                      margin-top:4px;
                      padding:14px 24px;
                      background:#12362F;
                      color:#ffffff;
                      text-decoration:none;
                      border-radius:12px;
                      font-size:15px;
                      font-weight:700;
                    "
                  >
                    Go to Regulator Champions
                  </a>

                  <p
                    style="
                      margin:28px 0 0;
                      color:#657B6C;
                      font-size:14px;
                      line-height:1.7;
                    "
                  >
                    If you have any trouble getting started, reply to
                    this email and I can help.
                  </p>

                  <p
                    style="
                      margin:20px 0 0;
                      color:#42544D;
                      font-size:15px;
                      line-height:1.7;
                    "
                  >
                    Robyn
                    <br />
                    Play Move Improve
                  </p>

                  <p
                    style="
                      margin:28px 0 0;
                      color:#9A9A9A;
                      font-size:12px;
                      line-height:1.6;
                    "
                  >
                    Regulator Champions Program · Play Move Improve
                    <br />
                    www.playmoveimprove.com
                  </p>
                </div>
              </body>
            </html>
          `,
        });
      } catch (
        emailError
      ) {
        console.error(
          'Regulator Champions welcome email failed:',
          emailError,
        );

        /*
         * Do not undo access just because
         * the welcome email failed.
         */
      }
    }

    /*
     * -------------------------------------------------------
     * 6. RETURN SUCCESS
     * -------------------------------------------------------
     */

    return NextResponse.json(
      {
        success: true,
        serviceId:
          service.id,
        managerEmail,
        passwordEmailSent:
          !passwordEmailError,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      'Unexpected Regulator Champions activation error:',
      error,
    );

    return NextResponse.json(
      {
        error:
          'The Regulator Champions service could not be activated.',
      },
      {
        status: 500,
      },
    );
  }
}