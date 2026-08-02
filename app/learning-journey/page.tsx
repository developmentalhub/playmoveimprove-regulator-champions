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
    desc: 'Printable room posters covering the CALM Framework, Check the Room, Assess the Why, Lead with Connection, Monitor and Note, alongside a safety-first check before every step.',
    badge: '/images/badges/badge_risk_outdoor.png',
    pdfUrl: '/pdf/Calm-Posters.pdf',
    timeToComplete: 'Room Poster Vault',
  },
  {
    id: 'manager-cards',
    title: 'Manager & Leadership Strategy Cards',
    desc: 'Leadership tools for shift handovers, staffroom pacing, and director QIP evidence.',
    badge: '/images/badges/badge_risk_roughplay.png',
    pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
    timeToComplete: 'Leadership Pack',
  },
  {
    id: 'parent-cards',
    title: 'Parent & Family Handover Cards',
    desc: 'Separation anxiety and arrival handover cards to share directly with families at drop-off doors.',
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
    frontSubtitle: 'Adult Nervous System Pacing',
    frontImage: '/images/ladders/ladder1_rung01.png',
    badgeImage: '/images/badges/badge_checkin.png',
    backTitle: 'Action Strategy:',
    backAction:
      'Lower your physical height parallel to children before speaking during room overstimulation. Loan your calm body before giving verbal commands.',
    pdfLink: '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
  {
    id: 'card-2',
    frontTitle: '2. Connected Drop-Offs',
    frontSubtitle: 'Separation & Arrival Anxiety',
    frontImage: '/images/ladders/ladder2_rung01.png',
    badgeImage: '/images/badges/badge_risk_roughplay.png',
    backTitle: 'Action Strategy:',
    backAction:
      'Establish a nonverbal welcome anchor at the doorway. Greet the child at eye level without pulling them away from their parent.',
    pdfLink: '/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
  },
  {
    id: 'card-3',
    frontTitle: '3. Participation Beyond Stillness',
    frontSubtitle: 'Mat Time & Group Pacing',
    frontImage: '/images/ladders/ladder3_rung01.png',
    badgeImage: '/images/badges/badge_risk_water.png',
    backTitle: 'Action Strategy:',
    backAction:
      'Wiggling on the carpet is often postural waking, not defiance. Provide heavy work lap pads or standing options during stories.',
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
              Follow this step-by-step pathway during your 15-minute planning
              break. Move from visual observation to printable room routines in
              4 simple steps.
            </p>
          </div>

          {/* 4-STEP PROGRESSION PIPELINE */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-teal-800/80">
            <div className="p-3 rounded-2xl bg-teal-900/60 border border-teal-700/60 text-xs">
              <strong className="block text-amber-300 font-bold mb-0.5">
                1. Diagnostic
              </strong>
              <p className="text-[11px] text-teal-100">
                Toggle Styled vs. Substance
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
                4. Somatic Reset
              </strong>
              <p className="text-[11px] text-teal-100">
                Check staffroom vagus nerve
              </p>
            </div>
          </div>
        </section>

        {/* STEP 1: INTERACTIVE STYLED VS SUBSTANCE TOGGLE */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
                Step 1: Visual Diagnostic
              </span>

              <h2 className="text-xl font-bold text-slate-900">
                Styled Room vs. Developmental Substance
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
                  <strong>Surface View:</strong> A room set up for visual
                  neatness can accidentally restrict heavy proprioceptive
                  movement, causing sudden energy spikes, block throwing, and
                  doorway bottlenecks.
                </p>
              ) : (
                <p>
                  <strong>Developmental View:</strong> Children throwing or
                  crashing are seeking joint resistance. Adding heavy work
                  zones, carrying tasks, and visual boundaries channels that
                  motor drive safely.
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

        {/* STEP 4: CTA TO SOMATIC CHECKIN */}
        <section className="rounded-3xl bg-amber-400 p-8 text-slate-950 text-center space-y-4 shadow-md">
          <h2 className="text-xl font-extrabold md:text-2xl">
            Step 4: Check Your Staffroom Somatic State
          </h2>

          <p className="text-xs font-medium max-w-lg mx-auto leading-relaxed">
            Perform a 60-second vagus nerve check-in before stepping onto the
            floor. Identify jaw tightness, shallow breathing, and staffroom
            sensory anchors.
          </p>

          <Link
            href="/somatic-checkin"
            className="inline-block rounded-xl bg-slate-950 px-6 py-3.5 text-xs font-bold text-white shadow hover:bg-slate-800 transition"
          >
            Launch Interactive Somatic Reset Tool →
          </Link>
        </section>
      </main>
    </div>
  );
}