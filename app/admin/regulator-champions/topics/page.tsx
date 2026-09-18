import {
  cookies,
} from 'next/headers';

import {
  redirect,
} from 'next/navigation';

import {
  revalidatePath,
} from 'next/cache';

import {
  createClient,
} from '@supabase/supabase-js';

export const dynamic =
  'force-dynamic';

type Topic = {
  id: string;
  title: string;
  slug: string;
  sort_order: number;
  why_this_matters:
    | string
    | null;
  reflection_question:
    | string
    | null;
  status: string;
  live_date:
    | string
    | null;
  zoom_url:
    | string
    | null;
  created_at: string;
  updated_at: string;
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

function slugify(
  value: string,
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /['’]/g,
      '',
    )
    .replace(
      /[^a-z0-9]+/g,
      '-',
    )
    .replace(
      /^-+|-+$/g,
      '',
    );
}

function formatDateTime(
  value:
    | string
    | null,
) {
  if (!value) {
    return 'Not scheduled';
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone:
        'Australia/Melbourne',
    },
  ).format(
    new Date(value),
  );
}

async function createTopic(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const title =
    String(
      formData.get(
        'title',
      ) || '',
    ).trim();

  const sortOrder =
    Number(
      formData.get(
        'sortOrder',
      ),
    );

  const liveDate =
    String(
      formData.get(
        'liveDate',
      ) || '',
    ).trim();

  const zoomUrl =
    String(
      formData.get(
        'zoomUrl',
      ) || '',
    ).trim();

  const whyThisMatters =
    String(
      formData.get(
        'whyThisMatters',
      ) || '',
    ).trim();

  const reflectionQuestion =
    String(
      formData.get(
        'reflectionQuestion',
      ) || '',
    ).trim();

  if (
    !title ||
    !Number.isInteger(
      sortOrder,
    ) ||
    sortOrder < 1
  ) {
    redirect(
      '/admin/regulator-champions/topics?error=invalid',
    );
  }

  const slug =
    slugify(title);

  if (!slug) {
    redirect(
      '/admin/regulator-champions/topics?error=invalid',
    );
  }

  const supabase =
    getSupabaseAdmin();

  const {
    error,
  } =
    await supabase
      .from(
        'rc_topics',
      )
      .insert({
        title,

        slug,

        sort_order:
          sortOrder,

        why_this_matters:
          whyThisMatters ||
          null,

        reflection_question:
          reflectionQuestion ||
          null,

        status:
          'draft',

        live_date:
          liveDate
            ? new Date(
                liveDate,
              ).toISOString()
            : null,

        zoom_url:
          zoomUrl ||
          null,

        updated_at:
          new Date()
            .toISOString(),
      });

  if (error) {
    console.error(
      'Could not create Regulator Champions topic:',
      error,
    );

    if (
      error.code ===
      '23505'
    ) {
      redirect(
        '/admin/regulator-champions/topics?error=duplicate',
      );
    }

    redirect(
      '/admin/regulator-champions/topics?error=create',
    );
  }

  revalidatePath(
    '/admin/regulator-champions/topics',
  );

  redirect(
    '/admin/regulator-champions/topics?created=1',
  );
}

