'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { regulationLadders } from '@/lib/regulationLadders';

type ProgressSummaryProps = {
  userEmail: string;
};

type MemberPlan = 'preview' | 'full';

type LadderRungLog = {
  ladder_id: string;
  ladder_title?: string;
  rung_number: number;
  rung_title?: string;
  review_status?: string;
  updated_at?: string;
};

type ProgressResponse = {
  success?: boolean;
  error?: string;
  plan?: MemberPlan | null;
  logs?: LadderRungLog[];
};

type LoadStatus = 'idle' | 'loading' | 'success' | 'error';

const PREVIEW_LADDER_IDS = new Set([
  'regulated-educator',
  'connected-drop-offs',
  'participation-beyond-sitting',
]);

export default function ProgressSummary({
  userEmail,
}: ProgressSummaryProps) {
  const [logs, setLogs] = useState<LadderRungLog[]>([]);
  const [memberPlan, setMemberPlan] = useState<MemberPlan | null>(null);
  const [loadStatus, setLoadStatus] = useState<LoadStatus>('idle');
  const [loadMessage, setLoadMessage] = useState('');

  const cleanedEmail = userEmail.trim().toLowerCase();

  const fetchProgress = useCallback(async () => {
    setLoadMessage('');

    if (!cleanedEmail) {
      setLogs([]);
      setMemberPlan(null);
      setLoadStatus('idle');
      return;
    }

    setLoadStatus('loading');

    try {
      const response = await fetch('/api/progress-summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: cleanedEmail,
        }),
        cache: 'no-store',
      });

      let responseData: ProgressResponse = {};

      try {
        responseData = (await response.json()) as ProgressResponse;
      } catch {
        responseData = {};
      }

      if (!response.ok || responseData.success !== true) {
        throw new Error(
          responseData.error ??
            'Your progress could not be loaded. Please try again.',
        );
      }

      setLogs(responseData.logs ?? []);
      setMemberPlan(
        responseData.plan === 'preview' || responseData.plan === 'full'
          ? responseData.plan
          : null,
      );
      setLoadStatus('success');
    } catch (error) {
      console.error('Progress fetch failed:', error);

      setLogs([]);
      setMemberPlan(null);
      setLoadStatus('error');
      setLoadMessage(
        error instanceof Error
          ? error.message
          : 'Your progress could not be loaded. Please try again.',
      );
    }
  }, [cleanedEmail]);

  useEffect(() => {
    void fetchProgress();
  }, [fetchProgress]);

  const entitledLadders = useMemo(() => {
    if (memberPlan === 'full') {
      return regulationLadders;
    }

    if (memberPlan === 'preview') {
      return regulationLadders.filter((ladder) =>
        PREVIEW_LADDER_IDS.has(ladder.id),
      );
    }

    return [];
  }, [memberPlan]);

  const availableEntitledLadders = useMemo(
    () =>
      entitledLadders.filter(
        (ladder) => ladder.availability === 'available',
      ),
    [entitledLadders],
  );

  const totalAvailableRungs = useMemo(
    () =>
      availableEntitledLadders.reduce(
        (total, ladder) => total + ladder.rungs.length,
        0,
      ),
    [availableEntitledLadders],
  );

  const uniqueSavedRungs = useMemo(() => {
    const uniqueKeys = new Set(
      logs.map((log) => `${log.ladder_id}-${log.rung_number}`),
    );

    return uniqueKeys.size;
  }, [logs]);

  const overallPercentage =
    totalAvailableRungs > 0
      ? Math.min(
          100,
          Math.round(
            (uniqueSavedRungs / totalAvailableRungs) * 100,
          ),
        )
      : 0;

  const ladderProgress = useMemo(
    () =>
      entitledLadders.map((ladder) => {
        const ladderLogs = logs.filter(
          (log) => log.ladder_id === ladder.id,
        );

        const uniqueRungNumbers = new Set(
          ladderLogs.map((log) => log.rung_number),
        );

        const completedRungs = uniqueRungNumbers.size;
        const totalRungs = ladder.rungs.length;

        const percentage =
          totalRungs > 0
            ? Math.min(
                100,
                Math.round(
                  (completedRungs / totalRungs) * 100,
                ),
              )
            : 0;

        return {
          ladder,
          completedRungs,
          totalRungs,
          percentage,
          isComplete:
            totalRungs > 0 &&
            completedRungs === totalRungs,
        };
      }),
    [entitledLadders, logs],
  );

  if (!cleanedEmail) {
    return (
      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
        <h2 className="text-lg font-bold text-amber-950">
          Add your work email to view progress
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-amber-900">
          Enter and save your email near the top of the Practice Hub. Your
          ladder progress will then be loaded here.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
        <div>
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            Learning Progress
          </span>

          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            My Progress
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Progress shown for <strong>{cleanedEmail}</strong>.
          </p>

          {memberPlan && (
            <p className="mt-1 text-xs font-semibold text-slate-500">
              {memberPlan === 'preview'
                ? '3-Ladder Preview access'
                : 'Full 8-Ladder pathway access'}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => void fetchProgress()}
          disabled={loadStatus === 'loading'}
          className="self-start rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-bold text-teal-800 transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
        >
          {loadStatus === 'loading'
            ? 'Refreshing...'
            : 'Refresh Progress'}
        </button>
      </div>

      {loadStatus === 'error' && (
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm leading-relaxed text-rose-900"
        >
          {loadMessage}
        </div>
      )}

      {loadStatus === 'loading' && (
        <div
          role="status"
          className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600"
        >
          Loading your ladder progress...
        </div>
      )}

      {loadStatus === 'success' && memberPlan && (
        <>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Saved Rungs
              </span>

              <p className="mt-2 text-4xl font-extrabold text-teal-900">
                {uniqueSavedRungs}
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Out of {totalAvailableRungs} currently available rungs in your
                pathway.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Current Progress
              </span>

              <p className="mt-2 text-4xl font-extrabold text-teal-900">
                {overallPercentage}%
              </p>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-teal-700 transition-all"
                  style={{
                    width: `${overallPercentage}%`,
                  }}
                />
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Completed Ladders
              </span>

              <p className="mt-2 text-4xl font-extrabold text-teal-900">
                {
                  ladderProgress.filter(
                    (item) => item.isComplete,
                  ).length
                }
              </p>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Saved completion does not automatically award Regulator
                Champion recognition.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {ladderProgress.map(
              ({
                ladder,
                completedRungs,
                totalRungs,
                percentage,
                isComplete,
              }) => {
                const isAvailable =
                  ladder.availability === 'available';

                return (
                  <article
                    key={ladder.id}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                          Ladder {ladder.number}
                        </span>

                        <h3 className="mt-1 text-lg font-bold text-slate-900">
                          {ladder.title}
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-slate-600">
                          {ladder.subtitle}
                        </p>
                      </div>

                      <span
                        className={`self-start rounded-full px-3 py-1 text-xs font-bold ${
                          !isAvailable
                            ? 'bg-amber-100 text-amber-800'
                            : isComplete
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {!isAvailable
                          ? 'In development'
                          : isComplete
                            ? 'All rungs saved'
                            : `${completedRungs} of ${totalRungs} saved`}
                      </span>
                    </div>

                    {isAvailable && (
                      <>
                        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-teal-700 transition-all"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <div className="mt-4 grid grid-cols-10 gap-1.5">
                          {ladder.rungs.map((rung) => {
                            const rungSaved = logs.some(
                              (log) =>
                                log.ladder_id === ladder.id &&
                                log.rung_number === rung.number,
                            );

                            return (
                              <div
                                key={rung.number}
                                title={`Rung ${rung.number}: ${
                                  rungSaved ? 'Saved' : 'Not yet saved'
                                }`}
                                className={`flex h-8 items-center justify-center rounded-lg text-xs font-bold ${
                                  rungSaved
                                    ? 'bg-teal-700 text-white'
                                    : 'bg-slate-100 text-slate-400'
                                }`}
                              >
                                {rung.number}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {isComplete && (
                      <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                        <h4 className="font-bold text-emerald-950">
                          Ladder work recorded
                        </h4>

                        <p className="mt-1 text-sm leading-relaxed text-emerald-900">
                          All ten rung reflections have been saved. This does
                          not automatically mean the ladder has been formally
                          reviewed or approved.
                        </p>
                      </div>
                    )}
                  </article>
                );
              },
            )}
          </div>

          {logs.length === 0 && (
            <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                No ladder reflections saved yet
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-slate-600">
                Open Regulation Ladders, choose an available ladder and save
                your first practice reflection.
              </p>
            </div>
          )}

          <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
            <h3 className="font-bold text-teal-950">
              Recognition requires review
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-teal-900">
              Completing saved reflections is one part of the learning pathway.
              Full Regulator Champion recognition requires the relevant pathway
              requirements and personal final review by Robyn.
            </p>
          </div>
        </>
      )}
    </section>
  );
}