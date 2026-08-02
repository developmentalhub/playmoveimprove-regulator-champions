'use client';

import React from 'react';
import Link from 'next/link';
import PasscodeGate from '@/components/PasscodeGate';

export default function MemberPortalPage() {
  const handleLockOut = () => {
    localStorage.removeItem('pmi_access_unlocked');
    window.location.reload();
  };

  return (
    <PasscodeGate
  title="Member Hub Locked"
  subtitle="Enter the private access code supplied to your centre to access member tools."
>
      <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
        
        {/* HEADER BAR */}
        <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
                Play Move Improve
              </span>
              <h1 className="text-base font-extrabold text-slate-900">
                12-Month Member Hub
              </h1>
            </div>

            <button
              type="button"
              onClick={handleLockOut}
              className="rounded-xl border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 transition"
            >
              Lock Access
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-6 py-8 space-y-8">

          {/* WELCOME BANNER */}
          <section className="rounded-3xl bg-teal-950 text-white p-8 space-y-4 shadow-md">
            <span className="rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold text-slate-950 inline-block">
              Active Centre Licence
            </span>
            <h2 className="text-2xl font-extrabold md:text-3xl">
              Welcome to Your Service Portal
            </h2>
            <p className="text-xs text-teal-100 max-w-xl leading-relaxed">
              Your service has full access to all 8 Regulation Ladders, 10 Scenario Action Plans, monthly staffroom learning sets, and downloadable PDF poster packs.
            </p>
          </section>

          {/* MEMBER MODULES GRID */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                Month 1 Foundation
              </span>
              <h3 className="text-base font-bold text-slate-900">
                10 Scenario Action Plans
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Morning arrival, drop-off distress, staffroom reset, and doorway pacing cheat sheets.
              </p>
              <Link
                href="/playbooks"
                className="inline-block text-xs font-bold text-teal-800 hover:underline pt-2"
              >
                Open Action Plans &rarr;
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                Month 2 Pathway
              </span>
              <h3 className="text-base font-bold text-slate-900">
                EASE Model &amp; Escalation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Environment, attachment, sensory seeking schemas, and de-escalating meltdowns.
              </p>
              <Link
                href="/month-2-ease"
                className="inline-block text-xs font-bold text-teal-800 hover:underline pt-2"
              >
                Open EASE Pathway &rarr;
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 block">
                A&amp;R Audit Tools
              </span>
              <h3 className="text-base font-bold text-slate-900">
                NQS Compliance Matrix
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pre-written Quality Improvement Plan (QIP) evidence wording for Quality Areas 1, 4, 5, 6 &amp; 7.
              </p>
              <Link
                href="/nqs-mapping"
                className="inline-block text-xs font-bold text-teal-800 hover:underline pt-2"
              >
                Copy QIP Evidence &rarr;
              </Link>
            </div>

          </section>

          {/* PRINTABLE PDF VAULT */}
          <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6 space-y-4">
            <h3 className="text-sm font-bold text-teal-950">
              Printable Room Poster &amp; Card Vault
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <a
                href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-teal-800 p-3 text-center text-xs font-bold text-white hover:bg-teal-900 transition"
              >
                Educator Routine Cards
              </a>
              <a
                href="/pdf/Calm-Posters.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-amber-400 p-3 text-center text-xs font-bold text-slate-950 hover:bg-amber-300 transition"
              >
                CALM Room Posters
              </a>
              <a
                href="/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-teal-700 bg-white p-3 text-center text-xs font-bold text-teal-950 hover:bg-teal-100 transition"
              >
                Manager Strategy Cards
              </a>
              <a
                href="/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-teal-700 bg-white p-3 text-center text-xs font-bold text-teal-950 hover:bg-teal-100 transition"
              >
                Parent Handover Cards
              </a>
            </div>
          </section>

        </main>
      </div>
    </PasscodeGate>
  );
}