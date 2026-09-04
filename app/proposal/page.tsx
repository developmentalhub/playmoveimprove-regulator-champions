'use client';

import React, {
  Suspense,
  useMemo,
  useState,
} from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const PREVIEW_PRICE = 1790;
const FULL_PRICE = 4790;

const PREVIEW_MONTHS = 6;
const FULL_MONTHS = 12;

const REGULATION_CARDS_URL =
  'https://playmoveimprove.com.au/products/regulation-cards-for-early-childhood-teams';

type Plan = 'preview' | 'full';

const PLAN_DETAILS = {
  preview: {
    label: '6-Month Preview',
    price: PREVIEW_PRICE,
    access: `${PREVIEW_MONTHS} months`,
    description:
      'A smaller whole-service introduction for teams that want to begin with the three Regulation Ladders currently available and have access to recordings, questions and support without committing to a full year straight away.',
    inclusions: [
      'Whole-service access for 6 months',
      'The 3 Regulation Ladders currently available',
      'Educator, manager and family card sets',
      'Educator Floor Deck for practical in-room support',
      'Private Ask Robyn question submissions',
      'Monthly online sessions for educators who want to join live',
      'Recordings added after monthly sessions',
      'Reflection and implementation resources',
      'Manager QIP and critical reflection support',
      'Printable resources connected to the program',
    ],
  },

  full: {
    label: '12-Month Regulator Champions',
    price: FULL_PRICE,
    access: `${FULL_MONTHS} months`,
    description:
      'Year-round whole-service support for teams that want to keep returning to the Regulation Ladders, recordings and Robyn as different behaviour and regulation questions arise across the year.',
    inclusions: [
      'Whole-service access for 12 months',
      'All Regulation Ladders available during your access period',
      'New Regulation Ladder content added as the program develops',
      'Educator, manager and family card sets',
      'Educator Floor Deck for practical in-room support',
      'Private Ask Robyn question submissions',
      'Monthly online sessions for educators who want to join live',
      'Access to the growing recording library',
      'Reflection and implementation resources',
      'Manager QIP and critical reflection support',
      'Family Bridge resources and conversation prompts',
      'Printable resources connected to the program',
    ],
  },
} as const;

