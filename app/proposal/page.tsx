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

type Plan = 'preview' | 'full';

const PLAN_DETAILS = {
  preview: {
    label: '6-Month Preview',
    price: PREVIEW_PRICE,
    access: `${PREVIEW_MONTHS} months`,
    description:
      'A smaller way for your whole service to begin using Regulator Champions, test the approach in real practice and experience the ongoing support before deciding whether to continue.',
    inclusions: [
      'Whole-service access for 6 months',
      'Access to the 3 Regulation Ladders currently available',
      'Educator Floor Deck for quick in-the-room support',
      'Private Ask Robyn question submissions',
      'Live monthly Regulator Champions coaching',
      'Input into preferred coaching days and times',
      'Access to coaching recordings as they are added',
      'Educator reflection and progress tools',
      'Manager QIP and critical reflection tools',
      'Printable implementation resources',
    ],
  },

  full: {
    label: '12-Month Regulator Champions',
    price: FULL_PRICE,
    access: `${FULL_MONTHS} months`,
    description:
      'Year-round whole-service support for teams who want a practical way to work through regulation challenges as they arise, rather than relying on another one-off workshop or collection of resources.',
    inclusions: [
      'Whole-service access for 12 months',
      'Access to all Regulation Ladders available during membership',
      'New Regulation Ladder content added as the program develops',
      'Educator Floor Deck for real-time practice support',
      'Private Ask Robyn question submissions throughout the year',
      'Live monthly Regulator Champions coaching',
      'Monthly coaching shaped by educator questions and needs',
      'Access to the growing coaching recording library',
      'Educator reflection and practice progress tools',
      'Manager QIP and critical reflection support',
      'Family Bridge resources and conversation prompts',
      'Printable tools that support implementation in the room',
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

  const [workEmail, setWorkEmail] =
    useState('');

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
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white print:bg-white print:text-black">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34] print:border print:border-black print:bg-white">
              Regulator Champions
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Ongoing regulation support
              for your whole team.
            </h1>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#D8E1DC] print:text-black">
              Regulator Champions is for
              services that want more than
              another workshop or another
              folder of strategies.
            </p>

            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#BFD0C8] print:text-black">
              It gives educators a practical
              way to work through difficult
              moments, plus ongoing access
              to Robyn when the answer is
              still not obvious.
            </p>
          </div>
        </div>
      </section>

      {/* CORE VALUE */}
      <section className="border-b border-[#E5DED4] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                Why this is different
              </span>

              <h2 className="mt-3 max-w-4xl text-3xl font-extrabold text-[#1C3B34]">
                You probably already have
                plenty of resources.
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                The difficult part is
                knowing what to do when a
                real child, a real room and
                a tired educator are in
                front of you.
              </p>

              <p className="mt-4 max-w-4xl text-lg font-bold leading-relaxed text-[#1C3B34]">
                Regulator Champions helps
                your team know what to
                notice, what to try and
                where to go when they are
                still stuck.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden min-h-14 rounded-2xl border-2 border-[#D8D0C4] bg-[#FAF5EC] px-5 py-3 text-base font-bold text-[#1C3B34] transition hover:bg-white sm:inline-flex print:hidden"
            >
              Print this proposal
            </button>
          </div>
        </div>
      </section>

      {/* THREE PROMISES */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              The Regulator Champions approach
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
              Three things your educators
              should know.
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <PromiseCard
              number="1"
              title="Know what to notice"
              text="Look beyond the behaviour and notice what the child, environment and educator body may be communicating."
            />

            <PromiseCard
              number="2"
              title="Know what to try"
              text="Choose one thoughtful response rather than reacting quickly or cycling through strategies."
            />

            <PromiseCard
              number="3"
              title="Know where to go when stuck"
              text="Ask Robyn, bring the situation to monthly coaching and learn alongside the rest of your team."
            />
          </div>
        </div>
      </section>

      {/* WORKSHOP VS PROGRAM */}
      <section className="bg-white py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            Not the same as booking a workshop
          </span>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            A workshop gives your team a
            concentrated learning experience.
          </h2>

          <p className="mt-4 max-w-4xl text-xl leading-relaxed text-[#65736D]">
            Regulator Champions stays with
            your team as new questions and
            situations appear across the
            year.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <ComparisonCard
              eyebrow="Face-to-face workshop"
              title="Focused learning together"
              text="Your team comes together for a half or full day of teaching, discussion and practical professional learning."
              bestFor="Best when you want an intensive professional learning day."
            />

            <ComparisonCard
              eyebrow="Regulator Champions"
              title="Ongoing support in practice"
              text="Educators use the tools in real situations, ask questions, reflect with their team and return to Robyn through monthly coaching."
              bestFor="Best when you want support to continue after the initial learning moment."
              featured
            />
          </div>
        </div>
      </section>

      {/* PLAN SELECTION */}
      <section className="py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-7">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Choose your starting point
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Two ways for your whole
              service to begin.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 print:grid-cols-2">
            {/* PREVIEW */}
            <button
              type="button"
              onClick={() =>
                setSelectedPlan('preview')
              }
              className={`rounded-4xl border-2 p-7 text-left transition print:border-[#D8D0C4] print:bg-white ${
                selectedPlan === 'preview'
                  ? 'border-[#C29F60] bg-white shadow-lg'
                  : 'border-[#E5DED4] bg-white hover:border-[#C29F60]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                    Start smaller
                  </span>

                  <h3 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                    6-Month Preview
                  </h3>
                </div>

                {selectedPlan ===
                  'preview' && (
                  <span className="rounded-full bg-[#1C3B34] px-4 py-2 text-sm font-extrabold text-white print:hidden">
                    Selected
                  </span>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <strong className="text-4xl font-extrabold text-[#1C3B34]">
                  $
                  {PREVIEW_PRICE.toLocaleString()}
                </strong>

                <span className="pb-1 text-base text-[#6A7873]">
                  incl. GST
                </span>
              </div>

              <p className="mt-2 text-base font-bold text-[#657B6C]">
                {PREVIEW_MONTHS} months
                whole-service access
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                Begin with the three
                Regulation Ladders currently
                available and experience the
                monthly support before
                deciding whether to continue.
              </p>
            </button>

            {/* FULL */}
            <button
              type="button"
              onClick={() =>
                setSelectedPlan('full')
              }
              className={`rounded-4xl border-2 p-7 text-left transition print:border-[#D8D0C4] print:bg-white ${
                selectedPlan === 'full'
                  ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-lg print:text-black'
                  : 'border-[#E5DED4] bg-white hover:border-[#1C3B34]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span
                    className={`text-sm font-extrabold uppercase tracking-widest ${
                      selectedPlan === 'full'
                        ? 'text-[#E4C98E] print:text-[#9A793D]'
                        : 'text-[#9A793D]'
                    }`}
                  >
                    Year-round support
                  </span>

                  <h3
                    className={`mt-2 text-2xl font-extrabold ${
                      selectedPlan === 'full'
                        ? 'text-white print:text-[#1C3B34]'
                        : 'text-[#1C3B34]'
                    }`}
                  >
                    12-Month Regulator
                    Champions
                  </h3>
                </div>

                {selectedPlan === 'full' && (
                  <span className="rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34] print:hidden">
                    Selected
                  </span>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <strong
                  className={`text-4xl font-extrabold ${
                    selectedPlan === 'full'
                      ? 'text-white print:text-[#1C3B34]'
                      : 'text-[#1C3B34]'
                  }`}
                >
                  $
                  {FULL_PRICE.toLocaleString()}
                </strong>

                <span
                  className={`pb-1 text-base ${
                    selectedPlan === 'full'
                      ? 'text-[#C8D6D0] print:text-[#6A7873]'
                      : 'text-[#6A7873]'
                  }`}
                >
                  incl. GST
                </span>
              </div>

              <p
                className={`mt-2 text-base font-bold ${
                  selectedPlan === 'full'
                    ? 'text-[#E4C98E] print:text-[#657B6C]'
                    : 'text-[#657B6C]'
                }`}
              >
                {FULL_MONTHS} months
                whole-service access
              </p>

              <p
                className={`mt-4 text-lg leading-relaxed ${
                  selectedPlan === 'full'
                    ? 'text-[#D8E1DC] print:text-[#53645D]'
                    : 'text-[#53645D]'
                }`}
              >
                Give your whole team ongoing
                access to the Regulation
                Ladders, monthly coaching,
                Ask Robyn support and the
                growing learning library.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* SELECTED PLAN */}
      <section className="bg-white py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
                Selected pathway
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
                {plan.label}
              </h2>

              <div className="mt-5">
                <strong className="text-5xl font-extrabold text-[#1C3B34]">
                  $
                  {plan.price.toLocaleString()}
                </strong>

                <p className="mt-2 text-base text-[#6A7873]">
                  including GST ·{' '}
                  {plan.access}
                </p>
              </div>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                {plan.description}
              </p>
            </div>

            <div className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-6 sm:p-8">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                What your service receives
              </span>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {plan.inclusions.map(
                  (item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-[#E5DED4] bg-white p-4"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#C29F60] text-sm font-extrabold text-[#1C3B34]">
                        ✓
                      </span>

                      <span className="text-base font-semibold leading-relaxed text-[#53645D]">
                        {item}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MONTHLY SUPPORT */}
      <section className="bg-[#1C3B34] py-12 text-white sm:py-16 print:bg-white print:text-black print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E] print:text-black">
            The part a PDF cannot give you
          </span>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold sm:text-4xl">
            Your team can come back when
            the first idea does not solve
            the problem.
          </h2>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <DarkCard
              title="Ask Robyn"
              text="Educators can privately submit general situations and questions without identifying children or families."
            />

            <DarkCard
              title="Monthly coaching"
              text="Real educator questions help shape the live session so the learning stays connected to what is happening in services."
            />

            <DarkCard
              title="Recordings"
              text="As monthly sessions run, the recording library will grow so teams can revisit learning when they need it."
            />
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-white py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-7 lg:grid-cols-2">
            <FundingCard
              state="Victoria"
              title="School Readiness Funding"
              text="Explore information for services considering Regulator Champions as part of an identified professional learning, educator capability or service improvement priority."
              href="/school-readiness-funding"
              linkText="Explore SRF information"
            />

            <FundingCard
              state="Queensland"
              title="Kindy Uplift"
              text="Explore information for services considering Regulator Champions alongside professional learning, participation and social and emotional capability priorities."
              href="/kindy-uplift"
              linkText="Explore Kindy Uplift information"
            />
          </div>
        </div>
      </section>

      {/* INVOICE */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20 print:hidden">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
              Ready to request an invoice?
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Send your service details
              directly to Robyn.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
              Your service name, funding
              pathway and selected program
              will be included in the
              request.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-8">
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
                  className="mb-2 block text-sm font-bold text-[#D8E1DC]"
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
                    Victorian School
                    Readiness Funding
                  </option>

                  <option value="Queensland Kindy Uplift">
                    Queensland Kindy Uplift
                  </option>

                  <option value="Annual professional learning budget">
                    Annual professional
                    learning budget
                  </option>

                  <option value="Other / not sure">
                    Other / not sure yet
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-[#C29F60]/30 bg-[#C29F60]/10 p-5">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#E4C98E]">
                Selected
              </span>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <strong className="text-xl">
                  {plan.label}
                </strong>

                <strong className="text-2xl text-[#E4C98E]">
                  $
                  {plan.price.toLocaleString()}{' '}
                  incl. GST
                </strong>
              </div>
            </div>

            <a
              href={emailHref}
              className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-center text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Email Robyn to request invoice
            </a>

            <p className="mt-4 text-center text-sm leading-relaxed text-[#BFD0C8]">
              This opens your email app with
              the details already filled in.
              No payment is taken on this
              page.
            </p>
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
        <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6 text-base font-bold text-[#6A7873]">
          Loading proposal...
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}

function PromiseCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E5DED4] bg-white p-6">
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C29F60] text-lg font-extrabold text-[#1C3B34]">
        {number}
      </span>

      <h3 className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </article>
  );
}

function ComparisonCard({
  eyebrow,
  title,
  text,
  bestFor,
  featured = false,
}: {
  eyebrow: string;
  title: string;
  text: string;
  bestFor: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`rounded-4xl border-2 p-7 ${
        featured
          ? 'border-[#C29F60] bg-[#FAF5EC]'
          : 'border-[#E5DED4] bg-white'
      }`}
    >
      <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
        {eyebrow}
      </span>

      <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
        {text}
      </p>

      <p className="mt-5 text-base font-bold leading-relaxed text-[#1C3B34]">
        {bestFor}
      </p>
    </article>
  );
}

function DarkCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6 print:border-gray-300 print:bg-white">
      <h3 className="text-2xl font-extrabold text-white print:text-black">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#C8D6D0] print:text-black">
        {text}
      </p>
    </article>
  );
}

function FundingCard({
  state,
  title,
  text,
  href,
  linkText,
}: {
  state: string;
  title: string;
  text: string;
  href: string;
  linkText: string;
}) {
  return (
    <article className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7">
      <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
        {state}
      </span>

      <h2 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h2>

      <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
        {text}
      </p>

      <Link
        href={href}
        className="mt-5 inline-flex text-base font-bold text-[#1C3B34] print:hidden"
      >
        {linkText} →
      </Link>
    </article>
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
        className="mb-2 block text-sm font-bold text-[#D8E1DC]"
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