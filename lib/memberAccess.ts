export const MEMBER_ACCESS_COOKIE = 'member_access_token';

export interface MemberSession {
  code: string;
  role: 'educator' | 'manager';
  centreName: string;
  plan?: string;
}

function getMemberAccessSecret(): string {
  const secret = process.env.MEMBER_ACCESS_SECRET;

  if (!secret) {
    throw new Error(
      'Missing MEMBER_ACCESS_SECRET environment variable.',
    );
  }

  return secret;
}

function hexToBytes(hex: string): Uint8Array {
  if (
    !hex ||
    hex.length % 2 !== 0 ||
    !/^[0-9a-fA-F]+$/.test(hex)
  ) {
    throw new Error('Invalid signature format.');
  }

  const bytes = new Uint8Array(hex.length / 2);

  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = parseInt(
      hex.slice(i * 2, i * 2 + 2),
      16,
    );
  }

  return bytes;
}

function base64ToString(value: string): string {
  if (typeof atob === 'function') {
    return atob(value);
  }

  return Buffer.from(
    value,
    'base64',
  ).toString('utf8');
}

async function verifySignature(
  data: string,
  signature: string,
  secret: string,
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();

    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(
        secret,
      ) as BufferSource,
      {
        name: 'HMAC',
        hash: 'SHA-256',
      },
      false,
      ['verify'],
    );

    const signatureBytes =
      hexToBytes(signature);

    const dataBytes =
      encoder.encode(data);

    return await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as BufferSource,
      dataBytes as BufferSource,
    );
  } catch (error) {
    console.error(
      'Member session signature verification failed:',
      error,
    );

    return false;
  }
}

function isValidMemberSession(
  value: unknown,
): value is MemberSession {
  if (
    !value ||
    typeof value !== 'object'
  ) {
    return false;
  }

  const session =
    value as Partial<MemberSession>;

  if (
    typeof session.code !== 'string' ||
    !session.code.trim()
  ) {
    return false;
  }

  if (
    session.role !== 'educator' &&
    session.role !== 'manager'
  ) {
    return false;
  }

  if (
    typeof session.centreName !== 'string' ||
    !session.centreName.trim()
  ) {
    return false;
  }

  if (
    session.plan !== undefined &&
    typeof session.plan !== 'string'
  ) {
    return false;
  }

  return true;
}

export async function getMemberSession(
  token: string | undefined | null,
): Promise<MemberSession | null> {
  if (!token) {
    return null;
  }

  try {
    const parts = token.split('.');

    if (parts.length !== 2) {
      return null;
    }

    const [
      payloadBase64,
      signature,
    ] = parts;

    if (
      !payloadBase64 ||
      !signature
    ) {
      return null;
    }

    const secret =
      getMemberAccessSecret();

    const isValidSignature =
      await verifySignature(
        payloadBase64,
        signature,
        secret,
      );

    if (!isValidSignature) {
      return null;
    }

    const jsonString =
      base64ToString(
        payloadBase64,
      );

    const parsed =
      JSON.parse(jsonString);

    if (
      !isValidMemberSession(
        parsed,
      )
    ) {
      return null;
    }

    return {
      code: parsed.code.trim(),
      role: parsed.role,
      centreName:
        parsed.centreName.trim(),
      plan:
        parsed.plan?.trim() ||
        undefined,
    };
  } catch (error) {
    console.error(
      'Member session could not be read:',
      error,
    );

    return null;
  }
}