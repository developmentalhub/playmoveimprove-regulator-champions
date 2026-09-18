'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const EARLY_BIRD_PRICE = 4790;
const STANDARD_PRICE = 5290;
const PREMIUM_PRICE = 5990;

const FREE_SAMPLE_URL = '/playbooks';
const BLOG_URL = '/blog';

type ProgramOption =
  | 'early-bird'
  | 'premium';

type QuoteForm = {
  programOption: ProgramOption;
  serviceName: string;
  managerName: string;
  managerEmail: string;
  phone: string;
  postalAddress: string;
  serviceType: string;
  educatorCount: string;
  fundingSource: string;
  fundingOther: string;
  billingName: string;
  billingEmail: string;
  notes: string;
};

const ROADMAP = [
  {
    number: 1,
    title:
      'Morning routines, separation and drop-off',
    description:
      'Supporting children and families through separation, connection, predictability and the nervous-system demands that can make the start of the day feel so big.',
  },
  {
    number: 2,
    title:
      'Mat time, participation and static sitting',
    description:
      'Looking beyond “sit still and listen” to postural control, core strength, sensory processing, executive function and different ways children can participate.',
  },
  {
    number: 3,
    title:
      'Transitions and bottlenecks',
    description:
      'Why doorways, pack-up, room changes and multi-step routines can overwhelm children, and how rhythm, movement, visual support and co-regulation can reduce the load.',
  },
  {
    number: 4,
    title:
      'Heavy work, sensory seeking and rough play',
    description:
      'Understanding proprioception, vestibular processing, risky play, movement needs and why some children seek pushing, crashing, climbing and big-body play.',
  },
  {
    number: 5,
    title:
      'Following instructions when capacity is low',
    description:
      'What happens when language, working memory, inhibition and regulation demands collide, and how educators can reduce friction without removing fair boundaries.',
  },
  {
    number: 6,
    title:
      'Play schemas and the changing way children play',
    description:
      'Exploring common play schemas, movement, imagination, social play and how screen-heavy experiences may influence the way children engage with people, objects and environments.',
  },
  {
    number: 7,
    title:
      'Impulse control and co-regulation',
    description:
      'Connecting executive function, interoception, the 8 senses, emotional regulation and the role adults play while children are still developing their own self-regulation.',
  },
  {
    number: 8,
    title:
      'When children are running out of capacity',
    description:
      'Recognising cumulative fatigue, sensory load and end-of-winter strain before behaviour becomes the only thing adults can see.',
  },
  {
    number: 9,
    title:
      'Designing environments for movement, connection and play',
    description:
      'Using biophilic principles, movement opportunities, spatial awareness, sensory diversity and inclusive environmental design to support different nervous-system needs.',
  },
  {
    number: 10,
    title:
      'Noise, clutter and sensory load',
    description:
      'Looking at visual, auditory, vestibular and environmental demands and how small changes can make participation easier for neurodivergent and divergent learners.',
  },
  {
    number: 11,
    title:
      'Building consistency across the team',
    description:
      'Bringing together neuroplasticity, reflective practice, family voice, QIP evidence and shared educator decision-making so learning becomes part of everyday practice.',
  },
  {
    number: 12,
    title:
      'Review, resilience and what comes next',
    description:
      'Looking back at what changed, what families noticed, what educators discovered, and how growth mindset, resilience and ongoing reflection can shape the year ahead.',
  },
];

const PROGRAM_INCLUDES = [
  'Up to 15 educators from one service',
  '12 practical professional learning topics',
  'Live online coaching with Robyn, with recordings added for self-paced access',
  '1.5 CPD hours available for each completed topic',
  '18 CPD hours available across the full program',
  'Individual certificates for completed topics',
  'Practical Regulation Ladder resources',
  'Educator reflections and professional learning documentation',
  'Manager dashboard and team CPD records',
  'Family Voice feedback tools and monthly QR codes',
  'QIP reflection, evidence and downloadable reporting',
  'Access until 31 December 2027',
];

