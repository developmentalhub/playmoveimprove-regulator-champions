'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const COURSE_CARDS = [
  {
    step: 'Step 1 of 5',
    title: 'Acknowledge Your Nervous System First',
    subtitle: 'Staffroom Preparation',
    content: 'You cannot loan calm if your own tank is empty. Regulation starts in the staffroom before entering room noise.',
    actionPrompt: 'Take one slow breath in through your nose and let your shoulders drop away from your ears.',
  },
  {
    step: 'Step 2 of 5',
    title: 'Notice Your Body Tightness Points',
    subtitle: 'Physical Stress Signals',
    content: 'Stress accumulates quickly during morning drop-offs: clenched teeth, shallow breathing, or tight neck muscles.',
    actionPrompt: 'Unclench your jaw and rest your tongue flat against the roof of your mouth.',
  },
  {
    step: 'Step 3 of 5',
    title: 'Select a Staffroom Sensory Anchor',
    subtitle: '15-Second Somatic Reset',
    content: 'A familiar scent, a warm drink, or natural window light provides an immediate physical pause.',
    actionPrompt: 'Sip warm tea, splash cool water on wrists, or look at natural sunlight for 30 seconds.',
  },
  {
    step: 'Step 4 of 5',
    title: 'Shift Culture from Venting to Connection',
    subtitle: 'Co-Educator Relational Safety',
    content: 'Room venting spreads fatigue. Protect your energy and support colleagues with quiet, steady words.',
    actionPrompt: 'Offer one supportive statement to a co-worker before stepping back onto the floor.',
  },
  {
    step: 'Step 5 of 5',
    title: 'Step Onto the Floor as a Mobile Anchor',
    subtitle: 'Co-Regulation Ready',
    content: 'Lower your physical height parallel to children, drop your vocal pitch, and serve as a steady anchor.',
    actionPrompt: 'You are regulated, ready, and supported.',
  },
];

