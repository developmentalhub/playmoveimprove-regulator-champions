'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import SafeTouchHomepageSection from '@/components/SafeTouchHomepageSection';

const FULL_PRICE = 4790;
const PREVIEW_PRICE = 1790;
const PREVIEW_ACCESS_MONTHS = 6;
const CONTINUE_STANDARD_PRICE = 4000;
const CONTINUE_DISCOUNT_PCT = 20;

const CONTINUE_PRICE = Math.round(
  CONTINUE_STANDARD_PRICE * (1 - CONTINUE_DISCOUNT_PCT / 100),
);

const TOTAL_IF_COMPLETED = PREVIEW_PRICE + CONTINUE_PRICE;
const UPFRONT_SAVING = TOTAL_IF_COMPLETED - FULL_PRICE;

const TIKTOK_VIDEO_ID = '7675513297692544276';

const PRACTICE_MOMENTS = [
  {
    image: '/images/feed/05_prep_transition.png',
    eyebrow: 'Drop-off',
    title: 'A child freezes at the doorway.',
    text: 'Do we hurry them inside, distract them, ask the parent to leave, offer comfort or give them more space?',
  },
  {
    image: '/images/feed/10_mat_time.png',
    eyebrow: 'Group time',
    title: 'A child cannot keep their body still.',
    text: 'Are they refusing to participate, or is their body telling us that sitting still is making participation harder?',
  },
  {
    image: '/images/aesthetic/card1_substance.png',
    eyebrow: 'Late afternoon',
    title: 'The whole room starts getting louder.',
    text: 'Do we repeat instructions, or notice that children and educators may both be running out of capacity?',
  },
];

const PREVIEW_LADDERS = [
  {
    number: '01',
    image: '/images/ladders/ladder1_rung04.png',
    title: 'Start with the educator',
    text: 'Notice your own pace, body, voice and the pressure you carry into the interaction.',
    tag: 'Regulated Educator',
  },
  {
    number: '02',
    image: '/images/feed/05_prep_transition.png',
    title: 'Make drop-off feel smaller',
    text: 'Build more predictable responses around separation, arrival and connection.',
    tag: 'Connected Drop-Offs',
  },
  {
    number: '03',
    image: '/images/feed/10_mat_time.png',
    title: 'Rethink participation',
    text: 'Support children to join in without making stillness the only measure of engagement.',
    tag: 'Participation Beyond Sitting',
  },
];

const PRACTICE_TOOLS = [
  {
    image: '/images/aesthetic/card1_substance.png',
    title: 'What should I notice?',
    text: 'Simple cues that help educators slow down and read the child, the room and the moment before responding.',
  },
  {
    image: '/images/ladders/ladder1_rung06.png',
    title: 'What could be happening here?',
    text: 'Short reflection prompts that move teams away from labels and towards curiosity.',
  },
  {
    image: '/images/feed/09_outdoor_play.png',
    title: 'What could I try next?',
    text: 'Practical responses for the real routines that create pressure across the day.',
  },
  {
    image: '/images/ladders/ladder3_rung10.png',
    title: 'How do we stay consistent?',
    text: 'A shared practice language that can be used across educators, rooms and shifts.',
  },
];

