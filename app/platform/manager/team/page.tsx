import Link from 'next/link';

import {
  redirect,
} from 'next/navigation';

import {
  revalidatePath,
} from 'next/cache';

import {
  Resend,
} from 'resend';

import MemberSignOutButton from '@/components/MemberSignOutButton';

import InviteEducatorForm from '@/components/admin/InviteEducatorForm';

import RemoveEducatorButton from '@/components/admin/RemoveEducatorButton';

import ManagerPendingInviteCard from '@/components/rc/ManagerPendingInviteCard';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

type InviteActionState = {
  success?: boolean;
  message?: string;
};

type Member = {
  id: string;
  full_name: string | null;
  email: string;
  role:
    | 'manager'
    | 'educator';
  status: string;
  joined_at: string | null;
  removed_at: string | null;
  last_seen_at: string | null;
};

type Invite = {
  id: string;
  educator_name: string | null;
  educator_email: string | null;
  invite_token: string;
  status: string;
  created_at: string;
  joined_at: string | null;
};

function getSiteUrl() {
  return (
    process.env
      .NEXT_PUBLIC_SITE_URL ||
    process.env
      .NEXT_PUBLIC_APP_URL ||
    'https://playmoveimprove-regulator-champions.vercel.app'
  ).replace(
    /\/$/,
    '',
  );
}

function formatDate(
  value: string | null,
) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone:
        'Australia/Melbourne',
    },
  ).format(
    new Date(value),
  );
}

function getActivityLabel(
  value: string | null,
) {
  if (!value) {
    return 'Never logged in';
  }

  const lastSeen =
    new Date(value);

  const now =
    new Date();

  const diffDays =
    (
      now.getTime() -
      lastSeen.getTime()
    ) /
    (
      1000 *
      60 *
      60 *
      24
    );

  if (
    diffDays > 30
  ) {
    return 'Inactive for 30 days';
  }

  return 'Active within 30 days';
}

function invitationEmail({
  educatorName,
  serviceName,
  inviteUrl,
}: {
  educatorName: string;
  serviceName: string;
  inviteUrl: string;
}) {
  const greeting =
    educatorName
      ? `Hi ${educatorName},`
      : 'Hi there,';

  return `
    <!DOCTYPE html>
    <html>
      <body
        style="
          margin:0;
          padding:24px;
          background:#f7f3ed;
          font-family:Arial,sans-serif;
          color:#1c3b34;
        "
      >
        <div
          style="
            max-width:620px;
            margin:0 auto;
            background:#ffffff;
            border:1px solid #e5ded4;
            border-radius:20px;
            padding:32px;
          "
        >
          <p
            style="
              margin:0;
              color:#9a793d;
              font-size:12px;
              font-weight:bold;
              text-transform:uppercase;
              letter-spacing:1px;
            "
          >
            Play Move Improve
          </p>

          <h1
            style="
              margin:8px 0 0;
              color:#1c3b34;
              font-size:27px;
            "
          >
            You’re invited to Regulator Champions
          </h1>

          <p
            style="
              margin-top:24px;
              font-size:16px;
              line-height:1.7;
            "
          >
            ${greeting}
          </p>

          <p
            style="
              font-size:16px;
              line-height:1.7;
            "
          >
            ${serviceName} has invited
            you to join the Play Move
            Improve Regulator Champions
            Program.
          </p>

          <p
            style="
              font-size:16px;
              line-height:1.7;
            "
          >
            Your individual account
            will keep your learning,
            reflections, CPD hours and
            certificates together.
          </p>

          <div
            style="
              margin:28px 0;
            "
          >
            <a
              href="${inviteUrl}"
              style="
                display:inline-block;
                padding:14px 22px;
                background:#1c3b34;
                color:#ffffff;
                text-decoration:none;
                border-radius:12px;
                font-weight:bold;
              "
            >
              Join Regulator Champions
            </a>
          </div>

          <p
            style="
              font-size:14px;
              line-height:1.6;
              color:#657b6c;
            "
          >
            You can return to the same
            invitation link if you need
            to finish setting up your
            account later.
          </p>

          <div
            style="
              margin-top:28px;
              padding-top:18px;
              border-top:1px solid #e5ded4;
              font-size:13px;
              color:#657b6c;
            "
          >
            Robyn Papworth<br />
            Play Move Improve
          </div>
        </div>
      </body>
    </html>
  `;
}

