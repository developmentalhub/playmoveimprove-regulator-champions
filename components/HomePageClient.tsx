'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const FULL_PRICE = 4790;
const PREVIEW_PRICE = 1790;
const PREVIEW_LADDER_COUNT = 3;
const PREVIEW_ACCESS_MONTHS = 6;
const CONTINUE_STANDARD_PRICE = 4000;
const CONTINUE_DISCOUNT_PCT = 20;
const CONTINUE_PRICE = Math.round(
  CONTINUE_STANDARD_PRICE * (1 - CONTINUE_DISCOUNT_PCT / 100),
);
const TOTAL_IF_COMPLETED = PREVIEW_PRICE + CONTINUE_PRICE;
const UPFRONT_SAVING = TOTAL_IF_COMPLETED - FULL_PRICE;

const SNAPSHOTS = [
  {
    image: '/images/feed/05_prep_transition.png',
    eyebrow: 'Drop-off',
    title: 'One child freezes at the door.',
    text: 'Everyone is trying to help. Nobody is quite sure what to do next.',
  },
  {
    image: '/images/feed/10_mat_time.png',
    eyebrow: 'Group time',
    title: '“Can you sit still?” gets said again.',
    text: 'The child may be participating, but their body does not look the way we expect.',
  },
  {
    image: '/images/aesthetic/card1_substance.png',
    eyebrow: 'Transitions',
    title: 'The room gets louder as everyone gets tired.',
    text: 'More instructions are not always the answer when the whole environment is under pressure.',
  },
];

const PREVIEW_LADDERS = [
  {
    number: '01',
    image: '/images/ladders/ladder1_rung04.png',
    title: 'Start with the educator',
    text: 'Notice your pace, body, voice and the pressure you carry into the room.',
    tag: 'Regulated Educator',
  },
  {
    number: '02',
    image: '/images/feed/05_prep_transition.png',
    title: 'Make drop-off feel smaller',
    text: 'Build calmer, more predictable responses around separation and arrival.',
    tag: 'Connected Drop-Offs',
  },
  {
    number: '03',
    image: '/images/feed/10_mat_time.png',
    title: 'Rethink what participation looks like',
    text: 'Support children to join in without making stillness the only measure of engagement.',
    tag: 'Participation Beyond Sitting',
  },
];

