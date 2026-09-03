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
    text: 'Help educators notice the child’s body, the environment, what has just happened and what may be adding pressure before they move straight into correcting the behaviour.',
  },
  {
    number: '02',
    title: 'Know what to try',
    text: 'Use what the team is noticing to choose one practical response, then watch the child closely enough to see whether that response is helping, adding pressure or needs to be adjusted.',
  },
  {
    number: '03',
    title: 'Know where to go when you are still unsure',
    text: 'Bring real practice questions back through Ask Robyn, monthly coaching and recordings, so difficult situations can be thought through rather than leaving educators to keep guessing.',
  },
];

const CURRENT_LADDERS = [
  {
    number: '01',
    image: '/images/watercolour-anchor.png',
    tag: 'Regulated Educator',
    title: 'Start with the educator',
    text: 'Notice your own pace, body, voice and the pressure you may be bringing into the interaction, because co-regulation begins with what the adult nervous system is communicating too.',
  },
  {
    number: '02',
    image: '/images/watercolour-dropoff.png',
    tag: 'Connected Drop-Offs',
    title: 'Make drop-off feel smaller',
    text: 'Help educators look beyond the tears or clinging and think about predictability, separation, connection and what might help the child feel safer in the transition.',
  },
  {
    number: '03',
    image: '/images/watercolour-mattime.png',
    tag: 'Participation Beyond Sitting',
    title: 'Rethink participation',
    text: 'Support children to join in ways their bodies can manage, rather than assuming that sitting still is the only sign that a child is listening, learning or belonging.',
  },
];

const MEMBER_JOURNEY = [
  {
    title: 'Start with the moment that is hard',
    text: 'Begin with the situation that is placing pressure on the child and the educators today, whether that is drop-off, group time, transitions, escalation, shutdown, rough play or another repeated point of stress.',
  },
  {
    title: 'Choose the closest practical support',
    text: 'Use the Regulation Ladder or floor prompt that best matches what the team is seeing, so educators have a useful place to start without trying to solve every regulation challenge at once.',
  },
  {
    title: 'Try one thoughtful adjustment',
    text: 'Change one thing in the environment, the adult response, the movement available, the language being used or the level of demand, then notice what the child’s body tells you next.',
  },
  {
    title: 'Bring the situation back when you are still unsure',
    text: 'Educators can submit a private, de-identified question to Robyn so the situation can help shape future coaching and the team has somewhere to return when the first strategy does not quite fit.',
  },
];