const COMPLIANCE_AREAS = [
  {
    code: 'QA1',
    title: 'Educational program and practice',
    text: 'Strengthen intentional teaching, responsiveness and reflective practice around children’s participation.',
  },
  {
    code: 'QA2',
    title: 'Children’s health and safety',
    text: 'Support thoughtful, proportionate responses to distress, sensory needs, escalation and co-regulation.',
  },
  {
    code: 'QA5',
    title: 'Relationships with children',
    text: 'Build warm, respectful and responsive interactions during difficult moments.',
  },
  {
    code: 'QA6',
    title: 'Collaborative partnerships',
    text: 'Create clearer continuity between families, educators and everyday routines.',
  },
  {
    code: 'QA7',
    title: 'Governance and leadership',
    text: 'Give leaders practical evidence for professional learning, reflection and quality improvement.',
  },
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
    quoteForm.programOption === 'preview' ? PREVIEW_PRICE : FULL_PRICE;

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
        console.error('Quote request failed:', await response.text());
      }

      setQuoteSubmitted(true);
    } catch (error) {
      console.error('Quote submit error:', error);
      setQuoteSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#1C3B34] text-white">
        <div className="absolute -left-25 -top-20 h-72 w-72 rounded-full bg-[#657B6C]/20 blur-3xl" />
        <div className="absolute -bottom-35 -right-20 h-96 w-96 rounded-full bg-[#C29F60]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:py-16 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-6">
            <div className="mb-5 inline-flex items-center rounded-full border border-[#C29F60]/50 bg-[#C29F60]/10 px-4 py-2 text-xs font-bold text-[#E4C98E]">
              Professional learning for whole early childhood teams
            </div>

            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-5xl md:text-6xl">
              Before we react, what is the child&apos;s body telling us?
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg">
              Regulator Champions helps early childhood teams slow down,
              notice what is happening and choose practical responses that
              support connection, participation and co-regulation.
            </p>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#BFD0C8]">
              Built for the real moments that are difficult to solve with
              another policy, poster or one-off webinar.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/free-guide"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-center text-sm font-extrabold text-[#1C3B34] shadow-lg transition hover:bg-[#D1B477]"
              >
                Get the free Safe Touch guide
              </Link>

              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Regulator Champions
              </Link>
            </div>

            <div className="mt-5 flex flex-wrap gap-2 text-[11px] font-semibold text-[#C8D6D0]">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Whole-service practice
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Built for busy educators
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">
                Practical room responses
              </span>
            </div>
          </div>

          {/* HERO GUIDE CARD */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl">
              <div className="rounded-4xl border border-white/10 bg-white/5 p-3 shadow-2xl backdrop-blur-sm">
                <div className="overflow-hidden rounded-[1.6rem] bg-[#FAF5EC]">
                  <img
                    src="/images/feed/safe-touch-early-childhood.png"
                    alt="Can I Still Comfort a Distressed Child free early childhood guide"
                    className="aspect-4/3 w-full object-cover"
                  />

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#1C3B34] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-white">
                        Free resource
                      </span>

                      <span className="text-xs font-bold text-[#657B6C]">
                        19-page staff guide
                      </span>
                    </div>

                    <h2 className="mt-3 text-2xl font-extrabold leading-tight text-[#1C3B34]">
                      Can I Still Comfort a Distressed Child?
                    </h2>

                    <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                      A practical guide for educators who want to offer warmth
                      and comfort while keeping touch thoughtful, appropriate
                      and responsive to the child.
                    </p>

                    <Link
                      href="/free-guide"
                      className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
                    >
                      Read about the free guide
                    </Link>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-[#C29F60]/30 bg-[#C29F60] px-4 py-3 text-center text-xs font-extrabold text-[#1C3B34] shadow-xl">
                A practical first step before committing to professional learning
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING STRIP */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto grid max-w-7xl gap-px bg-[#E6E2DC] sm:grid-cols-3">
          <div className="bg-white px-6 py-5 text-center">
            <strong className="block text-sm font-extrabold text-[#1C3B34]">
              Notice first
            </strong>

            <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
              What is the body, behaviour and environment telling us?
            </span>
          </div>

          <div className="bg-white px-6 py-5 text-center">
            <strong className="block text-sm font-extrabold text-[#1C3B34]">
              Respond thoughtfully
            </strong>

            <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
              Choose support instead of automatically adding more demands.
            </span>
          </div>

          <div className="bg-white px-6 py-5 text-center">
            <strong className="block text-sm font-extrabold text-[#1C3B34]">
              Reflect together
            </strong>

            <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
              Build a shared approach across educators, rooms and leaders.
            </span>
          </div>
        </div>
      </section>

      {/* WHY ROBYN CREATED REGULATOR CHAMPIONS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                Why I created Regulator Champions
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                I don&apos;t want fear to replace connection.
              </h2>

              <p className="mt-5 text-base leading-relaxed text-[#53645D]">
                I have been hearing more and more educators question how they
                should respond when a child is distressed, overwhelmed or
                actively seeking comfort.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                Sometimes the uncertainty is about behaviour. Sometimes it is
                about sensory needs. Sometimes it is about whether an educator
                can still offer the kind of warm, responsive support that once
                felt instinctive.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                That concerns me, because good safeguarding and good
                co-regulation should not be competing ideas. Children need
                adults who can keep boundaries clear while still noticing
                distress, responding thoughtfully and remaining emotionally
                available.
              </p>

              <div className="mt-6 rounded-3xl border-l-4 border-[#C29F60] bg-white p-6 shadow-sm">
                <p className="text-lg font-extrabold leading-relaxed text-[#1C3B34]">
                  Regulator Champions is about giving educators the confidence
                  to pause, notice and make thoughtful decisions instead of
                  reacting from fear, pressure or uncertainty.
                </p>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#6A7873]">
                It is not about giving educators permission to ignore
                safeguarding expectations. It is about strengthening professional
                judgement so warmth, safety, boundaries and connection can sit
                alongside each other.
              </p>
            </div>

            <div className="mx-auto w-full max-w-md">
              <div className="overflow-hidden rounded-4xl border border-[#D8D0C4] bg-white p-3 shadow-xl">
                <div className="overflow-hidden rounded-3xl bg-black">
                  <iframe
                    src={`https://www.tiktok.com/player/v1/${TIKTOK_VIDEO_ID}?autoplay=0&loop=0`}
                    title="Robyn Papworth explains why she created Regulator Champions"
                    allow="fullscreen"
                    className="aspect-9/16 w-full border-0"
                  />
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                    From Robyn
                  </span>

                  <h3 className="mt-2 text-xl font-extrabold leading-tight text-[#1C3B34]">
                    Watch why this matters to me.
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    This is the conversation sitting underneath Regulator
                    Champions and the reason I believe educator confidence
                    matters so much.
                  </p>

                  <a
                    href="https://www.tiktok.com/@playmoveimprove/video/7675513297692544276"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-[#D8D0C4] px-4 py-2.5 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF5EC]"
                  >
                    Watch on TikTok →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REAL MOMENTS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              The moments that matter
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Educators are often expected to respond before they have had time
              to notice.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#53645D]">
              Behaviour can quickly become the focus. Regulator Champions helps
              teams look underneath the behaviour and ask better questions
              about what the child may be communicating.
            </p>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {PRACTICE_MOMENTS.map((item) => (
              <article
                key={item.title}
                className="min-w-[82vw] snap-center overflow-hidden rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] shadow-sm sm:min-w-0"
              >
                <img
                  src={item.image}
                  alt=""
                  className="aspect-4/3 w-full object-cover"
                />

                <div className="p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                    {item.eyebrow}
                  </span>

                  <h3 className="mt-2 text-xl font-extrabold leading-tight text-[#1C3B34]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-9 max-w-3xl rounded-2xl border border-[#C29F60]/40 bg-[#FAF5EC] px-6 py-5 text-center">
            <p className="text-base font-bold leading-relaxed text-[#2B3833]">
              The goal is not to give educators a script for every child. It is
              to strengthen what they notice, what they consider and what they
              try next.
            </p>
          </div>
        </div>
      </section>

      <SafeTouchHomepageSection />

      {/* SUBSTANCE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-3xl border border-[#E6E2DC] bg-white shadow-sm">
                <img
                  src="/images/aesthetic/card2_styled.png"
                  alt="Beautifully styled early learning activity"
                  className="aspect-square w-full object-cover"
                />

                <figcaption className="p-3 text-center text-xs font-bold text-[#6A7873]">
                  Looks beautiful
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-3xl border border-[#E6E2DC] bg-white shadow-sm">
                <img
                  src="/images/aesthetic/card2_substance.png"
                  alt="Children participating in a practical play experience"
                  className="aspect-square w-full object-cover"
                />

                <figcaption className="p-3 text-center text-xs font-bold text-[#1C3B34]">
                  Works for real children
                </figcaption>
              </figure>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Look underneath the activity
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                A calm-looking room is not always a regulated room.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                A child sitting quietly may be coping well. They may also be
                frozen, overwhelmed, disconnected or working incredibly hard to
                hold themselves together.
              </p>

              <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                Regulator Champions helps educators look beyond whether an
                activity appears calm, tidy or successful and notice what is
                actually helping children connect, participate and cope.
              </p>

              <Link
                href="/feed"
                className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[#657B6C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#53665A]"
              >
                Explore free practice scenarios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT TEAMS USE */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Professional learning that reaches the room
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Less “watch this later”. More “we noticed this today”.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRACTICE_TOOLS.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-[#E6E2DC] bg-white"
              >
                <img
                  src={item.image}
                  alt=""
                  className="aspect-square w-full object-cover"
                />

                <div className="p-5">
                  <h3 className="font-extrabold text-[#1C3B34]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* NQS ALIGNMENT */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
                Practice leadership
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Make professional learning visible in everyday practice.
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D8E1DC]">
                Regulator Champions gives directors and room leaders a
                practical structure for professional conversations, reflection
                and evidence of continuous improvement.
              </p>

              <Link
                href="/kindy-uplift"
                className="mt-6 inline-flex min-h-12 items-center rounded-xl bg-[#C29F60] px-5 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Explore funding and evidence support
              </Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {COMPLIANCE_AREAS.map((area) => (
                <article
                  key={area.code}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#C29F60] text-xs font-extrabold text-[#1C3B34]">
                      {area.code}
                    </span>

                    <div>
                      <h3 className="text-sm font-extrabold text-white">
                        {area.title}
                      </h3>

                      <p className="mt-1 text-xs leading-relaxed text-[#C8D6D0]">
                        {area.text}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW LADDERS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#C29F60]">
              Start smaller
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Three ladders. Three pressure points your team already knows.
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#53645D]">
              Services that are not ready for the complete pathway can begin
              with the first three practice ladders and use them across the
              whole team for six months.
            </p>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {PREVIEW_LADDERS.map((ladder) => (
              <article
                key={ladder.number}
                className="min-w-[84vw] snap-center overflow-hidden rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] shadow-sm sm:min-w-0"
              >
                <div className="relative">
                  <img
                    src={ladder.image}
                    alt=""
                    className="aspect-4/4.5 w-full object-cover"
                  />

                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1C3B34] text-sm font-extrabold text-white shadow">
                    {ladder.number}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                    {ladder.tag}
                  </span>

                  <h3 className="mt-2 text-2xl font-extrabold leading-tight text-[#1C3B34]">
                    {ladder.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    {ladder.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-4xl bg-[#1C3B34] p-6 text-white shadow-xl sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#E4C98E]">
                  3 Ladder Preview
                </span>

                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <strong className="text-5xl font-extrabold">
                    ${PREVIEW_PRICE.toLocaleString()}
                  </strong>

                  <span className="pb-1 text-sm text-[#C8D6D0]">
                    incl. GST · {PREVIEW_ACCESS_MONTHS} months
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#D8E1DC]">
                  A lower-risk way to see whether the Regulator Champions
                  approach works for your educators before moving into the
                  complete pathway.
                </p>
              </div>

              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-center text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                View the 3 Ladder proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Professional learning funding
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Looking for a clearer way to explain the investment?
              </h2>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#53645D]">
                We have created funding and proposal pages to help directors
                explain the professional learning focus, intended practice
                change and service-wide implementation to Approved Providers
                and leadership teams.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/school-readiness-funding"
                className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                  Victoria
                </span>

                <h3 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                  School Readiness Funding
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                  Explore how the program can support an identified professional
                  learning and educator capability priority.
                </p>

                <span className="mt-4 inline-block text-sm font-bold text-[#1C3B34]">
                  Explore SRF support →
                </span>
              </Link>

              <Link
                href="/kindy-uplift"
                className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                  Queensland
                </span>

                <h3 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                  Kindy Uplift
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                  Explore links with social and emotional capability,
                  participation and educator professional learning.
                </p>

                <span className="mt-4 inline-block text-sm font-bold text-[#1C3B34]">
                  Explore Kindy Uplift support →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Created by Robyn Papworth
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Built from the moments educators actually struggle with.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Robyn is an Accredited Exercise Physiologist and Developmental
              Educator. Regulator Champions brings regulation, movement,
              sensory and developmental knowledge back to the practical
              decisions educators make throughout an ordinary early childhood
              day.
            </p>

            <p className="mt-4 text-base font-bold leading-relaxed text-[#2B3833]">
              The aim is not perfect educators or perfectly calm rooms. It is
              more thoughtful practice when things become difficult.
            </p>

            <p className="mt-4 text-xs leading-relaxed text-[#6A7873]">
              Regulator Champion recognition is personally reviewed by Robyn
              and is not a nationally recognised qualification.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Choose your starting point
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Start with three ladders or take your team through the complete
              pathway.
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            <article className="rounded-4xl border-2 border-[#C29F60] bg-white p-7 shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                3 Ladder Preview
              </span>

              <p className="mt-2 text-5xl font-extrabold text-[#1C3B34]">
                ${PREVIEW_PRICE.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-[#6A7873]">
                incl. GST · {PREVIEW_ACCESS_MONTHS} months
              </p>

              <div className="mt-5 space-y-2 text-sm text-[#53645D]">
                <p>✓ Ladders 1 to 3</p>
                <p>✓ Whole-service access</p>
                <p>✓ Practical implementation resources</p>
                <p>✓ Continue only if the approach suits your team</p>
              </div>

              <Link
                href="/proposal?plan=preview"
                className="mt-6 flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-5 py-3.5 text-center text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                View Preview proposal
              </Link>
            </article>

            <article className="rounded-4xl bg-[#1C3B34] p-7 text-white shadow-lg">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E4C98E]">
                Full 8 Ladder Pathway
              </span>

              <p className="mt-2 text-5xl font-extrabold">
                ${FULL_PRICE.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-[#C8D6D0]">
                incl. GST · 12 months
              </p>

              <div className="mt-5 space-y-2 text-sm text-[#D8E1DC]">
                <p>✓ Full 8 Ladder pathway</p>
                <p>✓ Whole-service access</p>
                <p>✓ Practice leadership resources</p>
                <p>
                  ✓ ${UPFRONT_SAVING.toLocaleString()} less than completing both
                  staged payments
                </p>
              </div>

              <Link
                href="/proposal?plan=full"
                className="mt-6 flex min-h-12 items-center justify-center rounded-2xl bg-white px-5 py-3.5 text-center text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3F0EA]"
              >
                View Full pathway proposal
              </Link>
            </article>
          </div>

          <p className="mt-5 text-center text-xs leading-relaxed text-[#6A7873]">
            Preview plus continuation totals $
            {TOTAL_IF_COMPLETED.toLocaleString()} including GST. The complete
            upfront pathway is ${FULL_PRICE.toLocaleString()} including GST.
          </p>
        </div>
      </section>

      {/* MULTI-SERVICE */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="rounded-4xl border border-[#657B6C] bg-[#1C3B34] p-7 text-white shadow-md sm:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-block rounded-full bg-[#C29F60] px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-[#1C3B34]">
                  For organisations supporting multiple services
                </span>

                <h2 className="mt-3 text-2xl font-extrabold text-white">
                  Building consistent practice across more than one centre?
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#D8E1DC]">
                  Multi-service proposals can be prepared for organisations
                  wanting to strengthen shared practice across centre
                  directors, room leaders and educator teams.
                </p>
              </div>

              <a
                href="mailto:robyn@playmoveimprove.com.au?subject=Multi-Service%20Regulator%20Champions%20Quote%20Request"
                className="flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-center text-xs font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Request multi-service proposal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE FORM */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
              Ready to take it to your Approved Provider?
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Create a clear starting point for the conversation.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-[#D8E1DC]">
              Choose the pathway you are considering and send through your
              service details.
            </p>
          </div>

          {quoteSubmitted ? (
            <div className="mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-7 text-center">
              <h3 className="text-xl font-extrabold text-[#E4C98E]">
                Proposal request received
              </h3>

              <p className="mt-2 text-sm text-[#D8E1DC]">
                You can also open the printable proposal information now.
              </p>

              <Link
                href={`/proposal?plan=${quoteForm.programOption}`}
                className="mt-5 inline-flex min-h-12 items-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
              >
                Open proposal
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleQuoteSubmit}
              className="mx-auto max-w-3xl space-y-4 rounded-4xl border border-white/10 bg-white/5 p-6 sm:p-8"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setQuoteForm({
                      ...quoteForm,
                      programOption: 'preview',
                    })
                  }
                  className={`min-h-12 rounded-2xl border p-4 text-left transition ${
                    quoteForm.programOption === 'preview'
                      ? 'border-[#C29F60] bg-white/10'
                      : 'border-white/10 bg-black/10'
                  }`}
                >
                  <span className="block text-sm font-extrabold">
                    3 Ladder Preview
                  </span>

                  <span className="text-xs text-[#C8D6D0]">
                    ${PREVIEW_PRICE.toLocaleString()} incl. GST
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setQuoteForm({
                      ...quoteForm,
                      programOption: 'full',
                    })
                  }
                  className={`min-h-12 rounded-2xl border p-4 text-left transition ${
                    quoteForm.programOption === 'full'
                      ? 'border-[#C29F60] bg-white/10'
                      : 'border-white/10 bg-black/10'
                  }`}
                >
                  <span className="block text-sm font-extrabold">
                    Full 8 Ladder Pathway
                  </span>

                  <span className="text-xs text-[#C8D6D0]">
                    ${FULL_PRICE.toLocaleString()} incl. GST
                  </span>
                </button>
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
                  className="min-h-12 rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
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
                  className="min-h-12 rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
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
                  className="min-h-12 rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white placeholder:text-[#91A39B] focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                />

                <select
                  value={quoteForm.fundingSource}
                  onChange={(event) =>
                    setQuoteForm({
                      ...quoteForm,
                      fundingSource: event.target.value,
                    })
                  }
                  aria-label="Funding pathway"
                  className="min-h-12 rounded-xl border border-white/15 bg-[#132C27] p-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#C29F60]"
                >
                  <option value="Victorian School Readiness Funding (SRF)">
                    Victorian School Readiness Funding (SRF)
                  </option>

                  <option value="Queensland Kindy Uplift">
                    Queensland Kindy Uplift
                  </option>

                  <option value="NSW Quality and Learning Environments (QLE)">
                    NSW Quality and Learning Environments (QLE)
                  </option>

                  <option value="Annual Operational PD Budget">
                    Annual professional learning budget
                  </option>

                  <option value="Other">
                    Other / not sure yet
                  </option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="min-h-12 w-full rounded-2xl bg-[#C29F60] py-4 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477] disabled:cursor-not-allowed disabled:opacity-60"
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