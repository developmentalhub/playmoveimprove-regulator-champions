import {
  createHmac,
  timingSafeEqual,
} from 'node:crypto';

export const MEMBER_ACCESS_COOKIE =
  'regulator_member_session';

export const MEMBER_SESSION_DAYS = 30;

export type MemberAccessPlan =
  | 'preview'
  | 'full';

type MemberSessionPayload = {
  expiresAt: number;
  plan: MemberAccessPlan;
};

function getSessionSecret(): string {
  const secret =
    process.env.REGULATOR_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      'REGULATOR_SESSION_SECRET is not configured.',
    );
  }

  return secret;
}

function createSignature(
  encodedPayload: string,
): string {
  return createHmac(
    'sha256',
    getSessionSecret(),
  )
    .update(encodedPayload)
    .digest('base64url');
}

export function createMemberSessionToken(
  plan: MemberAccessPlan,
): {
  token: string;
  expiresAt: Date;
} {
  const expiresAt = new Date();

  expiresAt.setDate(
    expiresAt.getDate() +
      MEMBER_SESSION_DAYS,
  );

  const payload: MemberSessionPayload = {
    expiresAt: expiresAt.getTime(),
    plan,
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(payload),
    'utf8',
  ).toString('base64url');

  const signature =
    createSignature(encodedPayload);

  return {
    token: `${encodedPayload}.${signature}`,
    expiresAt,
  };
}

export function getMemberSession(
  token: string | undefined | null,
): MemberSessionPayload | null {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split('.');

    if (parts.length !== 2) {
      return null;
    }

    const [
      encodedPayload,
      suppliedSignature,
    ] = parts;

    if (
      !encodedPayload ||
      !suppliedSignature
    ) {
      return null;
    }

    const expectedSignature =
      createSignature(encodedPayload);

    const suppliedBuffer = Buffer.from(
      suppliedSignature,
      'utf8',
    );

    const expectedBuffer = Buffer.from(
      expectedSignature,
      'utf8',
    );

    if (
      suppliedBuffer.length !==
      expectedBuffer.length
    ) {
      return null;
    }

    const signatureMatches =
      timingSafeEqual(
        suppliedBuffer,
        expectedBuffer,
      );

    if (!signatureMatches) {
      return null;
    }

    const decodedPayload = Buffer.from(
      encodedPayload,
      'base64url',
    ).toString('utf8');

    const payload = JSON.parse(
      decodedPayload,
    ) as MemberSessionPayload;

    if (
      typeof payload.expiresAt !==
      'number'
    ) {
      return null;
    }

    if (
      payload.plan !== 'preview' &&
      payload.plan !== 'full'
    ) {
      return null;
    }

    if (
      payload.expiresAt <= Date.now()
    ) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export function verifyMemberSessionToken(
  token: string | undefined | null,
): boolean {
  return getMemberSession(token) !== null;
}