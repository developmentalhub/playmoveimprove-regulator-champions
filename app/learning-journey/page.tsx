'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// PDF Assets mapped 1:1 to your exact public/pdf/ folder
const PDF_CARDS = [
  {
    id: 'educator-cards',
    title: 'Educator Morning Routine Cards',
    desc: 'Step-by-step room cards for educators during morning arrivals and transition routines.',
    badge: '/images/badges/badge_checkin.png',
    pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
    timeToComplete: 'Educator Pack',
  },
  {
    id: 'calm-posters',
    title: 'CALM Framework Room Posters Vault',
    desc: 'Printable room posters covering the CALM Framework: Check the Room, Assess the Why, Lead with Connection, Monitor and Note, with a safety-first reminder throughout.',
    badge: '/images/badges/badge_risk_outdoor.png',
    pdfUrl: '/pdf/Calm-Posters.pdf',
    timeToComplete: 'Room Poster Vault',
  },
  {
    id: 'manager-cards',
    title: 'Manager & Leadership Strategy Cards',
    desc: 'Leadership prompts for handovers, team reflection, shared practice and documenting professional learning priorities.',
    badge: '/images/badges/badge_risk_roughplay.png',
    pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
    timeToComplete: 'Leadership Pack',
  },
  {
    id: 'parent-cards',
    title: 'Parent & Family Handover Cards',
    desc: 'Arrival and handover prompts to support consistent, respectful communication with families during drop-off.',
    badge: '/images/badges/badge_risk_water.png',
    pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
    timeToComplete: 'Family Pack',
  },
];

