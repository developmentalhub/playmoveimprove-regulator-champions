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
};

type TopicContent = {
  id: string;
  topic_id: string;
  content_type: string;
  title: string;
  url: string | null;
  body_text: string | null;
  sort_order: number;
  status: string;
  notify_educators: boolean;
  created_at: string;
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

function toDateTimeLocal(
  value:
    | string
    | null,
) {
  if (!value) {
    return '';
  }

  const date =
    new Date(value);

  const formatter =
    new Intl.DateTimeFormat(
      'sv-SE',
      {
        timeZone:
          'Australia/Melbourne',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      },
    );

  return formatter
    .format(date)
    .replace(
      ' ',
      'T',
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

async function updateTopic(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const id =
    String(
      formData.get('id') ||
        '',
    ).trim();

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
    !id ||
    !title ||
    !Number.isInteger(
      sortOrder,
    ) ||
    sortOrder < 1
  ) {
    redirect(
      `/admin/regulator-champions/topics/${id}?error=invalid`,
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
      .update({
        title,

        slug:
          slugify(title),

        sort_order:
          sortOrder,

        live_date:
          liveDate
            ? new Date(
                liveDate,
              ).toISOString()
            : null,

        zoom_url:
          zoomUrl ||
          null,

        why_this_matters:
          whyThisMatters ||
          null,

        reflection_question:
          reflectionQuestion ||
          null,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq(
        'id',
        id,
      );

  if (error) {
    console.error(
      'Could not update topic:',
      error,
    );

    redirect(
      `/admin/regulator-champions/topics/${id}?error=update`,
    );
  }

  revalidatePath(
    `/admin/regulator-champions/topics/${id}`,
  );

  revalidatePath(
    '/admin/regulator-champions/topics',
  );

  redirect(
    `/admin/regulator-champions/topics/${id}?saved=1`,
  );
}

async function addContent(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const topicId =
    String(
      formData.get(
        'topicId',
      ) || '',
    ).trim();

  const contentType =
    String(
      formData.get(
        'contentType',
      ) || '',
    ).trim();

  const title =
    String(
      formData.get(
        'title',
      ) || '',
    ).trim();

  const url =
    String(
      formData.get(
        'url',
      ) || '',
    ).trim();

  const bodyText =
    String(
      formData.get(
        'bodyText',
      ) || '',
    ).trim();

  const sortOrder =
    Number(
      formData.get(
        'sortOrder',
      ),
    );

  const notifyEducators =
    formData.get(
      'notifyEducators',
    ) === 'on';

  if (
    !topicId ||
    !title ||
    ![
      'video',
      'resource',
      'text',
    ].includes(
      contentType,
    ) ||
    !Number.isInteger(
      sortOrder,
    ) ||
    sortOrder < 1
  ) {
    redirect(
      `/admin/regulator-champions/topics/${topicId}?error=content`,
    );
  }

  if (
    contentType !==
      'text' &&
    !url
  ) {
    redirect(
      `/admin/regulator-champions/topics/${topicId}?error=url`,
    );
  }

  if (
    contentType ===
      'text' &&
    !bodyText
  ) {
    redirect(
      `/admin/regulator-champions/topics/${topicId}?error=text`,
    );
  }

  const supabase =
    getSupabaseAdmin();

  const {
    error,
  } =
    await supabase
      .from(
        'rc_topic_content',
      )
      .insert({
        topic_id:
          topicId,

        content_type:
          contentType,

        title,

        url:
          url ||
          null,

        body_text:
          bodyText ||
          null,

        sort_order:
          sortOrder,

        status:
          'published',

        notify_educators:
          notifyEducators,

        updated_at:
          new Date()
            .toISOString(),
      });

  if (error) {
    console.error(
      'Could not add topic content:',
      error,
    );

    redirect(
      `/admin/regulator-champions/topics/${topicId}?error=content-save`,
    );
  }

  revalidatePath(
    `/admin/regulator-champions/topics/${topicId}`,
  );

  redirect(
    `/admin/regulator-champions/topics/${topicId}?contentAdded=1`,
  );
}

async function deleteContent(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const topicId =
    String(
      formData.get(
        'topicId',
      ) || '',
    ).trim();

  const contentId =
    String(
      formData.get(
        'contentId',
      ) || '',
    ).trim();

  if (
    !topicId ||
    !contentId
  ) {
    return;
  }

  const supabase =
    getSupabaseAdmin();

  const {
    error,
  } =
    await supabase
      .from(
        'rc_topic_content',
      )
      .delete()
      .eq(
        'id',
        contentId,
      )
      .eq(
        'topic_id',
        topicId,
      );

  if (error) {
    console.error(
      'Could not delete topic content:',
      error,
    );

    redirect(
      `/admin/regulator-champions/topics/${topicId}?error=delete-content`,
    );
  }

  revalidatePath(
    `/admin/regulator-champions/topics/${topicId}`,
  );

  redirect(
    `/admin/regulator-champions/topics/${topicId}?contentDeleted=1`,
  );
}

async function setTopicStatus(
  formData: FormData,
) {
  'use server';

  await requireAdminAccess();

  const topicId =
    String(
      formData.get(
        'topicId',
      ) || '',
    ).trim();

  const status =
    String(
      formData.get(
        'status',
      ) || '',
    ).trim();

  if (
    !topicId ||
    ![
      'draft',
      'published',
    ].includes(
      status,
    )
  ) {
    return;
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
      .update({
        status,

        updated_at:
          new Date()
            .toISOString(),
      })
      .eq(
        'id',
        topicId,
      );

  if (error) {
    console.error(
      'Could not change topic status:',
      error,
    );

    redirect(
      `/admin/regulator-champions/topics/${topicId}?error=status`,
    );
  }

  revalidatePath(
    `/admin/regulator-champions/topics/${topicId}`,
  );

  revalidatePath(
    '/admin/regulator-champions/topics',
  );

  redirect(
    `/admin/regulator-champions/topics/${topicId}?statusChanged=1`,
  );
}

export default async function TopicAdminPage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    saved?: string;
    contentAdded?: string;
    contentDeleted?: string;
    statusChanged?: string;
    error?: string;
  }>;
}) {
  await requireAdminAccess();

  const {
    id,
  } =
    await params;

  const query =
    await searchParams;

  const supabase =
    getSupabaseAdmin();

  const [
    topicResponse,
    contentResponse,
  ] =
    await Promise.all([
      supabase
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
            zoom_url
          `,
        )
        .eq(
          'id',
          id,
        )
        .single(),

      supabase
        .from(
          'rc_topic_content',
        )
        .select(
          `
            id,
            topic_id,
            content_type,
            title,
            url,
            body_text,
            sort_order,
            status,
            notify_educators,
            created_at
          `,
        )
        .eq(
          'topic_id',
          id,
        )
        .order(
          'sort_order',
          {
            ascending:
              true,
          },
        ),
    ]);

  if (
    topicResponse.error ||
    !topicResponse.data
  ) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-5 py-14 text-[#12362F]">
        <section className="mx-auto max-w-2xl rounded-3xl border border-[#E5DED4] bg-white p-8">
          <h1 className="text-3xl font-extrabold">
            Topic not found
          </h1>

          <a
            href="/admin/regulator-champions/topics"
            className="mt-6 inline-flex rounded-xl bg-[#12362F] px-5 py-3 text-sm font-bold text-white"
          >
            Back to topics
          </a>
        </section>
      </main>
    );
  }

  const topic =
    topicResponse.data as Topic;

  const content =
    (
      contentResponse.data ??
      []
    ) as TopicContent[];

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-8 text-[#12362F] md:px-6 md:py-12">
      <section className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}

        <div className="flex flex-col gap-5 border-b border-[#E5DED4] pb-7 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Topic{' '}
              {
                topic.sort_order
              }
            </p>

            <h1 className="mt-2 max-w-4xl text-3xl font-extrabold md:text-5xl">
              {
                topic.title
              }
            </h1>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span
                className={`rounded-full px-3 py-1 font-bold ${
                  topic.status ===
                  'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-[#FAF5EC] text-[#8A6F3E]'
                }`}
              >
                {
                  topic.status
                }
              </span>

              <span className="rounded-full bg-white px-3 py-1 font-semibold text-[#5E6D67]">
                {
                  formatDateTime(
                    topic.live_date,
                  )
                }
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="/admin/regulator-champions/topics"
              className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-3 text-sm font-bold text-[#12362F]"
            >
              All topics
            </a>

            <a
              href={`/platform/educator/topics/${topic.slug}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-3 text-sm font-bold text-[#12362F]"
            >
              Preview educator page
            </a>
          </div>
        </div>

        {/* FEEDBACK */}

        {query.saved ===
          '1' && (
          <SuccessMessage>
            Topic details saved.
          </SuccessMessage>
        )}

        {query.contentAdded ===
          '1' && (
          <SuccessMessage>
            Content added to this
            topic.
          </SuccessMessage>
        )}

        {query.contentDeleted ===
          '1' && (
          <SuccessMessage>
            Content removed.
          </SuccessMessage>
        )}

        {query.statusChanged ===
          '1' && (
          <SuccessMessage>
            Topic status updated.
          </SuccessMessage>
        )}

        {query.error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
            Something could not be
            saved. Check the details
            and try again.
          </div>
        ) : null}

        {/* PUBLISH CONTROL */}

        <section
          className={`rounded-3xl border p-6 ${
            topic.status ===
            'published'
              ? 'border-emerald-200 bg-emerald-50'
              : 'border-[#E5DED4] bg-white'
          }`}
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-extrabold">
                {topic.status ===
                'published'
                  ? 'This topic is visible to educators.'
                  : 'This topic is still a draft.'}
              </p>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-[#5E6D67]">
                {topic.status ===
                'published'
                  ? 'You can keep editing the topic after publishing. Existing educator progress and certificates are not removed.'
                  : 'Finish the topic details and resources first, then publish it when you are ready for educators to see it.'}
              </p>
            </div>

            <form
              action={
                setTopicStatus
              }
            >
              <input
                type="hidden"
                name="topicId"
                value={topic.id}
              />

              <input
                type="hidden"
                name="status"
                value={
                  topic.status ===
                  'published'
                    ? 'draft'
                    : 'published'
                }
              />

              <button
                type="submit"
                className={
                  topic.status ===
                  'published'
                    ? 'min-h-12 rounded-xl border border-[#D8D2C9] bg-white px-5 py-3 text-sm font-extrabold text-[#12362F]'
                    : 'min-h-12 rounded-xl bg-[#12362F] px-5 py-3 text-sm font-extrabold text-white'
                }
              >
                {topic.status ===
                'published'
                  ? 'Unpublish topic'
                  : 'Publish topic'}
              </button>
            </form>
          </div>
        </section>

        {/* EDIT TOPIC */}

        <section className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm md:p-9">
          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
            Topic setup
          </p>

          <h2 className="mt-2 text-2xl font-extrabold">
            Edit topic details
          </h2>

          <form
            action={updateTopic}
            className="mt-7 space-y-6"
          >
            <input
              type="hidden"
              name="id"
              value={topic.id}
            />

            <div className="grid gap-5 md:grid-cols-[140px_1fr]">
              <FormField
                label="Topic number"
              >
                <input
                  type="number"
                  name="sortOrder"
                  required
                  min="1"
                  defaultValue={
                    topic.sort_order
                  }
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
                />
              </FormField>

              <FormField
                label="Topic title"
              >
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={
                    topic.title
                  }
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
                />
              </FormField>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <FormField
                label="Live date and time"
              >
                <input
                  type="datetime-local"
                  name="liveDate"
                  defaultValue={toDateTimeLocal(
                    topic.live_date,
                  )}
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
                />

                <p className="mt-2 text-xs text-[#6B7772]">
                  Enter using Melbourne
                  time.
                </p>
              </FormField>

              <FormField
                label="Zoom link"
              >
                <input
                  type="url"
                  name="zoomUrl"
                  defaultValue={
                    topic.zoom_url ||
                    ''
                  }
                  placeholder="https://..."
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
                />
              </FormField>
            </div>

            <FormField
              label="Why this matters"
            >
              <textarea
                name="whyThisMatters"
                rows={4}
                defaultValue={
                  topic.why_this_matters ||
                  ''
                }
                className="w-full rounded-xl border border-[#D8D2C9] bg-white p-4 text-[#12362F]"
              />
            </FormField>

            <FormField
              label="Main reflection question"
            >
              <textarea
                name="reflectionQuestion"
                rows={3}
                defaultValue={
                  topic.reflection_question ||
                  ''
                }
                className="w-full rounded-xl border border-[#D8D2C9] bg-white p-4 text-[#12362F]"
              />
            </FormField>

            <div className="flex justify-end border-t border-[#E5DED4] pt-6">
              <button
                type="submit"
                className="min-h-14 rounded-2xl bg-[#12362F] px-7 py-3 text-sm font-extrabold text-white"
              >
                Save topic details
              </button>
            </div>
          </form>
        </section>

        {/* CURRENT CONTENT */}

        <section className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm md:p-9">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                Learning content
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Recording & resources
              </h2>
            </div>

            <p className="text-sm font-bold text-[#6B7772]">
              {content.length}{' '}
              {content.length ===
              1
                ? 'item'
                : 'items'}
            </p>
          </div>

          <div className="mt-7 space-y-4">
            {content.length ===
            0 ? (
              <div className="rounded-2xl bg-[#FAF8F5] p-6 text-sm leading-6 text-[#5E6D67]">
                Nothing has been
                added yet. Add the
                webinar recording,
                practical resources
                or supporting text
                below.
              </div>
            ) : (
              content.map(
                (
                  item,
                ) => (
                  <article
                    key={
                      item.id
                    }
                    className="rounded-2xl border border-[#E5DED4] p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full bg-[#FAF5EC] px-3 py-1 text-xs font-bold uppercase text-[#8A6F3E]">
                            {
                              item.content_type
                            }
                          </span>

                          <span className="rounded-full bg-[#F1F4F2] px-3 py-1 text-xs font-bold text-[#5E6D67]">
                            Order{' '}
                            {
                              item.sort_order
                            }
                          </span>

                          {item.notify_educators ? (
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                              Notify educators
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-lg font-extrabold">
                          {
                            item.title
                          }
                        </h3>

                        {item.url ? (
                          <a
                            href={
                              item.url
                            }
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 block break-all text-sm font-semibold text-[#8A6F3E] underline"
                          >
                            {
                              item.url
                            }
                          </a>
                        ) : null}

                        {item.body_text ? (
                          <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#5E6D67]">
                            {
                              item.body_text
                            }
                          </p>
                        ) : null}
                      </div>

                      <form
                        action={
                          deleteContent
                        }
                      >
                        <input
                          type="hidden"
                          name="topicId"
                          value={
                            topic.id
                          }
                        />

                        <input
                          type="hidden"
                          name="contentId"
                          value={
                            item.id
                          }
                        />

                        <button
                          type="submit"
                          className="rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-sm font-bold text-rose-700"
                        >
                          Remove
                        </button>
                      </form>
                    </div>
                  </article>
                ),
              )
            )}
          </div>
        </section>

        {/* ADD CONTENT */}

        <section className="rounded-4xl border border-[#E5DED4] bg-[#FAF5EC] p-6 md:p-9">
          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
            Add content
          </p>

          <h2 className="mt-2 text-2xl font-extrabold">
            Add a recording,
            resource or text block
          </h2>

          <form
            action={addContent}
            className="mt-7 space-y-6"
          >
            <input
              type="hidden"
              name="topicId"
              value={topic.id}
            />

            <div className="grid gap-5 md:grid-cols-[200px_1fr_120px]">
              <FormField
                label="Content type"
              >
                <select
                  name="contentType"
                  required
                  defaultValue="resource"
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
                >
                  <option value="video">
                    Video / recording
                  </option>

                  <option value="resource">
                    Resource / PDF / link
                  </option>

                  <option value="text">
                    Text
                  </option>
                </select>
              </FormField>

              <FormField
                label="Title"
              >
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="For example: Webinar recording"
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
                />
              </FormField>

              <FormField
                label="Order"
              >
                <input
                  type="number"
                  name="sortOrder"
                  min="1"
                  required
                  defaultValue={
                    content.length +
                    1
                  }
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
                />
              </FormField>
            </div>

            <FormField
              label="URL"
            >
              <input
                type="url"
                name="url"
                placeholder="YouTube, Supabase PDF URL or another resource link"
                className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-[#12362F]"
              />

              <p className="mt-2 text-xs leading-5 text-[#6B7772]">
                Leave this blank only
                when the content type
                is Text.
              </p>
            </FormField>

            <FormField
              label="Text content"
            >
              <textarea
                name="bodyText"
                rows={5}
                placeholder="Use this when adding a text block. You can leave it blank for videos and downloadable resources."
                className="w-full rounded-xl border border-[#D8D2C9] bg-white p-4 text-[#12362F]"
              />
            </FormField>

            <label className="flex items-start gap-3 rounded-2xl border border-[#DED5C7] bg-white p-5">
              <input
                type="checkbox"
                name="notifyEducators"
                className="mt-1 h-5 w-5"
              />

              <span>
                <span className="block font-extrabold">
                  Notify educators
                </span>

                <span className="mt-1 block text-sm leading-6 text-[#5E6D67]">
                  Save that this
                  resource should
                  trigger an in-app
                  notification. We
                  will connect the
                  actual notification
                  creation later.
                </span>
              </span>
            </label>

            <div className="flex justify-end border-t border-[#DED5C7] pt-6">
              <button
                type="submit"
                className="min-h-14 rounded-2xl bg-[#12362F] px-7 py-3 text-sm font-extrabold text-white"
              >
                Add content
              </button>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}

function SuccessMessage({
  children,
}: {
  children:
    React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
      {children}
    </div>
  );
}

function FormField({
  label,
  children,
}: {
  label: string;
  children:
    React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold">
        {label}
      </span>

      {children}
    </label>
  );
}