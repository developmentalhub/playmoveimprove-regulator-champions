import type { PrerequisiteFeedback } from '@/components/rc/topics/types';

type Props = {
  topicId: string;
  topicSlug: string;
  resourceUrl: string | null;
  complete: boolean;
  feedback: PrerequisiteFeedback | null;
  saveAction: (formData: FormData) => Promise<void>;
};

export default function Topic2ReflexCheck({
  topicId,
  topicSlug,
  resourceUrl,
  complete,
  feedback,
  saveAction,
}: Props) {
  return (
    <section className="overflow-hidden rounded-4xl border border-[#87317E] bg-white shadow-sm">
      <div className="h-2 bg-[#87317E]" />

      <div className="p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#87317E]">
              Before you begin
            </p>

            <h2 className="mt-2 text-2xl font-bold text-[#232150]">
              Reflexes and regulation check
            </h2>

            <p className="mt-4 max-w-3xl leading-7 text-[#575570]">
              Before moving into mat time strategies, first consider whether reflex patterns,
              postural control or regulation demands may be contributing to a child&apos;s
              difficulty participating. This is an observation and reflection task, not a
              diagnosis.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#F2E7F0] px-3 py-1 text-xs font-bold text-[#87317E]">
            {complete ? 'Complete' : 'Required'}
          </span>
        </div>

        {resourceUrl ? (
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#D8D4E4] bg-[#F7F6FA]">
            <div className="border-b border-[#D8D4E4] bg-white px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#6D6A7F]">
                Reflexes and Regulation Before Reading
              </p>
            </div>

            <iframe
              src={resourceUrl}
              title="Reflexes and Regulation Before Reading"
              className="h-[70vh] min-h-130 w-full bg-white"
            />
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
            The reflexes and regulation guide is not attached to this topic yet.
          </div>
        )}

        <form action={saveAction} className="mt-6 space-y-5">
          <input type="hidden" name="topicId" value={topicId} />
          <input type="hidden" name="slug" value={topicSlug} />

          <div className="rounded-3xl border border-[#D8D4E4] bg-[#F7F6FA] p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
              What did you notice?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#575570]">
              After looking at the children&apos;s reflex movements, what stood out to you? You
              might notice differences in balance, head position, arm movements, sitting posture,
              crossing the midline, stability or the amount of effort a child seems to use.
            </p>
            <textarea
              name="reflexObservations"
              rows={5}
              required
              defaultValue={feedback?.reflex_observations || ''}
              className="mt-4 w-full resize-y rounded-2xl border border-[#CFCADA] bg-white p-4 text-base text-[#232150] outline-none focus:border-[#87317E]"
              placeholder="Write what you noticed..."
            />
          </div>

          <div className="rounded-3xl border border-[#D8D4E4] bg-[#F7F6FA] p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
              Has this changed the way you think about mat time?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#575570]">
              Think about where mat time happens, how long children are expected to stay in one
              position, and whether children could participate while sitting on a chair, kneeling,
              lying on their tummy, leaning against support or changing position. What might you
              do differently now?
            </p>
            <textarea
              name="matTimeThinking"
              rows={5}
              required
              defaultValue={feedback?.mat_time_thinking || ''}
              className="mt-4 w-full resize-y rounded-2xl border border-[#CFCADA] bg-white p-4 text-base text-[#232150] outline-none focus:border-[#87317E]"
              placeholder="Write how this has changed your thinking..."
            />
          </div>

          <div className="rounded-3xl border border-[#D8D4E4] bg-white p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-[0.14em] text-[#87317E]">
              What would you like to ask Robyn?
            </p>
            <p className="mt-2 text-sm leading-6 text-[#575570]">
              This one is optional. Add anything you noticed that you would like me to explain
              further during the live session or in a future resource.
            </p>
            <textarea
              name="questionForRobyn"
              rows={4}
              defaultValue={feedback?.question_for_robyn || ''}
              className="mt-4 w-full resize-y rounded-2xl border border-[#CFCADA] bg-white p-4 text-base text-[#232150] outline-none focus:border-[#87317E]"
              placeholder="Optional question for Robyn..."
            />
          </div>

          <div className="rounded-2xl bg-[#F2E7F0] p-5">
            <p className="font-bold text-[#232150]">
              {complete ? 'Update your observations' : 'Complete this task before continuing'}
            </p>
            <p className="mt-2 text-sm leading-6 text-[#575570]">
              Your first two responses are required. Your question for Robyn is optional. You can
              return later and update what you noticed.
            </p>
            <button
              type="submit"
              disabled={!resourceUrl}
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#232150] px-6 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {complete ? 'Update my observations' : 'Save my observations and continue'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
