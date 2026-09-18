import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import {
  createClient as createSupabaseAdminClient,
} from '@supabase/supabase-js';

import { Resend } from 'resend';

import RemoveEducatorButton from '@/components/admin/RemoveEducatorButton';
import InviteEducatorForm from '@/components/admin/InviteEducatorForm';

export const dynamic = 'force-dynamic';

type Service = {
  id: string;
  service_name: string;
  manager_name: string;
  manager_email: string;
  phone: string | null;
  postal_address: string | null;
  service_type: string | null;
  funding_source: string | null;
  funding_other: string | null;
  billing_name: string | null;
  billing_email: string | null;
  access_code: string | null;
  seat_limit: number;
  status: string;
  access_start: string;
  access_end: string;
  invoice_paid_at: string | null;
  created_at: string;
};

type Member = {
  id: string;
  full_name: string | null;
  email: string;
  role: string;
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

type InviteActionState = {
  success?: boolean;
  message?: string;
};

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL.',
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY.',
    );
  }

  return createSupabaseAdminClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

async function requireAdminAccess() {
  const adminToken =
    process.env.REGULATOR_ADMIN_TOKEN;

  if (!adminToken) {
    throw new Error(
      'Missing REGULATOR_ADMIN_TOKEN.',
    );
  }

  const cookieStore =
    await cookies();

  const adminSession =
    cookieStore.get(
      'regulator_admin_session',
    )?.value;

  if (
    !adminSession ||
    adminSession !== adminToken
  ) {
    redirect(
      '/admin/regulator-champions/login',
    );
  }
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
  ).format(new Date(value));
}

function getLoginStatus(
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
    (now.getTime() -
      lastSeen.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays > 30) {
    return 'Inactive for 30 days';
  }

  return 'Active';
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    'https://playmoveimprove-regulator-champions.vercel.app'
  ).replace(/\/$/, '');
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
            ${serviceName} has invited you
            to join the Play Move Improve
            Regulator Champions Program.
          </p>

          <p
            style="
              font-size:16px;
              line-height:1.7;
            "
          >
            Your individual account will
            keep your professional learning,
            reflections and certificates
            together throughout the program.
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
            This invitation link belongs to
            your service. You can return to
            the same link if you need to
            finish setting up your account
            later.
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

