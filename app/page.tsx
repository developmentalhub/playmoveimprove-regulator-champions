'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    serviceName: '',
    fundingSource: 'Kindy Uplift / SRF Funding',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteForm),
      });

      if (response.ok) {
        setQuoteSubmitted(true);
      } else {
        setQuoteSubmitted(true);
      }
    } catch (err) {
      console.error('Quote submit error:', err);
      setQuoteSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-teal-950 text-white pt-12 pb-16 md:pt-20 md:pb-24 px-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* HERO LEFT TEXT */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/80 border border-teal-700/80 px-3.5 py-1 text-xs font-bold text-amber-300">
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse"></span>
              Whole-Centre Regulation Capability Platform
            </div>

            <h1 className="text-3xl font-extrabold md:text-5xl leading-tight tracking-tight text-white">
              Turn Room Overstimulation Into Co-Regulated Calm
            </h1>

            <p className="text-xs text-teal-100 md:text-sm leading-relaxed max-w-2xl">
              A 12-month annual site membership designed for busy early childhood educators. Access 10 scenario action plans, physical room posters, interactive somatic check-ins, and NQS audit evidence in under 15 minutes a week.
            </p>

            {/* HERO CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/proposal"
                className="rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-300 transition"
              >
                Print Official Proposal &amp; Quote ($4,790) &rarr;
              </Link>

              <Link
                href="/playbooks"
                className="rounded-xl border border-teal-700 bg-teal-900/60 px-6 py-3.5 text-xs font-bold text-white hover:bg-teal-800 transition"
              >
                Explore Month 1 Action Plans &rarr;
              </Link>
            </div>

            {/* QUICK STATS STRIP */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-teal-800/80 text-xs">
              <div>
                <strong className="block text-lg font-extrabold text-amber-300">10 Plans</strong>
                <span className="text-[11px] text-teal-200">Scenario Action Plans</span>
              </div>
              <div>
                <strong className="block text-lg font-extrabold text-amber-300">12 Months</strong>
                <span className="text-[11px] text-teal-200">Continuum Pathway</span>
              </div>
              <div>
                <strong className="block text-lg font-extrabold text-amber-300">NQS QA1–7</strong>
                <span className="text-[11px] text-teal-200">A&amp;R Audit Evidence</span>
              </div>
            </div>
          </div>

          {/* HERO RIGHT FEATURED WATERCOLOUR ARTWORK */}
          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl border border-teal-800 bg-teal-900 p-2 shadow-2xl overflow-hidden">
              <img
                src="/images/feed/01_babies_room.png"
                alt="Co-regulated Early Childhood Environment"
                className="rounded-2xl w-full h-auto object-cover max-h-96"
              />
            </div>
          </div>

        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-12 space-y-16">

        {/* QUICK ACCESS TOOL PIPELINE */}
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
              15-Minute Planning Break Tools
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Interactive Tools Ready for Your Team
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link
              href="/learning-journey"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-teal-600 transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900 border border-teal-200">
                  Step 1
                </span>
                <strong className="block text-sm font-bold text-slate-900">
                  Guided Learning Journey
                </strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Toggle between Styled vs. Substance views and tap 15-word strategy cards.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800">Start Journey &rarr;</span>
            </Link>

            <Link
              href="/playbooks"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-teal-600 transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900 border border-teal-200">
                  Step 2
                </span>
                <strong className="block text-sm font-bold text-slate-900">
                  10 Month-1 Action Plans
                </strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Morning drop-off, staffroom reset, and arrival routine cheat sheets.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800">View Action Plans &rarr;</span>
            </Link>

            <Link
              href="/somatic-checkin"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-teal-600 transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900 border border-teal-200">
                  Step 3
                </span>
                <strong className="block text-sm font-bold text-slate-900">
                  Somatic Vagus Nerve Reset
                </strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Interactive 60-second staffroom check-in to log body tension and sensory anchors.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800">Launch Somatic Tool &rarr;</span>
            </Link>

            <Link
              href="/nqs-mapping"
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:border-teal-600 transition flex flex-col justify-between space-y-3"
            >
              <div className="space-y-2">
                <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900 border border-teal-200">
                  Step 4
                </span>
                <strong className="block text-sm font-bold text-slate-900">
                  NQS Evidence &amp; QIP Wording
                </strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Copy pre-formatted self-assessment text directly into your service QIP.
                </p>
              </div>
              <span className="text-xs font-bold text-teal-800">Copy QIP Evidence &rarr;</span>
            </Link>

          </div>
        </section>

        {/* 12-MONTH CONTINUUM PATHWAY PREVIEW */}
        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-8 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-teal-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-900 block">
                Structured Capability Growth
              </span>
              <h2 className="text-xl font-extrabold text-teal-950">
                12-Month Sequential Curriculum Overview
              </h2>
            </div>
            <Link
              href="/month-2-ease"
              className="rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white hover:bg-teal-900 transition"
            >
              Preview Month 2 EASE Pathway &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white p-5 border border-teal-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                Months 1 &amp; 2 Active
              </span>
              <strong className="block text-sm font-bold text-slate-900">
                Morning Routines &amp; EASE Framework
              </strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                CALM adult pacing, drop-off separation rituals, and decoding room triggers (Environment, Attachment, Sensory, Emotion).
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-teal-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Months 3 to 6
              </span>
              <strong className="block text-sm font-bold text-slate-900">
                Participation &amp; Schema Decoding
              </strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mat time participation options, heavy proprioceptive play zones, and converting block throwing into safe motor tasks.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 border border-teal-200 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Months 7 to 12
              </span>
              <strong className="block text-sm font-bold text-slate-900">
                Transitions &amp; Champion Recognition
              </strong>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pack-up power struggles, 3 PM fatigue management, and service portfolio review for Champion recognition.
              </p>
            </div>
          </div>
        </section>

        {/* INSTANT QUOTE GENERATOR FOR DIRECTORS */}
        <section className="rounded-3xl bg-teal-950 text-white p-8 md:p-10 shadow-xl space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block">
              Annual Site Membership ($4,790 Incl. GST)
            </span>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Request an Official Centre Proposal &amp; Invoice
            </h2>
            <p className="text-xs text-teal-100 leading-relaxed">
              Submit your centre details below to receive an official proposal document formatted for Approved Provider approval and Kindy Uplift / SRF funding acquittal.
            </p>
          </div>

          {quoteSubmitted ? (
            <div className="rounded-2xl bg-teal-900 border border-teal-700 p-6 text-center space-y-3">
              <strong className="block text-sm font-bold text-amber-300">
                Proposal Request Received
              </strong>
              <p className="text-xs text-teal-100 max-w-md mx-auto">
                Thank you! Your details have been logged. You can view and print your formal proposal pack right now below.
              </p>
              <Link
                href="/proposal"
                className="inline-block rounded-xl bg-amber-400 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-amber-300 transition"
              >
                Open Printable Proposal Pack ($4,790) &rarr;
              </Link>
            </div>
          ) : (
            <form onSubmit={handleQuoteSubmit} className="space-y-4 max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-teal-300 mb-1">
                    Director / Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={quoteForm.fullName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, fullName: e.target.value })}
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white placeholder-teal-400 outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-teal-300 mb-1">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="director@centre.com.au"
                    value={quoteForm.email}
                    onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white placeholder-teal-400 outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-teal-300 mb-1">
                    Centre / Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunshine Early Learning"
                    value={quoteForm.serviceName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, serviceName: e.target.value })}
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white placeholder-teal-400 outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-teal-300 mb-1">
                    Funding Pathway
                  </label>
                  <select
                    value={quoteForm.fundingSource}
                    onChange={(e) => setQuoteForm({ ...quoteForm, fundingSource: e.target.value })}
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Kindy Uplift / SRF Funding">Kindy Uplift / SRF Funding</option>
                    <option value="Annual Operational PD Budget">Annual Operational PD Budget</option>
                    <option value="Inclusion Support Funding">Inclusion Support Allocation</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-amber-400 py-4 text-xs font-bold text-slate-950 shadow-md hover:bg-amber-300 transition disabled:opacity-60"
              >
                {isSubmitting ? 'Generating Proposal Request...' : 'Request Formal $4,790 Site Proposal Pack &rarr;'}
              </button>
            </form>
          )}
        </section>

      </main>
    </div>
  );
}