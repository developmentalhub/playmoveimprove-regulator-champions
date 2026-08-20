'use client';

import React from 'react';
import Link from 'next/link';

export default function KindyUpliftPage() {
  const fundingStreams = [
    {
      state: 'Queensland',
      title: 'Kindy Uplift Funding',
      priority: 'Priority 1: Social and Emotional Wellbeing',
      description: 'Fully covers Regulator Champions whole-center licenses under trauma-informed practitioner capacity building and evidence-based regulation tools.',
      code: 'Category: Professional Learning & Capacity Building',
      eylf: 'EYLF v2.0: Outcome 1.1, 1.2 & 3.1'
    },
    {
      state: 'Victoria',
      title: 'School Readiness Funding (SRF)',
      priority: 'Priority Area: Social and Emotional Wellbeing',
      description: 'Acquitted under educator capability building, self-regulation frameworks, and family engagement resources.',
      code: 'VEYLDF Alignment: Identity & Wellbeing',
      eylf: 'VEYLDF: Outcome 1 & Outcome 3'
    },
    {
      state: 'New South Wales',
      title: 'Quality Learning Environments (QLE)',
      priority: 'Stream: Practitioner Practice & Environment',
      description: 'Fundable for room reset tools, staffroom regulation equipment, and QIP evidence documentation engines.',
      code: 'NQS Alignment: QA 1.2, QA 2.1 & QA 7.1',
      eylf: 'EYLF v2.0: Outcome 1.1 & Outcome 3.2'
    }
  ];

  const acquittalDetails = [
    { label: 'Provider Name', value: 'Play Move Improve (Regulator Champions Framework)' },
    { label: 'Program Type', value: 'Evidence-Based Professional Learning & Floor Tools' },
    { label: 'Target Audience', value: 'All ECEC Room Educators, ECTs, and Centre Managers' },
    { label: 'NQS Quality Areas', value: 'QA 1 (Program), QA 2 (Safety/Wellbeing), QA 7 (Governance)' },
    { label: 'Pricing (GST Inc)', value: '$1,790 (3-Ladder Entry) or $4,790 (Full 8-Ladder Site License)' }
  ];

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
          <div className="flex items-center gap-3">
            <Link
              href="/proposal"
              className="text-xs font-bold text-[#C29F60] hover:underline"
            >
              Generate Instant Quote
            </Link>
            <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
              State Funding Guide
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-10 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-4">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Government Grant & Grant Acquittal Bridge
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Fund Your Centre License with State ECEC Grants
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            Regulator Champions professional learning programs qualify for 100% acquittal under QLD Kindy Uplift, VIC School Readiness Funding (SRF), and NSW QLE grant allocations.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link
              href="/quote"
              className="py-3.5 px-6 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
            >
              Generate Official Tax Quote
            </Link>
            <Link
              href="/proposal"
              className="py-3.5 px-6 bg-white/10 border border-white/20 text-white font-bold rounded-2xl text-xs hover:bg-white/20 transition-all min-h-12 flex items-center justify-center"
            >
              Request Service Invoice
            </Link>
          </div>
        </section>

        {/* State Breakdown Cards */}
        <section className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-[#1C3B34]">
            State-by-State Funding Alignment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {fundingStreams.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]">
                      {item.state}
                    </span>
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1C3B34]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-bold text-[#657B6C]">
                    {item.priority}
                  </p>
                  <p className="text-xs font-medium text-[#2B3833] leading-relaxed bg-[#FAF8F5] p-3.5 rounded-xl border border-[#E6E2DC]">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-1 pt-2">
                  <div className="p-2.5 bg-[#FAF5EC] rounded-xl text-[10px] font-mono text-[#1C3B34] font-bold border border-[#C29F60]/30">
                    {item.code}
                  </div>
                  <div className="p-2.5 bg-[#F1F4F2] rounded-xl text-[10px] font-mono text-[#657B6C] font-bold">
                    {item.eylf}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit Compliance Table */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div className="border-b border-[#FAF8F5] pb-3">
            <span className="text-xs font-black uppercase text-[#657B6C] tracking-wider block">
              Grant Audit Verification
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Mandatory Application & Audit Data
            </h3>
          </div>

          <div className="space-y-2">
            {acquittalDetails.map((detail, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#FAF8F5] rounded-xl border border-[#E6E2DC] text-xs gap-1">
                <span className="font-bold text-[#657B6C]">{detail.label}:</span>
                <span className="font-bold text-[#1C3B34]">{detail.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Acquittal Wording Generator Box */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div className="border-b border-[#FAF8F5] pb-3">
            <span className="text-xs font-black uppercase text-[#657B6C] tracking-wider block">
              Pre-Formatted Acquittal Text
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Copy-Paste Text for Your Grant Application
            </h3>
          </div>

          <p className="text-xs text-[#2B3833] font-medium leading-relaxed">
            Use this pre-approved text directly in your plan submission portal when applying for funding approval:
          </p>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border-2 border-[#E6E2DC] text-xs font-mono text-[#2B3833] space-y-3 leading-relaxed">
            <p>
              "Funding will be allocated to the Regulator Champions ECEC Practice Framework by Play Move Improve. This evidence-based professional learning program equips all room educators with trauma-informed co-regulation strategies, low-arousal reset floor tools, and staffroom somatic practices. It includes whole-service digital access, print-ready floor cards, and an NQS QIP evidence engine to strengthen Quality Area 1, 2, and 7 outcomes aligned with EYLF v2.0."
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/proposal"
              className="w-full py-4 px-6 bg-[#1C3B34] text-white font-bold rounded-2xl hover:bg-opacity-90 transition-all text-xs shadow-sm min-h-12 flex items-center justify-center"
            >
              Generate Tax Invoice to Attach to Application
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}