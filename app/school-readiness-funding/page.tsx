import type { Metadata } from 'next';
import Link from 'next/link';

const PREVIEW_PRICE = 1790;
const FULL_PRICE = 4790;

export const metadata: Metadata = {
  title:
    'School Readiness Funding Professional Learning | Regulator Champions',

  description:
    'Information for Victorian kindergarten services considering Regulator Champions alongside School Readiness Funding, including wellbeing, educator capability, QIP reflection, pricing and procurement information.',

  alternates: {
    canonical: '/school-readiness-funding',
  },

  openGraph: {
    title:
      'School Readiness Funding | Regulator Champions',
    description:
      'Explore how Regulator Champions may support Victorian kindergarten teams working on wellbeing, co-regulation, participation, educator capability and reflective practice.',
    url: '/school-readiness-funding',
    type: 'website',
  },
};

const PRIORITY_AREAS = [
  {
    title: 'Wellbeing',
    text: 'Regulator Champions has a strong connection with social and emotional wellbeing, co-regulation and helping educators notice what may be happening before behaviour escalates.',
  },
  {
    title: 'Access and participation',
    text: 'The Regulation Ladders encourage teams to consider sensory load, movement, routines, environment and whether current expectations are making participation harder for some children.',
  },
  {
    title: 'Educator capability',
    text: 'The program is designed to build educator and leadership capability rather than provide individual assessment or therapy for children.',
  },
];

