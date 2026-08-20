'use client';

import React, { useEffect, useMemo, useState } from 'react';

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

type FilterKey = 'all' | 'morning-routine' | 'escalation-support';

function formatDate(value: string | null | undefined) {
  if (!value) {
    return 'Not yet';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not yet';
  }

  return new Intl.DateTimeFormat('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

function cleanReflectionText(value: string) {
  return value
    .replace(/^Educator capacity:\s*/i, '')
    .replace(/\s*Room factor:\s*/i, ' Room factor: ')
    .trim();
}

export default function ProgressSummary({
  userEmail,
}: ProgressSummaryProps) {
  const [logs, setLogs] = useState<ProgressLog[]>([]);
  const [summary, setSummary] = useState<SummaryData>({
    totalReflections: 0,
    completedRungs: 0,
    laddersUsed: 0,
    latestReflection: null,
  });

  const [plan, setPlan] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const cleanedEmail = userEmail.trim().toLowerCase();

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
        const response = await fetch('/api/progress-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userEmail: cleanedEmail,
          }),
        });

        const result = (await response.json()) as ProgressResponse;

        if (!response.ok || result.success !== true) {
          throw new Error(
            result.error ?? 'Your practice evidence could not be loaded.',
          );
        }

        if (cancelled) return;

        setLogs(Array.isArray(result.logs) ? result.logs : []);

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
        if (cancelled) return;

        console.error('Progress summary load failed:', loadError);

        setError(
          loadError instanceof Error
            ? loadError.message
            : 'Your practice evidence could not be loaded.',
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

  const filteredLogs = useMemo(() => {
    if (filter === 'all') {
      return logs;
    }

    return logs.filter((log) => log.ladder_id === filter);
  }, [filter, logs]);

  const morningCount = useMemo(
    () =>
      logs.filter((log) => log.ladder_id === 'morning-routine').length,
    [logs],
  );

  const escalationCount = useMemo(
    () =>
      logs.filter((log) => log.ladder_id === 'escalation-support').length,
    [logs],
  );

  const handlePrint = () => {
    window.print();
  };

  if (!cleanedEmail) {
    return (
      <section className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6">
        <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
          Practice Evidence
        </span>

        <h2 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
          Add your work email first
        </h2>

        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6A7873]">
          Your saved ladder reflections will appear here once your work email
          has been entered in the Practice Hub.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-6">
      {/* REPORT HEADER */}
      <section className="overflow-hidden rounded-3xl bg-[#1C3B34] text-white print:rounded-none">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D8C28D]">
                Regulator Champions
              </span>

              <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
                Practice Evidence Pack
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
                A dated record of the practice moments, observations and
                reflections saved through the Regulation Ladders.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="flex min-h-12 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs font-bold text-white transition hover:bg-white/20 print:hidden"
            >
              Print / Save as PDF
            </button>
          </div>

          {plan && (
            <div className="mt-5 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/80">
              {plan === 'preview' ? 'Preview Access' : 'Full Access'}
            </div>
          )}
        </div>
      </section>

      {/* SUMMARY METRICS */}
      <section className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#E6E2DC] bg-white p-5">
          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
            Reflections
          </span>

          <div className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
            {summary.totalReflections}
          </div>

          <p className="mt-1 text-xs text-[#6A7873]">
            Practice moments saved
          </p>
        </div>

        <div className="rounded-2xl border border-[#E6E2DC] bg-white p-5">
          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
            Ladders Used
          </span>

          <div className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
            {summary.laddersUsed}
          </div>

          <p className="mt-1 text-xs text-[#6A7873]">
            Different practice areas explored
          </p>
        </div>

        <div className="rounded-2xl border border-[#E6E2DC] bg-white p-5">
          <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
            Latest
          </span>

          <div className="mt-3 text-base font-extrabold text-[#1C3B34]">
            {formatDate(summary.latestReflection)}
          </div>

          <p className="mt-1 text-xs text-[#6A7873]">
            Most recent reflection
          </p>
        </div>
      </section>

      {/* FILTERS */}
      <section className="print:hidden">
        <div className="mb-3">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
            Filter evidence
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`min-h-12 rounded-xl border px-4 py-2 text-xs font-bold transition ${
              filter === 'all'
                ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                : 'border-[#E6E2DC] bg-white text-[#2B3833]'
            }`}
          >
            All ({logs.length})
          </button>

          <button
            type="button"
            onClick={() => setFilter('morning-routine')}
            className={`min-h-12 rounded-xl border px-4 py-2 text-xs font-bold transition ${
              filter === 'morning-routine'
                ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                : 'border-[#E6E2DC] bg-white text-[#2B3833]'
            }`}
          >
            Morning Routine ({morningCount})
          </button>

          <button
            type="button"
            onClick={() => setFilter('escalation-support')}
            className={`min-h-12 rounded-xl border px-4 py-2 text-xs font-bold transition ${
              filter === 'escalation-support'
                ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                : 'border-[#E6E2DC] bg-white text-[#2B3833]'
            }`}
          >
            Escalation Support ({escalationCount})
          </button>
        </div>
      </section>

      {/* LOADING */}
      {loading && (
        <section className="rounded-3xl border border-[#E6E2DC] bg-white p-8 text-center">
          <p className="text-sm font-bold text-[#657B6C]">
            Loading your practice evidence...
          </p>
        </section>
      )}

      {/* ERROR */}
      {!loading && error && (
        <section className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-bold text-red-700">{error}</p>
        </section>
      )}

      {/* EMPTY */}
      {!loading && !error && logs.length === 0 && (
        <section className="rounded-3xl border-2 border-dashed border-[#D8D2C8] bg-[#FAF8F5] p-8 text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
            Your evidence pack starts here
          </span>

          <h3 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
            No reflections saved yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[#6A7873]">
            Choose a ladder, try one rung in practice and save a quick
            reflection. It will automatically appear here.
          </p>
        </section>
      )}

      {/* SAVED EVIDENCE */}
      {!loading && !error && filteredLogs.length > 0 && (
        <section>
          <div className="mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
              Saved practice evidence
            </span>

            <h3 className="mt-1 text-xl font-extrabold text-[#1C3B34]">
              What has been noticed in practice
            </h3>
          </div>

          <div className="space-y-4">
            {filteredLogs.map((log, index) => (
              <article
                key={`${log.ladder_id}-${log.rung_number}-${log.updated_at}-${index}`}
                className="break-inside-avoid rounded-3xl border border-[#E6E2DC] bg-white p-5 shadow-sm print:shadow-none"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#F1F4F2] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#657B6C]">
                        Ladder {log.rung_number}
                      </span>

                      <span className="text-[10px] font-bold text-[#8A9691]">
                        {formatDate(log.updated_at)}
                      </span>
                    </div>

                    <p className="mt-3 text-xs font-bold uppercase tracking-wider text-[#C29F60]">
                      {log.ladder_title}
                    </p>

                    <h4 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
                      Rung {log.rung_number}: {log.rung_title}
                    </h4>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#FAF5EC] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-[#9A793D]">
                    Saved practice
                  </span>
                </div>

                {log.reflection_text && (
                  <div className="mt-5 rounded-2xl bg-[#F1F4F2] p-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                      Reflection
                    </span>

                    <p className="mt-2 text-sm leading-relaxed text-[#2B3833]">
                      {cleanReflectionText(log.reflection_text)}
                    </p>
                  </div>
                )}

                {log.evidence_text && (
                  <div className="mt-3 border-l-4 border-[#C29F60] pl-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
                      Practice context
                    </span>

                    <p className="mt-1 text-xs leading-relaxed text-[#6A7873]">
                      {log.evidence_text}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      )}

      {!loading &&
        !error &&
        logs.length > 0 &&
        filteredLogs.length === 0 && (
          <section className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6 text-center">
            <p className="text-sm text-[#6A7873]">
              No reflections have been saved for this ladder yet.
            </p>
          </section>
        )}

      {/* PRINT FOOTER */}
      <section className="rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-4 print:mt-8">
        <p className="text-[10px] leading-relaxed text-[#6A7873]">
          This report organises reflections entered through Regulator Champions.
          It is intended to support professional reflection and service
          discussion. It does not determine an NQS rating or replace required
          service documentation.
        </p>
      </section>
    </div>
  );
}