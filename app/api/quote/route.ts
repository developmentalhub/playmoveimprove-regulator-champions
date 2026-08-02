import { NextRequest, NextResponse } from 'next/server';

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
    } = body;

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json(
        { error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!serviceName || typeof serviceName !== 'string' || !serviceName.trim()) {
      return NextResponse.json(
        { error: 'Centre or Service name is required.' },
        { status: 400 }
      );
    }

    // Clean and sanitize input data
    const cleanData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? String(phone).trim() : 'N/A',
      serviceName: serviceName.trim(),
      providerLegalName: providerLegalName ? String(providerLegalName).trim() : 'N/A',
      fundingSource: fundingSource ? String(fundingSource).trim() : 'N/A',
      message: message ? String(message).trim() : 'None provided',
      submittedAt: new Date().toISOString(),
    };

    console.log('--- NEW CENTRE QUOTE REQUEST RECEIVED ---', cleanData);

    // Send styled HTML email notification via Resend API if API Key exists
    if (process.env.RESEND_API_KEY) {
      try {
        const emailHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #ffffff; padding: 30px; border-radius: 16px; border: 1px solid #e2e8f0; }
                .header { border-bottom: 2px solid #0f766e; padding-bottom: 15px; margin-bottom: 20px; }
                .title { font-size: 20px; color: #0f766e; font-weight: bold; margin: 0; }
                .field { margin-bottom: 12px; }
                .label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: bold; display: block; }
                .value { font-size: 14px; color: #0f172a; font-weight: 600; margin-top: 2px; }
                .footer { margin-top: 25px; padding-top: 15px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1 class="title">New $4,790 Centre Proposal Request</h1>
                </div>
                
                <div class="field">
                  <span class="label">Director / Contact Name</span>
                  <div class="value">${cleanData.fullName}</div>
                </div>

                <div class="field">
                  <span class="label">Email Address</span>
                  <div class="value"><a href="mailto:${cleanData.email}">${cleanData.email}</a></div>
                </div>

                <div class="field">
                  <span class="label">Phone Number</span>
                  <div class="value">${cleanData.phone}</div>
                </div>

                <div class="field">
                  <span class="label">Centre / Service Name</span>
                  <div class="value">${cleanData.serviceName}</div>
                </div>

                <div class="field">
                  <span class="label">Approved Provider / Legal Entity</span>
                  <div class="value">${cleanData.providerLegalName}</div>
                </div>

                <div class="field">
                  <span class="label">Funding Pathway</span>
                  <div class="value">${cleanData.fundingSource}</div>
                </div>

                <div class="field">
                  <span class="label">Additional Notes</span>
                  <div class="value">${cleanData.message}</div>
                </div>

                <div class="footer">
                  Regulator Champions Proposal Engine • Play Move Improve
                </div>
              </div>
            </body>
          </html>
        `;

        const resendResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Regulator Champions Quotes <quotes@playmoveimprove.com.au>',
            to: ['robyn@playmoveimprove.com.au'],
            reply_to: cleanData.email,
            subject: `Quote Request: ${cleanData.serviceName} ($4,790 Site Licence)`,
            html: emailHtml,
          }),
        });

        if (!resendResponse.ok) {
          const errorText = await resendResponse.text();
          console.error('Resend API returned error:', errorText);
        }
      } catch (emailError) {
        console.error('Failed to dispatch notification email:', emailError);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Your quote request has been processed successfully.',
        redirectUrl: '/proposal',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unhandled Quote API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}