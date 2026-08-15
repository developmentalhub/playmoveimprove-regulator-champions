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
  title: 'School Readiness Funding Coaching | Play Move Improve',
  description:
    'Victorian School Readiness Funding coaching information for Regulator Champions by Play Move Improve, including business details, pricing, SRF alignment and proposal information for early childhood services.',
  alternates: {
    canonical: '/school-readiness-funding',
  },
  openGraph: {
    title: 'School Readiness Funding Coaching | Regulator Champions',
    description:
      'Funding and procurement information for Victorian early childhood services considering Regulator Champions coaching through School Readiness Funding.',
    url: '/school-readiness-funding',
    type: 'website',
  },
};

const srfPlanWording = `Program / support: Regulator Champions coaching with Play Move Improve

SRF priority area: Wellbeing, with a focus on children's social, emotional and executive-function development.

Identified educator capability need: [insert your service priority, for example improving educator confidence during transitions, reducing room overstimulation, strengthening co-regulation practice, or improving consistency of educator responses].

Our service proposes to engage Robyn Papworth from Play Move Improve as our coach through the School Readiness Funding Coaching item. The coaching will support educators to reflect on current practice, identify service-specific goals, trial developmentally informed regulation and co-regulation strategies, and review how these changes influence everyday kindergarten routines.

The coaching is intended to build educator capability rather than provide individual clinical treatment for children. Implementation will be linked to our service's identified SRF goals and the needs of children currently enrolled at our service.`;

