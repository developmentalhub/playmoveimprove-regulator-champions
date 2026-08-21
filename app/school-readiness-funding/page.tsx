import type { Metadata } from 'next';
import Link from 'next/link';

const PREVIEW_PRICE = 1790;
const FULL_PRICE = 4790;
const CONTINUATION_STANDARD_PRICE = 4000;
const CONTINUATION_DISCOUNT_PCT = 20;
const CONTINUATION_PRICE = 3200;
const STAGED_TOTAL = PREVIEW_PRICE + CONTINUATION_PRICE;
const UPFRONT_SAVING = STAGED_TOTAL - FULL_PRICE;

export const metadata: Metadata = {
  title:
    'School Readiness Funding Professional Learning | Regulator Champions',

  description:
    'Information for Victorian kindergarten services considering Regulator Champions as part of their School Readiness Funding planning, including wellbeing alignment, educator capability, pricing and procurement information.',

  alternates: {
    canonical: '/school-readiness-funding',
  },

  openGraph: {
    title:
      'School Readiness Funding | Regulator Champions',
    description:
      'Explore how Regulator Champions may support Victorian kindergarten services working on educator capability, co-regulation, wellbeing and reflective practice through School Readiness Funding.',
    url: '/school-readiness-funding',
    type: 'website',
  },
};

const SRF_PRIORITY_AREAS = [
  {
    title: 'Wellbeing',
    text: 'The strongest connection for Regulator Champions. The Victorian School Readiness Funding framework includes social, emotional and executive function within the Wellbeing priority area.',
  },
  {
    title: 'Access, Inclusion and Participation',
    text: 'The program can also support reflection on the environmental, sensory and participation barriers that may make everyday routines more difficult for some children.',
  },
  {
    title: 'Educator capability',
    text: 'Regulator Champions is designed to build the capability of educators and leaders rather than provide individual clinical treatment to children.',
  },
];

const PRACTICE_AREAS = [
  {
    title: 'Co-regulation',
    text: 'Build a shared understanding of how adult pace, voice, proximity, expectations and responses can influence difficult moments.',
  },
  {
    title: 'Social and emotional wellbeing',
    text: 'Help educators notice early body-based signs of distress, overload, shutdown and reduced capacity.',
  },
  {
    title: 'Executive function',
    text: 'Consider the demands being placed on children during transitions, waiting, group experiences, instructions and changes in routine.',
  },
  {
    title: 'Participation',
    text: 'Look underneath behaviour and consider what may be making it difficult for a child to enter, remain in or return to an experience.',
  },
  {
    title: 'Reflective practice',
    text: 'Use real room moments to help educators notice patterns, trial practical changes and return to what happened afterwards.',
  },
  {
    title: 'Whole-service consistency',
    text: 'Develop shared language and practice across educators, room leaders and leadership rather than relying on different responses in every room.',
  },
];

