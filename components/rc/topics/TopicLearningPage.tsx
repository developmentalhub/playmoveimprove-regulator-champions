import Link from 'next/link';

import TopicContentTracker from '@/components/rc/TopicContentTracker';
import Topic2CoreConnections from '@/components/rc/topics/topic-02/Topic2CoreConnections';
import Topic2ReflexCheck from '@/components/rc/topics/topic-02/Topic2ReflexCheck';

import type {
  Certificate,
  NextTopic,
  PrerequisiteFeedback,
  Reflection,
  Takeaway,
  Topic,
  TopicContent,
  TopicProgress,
} from '@/components/rc/topics/types';

type Props = {
  topic: Topic;
  progress: TopicProgress | null;
  takeaways: Takeaway[];
  reflection: Reflection | null;
  certificate: Certificate | null;
  prerequisiteFeedback: PrerequisiteFeedback | null;
  prerequisiteResourceUrl: string | null;
  videoItems: TopicContent[];
  resourceItems: TopicContent[];
  nextTopic: NextTopic;
  prerequisiteComplete: boolean;
  topicComplete: boolean;
  query: {
    saved?: string;
    error?: string;
  };
  completePrerequisite: (formData: FormData) => Promise<void>;
  saveTakeaways: (formData: FormData) => Promise<void>;
  saveReflection: (formData: FormData) => Promise<void>;
};

function formatMelbourneDate(value: string | null) {
  if (!value) return null;

  return new Intl.DateTimeFormat('en-AU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Australia/Melbourne',
    timeZoneName: 'short',
  }).format(new Date(value));
}

