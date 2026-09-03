'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import SafeTouchHomepageSection from '@/components/SafeTouchHomepageSection';

const FULL_PRICE = 4790;
const PREVIEW_PRICE = 1790;
const PREVIEW_ACCESS_MONTHS = 6;

const CORE_PROMISES = [
  {
    number: '01',
    title: 'Know what to notice',
    text: 'Help educators slow the moment down enough to notice what the child’s body, the environment and the interaction may be communicating before the team rushes straight to stopping the behaviour.',
  },
  {
    number: '02',
    title: 'Know what to try',
    text: 'Choose one practical response that fits what educators are noticing in that moment, then watch closely enough to see whether the child’s body tells them they are moving in the right direction.',
  },
  {
    number: '03',
    title: 'Know where to go when stuck',
    text: 'Bring the situation back to Robyn through private questions, monthly coaching and recordings, so educators are not left trying to solve the same difficult moment alone when the first idea does not quite fit.',
  },
];

const CURRENT_LADDERS = [
  {
    number: '01',
    image: '/images/watercolour-anchor.png',
    tag: 'Regulated Educator',
    title: 'Start with the educator',
    text: 'Notice your own pace, body, voice and the pressure you may be bringing into the interaction.',
  },
  {
    number: '02',
    image: '/images/watercolour-dropoff.png',
    tag: 'Connected Drop-Offs',
    title: 'Make drop-off feel smaller',
    text: 'Build more predictable responses around separation, arrival and connection.',
  },
  {
    number: '03',
    image: '/images/watercolour-mattime.png',
    tag: 'Participation Beyond Sitting',
    title: 'Rethink participation',
    text: 'Support children to join in without making stillness the only measure of engagement.',
  },
];

const MEMBER_JOURNEY = [
  {
    title: 'Something is hard',
    text: 'Start with the moment that is creating pressure in your room today.',
  },
  {
    title: 'Choose a ladder or floor prompt',
    text: 'Use the closest practical tool for the situation your team is seeing, rather than trying to solve every regulation challenge at once.',
  },
  {
    title: 'Try one thing',
    text: 'Make one thoughtful adjustment and notice what changes.',
  },
  {
    title: 'Ask when you are still unsure',
    text: 'Submit a private, de-identified question to Robyn.',
  },
  {
    title: 'Learn from the monthly coaching',
    text: 'Join live if staffing allows, or watch the recording afterwards.',
  },
];

const CURRENT_INCLUSIONS = [
  'The 3 Regulation Ladders currently available',
  'Educator Floor Deck for quick in-the-room support',
  'Private Ask Robyn question submissions',
  'Live monthly Regulator Champions coaching',
  'Monthly coaching shaped by educator questions',
  'Recordings added after each coaching session',
  'Educator reflection and progress tools',
  'Manager QIP and critical reflection support',
  'Family Bridge conversation prompts',
  'Printable tools that support implementation',
];

