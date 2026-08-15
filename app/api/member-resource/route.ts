import { NextRequest, NextResponse } from 'next/server';

import {
  getMemberSession,
  MEMBER_ACCESS_COOKIE,
} from '@/lib/memberAccess';

type ResourceRequest = {
  file?: unknown;
};

const BUCKET = 'regulator-member-resources';

const ALLOWED_FILES = new Set([
  'Calm-Posters.pdf',
  'Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
  'Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
]);

function cleanFileName(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().slice(0, 200);
}

function encodeStoragePath(value: string): string {
  return value
    .split('/')
    .map((part) => encodeURIComponent(part))
    .join('/');
}

export async function POST(
  request: NextRequest,
) {
  try {
    const token =
      request.cookies.get(
        MEMBER_ACCESS_COOKIE,
      )?.value;

    const session =
      getMemberSession(token);

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your member session has expired. Please enter your service access code again.',
        },
        {
          status: 401,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const body =
      (await request.json()) as ResourceRequest;

    const file =
      cleanFileName(body.file);

    if (
      !file ||
      !ALLOWED_FILES.has(file)
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'That member resource is not available.',
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
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (
      !supabaseUrl ||
      !serviceRoleKey
    ) {
      console.error(
        'Supabase server environment variables are missing.',
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'Member resource access is not configured.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const encodedBucket =
      encodeURIComponent(BUCKET);

    const encodedFile =
      encodeStoragePath(file);

    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/sign/${encodedBucket}/${encodedFile}`,
      {
        method: 'POST',

        headers: {
          apikey: serviceRoleKey,

          Authorization:
            `Bearer ${serviceRoleKey}`,

          'Content-Type':
            'application/json',
        },

        body: JSON.stringify({
          expiresIn: 900,
        }),

        cache: 'no-store',
      },
    );

    if (!response.ok) {
      const errorText =
        await response.text();

      console.error(
        'Member resource signed URL failed:',
        errorText,
      );

      return NextResponse.json(
        {
          success: false,
          error:
            'The member resource could not be opened. Please try again.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const result =
      (await response.json()) as {
        signedURL?: string;
        signedUrl?: string;
      };

    const signedPath =
      result.signedURL ??
      result.signedUrl ??
      '';

    if (!signedPath) {
      return NextResponse.json(
        {
          success: false,
          error:
            'The member resource link could not be created.',
        },
        {
          status: 500,
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    }

    const signedUrl =
      signedPath.startsWith('http')
        ? signedPath
        : `${supabaseUrl}/storage/v1${signedPath}`;

    return NextResponse.json(
      {
        success: true,
        url: signedUrl,
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
      'Member resource route failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'The member resource could not be opened. Please try again.',
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