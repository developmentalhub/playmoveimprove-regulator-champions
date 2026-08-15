import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const FULL_PRICE = 4790;
const PREVIEW_PRICE = 1790;

type ProgramOption = 'preview' | 'full';

// Initialize Supabase client
const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://vfflpjpvbazvzxbuxwme.supabase.co';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(SB_URL, SB_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      serviceName,
      providerLegalName,
      fundingSource,
      message,
      programOption,
    } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 },
      );
    }

    if (
      !email ||
      typeof email !== 'string' ||
      !email.includes('@')
    ) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 },
      );
    }

    if (
      !serviceName ||
      typeof serviceName !== 'string' ||
      !serviceName.trim()
    ) {
      return NextResponse.json(
        { error: 'Centre or Service name is required.' },
        { status: 400 },
      );
    }

    // Normalise selected program option
    const selectedProgram: ProgramOption =
      programOption === 'preview' ? 'preview' : 'full';

    const selectedPrice =
      selectedProgram === 'preview' ? PREVIEW_PRICE : FULL_PRICE;

    const selectedProgramLabel =
      selectedProgram === 'preview'
        ? '3-Ladder Preview'
        : 'Full 8-Ladder Site Membership';

    const selectedAccess =
      selectedProgram === 'preview'
        ? '6 months'
        : '12 months';

    // Clean input data
    const cleanData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : 'N/A',
      serviceName: serviceName.trim(),
      providerLegalName: providerLegalName
        ? String(providerLegalName).trim()
        : 'N/A',
      fundingSource: fundingSource
        ? String(fundingSource).trim()
        : 'N/A',
      message: message ? String(message).trim() : 'None provided',
      programOption: selectedProgram,
      programLabel: selectedProgramLabel,
      price: selectedPrice,
      accessPeriod: selectedAccess,
      submittedAt: new Date().toISOString(),
    };

    console.log(
      '--- NEW CENTRE QUOTE REQUEST RECEIVED ---',
      cleanData,
    );

    // Save quote backup to Supabase
    try {
      await supabase.from('quote_requests').insert([
        {
          contact_name: cleanData.fullName,
          email: cleanData.email,
          phone: cleanData.phone,
          centre_name: cleanData.serviceName,
          provider_legal_name: cleanData.providerLegalName,
          funding_source: cleanData.fundingSource,
          message: cleanData.message,
          plan: cleanData.programOption,
          amount: cleanData.price,
          created_at: cleanData.submittedAt,
        },
      ]);
    } catch (dbErr) {
      console.error('Supabase backup error (non-blocking):', dbErr);
    }

    // Escape user-provided values before inserting them into HTML email
    const safeData = {
      fullName: escapeHtml(cleanData.fullName),
      email: escapeHtml(cleanData.email),
      phone: escapeHtml(cleanData.phone),
      serviceName: escapeHtml(cleanData.serviceName),
      providerLegalName: escapeHtml(cleanData.providerLegalName),
      fundingSource: escapeHtml(cleanData.fundingSource),
      message: escapeHtml(cleanData.message),
      programLabel: escapeHtml(cleanData.programLabel),
      accessPeriod: escapeHtml(cleanData.accessPeriod),
    };

    // Send styled HTML email notification via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #1e293b;
                  background-color: #f8fafc;
                  padding: 20px;
                }

                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background: #ffffff;
                  padding: 30px;
                  border-radius: 16px;
                  border: 1px solid #e2e8f0;
                }

                .header {
                  border-bottom: 2px solid #0f766e;
                  padding-bottom: 15px;
                  margin-bottom: 20px;
                }

                .title {
                  font-size: 20px;
                  color: #0f766e;
                  font-weight: bold;
                  margin: 0;
                }

                .price-box {
                  margin: 20px 0;
                  padding: 18px;
                  border-radius: 12px;
                  background: #f0fdfa;
                  border: 1px solid #99f6e4;
                }

                .price {
                  font-size: 24px;
                  font-weight: bold;
                  color: #134e4a;
                }

                .field {
                  margin-bottom: 12px;
                }

                .label {
                  font-size: 11px;
                  text-transform: uppercase;
                  color: #64748b;
                  font-weight: bold;
                  display: block;
                }

                .value {
                  font-size: 14px;
                  color: #0f172a;
                  font-weight: 600;
                  margin-top: 2px;
                }

                .footer {
                  margin-top: 25px;
                  padding-top: 15px;
                  border-top: 1px solid #e2e8f0;
                  font-size: 12px;
                  color: #64748b;
                  text-align: center;
                }
              </style>
            </head>

            <body>
              <div class="container">
                <div class="header">
                  <h1 class="title">
                    New ${safeData.programLabel} Proposal Request
                  </h1>
                </div>

                <div class="price-box">
                  <span class="label">Selected Program</span>
                  <div class="value">${safeData.programLabel}</div>

                  <div class="price">
                    $${cleanData.price.toLocaleString('en-AU')} AUD
                  </div>

                  <div class="value">
                    Incl. GST • ${safeData.accessPeriod}
                  </div>
                </div>

                <div class="field">
                  <span class="label">Director / Contact Name</span>
                  <div class="value">${safeData.fullName}</div>
                </div>

                <div class="field">
                  <span class="label">Email Address</span>
                  <div class="value">
                    <a href="mailto:${safeData.email}">
                      ${safeData.email}
                    </a>
                  </div>
                </div>

                <div class="field">
                  <span class="label">Phone Number</span>
                  <div class="value">${safeData.phone}</div>
                </div>

                <div class="field">
                  <span class="label">Centre / Service Name</span>
                  <div class="value">${safeData.serviceName}</div>
                </div>

                <div class="field">
                  <span class="label">
                    Approved Provider / Legal Entity
                  </span>
                  <div class="value">
                    ${safeData.providerLegalName}
                  </div>
                </div>

                <div class="field">
                  <span class="label">Funding Pathway</span>
                  <div class="value">
                    ${safeData.fundingSource}
                  </div>
                </div>

                <div class="field">
                  <span class="label">Program Option</span>
                  <div class="value">
                    ${safeData.programLabel}
                  </div>
                </div>

                <div class="field">
                  <span class="label">Additional Notes</span>
                  <div class="value">
                    ${safeData.message}
                  </div>
                </div>

                <div class="footer">
                  Regulator Champions Proposal Engine • Play Move Improve
                </div>
              </div>
            </body>
          </html>
        `;

        const resendResponse = await fetch(
          'https://api.resend.com/emails',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from:
                'Regulator Champions Quotes <quotes@playmoveimprove.com.au>',
              to: ['robyn@playmoveimprove.com.au'],
              reply_to: cleanData.email,
              subject: `Quote Request: ${cleanData.serviceName} — ${selectedProgramLabel} ($${selectedPrice.toLocaleString(
                'en-AU',
              )})`,
              html: emailHtml,
            }),
          },
        );

        if (!resendResponse.ok) {
          const errorText = await resendResponse.text();

          console.error(
            'Resend API returned error:',
            errorText,
          );
        }
      } catch (emailError) {
        console.error(
          'Failed to dispatch notification email:',
          emailError,
        );
      }
    } else {
      console.warn(
        'RESEND_API_KEY is not configured. Quote request was received but no notification email was sent.',
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          'Your quote request has been processed successfully.',
        programOption: selectedProgram,
        programLabel: selectedProgramLabel,
        price: selectedPrice,
        redirectUrl: `/proposal?plan=${selectedProgram}`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Unhandled Quote API Error:', error);

    return NextResponse.json(
      {
        error:
          'An unexpected server error occurred. Please try again.',
      },
      { status: 500 },
    );
  }
}