const PROCUREMENT_DETAILS = [
  ['Business / provider', 'Play Move Improve'],
  ['ABN', '17 415 190 263'],
  ['Program', 'Regulator Champions'],
  ['Program creator', 'Robyn Papworth'],
  [
    'Professional background',
    'Accredited Exercise Physiologist and Developmental Educator',
  ],
  [
    'Delivery',
    'Online whole-service professional learning and implementation resources',
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

export default function SchoolReadinessFundingPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              Victorian School Readiness Funding
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Considering Regulator Champions in your School Readiness Funding
              plan?
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg">
              This page gives directors, educational leaders and Approved
              Providers a clearer picture of the professional learning focus,
              pricing and potential links with School Readiness Funding
              priorities.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              Your service remains responsible for deciding whether a purchase
              is appropriate for its current SRF plan and for meeting Department
              of Education purchasing and documentation requirements.
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

      {/* IMPORTANT POSITIONING */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-6 sm:p-7">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
              Important funding note
            </span>

            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#53645D]">
              Regulator Champions is not presented as a Department of Education
              endorsed program and inclusion on this website does not guarantee
              that a service can use School Readiness Funding to purchase it.
              Services should connect any proposed purchase to their identified
              cohort needs, SRF goals and an appropriate current funding
              pathway.
            </p>
          </div>
        </div>
      </section>

      {/* SRF CONTEXT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Where the connection sits
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Start with your children and your service priority, not the
                program.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                School Readiness Funding is intended to build the capacity of
                educators and families to respond to children&apos;s learning
                and development, particularly for children experiencing
                educational disadvantage.
              </p>
            </div>

            <div className="space-y-4">
              {SRF_PRIORITY_AREAS.map((area) => (
                <article
                  key={area.title}
                  className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6"
                >
                  <h3 className="text-lg font-extrabold text-[#1C3B34]">
                    {area.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                    {area.text}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.vic.gov.au/school-readiness-funding"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl border border-[#D8D0C4] bg-white px-4 py-2.5 text-xs font-bold text-[#1C3B34] transition hover:bg-[#FAF5EC]"
            >
              Victorian Government SRF information ↗
            </a>

            <a
              href="https://www.vic.gov.au/coaching"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center rounded-xl border border-[#D8D0C4] bg-white px-4 py-2.5 text-xs font-bold text-[#1C3B34] transition hover:bg-[#FAF5EC]"
            >
              Victorian Government coaching information ↗
            </a>
          </div>
        </div>
      </section>

      {/* 2026 OPTIONS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
              Two starting points
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Match the investment to what your service is ready to implement.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Services can begin with three ladders or purchase the complete
              eight-ladder pathway upfront.
            </p>
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
                Begin with the first three Regulation Ladders and give your team
                time to use the approach in real routines before deciding
                whether to continue.
              </p>

              <div className="mt-5 space-y-2 text-sm text-[#53645D]">
                <p>✓ Whole-service access</p>
                <p>✓ Ladders 1 to 3</p>
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
                Give your team access to the complete Regulator Champions
                pathway and implementation resources from the beginning.
              </p>

              <div className="mt-5 space-y-2 text-sm text-[#D8E1DC]">
                <p>✓ Complete eight-ladder pathway</p>
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
              If a service begins with the Preview, Ladders 4 to 8 are currently
              ${CONTINUATION_PRICE.toLocaleString()} including GST after the{' '}
              {CONTINUATION_DISCOUNT_PCT}% continuation discount. The two stages
              total ${STAGED_TOTAL.toLocaleString()}. Purchasing the complete
              pathway upfront is ${UPFRONT_SAVING.toLocaleString()} less.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT BUILDS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Professional learning focus
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              What Regulator Champions is designed to build.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              The program focuses on educator capability and service-wide
              practice rather than individual assessment or therapy for
              children.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRACTICE_AREAS.map((area) => (
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

      {/* ROBYN */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
                Created by Robyn Papworth
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Developmental knowledge translated into everyday practice.
              </h2>
            </div>

            <div>
              <p className="text-base leading-relaxed text-[#D8E1DC]">
                Robyn is an Accredited Exercise Physiologist and Developmental
                Educator. Her work with early childhood teams focuses on helping
                educators understand regulation, sensory processing, movement
                and development in ways that are realistic to use in busy
                kindergarten rooms.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#D8E1DC]">
                Regulator Champions brings that knowledge into a structured
                whole-service pathway so teams can reflect on real pressure
                points, trial changes and build greater consistency across
                educators.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCUREMENT */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Procurement information
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Information for your Approved Provider or finance team.
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

          <p className="mt-4 text-xs leading-relaxed text-[#6A7873]">
            Prices shown are current website prices and include GST. Your
            service should confirm current pricing and purchasing information
            before approval.
          </p>
        </div>
      </section>

      {/* PLANNING QUESTIONS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Before adding it to your plan
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Four questions worth answering first.
            </h2>

            <div className="mt-7 space-y-3">
              {[
                'What are we seeing in our current cohort of children that has led us to prioritise regulation, wellbeing, participation or educator capability?',
                'What would we like educators to understand or do differently after this professional learning?',
                'How will the team have opportunities to use, discuss and revisit the learning in everyday practice?',
                'What evidence will help us determine whether our practice is changing?',
              ].map((question, index) => (
                <div
                  key={question}
                  className="flex gap-4 rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-5"
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

            <Link
              href="/nqs-mapping"
              className="mt-6 inline-flex min-h-12 items-center rounded-xl border border-[#D8D0C4] bg-white px-5 py-3 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF5EC]"
            >
              Explore NQS & QIP reflection support →
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
              Next steps
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Keep the purchasing process simple.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                number: '01',
                title: 'Identify the need',
                text: 'Start with your current cohort, educator capability priorities and SRF plan.',
              },
              {
                number: '02',
                title: 'Choose the pathway',
                text: 'Select the 3 Ladder Preview or complete 8 Ladder pathway.',
              },
              {
                number: '03',
                title: 'Take it for approval',
                text: 'Use the proposal and procurement information for your Approved Provider or internal process.',
              },
              {
                number: '04',
                title: 'Request your invoice',
                text: 'Email Robyn and the tax invoice can be organised with the service details you require.',
              },
            ].map((step) => (
              <article
                key={step.number}
                className="rounded-3xl border border-[#E6E2DC] bg-white p-6"
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
      </section>

      {/* FINAL NOTE */}
      <section className="bg-white py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="rounded-3xl border border-[#D8D0C4] bg-[#FAF8F5] p-6">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#657B6C]">
              Funding responsibility
            </span>

            <p className="mt-3 text-xs leading-relaxed text-[#6A7873]">
              Each service remains responsible for deciding whether Regulator
              Champions is an appropriate expenditure within its current School
              Readiness Funding plan, identifying the relevant Menu or
              purchasing pathway and maintaining the documentation required by
              the Victorian Department of Education. References to School
              Readiness Funding do not imply Department endorsement of Play Move
              Improve or Regulator Champions.
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
            Choose the pathway you are considering and open the proposal page
            with the pricing and service information ready to discuss.
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