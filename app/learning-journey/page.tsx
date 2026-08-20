'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LearningJourneyPage() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const journeyStages = [
    {
      stage: 1,
      title: 'Stage 1: Adult Nervous System First',
      focus: 'Educator Self-Regulation',
      qip: 'QA 5.1.1',
      subtitle: 'Establishing Personal Calm Before Room Entry',
      summary: 'Educators must regulate their own nervous system before attempting to support dysregulated children on the floor.',
      comparison: {
        behavior: 'What We See: Clenched jaw, shallow breathing, rushing physical movements, and immediate verbal commands.',
        somaticShift: 'Somatic Shift: Unclench jaw, drop shoulders from ears, and take two slow nasal breaths in the staffroom.'
      },
      actions: [
        {
          title: '60-Second Staffroom Reset',
          prompt: 'Unclench jaw, rest tongue against roof of mouth, and drop shoulders before stepping onto the floor.',
          qip: 'QA 5.1.1 — Self-Regulation'
        },
        {
          title: 'Non-Verbal Partner Tag',
          prompt: 'Agree on a wrist-tap signal with co-educators to swap room positions when energy tanks drop.',
          qip: 'QA 4.1.1 — Team Co-Regulation'
        }
      ]
    },
    {
      stage: 2,
      title: 'Stage 2: Environmental Unburdening',
      focus: 'Sensory Load Reduction',
      qip: 'QA 3.1.2',
      subtitle: 'Removing Physical & Acoustic Room Triggers',
      summary: 'Identify and remove physical bottlenecks, visual clutter, and acoustic noise before group transition periods.',
      comparison: {
        behavior: 'What We See: Doorway crowding, overlapping background audio, and high visual density in main pathways.',
        somaticShift: 'Somatic Shift: Turn off background music, dim ceiling lights, and shift bag racks away from doorways.'
      },
      actions: [
        {
          title: 'Acoustic Load Cut-Off',
          prompt: 'Turn off background audio clutter and dim room lighting 5 minutes before transition times.',
          qip: 'QA 3.1.2 — Sensory Load'
        },
        {
          title: 'Spatial Bottleneck Clearing',
          prompt: 'Shift furniture and storage 2 metres away from doorway thresholds to unburden entry pathways.',
          qip: 'QA 3.1.2 — Space Setup'
        }
      ]
    },
    {
      stage: 3,
      title: 'Stage 3: Low-Arousal Co-Presence',
      focus: 'Co-Regulation Practice',
      qip: 'QA 5.1.1',
      subtitle: 'Grounding Heightened Child Arousal',
      summary: 'Adopt low-arousal physical postures, drop vocal pitch, and slash verbal demands when a child enters defense mode.',
      comparison: {
        behavior: 'What We See: Standing directly over the child, rapid questioning, and demanding immediate eye contact.',
        somaticShift: 'Somatic Shift: Drop to one knee at a 45-degree angle, lower eye height, and halt verbal questions.'
      },
      actions: [
        {
          title: 'Side-On Low-Arousal Stance',
          prompt: 'Drop eye height parallel to child at a 45-degree angle. Avoid face-to-face looming posture.',
          qip: 'QA 5.1.1 — Low-Arousal Posture'
        },
        {
          title: 'Somatic Water Reset',
          prompt: 'Offer a cool water sip or splash water on wrists without making spoken verbal demands.',
          qip: 'QA 2.1.1 — Health & Safety'
        }
      ]
    }
  ];

  const activeData = journeyStages.find((s) => s.stage === activeStage) || journeyStages[0];

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
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Learning Journey
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Guided Practice Pathway
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Co-Regulation Learning Journey
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            A 3-stage visual pathway moving from adult self-regulation to environmental setup and low-arousal co-presence.
          </p>
        </section>

        {/* 3 Stage Touch Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-bold text-sm">
          {journeyStages.map((item) => (
            <button
              key={item.stage}
              type="button"
              onClick={() => setActiveStage(item.stage)}
              className={`p-4 rounded-2xl border-2 transition-all min-h-12 text-left flex flex-col justify-between space-y-2 ${
                activeStage === item.stage
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                  activeStage === item.stage ? 'bg-[#C29F60] text-[#1C3B34]' : 'bg-[#FAF5EC] text-[#1C3B34]'
                }`}>
                  Stage {item.stage}
                </span>
                <span className={`text-[10px] font-bold ${activeStage === item.stage ? 'text-white/80' : 'text-[#657B6C]'}`}>
                  {item.qip}
                </span>
              </div>
              <span className="text-xs font-serif font-bold leading-snug block">
                {item.focus}
              </span>
            </button>
          ))}
        </div>

        {/* Stage Overview Banner */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-3">
            <span className="text-xs font-black uppercase text-[#C29F60]">
              Stage {activeData.stage}: {activeData.subtitle}
            </span>
            <span className="text-xs font-bold text-[#1C3B34] bg-white px-3 py-1 rounded-full border border-[#E6E2DC]">
              {activeData.focus}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34]">
            {activeData.title}
          </h2>

          <p className="text-sm md:text-base font-medium leading-relaxed text-[#2B3833]">
            {activeData.summary}
          </p>
        </section>

        {/* Visual Shift Comparison Box */}
        <section className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-[#657B6C]">
            Visual Practice Comparison
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-rose-900 uppercase block">
                High-Stress Demand
              </span>
              <p className="text-xs font-medium text-rose-800 leading-relaxed">
                {activeData.comparison.behavior}
              </p>
            </div>

            <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-2xl space-y-1">
              <span className="text-xs font-bold text-emerald-900 uppercase block">
                Co-Regulation Shift
              </span>
              <p className="text-xs font-medium text-emerald-800 leading-relaxed">
                {activeData.comparison.somaticShift}
              </p>
            </div>
          </div>
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

        {/* Print Resources */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#C29F60] block mb-1">
              Printable Resource
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Download Educator Routine Cards
            </h3>
            <p className="text-xs text-[#6A7873] mt-1">
              Print high-contrast strategy cards for morning arrivals, sensory resets, and room handovers.
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