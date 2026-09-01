'use client';

import React from 'react';
import Link from 'next/link';

type PricingOption = {
  name: string;
  eyebrow: string;
  price: string;
  period: string;
  description: string;
  bestFor: string;
  features: string[];
  ctaText: string;
  ctaLink: string;
  featured: boolean;
};

const PRICING_OPTIONS: PricingOption[] = [
  {
    name: '3-Ladder Preview',
    eyebrow: '6 months · Whole service',
    price: '$1,790',
    period: 'including GST',
    description:
      'A smaller way for your whole team to begin using Regulator Champions before committing to the full year.',
    bestFor:
      'Services that want to trial the Regulation Ladders, monthly support and whole-team approach first.',
    features: [
      'Whole-service access for educators and leaders',
      'Access to the 3 Regulation Ladders currently available',
      'Educator Floor Deck for quick in-the-room support',
      'Private Ask Robyn question submissions',
      'Live monthly Regulator Champions coaching',
      'Input into the timing and focus of monthly coaching',
      'Access to coaching recordings as they are added',
      'Educator reflections and progress tracking',
      'Manager QIP and critical reflection tools',
      'Printable support tools connected to the program',
    ],
    ctaText: 'Start with the 6-Month Preview',
    ctaLink: '/proposal?plan=preview',
    featured: false,
  },
  {
    name: 'Regulator Champions',
    eyebrow: '12 months · Whole service',
    price: '$4,790',
    period: 'including GST',
    description:
      'Year-round support for teams who want more than another professional development session or folder of resources.',
    bestFor:
      'Services wanting an ongoing way to work through regulation challenges with their team and access Robyn throughout the year.',
    features: [
      'Whole-service access for educators and leaders',
      'All Regulation Ladders available during your membership',
      'New Regulation Ladder content added as the program grows',
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
    ctaText: 'Join Regulator Champions',
    ctaLink: '/proposal?plan=full',
    featured: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 text-[#1C3B34]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E5DED4] bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] transition hover:text-[#1C3B34]"
          >
            Back to Home
          </Link>

          <Link
            href="/member-access"
            className="rounded-2xl bg-[#1C3B34] px-4 py-3 text-sm font-bold text-white"
          >
            Member Access
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-5 py-8 sm:px-6 sm:py-12">
        {/* HERO */}
        <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white shadow-lg">
          <div className="p-7 sm:p-10 lg:p-12">
            <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34]">
              Whole-service support
            </span>

            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              You probably already have
              plenty of resources.
            </h1>

            <p className="mt-5 max-w-4xl text-2xl font-bold leading-relaxed text-white">
              The difficult part is knowing
              what to do when a real child,
              a real room and a tired
              educator are in front of you.
            </p>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
              Regulator Champions gives
              your team practical tools to
              work through those moments,
              plus ongoing access to Robyn
              when you are still unsure.
            </p>
          </div>
        </section>

        {/* FREE VS PAID */}
        <section>
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Why Regulator Champions?
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
              A free handout can give you
              an idea.
            </h2>

            <p className="mt-4 text-xl leading-relaxed text-[#65736D]">
              Regulator Champions helps
              your team work out how to use
              that thinking when things
              become difficult in real
              practice.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <article className="rounded-4xl border border-[#E5DED4] bg-white p-7 sm:p-8">
              <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
                Free resources
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
                “Here is something useful
                to think about.”
              </h3>

              <div className="mt-6 space-y-4">
                <ValueLine text="A checklist or printable" />
                <ValueLine text="A strategy or idea to try" />
                <ValueLine text="General education about regulation" />
                <ValueLine text="Something educators can take back to the room" />
              </div>
            </article>

            <article className="rounded-4xl border-2 border-[#C29F60] bg-[#FAF5EC] p-7 sm:p-8">
              <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                Regulator Champions
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
                “This is happening in our
                room. What do we do next?”
              </h3>

              <div className="mt-6 space-y-4">
                <ValueLine text="A process for working through the real situation" />
                <ValueLine text="Help deciding what to notice and what to try" />
                <ValueLine text="Whole-team reflection and shared language" />
                <ValueLine text="Ongoing access to Robyn when the answer is not obvious" />
              </div>
            </article>
          </div>
        </section>

        {/* THREE PROMISES */}
        <section className="rounded-4xl bg-[#F1F4F2] p-7 sm:p-9">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
            The Regulator Champions promise
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Your educators should know three
            things.
          </h2>

          <div className="mt-7 grid gap-5 md:grid-cols-3">
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
        </section>

        {/* WORKSHOP COMPARISON */}
        <section>
          <div className="mx-auto max-w-4xl">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Different from a workshop
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
              A workshop gives your team a
              day with Robyn.
            </h2>

            <p className="mt-4 text-xl leading-relaxed text-[#65736D]">
              Regulator Champions gives
              your team a way to keep
              working with Robyn as new
              situations arise across the
              year.
            </p>
          </div>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <article className="rounded-4xl border border-[#E5DED4] bg-white p-7">
              <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
                Face-to-face workshop
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
                Intensive learning together
              </h3>

              <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
                Your team comes together
                for focused professional
                learning, discussion and
                practical teaching.
              </p>

              <p className="mt-5 text-base font-bold leading-relaxed text-[#1C3B34]">
                Best when you want a
                concentrated half or
                full-day learning
                experience.
              </p>
            </article>

            <article className="rounded-4xl border-2 border-[#C29F60] bg-[#FAF5EC] p-7">
              <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                Regulator Champions
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
                Support when real questions
                appear
              </h3>

              <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
                Your team uses the tools in
                practice, brings questions
                back to Robyn and continues
                learning month by month.
              </p>

              <p className="mt-5 text-base font-bold leading-relaxed text-[#1C3B34]">
                Best when you want support
                to continue after the
                initial learning moment.
              </p>
            </article>
          </div>
        </section>

        {/* PRICING */}
        <section>
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Choose your starting point
            </span>

            <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
              Two ways for your whole
              service to begin.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#65736D]">
              Both options are designed for
              whole-team implementation,
              not individual educator
              resource access.
            </p>
          </div>

          <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-2">
            {PRICING_OPTIONS.map(
              (option) => (
                <PricingCard
                  key={option.name}
                  option={option}
                />
              ),
            )}
          </div>
        </section>

        {/* MONTHLY SUPPORT */}
        <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white">
          <div className="p-7 sm:p-10">
            <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
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
                text="Real educator questions help shape the live session so the learning stays connected to current practice."
              />

              <DarkCard
                title="Recordings"
                text="As monthly sessions run, the recording library will grow so teams can revisit learning later."
              />
            </div>
          </div>
        </section>

        {/* FUNDING */}
        <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 sm:p-9">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            Funding enquiries
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
            Using School Readiness Funding
            or Kindy Uplift?
          </h2>

          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            We can provide a formal quote
            and program information for your
            service to consider alongside
            its own funding plan and
            eligibility requirements.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/school-readiness-funding"
              className="flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-4 text-base font-extrabold text-white"
            >
              Victoria SRF Information
            </Link>

            <Link
              href="/kindy-uplift"
              className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-[#C29F60] bg-white px-6 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Queensland Kindy Uplift
            </Link>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 text-center sm:p-10">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            Still deciding?
          </span>

          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Ask which option would suit
            your team.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-[#65736D]">
            You do not need to work out the
            right pathway from a pricing
            table alone.
          </p>

          <Link
            href="/proposal"
            className="mt-6 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34]"
          >
            View Program Options
          </Link>
        </section>
      </main>
    </div>
  );
}

function PricingCard({
  option,
}: {
  option: PricingOption;
}) {
  return (
    <article
      className={`flex h-full flex-col rounded-4xl border-2 p-7 sm:p-8 ${
        option.featured
          ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-xl'
          : 'border-[#E5DED4] bg-white text-[#1C3B34] shadow-sm'
      }`}
    >
      <div>
        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-extrabold ${
            option.featured
              ? 'bg-[#C29F60] text-[#1C3B34]'
              : 'bg-[#FAF5EC] text-[#9A793D]'
          }`}
        >
          {option.eyebrow}
        </span>

        <h3
          className={`mt-5 text-3xl font-extrabold ${
            option.featured
              ? 'text-white'
              : 'text-[#1C3B34]'
          }`}
        >
          {option.name}
        </h3>

        <div className="mt-4 flex flex-wrap items-baseline gap-2">
          <span className="text-4xl font-extrabold">
            {option.price}
          </span>

          <span
            className={`text-base ${
              option.featured
                ? 'text-white/75'
                : 'text-[#65736D]'
            }`}
          >
            {option.period}
          </span>
        </div>

        <p
          className={`mt-5 text-lg leading-relaxed ${
            option.featured
              ? 'text-[#D8E1DC]'
              : 'text-[#65736D]'
          }`}
        >
          {option.description}
        </p>

        <div
          className={`mt-6 rounded-3xl p-5 ${
            option.featured
              ? 'bg-white/5'
              : 'bg-[#FAF8F5]'
          }`}
        >
          <span
            className={`text-sm font-extrabold uppercase tracking-[0.1em] ${
              option.featured
                ? 'text-[#E4C98E]'
                : 'text-[#9A793D]'
            }`}
          >
            Best for
          </span>

          <p
            className={`mt-2 text-base leading-relaxed ${
              option.featured
                ? 'text-white'
                : 'text-[#2B3833]'
            }`}
          >
            {option.bestFor}
          </p>
        </div>

        <div className="mt-7">
          <span
            className={`text-sm font-extrabold uppercase tracking-[0.1em] ${
              option.featured
                ? 'text-[#E4C98E]'
                : 'text-[#657B6C]'
            }`}
          >
            Included
          </span>

          <ul className="mt-4 space-y-3">
            {option.features.map(
              (feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3"
                >
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                      option.featured
                        ? 'bg-[#C29F60] text-[#1C3B34]'
                        : 'bg-[#F1F4F2] text-[#657B6C]'
                    }`}
                  >
                    ✓
                  </span>

                  <span
                    className={`text-base leading-relaxed ${
                      option.featured
                        ? 'text-[#E4ECE8]'
                        : 'text-[#53645D]'
                    }`}
                  >
                    {feature}
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <Link
        href={option.ctaLink}
        className={`mt-8 flex min-h-14 items-center justify-center rounded-2xl px-6 py-4 text-center text-base font-extrabold ${
          option.featured
            ? 'bg-[#C29F60] text-[#1C3B34]'
            : 'bg-[#1C3B34] text-white'
        }`}
      >
        {option.ctaText}
      </Link>
    </article>
  );
}

function ValueLine({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#F1F4F2] text-sm font-extrabold text-[#657B6C]">
        ✓
      </span>

      <p className="text-lg leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
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
    <article className="rounded-3xl bg-white p-6">
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

function DarkCard({
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