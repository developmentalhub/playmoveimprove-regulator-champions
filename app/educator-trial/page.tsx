'use client';

import Link from 'next/link';
import { useState } from 'react';
import EducatorTrialFeedbackModal from '../../components/EducatorTrialFeedbackModal';
import { practiceScenarios } from '../../lib/practiceScenarios';
import { getRegulationLadderById } from '../../lib/regulationLadders';

type QuickRating =
  | 'helpful'
  | 'not_sure'
  | 'not_relevant';

type QuickFeedbackState = Record<
  string,
  QuickRating | 'submitting' | 'error'
>;

const ratingOptions: {
  value: QuickRating;
  label: string;
}[] = [
  {
    value: 'helpful',
    label: 'Helpful',
  },
  {
    value: 'not_sure',
    label: 'Not Sure Yet',
  },
  {
    value: 'not_relevant',
    label: 'Not Relevant to My Room',
  },
];

export default function EducatorTrialPage() {
  const ladder = getRegulationLadderById(
    'regulated-educator',
  );

  const [isFeedbackOpen, setIsFeedbackOpen] =
    useState(false);

  const [quickFeedback, setQuickFeedback] =
    useState<QuickFeedbackState>({});

  const submitQuickFeedback = async ({
    itemKey,
    contentType,
    contentId,
    contentTitle,
    quickRating,
  }: {
    itemKey: string;
    contentType:
      | 'ladder_rung'
      | 'practice_scenario';
    contentId: string;
    contentTitle: string;
    quickRating: QuickRating;
  }) => {
    setQuickFeedback((previous) => ({
      ...previous,
      [itemKey]: 'submitting',
    }));

    try {
      const response = await fetch(
        '/api/educator-trial-feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            feedbackType: 'quick',
            pagePath: '/educator-trial',
            contentType,
            contentId,
            contentTitle,
            quickRating,
          }),
        },
      );

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            'Feedback could not be saved.',
        );
      }

      setQuickFeedback((previous) => ({
        ...previous,
        [itemKey]: quickRating,
      }));
    } catch (error) {
      console.error(
        'Quick feedback submission failed:',
        error,
      );

      setQuickFeedback((previous) => ({
        ...previous,
        [itemKey]: 'error',
      }));
    }
  };

  if (!ladder || ladder.rungs.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-950">
            Ladder 1 is temporarily unavailable
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The free educator trial could not load the
            Ladder 1 content.
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-xl bg-teal-800 px-5 py-3 text-sm font-bold text-white"
          >
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-28 text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-teal-800 transition hover:text-teal-950"
          >
            Play Move Improve
          </Link>

          <button
            type="button"
            onClick={() => setIsFeedbackOpen(true)}
            className="rounded-full bg-teal-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-teal-900"
          >
            Share Feedback
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-6 px-3 py-6 sm:px-5">
        <section className="overflow-hidden rounded-3xl bg-teal-900 text-white shadow-sm">
          <div className="space-y-4 p-6 sm:p-8">
            <span className="inline-block rounded-full bg-teal-800 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-100">
              Free Educator Trial
            </span>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
              Explore Ladder 1 and Tell Us What Educators
              Really Need
            </h1>

            <p className="text-sm leading-relaxed text-teal-100 sm:text-base">
              Scroll through the complete Ladder 1 content,
              try the practical scenarios and share feedback
              about what feels useful, unclear or difficult
              to apply in a real early childhood room.
            </p>

            <div className="rounded-2xl border border-teal-700 bg-teal-950/40 p-4">
              <p className="text-sm leading-relaxed text-teal-50">
                Ladder 1 is currently available as a free
                educator trial. Ladders 2 through 8 will be
                released progressively across the 12-month
                program so teams have time to practise each
                stage without becoming overwhelmed.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">
            How to Use This Trial
          </span>

          <h2 className="mt-2 text-xl font-bold text-slate-950">
            Read, Try and Respond
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Read each card, choose one idea to try and use
            the quick feedback buttons to tell us whether
            that item felt relevant. The full feedback form
            remains available at the bottom of your screen.
          </p>
        </section>

        <div className="flex items-center gap-3 px-2">
          <div className="h-px flex-1 bg-slate-300" />

          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Ladder 1
          </span>

          <div className="h-px flex-1 bg-slate-300" />
        </div>

        {ladder.rungs.map((rung) => {
          const itemKey = `ladder-rung-${rung.number}`;
          const feedbackState =
            quickFeedback[itemKey];

          return (
            <article
              key={rung.number}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative bg-slate-200">
                <img
                  src={rung.image}
                  alt={`Rung ${rung.number}: ${rung.title}`}
                  className="max-h-130 w-full object-cover"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-950 shadow">
                  Rung {rung.number} of{' '}
                  {ladder.rungs.length}
                </span>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                    {ladder.title}
                  </span>

                  <h2 className="mt-1 text-2xl font-bold text-slate-950">
                    {rung.title}
                  </h2>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Focus
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {rung.focus}
                  </p>
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Try This
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-amber-950">
                    {rung.practicePrompt}
                  </p>
                </div>

                <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                    Reflect
                  </h3>

                  <p className="mt-1 text-sm font-medium leading-relaxed text-teal-950">
                    {rung.reflectionQuestion}
                  </p>
                </div>

                <QuickFeedbackButtons
                  currentState={feedbackState}
                  onSelect={(quickRating) =>
                    submitQuickFeedback({
                      itemKey,
                      contentType: 'ladder_rung',
                      contentId: `ladder-1-rung-${rung.number}`,
                      contentTitle: rung.title,
                      quickRating,
                    })
                  }
                />
              </div>
            </article>
          );
        })}

        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6 text-center">
          <h2 className="text-xl font-bold text-teal-950">
            Download the Educator Cards
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-teal-900">
            Use the printable Ladder 1 cards during team
            discussion, room reflection or individual
            practice.
          </p>

          <a
            href={
              ladder.printablePdf ||
              '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf'
            }
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl bg-teal-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-900"
          >
            Open Printable Educator Cards
          </a>
        </section>

        <div className="flex items-center gap-3 px-2 pt-3">
          <div className="h-px flex-1 bg-slate-300" />

          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Practice Scenarios
          </span>

          <div className="h-px flex-1 bg-slate-300" />
        </div>

        {practiceScenarios.map((scenario, index) => {
          const itemKey = `scenario-${scenario.id}`;
          const feedbackState =
            quickFeedback[itemKey];

          return (
            <article
              key={scenario.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative bg-slate-200">
                <img
                  src={scenario.image}
                  alt={scenario.title}
                  className="max-h-130 w-full object-cover"
                />

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-teal-900 px-3 py-1 text-xs font-bold text-white shadow">
                    Scenario {index + 1}
                  </span>

                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-950 shadow">
                    {scenario.ageGroup}
                  </span>
                </div>
              </div>

              <div className="space-y-5 p-5 sm:p-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-950">
                    {scenario.title}
                  </h2>

                  <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">
                    {scenario.summary}
                  </p>
                </div>

                <ContentBox
                  title="The Situation"
                  className="border-slate-200 bg-slate-50 text-slate-800"
                >
                  {scenario.situation}
                </ContentBox>

                <ContentBox
                  title="Common Response"
                  className="border-rose-200 bg-rose-50 text-rose-950"
                >
                  {scenario.commonResponse}
                </ContentBox>

                <ContentBox
                  title="More Reflective Response"
                  className="border-teal-200 bg-teal-50 text-teal-950"
                >
                  {scenario.reflectiveResponse}
                </ContentBox>

                <ContentBox
                  title="Why It Matters"
                  className="border-amber-200 bg-amber-50 text-amber-950"
                >
                  {scenario.whyItMatters}
                </ContentBox>

                <div className="rounded-2xl bg-teal-900 p-4 text-white">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-teal-200">
                    Discuss With Your Team
                  </h3>

                  <p className="mt-1 text-sm font-semibold leading-relaxed">
                    {scenario.reflectionPrompt}
                  </p>
                </div>

                <QuickFeedbackButtons
                  currentState={feedbackState}
                  onSelect={(quickRating) =>
                    submitQuickFeedback({
                      itemKey,
                      contentType:
                        'practice_scenario',
                      contentId: scenario.id,
                      contentTitle: scenario.title,
                      quickRating,
                    })
                  }
                />
              </div>
            </article>
          );
        })}

        <section className="rounded-3xl bg-teal-900 p-7 text-center text-white">
          <h2 className="text-2xl font-bold">
            Help Shape the Next Release
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-teal-100">
            Tell us what worked in a real room, what needed
            more explanation and what would help your team
            use this content with confidence.
          </p>

          <button
            type="button"
            onClick={() => setIsFeedbackOpen(true)}
            className="mt-5 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300"
          >
            Share Full Trial Feedback
          </button>
        </section>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-3 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.12)] backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-slate-950">
              Ladder 1 Free Educator Trial
            </p>

            <p className="text-[11px] text-slate-500">
              Your feedback shapes future releases.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsFeedbackOpen(true)}
            className="shrink-0 rounded-xl bg-teal-800 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-900"
          >
            Share Feedback
          </button>
        </div>
      </div>

      <EducatorTrialFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </div>
  );
}

