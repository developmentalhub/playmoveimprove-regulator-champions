'use server';

import { cookies } from 'next/headers';

// Add invoice access codes issued to paying centres here
const VALID_ACCESS_CODES: Record<string, { role: 'educator' | 'manager'; centreName: string }> = {
  'CHAMPIONS-2026': { role: 'manager', centreName: 'Demo Sunshine Early Learning' },
  'STAFF-ROOM-123': { role: 'educator', centreName: 'Demo Sunshine Early Learning' }
};

export async function verifyAccessCode(formData: FormData) {
  const codeInput = formData.get('accessCode')?.toString().trim().toUpperCase();

  if (!codeInput || !VALID_ACCESS_CODES[codeInput]) {
    return { success: false, error: 'Invalid access code. Please check your invoice receipt or contact support.' };
  }

  const match = VALID_ACCESS_CODES[codeInput];
  const cookieStore = await cookies();

  // Set secure cookie valid for 30 days
  cookieStore.set('regulator_session', JSON.stringify({
    code: codeInput,
    role: match.role,
    centreName: match.centreName
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 30,
    path: '/'
  });

  return { success: true, role: match.role };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('regulator_session');
}