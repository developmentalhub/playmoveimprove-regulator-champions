'use client';

import React, { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const PREVIEW_PRICE = 1790;
const FULL_PRICE = 4790;
const PREVIEW_MONTHS = 6;
const FULL_MONTHS = 12;

type Plan = 'preview' | 'full';

const PLAN_DETAILS = {
  preview: {
    label: '3 Ladder Preview',
    price: PREVIEW_PRICE,
    access: `${PREVIEW_MONTHS} months`,
    description:
      'Begin with three practical Regulation Ladders and give your whole team time to use the approach in everyday practice before deciding whether to continue.',
    inclusions: [
      'Whole-service access for 6 months',
      'Ladders 1 to 3',
      'Regulated Educator resources',
      'Connected Drop-Offs resources',
      'Participation Beyond Sitting resources',
      'Practical room reflection tools',
      'Educator implementation resources',
      'Leadership reflection prompts',
    ],
  },

  full: {
    label: 'Full 8 Ladder Pathway',
    price: FULL_PRICE,
    access: `${FULL_MONTHS} months`,
    description:
      'Take your whole service through the complete Regulator Champions pathway with all eight Regulation Ladders and service-wide implementation resources.',
    inclusions: [
      'Whole-service access for 12 months',
      'Complete 8 Ladder pathway',
      'Educator practice resources',
      'Room reflection tools',
      'Practice leadership resources',
      'Family connection resources',
      'NQS and QIP reflection support',
      'Implementation tools for whole-team consistency',
    ],
  },
} as const;

function ProposalContent() {
  const searchParams = useSearchParams();

  const initialPlan: Plan =
    searchParams.get('plan') === 'full' ? 'full' : 'preview';

  const [selectedPlan, setSelectedPlan] =
    useState<Plan>(initialPlan);

  const [serviceName, setServiceName] = useState('');
  const [contactName, setContactName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [fundingSource, setFundingSource] = useState(
    'Victorian School Readiness Funding (SRF)',
  );

  const plan = PLAN_DETAILS[selectedPlan];

  const emailHref = useMemo(() => {
    const subject = encodeURIComponent(
      `Regulator Champions invoice request - ${serviceName || plan.label}`,
    );

    const body = encodeURIComponent(
      `Hi Robyn,

I would like to request an invoice / proposal for Regulator Champions.

Service name: ${serviceName || ''}
Contact name: ${contactName || ''}
Work email: ${workEmail || ''}
Funding pathway: ${fundingSource}

Program:
${plan.label}
$${plan.price.toLocaleString()} including GST
${plan.access} access

Please let me know if you need any further information.

Thank you`,
    );

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
            <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#1C3B34] print:border print:border-black print:bg-white">
              Regulator Champions
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Whole-service professional learning proposal
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg print:text-black">
              Choose the starting point that best suits your service, then use
              this page to support conversations with your director, Approved
              Provider or funding decision-maker.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8] print:text-black">
              Regulator Champions helps educators become more confident at
              noticing what children&apos;s bodies may be communicating before
              behaviour becomes the only thing everyone can see.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                A service-wide approach
              </span>

              <h2 className="mt-2 text-2xl font-extrabold text-[#1C3B34] sm:text-3xl">
                Start with regulation, connection and what educators notice.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#53645D]">
                Rather than giving educators another list of strategies,
                Regulator Champions builds a shared way of looking at difficult
                moments. Teams learn to consider the child, the educator and
                the environment before deciding what to do next.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden min-h-12 rounded-2xl border border-[#D8D0C4] bg-[#FAF5EC] px-5 py-3 text-sm font-bold text-[#1C3B34] transition hover:bg-white sm:inline-flex print:hidden"
            >
              Print this proposal
            </button>
          </div>
        </div>
      </section>

      {/* PLAN SELECTION */}
      <section className="py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mb-7">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Choose your starting point
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Two ways to begin
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 print:grid-cols-2">
            <button
              type="button"
              onClick={() => setSelectedPlan('preview')}
              className={`rounded-4xl border-2 p-7 text-left transition print:border-[#D8D0C4] print:bg-white ${
                selectedPlan === 'preview'
                  ? 'border-[#C29F60] bg-white shadow-lg'
                  : 'border-[#E6E2DC] bg-white hover:border-[#C29F60]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                    Start smaller
                  </span>

                  <h3 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                    3 Ladder Preview
                  </h3>
                </div>

                {selectedPlan === 'preview' && (
                  <span className="rounded-full bg-[#1C3B34] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white print:hidden">
                    Selected
                  </span>
                )}
              </div>

              <div className="mt-5 flex flex-wrap items-end gap-3">
                <strong className="text-4xl font-extrabold text-[#1C3B34]">
                  ${PREVIEW_PRICE.toLocaleString()}
                </strong>

                <span className="pb-1 text-sm text-[#6A7873]">
                  incl. GST
                </span>
              </div>

              <p className="mt-2 text-sm font-bold text-[#657B6C]">
                {PREVIEW_MONTHS} months whole-service access
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                Begin with the first three ladders and see how the approach
                works with your educators before deciding whether your service
                wants to continue.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setSelectedPlan('full')}
              className={`rounded-4xl border-2 p-7 text-left transition print:border-[#D8D0C4] print:bg-white ${
                selectedPlan === 'full'
                  ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-lg print:text-black'
                  : 'border-[#E6E2DC] bg-white hover:border-[#1C3B34]'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span
                    className={`text-xs font-extrabold uppercase tracking-widest ${
                      selectedPlan === 'full'
                        ? 'text-[#E4C98E] print:text-[#9A793D]'
                        : 'text-[#9A793D]'
                    }`}
                  >
                    Complete pathway
                  </span>

                  <h3
                    className={`mt-2 text-2xl font-extrabold ${
                      selectedPlan === 'full'
                        ? 'text-white print:text-[#1C3B34]'
                        : 'text-[#1C3B34]'
                    }`}
                  >
                    Full 8 Ladder Pathway
                  </h3>
                </div>

                {selectedPlan === 'full' && (
                  <span className="rounded-full bg-[#C29F60] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#1C3B34] print:hidden">
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
                  ${FULL_PRICE.toLocaleString()}
                </strong>

                <span
                  className={`pb-1 text-sm ${
                    selectedPlan === 'full'
                      ? 'text-[#C8D6D0] print:text-[#6A7873]'
                      : 'text-[#6A7873]'
                  }`}
                >
                  incl. GST
                </span>
              </div>

              <p
                className={`mt-2 text-sm font-bold ${
                  selectedPlan === 'full'
                    ? 'text-[#E4C98E] print:text-[#657B6C]'
                    : 'text-[#657B6C]'
                }`}
              >
                {FULL_MONTHS} months whole-service access
              </p>

              <p
                className={`mt-4 text-sm leading-relaxed ${
                  selectedPlan === 'full'
                    ? 'text-[#D8E1DC] print:text-[#53645D]'
                    : 'text-[#53645D]'
                }`}
              >
                Give your whole team access to the complete eight-ladder
                pathway and implementation resources across the service.
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
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Selected pathway
              </span>

              <h2 className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
                {plan.label}
              </h2>

              <div className="mt-5">
                <strong className="text-5xl font-extrabold text-[#1C3B34]">
                  ${plan.price.toLocaleString()}
                </strong>

                <p className="mt-1 text-sm text-[#6A7873]">
                  including GST · {plan.access}
                </p>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#53645D]">
                {plan.description}
              </p>
            </div>

            <div className="rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-6 sm:p-8">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                What your service receives
              </span>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {plan.inclusions.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-[#E6E2DC] bg-white p-4"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C29F60] text-[10px] font-extrabold text-[#1C3B34]">
                      ✓
                    </span>

                    <span className="text-sm font-semibold leading-relaxed text-[#53645D]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT IS FOR */}
      <section className="bg-[#FAF5EC] py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
              The purpose
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Not another folder of behaviour strategies.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Regulator Champions is designed to help educators become better
              at noticing what is happening before automatically deciding that
              a child is refusing, misbehaving, not listening or needing another
              consequence.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6">
              <span className="text-sm font-extrabold text-[#C29F60]">
                01
              </span>

              <h3 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                Notice
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                What is happening in the child&apos;s body, the educator and
                the environment?
              </p>
            </article>

            <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6">
              <span className="text-sm font-extrabold text-[#C29F60]">
                02
              </span>

              <h3 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                Consider
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                What might be sitting underneath the behaviour we can see?
              </p>
            </article>

            <article className="rounded-3xl border border-[#E6E2DC] bg-white p-6">
              <span className="text-sm font-extrabold text-[#C29F60]">
                03
              </span>

              <h3 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                Respond
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                What thoughtful change could support connection, participation
                or co-regulation?
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-white py-12 sm:py-16 print:py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-7 lg:grid-cols-2">
            <div className="rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-7">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#657B6C]">
                Victoria
              </span>

              <h2 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                School Readiness Funding
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                Explore the dedicated page for services considering Regulator
                Champions as part of an identified professional learning,
                educator capability or service improvement priority.
              </p>

              <Link
                href="/school-readiness-funding"
                className="mt-5 inline-flex font-bold text-[#1C3B34] print:hidden"
              >
                Explore SRF information →
              </Link>
            </div>

            <div className="rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-7">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#657B6C]">
                Queensland
              </span>

              <h2 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                Kindy Uplift
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                Explore the dedicated Kindy Uplift page for links with
                professional learning, social and emotional capability,
                participation and educator practice.
              </p>

              <Link
                href="/kindy-uplift"
                className="mt-5 inline-flex font-bold text-[#1C3B34] print:hidden"
              >
                Explore Kindy Uplift information →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INVOICE REQUEST */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20 print:hidden">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
              Ready to request an invoice?
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Send your service details directly to Robyn.
            </h2>

            <p className="mt-4 text-sm leading-relaxed text-[#D8E1DC]">
              Invoices are organised manually so your service name, funding
              information and purchase details can be included correctly.
            </p>
          </div>

          <div className="mx-auto max-w-3xl rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="serviceName"
                  className="mb-1.5 block text-xs font-bold text-[#D8E1DC]"
                >
                  Service / centre name
                </label>

                <input
                  id="serviceName"
                  type="text"
                  value={serviceName}
                  onChange={(event) =>
                    setServiceName(event.target.value)
                  }
                  placeholder="Your service name"
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                />
              </div>

              <div>
                <label
                  htmlFor="contactName"
                  className="mb-1.5 block text-xs font-bold text-[#D8E1DC]"
                >
                  Director / contact name
                </label>

                <input
                  id="contactName"
                  type="text"
                  value={contactName}
                  onChange={(event) =>
                    setContactName(event.target.value)
                  }
                  placeholder="Your name"
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                />
              </div>

              <div>
                <label
                  htmlFor="workEmail"
                  className="mb-1.5 block text-xs font-bold text-[#D8E1DC]"
                >
                  Work email
                </label>

                <input
                  id="workEmail"
                  type="email"
                  value={workEmail}
                  onChange={(event) =>
                    setWorkEmail(event.target.value)
                  }
                  placeholder="director@service.com.au"
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                />
              </div>

              <div>
                <label
                  htmlFor="fundingSource"
                  className="mb-1.5 block text-xs font-bold text-[#D8E1DC]"
                >
                  Funding pathway
                </label>

                <select
                  id="fundingSource"
                  value={fundingSource}
                  onChange={(event) =>
                    setFundingSource(event.target.value)
                  }
                  className="min-h-12 w-full rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
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

            <div className="mt-6 rounded-2xl border border-[#C29F60]/30 bg-[#C29F60]/10 p-5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
                Selected
              </span>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <strong className="text-lg">
                  {plan.label}
                </strong>

                <strong className="text-xl text-[#E4C98E]">
                  ${plan.price.toLocaleString()} incl. GST
                </strong>
              </div>
            </div>

            <a
              href={emailHref}
              className="mt-6 flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-center text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Email Robyn to request invoice
            </a>

            <p className="mt-4 text-center text-xs leading-relaxed text-[#BFD0C8]">
              This opens your email app with the details above already filled
              in. No payment is taken on this page.
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
        <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6 text-sm font-bold text-[#6A7873]">
          Loading proposal...
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}