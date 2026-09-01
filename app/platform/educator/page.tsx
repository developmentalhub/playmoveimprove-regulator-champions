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

const HOW_TO_USE = [
  {
    number: '1',
    title: 'Choose the moment',
    text: 'Pick the card that sounds closest to what is happening right now.',
  },
  {
    number: '2',
    title: 'Notice first',
    text: 'Look at the child, the room and yourself before deciding what the behaviour means.',
  },
  {
    number: '3',
    title: 'Try one thing',
    text: 'Choose one small response. You do not need to use every suggestion.',
  },
  {
    number: '4',
    title: 'Watch',
    text: 'Notice what changes after you respond differently.',
  },
  {
    number: '5',
    title: 'Reflect',
    text: 'Capture one useful thing to remember or discuss later.',
  },
];

export default function EducatorPlatformPage() {
  const [selectedCard, setSelectedCard] =
    useState<number>(1);

  const [
    reflectionText,
    setReflectionText,
  ] = useState('');

  const [copied, setCopied] =
    useState(false);

  const activeCard =
    FLOOR_CARDS.find(
      (card) =>
        card.id === selectedCard,
    ) ?? FLOOR_CARDS[0];

  const copyReflection = async () => {
    const reflection =
      reflectionText.trim();

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
      await navigator.clipboard.writeText(
        text,
      );

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error(
        'Copy reflection failed:',
        error,
      );
    }
  };

  const selectCard = (id: number) => {
    setSelectedCard(id);
    setReflectionText('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 text-[#2B3833]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E5DED4] bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <span className="block text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Regulator Champions
            </span>

            <h1 className="mt-1 text-xl font-extrabold text-[#1C3B34] sm:text-2xl">
              Educator Floor Deck
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="flex min-h-12 items-center rounded-2xl border-2 border-[#E5DED4] bg-white px-4 py-3 text-sm font-bold text-[#1C3B34] transition hover:border-[#657B6C]"
            >
              Member Hub
            </Link>

            <Link
              href="/platform/manager"
              className="hidden min-h-12 items-center rounded-2xl bg-[#657B6C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#53665A] sm:flex"
            >
              Manager
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-9 px-5 py-8 sm:px-6 sm:py-10">

        {/* INTRO */}
        <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white shadow-lg">
          <div className="p-7 sm:p-10">
            <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34]">
              Use this during a real moment
            </span>

            <h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Something is getting hard.
              What do I do next?
            </h2>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
              Do not search for the perfect
              strategy. Find the moment that
              looks closest to what is
              happening, notice first and
              try one small adjustment.
            </p>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-lg font-extrabold text-[#E4C98E]">
                Important
              </p>

              <p className="mt-2 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
                You are not trying to
                complete this page while a
                child is distressed. Use
                what you need, then come
                back to reflect later.
              </p>
            </div>
          </div>
        </section>

        {/* HOW TO USE */}
        <section>
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            How to use the Floor Deck
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Five simple steps
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_TO_USE.map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-[#E5DED4] bg-white p-5 shadow-sm"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C29F60] font-extrabold text-[#1C3B34]">
                  {step.number}
                </span>

                <h3 className="mt-4 text-xl font-extrabold text-[#1C3B34]">
                  {step.title}
                </h3>

                <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CHOOSE MOMENT */}
        <section>
          <span className="inline-flex rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-extrabold text-[#9A793D]">
            Step 1
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            What is happening right now?
          </h2>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            Choose the closest match. It
            does not need to describe the
            situation perfectly.
          </p>

          <div className="mt-6 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
            {FLOOR_CARDS.map((card) => {
              const selected =
                selectedCard === card.id;

              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={() =>
                    selectCard(card.id)
                  }
                  className={`min-h-36 min-w-[78vw] snap-center rounded-3xl border-2 p-5 text-left transition sm:min-w-0 ${
                    selected
                      ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                      : 'border-[#E5DED4] bg-white text-[#1C3B34] hover:border-[#657B6C]'
                  }`}
                >
                  <span
                    className={`block text-sm font-extrabold uppercase tracking-[0.1em] ${
                      selected
                        ? 'text-[#E4C98E]'
                        : 'text-[#657B6C]'
                    }`}
                  >
                    {card.moment}
                  </span>

                  <span className="mt-3 block text-xl font-extrabold leading-snug">
                    {card.title}
                  </span>

                  {selected && (
                    <span className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1.5 text-sm font-bold">
                      Open
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* ACTIVE MOMENT */}
        <section className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white shadow-sm">
          <div className="border-b border-[#E5DED4] bg-[#FAF5EC] p-7 sm:p-8">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              {activeCard.moment}
            </span>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              {activeCard.title}
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#65736D]">
              Work from left to right. You
              do not need to do everything
              listed.
            </p>

            <div className="mt-5 inline-flex rounded-2xl border border-[#C29F60]/40 bg-white px-4 py-3">
              <div>
                <span className="block text-sm font-extrabold uppercase tracking-[0.1em] text-[#657B6C]">
                  NQS practice connection
                </span>

                <span className="mt-1 block text-base font-bold text-[#1C3B34]">
                  {activeCard.nqs} ·{' '}
                  {activeCard.nqsTitle}
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3">

            {/* NOTICE */}
            <div className="border-b border-[#E5DED4] p-7 lg:border-b-0 lg:border-r">
              <span className="inline-flex rounded-full bg-[#F1F4F2] px-3 py-1.5 text-sm font-extrabold text-[#657B6C]">
                Step 2
              </span>

              <h3 className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
                Notice first
              </h3>

              <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                Before adding another
                instruction or strategy,
                look at what is already
                happening.
              </p>

              <div className="mt-5 space-y-3">
                {activeCard.notice.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl bg-[#FAF8F5] p-4"
                    >
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C29F60]" />

                      <p className="text-lg leading-relaxed text-[#53645D]">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* TRY */}
            <div className="border-b border-[#E5DED4] p-7 lg:border-b-0 lg:border-r">
              <span className="inline-flex rounded-full bg-[#FAF5EC] px-3 py-1.5 text-sm font-extrabold text-[#9A793D]">
                Step 3
              </span>

              <h3 className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
                Try one thing
              </h3>

              <p className="mt-2 text-base font-bold leading-relaxed text-[#65736D]">
                Choose one. You do not need
                to do all three.
              </p>

              <div className="mt-5 space-y-3">
                {activeCard.tryNext.map(
                  (item, index) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl border border-[#E5DED4] bg-white p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#657B6C] text-sm font-extrabold text-white">
                        {index + 1}
                      </span>

                      <p className="text-lg font-medium leading-relaxed text-[#2B3833]">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-5 rounded-2xl bg-[#FAF5EC] p-4">
                <p className="text-base font-extrabold text-[#1C3B34]">
                  Then pause.
                </p>

                <p className="mt-1 text-base leading-relaxed text-[#65736D]">
                  Give the child time to
                  respond before adding the
                  next idea.
                </p>
              </div>
            </div>

            {/* WATCH */}
            <div className="p-7">
              <span className="inline-flex rounded-full bg-[#F1F4F2] px-3 py-1.5 text-sm font-extrabold text-[#657B6C]">
                Step 4
              </span>

              <h3 className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
                Watch what changes
              </h3>

              <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                Do not only look for the
                behaviour to disappear.
              </p>

              <div className="mt-5 space-y-3">
                {activeCard.watchFor.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex gap-3 rounded-2xl bg-[#F1F4F2] p-4"
                    >
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#657B6C]" />

                      <p className="text-lg leading-relaxed text-[#53645D]">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>

              <div className="mt-5 rounded-2xl border border-[#E5DED4] bg-white p-4">
                <p className="text-base font-extrabold text-[#1C3B34]">
                  Small changes count.
                </p>

                <p className="mt-1 text-base leading-relaxed text-[#65736D]">
                  A child slowing down,
                  looking towards you,
                  tolerating your presence,
                  processing one instruction
                  or recovering more quickly
                  can all tell you something.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* REFLECT */}
        <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 sm:p-8">
          <span className="inline-flex rounded-full bg-[#1C3B34] px-4 py-2 text-sm font-extrabold text-white">
            Step 5
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34]">
            Before you move on, what did
            you learn?
          </h2>

          <div className="mt-5 rounded-3xl bg-white p-6">
            <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
              Reflection question
            </span>

            <p className="mt-3 text-2xl font-extrabold leading-relaxed text-[#1C3B34]">
              {activeCard.reflection}
            </p>
          </div>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            You do not need to write a
            paragraph. One useful
            observation is enough.
          </p>

          <textarea
            value={reflectionText}
            onChange={(event) =>
              setReflectionText(
                event.target.value,
              )
            }
            rows={4}
            placeholder="I noticed..."
            className="mt-5 w-full rounded-2xl border-2 border-[#E5DED4] bg-white p-5 text-base leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
          />

          <button
            type="button"
            onClick={() =>
              void copyReflection()
            }
            disabled={
              !reflectionText.trim()
            }
            className="mt-4 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
          >
            {copied
              ? 'Reflection copied'
              : 'Copy reflection for my team'}
          </button>
        </section>

        {/* WHAT NEXT */}
        <section className="rounded-4xl bg-[#1C3B34] p-7 text-white sm:p-9">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
            What do I do next?
          </span>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            You do not need another strategy
            just because the moment was hard.
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Decide what makes sense from
            what you noticed.
          </p>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NextStep
              title="Repeat"
              text="Try the same response again if it seemed useful."
            />

            <NextStep
              title="Adjust"
              text="Choose a different idea if the first response did not fit."
            />

            <NextStep
              title="Discuss"
              text="Share the reflection with another educator or your leader."
            />

            <NextStep
              title="Ask Robyn"
              text="Bring the situation into the Monthly Hub if your team is still unsure."
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
            This is a noticing tool, not a
            behaviour script.
          </h2>

          <p className="mt-3 text-base leading-relaxed text-[#65736D]">
            Children communicate
            differently. Use your knowledge
            of the child, family
            information, service policies,
            safeguarding responsibilities
            and professional judgement when
            deciding what support is
            appropriate.
          </p>
        </section>
      </main>
    </div>
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