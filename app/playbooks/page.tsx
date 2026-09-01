'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Category =
  | 'arrivals'
  | 'transitions'
  | 'handovers'
  | 'prep';

type PlaybookItem = {
  title: string;
  timing: string;
  action: string;
  noticeAfter: string[];
  qip: string;
  pdfUrl: string;
};

const PLAYBOOKS: Record<
  Category,
  PlaybookItem[]
> = {
  arrivals: [
    {
      title: 'Morning Doorway Anchor',
      timing: '7:00 AM - 9:00 AM',
      action:
        'Lower eye height parallel to doorway. Greet child by name before requesting sign-in details from families.',
      noticeAfter: [
        'Does the child look towards the educator sooner?',
        'Does the doorway feel less rushed?',
        'Does the family handover feel more connected?',
      ],
      qip: 'QA 6.1.1 — Supportive Handovers',
      pdfUrl:
        '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
    },
    {
      title: 'Non-Digital Handover Pause',
      timing: 'Arrival Routine',
      action:
        'Pause tablet or digital message logging for 60 seconds when a family steps into the room entry threshold.',
      noticeAfter: [
        'Does the family have more opportunity to share useful information?',
        'Does the educator notice more about the child’s body and arrival?',
        'Does the handover feel less transactional?',
      ],
      qip: 'QA 5.1.1 — Relational Presence',
      pdfUrl:
        '/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
    },
  ],

  transitions: [
    {
      title: 'Acoustic Load Reduction',
      timing: 'Pre-Group Time',
      action:
        'Eliminate background music and turn off ceiling row lights 5 minutes prior to gathering children.',
      noticeAfter: [
        'Does the room feel less busy before the transition?',
        'Do children need fewer repeated prompts?',
        'Do children move towards the next activity more easily?',
      ],
      qip: 'QA 3.1.2 — Environmental Setup',
      pdfUrl: '/pdf/Calm-Posters.pdf',
    },
    {
      title: 'Proprioceptive Heavy Work Carry',
      timing: 'High-Demand Transitions',
      action:
        'Offer heavy laundry baskets, water jugs, or floor cushions for carrying before expecting seated attention.',
      noticeAfter: [
        'Does purposeful movement make the transition easier?',
        'Does the child appear more organised afterwards?',
        'Does seated participation become easier without repeated correction?',
      ],
      qip: 'QA 1.3.2 — Critical Reflection',
      pdfUrl:
        '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
    },
  ],

  handovers: [
    {
      title:
        'Non-Verbal Co-Educator Tag Signal',
      timing: 'Room Peak Stress',
      action:
        'Use agreed wrist-tap or double-nod signal to switch room positions when personal capacity tank hits 30%.',
      noticeAfter: [
        'Does the educator recover before becoming overwhelmed?',
        'Does the child receive a steadier response?',
        'Does the room remain more settled when staff ask for support earlier?',
      ],
      qip: 'QA 4.1.1 — Staff Co-Regulation',
      pdfUrl:
        '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
    },
    {
      title: 'Zero-Demand Separation Space',
      timing: 'Distressed Separation',
      action:
        'Guide child to a quiet, low-sensory nook with cool water or soft texture without lengthy verbal explanations.',
      noticeAfter: [
        'Does the child’s body begin to soften?',
        'Can they tolerate an educator staying nearby?',
        'Does reducing language make reconnection easier?',
      ],
      qip: 'QA 2.1.1 — Emotional Safety',
      pdfUrl: '/pdf/Calm-Posters.pdf',
    },
  ],

  prep: [
    {
      title:
        '60-Second Staffroom Somatic Pause',
      timing: 'Prior to Room Entry',
      action:
        'Unclench jaw, drop shoulders from ears, and take two slow nasal breaths before stepping onto the room floor.',
      noticeAfter: [
        'Does your pace feel different when you enter?',
        'Is your voice softer or slower?',
        'Do you feel less urgency to immediately correct the room?',
      ],
      qip: 'QA 5.1.1 — Adult Self-Regulation',
      pdfUrl:
        '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
    },
    {
      title: 'Room Entry Spatial Audit',
      timing: 'Shift Start',
      action:
        'Check doorway movement bottleneck. Shift bag trolleys and clutter away from main traffic pathways.',
      noticeAfter: [
        'Do children move through the area more easily?',
        'Is there less bumping, waiting or crowding?',
        'Does the room feel calmer before educators add more verbal direction?',
      ],
      qip: 'QA 3.1.2 — Spatial Unburdening',
      pdfUrl:
        '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
    },
  ],
};

