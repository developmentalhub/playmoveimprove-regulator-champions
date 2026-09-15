'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, {
  Suspense,
  useMemo,
  useState,
} from 'react';
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
    shortLabel:
      'A practical whole-team starting point',
    description:
      'Six months gives your team time to begin using the Regulation Ladders in real situations, return to recordings when there is capacity, submit questions and see how this way of thinking fits your service before deciding whether you want longer-term support.',
    inclusions: [
      'Whole-team access for 6 months',
      'The Regulation Ladders currently available',
      'Educator, manager and family card sets',
      'Practical in-room resources',
      'Private Ask Robyn question submissions',
      'Online sessions for educators who want to join live',
      'Recordings added to the Member Hub',
      'Reflection and implementation resources',
      'Leadership and quality improvement reflection support',
      'Printable resources connected to the program',
    ],
  },

  full: {
    label: '12-Month Regulator Champions',
    price: FULL_PRICE,
    access: `${FULL_MONTHS} months`,
    shortLabel:
      'For teams wanting longer-term implementation support',
    description:
      'Twelve months gives your organisation more time to keep returning to the Regulation Ladders, recordings, questions and live support as different regulation, behaviour and participation challenges arise across the year.',
    inclusions: [
      'Whole-team access for 12 months',
      'All Regulation Ladders available during your access period',
      'New Regulation Ladder content added as the program develops',
      'Educator, manager and family card sets',
      'Practical in-room resources',
      'Private Ask Robyn question submissions',
      'Online sessions for educators who want to join live',
      'Access to the growing recording library',
      'Reflection and implementation resources',
      'Leadership and quality improvement reflection support',
      'Family resources and conversation prompts',
      'Printable resources connected to the program',
    ],
  },
} as const;

