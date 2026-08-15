'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavigationLink = {
  href: string;
  label: string;
};

const primaryNavLinks: NavigationLink[] = [
  { href: '/', label: 'Home' },
  { href: '/feed', label: 'CALM Feed' },
  { href: '/free-guide', label: 'Free Guide' },
  { href: '/portal', label: 'Member Hub' },
  { href: '/nqs-mapping', label: 'NQS Evidence' },
];

const secondaryNavLinks: NavigationLink[] = [
  {
    href: '/director-review',
    label: 'Director Review',
  },
  {
    href: '/portal',
    label: 'Member Hub',
  },
  {
    href: '/somatic-checkin',
    label: 'Somatic Tool',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (link: NavigationLink) => {
    if (link.label === 'Member Hub') {
      return false;
    }

    return pathname === link.href;
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-teal-800/80 bg-teal-950/95 text-white shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-700 text-xs font-extrabold text-white shadow-xs transition group-hover:bg-teal-600">
            PMI
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase leading-tight tracking-widest text-teal-300">
              Play Move Improve
            </span>

            <span className="text-xs font-extrabold tracking-tight text-white">
              Regulator Champions
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 rounded-2xl border border-teal-800/80 bg-teal-900/40 p-1.5 xl:flex"
          aria-label="Main navigation"
        >
          {primaryNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                isActive(link)
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-teal-200 hover:bg-teal-800/50 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="mx-1 h-4 w-px bg-teal-800/80"
            aria-hidden="true"
          />

          {secondaryNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                isActive(link)
                  ? 'bg-teal-800 text-white shadow-xs'
                  : 'text-teal-300 hover:bg-teal-800/40 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 sm:block">
          <Link
            href="/proposal"
            className="rounded-xl border border-amber-300 bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
          >
            Proposal &amp; Quote
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="rounded-xl p-2 text-teal-200 transition hover:bg-teal-800 hover:text-white xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            className="h-6 w-6 fill-current"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
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

      {mobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="space-y-5 border-t border-teal-800/80 bg-teal-950 px-5 py-5 shadow-xl xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-teal-400">
              Public Resources
            </span>

            {primaryNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block rounded-xl px-3 py-2.5 text-xs font-bold transition ${
                  isActive(link)
                    ? 'bg-teal-700 text-white'
                    : 'text-teal-200 hover:bg-teal-900 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="space-y-1 border-t border-teal-900 pt-4">
            <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-teal-400">
              Enquiries and Access
            </span>

            {secondaryNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block rounded-xl px-3 py-2.5 text-xs font-semibold transition ${
                  isActive(link)
                    ? 'bg-teal-800 text-white'
                    : 'text-teal-300 hover:bg-teal-900 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <Link
            href="/proposal"
            onClick={closeMobileMenu}
            className="block w-full rounded-xl bg-amber-400 py-3 text-center text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
          >
            Proposal &amp; Quote
          </Link>
        </nav>
      )}
    </header>
  );
}