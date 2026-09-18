import {
  redirect,
} from 'next/navigation';

import {
  cookies,
} from 'next/headers';

import {
  createClient,
} from '@supabase/supabase-js';

import {
  createServerClient,
} from '@supabase/ssr';

export const dynamic =
  'force-dynamic';

type Invite = {
  id: string;
  invite_token: string;
  educator_name: string | null;
  educator_email: string | null;
  status: string;
  service_id: string;
};

type Service = {
  id: string;
  service_name: string;
  seat_limit: number;
  status: string;
  access_end: string;
};

type ExistingMember = {
  id: string;
  user_id: string | null;
  status: string;
};

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env
      .SUPABASE_SERVICE_ROLE_KEY;

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

  return createClient(
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

async function findExistingAuthUserByEmail(
  email: string,
) {
  const supabase =
    getSupabaseAdmin();

  let page = 1;

  const perPage = 100;

  while (page <= 20) {
    const {
      data,
      error,
    } =
      await supabase.auth.admin
        .listUsers({
          page,
          perPage,
        });

    if (error) {
      console.error(
        'Could not search existing Auth users:',
        error,
      );

      return null;
    }

    const existing =
      data.users.find(
        (user) =>
          user.email
            ?.toLowerCase() ===
          email.toLowerCase(),
      );

    if (existing) {
      return existing;
    }

    if (
      data.users.length <
      perPage
    ) {
      break;
    }

    page += 1;
  }

  return null;
}

async function signEducatorIn(
  email: string,
  password: string,
) {
  const supabaseUrl =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  const supabaseAnonKey =
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey
  ) {
    return false;
  }

  const cookieStore =
    await cookies();

  const supabase =
    createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },

          setAll(
            cookiesToSet,
          ) {
            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) => {
                cookieStore.set(
                  name,
                  value,
                  options,
                );
              },
            );
          },
        },
      },
    );

  const {
    error,
  } =
    await supabase.auth
      .signInWithPassword({
        email,
        password,
      });

  if (error) {
    console.error(
      'Automatic educator sign-in failed:',
      error,
    );

    return false;
  }

  return true;
}

