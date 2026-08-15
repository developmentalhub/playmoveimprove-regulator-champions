import { timingSafeEqual } from 'node:crypto';

import { NextRequest, NextResponse } from 'next/server';

import {
  createMemberSessionToken,
  MEMBER_ACCESS_COOKIE,
  type MemberAccessPlan,
} from '@/lib/memberAccess';

type AccessRequestBody = {
  accessCode?: unknown;
};

const MAX_REQUEST_BYTES = 5_000;
const MAX_CODE_LENGTH = 100;

function cleanAccessCode(
  value: unknown,
): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value
    .trim()
    .toUpperCase()
    .slice(0, MAX_CODE_LENGTH);
}

function getCodes(
  environmentValue: string | undefined,
): string[] {
  return (
    environmentValue
      ?.split(',')
      .map((code) => cleanAccessCode(code))
      .filter(Boolean) ?? []
  );
}

function codesMatch(
  submittedCode: string,
  configuredCode: string,
): boolean {
  const submittedBuffer =
    Buffer.from(submittedCode);

  const configuredBuffer =
    Buffer.from(configuredCode);

  if (
    submittedBuffer.length !==
    configuredBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    submittedBuffer,
    configuredBuffer,
  );
}

function findAccessPlan(
  submittedCode: string,
): MemberAccessPlan | null {
  const previewCodes = getCodes(
    process.env.REGULATOR_PREVIEW_ACCESS_CODES,
  );

  const fullCodes = getCodes(
    process.env.REGULATOR_FULL_ACCESS_CODES,
  );

  const matchesFull =
    fullCodes.some((configuredCode) =>
      codesMatch(
        submittedCode,
        configuredCode,
      ),
    );

  if (matchesFull) {
    return 'full';
  }

  const matchesPreview =
    previewCodes.some((configuredCode) =>
      codesMatch(
        submittedCode,
        configuredCode,
      ),
    );

  if (matchesPreview) {
    return 'preview';
  }

  return null;
}

export async function POST(
  request: NextRequest,
) {
  try {
    const contentLength =
      request.headers.get(
        'content-length',
      );

    if (
      contentLength &&
      Number(contentLength) >
        MAX_REQUEST_BYTES
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
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
      (await request.json()) as AccessRequestBody;

    const submittedCode =
      cleanAccessCode(
        body.accessCode,
      );

    if (!submittedCode) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Enter your service access code.',
        },
        {
          status: 400,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const previewCodes = getCodes(
      process.env.REGULATOR_PREVIEW_ACCESS_CODES,
    );

    const fullCodes = getCodes(
      process.env.REGULATOR_FULL_ACCESS_CODES,
    );

    if (
      previewCodes.length === 0 &&
      fullCodes.length === 0
    ) {
      console.error(
        'Regulator Champions access codes have not been configured.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Member access is not configured yet. Please contact Robyn.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const accessPlan =
      findAccessPlan(
        submittedCode,
      );

    if (!accessPlan) {
      return NextResponse.json(
        {
          success: false,
          error:
            'That access code was not recognised. Check the code supplied to your service.',
        },
        {
          status: 401,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const {
      token,
      expiresAt,
    } = createMemberSessionToken(
      accessPlan,
    );

    const response =
      NextResponse.json(
        {
          success: true,
          plan: accessPlan,
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );

    response.cookies.set({
      name: MEMBER_ACCESS_COOKIE,
      value: token,

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        'production',

      sameSite: 'lax',

      path: '/',

      expires: expiresAt,
    });

    return response;
  } catch (error) {
    console.error(
      'Access-code validation failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'The access code could not be checked. Please try again.',
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