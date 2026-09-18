'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const EARLY_BIRD_PRICE = 4790;
const STANDARD_PRICE = 5290;
const PREMIUM_PRICE = 5990;
const CURRENT_LEARNING_URL = 'https://www.playmoveimprove.com/';
const BLOG_URL = '/blog';

type ProgramOption = 'early-bird' | 'premium';

type QuoteForm = {
  programOption: ProgramOption;
  serviceName: string;
  managerName: string;
  managerEmail: string;
  phone: string;
  educatorCount: string;
  fundingSource: string;
  notes: string;
};

const ROADMAP = [
  {
    number: 1,
    title: 'Morning routines, separation and drop-off',
    description:
      'Supporting children and families through separation, connection, predictability and the nervous-system demands that can make the start of the day feel so big.',
  },
  {
    number: 2,
    title: 'Mat time, participation and static sitting',
    description:
      'Looking beyond “sit still and listen” to postural control, core strength, sensory processing, executive function and different ways children can participate.',
  },
  {
    number: 3,
    title: 'Transitions and bottlenecks',
    description:
      'Why doorways, pack-up, room changes and multi-step routines can overwhelm children, and how rhythm, movement, visual support and co-regulation can reduce the load.',
  },
  {
    number: 4,
    title: 'Heavy work, sensory seeking and rough play',
    description:
      'Understanding proprioception, vestibular processing, risky play, movement needs and why some children seek pushing, crashing, climbing and big-body play.',
  },
  {
    number: 5,
    title: 'Following instructions when capacity is low',
    description:
      'What happens when language, working memory, inhibition and regulation demands collide, and how educators can reduce friction without removing fair boundaries.',
  },
  {
    number: 6,
    title: 'Play schemas and the changing way children play',
    description:
      'Exploring common play schemas, movement, imagination, social play and how screen-heavy experiences may influence the way children engage with people, objects and environments.',
  },
  {
    number: 7,
    title: 'Impulse control and co-regulation',
    description:
      'Connecting executive function, interoception, the 8 senses, emotional regulation and the role adults play while children are still developing their own self-regulation.',
  },
  {
    number: 8,
    title: 'When children are running out of capacity',
    description:
      'Recognising cumulative fatigue, sensory load and end-of-winter strain before behaviour becomes the only thing adults can see.',
  },
  {
    number: 9,
    title: 'Designing environments for movement, connection and play',
    description:
      'Using biophilic principles, movement opportunities, spatial awareness, sensory diversity and inclusive environmental design to support different nervous-system needs.',
  },
  {
    number: 10,
    title: 'Noise, clutter and sensory load',
    description:
      'Looking at visual, auditory, vestibular and environmental demands and how small changes can make participation easier for neurodivergent and divergent learners.',
  },
  {
    number: 11,
    title: 'Building consistency across the team',
    description:
      'Bringing together neuroplasticity, reflective practice, family voice, QIP evidence and shared educator decision-making so learning becomes part of everyday practice.',
  },
  {
    number: 12,
    title: 'Review, resilience and what comes next',
    description:
      'Looking back at what changed, what families noticed, what educators discovered, and how growth mindset, resilience and ongoing reflection can shape the year ahead.',
  },
];

const PROGRAM_INCLUDES = [
  'One service with up to 15 educator logins',
  '12 professional learning topics across 2027',
  'Live online learning with recordings for self-paced access',
  'Up to 18 CPD hours per educator across the full program',
  'Individual certificates and professional learning records',
  'Practical observation, reflection and implementation tasks',
  'Manager dashboard with team progress and CPD records',
  'Family Voice feedback tools and QR codes',
  'QIP reflection, evidence and downloadable reporting',
  'Access until 31 December 2027',
];

