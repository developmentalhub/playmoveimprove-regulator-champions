import {
  cookies,
  headers,
} from 'next/headers';

import {
  redirect,
} from 'next/navigation';

import {
  revalidatePath,
} from 'next/cache';

import {
  createClient as createSupabaseAdminClient,
} from '@supabase/supabase-js';

export const dynamic =
  'force-dynamic';

type Lead = {
  id: string;
  name: string;
  email: string;
  organisation_name:
    | string
    | null;
  phone:
    | string
    | null;
  service_type:
    | string
    | null;
  educator_count:
    | number
    | null;
  program_option:
    | string
    | null;
  amount:
    | number
    | null;
  funding_source:
    | string
    | null;
  status: string;
  created_at: string;
};

type Service = {
  id: string;
  service_name: string;
  manager_name: string;
  manager_email: string;
  seat_limit: number;
  status: string;
  access_code:
    | string
    | null;
  access_end: string;
  invoice_paid_at:
    | string
    | null;
  created_at: string;
};

type TeamMember = {
  id: string;
  service_id: string;
  role: string;
  status: string;
};

type TeamInvite = {
  id: string;
  service_id: string;
  status: string;
};

type ActivationResponse = {
  success?: boolean;
  error?: string;
  serviceId?: string;
  managerEmail?: string;
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

  return createSupabaseAdminClient(
    supabaseUrl,
    serviceRoleKey,
    {
      auth: {
        persistSession:
          false,
        autoRefreshToken:
          false,
      },
    },
  );
}

async function requireAdminAccess() {
  const adminToken =
    process.env
      .REGULATOR_ADMIN_TOKEN;

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
    adminSession !==
      adminToken
  ) {
    redirect(
      '/admin/regulator-champions/login',
    );
  }
}

async function getCurrentOrigin() {
  const headerStore =
    await headers();

  const forwardedHost =
    headerStore.get(
      'x-forwarded-host',
    );

  const host =
    forwardedHost ||
    headerStore.get(
      'host',
    );

  const forwardedProto =
    headerStore.get(
      'x-forwarded-proto',
    );

  const protocol =
    forwardedProto ||
    (process.env.NODE_ENV ===
    'development'
      ? 'http'
      : 'https');

  if (!host) {
    throw new Error(
      'Could not determine application host.',
    );
  }

  return `${protocol}://${host}`;
}

