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
    title: 'Choose a Simple Sensory Anchor in the Staffroom',
    subtitle: 'Simple sensory anchors',
    content:
      'Simple sensory experiences can sometimes help an educator pause and shift pace. A familiar scent, a warm drink, natural light or a brief quiet moment may provide a useful anchor during a demanding day.',
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
            Somatic Check-In for Early Childhood Educators
          </h1>

          <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
            A free educator self-regulation tool for noticing body tension,
            choosing simple sensory anchors and preparing to return to the room
            with more awareness and steadiness.
          </p>

          <p className="text-xs leading-relaxed text-slate-500">
            Use this during a planning break, before a difficult transition or
            after a demanding period in the room. The goal is not to force calm,
            but to notice what your body is carrying before you step back into
            co-regulation with children.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Educator Nervous System Awareness
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Why a somatic check-in can help before you return to the room
            </h2>

            <p className="text-sm leading-relaxed text-slate-700">
              Early childhood educators spend much of the day responding to
              noise, movement, emotional escalation, competing demands and
              constant social contact. It is easy to keep moving without noticing
              how much tension your own body is carrying.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              A somatic check-in is simply a brief pause to notice physical
              signals such as jaw tension, shallow breathing, tight shoulders or
              a heavy feeling in the stomach. Noticing these signals can help an
              educator make a more deliberate choice about what support they need
              before re-entering a demanding environment.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              This matters for co-regulation because children are often reading
              our pace, voice, posture, facial expression and predictability long
              before they can explain what they need.
            </p>
          </div>

          <aside className="rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Keep It Simple
            </span>

            <p className="mt-3 text-lg font-extrabold leading-snug text-slate-900">
              You do not need to feel perfectly calm before supporting a child.
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              The useful starting point is noticing your own state so you can
              slow your pace, reduce unnecessary language and choose a more
              deliberate response.
            </p>
          </aside>
        </section>

        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Common Body Cues of Stress
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              What educators may notice in their body during a demanding day
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'Jaw and facial tension',
                'Clenching the jaw, pressing the tongue, tightening the face or holding the breath.',
              ],
              [
                'Shallow breathing',
                'Breathing high into the chest or noticing that breathing has become faster and less comfortable.',
              ],
              [
                'Shoulder and neck tension',
                'Holding the shoulders up, bracing through the neck or feeling stiff across the upper back.',
              ],
              [
                'Stomach discomfort',
                'A heavy, tight or unsettled feeling in the stomach during periods of stress or overload.',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <strong className="block text-sm font-bold text-slate-900">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
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
              Staffroom Body &amp; Sensory Check-In
            </h2>

            <p className="text-xs leading-relaxed text-slate-600">
              Complete this short self-reflection during your break to notice
              body tension and choose simple sensory anchors that may help you
              return to the room with greater awareness.
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
                Save My Somatic Check-In Plan &rarr;
              </button>
            </div>
          ) : (
            <div className="space-y-4 rounded-2xl border border-teal-200 bg-teal-50 p-6 text-center">
              <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
                Somatic Check-In Complete
              </span>

              <h3 className="text-lg font-bold text-teal-950">
                Your Check-In Plan Is Ready
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
                Update My Check-In Plan
              </button>
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-teal-300 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Co-Regulation Starts With Awareness
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-teal-950">
            Why educator regulation matters in early childhood
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-teal-900">
            Children do not need adults who are calm every second of the day.
            They benefit from adults who can notice when their own stress is
            rising, repair when a moment goes poorly and return with a steadier,
            more predictable response.
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-teal-900">
            This is one reason co-regulation is a whole-team practice rather than
            a collection of child calming activities.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/emotional-regulation-early-childhood"
              className="rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Emotional Regulation Guide →
            </Link>

            <Link
              href="/educator-capacity-building"
              className="rounded-xl border border-teal-300 bg-white px-5 py-3 text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Educator Capacity Building →
            </Link>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Common Questions
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Somatic check-in FAQs for educators
            </h2>
          </div>

          <div className="space-y-3">
            {[
              [
                'What is a somatic check-in?',
                'A somatic check-in is a brief pause to notice physical sensations such as muscle tension, breathing, stomach discomfort or posture. It is a self-awareness tool rather than a clinical assessment.',
              ],
              [
                'Why would an early childhood educator use a body check-in?',
                'Educators work in busy, socially demanding environments. A short body check-in can help an educator notice rising stress before returning to a room, transition or emotionally demanding interaction.',
              ],
              [
                'Is this a mental health or medical assessment?',
                'No. This tool is designed for general professional reflection and wellbeing awareness. It does not diagnose a health condition or replace medical, psychological or allied health care.',
              ],
              [
                'Does an educator need to be calm before co-regulating with a child?',
                'No. Co-regulation does not require perfect calm. Awareness of your own state can simply make it easier to slow your voice, reduce demands and respond more intentionally.',
              ],
              [
                'Can services use this tool for staff performance management?',
                'It is designed as a reflective professional learning tool, not as an employee performance assessment. Educators should be able to use self-reflection without feeling that normal stress responses are being judged.',
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-sm font-bold text-slate-900">
                  {question}
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-[#F7F3EC] p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            About the Author
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-slate-900">
            Robyn Papworth
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Robyn is an Accredited Exercise Physiologist and Developmental
            Educator and the founder of Play Move Improve. Her work with early
            childhood teams focuses on movement, sensory processing, emotional
            regulation, executive function and practical co-regulation in real
            learning environments.
          </p>
        </section>

        <section className="rounded-3xl bg-teal-950 p-7 text-white md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Regulator Champions
              </span>

              <h2 className="mt-1 text-2xl font-extrabold">
                Build educator self-awareness into whole-team co-regulation practice
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-teal-100">
                This free somatic check-in is one practical part of the broader
                Regulator Champions pathway for early childhood teams.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/proposal?plan=preview"
                className="rounded-xl bg-amber-400 px-5 py-3 text-center text-xs font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Start With 3 Ladders →
              </Link>

              <Link
                href="/early-childhood-professional-development"
                className="rounded-xl border border-teal-700 bg-teal-900 px-5 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-800"
              >
                Early Childhood PD Guide →
              </Link>
            </div>
          </div>
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