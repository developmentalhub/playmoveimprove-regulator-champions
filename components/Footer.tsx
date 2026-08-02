import Link from 'next/link';

const programLinks = [
  {
    href: '/feed',
    label: 'CALM Feed',
  },
  {
    href: '/free-guide',
    label: 'Free Guide',
  },
  {
    href: '/playbooks',
    label: '10 Action Plans',
  },
  {
    href: '/nqs-mapping',
    label: 'NQS Evidence',
  },
  {
    href: '/somatic-checkin',
    label: 'Somatic Tool',
  },
];

const enquiryLinks = [
  {
    href: '/director-review',
    label: 'Director Review',
  },
  {
    href: '/proposal',
    label: 'Proposal & Quote',
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-widest text-teal-700">
              Play Move Improve
            </span>

            <h2 className="mt-1 text-lg font-extrabold text-slate-900">
              Regulator Champions
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-slate-600">
            Practical whole-centre professional learning that helps early
            childhood teams build consistent, developmentally informed
            responses to regulation needs.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
            Program Resources
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
            Directors and Enquiries
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

          <p className="mt-4 text-xs leading-relaxed text-slate-500">
            Start with the short Director Review if you are exploring whether
            Regulator Champions may suit your service.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-900">
            Legal
          </h3>

          <div className="space-y-2.5">
            {legalLinks.map((link) => (
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
      </div>

      <div className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Play Move Improve. All rights reserved.
          </p>

          <p>Victoria, Australia</p>
        </div>
      </div>
    </footer>
  );
}