async function sendInviteEmail({
  educatorEmail,
  educatorName,
  serviceName,
  inviteUrl,
}: {
  educatorEmail: string;
  educatorName: string;
  serviceName: string;
  inviteUrl: string;
}) {
  if (
    !process.env
      .RESEND_API_KEY
  ) {
    console.warn(
      'RESEND_API_KEY is not configured.',
    );

    return false;
  }

  const resend =
    new Resend(
      process.env
        .RESEND_API_KEY,
    );

  const {
    error,
  } =
    await resend.emails
      .send({
        from:
          'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',

        to: [
          educatorEmail,
        ],

        replyTo:
          'robyn@playmoveimprove.com.au',

        subject:
          `${serviceName} has invited you to Regulator Champions`,

        html:
          invitationEmail({
            educatorName,
            serviceName,
            inviteUrl,
          }),
      });

  if (error) {
    console.error(
      'Regulator Champions invitation email failed:',
      error,
    );

    return false;
  }

  return true;
}

async function inviteEducator(
  previousState:
    InviteActionState,
  formData: FormData,
): Promise<InviteActionState> {
  'use server';

  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    return {
      success: false,
      message:
        'Please log in again.',
    };
  }

  if (
    auth.member.role !==
    'manager'
  ) {
    return {
      success: false,
      message:
        'Manager access is required.',
    };
  }

  const serviceId =
    String(
      formData.get(
        'serviceId',
      ) || '',
    ).trim();

  const educatorName =
    String(
      formData.get(
        'educatorName',
      ) || '',
    ).trim();

  const educatorEmail =
    String(
      formData.get(
        'educatorEmail',
      ) || '',
    )
      .trim()
      .toLowerCase();

  if (
    serviceId !==
    auth.service.id
  ) {
    return {
      success: false,
      message:
        'This service could not be confirmed.',
    };
  }

  if (
    !educatorEmail ||
    !educatorEmail.includes(
      '@',
    )
  ) {
    return {
      success: false,
      message:
        'Please enter a valid educator email.',
    };
  }

  const supabase =
    createRcAdminClient();

  const {
    count:
      educatorCount,
    error:
      countError,
  } = await supabase
    .from(
      'rc_team_members',
    )
    .select(
      'id',
      {
        count: 'exact',
        head: true,
      },
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'role',
      'educator',
    )
    .eq(
      'status',
      'active',
    );

  if (countError) {
    console.error(
      'Could not check educator seat count:',
      countError,
    );

    return {
      success: false,
      message:
        'The available seats could not be checked.',
    };
  }

  if (
    (
      educatorCount ??
      0
    ) >=
    auth.service.seat_limit
  ) {
    return {
      success: false,
      message:
        `All ${auth.service.seat_limit} educator seats are currently in use.`,
    };
  }

  const {
    data:
      activeMember,
  } = await supabase
    .from(
      'rc_team_members',
    )
    .select(
      'id',
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'role',
      'educator',
    )
    .eq(
      'status',
      'active',
    )
    .ilike(
      'email',
      educatorEmail,
    )
    .maybeSingle();

  if (activeMember) {
    return {
      success: false,
      message:
        'This educator is already an active member of your team.',
    };
  }

  const {
    data:
      existingInvite,
  } = await supabase
    .from(
      'rc_team_invites',
    )
    .select(
      `
        id,
        invite_token
      `,
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'status',
      'pending',
    )
    .ilike(
      'educator_email',
      educatorEmail,
    )
    .maybeSingle();

  let inviteToken =
    existingInvite
      ?.invite_token ??
    null;

  if (
    !existingInvite
  ) {
    const {
      data:
        createdInvite,
      error:
        createError,
    } = await supabase
      .from(
        'rc_team_invites',
      )
      .insert({
        service_id:
          auth.service.id,

        educator_name:
          educatorName ||
          null,

        educator_email:
          educatorEmail,

        status:
          'pending',
      })
      .select(
        `
          id,
          invite_token
        `,
      )
      .single();

    if (
      createError ||
      !createdInvite
    ) {
      console.error(
        'Could not create educator invitation:',
        createError,
      );

      return {
        success: false,
        message:
          'The invitation could not be created.',
      };
    }

    inviteToken =
      createdInvite
        .invite_token;
  }

  if (!inviteToken) {
    return {
      success: false,
      message:
        'The invitation link could not be created.',
    };
  }

  const inviteUrl =
    `${getSiteUrl()}/join/${inviteToken}`;

  const emailSent =
    await sendInviteEmail({
      educatorEmail,
      educatorName,
      serviceName:
        auth.service
          .service_name,
      inviteUrl,
    });

  revalidatePath(
    '/platform/manager/team',
  );

  if (!emailSent) {
    return {
      success: false,
      message:
        'The invitation was created, but the email could not be sent. You can copy the invitation link from the pending invitations section.',
    };
  }

  return {
    success: true,
    message:
      existingInvite
        ? 'The existing invitation has been emailed again.'
        : 'Invitation sent successfully.',
  };
}

