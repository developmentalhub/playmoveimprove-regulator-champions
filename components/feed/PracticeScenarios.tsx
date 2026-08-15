'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  practiceScenarios,
  type PracticeScenario,
} from '@/lib/practiceScenarios';

export default function PracticeScenarios() {
  const [selectedScenario, setSelectedScenario] =
    useState<PracticeScenario | null>(null);

  return (
    <>
      <section className="space-y-6">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            Practice Scenarios
          </span>

          <h2 className="mt-3 text-2xl font-bold text-slate-900">
            Pause Before Choosing the Response
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
            Each scenario presents a familiar early childhood moment. Open a
            card to compare a common pressured response with a more reflective
            approach.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {practiceScenarios.map((scenario) => (
            <article
              key={scenario.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <Image
                  src={scenario.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />

                <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-900 shadow-sm">
                  {scenario.ageGroup}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between space-y-5 p-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {scenario.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {scenario.summary}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedScenario(scenario)}
                  className="w-full rounded-xl bg-teal-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                >
                  Explore This Scenario
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm leading-relaxed text-slate-600">
            These scenarios provide general professional learning prompts. They
            do not replace your service policies, child-safe procedures,
            supervision responsibilities or individual professional advice.
          </p>
        </div>
      </section>

      {selectedScenario && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="scenario-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedScenario(null);
            }
          }}
        >
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-3xl md:p-8">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  {selectedScenario.ageGroup}
                </span>

                <h2
                  id="scenario-title"
                  className="mt-2 text-xl font-bold text-slate-900 md:text-2xl"
                >
                  {selectedScenario.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedScenario(null)}
                className="rounded-lg px-3 py-2 text-sm font-bold text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-700"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  The Situation
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {selectedScenario.situation}
                </p>
              </section>

              <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-rose-900">
                  A Common Pressured Response
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-rose-950">
                  {selectedScenario.commonResponse}
                </p>
              </section>

              <section className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900">
                  A More Reflective Response
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-teal-950">
                  {selectedScenario.reflectiveResponse}
                </p>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Why This May Help
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-slate-700">
                  {selectedScenario.whyItMatters}
                </p>
              </section>

              <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                  Reflection Prompt
                </h3>

                <p className="mt-2 text-sm font-semibold leading-relaxed text-amber-950">
                  {selectedScenario.reflectionPrompt}
                </p>
              </section>

              <button
                type="button"
                onClick={() => setSelectedScenario(null)}
                className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
              >
                Return to Scenarios
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}