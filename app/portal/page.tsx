import {
  redirect,
} from 'next/navigation';

import {
  getCurrentRcAuthContext,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

export default async function PortalPage() {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access?returnTo=/portal',
    );
  }

  await touchRcMemberLastSeen(
    auth.member.id,
  );

  if (
    auth.member.role ===
    'manager'
  ) {
    redirect(
      '/platform/manager/dashboard',
    );
  }

  redirect(
    '/platform/educator/dashboard',
  );
}