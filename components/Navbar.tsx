'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

type NavigationLink = {
  href: string;
  label: string;
};

const navigationLinks: NavigationLink[] = [
  {
    href: '/',
    label: 'Regulator Champions',
  },
  {
    href: '/free-guide',
    label: 'Free Guide',
  },
  {
    href: '/feed',
    label: 'Practice Scenarios',
  },
  {
    href: '/school-readiness-funding',
    label: 'Funding',
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href);
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
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-xs font-extrabold text-white shadow-sm transition group-hover:bg-teal-600">
            PMI
          </div>

          <div>
            <span className="block text-[10px] font-bold uppercase leading-tight tracking-widest text-teal-300">
              Play Move Improve
            </span>

            <span className="text-sm font-extrabold tracking-tight text-white">
              Regulator Champions
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition ${
                isActive(link.href)
                  ? 'bg-teal-700 text-white'
                  : 'text-teal-200 hover:bg-teal-900 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/portal"
            className="rounded-xl border border-teal-700 px-4 py-2 text-xs font-bold text-teal-100 transition hover:bg-teal-900 hover:text-white"
          >
            Member Hub
          </Link>

          <Link
            href="/proposal"
            className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-sm transition hover:bg-amber-300"
          >
            View Proposal
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="rounded-xl p-2 text-teal-200 transition hover:bg-teal-800 hover:text-white lg:hidden"
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
          className="border-t border-teal-800/80 bg-teal-950 px-5 py-5 shadow-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block rounded-xl px-3 py-3 text-sm font-bold transition ${
                  isActive(link.href)
                    ? 'bg-teal-700 text-white'
                    : 'text-teal-200 hover:bg-teal-900 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-5 grid gap-3 border-t border-teal-900 pt-5">
            <Link
              href="/portal"
              onClick={closeMobileMenu}
              className="block rounded-xl border border-teal-700 px-4 py-3 text-center text-sm font-bold text-teal-100 transition hover:bg-teal-900 hover:text-white"
            >
              Member Hub
            </Link>

            <Link
              href="/proposal"
              onClick={closeMobileMenu}
              className="block rounded-xl bg-amber-400 px-4 py-3 text-center text-sm font-extrabold text-slate-950 shadow-sm transition hover:bg-amber-300"
            >
              View Proposal
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}