import { NextResponse } from 'next/server';

import {
  MEMBER_ACCESS_COOKIE,
  type MemberSession,
} from '@/lib/memberAccess';

type AccessCodeConfig = {
  role: 'educator' | 'manager';
  centreName: string;
  plan?: string;
};

const VALID_ACCESS_CODES: Record<
  string,
  AccessCodeConfig
> = {
  'CHAMPIONS-2026': {
    role: 'manager',
    centreName:
      'Demo Sunshine Early Learning',
  },

  'STAFF-ROOM-123': {
    role: 'educator',
    centreName:
      'Demo Sunshine Early Learning',
  },
};

function getMemberAccessSecret(): string {
  const secret =
    process.env.MEMBER_ACCESS_SECRET;

  if (!secret) {
    throw new Error(
      'Missing MEMBER_ACCESS_SECRET environment variable.',
    );
  }

  return secret;
}

function stringToBase64(
  value: string,
): string {
  return Buffer.from(
    value,
    'utf8',
  ).toString('base64');
}

function bytesToHex(
  bytes: ArrayBuffer,
): string {
  return Array.from(
    new Uint8Array(bytes),
  )
    .map((byte) =>
      byte
        .toString(16)
        .padStart(2, '0'),
    )
    .join('');
}

async function createSignature(
  data: string,
  secret: string,
): Promise<string> {
  const encoder =
    new TextEncoder();

  const key =
    await crypto.subtle.importKey(
      'raw',
      encoder.encode(
        secret,
      ) as BufferSource,
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['sign'],
    );

  const signature =
    await crypto.subtle.sign(
      'HMAC',
      key,
      encoder.encode(
        data,
      ) as BufferSource,
    );

  return bytesToHex(
    signature,
  );
}

async function createMemberToken(
  session: MemberSession,
): Promise<string> {
  const secret =
    getMemberAccessSecret();

  const payload =
    stringToBase64(
      JSON.stringify(
        session,
      ),
    );

  const signature =
    await createSignature(
      payload,
      secret,
    );

  return `${payload}.${signature}`;
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      await request.json();

    const cleanCode =
      typeof body.accessCode ===
      'string'
        ? body.accessCode
            .trim()
            .toUpperCase()
        : '';

    if (
      !cleanCode ||
      !VALID_ACCESS_CODES[
        cleanCode
      ]
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'That access code was not recognised. Please check the code supplied to your service.',
        },
        {
          status: 401,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    const match =
      VALID_ACCESS_CODES[
        cleanCode
      ];

    const memberSession: MemberSession =
      {
        code: cleanCode,
        role: match.role,
        centreName:
          match.centreName,
        plan: match.plan,
      };

    const token =
      await createMemberToken(
        memberSession,
      );

    const response =
      NextResponse.json(
        {
          success: true,
          role: match.role,
          centreName:
            match.centreName,
          plan:
            match.plan ?? null,
        },
        {
          status: 200,
          headers: {
            'Cache-Control':
              'no-store',
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
      maxAge:
        60 *
        60 *
        24 *
        30,
    });

    return response;
  } catch (error) {
    console.error(
      'Member access validation failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'We could not check your access code. Please try again.',
      },
      {
        status: 500,
        headers: {
          'Cache-Control':
            'no-store',
        },
      },
    );
  }
}