function ProposalContent() {
  const searchParams =
    useSearchParams();

  const initialPlan: Plan =
    searchParams.get('plan') === 'full'
      ? 'full'
      : 'preview';

  const [
    selectedPlan,
    setSelectedPlan,
  ] = useState<Plan>(initialPlan);

  const [
    serviceName,
    setServiceName,
  ] = useState('');

  const [
    contactName,
    setContactName,
  ] = useState('');

  const [
    workEmail,
    setWorkEmail,
  ] = useState('');

  const [
    fundingSource,
    setFundingSource,
  ] = useState(
    'Victorian School Readiness Funding (SRF)',
  );

  const plan =
    PLAN_DETAILS[selectedPlan];

  const emailHref =
    useMemo(() => {
      const subject =
        encodeURIComponent(
          `Regulator Champions invoice request - ${
            serviceName || plan.label
          }`,
        );

      const body =
        encodeURIComponent(`Hi Robyn,

I would like to request an invoice / proposal for Regulator Champions.

Service name: ${serviceName || ''}
Contact name: ${contactName || ''}
Work email: ${workEmail || ''}
Funding pathway: ${fundingSource}

Program:
${plan.label}
$${plan.price.toLocaleString()} including GST
${plan.access} whole-service access

Please let me know if you need any further information.

Thank you`);

      return `mailto:robyn@playmoveimprove.com.au?subject=${subject}&body=${body}`;
    }, [
      serviceName,
      contactName,
      workEmail,
      fundingSource,
      plan,
    ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] print:bg-white">
      {/* INTRO */}
      <section className="bg-[#1C3B34] text-white print:bg-white print:text-black">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E] print:text-black">
              Regulator Champions
            </p>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              Practical support for the regulation and behaviour situations your team keeps coming back to.
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-relaxed text-[#D8E1DC] print:text-black">
              Regulator Champions helps early childhood teams look more closely at what may be happening underneath behaviour, decide what might need to change and choose what to try next when the answer is not immediately obvious.
            </p>

            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#BFD0C8] print:text-black">
              Your educators can use the practical cards now, return to recordings when they have the time and headspace, and use questions or live support when they want to go deeper. It is not designed to become another course your team has to race through.
            </p>
          </div>
        </div>
      </section>

      {/* LOWER PRESSURE OPTION */}
      <section className="border-b border-[#E5DED4] bg-[#F5F0E7] print:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="max-w-3xl">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              Only need the Regulation Cards right now?
            </p>

            <p className="mt-1 text-base leading-relaxed text-[#53645D]">
              You can purchase the cards separately without joining the broader Regulator Champions program.
            </p>
          </div>

          <a
            href={REGULATION_CARDS_URL}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
          >
            View the Regulation Cards
          </a>
        </div>
      </section>

      {/* WHAT THIS SUPPORTS */}
      <section className="bg-white py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                The hard part is usually not knowing another strategy.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Most teams already understand that behaviour communicates something and that children may need adults to help them settle. The difficulty comes when one child is screaming, another is running away, a parent is waiting at the door and the strategy that worked yesterday is not helping today.
              </p>

              <p className="mt-5 text-lg font-semibold leading-relaxed text-[#1C3B34]">
                Regulator Champions is designed for that gap between knowing the theory and making a thoughtful decision in the room.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden min-h-12 rounded-2xl border border-[#D8D0C4] bg-[#FAF5EC] px-5 py-3 text-base font-semibold text-[#1C3B34] transition hover:bg-white sm:inline-flex print:hidden"
            >
              Print this proposal
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT IS USED */}
      <section className="bg-[#F3EEE7] py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Use Regulator Champions in the way your team has capacity for.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              A service does not need every educator to attend every live session or work through the program at the same pace. The practical resources can be used when a situation arises, while recordings and deeper support are there when the team has more time.
            </p>
          </div>

          <div className="mt-8 border-y border-[#D8CFC2] md:grid md:grid-cols-4">
            <SupportStep
              title="Read"
              text="Start with one practical idea that relates to something already happening in the room."
            />

            <SupportStep
              title="Try"
              text="Use it in a real situation and notice what happens in the child, environment or interaction."
              divided
            />

            <SupportStep
              title="Watch"
              text="Return to the recordings when educators have the time and headspace to take more in."
              divided
            />

            <SupportStep
              title="Go deeper"
              text="Use questions, live sessions and additional resources when your service wants more support."
              divided
            />
          </div>
        </div>
      </section>

      {/* PLAN SELECTION */}
      <section className="py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Choose the level of support that makes sense for your service.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Both options are whole-service arrangements. The six-month option gives you a smaller starting point, while the twelve-month option gives your team more time to return to the support as different situations arise.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 print:grid-cols-2">
            <PlanChoice
              title="6-Month Preview"
              price={PREVIEW_PRICE}
              months={PREVIEW_MONTHS}
              description="Begin with the three Regulation Ladders currently available and use the recordings, questions and monthly support for six months before deciding what your service needs next."
              selected={
                selectedPlan === 'preview'
              }
              onClick={() =>
                setSelectedPlan('preview')
              }
            />

            <PlanChoice
              title="12-Month Regulator Champions"
              price={FULL_PRICE}
              months={FULL_MONTHS}
              description="Give your team year-round access to the Regulation Ladders, recordings, questions, implementation support and live sessions when those are useful."
              selected={
                selectedPlan === 'full'
              }
              onClick={() =>
                setSelectedPlan('full')
              }
            />
          </div>
        </div>
      </section>

      {/* SELECTED PLAN */}
      <section className="bg-white py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-base font-semibold text-[#657B6C]">
                Current selection
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
                {plan.label}
              </h2>

              <div className="mt-5">
                <strong className="text-5xl font-extrabold text-[#1C3B34]">
                  ${plan.price.toLocaleString()}
                </strong>

                <p className="mt-2 text-base text-[#6A7873]">
                  including GST · {plan.access}
                </p>
              </div>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                {plan.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-[#1C3B34]">
                What your service receives
              </h3>

              <div className="mt-5 border-t border-[#D8CFC2]">
                {plan.inclusions.map(
                  (item) => (
                    <div
                      key={item}
                      className="border-b border-[#D8CFC2] py-4"
                    >
                      <p className="text-base font-semibold leading-relaxed text-[#53645D]">
                        {item}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECORDINGS */}
      <section className="bg-[#1C3B34] py-12 text-white sm:py-16 print:bg-white print:py-8 print:text-black">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl print:text-black">
              Learn when your team actually has the capacity.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC] print:text-black">
              Professional learning should not feel like another thing educators have to squeeze into an already exhausting week.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC] print:text-black">
              Monthly online sessions are available for educators who want to join live, but live attendance is not required. Recordings are added to the Member Hub so teams can return to the learning during planning time, staff meetings or whenever they actually have the capacity to take it in.
            </p>
          </div>

          <div className="border-t border-white/20 print:border-gray-300">
            <SimpleRow
              title="Use the cards now"
              text="Begin with the practical resource that relates to the situation your team is dealing with."
              dark
            />

            <SimpleRow
              title="Submit a question"
              text="Educators can send a private, de-identified situation for Robyn to consider."
              dark
            />

            <SimpleRow
              title="Join live if it helps"
              text="Teams can participate in the monthly online conversation when staffing and capacity allow."
              dark
            />

            <SimpleRow
              title="Watch later"
              text="Return to the recording when there is actually time to reflect on the discussion."
              dark
            />
          </div>
        </div>
      </section>

      {/* OPTIONAL RECOGNITION */}
      <section className="bg-white py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="border-l-4 border-[#C29F60] pl-6 sm:pl-8">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Want formal recognition as well?
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Educators who choose to complete the fuller pathway can submit reflections and practical work for review by Robyn.
            </p>

            <p className="mt-4 text-lg font-semibold leading-relaxed text-[#1C3B34]">
              This is optional. Your team can still use the Regulation Ladders, resources, questions and recordings without completing a recognition pathway.
            </p>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="border-y border-[#E5DED4] bg-[#F7F3ED] py-12 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1C3B34]">
                Need information for leadership or funding discussions?
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                Services can consider Regulator Champions alongside their own professional learning priorities, improvement planning and current funding eligibility requirements.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row print:hidden">
              <Link
                href="/school-readiness-funding"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-center font-semibold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
              >
                Victorian funding information
              </Link>

              <Link
                href="/kindy-uplift"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-center font-semibold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
              >
                Queensland funding information
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INVOICE */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20 print:hidden">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Ready to request a centre proposal or invoice?
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
              Add your service details below and your selected option will be included automatically when you email Robyn. No payment is taken on this page.
            </p>
          </div>

          <div className="mt-8 max-w-3xl border-t border-white/20 pt-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Service / centre name"
                value={serviceName}
                onChange={setServiceName}
                placeholder="Your service name"
              />

              <FormField
                label="Director / contact name"
                value={contactName}
                onChange={setContactName}
                placeholder="Your name"
              />

              <FormField
                label="Work email"
                value={workEmail}
                onChange={setWorkEmail}
                placeholder="director@service.com.au"
                type="email"
              />

              <div>
                <label
                  htmlFor="fundingSource"
                  className="mb-2 block text-sm font-semibold text-[#D8E1DC]"
                >
                  Funding pathway
                </label>

                <select
                  id="fundingSource"
                  value={fundingSource}
                  onChange={(event) =>
                    setFundingSource(
                      event.target.value,
                    )
                  }
                  className="min-h-14 w-full rounded-2xl border border-white/15 bg-[#132C27] p-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                >
                  <option value="Victorian School Readiness Funding (SRF)">
                    Victorian School Readiness Funding
                  </option>

                  <option value="Queensland Kindy Uplift">
                    Queensland Kindy Uplift
                  </option>

                  <option value="Annual professional learning budget">
                    Annual professional learning budget
                  </option>

                  <option value="Other / not sure">
                    Other / not sure yet
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 border-y border-white/20 py-5">
              <p className="text-base text-[#C8D6D0]">
                Selected option
              </p>

              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <strong className="text-xl text-white">
                  {plan.label}
                </strong>

                <strong className="text-2xl text-[#E4C98E]">
                  ${plan.price.toLocaleString()} incl. GST
                </strong>
              </div>
            </div>

            <a
              href={emailHref}
              className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-center text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Email Robyn to request invoice
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProposalPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6 text-base font-semibold text-[#6A7873]">
          Loading proposal...
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}

function SupportStep({
  title,
  text,
  divided = false,
}: {
  title: string;
  text: string;
  divided?: boolean;
}) {
  return (
    <div
      className={`py-6 md:px-6 ${
        divided
          ? 'border-t border-[#D8CFC2] md:border-l md:border-t-0'
          : ''
      }`}
    >
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function PlanChoice({
  title,
  price,
  months,
  description,
  selected,
  onClick,
}: {
  title: string;
  price: number;
  months: number;
  description: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`border-t-2 p-6 text-left transition print:border-[#D8D0C4] ${
        selected
          ? 'border-[#1C3B34] bg-white shadow-sm'
          : 'border-[#D8CFC2] bg-transparent hover:bg-white'
      }`}
    >
      <h3 className="text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-4 text-4xl font-extrabold text-[#1C3B34]">
        ${price.toLocaleString()}
      </p>

      <p className="mt-1 text-base text-[#6A7873]">
        including GST · {months} months
      </p>

      <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
        {description}
      </p>

      {selected && (
        <p className="mt-5 text-sm font-semibold text-[#657B6C] print:hidden">
          Currently selected
        </p>
      )}
    </button>
  );
}

function SimpleRow({
  title,
  text,
  dark = false,
}: {
  title: string;
  text: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`border-b py-5 ${
        dark
          ? 'border-white/20 print:border-gray-300'
          : 'border-[#D8CFC2]'
      }`}
    >
      <h3
        className={`text-xl font-extrabold ${
          dark
            ? 'text-white print:text-black'
            : 'text-[#1C3B34]'
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 text-base leading-relaxed ${
          dark
            ? 'text-[#C8D6D0] print:text-black'
            : 'text-[#53645D]'
        }`}
      >
        {text}
      </p>
    </div>
  );
}

function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: 'text' | 'email';
}) {
  const id = label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-');

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-[#D8E1DC]"
      >
        {label}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="min-h-14 w-full rounded-2xl border border-white/15 bg-[#132C27] p-4 text-base text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
      />
    </div>
  );
}