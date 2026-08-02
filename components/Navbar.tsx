'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Public high-converting routes
  const primaryNavLinks = [
    { href: '/', label: 'Home' },
    { href: '/feed', label: 'CALM Feed' },
    { href: '/free-guide', label: 'Free Guide' },
    { href: '/playbooks', label: '10 Action Plans' },
    { href: '/nqs-mapping', label: 'NQS Evidence' },
  ];

  // Member & Baseline routes
  const secondaryNavLinks = [
    { href: '/portal', label: 'Member Hub' },
    { href: '/somatic-checkin', label: 'Somatic Tool' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-teal-800/80 bg-teal-950/90 text-white backdrop-blur-md shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
        
        {/* BRAND LOGO */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-xs font-extrabold text-white shadow-xs group-hover:bg-teal-600 transition">
            PMI
          </div>
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-300 leading-tight">
              Play Move Improve
            </span>
            <span className="text-xs font-extrabold text-white tracking-tight">
              Regulator Champions
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1.5 rounded-2xl border border-teal-800/80 bg-teal-900/40 p-1.5">
          {primaryNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
                  isActive
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-teal-200 hover:bg-teal-800/50 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="mx-1 h-4 w-px bg-teal-800/80" />

          {secondaryNavLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? 'bg-teal-800 text-white shadow-xs'
                    : 'text-teal-300 hover:bg-teal-800/40 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP CTA BUTTON */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <Link
            href="/proposal"
            className="rounded-xl border border-amber-300 bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
          >
            Proposal &amp; Quote ($4,790)
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl p-2 text-teal-200 hover:bg-teal-800 hover:text-white transition lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"
              />
            ) : (
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {mobileMenuOpen && (
        <div className="border-t border-teal-800/80 bg-teal-950 px-6 py-5 space-y-4 shadow-xl lg:hidden">
          <div className="space-y-1">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-teal-400">
              Public Resources
            </span>
            {primaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-xs font-bold transition ${
                    isActive
                      ? 'bg-teal-700 text-white'
                      : 'text-teal-200 hover:bg-teal-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-teal-900 pt-3 space-y-1">
            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-teal-400">
              Member Access
            </span>
            {secondaryNavLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-3 py-2 text-xs font-semibold transition ${
                    isActive
                      ? 'bg-teal-800 text-white'
                      : 'text-teal-300 hover:bg-teal-900 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/proposal"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full rounded-xl bg-amber-400 py-3 text-center text-xs font-bold text-slate-950 shadow-xs hover:bg-amber-300 transition"
            >
              Print Service Proposal ($4,790)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}