import Link from 'next/link';
import { redirect } from 'next/navigation';

import MemberSignOutButton from '@/components/MemberSignOutButton';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

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
  status: string;
  live_date:
    | string
    | null;
  zoom_url:
    | string
    | null;
};

type TopicProgress = {
  topic_id: string;
  started_at:
    | string
    | null;
  video_completed: boolean;
  resources_reviewed: boolean;
  reflection_completed: boolean;
  completed_at:
    | string
    | null;
};

type TopicState =
  | 'complete'
  | 'in-progress'
  | 'available'
  | 'locked';

function formatMelbourneDate(
  value:
    | string
    | null,
) {
  if (!value) {
    return null;
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      weekday:
        'long',
      day:
        'numeric',
      month:
        'long',
      year:
        'numeric',
      hour:
        'numeric',
      minute:
        '2-digit',
      timeZone:
        'Australia/Melbourne',
      timeZoneName:
        'short',
    },
  ).format(
    new Date(value),
  );
}

function getTopicState({
  index,
  progress,
  previousComplete,
}: {
  index: number;
  progress:
    | TopicProgress
    | undefined;
  previousComplete: boolean;
}): TopicState {
  if (
    progress?.completed_at
  ) {
    return 'complete';
  }

  if (
    progress?.started_at
  ) {
    return 'in-progress';
  }

  if (
    index === 0 ||
    previousComplete
  ) {
    return 'available';
  }

  return 'locked';
}