export default function HomePageClient() {
  const [quoteForm, setQuoteForm] =
    useState<QuoteForm>({
      programOption: 'early-bird',
      serviceName: '',
      managerName: '',
      managerEmail: '',
      phone: '',
      postalAddress: '',
      serviceType: '',
      educatorCount: '',
      fundingSource: '',
      fundingOther: '',
      billingName: '',
      billingEmail: '',
      notes: '',
    });

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [
    quoteSubmitted,
    setQuoteSubmitted,
  ] = useState(false);

  const [submitError, setSubmitError] =
    useState('');

  const selectedPrice =
    quoteForm.programOption === 'premium'
      ? PREMIUM_PRICE
      : EARLY_BIRD_PRICE;

  const updateField = <
    K extends keyof QuoteForm,
  >(
    key: K,
    value: QuoteForm[K],
  ) => {
    setQuoteForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleQuoteSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSubmitError('');

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

      const result = await response
        .json()
        .catch(() => null);

      if (
        !response.ok ||
        !result?.success
      ) {
        console.error(
          'Invoice request failed:',
          result,
        );

        setSubmitError(
          result?.error ||
            'Something went wrong while sending your request. Please try again.',
        );

        return;
      }

      setQuoteSubmitted(true);

      window.location.assign(
        '/invoice-request-received',
      );
    } catch (error) {
      console.error(
        'Invoice request error:',
        error,
      );

      setSubmitError(
        'Something went wrong while sending your request. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#1C3B34]">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-[#E5DED4] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-6">
          <Link
            href="/"
            className="min-w-0"
          >
            <p className="text-lg font-extrabold leading-tight text-[#1C3B34] sm:text-xl">
              Play Move Improve
            </p>

            <p className="mt-0.5 text-xs font-semibold text-[#8A6F3E] sm:text-sm">
              Regulator Champions Program
            </p>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#early-bird"
              className="hidden rounded-xl bg-[#E0BC68] px-4 py-2.5 text-sm font-extrabold text-[#17352F] transition hover:bg-[#E8C879] sm:inline-flex"
            >
              Request an invoice
            </a>

            <Link
              href="/login"
              className="rounded-xl border border-[#1C3B34] bg-white px-4 py-2.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3EEE7]"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#1C3B34] text-white">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#657B6C]/20 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-96 w-96 rounded-full bg-[#C29F60]/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 md:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-base font-extrabold text-[#F0D99A]">
              Play Move Improve
            </p>

            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.16em] text-[#BFD0C8]">
              Regulator Champions Program 2027
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
              A year of professional learning that
              actually follows educators back into
              the room.
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#E0E8E4]">
              Practical learning for whole early
              childhood teams, bringing together
              movement, co-regulation, sensory
              processing, play, executive function,
              family voice and Quality Improvement
              Plan evidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Pill>
                Up to 15 educators
              </Pill>

              <Pill>
                18 CPD hours
              </Pill>

              <Pill>
                Self-paced
              </Pill>

              <Pill>
                Family Voice + QIP
              </Pill>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#early-bird"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] shadow-lg transition hover:bg-[#EDCD82]"
              >
                Request an Early Bird invoice
              </a>

              <a
                href="#roadmap"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/40 bg-white/5 px-7 py-4 text-base font-extrabold text-white transition hover:bg-white/10"
              >
                See the 2027 roadmap
              </a>
            </div>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
              <Image
                src="/images/educator-pair-regulation-cards-outdoors.jpg"
                alt="Early childhood educators using Play Move Improve regulation resources"
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

      {/* EARLY BIRD STRIP */}
      <section className="border-b border-[#CDAF70] bg-[#E8D39D]">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#765B29]">
              2027 Early Bird
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
              $4,790 AUD for your whole team
            </h2>

            <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#374C45]">
              Secure the full 2027 digital program
              for up to 15 educators by 31 December
              2026. Once your invoice is paid, your
              service receives access straight away
              and can begin using the existing
              Regulation Ladder content while you
              prepare for the 2027 program.
            </p>
          </div>

          <a
            href="#early-bird"
            className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
          >
            Request an invoice
          </a>
        </div>
      </section>

      {/* NOT JUST ANOTHER WEBINAR */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Professional learning that keeps moving
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              I don&apos;t want your team to watch
              another webinar, download a PDF and
              forget about it by Monday.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[#53645D]">
              Regulator Champions is being built as
              a full-year implementation program.
              Educators learn, try ideas in their
              rooms, reflect on what they noticed,
              hear from families, collect
              professional learning evidence and
              gradually build a more consistent way
              of responding together.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              number="01"
              title="Learn"
              text="Join Robyn live or return to the recording when your team has the time and headspace."
            />

            <FeatureCard
              number="02"
              title="Try"
              text="Take practical Regulation Ladders, movement ideas and environmental changes back into everyday practice."
            />

            <FeatureCard
              number="03"
              title="Reflect"
              text="Capture three key takeaways, professional reflection, team actions and evidence of what changed."
            />

            <FeatureCard
              number="04"
              title="Connect"
              text="Bring family voice into the process and use what families tell you to help shape practice and future learning."
            />
          </div>
        </div>
      </section>

      {/* TEAM JOURNEY */}
      <section className="bg-[#F1ECE4] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-4xl bg-white p-3 shadow-sm">
            <Image
              src="/images/small-group-educators-staffroom-regulation.jpg"
              alt="Early childhood educators completing professional learning together"
              width={1400}
              height={1000}
              loading="lazy"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-extrabold text-[#9A793D]">
              One service. One shared journey.
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Every educator has their own login,
              learning record and certificates.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Your service can enrol up to 15
              educators. Each person works through
              the program at their own pace, while
              the team can still come together around
              shared reflection, family feedback and
              practical changes.
            </p>

            <div className="mt-8 space-y-4">
              <JourneyRow
                title="Watch"
                text="Complete the webinar or recording."
              />

              <JourneyRow
                title="Notice"
                text="Record three key takeaways from the learning."
              />

              <JourneyRow
                title="Explore"
                text="Open the practical resources and Regulation Ladders."
              />

              <JourneyRow
                title="Reflect"
                text="Complete the professional reflection and consider what could change in practice."
              />

              <JourneyRow
                title="Complete"
                text="Download the 1.5-hour CPD certificate and unlock the next topic."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section
        id="roadmap"
        className="scroll-mt-24 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              The 2027 roadmap
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Practical topics on the surface, with
              developmental science underneath.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              The wording and examples may continue
              to evolve as I hear what educators and
              families need, but this is the direction
              of the year. You&apos;ll see ideas
              drawn from co-regulation, sensory
              processing, executive function,
              neuroplasticity, movement, the 8 senses,
              play, motor development and inclusive
              environments without turning the
              learning into a university lecture.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {ROADMAP.map((topic) => (
              <article
                key={topic.number}
                className="rounded-3xl border border-[#E0D8CC] bg-[#FAF8F5] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#1C3B34] text-sm font-extrabold text-white">
                    {topic.number}
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold leading-snug">
                      {topic.title}
                    </h3>

                    <p className="mt-3 leading-7 text-[#53645D]">
                      {topic.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAMILY VOICE */}
      <section className="bg-[#FAF5EC] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold text-[#9A793D]">
              Family Voice
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Families become part of the learning,
              not an afterthought at the end.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Each topic can include a short,
              anonymous family feedback form that
              your service shares through its own QR
              code. Families can tell you what
              they&apos;re noticing at home, what
              they need more help with and which
              areas they would like your team to
              explore next.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Managers can bring the themes into QIP
              reflection and reporting, while I can
              look across the broader Regulator
              Champions community and use that
              feedback to make future learning more
              relevant.
            </p>
          </div>

          <div className="rounded-4xl border border-[#DDD5C9] bg-white p-7 shadow-sm sm:p-9">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
              Each service receives
            </p>

            <div className="mt-6 space-y-5">
              <SimplePoint>
                A unique family feedback link and QR
                code for each topic
              </SimplePoint>

              <SimplePoint>
                Short multiple-choice questions with
                room for “Other”
              </SimplePoint>

              <SimplePoint>
                Anonymous family comments
              </SimplePoint>

              <SimplePoint>
                Family Voice summaries for QIP
                documentation
              </SimplePoint>

              <SimplePoint>
                Manager actions based on what
                families are telling the service
              </SimplePoint>
            </div>
          </div>
        </div>
      </section>

      {/* QIP */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              QIP documentation without starting
              from a blank page
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Turn professional learning into
              evidence of what your team actually
              noticed, tried and changed.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Educators can contribute reflections
              and suggested team actions. Managers
              can review, edit and approve them, add
              family voice and generate downloadable
              monthly documentation without changing
              the original learning records.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <InfoBlock
              title="Professional learning"
              text="Individual CPD records, certificates, key takeaways and Professional Learning Report PDFs."
            />

            <InfoBlock
              title="Team reflection"
              text="Educator and manager reflections, team actions and evidence that can support ongoing quality improvement."
            />

            <InfoBlock
              title="Family voice"
              text="Monthly family themes, selected anonymous comments and manager responses gathered into useful documentation."
            />
          </div>
        </div>
      </section>

      {/* PROGRAM INCLUDES */}
      <section className="bg-[#1C3B34] py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-extrabold text-[#F0D99A]">
              Included in the 2027 program
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              One program for educator learning,
              family engagement and team
              documentation.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
              Access begins as soon as your invoice
              is paid and continues until 31 December
              2027.
            </p>
          </div>

          <div className="grid gap-x-8 md:grid-cols-2">
            {PROGRAM_INCLUDES.map(
              (item) => (
                <div
                  key={item}
                  className="border-t border-white/20 py-4"
                >
                  <p className="leading-7 text-[#E4ECE8]">
                    {item}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* EXISTING CONTENT */}
      <section className="bg-[#E8D39D] py-12">
        <div className="mx-auto grid max-w-7xl gap-7 px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#765B29]">
              Early Bird access starts now
            </p>

            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              You don&apos;t have to wait until 2027
              to begin.
            </h2>

            <p className="mt-3 text-lg leading-relaxed text-[#374C45]">
              Once your invoice is paid, your team
              can begin exploring the existing
              Regulation Ladder content while I
              continue building the full 2027
              learning pathway.
            </p>
          </div>

          <Link
            href={FREE_SAMPLE_URL}
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-white px-6 py-3 text-base font-extrabold text-[#1C3B34] shadow-sm transition hover:bg-[#F6F1E8]"
          >
            See a Regulation Ladder
          </Link>
        </div>
      </section>

      {/* PRICING */}
      <section
        id="early-bird"
        className="scroll-mt-24 bg-[#FAF8F5] py-16 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              2027 team pricing
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Choose the level of support that suits
              your service.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              All prices are in Australian dollars
              and cover one service with up to 15
              educators.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <PriceCard
              eyebrow="Available until 31 December 2026"
              title="Early Bird Digital"
              price={EARLY_BIRD_PRICE}
              text="The complete 2027 digital Regulator Champions program, with immediate access to existing ladder content once your invoice is paid."
              highlight
            />

            <PriceCard
              eyebrow="2027 standard price"
              title="Standard Digital"
              price={STANDARD_PRICE}
              text="The same full digital program for services enrolling after the Early Bird period."
            />

            <PriceCard
              eyebrow="Printed documentation included"
              title="Premium"
              price={PREMIUM_PRICE}
              text="The full program plus three professionally printed and bound resources for educators, managers and families."
            />
          </div>

          {/* INVOICE FORM */}
          <div className="mt-14 rounded-4xl bg-[#1C3B34] p-6 text-white shadow-xl sm:p-9 lg:p-11">
            {quoteSubmitted ? (
              <div className="max-w-3xl">
                <p className="text-sm font-extrabold text-[#F0D99A]">
                  Request received
                </p>

                <h3 className="mt-3 text-3xl font-extrabold">
                  Thank you. I&apos;ll be in touch
                  about your invoice.
                </h3>

                <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                  Once payment is confirmed, your
                  service can be activated and your
                  manager will receive the team
                  access details.
                </p>
              </div>
            ) : (
              <>
                <div className="max-w-4xl">
                  <p className="text-sm font-extrabold text-[#F0D99A]">
                    Request an invoice
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold">
                    Tell me about your service.
                  </h3>

                  <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                    This information will also help
                    us set up your service dashboard
                    once your invoice is paid, so you
                    won&apos;t need to give me the
                    same details twice.
                  </p>
                </div>

                <form
                  onSubmit={handleQuoteSubmit}
                  className="mt-8 space-y-6"
                >
                  <div>
                    <FieldLabel>
                      Program option
                    </FieldLabel>

                    <div className="mt-2 grid gap-3 md:grid-cols-2">
                      <PlanButton
                        active={
                          quoteForm.programOption ===
                          'early-bird'
                        }
                        title="Early Bird Digital"
                        price={
                          EARLY_BIRD_PRICE
                        }
                        onClick={() =>
                          updateField(
                            'programOption',
                            'early-bird',
                          )
                        }
                      />

                      <PlanButton
                        active={
                          quoteForm.programOption ===
                          'premium'
                        }
                        title="Premium"
                        price={PREMIUM_PRICE}
                        onClick={() =>
                          updateField(
                            'programOption',
                            'premium',
                          )
                        }
                      />
                    </div>
                  </div>

                  <FormGrid>
                    <FormInput
                      label="Service name"
                      required
                      value={
                        quoteForm.serviceName
                      }
                      onChange={(value) =>
                        updateField(
                          'serviceName',
                          value,
                        )
                      }
                    />

                    <FormSelect
                      label="Service type"
                      required
                      value={
                        quoteForm.serviceType
                      }
                      onChange={(value) =>
                        updateField(
                          'serviceType',
                          value,
                        )
                      }
                      options={[
                        '',
                        'Kindergarten / preschool',
                        'Long day care',
                        'Early learning centre',
                        'School',
                        'Other',
                      ]}
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormInput
                      label="Manager / main contact name"
                      required
                      value={
                        quoteForm.managerName
                      }
                      onChange={(value) =>
                        updateField(
                          'managerName',
                          value,
                        )
                      }
                    />

                    <FormInput
                      label="Manager / main contact email"
                      type="email"
                      required
                      value={
                        quoteForm.managerEmail
                      }
                      onChange={(value) =>
                        updateField(
                          'managerEmail',
                          value,
                        )
                      }
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormInput
                      label="Phone number"
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(value) =>
                        updateField(
                          'phone',
                          value,
                        )
                      }
                    />

                    <FormInput
                      label="Number of educators"
                      type="number"
                      min="1"
                      max="15"
                      required
                      value={
                        quoteForm.educatorCount
                      }
                      onChange={(value) =>
                        updateField(
                          'educatorCount',
                          value,
                        )
                      }
                    />
                  </FormGrid>

                  <FormTextArea
                    label="Postal address"
                    required
                    value={
                      quoteForm.postalAddress
                    }
                    onChange={(value) =>
                      updateField(
                        'postalAddress',
                        value,
                      )
                    }
                    rows={3}
                  />

                  <FormGrid>
                    <FormSelect
                      label="Government funding / budget"
                      required
                      value={
                        quoteForm.fundingSource
                      }
                      onChange={(value) =>
                        updateField(
                          'fundingSource',
                          value,
                        )
                      }
                      options={[
                        '',
                        'School Readiness Funding (SRF)',
                        'Preschool Boost',
                        'Kindy Uplift',
                        'Professional learning budget',
                        'Other government funding',
                        'No government funding',
                        'Not sure yet',
                      ]}
                    />

                    {quoteForm.fundingSource ===
                    'Other government funding' ? (
                      <FormInput
                        label="Other funding"
                        value={
                          quoteForm.fundingOther
                        }
                        onChange={(value) =>
                          updateField(
                            'fundingOther',
                            value,
                          )
                        }
                      />
                    ) : (
                      <div />
                    )}
                  </FormGrid>

                  <div className="border-t border-white/15 pt-6">
                    <p className="text-lg font-extrabold">
                      Billing contact
                    </p>

                    <p className="mt-1 text-sm leading-6 text-[#CBD8D3]">
                      Leave these blank if the
                      billing contact is the same as
                      the manager.
                    </p>

                    <div className="mt-4">
                      <FormGrid>
                        <FormInput
                          label="Billing contact name"
                          value={
                            quoteForm.billingName
                          }
                          onChange={(value) =>
                            updateField(
                              'billingName',
                              value,
                            )
                          }
                        />

                        <FormInput
                          label="Billing email"
                          type="email"
                          value={
                            quoteForm.billingEmail
                          }
                          onChange={(value) =>
                            updateField(
                              'billingEmail',
                              value,
                            )
                          }
                        />
                      </FormGrid>
                    </div>
                  </div>

                  <FormTextArea
                    label="Anything else you'd like me to know?"
                    value={quoteForm.notes}
                    onChange={(value) =>
                      updateField(
                        'notes',
                        value,
                      )
                    }
                    rows={4}
                  />

                  {submitError ? (
                    <p className="rounded-xl bg-[#7A312F] px-4 py-3 text-sm font-semibold text-white">
                      {submitError}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-[#CBD8D3]">
                        Selected program
                      </p>

                      <p className="mt-1 text-2xl font-extrabold">
                        $
                        {selectedPrice.toLocaleString()}
                        {' '}
                        AUD
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] transition hover:bg-[#EDCD82] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting
                        ? 'Sending request…'
                        : 'Request my invoice'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FREE CONTENT */}
      <section className="border-t border-[#E5DED4] bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-7 px-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold">
              Want to look around before you
              enquire?
            </h2>

            <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#53645D]">
              Explore the free Regulation Ladder
              sample and Play Move Improve articles
              to get a feel for the way I approach
              movement, regulation, play and
              educator decision-making.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={FREE_SAMPLE_URL}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#1C3B34] px-5 py-3 font-extrabold text-[#1C3B34]"
            >
              Free ladder sample
            </Link>

            <Link
              href={BLOG_URL}
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 font-extrabold text-white"
            >
              Explore the blog
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section className="bg-[#1C3B34] py-12 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-extrabold text-[#F0D99A]">
            Play Move Improve
          </p>

          <h2 className="mt-3 text-3xl font-extrabold">
            Regulator Champions Program 2027
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Professional learning should help
            educators feel more capable in the
            moments that are actually difficult, not
            simply give them more information to
            remember.
          </p>

          <a
            href="#early-bird"
            className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 font-extrabold text-[#102E28]"
          >
            Request an invoice
          </a>
        </div>
      </section>
    </main>
  );
}

function Pill({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white">
      {children}
    </span>
  );
}

function FeatureCard({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E0D8CC] bg-[#FAF8F5] p-6">
      <p className="text-sm font-extrabold text-[#9A793D]">
        {number}
      </p>

      <h3 className="mt-3 text-2xl font-extrabold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-[#53645D]">
        {text}
      </p>
    </article>
  );
}

function JourneyRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-1 border-t border-[#D8CFC2] py-4 sm:grid-cols-[100px_1fr] sm:gap-5">
      <p className="font-extrabold">
        {title}
      </p>

      <p className="leading-7 text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function SimplePoint({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#C29F60]" />

      <p className="leading-7 text-[#53645D]">
        {children}
      </p>
    </div>
  );
}

function InfoBlock({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="border-t border-[#D8CFC2] pt-5">
      <h3 className="text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-[#53645D]">
        {text}
      </p>
    </article>
  );
}

function PriceCard({
  eyebrow,
  title,
  price,
  text,
  highlight = false,
}: {
  eyebrow: string;
  title: string;
  price: number;
  text: string;
  highlight?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-7 ${
        highlight
          ? 'border-[#C29F60] bg-[#FFF8E7] shadow-md'
          : 'border-[#DDD5C9] bg-white'
      }`}
    >
      <p className="text-sm font-extrabold text-[#9A793D]">
        {eyebrow}
      </p>

      <h3 className="mt-3 text-2xl font-extrabold">
        {title}
      </h3>

      <p className="mt-4 text-4xl font-extrabold">
        ${price.toLocaleString()}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#6B7772]">
        AUD · one service · up to 15
        educators
      </p>

      <p className="mt-5 leading-7 text-[#53645D]">
        {text}
      </p>
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
      className={`rounded-2xl border p-5 text-left transition ${
        active
          ? 'border-[#E0BC68] bg-white text-[#12362F]'
          : 'border-white/25 bg-[#102E28] text-white'
      }`}
    >
      <span className="block text-lg font-extrabold">
        {title}
      </span>

      <span
        className={`mt-1 block text-sm ${
          active
            ? 'text-[#53645D]'
            : 'text-[#D8E1DC]'
        }`}
      >
        ${price.toLocaleString()} AUD
      </span>
    </button>
  );
}

function FormGrid({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {children}
    </div>
  );
}

function FieldLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <label className="block text-sm font-extrabold text-white">
      {children}
    </label>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  min,
  max,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  min?: string;
  max?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-extrabold text-white">
        {label}
      </span>

      <input
        type={type}
        value={value}
        required={required}
        min={min}
        max={max}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="min-h-14 w-full rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#AFC1BA] focus:border-[#E0BC68] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]/40"
      />
    </label>
  );
}

function FormTextArea({
  label,
  value,
  onChange,
  required = false,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-extrabold text-white">
        {label}
      </span>

      <textarea
        value={value}
        required={required}
        rows={rows}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white placeholder:text-[#AFC1BA] focus:border-[#E0BC68] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]/40"
      />
    </label>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-extrabold text-white">
        {label}
      </span>

      <select
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="min-h-14 w-full rounded-xl border border-white/30 bg-[#102E28] p-4 text-base text-white focus:border-[#E0BC68] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]/40"
      >
        {options.map((option) => (
          <option
            key={
              option || 'blank-option'
            }
            value={option}
          >
            {option ||
              'Please choose…'}
          </option>
        ))}
      </select>
    </label>
  );
}