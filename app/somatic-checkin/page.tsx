'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const COURSE_CARDS = [
  {
    step: 'Step 1 of 5',
    title: 'Acknowledge Your Adult Nervous System First',
    subtitle: 'Before stepping onto the room floor',
    content:
      'You cannot loan calm if your own nervous system is operating on low battery. Regulation starts in the staffroom, not when you are already surrounded by shouting and room noise.',
    actionPrompt:
      'Take one slow breath in through your nose and let your shoulders drop away from your ears.',
    bgClass: 'bg-teal-900 text-white',
  },
  {
    step: 'Step 2 of 5',
    title: 'Notice Your Body Tightness Points',
    subtitle: 'Physical stress signals',
    content:
      'When stress accumulates during morning drop offs, your body gives quiet warning signs: clenching your jaw, shallow chest breathing, or holding tension in your lower neck.',
    actionPrompt:
      'Unclench your teeth and rest your tongue flat against the roof of your mouth.',
    bgClass: 'bg-teal-950 text-white',
  },
  {
    step: 'Step 3 of 5',
    title: 'Activate Your Vagus Nerve in the Staffroom',
    subtitle: 'Sensory anchors for rapid soothing',
    content:
      'Your vagus nerve responds instantly to sensory signals. Inhaling lavender, sipping warm chamomile tea, or stepping toward natural window light signals safety to your nervous system.',
    actionPrompt:
      'Sip warm tea or take 30 seconds to look out at natural sunlight.',
    bgClass: 'bg-teal-900 text-white',
  },
  {
    step: 'Step 4 of 5',
    title: 'Shift Staffroom Culture from Venting to Connection',
    subtitle: 'Relational safety with colleagues',
    content:
      'Frustrated room venting spreads stress through the staffroom. Protect your energy and support room colleagues with quiet, steady words rather than absorbing room tension.',
    actionPrompt:
      'Replace room complaints with one supportive statement to a co worker today.',
    bgClass: 'bg-teal-950 text-white',
  },
  {
    step: 'Step 5 of 5',
    title: 'Step Onto the Floor as a Mobile Anchor',
    subtitle: 'Loan your calm to dysregulated children',
    content:
      'You are now ready. Lower your physical height parallel to children, slow down your spoken words, and serve as a steady anchor during room overstimulation.',
    actionPrompt:
      'You are regulated, ready, and supported. Return to the portal or download your printable room posters below.',
    bgClass: 'bg-emerald-900 text-white',
  },
];

