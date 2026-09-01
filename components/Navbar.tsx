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
    label: 'How It Works',
  },
  {
    href: '/feed',
    label: 'Practice Scenarios',
  },
  {
    href: '/free-guide',
    label: 'Free Guide',
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#1C3B34]/95 text-white shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-6">
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#C29F60] text-sm font-extrabold text-[#1C3B34] shadow-sm transition group-hover:bg-[#D1B477]">
            RC
          </div>

          <div>
            <span className="block text-xs font-bold uppercase leading-tight tracking-[0.14em] text-[#E4C98E]">
              Play Move Improve
            </span>

            <span className="mt-0.5 block text-lg font-extrabold tracking-tight text-white">
              Regulator Champions
            </span>
          </div>
        </Link>

        <nav
          className="hidden items-center gap-1 xl:flex"
          aria-label="Main navigation"
        >
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-xl px-4 py-3 text-base font-bold transition ${
                isActive(link.href)
                  ? 'bg-white/10 text-white'
                  : 'text-[#D8E1DC] hover:bg-white/10 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <Link
            href="/portal"
            className="rounded-2xl border border-white/20 bg-white/5 px-5 py-3 text-base font-bold text-white transition hover:bg-white/10"
          >
            Member Hub
          </Link>

          <Link
            href="/proposal"
            className="rounded-2xl bg-[#C29F60] px-5 py-3 text-base font-extrabold text-[#1C3B34] shadow-sm transition hover:bg-[#D1B477]"
          >
            View Proposal
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((current) => !current)}
          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 xl:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
        >
          <svg
            className="h-7 w-7 fill-current"
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
          className="border-t border-white/10 bg-[#1C3B34] px-5 py-6 shadow-xl xl:hidden"
          aria-label="Mobile navigation"
        >
          <div className="space-y-2">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block rounded-2xl px-4 py-4 text-lg font-bold transition ${
                  isActive(link.href)
                    ? 'bg-white/10 text-white'
                    : 'text-[#D8E1DC] hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 grid gap-3 border-t border-white/10 pt-6">
            <Link
              href="/portal"
              onClick={closeMobileMenu}
              className="block rounded-2xl border border-white/20 bg-white/5 px-5 py-4 text-center text-lg font-bold text-white transition hover:bg-white/10"
            >
              Member Hub
            </Link>

            <Link
              href="/proposal"
              onClick={closeMobileMenu}
              className="block rounded-2xl bg-[#C29F60] px-5 py-4 text-center text-lg font-extrabold text-[#1C3B34] shadow-sm transition hover:bg-[#D1B477]"
            >
              View Proposal
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}