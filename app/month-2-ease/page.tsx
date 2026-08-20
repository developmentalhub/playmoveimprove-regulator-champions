'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Month2EasePage() {
  const [activeLetter, setActiveLetter] = useState<'E1' | 'A' | 'S' | 'E2'>('E1');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const easeFramework = {
    E1: {
      letter: 'E',
      title: 'Environmental Load Reduction',
      subtitle: 'Spatial & Acoustic Unburdening',
      description: 'Spotting spatial bottlenecks, visual clutter, and acoustic resonance during peak room stress before dysregulation spreads across the room.',
      actions: [
        {
          title: 'Acoustic Dampening Switch',
          prompt: 'Turn off background audio clutter and dim main ceiling lights immediately when room volume spikes.',
          qip: 'QA 3.1.2 — Physical Environment'
        },
        {
          title: 'Spatial Bottleneck Clearing',
          prompt: 'Shift bag trolleys and art drying racks away from doorway thresholds to unburden entry bottlenecks.',
          qip: 'QA 3.1.2 — Space Design'
        }
      ]
    },
    A: {
      letter: 'A',
      title: 'Adult Regulation & Co-Presence',
      subtitle: 'Low-Arousal Posture & Pitch',
      description: 'Adopting a side-on stance, lowering eye height, and slashing verbal demands when a child enters defense mode.',
      actions: [
        {
          title: 'Side-On Low-Arousal Stance',
          prompt: 'Drop to one knee at a 45-degree angle. Avoid direct face-to-face looming and pause verbal questioning.',
          qip: 'QA 5.1.1 — Positive Relationships'
        },
        {
          title: 'Vocal Pitch & Pace Reset',
          prompt: 'Drop vocal pitch by an octave and reduce directions to 3 words or fewer during heightened arousal.',
          qip: 'QA 5.1.1 — Co-Regulation Practice'
        }
      ]
    },
    S: {
      letter: 'S',
      title: 'Sensory & Movement Outlets',
      subtitle: 'Proactive Proprioceptive Anchors',
      description: 'Implementing proactive proprioceptive heavy work and deep-pressure anchors before emotional arousal reaches threshold.',
      actions: [
        {
          title: 'Heavy Work Carrying Station',
          prompt: 'Offer weighted cushions, water jugs, or heavy crates to carry before transitions to ground motor energy.',
          qip: 'QA 1.3.2 — Critical Reflection'
        },
        {
          title: 'Joint Compression & Push Anchors',
          prompt: 'Guide child to perform wall presses or palm squeezes for deep proprioceptive input during waiting periods.',
          qip: 'QA 1.3.2 — Sensory Support'
        }
      ]
    },
    E2: {
      letter: 'E',
      title: 'Escalation Recovery & Safety',
      subtitle: 'Zero-Demand Restorative Zones',
      description: 'Protecting dignity during de-escalation, creating low-demand recovery zones, and restoring room safety without punishment.',
      actions: [
        {
          title: 'Zero-Demand Nook Guide',
          prompt: 'Offer cool water sips or wrist splashes in a quiet corner with zero spoken demands until heart rate drops.',
          qip: 'QA 2.1.1 — Health & Safety'
        },
        {
          title: 'Post-Escalation Dignity Shield',
          prompt: 'Protect child privacy by shifting peer attention to another activity rather than creating a public audience.',
          qip: 'QA 5.1.2 — Dignity & Rights'
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
            href="/platform/educator"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            ← Back to Floor Deck
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Ladder 2 Framework
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            De-Escalation & High-Demand Moments
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            E.A.S.E. Model Action Guide
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            A 4-part somatic framework to reduce environmental overload, adopt low-arousal postures, and protect child dignity during room stress.
          </p>
        </section>

        {/* EASE Acronym Touch Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-bold text-sm">
          {[
            { id: 'E1', letter: 'E', label: 'Environment' },
            { id: 'A', letter: 'A', label: 'Adult Stance' },
            { id: 'S', letter: 'S', label: 'Sensory Outlets' },
            { id: 'E2', letter: 'E', label: 'Escalation Rest' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveLetter(item.id as keyof typeof easeFramework)}
              className={`p-4 rounded-2xl border-2 transition-all min-h-12 text-left flex items-center gap-3 ${
                activeLetter === item.id
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <span className={`w-8 h-8 rounded-xl font-serif font-bold flex items-center justify-center text-base ${
                activeLetter === item.id ? 'bg-[#C29F60] text-[#1C3B34]' : 'bg-[#FAF8F5] text-[#1C3B34]'
              }`}>
                {item.letter}
              </span>
              <span className="text-xs font-bold">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Active Letter Detail Banner */}
        <div className="p-6 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-3xl space-y-3">
          <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
              E.A.S.E. Pillar: {easeFramework[activeLetter].letter}
            </span>
            <span className="text-xs font-bold text-[#1C3B34] bg-white px-3 py-1 rounded-full border border-[#E6E2DC]">
              {easeFramework[activeLetter].subtitle}
            </span>
          </div>

          <h2 className="text-xl font-serif font-bold text-[#1C3B34]">
            {easeFramework[activeLetter].title}
          </h2>

          <p className="text-sm font-medium leading-relaxed text-[#2B3833]">
            {easeFramework[activeLetter].description}
          </p>
        </div>

        {/* Floor Action Strategies */}
        <div className="space-y-4">
          <h3 className="text-lg font-serif font-bold text-[#1C3B34]">
            15-Word Floor Action Prompts
          </h3>

          {easeFramework[activeLetter].actions.map((act, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 hover:border-[#657B6C] transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#FAF8F5] pb-3">
                <h4 className="text-base font-bold text-[#1C3B34]">
                  {act.title}
                </h4>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#F1F4F2] text-[#657B6C]">
                  {act.qip}
                </span>
              </div>

              <p className="text-sm md:text-base font-medium leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E2DC] text-[#2B3833]">
                {act.prompt}
              </p>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyText(act.prompt, idx)}
                  className="w-full py-3 px-4 bg-[#657B6C] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
                >
                  {copiedIndex === idx ? '✓ Copied Action Strategy' : '📋 Copy Prompt for Room Log'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* PDF Print Banner */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#C29F60] block mb-1">
              Printable Floor Tool
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Download CALM Framework Room Posters
            </h3>
            <p className="text-xs text-[#6A7873] mt-1">
              Print high-resolution A3 room posters covering E.A.S.E. de-escalation strategies.
            </p>
          </div>

          <a
            href="/pdf/Calm-Posters.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-3.5 px-4 bg-[#1C3B34] text-white text-center font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm"
          >
            🖨️ Open & Print CALM Room Posters (PDF)
          </a>
        </section>

      </main>
    </div>
  );
}