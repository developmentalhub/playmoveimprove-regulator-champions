import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createClient as createSupabaseAdminClient,
} from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

type MonthlyQuestion = {
  id: string;
  first_name: string;
  service_name: string;
  what_noticing: string;
  what_tried: string | null;
  help_understanding: string | null;
  month_key: string;
  status: string;
  created_at: string;
};

type SessionVote = {
  id: string;
  month_key: string;
  first_name: string;
  service_name: string;
  preferred_days: string[];
  preferred_times: string[];
  other_time: string | null;
  attendance_preference: string;
  created_at: string;
};

const DAY_ORDER = [
  'Tuesday',
  'Wednesday',
  'Thursday',
];

const TIME_ORDER = [
  '10:00 am',
  '12:00 pm',
  '1:00 pm',
  '3:30 pm',
  '4:00 pm',
  'Other',
];

const ATTENDANCE_ORDER = [
  'Live individually',
  'Live with colleagues',
  'Recording afterwards',
  'A mixture depending on the month',
];

function getSupabaseAdmin() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL environment variable.',
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      'Missing SUPABASE_SERVICE_ROLE_KEY environment variable.',
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
      'Missing REGULATOR_ADMIN_TOKEN environment variable.',
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
  value: string,
) {
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

function countSelections(
  votes: SessionVote[],
  field:
    | 'preferred_days'
    | 'preferred_times',
) {
  const totals =
    new Map<string, number>();

  votes.forEach((vote) => {
    const values =
      vote[field] ?? [];

    values.forEach((value) => {
      totals.set(
        value,
        (totals.get(value) ?? 0) +
          1,
      );
    });
  });

  return totals;
}

function countAttendance(
  votes: SessionVote[],
) {
  const totals =
    new Map<string, number>();

  votes.forEach((vote) => {
    if (
      !vote.attendance_preference
    ) {
      return;
    }

    totals.set(
      vote.attendance_preference,
      (totals.get(
        vote.attendance_preference,
      ) ?? 0) + 1,
    );
  });

  return totals;
}

function getHighestCount(
  totals: Map<string, number>,
) {
  if (totals.size === 0) {
    return 0;
  }

  return Math.max(
    ...Array.from(
      totals.values(),
    ),
  );
}

function ResultBar({
  label,
  count,
  maximum,
}: {
  label: string;
  count: number;
  maximum: number;
}) {
  const percentage =
    maximum > 0
      ? Math.max(
          8,
          Math.round(
            (count / maximum) * 100,
          ),
        )
      : 0;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4 text-sm">
        <span className="font-semibold text-[#1C3B34]">
          {label}
        </span>

        <span className="shrink-0 font-bold text-[#657B6C]">
          {count}{' '}
          {count === 1
            ? 'vote'
            : 'votes'}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-[#EEEAE4]">
        {count > 0 && (
          <div
            className="h-full rounded-full bg-[#657B6C]"
            style={{
              width: `${percentage}%`,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default async function RegulatorChampionsAdminPage() {
  await requireAdminAccess();

  const supabase =
    getSupabaseAdmin();

  const [
    questionsResponse,
    votesResponse,
  ] = await Promise.all([
    supabase
      .from(
        'regulator_champion_questions',
      )
      .select(
        `
          id,
          first_name,
          service_name,
          what_noticing,
          what_tried,
          help_understanding,
          month_key,
          status,
          created_at
        `,
      )
      .eq(
        'month_key',
        '2026-09',
      )
      .order(
        'created_at',
        {
          ascending: false,
        },
      ),

    supabase
      .from(
        'regulator_champion_session_votes',
      )
      .select(
        `
          id,
          month_key,
          first_name,
          service_name,
          preferred_days,
          preferred_times,
          other_time,
          attendance_preference,
          created_at
        `,
      )
      .eq(
        'month_key',
        '2026-09',
      )
      .order(
        'created_at',
        {
          ascending: false,
        },
      ),
  ]);

  if (questionsResponse.error) {
    console.error(
      'Could not load Regulator Champions questions:',
      questionsResponse.error,
    );
  }

  if (votesResponse.error) {
    console.error(
      'Could not load Regulator Champions session votes:',
      votesResponse.error,
    );
  }

  const questions =
    (questionsResponse.data ??
      []) as MonthlyQuestion[];

  const votes =
    (votesResponse.data ??
      []) as SessionVote[];

  const dayTotals =
    countSelections(
      votes,
      'preferred_days',
    );

  const timeTotals =
    countSelections(
      votes,
      'preferred_times',
    );

  const attendanceTotals =
    countAttendance(votes);

  const highestDayCount =
    getHighestCount(
      dayTotals,
    );

  const highestTimeCount =
    getHighestCount(
      timeTotals,
    );

  const highestAttendanceCount =
    getHighestCount(
      attendanceTotals,
    );

  const topDays =
    DAY_ORDER.filter(
      (day) =>
        highestDayCount > 0 &&
        dayTotals.get(day) ===
          highestDayCount,
    );

  const topTimes =
    TIME_ORDER.filter(
      (time) =>
        highestTimeCount > 0 &&
        timeTotals.get(time) ===
          highestTimeCount,
    );

  const otherTimes =
    votes
      .filter(
        (vote) =>
          vote.preferred_times?.includes(
            'Other',
          ) &&
          vote.other_time,
      )
      .map((vote) => ({
        firstName:
          vote.first_name,
        serviceName:
          vote.service_name,
        value:
          vote.other_time as string,
      }));

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-8 text-[#1C3B34] md:px-6 md:py-12">
      <section className="mx-auto max-w-6xl space-y-8">
        <div>
          <div className="mb-6 flex justify-end">
            <form
              action="/admin/regulator-champions/logout"
              method="POST"
            >
              <button
                type="submit"
                className="rounded-xl border border-[#E6E2DC] bg-white px-4 py-2 text-xs font-bold text-[#657B6C] transition hover:border-[#C29F60] hover:text-[#1C3B34]"
              >
                Log out of admin
              </button>
            </form>
          </div>

          <span className="block text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            Regulator Champions
          </span>

          <h1 className="mt-2 text-3xl font-bold text-[#1C3B34] md:text-5xl">
            Monthly Member
            Conversations
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#657B6C] md:text-base">
            Review educator
            questions and see
            which session days
            and times are
            working best for
            Regulator Champion
            teams.
          </p>
        </div>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C29F60]">
              Session votes
            </p>

            <p className="mt-2 text-3xl font-black">
              {votes.length}
            </p>
          </article>

          <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C29F60]">
              Leading day
            </p>

            <p className="mt-2 text-xl font-black">
              {topDays.length > 0
                ? topDays.join(
                    ' / ',
                  )
                : 'No votes yet'}
            </p>
          </article>

          <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-[#C29F60]">
              Educator questions
            </p>

            <p className="mt-2 text-3xl font-black">
              {questions.length}
            </p>
          </article>
        </section>

        <section className="space-y-6 rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
              September 2026
            </span>

            <h2 className="mt-2 text-2xl font-bold">
              Session voting
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[#657B6C]">
              Results update as
              educators submit
              their preferences.
            </p>
          </div>

          {votesResponse.error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-700">
              Session voting
              results could not
              be loaded right
              now.
            </div>
          ) : votes.length === 0 ? (
            <div className="rounded-2xl bg-[#FAF8F5] p-5 text-sm text-[#657B6C]">
              No September
              session votes have
              been submitted yet.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="space-y-5 rounded-3xl bg-[#FAF8F5] p-5 md:p-6">
                  <div>
                    <h3 className="text-lg font-bold">
                      Preferred days
                    </h3>

                    {topDays.length >
                      0 && (
                      <p className="mt-1 text-sm font-semibold text-[#657B6C]">
                        Most popular:{' '}
                        {topDays.join(
                          ' and ',
                        )}
                      </p>
                    )}
                  </div>

                  {DAY_ORDER.map(
                    (day) => (
                      <ResultBar
                        key={day}
                        label={day}
                        count={
                          dayTotals.get(
                            day,
                          ) ?? 0
                        }
                        maximum={
                          highestDayCount
                        }
                      />
                    ),
                  )}
                </div>

                <div className="space-y-5 rounded-3xl bg-[#FAF8F5] p-5 md:p-6">
                  <div>
                    <h3 className="text-lg font-bold">
                      Preferred times
                    </h3>

                    {topTimes.length >
                      0 && (
                      <p className="mt-1 text-sm font-semibold text-[#657B6C]">
                        Most popular:{' '}
                        {topTimes.join(
                          ' and ',
                        )}
                      </p>
                    )}
                  </div>

                  {TIME_ORDER.map(
                    (time) => (
                      <ResultBar
                        key={time}
                        label={time}
                        count={
                          timeTotals.get(
                            time,
                          ) ?? 0
                        }
                        maximum={
                          highestTimeCount
                        }
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-[#E6E2DC] p-5 md:p-6">
                <h3 className="text-lg font-bold">
                  How educators
                  plan to attend
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                  {ATTENDANCE_ORDER.map(
                    (option) => (
                      <ResultBar
                        key={option}
                        label={option}
                        count={
                          attendanceTotals.get(
                            option,
                          ) ?? 0
                        }
                        maximum={
                          highestAttendanceCount
                        }
                      />
                    ),
                  )}
                </div>
              </div>

              {otherTimes.length >
                0 && (
                <div className="rounded-3xl bg-[#FAF5EC] p-5 md:p-6">
                  <h3 className="font-bold">
                    Other suggested
                    times
                  </h3>

                  <div className="mt-4 space-y-3">
                    {otherTimes.map(
                      (
                        suggestion,
                        index,
                      ) => (
                        <div
                          key={`${suggestion.serviceName}-${index}`}
                          className="rounded-2xl bg-white p-4"
                        >
                          <p className="font-bold">
                            {
                              suggestion.value
                            }
                          </p>

                          <p className="mt-1 text-xs text-[#657B6C]">
                            {
                              suggestion.firstName
                            }{' '}
                            ·{' '}
                            {
                              suggestion.serviceName
                            }
                          </p>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-bold">
                  Individual
                  responses
                </h3>

                <div className="mt-4 divide-y divide-[#E6E2DC] overflow-hidden rounded-3xl border border-[#E6E2DC]">
                  {votes.map(
                    (vote) => (
                      <article
                        key={vote.id}
                        className="bg-white p-5"
                      >
                        <div className="flex flex-col justify-between gap-3 md:flex-row">
                          <div>
                            <p className="font-bold">
                              {
                                vote.service_name
                              }
                            </p>

                            <p className="text-sm text-[#657B6C]">
                              {
                                vote.first_name
                              }
                            </p>
                          </div>

                          <p className="text-xs text-[#657B6C]">
                            {formatDate(
                              vote.created_at,
                            )}
                          </p>
                        </div>

                        <div className="mt-4 grid gap-4 text-sm md:grid-cols-3">
                          <div>
                            <strong>
                              Days
                            </strong>

                            <p className="mt-1">
                              {vote.preferred_days.join(
                                ', ',
                              )}
                            </p>
                          </div>

                          <div>
                            <strong>
                              Times
                            </strong>

                            <p className="mt-1">
                              {vote.preferred_times.join(
                                ', ',
                              )}

                              {vote.other_time
                                ? ` (${vote.other_time})`
                                : ''}
                            </p>
                          </div>

                          <div>
                            <strong>
                              Attendance
                            </strong>

                            <p className="mt-1">
                              {
                                vote.attendance_preference
                              }
                            </p>
                          </div>
                        </div>
                      </article>
                    ),
                  )}
                </div>
              </div>
            </>
          )}
        </section>

        <section className="space-y-6">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
              Ask Robyn
            </span>

            <h2 className="mt-2 text-2xl font-bold">
              Educator questions
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#657B6C]">
              Questions submitted
              by Regulator Champion
              educators for upcoming
              monthly conversations.
            </p>
          </div>

          {questionsResponse.error ? (
            <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm font-semibold text-rose-700">
              Educator questions
              could not be loaded
              right now.
            </div>
          ) : questions.length ===
            0 ? (
            <div className="rounded-3xl border border-[#E6E2DC] bg-white p-6 text-sm text-[#657B6C]">
              No educator
              questions have
              been submitted
              for September yet.
            </div>
          ) : (
            <div className="space-y-5">
              {questions.map(
                (question) => (
                  <article
                    key={
                      question.id
                    }
                    className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8"
                  >
                    <div className="flex flex-col justify-between gap-4 border-b border-[#E6E2DC] pb-5 md:flex-row">
                      <div>
                        <span className="inline-block rounded-full bg-[#EEF3F0] px-3 py-1 text-xs font-bold capitalize text-[#657B6C]">
                          {
                            question.status
                          }
                        </span>

                        <h3 className="mt-3 text-xl font-bold">
                          {
                            question.service_name
                          }
                        </h3>

                        <p className="mt-1 text-sm text-[#657B6C]">
                          Submitted by{' '}
                          {
                            question.first_name
                          }
                        </p>
                      </div>

                      <p className="text-xs text-[#657B6C]">
                        {formatDate(
                          question.created_at,
                        )}
                      </p>
                    </div>

                    <div className="mt-6 space-y-6">
                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                          What are you
                          noticing?
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7">
                          {
                            question.what_noticing
                          }
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                          What have you
                          already tried?
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7">
                          {question.what_tried ||
                            'Nothing added.'}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                          What would you
                          like help
                          understanding?
                        </p>

                        <p className="mt-2 whitespace-pre-wrap text-sm leading-7">
                          {question.help_understanding ||
                            'Nothing added.'}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-[#FAF5EC] p-4 text-xs leading-relaxed text-[#657B6C]">
                        Before discussing
                        this submission
                        with member teams,
                        remove or
                        generalise any
                        information that
                        could identify a
                        child or family.
                      </div>
                    </div>
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}