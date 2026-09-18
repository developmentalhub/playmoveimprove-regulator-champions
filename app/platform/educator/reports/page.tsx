import Link from 'next/link';

import {
  redirect,
} from 'next/navigation';

import {
  revalidatePath,
} from 'next/cache';

import MemberSignOutButton from '@/components/MemberSignOutButton';

import DeleteProfessionalReportButton from '@/components/rc/DeleteProfessionalReportButton';

import {
  createRcAdminClient,
  getCurrentRcAuthContext,
  touchRcMemberLastSeen,
} from '@/lib/rcAuth';

export const dynamic =
  'force-dynamic';

type Topic = {
  id: string;
  title: string;
  slug: string;
  sort_order: number;
};

type CompletedTopic = {
  topic_id: string;
  completed_at: string;
};

type Takeaway = {
  id: string;
  topic_id: string;
  takeaway_number: number;
  takeaway_text: string;
  include_in_professional_report: boolean;
};

type Report = {
  id: string;
  topic_id: string | null;
  report_name: string;
  personal_learning_note:
    | string
    | null;
  file_path: string | null;
  generated_at: string;
};

type ReportTakeaway = {
  report_id: string;
  takeaway_id: string;
};

function formatDate(
  value: string,
) {
  return new Intl.DateTimeFormat(
    'en-AU',
    {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone:
        'Australia/Melbourne',
    },
  ).format(
    new Date(value),
  );
}

