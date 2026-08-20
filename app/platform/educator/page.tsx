'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type FloorCard = {
  id: number;
  moment: string;
  title: string;
  notice: string[];
  tryNext: string[];
  watchFor: string[];
  reflection: string;
  nqs: string;
  nqsTitle: string;
};

const FLOOR_CARDS: FloorCard[] = [
  {
    id: 1,
    moment: 'Before children arrive',
    title: 'Start with your own body',
    notice: [
      'Am I rushing?',
      'Is my voice louder or faster than usual?',
      'Am I carrying pressure from something that happened before I entered the room?',
    ],
    tryNext: [
      'Slow your walking pace before entering.',
      'Drop your shoulders and soften your voice.',
      'Choose one thing you do not need to rush yet.',
    ],
    watchFor: [
      'Do children approach you differently?',
      'Does your own urge to hurry reduce?',
      'Does the first transition feel easier to manage?',
    ],
    reflection:
      'What changed when I adjusted myself before trying to change the children?',
    nqs: '5.1.1',
    nqsTitle: 'Positive educator to child interactions',
  },
  {
    id: 2,
    moment: 'Drop-off',
    title: 'Notice before moving the child on',
    notice: [
      'Has the child become still, quiet or physically tense?',
      'Are they holding tightly to their parent or avoiding eye contact?',
      'Is the doorway becoming noisy, crowded or rushed?',
    ],
    tryNext: [
      'Reduce the number of adults speaking.',
      'Allow the child a little more time to watch before joining.',
      'Use familiar language rather than adding new instructions.',
    ],
    watchFor: [
      'Does their body begin to soften?',
      'Do they start looking around the room?',
      'Can they move towards an educator or familiar activity without being hurried?',
    ],
    reflection:
      'Were we reading this as difficult separation when the child may have needed more time?',
    nqs: '5.1.1',
    nqsTitle: 'Positive educator to child interactions',
  },
  {
    id: 3,
    moment: 'Group time',
    title: 'Look beyond sitting still',
    notice: [
      'Is the child listening while moving?',
      'Do they move further away when the group becomes crowded?',
      'Are we correcting their body more often than supporting their participation?',
    ],
    tryNext: [
      'Give them a little more physical space.',
      'Allow a different sitting or standing position where appropriate.',
      'Reduce unnecessary reminders about keeping the body still.',
    ],
    watchFor: [
      'Do they stay with the group for longer?',
      'Do they respond to the story, song or conversation?',
      'Does participation improve when posture is not the main focus?',
    ],
    reflection:
      'What were we using as our measure of participation?',
    nqs: '5.1.2',
    nqsTitle: 'Dignity and rights of the child',
  },
  {
    id: 4,
    moment: 'Transitions',
    title: 'Reduce the amount of language',
    notice: [
      'How many instructions have already been given?',
      'Are several educators talking at once?',
      'Is the child becoming more disorganised as we repeat ourselves?',
    ],
    tryNext: [
      'Use one short instruction.',
      'Pause before adding another prompt.',
      'Use a gesture, visual cue or familiar routine where it helps.',
    ],
    watchFor: [
      'Does the child respond with fewer repeated prompts?',
      'Does the transition become less noisy?',
      'Are educators repeating themselves less?',
    ],
    reflection:
      'Did the child need more instruction, or did they need less information at once?',
    nqs: '5.1.1',
    nqsTitle: 'Positive educator to child interactions',
  },
  {
    id: 5,
    moment: 'When behaviour escalates',
    title: 'Check what happened just before',
    notice: [
      'What changed in the previous few minutes?',
      'Did the room become louder, faster or more crowded?',
      'Was a preferred activity stopped suddenly?',
    ],
    tryNext: [
      'Reduce immediate demands where it is safe to do so.',
      'Create a little more physical space.',
      'Reconnect before trying to problem-solve.',
    ],
    watchFor: [
      'Does the intensity begin to reduce?',
      'Can the child reconnect with an educator?',
      'Is there a pattern your team needs to notice earlier next time?',
    ],
    reflection:
      'What might we notice earlier next time, before the behaviour becomes the main focus?',
    nqs: '5.2.2',
    nqsTitle: 'Self-regulation',
  },
  {
    id: 6,
    moment: 'When touch may help',
    title: 'Pause before offering physical comfort',
    notice: [
      'Is the child moving towards me or away from me?',
      'Are they reaching, leaning in or seeking closeness?',
      'Could I offer comfort without assuming touch is wanted?',
    ],
    tryNext: [
      'Stay close and available.',
      'Offer comfort in a way the child can accept or decline.',
      'Follow the child’s cues and your service safeguarding procedures.',
    ],
    watchFor: [
      'Does the child move closer or create more distance?',
      'Does their body appear more comfortable with the support?',
      'Are we responding to this child rather than using one approach for everyone?',
    ],
    reflection:
      'What was the child communicating about proximity, comfort and choice?',
    nqs: '5.1.2',
    nqsTitle: 'Dignity and rights of the child',
  },
  {
    id: 7,
    moment: 'Late afternoon',
    title: 'Notice when everyone is running low',
    notice: [
      'Is the room getting louder?',
      'Are educators giving more corrections than earlier?',
      'Are small problems becoming harder for children and adults to manage?',
    ],
    tryNext: [
      'Reduce non-essential demands.',
      'Simplify the environment where possible.',
      'Ask another educator for support before your own capacity is exhausted.',
    ],
    watchFor: [
      'Does the room settle when expectations become simpler?',
      'Are educators able to respond more patiently?',
      'Are there predictable times when the team needs a different plan?',
    ],
    reflection:
      'Are we expecting the same level of coping at the end of the day as we do in the morning?',
    nqs: '5.1.1',
    nqsTitle: 'Positive educator to child interactions',
  },
  {
    id: 8,
    moment: 'After a difficult moment',
    title: 'Repair before moving on',
    notice: [
      'Did the interaction become tense?',
      'Was my voice sharper or faster than I intended?',
      'Does the child seem unsure about reconnecting with me?',
    ],
    tryNext: [
      'Return with a calmer voice and body.',
      'Reconnect without requiring the child to explain everything immediately.',
      'Acknowledge the relationship, not just the behaviour.',
    ],
    watchFor: [
      'Does the child begin engaging with you again?',
      'Can both of you return to the routine without carrying the tension forward?',
      'Is there something you want to discuss with your team later?',
    ],
    reflection:
      'What helped us reconnect after the difficult moment?',
    nqs: '5.1.1',
    nqsTitle: 'Positive educator to child interactions',
  },
];

