import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Professional Development for US Child Care Teams | Regulator Champions',

  description:
    'Practical professional development for US child care centers, preschool programs, directors and early childhood educators working on co-regulation, challenging behavior, participation, relationships and quality improvement.',

  alternates: {
    canonical: '/us-early-childhood-quality',
  },

  openGraph: {
    title:
      'Professional Development for US Child Care Teams | Regulator Champions',
    description:
      'Practical professional development for child care owners, directors and educators, with connections to NAEYC Early Childhood Program Standards, Developmentally Appropriate Practice and quality improvement.',
    url: '/us-early-childhood-quality',
    type: 'website',
  },
};

const QUALITY_CONNECTIONS = [
  {
    title: 'Relationships',
    text: 'Regulator Champions helps educators look closely at what happens between the adult and child during difficult moments, including tone of voice, proximity, expectations, connection and the child’s cues.',
  },
  {
    title: 'Developmentally Appropriate Practice',
    text: 'The program encourages educators to consider what is known about child development, what is known about the individual child and the social and cultural context before deciding how to respond.',
  },
  {
    title: 'Family partnerships',
    text: 'Families are encouraged to contribute what they know about the child, their routines, strengths and experiences so educators are not expected to understand difficult situations in isolation.',
  },
  {
    title: 'Program quality improvement',
    text: 'Directors can use real classroom situations to guide staff reflection, professional development conversations and practical improvement goals.',
  },
];

const DIRECTOR_PRESSURES = [
  {
    title: 'The same behaviors keep happening',
    text: 'Your team may already have completed training on behavior, trauma, sensory processing or social-emotional development, but educators are still asking what they should actually do tomorrow.',
  },
  {
    title: 'Teachers are responding differently',
    text: 'One educator comforts, another redirects, another removes the child and another tries to ignore the behavior. The child can then receive a completely different response depending on who is in the room.',
  },
  {
    title: 'Staff need practical professional development',
    text: 'Directors often need professional learning that can be used during a staff meeting, classroom discussion or coaching conversation rather than another large course that teachers struggle to finish.',
  },
  {
    title: 'You need evidence that training changed practice',
    text: 'Attendance alone does not show whether professional development changed what educators notice, discuss or do with children.',
  },
];

const PRACTICE_AREAS = [
  'Co-regulation',
  'Challenging behavior',
  'Teacher-child interactions',
  'Social-emotional development',
  'Sensory and movement needs',
  'Executive functioning',
  'Transitions and group experiences',
  'Participation and inclusion',
  'Family communication',
  'Staff reflection and professional development',
];

export default function USEarlyChildhoodQualityPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              For US child care centers and preschool programs
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              When your teachers understand the theory but still do not know what to try in the classroom.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              Regulator Champions helps child care directors and early childhood teams look underneath challenging behavior, notice what may be contributing to the moment and decide on practical changes that can actually be tried with children.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              The program was created in Australia, but the work around co-regulation, relationships, participation, development and reflective practice can be used within early childhood settings internationally.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/playbooks"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                See a Free Regulation Ladder
              </Link>

              <Link
                href="/#full-program"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                Explore Regulator Champions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                What directors are often trying to solve
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Professional development is only useful if it changes what happens in the classroom.
              </h2>
            </div>

            <div className="border-t border-[#D8CFC2]">
              {DIRECTOR_PRESSURES.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-[#D8CFC2] py-6"
                >
                  <h3 className="text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-[#53645D]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* US FRAMEWORKS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Familiar US early childhood frameworks
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              The framework language may be different, but many of the practice questions are familiar.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              NAEYC&apos;s Early Childhood Program Standards include areas such as relationships and reciprocal partnerships with families, while Developmentally Appropriate Practice provides a framework for intentional educator decision-making. Regulator Champions is not a NAEYC accreditation program, but these areas provide useful points of connection for US teams.
            </p>

            <div className="mt-7 flex flex-wrap gap-4 text-sm font-semibold">
              <a
                href="https://www.naeyc.org/resources/position-statements/early-childhood-program-standards"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#C29F60] decoration-2 underline-offset-4"
              >
                NAEYC Early Childhood Program Standards
              </a>

              <a
                href="https://www.naeyc.org/resources/position-statements/dap"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#C29F60] decoration-2 underline-offset-4"
              >
                Developmentally Appropriate Practice
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {QUALITY_CONNECTIONS.map((item) => (
              <div
                key={item.title}
                className="border-t border-[#D8CFC2] py-6"
              >
                <h3 className="text-xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-[#53645D]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DAP */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Developmentally Appropriate Practice
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Look at development, the individual child and the context before assuming the behavior is the problem.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#53645D]">
              <p>
                NAEYC describes three core considerations that inform Developmentally Appropriate Practice: commonality in children&apos;s development and learning, individuality, and the context in which development and learning occur.
              </p>

              <p>
                That fits closely with the way Regulation Ladders are used. Rather than jumping directly from a behavior to a consequence or strategy, educators are encouraged to notice the child&apos;s body, individual needs, environment, developmental demands and their own response before deciding what may be worth changing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QRIS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                QRIS and state quality systems
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Your state or local quality system may use different language.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#D8E1DC]">
              <p>
                Quality Rating and Improvement Systems are not identical across the United States. States and local systems can use different standards, rating structures and quality improvement approaches.
              </p>

              <p>
                Directors can consider where professional development, teacher-child relationships, family engagement, inclusion, classroom practice and continuous quality improvement sit within the requirements or goals that apply to their own program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICAL FOCUS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              What your team can work on
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              The topics sit inside the situations teachers are already dealing with every day.
            </h2>
          </div>

          <div className="mt-10 grid gap-x-10 sm:grid-cols-2">
            {PRACTICE_AREAS.map((area) => (
              <div
                key={area}
                className="border-t border-[#D8CFC2] py-4"
              >
                <p className="text-lg font-semibold">
                  {area}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATION LADDERS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Regulation Ladders
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Give teachers somewhere practical to start when a situation keeps repeating.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#53645D]">
                A Regulation Ladder does not tell a teacher that one behavior always means one thing. It gives the team prompts that help them widen the lens, notice patterns and decide on one practical change to try.
              </p>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                Educator, leadership and family perspectives can then be brought together so the child&apos;s behavior is not left for one teacher to solve alone.
              </p>

              <Link
                href="/playbooks"
                className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
              >
                Open the Free Regulation Ladder
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Working across countries
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                You do not need to use Australian curriculum or quality frameworks to use the program.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#53645D]">
              <p>
                I am based in Australia, so some optional pages on this website refer to Australian quality and funding systems. Those sit separately from the core Regulator Champions professional learning.
              </p>

              <p>
                US centers can use the Regulation Ladders, recordings and professional development around child development, co-regulation, behavior, sensory processing, participation and reflective practice within their own local early childhood context.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Want to see whether Regulator Champions could work for your child care team?
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
            Start with the free Regulation Ladder, or tell me what your teachers are currently finding difficult and I can explain how I would approach it.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Try the Free Regulation Ladder
            </Link>

            <a
              href="mailto:robyn@playmoveimprove.com.au?subject=US%20Child%20Care%20Regulator%20Champions%20Enquiry"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white"
            >
              Talk to Robyn
            </a>
          </div>
        </div>
      </section>

      {/* FRAMEWORK NOTE */}
      <section className="border-t border-[#E5DED4] bg-white py-9">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm leading-7 text-[#6B7772]">
            Regulator Champions is an independent professional learning program and is not affiliated with or endorsed by NAEYC or any state or local Quality Rating and Improvement System. Programs remain responsible for determining how professional development connects with their own licensing, accreditation and quality improvement requirements.
          </p>
        </div>
      </section>
    </main>
  );
}