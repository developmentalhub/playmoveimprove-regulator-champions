import Link from 'next/link';

const programLinks = [
  {
    href: '/',
    label: 'How Regulator Champions Works',
  },
  {
    href: '/feed',
    label: 'Practice Scenarios',
  },
  {
    href: '/free-guide',
    label: 'Free Safe Touch Guide',
  },
  {
    href: '/portal',
    label: 'Member Hub',
  },
];

const fundingLinks = [
  {
    href: '/school-readiness-funding',
    label: 'School Readiness Funding',
  },
  {
    href: '/kindy-uplift',
    label: 'Kindy Uplift',
  },
  {
    href: '/nqs-mapping',
    label: 'NQS & QIP Reflection',
  },
];

const enquiryLinks = [
  {
    href: '/proposal',
    label: 'Proposal & Quote',
  },
  {
    href: '/director-review',
    label: 'Director Review',
  },
];

const legalLinks = [
  {
    href: '/privacy',
    label: 'Privacy',
  },
  {
    href: '/terms',
    label: 'Terms',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E5DED4] bg-[#1C3B34] text-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-5 lg:col-span-2">
          <div>
            <span className="block text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
              Play Move Improve
            </span>

            <h2 className="mt-2 text-3xl font-extrabold text-white">
              Regulator Champions
            </h2>
          </div>

          <p className="max-w-xl text-lg leading-relaxed text-[#D8E1DC]">
            Practical whole-service support helping early childhood educators
            understand what may be happening underneath behaviour, notice
            regulation needs and know what to try next.
          </p>

          <p className="max-w-xl text-lg font-bold leading-relaxed text-white">
            Less guessing. More confidence. More consistency across your team.
          </p>

          <a
            href="https://www.playmoveimprove.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-base font-extrabold text-[#E4C98E] transition hover:text-white"
          >
            Visit Play Move Improve →
          </a>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.12em] text-[#E4C98E]">
            Explore
          </h3>

          <div className="space-y-3">
            {programLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base leading-relaxed text-[#D8E1DC] transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.12em] text-[#E4C98E]">
            Funding & Evidence
          </h3>

          <div className="space-y-3">
            {fundingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base leading-relaxed text-[#D8E1DC] transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-5 text-sm font-extrabold uppercase tracking-[0.12em] text-[#E4C98E]">
            Enquiries
          </h3>

          <div className="space-y-3">
            {enquiryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-bold text-white transition hover:text-[#E4C98E]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-7 border-t border-white/10 pt-6">
            <div className="space-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-[#BFD0C8] transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-[#16332D]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-6 text-sm text-[#BFD0C8] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Play Move Improve. All rights reserved.
          </p>

          <p>Regulator Champions · Victoria, Australia</p>
        </div>
      </div>
    </footer>
  );
}