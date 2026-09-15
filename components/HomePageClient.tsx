'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const FULL_PRICE = 4790;
const PREVIEW_PRICE = 1790;
const PREVIEW_ACCESS_MONTHS = 6;

const FREE_SAMPLE_URL = '/playbooks';
const BLOG_URL = '/blog';

const VAGUS_ARTICLE_URL =
  '/blog/vagus-nerve-regulation-activities';

const VAGUS_CARDS_PAYMENT_URL =
  'https://buy.stripe.com/14AbIUgaeb9C0Vze549fW0d';

const REGULATION_CARDS_URL =
  'https://playmoveimprove.com.au/products/regulation-cards-for-early-childhood-teams';

const PRESSURE_QUESTIONS = [
  'Why does this child seem fine one minute and completely overwhelmed the next?',
  "What do we do when a child is throwing, biting, running or pushing and talking isn't helping?",
  "Are they refusing to participate, or is their body struggling with what we're asking of them?",
  'How do we support a child without every educator responding differently?',
  'How do we know when to step in, when to give space and when to change the environment?',
  "How do we explain what we're doing to families without sounding like we're making excuses for behaviour?",
];

const CURRENT_LADDERS = [
  {
    image: '/images/ladders/ladder2_rung05.png',
    tag: 'Regulated Educator',
    title: 'Start with the educator',
    text: 'Notice your own pace, body, voice and the pressure you may be bringing into the interaction, because co-regulation begins with what the adult nervous system is communicating too.',
  },
  {
    image: '/images/ladders/ladder1_rung08.png',
    tag: 'Connected Drop-Offs',
    title: 'Make drop-off feel smaller',
    text: 'Look beyond the tears or clinging and think about predictability, separation, connection and what might help the child feel safer as they move from home into the early childhood environment.',
  },
  {
    image: '/images/ladders/ladder3_rung06.png',
    tag: 'Participation Beyond Sitting',
    title: 'Rethink participation',
    text: 'Support children to join in ways their bodies can manage, rather than assuming that sitting still is the only sign that a child is listening, learning or belonging.',
  },
];

const CAPACITY_STEPS = [
  {
    title: 'Read',
    text: 'Start with one practical idea that relates to something your team is already noticing.',
  },
  {
    title: 'Try',
    text: 'Use it in a real situation and notice what changes in the child, the environment or the interaction.',
  },
  {
    title: 'Watch',
    text: 'Return to the recordings when your team has the time and headspace to take more in.',
  },
  {
    title: 'Go deeper',
    text: 'Teams wanting more support can continue into additional resources, implementation support, questions, live sessions and optional recognition.',
  },
];