function ContentBox({
  title,
  className,
  children,
}: {
  title: string;
  className: string;
  children: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${className}`}
    >
      <h3 className="text-xs font-bold uppercase tracking-wider">
        {title}
      </h3>

      <p className="mt-1 text-sm leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function QuickFeedbackButtons({
  currentState,
  onSelect,
}: {
  currentState:
    | QuickRating
    | 'submitting'
    | 'error'
    | undefined;

  onSelect: (rating: QuickRating) => void;
}) {
  const hasSubmitted =
    currentState === 'helpful' ||
    currentState === 'not_sure' ||
    currentState === 'not_relevant';

  return (
    <div className="border-t border-slate-100 pt-4">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-600">
        Was This Useful?
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {ratingOptions.map((option) => {
          const isSelected =
            currentState === option.value;

          return (
            <button
              key={option.value}
              type="button"
              disabled={
                currentState === 'submitting' ||
                hasSubmitted
              }
              onClick={() => onSelect(option.value)}
              className={`rounded-full border px-3 py-2 text-xs font-bold transition disabled:cursor-not-allowed ${
                isSelected
                  ? 'border-teal-800 bg-teal-800 text-white'
                  : 'border-slate-300 bg-white text-slate-700 hover:border-teal-700 hover:text-teal-800 disabled:opacity-60'
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {currentState === 'submitting' && (
        <p className="mt-2 text-xs text-slate-500">
          Saving your response...
        </p>
      )}

      {hasSubmitted && (
        <p className="mt-2 text-xs font-semibold text-teal-800">
          Thank you. Your response has been recorded.
        </p>
      )}

      {currentState === 'error' && (
        <p className="mt-2 text-xs font-semibold text-rose-700">
          Your response could not be saved. Please try
          again.
        </p>
      )}
    </div>
  );
}