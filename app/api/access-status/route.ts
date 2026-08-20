import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('regulator_session');

    if (!sessionCookie || !sessionCookie.value) {
      return NextResponse.json({ success: true, hasAccess: false });
    }

    const sessionData = JSON.parse(sessionCookie.value);

    return NextResponse.json({
      success: true,
      hasAccess: true,
      role: sessionData.role,
      centreName: sessionData.centreName
    });
  } catch (error) {
    return NextResponse.json({ success: false, hasAccess: false }, { status: 500 });
  }
}