const SIX_MONTH_QUESTIONS = [
  {
    question:
      'Do we need to work through everything in six months?',
    answer:
      'No. The intention is not to race through content. Start with the Regulation Ladder or resource that relates most closely to what your team is dealing with and return to the deeper learning when there is time.',
  },
  {
    question:
      'Does every educator need to attend live sessions?',
    answer:
      'No. Live participation is optional. Recordings and practical resources are there so services can use the program around staffing, planning time and the realities of an early childhood week.',
  },
  {
    question:
      'What if we have already completed regulation training?',
    answer:
      'That is very common. Regulator Champions is not built around assuming educators know nothing about regulation. It is designed to help teams use what they know when a real situation is unfolding and the answer is not immediately obvious.',
  },
  {
    question:
      'What if we only want the cards?',
    answer:
      'That is completely fine. The Regulation Cards can be purchased separately without joining the broader program.',
  },
];

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
    'Professional learning / staff development budget',
  );

  const plan =
    PLAN_DETAILS[selectedPlan];

  const emailHref =
    useMemo(() => {
      const subject =
        encodeURIComponent(
          `Regulator Champions proposal request - ${
            serviceName || plan.label
          }`,
        );

      const body =
        encodeURIComponent(`Hi Robyn,

I would like to request a proposal / invoice for Regulator Champions.

Organisation / centre name: ${serviceName || ''}
Contact name: ${contactName || ''}
Work email: ${workEmail || ''}
Funding / purchasing pathway: ${fundingSource}

Program:
${plan.label}
$${plan.price.toLocaleString()} AUD
${plan.access} whole-team access

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
        <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
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
              Your educators can use practical resources when a situation arises, return to recordings when they have the time and headspace, and bring questions back when they want more support. It is not designed to become another course your team has to race through.
            </p>

            <p className="mt-5 max-w-4xl text-base leading-relaxed text-[#BFD0C8] print:text-black">
              Created in Australia and available to early childhood organisations internationally.
            </p>
          </div>
        </div>
      </section>

      {/* LOWER PRESSURE OPTION */}
      <section className="border-b border-[#E5DED4] bg-[#F5F0E7] print:hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-3xl">
            <p className="text-lg font-extrabold">
              Only need the Regulation Cards right now?
            </p>

            <p className="mt-1 text-base leading-relaxed text-[#53645D]">
              You can purchase the cards separately without joining the broader Regulator Champions program.
            </p>
          </div>

          <a
            href={REGULATION_CARDS_URL}
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-base font-extrabold transition hover:bg-[#1C3B34] hover:text-white"
          >
            View the Regulation Cards
          </a>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-white py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                The hard part is usually not knowing another strategy.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Most early childhood teams already know that behaviour communicates something, that children may need co-regulation and that the environment around a child matters. The challenge is using that knowledge when one child is screaming, another is running away, an educator needs support, a family is waiting at the door and the strategy that worked yesterday does not seem to be helping today.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Those are the moments where teams can easily fall back into reacting quickly, trying another strategy or relying on whichever educator happens to be most confident. Regulator Champions is designed to slow that process down enough for adults to notice what may be contributing before deciding what to change.
              </p>

              <p className="mt-5 text-xl font-extrabold leading-relaxed">
                It is designed for the gap between understanding the theory and making a thoughtful decision in the room.
              </p>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="hidden min-h-12 rounded-2xl border border-[#D8D0C4] bg-[#FAF5EC] px-5 py-3 text-base font-semibold transition hover:bg-white sm:inline-flex print:hidden"
            >
              Print this proposal
            </button>
          </div>
        </div>
      </section>

      {/* ORGANISATIONAL CAPACITY */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                What repeated regulation difficulties ask from a team
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                One difficult moment is part of early childhood. The pressure builds when everybody has to work it out again from the beginning.
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#53645D]">
                <p>
                  A difficult drop-off is part of early childhood, and so is the child who struggles to stay with group time, the educator who needs help when behaviour escalates, or the family who is trying to understand why their child responds differently in different environments.
                </p>

                <p>
                  The pressure begins to build when the same situations keep returning and the adults around the child still do not have a shared way to look at what is happening.
                </p>

                <p>
                  A director may find themselves returning to the same conversation with different educators, while an educational leader searches for another idea, families receive slightly different explanations depending on who they speak with, and educators who understand co-regulation in theory remain unsure about what it means in the middle of a busy room.
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-[#DDD5C9] bg-white p-3 shadow-sm print:hidden">
              <Image
                src="/images/regulator-champions-team-planning.png"
                alt="Early childhood educators discussing Regulation Ladder cards together during team planning"
                width={1400}
                height={1050}
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THINKING SHIFT */}
      <section className="bg-white py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                A shared way of thinking
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                The goal is not to give educators a scripted answer for every behaviour.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                I want teams to become more confident at asking useful questions before jumping straight to another strategy. Instead of beginning only with “How do we stop this?”, the team can begin widening the conversation.
              </p>

              <div className="mt-7 border-y border-[#D8CFC2]">
                <ThinkingQuestion>
                  What are we actually noticing?
                </ThinkingQuestion>

                <ThinkingQuestion>
                  What was happening before this became difficult?
                </ThinkingQuestion>

                <ThinkingQuestion>
                  What is the child&apos;s body doing?
                </ThinkingQuestion>

                <ThinkingQuestion>
                  What demand is this moment placing on the child?
                </ThinkingQuestion>

                <ThinkingQuestion>
                  Is something in the environment, routine or adult response adding pressure?
                </ThinkingQuestion>

                <ThinkingQuestion>
                  What is one thoughtful thing we could change, then watch?
                </ThinkingQuestion>
              </div>

              <p className="mt-7 text-lg leading-relaxed text-[#53645D]">
                This does not mean ignoring unsafe behaviour, removing boundaries or assuming every difficulty has a hidden sensory explanation. It means taking enough time to consider the child, the environment and the interaction before deciding what the response should be.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY SIX MONTHS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20 print:bg-white print:py-8 print:text-black">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E] print:text-black">
                Why there is a six-month option
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl print:text-black">
                You should not need to commit your service for a full year just to find out whether this approach is useful.
              </h2>
            </div>

            <div>
              <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC] print:text-black">
                <p>
                  The 6-Month Preview is designed as a genuine whole-team starting point rather than a reduced version that exists only to move you towards the larger program.
                </p>

                <p>
                  Six months gives educators time to start with the situations already creating pressure, use the Regulation Ladders in practice, return to recordings when there is capacity, bring questions back and begin noticing whether a more shared way of thinking is useful for your team.
                </p>

                <p>
                  You do not need to believe that one program will solve every behaviour challenge before deciding whether to begin. Children will still become frustrated, overwhelmed, tired, excited and dysregulated, and educators will still encounter situations where the answer is not obvious.
                </p>

                <p className="font-semibold text-white print:text-black">
                  The more useful question is whether giving your team a more consistent way to notice, discuss and respond to those recurring situations would be valuable in your service.
                </p>
              </div>

              <div className="mt-8 border-l-4 border-[#E0BC68] pl-6">
                <p className="text-2xl font-extrabold text-white print:text-black">
                  6-Month Preview
                </p>

                <p className="mt-2 text-4xl font-extrabold text-[#E4C98E] print:text-black">
                  $1,790 AUD
                </p>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#C8D6D0] print:text-black">
                  Whole-team access for six months, including the current Regulation Ladders, practical resources, recordings, questions and implementation support.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-[#F3EEE7] py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Use Regulator Champions in the way your team has capacity for.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Every educator does not need to attend every live session or work through the program at the same pace. The practical resources can be used when a situation arises, while recordings and deeper support are there when the team has more time.
            </p>
          </div>

          <div className="mt-8 border-y border-[#D8CFC2] md:grid md:grid-cols-4">
            <SupportStep
              title="Read"
              text="Start with one practical idea connected to something already happening in the room."
            />

            <SupportStep
              title="Try"
              text="Use it in a real situation and notice what happens in the child, environment or interaction."
              divided
            />

            <SupportStep
              title="Watch"
              text="Return to recordings when educators have the time and headspace to take more in."
              divided
            />

            <SupportStep
              title="Go deeper"
              text="Use questions, live sessions and additional resources when your team wants more support."
              divided
            />
          </div>
        </div>
      </section>

      {/* COMMON QUESTIONS */}
      <section className="bg-white py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Before choosing a program
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                You do not need to reorganise your whole service to begin.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Regulator Champions is intended to sit alongside the work your educators are already doing rather than create another large list of tasks to complete.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              {SIX_MONTH_QUESTIONS.map(
                (item) => (
                  <div
                    key={item.question}
                    className="border-b border-[#D8CFC2] py-6"
                  >
                    <h3 className="text-xl font-extrabold">
                      {item.question}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                      {item.answer}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PLAN SELECTION */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#9A793D]">
              Choose your starting point
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Choose the level of support that makes sense for your team.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Both options provide whole-team access. The six-month option is there for organisations that want a meaningful starting period without committing for a full year, while the twelve-month option gives teams more time to return to support as different situations arise.
            </p>

            <p className="mt-3 text-base leading-relaxed text-[#6A7873]">
              All prices shown on this page are in Australian dollars (AUD). Any applicable taxes or invoicing requirements can be confirmed when your proposal is prepared.
            </p>
          </div>

          <div className="mt-9 grid gap-7 md:grid-cols-2 print:grid-cols-2">
            <PlanChoice
              title="6-Month Preview"
              label="A practical place to start"
              price={PREVIEW_PRICE}
              months={PREVIEW_MONTHS}
              description="Begin with the Regulation Ladders currently available and use the recordings, questions and support for six months before deciding what your team needs next."
              selected={
                selectedPlan === 'preview'
              }
              onClick={() =>
                setSelectedPlan('preview')
              }
            />

            <PlanChoice
              title="12-Month Regulator Champions"
              label="For longer-term support"
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
      <section className="bg-white py-14 sm:py-20 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-base font-semibold text-[#657B6C]">
                Current selection
              </p>

              <p className="mt-4 text-sm font-extrabold text-[#9A793D]">
                {plan.shortLabel}
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                {plan.label}
              </h2>

              <div className="mt-5">
                <strong className="text-5xl font-extrabold">
                  ${plan.price.toLocaleString()}
                </strong>

                <p className="mt-2 text-base text-[#6A7873]">
                  AUD · {plan.access}
                </p>
              </div>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                {plan.description}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold">
                What your team receives
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

      {/* LIVE AND RECORDINGS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20 print:bg-white print:py-8 print:text-black">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-4xl print:text-black">
              Learn when your team actually has the capacity.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC] print:text-black">
              Professional learning should not feel like another thing educators have to squeeze into an already exhausting week.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC] print:text-black">
              Online sessions are available for educators who want to join live, but live attendance is not required. Recordings are added to the Member Hub so teams can return to the learning during planning time, staff meetings or whenever they actually have the capacity to take it in.
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
              text="Teams can participate in an online conversation when staffing, time zones and capacity allow."
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
        <div className="mx-auto max-w-5xl px-6">
          <div className="border-l-4 border-[#C29F60] pl-6 sm:pl-8">
            <h2 className="text-3xl font-extrabold leading-tight">
              Want formal recognition as well?
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Educators who choose to complete the fuller pathway can submit reflections and practical work for review by Robyn.
            </p>

            <p className="mt-4 text-lg font-semibold leading-relaxed">
              This is optional. Your team can still use the Regulation Ladders, resources, questions and recordings without completing a recognition pathway.
            </p>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="border-y border-[#E5DED4] bg-[#F7F3ED] py-12 print:py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-extrabold">
                Need information for leadership, quality improvement or funding discussions?
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                We have separate information for teams using different quality, professional development and funding systems.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2] print:hidden">
              <QualityLink
                href="/us-early-childhood-quality"
                title="United States"
                text="NAEYC, Developmentally Appropriate Practice, QRIS and child care quality improvement."
              />

              <QualityLink
                href="/nqs-mapping"
                title="NQS and QIP"
                text="Australian National Quality Standard and Quality Improvement Plan reflection."
              />

              <QualityLink
                href="/school-readiness-funding"
                title="School Readiness Funding"
                text="Information for Victorian kindergarten services."
              />

              <QualityLink
                href="/kindy-uplift"
                title="Kindy Uplift"
                text="Information for Queensland kindergarten services."
              />
            </div>
          </div>
        </div>
      </section>

      {/* UNSURE */}
      <section className="bg-[#FAF5EC] py-12 sm:py-16 print:hidden">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#9A793D]">
              Still unsure which option makes sense?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight">
              You do not need to decide before you contact me.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              You can tell me what your educators are currently finding difficult, how your team usually approaches professional learning and what you realistically have capacity for. If I think the cards alone are a better starting point, I would rather tell you that than place your team into a larger program you are not ready to use.
            </p>

            <a
              href="mailto:robyn@playmoveimprove.com.au?subject=Regulator%20Champions%20team%20enquiry"
              className="mt-7 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-6 py-3 text-base font-extrabold transition hover:bg-[#1C3B34] hover:text-white"
            >
              Talk to Robyn about your team
            </a>
          </div>
        </div>
      </section>

      {/* REQUEST */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20 print:hidden">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to request a proposal or invoice?
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
              Add your organisation details below and your selected option will be included automatically when you email Robyn. No payment is taken on this page.
            </p>
          </div>

          <div className="mt-8 max-w-3xl border-t border-white/20 pt-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Organisation / centre name"
                value={serviceName}
                onChange={setServiceName}
                placeholder="Your centre or organisation"
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
                placeholder="name@organisation.com"
                type="email"
              />

              <div>
                <label
                  htmlFor="fundingSource"
                  className="mb-2 block text-sm font-semibold text-[#D8E1DC]"
                >
                  Funding / purchasing pathway
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
                  <option value="Professional learning / staff development budget">
                    Professional learning / staff development budget
                  </option>

                  <option value="US child care professional development budget">
                    US child care professional development budget
                  </option>

                  <option value="Victorian School Readiness Funding (SRF)">
                    Victorian School Readiness Funding
                  </option>

                  <option value="Queensland Kindy Uplift">
                    Queensland Kindy Uplift
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
                  ${plan.price.toLocaleString()} AUD
                </strong>
              </div>
            </div>

            <a
              href={emailHref}
              className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-center text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Email Robyn to request proposal
            </a>

            <p className="mt-4 text-sm leading-relaxed text-[#BFD0C8]">
              This sends an email request only. Your organisation is not enrolled and no payment is processed until the next steps are confirmed with you.
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
        <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] p-6 text-base font-semibold text-[#6A7873]">
          Loading proposal...
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}

function ThinkingQuestion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[#D8CFC2] py-4 last:border-b-0">
      <p className="text-lg font-extrabold leading-relaxed text-[#29483F]">
        “{children}”
      </p>
    </div>
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
      <h3 className="text-xl font-extrabold">
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
  label,
  price,
  months,
  description,
  selected,
  onClick,
}: {
  title: string;
  label: string;
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
      <p className="text-sm font-extrabold text-[#9A793D]">
        {label}
      </p>

      <h3 className="mt-2 text-2xl font-extrabold">
        {title}
      </h3>

      <p className="mt-4 text-4xl font-extrabold">
        ${price.toLocaleString()} AUD
      </p>

      <p className="mt-1 text-base text-[#6A7873]">
        {months} months
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

function QualityLink({
  href,
  title,
  text,
}: {
  href: string;
  title: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="block border-b border-[#D8CFC2] py-4"
    >
      <p className="text-lg font-extrabold">
        {title}
      </p>

      <p className="mt-1 text-sm leading-6 text-[#53645D]">
        {text}
      </p>
    </Link>
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