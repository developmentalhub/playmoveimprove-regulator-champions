'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EducatorToolPage() {
  const [activeMoment, setActiveMoment] = useState<'arrival' | 'transition' | 'arousal' | 'handover'>('arrival');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const floorMoments = {
    arrival: {
      title: 'Morning Arrival & Separation Threshold',
      subtitle: 'Unburdening Room Entry Stress',
      qip: 'QA 6.1.1',
      description: 'Establish quiet physical anchors at room entry thresholds to support children and families during drop-off handovers.',
      actions: [
        {
          title: 'Doorway Height Alignment',
          prompt: 'Drop eye height parallel to doorway entry before speaking or requesting check-in information.',
          qip: 'QA 6.1.1 — Supportive Handovers'
        },
        {
          title: '60-Second Digital Pause',
          prompt: 'Pause tablet logging when families step into the room entry threshold to offer direct presence.',
          qip: 'QA 5.1.1 — Relational Presence'
        }
      ]
    },
    transition: {
      title: 'Room Transition & Acoustic Setup',
      subtitle: 'Environmental Sensory Load',
      qip: 'QA 3.1.2',
      description: 'Dampen environmental noise and spatial bottlenecks before gathering children for group routines.',
      actions: [
        {
          title: 'Acoustic Load Reduction',
          prompt: 'Turn off background audio clutter and dim ceiling lights 5 minutes prior to group times.',
          qip: 'QA 3.1.2 — Sensory Load'
        },
        {
          title: 'Proprioceptive Heavy Carry',
          prompt: 'Provide weighted cushions or heavy water jugs to carry before expecting seated attention.',
          qip: 'QA 1.3.2 — Critical Reflection'
        }
      ]
    },
    arousal: {
      title: 'High Arousal & De-Escalation Response',
      subtitle: 'Safe Brain Protection',
      qip: 'QA 5.1.1',
      description: 'Adopt low-arousal postures, drop vocal pitch, and slash verbal demands during heightened emotional stress.',
      actions: [
        {
          title: 'Side-On Low-Arousal Stance',
          prompt: 'Drop to one knee at a 45-degree angle. Avoid direct face-to-face looming and halt verbal questions.',
          qip: 'QA 5.1.1 — Low-Arousal Posture'
        },
        {
          title: 'Somatic Water Reset',
          prompt: 'Offer a cool water sip or splash water on wrists without making spoken verbal demands.',
          qip: 'QA 2.1.1 — Health & Wellbeing'
        }
      ]
    },
    handover: {
      title: 'Team Position Swap & Shift Rest',
      subtitle: 'Staff Co-Regulation',
      qip: 'QA 4.1.1',
      description: 'Use agreed non-verbal team signals to swap room positions when individual regulation capacity drops.',
      actions: [
        {
          title: 'Double-Tap Swap Signal',
          prompt: 'Use an agreed wrist-tap or double-nod signal to swap room positions with a co-educator.',
          qip: 'QA 4.1.1 — Staff Arrangements'
        },
        {
          title: '60-Second Staffroom Reset',
          prompt: 'Unclench jaw, drop shoulders from ears, and take two slow nasal breaths before room re-entry.',
          qip: 'QA 5.1.1 — Adult Self-Regulation'
        }
      ]
    }
  };

  const activeData = floorMoments[activeMoment];

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/platform/educator"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Educator Floor Deck
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Floor Tool
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Fast Floor Reference
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Educator Shift Strategy Selector
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            Select your current shift moment for instant 15-word floor action prompts and QIP compliance alignment.
          </p>
        </section>

        {/* 4 Touch Switcher Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-bold text-sm">
          {[
            { id: 'arrival', label: 'Morning Arrival' },
            { id: 'transition', label: 'Room Transition' },
            { id: 'arousal', label: 'High Arousal' },
            { id: 'handover', label: 'Team Handover' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveMoment(tab.id as keyof typeof floorMoments)}
              className={`p-4 rounded-2xl border-2 transition-all min-h-12 text-left flex items-center justify-between ${
                activeMoment === tab.id
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <span className="text-xs font-bold">{tab.label}</span>
              {activeMoment === tab.id && <span className="text-[#C29F60] font-black">Active</span>}
            </button>
          ))}
        </div>

        {/* Active Shift Moment Banner */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-3">
            <span className="text-xs font-black uppercase text-[#C29F60]">
              Shift Focus: {activeData.subtitle}
            </span>
            <span className="text-xs font-bold text-[#1C3B34] bg-white px-3 py-1 rounded-full border border-[#E6E2DC]">
              {activeData.qip}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34]">
            {activeData.title}
          </h2>

          <p className="text-sm md:text-base font-medium leading-relaxed text-[#2B3833]">
            {activeData.description}
          </p>
        </section>

        {/* Action Prompt Cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#1C3B34]">
            15-Word Floor Action Prompts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeData.actions.map((act, idx) => (
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
                  {copiedIndex === idx ? 'Copied Floor Strategy' : 'Copy Prompt for Room Log'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Printable PDF Cards */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#C29F60] block mb-1">
              Printable Floor Resource
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Download Pocket Strategy Cards
            </h3>
            <p className="text-xs text-[#6A7873] mt-1">
              Print high-contrast strategy cards for shift handovers, morning drop-offs, and room resets.
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