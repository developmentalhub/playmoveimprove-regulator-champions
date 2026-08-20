'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function PlaybooksPage() {
  const [activeCategory, setActiveCategory] = useState<'arrivals' | 'transitions' | 'handovers' | 'prep'>('arrivals');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const playbooks = {
    arrivals: [
      {
        title: 'Morning Doorway Anchor',
        timing: '7:00 AM - 9:00 AM',
        action: 'Lower eye height parallel to doorway. Greet child by name before requesting sign-in details from families.',
        qip: 'QA 6.1.1 — Supportive Handovers',
        pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf'
      },
      {
        title: 'Non-Digital Handover Pause',
        timing: 'Arrival Routine',
        action: 'Pause tablet or digital message logging for 60 seconds when a family steps into the room entry threshold.',
        qip: 'QA 5.1.1 — Relational Presence',
        pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf'
      }
    ],
    transitions: [
      {
        title: 'Acoustic Load Reduction',
        timing: 'Pre-Group Time',
        action: 'Eliminate background music and turn off ceiling row lights 5 minutes prior to gathering children.',
        qip: 'QA 3.1.2 — Environmental Setup',
        pdfUrl: '/pdf/Calm-Posters.pdf'
      },
      {
        title: 'Proprioceptive Heavy Work Carry',
        timing: 'High-Demand Transitions',
        action: 'Offer heavy laundry baskets, water jugs, or floor cushions for carrying before expecting seated attention.',
        qip: 'QA 1.3.2 — Critical Reflection',
        pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf'
      }
    ],
    handovers: [
      {
        title: 'Non-Verbal Co-Educator Tag Signal',
        timing: 'Room Peak Stress',
        action: 'Use agreed wrist-tap or double-nod signal to switch room positions when personal capacity tank hits 30%.',
        qip: 'QA 4.1.1 — Staff Co-Regulation',
        pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf'
      },
      {
        title: 'Zero-Demand Separation Space',
        timing: 'Distressed Separation',
        action: 'Guide child to a quiet, low-sensory nook with cool water or soft texture without lengthy verbal explanations.',
        qip: 'QA 2.1.1 — Emotional Safety',
        pdfUrl: '/pdf/Calm-Posters.pdf'
      }
    ],
    prep: [
      {
        title: '60-Second Staffroom Somatic Pause',
        timing: 'Prior to Room Entry',
        action: 'Unclench jaw, drop shoulders from ears, and take two slow nasal breaths before stepping onto the room floor.',
        qip: 'QA 5.1.1 — Adult Self-Regulation',
        pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf'
      },
      {
        title: 'Room Entry Spatial Audit',
        timing: 'Shift Start',
        action: 'Check doorway movement bottleneck. Shift bag trolleys and clutter away from main traffic pathways.',
        qip: 'QA 3.1.2 — Spatial Unburdening',
        pdfUrl: '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf'
      }
    ]
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
            Routine Playbooks
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Practical Floor Prompts
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Morning Routine Action Playbooks
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            15-word room strategies for arrivals, transitions, and educator preparation. Designed for immediate floor implementation.
          </p>
        </section>

        {/* Playbook Category Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-bold text-sm">
          {[
            { id: 'arrivals', label: '🚪 Arrivals' },
            { id: 'transitions', label: '🔄 Transitions' },
            { id: 'handovers', label: '🤝 Handovers' },
            { id: 'prep', label: '🧘 Educator Prep' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as keyof typeof playbooks)}
              className={`py-3.5 px-4 rounded-2xl border-2 transition-all min-h-12 flex items-center justify-center ${
                activeCategory === tab.id
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Playbook Action Cards */}
        <div className="space-y-4">
          {playbooks[activeCategory].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 hover:border-[#657B6C] transition-all"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#FAF8F5] pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#C29F60] block">
                    {item.timing}
                  </span>
                  <h2 className="text-xl font-serif font-bold text-[#1C3B34]">
                    {item.title}
                  </h2>
                </div>

                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]">
                  {item.qip}
                </span>
              </div>

              <p className="text-sm md:text-base font-medium leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E2DC] text-[#2B3833]">
                {item.action}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => handleCopyText(item.action, idx)}
                  className="flex-1 py-3 px-4 bg-[#657B6C] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
                >
                  {copiedIndex === idx ? '✓ Copied Action Strategy' : '📋 Copy Prompt Text'}
                </button>

                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-[#C29F60] text-[#1C3B34] font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
                >
                  🖨️ Print PDF Card
                </a>
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}