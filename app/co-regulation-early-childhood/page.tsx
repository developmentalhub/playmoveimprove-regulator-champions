import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Co-Regulation in Early Childhood | Strategies for Educators',

  description:
    'Learn what co-regulation means in early childhood, practical co-regulation strategies for educators, how adult responses influence behaviour, and how to support children through transitions, sensory overload and big emotions.',

  alternates: {
    canonical: '/co-regulation-early-childhood',
  },

  openGraph: {
    title:
      'Co-Regulation in Early Childhood | Strategies for Educators',
    description:
      'A practical guide to co-regulation in early childhood, including educator responses, sensory load, transitions, emotional regulation and whole-team practice.',
    url: '/co-regulation-early-childhood',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Co-Regulation in Early Childhood: Practical Strategies for Educators',
  description:
    'A practical guide for early childhood educators supporting co-regulation through relationship, environment, language, sensory awareness, transitions and whole-team practice.',
  author: {
    '@type': 'Person',
    name: 'Robyn Papworth',
    jobTitle:
      'Accredited Exercise Physiologist and Developmental Educator',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Play Move Improve',
  },
  inLanguage: 'en',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id':
      'https://playmoveimprove-regulator-champions.vercel.app/co-regulation-early-childhood',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:
        'What is co-regulation in early childhood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Co-regulation is the support an adult provides while a child is developing their own regulation skills. It can include relationship, language, environment, predictability, pacing and responsive guidance.',
      },
    },
    {
      '@type': 'Question',
      name:
        'How is co-regulation different from self-regulation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Self-regulation is the child’s developing ability to manage internal states, attention, impulses and behaviour more independently. Co-regulation is the support another person provides while those abilities are still developing.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Is co-regulation the same as calming a child down?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'No. Co-regulation may help a child settle, but its broader purpose is to support connection, participation, recovery and learning rather than simply reduce visible emotion.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Can co-regulation include boundaries and limits?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Co-regulation can include clear boundaries and safety limits while the adult considers the child’s current capacity and communicates the boundary in a responsive way.',
      },
    },
  ],
};

const PRACTICAL_STRATEGIES = [
  {
    title: 'Slow your pace',
    text:
      'Move and speak more deliberately instead of matching the speed and urgency of an escalating moment.',
  },
  {
    title: 'Use fewer words',
    text:
      'Long explanations can add demand when a child is already overwhelmed. Keep language short, clear and relevant.',
  },
  {
    title: 'Adjust the environment',
    text:
      'Reduce crowding, noise, visual demand or unnecessary social pressure before expecting the child to manage more.',
  },
  {
    title: 'Think about proximity',
    text:
      'Consider adult height, distance and body position so you can remain available without crowding or looming over the child.',
  },
  {
    title: 'Make the next step predictable',
    text:
      'Children often cope better when they know what is happening now and what will happen next.',
  },
  {
    title: 'Allow useful movement',
    text:
      'Some children regulate more effectively when movement is part of the response rather than something they are immediately expected to stop.',
  },
];

const TRANSITION_QUESTIONS = [
  {
    title: 'Can we give more warning?',
    text:
      'A predictable cue may reduce the sudden demand involved in stopping an activity.',
  },
  {
    title: 'Can we reduce the instructions?',
    text:
      'One clear step can be easier to process than several directions delivered at once.',
  },
  {
    title: 'Can movement be part of the transition?',
    text:
      'Walking, carrying or completing a purposeful movement task may help some children shift more successfully.',
  },
  {
    title: 'Can we change the environment?',
    text:
      'Doorways, crowding, noise and waiting can make an otherwise simple transition much harder.',
  },
];

const FAQS = [
  {
    question:
      'What is co-regulation in early childhood?',
    answer:
      'Co-regulation is the support an adult provides while a child is developing their own regulation skills. It can include relationship, language, environment, predictability, pacing and responsive guidance.',
  },
  {
    question:
      'How is co-regulation different from self-regulation?',
    answer:
      'Self-regulation describes the child’s developing ability to manage internal states, attention, impulses and behaviour more independently. Co-regulation is the support another person provides while those abilities are still developing.',
  },
  {
    question:
      'Is co-regulation the same as calming a child down?',
    answer:
      'No. Co-regulation may help a child settle, but the broader goal is connection, participation, recovery and learning rather than simply making visible emotion disappear.',
  },
  {
    question:
      'Can co-regulation include boundaries and limits?',
    answer:
      'Yes. Co-regulation can include clear boundaries. The adult still protects safety and holds expectations while considering the child’s current state and capacity.',
  },
  {
    question:
      'Why is whole-team consistency important?',
    answer:
      'Children interact with multiple educators. Shared principles can make support more predictable even when individual educators use slightly different words or strategies.',
  },
];

export default function CoRegulationEarlyChildhoodPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(faqSchema),
        }}
      />

      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              Practical guide for early childhood educators
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Co-regulation in early childhood
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              What do children need from us before we ask them to regulate themselves?
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Co-regulation is not about making children calm on command. It is the support adults provide through relationship, environment, language, pacing, movement and predictable responses while children are still developing their own regulation skills.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              In practice, co-regulation often begins with what the educator notices and changes before expecting the child to do something differently.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/playbooks"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Try a Free Regulation Ladder
              </Link>

              <Link
                href="/#full-program"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore Regulator Champions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ANSWER */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <p className="text-sm font-semibold text-[#9A793D]">
              What is co-regulation?
            </p>

            <p className="mt-3 max-w-4xl text-lg font-semibold leading-relaxed">
              Co-regulation is the responsive support one person provides to another during a difficult, demanding or emotionally intense moment. For young children, this may include reducing demands, changing the environment, offering connection, using fewer words, allowing movement or helping make the next step feel more manageable.
            </p>
          </div>
        </div>
      </section>

      {/* DEVELOPMENT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Co-regulation and child development
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Children learn regulation through supported experiences.
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#53645D]">
                <p>
                  Young children are still developing the ability to notice internal states, stop an impulse, shift attention, cope with change and recover after frustration.
                </p>

                <p>
                  That is why expecting a distressed three-year-old to simply “use their calming strategies” can miss an important part of development. The child may not yet be able to access those skills independently when the demand is high.
                </p>

                <p>
                  Co-regulation provides support while those abilities are emerging. Over time, repeated experiences of being supported through difficult moments can contribute to children gradually managing more of those demands themselves.
                </p>
              </div>
            </div>

            <aside className="border-l-4 border-[#C29F60] bg-[#FAF5EC] p-7">
              <p className="text-sm font-semibold text-[#9A793D]">
                An important distinction
              </p>

              <h3 className="mt-3 text-2xl font-extrabold">
                Co-regulation is support, not control.
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                The aim is not to suppress emotion, stop all movement or achieve immediate compliance.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                The aim is to help the child remain connected enough to participate, recover, communicate and learn.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* PRACTICAL STRATEGIES */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Co-regulation strategies for educators
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Start by changing what the adult can control.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Co-regulation does not need to begin with a special resource or sensory tool. Sometimes the most useful change is in our pace, language, positioning or environment.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {PRACTICAL_STRATEGIES.map(
              (item) => (
                <article
                  key={item.title}
                  className="border-t border-[#D8CFC2] py-6"
                >
                  <h3 className="text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                    {item.text}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* NOT JUST CALMING */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                Beyond calm-down strategies
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Co-regulation is bigger than breathing cards and calm corners.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                Breathing activities, sensory tools and quiet spaces can all be useful. The problem comes when the strategy becomes the answer before we have understood the difficulty.
              </p>

              <p>
                A child may still struggle if the room remains too noisy, instructions keep coming too quickly, the transition is unpredictable or the adult is adding more pressure than the child can currently manage.
              </p>

              <p className="font-semibold text-white">
                Sometimes the most useful regulation strategy is changing what is happening around the child.
              </p>
            </div>
          </div>

          <div className="mt-10 border-y border-white/20 md:grid md:grid-cols-2">
            <StrategyNote
              title="A calm corner can help"
              text="But it should not become somewhere children are routinely sent away to regulate alone."
            />

            <StrategyNote
              title="Breathing can help"
              text="But controlled breathing during peak distress may become another instruction the child cannot manage."
              divided
            />

            <StrategyNote
              title="Sensory tools can help"
              text="But the tool should match the child and the reason they are struggling rather than becoming a generic response."
            />

            <StrategyNote
              title="Visual supports can help"
              text="But they work best when the child understands them and adults use them predictably."
              divided
            />
          </div>
        </div>
      </section>

      {/* ADULT STATE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                The educator is part of the environment
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Adult awareness is part of co-regulation.
              </h2>

              <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#53645D]">
                <p>
                  Educators do not need to be perfectly calm before supporting a child. They do benefit from noticing when their own stress is making them speak faster, add more words, move abruptly or become less flexible.
                </p>

                <p>
                  A small shift in the adult can change the interaction. Slowing down, lowering the voice, giving the child more processing time or asking a colleague for brief support can create enough space for a more thoughtful response.
                </p>
              </div>

              <Link
                href="/somatic-checkin"
                className="mt-7 inline-flex min-h-12 items-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
              >
                Try the free educator check-in
              </Link>
            </div>

            <aside className="border-l-4 border-[#C29F60] bg-[#FAF5EC] p-7">
              <p className="text-sm font-semibold text-[#9A793D]">
                Co-regulation does not require perfection
              </p>

              <p className="mt-4 text-xl font-extrabold leading-relaxed">
                Repair is part of healthy relationships too.
              </p>

              <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                An educator can recognise when a moment did not go well, reconnect with the child and try again. Children can learn from those experiences as well.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* TRANSITIONS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#9A793D]">
              Co-regulation during transitions
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Transitions reveal how much regulation demand a routine creates.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Pack-up, arrivals, group time, handovers and moving between indoor and outdoor play all require children to stop one thing, shift attention, hold information, cope with change and respond to adult expectations.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              When the same transition repeatedly leads to distress, running, refusal or conflict, it is worth examining the routine itself rather than automatically adding more reminders.
            </p>
          </div>

          <div className="mt-9 grid gap-x-10 md:grid-cols-2">
            {TRANSITION_QUESTIONS.map(
              (item) => (
                <article
                  key={item.title}
                  className="border-t border-[#D8CFC2] py-6"
                >
                  <h3 className="text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                    {item.text}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* WHOLE TEAM */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Whole-team co-regulation
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Consistency does not mean every educator responds identically.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                Good co-regulation is responsive. Different children and situations will require different responses. What matters is whether the team is making those decisions from shared principles.
              </p>

              <div className="mt-7 border-t border-[#D8CFC2]">
                <WholeTeamPoint
                  title="Shared language"
                  text="Educators understand ideas such as regulation load, co-regulation, sensory demand, executive function and participation."
                />

                <WholeTeamPoint
                  title="Shared principles"
                  text="The team understands that noticing and reducing unnecessary demand can be more useful than immediately adding instructions."
                />

                <WholeTeamPoint
                  title="Shared reflection"
                  text="Educators can discuss difficult moments without automatically blaming the child or the adult involved."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FREE LADDER */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                Put this thinking into practice
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                See how a Regulation Ladder helps a team widen the lens.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                The free Regulation Ladder shows the same situation from educator, manager and family perspectives so the response does not sit with one person or one strategy.
              </p>

              <Link
                href="/playbooks"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
              >
                Open the Free Regulation Ladder
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED CONTENT */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-7 max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Keep exploring
            </p>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Related early childhood regulation resources
            </h2>
          </div>

          <div className="border-t border-[#D8CFC2]">
            <RelatedLink
              href="/emotional-regulation-early-childhood"
              title="Emotional regulation in early childhood"
              text="Look at what children may be communicating through movement, shutdown, overwhelm and big emotional responses."
            />

            <RelatedLink
              href="/early-childhood-professional-development"
              title="Early childhood professional development"
              text="Explore what makes professional learning more likely to change everyday educator practice."
            />

            <RelatedLink
              href="/blog"
              title="Articles and free training"
              text="Explore more practical regulation, development and educator learning resources."
            />
          </div>
        </div>
      </section>

      {/* QUALITY PATHWAYS */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Quality and professional learning pathways
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Looking at how co-regulation fits your local early childhood system?
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                These pages provide additional information for teams considering professional development within different quality, funding and improvement systems.
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
                text="National Quality Standard and Quality Improvement Plan connections."
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

      {/* FAQ */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#657B6C]">
            Frequently asked questions
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Co-regulation FAQs for early childhood educators
          </h2>

          <div className="mt-8 border-t border-[#D8CFC2]">
            {FAQS.map((item) => (
              <details
                key={item.question}
                className="group border-b border-[#D8CFC2] py-5"
              >
                <summary className="cursor-pointer list-none text-base font-extrabold">
                  {item.question}
                </summary>

                <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#53645D]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl border-l-4 border-[#C29F60] pl-6">
            <p className="text-sm font-semibold text-[#657B6C]">
              About Robyn
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              Robyn Papworth
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Robyn is an Accredited Exercise Physiologist and Developmental Educator and the founder of Play Move Improve. Her work with early childhood teams focuses on regulation, movement, sensory processing, executive function, participation and practical co-regulation within everyday learning environments.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Understanding co-regulation is useful. Building shared practice across the whole team is where it starts to matter.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Regulator Champions helps early childhood teams notice what may sit underneath behaviour, reflect on difficult room moments and decide what to try next together.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/proposal?plan=full"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View the Full Regulator Champions Program
            </Link>
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-[#BFD0C8]">
            Six-month and twelve-month whole-team options are available.
          </p>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="max-w-4xl text-xs leading-5 text-[#75827D]">
            This page provides general professional learning information for early childhood educators. It is not individual clinical advice and should not be used to diagnose a child or assume that a particular behaviour has one specific cause.
          </p>
        </div>
      </section>
    </main>
  );
}

function StrategyNote({
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
          ? 'border-t border-white/20 md:border-l md:border-t-0'
          : ''
      }`}
    >
      <h3 className="text-xl font-extrabold text-white">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#C8D6D0]">
        {text}
      </p>
    </div>
  );
}

function WholeTeamPoint({
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

function RelatedLink({
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
      <h3 className="text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-2 max-w-4xl text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </Link>
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
      <h3 className="text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </Link>
  );
}