const CURRENT_INCLUSIONS = [
  'Three Regulation Ladders currently available',
  'Educator Floor Deck for quick in-the-room support',
  'Private Ask Robyn question submissions',
  'Live monthly Regulator Champions coaching',
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
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#657B6C]/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-[#C29F60]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 md:py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-18">
          <div>
            <div className="inline-flex rounded-full border border-[#E4C98E]/40 bg-[#E4C98E]/10 px-4 py-2 text-sm font-extrabold text-[#F5E6BE]">
              Whole-service regulation support
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.55rem]">
              When a child is struggling, your educators need more than good intentions. They need help making sense of what the child may be communicating and deciding what to try next.
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#E0E8E4]">
              Regulator Champions supports early childhood teams to notice regulation needs earlier, look beneath the surface of behaviour and respond more thoughtfully when a child is overwhelmed, shutting down, escalating, struggling with separation, finding group times difficult or becoming stuck during transitions.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] shadow-lg transition hover:bg-[#EDCD82]"
              >
                See the program options
              </Link>

              <a
                href="#how-it-works"
                className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-white bg-white px-7 py-4 text-base font-extrabold text-[#12362F] shadow-sm transition hover:bg-[#F4F0E8] hover:text-[#12362F]"
              >
                See how educators use it
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="overflow-hidden rounded-[2rem] border border-white/15 bg-[#FAF5EC] p-3 shadow-2xl">
              <img
                src="/images/watercolour-anchor.png"
                alt="Watercolour illustration representing calm educator support and regulation"
                width={900}
                height={900}
                decoding="async"
                fetchPriority="high"
                className="aspect-square w-full rounded-[1.45rem] object-cover"
              />
            </div>

            <div className="relative -mt-7 mx-5 rounded-3xl border border-[#E5DED4] bg-white p-5 text-[#1C3B34] shadow-xl">
              <p className="text-lg font-extrabold leading-snug">
                What is this child’s body telling us?
              </p>
              <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                That question sits at the centre of Regulator Champions, because educators can respond more effectively when they understand what they are noticing before deciding what the child needs from them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* REAL MOMENTS */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                Built around real early childhood moments
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Regulation challenges rarely arrive one at a time, and they rarely happen when an educator has space to stop and think.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                They happen while another child needs help, a parent is at the door, the group is moving to lunch, the room is noisy and the educator is already carrying the demands of the day. Regulator Champions is designed for that reality, helping teams build a clearer way of noticing what may be happening underneath the behaviour so they can make more confident decisions in the moments that usually feel the hardest.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-3xl border border-[#E5DED4] bg-[#FAF5EC]">
                <img
                  src="/images/watercolour-dropoff.png"
                  alt="Watercolour illustration representing a difficult early childhood drop-off"
                  width={700}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>

              <div className="mt-8 overflow-hidden rounded-3xl border border-[#E5DED4] bg-[#FAF5EC]">
                <img
                  src="/images/watercolour-mattime.png"
                  alt="Watercolour illustration representing participation during group time"
                  width={700}
                  height={800}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THREE PROMISES */}
      <section className="border-y border-[#E5DED4] bg-[#FAF5EC] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              What your team learns to do
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              The aim is to help educators become more confident at noticing what is happening before they decide how to respond.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {CORE_PROMISES.map((item) => (
              <article
                key={item.number}
                className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E0BC68] text-base font-extrabold text-[#102E28]">
                  {item.number}
                </span>

                <h3 className="mt-5 text-2xl font-extrabold text-[#1C3B34]">
                  {item.title}
                </h3>

                <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* BEHAVIOUR TO NEED */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div className="rounded-4xl bg-[#1C3B34] p-8 text-white sm:p-10">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
                The moment before the reaction matters
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                A child who is kicking, running away, refusing, crying, hiding, crashing into others or unable to settle is giving us information, even when the behaviour is difficult to manage.
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-[#D8E1DC]">
                Regulator Champions helps educators become more curious about what may be increasing the pressure on the child while still maintaining safety, boundaries and expectations. The goal is not to excuse behaviour, but to understand enough about the child’s regulation needs that the adult response becomes more useful.
              </p>
            </div>

            <div className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-[#FAF5EC] p-3 shadow-sm">
              <img
                src="/images/watercolour-playbooks.png"
                alt="Watercolour illustration representing practical educator support"
                width={900}
                height={900}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-[#FAF8F5] py-14 sm:py-18"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              How educators use it
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Educators begin with the situation that is actually happening in their room, rather than working through a course in a fixed order.
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {MEMBER_JOURNEY.map((step, index) => (
              <article
                key={step.title}
                className="grid gap-5 rounded-4xl border border-[#E5DED4] bg-white p-6 sm:grid-cols-[72px_1fr] sm:items-center sm:p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1C3B34] text-lg font-extrabold text-white">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-[#1C3B34]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-lg leading-relaxed text-[#53645D]">
                    {step.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* RECORDINGS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
                Built for real staffing conditions
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                If educators cannot get off the floor for live coaching, they can still bring their questions into the program and return to the recording when staffing allows.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
                Monthly coaching is there to help teams think through the situations that are actually occurring in practice, while recordings mean the learning does not disappear simply because someone was covering lunch breaks, supporting a child or unable to leave the room at the scheduled time.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoBubble
                title="Join live"
                text="Bring current questions into the conversation when staffing makes live attendance possible."
              />

              <InfoBubble
                title="Watch later"
                text="Use the recording during planning time, a team meeting or another professional learning opportunity."
              />

              <InfoBubble
                title="Ask before the session"
                text="Submit a de-identified question even when you already know you will not be able to attend live."
              />

              <InfoBubble
                title="Come back again"
                text="Return with another question when the first idea does not quite fit the child or the context."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CURRENT LADDERS */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              Available now
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              The program currently begins with three Regulation Ladders that address common pressure points in early childhood practice.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#53645D]">
              These are not meant to be completed like units in a course. They give educators a practical place to begin when a familiar situation is becoming difficult, while new ladder content can be added as the program develops around the challenges participating services are actually bringing forward.
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
                    width={700}
                    height={820}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/4.7] w-full object-cover"
                  />

                  <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#1C3B34] text-base font-extrabold text-white">
                    {ladder.number}
                  </span>
                </div>

                <div className="p-7">
                  <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                    {ladder.tag}
                  </span>

                  <h3 className="mt-3 text-2xl font-extrabold leading-tight text-[#1C3B34]">
                    {ladder.title}
                  </h3>

                  <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                    {ladder.text}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS INCLUDED */}
      <section className="bg-[#FAF5EC] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                What is included
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Regulator Champions brings the practical tools and ongoing support together so educators have somewhere useful to return when regulation becomes difficult.
              </h2>

              <div className="mt-7 overflow-hidden rounded-4xl border border-[#E5DED4] bg-white p-3">
                <img
                  src="/images/watercolour-wake.png"
                  alt="Watercolour illustration representing movement and regulation support"
                  width={900}
                  height={650}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full rounded-3xl object-cover"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {CURRENT_INCLUSIONS.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-3xl border border-[#E5DED4] bg-white p-5"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E0BC68] text-sm font-extrabold text-[#102E28]">
                    ✓
                  </span>

                  <p className="text-base font-semibold leading-relaxed text-[#42544D]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SafeTouchHomepageSection />

      {/* ABOUT */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-4xl bg-[#1C3B34] p-8 text-white sm:p-10">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
              Created by Robyn Papworth
            </span>

            <h2 className="mt-4 max-w-4xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Regulator Champions was built around the gap between understanding that behaviour is communication and knowing what to actually do when a child is struggling in front of you.
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-[#D8E1DC]">
              Good educators can understand regulation in theory and still feel unsure when one child is screaming, another is running away, the room is noisy and the rest of the group still needs them. The purpose of this program is to make regulation knowledge more usable in those ordinary, messy moments by helping educators notice more, think more clearly and adjust their response without expecting perfection from themselves or the child.
            </p>
          </div>
        </div>
      </section>

      {/* TWO WAYS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              Two ways to work with Robyn
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Some teams need a concentrated learning day together, while others need support they can keep returning to as different regulation challenges arise across the year.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="rounded-4xl border border-[#E5DED4] bg-white p-8">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
                Face-to-face at Chirnside Park
              </span>

              <h3 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
                Half or full-day team workshop
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                Bring the team together for concentrated professional learning, practical teaching and discussion with Robyn around regulation, behaviour, sensory needs, movement and the everyday situations educators want more confidence responding to.
              </p>
            </article>

            <article className="rounded-4xl border-2 border-[#E0BC68] bg-[#1C3B34] p-8 text-white">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
                Regulator Champions
              </span>

              <h3 className="mt-3 text-3xl font-extrabold text-white">
                Support that continues across the year
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                Use the Regulation Ladders in practice, submit questions when new situations arise, join monthly coaching when possible and return to recordings when the team needs to revisit a topic or work through a challenge again.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
                Funding information
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                If your service needs to take the program to leadership, we can provide the information and formal quote needed for that conversation.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Services can consider Regulator Champions alongside their own identified professional learning priorities, improvement planning and current funding eligibility requirements.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <FundingLink
                state="Victoria"
                title="School Readiness Funding"
                href="/school-readiness-funding"
                text="Information for Victorian services considering the program alongside an identified professional learning or practice improvement priority."
              />

              <FundingLink
                state="Queensland"
                title="Kindy Uplift"
                href="/kindy-uplift"
                text="Information for Queensland services considering the program alongside professional learning and social and emotional capability priorities."
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-[#FAF5EC] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              Program options
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Choose whether your service wants a six-month introduction or year-round access to the Regulator Champions support system.
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            <PricingCard
              eyebrow="6-Month Preview"
              price={PREVIEW_PRICE}
              period={`${PREVIEW_ACCESS_MONTHS} months`}
              title="Start with the current three ladders"
              text="A smaller whole-service introduction to the Regulation Ladders, Ask Robyn, monthly coaching and recordings, giving your team time to use the support in practice before deciding what they need next."
              href="/proposal?plan=preview"
              button="View 6-Month Preview"
            />

            <PricingCard
              eyebrow="12-Month Regulator Champions"
              price={FULL_PRICE}
              period="12 months"
              title="Give your team year-round support"
              text="Ongoing whole-service access to the Regulation Ladders, monthly coaching, Ask Robyn support, recordings and new member resources added as the program develops."
              href="/proposal?plan=full"
              button="View 12-Month Program"
              featured
            />
          </div>
        </div>
      </section>

      {/* MULTI SERVICE */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="rounded-4xl bg-[#1C3B34] p-8 text-white shadow-lg sm:p-10">
            <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
              <div>
                <span className="inline-block rounded-full bg-[#E0BC68] px-4 py-2 text-sm font-extrabold text-[#102E28]">
                  Multiple services
                </span>

                <h2 className="mt-4 text-3xl font-extrabold text-white">
                  Organisations supporting several centres can request a multi-service proposal if they want a more consistent approach across directors, leaders and educator teams.
                </h2>
              </div>

              <a
                href="mailto:robyn@playmoveimprove.com.au?subject=Multi-Service%20Regulator%20Champions%20Quote%20Request"
                className="flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-white px-7 py-4 text-center text-base font-extrabold text-[#12362F] shadow-sm transition hover:bg-[#F4F0E8] hover:text-[#12362F]"
              >
                Request multi-service proposal
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-18">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
              Ready to explore it?
            </span>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Request the program information and quote you need to take Regulator Champions back to your leadership team.
            </h2>
          </div>

          {quoteSubmitted ? (
            <div className="mx-auto max-w-2xl rounded-4xl border border-white/15 bg-white/5 p-8 text-center">
              <h3 className="text-2xl font-extrabold text-[#F0D99A]">
                Proposal request received
              </h3>

              <p className="mt-3 text-lg text-[#D8E1DC]">
                You can also open the printable proposal information now.
              </p>

              <Link
                href={`/proposal?plan=${quoteForm.programOption}`}
                className="mt-6 inline-flex min-h-14 items-center rounded-2xl bg-white px-7 py-4 text-base font-extrabold text-[#12362F] shadow-sm transition hover:bg-[#F4F0E8] hover:text-[#12362F]"
              >
                Open proposal
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleQuoteSubmit}
              className="mx-auto max-w-3xl space-y-5 rounded-4xl border border-white/15 bg-white/5 p-7 sm:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <PlanButton
                  active={quoteForm.programOption === 'preview'}
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
                  active={quoteForm.programOption === 'full'}
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
                  className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#D8E1DC] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
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
                  className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#D8E1DC] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
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
                  className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#D8E1DC] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
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
                  className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
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
                className="min-h-14 w-full rounded-2xl bg-[#E0BC68] px-6 py-4 text-base font-extrabold text-[#102E28] transition hover:bg-[#EDCD82] disabled:cursor-not-allowed disabled:opacity-60"
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

function InfoBubble({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-white/15 bg-white/7 p-6">
      <h3 className="text-xl font-extrabold text-white">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#D8E1DC]">
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
      className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7 transition hover:border-[#C29F60]"
    >
      <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
        {state}
      </span>

      <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-4 text-base leading-relaxed text-[#53645D]">
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
          : 'border-2 border-[#E0BC68] bg-white text-[#1C3B34]'
      }`}
    >
      <span
        className={`text-sm font-extrabold uppercase tracking-widest ${
          featured
            ? 'text-[#F0D99A]'
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
            ? 'text-[#D8E1DC]'
            : 'text-[#53645D]'
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
        className={`mt-8 flex min-h-14 items-center justify-center rounded-2xl px-6 py-4 text-center text-base font-extrabold shadow-sm ${
          featured
            ? 'bg-white text-[#12362F] hover:bg-[#F4F0E8] hover:text-[#12362F]'
            : 'bg-[#12362F] text-white hover:bg-[#224C42] hover:text-white'
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
          ? 'border-[#E0BC68] bg-white text-[#12362F]'
          : 'border-white/30 bg-[#102E28] text-white'
      }`}
    >
      <span
        className={`block text-lg font-extrabold ${
          active ? 'text-[#12362F]' : 'text-white'
        }`}
      >
        {title}
      </span>

      <span
        className={`mt-1 block text-base ${
          active ? 'text-[#42544D]' : 'text-[#D8E1DC]'
        }`}
      >
        ${price.toLocaleString()} incl. GST
      </span>
    </button>
  );
}
