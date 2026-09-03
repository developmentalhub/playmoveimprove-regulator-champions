'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const FULL_PRICE = 4790;
const PREVIEW_PRICE = 1790;
const PREVIEW_ACCESS_MONTHS = 6;

const PRESSURE_QUESTIONS = [
  'Why does this child seem settled one minute and completely overwhelmed the next?',
  'What do we do when a child is throwing, biting, running or pushing and talking is not helping?',
  'Are they refusing to participate, or is their body struggling with what we are asking of them?',
  'How do we support a child without every educator responding in a completely different way?',
  'How do we know when to step in, when to give space and when to change the environment?',
  'How do we explain what we are noticing to families without making it sound like we are excusing difficult behaviour?',
];

const CURRENT_LADDERS = [
  {
    number: '01',
    image: '/images/ladders/ladder2_rung05.png',
    tag: 'Regulated Educator',
    title: 'Start with the educator',
    text: 'This ladder helps educators notice their own pace, body, voice and level of pressure, because co-regulation is not only about what we ask the child to do. It also asks us to pay attention to what the adult nervous system may be communicating in the interaction.',
  },
  {
    number: '02',
    image: '/images/ladders/ladder1_rung08.png',
    tag: 'Connected Drop-Offs',
    title: 'Make separation and arrival feel smaller',
    text: 'This ladder helps teams look beyond the tears, clinging or refusal at the door and think about predictability, connection, separation and what the child may need from the adults around them as they move from home into the early childhood environment.',
  },
  {
    number: '03',
    image: '/images/ladders/ladder3_rung06.png',
    tag: 'Participation Beyond Sitting',
    title: 'Rethink what participation looks like',
    text: 'This ladder supports educators to notice when a child is engaged in a way that does not look traditionally still or quiet, so sitting perfectly is not treated as the only sign that a child is listening, learning, participating or belonging.',
  },
];

const MONTHLY_RHYTHM = [
  {
    title: 'Notice',
    text: 'Your team identifies a regulation challenge that keeps coming up and begins by looking more closely at what is happening around it.',
  },
  {
    title: 'Use',
    text: 'Educators, managers and families use the relevant prompts to trial small changes and build a shared way of thinking about the situation.',
  },
  {
    title: 'Talk',
    text: 'Questions, observations and situations can be brought into the monthly live coaching session with Robyn, even if the educator cannot attend live.',
  },
  {
    title: 'Adjust',
    text: 'Your team decides what is helping, what needs to change and what they want to keep noticing as they move forward.',
  },
];

