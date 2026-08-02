'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Month 1 Action Plans mapped directly to your exact 4 public/pdf/ files
const MONTH_ONE_ACTION_PLANS = [
  {
    id: 'staffroom-reset',
    roomName: '01. Staffroom Arrival & Vagus Reset',
    badgeTag: 'CALM Step C: Calm Yourself First',
    image: '/images/feed/01_babies_room.png',
    trigger:
      'Entering the centre carrying personal commute stress, rushing, or absorbing morning staffroom noise.',
    styledVsSubstance:
      'Stepping onto the floor with elevated heart rate means adult stress state spreads through the room before handovers start.',
    actionSteps: [
      'Unclench your jaw and take three 4-second exhales before opening the room door.',
      'Sip warm tea or stand near natural window light for 60 seconds.',
      'Protect your morning energy by choosing quiet connection over room venting.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
  },
  {
    id: 'nursery-dropoff',
    roomName: '02. Nursery Morning Separation',
    badgeTag: 'CALM Step A: Acknowledge & Anchor',
    image: '/images/feed/01_babies_room.png',
    trigger:
      'Infant crying spikes at 8:15 AM as multiple families arrive simultaneously for morning drop-off.',
    styledVsSubstance:
      'Rushing between cots with high-pitched reassurances escalates infant distress and room acoustics.',
    actionSteps: [
      'Anchor lower body to the floor near the entry zone rather than standing and pacing.',
      'Lower vocal pitch and slow down physical hand movements.',
      'Loan your steady nervous system to one infant at a time before moving between cots.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
  {
    id: 'toddler-doorway',
    roomName: '03. Toddler Doorway Clinging',
    badgeTag: 'CALM Step L: Lower Height & Proximity',
    image: '/images/feed/02_toddler_room.png',
    trigger:
      'Toddlers clinging to parent legs at the room doorway, refusing to enter the play space.',
    styledVsSubstance:
      'Calling out "Come in and play!" from across the room sounds like threat noise to a flooded toddler nervous system.',
    actionSteps: [
      'Lower your physical height parallel to the child at the doorway threshold.',
      'Greet the child at eye level without forcibly pulling them away from their parent.',
      'Offer a heavy carrying object (like a wooden block tub) to anchor their hands.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
  {
    id: '3yo-morning-overstimulation',
    roomName: '04. 3yo Morning Room Volume Spikes',
    badgeTag: 'CALM Step M: Mobile Steady Anchor',
    image: '/images/feed/03_3yo_room.png',
    trigger:
      'High morning noise volume and running between activity tables between 8:30 AM and 9:00 AM.',
    styledVsSubstance:
      'High morning arousal is a request for adult co-regulation, not calculated rule-breaking.',
    actionSteps: [
      'Position yourself as a stationary physical anchor in the central room pathway.',
      'Use quiet, flat-hand spatial cues rather than shouting across the room.',
      'Guide active children into heavy work joint-resistance play before group time.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
  {
    id: '4yo-morning-transitions',
    roomName: '05. 4yo / Kinder Morning Bag Hook Arrival',
    badgeTag: 'CALM Model Routine',
    image: '/images/feed/04_4yo_room.png',
    trigger:
      'Locker room crowding, bag dumping, and social friction during morning arrival.',
    styledVsSubstance:
      'Unstructured arrival bottlenecks cause personal space anxiety before morning routines begin.',
    actionSteps: [
      'Stagger arrival entry at bag hooks into small 3-child groups.',
      'Place visual step cues for bag hanging and water bottle placement.',
      'Maintain steady adult vocal rhythm while welcoming arriving families.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
  {
    id: 'prep-morning-routine',
    roomName: '06. Prep / School Morning Entry',
    badgeTag: 'CALM Model Routine',
    image: '/images/feed/05_prep_transition.png',
    trigger:
      'Overwhelmed children freezing or hiding behind parents at the classroom threshold.',
    styledVsSubstance:
      'Shifting from home environment to group expectations requires clear somatic safety cues.',
    actionSteps: [
      'Position a dedicated educator right at the doorway threshold.',
      'Provide a predictable nonverbal arrival job (like placing a name card on the board).',
      'Keep spoken instructions to 4 words or fewer during arrival.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
  {
    id: 'anxious-family-handover',
    roomName: '07. Parent Morning Handover Calm',
    badgeTag: 'CALM Family Connection',
    image: '/images/feed/08_transitions.png',
    trigger:
      'Anxious family members hovering at the door, projecting worry onto the child during departure.',
    styledVsSubstance:
      'Adult anxiety transfers instantly to the child. Parents need calm, steady adult containment.',
    actionSteps: [
      'Acknowledge parent worry with steady, unhurried eye contact.',
      'State a clear, confident departure ritual: "We have our morning anchor job ready now."',
      'Provide a predictable communication slip at pick-up to build family trust.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
  },
  {
    id: 'staffroom-venting-boundary',
    roomName: '08. Morning Staff Shift Handovers',
    badgeTag: 'CALM Team Culture',
    image: '/images/feed/06_early_primary.png',
    trigger:
      'Morning shift changes accompanied by frustrated staffroom venting about room challenges.',
    styledVsSubstance:
      'Absorbing room complaints during shift handovers elevates adult stress before entering the floor.',
    actionSteps: [
      'Set a professional boundary: Focus on child regulation needs, not character labels.',
      'Share one steady regulation anchor that worked well during the early shift.',
      'Enter the room with a clean slate and aligned team expectations.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
  },
  {
    id: 'outdoor-morning-entry',
    roomName: '09. Outdoor to Morning Room Transition',
    badgeTag: 'CALM Transition Routine',
    image: '/images/feed/09_outdoor_play.png',
    trigger:
      'High arousal, running, and door crowding when moving from morning yard play into rooms.',
    styledVsSubstance:
      'Sudden spatial restriction triggers fight-or-flight running when transitions lack visual pacing.',
    actionSteps: [
      'Give a 2-minute visual count indicator before ending yard play.',
      'Position educators at outdoor doorway thresholds to pace entry speed.',
      'Provide a heavy carrying job (moving cones or balls) during room entry.',
    ],
    printablePoster: '/pdf/Calm-Posters.pdf',
  },
  {
    id: 'morning-circle-welcome',
    roomName: '10. Morning Welcome Circle & Mat Time',
    badgeTag: 'CALM Mat Routine',
    image: '/images/feed/10_mat_time.png',
    trigger:
      'Fidgeting, carpet rolling, and interjection during initial morning group time.',
    styledVsSubstance:
      'Demanding total body stillness at 9:00 AM causes sensory shutdown or motor protest.',
    actionSteps: [
      'Integrate active somatic movement into morning greeting songs.',
      'Allow heavy lap cushions or standing work options for sensory-seeking children.',
      'Acknowledge that active listening does not always look like sitting still.',
    ],
    printablePoster:
      '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
  },
];

export default function PlaybooksPage() {
  const [selectedId, setSelectedId] =
    useState<string>('nursery-dropoff');

  const currentPlan =
    MONTH_ONE_ACTION_PLANS.find((p) => p.id === selectedId) ||
    MONTH_ONE_ACTION_PLANS[1];

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Home
          </Link>

          <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-[11px] font-bold text-amber-950">
            Month 1 Focus Area
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">
        {/* PAGE TITLE */}
        <section className="text-center space-y-2 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
            Curriculum Roadmap Scope
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 md:text-4xl">
            Month 1: Morning Routines &amp; The CALM Model
          </h1>

          <p className="text-xs text-slate-600 md:text-sm leading-relaxed">
            Practical scenario action plans designed specifically for
            morning arrivals, staffroom preparation, drop-off distress,
            and establishing calm room foundations.
          </p>
        </section>

        {/* MONTH 2 UNLOCK NOTICE BANNER */}
        <section className="rounded-2xl border border-amber-300 bg-amber-50 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>

              <strong className="text-xs font-bold text-amber-950 uppercase tracking-wider">
                Upcoming Next Month (Month 2 Pathway)
              </strong>
            </div>

            <p className="text-xs text-amber-900 leading-relaxed">
              <strong>Month 2 Focus:</strong> The EASE Model &amp;
              Escalation Practices (Environment, Attachment, Sensory
              Seeking, and De-escalating Room Meltdowns).
            </p>

            <p className="text-xs text-amber-900 leading-relaxed">
              EASE builds on the CALM Framework, offering a more
              detailed tool specifically for escalation and meltdown
              moments.
            </p>
          </div>

          <span className="rounded-xl bg-amber-200/80 border border-amber-300 px-3 py-1.5 text-[11px] font-bold text-amber-950 shrink-0">
            Unlocks in Month 2
          </span>
        </section>

        {/* ROOM SELECTOR BUTTON BAR */}
        <section className="overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {MONTH_ONE_ACTION_PLANS.map((p) => {
              const isSelected = p.id === selectedId;

              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`rounded-2xl px-4 py-2.5 text-xs font-bold border transition shrink-0 ${
                    isSelected
                      ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-teal-600'
                  }`}
                >
                  {p.roomName}
                </button>
              );
            })}
          </div>
        </section>

        {/* ACTIVE ACTION PLAN DISPLAY CARD */}
        <section className="rounded-3xl border border-slate-200 bg-white shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT COLUMN: SCENARIO WATERCOLOUR ARTWORK */}
          <div className="lg:col-span-5 relative bg-teal-950 min-h-72 lg:min-h-full flex items-center justify-center">
            <img
              src={currentPlan.image}
              alt={currentPlan.roomName}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-teal-950/90 via-transparent to-transparent flex items-end p-6 lg:hidden">
              <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold text-slate-950">
                {currentPlan.badgeTag}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: STRATEGY & ACTION STEPS */}
          <div className="lg:col-span-7 p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-teal-800 block">
                  {currentPlan.badgeTag}
                </span>

                <h2 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {currentPlan.roomName}
                </h2>
              </div>

              <span className="hidden lg:inline-block rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold text-teal-900">
                Month 1 Active
              </span>
            </div>

            {/* TRIGGER & INSIGHT */}
            <div className="space-y-3">
              <div className="rounded-2xl bg-rose-50 border border-rose-200 p-4 space-y-1">
                <strong className="block text-[11px] font-bold uppercase text-rose-950 tracking-wider">
                  Morning Room Trigger:
                </strong>

                <p className="text-xs text-rose-900 leading-relaxed font-medium">
                  {currentPlan.trigger}
                </p>
              </div>

              <div className="rounded-2xl bg-[#FDFBF7] border border-slate-200 p-4 space-y-1">
                <strong className="block text-[11px] font-bold uppercase text-teal-900 tracking-wider">
                  CALM Model Insight:
                </strong>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {currentPlan.styledVsSubstance}
                </p>
              </div>
            </div>

            {/* 3-STEP ACTION STEPS */}
            <div className="space-y-3">
              <strong className="block text-xs font-bold uppercase text-slate-900 tracking-wider">
                3-Step Morning Action Plan:
              </strong>

              <div className="space-y-2">
                {currentPlan.actionSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-xl bg-teal-50 border border-teal-200/80 p-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-800 text-[10px] font-bold text-white">
                      {idx + 1}
                    </span>

                    <p className="text-xs font-medium text-teal-950 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOWNLOAD PDF ACTION */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">
                Includes printable room routine cards
              </span>

              <a
                href={currentPlan.printablePoster}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto rounded-xl bg-amber-400 px-5 py-2.5 text-center text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-xs"
              >
                Download Printable Action Plan &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* CTA TO PROPOSAL PACK */}
        <section className="rounded-3xl bg-teal-900 p-8 text-center text-white space-y-4">
          <h3 className="text-lg font-bold md:text-xl">
            Ready to Implement Month 1 Across Your Entire Service?
          </h3>

          <p className="text-xs text-teal-100 max-w-md mx-auto leading-relaxed">
            The $4,790 Whole Centre Membership provides 12 months of
            structured learning, printed room action plans, and
            complete site access.
          </p>

          <Link
            href="/proposal"
            className="inline-block rounded-xl bg-amber-400 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-xs"
          >
            Get $4,790 Centre Quote &amp; Proposal &rarr;
          </Link>
        </section>
      </main>
    </div>
  );
}