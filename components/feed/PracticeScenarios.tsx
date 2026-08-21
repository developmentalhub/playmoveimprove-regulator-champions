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

  const [activeStep, setActiveStep] = useState<
    'notice' | 'response' | 'why' | 'reflect'
  >('notice');

  const openScenario = (scenario: PracticeScenario) => {
    setSelectedScenario(scenario);
    setActiveStep('notice');
  };

  return (
    <>
      <section className="space-y-6">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-[#FAF5EC] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
            Practice Scenarios
          </span>

          <h2 className="mt-3 text-2xl font-extrabold text-[#1C3B34] md:text-3xl">
            What would you notice first?
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
            Tap a familiar room moment and work through it one step at a time.
          </p>
        </div>

        <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {practiceScenarios.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              onClick={() => openScenario(scenario)}
              className="group min-w-[78vw] snap-center overflow-hidden rounded-3xl border-2 border-[#E6E2DC] bg-white text-left shadow-sm transition hover:border-[#657B6C] sm:min-w-0"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-[#F1F4F2]">
                <Image
                  src={scenario.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-300 group-hover:scale-[1.02]"
                />

                <span className="absolute left-3 top-3 rounded-full border border-white/70 bg-white/90 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1C3B34] shadow-sm">
                  {scenario.ageGroup}
                </span>
              </div>

              <div className="p-5">
                <h3 className="text-base font-extrabold leading-snug text-[#1C3B34]">
                  {scenario.title}
                </h3>

                <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#6A7873]">
                  {scenario.summary}
                </p>

                <span className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-xs font-extrabold text-white transition group-hover:bg-[#284E45]">
                  Tap to explore
                </span>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-4">
          <p className="text-xs leading-relaxed text-[#6A7873]">
            Use these scenarios for reflection alongside your service policies,
            child-safe procedures and professional judgement.
          </p>
        </div>
      </section>

      {selectedScenario && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="scenario-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#10231F]/80 p-0 backdrop-blur-sm sm:items-center sm:p-5"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedScenario(null);
            }
          }}
        >
          <div className="max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-t-4xl bg-white shadow-2xl sm:rounded-4xl">
            {/* IMAGE HEADER */}
            <div className="relative aspect-16/7 overflow-hidden bg-[#F1F4F2]">
              <Image
                src={selectedScenario.image}
                alt=""
                fill
                sizes="672px"
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#1C3B34]/80 via-transparent to-transparent" />

              <button
                type="button"
                onClick={() => setSelectedScenario(null)}
                className="absolute right-4 top-4 flex min-h-12 items-center justify-center rounded-full bg-white/95 px-4 text-xs font-bold text-[#1C3B34] shadow"
              >
                Close
              </button>

              <div className="absolute inset-x-5 bottom-5">
                <span className="inline-flex rounded-full bg-[#C29F60] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1C3B34]">
                  {selectedScenario.ageGroup}
                </span>

                <h2
                  id="scenario-title"
                  className="mt-2 max-w-xl text-2xl font-extrabold leading-tight text-white"
                >
                  {selectedScenario.title}
                </h2>
              </div>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              {/* SITUATION */}
              <section className="rounded-2xl bg-[#FAF8F5] p-4">
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                  The moment
                </span>

                <p className="mt-2 text-sm leading-relaxed text-[#2B3833]">
                  {selectedScenario.situation}
                </p>
              </section>

              {/* STEP BUTTONS */}
              <div className="grid grid-cols-4 gap-2">
                {[
                  {
                    id: 'notice',
                    label: 'Notice',
                  },
                  {
                    id: 'response',
                    label: 'Respond',
                  },
                  {
                    id: 'why',
                    label: 'Why',
                  },
                  {
                    id: 'reflect',
                    label: 'Reflect',
                  },
                ].map((step) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() =>
                      setActiveStep(
                        step.id as
                          | 'notice'
                          | 'response'
                          | 'why'
                          | 'reflect',
                      )
                    }
                    className={`min-h-12 rounded-xl border-2 px-2 py-3 text-xs font-extrabold transition ${
                      activeStep === step.id
                        ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                        : 'border-[#E6E2DC] bg-white text-[#1C3B34]'
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>

              {/* NOTICE */}
              {activeStep === 'notice' && (
                <section className="rounded-3xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
                    Before reacting
                  </span>

                  <h3 className="mt-2 text-lg font-extrabold text-[#1C3B34]">
                    What might we be missing?
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#2B3833]">
                    {selectedScenario.summary}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveStep('response')}
                    className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#C29F60] px-4 py-3 text-sm font-extrabold text-[#1C3B34]"
                  >
                    Compare the responses
                  </button>
                </section>
              )}

              {/* RESPONSE */}
              {activeStep === 'response' && (
                <section className="space-y-3">
                  <div className="rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#6A7873]">
                      Under pressure we might
                    </span>

                    <p className="mt-2 text-sm leading-relaxed text-[#2B3833]">
                      {selectedScenario.commonResponse}
                    </p>
                  </div>

                  <div className="rounded-2xl border-2 border-[#657B6C] bg-[#F1F4F2] p-5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#657B6C]">
                      Instead, we could try
                    </span>

                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[#1C3B34]">
                      {selectedScenario.reflectiveResponse}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveStep('why')}
                    className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-sm font-extrabold text-white"
                  >
                    Why might that help?
                  </button>
                </section>
              )}

              {/* WHY */}
              {activeStep === 'why' && (
                <section className="rounded-3xl border-2 border-[#657B6C]/40 bg-[#F1F4F2] p-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                    Why this may help
                  </span>

                  <p className="mt-3 text-sm leading-relaxed text-[#2B3833]">
                    {selectedScenario.whyItMatters}
                  </p>

                  <button
                    type="button"
                    onClick={() => setActiveStep('reflect')}
                    className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#657B6C] px-4 py-3 text-sm font-extrabold text-white"
                  >
                    One reflection question
                  </button>
                </section>
              )}

              {/* REFLECT */}
              {activeStep === 'reflect' && (
                <section className="rounded-3xl border-2 border-[#C29F60] bg-[#FAF5EC] p-5">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
                    Take back to your team
                  </span>

                  <h3 className="mt-2 text-lg font-extrabold leading-snug text-[#1C3B34]">
                    {selectedScenario.reflectionPrompt}
                  </h3>

                  <button
                    type="button"
                    onClick={() => setSelectedScenario(null)}
                    className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-sm font-extrabold text-white"
                  >
                    Done
                  </button>
                </section>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}