const INCLUDED = [
  'Three complete Regulation Ladders to begin',
  '10 educator cards within each ladder',
  '10 manager cards within each ladder',
  '10 family cards within each ladder',
  'Practical prompts for what to notice and try',
  'Leadership and environment reflection prompts',
  'Family ideas connected to the same challenge',
  'Monthly live online coaching with Robyn',
  'Private de-identified question submission',
  'Recordings for educators who cannot attend live',
  'Member Hub access and implementation resources',
  'New ladder content added as the program develops',
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
      <section className="relative overflow-hidden bg-[#1C3B34] text-white">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#657B6C]/20 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-96 w-96 rounded-full bg-[#C29F60]/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-12 md:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-18">
          <div>
            <div className="inline-flex rounded-full border border-[#E4C98E]/40 bg-[#E4C98E]/10 px-4 py-2 text-sm font-extrabold text-[#F5E6BE]">
              Practical regulation support for early childhood teams
            </div>

            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.14] tracking-tight text-white sm:text-4xl lg:text-[2.9rem]">
              When the same behaviours keep happening, your team should not have to keep guessing what to try next.
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#E0E8E4]">
              A child freezes at drop-off, another cannot stay with the group, someone is throwing, biting, running or becoming overwhelmed every time the room gets busy, and your educators are already trying to help. Regulator Champions gives your whole team a practical way to notice what the child&apos;s body may be telling them, think about what could be contributing, and choose what to try next without expecting one strategy to work for every child.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#how-it-works"
                className="flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] shadow-lg transition hover:bg-[#EDCD82]"
              >
                See how it works
              </a>

              <Link
                href="/proposal?plan=preview"
                className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-white bg-white px-7 py-4 text-base font-extrabold text-[#12362F] shadow-sm transition hover:bg-[#F4F0E8] hover:text-[#12362F]"
              >
                Talk to Robyn about our team
              </Link>
            </div>

            <p className="mt-5 text-base font-semibold leading-relaxed text-[#C8D6D0]">
              Practical professional learning for educators, managers and families, with ongoing support when the situation is more complicated than a single strategy.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
              <Image
                src="/images/early-childhood-regulation-program.png"
                alt="Regulator Champions early childhood regulation card system being used by educators"
                width={1400}
                height={1000}
                priority
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>

            <div className="relative -mt-7 mx-5 rounded-3xl border border-[#E5DED4] bg-white p-5 text-[#1C3B34] shadow-xl">
              <p className="text-lg font-extrabold leading-snug">
                Something your team can actually use
              </p>

              <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                The cards help educators, managers and families look at the same challenge from different perspectives, so the response becomes more consistent across the whole service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              The questions teams keep coming back to
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              The questions that wear teams down are usually not questions about theory. They are the questions that keep returning in the middle of real rooms with real children.
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PRESSURE_QUESTIONS.map((question) => (
              <article
                key={question}
                className="rounded-3xl border border-[#E5DED4] bg-[#FAF8F5] p-6 shadow-sm"
              >
                <p className="text-lg font-extrabold leading-relaxed text-[#1C3B34]">
                  {question}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#FAF5EC] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white p-3 shadow-lg">
              <Image
                src="/images/regulation-training-for-educators.png"
                alt="Regulator Champions regulation cards displayed in an outdoor early childhood environment"
                width={1400}
                height={1000}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 48vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                The Regulation Ladder card system
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Each Regulation Ladder takes one everyday early childhood challenge and helps educators, managers and families work toward the same goal from the role they actually have.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Educators receive practical prompts for what to notice and try in the room, managers receive prompts that help them think about the environment, resources, expectations and leadership decisions around the same issue, and families receive related ideas that can make sense at home without turning the program into homework or another parenting course.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                This is what makes the ladder system useful across a whole service. The child is not getting one message from one educator, something completely different from another educator, and a third explanation at home. The team begins to build a shared language around what they are noticing and what they want to try.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <StatCard number="10" label="educator cards" />
                <StatCard number="10" label="manager cards" />
                <StatCard number="10" label="family cards" />
              </div>

              <p className="mt-5 text-base font-bold leading-relaxed text-[#1C3B34]">
                That is 30 practical prompts around one shared regulation challenge.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              How the cards are used in practice
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              They are not cards to read once and file away. They are prompts that help adults notice more before they react, and then make a more thoughtful decision about what to try next.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <FeatureCard
              label="For educators"
              title="Stop and notice before reacting"
              text="An educator can look at what happened just before the behaviour, what the child’s body is doing now, what may be increasing the pressure and whether the response they just tried is helping the child settle or pushing them further into escalation."
            />

            <FeatureCard
              label="For managers"
              title="Look beyond the individual child"
              text="Leaders are prompted to think about what the environment, expectations, staffing patterns, resources or team habits may be contributing, so the conversation does not automatically become about fixing the child."
            />

            <FeatureCard
              label="For families"
              title="Carry the thinking beyond the gate"
              text="Families receive simple related ideas that help them understand what their child may be communicating and continue some of the same thinking at home, without being handed a complicated behaviour program."
            />
          </div>
        </div>
      </section>

      <section className="bg-[#1C3B34] py-14 text-white sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
              <Image
                src="/images/robyn-papworth-regulation-webinar.png"
                alt="Robyn Papworth delivering a live Regulator Champions online regulation coaching session"
                width={1400}
                height={1000}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
                Monthly live coaching with Robyn
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Your team does not have to work all of this out alone once the cards are in their hands.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
                Each month we come together online to unpack the situations educators are actually dealing with, rather than spending another hour talking about regulation in broad terms. Teams can bring the questions that keep coming up in their rooms, talk through what they have noticed, consider what may be driving the behaviour and decide what they could change, trial or observe next.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
                Educators can submit de-identified questions before the session, which means they can still bring a situation into the conversation even when staffing makes live attendance impossible. The session is recorded and added to the Member Hub so teams can return to it during planning time, a staff meeting or another professional learning opportunity.
              </p>

              <div className="mt-7 rounded-3xl border border-[#E0BC68]/40 bg-[#E0BC68]/10 p-6">
                <p className="text-xl font-extrabold leading-relaxed text-white">
                  The goal is not to give your team another hour of theory. It is to help your educators make better decisions when they walk back into the room on Monday morning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-4xl border border-[#E5DED4] bg-white p-8 shadow-sm sm:p-10">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              “We have already done regulation training.”
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Most teams have learned that behaviour is communication and that children need co-regulation. The difficult part is knowing what that actually looks like when the room is busy and the strategy that worked yesterday is not working today.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[#53645D]">
              Regulator Champions is designed for the gap between understanding the theory and making a decision in practice. When one child is screaming, another educator needs help, a parent is waiting at the door and the rest of the group still needs you, educators need a way to think clearly enough to notice what may be happening and decide what they can realistically change in that moment.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
                What is the child&apos;s body telling us?
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Before we ask, “How do we stop this behaviour?”, Regulator Champions encourages teams to look more closely at what the child&apos;s body may be communicating.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                That does not mean ignoring unsafe behaviour or removing boundaries. It means becoming more curious about what is happening underneath the behaviour so the response is more likely to help the child regulate, participate and reconnect.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <BodyClue
                title="Running during group time"
                text="Is the child simply refusing to participate, or is their body telling us they need movement before they can stay with the group?"
              />

              <BodyClue
                title="Throwing repeatedly"
                text="Are we looking only at defiance, or could high arousal, sensory seeking, play schema or the need for a different outlet be contributing?"
              />

              <BodyClue
                title="Pulling away from touch"
                text="What happens in the child’s body once contact begins? Do they soften and settle, or stiffen, pull away and turn their face?"
              />

              <BodyClue
                title="Messy outdoor play"
                text="Are we looking at chaos, or could we be seeing a deeply engaged child whose body is getting the movement and sensory input it needs?"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF5EC] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              How the program works across the month
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Regulator Champions is designed to become part of the way your team thinks together, rather than something educators complete once and then move on from.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {MONTHLY_RHYTHM.map((step, index) => (
              <article
                key={step.title}
                className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0BC68] text-sm font-extrabold text-[#102E28]">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="mt-5 text-2xl font-extrabold text-[#1C3B34]">
                  {step.title}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              Available now
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Your service begins with three Regulation Ladders built around pressure points that already show up across an ordinary early childhood day.
            </h2>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#53645D]">
              These ladders are not meant to be completed in a rigid order. Your team can begin with the challenge creating the most pressure, use the related cards in practice and then bring the questions that remain into the ongoing coaching.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {CURRENT_LADDERS.map((ladder) => (
              <article
                key={ladder.number}
                className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] shadow-sm"
              >
                <div className="relative">
                  <Image
                    src={ladder.image}
                    alt=""
                    width={700}
                    height={820}
                    loading="lazy"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="aspect-4/5 w-full object-cover"
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

      <section className="bg-[#1C3B34] py-14 text-white sm:py-18">
        <div className="mx-auto max-w-6xl px-6">
          <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
            For directors and educational leaders
          </span>

          <h2 className="mt-4 max-w-5xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
            If you are tired of being the person everyone comes to when nothing seems to work, the program is also designed to build more of that thinking across the team.
          </h2>

          <p className="mt-6 max-w-5xl text-lg leading-relaxed text-[#D8E1DC]">
            Directors are already holding staffing, families, inclusion, incidents, documentation, budgets and the thousand other things that land on their desk. Regulator Champions helps educators become better at noticing, discussing and adjusting practice together, so every difficult child situation does not automatically become another problem that the director has to personally solve.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div className="rounded-4xl border border-[#E5DED4] bg-[#FAF5EC] p-8">
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                Because regulation does not stop at the front gate
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                When it is appropriate, families can receive simple related ideas that help them understand what their child may be communicating and continue some of the same thinking at home.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                This is not homework for families and it is not another parenting program. The family cards are designed to make the conversation more practical by connecting the regulation challenge to ordinary moments such as pick-up, the car ride home, arriving through the front door or everyday play, so the family can understand why the child may be struggling and what they could notice or try next.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                For services, this also creates a much stronger bridge between professional learning and family communication because educators have language they can use to explain what they are observing without reducing the child to a behaviour label.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF5EC] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
                What your service receives
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                A practical card system, a shared way of thinking and ongoing access to support when the situation is still not clear.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                The value is not in having the biggest resource library. It is in giving your team a clear place to start, a way to talk about what they are noticing and somewhere to return when the first response does not quite fit.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {INCLUDED.map((item) => (
                <div
                  key={item}
                  className="rounded-3xl border border-[#E5DED4] bg-white p-5"
                >
                  <p className="text-base font-semibold leading-relaxed text-[#42544D]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-8 sm:p-10">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              Why Robyn created Regulator Champions
            </span>

            <h2 className="mt-4 max-w-5xl text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              I have spent years watching caring educators get stuck in the same place. They know the child is not deliberately trying to make the day difficult, but in the middle of a busy room they are still left thinking, “What do I actually do now?”
            </h2>

            <p className="mt-6 max-w-5xl text-lg leading-relaxed text-[#53645D]">
              That is the gap I want Regulator Champions to fill. I do not want teams collecting more information that sounds good during professional development and disappears by the following week. I want educators to become more confident at reading what is happening in front of them, talking about it together and deciding what they can realistically try next.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#FAF8F5] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
                Funding information
              </span>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
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

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
              Program options
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Your service can begin with a six-month introduction or choose year-round access to the Regulator Champions support system.
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            <PricingCard
              eyebrow="6-Month Preview"
              price={PREVIEW_PRICE}
              period={`${PREVIEW_ACCESS_MONTHS} months`}
              title="Begin with the three current Regulation Ladders"
              text="A whole-service introduction to the card system, Ask Robyn, monthly coaching and recordings, giving your team time to use the support in practice and see how it fits into the way you already work."
              href="/proposal?plan=preview"
              button="View 6-Month Preview"
            />

            <PricingCard
              eyebrow="12-Month Regulator Champions"
              price={FULL_PRICE}
              period="12 months"
              title="Give your team somewhere to keep coming back to"
              text="Year-round whole-service access to the Regulation Ladders, monthly coaching, Ask Robyn support, recordings and new member resources added as the program develops."
              href="/proposal?plan=full"
              button="View 12-Month Program"
              featured
            />
          </div>
        </div>
      </section>

      <section className="bg-[#1C3B34] py-14 text-white sm:py-18">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-9 max-w-3xl text-center">
            <span className="text-sm font-extrabold uppercase tracking-widest text-[#F0D99A]">
              Talk to Robyn about your team
            </span>

            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              If you are not sure which option is right yet, you do not need to have that worked out before you get in touch.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
              Start by telling me who you are and which service you are from. You can look through the proposal information from there and decide whether Regulator Champions feels like the right fit for the regulation challenges your team is trying to work through.
            </p>
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

function StatCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="rounded-3xl border border-[#E5DED4] bg-white p-5 text-center">
      <p className="text-3xl font-extrabold text-[#1C3B34]">
        {number}
      </p>

      <p className="mt-1 text-sm font-bold text-[#53645D]">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7 shadow-sm">
      <span className="text-sm font-extrabold uppercase tracking-widest text-[#9A793D]">
        {label}
      </span>

      <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
        {text}
      </p>
    </article>
  );
}

function BodyClue({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E5DED4] bg-[#FAF8F5] p-6">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#53645D]">
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
        View information
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
          featured ? 'text-[#F0D99A]' : 'text-[#9A793D]'
        }`}
      >
        {eyebrow}
      </span>

      <p className="mt-4 text-5xl font-extrabold">
        ${price.toLocaleString()}
      </p>

      <p
        className={`mt-2 text-base ${
          featured ? 'text-[#D8E1DC]' : 'text-[#53645D]'
        }`}
      >
        incl. GST · {period}
      </p>

      <h3 className="mt-6 text-2xl font-extrabold">
        {title}
      </h3>

      <p
        className={`mt-4 text-lg leading-relaxed ${
          featured ? 'text-[#D8E1DC]' : 'text-[#53645D]'
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