async function resendInvite(
  formData: FormData,
) {
  'use server';

  const auth =
    await getCurrentRcAuthContext();

  if (
    !auth ||
    auth.member.role !==
      'manager'
  ) {
    redirect(
      '/member-access',
    );
  }

  const inviteId =
    String(
      formData.get(
        'inviteId',
      ) || '',
    ).trim();

  const supabase =
    createRcAdminClient();

  const {
    data: invite,
    error,
  } = await supabase
    .from(
      'rc_team_invites',
    )
    .select(
      `
        id,
        educator_name,
        educator_email,
        invite_token,
        status
      `,
    )
    .eq(
      'id',
      inviteId,
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'status',
      'pending',
    )
    .maybeSingle();

  if (
    error ||
    !invite ||
    !invite.educator_email
  ) {
    console.error(
      'Could not load pending invite:',
      error,
    );

    return;
  }

  await sendInviteEmail({
    educatorEmail:
      invite.educator_email,

    educatorName:
      invite.educator_name ||
      '',

    serviceName:
      auth.service
        .service_name,

    inviteUrl:
      `${getSiteUrl()}/join/${invite.invite_token}`,
  });

  revalidatePath(
    '/platform/manager/team',
  );
}

async function cancelInvite(
  formData: FormData,
) {
  'use server';

  const auth =
    await getCurrentRcAuthContext();

  if (
    !auth ||
    auth.member.role !==
      'manager'
  ) {
    redirect(
      '/member-access',
    );
  }

  const inviteId =
    String(
      formData.get(
        'inviteId',
      ) || '',
    ).trim();

  if (!inviteId) {
    return;
  }

  const supabase =
    createRcAdminClient();

  const {
    error,
  } = await supabase
    .from(
      'rc_team_invites',
    )
    .update({
      status:
        'cancelled',
    })
    .eq(
      'id',
      inviteId,
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'status',
      'pending',
    );

  if (error) {
    console.error(
      'Could not cancel invitation:',
      error,
    );
  }

  revalidatePath(
    '/platform/manager/team',
  );
}

