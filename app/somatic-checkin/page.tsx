'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const VAGUS_CARDS_PAYMENT_URL =
  'https://buy.stripe.com/14AbIUgaeb9C0Vze549fW0d';

const COURSE_CARDS = [
  {
    step: 'Step 1 of 5',
    title: 'Acknowledge Your Nervous System First',
    subtitle: 'Staffroom Preparation',
    content:
      'You cannot loan calm if your own tank is empty. Regulation starts in the staffroom before entering room noise.',
    actionPrompt:
      'Take one slow breath in through your nose and let your shoulders drop away from your ears.',
  },
  {
    step: 'Step 2 of 5',
    title: 'Notice Your Body Tightness Points',
    subtitle: 'Physical Stress Signals',
    content:
      'Stress accumulates quickly during morning drop-offs: clenched teeth, shallow breathing, or tight neck muscles.',
    actionPrompt:
      'Unclench your jaw and rest your tongue flat against the roof of your mouth.',
  },
  {
    step: 'Step 3 of 5',
    title: 'Select a Staffroom Sensory Anchor',
    subtitle: '15-Second Somatic Reset',
    content:
      'A familiar scent, a warm drink, or natural window light provides an immediate physical pause.',
    actionPrompt:
      'Sip warm tea, splash cool water on wrists, or look at natural sunlight for 30 seconds.',
  },
  {
    step: 'Step 4 of 5',
    title: 'Shift Culture from Venting to Connection',
    subtitle: 'Co-Educator Relational Safety',
    content:
      'Room venting spreads fatigue. Protect your energy and support colleagues with quiet, steady words.',
    actionPrompt:
      'Offer one supportive statement to a co-worker before stepping back onto the floor.',
  },
  {
    step: 'Step 5 of 5',
    title: 'Step Onto the Floor as a Mobile Anchor',
    subtitle: 'Co-Regulation Ready',
    content:
      'Lower your physical height parallel to children, drop your vocal pitch, and serve as a steady anchor.',
    actionPrompt:
      'You are regulated, ready, and supported.',
  },
];

