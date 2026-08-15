'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  regulationLadders,
  type RegulationLadder,
} from '@/lib/regulationLadders';
import LadderRung from '@/components/feed/LadderRung';

type RegulationLaddersProps = {
  userEmail: string;
};

type MemberPlan = 'preview' | 'full';

type AccessStatusResponse = {
  success?: boolean;
  hasAccess?: boolean;
  plan?: MemberPlan | null;
};

const PREVIEW_LADDER_IDS = new Set([
  'regulated-educator',
  'connected-drop-offs',
  'participation-beyond-sitting',
]);

export default function RegulationLadders({
  userEmail,
}: RegulationLaddersProps) {
  const [selectedLadderId, setSelectedLadderId] = useState<string | null>(
    null,
  );
  const [currentRungIndex, setCurrentRungIndex] = useState(0);
  const [memberPlan, setMemberPlan] = useState<MemberPlan | null>(null);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadAccessPlan = async () => {
      try {
        const response = await fetch('/api/access-status', {
          method: 'GET',
          cache: 'no-store',
        });

        const result =
          (await response.json()) as AccessStatusResponse;

        if (!isMounted) {
          return;
        }

        if (
          response.ok &&
          result.success === true &&
          result.hasAccess === true &&
          (result.plan === 'preview' || result.plan === 'full')
        ) {
          setMemberPlan(result.plan);
        } else {
          setMemberPlan(null);
        }
      } catch (error) {
        console.error('Member access plan check failed:', error);

        if (isMounted) {
          setMemberPlan(null);
        }
      } finally {
        if (isMounted) {
          setIsCheckingAccess(false);
        }
      }
    };

    void loadAccessPlan();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedLadder = useMemo<RegulationLadder | null>(() => {
    if (!selectedLadderId) {
      return null;
    }

    return (
      regulationLadders.find(
        (ladder) => ladder.id === selectedLadderId,
      ) ?? null
    );
  }, [selectedLadderId]);

  const hasPlanAccess = (ladder: RegulationLadder) => {
    if (memberPlan === 'full') {
      return true;
    }

    if (memberPlan === 'preview') {
      return PREVIEW_LADDER_IDS.has(ladder.id);
    }

    return false;
  };

  const handleOpenLadder = (ladder: RegulationLadder) => {
    if (
      ladder.availability !== 'available' ||
      !hasPlanAccess(ladder)
    ) {
      return;
    }

    setSelectedLadderId(ladder.id);
    setCurrentRungIndex(0);
  };

  const handleCloseLadder = () => {
    setSelectedLadderId(null);
    setCurrentRungIndex(0);
  };

  const handlePreviousRung = () => {
    setCurrentRungIndex((current) => Math.max(0, current - 1));
  };

  const handleNextRung = () => {
    if (!selectedLadder) {
      return;
    }

    setCurrentRungIndex((current) =>
      Math.min(selectedLadder.rungs.length - 1, current + 1),
    );
  };

  if (isCheckingAccess) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-teal-800 border-t-transparent"
          aria-label="Checking member access"
        />

        <p className="mt-4 text-sm font-semibold text-slate-600">
          Checking your pathway access…
        </p>
      </section>
    );
  }

  if (!memberPlan) {
    return (
      <section className="rounded-3xl border border-rose-200 bg-rose-50 p-6">
        <h2 className="text-lg font-bold text-rose-950">
          Member access could not be confirmed
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-rose-900">
          Please sign out and enter your service access code again.
        </p>
      </section>
    );
  }

  if (
    selectedLadder &&
    selectedLadder.rungs.length > 0 &&
    hasPlanAccess(selectedLadder)
  ) {
    const currentRung = selectedLadder.rungs[currentRungIndex];

    return (
      <section className="space-y-6">
        <div className="flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:justify-between">
          <div>
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800">
              Regulation Ladder {selectedLadder.number}
            </span>

            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              {selectedLadder.title}
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
              {selectedLadder.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCloseLadder}
            className="self-start rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
          >
            Return to All Ladders
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-teal-800">
                Ladder Progress
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                Rung {currentRungIndex + 1} of {selectedLadder.rungs.length}
              </p>
            </div>

            {selectedLadder.printablePdf && (
              <a
                href={selectedLadder.printablePdf}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-2.5 text-sm font-bold text-teal-800 transition hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
              >
                Open Printable Cards
              </a>
            )}
          </div>

          <div className="mt-5 grid grid-cols-10 gap-1.5">
            {selectedLadder.rungs.map((rung, index) => (
              <button
                key={rung.number}
                type="button"
                onClick={() => setCurrentRungIndex(index)}
                aria-label={`Open rung ${rung.number}: ${rung.title}`}
                className={`h-3 rounded-full transition focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 ${
                  index === currentRungIndex
                    ? 'bg-teal-700'
                    : index < currentRungIndex
                      ? 'bg-teal-300'
                      : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        </div>

        <LadderRung
          ladder={selectedLadder}
          rung={currentRung}
          rungIndex={currentRungIndex}
          userEmail={userEmail}
          isFirstRung={currentRungIndex === 0}
          isLastRung={
            currentRungIndex === selectedLadder.rungs.length - 1
          }
          onPrevious={handlePreviousRung}
          onNext={handleNextRung}
          onReturnToLadders={handleCloseLadder}
        />
      </section>
    );
  }

  return (
    <section className="space-y-8">
      <div className="max-w-3xl">
        <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
          {memberPlan === 'preview'
            ? '3-Ladder Preview'
            : '8-Ladder Pathway'}
        </span>

        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          Regulation Ladders
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
          Each available ladder moves through ten practical reflection points.
          Educators apply one change, record what they noticed and build
          evidence of learning over time.
        </p>
      </div>

      {memberPlan === 'preview' && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <h3 className="font-bold text-amber-950">
            Your Preview includes Ladders 1 to 3
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-amber-900">
            Your service can complete the first three Regulation Ladders during
            the Preview period. Ladders 4 to 8 are part of the Full pathway.
          </p>

          <Link
            href="/proposal?plan=full"
            className="mt-4 inline-block text-sm font-bold text-amber-950 underline"
          >
            View Full 8-Ladder pathway
          </Link>
        </div>
      )}

      <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
        <h3 className="font-bold text-teal-950">
          Ladder completion is not automatic recognition
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-teal-900">
          Saving a reflection records your progress. Completed ladder work may
          later be reviewed as part of the Regulator Champion recognition
          pathway.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {regulationLadders.map((ladder) => {
          const isAvailable = ladder.availability === 'available';
          const hasAccess = hasPlanAccess(ladder);

          return (
            <article
              key={ladder.id}
              className="flex flex-col justify-between space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800">
                    Ladder {ladder.number}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      !hasAccess
                        ? 'bg-slate-100 text-slate-600'
                        : isAvailable
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {!hasAccess
                      ? 'Full pathway'
                      : isAvailable
                        ? 'Available now'
                        : 'In development'}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900">
                  {ladder.title}
                </h3>

                <p className="mt-2 text-sm font-semibold leading-relaxed text-teal-900">
                  {ladder.subtitle}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {ladder.description}
                </p>
              </div>

              {!hasAccess ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm leading-relaxed text-slate-700">
                    This ladder is included in the Full 8-Ladder pathway.
                  </p>
                </div>
              ) : isAvailable ? (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => handleOpenLadder(ladder)}
                    className="w-full rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                  >
                    Begin This Ladder
                  </button>

                  {ladder.printablePdf && (
                    <a
                      href={ladder.printablePdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full rounded-xl border border-slate-300 bg-slate-100 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                    >
                      Open Printable Cards
                    </a>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm leading-relaxed text-amber-950">
                    This ladder is part of your pathway but is still in
                    development.
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}