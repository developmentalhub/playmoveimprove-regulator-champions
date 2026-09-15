import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'NQS & QIP Reflection for Early Childhood Services | Regulator Champions',

  description:
    'Practical NQS and QIP reflection prompts for early childhood services working on co-regulation, relationships, participation, educator capability and continuous improvement.',

  alternates: {
    canonical: '/nqs-mapping',
  },

  openGraph: {
    title:
      'NQS & QIP Reflection | Regulator Champions',
    description:
      'Connect Regulator Champions professional learning with relevant National Quality Standard areas and everyday early childhood practice.',
    url: '/nqs-mapping',
    type: 'website',
  },
};

const NQS_AREAS = [
  {
    qa: 'Quality Area 1',
    title: 'Educational program and practice',
    focus: 'Critical reflection and responsive practice',
    element: 'Element 1.3.2 · Critical reflection',
    question:
      'What are we noticing about children’s participation, learning and development, and how is that changing what we do?',
    connection:
      'Regulator Champions encourages educators to pause before reacting, consider what may be happening underneath behaviour and reflect on whether routines, expectations or environmental demands are supporting participation.',
    examples: [
      'Reflect on what happened before a difficult moment rather than documenting behaviour alone.',
      'Notice patterns across transitions, group experiences and high-pressure parts of the day.',
      'Record what educators changed and what happened afterwards.',
    ],
    qipPrompt:
      'How is our team using observations and critical reflection to change everyday practice when children are finding participation difficult?',
  },
  {
    qa: 'Quality Area 2',
    title: 'Children’s health and safety',
    focus: 'Wellbeing, comfort and responsive support',
    element: 'Wellbeing and comfort',
    question:
      'How do our everyday responses support children to feel safe, settled and appropriately supported when they are overwhelmed or distressed?',
    connection:
      'Regulator Champions helps educators notice earlier body-based signs of stress, sensory overload, shutdown and escalating distress so support can be considered before the situation becomes more difficult.',
    examples: [
      'Notice early signs that a child may be becoming overwhelmed.',
      'Review whether adult pace, voice, proximity or demands are increasing pressure.',
      'Discuss how comfort, safeguarding and professional boundaries can sit alongside each other.',
    ],
    qipPrompt:
      'How consistently do educators recognise and respond to children’s early signs of distress, overload or reduced capacity?',
  },
  {
    qa: 'Quality Area 5',
    title: 'Relationships with children',
    focus: 'Responsive and meaningful interactions',
    element: 'Element 5.1.1 · Positive educator to child interactions',
    question:
      'What does connection look like when a child is having difficulty coping?',
    connection:
      'A central focus of Regulator Champions is helping educators remain thoughtful and relational during difficult moments rather than relying only on correction, distraction or repeated instructions.',
    examples: [
      'Consider body position, tone of voice and how many words are being used.',
      'Respond to distress without assuming every behaviour is deliberate non-compliance.',
      'Reflect on whether children experience educators as available and predictable when things become difficult.',
    ],
    qipPrompt:
      'How do our interactions maintain connection and dignity when children are dysregulated, distressed or struggling to participate?',
  },
  {
    qa: 'Quality Area 6',
    title: 'Collaborative partnerships with families and communities',
    focus: 'Continuity between home and the service',
    element: 'Partnerships with families',
    question:
      'How are families helping us understand what a child may be communicating?',
    connection:
      'Regulator Champions encourages teams to move beyond labels and gather useful information about routines, sensory preferences, separation, recovery and what families are noticing outside the service.',
    examples: [
      'Ask families what they notice before and after difficult transitions.',
      'Share observations without presenting assumptions as facts.',
      'Look for cues and supports that may be useful across home and the service.',
    ],
    qipPrompt:
      'How are family observations informing the way we understand and support children during challenging routines or transitions?',
  },
  {
    qa: 'Quality Area 7',
    title: 'Governance and leadership',
    focus: 'Professional learning and continuous improvement',
    element: 'Leadership and professional development',
    question:
      'Can we see evidence that professional learning is changing what happens in the room?',
    connection:
      'Regulator Champions gives directors and educational leaders shared language for team reflection, practice conversations and implementation rather than professional learning ending when a webinar finishes.',
    examples: [
      'Bring a real room situation into team reflection meetings.',
      'Record what the team noticed, what changed and what will be reviewed.',
      'Return to practice over time instead of treating professional learning as a one-off event.',
    ],
    qipPrompt:
      'How are leaders supporting educators to translate professional learning into observable changes in everyday practice?',
  },
];

