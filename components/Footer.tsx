'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 font-sans print:hidden">
      <div className="mx-auto max-w-7xl px-6 py-12 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-slate-800 pb-8">
          
          {/* BRAND COLUMN */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-700 text-xs font-extrabold text-white">
                PMI
              </div>
              <span className="text-sm font-extrabold text-white tracking-tight">
                Play Move Improve
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Whole-centre co-regulation capability for early childhood services. Built by Paediatric Exercise Physiologist &amp; Developmental Educator Robyn Papworth.
            </p>
            <p className="text-[11px] text-slate-500 font-semibold">
              ABN: 17 415 190 263 • Play Move Improve Pty Ltd
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-3 space-y-2">
            <strong className="block text-xs font-bold uppercase tracking-wider text-teal-400">
              Public Resources
            </strong>
            <ul className="space-y-1.5 text-xs font-medium">
              <li>
                <Link href="/feed" className="hover:text-white transition">
                  CALM Visual Feed
                </Link>
              </li>
              <li>
                <Link href="/free-guide" className="hover:text-white transition">
                  Micro Course Module
                </Link>
              </li>
              <li>
                <Link href="/playbooks" className="hover:text-white transition">
                  10 Scenario Action Plans
                </Link>
              </li>
              <li>
                <Link href="/learning-journey" className="hover:text-white transition">
                  Guided Learning Journey
                </Link>
              </li>
              <li>
                <Link href="/nqs-mapping" className="hover:text-white transition">
                  NQS Evidence Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* MEMBER & DIRECTORS */}
          <div className="md:col-span-4 space-y-2">
            <strong className="block text-xs font-bold uppercase tracking-wider text-teal-400">
              Service Leadership
            </strong>
            <ul className="space-y-1.5 text-xs font-medium">
              <li>
                <Link href="/proposal" className="hover:text-white transition text-amber-300 font-bold">
                  Print Service Proposal ($4,790) &rarr;
                </Link>
              </li>
              <li>
                <Link href="/director-review" className="hover:text-white transition">
                  Director Starting-Point Review
                </Link>
              </li>
              <li>
                <Link href="/educator-confidence" className="hover:text-white transition">
                  Educator Baseline Check
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:text-white transition">
                  12-Month Member Portal
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-400">
                Email: <a href="mailto:robyn@playmoveimprove.com.au" className="underline hover:text-white">robyn@playmoveimprove.com.au</a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Play Move Improve Pty Ltd. All rights reserved.</p>
          <p>Designed for Kindy Uplift, SRF, and NQS Quality Area Compliance.</p>
        </div>

      </div>
    </footer>
  );
}