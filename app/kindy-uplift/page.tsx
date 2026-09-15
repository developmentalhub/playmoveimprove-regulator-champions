import type { Metadata } from 'next';
import Link from 'next/link';

const PREVIEW_PRICE = 1790;
const FULL_PRICE = 4790;

export const metadata: Metadata = {
  title:
    'Kindy Uplift Professional Learning | Regulator Champions',

  description:
    'Information for Queensland kindergarten services considering Regulator Champions within Kindy Uplift planning, including priority area alignment, educator capability, QIP reflection, pricing and procurement information.',

  alternates: {
    canonical: '/kindy-uplift',
  },

  openGraph: {
    title:
      'Kindy Uplift Professional Learning | Regulator Champions',
    description:
      'Explore how Regulator Champions may support Queensland kindergarten teams working on social and emotional learning, executive function, physicality, participation and educator capability.',
    url: '/kindy-uplift',
    type: 'website',
  },
};

const PRIORITY_CONNECTIONS = [
  {
    title: 'Social and emotional learning',
    text: 'Regulator Champions helps educators notice early body-based signs, understand co-regulation and reflect on how adult responses may influence difficult moments.',
  },
  {
    title: 'Executive function',
    text: 'The program supports reflection on waiting, transitions, following instructions, managing impulses, shifting attention and coping when routines or expectations change.',
  },
  {
    title: 'Physicality',
    text: 'Movement, body awareness and sensory processing are considered as part of participation, regulation and children’s ability to engage in kindergarten experiences.',
  },
  {
    title: 'Equity and access for all',
    text: 'Teams are encouraged to notice barriers to participation and consider whether routines, environments, expectations or educator responses may need to change.',
  },
];

const CAPABILITY_AREAS = [
  {
    title: 'Notice before reacting',
    text: 'Help educators recognise earlier signs of overload, distress, fatigue, shutdown or reduced capacity before behaviour becomes the only thing everybody can see.',
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
    text: 'Create shared language across educators and leaders so children are not experiencing completely different approaches depending on who is supporting them.',
  },
  {
    title: 'Support implementation',
    text: 'Move beyond one-off professional learning by giving teams practical resources they can revisit, discuss and apply over time.',
  },
  {
    title: 'Document practice change',
    text: 'Use reflective prompts to record what the team noticed, what changed and what happened afterwards.',
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
    'Whole-team professional learning and educator capability development',
  ],
  [
    'Delivery',
    'Online professional learning, Regulation Ladders and implementation resources',
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

export default function KindyUpliftPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              Kindy Uplift
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Considering Regulator Champions within your Kindy Uplift planning?
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              Regulator Champions is whole-team professional learning designed to help educators notice what may be happening underneath behaviour and build greater confidence around regulation, co-regulation, sensory needs, movement and participation.
            </p>

            <p className="mt-5 max-w-3xl text-sm leading-6 text-[#BFD0C8]">
              Your kindergarten remains responsible for deciding whether a purchase is appropriate for its current Kindy Uplift priorities, planning and procurement requirements.
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

      {/* IMPORTANT NOTE */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <h2 className="text-xl font-extrabold text-[#1C3B34]">
              Start with the need your service has identified.
            </h2>

            <p className="mt-3 max-w-4xl text-base leading-7 text-[#53645D]">
              Regulator Champions should not be selected simply because it talks about regulation. The stronger starting point is identifying what children and educators are currently experiencing, what capability you want to strengthen and which Kindy Uplift priority area best reflects that need.
            </p>
          </div>
        </div>
      </section>

      {/* PLANNING CYCLE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Start with your service data
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                The funding should follow the need, not the other way around.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                Use the information you already have from observations, educator reflection, family conversations and service data to identify patterns before deciding what support may be useful.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              <PlanningRow
                title="Collect"
                text="Look at observations, educator reflection, family feedback and existing service information."
              />

              <PlanningRow
                title="Analyse"
                text="Look for patterns, strengths and barriers affecting children’s participation, regulation and learning."
              />

              <PlanningRow
                title="Plan"
                text="Choose the relevant Kindy Uplift priority area and decide what educator capability or practice change is needed."
              />

              <PlanningRow
                title="Review"
                text="Return to the practice and look at whether educator responses and experiences for children are beginning to change."
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRIORITY AREAS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Potential Kindy Uplift connections
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Where Regulator Champions may fit when these areas have already been identified as priorities.
            </h2>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {PRIORITY_CONNECTIONS.map((area) => (
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

      {/* CAPABILITY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Educator capability
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              What the professional learning is designed to strengthen
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              Regulator Champions is not individual therapy for children. It is designed to strengthen what educators notice, understand, discuss and try during everyday practice.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {CAPABILITY_AREAS.map((area) => (
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

      {/* QIP */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                QIP and service planning
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Connect the professional learning back to what your service is actually trying to improve.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#D8E1DC]">
              <p>
                Kindy Uplift planning should not sit separately from everyday practice. The Regulation Ladders give teams practical situations to reflect on, including drop-off, participation and adult regulation, so discussions can be connected back to service planning and your QIP.
              </p>

              <p>
                Instead of writing broad goals such as “improve children&apos;s self-regulation”, teams can begin documenting what they are noticing, what they changed and what happened afterwards.
              </p>

              <Link
                href="/nqs-mapping"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3F0EA]"
              >
                Explore NQS and QIP Reflection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OPTIONS */}
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
              Teams can begin with the current Regulation Ladders and practical resources, then use recordings, questions and broader support when those things are useful.
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
              text="Year-round whole-team access for services wanting Regulation Ladders, recordings, Ask Robyn support, live sessions and additional member resources as the program develops."
              href="/proposal?plan=full"
              button="View 12-Month Proposal"
            />
          </div>
        </div>
      </section>

      {/* PROCUREMENT */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Procurement information
            </p>

            <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
              Information for directors and Approved Providers
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
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm font-extrabold text-[#9A793D]">
            Before adding it to your plan
          </p>

          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
            Questions worth discussing with your team
          </h2>

          <div className="mt-8 border-y border-[#D8CFC2]">
            {[
              'What data or observations tell us this is an area our children or educators currently need support with?',
              'Which Kindy Uplift priority area best reflects that need?',
              'What would we like educators to notice or do differently?',
              'How will educators have opportunities to use and revisit the learning?',
              'What changes will we look for when reviewing whether the work is making a difference?',
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
      <section className="border-t border-[#E6E2DC] bg-[#FAF8F5] py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm leading-7 text-[#6A7873]">
            Each kindergarten service remains responsible for determining whether Regulator Champions is appropriate for its current Kindy Uplift planning, identified priority areas, spending rules and procurement requirements. References to Kindy Uplift do not imply Queensland Department of Education approval or endorsement of Play Move Improve or Regulator Champions.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Want to discuss whether Regulator Champions fits the priority your team has identified?
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
            Tell me what your educators are currently seeing and what you are hoping to improve, and I can explain where I would start.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="mailto:robyn@playmoveimprove.com.au?subject=Kindy%20Uplift%20and%20Regulator%20Champions"
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

function PlanningRow({
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

      <p className="mt-3 text-base leading-7 text-[#53645D]">
        {text}
      </p>
    </div>
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