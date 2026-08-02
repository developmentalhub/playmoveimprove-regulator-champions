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
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800 print:bg-white print:pb-0">
      {/* ACTION BAR - HIDDEN ON PRINT */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 print:hidden">
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
              className="cursor-pointer rounded-xl bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
            >
              Print Official Proposal / PDF →
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-8 px-6 py-10 print:space-y-6 print:px-0 print:py-0">
        {/* DOCUMENT HEADER */}
        <section className="space-y-4 border-b-2 border-teal-900 pb-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-teal-800">
                Official Service Proposal &amp; Funding Quote
              </span>

              <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                Regulator Champions Whole-Centre Membership
              </h1>
            </div>

            <div className="text-left sm:text-right">
              <span className="block text-xl font-extrabold text-teal-950">
                $4,790 AUD
              </span>

              <span className="text-[11px] font-semibold text-slate-500">
                Incl. GST • 12-Month Site Licence
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs sm:grid-cols-4">
            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">
                Provider
              </span>

              <strong className="font-bold text-slate-900">
                Play Move Improve
              </strong>
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">
                ABN
              </span>

              <strong className="font-bold text-slate-900">
                17 415 190 263
              </strong>
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">
                Author
              </span>

              <strong className="font-bold text-slate-900">
                Robyn Papworth
              </strong>
            </div>

            <div>
              <span className="block text-[10px] font-bold uppercase text-slate-500">
                Scope
              </span>

              <strong className="font-bold text-slate-900">
                Whole Service (All Staff)
              </strong>
            </div>
          </div>
        </section>

        {/* EXECUTIVE SUMMARY */}
        <section className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-800">
            Executive Summary for Approved Provider &amp; Leadership
          </h2>

          <p className="text-xs font-medium leading-relaxed text-slate-700">
            This proposal outlines the 12-month annual site membership
            for early childhood education services. Designed
            specifically to reduce room overstimulation, support staff
            retention, and satisfy Assessment &amp; Rating (A&amp;R)
            requirements under Quality Areas 1, 4, 5, 6, and 7.
          </p>

          <p className="text-xs font-medium leading-relaxed text-slate-700">
            Ladder 1 is available when the membership begins, with
            Ladders 2 through 8 released progressively across the
            12-month pathway. This staged delivery is intentional,
            allowing educators and families to practise each stage
            without being overwhelmed by the full curriculum at once.
          </p>
        </section>

        {/* WHAT IS INCLUDED IN $4,790 */}
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 print:border-slate-300 print:p-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            12-Month Service Deliverables Included ($4,790 Total)
          </h2>

          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                1. Site-Wide Passcode Access
              </strong>

              <p className="leading-relaxed text-slate-600">
                Unlimited staffroom and mobile access for all room
                educators using a single shared service code.
              </p>
            </div>

            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                2. Scenario Action Plans
              </strong>

              <p className="leading-relaxed text-slate-600">
                Context-specific room action plans covering drop-off
                distress, afternoon fatigue, escalation, participation,
                and transition hotspots as each ladder is released.
              </p>
            </div>

            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                3. Eight Regulation Ladders &amp; Printable Resources
              </strong>

              <p className="leading-relaxed text-slate-600">
                Ladder 1 resources are available at commencement, with
                Ladders 2 through 8 and their related posters released
                progressively throughout the 12-month membership.
              </p>
            </div>

            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                4. NQS Mapping &amp; QIP Wording
              </strong>

              <p className="leading-relaxed text-slate-600">
                Audit-ready evidence matrix mapping co-regulation
                practices directly to NQS Quality Areas 1–7.
              </p>
            </div>
          </div>
        </section>

        {/* STRUCTURED RELEASE EXPLANATION */}
        <section className="space-y-2 rounded-2xl border border-teal-300 bg-teal-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-teal-950">
            Structured Monthly Content Release
          </strong>

          <p className="text-xs leading-relaxed text-teal-900">
            The 12-month site licence provides access to the full
            Regulation Ladders pathway through staged releases rather
            than delivering all eight ladders on day one. Each new
            stage builds on the previous one so teams have time to
            practise, reflect, and embed meaningful behaviour change.
          </p>
        </section>

        {/* FUNDING ACQUITTAL COMPLIANCE */}
        <section className="space-y-2 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-amber-950">
            Grant &amp; Funding Acquittal Guidelines
          </strong>

          <p className="text-xs leading-relaxed text-amber-900">
            This $4,790 membership is structured for acquittal under{' '}
            <strong>Kindy Uplift Funding</strong>,{' '}
            <strong>School Readiness Funding (SRF)</strong>, or{' '}
            <strong>Annual Service PD Budgets</strong> under the
            Professional Capability &amp; Educator Well-being priority
            tiers.
          </p>
        </section>

        {/* SERVICE APPROVAL SIGN-OFF FORM */}
        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 print:border-slate-300">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Centre Approval &amp; Purchase Order Sign-Off
          </h2>

          <div className="grid grid-cols-1 gap-6 text-xs sm:grid-cols-2">
            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-500">
                  Approved Provider / Entity Name
                </span>

                <div className="border-b border-slate-300 pt-6"></div>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-500">
                  Nominated Supervisor Signature
                </span>

                <div className="border-b border-slate-300 pt-8"></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-500">
                  Purchase Order (PO) Number
                </span>

                <div className="border-b border-slate-300 pt-6"></div>
              </div>

              <div>
                <span className="block text-[10px] font-bold uppercase text-slate-500">
                  Approval Date
                </span>

                <div className="border-b border-slate-300 pt-8"></div>
              </div>
            </div>
          </div>
        </section>

        {/* PRINT FOOTER */}
        <footer className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-500">
          Play Move Improve Pty Ltd • ABN 17 415 190 263 • Email:
          robyn@playmoveimprove.com.au
        </footer>
      </main>
    </div>
  );
}