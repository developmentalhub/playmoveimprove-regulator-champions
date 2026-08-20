'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EmotionalRegulationPage() {
  const [activeZone, setActiveZone] = useState<'red' | 'yellow' | 'green'>('red');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const zonesData = {
    red: {
      zone: 'High Arousal / Defense Mode',
      color: 'bg-rose-100 border-rose-300 text-rose-900',
      tagColor: 'bg-rose-500 text-white',
      subtitle: 'Safe Brain Protection',
      description: 'The child experiencing fight, flight, or freeze cannot process logic, questioning, or consequences.',
      actions: [
        {
          title: 'Halt Verbal Interrogation',
          prompt: 'Stop asking "Why did you do that?" Drop physical height and drop vocal pitch immediately.',
          qip: 'QA 5.1.1 — Co-Regulation'
        },
        {
          title: 'Provide Somatic Grounding Water Reset',
          prompt: 'Offer a cold water sip or splash cool water on wrists without making verbal demands.',
          qip: 'QA 2.1.1 — Health & Wellbeing'
        }
      ]
    },
    yellow: {
      zone: 'Rising Tension / Sensory Overload',
      color: 'bg-amber-100 border-amber-300 text-amber-900',
      tagColor: 'bg-amber-500 text-white',
      subtitle: 'Early Signal Interception',
      description: 'Clenched jaw, shallow breathing, or rapid pacing signals that sensory capacity is dropping fast.',
      actions: [
        {
          title: 'Proprioceptive Heavy Work Carry',
          prompt: 'Hand the child a weighted cushion or heavy water jug to carry across the room.',
          qip: 'QA 1.3.2 — Critical Reflection'
        },
        {
          title: 'Acoustic Load Reduction',
          prompt: 'Turn off background audio clutter and dim room lighting before transition periods.',
          qip: 'QA 3.1.2 — Space Setup'
        }
      ]
    },
    green: {
      zone: 'Calm & Connected / Learning Ready',
      color: 'bg-emerald-100 border-emerald-300 text-emerald-900',
      tagColor: 'bg-emerald-600 text-white',
      subtitle: 'Relational Safety & Practice',
      description: 'The nervous system is steady, social engagement is active, and learning capacity is wide open.',
      actions: [
        {
          title: 'Connect & Validate First',
          prompt: 'Acknowledge feelings warmly before offering choices or transition directions.',
          qip: 'QA 5.1.1 — Relationships'
        },
        {
          title: 'Practice Somatic Anchors',
          prompt: 'Guide children through 3-second nasal breathing or wall presses while calm.',
          qip: 'QA 1.1.1 — Curriculum Design'
        }
      ]
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Room Cheat Sheet
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Floor Response Matrix
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Emotional Regulation Room Cheat Sheet
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            A 3-zone visual guide to adult micro-actions when children move between calm, rising stress, and high arousal.
          </p>
        </section>

        {/* 3-Zone Touch Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-bold text-sm">
          {[
            { id: 'red', label: 'High Arousal (Red Zone)' },
            { id: 'yellow', label: 'Rising Tension (Yellow Zone)' },
            { id: 'green', label: 'Calm & Steady (Green Zone)' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveZone(tab.id as keyof typeof zonesData)}
              className={`p-4 rounded-2xl border-2 transition-all min-h-12 text-left flex items-center justify-between ${
                activeZone === tab.id
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <span>{tab.label}</span>
              {activeZone === tab.id && <span className="text-[#C29F60]">Active</span>}
            </button>
          ))}
        </div>

        {/* Dynamic Zone Banner */}
        <section className={`p-6 md:p-8 rounded-3xl border-2 space-y-3 ${zonesData[activeZone].color}`}>
          <div className="flex justify-between items-center border-b border-black/10 pb-3">
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${zonesData[activeZone].tagColor}`}>
              {zonesData[activeZone].subtitle}
            </span>
            <span className="text-xs font-bold uppercase tracking-wider">
              {zonesData[activeZone].zone}
            </span>
          </div>

          <p className="text-sm md:text-base font-medium leading-relaxed">
            {zonesData[activeZone].description}
          </p>
        </section>

        {/* 15-Word Action Cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#1C3B34]">
            15-Word Educator Floor Actions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {zonesData[activeZone].actions.map((act, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 hover:border-[#657B6C] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-[#1C3B34]">
                      {act.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]">
                      {act.qip}
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E2DC] text-[#2B3833]">
                    {act.prompt}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyText(act.prompt, idx)}
                  className="w-full py-3 px-4 bg-[#657B6C] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
                >
                  {copiedIndex === idx ? 'Copied Strategy' : 'Copy Prompt for Room Log'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PDF Download Banner */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#C29F60] block mb-1">
              Printable Resource
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Download Printable CALM Zone Strategy Cards
            </h3>
            <p className="text-xs text-[#6A7873] mt-1">
              Print high-contrast strategy cards to keep in your pocket or mount on room walls.
            </p>
          </div>

          <a
            href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#1C3B34] text-white text-center font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm min-h-12 flex items-center justify-center"
          >
            Open & Print Educator Strategy Cards (PDF)
          </a>
        </section>

      </main>
    </div>
  );
}