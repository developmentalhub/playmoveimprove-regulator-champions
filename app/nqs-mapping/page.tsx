import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'NQS & QIP Reflection for Early Childhood Services | Regulator Champions',

  description:
    'Explore how Regulator Champions can support early childhood services to reflect on co-regulation, relationships, educator practice and continuous improvement across relevant National Quality Standard areas.',

  alternates: {
    canonical: '/nqs-mapping',
  },

  openGraph: {
    title:
      'NQS & QIP Reflection | Regulator Champions',
    description:
      'Practical reflection prompts connecting Regulator Champions professional learning with relevant National Quality Standard quality areas and everyday early childhood practice.',
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
      'Regulator Champions encourages educators to pause before reacting, examine what may be happening underneath behaviour and reflect on whether routines, expectations or environmental demands are supporting participation.',
    examples: [
      'Reflect on what happened before a difficult moment rather than recording behaviour alone.',
      'Notice patterns across transitions, group experiences and high-pressure parts of the day.',
      'Document what educators changed and what happened afterwards.',
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
      'Regulator Champions builds educator confidence around recognising body-based signs of stress, sensory overload, shutdown and escalation so support can be considered earlier.',
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
      'Consider body position, tone of voice and the number of words being used.',
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
      'Look for consistent cues and supports that can travel between home and the service.',
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
      'Regulator Champions gives directors and educational leaders a shared language for team reflection, practice conversations and implementation rather than professional learning ending when a webinar finishes.',
    examples: [
      'Bring a real room scenario into team reflection meetings.',
      'Record what the team noticed, what was changed and what will be reviewed.',
      'Revisit practice over time instead of treating professional learning as a one-off event.',
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
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-[#E4C98E]">
              NQS & QIP reflection
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Show how professional learning is changing everyday practice.
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Regulator Champions is designed to help early childhood teams
              move from completing professional learning to actually noticing,
              discussing and changing what happens in the room.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              This page can help directors and educational leaders identify
              connections between that work, relevant National Quality Standard
              areas and their own service reflection.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                View Regulator Champions proposal
              </Link>

              <Link
                href="/school-readiness-funding"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore funding support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT POSITIONING */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-6 sm:p-7">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
              A reflection support, not a compliance guarantee
            </span>

            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#53645D]">
              Every service is responsible for its own National Quality
              Framework obligations, documentation and Quality Improvement
              Plan. These examples are designed to support professional
              reflection and help teams identify where Regulator Champions
              learning may connect with their own practice and improvement
              priorities.
            </p>
          </div>
        </div>
      </section>

      {/* WHY THIS MATTERS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Beyond attendance certificates
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                The evidence is in what your team starts doing differently.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                A professional learning certificate can show that an educator
                attended something. It does not show what they noticed the next
                morning when a child froze at drop-off, what the team changed
                when group time repeatedly became difficult, or how educators
                reflected on a child who seemed to be coping but was actually
                overwhelmed.
              </p>

              <p>
                Those conversations are where Regulator Champions becomes
                useful for continuous improvement. Teams can take a real
                situation, consider what the child&apos;s body and environment
                may have been communicating, choose a response and then come
                back to whether it helped.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QUALITY AREAS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Five useful places to reflect
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Connect the learning to the practice already happening in your
              service.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              You do not need to force Regulator Champions into every Quality
              Area. Start with the parts of your QIP and everyday practice where
              regulation, relationships, participation and educator capability
              are genuinely relevant.
            </p>
          </div>

          <div className="space-y-6">
            {NQS_AREAS.map((area) => (
              <article
                key={area.qa}
                className="overflow-hidden rounded-4xl border border-[#E6E2DC] bg-white shadow-sm"
              >
                <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
                  <div className="bg-[#1C3B34] p-6 text-white sm:p-8">
                    <span className="inline-flex rounded-full bg-[#C29F60] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#1C3B34]">
                      {area.qa}
                    </span>

                    <h3 className="mt-4 text-2xl font-extrabold leading-tight">
                      {area.title}
                    </h3>

                    <p className="mt-3 text-sm font-bold text-[#E4C98E]">
                      {area.focus}
                    </p>

                    <p className="mt-2 text-xs leading-relaxed text-[#C8D6D0]">
                      {area.element}
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <p className="text-xl font-extrabold leading-snug text-[#1C3B34]">
                      {area.question}
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                      {area.connection}
                    </p>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      {area.examples.map((example) => (
                        <div
                          key={example}
                          className="rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-4"
                        >
                          <p className="text-xs font-semibold leading-relaxed text-[#53645D]">
                            {example}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border-l-4 border-[#C29F60] bg-[#FAF5EC] p-5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                        QIP reflection question
                      </span>

                      <p className="mt-2 text-sm font-bold leading-relaxed text-[#1C3B34]">
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

      {/* SIMPLE REFLECTION CYCLE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Keep the evidence practical
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Notice. Discuss. Try. Review.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Continuous improvement does not need another complicated form.
              Start with a moment your educators actually experienced.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-4">
            {[
              {
                number: '01',
                title: 'Notice',
                text: 'What did we observe in the child, educator and environment?',
              },
              {
                number: '02',
                title: 'Discuss',
                text: 'What might have been contributing to what happened?',
              },
              {
                number: '03',
                title: 'Try',
                text: 'What small practice change could we make next time?',
              },
              {
                number: '04',
                title: 'Review',
                text: 'What changed, what did not, and what have we learned?',
              },
            ].map((step) => (
              <div
                key={step.number}
                className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6"
              >
                <span className="text-sm font-extrabold text-[#C29F60]">
                  {step.number}
                </span>

                <h3 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Regulator Champions
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Build professional learning your educators can actually bring back
            into the room.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D8E1DC]">
            Explore the Regulator Champions pathway, service-wide resources and
            practical reflection tools designed to strengthen everyday
            co-regulation practice.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              View the proposal
            </Link>

            <Link
              href="/free-guide"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Start with the free guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}