async function acceptInvite(
  formData: FormData,
) {
  'use server';

  const token =
    String(
      formData.get('token') ||
        '',
    ).trim();

  const fullName =
    String(
      formData.get(
        'fullName',
      ) || '',
    ).trim();

  const email =
    String(
      formData.get('email') ||
        '',
    )
      .trim()
      .toLowerCase();

  const password =
    String(
      formData.get(
        'password',
      ) || '',
    );

  if (
    !token ||
    !fullName ||
    !email ||
    !email.includes('@') ||
    password.length < 8
  ) {
    redirect(
      `/join/${token}?error=invalid`,
    );
  }

  const supabase =
    getSupabaseAdmin();

  const {
    data: invite,
    error: inviteError,
  } =
    await supabase
      .from(
        'rc_team_invites',
      )
      .select(
        `
          id,
          invite_token,
          educator_name,
          educator_email,
          status,
          service_id
        `,
      )
      .eq(
        'invite_token',
        token,
      )
      .single();

  if (
    inviteError ||
    !invite ||
    invite.status !==
      'pending'
  ) {
    redirect(
      `/join/${token}?error=invite`,
    );
  }

  const typedInvite =
    invite as Invite;

  const {
    data: service,
    error: serviceError,
  } =
    await supabase
      .from(
        'rc_services',
      )
      .select(
        `
          id,
          service_name,
          seat_limit,
          status,
          access_end
        `,
      )
      .eq(
        'id',
        typedInvite.service_id,
      )
      .single();

  if (
    serviceError ||
    !service
  ) {
    redirect(
      `/join/${token}?error=service`,
    );
  }

  const typedService =
    service as Service;

  if (
    typedService.status !==
    'active'
  ) {
    redirect(
      `/join/${token}?error=inactive`,
    );
  }

  if (
    new Date(
      typedService.access_end,
    ).getTime() <
    Date.now()
  ) {
    redirect(
      `/join/${token}?error=expired`,
    );
  }

  if (
    typedInvite.educator_email &&
    typedInvite.educator_email
      .toLowerCase() !==
      email
  ) {
    redirect(
      `/join/${token}?error=email`,
    );
  }

  /*
   * Look for an existing membership
   * before checking available seats.
   *
   * This means an educator who was
   * previously removed can be restored
   * without incorrectly consuming an
   * additional seat.
   */

  const {
    data: existingMemberData,
    error:
      existingMemberError,
  } =
    await supabase
      .from(
        'rc_team_members',
      )
      .select(
        `
          id,
          user_id,
          status
        `,
      )
      .eq(
        'service_id',
        typedService.id,
      )
      .ilike(
        'email',
        email,
      )
      .maybeSingle();

  if (
    existingMemberError
  ) {
    console.error(
      'Could not check existing educator membership:',
      existingMemberError,
    );

    redirect(
      `/join/${token}?error=member`,
    );
  }

  const existingMember =
    existingMemberData as
      | ExistingMember
      | null;

  const alreadyActiveEducator =
    existingMember?.status ===
    'active';

  /*
   * Count EDUCATORS only.
   * The manager does not use one
   * of the 15 educator seats.
   */

  if (
    !alreadyActiveEducator
  ) {
    const {
      count:
        activeEducatorCount,
      error: countError,
    } =
      await supabase
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
          typedService.id,
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
        'Could not check educator seat availability:',
        countError,
      );

      redirect(
        `/join/${token}?error=seat-check`,
      );
    }

    if (
      (
        activeEducatorCount ||
        0
      ) >=
      typedService.seat_limit
    ) {
      redirect(
        `/join/${token}?error=full`,
      );
    }
  }

  /*
   * Create the Auth user if they
   * do not exist.
   *
   * If they already exist, update
   * their password to the password
   * they have just chosen on this
   * invitation screen.
   */

  let userId:
    | string
    | null = null;

  const existingAuthUser =
    await findExistingAuthUserByEmail(
      email,
    );

  if (existingAuthUser) {
    const {
      data:
        updatedUserData,
      error:
        updateUserError,
    } =
      await supabase.auth.admin
        .updateUserById(
          existingAuthUser.id,
          {
            password,
            email_confirm:
              true,
            user_metadata: {
              ...existingAuthUser
                .user_metadata,

              full_name:
                fullName,
            },
          },
        );

    if (
      updateUserError ||
      !updatedUserData
        ?.user
    ) {
      console.error(
        'Could not update existing educator Auth account:',
        updateUserError,
      );

      redirect(
        `/join/${token}?error=account`,
      );
    }

    userId =
      updatedUserData.user.id;
  } else {
    const {
      data:
        createdUserData,
      error:
        createUserError,
    } =
      await supabase.auth.admin
        .createUser({
          email,
          password,
          email_confirm:
            true,
          user_metadata: {
            full_name:
              fullName,
          },
        });

    if (
      createUserError ||
      !createdUserData
        ?.user
    ) {
      /*
       * Protect against a race where
       * the account was created between
       * our first lookup and createUser.
       */

      const retryUser =
        await findExistingAuthUserByEmail(
          email,
        );

      if (!retryUser) {
        console.error(
          'Could not create educator Auth account:',
          createUserError,
        );

        redirect(
          `/join/${token}?error=account`,
        );
      }

      const {
        data:
          retryUpdatedData,
        error:
          retryUpdateError,
      } =
        await supabase.auth.admin
          .updateUserById(
            retryUser.id,
            {
              password,
              email_confirm:
                true,
              user_metadata: {
                ...retryUser
                  .user_metadata,

                full_name:
                  fullName,
              },
            },
          );

      if (
        retryUpdateError ||
        !retryUpdatedData
          ?.user
      ) {
        console.error(
          'Could not update educator Auth account after retry:',
          retryUpdateError,
        );

        redirect(
          `/join/${token}?error=account`,
        );
      }

      userId =
        retryUpdatedData.user.id;
    } else {
      userId =
        createdUserData.user.id;
    }
  }

  if (!userId) {
    redirect(
      `/join/${token}?error=account`,
    );
  }

  /*
   * Restore the existing member
   * record where possible so that
   * their previous CPD history,
   * certificates and learning
   * records remain connected.
   */

  if (existingMember) {
    const {
      error:
        restoreError,
    } =
      await supabase
        .from(
          'rc_team_members',
        )
        .update({
          user_id:
            userId,

          full_name:
            fullName,

          email,

          role:
            'educator',

          status:
            'active',

          removed_at:
            null,

          joined_at:
            new Date()
              .toISOString(),
        })
        .eq(
          'id',
          existingMember.id,
        );

    if (restoreError) {
      console.error(
        'Could not restore educator membership:',
        restoreError,
      );

      redirect(
        `/join/${token}?error=member`,
      );
    }
  } else {
    const {
      error:
        memberError,
    } =
      await supabase
        .from(
          'rc_team_members',
        )
        .insert({
          service_id:
            typedService.id,

          user_id:
            userId,

          full_name:
            fullName,

          email,

          role:
            'educator',

          status:
            'active',

          joined_at:
            new Date()
              .toISOString(),
        });

    if (memberError) {
      console.error(
        'Could not create educator membership:',
        memberError,
      );

      redirect(
        `/join/${token}?error=member`,
      );
    }
  }

  /*
   * Mark the permanent invitation
   * as joined.
   */

  const {
    error:
      inviteUpdateError,
  } =
    await supabase
      .from(
        'rc_team_invites',
      )
      .update({
        educator_name:
          fullName,

        educator_email:
          email,

        status:
          'joined',

        joined_at:
          new Date()
            .toISOString(),
      })
      .eq(
        'id',
        typedInvite.id,
      );

  if (
    inviteUpdateError
  ) {
    console.error(
      'Could not mark invitation as joined:',
      inviteUpdateError,
    );
  }

  /*
   * Automatically create the
   * educator's Supabase browser
   * session.
   */

  const signedIn =
    await signEducatorIn(
      email,
      password,
    );

  if (!signedIn) {
    redirect(
      `/member-access?joined=1&email=${encodeURIComponent(
        email,
      )}`,
    );
  }

  /*
   * Successful experience:
   *
   * invitation
   * → create password
   * → automatic login
   * → educator dashboard
   */

  redirect(
    '/platform/educator/dashboard',
  );
}