export default function NqsMappingPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              National Quality Standard and QIP reflection
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Show how professional learning is changing everyday practice.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              Regulator Champions helps early childhood teams move beyond completing professional learning and start noticing, discussing and changing what actually happens in the room.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#BFD0C8]">
              This page is designed for services working within Australia&apos;s National Quality Framework and can help directors and educational leaders connect that work with relevant National Quality Standard areas and their Quality Improvement Plan.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/playbooks"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                See the Free Regulation Ladder
              </Link>

              <Link
                href="/#full-program"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Regulator Champions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNATIONAL PATH */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-3xl text-sm leading-7 text-[#53645D]">
              Looking at Regulator Champions from the United States? We have a separate page explaining connections with NAEYC, Developmentally Appropriate Practice and state quality improvement systems.
            </p>

            <Link
              href="/us-early-childhood-quality"
              className="shrink-0 text-sm font-extrabold text-[#1C3B34] underline decoration-[#C29F60] decoration-2 underline-offset-4"
            >
              View US quality connections
            </Link>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="bg-[#FAF5EC] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <h2 className="text-xl font-extrabold text-[#1C3B34]">
              Reflection support, not a compliance guarantee
            </h2>

            <p className="mt-3 max-w-4xl text-base leading-7 text-[#53645D]">
              Every service remains responsible for its own National Quality Framework obligations, documentation and Quality Improvement Plan. These examples are designed to support professional reflection and help teams notice where Regulator Champions learning may genuinely connect with their own improvement priorities.
            </p>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Beyond attendance certificates
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                The evidence is in what your team starts doing differently.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#53645D]">
              <p>
                A professional learning certificate can show that an educator attended something. It cannot show what they noticed the next morning when a child froze at drop-off, what the team changed when group time repeatedly became difficult, or whether an educator recognised that a quiet child was actually becoming overwhelmed.
              </p>

              <p>
                Those are the conversations where professional learning becomes useful for continuous improvement. A team can take one real situation, consider what was happening for the child, educator and environment, make one practical change and then return to whether it helped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY AREAS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Five useful places to reflect
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Connect the learning with practice your service is already trying to improve.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              You do not need to force Regulator Champions into every Quality Area. Start with the parts of your QIP and everyday practice where regulation, relationships, participation and educator capability are genuinely relevant.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {NQS_AREAS.map((area) => (
              <article
                key={area.qa}
                className="border-t border-[#D8CFC2] pt-8"
              >
                <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
                  <div>
                    <p className="text-sm font-extrabold text-[#9A793D]">
                      {area.qa}
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold leading-tight">
                      {area.title}
                    </h3>

                    <p className="mt-3 font-semibold text-[#657B6C]">
                      {area.focus}
                    </p>

                    <p className="mt-2 text-sm text-[#6A7873]">
                      {area.element}
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-extrabold leading-8">
                      {area.question}
                    </p>

                    <p className="mt-4 text-base leading-7 text-[#53645D]">
                      {area.connection}
                    </p>

                    <div className="mt-6 border-y border-[#D8CFC2]">
                      {area.examples.map((example) => (
                        <p
                          key={example}
                          className="border-b border-[#D8CFC2] py-3 text-sm leading-6 text-[#53645D]"
                        >
                          {example}
                        </p>
                      ))}
                    </div>

                    <div className="mt-6 border-l-4 border-[#C29F60] bg-[#FAF5EC] px-5 py-4">
                      <p className="text-sm font-extrabold text-[#9A793D]">
                        QIP reflection question
                      </p>

                      <p className="mt-2 text-base font-semibold leading-7 text-[#1C3B34]">
                        {area.qipPrompt}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REFLECTION CYCLE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Keep the evidence practical
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Notice. Discuss. Try. Review.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                Continuous improvement does not need another complicated form. Start with a moment your educators actually experienced.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              <ReflectionRow
                title="Notice"
                text="What did we observe in the child, educator and environment?"
              />

              <ReflectionRow
                title="Discuss"
                text="What might have been contributing to what happened?"
              />

              <ReflectionRow
                title="Try"
                text="What small practice change could we make next time?"
              />

              <ReflectionRow
                title="Review"
                text="What changed, what did not, and what have we learned?"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING PATHWAYS */}
      <section className="bg-[#FAF5EC] py-14">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Looking at funding as well?
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                Keep the quality reflection and funding decision connected to the same identified need.
              </h2>
            </div>

            <div className="space-y-4">
              <Link
                href="/school-readiness-funding"
                className="block border-t border-[#D8CFC2] py-4 text-lg font-extrabold text-[#1C3B34]"
              >
                School Readiness Funding
              </Link>

              <Link
                href="/kindy-uplift"
                className="block border-t border-[#D8CFC2] py-4 text-lg font-extrabold text-[#1C3B34]"
              >
                Kindy Uplift
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Start with one situation your team keeps getting stuck on.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
            The free Regulation Ladder gives your team a practical example of how to look underneath a difficult moment before deciding what to try next.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Open the Free Regulation Ladder
            </Link>

            <Link
              href="/#full-program"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white"
            >
              Explore the Full Program
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ReflectionRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-[#D8CFC2] py-6">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-2 text-base leading-7 text-[#53645D]">
        {text}
      </p>
    </div>
  );
}