'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const FULL_PRICE = 4790;
const PREVIEW_PRICE = 1790;
const CONTINUATION_STANDARD_PRICE = 4000;
const CONTINUATION_DISCOUNT_PCT = 20;
const CONTINUATION_PRICE = Math.round(
  CONTINUATION_STANDARD_PRICE * (1 - CONTINUATION_DISCOUNT_PCT / 100),
);
const PREVIEW_TOTAL_IF_COMPLETED = PREVIEW_PRICE + CONTINUATION_PRICE;
const UPFRONT_SAVING = PREVIEW_TOTAL_IF_COMPLETED - FULL_PRICE;

type Plan = 'preview' | 'full';

export default function ProposalPage() {
  const [plan, setPlan] = useState<Plan>('preview');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const requestedPlan = params.get('plan');

    if (requestedPlan === 'full' || requestedPlan === 'preview') {
      setPlan(requestedPlan);
    }
  }, []);

  const handlePrint = (): void => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const selectedPrice = plan === 'preview' ? PREVIEW_PRICE : FULL_PRICE;
  const selectedTitle =
    plan === 'preview'
      ? '3-Ladder Regulator Champions Preview'
      : 'Regulator Champions Full 8-Ladder Membership';
  const selectedTerm = plan === 'preview' ? '6-Month Site Access' : '12-Month Site Licence';

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800 print:bg-white print:pb-0">
      {/* ACTION BAR - HIDDEN ON PRINT */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 print:hidden">
        <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            ← Back to Home
          </Link>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setPlan('preview')}
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
                plan === 'preview'
                  ? 'border-amber-400 bg-amber-100 text-amber-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-amber-300'
              }`}
            >
              3-Ladder Preview
            </button>

            <button
              type="button"
              onClick={() => setPlan('full')}
              className={`rounded-xl border px-4 py-2 text-xs font-bold transition ${
                plan === 'full'
                  ? 'border-teal-700 bg-teal-50 text-teal-950'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-teal-300'
              }`}
            >
              Full 8 Ladders
            </button>

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
        {/* 2026 FUNDING CAMPAIGN BANNER */}
        <section className="rounded-3xl border border-amber-300 bg-amber-50 p-6 print:border-amber-400">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-[1.4fr_0.6fr] md:items-center">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-800">
                2026 Funding Opportunity
              </span>

              <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                Still have 2026 SRF or Kindy Uplift funding available?
              </h2>

              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                You do not need to commit to the full eight-ladder pathway
                immediately. Start Regulator Champions with the{' '}
                <strong>3-Ladder Preview for ${PREVIEW_PRICE.toLocaleString()} incl. GST</strong>{' '}
                and give your team six months to begin building shared
                co-regulation practice.
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                If your team chooses to continue, unlock Ladders 4 to 8 for{' '}
                <strong>${CONTINUATION_PRICE.toLocaleString()} incl. GST</strong>,
                which includes a {CONTINUATION_DISCOUNT_PCT}% continuation
                discount from the standard ${CONTINUATION_STANDARD_PRICE.toLocaleString()}{' '}
                continuation price.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 text-center shadow-sm print:border print:border-slate-200 print:shadow-none">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Start Now
              </span>
              <strong className="mt-1 block text-3xl font-extrabold text-slate-900">
                ${PREVIEW_PRICE.toLocaleString()}
              </strong>
              <span className="text-[11px] font-semibold text-slate-500">
                Incl. GST • 3 ladders • 6 months
              </span>
            </div>
          </div>
        </section>

        {/* DOCUMENT HEADER */}
        <section className="space-y-4 border-b-2 border-teal-900 pb-6">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <span className="block text-xs font-bold uppercase tracking-widest text-teal-800">
                Official Service Proposal &amp; Funding Quote
              </span>

              <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
                {selectedTitle}
              </h1>
            </div>

            <div className="text-left sm:text-right">
              <span className="block text-xl font-extrabold text-teal-950">
                ${selectedPrice.toLocaleString()} AUD
              </span>

              <span className="text-[11px] font-semibold text-slate-500">
                Incl. GST • {selectedTerm}
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
            Regulator Champions is a whole-service professional learning and
            coaching pathway for early childhood education teams. It is designed
            to strengthen educator capability in co-regulation, sensory and
            developmental practice, room routines, reflective practice and
            consistent team responses.
          </p>

          <p className="text-xs font-medium leading-relaxed text-slate-700">
            The program is delivered progressively through eight Regulation
            Ladders so educators have time to practise, reflect and embed each
            stage before moving forward. Ladder 1 is available when access
            begins, with later ladders released progressively rather than
            overwhelming teams with the entire curriculum on day one.
          </p>
        </section>

        {/* TWO PURCHASE PATHWAYS */}
        <section className="space-y-4">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Choose the Funding Pathway That Fits Your Service
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Both options provide whole-service access. The preview creates a
              lower-cost entry point for services using remaining 2026 funding,
              while the full pathway remains the best-value option for services
              ready to commit upfront.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => setPlan('preview')}
              className={`rounded-3xl border p-6 text-left transition print:border-slate-300 ${
                plan === 'preview'
                  ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
                2026 Funding Preview
              </span>
              <strong className="mt-1 block text-xl font-extrabold text-slate-900">
                3 Ladders • ${PREVIEW_PRICE.toLocaleString()}
              </strong>
              <span className="text-[11px] font-semibold text-slate-500">
                Incl. GST • 6 months
              </span>

              <div className="mt-4 space-y-2 text-xs leading-relaxed text-slate-700">
                <p>Includes Ladders 1 to 3 and whole-service platform access.</p>
                <p>
                  If you continue, unlock Ladders 4 to 8 for{' '}
                  <strong>${CONTINUATION_PRICE.toLocaleString()} incl. GST</strong>{' '}
                  after the {CONTINUATION_DISCOUNT_PCT}% continuation discount.
                </p>
                <p>
                  Total if both stages are purchased:{' '}
                  <strong>${PREVIEW_TOTAL_IF_COMPLETED.toLocaleString()} incl. GST</strong>.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPlan('full')}
              className={`rounded-3xl border p-6 text-left transition print:border-slate-300 ${
                plan === 'full'
                  ? 'border-teal-700 bg-teal-50 ring-2 ring-teal-200'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Best Full-Pathway Value
              </span>
              <strong className="mt-1 block text-xl font-extrabold text-slate-900">
                All 8 Ladders • ${FULL_PRICE.toLocaleString()}
              </strong>
              <span className="text-[11px] font-semibold text-slate-500">
                Incl. GST • 12 months
              </span>

              <div className="mt-4 space-y-2 text-xs leading-relaxed text-slate-700">
                <p>
                  Commit to the complete eight-ladder pathway from the beginning.
                </p>
                <p>
                  Saves <strong>${UPFRONT_SAVING.toLocaleString()}</strong>{' '}
                  compared with purchasing the preview and continuation stages
                  separately.
                </p>
                <p>
                  Best for services with sufficient SRF, Kindy Uplift or annual
                  professional learning funding available now.
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* SELECTED PLAN DELIVERABLES */}
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 print:border-slate-300 print:p-4">
          <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Selected Proposal
              </span>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                {plan === 'preview'
                  ? `3-Ladder Preview Deliverables ($${PREVIEW_PRICE.toLocaleString()} Total)`
                  : `12-Month Service Deliverables Included ($${FULL_PRICE.toLocaleString()} Total)`}
              </h2>
            </div>

            <strong className="text-xl font-extrabold text-teal-950">
              ${selectedPrice.toLocaleString()} incl. GST
            </strong>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                1. Site-Wide Passcode Access
              </strong>

              <p className="leading-relaxed text-slate-600">
                Whole-service staffroom and mobile access for participating
                educators using the service access pathway.
              </p>
            </div>

            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                2. Scenario Action Plans
              </strong>

              <p className="leading-relaxed text-slate-600">
                Context-specific action plans addressing everyday pressure
                points including arrivals, escalation, participation,
                transitions and regulation challenges as relevant ladders are
                released.
              </p>
            </div>

            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                3. Regulation Ladders &amp; Printable Resources
              </strong>

              <p className="leading-relaxed text-slate-600">
                {plan === 'preview'
                  ? 'Ladders 1 to 3 are released progressively across the six-month preview. Ladders 4 to 8 can be unlocked through the continuation option.'
                  : 'All eight Regulation Ladders form the full pathway, with content and related resources released progressively throughout the 12-month membership.'}
              </p>
            </div>

            <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
              <strong className="block font-bold text-teal-900">
                4. NQS Mapping &amp; QIP Support Wording
              </strong>

              <p className="leading-relaxed text-slate-600">
                Practical mapping and example wording to help services reflect
                on how their co-regulation work may contribute to Quality
                Improvement Plan evidence and NQS practice discussions.
              </p>
            </div>
          </div>
        </section>

        {/* STRUCTURED RELEASE EXPLANATION */}
        <section className="space-y-2 rounded-2xl border border-teal-300 bg-teal-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-teal-950">
            Structured Content Release
          </strong>

          <p className="text-xs leading-relaxed text-teal-900">
            Regulator Champions uses staged releases rather than delivering
            every resource on day one. Each ladder builds on the previous
            learning so teams have time to practise, reflect and make meaningful
            changes within real room routines.
          </p>

          <p className="text-xs leading-relaxed text-teal-900">
            {plan === 'preview'
              ? 'The preview provides six months of access with Ladders 1 to 3. Services that continue can then move into Ladders 4 to 8 and extend into the complete pathway.'
              : 'The full membership provides the complete eight-ladder pathway across 12 months.'}
          </p>
        </section>

        {/* FUNDING ALIGNMENT */}
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 md:p-8 print:border-slate-300">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
              Funding Pathways
            </span>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Victorian SRF &amp; Queensland Kindy Uplift
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5 print:bg-white">
              <strong className="block text-sm font-bold text-teal-950">
                Victoria • School Readiness Funding
              </strong>

              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                Play Move Improve can provide coaching within the School
                Readiness Funding coaching pathway where a service selects a
                coach to address its identified priorities and educator
                capability needs.
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                Regulator Champions is designed to support educator capability
                in co-regulation and children's wellbeing, including social,
                emotional and executive-function needs. Services should connect
                the coaching engagement to their own SRF goals, planning and
                documentation requirements.
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 print:bg-white">
              <strong className="block text-sm font-bold text-amber-950">
                Queensland • Kindy Uplift
              </strong>

              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                Play Move Improve online coaching services are included in the
                Kindy Uplift catalogue and can be considered by participating
                services as part of their Kindy Uplift planning and professional
                learning expenditure.
              </p>

              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                Regulator Champions aligns most strongly with Social and
                emotional learning and Executive function, with additional
                alignment where relevant to Physicality and Equity and Access
                for all.
              </p>
            </div>
          </div>

          <p className="text-[11px] leading-relaxed text-slate-500">
            Funding decisions remain the responsibility of the participating
            service and relevant funding processes. This proposal is provided to
            support internal planning, approval and purchasing decisions and
            does not represent Department endorsement of Play Move Improve.
          </p>
        </section>

        {/* WHY START WITH THE PREVIEW */}
        <section className="space-y-3 rounded-2xl border border-amber-300 bg-amber-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-amber-950">
            A Practical Way to Use Remaining 2026 Funding
          </strong>

          <p className="text-xs leading-relaxed text-amber-950">
            For services with a smaller amount of 2026 SRF or Kindy Uplift
            funding still available, the ${PREVIEW_PRICE.toLocaleString()}{' '}
            preview provides a practical way to begin this year rather than
            delaying the whole program. Your team can start with three ladders,
            build familiarity with the Regulator Champions approach and decide
            whether to continue into the remaining five ladders.
          </p>
        </section>

        {/* SERVICE APPROVAL SIGN-OFF FORM */}
        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 print:border-slate-300">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Centre Approval &amp; Purchase Order Sign-Off
            </h2>

            <div className="text-left sm:text-right">
              <span className="block text-[10px] font-bold uppercase text-slate-500">
                Selected Option
              </span>
              <strong className="text-sm font-bold text-teal-950">
                {plan === 'preview' ? '3-Ladder Preview' : 'Full 8-Ladder Program'} • $
                {selectedPrice.toLocaleString()}
              </strong>
            </div>
          </div>

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