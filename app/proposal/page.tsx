'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function ProposalContent() {
  const searchParams = useSearchParams();
  const initialPlan = searchParams.get('plan') === 'full' ? 'full' : 'preview';

  const [selectedPlan, setSelectedPlan] = useState<'preview' | 'full'>(initialPlan);
  const [serviceName, setServiceName] = useState('');
  const [directorName, setDirectorName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20 print:bg-white print:pb-0">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3 print:hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/portal"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Member Hub
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Service Proposal
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8 print:p-0">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Regulator Champions Program
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Service Implementation & Quote Request
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            Choose a professional learning pathway for your early childhood team. Includes staffroom decks, manager QIP tools, and printable room posters.
          </p>
        </section>

        {/* Plan Switcher Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-bold text-sm">
          <button
            type="button"
            onClick={() => setSelectedPlan('preview')}
            className={`p-6 rounded-3xl border-2 text-left transition-all min-h-12 flex flex-col justify-between space-y-3 ${
              selectedPlan === 'preview'
                ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                selectedPlan === 'preview' ? 'bg-[#C29F60] text-[#1C3B34]' : 'bg-[#FAF5EC] text-[#1C3B34]'
              }`}>
                6 Months Access
              </span>
              <span className="text-lg font-serif font-bold">$1,790 GST Inc</span>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold">3-Ladder Preview Pathway</h2>
              <p className={`text-xs mt-1 font-normal ${selectedPlan === 'preview' ? 'text-white/80' : 'text-[#6A7873]'}`}>
                Perfect for launching core morning co-regulation, EASE practices, and initial QIP mapping.
              </p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPlan('full')}
            className={`p-6 rounded-3xl border-2 text-left transition-all min-h-12 flex flex-col justify-between space-y-3 ${
              selectedPlan === 'full'
                ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
            }`}
          >
            <div className="flex justify-between items-start w-full">
              <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                selectedPlan === 'full' ? 'bg-[#C29F60] text-[#1C3B34]' : 'bg-[#FAF5EC] text-[#1C3B34]'
              }`}>
                12 Months Access
              </span>
              <span className="text-lg font-serif font-bold">$4,790 GST Inc</span>
            </div>

            <div>
              <h2 className="text-xl font-serif font-bold">Full 8-Ladder Complete Pathway</h2>
              <p className={`text-xs mt-1 font-normal ${selectedPlan === 'full' ? 'text-white/80' : 'text-[#6A7873]'}`}>
                Whole-service transformation across all 8 Regulation Ladders with complete QIP and family bridge tools.
              </p>
            </div>
          </button>
        </div>

        {/* Program Inclusions Checklist */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4">
          <div className="border-b border-[#FAF8F5] pb-3">
            <span className="text-xs font-black uppercase text-[#657B6C] tracking-wider block">
              Included Features
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              What Your Centre Receives
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Unlimited staff access to Educator Floor Action Decks',
              'Manager QIP Evidence Engine & NQS Mapping Tools',
              'Staffroom Somatic Body Scan & Reset Tools',
              'Print-ready A3 CALM Room Posters & Routine Cards',
              'Weekly 1-click Parent Newsletter Blurbs (QA 6.1.1)',
              '1-on-1 Mentoring Coaching Question Guides'
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-[#FAF8F5] border-2 border-[#E6E2DC] rounded-2xl text-xs font-bold text-[#1C3B34] flex items-center gap-2">
                <span className="text-[#C29F60] font-black">Active</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-6">
          <div className="border-b border-[#FAF8F5] pb-3">
            <span className="text-xs font-black uppercase text-[#657B6C] tracking-wider block">
              Official Proposal
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Generate Official Service Proposal / Invoice
            </h3>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C3B34] block">
                    Service / Centre Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Early Learning Centre"
                    className="w-full p-3.5 rounded-xl border-2 border-[#E6E2DC] text-xs text-[#1C3B34] outline-none focus:border-[#657B6C] bg-[#FAF8F5] min-h-12"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C3B34] block">
                    Director / Manager Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={directorName}
                    onChange={(e) => setDirectorName(e.target.value)}
                    placeholder="e.g. Jane Smith"
                    className="w-full p-3.5 rounded-xl border-2 border-[#E6E2DC] text-xs text-[#1C3B34] outline-none focus:border-[#657B6C] bg-[#FAF8F5] min-h-12"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C3B34] block">
                    Work Email Address:
                  </label>
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="director@service.com.au"
                    className="w-full p-3.5 rounded-xl border-2 border-[#E6E2DC] text-xs text-[#1C3B34] outline-none focus:border-[#657B6C] bg-[#FAF8F5] min-h-12"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#1C3B34] block">
                    Contact Phone:
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0400 000 000"
                    className="w-full p-3.5 rounded-xl border-2 border-[#E6E2DC] text-xs text-[#1C3B34] outline-none focus:border-[#657B6C] bg-[#FAF8F5] min-h-12"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm min-h-12 flex items-center justify-center"
              >
                Send Official Proposal & Quote to My Email
              </button>
            </form>
          ) : (
            <div className="p-6 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-2xl text-center space-y-3">
              <span className="text-xs font-black uppercase text-[#C29F60] block">Proposal Sent</span>
              <h4 className="text-lg font-serif font-bold text-[#1C3B34]">Proposal Generated</h4>
              <p className="text-xs text-[#2B3833] max-w-md mx-auto leading-relaxed">
                An official proposal for <strong>{serviceName}</strong> ({selectedPlan === 'preview' ? '3-Ladder Preview - $1,790 GST Inc' : 'Full 8-Ladder Pathway - $4,790 GST Inc'}) has been generated and sent to <strong>{workEmail}</strong>.
              </p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default function ProposalPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-xs font-bold text-[#6A7873]">
        Loading Proposal Page...
      </div>
    }>
      <ProposalContent />
    </Suspense>
  );
}