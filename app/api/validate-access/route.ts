import { NextResponse } from 'next/server';

const VALID_ACCESS_CODES: Record<string, { role: 'educator' | 'manager'; centreName: string }> = {
  'CHAMPIONS-2026': { role: 'manager', centreName: 'Demo Sunshine Early Learning' },
  'STAFF-ROOM-123': { role: 'educator', centreName: 'Demo Sunshine Early Learning' }
};

export async function POST(request: Request) {
  try {
    const { accessCode } = await request.json();
    const cleanCode = typeof accessCode === 'string' ? accessCode.trim().toUpperCase() : '';

    if (!cleanCode || !VALID_ACCESS_CODES[cleanCode]) {
      return NextResponse.json(
        { success: false, error: 'That access code was not recognised. Please check the code supplied on your service invoice.' },
        { status: 401 }
      );
    }

    const match = VALID_ACCESS_CODES[cleanCode];
    const sessionData = JSON.stringify({
      code: cleanCode,
      role: match.role,
      centreName: match.centreName
    });

    const response = NextResponse.json({ success: true, role: match.role });

    response.cookies.set('regulator_session', sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 Days
      path: '/'
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'We could not check your access code. Please try again.' },
      { status: 500 }
    );
  }
}