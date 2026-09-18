import {
  NextResponse,
} from 'next/server';

import {
  createRcServerClient,
  getRcAuthContextFromUser,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

export async function POST() {
  try {
    const supabase =
      await createRcServerClient();

    const {
      data: {
        user,
      },
      error: userError,
    } =
      await supabase.auth
        .getUser();

    if (
      userError ||
      !user
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Your login session could not be confirmed.',
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

    const context =
      await getRcAuthContextFromUser(
        user,
      );

    if (!context) {
      return NextResponse.json(
        {
          success: false,
          error:
            'This account does not currently have active Regulator Champions access.',
        },
        {
          status: 403,
          headers: {
            'Cache-Control':
              'no-store',
          },
        },
      );
    }

    await touchRcMemberLastSeen(
      context.member.id,
    );

    return NextResponse.json(
      {
        success: true,

        role:
          context.member.role,

        memberId:
          context.member.id,

        memberName:
          context.member
            .full_name,

        serviceId:
          context.service.id,

        serviceName:
          context.service
            .service_name,
      },
      {
        status: 200,
        headers: {
          'Cache-Control':
            'no-store',
        },
      },
    );
  } catch (error) {
    console.error(
      'Regulator Champions auth check failed:',
      error,
    );

    return NextResponse.json(
      {
        success: false,
        error:
          'Your account could not be checked. Please try again.',
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