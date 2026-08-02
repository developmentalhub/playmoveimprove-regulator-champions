'use client';

import React from 'react';
import Link from 'next/link';

export default function ProposalPage() {
  const handlePrint = (): void => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20 print:bg-white print:pb-0">
      
      {/* ACTION BAR - HIDDEN ON PRINT */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4 print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            ← Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-xs hover:bg-amber-300 transition cursor-pointer"
            >
              Print Official Proposal / PDF →
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-10 space-y-8 print:px-0 print:py-0 print:space-y-6">

        {/* DOCUMENT HEADER */}
        <section className="border-b-2 border-teal-900 pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-800 block">
                Official Service Proposal &amp; Funding Quote
              </span>
              <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                Regulator Champions Whole-Centre Membership
              </h1>
            </div>
            <div className="text-left sm:text-right">
              <span className="block text-xl font-extrabold text-teal-950">$4,790 AUD</span>
              <span className="text-[11px] text-slate-500 font-semibold">Incl. GST • 12-Month Site Licence</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Provider</span>
              <strong className="text-slate-900 font-bold">Play Move Improve</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">ABN</span>
              <strong className="text-slate-900 font-bold">17 415 190 263</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Author</span>
              <strong className="text-slate-900 font-bold">Robyn Papworth</strong>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Scope</span>
              <strong className="text-slate-900 font-bold">Whole Service (All Staff)</strong>
            </div>
          </div>
        </section>

        {/* EXECUTIVE SUMMARY */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Executive Summary for Approved Provider &amp; Leadership
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">
            This proposal outlines the 12-month annual site membership for early childhood education services. Designed specifically to reduce room overstimulation, support staff retention, and satisfy Assessment &amp; Rating (A&amp;R) requirements under Quality Areas 1, 4, 5, 6, and 7.
          </p>
        </section>

        {/* WHAT IS INCLUDED IN $4,790 */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 space-y-4 print:border-slate-300 print:p-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            12-Month Service Deliverables Included ($4,790 Total)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200 space-y-1">
              <strong className="block font-bold text-teal-900">1. Site-Wide Passcode Access</strong>
              <p className="text-slate-600 leading-relaxed">
                Unlimited staffroom and mobile access for all room educators using a single shared service code.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200 space-y-1">
              <strong className="block font-bold text-teal-900">2. 10 Scenario Action Plans</strong>
              <p className="text-slate-600 leading-relaxed">
                Context-specific room cheat sheets covering drop-off distress, 3 PM fatigue, and transition hotspots.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200 space-y-1">
              <strong className="block font-bold text-teal-900">3. 8 Printable Routine Ladders &amp; Posters</strong>
              <p className="text-slate-600 leading-relaxed">
                A3 physical room posters for staffroom doors, quiet corners, and family handover entryways.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-slate-200 space-y-1">
              <strong className="block font-bold text-teal-900">4. NQS Mapping &amp; QIP Wording</strong>
              <p className="text-slate-600 leading-relaxed">
                Audit-ready evidence matrix mapping co-regulation practices directly to NQS Quality Areas 1–7.
              </p>
            </div>
          </div>
        </section>

        {/* FUNDING ACQUITTAL COMPLIANCE */}
        <section className="rounded-2xl border border-amber-300 bg-amber-50 p-5 space-y-2">
          <strong className="block text-xs font-bold uppercase tracking-wider text-amber-950">
            Grant &amp; Funding Acquittal Guidelines
          </strong>
          <p className="text-xs text-amber-900 leading-relaxed">
            This $4,790 membership is structured for acquittal under <strong>Kindy Uplift Funding</strong>, <strong>School Readiness Funding (SRF)</strong>, or <strong>Annual Service PD Budgets</strong> under the Professional Capability &amp; Educator Well-being priority tiers.
          </p>
        </section>

        {/* SERVICE APPROVAL SIGN-OFF FORM */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 space-y-6 print:border-slate-300">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Centre Approval &amp; Purchase Order Sign-Off
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Approved Provider / Entity Name</span>
                <div className="border-b border-slate-300 pt-6"></div>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Nominated Supervisor Signature</span>
                <div className="border-b border-slate-300 pt-8"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Purchase Order (PO) Number</span>
                <div className="border-b border-slate-300 pt-6"></div>
              </div>
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Approval Date</span>
                <div className="border-b border-slate-300 pt-8"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PRINT FOOTER */}
        <footer className="text-center text-[10px] text-slate-500 pt-4 border-t border-slate-200">
          Play Move Improve Pty Ltd • ABN 17 415 190 263 • Email: robyn@playmoveimprove.com.au
        </footer>

      </main>
    </div>
  );
}