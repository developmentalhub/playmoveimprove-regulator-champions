import Link from 'next/link';
import { redirect } from 'next/navigation';

import MemberSignOutButton from '@/components/MemberSignOutButton';
import PlatformSidebar from '@/components/rc/PlatformSidebar';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

type Member = {
  id: string;
  full_name: string | null;
  email: string;
  role: 'manager' | 'educator';
  status: string;
  last_seen_at: string | null;
  joined_at: string | null;
};

type Invite = {
  id: string;
  educator_name: string | null;
  educator_email: string | null;
  status: string;
};

type Topic = {
  id: string;
  title: string;
  sort_order: number;
  status: string;
};

type TopicProgress = {
  member_id: string;
  topic_id: string;
  completed_at: string | null;
};

function getActivityLabel(
  lastSeenAt: string | null,
) {
  if (!lastSeenAt) {
    return 'Never logged in';
  }

  const lastSeen =
    new Date(lastSeenAt);

  const now =
    new Date();

  const diffDays =
    (now.getTime() -
      lastSeen.getTime()) /
    (1000 * 60 * 60 * 24);

  if (diffDays > 30) {
    return 'Inactive for 30 days';
  }

  return 'Active within 30 days';
}

function formatDate(
  value: string | null,
) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone:
        'Australia/Melbourne',
    },
  ).format(
    new Date(value),
  );
}