export default function SchoolReadinessFundingPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      {/* HERO */}
      <section className="bg-teal-950 px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Victorian School Readiness Funding
          </span>

          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl">
            Use School Readiness Funding for Regulator Champions Coaching
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            A practical funding and procurement guide for Victorian early
            childhood services considering Play Move Improve coaching through
            the School Readiness Funding Coaching item.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/proposal?plan=preview"
              className="rounded-xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
            >
              View $1,790 Preview Proposal →
            </Link>

            <Link
              href="/proposal?plan=full"
              className="rounded-xl border border-teal-700 bg-teal-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-800"
            >
              View Full $4,790 Proposal →
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-12 px-6 py-12">
        {/* 2026 FUNDING BANNER */}
        <section className="rounded-3xl border border-amber-300 bg-amber-50 p-6 md:p-8">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-amber-800">
            2026 Funding Opportunity
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Still have School Readiness Funding available this year?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Services do not need to commit to the complete eight-ladder pathway
            immediately. The 3-Ladder Preview provides a smaller starting point
            for services that want to begin coaching and professional learning
            using available 2026 funding.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-amber-200 bg-white p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Start Now
              </span>
              <strong className="mt-1 block text-2xl font-extrabold text-slate-900">
                ${PREVIEW_PRICE.toLocaleString()}
              </strong>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                3-Ladder Preview, including GST, with six months of site access.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Continue Later
              </span>
              <strong className="mt-1 block text-2xl font-extrabold text-slate-900">
                ${CONTINUATION_PRICE.toLocaleString()}
              </strong>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Ladders 4 to 8 after the {CONTINUATION_DISCOUNT_PCT}% continuation
                discount from the standard $
                {CONTINUATION_STANDARD_PRICE.toLocaleString()} price.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-300 bg-teal-50 p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Best Full-Pathway Value
              </span>
              <strong className="mt-1 block text-2xl font-extrabold text-teal-950">
                ${FULL_PRICE.toLocaleString()}
              </strong>
              <p className="mt-1 text-xs leading-relaxed text-teal-900">
                Full 8-Ladder Program upfront, saving $
                {UPFRONT_SAVING.toLocaleString()} compared with completing both
                stages separately.
              </p>
            </div>
          </div>
        </section>

        {/* OFFICIAL COACHING PATHWAY */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              How SRF Coaching Works
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Services arrange coaching independently
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <p className="text-sm leading-relaxed text-slate-700">
                The Victorian School Readiness Funding Menu includes a dedicated
                <strong> Coaching</strong> item. The Department describes
                coaching as a structured, ongoing professional learning
                relationship designed to improve professional practice.
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                Importantly for services choosing Regulator Champions, the
                Department's Coaching item states that{' '}
                <strong>services arrange coaching independently</strong>. This
                allows a service to select a suitably qualified coach whose
                experience and approach match its identified needs and SRF
                priorities.
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                The Department identifies observation, feedback, goal setting
                and reflection as important elements of effective coaching and
                advises services to consider a coach's qualifications, early
                childhood experience, VEYLDF knowledge and understanding of the
                National Quality Framework.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://www.vic.gov.au/coaching"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-teal-800 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-900"
                >
                  Victorian Government Coaching Item ↗
                </a>

                <a
                  href="https://www.vic.gov.au/school-readiness-funding"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-teal-400"
                >
                  School Readiness Funding Information ↗
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-teal-950 p-6 text-white md:p-8">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Strongest SRF Alignment
              </span>

              <h3 className="mt-2 text-xl font-extrabold">
                Wellbeing
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-teal-100">
                Regulator Champions is designed primarily around educator
                capability in co-regulation, social and emotional wellbeing,
                executive-function support, reflective practice and consistent
                responses across everyday kindergarten routines.
              </p>

              <p className="mt-4 text-xs leading-relaxed text-teal-100">
                The Department identifies Wellbeing as including social,
                emotional and executive function within SRF.
              </p>
            </div>
          </div>
        </section>

        {/* WHY ROBYN */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Coach Information
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Why a service may choose Robyn Papworth
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Professional background
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Robyn Papworth is an Accredited Exercise Physiologist and
                Developmental Educator who has trained and supported early
                childhood educators across Australia.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Early childhood focus
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Coaching focuses on translating regulation, sensory, movement
                and developmental knowledge into realistic changes educators can
                use in everyday rooms and routines.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Reflective coaching
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Teams are asked to identify pressure points, reflect on current
                responses, trial practical changes and review what happens in
                practice rather than simply watch one-off training.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Whole-service implementation
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Regulator Champions creates a shared pathway across educators,
                room leaders and leadership so coaching can be translated into
                more consistent service-wide practice.
              </p>
            </div>
          </div>
        </section>

        {/* PROCUREMENT SNAPSHOT */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Procurement Information
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Information for your Approved Provider or finance team
            </h2>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">
            <dl className="divide-y divide-slate-200 text-sm">
              {[
                ['Business / provider', 'Play Move Improve'],
                ['ABN', '17 415 190 263'],
                ['Program', 'Regulator Champions'],
                ['Coach', 'Robyn Papworth'],
                [
                  'Professional background',
                  'Accredited Exercise Physiologist and Developmental Educator',
                ],
                ['Delivery', 'Online coaching and professional learning'],
                ['Service licence', 'One designated early childhood service location'],
                [
                  '3-Ladder Preview',
                  `$${PREVIEW_PRICE.toLocaleString()} incl. GST • 6 months`,
                ],
                [
                  'Full 8-Ladder Program',
                  `$${FULL_PRICE.toLocaleString()} incl. GST • 12 months`,
                ],
                [
                  'Continuation after Preview',
                  `$${CONTINUATION_PRICE.toLocaleString()} incl. GST after 20% discount`,
                ],
                ['Email', 'robyn@playmoveimprove.com.au'],
                [
                  'Purchasing',
                  'Formal proposal, tax invoice and purchase-order arrangements available',
                ],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[220px_1fr]"
                >
                  <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    {label}
                  </dt>
                  <dd className="font-semibold text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <p className="text-xs leading-relaxed text-slate-500">
            Prices shown are current website offer prices and include GST.
            Formal quotes and invoices should be checked by the purchasing
            service before approval.
          </p>
        </section>

        {/* WHAT IS INCLUDED */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Coaching and Professional Learning
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              What Regulator Champions is designed to build
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'Shared co-regulation practice',
                'Build a common team understanding of regulation and co-regulation rather than relying on different individual responses in each room.',
              ],
              [
                'Reflective educator capability',
                'Use practical reflection, goal setting and real-room application to help professional learning show up in everyday practice.',
              ],
              [
                'Support during difficult routines',
                'Work through common pressure points such as arrivals, transitions, participation, escalation, sensory overload and fatigue.',
              ],
              [
                'Whole-service consistency',
                'Help leaders and educators build shared language and expectations across rooms, shifts and staff changes.',
              ],
              [
                'NQS and QIP reflection',
                'Provide practical mapping and example wording to help services reflect on how their work may contribute to NQS and Quality Improvement Plan evidence.',
              ],
              [
                'Progressive Regulation Ladders',
                'Move through the pathway progressively so educators have time to practise, reflect and embed changes before the next stage.',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <strong className="block text-sm font-bold text-slate-900">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* READY TO COPY */}
        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            SRF Planning Support
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-teal-950">
            Ready-to-use wording for your SRF plan or internal approval
          </h2>

          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-teal-900">
            Services should adapt this wording to their own identified needs,
            goals and SRF planning requirements rather than copying it without
            considering their local context.
          </p>

          <pre className="mt-5 max-h-130 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-teal-200 bg-white p-5 font-sans text-xs leading-relaxed text-slate-700">
            {srfPlanWording}
          </pre>
        </section>

        {/* SIMPLE PROCESS */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Next Steps
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              A simple purchasing pathway
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[
              ['1', 'Choose your starting point', 'Select the $1,790 Preview or the $4,790 complete pathway.'],
              ['2', 'Link it to your SRF goal', 'Document the educator capability need and why coaching is appropriate for your service.'],
              ['3', 'Generate the proposal', 'Open the proposal page for internal approval, committee review or your Approved Provider.'],
              ['4', 'Request invoice / PO processing', 'Play Move Improve can issue the purchasing documentation required to activate access.'],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-white">
                  {number}
                </span>
                <strong className="mt-3 block text-sm font-bold text-slate-900">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* IMPORTANT NOTE */}
        <section className="rounded-2xl border border-slate-300 bg-slate-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-slate-800">
            Funding responsibility
          </strong>

          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Regulator Champions is offered as coaching and professional learning.
            Each service remains responsible for deciding whether the engagement
            fits its current School Readiness Funding plan, internal purchasing
            requirements and documentation obligations. References to SRF do not
            imply endorsement of Play Move Improve by the Victorian Department
            of Education.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-3xl bg-teal-950 p-7 text-white md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Ready to take this to your Approved Provider?
              </span>
              <h2 className="mt-1 text-2xl font-extrabold">
                Choose the proposal that fits your 2026 funding
              </h2>
              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-teal-100">
                Start with three ladders if you have a smaller amount available
                now, or choose the full pathway upfront for the lowest total
                eight-ladder price.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/proposal?plan=preview"
                className="rounded-xl bg-amber-400 px-5 py-3 text-center text-xs font-bold text-slate-950 transition hover:bg-amber-300"
              >
                $1,790 Preview Proposal →
              </Link>

              <Link
                href="/proposal?plan=full"
                className="rounded-xl border border-teal-700 bg-teal-900 px-5 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-800"
              >
                $4,790 Full Proposal →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}