'use client';

import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';

interface ProgressSummaryProps {
  userEmail: string;
}

type ProgressLog = {
  ladder_id: string;
  ladder_title: string;
  rung_number: number;
  rung_title: string;
  reflection_text: string;
  evidence_text: string;
  review_status: string;
  updated_at: string;
};

type SummaryData = {
  totalReflections: number;
  completedRungs: number;
  laddersUsed: number;
  latestReflection: string | null;
};

type ProgressResponse = {
  success?: boolean;
  plan?: string;
  logs?: ProgressLog[];
  summary?: SummaryData;
  error?: string;
};

type FilterKey =
  | 'all'
  | 'morning-routine'
  | 'escalation-support';

function formatDate(
  value: string | null | undefined,
) {
  if (!value) {
    return 'Not yet';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not yet';
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    },
  ).format(date);
}

function cleanReflectionText(
  value: string,
) {
  return value
    .replace(
      /^Educator capacity:\s*/i,
      '',
    )
    .replace(
      /^Educator reflection:\s*/i,
      '',
    )
    .replace(
      /\s*Room factor:\s*/i,
      ' Room factor: ',
    )
    .replace(
      /\s*Room factor noticed:\s*/i,
      ' Room factor noticed: ',
    )
    .trim();
}

export default function ProgressSummary({
  userEmail,
}: ProgressSummaryProps) {
  const [logs, setLogs] = useState<
    ProgressLog[]
  >([]);

  const [summary, setSummary] =
    useState<SummaryData>({
      totalReflections: 0,
      completedRungs: 0,
      laddersUsed: 0,
      latestReflection: null,
    });

  const [plan, setPlan] =
    useState('');

  const [filter, setFilter] =
    useState<FilterKey>('all');

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState('');

  const cleanedEmail =
    userEmail.trim().toLowerCase();

  useEffect(() => {
    if (!cleanedEmail) {
      setLogs([]);

      setSummary({
        totalReflections: 0,
        completedRungs: 0,
        laddersUsed: 0,
        latestReflection: null,
      });

      setError('');
      return;
    }

    let cancelled = false;

    const loadProgress = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          '/api/progress-summary',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              userEmail: cleanedEmail,
            }),
          },
        );

        const result =
          (await response.json()) as ProgressResponse;

        if (
          !response.ok ||
          result.success !== true
        ) {
          throw new Error(
            result.error ??
              'Your practice reflections could not be loaded.',
          );
        }

        if (cancelled) {
          return;
        }

        setLogs(
          Array.isArray(result.logs)
            ? result.logs
            : [],
        );

        setSummary(
          result.summary ?? {
            totalReflections: 0,
            completedRungs: 0,
            laddersUsed: 0,
            latestReflection: null,
          },
        );

        setPlan(result.plan ?? '');
      } catch (loadError) {
        if (cancelled) {
          return;
        }

        console.error(
          'Progress summary load failed:',
          loadError,
        );

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Your practice reflections could not be loaded.',
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadProgress();

    return () => {
      cancelled = true;
    };
  }, [cleanedEmail]);

  const filteredLogs = useMemo(
    () => {
      if (filter === 'all') {
        return logs;
      }

      return logs.filter(
        (log) =>
          log.ladder_id === filter,
      );
    },
    [filter, logs],
  );

  const morningCount = useMemo(
    () =>
      logs.filter(
        (log) =>
          log.ladder_id ===
          'morning-routine',
      ).length,
    [logs],
  );

  const escalationCount = useMemo(
    () =>
      logs.filter(
        (log) =>
          log.ladder_id ===
          'escalation-support',
      ).length,
    [logs],
  );

  const handlePrint = () => {
    window.print();
  };

  if (!cleanedEmail) {
    return (
      <section className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7 sm:p-8">
        <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
          Your practice reflections
        </span>

        <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
          Enter your work email above.
        </h2>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#65736D]">
          Any reflections you save while
          using the Regulation Ladders will
          appear here.
        </p>

        <div className="mt-6 rounded-3xl bg-white p-5">
          <p className="text-lg font-extrabold text-[#1C3B34]">
            What is this page for?
          </p>

          <p className="mt-2 text-base leading-relaxed text-[#65736D]">
            It helps you look back at what
            you tried, what you noticed and
            what may be worth repeating or
            discussing with your team.
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="space-y-8">

      {/* INTRO */}
      <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white print:rounded-none">
        <div className="p-7 sm:p-9">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                Your Regulator Champions
                reflections
              </span>

              <h2 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
                Progress does not mean
                completing the most rungs.
              </h2>

              <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
                Progress means noticing more,
                becoming curious earlier and
                learning which responses help
                children in real situations.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="flex min-h-14 shrink-0 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-5 py-4 text-base font-bold text-white transition hover:bg-white/20 print:hidden"
            >
              Print / Save as PDF
            </button>
          </div>

          {plan && (
            <div className="mt-6 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white/85">
              {plan === 'preview'
                ? 'Preview Access'
                : 'Full Access'}
            </div>
          )}
        </div>
      </section>

      {/* HOW TO USE THIS PAGE */}
      <section className="rounded-4xl border border-[#E5DED4] bg-[#FAF5EC] p-7 sm:p-9 print:hidden">
        <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
          How to use this page
        </span>

        <h3 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
          Look for patterns, not perfect
          answers.
        </h3>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InstructionCard
            number="1"
            title="Look back"
            text="Read a few saved reflections from real moments."
          />

          <InstructionCard
            number="2"
            title="Notice patterns"
            text="What seems to make things harder? What seems to help?"
          />

          <InstructionCard
            number="3"
            title="Choose what comes next"
            text="Repeat something useful, try another rung or bring the pattern to your team or monthly coaching."
          />
        </div>
      </section>

      {/* SUMMARY */}
      <section>
        <div className="mb-5">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
            Your activity
          </span>

          <h3 className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
            What you have explored so far
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            value={
              summary.totalReflections
            }
            title="Reflections"
            text="Real practice moments you have stopped to think about."
          />

          <SummaryCard
            value={summary.laddersUsed}
            title="Practice areas"
            text="Different situations or pressure points you have explored."
          />

          <div className="rounded-3xl border border-[#E5DED4] bg-white p-6">
            <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
              Most recent reflection
            </span>

            <div className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
              {formatDate(
                summary.latestReflection,
              )}
            </div>

            <p className="mt-3 text-base leading-relaxed text-[#65736D]">
              The last time you paused to
              record what happened.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT TO LOOK FOR */}
      {logs.length > 0 && (
        <section className="rounded-4xl bg-[#F1F4F2] p-7 sm:p-8 print:hidden">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
            As you read your reflections
          </span>

          <h3 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
            Ask yourself these four
            questions.
          </h3>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              'Are the same parts of the day showing up again and again?',
              'Are there particular room pressures such as noise, waiting or fatigue?',
              'What changes when I slow my voice, body or expectations?',
              'Which responses seem to help the child reconnect, participate or recover?',
            ].map((question) => (
              <div
                key={question}
                className="rounded-3xl bg-white p-5"
              >
                <p className="text-lg font-bold leading-relaxed text-[#2B3833]">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FILTERS */}
      {logs.length > 0 && (
        <section className="print:hidden">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
            Filter your reflections
          </span>

          <p className="mt-2 text-base leading-relaxed text-[#65736D]">
            View everything together or
            focus on one practice area.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <FilterButton
              active={filter === 'all'}
              label={`All (${logs.length})`}
              onClick={() =>
                setFilter('all')
              }
            />

            <FilterButton
              active={
                filter ===
                'morning-routine'
              }
              label={`Morning Routine (${morningCount})`}
              onClick={() =>
                setFilter(
                  'morning-routine',
                )
              }
            />

            <FilterButton
              active={
                filter ===
                'escalation-support'
              }
              label={`Escalation Support (${escalationCount})`}
              onClick={() =>
                setFilter(
                  'escalation-support',
                )
              }
            />
          </div>
        </section>
      )}

      {/* LOADING */}
      {loading && (
        <section className="rounded-4xl border border-[#E5DED4] bg-white p-8 text-center">
          <p className="text-lg font-bold text-[#657B6C]">
            Loading your reflections…
          </p>
        </section>
      )}

      {/* ERROR */}
      {!loading && error && (
        <section className="rounded-3xl border border-red-200 bg-red-50 p-6">
          <p className="text-base font-bold text-red-700">
            {error}
          </p>
        </section>
      )}

      {/* EMPTY */}
      {!loading &&
        !error &&
        logs.length === 0 && (
          <section className="rounded-4xl border-2 border-dashed border-[#D8D2C8] bg-[#FAF8F5] p-8 text-center sm:p-10">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Nothing saved yet
            </span>

            <h3 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
              Your first reflection starts
              with one real moment.
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#65736D]">
              Go back to the Regulation
              Ladders, choose a situation
              that is difficult, try one
              rung and save a short
              reflection afterwards.
            </p>

            <div className="mx-auto mt-7 max-w-2xl rounded-3xl bg-white p-6 text-left">
              <p className="text-lg font-extrabold text-[#1C3B34]">
                You do not need to wait for
                a perfect success story.
              </p>

              <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                A reflection such as
                “I stopped repeating the
                instruction and moved
                closer. The child looked at
                me and slowed down” is
                useful evidence of practice.
              </p>
            </div>
          </section>
        )}

      {/* SAVED REFLECTIONS */}
      {!loading &&
        !error &&
        filteredLogs.length > 0 && (
          <section>
            <div className="mb-5">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
                Your saved reflections
              </span>

              <h3 className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
                What have you been noticing?
              </h3>

              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
                Read these as a story of
                what your practice is
                teaching you, not as a list
                of things you have completed.
              </p>
            </div>

            <div className="space-y-5">
              {filteredLogs.map(
                (log, index) => (
                  <article
                    key={`${log.ladder_id}-${log.rung_number}-${log.updated_at}-${index}`}
                    className="break-inside-avoid rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm print:shadow-none sm:p-7"
                  >
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full bg-[#F1F4F2] px-4 py-2 text-sm font-extrabold text-[#657B6C]">
                            Rung{' '}
                            {log.rung_number}
                          </span>

                          <span className="text-sm font-bold text-[#8A9691]">
                            {formatDate(
                              log.updated_at,
                            )}
                          </span>
                        </div>

                        <p className="mt-4 text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                          {
                            log.ladder_title
                          }
                        </p>

                        <h4 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                          {log.rung_title}
                        </h4>
                      </div>

                      <span className="shrink-0 rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-bold text-[#9A793D]">
                        Practice reflection
                      </span>
                    </div>

                    {log.reflection_text && (
                      <div className="mt-6 rounded-3xl bg-[#F1F4F2] p-5">
                        <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
                          What you recorded
                        </span>

                        <p className="mt-3 text-lg leading-relaxed text-[#2B3833]">
                          {cleanReflectionText(
                            log.reflection_text,
                          )}
                        </p>
                      </div>
                    )}

                    {log.evidence_text && (
                      <div className="mt-5 border-l-4 border-[#C29F60] pl-5">
                        <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                          Practice context
                        </span>

                        <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                          {
                            log.evidence_text
                          }
                        </p>
                      </div>
                    )}

                    <div className="mt-6 rounded-3xl border border-[#E5DED4] bg-[#FAF8F5] p-5 print:hidden">
                      <p className="text-base font-extrabold text-[#1C3B34]">
                        What could you do with
                        this reflection?
                      </p>

                      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                        Repeat the response if
                        it seemed useful, try a
                        different rung if it
                        did not fit, discuss
                        the pattern with your
                        team, or bring it to
                        monthly coaching if
                        you are still unsure.
                      </p>
                    </div>
                  </article>
                ),
              )}
            </div>
          </section>
        )}

      {!loading &&
        !error &&
        logs.length > 0 &&
        filteredLogs.length === 0 && (
          <section className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7 text-center">
            <p className="text-lg text-[#65736D]">
              You have not saved a
              reflection for this practice
              area yet.
            </p>
          </section>
        )}

      {/* WHAT NEXT */}
      {!loading &&
        !error &&
        logs.length > 0 && (
          <section className="rounded-4xl bg-[#1C3B34] p-7 text-white sm:p-9 print:hidden">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
              What now?
            </span>

            <h3 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Your reflections should lead
              somewhere.
            </h3>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Look for one thing worth
              carrying forward rather than
              trying to change everything
              at once.
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <NextCard
                title="Repeat"
                text="Use a response again if it seemed to help."
              />

              <NextCard
                title="Adjust"
                text="Try another rung if the strategy did not fit."
              />

              <NextCard
                title="Discuss"
                text="Share a pattern with your team or educational leader."
              />

              <NextCard
                title="Ask"
                text="Bring confusing patterns to Robyn through the Monthly Hub."
              />
            </div>
          </section>
        )}

      {/* PRINT NOTE */}
      <section className="rounded-3xl border border-[#E5DED4] bg-[#FAF8F5] p-5 print:mt-8">
        <p className="text-sm leading-relaxed text-[#65736D]">
          This report organises reflections
          entered through Regulator
          Champions. It is intended to
          support professional reflection
          and service discussion. It does
          not determine an NQS rating or
          replace required service
          documentation.
        </p>
      </section>
    </div>
  );
}

function InstructionCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl bg-white p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C29F60] font-extrabold text-[#1C3B34]">
        {number}
      </span>

      <h4 className="mt-4 text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h4>

      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </article>
  );
}

function SummaryCard({
  value,
  title,
  text,
}: {
  value: number;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E5DED4] bg-white p-6">
      <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
        {title}
      </span>

      <div className="mt-3 text-4xl font-extrabold text-[#1C3B34]">
        {value}
      </div>

      <p className="mt-3 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </article>
  );
}

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-14 rounded-2xl border-2 px-5 py-3 text-base font-bold transition ${
        active
          ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
          : 'border-[#E5DED4] bg-white text-[#2B3833] hover:border-[#657B6C]'
      }`}
    >
      {label}
    </button>
  );
}

function NextCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h4 className="text-xl font-extrabold text-white">
        {title}
      </h4>

      <p className="mt-2 text-base leading-relaxed text-[#C8D6D0]">
        {text}
      </p>
    </article>
  );
}