// Flip Card Deck Data
const FLIP_CARDS = [
  {
    id: 'card-1',
    frontTitle: '1. Regulated Educator First',
    frontSubtitle: 'Adult Pace and Regulation',
    frontImage: '/images/ladders/ladder1_rung01.png',
    badgeImage: '/images/badges/badge_checkin.png',
    backTitle: 'Action Strategy:',
    backAction:
      'Lower your physical height when appropriate, slow your pace and reduce unnecessary language before adding more instructions during a demanding moment.',
    pdfLink: '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
  {
    id: 'card-2',
    frontTitle: '2. Connected Drop-Offs',
    frontSubtitle: 'Arrival and Separation Support',
    frontImage: '/images/ladders/ladder2_rung01.png',
    badgeImage: '/images/badges/badge_risk_roughplay.png',
    backTitle: 'Action Strategy:',
    backAction:
      'Use a predictable welcome cue at the doorway. Greet the child gently and allow the family handover to happen without rushing separation.',
    pdfLink: '/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
  },
  {
    id: 'card-3',
    frontTitle: '3. Participation Beyond Stillness',
    frontSubtitle: 'Group Time Participation',
    frontImage: '/images/ladders/ladder3_rung01.png',
    badgeImage: '/images/badges/badge_risk_water.png',
    backTitle: 'Action Strategy:',
    backAction:
      'Wiggling during group time does not automatically mean a child is not listening. Consider standing, a different sitting position or another appropriate participation option when helpful.',
    pdfLink: '/pdf/Calm-Posters.pdf',
  },
];

export default function LearningJourneyPage() {
  // Toggle State for "Styled vs Substance"
  const [toggleState, setToggleState] = useState<'styled' | 'substance'>(
    'styled'
  );

  // Flip State for Cards
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            ← Back to Home
          </Link>

          <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-[11px] font-bold text-amber-950">
            Guided Learning Journey
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-12">
        {/* HERO ROADMAP BANNER */}
        <section className="rounded-3xl bg-teal-950 text-white p-8 md:p-10 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              Director &amp; Educator Roadmap
            </span>

            <h1 className="text-2xl font-extrabold md:text-4xl">
              How to Use Regulator Champions in Your Centre
            </h1>

            <p className="text-xs text-teal-100 max-w-2xl leading-relaxed">
              Use this four-step pathway during a short planning break or team
              discussion. Move from observing the environment to choosing a
              practical response, printing shared prompts and checking your own
              state before returning to the room.
            </p>
          </div>

          {/* 4-STEP PROGRESSION PIPELINE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-teal-800/80">
            <div className="p-3 rounded-2xl bg-teal-900/60 border border-teal-700/60 text-xs">
              <strong className="block text-amber-300 font-bold mb-0.5">
                1. Observe
              </strong>
              <p className="text-[11px] text-teal-100">
                Compare room setup and demand
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-teal-900/60 border border-teal-700/60 text-xs">
              <strong className="block text-amber-300 font-bold mb-0.5">
                2. Tap-to-Flip
              </strong>
              <p className="text-[11px] text-teal-100">
                Learn 15-word room actions
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-teal-900/60 border border-teal-700/60 text-xs">
              <strong className="block text-amber-300 font-bold mb-0.5">
                3. Print Cards
              </strong>
              <p className="text-[11px] text-teal-100">
                Display A3 room posters
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-teal-900/60 border border-teal-700/60 text-xs">
              <strong className="block text-amber-300 font-bold mb-0.5">
                4. Somatic Check-In
              </strong>
              <p className="text-[11px] text-teal-100">
                Notice your body state
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-900">
            Use Observation, Not Assumptions
          </span>

          <p className="mt-2 text-sm leading-relaxed text-amber-950">
            These examples are designed to help educators notice patterns in
            environment, routines, movement and adult responses. They are not a
            diagnostic tool and should not be used to decide that a child&apos;s
            behaviour has one specific sensory, emotional or developmental
            cause.
          </p>
        </section>

        {/* STEP 1: INTERACTIVE STYLED VS SUBSTANCE TOGGLE */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                Step 1: Visual Observation
              </span>

              <h2 className="text-xl font-bold text-slate-900">
                What the Room Looks Like vs. What the Room Demands
              </h2>
            </div>

            {/* TOGGLE BUTTON SWITCH */}
            <div className="flex items-center rounded-2xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setToggleState('styled')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  toggleState === 'styled'
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                What We See
              </button>

              <button
                type="button"
                onClick={() => setToggleState('substance')}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  toggleState === 'substance'
                    ? 'bg-amber-400 text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                What Is Happening
              </button>
            </div>
          </div>

          {/* DYNAMIC IMAGE DISPLAY */}
          <div className="space-y-4">
            <div className="relative rounded-2xl bg-slate-100 overflow-hidden min-h-72 border border-slate-200 flex items-center justify-center">
              <img
                src={
                  toggleState === 'styled'
                    ? '/images/aesthetic/card1_styled.png'
                    : '/images/aesthetic/card1_substance.png'
                }
                alt="Styled vs Substance Comparison"
                className="w-full h-auto object-cover max-h-96 transition-opacity duration-300"
              />
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200 text-xs text-slate-700 leading-relaxed font-medium">
              {toggleState === 'styled' ? (
                <p>
                  <strong>Surface View:</strong> A room can look calm and well
                  organised while still creating movement bottlenecks, long
                  waiting periods or limited opportunities for active play. Look
                  beyond appearance and notice how children actually move through
                  the space.
                </p>
              ) : (
                <p>
                  <strong>Developmental View:</strong> Throwing, crashing or
                  constant movement can have many possible causes. Rather than
                  assuming one sensory explanation, look at the environment,
                  timing, crowding, movement opportunities and what happened
                  before and after. Purposeful carrying, climbing or pushing
                  activities may be useful options for some children.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* STEP 2: TAP-TO-FLIP STRATEGY DECK */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
              Step 2: 15-Word Micro Cards
            </span>

            <h2 className="text-xl font-bold text-slate-900">
              Tap Any Card to Reveal the Room Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FLIP_CARDS.map((card) => {
              const isFlipped = Boolean(flippedCards[card.id]);

              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlip(card.id)}
                  className="cursor-pointer rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-teal-600 transition min-h-80 flex flex-col justify-between space-y-4"
                >
                  {!isFlipped ? (
                    <div className="space-y-4 flex flex-col justify-between h-full">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                            {card.frontSubtitle}
                          </span>

                          <img
                            src={card.badgeImage}
                            alt="Badge stamp"
                            className="h-8 w-8 object-contain"
                          />
                        </div>

                        <h3 className="text-base font-bold text-slate-900 leading-snug">
                          {card.frontTitle}
                        </h3>
                      </div>

                      <div className="rounded-2xl overflow-hidden bg-slate-100 h-40">
                        <img
                          src={card.frontImage}
                          alt={card.frontTitle}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <span className="block text-center text-xs font-bold text-teal-800 pt-2 border-t border-slate-100">
                        Tap Card to Flip Strategy ↺
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-4 flex flex-col justify-between h-full bg-teal-900 text-white p-4 -m-6 rounded-3xl">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300">
                          {card.backTitle}
                        </span>

                        <p className="text-xs leading-relaxed text-teal-100 font-medium">
                          {card.backAction}
                        </p>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-teal-800">
                        <a
                          href={card.pdfLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(event) => event.stopPropagation()}
                          className="block text-center rounded-xl bg-amber-400 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition"
                        >
                          Download PDF Routine Card →
                        </a>

                        <span className="block text-center text-[10px] text-teal-300">
                          Tap to flip back
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* STEP 3: INDIVIDUAL PRINTABLE PDF CARDS */}
        <section className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
              Step 3: Print &amp; Display Vault
            </span>

            <h2 className="text-xl font-bold text-slate-900">
              Individual Room Posters Ready for Your Wall
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PDF_CARDS.map((pdf) => (
              <div
                key={pdf.id}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs flex items-center gap-5 hover:border-teal-600 transition"
              >
                <img
                  src={pdf.badge}
                  alt={pdf.title}
                  className="h-16 w-16 shrink-0 object-contain"
                />

                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800">
                    {pdf.timeToComplete}
                  </span>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {pdf.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pdf.desc}
                  </p>

                  <a
                    href={pdf.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition mt-1"
                  >
                    Open &amp; Print PDF Card →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Related Learning
          </span>

          <h2 className="mt-1 text-2xl font-bold text-teal-950">
            Connect this journey with your wider regulation learning
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/free-guide"
              className="rounded-xl bg-teal-800 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Free Regulation Guide →
            </Link>

            <Link
              href="/co-regulation-early-childhood"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Co-Regulation Guide →
            </Link>

            <Link
              href="/emotional-regulation-early-childhood"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Emotional Regulation Guide →
            </Link>

            <Link
              href="/educator-capacity-building"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Educator Capacity Building →
            </Link>
          </div>
        </section>

        <section className="rounded-3xl bg-teal-950 p-7 text-center text-white md:p-9">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Regulator Champions
          </span>

          <h2 className="mt-2 text-2xl font-extrabold">
            Ready to continue beyond the free resources?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-teal-100">
            Start with the 3-Ladder Preview for $1,790 including GST and six
            months of access, or choose the full 8-Ladder pathway for $4,790
            including GST and 12 months of access.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="rounded-xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
            >
              3-Ladder Preview — $1,790 →
            </Link>

            <Link
              href="/proposal?plan=full"
              className="rounded-xl border border-teal-700 bg-teal-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-800"
            >
              Full 8-Ladder Pathway — $4,790 →
            </Link>
          </div>
        </section>

        {/* STEP 4: CTA TO SOMATIC CHECKIN */}
        <section className="rounded-3xl bg-amber-400 p-8 text-slate-950 text-center space-y-4 shadow-md">
          <h2 className="text-xl font-extrabold md:text-2xl">
            Step 4: Check Your Staffroom Somatic State
          </h2>

          <p className="text-xs font-medium max-w-lg mx-auto leading-relaxed">
            Take a brief body-awareness check before returning to the room.
            Notice jaw tension, breathing, shoulder position and whether a
            simple sensory or movement anchor may help you slow your pace.
          </p>

          <Link
            href="/somatic-checkin"
            className="inline-block rounded-xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow hover:bg-slate-800 transition"
          >
            Launch the Somatic Check-In →
          </Link>
        </section>
      </main>
    </div>
  );
}