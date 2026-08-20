'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EducatorCapacityBuildingPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const capacitySteps = [
    {
      step: 1,
      title: 'Roster Stress & Fatigue Audit',
      focus: 'Staffing Arrangements',
      qip: 'QA 4.1.1',
      subtitle: 'Identifying Room High-Load Windows',
      description: 'Map high-stress transition windows across room rosters to ensure overlap during peak arrival and handover times.',
      actions: [
        {
          title: 'Identify Peak Friction Hours',
          prompt: 'Review morning arrival logs to schedule 15-minute overlap shifts during highest movement times.',
          qip: 'QA 4.1.1 — Roster Planning'
        },
        {
          title: 'Floater Relay Assignment',
          prompt: 'Designate float staff to step into room doorways for 5 minutes during room transition shifts.',
          qip: 'QA 4.1.1 — Team Coordination'
        }
      ]
    },
    {
      step: 2,
      title: 'Acoustic & Spatial Unburdening',
      focus: 'Physical Environment',
      qip: 'QA 3.1.2',
      subtitle: 'Reducing Environmental Demand',
      description: 'Remove environmental load factors that deplete educator physical and mental capacity before shift ends.',
      actions: [
        {
          title: 'Doorway Bottleneck Audit',
          prompt: 'Relocate bag racks and furniture 2 metres away from room doorways to eliminate entry congestion.',
          qip: 'QA 3.1.2 — Spatial Unburdening'
        },
        {
          title: 'Auditory Load Cut-Off',
          prompt: 'Establish quiet background music rules and dim overhead lighting during peak transition times.',
          qip: 'QA 3.1.2 — Sensory Load'
        }
      ]
    },
    {
      step: 3,
      title: 'Non-Verbal Tag-Team Protocols',
      focus: 'Relational Safety',
      qip: 'QA 5.1.1',
      subtitle: 'Peer Co-Regulation Signals',
      description: 'Establish clear, silent team signals that allow educators to swap floor positions when capacity drops.',
      actions: [
        {
          title: 'Double-Tap Swap Signal',
          prompt: 'Use an agreed double-tap gesture to request immediate room position swap with a colleague.',
          qip: 'QA 5.1.1 — Team Co-Regulation'
        },
        {
          title: 'Low-Capacity Protocol',
          prompt: 'Pledge team support without requiring lengthy verbal explanations when an educator calls a pause.',
          qip: 'QA 4.1.1 — Supportive Culture'
        }
      ]
    },
    {
      step: 4,
      title: 'Staffroom Somatic Reset Routine',
      focus: 'Adult Self-Regulation',
      qip: 'QA 5.1.1',
      subtitle: 'Pre-Shift Nervous System Pause',
      description: 'Embed 60-second physical resets into staffroom routines before educators step back onto the floor.',
      actions: [
        {
          title: '60-Second Physical Pause',
          prompt: 'Unclench jaw, drop shoulders, and take two slow nasal breaths before entering active room space.',
          qip: 'QA 5.1.1 — Adult Regulation'
        },
        {
          title: 'Sensory Anchor Station',
          prompt: 'Provide a warm drink, natural light, or cool water reset station in the staffroom area.',
          qip: 'QA 2.1.1 — Educator Wellbeing'
        }
      ]
    }
  ];

  const activeData = capacitySteps.find((s) => s.step === activeStep) || capacitySteps[0];

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
            Leadership Guide
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Director & Manager Guide
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Educator Capacity & Energy Unburdening
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            A 4-step practical framework for service leaders to reduce staff fatigue, unburden room environments, and support adult self-regulation.
          </p>
        </section>

        {/* 4 Step Touch Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 font-bold text-sm">
          {capacitySteps.map((item) => (
            <button
              key={item.step}
              onClick={() => setActiveStep(item.step)}
              className={`p-4 rounded-2xl border-2 transition-all min-h-12 text-left flex flex-col justify-between space-y-2 ${
                activeStep === item.step
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <div className="flex justify-between items-center w-full">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                  activeStep === item.step ? 'bg-[#C29F60] text-[#1C3B34]' : 'bg-[#FAF5EC] text-[#1C3B34]'
                }`}>
                  Step {item.step}
                </span>
                <span className={`text-[10px] font-bold ${activeStep === item.step ? 'text-white/80' : 'text-[#657B6C]'}`}>
                  {item.qip}
                </span>
              </div>
              <span className="text-xs font-serif font-bold leading-snug block">
                {item.title}
              </span>
            </button>
          ))}
        </div>

        {/* Dynamic Step Detail Card */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-3">
            <span className="text-xs font-black uppercase text-[#C29F60]">
              Step {activeData.step} Focus: {activeData.subtitle}
            </span>
            <span className="text-xs font-bold text-[#1C3B34] bg-white px-3 py-1 rounded-full border border-[#E6E2DC]">
              {activeData.focus}
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34]">
            {activeData.title}
          </h2>

          <p className="text-sm md:text-base font-medium leading-relaxed text-[#2B3833]">
            {activeData.description}
          </p>
        </section>

        {/* Action Cards */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#1C3B34]">
            15-Word Implementation Actions
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
                  {copiedIndex === idx ? 'Copied Implementation Action' : 'Copy Action for QIP Log'}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Print Banner */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div>
            <span className="text-xs font-black uppercase text-[#C29F60] block mb-1">
              Manager Strategy Cards
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Download Manager Coaching Cards
            </h3>
            <p className="text-xs text-[#6A7873] mt-1">
              Print high-contrast leadership coaching cards for your next staff meeting or 1-on-1 supervision session.
            </p>
          </div>

          <a
            href="/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3.5 px-4 bg-[#1C3B34] text-white text-center font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm min-h-12 flex items-center justify-center"
          >
            Open & Print Manager Coaching Cards (PDF)
          </a>
        </section>

      </main>
    </div>
  );
}