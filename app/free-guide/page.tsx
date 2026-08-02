'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Micro Course Steps mapped directly to ladder rungs
const COURSE_STEPS = [
  {
    stepNumber: 1,
    title: 'Morning Battery Check',
    subtitle: 'Ladder 1 · Rung 1',
    image: '/images/ladders/ladder1_rung01.png',
    summary: 'Before checking your phone or stepping onto the floor, notice your body battery. Are you holding jaw tension or shallow chest breathing?',
    actionPrompt: 'Unclench your teeth and drop your shoulders away from your ears.',
  },
  {
    stepNumber: 2,
    title: '60-Second Light & Air Reset',
    subtitle: 'Ladder 1 · Rung 2',
    image: '/images/ladders/ladder1_rung02.png',
    summary: 'Step outside for 60 seconds before entering the building. Natural light and outdoor air signal safety to your nervous system.',
    actionPrompt: 'Take three slow exhales in outdoor light.',
  },
  {
    stepNumber: 3,
    title: 'Commute Sensory Pacing',
    subtitle: 'Ladder 1 · Rung 3',
    image: '/images/ladders/ladder1_rung03.png',
    summary: 'Match your commute audio to your sensory state. Choose silence or soft acoustics when your brain feels overloaded before arrival.',
    actionPrompt: 'Protect your focus during your morning travel.',
  },
  {
    stepNumber: 4,
    title: 'Staffroom Energy Boundary',
    subtitle: 'Ladder 1 · Rung 4',
    image: '/images/ladders/ladder1_rung04.png',
    summary: 'Avoid absorbing staffroom venting before your shift starts. Replace room complaints with quiet, steady connection.',
    actionPrompt: 'Offer one word of encouragement to a co-worker today.',
  },
  {
    stepNumber: 5,
    title: 'Step Onto Floor as a Mobile Anchor',
    subtitle: 'Ladder 1 · Rung 5',
    image: '/images/ladders/ladder1_rung05.png',
    summary: 'Enter the room regulated. When room volume spikes, loan your calm nervous system to dysregulated children rather than shouting.',
    actionPrompt: 'Lower your physical height parallel to children before speaking.',
  },
];

export default function FreeGuidePage() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const totalSteps = COURSE_STEPS.length;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
      
      {/* HEADER BAR */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            ← Home
          </Link>
          <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-[11px] font-bold text-amber-950">
            Micro Course Module
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8 space-y-6">

        {/* PROGRESS BAR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Step {currentStep + 1} of {totalSteps}</span>
            <span>{COURSE_STEPS[currentStep].subtitle}</span>
          </div>
          <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-700 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* INTERACTIVE COURSE CARD */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden space-y-0">
          
          {/* STEP IMAGE */}
          <div className="relative w-full bg-slate-100">
            <img
              src={COURSE_STEPS[currentStep].image}
              alt={COURSE_STEPS[currentStep].title}
              className="w-full h-auto object-cover max-h-80"
            />
          </div>

          {/* CARD CONTENT */}
          <div className="p-6 space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 block">
                Step {COURSE_STEPS[currentStep].stepNumber}
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {COURSE_STEPS[currentStep].title}
              </h1>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {COURSE_STEPS[currentStep].summary}
            </p>

            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs font-bold text-amber-950">
              Focus: {COURSE_STEPS[currentStep].actionPrompt}
            </div>

            {/* CONTROLS */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                disabled={currentStep === 0}
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition disabled:opacity-40"
              >
                ← Previous
              </button>

              {!isLastStep ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => prev + 1)}
                  className="rounded-xl bg-teal-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-teal-900 transition shadow-xs cursor-pointer"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentStep(0)}
                  className="rounded-xl bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition shadow-xs cursor-pointer"
                >
                  Restart Module ↺
                </button>
              )}
            </div>

          </div>

        </div>

        {/* PRINTABLE PDF DOWNLOADS */}
        <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6 space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-sm font-bold text-teal-950">
              Printable PDF Card Packs
            </h2>
            <p className="text-xs text-teal-900 leading-relaxed">
              Download the matching PDF cards for your room walls, leadership team, or family handover doors.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <a
              href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-teal-800 px-3.5 py-2.5 text-center text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition"
            >
              Educator Routine Cards →
            </a>

            <a
              href="/pdf/Calm-Posters.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-amber-400 px-3.5 py-2.5 text-center text-xs font-bold text-slate-950 shadow-xs hover:bg-amber-300 transition"
            >
              CALM Room Posters →
            </a>

            <a
              href="/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-teal-700 bg-white px-3.5 py-2.5 text-center text-xs font-bold text-teal-950 hover:bg-teal-100 transition"
            >
              Manager / Director Cards →
            </a>

            <a
              href="/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-teal-700 bg-white px-3.5 py-2.5 text-center text-xs font-bold text-teal-950 hover:bg-teal-100 transition"
            >
              Parent &amp; Family Cards →
            </a>
          </div>
        </div>

        {/* CTA TO PROPOSAL FOR DIRECTORS */}
        <div className="rounded-3xl bg-teal-900 p-6 text-center text-white space-y-3">
          <h3 className="text-base font-bold">Want All 8 Printable Routine Ladders?</h3>
          <p className="text-xs text-teal-100 max-w-xs mx-auto leading-relaxed">
            The full $4,790 Whole Centre Membership includes physical room posters, video demonstrations, and 12 months of staffroom learning sets.
          </p>
          <Link
            href="/proposal"
            className="inline-block rounded-xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-xs"
          >
            View Official Centre Proposal Pack ($4,790) →
          </Link>
        </div>

      </main>
    </div>
  );
}