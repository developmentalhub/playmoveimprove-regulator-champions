import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Preparing Educators for 3-Year-Old Preschool in South Australia',
  description:
    'Practical professional learning considerations for South Australian early childhood teams preparing for the rollout of universal 3-year-old preschool.',
  alternates: {
    canonical:
      '/blog/preparing-educators-for-3-year-old-preschool-south-australia',
  },
};

export default function PreparingEducatorsForThreeYearOldPreschoolPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-extrabold text-[#9A793D]">
          South Australia early childhood professional development
        </p>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          Preparing educators for 3-year-old preschool in South Australia
        </h1>

        <p className="mt-6 text-xl leading-relaxed text-[#53645D]">
          South Australia has begun the staged rollout of universal preschool for 3-year-olds, with government preschools progressively joining the rollout from 2026 through to 2032.
        </p>

        <p className="mt-5 text-xl leading-relaxed text-[#53645D]">
          For early childhood teams, this is not only about having more children or changing enrolment arrangements. It also creates an opportunity to think carefully about what younger children may need from environments, routines, relationships and educator expectations.
        </p>

        <p className="mt-5 text-xl font-extrabold leading-relaxed">
          A three-year-old may be capable of far more than we sometimes expect, but they may also need us to rethink how much waiting, language, sitting, shifting and self-regulation we are asking for.
        </p>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Younger children can change what educators need to notice
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            A younger cohort can bring different developmental needs into routines that may already feel familiar to a team.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Transitions can feel bigger. Waiting can be harder. Language may not yet be enough to express frustration or uncertainty. Some children may need much more movement, repetition, predictability or adult support to participate.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            This does not mean lowering every expectation. It means becoming more thoughtful about whether the expectation fits the child&apos;s current developmental capacity.
          </p>
        </section>

        <section className="mt-14 border-y border-[#D8CFC2] py-10">
          <h2 className="text-3xl font-extrabold leading-tight">
            Participation may look different at three
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Early childhood participation is sometimes judged too narrowly. A child who is moving during group time may still be listening. A child standing at the edge of an experience may be participating through observation before they are ready to join.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Younger children may need more opportunities to participate through movement, imitation, short bursts of attention, hands-on experiences and repeated exposure.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            When teams become more flexible in how they recognise participation, children do not have to prove they are learning by holding their bodies still for longer than they can manage.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Transitions deserve particular attention
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Moving from home into preschool, stopping preferred play, packing up, joining a group or shifting between indoor and outdoor spaces can place significant demands on a young child.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Rather than only focusing on what happens once a transition becomes difficult, teams can begin noticing the smaller parts of the routine that may be increasing pressure.
          </p>

          <div className="mt-8 border-t border-[#D8CFC2]">
            {[
              'How much warning does the child receive before the transition?',
              'How much waiting is built into the routine?',
              'Are several instructions being given at once?',
              'Does the environment suddenly become louder or more crowded?',
              'Is the child being asked to leave something they are deeply engaged in?',
              'Could movement or a purposeful job help bridge one part of the day to the next?',
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
            Co-regulation becomes even more important
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Three-year-olds are still developing the capacity to manage strong feelings, impulses, frustration and changing expectations.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Adults remain an important part of that regulation process. Voice, pace, proximity, predictability and the way we respond when a child is struggling can all influence how manageable the moment feels.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Co-regulation does not mean removing boundaries or preventing children from ever becoming upset. It means holding safety and expectations while also helping the child move through a demand they may not yet be able to manage independently.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            The environment may need to do more of the work
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            When children are younger, we cannot rely only on verbal reminders and instructions.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Room layout, access to movement, predictable routines, quieter spaces, visual information, opportunities for meaningful carrying and helping, and the way transitions are organised can all reduce the amount of regulation we expect children to generate on demand.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Sometimes changing the environment is more useful than asking the child to keep changing themselves.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Professional learning should help teams prepare before difficulties become patterns
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            The introduction of younger children gives services an opportunity to look at current routines before deciding that a child&apos;s difficulty is simply a behaviour problem.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Teams can ask whether expectations are developmentally appropriate, whether environments support regulation, whether educators have a shared language for co-regulation and whether families are being included in conversations about what helps their child.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Those conversations can become part of broader professional learning and quality improvement rather than only beginning after a difficult situation has become entrenched.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Where Regulator Champions may fit
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Regulator Champions helps early childhood teams think through recurring situations using educator, manager and family perspectives.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Teams can use the Regulation Ladders to look more closely at transitions, participation, adult responses, environments and the body cues appearing before behaviour escalates.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Some South Australian government preschools involved in the 2026 rollout have received one-off readiness grants that can support areas including professional development. Funding conditions vary, so services should confirm their own eligibility and permitted expenditure before purchasing.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/south-australia-early-childhood-professional-development"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
            >
              South Australia Professional Development Information
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
            Current South Australian information
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[#53645D]">
            The rollout and funding arrangements will continue to change over time, so services should confirm current information directly with the South Australian Department for Education.
          </p>

          <div className="mt-6 space-y-4">
            <a
              href="https://www.education.sa.gov.au/preschool-for-3-year-olds"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              South Australia: Preschool for 3-year-olds
            </a>

            <a
              href="https://www.education.sa.gov.au/department/media-centre/our-news/infrastructure-works-across-south-australian-preschools-ahead-of-three-year-old-rollout"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              2026 preschool readiness grants
            </a>
          </div>
        </section>

        <section className="mt-14 border-t border-[#D8CFC2] pt-10">
          <h2 className="text-2xl font-extrabold">
            Related reading
          </h2>

          <div className="mt-6 space-y-4">
            <Link
              href="/blog/co-regulation-in-a-busy-early-childhood-room"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              What co-regulation looks like in a busy early childhood room
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