async function editInviteEmail(
  formData: FormData,
) {
  'use server';

  const auth =
    await getCurrentRcAuthContext();

  if (
    !auth ||
    auth.member.role !==
      'manager'
  ) {
    redirect(
      '/member-access',
    );
  }

  const inviteId =
    String(
      formData.get(
        'inviteId',
      ) || '',
    ).trim();

  const educatorEmail =
    String(
      formData.get(
        'educatorEmail',
      ) || '',
    )
      .trim()
      .toLowerCase();

  if (
    !inviteId ||
    !educatorEmail ||
    !educatorEmail.includes(
      '@',
    )
  ) {
    return;
  }

  const supabase =
    createRcAdminClient();

  const {
    error,
  } = await supabase
    .from(
      'rc_team_invites',
    )
    .update({
      educator_email:
        educatorEmail,
    })
    .eq(
      'id',
      inviteId,
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'status',
      'pending',
    );

  if (error) {
    console.error(
      'Could not update pending invitation email:',
      error,
    );
  }

  revalidatePath(
    '/platform/manager/team',
  );
}

async function removeEducator(
  formData: FormData,
) {
  'use server';

  const auth =
    await getCurrentRcAuthContext();

  if (
    !auth ||
    auth.member.role !==
      'manager'
  ) {
    redirect(
      '/member-access',
    );
  }

  const memberId =
    String(
      formData.get(
        'memberId',
      ) || '',
    ).trim();

  if (!memberId) {
    return;
  }

  const supabase =
    createRcAdminClient();

  const now =
    new Date().toISOString();

  const {
    data: educator,
    error:
      educatorError,
  } = await supabase
    .from(
      'rc_team_members',
    )
    .select(
      `
        id,
        full_name,
        email
      `,
    )
    .eq(
      'id',
      memberId,
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'role',
      'educator',
    )
    .eq(
      'status',
      'active',
    )
    .maybeSingle();

  if (
    educatorError ||
    !educator
  ) {
    console.error(
      'Could not load educator for removal:',
      educatorError,
    );

    return;
  }

  const {
    data:
      completedTopics,
  } = await supabase
    .from(
      'rc_topic_progress',
    )
    .select(
      `
        topic_id,
        completed_at
      `,
    )
    .eq(
      'member_id',
      memberId,
    )
    .not(
      'completed_at',
      'is',
      null,
    );

  const {
    data:
      certificates,
  } = await supabase
    .from(
      'rc_certificates',
    )
    .select(
      `
        id,
        topic_title,
        cpd_hours
      `,
    )
    .eq(
      'member_id',
      memberId,
    );

  const {
    error:
      removeError,
  } = await supabase
    .from(
      'rc_team_members',
    )
    .update({
      status:
        'removed',

      removed_at:
        now,
    })
    .eq(
      'id',
      memberId,
    )
    .eq(
      'service_id',
      auth.service.id,
    )
    .eq(
      'role',
      'educator',
    );

  if (removeError) {
    console.error(
      'Could not remove educator:',
      removeError,
    );

    return;
  }

  if (
    process.env
      .RESEND_API_KEY
  ) {
    const resend =
      new Resend(
        process.env
          .RESEND_API_KEY,
      );

    const completedCount =
      completedTopics
        ?.length ??
      0;

    const certificateCount =
      certificates
        ?.length ??
      0;

    const cpdHours =
      (
        certificates ??
        []
      ).reduce(
        (
          total,
          certificate,
        ) =>
          total +
          Number(
            certificate
              .cpd_hours ??
              0,
          ),
        0,
      );

    const name =
      educator.full_name ||
      educator.email;

    const {
      error:
        emailError,
    } =
      await resend.emails
        .send({
          from:
            'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',

          to: [
            auth.member.email,
          ],

          replyTo:
            'robyn@playmoveimprove.com.au',

          subject:
            `Regulator Champions record summary – ${name}`,

          html: `
            <p>Hi ${auth.member.full_name || 'there'},</p>

            <p>
              ${name} has been removed from
              the active Regulator Champions
              team for ${auth.service.service_name}.
            </p>

            <p>
              Their previous learning record
              remains stored against their
              account.
            </p>

            <ul>
              <li>
                Completed topics:
                ${completedCount}
              </li>

              <li>
                Certificates:
                ${certificateCount}
              </li>

              <li>
                Recorded CPD hours:
                ${cpdHours}
              </li>
            </ul>

            <p>
              Their educator seat is now
              available for another team member.
            </p>

            <p>
              Robyn<br />
              Play Move Improve
            </p>
          `,
        });

    if (emailError) {
      console.error(
        'Could not send educator removal summary:',
        emailError,
      );
    }
  }

  revalidatePath(
    '/platform/manager/team',
  );

  revalidatePath(
    '/platform/manager/dashboard',
  );
}