export default function SomaticCheckinPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [tightnessLocation, setTightnessLocation] = useState<string[]>([]);
  const [selectedSensory, setSelectedSensory] = useState<string[]>([]);
  const [relationalChoice, setRelationalChoice] = useState('');
  const [toolSubmitted, setToolSubmitted] = useState(false);

  const toggleTightness = (item: string) => {
    setTightnessLocation((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const toggleSensory = (item: string) => {
    setSelectedSensory((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-16">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/platform/educator"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            ← Back to Floor Deck
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Somatic Check-In
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3 text-center md:text-left">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            10-Second Educator Body Scan
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Staffroom Regulation & Body Check-In
          </h1>
          <p className="text-sm md:text-base text-white/90 leading-relaxed font-light max-w-2xl">
            Notice physical stress signals, choose a simple sensory anchor, and prepare to return to the room with steadiness.
          </p>
        </section>

        {/* INTERACTIVE 5-STEP MICRO DECK */}
        <section className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b-2 border-[#FAF8F5] pb-3">
            <span className="text-xs font-black uppercase text-[#657B6C] tracking-wider">
              {COURSE_CARDS[currentCard].step} • {COURSE_CARDS[currentCard].subtitle}
            </span>
            <span className="text-xs font-bold text-[#1C3B34]">
              Card {currentCard + 1} of {COURSE_CARDS.length}
            </span>
          </div>

          <div className="bg-[#1C3B34] text-white p-6 rounded-2xl space-y-4">
            <h2 className="text-xl md:text-2xl font-serif font-bold text-white">
              {COURSE_CARDS[currentCard].title}
            </h2>
            <p className="text-sm md:text-base text-white/90 font-light leading-relaxed">
              {COURSE_CARDS[currentCard].content}
            </p>
            <div className="p-4 bg-[#C29F60] text-[#1C3B34] font-bold text-sm rounded-xl">
              💡 Action Prompt: {COURSE_CARDS[currentCard].actionPrompt}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center gap-3 pt-2">
            <button
              type="button"
              disabled={currentCard === 0}
              onClick={() => setCurrentCard((prev) => prev - 1)}
              className="py-3 px-5 bg-[#F4F1EA] text-[#1C3B34] font-bold rounded-xl text-xs hover:bg-[#E6E2DC] transition-all disabled:opacity-40"
            >
              ← Previous
            </button>

            <div className="flex gap-1.5">
              {COURSE_CARDS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentCard(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentCard === idx ? 'w-8 bg-[#C29F60]' : 'w-2.5 bg-[#E6E2DC]'
                  }`}
                  aria-label={`Go to step ${idx + 1}`}
                />
              ))}
            </div>

            {currentCard < COURSE_CARDS.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentCard((prev) => prev + 1)}
                className="py-3 px-5 bg-[#657B6C] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all shadow-sm"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentCard(0)}
                className="py-3 px-5 bg-[#C29F60] text-[#1C3B34] font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all shadow-sm"
              >
                Restart Deck ↺
              </button>
            )}
          </div>
        </section>

        {/* INTERACTIVE BODY & SENSORY CHECK-IN FORM */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-6">
          <div className="border-b-2 border-[#FAF8F5] pb-4">
            <span className="text-xs font-black uppercase text-[#657B6C] tracking-wider block">
              Quick Reflection Tool
            </span>
            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34]">
              Staffroom Body & Sensory Reset Plan
            </h2>
          </div>

          {!toolSubmitted ? (
            <div className="space-y-6">
              {/* Question 1: Tension Points */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#1C3B34] block">
                  1. Where are you holding tension right now? (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'Jaw Clenching / Teeth Pressing',
                    'Shallow Chest Breathing',
                    'Tight Shoulders or Neck',
                    'Heavy Pit in Stomach',
                  ].map((item) => {
                    const active = tightnessLocation.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleTightness(item)}
                        className={`p-4 rounded-2xl border-2 text-left text-sm font-bold transition-all min-h-12 ${
                          active
                            ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-sm'
                            : 'bg-[#FAF8F5] text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
                        }`}
                      >
                        {active ? '✓ ' : ''} {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 2: Sensory Anchors */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#1C3B34] block">
                  2. Choose your staffroom sensory anchor for today:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Lavender scent or essential oil', cat: 'Scent Anchor' },
                    { label: 'Warm tea or cold water sip', cat: 'Taste Anchor' },
                    { label: 'Natural window light exposure', cat: 'Sight Anchor' },
                    { label: '60 seconds quiet silence', cat: 'Sound Anchor' },
                  ].map((anchor) => {
                    const active = selectedSensory.includes(anchor.label);
                    return (
                      <button
                        key={anchor.label}
                        type="button"
                        onClick={() => toggleSensory(anchor.label)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all min-h-12 ${
                          active
                            ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-sm'
                            : 'bg-[#FAF8F5] text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
                        }`}
                      >
                        <span className="text-[10px] font-black uppercase tracking-wider block opacity-80">
                          {anchor.cat}
                        </span>
                        <span className="text-sm font-bold">
                          {active ? '✓ ' : ''} {anchor.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Question 3: Mindset Shift */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#1C3B34] block">
                  3. Relational Mindset Shift:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      title: 'Supportive Room Kindness',
                      desc: 'I choose to offer quiet encouragement to colleagues rather than joining room venting.',
                    },
                    {
                      title: 'Protective Energy Boundary',
                      desc: 'I will protect my calm and refrain from carrying room stress into my break.',
                    },
                  ].map((choice) => {
                    const active = relationalChoice === choice.title;
                    return (
                      <button
                        key={choice.title}
                        type="button"
                        onClick={() => setRelationalChoice(choice.title)}
                        className={`p-4 rounded-2xl border-2 text-left transition-all min-h-12 ${
                          active
                            ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-sm'
                            : 'bg-[#FAF8F5] text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
                        }`}
                      >
                        <span className="text-sm font-bold block mb-1">
                          {active ? '✓ ' : ''} {choice.title}
                        </span>
                        <span className="text-xs font-normal leading-relaxed block opacity-90">
                          {choice.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setToolSubmitted(true)}
                className="w-full py-4 px-6 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl hover:bg-opacity-90 transition-all text-base shadow-sm"
              >
                Save My Somatic Reset Plan →
              </button>
            </div>
          ) : (
            /* Summary Plan View */
            <div className="p-6 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-2xl space-y-4 text-center">
              <span className="text-xs font-black uppercase text-[#C29F60] block">
                Reset Plan Ready
              </span>

              <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
                Your Somatic Check-In Summary
              </h3>

              <div className="bg-white p-4 rounded-xl border border-[#E6E2DC] text-left text-sm space-y-2 text-[#2B3833]">
                <p>
                  <strong>Tension Points:</strong>{' '}
                  {tightnessLocation.length > 0 ? tightnessLocation.join(', ') : 'None selected'}
                </p>
                <p>
                  <strong>Sensory Anchors:</strong>{' '}
                  {selectedSensory.length > 0 ? selectedSensory.join(', ') : 'None selected'}
                </p>
                <p>
                  <strong>Relational Mindset:</strong>{' '}
                  {relationalChoice || 'Default calm anchor'}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setToolSubmitted(false)}
                className="py-3 px-6 bg-[#657B6C] text-white font-bold rounded-xl text-sm hover:bg-opacity-90 transition-all shadow-sm"
              >
                Update My Check-In Plan
              </button>
            </div>
          )}
        </section>

        {/* PRINTABLE PDF BANNER */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#C29F60] block mb-1">
              Printable Resource
            </span>
            <h2 className="text-xl font-serif font-bold text-white">
              Display CALM Staffroom Posters
            </h2>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed font-light mt-1">
              Print high-resolution A3 routine cards for your staffroom door, bathroom mirror, or break area.
            </p>
          </div>

          <a
            href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 px-4 bg-[#C29F60] text-[#1C3B34] text-center font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm"
          >
            🖨️ Download & Print Educator Staffroom Poster (PDF)
          </a>
        </section>
      </main>
    </div>
  );
}