export default function TopicLearningPage({
  topic,
  progress,
  takeaways,
  reflection,
  certificate,
  prerequisiteFeedback,
  prerequisiteResourceUrl,
  videoItems,
  resourceItems,
  nextTopic,
  prerequisiteComplete,
  topicComplete,
  query,
  completePrerequisite,
  saveTakeaways,
  saveReflection,
}: Props) {
  const isTopicTwo = topic.sort_order === 2;
  const takeawayMap = new Map(
    takeaways.map((item) => [item.takeaway_number, item]),
  );

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <header className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-5xl px-5 py-5 sm:px-6">
          <Link
            href="/platform/educator/dashboard"
            className="text-sm font-extrabold text-[#87317E]"
          >
            ← Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-5 py-8 sm:px-6 sm:py-10">
        <section>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#87317E]">
            Topic {topic.sort_order}
          </p>

          <h1 className="mt-3 text-3xl font-bold text-[#232150] sm:text-5xl">
            {topic.title}
          </h1>

          {topic.why_this_matters ? (
            <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-wider text-[#87317E]">
                Why this matters
              </p>
              <p className="mt-3 text-lg leading-8 text-[#575570]">
                {topic.why_this_matters}
              </p>
            </div>
          ) : null}

          {topic.live_date ? (
            <div className="mt-5 rounded-3xl bg-[#232150] p-6 text-white">
              <p className="text-xs font-black uppercase tracking-wider text-[#DCCDA8]">
                Live coaching
              </p>
              <p className="mt-2 text-lg font-bold">
                {formatMelbourneDate(topic.live_date)}
              </p>
              <p className="mt-3 text-sm leading-6 text-white/80">
                Can&apos;t attend live? The recording will be added here afterwards.
              </p>
              {topic.zoom_url ? (
                <a
                  href={topic.zoom_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-[#232150]"
                >
                  Join Zoom session
                </a>
              ) : null}
            </div>
          ) : null}
        </section>

        <StatusMessages query={query} />

        {isTopicTwo ? (
          <Topic2ReflexCheck
            topicId={topic.id}
            topicSlug={topic.slug}
            resourceUrl={prerequisiteResourceUrl}
            complete={prerequisiteComplete}
            feedback={prerequisiteFeedback}
            saveAction={completePrerequisite}
          />
        ) : null}

        {prerequisiteComplete ? (
          <>
            <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
              <StepHeading number="1" title="Watch" complete={Boolean(progress?.video_completed)} />

              <p className="mt-4 max-w-3xl leading-7 text-[#575570]">
                Watch the webinar or recording, then capture three things you want to remember
                from the topic.
              </p>

              {videoItems.length > 0 ? (
                <div className="mt-6">
                  <TopicContentTracker topicId={topic.id} content={videoItems} />
                </div>
              ) : (
                <div className="mt-6 rounded-2xl bg-[#FAF8F5] p-5 text-sm text-[#575570]">
                  The recording has not been added yet.
                </div>
              )}

              <form action={saveTakeaways} className="mt-8 space-y-6">
                <input type="hidden" name="topicId" value={topic.id} />
                <input type="hidden" name="slug" value={topic.slug} />

                {[1, 2, 3].map((number) => {
                  const item = takeawayMap.get(number);
                  return (
                    <div key={number} className="rounded-3xl border border-[#E6E2DC] p-5">
                      <label className="block">
                        <span className="font-bold text-[#232150]">Key takeaway {number}</span>
                        <textarea
                          name={`takeaway${number}`}
                          rows={3}
                          defaultValue={item?.takeaway_text || ''}
                          className="mt-3 w-full resize-y rounded-2xl border border-[#D8D2C9] p-4 text-base outline-none focus:border-[#87317E]"
                        />
                      </label>

                      <div className="mt-4 space-y-3 text-sm">
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name={`share${number}`}
                            defaultChecked={item?.shared_with_manager ?? false}
                            className="mt-1"
                          />
                          <span>Share this takeaway with my manager</span>
                        </label>

                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name={`report${number}`}
                            defaultChecked={item?.include_in_professional_report ?? false}
                            className="mt-1"
                          />
                          <span>Include this takeaway in my Professional Learning Report</span>
                        </label>
                      </div>
                    </div>
                  );
                })}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    name="intent"
                    value="draft"
                    className="rounded-xl border border-[#232150] bg-white px-6 py-3 text-sm font-extrabold text-[#232150]"
                  >
                    Save draft
                  </button>
                  <button
                    type="submit"
                    name="intent"
                    value="complete"
                    className="rounded-xl bg-[#232150] px-6 py-3 text-sm font-extrabold text-white"
                  >
                    Complete this step
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
              <StepHeading number="2" title="Review" complete={Boolean(progress?.resources_reviewed)} />
              <p className="mt-4 max-w-3xl leading-7 text-[#575570]">
                Review the practical resources for this topic. Your progress is recorded
                automatically as the resources appear on screen.
              </p>

              <div className="mt-6">
                {resourceItems.length > 0 ? (
                  <TopicContentTracker topicId={topic.id} content={resourceItems} />
                ) : (
                  <div className="rounded-2xl bg-[#FAF8F5] p-5 text-sm text-[#575570]">
                    There are no additional resources attached to this topic yet.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
              <StepHeading number="3" title="Reflect" complete={Boolean(progress?.reflection_completed)} />
              <p className="mt-4 max-w-3xl leading-7 text-[#575570]">
                This is your professional reflection. You can return and edit it later.
              </p>

              <form action={saveReflection} className="mt-7 space-y-6">
                <input type="hidden" name="topicId" value={topic.id} />
                <input type="hidden" name="slug" value={topic.slug} />

                <ReflectionField
                  label={topic.reflection_question || 'What stood out to you from this topic?'}
                  name="mainReflection"
                  defaultValue={reflection?.main_reflection || ''}
                />
                <ReflectionField
                  label="What will you try?"
                  name="whatWillYouTry"
                  defaultValue={reflection?.what_will_you_try || ''}
                />
                <ReflectionField
                  label="What will you look for?"
                  name="whatWillYouLookFor"
                  defaultValue={reflection?.what_will_you_look_for || ''}
                />
                <ReflectionField
                  label="What evidence could you collect from this practice change?"
                  name="evidence"
                  defaultValue={reflection?.evidence_you_could_collect || ''}
                />

                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    name="intent"
                    value="draft"
                    className="rounded-xl border border-[#232150] bg-white px-6 py-3 text-sm font-extrabold text-[#232150]"
                  >
                    Save reflection draft
                  </button>
                  <button
                    type="submit"
                    name="intent"
                    value="complete"
                    className="rounded-xl bg-[#232150] px-6 py-3 text-sm font-extrabold text-white"
                  >
                    Complete reflection
                  </button>
                </div>
              </form>
            </section>

            <section className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8">
              <StepHeading number="4" title="Certificate" complete={topicComplete} />

              {topicComplete ? (
                <>
                  <h2 className="mt-5 text-2xl font-bold text-[#232150]">You did it!</h2>
                  <p className="mt-3 leading-7 text-[#575570]">
                    Reflection complete. Your certificate is ready to download.
                  </p>
                  <a
                    href={`/api/rc-certificate/${topic.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex rounded-xl bg-[#232150] px-6 py-3 text-sm font-extrabold text-white"
                  >
                    {certificate?.certificate_file_path
                      ? 'Download certificate'
                      : 'Generate certificate'}
                  </a>
                  {nextTopic ? (
                    <Link
                      href={`/platform/educator/topics/${nextTopic.slug}`}
                      className="ml-3 mt-5 inline-flex rounded-xl border border-[#232150] px-6 py-3 text-sm font-extrabold text-[#232150]"
                    >
                      Start next topic
                    </Link>
                  ) : null}
                </>
              ) : (
                <div className="mt-5 rounded-2xl bg-[#FAF8F5] p-5 text-sm leading-6 text-[#575570]">
                  Complete the webinar takeaways, review the resources and submit your reflection
                  to unlock this topic certificate.
                </div>
              )}
            </section>

            {isTopicTwo ? <Topic2CoreConnections /> : null}
          </>
        ) : (
          <section className="rounded-4xl border border-[#D8D4E4] bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
              Topic 2 learning
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#232150]">
              Complete the reflexes and regulation check first
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-[#575570]">
              Once you save the required observations above, the webinar, practical resources,
              reflection and certificate steps will appear here.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

function StatusMessages({ query }: { query: { saved?: string; error?: string } }) {
  return (
    <>
      {query.saved === 'prerequisite' ? (
        <SuccessBox text="Your reflexes and regulation observations have been saved. You can now continue with Topic 2." />
      ) : null}
      {query.error === 'prerequisite' ? (
        <ErrorBox text="Please complete both reflection questions before continuing." />
      ) : null}
      {query.saved === 'takeaways-draft' ? (
        <SuccessBox text="Your takeaway draft has been saved. You can come back and finish it later." />
      ) : null}
      {query.saved === 'takeaways' ? (
        <SuccessBox text="Your three key takeaways have been saved and this step is complete." />
      ) : null}
      {query.saved === 'reflection-draft' ? (
        <SuccessBox text="Your reflection draft has been saved. You can return and keep working on it later." />
      ) : null}
      {query.saved === 'reflection' ? (
        <SuccessBox text="Reflection complete. Your certificate is ready once all topic steps are complete." />
      ) : null}
      {query.error === 'takeaways' ? (
        <ErrorBox text="Please complete all three key takeaways." />
      ) : null}
      {query.error === 'reflection' ? (
        <ErrorBox text="Please complete each reflection question before submitting." />
      ) : null}
    </>
  );
}

function StepHeading({
  number,
  title,
  complete,
}: {
  number: string;
  title: string;
  complete: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#232150] text-sm font-black text-white">
          {number}
        </span>
        <h2 className="text-2xl font-bold text-[#232150]">{title}</h2>
      </div>
      <span className="rounded-full bg-[#F3F0EB] px-3 py-1 text-xs font-bold text-[#575570]">
        {complete ? 'Complete' : 'Not complete'}
      </span>
    </div>
  );
}

function ReflectionField({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-bold text-[#232150]">{label}</span>
      <textarea
        name={name}
        rows={4}
        defaultValue={defaultValue}
        className="w-full resize-y rounded-2xl border border-[#D8D2C9] p-4 text-base outline-none focus:border-[#87317E]"
      />
    </label>
  );
}

function SuccessBox({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
      {text}
    </div>
  );
}

function ErrorBox({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
      {text}
    </div>
  );
}