function getErrorMessage(
  code?: string,
) {
  switch (code) {
    case 'invalid':
      return 'Please complete all fields. Your password must be at least 8 characters.';

    case 'invite':
      return 'This invitation is no longer available.';

    case 'service':
      return 'The service connected to this invitation could not be found.';

    case 'inactive':
      return 'This Regulator Champions service is not currently active.';

    case 'expired':
      return 'This service access period has ended.';

    case 'seat-check':
      return 'We could not check the available educator seats. Please try again.';

    case 'full':
      return 'All 15 educator seats are currently in use. Please ask your manager to contact Play Move Improve.';

    case 'email':
      return 'Please use the email address that received this invitation.';

    case 'account':
      return 'We could not create your login account. Please contact Play Move Improve.';

    case 'member':
      return 'Your account was created, but we could not connect it to your service. Please contact Play Move Improve.';

    default:
      return null;
  }
}

export default async function JoinPage({
  params,
  searchParams,
}: {
  params: Promise<{
    token: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const {
    token,
  } =
    await params;

  const query =
    await searchParams;

  const supabase =
    getSupabaseAdmin();

  const {
    data: invite,
    error: inviteError,
  } =
    await supabase
      .from(
        'rc_team_invites',
      )
      .select(
        `
          id,
          invite_token,
          educator_name,
          educator_email,
          status,
          service_id
        `,
      )
      .eq(
        'invite_token',
        token,
      )
      .single();

  if (
    inviteError ||
    !invite
  ) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-5 py-16 text-[#1C3B34]">
        <section className="mx-auto max-w-xl rounded-4xl border border-[#E6E2DC] bg-white p-8 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            Play Move Improve
          </p>

          <h1 className="mt-3 text-3xl font-bold">
            This invitation could not be found.
          </h1>

          <p className="mt-4 leading-7 text-[#657B6C]">
            Please check the invitation link or ask your manager to resend it.
          </p>
        </section>
      </main>
    );
  }

  const typedInvite =
    invite as Invite;

  const {
    data: service,
  } =
    await supabase
      .from(
        'rc_services',
      )
      .select(
        `
          id,
          service_name,
          seat_limit,
          status,
          access_end
        `,
      )
      .eq(
        'id',
        typedInvite.service_id,
      )
      .single();

  const typedService =
    service as
      | Service
      | null;

  const errorMessage =
    getErrorMessage(
      query.error,
    );

  const alreadyUsed =
    typedInvite.status !==
    'pending';

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-12 text-[#1C3B34] sm:py-16">
      <section className="mx-auto max-w-2xl">
        <div className="rounded-4xl border border-[#E6E2DC] bg-white p-7 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            Play Move Improve
          </p>

          <p className="mt-2 text-sm font-bold text-[#8A6F3E]">
            Regulator Champions Program
          </p>

          <h1 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
            Join your team
          </h1>

          {typedService ? (
            <p className="mt-4 text-lg leading-8 text-[#53645D]">
              You&apos;ve been invited to join{' '}
              <strong>
                {
                  typedService.service_name
                }
              </strong>{' '}
              inside Regulator Champions.
            </p>
          ) : null}

          <div className="mt-6 rounded-2xl bg-[#FAF5EC] p-5">
            <p className="font-bold">
              Your account will keep your:
            </p>

            <div className="mt-3 space-y-2 text-sm leading-6 text-[#53645D]">
              <p>
                Professional learning progress
              </p>

              <p>
                Key takeaways and reflections
              </p>

              <p>
                CPD hours and certificates
              </p>

              <p>
                Professional Learning Reports
              </p>
            </div>
          </div>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800">
              {errorMessage}
            </div>
          ) : null}

          {alreadyUsed ? (
            <div className="mt-7 rounded-2xl border border-[#D8D2C9] bg-[#FAF8F5] p-5">
              <p className="font-bold">
                This invitation has already been used or cancelled.
              </p>

              <p className="mt-2 text-sm leading-6 text-[#657B6C]">
                If you already created your account, use the member login page. Otherwise ask your manager to send a new invitation.
              </p>

              <a
                href="/member-access"
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white"
              >
                Go to member login
              </a>
            </div>
          ) : (
            <form
              action={
                acceptInvite
              }
              className="mt-7 space-y-5"
            >
              <input
                type="hidden"
                name="token"
                value={token}
              />

              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Your name
                </span>

                <input
                  type="text"
                  name="fullName"
                  required
                  defaultValue={
                    typedInvite.educator_name ||
                    ''
                  }
                  autoComplete="name"
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#1C3B34] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Your email
                </span>

                <input
                  type="email"
                  name="email"
                  required
                  readOnly={
                    Boolean(
                      typedInvite.educator_email,
                    )
                  }
                  defaultValue={
                    typedInvite.educator_email ||
                    ''
                  }
                  autoComplete="email"
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#1C3B34] outline-none read-only:bg-[#F4F1EB] read-only:text-[#657B6C] focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Create a password
                </span>

                <input
                  type="password"
                  name="password"
                  minLength={8}
                  required
                  autoComplete="new-password"
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#1C3B34] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
                />

                <span className="mt-2 block text-xs leading-5 text-[#657B6C]">
                  Use at least 8 characters. You&apos;ll use this password whenever you return to Regulator Champions.
                </span>
              </label>

              <button
                type="submit"
                className="min-h-14 w-full rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F]"
              >
                Create my Regulator Champions account
              </button>

              <p className="text-center text-xs leading-5 text-[#657B6C]">
                After you create your password, we&apos;ll take you straight into your educator dashboard.
              </p>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}