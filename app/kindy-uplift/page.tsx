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
  title: 'Kindy Uplift Coaching | Play Move Improve',
  description:
    'Queensland Kindy Uplift coaching and professional learning information for Regulator Champions by Play Move Improve, including priority-area alignment, pricing, business details and proposal information.',
  alternates: {
    canonical: '/kindy-uplift',
  },
  openGraph: {
    title: 'Kindy Uplift Coaching | Regulator Champions',
    description:
      'Funding and procurement information for Queensland kindergarten services considering Regulator Champions coaching and professional learning through Kindy Uplift.',
    url: '/kindy-uplift',
    type: 'website',
  },
};

const kindyUpliftPlanWording = `Program / support: Regulator Champions online coaching and professional learning with Play Move Improve

Kindy Uplift priority area: Social and emotional learning and Executive function

Additional alignment where relevant: Physicality and Equity and Access for all

Identified educator capability need: [insert your service priority, for example improving educator confidence during transitions, strengthening co-regulation practice, supporting children who experience sensory overload, or improving consistency of educator responses].

Our service proposes to engage Play Move Improve for Regulator Champions online coaching and professional learning. The program will support educators to strengthen shared co-regulation practice, reflect on current responses, identify service-specific goals and trial practical strategies across everyday kindergarten routines.

This support is intended to build teacher and educator capability in children's social and emotional learning and executive-function development. Where relevant to our identified needs, the program may also support Physicality through movement and sensory-informed practice and Equity and Access for all through more consistent support for children's meaningful participation.

The engagement will be linked to our Kindy Uplift planning, identified priority areas, data-informed goals and implementation review.`;

