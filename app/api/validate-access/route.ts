import { NextRequest, NextResponse } from 'next/server';

type AccessRequestBody = {
  accessCode?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AccessRequestBody;
    const submittedCode = body.accessCode?.trim().toUpperCase();

    if (!submittedCode) {
      return NextResponse.json(
        {
          success: false,
          error: 'Enter your service access code.',
        },
        { status: 400 },
      );
    }

    const configuredCodes =
      process.env.REGULATOR_ACCESS_CODES?.split(',')
        .map((code) => code.trim().toUpperCase())
        .filter(Boolean) ?? [];

    if (configuredCodes.length === 0) {
      console.error(
        'REGULATOR_ACCESS_CODES has not been configured.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Member access is not configured yet. Please contact Robyn.',
        },
        { status: 500 },
      );
    }

    const isValid = configuredCodes.includes(submittedCode);

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          error:
            'That access code was not recognised. Check the code supplied to your service.',
        },
        { status: 401 },
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Access-code validation failed:', error);

    return NextResponse.json(
      {
        success: false,
        error:
          'The access code could not be checked. Please try again.',
      },
      { status: 500 },
    );
  }
}