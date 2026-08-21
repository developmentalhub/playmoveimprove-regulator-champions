import type { Metadata } from 'next';
import Link from 'next/link';

const PREVIEW_PRICE = 1790;
const FULL_PRICE = 4790;
const CONTINUATION_PRICE = 3200;
const STAGED_TOTAL = PREVIEW_PRICE + CONTINUATION_PRICE;
const UPFRONT_SAVING = STAGED_TOTAL - FULL_PRICE;

export const metadata: Metadata = {
  title:
    'Kindy Uplift Professional Learning | Regulator Champions',

  description:
    'Information for Queensland kindergarten services considering Regulator Champions within Kindy Uplift planning, including priority area alignment, educator capability, pricing and procurement information.',

  alternates: {
    canonical: '/kindy-uplift',
  },

  openGraph: {
    title:
      'Kindy Uplift Professional Learning | Regulator Champions',
    description:
      'Explore how Regulator Champions may support Queensland kindergarten services working on social and emotional learning, executive function, physicality, inclusion and educator capability.',
    url: '/kindy-uplift',
    type: 'website',
  },
};

const PRIORITY_CONNECTIONS = [
  {
    title: 'Social and emotional learning',
    text: 'Regulator Champions helps educators notice body-based signs, understand co-regulation and reflect on how adult responses may support children’s social and emotional learning.',
  },
  {
    title: 'Executive function',
    text: 'The program supports reflection on the demands involved in waiting, changing activities, following instructions, managing impulses, shifting attention and coping with changes in routine.',
  },
  {
    title: 'Physicality',
    text: 'Movement, body awareness and sensory processing are considered as part of children’s participation, regulation and ability to engage in kindergarten experiences.',
  },
  {
    title: 'Equity and access for all',
    text: 'Teams are encouraged to notice barriers to participation and consider how routines, environments, expectations and educator responses may need to change for individual children.',
  },
];

const CAPABILITY_AREAS = [
  {
    title: 'Notice before reacting',
    text: 'Help educators recognise early signs of overload, distress, fatigue, shutdown or reduced capacity before behaviour becomes the only focus.',
  },
  {
    title: 'Strengthen co-regulation',
    text: 'Build awareness of how educator voice, pace, proximity, expectations and emotional availability can influence difficult moments.',
  },
  {
    title: 'Reflect on real routines',
    text: 'Use arrivals, transitions, group experiences, outdoor play, sensory overload and end-of-day fatigue as practical learning opportunities.',
  },
  {
    title: 'Build whole-team consistency',
    text: 'Create shared language across educators and leaders so children are not experiencing completely different approaches from room to room.',
  },
  {
    title: 'Support implementation',
    text: 'Move beyond a one-off professional learning session by giving teams resources they can revisit, discuss and apply over time.',
  },
  {
    title: 'Document practice change',
    text: 'Use reflective prompts to help teams record what they noticed, what they changed and what happened afterwards.',
  },
];

const PROCUREMENT_DETAILS = [
  ['Business / provider', 'Play Move Improve'],
  ['Program', 'Regulator Champions'],
  ['Program creator', 'Robyn Papworth'],
  [
    'Professional background',
    'Accredited Exercise Physiologist and Developmental Educator',
  ],
  [
    'Program type',
    'Whole-service professional learning and educator capability development',
  ],
  [
    'Delivery',
    'Online self-paced professional learning and implementation resources',
  ],
  [
    '3 Ladder Preview',
    `$${PREVIEW_PRICE.toLocaleString()} incl. GST · 6 months whole-service access`,
  ],
  [
    'Full 8 Ladder Pathway',
    `$${FULL_PRICE.toLocaleString()} incl. GST · 12 months whole-service access`,
  ],
  [
    'Continuation after Preview',
    `$${CONTINUATION_PRICE.toLocaleString()} incl. GST for Ladders 4 to 8`,
  ],
  ['Email', 'robyn@playmoveimprove.com.au'],
  [
    'Purchasing',
    'Tax invoice and purchase order information can be organised directly with Robyn',
  ],
];

