import { redirect } from 'next/navigation';

import PlatformSidebar from '@/components/rc/PlatformSidebar';

import {
  getCurrentRcAuthContext,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

export default async function EducatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access',
    );
  }

  /*
   * Both educators and managers can
   * access the learning area.
   *
   * Managers do not become educator
   * seats. They are simply viewing
   * and using the training content
   * through their existing manager
   * account.
   */
  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#232150] lg:flex">
      <PlatformSidebar
        role={
          auth.member.role ===
          'manager'
            ? 'manager'
            : 'educator'
        }
        serviceName={
          auth.service
            .service_name
        }
        memberName={
          auth.member
            .full_name
        }
      />

      <div className="min-w-0 flex-1">
        {children}
      </div>
    </div>
  );
}