const PRACTICE_AREAS = [
  {
    title: 'Co-regulation',
    text: 'Consider how adult pace, voice, proximity, expectations and responses may influence difficult moments.',
  },
  {
    title: 'Body cues and emotional wellbeing',
    text: 'Help educators notice earlier signs of overload, shutdown, rising arousal and reduced capacity.',
  },
  {
    title: 'Executive functioning',
    text: 'Think about the demands involved in waiting, transitions, following instructions, group experiences and adapting when plans change.',
  },
  {
    title: 'Participation',
    text: 'Look underneath behaviour and consider what may be making it harder for a child to enter, remain in or return to an experience.',
  },
  {
    title: 'Reflective practice',
    text: 'Use real situations from the room to notice patterns, trial one practical change and return to what happened afterwards.',
  },
  {
    title: 'Whole-team consistency',
    text: 'Give educators, leaders and families a shared way of looking at difficult moments rather than relying on different responses in every room.',
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
    'Online whole-team professional learning, Regulation Ladders and implementation resources',
  ],
  [
    '6-Month Preview',
    `$${PREVIEW_PRICE.toLocaleString()} incl. GST · whole-team access`,
  ],
  [
    '12-Month Regulator Champions',
    `$${FULL_PRICE.toLocaleString()} incl. GST · whole-team access`,
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
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              School Readiness Funding
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Considering Regulator Champions as part of your School Readiness Funding planning?
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              This page is for Victorian kindergarten leaders who are looking at regulation, wellbeing, participation or educator capability within their current priorities and want to understand where Regulator Champions may fit.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-6 text-[#BFD0C8]">
              Your service remains responsible for deciding whether a purchase is appropriate within its current School Readiness Funding plan and for meeting any current Department of Education purchasing and documentation requirements.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                View 6-Month Preview
              </Link>

              <Link
                href="/proposal?plan=full"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                View 12-Month Program
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING NOTE */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <h2 className="text-xl font-extrabold text-[#1C3B34]">
              Start with the need in your current cohort, not with the funding.
            </h2>

            <p className="mt-3 max-w-4xl text-base leading-7 text-[#53645D]">
              Regulator Champions is not presented as a Department-endorsed program and this page does not guarantee that School Readiness Funding can be used for a purchase. The strongest starting point is identifying what children and educators are currently experiencing, what your team wants to improve and how the proposed professional learning connects with that priority.
            </p>
          </div>
        </div>
      </section>

      {/* CONNECTION */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Where the connection may sit
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                What is your team actually trying to change?
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                I would not begin by asking whether Regulator Champions fits a funding category. I would begin with the situations your educators keep getting stuck on and the capability you want the team to build.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              {PRIORITY_AREAS.map((area) => (
                <div
                  key={area.title}
                  className="border-b border-[#D8CFC2] py-6"
                >
                  <h3 className="text-xl font-extrabold text-[#1C3B34]">
                    {area.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-[#53645D]">
                    {area.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QIP */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                QIP and reflective practice
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Regulator Champions can also give teams something practical to reflect on together.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#53645D]">
                The Regulation Ladders are designed around real situations such as drop-off, participation and educator regulation, which means teams can use them to discuss what they are noticing in practice rather than writing broad improvement goals that become disconnected from the room.
              </p>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                Those discussions may help inform Quality Improvement Plan reflection around relationships, environments, participation, educator practice and the consistency of responses across the service.
              </p>

              <Link
                href="/nqs-mapping"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
              >
                Explore NQS and QIP Reflection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM OPTIONS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Program options
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Choose the level of support your team currently has capacity to use.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              The program no longer needs to be approached as a fixed course that everybody completes in order. Teams can begin with the current Regulation Ladders and practical resources, then use recordings, questions and broader support when they have the capacity.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ProgramOption
              title="6-Month Preview"
              price={PREVIEW_PRICE}
              period="6 months"
              text="A smaller whole-team starting point for services that want to use the current Regulation Ladders, recordings and implementation support before deciding what they need longer term."
              href="/proposal?plan=preview"
              button="View Preview Proposal"
            />

            <ProgramOption
              title="12-Month Regulator Champions"
              price={FULL_PRICE}
              period="12 months"
              text="Year-round whole-team access for services wanting the Regulation Ladders, recordings, Ask Robyn support, live sessions and additional member resources as the program develops."
              href="/proposal?plan=full"
              button="View 12-Month Proposal"
            />
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Professional learning focus
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              What Regulator Champions is designed to build
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              The focus is educator capability and whole-team practice rather than individual clinical treatment for children.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {PRACTICE_AREAS.map((area) => (
              <div
                key={area.title}
                className="border-t border-[#D8CFC2] py-6"
              >
                <h3 className="text-xl font-extrabold text-[#1C3B34]">
                  {area.title}
                </h3>

                <p className="mt-3 text-base leading-7 text-[#53645D]">
                  {area.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROBYN */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                Created by Robyn Papworth
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Developmental knowledge translated into everyday practice.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#D8E1DC]">
              <p>
                I am an Accredited Exercise Physiologist and Developmental Educator, and my work with early childhood teams focuses on regulation, sensory processing, movement, participation and helping educators understand what a child&apos;s body may be communicating.
              </p>

              <p>
                Regulator Champions was created because I kept seeing the same gap between professional learning and the reality of the room. Educators often understand the theory, but still need support working out what to notice and what to try when a difficult moment is unfolding in front of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCUREMENT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Procurement information
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
              Information for your Approved Provider or finance team
            </h2>
          </div>

          <div className="mt-8 overflow-hidden border-y border-[#D8CFC2]">
            <dl>
              {PROCUREMENT_DETAILS.map(
                ([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 border-b border-[#D8CFC2] py-5 sm:grid-cols-[240px_1fr]"
                  >
                    <dt className="text-sm font-extrabold text-[#657B6C]">
                      {label}
                    </dt>

                    <dd className="text-base font-semibold leading-7 text-[#2B3833]">
                      {value}
                    </dd>
                  </div>
                ),
              )}
            </dl>
          </div>
        </div>
      </section>

      {/* PLANNING QUESTIONS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm font-extrabold text-[#9A793D]">
            Before adding it to your plan
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
            Questions worth discussing with your team first
          </h2>

          <div className="mt-8 border-y border-[#D8CFC2]">
            {[
              'What are we currently seeing in our cohort that has led us to prioritise regulation, wellbeing, participation or educator capability?',
              'What would we like educators to notice or do differently after this professional learning?',
              'How will the team have opportunities to use and revisit the learning during everyday practice?',
              'What small changes would tell us that our practice is becoming more effective or consistent?',
            ].map((question) => (
              <div
                key={question}
                className="border-b border-[#D8CFC2] py-5"
              >
                <p className="text-lg font-semibold leading-8 text-[#53645D]">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDING RESPONSIBILITY */}
      <section className="border-t border-[#E6E2DC] bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm leading-7 text-[#6A7873]">
            Each service remains responsible for deciding whether Regulator Champions is an appropriate expenditure within its current School Readiness Funding plan, identifying the relevant purchasing pathway and maintaining the documentation required by the Victorian Department of Education. References to School Readiness Funding do not imply Department endorsement of Play Move Improve or Regulator Champions.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Want to discuss whether it fits what your team is currently working on?
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
            You do not need to decide on a program option before contacting me. Tell me what your educators are seeing and what you are hoping to improve, and I can explain where I would start.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:robyn@playmoveimprove.com.au?subject=School%20Readiness%20Funding%20and%20Regulator%20Champions"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Talk to Robyn
            </a>

            <Link
              href="/proposal?plan=preview"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-base font-bold text-white"
            >
              View the Proposal
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function ProgramOption({
  title,
  price,
  period,
  text,
  href,
  button,
}: {
  title: string;
  price: number;
  period: string;
  text: string;
  href: string;
  button: string;
}) {
  return (
    <article className="border-t border-[#D8CFC2] pt-6">
      <h3 className="text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
        ${price.toLocaleString()}
      </p>

      <p className="mt-1 text-base text-[#6B7772]">
        incl. GST, {period}
      </p>

      <p className="mt-5 text-lg leading-8 text-[#53645D]">
        {text}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
      >
        {button}
      </Link>
    </article>
  );
}