export default function EducatorPlatformPage() {
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const [reflectionText, setReflectionText] = useState('');
  const [copied, setCopied] = useState(false);

  const activeCard =
    FLOOR_CARDS.find((card) => card.id === selectedCard) ?? FLOOR_CARDS[0];

  const copyReflection = async () => {
    const reflection = reflectionText.trim();

    if (!reflection) {
      return;
    }

    const text = `${activeCard.title}

What I noticed:
${reflection}

Reflection question:
${activeCard.reflection}

NQS practice connection:
Element ${activeCard.nqs} – ${activeCard.nqsTitle}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error('Copy reflection failed:', error);
    }
  };

  const selectCard = (id: number) => {
    setSelectedCard(id);
    setReflectionText('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 font-sans text-[#2B3833]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E6E2DC] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#C29F60]">
              Regulator Champions
            </span>

            <h1 className="text-base font-extrabold text-[#1C3B34] md:text-lg">
              Educator Floor Deck
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/portal"
              className="flex min-h-12 items-center rounded-xl border border-[#E6E2DC] bg-white px-4 py-2 text-xs font-bold text-[#1C3B34] transition hover:border-[#657B6C]"
            >
              Service Hub
            </Link>

            <Link
              href="/platform/manager"
              className="flex min-h-12 items-center rounded-xl bg-[#657B6C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#53665A]"
            >
              Manager
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-7 px-4 py-6">
        {/* INTRO */}
        <section className="rounded-4xl bg-[#1C3B34] p-6 text-white shadow-sm md:p-8">
          <span className="inline-flex rounded-full bg-[#C29F60] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#1C3B34]">
            In the room
          </span>

          <h2 className="mt-4 max-w-3xl text-2xl font-extrabold leading-tight text-white md:text-4xl">
            Before you decide what to do, notice what is happening.
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
            Choose the moment that looks most like what is happening in your
            room. You do not need to complete every card or find the perfect
            strategy.
          </p>

          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-4">
            {[
              ['1', 'Notice'],
              ['2', 'Try one thing'],
              ['3', 'Watch what changes'],
              ['4', 'Reflect'],
            ].map(([number, label]) => (
              <div
                key={number}
                className="bg-white/5 px-4 py-4 text-center"
              >
                <span className="block text-[10px] font-black text-[#E4C98E]">
                  {number}
                </span>

                <span className="mt-1 block text-xs font-bold text-white">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* MOMENT SELECTOR */}
        <section>
          <div className="mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
              Choose the moment
            </span>

            <h2 className="mt-1 text-xl font-extrabold text-[#1C3B34]">
              What is happening right now?
            </h2>
          </div>

          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0">
            {FLOOR_CARDS.map((card) => (
              <button
                key={card.id}
                type="button"
                onClick={() => selectCard(card.id)}
                className={`min-h-24 min-w-[68vw] snap-center rounded-2xl border-2 p-4 text-left transition sm:min-w-[45vw] md:min-w-0 ${
                  selectedCard === card.id
                    ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
                    : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
                }`}
              >
                <span
                  className={`block text-[10px] font-black uppercase tracking-wider ${
                    selectedCard === card.id
                      ? 'text-[#E4C98E]'
                      : 'text-[#657B6C]'
                  }`}
                >
                  {card.moment}
                </span>

                <span className="mt-2 block text-sm font-extrabold leading-snug">
                  {card.title}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ACTIVE CARD */}
        <section className="overflow-hidden rounded-4xl border-2 border-[#E6E2DC] bg-white shadow-sm">
          <div className="border-b border-[#E6E2DC] bg-[#FAF5EC] p-5 md:p-6">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#9A793D]">
                  {activeCard.moment}
                </span>

                <h2 className="mt-1 text-2xl font-extrabold leading-tight text-[#1C3B34]">
                  {activeCard.title}
                </h2>
              </div>

              <div className="shrink-0 rounded-xl border border-[#C29F60]/40 bg-white px-3 py-2">
                <span className="block text-[9px] font-black uppercase tracking-widest text-[#657B6C]">
                  NQS practice connection
                </span>

                <span className="mt-0.5 block text-xs font-bold text-[#1C3B34]">
                  {activeCard.nqs} · {activeCard.nqsTitle}
                </span>
              </div>
            </div>
          </div>

          <div className="grid gap-0 lg:grid-cols-3">
            {/* NOTICE */}
            <div className="border-b border-[#E6E2DC] p-5 lg:border-b-0 lg:border-r md:p-6">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                First
              </span>

              <h3 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
                What am I noticing?
              </h3>

              <div className="mt-4 space-y-3">
                {activeCard.notice.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl bg-[#FAF8F5] p-3"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#C29F60]" />

                    <p className="text-sm leading-relaxed text-[#53645D]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* TRY */}
            <div className="border-b border-[#E6E2DC] p-5 lg:border-b-0 lg:border-r md:p-6">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                Then
              </span>

              <h3 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
                What could I try?
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                Choose one. You do not need to do all three.
              </p>

              <div className="mt-4 space-y-3">
                {activeCard.tryNext.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-[#E6E2DC] bg-white p-3"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#657B6C] text-[10px] font-black text-white">
                      +
                    </span>

                    <p className="text-sm font-medium leading-relaxed text-[#2B3833]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* WATCH */}
            <div className="p-5 md:p-6">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                Watch
              </span>

              <h3 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
                What changes next?
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                The response tells you more than the strategy name does.
              </p>

              <div className="mt-4 space-y-3">
                {activeCard.watchFor.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl bg-[#F1F4F2] p-3"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#657B6C]" />

                    <p className="text-sm leading-relaxed text-[#53645D]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REFLECTION */}
        <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-5 md:p-6">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
            Before you move on
          </span>

          <h2 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
            {activeCard.reflection}
          </h2>

          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#6A7873]">
            You do not need a long reflection. Write one thing you noticed that
            may help you or another educator next time.
          </p>

          <textarea
            value={reflectionText}
            onChange={(event) => setReflectionText(event.target.value)}
            rows={3}
            placeholder="I noticed..."
            className="mt-4 w-full rounded-2xl border-2 border-[#E6E2DC] bg-white p-4 text-sm leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
          />

          <button
            type="button"
            onClick={() => void copyReflection()}
            disabled={!reflectionText.trim()}
            className="mt-3 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {copied ? 'Reflection copied' : 'Copy reflection for your team'}
          </button>
        </section>

        {/* PRACTICE NOTE */}
        <section className="rounded-3xl border border-[#E6E2DC] bg-white p-5">
          <h2 className="text-sm font-extrabold text-[#1C3B34]">
            This is a noticing tool, not a behaviour script.
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
            Children communicate differently. Use your knowledge of the child,
            family information, service policies, safeguarding responsibilities
            and professional judgement when deciding what support is
            appropriate.
          </p>
        </section>
      </main>
    </div>
  );
}