export default async function ManagerDashboardPage() {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access?returnTo=/platform/manager/dashboard',
    );
  }

  if (
    auth.member.role !==
    'manager'
  ) {
    redirect(
      '/platform/educator/dashboard',
    );
  }

  await touchRcMemberLastSeen(
    auth.member.id,
  );

  const supabase =
    createRcAdminClient();

  const [
    membersResponse,
    invitesResponse,
    topicsResponse,
  ] = await Promise.all([
    supabase
      .from(
        'rc_team_members',
      )
      .select(
        `
          id,
          full_name,
          email,
          role,
          status,
          last_seen_at,
          joined_at
        `,
      )
      .eq(
        'service_id',
        auth.service.id,
      )
      .order(
        'joined_at',
        {
          ascending: true,
        },
      ),

    supabase
      .from(
        'rc_team_invites',
      )
      .select(
        `
          id,
          educator_name,
          educator_email,
          status
        `,
      )
      .eq(
        'service_id',
        auth.service.id,
      ),

    supabase
      .from(
        'rc_topics',
      )
      .select(
        `
          id,
          title,
          sort_order,
          status
        `,
      )
      .eq(
        'status',
        'published',
      )
      .order(
        'sort_order',
        {
          ascending: true,
        },
      ),
  ]);

  if (
    membersResponse.error
  ) {
    console.error(
      'Could not load manager team members:',
      membersResponse.error,
    );
  }

  if (
    invitesResponse.error
  ) {
    console.error(
      'Could not load manager invites:',
      invitesResponse.error,
    );
  }

  if (
    topicsResponse.error
  ) {
    console.error(
      'Could not load manager topics:',
      topicsResponse.error,
    );
  }

  const members =
    (membersResponse.data ??
      []) as Member[];

  const invites =
    (invitesResponse.data ??
      []) as Invite[];

  const topics =
    (topicsResponse.data ??
      []) as Topic[];

  const activeEducators =
    members.filter(
      (member) =>
        member.role ===
          'educator' &&
        member.status ===
          'active',
    );

  const pendingInvites =
    invites.filter(
      (invite) =>
        invite.status ===
        'pending',
    );

  const educatorIds =
    activeEducators.map(
      (educator) =>
        educator.id,
    );

  let progress:
    TopicProgress[] = [];

  if (
    educatorIds.length > 0
  ) {
    const {
      data,
      error,
    } = await supabase
      .from(
        'rc_topic_progress',
      )
      .select(
        `
          member_id,
          topic_id,
          completed_at
        `,
      )
      .in(
        'member_id',
        educatorIds,
      );

    if (error) {
      console.error(
        'Could not load team topic progress:',
        error,
      );
    }

    progress =
      (data ??
        []) as TopicProgress[];
  }

  const totalCompletedTopics =
    progress.filter(
      (item) =>
        Boolean(
          item.completed_at,
        ),
    ).length;

  const totalTeamCpdHours =
    totalCompletedTopics *
    1.5;

  const teamProgress =
    new Map<
      string,
      number
    >();

  activeEducators.forEach(
    (educator) => {
      const completed =
        progress.filter(
          (item) =>
            item.member_id ===
              educator.id &&
            Boolean(
              item.completed_at,
            ),
        ).length;

      teamProgress.set(
        educator.id,
        completed,
      );
    },
  );

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#232150] lg:flex">
      <PlatformSidebar
        role="manager"
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
        <header className="border-b border-[#E3DFEB] bg-white">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-[#87317E]">
                Manager workspace
              </p>

              <p className="mt-1 text-sm font-medium text-[#706E83]">
                Regulator Champions
              </p>
            </div>

            <MemberSignOutButton />
          </div>
        </header>

        <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-8 sm:py-10">
          {/* WELCOME */}
          <section>
            <p className="text-sm font-bold text-[#87317E]">
              Manager dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
              {
                auth.service
                  .service_name
              }
            </h1>

            <p className="mt-4 max-w-3xl text-lg font-normal leading-8 text-[#4C4A68]">
              See how your team is moving through
              Regulator Champions, keep an eye on
              CPD progress, family voice and the
              practical changes your service is
              making.
            </p>
          </section>

          {/* SUMMARY */}
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryCard
              label="Educator seats"
              value={`${activeEducators.length} of ${auth.service.seat_limit}`}
            />

            <SummaryCard
              label="Pending invites"
              value={`${pendingInvites.length}`}
            />

            <SummaryCard
              label="Team CPD"
              value={`${totalTeamCpdHours} hours`}
            />

            <SummaryCard
              label="Published topics"
              value={`${topics.length} of 12`}
            />
          </section>

          {/* NEXT ACTIONS */}
          <section className="rounded-3xl border border-[#E3DFEB] bg-white p-5 sm:p-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
                Next actions
              </p>

              <h2 className="mt-1 text-xl font-bold">
                What would you like to work on?
              </h2>

              <p className="mt-2 max-w-2xl text-sm font-normal leading-6 text-[#706E83]">
                These are optional shortcuts to the
                areas managers are most likely to
                use throughout the month.
              </p>
            </div>

            <div className="mt-5 divide-y divide-[#E3DFEB] border-y border-[#E3DFEB]">
              <ManagerAction
                number="1"
                title="Review family feedback"
                text="See the latest family responses and themes."
                href="/platform/manager/family-voice"
                action="Open Family Voice"
              />

              <ManagerAction
                number="2"
                title="Add your reflection"
                text="Record what your team is noticing, trying and learning."
                href="/platform/manager/qip"
                action="Open reflection"
              />

              <ManagerAction
                number="3"
                title="Build this month’s report"
                text="Bring your learning, CPD, family voice and QIP evidence together."
                href="/platform/manager/reports"
                action="Open reports"
              />
            </div>
          </section>

          {/* TEAM PROGRESS */}
          <section className="rounded-3xl border border-[#E3DFEB] bg-white p-6 sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-[#87317E]">
                  Team learning
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  Educator progress
                </h2>

                <p className="mt-2 text-sm font-normal leading-6 text-[#706E83]">
                  See how each educator is progressing
                  through their own professional
                  learning.
                </p>
              </div>

              <Link
                href="/platform/manager/team"
                className="text-sm font-bold text-[#87317E]"
              >
                Manage team →
              </Link>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E3DFEB]">
              {activeEducators.length ===
              0 ? (
                <div className="p-6 text-sm font-normal text-[#706E83]">
                  No educators have joined
                  the service yet.
                </div>
              ) : (
                <div className="divide-y divide-[#E3DFEB]">
                  {activeEducators.map(
                    (educator) => {
                      const completed =
                        teamProgress.get(
                          educator.id,
                        ) ?? 0;

                      const hours =
                        completed *
                        1.5;

                      return (
                        <article
                          key={
                            educator.id
                          }
                          className="grid gap-4 p-5 md:grid-cols-[1.4fr_1fr_0.8fr_1fr] md:items-center"
                        >
                          <div>
                            <p className="font-bold">
                              {educator.full_name ||
                                'Name not added'}
                            </p>

                            <p className="mt-1 wrap-break-word text-sm font-normal text-[#706E83]">
                              {
                                educator.email
                              }
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#87317E]">
                              Progress
                            </p>

                            <p className="mt-1 font-medium">
                              {completed}{' '}
                              of 12 topics
                            </p>
                          </div>

                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-[#87317E]">
                              CPD
                            </p>

                            <p className="mt-1 font-medium">
                              {hours}{' '}
                              hours
                            </p>
                          </div>

                          <div>
                            <p className="text-sm font-medium">
                              {getActivityLabel(
                                educator.last_seen_at,
                              )}
                            </p>

                            <p className="mt-1 text-xs font-normal text-[#706E83]">
                              Joined{' '}
                              {formatDate(
                                educator.joined_at,
                              )}
                            </p>
                          </div>
                        </article>
                      );
                    },
                  )}
                </div>
              )}
            </div>
          </section>

          {/* MANAGER TOOLS */}
          <section>
            <p className="text-xs font-black uppercase tracking-wider text-[#87317E]">
              Manager tools
            </p>

            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Your service workspace
            </h2>

            <p className="mt-3 max-w-3xl text-base font-normal leading-7 text-[#706E83]">
              Choose the area you need. You do not
              need to work through these in order.
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <WorkspaceLink
                href="/platform/manager/team"
                title="Team & invitations"
                text="Invite educators, check available seats and manage who has access to your service."
                action="Manage team"
              />

              <WorkspaceLink
                href="/platform/manager/family-voice"
                title="Family Voice"
                text="Share family feedback forms and see the themes families are noticing around your current learning."
                action="View Family Voice"
              />

              <WorkspaceLink
                href="/platform/manager/qip"
                title="QIP & team actions"
                text="Bring educator reflections, family voice and practical team actions into your ongoing quality improvement work."
                action="Open QIP"
              />

              <WorkspaceLink
                href="/platform/manager/reports"
                title="Monthly reports"
                text="Bring the month’s learning, reflections, family voice and evidence together into a useful service record."
                action="View reports"
              />

              <WorkspaceLink
                href="/platform/manager/cpd"
                title="Team CPD"
                text="See completed learning and download professional development records for your educators."
                action="View CPD"
              />

              <WorkspaceLink
                href="/platform/manager/notifications"
                title="Notifications"
                text="See new program content and anything that may need your attention."
                action="View notifications"
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E3DFEB] bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wider text-[#87317E]">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black text-[#232150] sm:text-3xl">
        {value}
      </p>
    </article>
  );
}

function ManagerAction({
  number,
  title,
  text,
  href,
  action,
}: {
  number: string;
  title: string;
  text: string;
  href: string;
  action: string;
}) {
  return (
    <Link
      href={href}
      className="group grid gap-3 py-4 sm:grid-cols-[42px_1fr_auto] sm:items-center sm:px-3"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F5EF] text-xs font-black text-[#232150]">
        {number}
      </span>

      <div>
        <h3 className="text-base font-bold text-[#232150]">
          {title}
        </h3>

        <p className="mt-1 text-sm font-normal leading-6 text-[#706E83]">
          {text}
        </p>
      </div>

      <span className="text-sm font-bold text-[#87317E] group-hover:underline">
        {action} →
      </span>
    </Link>
  );
}

function WorkspaceLink({
  href,
  title,
  text,
  action,
}: {
  href: string;
  title: string;
  text: string;
  action: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E3DFEB] bg-white p-6">
      <h3 className="text-lg font-bold text-[#232150]">
        {title}
      </h3>

      <p className="mt-3 font-normal leading-7 text-[#706E83]">
        {text}
      </p>

      <Link
        href={href}
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-[#232150] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#19173F]"
      >
        {action} →
      </Link>
    </article>
  );
}