const WHAT_YOU_GET = [
  {
    image: '/images/aesthetic/card1_substance.png',
    title: 'Practical room ideas',
    text: 'Things educators can actually try during real routines.',
  },
  {
    image: '/images/ladders/ladder1_rung06.png',
    title: 'Short reflection prompts',
    text: 'Notice what happened, what changed and what to try next.',
  },
  {
    image: '/images/feed/09_outdoor_play.png',
    title: 'Real practice scenarios',
    text: 'Talk through the moments that usually create pressure for the team.',
  },
  {
    image: '/images/ladders/ladder3_rung10.png',
    title: 'A shared language',
    text: 'Help educators respond more consistently across rooms and shifts.',
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
    <div className="min-h-screen overflow-x-hidden bg-[#FDFBF7] text-slate-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-teal-950 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-10 sm:px-6 md:py-16 lg:grid-cols-12 lg:py-20">
          <div className="space-y-6 lg:col-span-6">
            <div className="inline-flex items-center rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1.5 text-[11px] font-bold text-amber-300">
              3 Ladder Preview · $1,790 incl. GST
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                When the whole room feels like too much.
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-teal-100 sm:text-lg">
                Regulator Champions gives early childhood teams practical ways
                to respond with more consistency, less guessing and less
                pressure across single or multiple centres.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="rounded-2xl bg-amber-400 px-6 py-4 text-center text-sm font-extrabold text-slate-950 shadow-lg transition hover:bg-amber-300"
              >
                Start with 3 Ladders for $1,790
              </Link>

              <Link
                href="/educator-trial"
                className="rounded-2xl border border-teal-700 bg-teal-900/70 px-6 py-4 text-center text-sm font-bold text-white transition hover:bg-teal-800"
              >
                Try Ladder 1 Free
              </Link>
            </div>

            <div className="flex flex-wrap gap-2 pt-1 text-[11px] font-semibold text-teal-200">
              <span className="rounded-full bg-teal-900 px-3 py-2">
                6 months access
              </span>
              <span className="rounded-full bg-teal-900 px-3 py-2">
                Whole centre licence
              </span>
              <span className="rounded-full bg-teal-900 px-3 py-2">
                Built for busy educators
              </span>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-1 shadow-2xl">
                <img
                  src="/images/feed/05_prep_transition.png"
                  alt="Educator supporting a child during a busy transition"
                  className="aspect-4/5 h-full w-full rounded-[1.75rem] object-cover"
                />
              </div>

              <div className="mt-8 overflow-hidden rounded-4xl border border-white/10 bg-white/5 p-1 shadow-2xl">
                <img
                  src="/images/feed/10_mat_time.png"
                  alt="Educator and children participating in group time"
                  className="aspect-4/5 h-full w-full rounded-[1.75rem] object-cover"
                />
              </div>
            </div>

            <div className="absolute -bottom-5 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl border border-amber-300/30 bg-amber-300 px-4 py-3 text-center text-xs font-extrabold text-slate-950 shadow-xl">
              Not another long webinar. Something your team can use in the room.
            </div>
          </div>
        </div>
      </section>

      {/* SNAPSHOTS SECTION */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-7 max-w-2xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-700">
              Does this look familiar?
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              The moments that drain good educators.
            </h2>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {SNAPSHOTS.map((item) => (
              <article
                key={item.title}
                className="min-w-[82vw] snap-center overflow-hidden rounded-3xl border border-slate-200 bg-[#FDFBF7] shadow-sm sm:min-w-0"
              >
                <img
                  src={item.image}
                  alt=""
                  className="aspect-4/3 w-full object-cover"
                />

                <div className="space-y-2 p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700">
                    {item.eyebrow}
                  </span>

                  <h3 className="text-xl font-extrabold leading-tight text-slate-950">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-7 max-w-3xl text-center text-lg font-bold leading-relaxed text-slate-800">
            Your educators do not need more information thrown at them. They
            need a shared way to think through what is happening when the room
            gets hard.
          </p>
        </div>
      </section>

      {/* SUBSTANCE OVER STYLED */}
      <section className="bg-[#F7F3EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div className="grid grid-cols-2 gap-3">
              <figure className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <img
                  src="/images/aesthetic/card2_styled.png"
                  alt="Beautifully styled early learning sensory activity"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="p-3 text-center text-xs font-bold text-slate-600">
                  Looks beautiful
                </figcaption>
              </figure>

              <figure className="overflow-hidden rounded-3xl bg-white shadow-sm">
                <img
                  src="/images/aesthetic/card2_substance.png"
                  alt="Children actively participating in a practical play experience"
                  className="aspect-square w-full object-cover"
                />
                <figcaption className="p-3 text-center text-xs font-bold text-teal-800">
                  Works for real children
                </figcaption>
              </figure>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-700">
                Substance over styled
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                A calm-looking room is not always a regulated room.
              </h2>

              <p className="text-base leading-relaxed text-slate-700">
                Regulator Champions helps educators look beyond whether an
                activity is tidy, quiet or Pinterest-perfect and notice what is
                actually helping children participate, connect and cope.
              </p>

              <Link
                href="/feed"
                className="inline-flex rounded-xl bg-teal-800 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-900"
              >
                See the free scenario library
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PREVIEW LADDERS */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-700">
              Start smaller
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Three ladders. Three pressure points your team already knows.
            </h2>
          </div>

          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-5 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0">
            {PREVIEW_LADDERS.map((ladder) => (
              <article
                key={ladder.number}
                className="min-w-[84vw] snap-center overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm sm:min-w-0"
              >
                <div className="relative">
                  <img
                    src={ladder.image}
                    alt=""
                    className="aspect-4/4.5 w-full object-cover"
                  />

                  <span className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-teal-950 text-sm font-extrabold text-white shadow">
                    {ladder.number}
                  </span>
                </div>

                <div className="space-y-3 p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-700">
                    {ladder.tag}
                  </span>

                  <h3 className="text-2xl font-extrabold leading-tight text-slate-950">
                    {ladder.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600">
                    {ladder.text}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-4xl bg-teal-950 p-6 text-white shadow-xl sm:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-300">
                  3 Ladder Preview
                </span>

                <div className="mt-2 flex flex-wrap items-end gap-3">
                  <strong className="text-5xl font-extrabold">
                    ${PREVIEW_PRICE.toLocaleString()}
                  </strong>
                  <span className="pb-1 text-sm text-teal-200">
                    incl. GST · {PREVIEW_ACCESS_MONTHS} months
                  </span>
                </div>

                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-teal-100">
                  Give your whole team a practical starting point without
                  committing to the full pathway first.
                </p>
              </div>

              <Link
                href="/proposal?plan=preview"
                className="rounded-2xl bg-amber-400 px-6 py-4 text-center text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                View the 3 Ladder proposal
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-700">
              What educators actually use
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Less “watch this later”. More “try this today”.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHAT_YOU_GET.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-[#FDFBF7]"
              >
                <img
                  src={item.image}
                  alt=""
                  className="aspect-square w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="font-extrabold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {item.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDING ALIGNMENT */}
      <section className="bg-teal-950 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-300">
                Funding
              </span>

              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Still have 2026 funding available?
              </h2>

              <p className="max-w-xl text-base leading-relaxed text-teal-100">
                The smaller Preview gives services a practical way to begin
                using available professional learning funding without starting
                with the full $4,790 pathway.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/school-readiness-funding"
                className="rounded-3xl border border-teal-700 bg-teal-900 p-6 transition hover:bg-teal-800"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                  Victoria
                </span>

                <h3 className="mt-2 text-xl font-extrabold">
                  School Readiness Funding
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-teal-100">
                  See how Regulator Champions can fit an identified educator
                  capability priority through the SRF coaching pathway.
                </p>

                <span className="mt-4 inline-block text-sm font-bold text-white">
                  How to use SRF →
                </span>
              </Link>

              <Link
                href="/kindy-uplift"
                className="rounded-3xl border border-teal-700 bg-teal-900 p-6 transition hover:bg-teal-800"
              >
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300">
                  Queensland
                </span>

                <h3 className="mt-2 text-xl font-extrabold">
                  Kindy Uplift
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-teal-100">
                  Explore alignment with social and emotional learning,
                  executive function and educator capability building.
                </p>

                <span className="mt-4 inline-block text-sm font-bold text-white">
                  How to use Kindy Uplift →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT ROBYN */}
      <section className="bg-[#F7F3EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-700">
              Created by Robyn Papworth
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Built from the moments educators actually struggle with.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-slate-700">
              Robyn is an Accredited Exercise Physiologist and Developmental
              Educator. Regulator Champions was created to turn regulation,
              movement, sensory and developmental knowledge into practical
              decisions educators can use during real routines.
            </p>

            <p className="mt-3 text-xs text-slate-500">
              Regulator Champion recognition is personally reviewed by Robyn
              and is not a nationally recognised qualification.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING OPTIONS */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-8 text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-teal-700">
              Choose your starting point
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
              Start small, or save by going straight to the full pathway.
            </h2>
          </div>

          <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
            <div className="rounded-4xl border-2 border-amber-300 bg-white p-7 shadow-sm">
              <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700">
                3 Ladder Preview
              </span>

              <p className="mt-2 text-5xl font-extrabold text-slate-950">
                ${PREVIEW_PRICE.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                incl. GST · {PREVIEW_ACCESS_MONTHS} months
              </p>

              <div className="mt-5 space-y-2 text-sm text-slate-700">
                <p>✓ Ladders 1 to 3</p>
                <p>✓ Whole-centre access</p>
                <p>✓ Continue only if it suits your team</p>
              </div>

              <Link
                href="/proposal?plan=preview"
                className="mt-6 block rounded-2xl bg-amber-400 px-5 py-3.5 text-center text-sm font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                Start with the Preview
              </Link>
            </div>

            <div className="rounded-4xl bg-teal-950 p-7 text-white shadow-lg">
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-300">
                Full 8 Ladder Pathway
              </span>

              <p className="mt-2 text-5xl font-extrabold">
                ${FULL_PRICE.toLocaleString()}
              </p>

              <p className="mt-1 text-sm text-teal-200">
                incl. GST · 12 months
              </p>

              <div className="mt-5 space-y-2 text-sm text-teal-100">
                <p>✓ Full 8 Ladder pathway</p>
                <p>✓ Whole-centre access</p>
                <p>
                  ✓ ${UPFRONT_SAVING.toLocaleString()} less than completing both
                  staged payments
                </p>
              </div>

              <Link
                href="/proposal?plan=full"
                className="mt-6 block rounded-2xl bg-white px-5 py-3.5 text-center text-sm font-extrabold text-teal-950 transition hover:bg-teal-50"
              >
                View the Full pathway
              </Link>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500">
            Preview plus continuation totals ${TOTAL_IF_COMPLETED.toLocaleString()}
            {' '}including GST. The full upfront pathway is $
            {FULL_PRICE.toLocaleString()} including GST.
          </p>
        </div>
      </section>

      {/* MULTI-SERVICE / AREA MANAGER CALLOUT */}
      <section className="bg-[#F7F3EC] py-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="rounded-3xl border border-teal-800 bg-teal-950 p-8 text-white shadow-md">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-950">
                  Approved Providers &amp; Area Managers
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  Enrolling Multiple Centres or Regional Clusters?
                </h3>
                <p className="text-xs text-teal-100/90 leading-relaxed max-w-2xl">
                  We provide custom multi-site proposals, consolidated group tax invoicing, and cluster-wide funding acquittal support for organisations managing 2 to 50+ early childhood services.
                </p>
              </div>

              <a
                href="mailto:robyn@playmoveimprove.com.au?subject=Multi-Service%20Regulator%20Champions%20Quote%20Request"
                className="shrink-0 rounded-2xl bg-amber-400 px-6 py-3.5 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300"
              >
                Request Multi-Centre Quote →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FORMAL PROPOSAL / QUOTE REQUEST FORM */}
      <section className="bg-teal-950 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="mx-auto mb-8 max-w-2xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-amber-300">
              Want a formal proposal?
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Give your Approved Provider something clear to review.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-teal-100">
              Choose your program option and send through your centre details.
            </p>
          </div>

          {quoteSubmitted ? (
            <div className="mx-auto max-w-2xl rounded-3xl border border-teal-700 bg-teal-900 p-7 text-center">
              <h3 className="text-xl font-extrabold text-amber-300">
                Proposal request received
              </h3>

              <p className="mt-2 text-sm text-teal-100">
                You can also open the printable proposal pack now.
              </p>

              <Link
                href={`/proposal?plan=${quoteForm.programOption}`}
                className="mt-5 inline-block rounded-2xl bg-amber-400 px-6 py-3.5 text-sm font-extrabold text-slate-950"
              >
                Open proposal pack
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleQuoteSubmit}
              className="mx-auto max-w-3xl space-y-4 rounded-4xl border border-teal-800 bg-teal-900/60 p-6 sm:p-8"
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
                  className={`rounded-2xl border p-4 text-left transition ${
                    quoteForm.programOption === 'preview'
                      ? 'border-amber-300 bg-teal-800'
                      : 'border-teal-700 bg-teal-950/40'
                  }`}
                >
                  <span className="block text-sm font-extrabold">
                    3 Ladder Preview
                  </span>
                  <span className="text-xs text-teal-200">
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
                  className={`rounded-2xl border p-4 text-left transition ${
                    quoteForm.programOption === 'full'
                      ? 'border-amber-300 bg-teal-800'
                      : 'border-teal-700 bg-teal-950/40'
                  }`}
                >
                  <span className="block text-sm font-extrabold">
                    Full 8 Ladder Pathway
                  </span>
                  <span className="text-xs text-teal-200">
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
                  className="rounded-xl border border-teal-700 bg-teal-950/70 p-3.5 text-sm text-white placeholder:text-teal-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                  className="rounded-xl border border-teal-700 bg-teal-950/70 p-3.5 text-sm text-white placeholder:text-teal-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                  className="rounded-xl border border-teal-700 bg-teal-950/70 p-3.5 text-sm text-white placeholder:text-teal-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
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
                  className="rounded-xl border border-teal-700 bg-teal-950/70 p-3.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                >
                  <option value="Victorian School Readiness Funding (SRF)">
                    Victorian School Readiness Funding (SRF)
                  </option>
                  <option value="Queensland Kindy Uplift">
                    Queensland Kindy Uplift
                  </option>
                  <option value="Annual Operational PD Budget">
                    Annual Operational PD Budget
                  </option>
                  <option value="Inclusion Support Funding">
                    Inclusion Support Allocation
                  </option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-amber-400 py-4 text-sm font-extrabold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Sending request…'
                  : `Request $${selectedPrice.toLocaleString()} proposal`}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}