export default function HomePageClient() {
  const [quoteForm, setQuoteForm] = useState<QuoteForm>({
    programOption: 'early-bird',
    serviceName: '',
    managerName: '',
    managerEmail: '',
    phone: '',
    educatorCount: '',
    fundingSource: '',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const selectedPrice =
    quoteForm.programOption === 'premium'
      ? PREMIUM_PRICE
      : EARLY_BIRD_PRICE;

  const updateField = <K extends keyof QuoteForm>(
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
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quoteForm),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        setSubmitError(
          result?.error ||
            'Something went wrong while sending your request. Please try again.',
        );
        return;
      }

      setQuoteSubmitted(true);
      window.location.assign('/invoice-request-received');
    } catch (error) {
      console.error('Invoice request error:', error);
      setSubmitError(
        'Something went wrong while sending your request. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#FAF8F5] text-[#232150]">
      <header className="sticky top-0 z-50 border-b border-[#E5E0D8] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-6">
          <Link href="/" className="min-w-0">
            <p className="text-lg font-extrabold leading-tight text-[#232150] sm:text-xl">
              Play Move Improve
            </p>
            <p className="mt-0.5 text-xs font-semibold text-[#87317E] sm:text-sm">
              Regulator Champions Program 2027
            </p>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="#invoice"
              className="hidden rounded-xl bg-[#61B694] px-4 py-2.5 text-sm font-extrabold text-[#232150] transition hover:opacity-90 sm:inline-flex"
            >
              Secure Early Bird
            </a>
            <Link
              href="/login"
              className="rounded-xl border border-[#232150] bg-white px-4 py-2.5 text-sm font-extrabold text-[#232150] transition hover:bg-[#F5F3F8]"
            >
              Login
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#232150] text-white">
        <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-[#61B694]/15 blur-3xl" />
        <div className="absolute -bottom-36 -right-16 h-96 w-96 rounded-full bg-[#87317E]/25 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 md:py-18 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#DCCDA8]">
              Regulator Champions 2027
            </p>

            <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
              Help your team respond more confidently to children who are struggling with regulation, participation, movement and behaviour.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#E8E7F0] sm:text-xl">
              A 12-month professional learning program for early childhood services that turns developmental knowledge into practical changes educators can use in the room, while building CPD, family voice and QIP evidence along the way.
            </p>

            <div className="mt-7 rounded-3xl border border-white/15 bg-white/10 p-5 sm:max-w-xl">
              <p className="text-sm font-bold uppercase tracking-[0.12em] text-[#DCCDA8]">
                2027 Early Bird
              </p>
              <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
                <p className="text-4xl font-extrabold">$4,790</p>
                <p className="pb-1 text-sm font-semibold text-[#DAD8E7]">
                  incl. GST · one service · up to 15 educators
                </p>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#DAD8E7]">
                Save $500 before 31 December 2026. Standard 2027 price $5,290.
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Pill>Up to 15 educators</Pill>
              <Pill>Up to 18 CPD hours each</Pill>
              <Pill>12 months of implementation</Pill>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#invoice"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#61B694] px-7 py-4 text-base font-extrabold text-[#232150] shadow-lg transition hover:opacity-90"
              >
                Secure Early Bird pricing
              </a>
              <a
                href="#roadmap"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/35 bg-white/5 px-7 py-4 text-base font-extrabold text-white transition hover:bg-white/10"
              >
                See the 12 topics
              </a>
            </div>

            <p className="mt-4 text-sm text-[#CFCDE0]">
              No online payment required. Submit your service details and I&apos;ll send your invoice.
            </p>
          </div>

          <div className="mx-auto w-full max-w-2xl">
            <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
              <Image
                src="/images/educator-pair-regulation-cards-outdoors.jpg"
                alt="Early childhood educators working together during professional learning"
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

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#87317E]">
              What changes for your service
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Give educators a clearer way to think when the usual strategies are not working.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            <OutcomeCard
              title="More confident educators"
              text="Help educators look underneath difficult moments and consider regulation, sensory processing, movement, executive function and developmental capacity before jumping straight to behaviour management."
            />
            <OutcomeCard
              title="A more consistent team"
              text="Each educator learns individually, while managers can see progress and bring shared reflections and practical decisions back into the whole service."
            />
            <OutcomeCard
              title="Useful QIP evidence"
              text="Educator reflection, family feedback and practical changes are captured throughout the year instead of being reconstructed when documentation is due."
            />
          </div>
        </div>
      </section>

      <section className="bg-[#F3F0F6] py-14 sm:py-18">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="overflow-hidden rounded-4xl bg-white p-3 shadow-sm">
            <Image
              src="/images/small-group-educators-staffroom-regulation.jpg"
              alt="Early childhood educators learning together as a team"
              width={1400}
              height={1000}
              loading="lazy"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-extrabold text-[#87317E]">
              Each educator learns individually. Your service progresses together.
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Professional learning that changes what happens in the room.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5D5A72]">
              Each topic starts with an everyday challenge. Educators learn what may be happening underneath it, try practical changes, notice what happens and reflect on what they want to do next.
            </p>

            <div className="mt-8 space-y-4">
              <JourneyRow title="Learn" text="Join the live session or watch the recording when it suits your team." />
              <JourneyRow title="Notice" text="Look more closely at what the child, environment and routine may be telling you." />
              <JourneyRow title="Try" text="Make one practical change in the room and see what happens." />
              <JourneyRow title="Reflect" text="Capture learning, evidence and next steps for professional practice." />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-extrabold text-[#87317E]">2027 Early Bird</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                $4,790 incl. GST for one service with up to 15 educators.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-[#5D5A72]">
                Early Bird saves your service $500 compared with the standard 2027 digital price of $5,290.
              </p>

              <div className="mt-7 grid gap-x-8 sm:grid-cols-2">
                {PROGRAM_INCLUDES.map((item) => (
                  <div key={item} className="border-t border-[#E2DDE7] py-4">
                    <p className="leading-7 text-[#4E4A65]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-[#DCCDA8] bg-[#FFFDF8] p-7 shadow-sm sm:p-9">
              <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#87317E]">
                Want printed resources too?
              </p>
              <h3 className="mt-3 text-2xl font-extrabold">Premium · $5,990 incl. GST</h3>
              <p className="mt-4 leading-7 text-[#5D5A72]">
                Includes the full 2027 program plus three professionally printed and bound documents for educators, managers and families.
              </p>
              <a
                href="#invoice"
                onClick={() => updateField('programOption', 'premium')}
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#232150] px-5 py-3 font-extrabold text-white"
              >
                Request Premium invoice
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="roadmap" className="scroll-mt-24 bg-[#FAF8F5] py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#87317E]">The 2027 roadmap</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              12 topics built around the moments educators actually find difficult.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-[#5D5A72]">
              Each topic starts with an everyday challenge and helps educators understand what may be happening underneath it.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {ROADMAP.map((topic) => (
              <article
                key={topic.number}
                className="rounded-3xl border border-[#E2DDE7] bg-white p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#232150] text-sm font-extrabold text-white">
                    {topic.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold leading-snug">{topic.title}</h3>
                    <p className="mt-3 leading-7 text-[#5D5A72]">{topic.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#87317E]">
              Learning that gives managers something useful at the end
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Bring educator learning, family voice and service improvement into one place.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <InfoBlock
              title="Team CPD"
              text="Individual completion records, certificates, key takeaways and professional learning documentation."
            />
            <InfoBlock
              title="Family Voice"
              text="Simple QR-code feedback helps your service understand what families are noticing and needing."
            />
            <InfoBlock
              title="QIP evidence"
              text="Educator reflections, family themes and service actions can be organised into documentation managers can actually use."
            />
          </div>
        </div>
      </section>

      <section className="bg-[#E7F4EF] py-12">
        <div className="mx-auto grid max-w-7xl gap-7 px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#87317E]">
              Have 2026 professional learning funding left to use?
            </p>
            <h2 className="mt-2 text-2xl font-extrabold leading-tight sm:text-3xl">
              Your team can start learning now without turning Regulator Champions into a six-month preview.
            </h2>
            <p className="mt-3 text-lg leading-relaxed text-[#4E4A65]">
              Services with funding remaining this year can purchase access to my existing self-paced online coaching platform at playmoveimprove.com, giving educators professional learning they can begin using now while you plan for Regulator Champions in 2027.
            </p>
          </div>

          <a
            href={CURRENT_LEARNING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#232150] px-6 py-3 text-base font-extrabold text-white"
          >
            Explore current online coaching
          </a>
        </div>
      </section>

      <section id="invoice" className="scroll-mt-24 bg-[#FAF8F5] py-14 sm:py-18">
        <div className="mx-auto max-w-5xl px-6">
          <div className="rounded-4xl bg-[#232150] p-6 text-white shadow-xl sm:p-9 lg:p-11">
            {quoteSubmitted ? (
              <div className="max-w-3xl">
                <p className="text-sm font-extrabold text-[#DCCDA8]">Request received</p>
                <h2 className="mt-3 text-3xl font-extrabold">
                  Thank you. I&apos;ll be in touch about your invoice.
                </h2>
              </div>
            ) : (
              <>
                <div className="max-w-4xl">
                  <p className="text-sm font-extrabold text-[#DCCDA8]">Secure Early Bird pricing</p>
                  <h2 className="mt-3 text-3xl font-extrabold">
                    Tell me where to send the invoice.
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-[#DAD8E7]">
                    This is an invoice request only. I&apos;ll collect any extra billing or delivery details after we connect.
                  </p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="mt-8 space-y-6">
                  <div>
                    <FieldLabel>Program option</FieldLabel>
                    <div className="mt-2 grid gap-3 md:grid-cols-2">
                      <PlanButton
                        active={quoteForm.programOption === 'early-bird'}
                        title="Early Bird Digital"
                        price={EARLY_BIRD_PRICE}
                        detail="Save $500 before 31 December 2026"
                        onClick={() => updateField('programOption', 'early-bird')}
                      />
                      <PlanButton
                        active={quoteForm.programOption === 'premium'}
                        title="Premium"
                        price={PREMIUM_PRICE}
                        detail="Includes three printed and bound documents"
                        onClick={() => updateField('programOption', 'premium')}
                      />
                    </div>
                  </div>

                  <FormGrid>
                    <FormInput
                      label="Service name"
                      required
                      value={quoteForm.serviceName}
                      onChange={(value) => updateField('serviceName', value)}
                    />
                    <FormInput
                      label="Contact name"
                      required
                      value={quoteForm.managerName}
                      onChange={(value) => updateField('managerName', value)}
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormInput
                      label="Email"
                      type="email"
                      required
                      value={quoteForm.managerEmail}
                      onChange={(value) => updateField('managerEmail', value)}
                    />
                    <FormInput
                      label="Phone"
                      type="tel"
                      required
                      value={quoteForm.phone}
                      onChange={(value) => updateField('phone', value)}
                    />
                  </FormGrid>

                  <FormGrid>
                    <FormInput
                      label="Number of educators"
                      type="number"
                      min="1"
                      max="15"
                      required
                      value={quoteForm.educatorCount}
                      onChange={(value) => updateField('educatorCount', value)}
                    />
                    <FormSelect
                      label="Funding / budget (optional)"
                      value={quoteForm.fundingSource}
                      onChange={(value) => updateField('fundingSource', value)}
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
                  </FormGrid>

                  <FormTextArea
                    label="Anything else you'd like me to know? (optional)"
                    value={quoteForm.notes}
                    onChange={(value) => updateField('notes', value)}
                    rows={3}
                  />

                  {submitError ? (
                    <p className="rounded-xl bg-[#7A312F] px-4 py-3 text-sm font-semibold text-white">
                      {submitError}
                    </p>
                  ) : null}

                  <div className="flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-[#CBC9DA]">Selected program</p>
                      <p className="mt-1 text-2xl font-extrabold">
                        ${selectedPrice.toLocaleString()} AUD incl. GST
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#61B694] px-7 py-4 text-base font-extrabold text-[#232150] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? 'Sending request…' : 'Send my invoice request'}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E5E0D8] bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-extrabold">Not ready to enrol your service?</h2>
            <p className="mt-2 text-[#5D5A72]">
              Explore Play Move Improve articles and free resources to get a feel for my approach.
            </p>
          </div>
          <Link
            href={BLOG_URL}
            className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#232150] px-5 py-3 font-extrabold text-[#232150]"
          >
            Explore the blog
          </Link>
        </div>
      </section>

      <section className="bg-[#232150] py-12 text-white">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-extrabold text-[#DCCDA8]">Play Move Improve</p>
          <h2 className="mt-3 text-3xl font-extrabold">Regulator Champions Program 2027</h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-[#DAD8E7]">
            Help your team feel more capable in the moments that are actually difficult, and build evidence of what changed along the way.
          </p>
          <a
            href="#invoice"
            className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#61B694] px-7 py-4 font-extrabold text-[#232150]"
          >
            Secure Early Bird pricing
          </a>
        </div>
      </section>
    </main>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white">
      {children}
    </span>
  );
}

function OutcomeCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-[#E2DDE7] bg-[#FAF8F5] p-6">
      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="mt-3 leading-7 text-[#5D5A72]">{text}</p>
    </article>
  );
}

function JourneyRow({ title, text }: { title: string; text: string }) {
  return (
    <div className="grid gap-1 border-t border-[#DAD5E0] py-4 sm:grid-cols-[90px_1fr] sm:gap-5">
      <p className="font-extrabold">{title}</p>
      <p className="leading-7 text-[#5D5A72]">{text}</p>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className="rounded-3xl border border-[#E2DDE7] bg-[#FAF8F5] p-6">
      <h3 className="text-xl font-extrabold">{title}</h3>
      <p className="mt-3 leading-7 text-[#5D5A72]">{text}</p>
    </article>
  );
}

function PlanButton({
  active,
  title,
  price,
  detail,
  onClick,
}: {
  active: boolean;
  title: string;
  price: number;
  detail: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border p-5 text-left transition ${
        active
          ? 'border-[#61B694] bg-white text-[#232150]'
          : 'border-white/25 bg-[#1A1940] text-white'
      }`}
    >
      <span className="block text-lg font-extrabold">{title}</span>
      <span className="mt-1 block text-sm">${price.toLocaleString()} AUD incl. GST</span>
      <span className={`mt-2 block text-xs leading-5 ${active ? 'text-[#5D5A72]' : 'text-[#CBC9DA]'}`}>
        {detail}
      </span>
    </button>
  );
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2">{children}</div>;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-extrabold text-white">{children}</label>;
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
      <span className="mb-2 block text-sm font-extrabold text-white">{label}</span>
      <input
        type={type}
        value={value}
        required={required}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 w-full rounded-xl border border-white/30 bg-[#1A1940] p-4 text-base text-white placeholder:text-[#A9A6BA] focus:border-[#61B694] focus:outline-none focus:ring-2 focus:ring-[#61B694]/30"
      />
    </label>
  );
}

function FormTextArea({
  label,
  value,
  onChange,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-extrabold text-white">{label}</span>
      <textarea
        value={value}
        rows={rows}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-white/30 bg-[#1A1940] p-4 text-base text-white placeholder:text-[#A9A6BA] focus:border-[#61B694] focus:outline-none focus:ring-2 focus:ring-[#61B694]/30"
      />
    </label>
  );
}

function FormSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-extrabold text-white">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-14 w-full rounded-xl border border-white/30 bg-[#1A1940] p-4 text-base text-white focus:border-[#61B694] focus:outline-none focus:ring-2 focus:ring-[#61B694]/30"
      >
        {options.map((option) => (
          <option key={option || 'blank-option'} value={option}>
            {option || 'Please choose…'}
          </option>
        ))}
      </select>
    </label>
  );
}
