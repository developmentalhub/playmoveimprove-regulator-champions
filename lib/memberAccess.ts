export const MEMBER_ACCESS_COOKIE = 'member_access_token';

const SECRET_KEY = process.env.MEMBER_ACCESS_SECRET || 'playmoveimprove-secret-key-2026';

export interface MemberSession {
  code: string;
  role: 'educator' | 'manager';
  centreName: string;
  plan?: string;
}

function hexToBytes(hex: string): Uint8Array {
  const bytes = new Uint8Array(Math.ceil(hex.length / 2));
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function verifySignature(data: string, signature: string, secret: string): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      'raw',
      keyData as unknown as BufferSource,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sigBytes = hexToBytes(signature);
    const dataBytes = encoder.encode(data);

    return await crypto.subtle.verify(
      'HMAC',
      key,
      sigBytes as unknown as BufferSource,
      dataBytes as unknown as BufferSource
    );
  } catch (error) {
    return false;
  }
}

export async function getMemberSession(token: string | undefined | null): Promise<MemberSession | null> {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 2) {
      const parsed = JSON.parse(token);
      if (parsed && parsed.code) return parsed as MemberSession;
      return null;
    }

    const [payloadBase64, signature] = parts;
    const isValid = await verifySignature(payloadBase64, signature, SECRET_KEY);

    if (!isValid) return null;

    const jsonString = atob(payloadBase64);
    return JSON.parse(jsonString) as MemberSession;
  } catch (error) {
    return null;
  }
}