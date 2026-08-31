import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
) {
  const response =
    NextResponse.redirect(
      new URL(
        '/admin/regulator-champions/login',
        request.url,
      ),
    );

  response.cookies.set(
    'regulator_admin_session',
    '',
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        'production',
      sameSite: 'strict',
      path: '/',
      expires: new Date(0),
    },
  );

  return response;
}