export default function KindyUpliftPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              Queensland Kindy Uplift
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Considering Regulator Champions in your Kindy Uplift planning?
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg">
              Regulator Champions is whole-service professional learning
              designed to build educator capability around regulation,
              co-regulation, sensory needs, participation and the everyday
              moments that can become difficult in kindergarten.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              Queensland&apos;s Kindy Uplift program allows eligible services to
              use funding for professional development, programs, resources and
              supports where they are connected to identified needs and Kindy
              Uplift priority areas.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                View $1,790 Preview proposal
              </Link>

              <Link
                href="/proposal?plan=full"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View $4,790 Full proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT NOTE */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-6 sm:p-7">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
              Important Kindy Uplift note
            </span>

            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#53645D]">
              The Queensland Department of Education does not maintain an
              approved or preferred list of Kindy Uplift professional learning
              suppliers and does not endorse individual providers. Eligible
              services are responsible for deciding whether a provider and
              purchase are appropriate for their own children, educators,
              community context and documented Kindy Uplift plan.
            </p>
          </div>
        </div>
      </section>

      {/* HOW KINDY UPLIFT WORKS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Start with your service data
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                The funding should follow the need, not the other way around.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                Kindy Uplift planning is designed as a cycle of collecting and
                analysing data, identifying priority areas, planning,
                implementing and then evaluating whether the work is making a
                difference.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                That means the strongest case for Regulator Champions is not
                simply that the program talks about regulation. Your service
                should first identify what children and educators are currently
                experiencing and what capability you want to strengthen.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  number: '01',
                  title: 'Collect',
                  text: 'Use information already available through observations, family feedback, educator reflection and service data.',
                },
                {
                  number: '02',
                  title: 'Analyse',
                  text: 'Look for patterns, strengths and barriers affecting children’s participation and learning.',
                },
                {
                  number: '03',
                  title: 'Plan',
                  text: 'Choose a relevant Kindy Uplift priority area and decide what capability or practice change is needed.',
                },
                {
                  number: '04',
                  title: 'Review',
                  text: 'Evaluate whether the professional learning is changing educator practice and outcomes for children.',
                },
              ].map((step) => (
                <article
                  key={step.number}
                  className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6"
                >
                  <span className="text-sm font-extrabold text-[#C29F60]">
                    {step.number}
                  </span>

                  <h3 className="mt-2 text-lg font-extrabold text-[#1C3B34]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITY AREAS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
              Potential priority area connections
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Where Regulator Champions may connect with Kindy Uplift.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Queensland currently identifies six Kindy Uplift priority areas.
              Regulator Champions has the clearest potential connection with the
              following areas when they have been identified through your
              service&apos;s own planning.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PRIORITY_CONNECTIONS.map((area) => (
              <article
                key={area.title}
                className="rounded-4xl border border-[#E6E2DC] bg-white p-7"
              >
                <span className="inline-flex rounded-full bg-[#1C3B34] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
                  Kindy Uplift priority
                </span>

                <h3 className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  {area.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-7 text-center">
            <a
              href="https://earlychildhood.qld.gov.au/grants-and-funding/kindy-uplift-program"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl border border-[#D8D0C4] bg-white px-5 py-2.5 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
            >
              View Queensland Government Kindy Uplift information ↗
            </a>
          </div>
        </div>
      </section>

      {/* CAPABILITY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Educator capability
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              What the professional learning is designed to change.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Regulator Champions is not individual therapy for children. It is
              professional learning designed to strengthen what educators
              notice, understand, discuss and do in everyday practice.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITY_AREAS.map((area) => (
              <article
                key={area.title}
                className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6"
              >
                <h3 className="text-lg font-extrabold text-[#1C3B34]">
                  {area.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                  {area.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* OPTIONS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Choose your starting point
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Begin with three ladders or use the complete pathway.
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
            <article className="rounded-4xl border-2 border-[#C29F60] bg-white p-7">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                3 Ladder Preview
              </span>

              <p className="mt-3 text-5xl font-extrabold text-[#1C3B34]">
                ${PREVIEW_PRICE.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-[#6A7873]">
                including GST · 6 months
              </p>

              <p className="mt-5 text-sm leading-relaxed text-[#53645D]">
                A smaller starting point for services wanting to introduce the
                Regulator Champions approach and see how educators use it in
                practice.
              </p>

              <div className="mt-5 space-y-2 text-sm text-[#53645D]">
                <p>✓ Ladders 1 to 3</p>
                <p>✓ Whole-service access</p>
                <p>✓ Educator implementation resources</p>
                <p>✓ Leadership reflection tools</p>
              </div>

              <Link
                href="/proposal?plan=preview"
                className="mt-6 flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-5 py-3.5 text-center text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                View Preview proposal
              </Link>
            </article>

            <article className="rounded-4xl bg-[#1C3B34] p-7 text-white">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E4C98E]">
                Full 8 Ladder Pathway
              </span>

              <p className="mt-3 text-5xl font-extrabold">
                ${FULL_PRICE.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-[#C8D6D0]">
                including GST · 12 months
              </p>

              <p className="mt-5 text-sm leading-relaxed text-[#D8E1DC]">
                The complete whole-service pathway for teams wanting to work
                through all eight Regulation Ladders.
              </p>

              <div className="mt-5 space-y-2 text-sm text-[#D8E1DC]">
                <p>✓ Complete 8 Ladder pathway</p>
                <p>✓ Whole-service access</p>
                <p>✓ Practice leadership resources</p>
                <p>✓ NQS and QIP reflection support</p>
              </div>

              <Link
                href="/proposal?plan=full"
                className="mt-6 flex min-h-12 items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-center text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3F0EA]"
              >
                View Full pathway proposal
              </Link>
            </article>
          </div>

          <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-[#D8D0C4] bg-white p-5 text-center">
            <p className="text-xs leading-relaxed text-[#6A7873]">
              Services beginning with the Preview can currently continue into
              Ladders 4 to 8 for ${CONTINUATION_PRICE.toLocaleString()} including
              GST. The staged total is ${STAGED_TOTAL.toLocaleString()}. The
              complete pathway purchased upfront is{' '}
              ${UPFRONT_SAVING.toLocaleString()} less.
            </p>
          </div>
        </div>
      </section>

      {/* PROCUREMENT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Procurement information
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Information for directors and Approved Providers.
            </h2>
          </div>

          <div className="overflow-hidden rounded-4xl border border-[#E6E2DC] bg-white">
            <dl className="divide-y divide-[#E6E2DC]">
              {PROCUREMENT_DETAILS.map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-2 px-5 py-4 sm:grid-cols-[240px_1fr] sm:px-7"
                >
                  <dt className="text-xs font-extrabold uppercase tracking-wide text-[#657B6C]">
                    {label}
                  </dt>

                  <dd className="text-sm font-semibold leading-relaxed text-[#2B3833]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* QIP PLANNING */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                Planning and evaluation
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
                Connect the purchase to your QIP or service planning.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                Kindy Uplift planning needs to be reflected in the service&apos;s
                Quality Improvement Plan or other service planning
                documentation.
              </p>
            </div>

            <div className="space-y-3">
              {[
                'What data tells us this is an area our children or educators currently need support with?',
                'Which Kindy Uplift priority area best reflects that identified need?',
                'What do we want educators to understand or do differently after engaging with Regulator Champions?',
                'How will we give educators opportunities to implement and discuss the learning?',
                'What will we look for when evaluating whether practice has changed?',
              ].map((question, index) => (
                <div
                  key={question}
                  className="flex gap-4 rounded-2xl border border-[#E6E2DC] bg-white p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C29F60] text-xs font-extrabold text-[#1C3B34]">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm font-semibold leading-relaxed text-[#53645D]">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/nqs-mapping"
              className="inline-flex min-h-11 items-center rounded-xl border border-[#D8D0C4] bg-white px-5 py-2.5 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
            >
              Explore NQS & QIP reflection support →
            </Link>

            <a
              href="https://earlychildhood.qld.gov.au/grants-and-funding/kindy-uplift-program/planning"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl border border-[#D8D0C4] bg-white px-5 py-2.5 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
            >
              Queensland Kindy Uplift planning guidance ↗
            </a>
          </div>
        </div>
      </section>

      {/* FUNDING RESPONSIBILITY */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="rounded-3xl border border-[#D8D0C4] bg-[#FAF8F5] p-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#657B6C]">
              Funding responsibility
            </span>

            <p className="mt-3 text-xs leading-relaxed text-[#6A7873]">
              Each kindergarten service remains responsible for determining
              whether Regulator Champions is appropriate for its current Kindy
              Uplift planning, identified priority areas, spending rules and
              procurement requirements. References to Kindy Uplift do not imply
              Queensland Department of Education approval or endorsement of
              Play Move Improve or Regulator Champions.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Regulator Champions
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Ready to take the idea to your Approved Provider?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D8E1DC]">
            Choose the pathway you are considering and use the proposal page to
            support your internal funding and purchasing conversation.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              $1,790 Preview proposal
            </Link>

            <Link
              href="/proposal?plan=full"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              $4,790 Full proposal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}