export default function HomePageClient() {
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    serviceName: '',
    fundingSource: 'Victorian School Readiness Funding (SRF)',
    programOption: 'preview' as 'full' | 'preview',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const selectedPrice =
    quoteForm.programOption === 'preview'
      ? PREVIEW_PRICE
      : FULL_PRICE;

  const handleQuoteSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteForm),
      });

      if (!response.ok) {
        console.error(
          'Quote request failed:',
          await response.text(),
        );
      }

      setQuoteSubmitted(true);
    } catch (error) {
      console.error(
        'Quote submit error:',
        error,
      );

      setQuoteSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#1C3B34] text-white">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#657B6C]/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-20 h-120 w-120 rounded-full bg-[#C29F60]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-20 lg:grid-cols-12 lg:items-center lg:py-24">
          <div className="lg:col-span-7">
            <div className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-5 py-2.5 text-sm font-bold text-[#E4C98E]">
              Ongoing regulation support for early childhood teams
            </div>

            <h1 className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">
              When a child is struggling, your educators need to be able to make sense of what they are seeing and feel more confident about what to try next.
            </h1>

            <p className="mt-7 max-w-3xl text-2xl font-bold leading-relaxed text-white">
              Regulator Champions helps early childhood teams look beyond the surface of behaviour, notice what a child’s body may be communicating, and make calmer, more thoughtful decisions when regulation is becoming difficult.
            </p>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
              It brings together practical Regulation Ladders, monthly coaching, recordings and ongoing access to Robyn, so your team can work through the situations that actually happen in early childhood rooms, from difficult drop-offs and group times to transitions, escalation, shutdown and the moments when an educator has already tried several things and is still unsure what the child needs.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34] shadow-lg transition hover:bg-[#D1B477]"
              >
                See the program options
              </Link>

              <a
                href="#how-it-works"
                className="flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-bold text-white transition hover:bg-white/10"
              >
                See how educators use it
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-3 shadow-2xl">
              <img
                src="/images/watercolour-dropoff.png"
                alt="Early childhood educator supporting a child with calm, responsive care"
                className="aspect-4/5 w-full rounded-3xl object-cover"
              />
            </div>

            <div className="relative -mt-8 mx-5 rounded-3xl bg-[#FAF5EC] p-6 text-[#1C3B34] shadow-xl">
              <p className="text-xl font-extrabold leading-snug">
                Behaviour gives us information.
              </p>

              <p className="mt-2 text-lg font-extrabold leading-snug text-[#9A793D]">
                The work is learning how to notice it earlier and respond thoughtfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PROMISES */}
      <section className="border-b border-[#E5DED4] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              What your team learns to do
            </span>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
              Help educators notice more before they react.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {CORE_PROMISES.map((item) => (
              <article
                key={item.number}
                className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C29F60] text-base font-extrabold text-[#1C3B34]">
                  {item.number}
                </span>

                <h3 className="mt-5 text-2xl font-extrabold text-[#1C3B34]">
                  {item.title}
                </h3>

                <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATION CONTEXT */}
      <section className="bg-[#FAF5EC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-4xl border border-[#E5DED4] bg-white p-8">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
                What educators often see
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
                The behaviour is usually the part we notice first.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#65736D]">
                A child may be running away, crying, refusing, hiding, crashing into other children, becoming physical, or finding it almost impossible to sit with the group, and when the room is busy it is very easy for adults to respond to what the behaviour looks like before they have had enough time to consider what may be happening underneath it.
              </p>
            </article>

            <article className="rounded-4xl border-2 border-[#C29F60] bg-[#1C3B34] p-8 text-white">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                Regulator Champions
              </span>

              <h2 className="mt-3 text-3xl font-extrabold">
                Move from reacting to noticing, then deciding what to try.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
                Regulator Champions gives educators a practical way to slow the moment down, notice the child’s body, the environment and the interaction, choose one response that makes sense, and then watch what changes rather than expecting one strategy to work for every child in every situation.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* MEMBER JOURNEY */}
      <section
        id="how-it-works"
        className="bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              How educators use it
            </span>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
              Start with the situation your educators are actually dealing with.
            </h2>

            <p className="mt-5 text-xl leading-relaxed text-[#53645D]">
              The program is designed to be useful in the middle of real early childhood practice, so educators can begin with the pressure point that is showing up now, choose the closest Regulation Ladder or floor prompt, try one thoughtful adjustment, and then notice what the child’s response tells them about what to do next.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {MEMBER_JOURNEY.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-5 rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-6 sm:grid-cols-[80px_1fr] sm:items-center sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1C3B34] text-lg font-extrabold text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#1C3B34]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-lg leading-relaxed text-[#65736D]">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RECORDINGS / STAFFING OBJECTION */}
      <section className="bg-[#1C3B34] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                Cannot get educators off the floor?
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
                Live attendance is helpful. It is not required.
              </h2>

              <p className="mt-6 text-xl leading-relaxed text-[#D8E1DC]">
                Each monthly coaching session is recorded and added to the Member
                Hub, so educators can watch when staffing and floor coverage allow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <SimpleDarkCard
                title="Join live"
                text="Bring current questions into the conversation and learn with other participating teams."
              />

              <SimpleDarkCard
                title="Watch later"
                text="Return to the recording when there is time, or use it during a team meeting or professional learning block."
              />

              <SimpleDarkCard
                title="Ask before the session"
                text="Educators can submit a private question even if they know they cannot attend live."
              />

              <SimpleDarkCard
                title="Come back again"
                text="If the recording still does not answer the situation, submit another question for future coaching."
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED */}
      <section
        id="included"
        className="bg-[#FAF8F5] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                What is included
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
                Practical supports that help educators think in the moment and reflect afterwards.
              </h2>

              <p className="mt-6 text-xl leading-relaxed text-[#53645D]">
                The purpose of the Member Hub is to make it easier for educators to move from concern to action, with practical tools for the room, reflection supports for afterwards, and access to Robyn when a situation is still difficult or the first response has not helped enough.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {CURRENT_INCLUSIONS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-3xl border border-[#E5DED4] bg-white p-5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C29F60] text-sm font-extrabold text-[#1C3B34]">
                    ✓
                  </span>

                  <p className="text-base font-semibold leading-relaxed text-[#53645D]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT LADDERS */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Available now
            </span>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
              Begin with three common regulation challenges already built into the program.
            </h2>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#53645D]">
              These starting points focus on moments that can create a great deal of pressure in early childhood settings, while future Regulation Ladders will be shaped by the real questions and recurring challenges participating teams bring into the program.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {CURRENT_LADDERS.map((ladder) => (
              <article
                key={ladder.number}
                className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] shadow-sm"
              >
                <div className="relative">
                  <img
                    src={ladder.image}
                    alt=""
                    className="aspect-[4/4.6] w-full object-cover"
                  />

                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C3B34] text-base font-extrabold text-white">
                    {ladder.number}
                  </span>
                </div>

                <div className="p-7">
                  <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                    {ladder.tag}
                  </span>

                  <h3 className="mt-3 text-2xl font-extrabold leading-tight text-[#1C3B34]">
                    {ladder.title}
                  </h3>

                  <p className="mt-4 text-lg leading-relaxed text-[#65736D]">
                    {ladder.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TWO WAYS TO WORK WITH ROBYN */}
      <section className="bg-[#FAF5EC] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Two ways to work with Robyn
            </span>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
              Choose intensive learning or ongoing support.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-4xl border border-[#E5DED4] bg-white p-8">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
                Face-to-face at Chirnside Park
              </span>

              <h3 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
                Half or full-day team workshop
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-[#65736D]">
                Bring your team together for concentrated professional learning,
                discussion and practical teaching with Robyn.
              </p>

              <p className="mt-5 text-base font-bold leading-relaxed text-[#1C3B34]">
                Best when your team wants a focused learning day together.
              </p>
            </article>

            <article className="rounded-4xl border-2 border-[#C29F60] bg-[#1C3B34] p-8 text-white">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                Regulator Champions
              </span>

              <h3 className="mt-3 text-3xl font-extrabold">
                Support that continues across the year
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                Use the tools in practice, submit questions, join monthly coaching
                when possible and return to recordings as new situations arise.
              </p>

              <p className="mt-5 text-base font-bold leading-relaxed text-white">
                Best when your team wants somewhere to keep coming back to.
              </p>
            </article>
          </div>
        </div>
      </section>

      <SafeTouchHomepageSection />

      {/* ABOUT */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-4xl bg-[#1C3B34] p-8 text-white sm:p-10">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
              Created by Robyn Papworth
            </span>

            <h2 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built around the moments when knowing the theory is not enough.
            </h2>

            <p className="mt-6 max-w-4xl text-xl leading-relaxed text-[#D8E1DC]">
              Regulator Champions brings regulation, sensory, movement and developmental knowledge back to the practical decisions educators have to make throughout an ordinary early childhood day, particularly when a child is escalating, shutting down, struggling with separation, finding group participation difficult, or becoming overwhelmed by the demands around them.
            </p>

            <p className="mt-5 max-w-4xl text-xl font-bold leading-relaxed text-white">
              The goal is not to create perfectly calm children or perfectly regulated rooms, but to help educators become more confident at noticing what is happening, understanding what may be contributing to the child’s response, and deciding what to try next without feeling that they have to have every answer immediately.
            </p>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-[#FAF8F5] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
                Funding information
              </span>

              <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
                Need to explain the investment to leadership?
              </h2>

              <p className="mt-6 text-xl leading-relaxed text-[#53645D]">
                We can provide program information and a formal quote for your
                service to consider alongside its own funding priorities and
                eligibility requirements.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FundingLink
                state="Victoria"
                title="School Readiness Funding"
                href="/school-readiness-funding"
                text="Information for services considering the program alongside an identified professional learning or practice improvement priority."
              />

              <FundingLink
                state="Queensland"
                title="Kindy Uplift"
                href="/kindy-uplift"
                text="Information for services considering the program alongside professional learning, participation and social and emotional capability priorities."
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Choose your starting point
            </span>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
              Choose the level of ongoing support that suits your service.
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            <PricingCard
              eyebrow="6-Month Preview"
              price={PREVIEW_PRICE}
              period={`${PREVIEW_ACCESS_MONTHS} months`}
              title="Start with the current three ladders"
              text="A six-month whole-service starting point for teams who want to begin using the current Regulation Ladders, bring real practice questions to Robyn, access monthly coaching and watch the recordings when live attendance is difficult."
              href="/proposal?plan=preview"
              button="View 6-Month Preview"
            />

            <PricingCard
              eyebrow="12-Month Regulator Champions"
              price={FULL_PRICE}
              period="12 months"
              title="Give your team year-round support"
              text="Twelve months of whole-service support so educators can keep returning to the Regulation Ladders, monthly coaching, Ask Robyn and recordings as different children, transitions and regulation challenges arise across the year."
              href="/proposal?plan=full"
              button="View 12-Month Program"
              featured
            />
          </div>
        </div>
      </section>

      {/* MULTI SERVICE */}
      <section className="bg-[#FAF8F5] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-4xl bg-[#1C3B34] p-8 text-white shadow-lg sm:p-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-block rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34]">
                  Multiple services
                </span>

                <h2 className="mt-4 text-3xl font-extrabold">
                  Want a consistent approach across several centres?
                </h2>

                <p className="mt-3 max-w-2xl text-lg leading-relaxed text-[#D8E1DC]">
                  Multi-service proposals are available for organisations wanting
                  shared practice across directors, leaders and educator teams.
                </p>
              </div>

              <a
                href="mailto:robyn@playmoveimprove.com.au?subject=Multi-Service%20Regulator%20Champions%20Quote%20Request"
                className="flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-center text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Request multi-service proposal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-[#1C3B34] py-16 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
              For directors and leaders
            </span>

            <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              If regulation, behaviour and educator confidence are creating pressure in your service, you can request the program information and quote you need to discuss Regulator Champions with your leadership team.
            </h2>
          </div>

          {quoteSubmitted ? (
            <div className="mx-auto max-w-2xl rounded-4xl border border-white/10 bg-white/5 p-8 text-center">
              <h3 className="text-2xl font-extrabold text-[#E4C98E]">
                Proposal request received
              </h3>

              <p className="mt-3 text-lg text-[#D8E1DC]">
                You can also open the printable proposal information now.
              </p>

              <Link
                href={`/proposal?plan=${quoteForm.programOption}`}
                className="mt-6 inline-flex min-h-14 items-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34]"
              >
                Open proposal
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleQuoteSubmit}
              className="mx-auto max-w-3xl space-y-5 rounded-4xl border border-white/10 bg-white/5 p-7 sm:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <PlanButton
                  active={
                    quoteForm.programOption ===
                    'preview'
                  }
                  title="6-Month Preview"
                  price={PREVIEW_PRICE}
                  onClick={() =>
                    setQuoteForm({
                      ...quoteForm,
                      programOption: 'preview',
                    })
                  }
                />

                <PlanButton
                  active={
                    quoteForm.programOption ===
                    'full'
                  }
                  title="12-Month Regulator Champions"
                  price={FULL_PRICE}
                  onClick={() =>
                    setQuoteForm({
                      ...quoteForm,
                      programOption: 'full',
                    })
                  }
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  aria-label="Director or contact name"
                  placeholder="Director / contact name"
                  value={quoteForm.fullName}
                  onChange={(event) =>
                    setQuoteForm({
                      ...quoteForm,
                      fullName: event.target.value,
                    })
                  }
                  className="min-h-14 rounded-xl border border-white/15 bg-[#132C27] p-4 text-base text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                />

                <input
                  type="email"
                  required
                  aria-label="Work email address"
                  placeholder="Work email address"
                  value={quoteForm.email}
                  onChange={(event) =>
                    setQuoteForm({
                      ...quoteForm,
                      email: event.target.value,
                    })
                  }
                  className="min-h-14 rounded-xl border border-white/15 bg-[#132C27] p-4 text-base text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  required
                  aria-label="Service or centre name"
                  placeholder="Centre / service name"
                  value={quoteForm.serviceName}
                  onChange={(event) =>
                    setQuoteForm({
                      ...quoteForm,
                      serviceName: event.target.value,
                    })
                  }
                  className="min-h-14 rounded-xl border border-white/15 bg-[#132C27] p-4 text-base text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                />

                <select
                  value={quoteForm.fundingSource}
                  onChange={(event) =>
                    setQuoteForm({
                      ...quoteForm,
                      fundingSource:
                        event.target.value,
                    })
                  }
                  aria-label="Funding pathway"
                  className="min-h-14 rounded-xl border border-white/15 bg-[#132C27] p-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-14 w-full rounded-2xl bg-[#C29F60] px-6 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Sending request…'
                  : `Request $${selectedPrice.toLocaleString()} proposal`}
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}

function SimpleDarkCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-2xl font-extrabold text-white">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#C8D6D0]">
        {text}
      </p>
    </article>
  );
}

function FundingLink({
  state,
  title,
  href,
  text,
}: {
  state: string;
  title: string;
  href: string;
  text: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-4xl border border-[#E5DED4] bg-white p-7 transition hover:border-[#C29F60]"
    >
      <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
        {state}
      </span>

      <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-4 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>

      <span className="mt-6 inline-block text-base font-extrabold text-[#1C3B34]">
        View information →
      </span>
    </Link>
  );
}

function PricingCard({
  eyebrow,
  price,
  period,
  title,
  text,
  href,
  button,
  featured = false,
}: {
  eyebrow: string;
  price: number;
  period: string;
  title: string;
  text: string;
  href: string;
  button: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`rounded-4xl p-8 shadow-sm ${
        featured
          ? 'bg-[#1C3B34] text-white'
          : 'border-2 border-[#C29F60] bg-white text-[#1C3B34]'
      }`}
    >
      <span
        className={`text-sm font-extrabold uppercase tracking-[0.14em] ${
          featured
            ? 'text-[#E4C98E]'
            : 'text-[#9A793D]'
        }`}
      >
        {eyebrow}
      </span>

      <p className="mt-4 text-5xl font-extrabold">
        ${price.toLocaleString()}
      </p>

      <p
        className={`mt-2 text-base ${
          featured
            ? 'text-[#C8D6D0]'
            : 'text-[#6A7873]'
        }`}
      >
        incl. GST · {period}
      </p>

      <h3 className="mt-6 text-2xl font-extrabold">
        {title}
      </h3>

      <p
        className={`mt-4 text-lg leading-relaxed ${
          featured
            ? 'text-[#D8E1DC]'
            : 'text-[#53645D]'
        }`}
      >
        {text}
      </p>

      <Link
        href={href}
        className={`mt-8 flex min-h-14 items-center justify-center rounded-2xl px-6 py-4 text-center text-base font-extrabold ${
          featured
            ? 'bg-[#C29F60] text-[#1C3B34]'
            : 'bg-[#1C3B34] text-white'
        }`}
      >
        {button}
      </Link>
    </article>
  );
}

function PlanButton({
  active,
  title,
  price,
  onClick,
}: {
  active: boolean;
  title: string;
  price: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-24 rounded-2xl border p-5 text-left transition ${
        active
          ? 'border-[#C29F60] bg-white/10'
          : 'border-white/10 bg-black/10'
      }`}
    >
      <span className="block text-lg font-extrabold">
        {title}
      </span>

      <span className="mt-1 block text-base text-[#C8D6D0]">
        ${price.toLocaleString()} incl. GST
      </span>
    </button>
  );
}