export default async function EducatorDashboardPage() {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access?returnTo=/platform/educator/dashboard',
    );
  }

  await touchRcMemberLastSeen(
    auth.member.id,
  );

  const supabase =
    createRcAdminClient();

  const [
    topicsResponse,
    progressResponse,
  ] = await Promise.all([
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
          status,
          live_date,
          zoom_url
        `,
      )
      .eq(
        'status',
        'published',
      )
      .order(
        'sort_order',
        {
          ascending:
            true,
        },
      ),

    supabase
      .from(
        'rc_topic_progress',
      )
      .select(
        `
          topic_id,
          started_at,
          video_completed,
          resources_reviewed,
          reflection_completed,
          completed_at
        `,
      )
      .eq(
        'member_id',
        auth.member.id,
      ),
  ]);

  if (
    topicsResponse.error
  ) {
    console.error(
      'Could not load Regulator Champions topics:',
      topicsResponse.error,
    );
  }

  if (
    progressResponse.error
  ) {
    console.error(
      'Could not load educator topic progress:',
      progressResponse.error,
    );
  }

  const topics =
    (topicsResponse.data ??
      []) as Topic[];

  const progress =
    (progressResponse.data ??
      []) as TopicProgress[];

  const progressByTopic =
    new Map(
      progress.map(
        (item) => [
          item.topic_id,
          item,
        ],
      ),
    );

  const completedTopics =
    progress.filter(
      (item) =>
        Boolean(
          item.completed_at,
        ),
    ).length;

  const completedHours =
    completedTopics *
    1.5;

  const currentTopic =
    topics.find(
      (
        topic,
        index,
      ) => {
        const item =
          progressByTopic.get(
            topic.id,
          );

        const previousTopic =
          index > 0
            ? topics[
                index - 1
              ]
            : null;

        const previousProgress =
          previousTopic
            ? progressByTopic.get(
                previousTopic.id,
              )
            : null;

        const state =
          getTopicState({
            index,
            progress:
              item,
            previousComplete:
              index ===
                0 ||
              Boolean(
                previousProgress
                  ?.completed_at,
              ),
          });

        return (
          state ===
            'available' ||
          state ===
            'in-progress'
        );
      },
    ) ?? null;

  const currentProgress =
    currentTopic
      ? progressByTopic.get(
          currentTopic.id,
        )
      : null;

  const nextLiveTopic =
    topics
      .filter(
        (topic) =>
          topic.live_date &&
          new Date(
            topic.live_date,
          ).getTime() >
            Date.now(),
      )
      .sort(
        (
          a,
          b,
        ) =>
          new Date(
            a.live_date as string,
          ).getTime() -
          new Date(
            b.live_date as string,
          ).getTime(),
      )[0] ?? null;

  const firstName =
    auth.member
      .full_name
      ?.split(' ')[0] ||
    null;

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#232150]">
      {/* TOP BAR */}
      <header className="border-b border-[#E3DFEB] bg-white">
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#87317E]">
              Educator workspace
            </p>

            <p className="mt-1 text-sm font-normal text-[#706E83]">
              Regulator Champions
            </p>
          </div>

          <MemberSignOutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-8 sm:py-10">
        {/* WELCOME */}
        <section>
          <p className="text-sm font-bold text-[#87317E]">
            {
              auth.service
                .service_name
            }
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
            {firstName
              ? `Welcome back, ${firstName}`
              : 'Welcome back'}
          </h1>

          <p className="mt-4 max-w-3xl text-lg font-normal leading-8 text-[#4C4A68]">
            You do not need to
            work out where to
            start. Your next
            available learning
            topic is shown below,
            and everything you
            save stays connected
            to your own account.
          </p>
        </section>

        {/* SIMPLE PROGRESS */}
        <section className="flex flex-wrap gap-3">
          <div className="rounded-2xl border border-[#E3DFEB] bg-white px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#87317E]">
              Topics completed
            </p>

            <p className="mt-1 text-xl font-bold">
              {completedTopics}{' '}
              of 12
            </p>
          </div>

          <div className="rounded-2xl border border-[#E3DFEB] bg-white px-5 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-[#87317E]">
              CPD completed
            </p>

            <p className="mt-1 text-xl font-bold">
              {completedHours}{' '}
              of 18 hours
            </p>
          </div>
        </section>

        {/* ONE CLEAR NEXT STEP */}
        <section className="overflow-hidden rounded-3xl border border-[#DAD6E5] bg-white shadow-sm">
          <div className="border-b border-[#E3DFEB] bg-[#E8F5EF] px-6 py-4 sm:px-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#232150]">
              Continue here
            </p>
          </div>

          <div className="p-6 sm:p-8">
            {currentTopic ? (
              <>
                <p className="text-sm font-bold text-[#87317E]">
                  Topic{' '}
                  {
                    currentTopic.sort_order
                  }
                </p>

                <h2 className="mt-2 max-w-3xl text-2xl font-bold sm:text-3xl">
                  {
                    currentTopic.title
                  }
                </h2>

                {currentTopic.why_this_matters ? (
                  <p className="mt-4 max-w-3xl font-normal leading-7 text-[#4C4A68]">
                    {
                      currentTopic.why_this_matters
                    }
                  </p>
                ) : null}

                <div className="mt-6 rounded-2xl bg-[#F8F6FB] p-5">
                  <p className="font-bold text-[#232150]">
                    What you need
                    to do
                  </p>

                  <p className="mt-2 font-normal leading-7 text-[#4C4A68]">
                    Open the topic,
                    work through the
                    learning and
                    resources, save
                    your three key
                    takeaways, then
                    complete your
                    short reflection.
                    Your certificate
                    becomes available
                    once the topic is
                    complete.
                  </p>
                </div>

                <Link
                  href={`/platform/educator/topics/${currentTopic.slug}`}
                  className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#232150] px-6 py-3 text-base font-bold text-white transition hover:bg-[#19173F]"
                >
                  {currentProgress
                    ?.started_at
                    ? 'Continue this topic →'
                    : 'Start this topic →'}
                </Link>
              </>
            ) : (
              <>
                <p className="text-sm font-bold text-[#87317E]">
                  Learning complete
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  You have
                  completed all
                  available topics.
                </h2>

                <p className="mt-4 max-w-2xl font-normal leading-7 text-[#4C4A68]">
                  Your completed
                  learning remains
                  available below,
                  and you can return
                  to your
                  certificates or
                  professional
                  learning reports
                  whenever you need
                  them.
                </p>

                <Link
                  href="/platform/educator/certificates"
                  className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[#232150] px-6 py-3 text-base font-bold text-white"
                >
                  View my
                  certificates →
                </Link>
              </>
            )}
          </div>
        </section>

        {/* LIVE SESSION */}
        {nextLiveTopic ? (
          <section className="rounded-3xl bg-[#232150] p-6 text-white sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#DCCDA8]">
              Next live session
            </p>

            <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              {
                nextLiveTopic.title
              }
            </h2>

            <p className="mt-3 font-normal text-white/85">
              {formatMelbourneDate(
                nextLiveTopic.live_date,
              )}
            </p>

            <p className="mt-4 max-w-3xl font-normal leading-7 text-white/80">
              Come along live if
              you can. If the timing
              does not suit you, the
              recording will be
              added to your learning
              area afterwards.
            </p>

            {nextLiveTopic.zoom_url ? (
              <a
                href={
                  nextLiveTopic.zoom_url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[#61B694] px-5 py-3 text-sm font-bold text-[#232150] transition hover:bg-[#449B7B]"
              >
                Join live session →
              </a>
            ) : null}
          </section>
        ) : null}

        {/* TOPICS */}
        <section
          id="learning-topics"
        >
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
              Your learning
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              All learning topics
            </h2>

            <p className="mt-3 max-w-3xl font-normal leading-7 text-[#4C4A68]">
              You can always see
              where you are up to.
              Complete your current
              topic to open the next
              one.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            {topics.map(
              (
                topic,
                index,
              ) => {
                const item =
                  progressByTopic.get(
                    topic.id,
                  );

                const previousTopic =
                  index > 0
                    ? topics[
                        index -
                          1
                      ]
                    : null;

                const previousProgress =
                  previousTopic
                    ? progressByTopic.get(
                        previousTopic.id,
                      )
                    : null;

                const state =
                  getTopicState({
                    index,
                    progress:
                      item,
                    previousComplete:
                      index ===
                        0 ||
                      Boolean(
                        previousProgress
                          ?.completed_at,
                      ),
                  });

                return (
                  <TopicRow
                    key={
                      topic.id
                    }
                    topic={
                      topic
                    }
                    state={
                      state
                    }
                  />
                );
              },
            )}

            {topics.length ===
            0 ? (
              <div className="rounded-3xl border border-[#E3DFEB] bg-white p-6">
                <p className="font-normal leading-7 text-[#4C4A68]">
                  Your 2027
                  learning topics
                  will appear here
                  as they are
                  published.
                </p>
              </div>
            ) : null}
          </div>
        </section>

        {/* RECORDS */}
        <section className="rounded-3xl border border-[#E3DFEB] bg-white p-6 sm:p-8">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
            Your records
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Find your completed
            learning
          </h2>

          <p className="mt-3 max-w-2xl font-normal leading-7 text-[#4C4A68]">
            Use these areas when
            you need evidence of
            your learning or want
            to see recent program
            updates.
          </p>

          <div className="mt-6 divide-y divide-[#E3DFEB] border-y border-[#E3DFEB]">
            <RecordLink
              href="/platform/educator/certificates"
              title="Certificates"
              text="Download certificates for topics you have completed."
              action="View certificates"
            />

            <RecordLink
              href="/platform/educator/reports"
              title="Professional learning reports"
              text="Bring your completed CPD and selected learning takeaways together."
              action="View reports"
            />

            <RecordLink
              href="/platform/educator/notifications"
              title="Notifications"
              text="See new topics, recordings, resources and program updates."
              action="View notifications"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function TopicRow({
  topic,
  state,
}: {
  topic: Topic;
  state: TopicState;
}) {
  const available =
    state !== 'locked';

  const actionLabel =
    state === 'complete'
      ? 'Review'
      : state ===
          'in-progress'
        ? 'Continue'
        : 'Start';

  return (
    <article
      className={`rounded-2xl border p-5 ${
        state ===
        'complete'
          ? 'border-[#B9DDCE] bg-[#F0F8F4]'
          : state ===
              'locked'
            ? 'border-[#E3DFEB] bg-[#F2F0F5]'
            : 'border-[#E3DFEB] bg-white'
      }`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-bold uppercase tracking-wider text-[#87317E]">
              Topic{' '}
              {
                topic.sort_order
              }
            </p>

            <StatusPill
              state={
                state
              }
            />
          </div>

          <h3 className="mt-2 text-lg font-bold text-[#232150]">
            {
              topic.title
            }
          </h3>

          {state ===
          'locked' ? (
            <p className="mt-2 text-sm font-normal text-[#706E83]">
              Finish the
              previous topic to
              open this one.
            </p>
          ) : null}
        </div>

        {available ? (
          <Link
            href={`/platform/educator/topics/${topic.slug}`}
            className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-[#232150] px-4 py-2 text-sm font-bold text-[#232150] transition hover:bg-[#232150] hover:text-white"
          >
            {actionLabel}{' '}
            →
          </Link>
        ) : (
          <span className="text-sm font-medium text-[#8A879A]">
            Not available
            yet
          </span>
        )}
      </div>
    </article>
  );
}

function StatusPill({
  state,
}: {
  state: TopicState;
}) {
  const labels: Record<
    TopicState,
    string
  > = {
    complete:
      'Complete',
    'in-progress':
      'In progress',
    available:
      'Ready',
    locked:
      'Later',
  };

  const styles: Record<
    TopicState,
    string
  > = {
    complete:
      'bg-[#DDF1E8] text-[#232150]',
    'in-progress':
      'bg-[#F4EDDD] text-[#232150]',
    available:
      'bg-[#E8F5EF] text-[#232150]',
    locked:
      'bg-[#E7E5EA] text-[#706E83]',
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold ${styles[state]}`}
    >
      {labels[state]}
    </span>
  );
}

function RecordLink({
  href,
  title,
  text,
  action,
}: {
  href: string;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center"
    >
      <div>
        <h3 className="font-bold text-[#232150]">
          {title}
        </h3>

        <p className="mt-1 text-sm font-normal leading-6 text-[#706E83]">
          {text}
        </p>
      </div>

      <span className="text-sm font-bold text-[#87317E] group-hover:underline">
        {action} →
      </span>
    </Link>
  );
}