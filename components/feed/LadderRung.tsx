'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type {
  RegulationLadder,
  RegulationLadderRung,
} from '@/lib/regulationLadders';

type SaveStatus = 'idle' | 'saving' | 'success' | 'error';

type SaveResponse = {
  success?: boolean;
  error?: string;
};

type LadderRungProps = {
  ladder: RegulationLadder;
  rung: RegulationLadderRung;
  rungIndex: number;
  userEmail: string;
  isFirstRung: boolean;
  isLastRung: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onReturnToLadders: () => void;
};

export default function LadderRung({
  ladder,
  rung,
  rungIndex,
  userEmail,
  isFirstRung,
  isLastRung,
  onPrevious,
  onNext,
  onReturnToLadders,
}: LadderRungProps) {
  const [reflectionText, setReflectionText] = useState('');
  const [evidenceText, setEvidenceText] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setReflectionText('');
    setEvidenceText('');
    setSaveStatus('idle');
    setSaveMessage('');
  }, [ladder.id, rung.number]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanedEmail = userEmail.trim().toLowerCase();
    const cleanedReflection = reflectionText.trim();
    const cleanedEvidence = evidenceText.trim();

    setSaveStatus('idle');
    setSaveMessage('');

    if (!cleanedEmail) {
      setSaveStatus('error');
      setSaveMessage(
        'Enter and save your work email at the top of the Practice Hub before submitting ladder work.',
      );
      return;
    }

    if (cleanedReflection.length < 40) {
      setSaveStatus('error');
      setSaveMessage(
        'Add more detail about what you noticed, changed or learned.',
      );
      return;
    }

    if (cleanedEvidence.length < 30) {
      setSaveStatus('error');
      setSaveMessage(
        'Add a brief example showing what happened in practice.',
      );
      return;
    }

    setSaveStatus('saving');

    try {
      const response = await fetch('/api/ladder-rung', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail: cleanedEmail,
          ladderId: ladder.id,
          ladderTitle: ladder.title,
          rungNumber: rung.number,
          rungTitle: rung.title,
          reflectionText: cleanedReflection,
          evidenceText: cleanedEvidence,
        }),
      });

      let responseData: SaveResponse = {};

      try {
        responseData = (await response.json()) as SaveResponse;
      } catch {
        responseData = {};
      }

      if (!response.ok || responseData.success !== true) {
        throw new Error(
          responseData.error ??
            'Your ladder reflection could not be saved. Please try again.',
        );
      }

      setSaveStatus('success');
      setSaveMessage(
        isLastRung
          ? 'Your final rung has been saved. This ladder is now ready to appear in your progress summary.'
          : 'Your reflection has been saved. You can continue to the next rung.',
      );
    } catch (error) {
      console.error('Ladder rung save failed:', error);

      setSaveStatus('error');
      setSaveMessage(
        error instanceof Error
          ? error.message
          : 'Your ladder reflection could not be saved. Please try again.',
      );
    }
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-85 bg-slate-100 lg:min-h-170">
          <Image
            src={rung.image}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/60 bg-white/90 p-4 text-center shadow-lg backdrop-blur-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
              Rung {rungIndex + 1} of {ladder.rungs.length}
            </span>

            <h2 className="mt-1 text-lg font-bold text-slate-900">
              {rung.title}
            </h2>
          </div>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <section>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Practice Focus
            </span>

            <p className="mt-2 text-base font-semibold leading-relaxed text-slate-900">
              {rung.focus}
            </p>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
              What to Trial
            </h3>

            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {rung.practicePrompt}
            </p>
          </section>

          <section className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900">
              Reflection Question
            </h3>

            <p className="mt-2 text-sm font-semibold leading-relaxed text-teal-950">
              {rung.reflectionQuestion}
            </p>
          </section>

          <form onSubmit={handleSubmit} className="space-y-5">
            {saveStatus === 'error' && (
              <div
                role="alert"
                className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-900"
              >
                {saveMessage}
              </div>
            )}

            {saveStatus === 'success' && (
              <div
                role="status"
                className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-relaxed text-emerald-950"
              >
                <strong className="block">Reflection saved</strong>
                <span>{saveMessage}</span>
              </div>
            )}

            <div>
              <label
                htmlFor={`reflection-${ladder.id}-${rung.number}`}
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                What You Noticed
              </label>

              <textarea
                id={`reflection-${ladder.id}-${rung.number}`}
                rows={5}
                required
                maxLength={5000}
                value={reflectionText}
                onChange={(event) => {
                  setReflectionText(event.target.value);

                  if (saveStatus !== 'saving') {
                    setSaveStatus('idle');
                    setSaveMessage('');
                  }
                }}
                placeholder="Describe what you noticed, what you changed and what happened afterwards. Do not include identifying child or family information."
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label
                htmlFor={`evidence-${ladder.id}-${rung.number}`}
                className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Practice Example
              </label>

              <p className="mb-2 text-sm leading-relaxed text-slate-600">
                {rung.evidencePrompt}
              </p>

              <textarea
                id={`evidence-${ladder.id}-${rung.number}`}
                rows={4}
                required
                maxLength={5000}
                value={evidenceText}
                onChange={(event) => {
                  setEvidenceText(event.target.value);

                  if (saveStatus !== 'saving') {
                    setSaveStatus('idle');
                    setSaveMessage('');
                  }
                }}
                placeholder="Add a short example from practice without names, photographs or identifying details."
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs leading-relaxed text-amber-950">
                Do not include names, dates of birth, diagnoses, photographs,
                centre incident details or information that could identify a
                child or family.
              </p>
            </div>

            <button
              type="submit"
              disabled={saveStatus === 'saving'}
              className="w-full rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
            >
              {saveStatus === 'saving'
                ? 'Saving Reflection...'
                : isLastRung
                  ? 'Save Final Rung'
                  : 'Save This Rung'}
            </button>
          </form>

          <div className="grid grid-cols-2 gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onPrevious}
              disabled={isFirstRung}
              className="rounded-xl border border-slate-300 bg-white py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Previous Rung
            </button>

            {isLastRung ? (
              <button
                type="button"
                onClick={onReturnToLadders}
                className="rounded-xl border border-teal-200 bg-teal-50 py-3 text-sm font-bold text-teal-800 transition hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
              >
                Return to Ladders
              </button>
            ) : (
              <button
                type="button"
                onClick={onNext}
                className="rounded-xl border border-teal-200 bg-teal-50 py-3 text-sm font-bold text-teal-800 transition hover:bg-teal-100 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
              >
                Next Rung
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}