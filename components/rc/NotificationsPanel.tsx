type Notification = {
  id: string;
  notification_type: string;
  title: string;
  message: string;
  action_url: string | null;
  created_at: string;
};

type Props = {
  notifications: Notification[];
  markReadAction: (
    formData: FormData,
  ) => void | Promise<void>;
  openAction: (
    formData: FormData,
  ) => void | Promise<void>;
};

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZone:
        'Australia/Melbourne',
    },
  ).format(
    new Date(value),
  );
}

function getTypeLabel(
  type: string,
) {
  switch (type) {
    case 'topic-unlocked':
      return 'New topic';

    case 'certificate-ready':
      return 'Certificate';

    case 'new-recording':
      return 'Recording';

    case 'new-resource':
      return 'Resource';

    case 'team-action-approved':
      return 'Team action';

    case 'team-action-rejected':
      return 'Team action';

    case 'family-summary':
      return 'Family Voice';

    default:
      return 'Update';
  }
}

export default function NotificationsPanel({
  notifications,
  markReadAction,
  openAction,
}: Props) {
  if (
    notifications.length ===
    0
  ) {
    return (
      <div className="rounded-4xl border border-[#E6E2DC] bg-white p-7 shadow-sm">
        <h2 className="text-2xl font-bold">
          You&apos;re all caught up.
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-[#657B6C]">
          New topics, recordings,
          resources, certificates and
          Regulator Champions updates
          will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map(
        (notification) => (
          <article
            key={
              notification.id
            }
            className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-3xl">
                <span className="inline-flex rounded-full bg-[#FAF5EC] px-3 py-1 text-xs font-bold text-[#8A6F3E]">
                  {getTypeLabel(
                    notification.notification_type,
                  )}
                </span>

                <h2 className="mt-3 text-xl font-bold">
                  {
                    notification.title
                  }
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#657B6C]">
                  {
                    notification.message
                  }
                </p>

                <p className="mt-3 text-xs text-[#8B918D]">
                  {formatDate(
                    notification.created_at,
                  )}
                </p>
              </div>

              <div className="flex shrink-0 flex-wrap gap-2">
                {notification.action_url ? (
                  <form
                    action={
                      openAction
                    }
                  >
                    <input
                      type="hidden"
                      name="notificationId"
                      value={
                        notification.id
                      }
                    />

                    <input
                      type="hidden"
                      name="actionUrl"
                      value={
                        notification.action_url
                      }
                    />

                    <button
                      type="submit"
                      className="rounded-xl bg-[#1C3B34] px-5 py-3 text-xs font-extrabold text-white"
                    >
                      Open
                    </button>
                  </form>
                ) : null}

                <form
                  action={
                    markReadAction
                  }
                >
                  <input
                    type="hidden"
                    name="notificationId"
                    value={
                      notification.id
                    }
                  />

                  <button
                    type="submit"
                    className="rounded-xl border border-[#D8D2C9] bg-white px-5 py-3 text-xs font-bold text-[#657B6C]"
                  >
                    Mark read
                  </button>
                </form>
              </div>
            </div>
          </article>
        ),
      )}
    </div>
  );
}