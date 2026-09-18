import {
  createBrowserClient,
  createServerClient,
} from '@supabase/ssr';

import {
  createClient,
  type SupabaseClient,
  type User,
} from '@supabase/supabase-js';

import {
  cookies,
} from 'next/headers';

export type RcMemberRole =
  | 'manager'
  | 'educator';

export type RcMember = {
  id: string;
  service_id: string;
  user_id: string | null;
  full_name: string | null;
  email: string;
  role: RcMemberRole;
  status: string;
  last_seen_at: string | null;
  joined_at: string | null;
  removed_at: string | null;
};

export type RcService = {
  id: string;
  service_name: string;
  manager_name: string;
  manager_email: string;
  seat_limit: number;
  status: string;
  access_start: string;
  access_end: string;
};

export type RcAuthContext = {
  user: User;
  member: RcMember;
  service: RcService;
};

function getSupabaseUrl() {
  const url =
    process.env
      .NEXT_PUBLIC_SUPABASE_URL;

  if (!url) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL.',
    );
  }

  return url;
}

function getSupabaseAnonKey() {
  const key =
    process.env
      .NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_ANON_KEY.',
    );
  }

  return key;
}

function getSupabaseServiceRoleKey() {
  const key =
    process.env
      .SUPABASE_SERVICE_ROLE_KEY;

  if (!key) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY.',
    );
  }

  return key;
}

/*
 * Browser client
 *
 * Used by client components such as
 * the Regulator Champions login page.
 *
 * @supabase/ssr keeps the Supabase
 * authentication session in cookies
 * so server pages and proxy.ts can
 * recognise the logged-in user.
 */
export function createRcBrowserClient() {
  return createBrowserClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
  );
}

/*
 * Server client
 *
 * Used inside Server Components,
 * Server Actions and route handlers
 * when working as the logged-in user.
 */
export async function createRcServerClient() {
  const cookieStore =
    await cookies();

  return createServerClient(
    getSupabaseUrl(),
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },

        setAll(
          cookiesToSet,
        ) {
          try {
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
          } catch {
            /*
             * Server Components may
             * sometimes be unable to
             * write cookies.
             *
             * proxy.ts will handle
             * session refreshing.
             */
          }
        },
      },
    },
  );
}

/*
 * Admin client
 *
 * Service-role access for trusted
 * server-side operations only.
 *
 * Never import this client into a
 * browser/client component.
 */
export function createRcAdminClient() {
  return createClient(
    getSupabaseUrl(),
    getSupabaseServiceRoleKey(),
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}

/*
 * Finds the Regulator Champions
 * membership and service belonging
 * to a Supabase Auth user.
 */
export async function getRcAuthContextFromUser(
  user: User,
  supabaseAdmin?: SupabaseClient,
): Promise<RcAuthContext | null> {
  const supabase =
    supabaseAdmin ??
    createRcAdminClient();

  const {
    data: member,
    error: memberError,
  } = await supabase
    .from(
      'rc_team_members',
    )
    .select(
      `
        id,
        service_id,
        user_id,
        full_name,
        email,
        role,
        status,
        last_seen_at,
        joined_at,
        removed_at
      `,
    )
    .eq(
      'user_id',
      user.id,
    )
    .eq(
      'status',
      'active',
    )
    .maybeSingle();

  if (
    memberError ||
    !member
  ) {
    if (memberError) {
      console.error(
        'Could not load Regulator Champions member:',
        memberError,
      );
    }

    return null;
  }

  const {
    data: service,
    error: serviceError,
  } = await supabase
    .from(
      'rc_services',
    )
    .select(
      `
        id,
        service_name,
        manager_name,
        manager_email,
        seat_limit,
        status,
        access_start,
        access_end
      `,
    )
    .eq(
      'id',
      member.service_id,
    )
    .maybeSingle();

  if (
    serviceError ||
    !service
  ) {
    if (serviceError) {
      console.error(
        'Could not load Regulator Champions service:',
        serviceError,
      );
    }

    return null;
  }

  if (
    service.status !==
    'active'
  ) {
    return null;
  }

  const accessStart =
    new Date(
      service.access_start,
    );

  const accessEnd =
    new Date(
      service.access_end,
    );

  const now =
    new Date();

  if (
    Number.isNaN(
      accessStart.getTime(),
    ) ||
    Number.isNaN(
      accessEnd.getTime(),
    )
  ) {
    return null;
  }

  if (
    now.getTime() <
      accessStart.getTime() ||
    now.getTime() >
      accessEnd.getTime()
  ) {
    return null;
  }

  return {
    user,

    member:
      member as RcMember,

    service:
      service as RcService,
  };
}

/*
 * Convenience helper for protected
 * server pages.
 */
export async function getCurrentRcAuthContext():
Promise<RcAuthContext | null> {
  const supabase =
    await createRcServerClient();

  const {
    data: {
      user,
    },
    error,
  } =
    await supabase.auth
      .getUser();

  if (
    error ||
    !user
  ) {
    return null;
  }

  return getRcAuthContextFromUser(
    user,
  );
}

/*
 * Update the member's activity date.
 *
 * We do this server-side using the
 * service role because RLS is enabled
 * on the Regulator Champions tables.
 */
export async function touchRcMemberLastSeen(
  memberId: string,
  supabaseAdmin?: SupabaseClient,
) {
  const supabase =
    supabaseAdmin ??
    createRcAdminClient();

  const {
    error,
  } = await supabase
    .from(
      'rc_team_members',
    )
    .update({
      last_seen_at:
        new Date()
          .toISOString(),
    })
    .eq(
      'id',
      memberId,
    );

  if (error) {
    console.error(
      'Could not update Regulator Champions member activity:',
      error,
    );
  }
}