function formatDate(
  value:
    | string
    | null,
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

function formatMoney(
  amount:
    | number
    | null,
) {
  if (
    amount === null ||
    amount === undefined
  ) {
    return '—';
  }

  return new Intl.NumberFormat(
    'en-AU',
    {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits:
        0,
    },
  ).format(amount);
}

function programLabel(
  option:
    | string
    | null,
) {
  if (
    option ===
    'premium'
  ) {
    return 'Premium';
  }

  if (
    option ===
    'early-bird'
  ) {
    return 'Early Bird Digital';
  }

  return (
    option ||
    'Not selected'
  );
}

function containsSearch(
  values: Array<
    string |
    null |
    undefined
  >,
  search: string,
) {
  if (!search) {
    return true;
  }

  const normalisedSearch =
    search
      .trim()
      .toLowerCase();

  return values.some(
    (value) =>
      String(
        value ?? '',
      )
        .toLowerCase()
        .includes(
          normalisedSearch,
        ),
  );
}

async function activateService(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const leadId =
    formData.get(
      'leadId',
    );

  if (
    typeof leadId !==
      'string' ||
    !leadId
  ) {
    redirect(
      '/admin/regulator-champions/services?error=missing-lead',
    );
  }

  try {
    const cookieStore =
      await cookies();

    const adminSession =
      cookieStore.get(
        'regulator_admin_session',
      )?.value;

    if (!adminSession) {
      redirect(
        '/admin/regulator-champions/login',
      );
    }

    const origin =
      await getCurrentOrigin();

    const response =
      await fetch(
        `${origin}/api/admin/activate-regulator-service`,
        {
          method:
            'POST',

          headers: {
            'Content-Type':
              'application/json',

            Cookie:
              `regulator_admin_session=${encodeURIComponent(
                adminSession,
              )}`,
          },

          body:
            JSON.stringify({
              leadId,
            }),

          cache:
            'no-store',
        },
      );

    const result =
      (await response
        .json()) as ActivationResponse;

    if (
      !response.ok ||
      !result.success
    ) {
      console.error(
        'Service activation API failed:',
        result,
      );

      redirect(
        `/admin/regulator-champions/services?error=${encodeURIComponent(
          result.error ||
            'activation-failed',
        )}`,
      );
    }

    revalidatePath(
      '/admin/regulator-champions/services',
    );

    redirect(
      '/admin/regulator-champions/services?activated=1',
    );
  } catch (error) {
    console.error(
      'Service activation failed:',
      error,
    );

    redirect(
      '/admin/regulator-champions/services?error=activation-failed',
    );
  }
}

export default async function ServicesAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    activated?: string;
    error?: string;
    q?: string;
  }>;
}) {
  await requireAdminAccess();

  const params =
    await searchParams;

  const search =
    (
      params.q ||
      ''
    ).trim();

  const supabase =
    getSupabaseAdmin();

  const [
    leadsResponse,
    servicesResponse,
    membersResponse,
    invitesResponse,
  ] =
    await Promise.all([
      supabase
        .from(
          'regulator_leads',
        )
        .select(
          `
            id,
            name,
            email,
            organisation_name,
            phone,
            service_type,
            educator_count,
            program_option,
            amount,
            funding_source,
            status,
            created_at
          `,
        )
        .eq(
          'source',
          '2027-homepage-invoice-request',
        )
        .eq(
          'status',
          'invoice-requested',
        )
        .order(
          'created_at',
          {
            ascending:
              false,
          },
        ),

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
            seat_limit,
            status,
            access_code,
            access_end,
            invoice_paid_at,
            created_at
          `,
        )
        .order(
          'created_at',
          {
            ascending:
              false,
          },
        ),

      supabase
        .from(
          'rc_team_members',
        )
        .select(
          `
            id,
            service_id,
            role,
            status
          `,
        ),

      supabase
        .from(
          'rc_team_invites',
        )
        .select(
          `
            id,
            service_id,
            status
          `,
        ),
    ]);

  if (
    leadsResponse.error
  ) {
    console.error(
      'Could not load invoice requests:',
      leadsResponse.error,
    );
  }

  if (
    servicesResponse.error
  ) {
    console.error(
      'Could not load services:',
      servicesResponse.error,
    );
  }

  if (
    membersResponse.error
  ) {
    console.error(
      'Could not load team members:',
      membersResponse.error,
    );
  }

  if (
    invitesResponse.error
  ) {
    console.error(
      'Could not load team invites:',
      invitesResponse.error,
    );
  }

  const leads =
    (
      leadsResponse.data ??
      []
    ) as Lead[];

  const services =
    (
      servicesResponse.data ??
      []
    ) as Service[];

  const members =
    (
      membersResponse.data ??
      []
    ) as TeamMember[];

  const invites =
    (
      invitesResponse.data ??
      []
    ) as TeamInvite[];

  const filteredLeads =
    leads.filter(
      (lead) =>
        containsSearch(
          [
            lead.organisation_name,
            lead.name,
            lead.email,
            lead.phone,
            lead.service_type,
            lead.funding_source,
            lead.program_option,
          ],
          search,
        ),
    );

  const filteredServices =
    services.filter(
      (service) =>
        containsSearch(
          [
            service.service_name,
            service.manager_name,
            service.manager_email,
            service.access_code,
            service.status,
          ],
          search,
        ),
    );

  const getUsedEducatorSeats = (
    serviceId: string,
  ) =>
    members.filter(
      (member) =>
        member.service_id ===
          serviceId &&
        member.role ===
          'educator' &&
        member.status ===
          'active',
    ).length;

  const getPendingInvites = (
    serviceId: string,
  ) =>
    invites.filter(
      (invite) =>
        invite.service_id ===
          serviceId &&
        invite.status ===
          'pending',
    ).length;

  const activeEducators =
    members.filter(
      (member) =>
        member.role ===
          'educator' &&
        member.status ===
          'active',
    ).length;

  const activeServices =
    services.filter(
      (service) =>
        service.status ===
          'active',
    ).length;

  const pendingInvites =
    invites.filter(
      (invite) =>
        invite.status ===
          'pending',
    ).length;

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-8 text-[#1C3B34] md:px-6 md:py-12">
      <section className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}

        <div className="flex flex-col gap-5 border-b border-[#E6E2DC] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Play Move Improve
            </span>

            <h1 className="mt-2 text-3xl font-bold md:text-5xl">
              Services & invoices
            </h1>

            <p className="mt-3 max-w-3xl text-sm leading-7 text-[#657B6C] md:text-base">
              Find a Regulator
              Champions service,
              manage invoice
              requests and open
              individual service
              records.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/regulator-champions"
              className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-3 text-sm font-bold text-[#12362F]"
            >
              Admin home
            </a>

            <form
              action="/admin/regulator-champions/logout"
              method="POST"
            >
              <button
                type="submit"
                className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-3 text-sm font-bold text-[#12362F]"
              >
                Log out
              </button>
            </form>
          </div>
        </div>

        {/* SUCCESS */}

        {params.activated ===
          '1' && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
            Service activated
            successfully. The
            manager account has
            been connected and the
            15 educator-seat
            service has been
            created.
          </div>
        )}

        {/* ERROR */}

        {params.error && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
            The service could not
            be activated. Please
            check the server logs
            before trying again.
          </div>
        )}

        {/* SEARCH */}

        <section className="rounded-3xl border border-[#E6E2DC] bg-white p-5 shadow-sm md:p-6">
          <form
            method="GET"
            className="flex flex-col gap-3 md:flex-row"
          >
            <div className="flex-1">
              <label
                htmlFor="service-search"
                className="mb-2 block text-xs font-black uppercase tracking-wider text-[#9A793D]"
              >
                Find a service
              </label>

              <input
                id="service-search"
                name="q"
                type="search"
                defaultValue={
                  search
                }
                placeholder="Search service name, manager, email, phone or access code"
                className="min-h-14 w-full rounded-2xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] placeholder:text-[#7A8983] focus:border-[#C29F60] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
              />
            </div>

            <div className="flex items-end gap-2">
              <button
                type="submit"
                className="min-h-14 rounded-2xl bg-[#12362F] px-6 py-3 text-sm font-extrabold text-white"
              >
                Search
              </button>

              {search && (
                <a
                  href="/admin/regulator-champions/services"
                  className="flex min-h-14 items-center rounded-2xl border border-[#D8D2C9] bg-white px-5 py-3 text-sm font-bold text-[#12362F]"
                >
                  Clear
                </a>
              )}
            </div>
          </form>

          {search && (
            <p className="mt-4 text-sm text-[#657B6C]">
              Showing results
              matching{' '}
              <strong>
                “{search}”
              </strong>
              .
            </p>
          )}
        </section>

        {/* SUMMARY */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard
            label="Waiting for payment"
            value={
              leads.length
            }
          />

          <SummaryCard
            label="Active services"
            value={
              activeServices
            }
          />

          <SummaryCard
            label="Active educators"
            value={
              activeEducators
            }
          />

          <SummaryCard
            label="Pending invites"
            value={
              pendingInvites
            }
          />
        </section>

        {/* WAITING FOR PAYMENT */}

        <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                Action needed
              </span>

              <h2 className="mt-2 text-2xl font-bold">
                Invoice requests
                waiting for payment
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-7 text-[#657B6C]">
                When payment
                reaches your
                account, activate
                the service here.
              </p>
            </div>

            <div className="rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-bold text-[#8A6F3E]">
              {
                filteredLeads.length
              }{' '}
              shown
            </div>
          </div>

          <div className="mt-7">
            {leadsResponse.error ? (
              <div className="rounded-2xl bg-rose-50 p-5 text-sm font-semibold text-rose-700">
                Invoice requests
                could not be
                loaded.
              </div>
            ) : filteredLeads.length ===
              0 ? (
              <div className="rounded-2xl bg-[#FAF8F5] p-6 text-sm text-[#657B6C]">
                {search
                  ? 'No waiting invoice requests match your search.'
                  : 'No invoice requests are currently waiting.'}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLeads.map(
                  (lead) => (
                    <article
                      key={
                        lead.id
                      }
                      className="rounded-3xl border border-[#E6E2DC] bg-[#FFFEFC] p-5 md:p-6"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-[#FFF3D5] px-3 py-1 text-xs font-black text-[#8A6F3E]">
                              Awaiting
                              payment
                            </span>

                            <span className="text-xs font-black uppercase tracking-wider text-[#9A793D]">
                              {programLabel(
                                lead.program_option,
                              )}
                            </span>
                          </div>

                          <h3 className="mt-3 text-2xl font-bold">
                            {lead.organisation_name ||
                              'Unnamed service'}
                          </h3>

                          <p className="mt-1 text-sm font-semibold text-[#526A60]">
                            {
                              lead.name
                            }
                          </p>

                          <p className="wrap-break-word text-sm text-[#657B6C]">
                            {
                              lead.email
                            }
                          </p>

                          <div className="mt-5 grid gap-x-8 gap-y-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
                            <Detail
                              label="Amount"
                              value={formatMoney(
                                lead.amount,
                              )}
                            />

                            <Detail
                              label="Educators"
                              value={
                                lead.educator_count
                                  ? `${lead.educator_count}`
                                  : '—'
                              }
                            />

                            <Detail
                              label="Service type"
                              value={
                                lead.service_type ||
                                '—'
                              }
                            />

                            <Detail
                              label="Phone"
                              value={
                                lead.phone ||
                                '—'
                              }
                            />

                            <Detail
                              label="Funding"
                              value={
                                lead.funding_source ||
                                '—'
                              }
                            />

                            <Detail
                              label="Requested"
                              value={formatDate(
                                lead.created_at,
                              )}
                            />
                          </div>
                        </div>

                        <form
                          action={
                            activateService
                          }
                          className="shrink-0"
                        >
                          <input
                            type="hidden"
                            name="leadId"
                            value={
                              lead.id
                            }
                          />

                          <button
                            type="submit"
                            className="min-h-14 w-full rounded-2xl bg-[#12362F] px-6 py-3 text-sm font-extrabold text-white lg:w-auto"
                          >
                            Mark invoice
                            paid
                            <span className="block text-xs font-semibold text-[#D8E1DC]">
                              Create
                              service access
                            </span>
                          </button>
                        </form>
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}
          </div>
        </section>

        {/* ACTIVE SERVICES */}

        <section>
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                Regulator
                Champions 2027
              </span>

              <h2 className="mt-2 text-2xl font-bold">
                Services
              </h2>

              <p className="mt-2 text-sm text-[#657B6C]">
                Open a service to
                manage educators,
                invites and access.
              </p>
            </div>

            <div className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#526A60] shadow-sm">
              {
                filteredServices.length
              }{' '}
              shown
            </div>
          </div>

          <div className="mt-6">
            {servicesResponse.error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700">
                Services could not
                be loaded.
              </div>
            ) : filteredServices.length ===
              0 ? (
              <div className="rounded-3xl border border-[#E6E2DC] bg-white p-6 text-sm text-[#657B6C]">
                {search
                  ? 'No active services match your search.'
                  : 'No 2027 services have been activated yet.'}
              </div>
            ) : (
              <div className="grid gap-5 lg:grid-cols-2">
                {filteredServices.map(
                  (
                    service,
                  ) => {
                    const usedSeats =
                      getUsedEducatorSeats(
                        service.id,
                      );

                    const servicePendingInvites =
                      getPendingInvites(
                        service.id,
                      );

                    const seatsRemaining =
                      Math.max(
                        0,
                        service.seat_limit -
                          usedSeats,
                      );

                    return (
                      <article
                        key={
                          service.id
                        }
                        className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm transition hover:border-[#C29F60]"
                      >
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                          <div className="min-w-0">
                            <span className="inline-flex rounded-full bg-[#EEF3F0] px-3 py-1 text-xs font-bold capitalize text-[#526D63]">
                              {
                                service.status
                              }
                            </span>

                            <h3 className="mt-3 text-2xl font-bold">
                              {
                                service.service_name
                              }
                            </h3>

                            <p className="mt-2 font-semibold text-[#526A60]">
                              {
                                service.manager_name
                              }
                            </p>

                            <p className="wrap-break-word text-sm text-[#657B6C]">
                              {
                                service.manager_email
                              }
                            </p>
                          </div>

                          <div className="rounded-2xl bg-[#FAF8F5] px-5 py-4 text-left sm:text-right">
                            <p className="text-2xl font-black">
                              {
                                usedSeats
                              }{' '}
                              of{' '}
                              {
                                service.seat_limit
                              }
                            </p>

                            <p className="text-xs font-semibold text-[#657B6C]">
                              educator
                              seats used
                            </p>

                            <p className="mt-1 text-xs text-[#8A6F3E]">
                              {
                                seatsRemaining
                              }{' '}
                              remaining
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 grid gap-4 border-y border-[#E6E2DC] py-5 sm:grid-cols-2">
                          <Detail
                            label="Pending invites"
                            value={`${servicePendingInvites}`}
                          />

                          <Detail
                            label="Access code"
                            value={
                              service.access_code ||
                              '—'
                            }
                          />

                          <Detail
                            label="Paid"
                            value={formatDate(
                              service.invoice_paid_at,
                            )}
                          />

                          <Detail
                            label="Access until"
                            value={formatDate(
                              service.access_end,
                            )}
                          />
                        </div>

                        <div className="mt-5">
                          <a
                            href={`/admin/regulator-champions/services/${service.id}`}
                            className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#12362F] px-5 py-3 text-sm font-extrabold text-white"
                          >
                            Open service
                            →
                          </a>
                        </div>
                      </article>
                    );
                  },
                )}
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wider text-[#C29F60]">
        {label}
      </p>

      <p className="mt-2 text-3xl font-black">
        {value}
      </p>
    </article>
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