export default async function TopicsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    error?: string;
  }>;
}) {
  await requireAdminAccess();

  const params =
    await searchParams;

  const supabase =
    getSupabaseAdmin();

  const {
    data,
    error,
  } =
    await supabase
      .from(
        'rc_topics',
      )
      .select(
        `
          id,
          title,
          slug,
          sort_order,
          why_this_matters,
          reflection_question,
          status,
          live_date,
          zoom_url,
          created_at,
          updated_at
        `,
      )
      .order(
        'sort_order',
        {
          ascending: true,
        },
      );

  if (error) {
    console.error(
      'Could not load Regulator Champions topics:',
      error,
    );
  }

  const topics =
    (
      data ?? []
    ) as Topic[];

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-8 text-[#12362F] md:px-6 md:py-12">
      <section className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}

        <div className="flex flex-col gap-5 border-b border-[#E5DED4] pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Play Move Improve
            </p>

            <h1 className="mt-2 text-3xl font-extrabold md:text-5xl">
              Topics & resources
            </h1>

            <p className="mt-3 max-w-3xl text-base leading-7 text-[#5E6D67]">
              Build the 2027 learning
              pathway here. Create the
              monthly topic first, then
              open it to add recordings,
              PDFs, links and other
              resources.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/regulator-champions"
              className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-3 text-sm font-bold text-[#12362F]"
            >
              Admin home
            </a>

            <a
              href="/admin/regulator-champions/services"
              className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-3 text-sm font-bold text-[#12362F]"
            >
              Services
            </a>
          </div>
        </div>

        {/* FEEDBACK */}

        {params.created ===
          '1' && (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
            Topic created as a
            draft. You can now open
            it and add its learning
            content.
          </div>
        )}

        {params.error ===
          'invalid' && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
            Please add a topic
            title and a valid topic
            number.
          </div>
        )}

        {params.error ===
          'duplicate' && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
            A topic with that title
            already exists. Change
            the title slightly and
            try again.
          </div>
        )}

        {params.error ===
          'create' && (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
            The topic could not be
            created. Check the
            server logs before
            trying again.
          </div>
        )}

        {/* CREATE TOPIC */}

        <section className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm md:p-9">
          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
            Create a topic
          </p>

          <h2 className="mt-2 text-2xl font-extrabold">
            Add the next month&apos;s
            learning
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5E6D67]">
            New topics begin as
            drafts. Educators will
            not see them until we
            publish them later.
          </p>

          <form
            action={createTopic}
            className="mt-7 space-y-6"
          >
            <div className="grid gap-5 md:grid-cols-[140px_1fr]">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Topic number
                </span>

                <input
                  type="number"
                  name="sortOrder"
                  min="1"
                  max="99"
                  required
                  defaultValue={
                    topics.length +
                    1
                  }
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#E0BC68]/30"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Topic title
                </span>

                <input
                  type="text"
                  name="title"
                  required
                  placeholder="For example: Morning routines, separation and drop-off"
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#E0BC68]/30"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Live date and time
                </span>

                <input
                  type="datetime-local"
                  name="liveDate"
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#E0BC68]/30"
                />

                <span className="mt-2 block text-xs leading-5 text-[#6B7772]">
                  Enter this using
                  Melbourne time.
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Zoom link
                </span>

                <input
                  type="url"
                  name="zoomUrl"
                  placeholder="https://..."
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#E0BC68]/30"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Why this matters
              </span>

              <textarea
                name="whyThisMatters"
                rows={4}
                placeholder="A short explanation educators will see before beginning this topic."
                className="w-full rounded-xl border border-[#D8D2C9] bg-white p-4 text-base text-[#12362F] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#E0BC68]/30"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Main reflection
                question
              </span>

              <textarea
                name="reflectionQuestion"
                rows={3}
                placeholder="For example: What are you noticing about the way children arrive and settle into your service?"
                className="w-full rounded-xl border border-[#D8D2C9] bg-white p-4 text-base text-[#12362F] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#E0BC68]/30"
              />
            </label>

            <div className="flex flex-col gap-4 border-t border-[#E5DED4] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-[#5E6D67]">
                This will save as a
                draft. Nothing is
                released to educators
                yet.
              </p>

              <button
                type="submit"
                className="min-h-14 rounded-2xl bg-[#12362F] px-7 py-3 text-sm font-extrabold text-white"
              >
                Create draft topic
              </button>
            </div>
          </form>
        </section>

        {/* EXISTING TOPICS */}

        <section>
          <div className="flex items-end justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                2027 pathway
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Your topics
              </h2>
            </div>

            <p className="text-sm font-bold text-[#5E6D67]">
              {topics.length}{' '}
              {topics.length ===
              1
                ? 'topic'
                : 'topics'}
            </p>
          </div>

          <div className="mt-6">
            {error ? (
              <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700">
                Topics could not be
                loaded.
              </div>
            ) : topics.length ===
              0 ? (
              <div className="rounded-3xl border border-[#E5DED4] bg-white p-7 text-sm text-[#5E6D67]">
                No topics have been
                created yet. Use the
                form above to create
                Topic 1.
              </div>
            ) : (
              <div className="space-y-4">
                {topics.map(
                  (topic) => (
                    <article
                      key={
                        topic.id
                      }
                      className="rounded-3xl border border-[#E5DED4] bg-white p-6 shadow-sm"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex min-w-0 gap-5">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#12362F] font-black text-white">
                            {
                              topic.sort_order
                            }
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                  topic.status ===
                                  'published'
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-[#FAF5EC] text-[#8A6F3E]'
                                }`}
                              >
                                {
                                  topic.status
                                }
                              </span>

                              {topic.live_date ? (
                                <span className="text-xs font-semibold text-[#6B7772]">
                                  {formatDateTime(
                                    topic.live_date,
                                  )}
                                </span>
                              ) : null}
                            </div>

                            <h3 className="mt-2 text-xl font-extrabold">
                              {
                                topic.title
                              }
                            </h3>

                            <p className="mt-1 text-sm text-[#6B7772]">
                              /platform/educator/topics/
                              {
                                topic.slug
                              }
                            </p>
                          </div>
                        </div>

                        <a
                          href={`/admin/regulator-champions/topics/${topic.id}`}
                          className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#12362F] px-6 py-3 text-sm font-extrabold text-white"
                        >
                          Open topic →
                        </a>
                      </div>
                    </article>
                  ),
                )}
              </div>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}