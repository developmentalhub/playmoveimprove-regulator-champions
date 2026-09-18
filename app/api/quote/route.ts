import {
  NextRequest,
  NextResponse,
} from 'next/server';

import {
  createClient,
} from '@supabase/supabase-js';

import {
  Resend,
} from 'resend';

const EARLY_BIRD_PRICE =
  4790;

const PREMIUM_PRICE =
  5990;

type ProgramOption =
  | 'early-bird'
  | 'premium';

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

function cleanString(
  value: unknown,
) {
  if (
    typeof value !==
    'string'
  ) {
    return '';
  }

  return value.trim();
}

function emailField(
  label: string,
  value: string,
) {
  return `
    <div
      style="
        margin-bottom:18px;
      "
    >
      <div
        style="
          margin-bottom:4px;
          font-size:11px;
          color:#8a6f3e;
          font-weight:bold;
          text-transform:uppercase;
          letter-spacing:0.7px;
        "
      >
        ${label}
      </div>

      <div
        style="
          font-size:15px;
          line-height:1.6;
          color:#1c3b34;
          white-space:pre-wrap;
        "
      >
        ${value}
      </div>
    </div>
  `;
}

export async function POST(
  req: NextRequest,
) {
  try {
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
        'Invoice request configuration error:',
        {
          hasSupabaseUrl:
            Boolean(
              supabaseUrl,
            ),

          hasServiceRoleKey:
            Boolean(
              serviceRoleKey,
            ),
        },
      );

      return NextResponse.json(
        {
          error:
            'Server configuration error.',
        },
        {
          status: 500,
        },
      );
    }

    const supabase =
      createClient(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            persistSession:
              false,
            autoRefreshToken:
              false,
          },
        },
      );

    const body =
      await req.json();

    const serviceName =
      cleanString(
        body.serviceName,
      );

    const managerName =
      cleanString(
        body.managerName,
      );

    const managerEmail =
      cleanString(
        body.managerEmail,
      ).toLowerCase();

    const phone =
      cleanString(
        body.phone,
      );

    const postalAddress =
      cleanString(
        body.postalAddress,
      );

    const serviceType =
      cleanString(
        body.serviceType,
      );

    const fundingSource =
      cleanString(
        body.fundingSource,
      );

    const fundingOther =
      cleanString(
        body.fundingOther,
      );

    const billingName =
      cleanString(
        body.billingName,
      );

    const billingEmail =
      cleanString(
        body.billingEmail,
      ).toLowerCase();

    const notes =
      cleanString(
        body.notes,
      );

    const educatorCount =
      Number(
        body.educatorCount,
      );

    const programOption:
      ProgramOption =
      body.programOption ===
      'premium'
        ? 'premium'
        : 'early-bird';

    /*
     * Validation
     */

    if (!serviceName) {
      return NextResponse.json(
        {
          error:
            'Service name is required.',
        },
        {
          status: 400,
        },
      );
    }

    if (!managerName) {
      return NextResponse.json(
        {
          error:
            'Manager name is required.',
        },
        {
          status: 400,
        },
      );
    }

    if (
      !managerEmail ||
      !managerEmail.includes(
        '@',
      )
    ) {
      return NextResponse.json(
        {
          error:
            'A valid manager email is required.',
        },
        {
          status: 400,
        },
      );
    }

    if (!phone) {
      return NextResponse.json(
        {
          error:
            'Phone number is required.',
        },
        {
          status: 400,
        },
      );
    }

    if (!postalAddress) {
      return NextResponse.json(
        {
          error:
            'Postal address is required.',
        },
        {
          status: 400,
        },
      );
    }

    if (!serviceType) {
      return NextResponse.json(
        {
          error:
            'Service type is required.',
        },
        {
          status: 400,
        },
      );
    }

    if (
      !Number.isInteger(
        educatorCount,
      ) ||
      educatorCount < 1 ||
      educatorCount > 15
    ) {
      return NextResponse.json(
        {
          error:
            'Number of educators must be between 1 and 15.',
        },
        {
          status: 400,
        },
      );
    }

    if (!fundingSource) {
      return NextResponse.json(
        {
          error:
            'Please select a funding or budget option.',
        },
        {
          status: 400,
        },
      );
    }

    if (
      billingEmail &&
      !billingEmail.includes(
        '@',
      )
    ) {
      return NextResponse.json(
        {
          error:
            'Billing email is not valid.',
        },
        {
          status: 400,
        },
      );
    }

    const selectedPrice =
      programOption ===
      'premium'
        ? PREMIUM_PRICE
        : EARLY_BIRD_PRICE;

    const programLabel =
      programOption ===
      'premium'
        ? '2027 Premium Regulator Champions'
        : '2027 Early Bird Digital Regulator Champions';

    const finalBillingName =
      billingName ||
      managerName;

    const finalBillingEmail =
      billingEmail ||
      managerEmail;

    /*
     * Save invoice request.
     *
     * Only use fields confirmed for
     * the 2027 regulator_leads setup.
     */

    const {
      data: savedLead,
      error:
        databaseError,
    } = await supabase
      .from(
        'regulator_leads',
      )
      .insert({
        name:
          managerName,

        email:
          managerEmail,

        organisation_name:
          serviceName,

        source:
          '2027-homepage-invoice-request',

        status:
          'invoice-requested',

        phone,

        postal_address:
          postalAddress,

        service_type:
          serviceType,

        educator_count:
          educatorCount,

        funding_source:
          fundingSource,

        funding_other:
          fundingOther ||
          null,

        billing_name:
          finalBillingName,

        billing_email:
          finalBillingEmail,

        notes:
          notes || null,

        program_option:
          programOption,

        amount:
          selectedPrice,
      })
      .select(
        'id',
      )
      .single();

    if (
      databaseError ||
      !savedLead
    ) {
      console.error(
        'SUPABASE INVOICE REQUEST INSERT FAILED',
        {
          message:
            databaseError
              ?.message,

          details:
            databaseError
              ?.details,

          hint:
            databaseError
              ?.hint,

          code:
            databaseError
              ?.code,
        },
      );

      /*
       * In local development we return
       * more detail so errors are easy
       * to diagnose.
       *
       * Production users still receive
       * the friendly message only.
       */
      return NextResponse.json(
        {
          error:
            'We could not save your invoice request.',

          ...(process.env
            .NODE_ENV ===
          'development'
            ? {
                debug:
                  databaseError
                    ?.message ||
                  'Unknown database error',

                code:
                  databaseError
                    ?.code ||
                  null,

                details:
                  databaseError
                    ?.details ||
                  null,

                hint:
                  databaseError
                    ?.hint ||
                  null,
              }
            : {}),
        },
        {
          status: 500,
        },
      );
    }

    console.log(
      'Regulator Champions invoice request saved:',
      {
        leadId:
          savedLead.id,

        serviceName,

        managerEmail,

        programOption,

        amount:
          selectedPrice,
      },
    );

    /*
     * Email Robyn.
     *
     * The database save is the important
     * part. A Resend failure should not
     * cause the customer's form to fail.
     */

    if (
      process.env
        .RESEND_API_KEY
    ) {
      const resend =
        new Resend(
          process.env
            .RESEND_API_KEY,
        );

      const safe = {
        serviceName:
          escapeHtml(
            serviceName,
          ),

        managerName:
          escapeHtml(
            managerName,
          ),

        managerEmail:
          escapeHtml(
            managerEmail,
          ),

        phone:
          escapeHtml(
            phone,
          ),

        postalAddress:
          escapeHtml(
            postalAddress,
          ),

        serviceType:
          escapeHtml(
            serviceType,
          ),

        fundingSource:
          escapeHtml(
            fundingSource,
          ),

        fundingOther:
          escapeHtml(
            fundingOther ||
              'Not applicable',
          ),

        billingName:
          escapeHtml(
            finalBillingName,
          ),

        billingEmail:
          escapeHtml(
            finalBillingEmail,
          ),

        notes:
          escapeHtml(
            notes ||
              'None provided',
          ),

        programLabel:
          escapeHtml(
            programLabel,
          ),
      };

      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <body
            style="
              margin:0;
              padding:24px;
              background:#f7f3ed;
              color:#1c3b34;
              font-family:Arial,sans-serif;
            "
          >
            <div
              style="
                max-width:680px;
                margin:0 auto;
                background:#ffffff;
                border-radius:20px;
                padding:32px;
                border:1px solid #e5ded4;
              "
            >
              <p
                style="
                  margin:0;
                  font-size:13px;
                  font-weight:bold;
                  color:#9a793d;
                  text-transform:uppercase;
                  letter-spacing:1px;
                "
              >
                Play Move Improve
              </p>

              <h1
                style="
                  margin:8px 0 0;
                  font-size:26px;
                  color:#1c3b34;
                "
              >
                New 2027 Regulator Champions invoice request
              </h1>

              <div
                style="
                  margin:24px 0;
                  padding:20px;
                  background:#fff8e7;
                  border:1px solid #e0bc68;
                  border-radius:16px;
                "
              >
                <strong>
                  ${safe.programLabel}
                </strong>

                <div
                  style="
                    margin-top:6px;
                    font-size:28px;
                    font-weight:bold;
                  "
                >
                  $${selectedPrice.toLocaleString(
                    'en-AU',
                  )} AUD
                </div>

                <div
                  style="
                    margin-top:5px;
                    color:#53645d;
                  "
                >
                  ${educatorCount} educator${
                    educatorCount ===
                    1
                      ? ''
                      : 's'
                  }
                </div>
              </div>

              ${emailField(
                'Service',
                safe.serviceName,
              )}

              ${emailField(
                'Service type',
                safe.serviceType,
              )}

              ${emailField(
                'Manager',
                safe.managerName,
              )}

              ${emailField(
                'Manager email',
                safe.managerEmail,
              )}

              ${emailField(
                'Phone',
                safe.phone,
              )}

              ${emailField(
                'Postal address',
                safe.postalAddress,
              )}

              ${emailField(
                'Funding / budget',
                safe.fundingSource,
              )}

              ${
                fundingOther
                  ? emailField(
                      'Other funding',
                      safe.fundingOther,
                    )
                  : ''
              }

              ${emailField(
                'Billing contact',
                safe.billingName,
              )}

              ${emailField(
                'Billing email',
                safe.billingEmail,
              )}

              ${emailField(
                'Notes',
                safe.notes,
              )}

              <div
                style="
                  margin-top:28px;
                  padding-top:18px;
                  border-top:1px solid #e5ded4;
                  color:#6b7772;
                  font-size:12px;
                "
              >
                Regulator Champions 2027
                · Play Move Improve
              </div>
            </div>
          </body>
        </html>
      `;

      const {
        error:
          emailError,
      } =
        await resend.emails
          .send({
            from:
              'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',

            to: [
              'robyn@playmoveimprove.com.au',
            ],

            replyTo:
              managerEmail,

            subject:
              `2027 invoice request — ${serviceName} — $${selectedPrice.toLocaleString(
                'en-AU',
              )}`,

            html:
              emailHtml,
          });

      if (
        emailError
      ) {
        console.error(
          'Resend invoice notification failed:',
          emailError,
        );
      }
    } else {
      console.warn(
        'RESEND_API_KEY is not configured. Invoice request saved without notification email.',
      );
    }

    return NextResponse.json(
      {
        success: true,

        leadId:
          savedLead.id,

        message:
          'Your invoice request has been received.',

        programOption,

        programLabel,

        price:
          selectedPrice,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      'Unhandled invoice request error:',
      error,
    );

    return NextResponse.json(
      {
        error:
          'An unexpected error occurred. Please try again.',

        ...(process.env
          .NODE_ENV ===
        'development'
          ? {
              debug:
                error instanceof
                Error
                  ? error.message
                  : String(
                      error,
                    ),
            }
          : {}),
      },
      {
        status: 500,
      },
    );
  }
}