'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import MemberSignOutButton from '../../components/MemberSignOutButton';

const EASE_PILLARS = [
  {
    letter: 'E',
    title: 'Environment & Acoustics',
    focus: 'Room Bottlenecks & Environmental Load',
    image: '/images/feed/08_transitions.png',
    badge: '/images/badges/badge_risk_outdoor.png',
    insight:
      'Hard surfaces, crowded doorways, busy bag areas and competing noise can add extra demand before an activity even begins. Rather than assuming a child is simply refusing, first consider whether the environment is making the routine harder to manage.',
    monthTwoStrategy:
      'Trial clearer walking pathways, quieter zones and staggered doorway entry where these changes are practical for your service.',
  },
  {
    letter: 'A',
    title: 'Attachment & Proximity',
    focus: 'Separation Distress & Relational Safety',
    image: '/images/feed/02_toddler_room.png',
    badge: '/images/badges/badge_checkin.png',
    insight:
      'Clinging, protest or withdrawal during arrival and handover can have many possible causes. A predictable, available adult can help make the transition feel more supported without rushing the child away from their family.',
    monthTwoStrategy:
      'Use a consistent welcome point and position an available educator near the entry rather than relying on repeated calling across the room.',
  },
  {
    letter: 'S',
    title: 'Sensory & Movement Needs',
    focus: 'Crashing, Throwing & High-Energy Movement',
    image: '/images/feed/09_outdoor_play.png',
    badge: '/images/badges/badge_risk_roughplay.png',
    insight:
      'Crashing, throwing or constant movement can have many possible causes. Before labelling the behaviour as defiance or assuming one sensory explanation, look at timing, space, movement opportunities, fatigue, social demand and what happened before and after.',
    monthTwoStrategy:
      'Offer safe purposeful movement such as carrying, pushing, climbing or active jobs where appropriate, then notice whether participation changes.',
  },
  {
    letter: 'E',
    title: 'Escalation Response',
    focus: 'Responding During High Emotional Load',
    image: '/images/feed/07_upper_primary.png',
    badge: '/images/badges/badge_risk_water.png',
    insight:
      'During a highly emotional moment, a child may have less capacity to process long explanations, multiple instructions or rapid questioning. Adding more language can sometimes increase demand.',
    monthTwoStrategy:
      'Reduce unnecessary words, slow your pace, maintain safety and use simple predictable cues before expecting problem solving or reflection.',
  },
];

export default function MonthTwoEasePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <Link
            href="/playbooks"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Action Plans
          </Link>

          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-950 sm:inline-block">
              Month 2 Learning
            </span>

            <MemberSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <section className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Regulator Champions Learning Pathway
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 md:text-4xl">
            Month 2: The EASE Model &amp; Escalation Practices
          </h1>

          <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
            Building on the first Regulation Ladder, Month 2 introduces the
            EASE observation framework for thinking about environmental load,
            relational support, movement needs and adult responses during
            difficult moments.
          </p>
        </section>

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-900">
            Use EASE as an Observation Framework
          </span>

          <p className="mt-2 text-sm leading-relaxed text-amber-950">
            EASE is designed to help educators slow down and consider several
            possible influences before responding. It is not a diagnostic tool
            and should not be used to decide that a child&apos;s behaviour has
            one specific sensory, neurological or relational cause.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {EASE_PILLARS.map((pillar, idx) => {
            const isSelected = activeTab === idx;

            return (
              <button
                key={`${pillar.letter}-${pillar.title}`}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`rounded-2xl border p-4 text-left transition ${
                  isSelected
                    ? 'border-teal-800 bg-teal-800 text-white shadow-md'
                    : 'border-slate-200 bg-white text-slate-800 hover:border-teal-600'
                }`}
              >
                <span className="mb-0.5 block text-xl font-black text-amber-400">
                  {pillar.letter}
                </span>

                <strong className="block text-xs font-bold leading-tight">
                  {pillar.title}
                </strong>
              </button>
            );
          })}
        </section>

        <section className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md lg:grid-cols-12">
          <div className="relative flex min-h-72 items-center justify-center bg-teal-950 lg:col-span-5 lg:min-h-full">
            <img
              src={EASE_PILLARS[activeTab].image}
              alt={EASE_PILLARS[activeTab].title}
              className="h-full w-full object-cover"
            />

            <div className="absolute right-4 top-4 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-xs backdrop-blur-md">
              <img
                src={EASE_PILLARS[activeTab].badge}
                alt=""
                aria-hidden="true"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          <div className="space-y-6 p-6 md:p-8 lg:col-span-7">
            <div className="border-b border-slate-100 pb-4">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
                EASE Framework Pillar {EASE_PILLARS[activeTab].letter}
              </span>

              <h2 className="mt-0.5 text-xl font-extrabold text-slate-900">
                {EASE_PILLARS[activeTab].title}
              </h2>

              <span className="text-xs font-semibold text-slate-500">
                Focus Area: {EASE_PILLARS[activeTab].focus}
              </span>
            </div>

            <div className="space-y-3">
              <div className="space-y-1 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <strong className="block text-[11px] font-bold uppercase tracking-wider text-rose-950">
                  What to Notice
                </strong>

                <p className="text-xs font-medium leading-relaxed text-rose-900">
                  {EASE_PILLARS[activeTab].insight}
                </p>
              </div>

              <div className="space-y-1 rounded-2xl border border-teal-200 bg-teal-50 p-4">
                <strong className="block text-[11px] font-bold uppercase tracking-wider text-teal-950">
                  Month 2 Practice
                </strong>

                <p className="text-xs font-medium leading-relaxed text-teal-900">
                  {EASE_PILLARS[activeTab].monthTwoStrategy}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start justify-between gap-4 border-t border-slate-100 pt-2 sm:flex-row sm:items-center">
              <span className="text-[11px] font-medium text-slate-500">
                Included within the Regulator Champions learning pathway
              </span>

              <Link
                href="/proposal?plan=preview"
                className="w-full rounded-xl bg-amber-400 px-5 py-2.5 text-center text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300 sm:w-auto"
              >
                View Program Options &rarr;
              </Link>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Related Member Learning
          </span>

          <h2 className="mt-1 text-xl font-bold text-teal-950">
            Connect EASE with the wider regulation pathway
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/playbooks"
              className="rounded-xl bg-teal-800 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Return to Action Plans →
            </Link>

            <Link
              href="/learning-journey"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Learning Journey →
            </Link>

            <Link
              href="/somatic-checkin"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Somatic Check-In →
            </Link>

            <Link
              href="/nqs-mapping"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              NQS Mapping →
            </Link>
          </div>
        </section>

        <section className="space-y-4 rounded-3xl bg-teal-900 p-8 text-center text-white shadow-sm">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Program Options
          </span>

          <h2 className="text-xl font-bold md:text-2xl">
            Continue the Regulator Champions Pathway
          </h2>

          <p className="mx-auto max-w-lg text-xs leading-relaxed text-teal-100">
            Start with the 3-Ladder Preview for $1,790 including GST and six
            months of access, or choose the full 8-Ladder pathway for $4,790
            including GST and 12 months of access.
          </p>

          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-md transition hover:bg-amber-300"
            >
              3-Ladder Preview — $1,790 &rarr;
            </Link>

            <Link
              href="/proposal?plan=full"
              className="rounded-xl border border-teal-700 bg-teal-800/80 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-teal-800"
            >
              Full 8-Ladder Pathway — $4,790 &rarr;
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}