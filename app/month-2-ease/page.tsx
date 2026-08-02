'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Month 2 EASE Framework Pillars
const EASE_PILLARS = [
  {
    letter: 'E',
    title: 'Environment & Acoustics',
    focus: 'Room Bottlenecks & Spatial Overstimulation',
    image: '/images/feed/08_transitions.png',
    badge: '/images/badges/badge_risk_outdoor.png',
    insight: 'Hard floor echoes, doorway bottlenecks, and crowded bag hooks elevate baseline cortisol before activities begin.',
    monthTwoStrategy: 'Establish visual floor pathways, soft acoustic zoning, and staggered doorway entry rhythms.',
  },
  {
    letter: 'A',
    title: 'Attachment & Proximity',
    focus: 'Separation Distress & Relational Safety',
    image: '/images/feed/02_toddler_room.png',
    badge: '/images/badges/badge_checkin.png',
    insight: 'Protest, clinging, and withdrawal during shift handovers signal attachment distress requiring relational safety.',
    monthTwoStrategy: 'Position stationary adult anchor educators at room entry points rather than calling out across the room.',
  },
  {
    letter: 'S',
    title: 'Sensory Seeking & Schemas',
    focus: 'Crashing, Throwing & Motor Urges',
    image: '/images/feed/09_outdoor_play.png',
    badge: '/images/badges/badge_risk_roughplay.png',
    insight: 'Crashing into furniture and throwing objects are deep body requests for proprioceptive joint resistance, not calculated defiance.',
    monthTwoStrategy: 'Redirect high-energy motor urges into heavy-work carrying jobs, wall pushes, and weighted play zones.',
  },
  {
    letter: 'E',
    title: 'Escalation Response',
    focus: 'De-escalating Room Meltdowns',
    image: '/images/feed/07_upper_primary.png',
    badge: '/images/badges/badge_risk_water.png',
    insight: 'During a meltdown, the prefrontal cortex goes offline. Logical demands like "Use your words!" sound like an alarm.',
    monthTwoStrategy: 'De-escalate using nonverbal proximity, flat-hand spatial cues, and loaning physical adult calm.',
  },
];

export default function MonthTwoEasePage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
      
      {/* HEADER BAR */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/playbooks"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Month 1 Action Plans
          </Link>
          <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-[11px] font-bold text-amber-950">
            Month 2 Curriculum Preview
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">

        {/* TITLE BANNER */}
        <section className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
            12-Month Continuum Pathway
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 md:text-4xl">
            Month 2: The EASE Model &amp; Escalation Practices
          </h1>
          <p className="text-xs text-slate-600 md:text-sm leading-relaxed">
            Building upon Month 1&apos;s morning foundations, Month 2 equips your team with the EASE observation framework to decode room triggers and de-escalate meltdowns without shouting.
          </p>
        </section>

        {/* EASE PILLAR SELECTOR TABS */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {EASE_PILLARS.map((pillar, idx) => {
            const isSelected = activeTab === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={`rounded-2xl p-4 text-left border transition ${
                  isSelected
                    ? 'bg-teal-800 text-white border-teal-800 shadow-md'
                    : 'bg-white text-slate-800 border-slate-200 hover:border-teal-600'
                }`}
              >
                <span className="block text-xl font-black text-amber-400 mb-0.5">
                  {pillar.letter}
                </span>
                <strong className="block text-xs font-bold leading-tight">
                  {pillar.title}
                </strong>
              </button>
            );
          })}
        </section>

        {/* ACTIVE EASE PILLAR DISPLAY CARD */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* LEFT COLUMN: PILLAR ARTWORK */}
          <div className="lg:col-span-5 relative bg-teal-950 min-h-72 lg:min-h-full flex items-center justify-center">
            <img
              src={EASE_PILLARS[activeTab].image}
              alt={EASE_PILLARS[activeTab].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-2 border border-slate-200 shadow-xs">
              <img
                src={EASE_PILLARS[activeTab].badge}
                alt="Badge stamp"
                className="h-10 w-10 object-contain"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: PILLAR DETAILS */}
          <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
            
            <div className="border-b border-slate-100 pb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 block">
                EASE Framework Pillar {EASE_PILLARS[activeTab].letter}
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                {EASE_PILLARS[activeTab].title}
              </h2>
              <span className="text-xs font-semibold text-slate-500">
                Focus Area: {EASE_PILLARS[activeTab].focus}
              </span>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 space-y-1">
                <strong className="block text-[11px] font-bold uppercase text-rose-950 tracking-wider">
                  Developmental Trigger Insight:
                </strong>
                <p className="text-xs text-rose-900 leading-relaxed font-medium">
                  {EASE_PILLARS[activeTab].insight}
                </p>
              </div>

              <div className="rounded-2xl bg-teal-50 border border-teal-200 p-4 space-y-1">
                <strong className="block text-[11px] font-bold uppercase text-teal-950 tracking-wider">
                  Month 2 Implementation Practice:
                </strong>
                <p className="text-xs text-teal-900 leading-relaxed font-medium">
                  {EASE_PILLARS[activeTab].monthTwoStrategy}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">
                Included in 12-Month Whole Centre Membership
              </span>

              <Link
                href="/proposal"
                className="w-full sm:w-auto rounded-xl bg-amber-400 px-5 py-2.5 text-center text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-xs"
              >
                Request Whole Centre Proposal ($4,790) &rarr;
              </Link>
            </div>

          </div>

        </section>

        {/* PROPOSAL CTA BANNER */}
        <section className="rounded-3xl bg-teal-900 p-8 text-center text-white space-y-4 shadow-sm">
          <h2 className="text-xl font-bold md:text-2xl">
            Unlock the Full 12-Month Regulation Champions Pathway
          </h2>
          <p className="text-xs text-teal-100 max-w-lg mx-auto leading-relaxed">
            Ensure your service has access to all 8 Regulation Ladders, Month-by-Month Action Plans, physical room posters, and staffroom learning modules.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/proposal"
              className="rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-300 transition"
            >
              Print Official Proposal &amp; Quote ($4,790) &rarr;
            </Link>
            <Link
              href="/nqs-mapping"
              className="rounded-xl border border-teal-700 bg-teal-800/80 px-6 py-3.5 text-xs font-bold text-white hover:bg-teal-800 transition"
            >
              View NQS Compliance Mapping &rarr;
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}