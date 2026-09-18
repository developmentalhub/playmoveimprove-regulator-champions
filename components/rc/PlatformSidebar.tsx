'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type PlatformRole =
  | 'manager'
  | 'educator';

type PlatformSidebarProps = {
  role: PlatformRole;
  serviceName: string;
  memberName?: string | null;
};

type NavItem = {
  label: string;
  href: string;
};

const MANAGER_LINKS: NavItem[] = [
  {
    label: 'Manager dashboard',
    href:
      '/platform/manager/dashboard',
  },
  {
    label: 'Training content',
    href:
      '/platform/educator/dashboard',
  },
  {
    label: 'Team & invitations',
    href:
      '/platform/manager/team',
  },
  {
    label: 'Family Voice',
    href:
      '/platform/manager/family-voice',
  },
  {
    label: 'QIP',
    href:
      '/platform/manager/qip',
  },
  {
    label: 'Monthly reports',
    href:
      '/platform/manager/reports',
  },
  {
    label: 'Team CPD',
    href:
      '/platform/manager/cpd',
  },
  {
    label: 'Notifications',
    href:
      '/platform/manager/notifications',
  },
];

const EDUCATOR_LINKS: NavItem[] = [
  {
    label: 'Dashboard',
    href:
      '/platform/educator/dashboard',
  },
  {
    label: 'Learning topics',
    href:
      '/platform/educator/dashboard#learning-topics',
  },
  {
    label: 'Certificates',
    href:
      '/platform/educator/certificates',
  },
  {
    label:
      'Professional learning reports',
    href:
      '/platform/educator/reports',
  },
  {
    label: 'Notifications',
    href:
      '/platform/educator/notifications',
  },
];

function isActiveLink(
  pathname: string,
  href: string,
) {
  const cleanHref =
    href.split('#')[0];

  if (
    href ===
    '/platform/educator/dashboard'
  ) {
    return (
      pathname ===
        '/platform/educator/dashboard' ||
      pathname.startsWith(
        '/platform/educator/topics/',
      )
    );
  }

  if (
    cleanHref.endsWith(
      '/dashboard',
    )
  ) {
    return (
      pathname === cleanHref
    );
  }

  return pathname.startsWith(
    cleanHref,
  );
}

export default function PlatformSidebar({
  role,
  serviceName,
  memberName,
}: PlatformSidebarProps) {
  const pathname =
    usePathname();

  const links =
    role === 'manager'
      ? MANAGER_LINKS
      : EDUCATOR_LINKS;

  const roleLabel =
    role === 'manager'
      ? 'Manager'
      : 'Educator';

  return (
    <aside className="w-full shrink-0 bg-[#232150] text-white lg:min-h-screen lg:w-72">
      <div className="lg:sticky lg:top-0 lg:flex lg:min-h-screen lg:flex-col">
        {/* BRAND */}
        <div className="border-b border-white/15 px-5 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-[#232150]">
              <div className="text-center text-[9px] font-black leading-2.5">
                <span className="block text-[#87317E]">
                  Play
                </span>

                <span className="block text-[#DCCDA8]">
                  Move
                </span>

                <span className="block text-[#61B694]">
                  Improve
                </span>
              </div>
            </div>

            <div>
              <p className="text-sm font-black text-white">
                Play Move Improve
              </p>

              <p className="mt-0.5 text-xs font-bold text-[#61B694]">
                Regulator Champions
              </p>
            </div>
          </div>

          {/* MEMBER */}
          <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4">
            <p className="text-[11px] font-black uppercase tracking-[0.14em] text-[#DCCDA8]">
              {roleLabel}
            </p>

            {memberName ? (
              <p className="mt-1 font-bold text-white">
                {memberName}
              </p>
            ) : null}

            <p className="mt-2 text-sm font-normal leading-5 text-white/75">
              {serviceName}
            </p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav
          aria-label={`${roleLabel} navigation`}
          className="flex gap-2 overflow-x-auto px-4 py-4 lg:block lg:space-y-2 lg:overflow-visible lg:py-6"
        >
          {links.map(
            (item) => {
              const active =
                isActiveLink(
                  pathname,
                  item.href,
                );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    active
                      ? 'flex min-h-11 shrink-0 items-center rounded-xl bg-[#61B694] px-4 py-3 text-sm font-black text-[#232150] lg:w-full'
                      : 'flex min-h-11 shrink-0 items-center rounded-xl border border-transparent px-4 py-3 text-sm font-bold text-white transition hover:border-white/20 hover:bg-white/10 lg:w-full'
                  }
                >
                  {item.label}
                </Link>
              );
            },
          )}
        </nav>

        {/* BOTTOM AREA */}
        <div className="mt-auto border-t border-white/15 px-4 py-5">
          <Link
            href="/"
            className="flex min-h-11 w-full items-center justify-between rounded-xl border border-white/25 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            <span>
              Back to main site
            </span>

            <span
              aria-hidden="true"
            >
              →
            </span>
          </Link>

          <div className="mt-4 hidden rounded-2xl bg-[#87317E] p-4 lg:block">
            <p className="text-xs font-black uppercase tracking-[0.12em] text-white">
              2027 Program
            </p>

            <p className="mt-2 text-sm font-normal leading-5 text-white/90">
              Learning, reflection,
              family voice and QIP
              evidence in one place.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}