export default function SomaticCheckinPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [tightnessLocation, setTightnessLocation] = useState<string[]>([]);
  const [selectedSensory, setSelectedSensory] = useState<string[]>([]);
  const [relationalChoice, setRelationalChoice] = useState('');
  const [toolSubmitted, setToolSubmitted] = useState(false);

  const toggleTightness = (item: string) => {
    setTightnessLocation((previous) =>
      previous.includes(item)
        ? previous.filter((existingItem) => existingItem !== item)
        : [...previous, item],
    );
  };

  const toggleSensory = (item: string) => {
    setSelectedSensory((previous) =>
      previous.includes(item)
        ? previous.filter((existingItem) => existingItem !== item)
        : [...previous, item],
    );
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            ← Back to Home
          </Link>

          <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-950">
            Interactive Somatic Tools
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-12 px-6 py-10">
        <section className="mx-auto max-w-2xl space-y-3 text-center">
          <span className="inline-block rounded-full bg-teal-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-900">
            Staffroom Regulation Pacing
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 md:text-4xl">
            CALM Framework Interactive Learning &amp; Somatic Check In
          </h1>

          <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
            Designed for 15 minute planning breaks. Complete your micro card
            deck or perform an interactive vagus nerve reset before stepping
            back onto the room floor.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900">
              Interactive Course Cards: Ladder 1 Micro Module
            </h2>

            <span className="text-xs font-bold text-slate-500">
              Card {currentCard + 1} of {COURSE_CARDS.length}
            </span>
          </div>

          <div
            className={`space-y-6 rounded-3xl p-8 shadow-xl transition-all duration-300 md:p-10 ${COURSE_CARDS[currentCard].bgClass}`}
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/20 pb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-200">
                {COURSE_CARDS[currentCard].step}
              </span>

              <span className="text-xs font-medium text-teal-100">
                {COURSE_CARDS[currentCard].subtitle}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-2xl font-extrabold md:text-3xl">
                {COURSE_CARDS[currentCard].title}
              </h3>

              <p className="text-xs leading-relaxed text-teal-50 md:text-sm">
                {COURSE_CARDS[currentCard].content}
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-xs font-semibold text-amber-200">
              Action Prompt: {COURSE_CARDS[currentCard].actionPrompt}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-4">
              <button
                type="button"
                disabled={currentCard === 0}
                onClick={() =>
                  setCurrentCard((previousCard) => previousCard - 1)
                }
                className="rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20 disabled:opacity-40"
              >
                ← Previous
              </button>

              <div className="flex gap-1.5">
                {COURSE_CARDS.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setCurrentCard(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      currentCard === index
                        ? 'w-8 bg-amber-400'
                        : 'w-2.5 bg-white/30'
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                ))}
              </div>

              {currentCard < COURSE_CARDS.length - 1 ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentCard((previousCard) => previousCard + 1)
                  }
                  className="rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow transition hover:bg-amber-300"
                >
                  Next Card →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentCard(0)}
                  className="rounded-xl bg-emerald-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow transition hover:bg-emerald-300"
                >
                  Restart Deck ↺
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="space-y-2 border-b border-slate-200 pb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Interactive Self Regulation Tool
            </span>

            <h2 className="text-2xl font-bold text-slate-900">
              Staffroom Vagus Nerve &amp; Body Check In
            </h2>

            <p className="text-xs leading-relaxed text-slate-600">
              Complete this 60 second somatic assessment during your break to
              identify body tension and choose staffroom sensory anchors.
            </p>
          </div>

          {!toolSubmitted ? (
            <div className="space-y-8">
              <div className="space-y-3">
                <p className="block text-xs font-bold uppercase text-slate-700">
                  1. Where are you holding tension right now? Select all that
                  apply.
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    'Tight Jaw / Teeth Clenching',
                    'Shallow Chest Breathing',
                    'Stiff Shoulders or Neck',
                    'Heavy Pit in Stomach',
                  ].map((item) => {
                    const selected = tightnessLocation.includes(item);

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleTightness(item)}
                        className={`rounded-2xl border p-3 text-left text-xs font-bold transition ${
                          selected
                            ? 'border-teal-800 bg-teal-800 text-white shadow-xs'
                            : 'border-slate-200 bg-[#FDFBF7] text-slate-700 hover:border-teal-600'
                        }`}
                      >
                        {selected ? '✓ ' : ''}
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="block text-xs font-bold uppercase text-slate-700">
                  2. Choose your staffroom sensory soothing anchors for today:
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      label: 'Lavender twigs or essential oil scent',
                      category: 'Scent Anchor',
                    },
                    {
                      label: 'Warm chamomile tea or cold water sip',
                      category: 'Taste Anchor',
                    },
                    {
                      label: 'Natural window light exposure',
                      category: 'Sight Anchor',
                    },
                    {
                      label: 'Soft ambient music or 60s quiet silence',
                      category: 'Sound Anchor',
                    },
                  ].map((anchor) => {
                    const selected = selectedSensory.includes(anchor.label);

                    return (
                      <button
                        key={anchor.label}
                        type="button"
                        onClick={() => toggleSensory(anchor.label)}
                        className={`rounded-2xl border p-4 text-left transition ${
                          selected
                            ? 'border-teal-800 bg-teal-800 text-white shadow-xs'
                            : 'border-slate-200 bg-[#FDFBF7] text-slate-700 hover:border-teal-600'
                        }`}
                      >
                        <span className="mb-0.5 block text-[10px] font-bold uppercase tracking-wider opacity-80">
                          {anchor.category}
                        </span>

                        <span className="text-xs font-bold">
                          {selected ? '✓ ' : ''}
                          {anchor.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="block text-xs font-bold uppercase text-slate-700">
                  3. Relational Mindset Shift for Your Shift:
                </p>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      id: 'kindness',
                      title: 'Supportive Room Kindness',
                      description:
                        'I choose to offer quiet encouragement to colleagues rather than joining frustrated room venting.',
                    },
                    {
                      id: 'boundary',
                      title: 'Protective Energy Boundary',
                      description:
                        'I will protect my morning calm and refrain from carrying room stress into my break.',
                    },
                  ].map((choice) => (
                    <button
                      key={choice.id}
                      type="button"
                      onClick={() => setRelationalChoice(choice.title)}
                      className={`rounded-2xl border p-4 text-left transition ${
                        relationalChoice === choice.title
                          ? 'border-teal-800 bg-teal-800 text-white shadow-xs'
                          : 'border-slate-200 bg-[#FDFBF7] text-slate-700 hover:border-teal-600'
                      }`}
                    >
                      <strong className="mb-1 block text-xs font-bold">
                        {relationalChoice === choice.title ? '✓ ' : ''}
                        {choice.title}
                      </strong>

                      <p className="text-[11px] leading-relaxed opacity-90">
                        {choice.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToolSubmitted(true)}
                className="w-full rounded-2xl bg-amber-400 py-4 text-xs font-bold text-slate-950 shadow-md transition hover:bg-amber-300"
              >
                Lock In My Somatic Reset Plan &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-4 rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center">
              <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
                Somatic Plan Active
              </span>

              <h3 className="text-lg font-bold text-teal-950">
                Your Body Is Reset and Ready
              </h3>

              <div className="mx-auto max-w-md space-y-2 rounded-xl border border-teal-200 bg-white p-4 text-left text-xs text-teal-900">
                <p>
                  <strong>Tension Points Noticed:</strong>{' '}
                  {tightnessLocation.length > 0
                    ? tightnessLocation.join(', ')
                    : 'None selected'}
                </p>

                <p>
                  <strong>Sensory Anchors Chosen:</strong>{' '}
                  {selectedSensory.length > 0
                    ? selectedSensory.join(', ')
                    : 'None selected'}
                </p>

                <p>
                  <strong>Relational Focus:</strong>{' '}
                  {relationalChoice || 'Default calm anchor'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setToolSubmitted(false)}
                className="inline-block rounded-xl bg-teal-800 px-5 py-2.5 text-xs font-bold text-white shadow transition hover:bg-teal-900"
              >
                Update My Reset Plan
              </button>
            </div>
          )}
        </section>

        <section className="space-y-6 rounded-3xl bg-teal-950 p-8 text-white md:p-10">
          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-300">
              Print &amp; Display Vault
            </span>

            <h2 className="text-2xl font-bold">
              Download Official CALM Room Posters &amp; Routine Cards
            </h2>

            <p className="max-w-2xl text-xs leading-relaxed text-teal-100">
              Print this high resolution PDF card to display on your staffroom
              door, bathroom mirror, or room entry points.
            </p>
          </div>

          <div className="max-w-2xl">
            <a
              href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block space-y-2 rounded-2xl border border-teal-700 bg-teal-900/80 p-5 text-left transition hover:bg-teal-800"
            >
              <strong className="block text-sm font-bold text-amber-300">
                Educator Routine Ladder 1 Poster (PDF)
              </strong>

              <p className="text-xs leading-relaxed text-teal-100">
                4-step morning preparation card for staffroom doors and break
                areas.
              </p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}