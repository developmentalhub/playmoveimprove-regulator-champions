import Link from 'next/link';

import {
  redirect,
} from 'next/navigation';

import {
  revalidatePath,
} from 'next/cache';

import MemberSignOutButton from '@/components/MemberSignOutButton';

import NotificationsPanel from '@/components/rc/NotificationsPanel';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

type Notification = {
  id: string;
  notification_type: string;
  title: string;
  message: string;
  action_url: string | null;
  created_at: string;
};

function getSafeActionUrl(
  value: string,
) {
  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('://')
  ) {
    return '/platform/educator/dashboard';
  }

  return value;
}

async function markNotificationRead(
  formData: FormData,
) {
  'use server';

  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access',
    );
  }

  const notificationId =
    String(
      formData.get(
        'notificationId',
      ) || '',
    ).trim();

  if (!notificationId) {
    return;
  }

  const supabase =
    createRcAdminClient();

  const {
    error,
  } = await supabase
    .from(
      'rc_notifications',
    )
    .update({
      is_read: true,
    })
    .eq(
      'id',
      notificationId,
    )
    .eq(
      'member_id',
      auth.member.id,
    );

  if (error) {
    console.error(
      'Could not mark notification as read:',
      error,
    );
  }

  revalidatePath(
    '/platform/educator/notifications',
  );
}

async function openNotification(
  formData: FormData,
) {
  'use server';

  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access',
    );
  }

  const notificationId =
    String(
      formData.get(
        'notificationId',
      ) || '',
    ).trim();

  const actionUrl =
    String(
      formData.get(
        'actionUrl',
      ) || '',
    ).trim();

  if (!notificationId) {
    redirect(
      '/platform/educator/notifications',
    );
  }

  const supabase =
    createRcAdminClient();

  const {
    error,
  } = await supabase
    .from(
      'rc_notifications',
    )
    .update({
      is_read: true,
    })
    .eq(
      'id',
      notificationId,
    )
    .eq(
      'member_id',
      auth.member.id,
    );

  if (error) {
    console.error(
      'Could not mark opened notification as read:',
      error,
    );
  }

  redirect(
    getSafeActionUrl(
      actionUrl,
    ),
  );
}

export default async function EducatorNotificationsPage() {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access?returnTo=/platform/educator/notifications',
    );
  }

  if (
    auth.member.role ===
    'manager'
  ) {
    redirect(
      '/platform/manager/dashboard',
    );
  }

  await touchRcMemberLastSeen(
    auth.member.id,
  );

  const supabase =
    createRcAdminClient();

  const {
    data,
    error,
  } = await supabase
    .from(
      'rc_notifications',
    )
    .select(
      `
        id,
        notification_type,
        title,
        message,
        action_url,
        created_at
      `,
    )
    .eq(
      'member_id',
      auth.member.id,
    )
    .eq(
      'is_read',
      false,
    )
    .order(
      'created_at',
      {
        ascending: false,
      },
    );

  if (error) {
    console.error(
      'Could not load educator notifications:',
      error,
    );
  }

  const notifications =
    (data ??
      []) as Notification[];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <header className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Play Move Improve
            </p>

            <p className="mt-1 font-bold">
              Regulator Champions
            </p>
          </div>

          <MemberSignOutButton />
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-5 py-8 sm:px-6 sm:py-10">
        <section>
          <Link
            href="/platform/educator/dashboard"
            className="text-sm font-extrabold text-[#8A6F3E]"
          >
            ← Back to dashboard
          </Link>

          <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            Your account
          </p>

          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold sm:text-5xl">
                Notifications
              </h1>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#657B6C]">
                New learning,
                recordings, resources,
                certificate updates and
                team actions will appear
                here until you have read
                them.
              </p>
            </div>

            {notifications.length >
            0 ? (
              <div className="rounded-2xl bg-[#1C3B34] px-5 py-3 text-white">
                <p className="text-2xl font-black">
                  {
                    notifications.length
                  }
                </p>

                <p className="text-xs text-[#C9D8D2]">
                  unread
                </p>
              </div>
            ) : null}
          </div>
        </section>

        <NotificationsPanel
          notifications={
            notifications
          }
          markReadAction={
            markNotificationRead
          }
          openAction={
            openNotification
          }
        />
      </main>
    </div>
  );
}