export default async function ManagerTeamPage() {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access?returnTo=/platform/manager/team',
    );
  }

  if (
    auth.member.role !==
    'manager'
  ) {
    redirect(
      '/platform/educator/dashboard',
    );
  }

  await touchRcMemberLastSeen(
    auth.member.id,
  );

  const supabase =
    createRcAdminClient();

  const [
    membersResponse,
    invitesResponse,
  ] = await Promise.all([
    supabase
      .from(
        'rc_team_members',
      )
      .select(
        `
          id,
          full_name,
          email,
          role,
          status,
          joined_at,
          removed_at,
          last_seen_at
        `,
      )
      .eq(
        'service_id',
        auth.service.id,
      )
      .order(
        'joined_at',
        {
          ascending: true,
        },
      ),

    supabase
      .from(
        'rc_team_invites',
      )
      .select(
        `
          id,
          educator_name,
          educator_email,
          invite_token,
          status,
          created_at,
          joined_at
        `,
      )
      .eq(
        'service_id',
        auth.service.id,
      )
      .order(
        'created_at',
        {
          ascending: false,
        },
      ),
  ]);

  if (
    membersResponse.error
  ) {
    console.error(
      'Could not load service team:',
      membersResponse.error,
    );
  }

  if (
    invitesResponse.error
  ) {
    console.error(
      'Could not load team invitations:',
      invitesResponse.error,
    );
  }

  const members =
    (
      membersResponse.data ??
      []
    ) as Member[];

  const invites =
    (
      invitesResponse.data ??
      []
    ) as Invite[];

  const activeEducators =
    members.filter(
      (member) =>
        member.role ===
          'educator' &&
        member.status ===
          'active',
    );

  const pendingInvites =
    invites.filter(
      (invite) =>
        invite.status ===
        'pending',
    );

  const removedEducators =
    members.filter(
      (member) =>
        member.role ===
          'educator' &&
        member.status ===
          'removed',
    );

  const seatsUsed =
    activeEducators.length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <header className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Play Move Improve
            </p>

            <p className="mt-1 font-bold">
              Regulator Champions
            </p>
          </div>

          <MemberSignOutButton />
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-6 sm:py-10">
        <section>
          <Link
            href="/platform/manager/dashboard"
            className="text-sm font-extrabold text-[#8A6F3E]"
          >
            ← Back to dashboard
          </Link>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            {
              auth.service
                .service_name
            }
          </p>

          <div className="mt-2 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold sm:text-5xl">
                Team & Invitations
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#657B6C]">
                Invite educators, keep
                track of your available
                seats and manage who has
                access to your Regulator
                Champions service.
              </p>
            </div>

            <div className="rounded-3xl bg-[#1C3B34] px-6 py-4 text-white">
              <p className="text-3xl font-black">
                {seatsUsed} of{' '}
                {
                  auth.service
                    .seat_limit
                }
              </p>

              <p className="text-xs text-[#C9D8D2]">
                educator seats used ·{' '}
                {
                  pendingInvites.length
                }{' '}
                pending
              </p>
            </div>
          </div>
        </section>

        <InviteEducatorForm
          serviceId={
            auth.service.id
          }
          seatsUsed={
            seatsUsed
          }
          seatLimit={
            auth.service
              .seat_limit
          }
          action={
            inviteEducator
          }
        />

        {/* ACTIVE TEAM */}
        <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
            Current educators
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Active team
          </h2>

          <div className="mt-6 overflow-hidden rounded-3xl border border-[#E6E2DC]">
            {activeEducators.length ===
            0 ? (
              <div className="p-6 text-sm text-[#657B6C]">
                No educators have joined
                your service yet.
              </div>
            ) : (
              <div className="divide-y divide-[#E6E2DC]">
                {activeEducators.map(
                  (educator) => (
                    <article
                      key={
                        educator.id
                      }
                      className="grid gap-5 p-5 lg:grid-cols-[1.3fr_1.2fr_1fr_auto] lg:items-center"
                    >
                      <div>
                        <p className="font-bold">
                          {educator.full_name ||
                            'Name not added'}
                        </p>

                        <p className="mt-1 text-xs text-[#9A793D]">
                          Educator
                        </p>
                      </div>

                      <p className="wrap-break-word text-sm text-[#657B6C]">
                        {
                          educator.email
                        }
                      </p>

                      <div>
                        <p className="text-sm font-semibold">
                          {getActivityLabel(
                            educator.last_seen_at,
                          )}
                        </p>

                        <p className="mt-1 text-xs text-[#657B6C]">
                          Joined{' '}
                          {formatDate(
                            educator.joined_at,
                          )}
                        </p>
                      </div>

                      <RemoveEducatorButton
                        memberId={
                          educator.id
                        }
                        serviceId={
                          auth.service.id
                        }
                        educatorName={
                          educator.full_name ||
                          educator.email
                        }
                        action={
                          removeEducator
                        }
                      />
                    </article>
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* PENDING */}
        <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
            Invitations
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Pending invitations
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-[#657B6C]">
            A pending invitation does
            not use an educator seat.
            The seat is counted when
            the educator activates
            their account.
          </p>

          <div className="mt-6">
            {pendingInvites.length ===
            0 ? (
              <div className="rounded-2xl bg-[#FAF8F5] p-5 text-sm text-[#657B6C]">
                No invitations are
                currently waiting.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingInvites.map(
                  (invite) => (
                    <ManagerPendingInviteCard
                      key={
                        invite.id
                      }
                      inviteId={
                        invite.id
                      }
                      serviceId={
                        auth.service.id
                      }
                      educatorName={
                        invite.educator_name
                      }
                      educatorEmail={
                        invite.educator_email
                      }
                      inviteUrl={`${getSiteUrl()}/join/${invite.invite_token}`}
                      createdLabel={
                        formatDate(
                          invite.created_at,
                        )
                      }
                      resendAction={
                        resendInvite
                      }
                      cancelAction={
                        cancelInvite
                      }
                      editEmailAction={
                        editInviteEmail
                      }
                    />
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* REMOVED */}
        {removedEducators.length >
        0 ? (
          <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
              Service records
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Previous educators
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-[#657B6C]">
              These educators no
              longer have active access,
              but their completed CPD
              history and certificates
              remain stored.
            </p>

            <div className="mt-6 divide-y divide-[#E6E2DC] overflow-hidden rounded-3xl border border-[#E6E2DC]">
              {removedEducators.map(
                (educator) => (
                  <article
                    key={
                      educator.id
                    }
                    className="grid gap-4 p-5 sm:grid-cols-3"
                  >
                    <div>
                      <p className="font-bold">
                        {educator.full_name ||
                          'Name not added'}
                      </p>

                      <p className="mt-1 wrap-break-word text-sm text-[#657B6C]">
                        {
                          educator.email
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#9A793D]">
                        Joined
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatDate(
                          educator.joined_at,
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#9A793D]">
                        Removed
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {formatDate(
                          educator.removed_at,
                        )}
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}