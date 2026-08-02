'use client';

import React, { useState } from 'react';
import Link from 'next/link';

// Ladder 1 Action Plans mapped directly to your public files.
const LADDER_ONE_ACTION_PLANS = [
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
      'Offer a heavy carrying object, such as a wooden block tub, to anchor their hands.',
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
      'Provide a predictable nonverbal arrival job, such as placing a name card on the board.',
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
      'Set a professional boundary: focus on child regulation needs, not character labels.',
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
      'Provide a heavy carrying job, such as moving cones or balls, during room entry.',
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
    LADDER_ONE_ACTION_PLANS.find(
      (plan) => plan.id === selectedId,
    ) || LADDER_ONE_ACTION_PLANS[1];

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Home
          </Link>

          <span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-950">
            Ladder 1 Fully Available
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        {/* PAGE TITLE */}
        <section className="mx-auto max-w-2xl space-y-2 text-center">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Current Regulation Ladder
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 md:text-4xl">
            Ladder 1: Morning Routines &amp; The CALM Framework
          </h1>

          <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
            Ladder 1 is the current, fully available starting point,
            with practical action plans for morning arrivals, staffroom
            preparation, drop-off distress, and calm room foundations.
          </p>
        </section>

        {/* MONTH 2 UNLOCK NOTICE BANNER */}
        <section className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-4 shadow-xs sm:flex-row sm:items-center sm:p-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500"></span>

              <strong className="text-xs font-bold uppercase tracking-wider text-amber-950">
                Ladder 2 Releasing Next
              </strong>
            </div>

            <p className="text-xs leading-relaxed text-amber-900">
              <strong>Month 2 Focus:</strong> The EASE Model &amp;
              Escalation Practices (Environment, Attachment, Sensory
              Seeking, and De-escalating Room Meltdowns).
            </p>

            <p className="text-xs leading-relaxed text-amber-900">
              EASE builds on the CALM Framework, offering a more
              detailed tool specifically for escalation and meltdown
              moments.
            </p>
          </div>

          <span className="shrink-0 rounded-xl border border-amber-300 bg-amber-200/80 px-3 py-1.5 text-[11px] font-bold text-amber-950">
            Unlocks in Month 2
          </span>
        </section>

        {/* ROOM SELECTOR BUTTON BAR */}
        <section className="overflow-x-auto pb-2">
          <div className="flex min-w-max gap-2">
            {LADDER_ONE_ACTION_PLANS.map((plan) => {
              const isSelected = plan.id === selectedId;

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => setSelectedId(plan.id)}
                  className={`shrink-0 rounded-2xl border px-4 py-2.5 text-xs font-bold transition ${
                    isSelected
                      ? 'border-teal-800 bg-teal-800 text-white shadow-xs'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-teal-600'
                  }`}
                >
                  {plan.roomName}
                </button>
              );
            })}
          </div>
        </section>

        {/* ACTIVE ACTION PLAN DISPLAY CARD */}
        <section className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md lg:grid-cols-12">
          {/* LEFT COLUMN */}
          <div className="relative flex min-h-72 items-center justify-center bg-teal-950 lg:col-span-5 lg:min-h-full">
            <img
              src={currentPlan.image}
              alt={currentPlan.roomName}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 flex items-end bg-linear-to-t from-teal-950/90 via-transparent to-transparent p-6 lg:hidden">
              <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold text-slate-950">
                {currentPlan.badgeTag}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6 p-6 md:p-8 lg:col-span-7">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
                  {currentPlan.badgeTag}
                </span>

                <h2 className="mt-0.5 text-xl font-extrabold text-slate-900">
                  {currentPlan.roomName}
                </h2>
              </div>

              <span className="hidden rounded-full bg-emerald-100 px-3 py-1 text-[10px] font-bold text-emerald-900 lg:inline-block">
                Ladder 1 Available Now
              </span>
            </div>

            {/* TRIGGER & INSIGHT */}
            <div className="space-y-3">
              <div className="space-y-1 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <strong className="block text-[11px] font-bold uppercase tracking-wider text-rose-950">
                  Morning Room Trigger:
                </strong>

                <p className="text-xs font-medium leading-relaxed text-rose-900">
                  {currentPlan.trigger}
                </p>
              </div>

              <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
                <strong className="block text-[11px] font-bold uppercase tracking-wider text-teal-900">
                  CALM Framework Insight:
                </strong>

                <p className="text-xs leading-relaxed text-slate-700">
                  {currentPlan.styledVsSubstance}
                </p>
              </div>
            </div>

            {/* ACTION STEPS */}
            <div className="space-y-3">
              <strong className="block text-xs font-bold uppercase tracking-wider text-slate-900">
                3-Step Morning Action Plan:
              </strong>

              <div className="space-y-2">
                {currentPlan.actionSteps.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-teal-200/80 bg-teal-50 p-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-800 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>

                    <p className="text-xs font-medium leading-relaxed text-teal-950">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* DOWNLOAD PDF ACTION */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-2 sm:flex-row">
              <span className="text-[11px] font-medium text-slate-500">
                Ladder 1 printable routine cards available now
              </span>

              <a
                href={currentPlan.printablePoster}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full rounded-xl bg-amber-400 px-5 py-2.5 text-center text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300 sm:w-auto"
              >
                Download Ladder 1 Resource &rarr;
              </a>
            </div>
          </div>
        </section>

        {/* RELEASE CONTEXT */}
        <section className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
          <p className="text-xs leading-relaxed text-teal-900">
            Ladder 1 is available in full now. Ladders 2 through 8 will
            unlock progressively across the 12-month membership, giving
            teams time to practise each stage before new content is
            introduced.
          </p>
        </section>

        {/* CTA TO PROPOSAL PACK */}
        <section className="space-y-4 rounded-3xl bg-teal-900 p-8 text-center text-white">
          <h3 className="text-lg font-bold md:text-xl">
            Ready to Begin Ladder 1 Across Your Entire Service?
          </h3>

          <p className="mx-auto max-w-md text-xs leading-relaxed text-teal-100">
            The $4,790 Whole-Centre Membership provides 12 months of
            structured learning, Ladder 1 access from commencement, and
            progressive releases as your team moves through the
            remaining Regulation Ladders.
          </p>

          <Link
            href="/proposal"
            className="inline-block rounded-xl bg-amber-400 px-6 py-3 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
          >
            Get $4,790 Centre Quote &amp; Proposal &rarr;
          </Link>
        </section>
      </main>
    </div>
  );
}