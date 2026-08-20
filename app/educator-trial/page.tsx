'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EducatorTrialPage() {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [accessCode, setAccessCode] = useState<string>('');
  const [isActivated, setIsActivated] = useState<boolean>(false);

  const trialDays = [
    {
      day: 1,
      title: 'Day 1: Staffroom Somatic Pause',
      focus: 'Adult Regulation',
      qip: 'QA 5.1.1',
      subtitle: 'Nervous System Preparation',
      prompt: 'Unclench jaw, drop shoulders from ears, and take two slow nasal breaths before entering the room.'
    },
    {
      day: 2,
      title: 'Day 2: Doorway Welcome Anchor',
      focus: 'Arrival Continuity',
      qip: 'QA 6.1.1',
      subtitle: 'Drop-Off Unburdening',
      prompt: 'Lower physical height parallel to doorway and pause tablet logging when families step across the threshold.'
    },
    {
      day: 3,
      title: 'Day 3: Acoustic Dampening Switch',
      focus: 'Environmental Setup',
      qip: 'QA 3.1.2',
      subtitle: 'Sensory Load Reduction',
      prompt: 'Turn off background audio clutter and dim room ceiling lights 5 minutes before group gathering.'
    },
    {
      day: 4,
      title: 'Day 4: Proprioceptive Heavy Carry',
      focus: 'Sensory Outlets',
      qip: 'QA 1.3.2',
      subtitle: 'Movement Anchors',
      prompt: 'Provide weighted cushions or heavy water jugs to carry before expecting seated attention from children.'
    },
    {
      day: 5,
      title: 'Day 5: Low-Arousal Side Stance',
      focus: 'De-Escalation',
      qip: 'QA 5.1.1',
      subtitle: 'High Arousal Support',
      prompt: 'Drop to one knee at a 45-degree angle, lower eye height, and stop verbal questioning during room stress.'
    }
  ];

  const activeData = trialDays.find((d) => d.day === activeDay) || trialDays[0];

  const handleActivate = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode.trim()) {
      setIsActivated(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            5-Day Trial Pass
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Free Service Trial
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            5-Day Educator Floor Trial Pass
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            Test 15-word co-regulation strategy cards directly in your room before committing to a service-wide subscription.
          </p>
        </section>

        {/* 5 Day Touch Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-bold text-sm">
          {trialDays.map((item) => (
            <button
              key={item.day}
              type="button"
              onClick={() => setActiveDay(item.day)}
              className={`p-3.5 rounded-2xl border-2 transition-all min-h-12 text-center flex flex-col items-center justify-center ${
                activeDay === item.day
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                activeDay === item.day ? 'text-[#C29F60]' : 'text-[#657B6C]'
              }`}>
                Day {item.day}
              </span>
              <span className="text-xs font-serif font-bold block truncate w-full">
                {item.focus}
              </span>
            </button>
          ))}
        </div>

        {/* Active Day Card */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-3">
            <span className="text-xs font-black uppercase text-[#C29F60]">
              Day {activeData.day} Focus: {activeData.subtitle}
            </span>
            <span className="text-xs font-bold text-[#1C3B34] bg-white px-3 py-1 rounded-full border border-[#E6E2DC]">
              {activeData.qip}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34]">
            {activeData.title}
          </h2>

          <div className="bg-white p-4 rounded-2xl border border-[#E6E2DC] space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#657B6C] block">
              15-Word Floor Action Prompt
            </span>
            <p className="text-sm font-medium leading-relaxed text-[#2B3833]">
              {activeData.prompt}
            </p>
          </div>
        </section>

        {/* Activation Code Form */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#657B6C] tracking-wider block mb-1">
              Trial Code Activation
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Activate Full 5-Day Floor Deck
            </h3>
            <p className="text-xs text-[#6A7873] mt-1">
              Enter your director trial code or work email to unlock printable PDFs and QIP reflection tools.
            </p>
          </div>

          {!isActivated ? (
            <form onSubmit={handleActivate} className="space-y-3">
              <input
                type="text"
                required
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter trial code or work email"
                className="w-full p-3.5 rounded-2xl border-2 border-[#E6E2DC] text-sm text-[#1C3B34] font-medium outline-none focus:border-[#657B6C] bg-[#FAF8F5]"
              />
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm min-h-12 flex items-center justify-center"
              >
                Activate 5-Day Floor Deck Pass
              </button>
            </form>
          ) : (
            <div className="p-4 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-2xl text-center space-y-2">
              <span className="text-xs font-black uppercase text-[#C29F60] block">
                Pass Active
              </span>
              <p className="text-sm font-bold text-[#1C3B34]">
                Your 5-Day Trial Pass is now active.
              </p>
              <Link
                href="/platform/educator"
                className="inline-flex py-3 px-6 bg-[#1C3B34] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 items-center justify-center shadow-sm"
              >
                Go to Educator Floor Deck
              </Link>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}