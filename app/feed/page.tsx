'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'resets' | 'qip' | 'reflections'>('all');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const authorCredentials = {
    name: 'Co-Regulation Practice Framework',
    lead: 'Trauma-Informed ECEC Practice & Somatic Regulation Standards',
    qualifications: 'Designed by Early Childhood Specialists, Neuroscience Researchers & Regulatory Compliance Advisors',
    accreditation: 'Aligned with NQS Quality Areas 1, 2, 3, 4, 5, 6 & 7'
  };

  const feedItems = [
    {
      id: 1,
      category: 'resets',
      room: 'Toddler Room A',
      timestamp: '15 mins ago',
      author: 'Senior Educator & Room Leader',
      title: 'Acoustic Load Reduction & Transition Flow',
      action: 'Dampened audio noise and dimmed main overhead fluorescent lighting 5 minutes prior to gathering time. Observed significant reduction in peer crowding and spatial dysregulation at the door.',
      reflection: 'Educator reflection: Stopping auditory overload before asking toddlers to transition eliminated the usual drop-off bottleneck.',
      qip: 'QA 3.1.2 — Outdoor & Indoor Spaces',
      element: 'NQS Element 3.1.2 — Space design supports active engagement and quiet moments.'
    },
    {
      id: 2,
      category: 'qip',
      room: 'Pre-Kindy Space',
      timestamp: '1 hour ago',
      author: 'Early Childhood Teacher (ECT)',
      title: 'Doorway Arrival Threshold Anchor',
      action: 'Lowered physical posture parallel to entry threshold and paused tablet logging during family drop-offs. Offered a 60-second non-digital physical connection anchor to an anxious arriving child.',
      reflection: 'Educator reflection: Pausing tech inputs at the doorway reassured the parent and lowered the child arousal level within 90 seconds.',
      qip: 'QA 6.1.1 — Engagement with the Service',
      element: 'NQS Element 6.1.1 — Families are supported from enrollment through daily handovers.'
    },
    {
      id: 3,
      category: 'resets',
      room: 'Nursery Room',
      timestamp: '3 hours ago',
      author: 'Diploma Educator',
      title: 'Somatic Water Reset Intervention',
      action: 'Offered cool water sip to dysregulated child with low-arousal posture and zero verbal interrogation. Positioned body at a 45-degree side angle to preserve relational safety.',
      reflection: 'Educator reflection: Dropping verbal demands allowed the child nervous system to drop out of high-arousal defense mode naturally.',
      qip: 'QA 2.1.1 — Wellbeing & Comfort',
      element: 'NQS Element 2.1.1 — Each childs wellbeing and comfort is provided for in daily routines.'
    },
    {
      id: 4,
      category: 'reflections',
      room: 'Kindy Room B',
      timestamp: 'Yesterday',
      author: 'Educational Leader',
      title: 'Proprioceptive Heavy Work Station Setup',
      action: 'Guided children through heavy cushion carrying and wall presses before group storytime to ground nervous systems after outdoor play.',
      reflection: 'Educator reflection: Proprioceptive movement gave children the physical input they needed to sit comfortably without forced compliance.',
      qip: 'QA 1.3.2 — Collaborative Planning',
      element: 'NQS Element 1.3.2 — Critical reflection informs curriculum planning and room adjustments.'
    }
  ];

  const filteredFeed = activeFilter === 'all' 
    ? feedItems 
    : feedItems.filter((item) => item.category === activeFilter);

  const handleCopyLog = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
            Back to Educator Deck
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Service Live Feed
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Banner with Restored Authority Credentials */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-4">
          <div className="space-y-2 border-b border-white/10 pb-4">
            <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
              {authorCredentials.lead}
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
              Service Practice & Evidence Feed
            </h1>
            <p className="text-xs text-white/80 font-medium">
              {authorCredentials.qualifications} | {authorCredentials.accreditation}
            </p>
          </div>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            Live, timestamped record of room resets, somatic interventions, and QIP evidence entries logged across all rooms for regulatory assessment.
          </p>
        </section>

        {/* Filter Switcher */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-bold text-sm">
          {[
            { id: 'all', label: 'All Activity' },
            { id: 'resets', label: 'Room Resets' },
            { id: 'qip', label: 'QIP Evidence' },
            { id: 'reflections', label: 'Critical Reflections' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id as 'all' | 'resets' | 'qip' | 'reflections')}
              className={`p-4 rounded-2xl border-2 transition-all min-h-12 text-center flex items-center justify-center ${
                activeFilter === tab.id
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
              }`}
            >
              <span className="text-xs font-bold">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Detailed Feed Entries */}
        <section className="space-y-6">
          {filteredFeed.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 hover:border-[#657B6C] transition-all"
            >
              <div className="flex flex-wrap justify-between items-center gap-2 border-b border-[#E6E2DC] pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-[#1C3B34] bg-[#FAF5EC] border border-[#C29F60]/40 px-3 py-1 rounded-full uppercase">
                    {item.room}
                  </span>
                  <span className="text-xs font-bold text-[#657B6C]">
                    {item.author}
                  </span>
                  <span className="text-xs font-medium text-[#6A7873]">
                    • {item.timestamp}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]">
                  {item.qip}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
                  {item.title}
                </h3>

                <div className="space-y-2 bg-[#FAF8F5] p-4 rounded-2xl border border-[#E6E2DC]">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#657B6C] block">
                    Floor Action Executed
                  </span>
                  <p className="text-sm font-medium leading-relaxed text-[#2B3833]">
                    {item.action}
                  </p>
                </div>

                <div className="space-y-1 bg-[#FAF5EC] p-4 rounded-2xl border border-[#C29F60]/30">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#C29F60] block">
                    Critical Reflection & Impact
                  </span>
                  <p className="text-xs font-medium leading-relaxed text-[#1C3B34]">
                    {item.reflection}
                  </p>
                </div>

                <div className="p-3 bg-[#F1F4F2] rounded-xl text-[11px] font-mono text-[#657B6C]">
                  {item.element}
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyLog(`${item.title}\n${item.action}\n${item.reflection}\n${item.element}`, item.id)}
                className="w-full py-3.5 px-4 bg-[#657B6C] text-white font-bold rounded-2xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
              >
                {copiedId === item.id ? 'Copied Full Evidence Entry' : 'Copy Full Entry for QIP Self-Assessment'}
              </button>
            </div>
          ))}
        </section>

        {/* Credentials & Compliance Framework Footer Badge */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 rounded-3xl space-y-3 text-center">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Quality & Compliance Standard
          </span>
          <h4 className="text-base font-serif font-bold text-[#1C3B34]">
            Trauma-Informed Co-Regulation Practice Framework
          </h4>
          <p className="text-xs font-medium text-[#2B3833] max-w-2xl mx-auto leading-relaxed">
            All feed entries are structured for immediate inclusion in National Quality Standard (NQS) Self-Assessment Workbooks and Service Approval Audits under ACECQA guidelines.
          </p>
        </section>

      </main>
    </div>
  );
}