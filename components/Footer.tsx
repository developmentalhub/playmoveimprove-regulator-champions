import Link from 'next/link';

const exploreLinks = [
  {
    href: '/#regulation-ladders',
    label: 'How it works',
  },
  {
    href: '/playbooks',
    label: 'Free Regulation Ladder',
  },
  {
    href: '/blog',
    label: 'Articles and free training',
  },
  {
    href: '/#full-program',
    label: 'Full program',
  },
  {
    href: 'mailto:robyn@playmoveimprove.com.au?subject=Regulator%20Champions%20enquiry',
    label: 'Enquire',
    external: true,
  },
];

const resourceLinks = [
  {
    href: '/blog/vagus-nerve-regulation-activities',
    label: 'Free Vagus Nerve Training',
  },
  {
    href: '/free-guide',
    label: 'Safe Touch Guide',
  },
];

const qualityLinks = [
  {
    href: '/nqs-mapping',
    label: 'Quality Improvement Plan (QIP)',
  },
  {
    href: '/school-readiness-funding',
    label: 'School Readiness Funding (SRF)',
  },
  {
    href: '/kindy-uplift',
    label: 'Kindy Uplift',
  },
  {
    href: '/us-early-childhood-quality',
    label: 'US Child Care & Quality Improvement',
  },
];

const memberLinks = [
  {
    href: '/member-access',
    label: 'Member Login',
  },
  {
    href: '/proposal?plan=preview',
    label: '6-Month Preview',
  },
  {
    href: '/proposal?plan=full',
    label: '12-Month Regulator Champions',
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
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.45fr_1fr_1fr_1fr]">
        <div>
          <p className="text-base font-semibold text-[#E4C98E]">
            Play Move Improve
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-white">
            Regulator Champions
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#D8E1DC]">
            Practical support for early childhood teams trying to work out what may be happening underneath behaviour, what to notice next and what might be worth trying in the room.
          </p>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#BFD0C8]">
            Start with a free article, training or Regulation Ladder, then use the broader resources and program when your team wants more support.
          </p>

          <a
            href="https://www.playmoveimprove.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex text-base font-semibold text-[#E4C98E] transition hover:text-white"
          >
            Visit Play Move Improve
          </a>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-white">
            Explore
          </h3>

          <div className="mt-5 space-y-3">
            {exploreLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-base leading-relaxed text-[#D8E1DC] transition hover:text-white"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-base leading-relaxed text-[#D8E1DC] transition hover:text-white"
                >
                  {link.label}
                </Link>
              ),
            )}
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-base font-extrabold text-white">
              Free resources
            </h3>

            <div className="mt-4 space-y-3">
              {resourceLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm leading-relaxed text-[#BFD0C8] transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-white">
            Funding and quality improvement
          </h3>

          <div className="mt-5 space-y-3">
            {qualityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base leading-relaxed text-[#D8E1DC] transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <p className="mt-5 text-sm leading-relaxed text-[#BFD0C8]">
            Funding, licensing and quality requirements vary by location, so services should confirm what applies in their own state, territory or country.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-white">
            Already involved?
          </h3>

          <div className="mt-5 space-y-3">
            {memberLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base leading-relaxed text-[#D8E1DC] transition hover:text-white"
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

          <p>
            Regulator Champions · Play Move Improve
          </p>
        </div>
      </div>
    </footer>
  );
}