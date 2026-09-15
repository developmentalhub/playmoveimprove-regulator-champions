import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'When Regulation Training Hasn’t Changed Practice | Early Childhood',
  description:
    'What to do when your early childhood team has already completed regulation training but the same behaviour challenges keep returning.',
  alternates: {
    canonical:
      '/blog/regulation-training-but-same-behaviour',
  },
};

export default function RegulationTrainingSameBehaviourPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-extrabold text-[#9A793D]">
          Early childhood regulation and professional learning
        </p>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          When your team has already done regulation training, but the same problems keep returning
        </h1>

        <p className="mt-6 text-xl leading-relaxed text-[#53645D]">
          Most early childhood teams I work with are not starting from zero. Educators have often already completed training in behaviour, trauma, sensory processing, emotional regulation or co-regulation, and they can usually explain the theory quite well.
        </p>

        <p className="mt-5 text-xl leading-relaxed text-[#53645D]">
          The difficulty appears later, when a child is biting again, running during group time, becoming overwhelmed at drop-off, refusing to join a routine, or escalating even though the strategy that worked yesterday is being used again today.
        </p>

        <p className="mt-5 text-xl font-extrabold leading-relaxed">
          That is often not a knowledge problem. It is a decision-making problem.
        </p>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Knowing the theory is different from making a decision in the room
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            It is one thing to understand that children need co-regulation. It is another to decide what co-regulation looks like when one child is screaming, another needs help, a parent is waiting at the door and the room is already noisy.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            The educator may know the words sensory overload, emotional regulation or connection, but still be left wondering whether to stay close, reduce the demand, offer movement, change the environment, give the child more time or step in for safety.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            This is where professional learning can become disconnected from practice. The educator remembers the concept, but still has to interpret a complex situation in real time.
          </p>
        </section>

        <section className="mt-14 border-y border-[#D8CFC2] py-10">
          <h2 className="text-3xl font-extrabold leading-tight">
            The same behaviour can have very different things happening underneath it
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            A child running away from group time may need movement, may be avoiding an overwhelming environment, may not yet have the attention capacity being expected, or may simply be more engaged elsewhere.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            A child throwing objects may be frustrated, highly aroused, exploring a play schema, seeking sensory input, trying to communicate, or responding to a demand that currently feels too difficult.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            This does not mean unsafe behaviour should be ignored or every behaviour should be explained away as regulation. It means educators need enough space to notice what is happening before deciding what the response should be.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            A more useful question is often: what are we noticing?
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Before reaching for another strategy, I want teams to slow the situation down and look at the child, the environment and the adult response together.
          </p>

          <div className="mt-8 border-t border-[#D8CFC2]">
            {[
              'What was happening just before this became difficult?',
              'What is the child’s movement, posture, voice or engagement telling us?',
              'What demand is this moment placing on the child?',
              'Is the environment adding noise, crowding, waiting or pressure?',
              'What is the adult nervous system communicating through pace, tone and proximity?',
              'What is one thing we could change and then observe?',
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
            Professional development becomes more useful when it follows the problems educators are already having
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            I would rather an educator take one idea into the room, try it, notice what happens and come back with a question than complete another hour of content that never becomes part of practice.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            That might mean discussing one difficult drop-off in a staff meeting, looking at one transition that repeatedly becomes chaotic, or noticing how the room changes when expectations, movement or adult pace change.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            The goal is not for every educator to respond in exactly the same way. The goal is for the team to develop a more consistent way of noticing, reflecting and deciding what may be worth trying next.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            This is the gap Regulator Champions is designed to support
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Regulator Champions is not built around asking educators to memorise one more set of strategies. The Regulation Ladders help teams look at recurring situations through educator, manager and family perspectives so the adults around the child have a practical place to begin.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Teams can then use recordings, questions and implementation support when they need to go deeper.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/director-review"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-7 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Tell Me What Your Team Is Finding Difficult
            </Link>
          </div>
        </section>

        <section className="mt-14 border-t border-[#D8CFC2] pt-10">
          <h2 className="text-2xl font-extrabold">
            Related professional learning
          </h2>

          <div className="mt-6 space-y-4">
            <Link
              href="/co-regulation-early-childhood"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              Co-regulation in early childhood
            </Link>

            <Link
              href="/emotional-regulation-early-childhood"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              Emotional regulation in early childhood
            </Link>

            <Link
              href="/educator-capacity-building"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              Educator capacity building
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