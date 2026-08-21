import Link from 'next/link';

const programLinks = [
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
    <footer className="border-t border-slate-200 bg-white text-slate-700">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-4 lg:col-span-2">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-teal-700">
              Play Move Improve
            </span>

            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              Regulator Champions
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Whole-service professional learning helping early childhood
            educators notice what children&apos;s bodies are communicating,
            understand what may be happening beneath behaviour and respond with
            greater confidence through thoughtful co-regulation.
          </p>

          <a
            href="https://www.playmoveimprove.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm font-bold text-teal-800 transition hover:text-teal-950"
          >
            Visit Play Move Improve →
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
            Explore
          </h3>

          <div className="space-y-2.5">
            {programLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-slate-600 transition hover:text-teal-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
            Funding & Evidence
          </h3>

          <div className="space-y-2.5">
            {fundingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm text-slate-600 transition hover:text-teal-800"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
            Enquiries
          </h3>

          <div className="space-y-2.5">
            {enquiryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-semibold text-teal-800 transition hover:text-teal-950"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 border-t border-slate-200 pt-5">
            <div className="space-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-xs text-slate-500 transition hover:text-teal-800"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Play Move Improve. All rights reserved.
          </p>

          <p>Regulator Champions · Victoria, Australia</p>
        </div>
      </div>
    </footer>
  );
}