export default function SomaticCheckinPage() {
  const [currentCard, setCurrentCard] =
    useState(0);

  const [
    tightnessLocation,
    setTightnessLocation,
  ] = useState<string[]>([]);

  const [
    selectedSensory,
    setSelectedSensory,
  ] = useState<string[]>([]);

  const [
    relationalChoice,
    setRelationalChoice,
  ] = useState('');

  const [
    toolSubmitted,
    setToolSubmitted,
  ] = useState(false);

  const toggleTightness = (
    item: string,
  ) => {
    setTightnessLocation((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item],
    );
  };

  const toggleSensory = (
    item: string,
  ) => {
    setSelectedSensory((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item],
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-16 font-sans text-[#1C3B34]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 border-b-2 border-[#E6E2DC] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/platform/educator"
            className="flex items-center gap-1 text-sm font-bold text-[#657B6C] hover:text-[#1C3B34]"
          >
            ← Back to Floor Deck
          </Link>

          <span className="rounded-full border border-[#C29F60] bg-[#FAF5EC] px-3 py-1 text-xs font-black uppercase text-[#1C3B34]">
            Somatic Check-In
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-4 py-6">
        {/* Hero Banner */}
        <section className="space-y-3 rounded-3xl border-2 border-[#1C3B34] bg-[#1C3B34] p-6 text-center text-white shadow-sm md:p-8 md:text-left">
          <span className="block text-xs font-black uppercase tracking-wider text-[#C29F60]">
            10-Second Educator Body Scan
          </span>

          <h1 className="font-serif text-2xl font-bold leading-tight text-white md:text-4xl">
            Staffroom Regulation & Body Check-In
          </h1>

          <p className="max-w-2xl text-sm font-light leading-relaxed text-white/90 md:text-base">
            Notice physical stress signals, choose a simple sensory anchor, and prepare to return to the room with steadiness.
          </p>
        </section>

        {/* INTERACTIVE 5-STEP MICRO DECK */}
        <section className="space-y-5 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between border-b-2 border-[#FAF8F5] pb-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#657B6C]">
              {COURSE_CARDS[currentCard].step} •{' '}
              {
                COURSE_CARDS[currentCard]
                  .subtitle
              }
            </span>

            <span className="text-xs font-bold text-[#1C3B34]">
              Card {currentCard + 1} of{' '}
              {COURSE_CARDS.length}
            </span>
          </div>

          <div className="space-y-4 rounded-2xl bg-[#1C3B34] p-6 text-white">
            <h2 className="font-serif text-xl font-bold text-white md:text-2xl">
              {
                COURSE_CARDS[currentCard]
                  .title
              }
            </h2>

            <p className="text-sm font-light leading-relaxed text-white/90 md:text-base">
              {
                COURSE_CARDS[currentCard]
                  .content
              }
            </p>

            <div className="rounded-xl bg-[#C29F60] p-4 text-sm font-bold text-[#1C3B34]">
              Action Prompt:{' '}
              {
                COURSE_CARDS[currentCard]
                  .actionPrompt
              }
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              disabled={currentCard === 0}
              onClick={() =>
                setCurrentCard(
                  (prev) => prev - 1,
                )
              }
              className="rounded-xl bg-[#F4F1EA] px-5 py-3 text-xs font-bold text-[#1C3B34] transition-all hover:bg-[#E6E2DC] disabled:opacity-40"
            >
              ← Previous
            </button>

            <div className="flex gap-1.5">
              {COURSE_CARDS.map(
                (_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setCurrentCard(idx)
                    }
                    className={`h-2.5 rounded-full transition-all ${
                      currentCard === idx
                        ? 'w-8 bg-[#C29F60]'
                        : 'w-2.5 bg-[#E6E2DC]'
                    }`}
                    aria-label={`Go to step ${
                      idx + 1
                    }`}
                  />
                ),
              )}
            </div>

            {currentCard <
            COURSE_CARDS.length - 1 ? (
              <button
                type="button"
                onClick={() =>
                  setCurrentCard(
                    (prev) => prev + 1,
                  )
                }
                className="rounded-xl bg-[#657B6C] px-5 py-3 text-xs font-bold text-white shadow-sm transition-all hover:bg-opacity-90"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  setCurrentCard(0)
                }
                className="rounded-xl bg-[#C29F60] px-5 py-3 text-xs font-bold text-[#1C3B34] shadow-sm transition-all hover:bg-opacity-90"
              >
                Restart Deck
              </button>
            )}
          </div>
        </section>

        {/* INTERACTIVE BODY & SENSORY CHECK-IN FORM */}
        <section className="space-y-6 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
          <div className="border-b-2 border-[#FAF8F5] pb-4">
            <span className="block text-xs font-black uppercase tracking-wider text-[#657B6C]">
              Quick Reflection Tool
            </span>

            <h2 className="font-serif text-xl font-bold text-[#1C3B34] md:text-2xl">
              Staffroom Body & Sensory Reset Plan
            </h2>
          </div>

          {!toolSubmitted ? (
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-[#1C3B34]">
                  1. Where are you holding tension right now? (Select all that apply)
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    'Jaw Clenching / Teeth Pressing',
                    'Shallow Chest Breathing',
                    'Tight Shoulders or Neck',
                    'Heavy Pit in Stomach',
                  ].map((item) => {
                    const active =
                      tightnessLocation.includes(
                        item,
                      );

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() =>
                          toggleTightness(
                            item,
                          )
                        }
                        className={`min-h-12 rounded-2xl border-2 p-4 text-left text-sm font-bold transition-all ${
                          active
                            ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
                            : 'border-[#E6E2DC] bg-[#FAF8F5] text-[#1C3B34] hover:border-[#657B6C]'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-[#1C3B34]">
                  2. Choose your staffroom sensory anchor for today:
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      label:
                        'Lavender scent or essential oil',
                      cat:
                        'Scent Anchor',
                    },
                    {
                      label:
                        'Warm tea or cold water sip',
                      cat:
                        'Taste Anchor',
                    },
                    {
                      label:
                        'Natural window light exposure',
                      cat:
                        'Sight Anchor',
                    },
                    {
                      label:
                        '60 seconds quiet silence',
                      cat:
                        'Sound Anchor',
                    },
                  ].map((anchor) => {
                    const active =
                      selectedSensory.includes(
                        anchor.label,
                      );

                    return (
                      <button
                        key={anchor.label}
                        type="button"
                        onClick={() =>
                          toggleSensory(
                            anchor.label,
                          )
                        }
                        className={`min-h-12 rounded-2xl border-2 p-4 text-left transition-all ${
                          active
                            ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
                            : 'border-[#E6E2DC] bg-[#FAF8F5] text-[#1C3B34] hover:border-[#657B6C]'
                        }`}
                      >
                        <span className="block text-[10px] font-black uppercase tracking-wider opacity-80">
                          {anchor.cat}
                        </span>

                        <span className="text-sm font-bold">
                          {anchor.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-[#1C3B34]">
                  3. Relational Mindset Shift:
                </label>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {[
                    {
                      title:
                        'Supportive Room Kindness',
                      desc:
                        'I choose to offer quiet encouragement to colleagues rather than joining room venting.',
                    },
                    {
                      title:
                        'Protective Energy Boundary',
                      desc:
                        'I will protect my calm and refrain from carrying room stress into my break.',
                    },
                  ].map((choice) => {
                    const active =
                      relationalChoice ===
                      choice.title;

                    return (
                      <button
                        key={choice.title}
                        type="button"
                        onClick={() =>
                          setRelationalChoice(
                            choice.title,
                          )
                        }
                        className={`min-h-12 rounded-2xl border-2 p-4 text-left transition-all ${
                          active
                            ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
                            : 'border-[#E6E2DC] bg-[#FAF8F5] text-[#1C3B34] hover:border-[#657B6C]'
                        }`}
                      >
                        <span className="mb-1 block text-sm font-bold">
                          {choice.title}
                        </span>

                        <span className="block text-xs font-normal leading-relaxed opacity-90">
                          {choice.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setToolSubmitted(true)
                }
                className="w-full rounded-2xl bg-[#C29F60] px-6 py-4 text-base font-bold text-[#1C3B34] shadow-sm transition-all hover:bg-opacity-90"
              >
                Save My Somatic Reset Plan →
              </button>
            </div>
          ) : (
            <div className="space-y-4 rounded-2xl border-2 border-[#C29F60] bg-[#FAF5EC] p-6 text-center">
              <span className="block text-xs font-black uppercase text-[#C29F60]">
                Reset Plan Ready
              </span>

              <h3 className="font-serif text-xl font-bold text-[#1C3B34]">
                Your Somatic Check-In Summary
              </h3>

              <div className="space-y-2 rounded-xl border border-[#E6E2DC] bg-white p-4 text-left text-sm text-[#2B3833]">
                <p>
                  <strong>
                    Tension Points:
                  </strong>{' '}
                  {tightnessLocation.length >
                  0
                    ? tightnessLocation.join(
                        ', ',
                      )
                    : 'None selected'}
                </p>

                <p>
                  <strong>
                    Sensory Anchors:
                  </strong>{' '}
                  {selectedSensory.length > 0
                    ? selectedSensory.join(
                        ', ',
                      )
                    : 'None selected'}
                </p>

                <p>
                  <strong>
                    Relational Mindset:
                  </strong>{' '}
                  {relationalChoice ||
                    'Default calm anchor'}
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setToolSubmitted(false)
                }
                className="rounded-xl bg-[#657B6C] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-opacity-90"
              >
                Update My Check-In Plan
              </button>
            </div>
          )}
        </section>

        {/* PRINTABLE PDF BANNER */}
        <section className="space-y-4 rounded-3xl border-2 border-[#1C3B34] bg-[#1C3B34] p-6 text-white md:p-8">
          <div>
            <span className="mb-1 block text-xs font-black uppercase text-[#C29F60]">
              Printable Resource
            </span>

            <h2 className="font-serif text-xl font-bold text-white">
              Display CALM Staffroom Posters
            </h2>

            <p className="mt-1 text-xs font-light leading-relaxed text-white/80 md:text-sm">
              Print high-resolution A3 routine cards for your staffroom door, bathroom mirror, or break area.
            </p>
          </div>

          <a
            href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-2xl bg-[#C29F60] px-4 py-3.5 text-center text-sm font-bold text-[#1C3B34] shadow-sm transition-all hover:bg-opacity-90"
          >
            Download & Print Educator Staffroom Poster (PDF)
          </a>
        </section>

        {/* SMALL VAGUS CARDS BANNER */}
        <section className="border-t border-[#D8CFC2] pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-extrabold text-[#9A793D]">
                Related regulation resource
              </p>

              <h2 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
                Want some playful breathing, movement and body-awareness ideas too?
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#65736D]">
                The Vagus Nerve Activity Cards include practical ideas using breath, sound, movement and sensory play that you can keep on your device or print for your team.
              </p>
            </div>

            <a
              href={VAGUS_CARDS_PAYMENT_URL}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-xl border border-[#C29F60] bg-[#FAF5EC] px-5 py-2.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3E8D3]"
            >
              View the $14 AUD Cards
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}