'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EducatorConfidencePage() {
  const [activeFocus, setActiveFocus] = useState<'deescalation' | 'sensory' | 'handovers' | 'team'>('deescalation');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const confidenceData = {
    deescalation: {
      title: 'High-Arousal De-Escalation Confidence',
      qip: 'QA 5.1.1',
      subtitle: 'Calm Stance Under Room Pressure',
      description: 'Building educator confidence to remain regulated during acute child distress or physical dysregulation.',
      prompts: [
        {
          title: 'Side-On Low Arousal Stance',
          action: 'Drop to one knee at a 45-degree angle. Lower voice pitch and cease verbal questioning.',
          qip: 'QA 5.1.1 — Practice Stance'
        },
        {
          title: 'Zero-Demand Space Creation',
          action: 'Clear a 2-metre physical perimeter around the dysregulated child while keeping low visual profile.',
          qip: 'QA 2.1.1 — Safety & Wellbeing'
        }
      ]
    },
    sensory: {
      title: 'Sensory Environment Adjustments',
      qip: 'QA 3.1.2',
      subtitle: 'Proactive Room Environmental Audits',
      description: 'Confidence in identifying and removing auditory and spatial overload triggers before behaviors escalate.',
      prompts: [
        {
          title: 'Acoustic Load Reduction',
          action: 'Switch off background audio and dim overhead fluorescent lights 5 minutes before transitions.',
          qip: 'QA 3.1.2 — Sensory Environment'
        },
        {
          title: 'Proprioceptive Movement Outlets',
          action: 'Offer heavy cushion carrying or wall presses prior to expecting focused group gathering.',
          qip: 'QA 1.3.2 — Critical Reflection'
        }
      ]
    },
    handovers: {
      title: 'Family Arrival & Separation Support',
      qip: 'QA 6.1.1',
      subtitle: 'Threshold Relational Presence',
      description: 'Confidence in unburdening drop-off stress and guiding anxious parents through predictable routines.',
      prompts: [
        {
          title: '60-Second Digital Pause',
          action: 'Pause tablet entry when a family steps across the doorway threshold to offer warm eye height.',
          qip: 'QA 6.1.1 — Family Handovers'
        },
        {
          title: 'Predictable Separation Anchors',
          action: 'Guide child to a dedicated physical arrival station before taking parent handover details.',
          qip: 'QA 5.1.1 — Relational Continuity'
        }
      ]
    },
    team: {
      title: 'Team Co-Regulation & Swap Protocols',
      qip: 'QA 4.1.1',
      subtitle: 'Peer Energy Support',
      description: 'Confidence in signaling fatigue to colleagues and executing seamless floor position swaps without shame.',
      prompts: [
        {
          title: 'Non-Verbal Swap Gesture',
          action: 'Use an agreed double wrist-tap gesture to initiate an immediate room position swap with peer.',
          qip: 'QA 4.1.1 — Staffing Arrangements'
        },
        {
          title: '60-Second Staffroom Reset',
          action: 'Step into staffroom for two slow nasal breaths and shoulder drops prior to floor re-entry.',
          qip: 'QA 5.1.1 — Adult Regulation'
        }
      ]
    }
  };

  const activeData = confidenceData[activeFocus];

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
            Practice Building
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Educator Self-Assessment & Growth
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Educator Confidence Builder
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            Select a practice focus area to access 15-word action prompts that build room confidence and support QIP self-reflection.
          </p>
        </section>

        {/* Touch Switcher Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-bold text-sm">
          {[
            { id: 'deescalation', label: 'De-Escalation' },
            { id: 'sensory', label: 'Sensory Setup' },
            { id: 'handovers', label: 'Arrival Handovers' },
            { id: 'team', label: 'Team Co-Regulation' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFocus(tab.id as keyof typeof confidenceData)}
              className={`p-4 rounded-2xl border-2 transition-all min-h-12 text-left flex items-center justify-between ${
                activeFocus === tab.id
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <span className="text-xs font-bold">{tab.label}</span>
              {activeFocus === tab.id && <span className="text-[#C29F60] font-black">Active</span>}
            </button>
          ))}
        </div>

        {/* Active Focus Card */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-3">
            <span className="text-xs font-black uppercase text-[#C29F60]">
              Focus Area: {activeData.subtitle}
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

        {/* 15-Word Action Prompt Cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#1C3B34]">
            15-Word Floor Action Prompts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeData.prompts.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 hover:border-[#657B6C] transition-all flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-[#1C3B34]">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]">
                      {item.qip}
                    </span>
                  </div>

                  <p className="text-sm font-medium leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E2DC] text-[#2B3833]">
                    {item.action}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyText(item.action, idx)}
                  className="w-full py-3 px-4 bg-[#657B6C] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
                >
                  {copiedIndex === idx ? 'Copied Reflection Strategy' : 'Copy Strategy for Reflection Log'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Printable PDF CTA */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#C29F60] block mb-1">
              Printable Practice Cards
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Download Educator Strategy Cards
            </h3>
            <p className="text-xs text-[#6A7873] mt-1">
              Print pocket-sized action cards for instant reference during active room duty.
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