'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NqsMappingPage() {
  const [selectedQa, setSelectedQa] = useState<'qa1' | 'qa3' | 'qa4' | 'qa5' | 'qa6'>('qa1');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const nqsMappingData = {
    qa1: {
      qa: 'Quality Area 1',
      title: 'Educational Program and Practice',
      element: 'Element 1.3.2 — Critical Reflection',
      description: 'Critical reflection on pedagogy is embedded in daily floor practice and room environmental setups.',
      evidence: 'Educators log daily room sensory load and transition friction points during non-contact planning time. Analysis revealed morning doorway clutter as a dysregulation trigger; team shifted bag storage and introduced quiet sensory anchors prior to group routines.',
      actionItems: [
        'Document room load factors on floor reflection cards.',
        'Review acoustic clutter during transition periods.',
        'Track practice modifications in weekly room log.'
      ]
    },
    qa3: {
      qa: 'Quality Area 3',
      title: 'Physical Environment',
      element: 'Element 3.1.2 — Environmental Setup',
      description: 'Physical environment design actively unburdens spatial bottlenecks and supports emotional safety.',
      evidence: 'Room audits identified high movement density near toddler doorway entrances during morning drop-offs. Leadership unburdened entry pathways by establishing dedicated proprioceptive heavy work stations and relocating storage.',
      actionItems: [
        'Audit room entryways for physical movement bottlenecks.',
        'Relocate high-density equipment away from door thresholds.',
        'Establish quiet recovery nooks with low visual noise.'
      ]
    },
    qa4: {
      qa: 'Quality Area 4',
      title: 'Staffing Arrangements',
      element: 'Element 4.1.1 — Organization of Staff',
      description: 'Staffing arrangements support educator self-regulation and non-verbal team coordination.',
      evidence: 'Co-educators established non-verbal tag-team signals to swap room positions or request floater support when adult regulation capacity drops below 30%, maintaining room safety and adult calm.',
      actionItems: [
        'Agree on non-verbal team handover signals.',
        'Schedule 15-minute roster overlaps during peak transitions.',
        'Use staffroom somatic check-ins before room entry.'
      ]
    },
    qa5: {
      qa: 'Quality Area 5',
      title: 'Relationships with Children',
      element: 'Element 5.1.1 — Positive Relationships',
      description: 'Educators adopt low-arousal physical postures and trauma-informed co-regulation responses.',
      evidence: 'Team members lower physical height, drop vocal pitch, and minimize verbal demands when children enter Safe Brain defense mode. standardized Somatic Water Resets (Card 4) support down-regulation without shame.',
      actionItems: [
        'Adopt side-on, low-arousal physical postures.',
        'Reduce directions to 3 words or fewer during stress.',
        'Provide cool water or heavy work resets without demands.'
      ]
    },
    qa6: {
      qa: 'Quality Area 6',
      title: 'Collaborative Partnerships',
      element: 'Element 6.1.1 — Supportive Partnerships',
      description: 'Respectful, consistent communication supports smooth arrival and drop-off transitions.',
      evidence: 'Service leadership distributes targeted Parent Bridge Guides based on Ladder 1 principles, providing families with non-digital morning routine strategies to create drop-off continuity between home and centre.',
      actionItems: [
        'Share weekly parent newsletter blurb cards.',
        'Align home and room drop-off transition cues.',
        'Offer non-digital morning anchor guides to families.'
      ]
    }
  };

  const activeData = nqsMappingData[selectedQa];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20 print:bg-white print:pb-0">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/platform/manager"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            ← Back to Manager Dashboard
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            NQS Compliance Matrix
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8 print:p-0">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:bg-white print:text-black print:border-b-2 print:border-black print:rounded-none">
          <div>
            <span className="bg-[#C29F60] text-[#1C3B34] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block print:hidden">
              Assessment & Rating Tool
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white mt-2 print:text-black">
              NQS & QIP Reflection Matrix
            </h1>
            <p className="text-sm text-white/90 font-light mt-1 print:text-gray-600">
              Map floor co-regulation practices directly to National Quality Standard elements.
            </p>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="py-3 px-5 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl text-xs hover:bg-opacity-90 transition-all shadow-sm min-h-12 flex items-center gap-2 print:hidden"
          >
            <span>🖨️</span> Print Matrix Report
          </button>
        </section>

        {/* Quality Area Touch Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-bold text-xs print:hidden">
          {[
            { id: 'qa1', label: 'QA 1: Practice' },
            { id: 'qa3', label: 'QA 3: Environment' },
            { id: 'qa4', label: 'QA 4: Staffing' },
            { id: 'qa5', label: 'QA 5: Relationships' },
            { id: 'qa6', label: 'QA 6: Families' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedQa(tab.id as keyof typeof nqsMappingData)}
              className={`py-3.5 px-3 rounded-2xl border-2 transition-all min-h-12 text-center ${
                selectedQa === tab.id
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Quality Area Compliance Block */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-6 print:border-none print:shadow-none">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b-2 border-[#FAF8F5] pb-4">
            <div>
              <span className="text-xs font-black uppercase text-[#C29F60] tracking-wider block">
                {activeData.qa} • {activeData.element}
              </span>
              <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34]">
                {activeData.title}
              </h2>
            </div>

            <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34]">
              Compliance Aligned
            </span>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-[#1C3B34] uppercase tracking-wider">
              NQS Element Focus
            </h3>
            <p className="text-sm md:text-base font-medium leading-relaxed text-[#2B3833]">
              {activeData.description}
            </p>
          </div>

          {/* Formatted QIP Evidence Slip */}
          <div className="p-6 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-2xl space-y-3">
            <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-2">
              <span className="text-xs font-black uppercase text-[#C29F60]">
                QIP Evidence Text Block
              </span>
              <span className="text-xs font-bold text-[#1C3B34]">Ready for Copying</span>
            </div>

            <p className="text-sm font-mono leading-relaxed text-[#2B3833] bg-white p-4 rounded-xl border border-[#E6E2DC]">
              {activeData.evidence}
            </p>

            <button
              type="button"
              onClick={() => copyToClipboard(activeData.evidence, 'nqs')}
              className="w-full py-3.5 px-4 bg-[#C29F60] text-[#1C3B34] font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all shadow-sm min-h-12 flex items-center justify-center print:hidden"
            >
              {copiedKey === 'nqs' ? '✓ Copied QIP Evidence Text' : '📋 Copy Text for QIP Self-Assessment'}
            </button>
          </div>

          {/* Floor Action Checkpoints */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-[#1C3B34] uppercase tracking-wider">
              Key Floor Practice Indicators
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeData.actionItems.map((item, idx) => (
                <div key={idx} className="p-4 bg-[#FAF8F5] border-2 border-[#E6E2DC] rounded-2xl text-xs font-bold text-[#1C3B34] flex items-start gap-2">
                  <span className="text-[#657B6C]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}