async function createReport(
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

  if (
    auth.member.role !==
    'educator'
  ) {
    redirect(
      '/platform/manager/dashboard',
    );
  }

  const topicId =
    String(
      formData.get('topicId') ||
        '',
    ).trim();

  const reportName =
    String(
      formData.get(
        'reportName',
      ) || '',
    ).trim();

  const personalNote =
    String(
      formData.get(
        'personalLearningNote',
      ) || '',
    ).trim();

  const takeawayIds =
    formData
      .getAll('takeawayIds')
      .map((value) =>
        String(value),
      )
      .filter(Boolean);

  if (
    !topicId ||
    !reportName
  ) {
    redirect(
      '/platform/educator/reports?error=missing',
    );
  }

  const supabase =
    createRcAdminClient();

  const {
    data: progress,
    error: progressError,
  } = await supabase
    .from(
      'rc_topic_progress',
    )
    .select(
      `
        topic_id,
        completed_at
      `,
    )
    .eq(
      'member_id',
      auth.member.id,
    )
    .eq(
      'topic_id',
      topicId,
    )
    .not(
      'completed_at',
      'is',
      null,
    )
    .maybeSingle();

  if (
    progressError ||
    !progress
  ) {
    redirect(
      '/platform/educator/reports?error=topic',
    );
  }

  const generatedAt =
    new Date().toISOString();

  const {
    data: report,
    error: reportError,
  } = await supabase
    .from(
      'rc_professional_learning_reports',
    )
    .insert({
      member_id:
        auth.member.id,

      topic_id:
        topicId,

      report_name:
        reportName,

      personal_learning_note:
        personalNote || null,

      generated_at:
        generatedAt,
    })
    .select(
      `
        id
      `,
    )
    .single();

  if (
    reportError ||
    !report
  ) {
    console.error(
      'Could not create professional learning report:',
      reportError,
    );

    redirect(
      '/platform/educator/reports?error=create',
    );
  }

  const reportPath =
    `/api/rc-professional-report/${report.id}`;

  const {
    error: pathError,
  } = await supabase
    .from(
      'rc_professional_learning_reports',
    )
    .update({
      file_path:
        reportPath,
    })
    .eq(
      'id',
      report.id,
    );

  if (pathError) {
    console.error(
      'Could not save report path:',
      pathError,
    );
  }

  if (
    takeawayIds.length > 0
  ) {
    const {
      data:
        eligibleTakeaways,
      error:
        eligibleError,
    } = await supabase
      .from(
        'rc_learning_takeaways',
      )
      .select(
        `
          id
        `,
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .eq(
        'topic_id',
        topicId,
      )
      .in(
        'id',
        takeawayIds,
      );

    if (eligibleError) {
      console.error(
        'Could not validate professional report takeaways:',
        eligibleError,
      );
    } else {
      const rows =
        (
          eligibleTakeaways ??
          []
        ).map(
          (takeaway) => ({
            report_id:
              report.id,
            takeaway_id:
              takeaway.id,
          }),
        );

      if (
        rows.length > 0
      ) {
        const {
          error:
            takeawayLinkError,
        } = await supabase
          .from(
            'rc_professional_report_takeaways',
          )
          .insert(rows);

        if (
          takeawayLinkError
        ) {
          console.error(
            'Could not save selected report takeaways:',
            takeawayLinkError,
          );
        }
      }
    }
  }

  revalidatePath(
    '/platform/educator/reports',
  );

  redirect(
    '/platform/educator/reports?created=1',
  );
}

async function renameReport(
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

  const reportId =
    String(
      formData.get(
        'reportId',
      ) || '',
    ).trim();

  const reportName =
    String(
      formData.get(
        'reportName',
      ) || '',
    ).trim();

  if (
    !reportId ||
    !reportName
  ) {
    return;
  }

  const supabase =
    createRcAdminClient();

  const {
    error,
  } = await supabase
    .from(
      'rc_professional_learning_reports',
    )
    .update({
      report_name:
        reportName,
    })
    .eq(
      'id',
      reportId,
    )
    .eq(
      'member_id',
      auth.member.id,
    );

  if (error) {
    console.error(
      'Could not rename professional learning report:',
      error,
    );
  }

  revalidatePath(
    '/platform/educator/reports',
  );
}

async function deleteReport(
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

  const reportId =
    String(
      formData.get(
        'reportId',
      ) || '',
    ).trim();

  if (!reportId) {
    return;
  }

  const supabase =
    createRcAdminClient();

  const {
    error: linksError,
  } = await supabase
    .from(
      'rc_professional_report_takeaways',
    )
    .delete()
    .eq(
      'report_id',
      reportId,
    );

  if (linksError) {
    console.error(
      'Could not delete professional report takeaway links:',
      linksError,
    );
  }

  const {
    error: reportError,
  } = await supabase
    .from(
      'rc_professional_learning_reports',
    )
    .delete()
    .eq(
      'id',
      reportId,
    )
    .eq(
      'member_id',
      auth.member.id,
    );

  if (reportError) {
    console.error(
      'Could not delete professional learning report:',
      reportError,
    );
  }

  revalidatePath(
    '/platform/educator/reports',
  );
}

export default async function ProfessionalLearningReportsPage({
  searchParams,
}: {
  searchParams: Promise<{
    created?: string;
    error?: string;
  }>;
}) {
  const auth =
    await getCurrentRcAuthContext();

  if (!auth) {
    redirect(
      '/member-access?returnTo=/platform/educator/reports',
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

  const query =
    await searchParams;

  const supabase =
    createRcAdminClient();

  const [
    progressResponse,
    topicsResponse,
    takeawaysResponse,
    reportsResponse,
  ] = await Promise.all([
    supabase
      .from(
        'rc_topic_progress',
      )
      .select(
        `
          topic_id,
          completed_at
        `,
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .not(
        'completed_at',
        'is',
        null,
      ),

    supabase
      .from(
        'rc_topics',
      )
      .select(
        `
          id,
          title,
          slug,
          sort_order
        `,
      )
      .order(
        'sort_order',
        {
          ascending: true,
        },
      ),

    supabase
      .from(
        'rc_learning_takeaways',
      )
      .select(
        `
          id,
          topic_id,
          takeaway_number,
          takeaway_text,
          include_in_professional_report
        `,
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .order(
        'takeaway_number',
        {
          ascending: true,
        },
      ),

    supabase
      .from(
        'rc_professional_learning_reports',
      )
      .select(
        `
          id,
          topic_id,
          report_name,
          personal_learning_note,
          file_path,
          generated_at
        `,
      )
      .eq(
        'member_id',
        auth.member.id,
      )
      .order(
        'generated_at',
        {
          ascending: false,
        },
      ),
  ]);

  if (
    progressResponse.error
  ) {
    console.error(
      'Could not load completed learning:',
      progressResponse.error,
    );
  }

  if (
    topicsResponse.error
  ) {
    console.error(
      'Could not load report topics:',
      topicsResponse.error,
    );
  }

  if (
    takeawaysResponse.error
  ) {
    console.error(
      'Could not load report takeaways:',
      takeawaysResponse.error,
    );
  }

  if (
    reportsResponse.error
  ) {
    console.error(
      'Could not load professional learning reports:',
      reportsResponse.error,
    );
  }

  const completed =
    (progressResponse.data ??
      []) as CompletedTopic[];

  const topics =
    (topicsResponse.data ??
      []) as Topic[];

  const takeaways =
    (takeawaysResponse.data ??
      []) as Takeaway[];

  const reports =
    (reportsResponse.data ??
      []) as Report[];

  const completedTopicIds =
    new Set(
      completed.map(
        (item) =>
          item.topic_id,
      ),
    );

  const completedTopics =
    topics.filter(
      (topic) =>
        completedTopicIds.has(
          topic.id,
        ),
    );

  const topicById =
    new Map(
      topics.map(
        (topic) => [
          topic.id,
          topic,
        ],
      ),
    );

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
            Your professional learning
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-5xl">
            Professional Learning Reports
          </h1>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#657B6C]">
            Create a report from a
            completed topic, choose the
            key takeaways you want
            included, and add your own
            professional learning note.
            Each saved report stays in
            your account so you can
            download it again later.
          </p>
        </section>

        {query.created ===
        '1' ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
            Your Professional Learning
            Report has been saved.
          </div>
        ) : null}

        {query.error ? (
          <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
            The report could not be
            created. Please check the
            details and try again.
          </div>
        ) : null}

        {/* CREATE REPORT */}
        <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
            Create a report
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Choose a completed topic
          </h2>

          {completedTopics.length ===
          0 ? (
            <div className="mt-6 rounded-2xl bg-[#FAF8F5] p-5 text-sm leading-6 text-[#657B6C]">
              Complete your first
              Regulator Champions topic
              before creating a
              Professional Learning
              Report.
            </div>
          ) : (
            <div className="mt-6 space-y-6">
              {completedTopics.map(
                (topic) => {
                  const topicTakeaways =
                    takeaways.filter(
                      (item) =>
                        item.topic_id ===
                        topic.id,
                    );

                  const completedRecord =
                    completed.find(
                      (item) =>
                        item.topic_id ===
                        topic.id,
                    );

                  return (
                    <article
                      key={topic.id}
                      className="rounded-3xl border border-[#E6E2DC] p-6"
                    >
                      <p className="text-xs font-black uppercase tracking-wider text-[#9A793D]">
                        Topic{' '}
                        {
                          topic.sort_order
                        }
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        {topic.title}
                      </h3>

                      {completedRecord ? (
                        <p className="mt-2 text-sm text-[#657B6C]">
                          Completed{' '}
                          {formatDate(
                            completedRecord.completed_at,
                          )}{' '}
                          · 1.5 CPD hours
                        </p>
                      ) : null}

                      <form
                        action={
                          createReport
                        }
                        className="mt-6 space-y-5"
                      >
                        <input
                          type="hidden"
                          name="topicId"
                          value={
                            topic.id
                          }
                        />

                        <label className="block">
                          <span className="mb-2 block text-sm font-bold">
                            Report name
                          </span>

                          <input
                            type="text"
                            name="reportName"
                            required
                            defaultValue={`${topic.title} – Professional Learning Report`}
                            className="min-h-14 w-full rounded-xl border border-[#D8D2C9] px-4 text-base outline-none focus:border-[#C29F60]"
                          />
                        </label>

                        {topicTakeaways.length >
                        0 ? (
                          <div>
                            <p className="text-sm font-bold">
                              Choose the
                              takeaways to
                              include
                            </p>

                            <p className="mt-1 text-xs leading-5 text-[#657B6C]">
                              These are the
                              key takeaways
                              you saved while
                              completing this
                              topic.
                            </p>

                            <div className="mt-4 space-y-3">
                              {topicTakeaways.map(
                                (
                                  takeaway,
                                ) => (
                                  <label
                                    key={
                                      takeaway.id
                                    }
                                    className="flex items-start gap-3 rounded-2xl bg-[#FAF8F5] p-4"
                                  >
                                    <input
                                      type="checkbox"
                                      name="takeawayIds"
                                      value={
                                        takeaway.id
                                      }
                                      defaultChecked={
                                        takeaway.include_in_professional_report
                                      }
                                      className="mt-1"
                                    />

                                    <span className="text-sm leading-6">
                                      <strong>
                                        Takeaway{' '}
                                        {
                                          takeaway.takeaway_number
                                        }
                                        :
                                      </strong>{' '}
                                      {
                                        takeaway.takeaway_text
                                      }
                                    </span>
                                  </label>
                                ),
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-2xl bg-[#FAF8F5] p-4 text-sm text-[#657B6C]">
                            No saved key
                            takeaways were
                            found for this
                            topic.
                          </div>
                        )}

                        <label className="block">
                          <span className="mb-2 block text-sm font-bold">
                            Personal learning
                            note
                          </span>

                          <span className="mb-3 block text-xs leading-5 text-[#657B6C]">
                            Optional. Add
                            anything you want
                            recorded about
                            what this learning
                            means for your
                            practice.
                          </span>

                          <textarea
                            name="personalLearningNote"
                            rows={5}
                            className="w-full resize-y rounded-2xl border border-[#D8D2C9] p-4 text-base outline-none focus:border-[#C29F60]"
                          />
                        </label>

                        <button
                          type="submit"
                          className="rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white"
                        >
                          Save Professional
                          Learning Report
                        </button>
                      </form>
                    </article>
                  );
                },
              )}
            </div>
          )}
        </section>

        {/* SAVED REPORTS */}
        <section>
          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
            Saved reports
          </p>

          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            Your report library
          </h2>

          {reports.length ===
          0 ? (
            <div className="mt-6 rounded-3xl border border-[#E6E2DC] bg-white p-6 text-sm text-[#657B6C]">
              You have not created any
              Professional Learning
              Reports yet.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {reports.map(
                (report) => {
                  const topic =
                    report.topic_id
                      ? topicById.get(
                          report.topic_id,
                        )
                      : null;

                  return (
                    <article
                      key={
                        report.id
                      }
                      className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm"
                    >
                      <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
                        <div>
                          <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
                            Professional
                            Learning Report
                          </p>

                          <h3 className="mt-2 text-xl font-bold">
                            {
                              report.report_name
                            }
                          </h3>

                          {topic ? (
                            <p className="mt-2 text-sm text-[#657B6C]">
                              Topic{' '}
                              {
                                topic.sort_order
                              }
                              {' · '}
                              {
                                topic.title
                              }
                            </p>
                          ) : null}

                          <p className="mt-1 text-xs text-[#657B6C]">
                            Generated{' '}
                            {formatDate(
                              report.generated_at,
                            )}
                          </p>

                          {report.personal_learning_note ? (
                            <div className="mt-4 rounded-2xl bg-[#FAF8F5] p-4">
                              <p className="text-xs font-bold uppercase tracking-wider text-[#9A793D]">
                                Personal
                                learning note
                              </p>

                              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-[#657B6C]">
                                {
                                  report.personal_learning_note
                                }
                              </p>
                            </div>
                          ) : null}
                        </div>

                        <div className="flex flex-col gap-3 lg:min-w-64">
                          <a
                            href={
                              report.file_path ||
                              `/api/rc-professional-report/${report.id}`
                            }
                            className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white"
                          >
                            Download PDF
                          </a>

                          <form
                            action={
                              renameReport
                            }
                            className="rounded-2xl border border-[#E6E2DC] p-4"
                          >
                            <input
                              type="hidden"
                              name="reportId"
                              value={
                                report.id
                              }
                            />

                            <label className="block">
                              <span className="text-xs font-bold text-[#657B6C]">
                                Rename
                              </span>

                              <input
                                type="text"
                                name="reportName"
                                required
                                defaultValue={
                                  report.report_name
                                }
                                className="mt-2 min-h-11 w-full rounded-xl border border-[#D8D2C9] px-3 text-sm outline-none focus:border-[#C29F60]"
                              />
                            </label>

                            <button
                              type="submit"
                              className="mt-3 text-xs font-extrabold text-[#8A6F3E]"
                            >
                              Save new name
                            </button>
                          </form>

                          <DeleteProfessionalReportButton
                            reportId={
                              report.id
                            }
                            reportName={
                              report.report_name
                            }
                            action={
                              deleteReport
                            }
                          />
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}