export default function HomePageClient() {
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    serviceName: '',
    fundingSource:
      'Annual professional learning budget',
    programOption: 'preview' as
      | 'full'
      | 'preview',
  });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [
    quoteSubmitted,
    setQuoteSubmitted,
  ] = useState(false);

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
      const response = await fetch(
        '/api/quote',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify(
            quoteForm,
          ),
        },
      );

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
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#657B6C]/18 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-96 w-96 rounded-full bg-[#C29F60]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 md:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-base font-semibold text-[#F0D99A]">
              Early childhood regulation support for the moments that keep coming back
            </p>

            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-[1.14] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
              When the same behaviours keep happening, your team shouldn&apos;t have to keep guessing what to try next.
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#E0E8E4]">
              A child freezes at drop-off. Another can&apos;t stay with the group. Someone is throwing, biting, running or becoming overwhelmed when the room gets busy.
            </p>

            <p className="mt-4 max-w-3xl text-xl leading-relaxed text-[#E0E8E4]">
              Regulator Champions helps early childhood teams notice what may be happening underneath the behaviour, work out what might need to change, and decide what to try next.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              Created in Australia and available to early childhood teams internationally.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#regulation-ladders"
                className="flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] shadow-lg transition hover:bg-[#EDCD82]"
              >
                See how it works
              </a>

              <a
                href="#full-program"
                className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-white bg-white px-7 py-4 text-base font-extrabold text-[#12362F] shadow-sm transition hover:bg-[#F4F0E8]"
              >
                Explore the full program
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
              <Image
                src="/images/early-childhood-regulation-program.png"
                alt="Two early childhood educators looking through Regulator Champions Regulation Cards"
                width={1400}
                height={1000}
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FREE SAMPLE */}
      <section className="border-b border-[#CDAF70] bg-[#E8D39D]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-7 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#6E5426]">
              Free Regulation Ladder sample
            </p>

            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              Want to see what your educators would actually use?
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-[#374C45]">
              Open a free Regulation Ladder example and see how the same difficult moment can be looked at through educator, manager and family perspectives before your team decides what to try next.
            </p>
          </div>

          <Link
            href={FREE_SAMPLE_URL}
            className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
          >
            View the Free Regulation Ladder
          </Link>
        </div>
      </section>

      {/* PAIN POINTS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Does your team keep coming back to the same questions?
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              The hard part is rarely remembering another definition of regulation. It is deciding what to do when the same situations keep unfolding in front of you and different adults are seeing something different.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {PRESSURE_QUESTIONS.map(
              (question) => (
                <div
                  key={question}
                  className="border-t border-[#DDD5C9] py-5"
                >
                  <p className="text-lg font-semibold leading-relaxed text-[#29483F]">
                    {question}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* REGULATION LADDERS */}
      <section
        id="regulation-ladders"
        className="scroll-mt-24 bg-[#FAF5EC] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white p-3 shadow-sm">
              <Image
                src="/images/early-childhood-regulation-program.png"
                alt="Educators using Regulator Champions practical Regulation Cards"
                width={1400}
                height={1000}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                What does Regulator Champions actually look like?
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Each Regulation Ladder focuses on one everyday early childhood challenge.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                Every ladder includes 10 educator cards, 10 manager cards and 10 family cards, so the same situation can be looked at from different perspectives without expecting everyone to respond in exactly the same way.
              </p>

              <div className="mt-8 border-y border-[#D8CFC2]">
                <RoleRow
                  role="Educators"
                  text="What am I noticing? What could I try in the room?"
                />

                <RoleRow
                  role="Managers"
                  text="What could we change in the environment, routines or team support?"
                />

                <RoleRow
                  role="Families"
                  text="What might help us understand or support this outside the program or service?"
                />
              </div>

              <div className="mt-8">
                <p className="text-2xl font-extrabold">
                  One Regulation Ladder = 30 practical cards
                </p>

                <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                  10 for educators, 10 for managers and 10 for families, all looking at the same challenge through the role each person actually has.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                Designed to be picked up and used, not watched once and forgotten.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Keep the cards in the staff room, planning space or classroom. Pick up the one that relates to what is happening. Try something. Notice what changes. Talk about it with your team.
              </p>

              <div className="mt-8 border-l-4 border-[#E0BC68] pl-6">
                <p className="text-xl font-extrabold">
                  Not ready for the full program?
                </p>

                <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                  You can purchase one Regulation Ladder or the three-ladder collection without joining Regulator Champions.
                </p>

                <a
                  href={REGULATION_CARDS_URL}
                  className="mt-6 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F]"
                >
                  Start with the Regulation Cards
                </a>
              </div>
            </div>

            <div className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-[#FAF5EC] p-3 shadow-sm">
              <Image
                src="/images/regulation-training-for-educators.png"
                alt="Regulator Champions Regulation Cards being used in an outdoor early childhood setting"
                width={1400}
                height={1000}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 54vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section className="bg-[#F1ECE4] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
            We&apos;ve already done regulation training.
          </h2>

          <p className="mt-6 text-xl leading-relaxed text-[#29483F]">
            Most teams have.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            The difficult part isn&apos;t knowing that children need co-regulation.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            The difficult part is knowing what that actually looks like when one child is screaming, another educator needs your help, a parent is waiting at the door, and the strategy that worked yesterday isn&apos;t working today.
          </p>

          <p className="mt-6 text-xl font-extrabold leading-relaxed">
            Regulator Champions is designed for the gap between knowing the theory and making a decision in the room.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                Before we ask how to stop the behaviour, we look at what the child&apos;s body may be telling us.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                This does not mean ignoring unsafe behaviour or removing boundaries. It means looking closely enough at the child, the environment and the adult response to understand what may be increasing the pressure before we decide what to do next.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              <BodyExample
                title="Running during group time"
                text="Is the child simply refusing to participate, or does their body need movement before they can stay with the group?"
              />

              <BodyExample
                title="Throwing repeatedly"
                text="Are we only seeing defiance, or could high arousal, sensory seeking, play schema or the need for a different outlet be contributing?"
              />

              <BodyExample
                title="Pulling away from comforting touch"
                text="Once contact begins, does the child soften and settle, or stiffen, pull away or turn their face?"
              />

              <BodyExample
                title="Messy outdoor play"
                text="Are we looking at chaos, or a deeply engaged child whose body may be getting the movement and sensory input it needs?"
              />
            </div>
          </div>
        </div>
      </section>

      {/* VAGUS */}
      <section className="border-y border-[#D8CFC2] bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Free training and practical ideas
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Want to understand more about what may be happening in the body?
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                I have made my full vagus nerve and parasympathetic nervous system training available free on the blog because I would rather educators understand the thinking underneath these activities than simply collect another list of things to try.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                The video is completely free to watch. If you want the practical ideas beside you afterwards, the activities are also available as printable cards.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={VAGUS_ARTICLE_URL}
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F]"
                >
                  Watch the Free Training
                </Link>

                <a
                  href={VAGUS_CARDS_PAYMENT_URL}
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-6 py-3 text-base font-extrabold text-[#1C3B34]"
                >
                  Get the Cards for $14 AUD
                </a>
              </div>
            </div>

            <div className="rounded-4xl border border-[#D8CFC2] bg-white p-7 shadow-sm sm:p-9">
              <p className="text-xl font-extrabold leading-relaxed">
                I do not want regulation to become another instruction that children are expected to perform correctly.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Buzzing like a bee, blowing bubbles, hissing like a snake, squeezing a teddy or moving like an animal can give us opportunities to explore breathing, sound, movement and body awareness while the child is still playing and connected.
              </p>

              <Link
                href={VAGUS_ARTICLE_URL}
                className="mt-6 inline-flex text-base font-extrabold text-[#8A6F3E]"
              >
                Read the full article and watch the video
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RECORDINGS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
            <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-xl">
              <Image
                src="/images/robyn-papworth-regulation-webinar.png"
                alt="Robyn Papworth delivering an online early childhood regulation session"
                width={1400}
                height={1000}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                Learn when your team actually has the capacity.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
                Professional learning should not feel like another thing your educators have to squeeze into an already exhausting week.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                Regulator Champions includes learning and recordings your team can return to when they have the time and headspace. Teams wanting more support can also use questions and live sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section className="border-b border-[#E5DED4] bg-[#EDE6DC]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-9 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#8A6F3E]">
              Free articles for early childhood teams
            </p>

            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              There is much more here than one training video.
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
              Explore longer articles about regulation, body awareness, movement, attention, participation, play and the everyday moments that can tell us much more about a child than behaviour alone.
            </p>
          </div>

          <Link
            href={BLOG_URL}
            className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-white px-7 py-4 text-base font-extrabold shadow-sm transition hover:bg-[#1C3B34] hover:text-white"
          >
            Explore the Blog
          </Link>
        </div>
      </section>

      {/* LADDERS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Three Regulation Ladders are available now.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Your team does not need to complete them in a fixed order. Start with the situation creating the most pressure and use the closest ladder as a place to begin.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            {CURRENT_LADDERS.map(
              (ladder) => (
                <article
                  key={ladder.tag}
                  className="border-t border-[#D8CFC2] pt-5"
                >
                  <Image
                    src={ladder.image}
                    alt=""
                    width={700}
                    height={820}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="aspect-4/5 w-full rounded-3xl object-cover"
                  />

                  <p className="mt-5 text-base font-extrabold text-[#9A793D]">
                    {ladder.tag}
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold leading-tight">
                    {ladder.title}
                  </h3>

                  <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                    {ladder.text}
                  </p>
                </article>
              ),
            )}
          </div>

          <div className="mt-12 border-y border-[#D8CFC2] py-7">
            <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <h3 className="text-2xl font-extrabold">
                  Not sure what this looks like in practice?
                </h3>

                <p className="mt-2 max-w-3xl text-lg leading-relaxed text-[#53645D]">
                  Start with the free example and see how one Regulation Ladder is structured before deciding whether the cards or broader program are right for your team.
                </p>
              </div>

              <Link
                href={FREE_SAMPLE_URL}
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] px-6 py-3 text-base font-extrabold transition hover:bg-[#1C3B34] hover:text-white"
              >
                Open the free example
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTOR ROI / SHARED PRACTICE */}
      <section className="bg-[#F1ECE4] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
            <div className="overflow-hidden rounded-4xl border border-[#DDD5C9] bg-white p-3 shadow-sm">
              <Image
                src="/images/regulator-champions-team-planning.png"
                alt="Early childhood educational leader and educators discussing Regulation Ladder cards together"
                width={1400}
                height={1000}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                For directors, owners and educational leaders
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                What are repeated regulation difficulties asking from your team?
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#53645D]">
                <p>
                  One difficult drop-off is part of early childhood, and so is the educator who needs support when group time keeps falling apart, the child who becomes overwhelmed when the room gets noisy, or the family who is unsure why their child is coping differently at home and care. None of those moments automatically mean something is wrong with the child, the educator or the service.
                </p>

                <p>
                  The pressure begins to build when the same situations keep returning and the adults around the child are still having to work out, from scratch, what might be happening and what to try next. A director may find themselves returning to the same conversations with different educators, while an educational leader searches for another strategy, families hear slightly different explanations depending on who they speak with, and educators who understand the theory of co-regulation still feel unsure about what that theory actually means in the middle of a busy room.
                </p>

                <p className="text-xl font-extrabold leading-relaxed text-[#1C3B34]">
                  That is the gap I want Regulator Champions to sit in.
                </p>

                <p>
                  The aim is not to remove difficult behaviour from early childhood, because children will still become frustrated, overwhelmed, tired, excited and dysregulated. Instead, I want the adults around them to have a more useful way to slow the situation down, notice what may be contributing, consider what could change in the environment or interaction, and decide together what is worth trying next.
                </p>
              </div>

              <div className="mt-7 border-l-4 border-[#C29F60] bg-white px-6 py-5">
                <p className="text-lg font-extrabold leading-relaxed text-[#1C3B34]">
                  Rather than every difficult moment beginning with “How do we stop this?”, the conversation can gradually become “What are we noticing here? What was happening before this? What is the child&apos;s body telling us? Is the demand too high? Is the environment adding pressure? Is there something we could change before expecting the child to change?”
                </p>
              </div>

              <div className="mt-7 space-y-5 text-lg leading-relaxed text-[#53645D]">
                <p>
                  The 6-Month Preview is $1,790 AUD because it is designed as a whole-team implementation period, not simply another resource for one educator to download. It gives your team time to use the Regulation Ladders, return to recordings when they have capacity, bring questions back, and begin building a more shared way of thinking about the regulation difficulties that keep appearing across the week.
                </p>

                <p>
                  You do not need to believe that one program will solve every behaviour challenge to decide whether that would be useful. The more practical question is whether having a more consistent way for your team to notice, discuss and respond to recurring situations would make a meaningful difference in your service.
                </p>
              </div>

              <Link
                href="/proposal?plan=preview"
                className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F]"
              >
                Explore the 6-Month Preview
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FULL PROGRAM */}
      <section
        id="full-program"
        className="scroll-mt-24 bg-[#FAF5EC] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Use Regulator Champions in the way your team has capacity for.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Some teams will begin with the cards and stay there for a while. Others will want recordings, questions and live support as well. The full program is there when your organisation wants deeper support.
            </p>
          </div>

          <div className="mt-10 border-y border-[#D8CFC2] md:grid md:grid-cols-4">
            {CAPACITY_STEPS.map(
              (step, index) => (
                <div
                  key={step.title}
                  className={`py-6 md:px-6 ${
                    index > 0
                      ? 'border-t border-[#D8CFC2] md:border-l md:border-t-0'
                      : ''
                  }`}
                >
                  <h3 className="text-xl font-extrabold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                    {step.text}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 className="text-2xl font-extrabold">
                Want formal recognition as well?
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                Educators who choose to complete the full pathway can submit their reflections and practical work for review by Robyn.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                This is optional. Your team can still use the Regulation Ladders, resources and recordings without completing the recognition pathway.
              </p>
            </div>

            <div className="lg:border-l lg:border-[#D8CFC2] lg:pl-8">
              <h3 className="text-2xl font-extrabold">
                For leaders who are carrying too much of this already
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                Child care owners, directors and educational leaders are already holding staffing, families, inclusion, incidents, documentation, budgets and everything else that lands across the week. Regulator Champions is intended to build more of the noticing and problem-solving across the team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM OPTIONS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              If your team wants the broader Regulator Champions support
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              These whole-team options include the Regulation Ladders alongside recordings, questions and implementation support. Prices below are in Australian dollars.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <ProgramOption
              title="6-Month Preview"
              price={PREVIEW_PRICE}
              period={`${PREVIEW_ACCESS_MONTHS} months`}
              text="A smaller whole-team introduction for organisations wanting to use the current Regulation Ladders alongside recordings, questions and support before deciding what they need longer term."
              href="/proposal?plan=preview"
              button="View 6-Month Preview"
            />

            <ProgramOption
              title="12-Month Regulator Champions"
              price={FULL_PRICE}
              period="12 months"
              text="Year-round whole-team access for organisations wanting the Regulation Ladders, recordings, Ask Robyn support, live sessions and new member resources as the program develops."
              href="/proposal?plan=full"
              button="View 12-Month Program"
            />
          </div>
        </div>
      </section>

      {/* LOCATION PATHWAYS */}
      <section className="border-y border-[#E5DED4] bg-[#F7F3ED] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Quality and funding information
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                Looking at how Regulator Champions fits your local early childhood system?
              </h2>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                The core program can be used internationally. These pages explain some of the quality, professional development and funding language that may be relevant where your team is based.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              <LocationLink
                href="/us-early-childhood-quality"
                title="United States"
                text="NAEYC, Developmentally Appropriate Practice, QRIS and child care quality improvement."
              />

              <LocationLink
                href="/nqs-mapping"
                title="NQS and QIP"
                text="National Quality Standard and Quality Improvement Plan reflection for Australian early childhood services."
              />

              <LocationLink
                href="/school-readiness-funding"
                title="School Readiness Funding"
                text="Information for Victorian kindergarten services."
              />

              <LocationLink
                href="/kindy-uplift"
                title="Kindy Uplift"
                text="Information for Queensland kindergarten services."
              />
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-extrabold leading-tight sm:text-4xl">
              Tell me what&apos;s happening in your rooms.
            </h2>

            <p className="mt-5 text-xl leading-relaxed text-[#D8E1DC]">
              If you&apos;re not sure whether Regulator Champions is right for your organisation, you don&apos;t need to know which option you want yet.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
              Tell me what your team keeps getting stuck on and we can work out where I would start.
            </p>

            <a
              href="mailto:robyn@playmoveimprove.com.au?subject=Regulator%20Champions%20team%20enquiry"
              className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28]"
            >
              Talk to Robyn about our team
            </a>
          </div>

          <div className="mt-12 border-t border-white/20 pt-8">
            <p className="text-lg font-extrabold">
              Already ready for the full program?
            </p>

            <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#D8E1DC]">
              The formal proposal is available below for organisations that already know they want to take the broader program to leadership.
            </p>

            {quoteSubmitted ? (
              <div className="mt-6 max-w-2xl rounded-3xl border border-white/15 bg-white/5 p-7">
                <h3 className="text-xl font-extrabold">
                  Proposal request received
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#D8E1DC]">
                  You can also open the printable proposal information now.
                </p>

                <Link
                  href={`/proposal?plan=${quoteForm.programOption}`}
                  className="mt-5 inline-flex min-h-12 items-center rounded-2xl bg-white px-5 py-3 text-base font-extrabold text-[#12362F]"
                >
                  Open proposal
                </Link>
              </div>
            ) : (
              <form
                onSubmit={handleQuoteSubmit}
                className="mt-6 max-w-3xl space-y-4 rounded-3xl border border-white/15 bg-white/5 p-6"
              >
                <div className="grid gap-3 sm:grid-cols-2">
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
                        programOption:
                          'preview',
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
                        programOption:
                          'full',
                      })
                    }
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    aria-label="Director or contact name"
                    placeholder="Director / contact name"
                    value={quoteForm.fullName}
                    onChange={(event) =>
                      setQuoteForm({
                        ...quoteForm,
                        fullName:
                          event.target.value,
                      })
                    }
                    className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#CBD8D3] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
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
                        email:
                          event.target.value,
                      })
                    }
                    className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#CBD8D3] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    aria-label="Service or centre name"
                    placeholder="Centre / program / service name"
                    value={quoteForm.serviceName}
                    onChange={(event) =>
                      setQuoteForm({
                        ...quoteForm,
                        serviceName:
                          event.target.value,
                      })
                    }
                    className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#CBD8D3] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
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
                    className="min-h-14 rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
                  >
                    <option value="Annual professional learning budget">
                      Professional learning budget
                    </option>

                    <option value="US childcare professional development budget">
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

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-14 rounded-2xl bg-white px-6 py-3 text-base font-extrabold text-[#12362F] transition hover:bg-[#F4F0E8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? 'Sending request…'
                    : `Request $${selectedPrice.toLocaleString()} AUD proposal`}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function RoleRow({
  role,
  text,
}: {
  role: string;
  text: string;
}) {
  return (
    <div className="grid gap-2 border-t border-[#D8CFC2] py-5 first:border-t-0 sm:grid-cols-[120px_1fr]">
      <p className="font-extrabold">
        {role}
      </p>

      <p className="leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function BodyExample({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-[#D8CFC2] py-5">
      <h3 className="text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function LocationLink({
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
      className="block border-b border-[#D8CFC2] py-5"
    >
      <p className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </p>

      <p className="mt-2 text-base leading-7 text-[#53645D]">
        {text}
      </p>
    </Link>
  );
}

function ProgramOption({
  title,
  price,
  period,
  text,
  href,
  button,
}: {
  title: string;
  price: number;
  period: string;
  text: string;
  href: string;
  button: string;
}) {
  return (
    <article className="border-t border-[#D8CFC2] pt-6">
      <h3 className="text-2xl font-extrabold">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-extrabold">
        ${price.toLocaleString()} AUD
      </p>

      <p className="mt-1 text-base text-[#6B7772]">
        {period}
      </p>

      <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
        {text}
      </p>

      <Link
        href={href}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-base font-extrabold transition hover:bg-[#1C3B34] hover:text-white"
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
      className={`min-h-22 rounded-2xl border p-4 text-left transition ${
        active
          ? 'border-[#E0BC68] bg-white text-[#12362F]'
          : 'border-white/30 bg-[#102E28] text-white'
      }`}
    >
      <span
        className={`block text-base font-extrabold ${
          active
            ? 'text-[#12362F]'
            : 'text-white'
        }`}
      >
        {title}
      </span>

      <span
        className={`mt-1 block text-sm ${
          active
            ? 'text-[#42544D]'
            : 'text-[#D8E1DC]'
        }`}
      >
        ${price.toLocaleString()} AUD
      </span>
    </button>
  );
}