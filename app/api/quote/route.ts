import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const EARLY_BIRD_PRICE = 4790;
const PREMIUM_PRICE = 5990;

type ProgramOption = 'early-bird' | 'premium';

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(SB_URL, SB_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cleanString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: NextRequest) {
  try {
    if (!SB_URL || !SB_KEY) {
      console.error('Supabase server environment variables are missing.');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 },
      );
    }

    const body = await req.json();

    const serviceName = cleanString(body.serviceName);
    const managerName = cleanString(body.managerName);
    const managerEmail = cleanString(body.managerEmail).toLowerCase();
    const phone = cleanString(body.phone);
    const fundingSource = cleanString(body.fundingSource);
    const notes = cleanString(body.notes);
    const educatorCount = Number(body.educatorCount);

    const programOption: ProgramOption =
      body.programOption === 'premium' ? 'premium' : 'early-bird';

    if (!serviceName) {
      return NextResponse.json({ error: 'Service name is required.' }, { status: 400 });
    }

    if (!managerName) {
      return NextResponse.json({ error: 'Contact name is required.' }, { status: 400 });
    }

    if (!managerEmail || !managerEmail.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email is required.' },
        { status: 400 },
      );
    }

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    if (!Number.isInteger(educatorCount) || educatorCount < 1 || educatorCount > 15) {
      return NextResponse.json(
        { error: 'Number of educators must be between 1 and 15.' },
        { status: 400 },
      );
    }

    const selectedPrice =
      programOption === 'premium' ? PREMIUM_PRICE : EARLY_BIRD_PRICE;

    const programLabel =
      programOption === 'premium'
        ? '2027 Premium Regulator Champions'
        : '2027 Early Bird Digital Regulator Champions';

    const now = new Date().toISOString();

    const { error: databaseError } = await supabase
      .from('regulator_leads')
      .insert({
        name: managerName,
        email: managerEmail,
        organisation_name: serviceName,
        role: 'Manager / service contact',
        guide: 'regulator-champions-2027',
        consent_to_contact: true,
        source: '2027-homepage-invoice-request',
        status: 'invoice-requested',
        phone,
        postal_address: null,
        service_type: null,
        educator_count: educatorCount,
        funding_source: fundingSource || null,
        funding_other: null,
        billing_name: managerName,
        billing_email: managerEmail,
        notes: notes || null,
        program_option: programOption,
        amount: selectedPrice,
        created_at: now,
        updated_at: now,
      });

    if (databaseError) {
      console.error('Supabase lead insert failed:', databaseError);
      return NextResponse.json(
        { error: 'We could not save your invoice request.' },
        { status: 500 },
      );
    }

    if (process.env.RESEND_API_KEY) {
      const safe = {
        serviceName: escapeHtml(serviceName),
        managerName: escapeHtml(managerName),
        managerEmail: escapeHtml(managerEmail),
        phone: escapeHtml(phone),
        fundingSource: escapeHtml(fundingSource || 'Not provided'),
        notes: escapeHtml(notes || 'None provided'),
        programLabel: escapeHtml(programLabel),
      };

      const emailHtml = `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:24px;background:#f7f3ed;color:#232150;font-family:Arial,sans-serif;">
            <div style="max-width:680px;margin:0 auto;background:white;border-radius:20px;padding:32px;border:1px solid #e5ded4;">
              <p style="margin:0;font-size:13px;font-weight:bold;color:#87317e;text-transform:uppercase;letter-spacing:1px;">
                Play Move Improve
              </p>
              <h1 style="margin:8px 0 0;font-size:26px;color:#232150;">
                New 2027 Regulator Champions invoice request
              </h1>

              <div style="margin:24px 0;padding:20px;background:#f7f6fa;border:1px solid #dccda8;border-radius:16px;">
                <strong>${safe.programLabel}</strong>
                <div style="margin-top:6px;font-size:28px;font-weight:bold;">
                  $${selectedPrice.toLocaleString('en-AU')} AUD incl. GST
                </div>
                <div style="margin-top:5px;color:#5d5a72;">
                  ${educatorCount} educator${educatorCount === 1 ? '' : 's'}
                </div>
              </div>

              ${emailField('Service', safe.serviceName)}
              ${emailField('Contact', safe.managerName)}
              ${emailField('Email', safe.managerEmail)}
              ${emailField('Phone', safe.phone)}
              ${emailField('Funding / budget', safe.fundingSource)}
              ${emailField('Notes', safe.notes)}

              <div style="margin-top:28px;padding-top:18px;border-top:1px solid #e5ded4;color:#6b7772;font-size:12px;">
                Regulator Champions 2027 · Play Move Improve
              </div>
            </div>
          </body>
        </html>
      `;

      const { error: emailError } = await resend.emails.send({
        from: 'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',
        to: ['robyn@playmoveimprove.com.au'],
        replyTo: managerEmail,
        subject: `2027 invoice request — ${serviceName} — $${selectedPrice.toLocaleString('en-AU')}`,
        html: emailHtml,
      });

      if (emailError) {
        console.error('Resend notification failed:', emailError);
      }
    } else {
      console.warn('RESEND_API_KEY is not configured.');
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your invoice request has been received.',
        programOption,
        programLabel,
        price: selectedPrice,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Unhandled invoice request error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 },
    );
  }
}

function emailField(label: string, value: string) {
  return `
    <div style="margin-bottom:18px;">
      <div style="margin-bottom:4px;font-size:11px;color:#87317e;font-weight:bold;text-transform:uppercase;letter-spacing:0.7px;">
        ${label}
      </div>
      <div style="font-size:15px;line-height:1.6;color:#232150;white-space:pre-wrap;">
        ${value}
      </div>
    </div>
  `;
}