export default function KindyUpliftPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      {/* HERO */}
      <section className="bg-teal-950 px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Queensland Kindy Uplift
          </span>

          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl">
            Use Kindy Uplift Funding for Regulator Champions Coaching
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            A practical funding and procurement guide for Queensland
            kindergarten services considering Play Move Improve online coaching
            and professional learning through Kindy Uplift.
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
            Still have Kindy Uplift funding available this year?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Kindy Uplift can be used for professional development, programs,
            resources and supports that build teacher and educator capability.
            If your service has funding available, Regulator Champions can be
            started with the 3-Ladder Preview rather than committing to the
            complete eight-ladder pathway immediately.
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

        {/* KINDY UPLIFT OVERVIEW */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              How Kindy Uplift Works
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Funding should connect to your identified priority areas
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
              <p className="text-sm leading-relaxed text-slate-700">
                Queensland Kindy Uplift funding can support professional
                development, programs, resources and supports that build teacher
                and educator capability and strengthen inclusion in approved
                kindergarten programs.
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                Services are expected to use data-informed planning to identify
                priority areas, decide which programs, resources, supports or
                professional development best address those needs, estimate
                expenditure and then reflect on implementation and outcomes.
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                Regulator Champions fits this process when a service has
                identified a need to strengthen educator capability in
                regulation, co-regulation, executive-function support,
                participation or sensory-informed practice.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href="https://earlychildhood.qld.gov.au/grants-and-funding/kindy-uplift-program"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-teal-800 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-teal-900"
                >
                  Queensland Kindy Uplift Information ↗
                </a>

                <a
                  href="https://earlychildhood.qld.gov.au/grants-and-funding/kindy-uplift-program/planning"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-teal-400"
                >
                  Kindy Uplift Planning Guidance ↗
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-teal-950 p-6 text-white md:p-8">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Strongest Alignment
              </span>

              <h3 className="mt-2 text-xl font-extrabold">
                Social and emotional learning
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-teal-100">
                Regulator Champions supports educators to build shared
                co-regulation practice and respond more consistently to
                children's emotional and social regulation needs.
              </p>

              <h3 className="mt-6 text-xl font-extrabold">
                Executive function
              </h3>

              <p className="mt-3 text-xs leading-relaxed text-teal-100">
                The program also supports educator understanding of skills such
                as impulse control, persistence, adaptability, focus and problem
                solving within everyday routines.
              </p>
            </div>
          </div>
        </section>

        {/* PRIORITY AREAS */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Kindy Uplift Priority Areas
            </span>
            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Where Regulator Champions may fit
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border-2 border-teal-300 bg-teal-50 p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Primary Alignment
              </span>
              <strong className="mt-1 block text-lg font-extrabold text-teal-950">
                Social and emotional learning
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-teal-900">
                Co-regulation, recognising emotional states, supporting social
                regulation, building shared educator responses and strengthening
                children's participation in everyday kindergarten experiences.
              </p>
            </div>

            <div className="rounded-2xl border-2 border-teal-300 bg-teal-50 p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Primary Alignment
              </span>
              <strong className="mt-1 block text-lg font-extrabold text-teal-950">
                Executive function
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-teal-900">
                Educator strategies that support inhibitory control, cognitive
                flexibility, working memory, persistence, adaptability and
                problem solving.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Additional Alignment Where Relevant
              </span>
              <strong className="mt-1 block text-lg font-extrabold text-slate-900">
                Physicality
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Regulator Champions includes sensory and movement-informed
                practice that may support services where physicality, sensory
                learning and children's ability to participate safely and
                confidently are identified needs.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Additional Alignment Where Relevant
              </span>
              <strong className="mt-1 block text-lg font-extrabold text-slate-900">
                Equity and Access for all
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                The program may support services seeking more consistent
                educator responses to children who experience barriers to
                meaningful engagement and participation.
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-slate-500">
            Kindy Uplift has six priority areas. Regulator Champions should be
            linked only to the priority areas your own service has identified
            through its planning and evidence.
          </p>
        </section>

        {/* CATALOGUE + SUPPLIER */}
        <section className="rounded-3xl border border-amber-300 bg-amber-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-800">
            Supplier Information
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Play Move Improve online coaching
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Play Move Improve's online coaching services are included in the
            Kindy Uplift catalogue available to services.
          </p>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Catalogue inclusion should not be described as Queensland Department
            of Education endorsement or as “approved supplier” status. The
            Department states that it does not maintain an approved or preferred
            supplier list for professional learning and practice supports.
            Participating services and their advisory support organisations
            remain responsible for assessing whether a supplier is appropriate
            for their service and community context.
          </p>
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
                Coaching translates regulation, sensory, movement and
                developmental knowledge into realistic strategies educators can
                use within everyday kindergarten routines.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Educator capacity building
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                The focus is on strengthening educator confidence, reflection,
                shared language and implementation rather than providing a
                one-off information session.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Whole-service implementation
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Regulator Champions gives educators and leaders a shared pathway
                so professional learning can be embedded more consistently
                across rooms and staff teams.
              </p>
            </div>
          </div>
        </section>

        {/* PROCUREMENT */}
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

        {/* READY TO COPY */}
        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Kindy Uplift Planning Support
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-teal-950">
            Ready-to-use wording for your planning or internal approval
          </h2>

          <p className="mt-3 max-w-3xl text-xs leading-relaxed text-teal-900">
            Adapt this wording to your own data, identified priority areas,
            service goals and implementation plan.
          </p>

          <pre className="mt-5 max-h-140 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-teal-200 bg-white p-5 font-sans text-xs leading-relaxed text-slate-700">
            {kindyUpliftPlanWording}
          </pre>
        </section>

        {/* PROCESS */}
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
              [
                '1',
                'Confirm your Kindy Uplift priority',
                'Connect the purchase to the priority area and educator capability need identified in your planning.',
              ],
              [
                '2',
                'Choose your starting point',
                'Select the $1,790 Preview or the $4,790 complete eight-ladder pathway.',
              ],
              [
                '3',
                'Review with advisory support',
                'Use your Kindy Uplift planning process and advisory support organisation to confirm the proposed approach.',
              ],
              [
                '4',
                'Generate your proposal',
                'Use the proposal page for Approved Provider, finance or purchasing approval.',
              ],
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

        {/* FUNDING RESPONSIBILITY */}
        <section className="rounded-2xl border border-slate-300 bg-slate-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-slate-800">
            Funding responsibility
          </strong>

          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Each participating service remains responsible for selecting
            appropriate suppliers, completing due diligence, documenting the
            expenditure within its Kindy Uplift planning, complying with its
            Service Agreement and Kindy Funding Essentials, and meeting any
            reporting or acquittal requirements. References to Kindy Uplift do
            not imply Queensland Department of Education endorsement of Play
            Move Improve.
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