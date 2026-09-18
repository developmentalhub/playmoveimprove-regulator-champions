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

type CompletedTopic = {
  topic_id: string;
  completed_at: string;
};

type Topic = {
  id: string;
  title: string;
  slug: string;
  sort_order: number;
};

type Certificate = {
  id: string;
  topic_id: string;
  topic_title: string;
  cpd_hours: number;
  completion_date: string;
  certificate_file_path:
    | string
    | null;
};

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone:
        'Australia/Melbourne',
    },
  ).format(
    new Date(value),
  );
}

function formatHours(
  value: number,
) {
  if (
    Number.isInteger(value)
  ) {
    return `${value}`;
  }

  return value.toFixed(1);
}

export default async function CertificatesPage() {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access?returnTo=/platform/educator/certificates',
    );
  }

  if (
    auth.member.role ===
    'manager'
  ) {
    redirect(
      '/platform/manager/dashboard',
    );
  }

  await touchRcMemberLastSeen(
    auth.member.id,
  );

  const supabase =
    createRcAdminClient();

  const [
    progressResponse,
    topicsResponse,
    certificatesResponse,
  ] = await Promise.all([
    supabase
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
        auth.member.id,
      )
      .not(
        'completed_at',
        'is',
        null,
      ),

    supabase
      .from(
        'rc_topics',
      )
      .select(
        `
          id,
          title,
          slug,
          sort_order
        `,
      )
      .order(
        'sort_order',
        {
          ascending: true,
        },
      ),

    supabase
      .from(
        'rc_certificates',
      )
      .select(
        `
          id,
          topic_id,
          topic_title,
          cpd_hours,
          completion_date,
          certificate_file_path
        `,
      )
      .eq(
        'member_id',
        auth.member.id,
      ),
  ]);

  if (
    progressResponse.error
  ) {
    console.error(
      'Could not load completed topics:',
      progressResponse.error,
    );
  }

  if (
    topicsResponse.error
  ) {
    console.error(
      'Could not load topics:',
      topicsResponse.error,
    );
  }

  if (
    certificatesResponse.error
  ) {
    console.error(
      'Could not load certificates:',
      certificatesResponse.error,
    );
  }

  const completed =
    (progressResponse.data ??
      []) as CompletedTopic[];

  const topics =
    (topicsResponse.data ??
      []) as Topic[];

  const certificates =
    (certificatesResponse.data ??
      []) as Certificate[];

  const topicsById =
    new Map(
      topics.map(
        (topic) => [
          topic.id,
          topic,
        ],
      ),
    );

  const certificateByTopic =
    new Map(
      certificates.map(
        (certificate) => [
          certificate.topic_id,
          certificate,
        ],
      ),
    );

  const completedItems =
    completed
      .map(
        (progress) => {
          const topic =
            topicsById.get(
              progress.topic_id,
            );

          if (!topic) {
            return null;
          }

          return {
            topic,
            progress,
            certificate:
              certificateByTopic.get(
                topic.id,
              ) ?? null,
          };
        },
      )
      .filter(
        (
          item,
        ): item is NonNullable<
          typeof item
        > =>
          item !== null,
      )
      .sort(
        (a, b) =>
          a.topic.sort_order -
          b.topic.sort_order,
      );

  const totalHours =
    completedItems.length *
    1.5;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <header className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
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

      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-6 sm:py-10">
        <section>
          <Link
            href="/platform/educator/dashboard"
            className="text-sm font-extrabold text-[#8A6F3E]"
          >
            ← Back to dashboard
          </Link>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            Your professional learning
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
            Certificates
          </h1>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#657B6C]">
            Each completed Regulator
            Champions topic provides
            1.5 hours of professional
            development. Your
            certificates remain here
            so you can return and
            download them whenever
            you need them.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Topics completed"
            value={`${completedItems.length} of 12`}
          />

          <SummaryCard
            label="CPD hours"
            value={`${formatHours(
              totalHours,
            )} of 18`}
          />

          <SummaryCard
            label="Service"
            value={
              auth.service
                .service_name
            }
            smaller
          />
        </section>

        <section>
          {completedItems.length ===
          0 ? (
            <div className="rounded-4xl border border-[#E6E2DC] bg-white p-7 shadow-sm sm:p-8">
              <h2 className="text-2xl font-bold">
                Your certificates will
                appear here.
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-[#657B6C]">
                Complete a topic&apos;s
                webinar learning,
                resources and reflection
                to unlock its certificate.
              </p>

              <Link
                href="/platform/educator/dashboard"
                className="mt-6 inline-flex rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white"
              >
                Return to my learning
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {completedItems.map(
                ({
                  topic,
                  progress,
                  certificate,
                }) => (
                  <article
                    key={
                      topic.id
                    }
                    className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-7"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                          Topic{' '}
                          {
                            topic.sort_order
                          }
                        </p>

                        <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                          {
                            topic.title
                          }
                        </h2>

                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#657B6C]">
                          <p>
                            <strong className="text-[#1C3B34]">
                              Completed:
                            </strong>{' '}
                            {formatDate(
                              progress.completed_at,
                            )}
                          </p>

                          <p>
                            <strong className="text-[#1C3B34]">
                              CPD:
                            </strong>{' '}
                            1.5 hours
                          </p>
                        </div>

                        {certificate ? (
                          <p className="mt-3 text-xs font-semibold text-[#657B6C]">
                            Certificate
                            record saved
                          </p>
                        ) : (
                          <p className="mt-3 text-xs font-semibold text-[#8A6F3E]">
                            Your
                            certificate
                            will be
                            created when
                            you download
                            it.
                          </p>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Link
                          href={`/platform/educator/topics/${topic.slug}`}
                          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#1C3B34] px-5 py-3 text-sm font-extrabold text-[#1C3B34]"
                        >
                          Review topic
                        </Link>

                        <a
                          href={`/api/rc-certificate/${topic.id}`}
                          className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white"
                        >
                          Download
                          certificate
                        </a>
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}
        </section>

        {completedItems.length >
        0 ? (
          <section className="rounded-3xl bg-[#FAF5EC] p-6">
            <p className="font-bold">
              Your certificate details
            </p>

            <p className="mt-2 max-w-4xl text-sm leading-6 text-[#657B6C]">
              Certificates include
              your name, service,
              topic, actual completion
              date, 1.5 professional
              development hours and
              Robyn Papworth as
              presenter.
            </p>
          </section>
        ) : null}
      </main>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  smaller = false,
}: {
  label: string;
  value: string;
  smaller?: boolean;
}) {
  return (
    <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6 shadow-sm">
      <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
        {label}
      </p>

      <p
        className={`mt-2 font-black ${
          smaller
            ? 'text-xl'
            : 'text-3xl'
        }`}
      >
        {value}
      </p>
    </article>
  );
}