async function inviteEducator(
  previousState: InviteActionState,
  formData: FormData,
): Promise<InviteActionState> {
  'use server';

  await requireAdminAccess();

  const serviceId =
    formData.get('serviceId');

  const educatorName =
    String(
      formData.get('educatorName') || '',
    ).trim();

  const educatorEmail =
    String(
      formData.get('educatorEmail') || '',
    )
      .trim()
      .toLowerCase();

  if (
    typeof serviceId !== 'string' ||
    !serviceId
  ) {
    return {
      success: false,
      message:
        'The service could not be identified.',
    };
  }

  if (
    !educatorEmail ||
    !educatorEmail.includes('@')
  ) {
    return {
      success: false,
      message:
        'Please enter a valid educator email.',
    };
  }

  const supabase =
    getSupabaseAdmin();

  const {
    data: service,
    error: serviceError,
  } = await supabase
    .from('rc_services')
    .select(
      `
        id,
        service_name,
        seat_limit,
        status
      `,
    )
    .eq('id', serviceId)
    .single();

  if (
    serviceError ||
    !service
  ) {
    return {
      success: false,
      message:
        'The service could not be loaded.',
    };
  }

  if (
    service.status !== 'active'
  ) {
    return {
      success: false,
      message:
        'This service is not currently active.',
    };
  }

  const {
    count: activeMemberCount,
    error: countError,
  } = await supabase
    .from('rc_team_members')
    .select(
      'id',
      {
        count: 'exact',
        head: true,
      },
    )
    .eq(
      'service_id',
      serviceId,
    )
    .eq(
      'status',
      'active',
    );

  if (countError) {
    console.error(
      'Could not count service members:',
      countError,
    );

    return {
      success: false,
      message:
        'The service seat count could not be checked.',
    };
  }

  if (
    (activeMemberCount || 0) >=
    service.seat_limit
  ) {
    return {
      success: false,
      message:
        'All 15 seats are currently in use.',
    };
  }

  const {
    data: existingMember,
  } = await supabase
    .from('rc_team_members')
    .select(
      'id, status',
    )
    .eq(
      'service_id',
      serviceId,
    )
    .ilike(
      'email',
      educatorEmail,
    )
    .eq(
      'status',
      'active',
    )
    .maybeSingle();

  if (existingMember) {
    return {
      success: false,
      message:
        'This educator is already an active member of the service.',
    };
  }

  const {
    data: existingInvite,
  } = await supabase
    .from('rc_team_invites')
    .select(
      `
        id,
        invite_token
      `,
    )
    .eq(
      'service_id',
      serviceId,
    )
    .ilike(
      'educator_email',
      educatorEmail,
    )
    .eq(
      'status',
      'pending',
    )
    .maybeSingle();

  let inviteToken:
    | string
    | null =
    existingInvite?.invite_token ||
    null;

  if (!existingInvite) {
    const {
      data: createdInvite,
      error: inviteError,
    } = await supabase
      .from('rc_team_invites')
      .insert({
        service_id:
          serviceId,

        educator_name:
          educatorName || null,

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
      inviteError ||
      !createdInvite
    ) {
      console.error(
        'Could not create educator invite:',
        inviteError,
      );

      return {
        success: false,
        message:
          'The invitation could not be created.',
      };
    }

    inviteToken =
      createdInvite.invite_token;
  }

  if (!inviteToken) {
    return {
      success: false,
      message:
        'The invitation link could not be generated.',
    };
  }

  const inviteUrl =
    `${getSiteUrl()}/join/${inviteToken}`;

  if (
    process.env.RESEND_API_KEY
  ) {
    const resend =
      new Resend(
        process.env.RESEND_API_KEY,
      );

    const {
      error: resendError,
    } = await resend.emails.send({
      from:
        'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',

      to: [
        educatorEmail,
      ],

      replyTo:
        'robyn@playmoveimprove.com.au',

      subject:
        `${service.service_name} has invited you to Regulator Champions`,

      html:
        invitationEmail({
          educatorName,
          serviceName:
            service.service_name,
          inviteUrl,
        }),
    });

    if (resendError) {
      console.error(
        'Could not email educator invite:',
        resendError,
      );

      return {
        success: false,
        message:
          'The invitation was created, but the email could not be sent. You can resend it from the pending invitations list.',
      };
    }
  } else {
    console.warn(
      'RESEND_API_KEY is not configured.',
    );
  }

  revalidatePath(
    `/admin/regulator-champions/services/${serviceId}`,
  );

  return {
    success: true,
    message:
      existingInvite
        ? 'The existing invitation was emailed again.'
        : 'Invitation sent successfully.',
  };
}

async function resendInvite(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const inviteId =
    formData.get('inviteId');

  const serviceId =
    formData.get('serviceId');

  if (
    typeof inviteId !== 'string' ||
    typeof serviceId !== 'string'
  ) {
    return;
  }

  const supabase =
    getSupabaseAdmin();

  const {
    data: invite,
    error,
  } = await supabase
    .from('rc_team_invites')
    .select(
      `
        id,
        educator_name,
        educator_email,
        invite_token,
        status,
        rc_services (
          service_name
        )
      `,
    )
    .eq('id', inviteId)
    .eq(
      'service_id',
      serviceId,
    )
    .single();

  if (
    error ||
    !invite ||
    invite.status !== 'pending' ||
    !invite.educator_email
  ) {
    console.error(
      'Could not load invite for resend:',
      error,
    );

    return;
  }

  const serviceRelation =
    Array.isArray(
      invite.rc_services,
    )
      ? invite.rc_services[0]
      : invite.rc_services;

  const serviceName =
    serviceRelation?.service_name ||
    'Your service';

  const inviteUrl =
    `${getSiteUrl()}/join/${invite.invite_token}`;

  if (
    process.env.RESEND_API_KEY
  ) {
    const resend =
      new Resend(
        process.env.RESEND_API_KEY,
      );

    const {
      error: resendError,
    } = await resend.emails.send({
      from:
        'Robyn at Play Move Improve <robyn@playmoveimprove.com.au>',

      to: [
        invite.educator_email,
      ],

      replyTo:
        'robyn@playmoveimprove.com.au',

      subject:
        `${serviceName} has invited you to Regulator Champions`,

      html:
        invitationEmail({
          educatorName:
            invite.educator_name ||
            '',
          serviceName,
          inviteUrl,
        }),
    });

    if (resendError) {
      console.error(
        'Invite resend failed:',
        resendError,
      );
    }
  }

  revalidatePath(
    `/admin/regulator-champions/services/${serviceId}`,
  );
}

async function removeEducator(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const memberId =
    formData.get('memberId');

  const serviceId =
    formData.get('serviceId');

  if (
    typeof memberId !== 'string' ||
    typeof serviceId !== 'string'
  ) {
    return;
  }

  const supabase =
    getSupabaseAdmin();

  const {
    error,
  } = await supabase
    .from('rc_team_members')
    .update({
      status:
        'removed',

      removed_at:
        new Date().toISOString(),
    })
    .eq(
      'id',
      memberId,
    )
    .eq(
      'service_id',
      serviceId,
    )
    .eq(
      'role',
      'educator',
    );

  if (error) {
    console.error(
      'Could not remove educator:',
      error,
    );

    return;
  }

  revalidatePath(
    `/admin/regulator-champions/services/${serviceId}`,
  );
}

async function cancelInvite(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const inviteId =
    formData.get('inviteId');

  const serviceId =
    formData.get('serviceId');

  if (
    typeof inviteId !== 'string' ||
    typeof serviceId !== 'string'
  ) {
    return;
  }

  const supabase =
    getSupabaseAdmin();

  const {
    error,
  } = await supabase
    .from('rc_team_invites')
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
      serviceId,
    );

  if (error) {
    console.error(
      'Could not cancel invite:',
      error,
    );

    return;
  }

  revalidatePath(
    `/admin/regulator-champions/services/${serviceId}`,
  );
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  await requireAdminAccess();

  const { id } =
    await params;

  const supabase =
    getSupabaseAdmin();

  const [
    serviceResponse,
    membersResponse,
    invitesResponse,
  ] = await Promise.all([
    supabase
      .from(
        'rc_services',
      )
      .select(
        `
          id,
          service_name,
          manager_name,
          manager_email,
          phone,
          postal_address,
          service_type,
          funding_source,
          funding_other,
          billing_name,
          billing_email,
          access_code,
          seat_limit,
          status,
          access_start,
          access_end,
          invoice_paid_at,
          created_at
        `,
      )
      .eq(
        'id',
        id,
      )
      .single(),

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
        id,
      )
      .order(
        'created_at',
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
        id,
      )
      .order(
        'created_at',
        {
          ascending: false,
        },
      ),
  ]);

  if (
    serviceResponse.error ||
    !serviceResponse.data
  ) {
    redirect(
      '/admin/regulator-champions/services',
    );
  }

  if (
    membersResponse.error
  ) {
    console.error(
      'Could not load members:',
      membersResponse.error,
    );
  }

  if (
    invitesResponse.error
  ) {
    console.error(
      'Could not load invites:',
      invitesResponse.error,
    );
  }

  const service =
    serviceResponse.data as Service;

  const members =
    (membersResponse.data ??
      []) as Member[];

  const invites =
    (invitesResponse.data ??
      []) as Invite[];

  const activeMembers =
    members.filter(
      (member) =>
        member.status ===
        'active',
    );

  const removedEducators =
    members.filter(
      (member) =>
        member.role ===
          'educator' &&
        member.status ===
          'removed',
    );

  const pendingInvites =
    invites.filter(
      (invite) =>
        invite.status ===
        'pending',
    );

  const seatsUsed =
    activeMembers.length;

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-8 text-[#1C3B34] md:px-6 md:py-12">
      <section className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-5 border-b border-[#E6E2DC] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <a
              href="/admin/regulator-champions/services"
              className="text-sm font-extrabold text-[#8A6F3E]"
            >
              ← Back to services
            </a>

            <p className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Regulator Champions 2027
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-5xl">
              {service.service_name}
            </h1>

            <p className="mt-3 text-sm text-[#657B6C] md:text-base">
              {service.manager_name}
              {' · '}
              {service.manager_email}
            </p>
          </div>

          <div className="rounded-3xl border border-[#E6E2DC] bg-white px-6 py-4 text-right shadow-sm">
            <p className="text-3xl font-black">
              {seatsUsed} of{' '}
              {service.seat_limit}
            </p>

            <p className="text-xs font-semibold text-[#657B6C]">
              seats used ·{' '}
              {
                pendingInvites.length
              }{' '}
              pending
            </p>
          </div>
        </div>

        <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
            <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
              Service details
            </p>

            <div className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <Detail
                label="Manager"
                value={
                  service.manager_name
                }
              />

              <Detail
                label="Manager email"
                value={
                  service.manager_email
                }
              />

              <Detail
                label="Phone"
                value={
                  service.phone ||
                  '—'
                }
              />

              <Detail
                label="Service type"
                value={
                  service.service_type ||
                  '—'
                }
              />

              <Detail
                label="Postal address"
                value={
                  service.postal_address ||
                  '—'
                }
              />

              <Detail
                label="Funding"
                value={
                  service.funding_source ||
                  '—'
                }
              />

              <Detail
                label="Billing contact"
                value={
                  service.billing_name ||
                  service.manager_name
                }
              />

              <Detail
                label="Billing email"
                value={
                  service.billing_email ||
                  service.manager_email
                }
              />
            </div>
          </article>

          <article className="rounded-4xl border border-[#E6E2DC] bg-[#1C3B34] p-6 text-white shadow-sm md:p-8">
            <p className="text-xs font-black uppercase tracking-wider text-[#F0D99A]">
              Team access
            </p>

            <div className="mt-6">
              <p className="text-sm text-[#C9D8D2]">
                Service access code
              </p>

              <p className="mt-2 wrap-break-word text-2xl font-black">
                {service.access_code ||
                  'Not generated'}
              </p>
            </div>

            <div className="mt-6 border-t border-white/15 pt-5">
              <DetailDark
                label="Invoice paid"
                value={formatDate(
                  service.invoice_paid_at,
                )}
              />

              <DetailDark
                label="Access started"
                value={formatDate(
                  service.access_start,
                )}
              />

              <DetailDark
                label="Access expires"
                value={formatDate(
                  service.access_end,
                )}
              />
            </div>
          </article>
        </section>

        <InviteEducatorForm
          serviceId={service.id}
          seatsUsed={seatsUsed}
          seatLimit={
            service.seat_limit
          }
          action={inviteEducator}
        />

        <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
              Team members
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Active team
            </h2>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-[#E6E2DC]">
            {activeMembers.length ===
            0 ? (
              <div className="p-6 text-sm text-[#657B6C]">
                No active members.
              </div>
            ) : (
              <div className="divide-y divide-[#E6E2DC]">
                {activeMembers.map(
                  (member) => (
                    <article
                      key={member.id}
                      className="grid gap-4 bg-white p-5 md:grid-cols-[1.2fr_1.2fr_0.7fr_auto] md:items-center"
                    >
                      <div>
                        <p className="font-bold">
                          {member.full_name ||
                            'Name not added'}
                        </p>

                        <p className="mt-1 text-xs capitalize text-[#8A6F3E]">
                          {member.role}
                        </p>
                      </div>

                      <p className="wrap-break-word text-sm text-[#657B6C]">
                        {member.email}
                      </p>

                      <div>
                        <p className="text-sm font-semibold">
                          {getLoginStatus(
                            member.last_seen_at,
                          )}
                        </p>

                        <p className="mt-1 text-xs text-[#657B6C]">
                          Joined{' '}
                          {formatDate(
                            member.joined_at,
                          )}
                        </p>
                      </div>

                      {member.role ===
                      'educator' ? (
                        <RemoveEducatorButton
                          memberId={
                            member.id
                          }
                          serviceId={
                            service.id
                          }
                          educatorName={
                            member.full_name ||
                            member.email
                          }
                          action={
                            removeEducator
                          }
                        />
                      ) : (
                        <span className="text-xs font-bold text-[#657B6C]">
                          Main manager
                        </span>
                      )}
                    </article>
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
              Invitations
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Pending invites
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#657B6C]">
              Pending invitations do not use
              a service seat until the
              educator activates their
              account.
            </p>
          </div>

          <div className="mt-6">
            {pendingInvites.length ===
            0 ? (
              <div className="rounded-2xl bg-[#FAF8F5] p-5 text-sm text-[#657B6C]">
                No pending invitations.
              </div>
            ) : (
              <div className="space-y-4">
                {pendingInvites.map(
                  (invite) => {
                    const inviteUrl =
                      `${getSiteUrl()}/join/${invite.invite_token}`;

                    return (
                      <article
                        key={invite.id}
                        className="rounded-3xl border border-[#E6E2DC] p-5"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <p className="font-bold">
                              {invite.educator_name ||
                                'Name not added'}
                            </p>

                            <p className="mt-1 wrap-break-word text-sm text-[#657B6C]">
                              {invite.educator_email ||
                                'Email not added'}
                            </p>

                            <p className="mt-2 text-xs text-[#657B6C]">
                              Created{' '}
                              {formatDate(
                                invite.created_at,
                              )}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="max-w-xl rounded-xl bg-[#FAF8F5] px-3 py-2">
                              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9A793D]">
                                Invite link
                              </p>

                              <p className="mt-1 wrap-break-word text-xs text-[#526D63]">
                                {inviteUrl}
                              </p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                              <form
                                action={
                                  resendInvite
                                }
                              >
                                <input
                                  type="hidden"
                                  name="inviteId"
                                  value={
                                    invite.id
                                  }
                                />

                                <input
                                  type="hidden"
                                  name="serviceId"
                                  value={
                                    service.id
                                  }
                                />

                                <button
                                  type="submit"
                                  className="rounded-xl bg-[#1C3B34] px-4 py-2 text-xs font-bold text-white"
                                >
                                  Resend email
                                </button>
                              </form>

                              <form
                                action={
                                  cancelInvite
                                }
                              >
                                <input
                                  type="hidden"
                                  name="inviteId"
                                  value={
                                    invite.id
                                  }
                                />

                                <input
                                  type="hidden"
                                  name="serviceId"
                                  value={
                                    service.id
                                  }
                                />

                                <button
                                  type="submit"
                                  className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-2 text-xs font-bold text-[#657B6C]"
                                >
                                  Cancel invite
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </section>

        {removedEducators.length >
          0 && (
          <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                Service records
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Removed educators
              </h2>

              <p className="mt-2 text-sm leading-7 text-[#657B6C]">
                Their learning history
                remains stored. If the same
                email is re-added later, we
                can reconnect their previous
                CPD history.
              </p>
            </div>

            <div className="mt-6 divide-y divide-[#E6E2DC] overflow-hidden rounded-3xl border border-[#E6E2DC]">
              {removedEducators.map(
                (member) => (
                  <article
                    key={member.id}
                    className="grid gap-3 p-5 md:grid-cols-3"
                  >
                    <div>
                      <p className="font-bold">
                        {member.full_name ||
                          'Name not added'}
                      </p>

                      <p className="mt-1 wrap-break-word text-sm text-[#657B6C]">
                        {member.email}
                      </p>
                    </div>

                    <Detail
                      label="Joined"
                      value={formatDate(
                        member.joined_at,
                      )}
                    />

                    <Detail
                      label="Removed"
                      value={formatDate(
                        member.removed_at,
                      )}
                    />
                  </article>
                ),
              )}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-[#9A793D]">
        {label}
      </p>

      <p className="mt-1 wrap-break-word font-semibold text-[#1C3B34]">
        {value}
      </p>
    </div>
  );
}

function DetailDark({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <p className="text-xs font-bold uppercase tracking-wider text-[#F0D99A]">
        {label}
      </p>

      <p className="mt-1 font-semibold text-white">
        {value}
      </p>
    </div>
  );
}