const CATEGORY_OPTIONS: {
  id: Category;
  title: string;
  description: string;
}[] = [
  {
    id: 'arrivals',
    title: 'Arrivals',
    description:
      'Drop-off, doorway pressure and family handovers',
  },
  {
    id: 'transitions',
    title: 'Transitions',
    description:
      'Moving between activities, group time and waiting',
  },
  {
    id: 'handovers',
    title: 'Team Support',
    description:
      'When a child or educator is reaching capacity',
  },
  {
    id: 'prep',
    title: 'Educator Prep',
    description:
      'Before children arrive or before entering the room',
  },
];

export default function PlaybooksPage() {
  const [
    activeCategory,
    setActiveCategory,
  ] = useState<Category>('arrivals');

  const [
    copiedIndex,
    setCopiedIndex,
  ] = useState<number | null>(null);

  const handleCopyText = async (
    text: string,
    index: number,
  ) => {
    try {
      await navigator.clipboard.writeText(
        text,
      );

      setCopiedIndex(index);

      window.setTimeout(() => {
        setCopiedIndex(null);
      }, 2000);
    } catch (error) {
      console.error(
        'Copy playbook prompt failed:',
        error,
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 text-[#1C3B34]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E5DED4] bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <span className="block text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Regulator Champions
            </span>

            <h1 className="mt-1 text-xl font-extrabold text-[#1C3B34] sm:text-2xl">
              Action Playbooks
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/platform/educator"
              className="hidden min-h-12 items-center rounded-2xl border-2 border-[#E5DED4] bg-white px-4 py-3 text-sm font-bold text-[#1C3B34] transition hover:border-[#657B6C] sm:flex"
            >
              Floor Deck
            </Link>

            <Link
              href="/portal"
              className="flex min-h-12 items-center rounded-2xl bg-[#657B6C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#53665A]"
            >
              Member Hub
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-9 px-5 py-8 sm:px-6 sm:py-10">

        {/* INTRO */}
        <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white shadow-lg">
          <div className="p-7 sm:p-10">
            <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34]">
              Quick ideas for the room
            </span>

            <h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Something keeps getting hard.
              Try one small change.
            </h2>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
              These Action Playbooks are
              designed for moments when you
              need something practical and
              simple to try without working
              through a full learning module.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-lg font-extrabold text-[#E4C98E]">
                Do not use this as a list of
                strategies to throw at the
                child.
              </p>

              <p className="mt-2 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
                Choose one idea that fits
                the situation, try it, then
                watch what changes.
              </p>
            </div>
          </div>
        </section>

        {/* HOW TO USE */}
        <section>
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            How to use an Action Playbook
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Four simple steps
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InstructionCard
              number="1"
              title="Choose the moment"
              text="Find the situation that sounds closest to what is happening."
            />

            <InstructionCard
              number="2"
              title="Try one action"
              text="Use one practical change. Do not stack several strategies together."
            />

            <InstructionCard
              number="3"
              title="Watch what changes"
              text="Notice the child, the room and the educator response afterwards."
            />

            <InstructionCard
              number="4"
              title="Decide what comes next"
              text="Repeat it, move into a Regulation Ladder or ask Robyn if the pattern is still confusing."
            />
          </div>
        </section>

        {/* STEP 1 */}
        <section>
          <span className="inline-flex rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-extrabold text-[#9A793D]">
            Step 1
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Where is the pressure showing up?
          </h2>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            Choose the closest category.
            It does not need to describe
            your situation perfectly.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORY_OPTIONS.map(
              (category) => {
                const selected =
                  activeCategory ===
                  category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() =>
                      setActiveCategory(
                        category.id,
                      )
                    }
                    className={`min-h-40 rounded-3xl border-2 p-5 text-left transition ${
                      selected
                        ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                        : 'border-[#E5DED4] bg-white text-[#1C3B34] hover:border-[#657B6C]'
                    }`}
                  >
                    <span className="block text-xl font-extrabold">
                      {category.title}
                    </span>

                    <span
                      className={`mt-3 block text-base leading-relaxed ${
                        selected
                          ? 'text-[#D8E1DC]'
                          : 'text-[#65736D]'
                      }`}
                    >
                      {
                        category.description
                      }
                    </span>

                    {selected && (
                      <span className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold text-white">
                        Viewing
                      </span>
                    )}
                  </button>
                );
              },
            )}
          </div>
        </section>

        {/* STEP 2 */}
        <section>
          <span className="inline-flex rounded-full bg-[#F1F4F2] px-4 py-2 text-sm font-extrabold text-[#657B6C]">
            Step 2
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Choose one action to try.
          </h2>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            Read the options below and
            choose the one that feels most
            realistic for your room today.
          </p>

          <div className="mt-6 space-y-6">
            {PLAYBOOKS[
              activeCategory
            ].map((item, index) => (
              <article
                key={`${activeCategory}-${item.title}`}
                className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white shadow-sm"
              >
                <div className="border-b border-[#E5DED4] bg-[#FAF8F5] p-6 sm:p-7">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                        {item.timing}
                      </span>

                      <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34] sm:text-3xl">
                        {item.title}
                      </h3>
                    </div>

                    <span className="shrink-0 rounded-full border border-[#C29F60]/40 bg-[#FAF5EC] px-4 py-2 text-sm font-bold text-[#1C3B34]">
                      {item.qip}
                    </span>
                  </div>
                </div>

                <div className="grid lg:grid-cols-[1fr_1fr]">

                  {/* TRY */}
                  <div className="border-b border-[#E5DED4] p-6 sm:p-7 lg:border-b-0 lg:border-r">
                    <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
                      What to try
                    </span>

                    <div className="mt-4 rounded-3xl border-l-4 border-[#C29F60] bg-[#FAF5EC] p-5">
                      <p className="text-xl font-bold leading-relaxed text-[#2B3833]">
                        {item.action}
                      </p>
                    </div>

                    <p className="mt-5 text-base leading-relaxed text-[#65736D]">
                      Try this one change
                      first. Give the child
                      and the room time to
                      respond before adding
                      something else.
                    </p>

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() =>
                          void handleCopyText(
                            item.action,
                            index,
                          )
                        }
                        className="flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-[#657B6C] px-5 py-4 text-base font-extrabold text-white transition hover:bg-[#53665A]"
                      >
                        {copiedIndex ===
                        index
                          ? 'Prompt copied'
                          : 'Copy prompt'}
                      </button>

                      <a
                        href={item.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-5 py-4 text-center text-base font-extrabold text-[#1C3B34]"
                      >
                        Open printable
                      </a>
                    </div>
                  </div>

                  {/* WATCH */}
                  <div className="p-6 sm:p-7">
                    <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
                      Step 3 · Watch
                    </span>

                    <h4 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
                      What happens after you
                      change the environment
                      or your response?
                    </h4>

                    <div className="mt-5 space-y-3">
                      {item.noticeAfter.map(
                        (notice) => (
                          <div
                            key={notice}
                            className="flex gap-3 rounded-2xl bg-[#F1F4F2] p-4"
                          >
                            <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#657B6C]" />

                            <p className="text-lg leading-relaxed text-[#53645D]">
                              {notice}
                            </p>
                          </div>
                        ),
                      )}
                    </div>

                    <div className="mt-5 rounded-2xl border border-[#E5DED4] bg-white p-4">
                      <p className="text-base font-extrabold text-[#1C3B34]">
                        Remember
                      </p>

                      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                        You are not only
                        looking for the
                        behaviour to stop.
                        Small changes in
                        connection, movement,
                        participation,
                        communication or
                        recovery can all tell
                        you something.
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* NEXT STEP */}
        <section className="rounded-4xl bg-[#1C3B34] p-7 text-white sm:p-9">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
            Step 4 · What next?
          </span>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            What you notice tells you where
            to go next.
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            You do not need to keep adding
            strategies. Choose the next step
            based on what happened.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NextStep
              title="Repeat it"
              text="Use the same action again if it seemed to make the moment easier."
            />

            <NextStep
              title="Adjust it"
              text="Make one small change if the idea almost helped but did not quite fit."
            />

            <NextStep
              title="Go deeper"
              text="Open a Regulation Ladder if the same situation keeps happening."
            />

            <NextStep
              title="Ask Robyn"
              text="Send the situation through the Monthly Hub if your team is still unsure."
            />
          </div>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/portal"
              className="flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Go to Monthly Hub
            </Link>

            <Link
              href="/portal"
              className="flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-base font-bold text-white"
            >
              Open Regulation Ladders
            </Link>
          </div>
        </section>

        {/* PRACTICE NOTE */}
        <section className="rounded-4xl border border-[#E5DED4] bg-white p-6">
          <h2 className="text-xl font-extrabold text-[#1C3B34]">
            These are starting points, not
            prescriptions.
          </h2>

          <p className="mt-3 text-base leading-relaxed text-[#65736D]">
            Use your knowledge of the child,
            family information, environment,
            service policies, safeguarding
            responsibilities and
            professional judgement when
            deciding whether an action is
            appropriate.
          </p>
        </section>
      </main>
    </div>
  );
}

function InstructionCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E5DED4] bg-white p-5 shadow-sm">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C29F60] font-extrabold text-[#1C3B34]">
        {number}
      </span>

      <h3 className="mt-4 text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </article>
  );
}

function NextStep({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-5">
      <h3 className="text-xl font-extrabold text-white">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#C8D6D0]">
        {text}
      </p>
    </article>
  );
}