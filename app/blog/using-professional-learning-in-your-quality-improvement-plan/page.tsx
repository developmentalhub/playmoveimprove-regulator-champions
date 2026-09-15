import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Using Professional Learning in Your Quality Improvement Plan',
  description:
    'A practical early childhood guide to connecting professional learning, educator reflection and everyday practice with your Quality Improvement Plan.',
  alternates: {
    canonical:
      '/blog/using-professional-learning-in-your-quality-improvement-plan',
  },
};

export default function ProfessionalLearningQIPArticlePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-extrabold text-[#9A793D]">
          Quality Improvement Plan and professional learning
        </p>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Using professional learning within your Quality Improvement Plan
        </h1>

        <p className="mt-6 text-xl leading-relaxed text-[#53645D]">
          Professional learning and a Quality Improvement Plan can easily become two separate things. Educators attend training, collect certificates and discuss new ideas, while the QIP sits somewhere else recording priorities, goals and evidence of improvement.
        </p>

        <p className="mt-5 text-xl leading-relaxed text-[#53645D]">
          But when professional learning is connected to something a team is genuinely trying to improve, the two can support each other much more naturally.
        </p>

        <p className="mt-5 text-xl font-extrabold leading-relaxed">
          The useful question is not simply “What training have we completed?” It is “What are we learning, trying and noticing because of it?”
        </p>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Start with something the team is actually finding difficult
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Quality improvement does not always need to begin with a completely new project.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            The most meaningful priorities may already be appearing in staff conversations. Perhaps transitions repeatedly become chaotic. Educators are unsure how to respond when children become overwhelmed. Group experiences are becoming difficult. Families and educators are interpreting the same behaviour differently.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Those recurring situations can provide a genuine reason for professional learning rather than choosing training first and trying to connect it to the QIP afterwards.
          </p>
        </section>

        <section className="mt-14 border-y border-[#D8CFC2] py-10">
          <h2 className="text-3xl font-extrabold leading-tight">
            Move from attendance to evidence of changed thinking
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Recording that educators attended professional development tells part of the story, but not whether anything changed in practice.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            More useful evidence may come from what happens afterwards. Educators begin noticing earlier body cues. A routine is adjusted. The team changes how they support a difficult transition. Staff conversations become more reflective and less focused on finding one quick strategy.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Those small changes can show how professional learning is becoming part of everyday practice.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Reflection can be simple and still be useful
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Reflection does not need to become another long piece of paperwork.
          </p>

          <div className="mt-8 border-t border-[#D8CFC2]">
            {[
              'What were we noticing before we changed anything?',
              'What did we try?',
              'What changed in the child, environment or interaction?',
              'What did educators notice that they had not noticed before?',
              'What still feels difficult?',
              'What should we keep, change or explore next?',
            ].map((question) => (
              <div
                key={question}
                className="border-b border-[#D8CFC2] py-5"
              >
                <p className="text-lg font-semibold leading-relaxed text-[#29483F]">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 bg-[#F1ECE4] p-7 sm:p-9">
          <h2 className="text-3xl font-extrabold leading-tight">
            Professional learning can support several areas of quality at once
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            A professional learning focus on regulation may begin with behaviour, but the improvement work can quickly connect with relationships, environments, program decisions, inclusion, family communication and leadership.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            For example, a team exploring difficult transitions may begin by looking at children&apos;s regulation, then notice that waiting times are too long, the environment becomes crowded, educators use different expectations and families need clearer information about the routine.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            One genuine practice issue can therefore lead to much richer quality improvement than completing unrelated activities simply to fill a plan.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Educator capacity can become part of the improvement goal
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Sometimes the improvement is not only about changing a routine or environment. It is also about strengthening the way educators think.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            A service may want educators to become more confident at recognising regulation cues, discussing behaviour without immediately labelling it, reflecting on adult responses, or explaining why they are making a particular adjustment.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Those are meaningful capability goals because they can continue influencing practice long after one training session has finished.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Regulator Champions can sit inside that reflective process
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Regulator Champions is designed to help teams work through recurring early childhood situations rather than complete professional learning in isolation from practice.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Regulation Ladders give educators, managers and families practical prompts for looking at one situation from different perspectives. Teams can then try an adjustment, observe what changes and bring the learning back into reflection and planning.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            That makes it easier for professional learning to become part of an ongoing quality improvement conversation rather than something that finishes when the webinar ends.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/nqs-mapping"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
            >
              Explore NQS and QIP Mapping
            </Link>

            <Link
              href="/playbooks"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-7 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Try the Free Regulation Ladder
            </Link>
          </div>
        </section>

        <section className="mt-14 border-t border-[#D8CFC2] pt-10">
          <h2 className="text-2xl font-extrabold">
            Related reading
          </h2>

          <div className="mt-6 space-y-4">
            <Link
              href="/blog/professional-development-that-changes-early-childhood-practice"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              Professional development that changes early childhood practice
            </Link>

            <Link
              href="/blog/what-does-educator-capacity-building-mean-in-early-childhood"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              What educator capacity building actually means
            </Link>

            <Link
              href="/early-childhood-professional-development"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              Early childhood professional development
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}