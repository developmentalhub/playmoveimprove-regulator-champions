import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'A valid work email address is required.' },
        { status: 400 }
      );
    }

    // Database or email marketing integration goes here (e.g. ActiveCampaign, ConvertKit, Mailchimp, Supabase)
    console.log(`[LEAD CAPTURE] Safe Touch Guide Lead: ${email}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Lead captured successfully.',
        downloadUrl: '/pdf/Safe-Touch-Early-Childhood-Guide.pdf',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[LEAD CAPTURE ERROR]', error);
    return NextResponse.json(
      { error: 'An unexpected server error occurred. Please try again.' },
      { status: 500 }
    );
  }
}