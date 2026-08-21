import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Early Childhood Professional Development | Educator Training & PD',

  description:
    'Explore practical early childhood professional development for educators and leaders, including emotional regulation, co-regulation, sensory processing, executive function, behaviour support and whole-team implementation.',

  alternates: {
    canonical:
      '/early-childhood-professional-development',
  },

  openGraph: {
    title:
      'Early Childhood Professional Development | Regulator Champions',
    description:
      'Practical professional learning for early childhood educators that strengthens regulation, co-regulation, educator judgement and whole-team practice.',
    url: '/early-childhood-professional-development',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Early Childhood Professional Development: Practical Learning That Changes Practice',
  description:
    'A practical guide to choosing early childhood professional development that builds educator capability, reflection and whole-team implementation.',
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
  inLanguage: 'en-AU',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id':
      'https://playmoveimprove-regulator-champions.vercel.app/early-childhood-professional-development',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:
        'What is early childhood professional development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Early childhood professional development includes learning that strengthens educator knowledge, confidence, judgement and everyday practice. It can include workshops, mentoring, reflective practice, online learning and whole-team professional learning.',
      },
    },
    {
      '@type': 'Question',
      name:
        'What are useful professional development topics for early childhood educators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Useful topics can include emotional regulation, co-regulation, executive function, sensory processing, inclusion, movement, transitions, participation, behaviour support and reflective practice.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Is online professional development effective for early childhood educators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Online professional learning can be effective when it is practical, relevant and connected to implementation and reflection. The key question is whether educators can apply the learning to everyday practice.',
      },
    },
    {
      '@type': 'Question',
      name:
        'How can leaders make early childhood professional development more useful?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Choose professional learning that responds to an identified need, give educators opportunities to trial the ideas, revisit the learning and create time for team reflection.',
      },
    },
  ],
};

const PD_TOPICS = [
  {
    title: 'Emotional regulation',
    text: 'Help educators recognise what dysregulation can look like and consider what children may need before, during and after difficult moments.',
    href:
      '/emotional-regulation-early-childhood',
  },
  {
    title: 'Co-regulation',
    text: 'Strengthen the way adults use relationship, language, pacing, environment and predictable support while children develop regulation skills.',
    href:
      '/co-regulation-early-childhood',
  },
  {
    title: 'Executive function',
    text: 'Build understanding of impulse control, working memory, flexible thinking, persistence, attention and the demands hidden inside everyday routines.',
  },
  {
    title: 'Sensory-informed practice',
    text: 'Recognise when noise, movement, touch, visual load, crowding or physical state may be increasing the demands placed on a child.',
  },
  {
    title: 'Transitions and participation',
    text: 'Look more closely at arrivals, pack-up, group time and movement between activities instead of assuming repeated difficulty is simply non-compliance.',
  },
  {
    title: 'Educator capacity building',
    text: 'Move beyond giving educators more strategies and strengthen their confidence, reflection and professional judgement.',
    href:
      '/educator-capacity-building',
  },
];

const GOOD_PD_SIGNS = [
  {
    title: 'It starts with an actual need',
    text: 'The topic connects directly with something educators or children are currently experiencing in the service.',
  },
  {
    title: 'It explains the why',
    text: 'Educators understand the developmental, sensory or regulation reasoning rather than only being handed another activity or strategy.',
  },
  {
    title: 'It fits real rooms',
    text: 'The learning makes sense within noisy, busy and imperfect early childhood environments.',
  },
  {
    title: 'It leaves room for judgement',
    text: 'Educators learn principles they can adapt rather than being told that one response will work for every child.',
  },
  {
    title: 'It includes implementation',
    text: 'Teams have an opportunity to try the learning, discuss what happened and decide what should change next.',
  },
  {
    title: 'It builds shared practice',
    text: 'The learning can become part of team conversations rather than sitting with the one educator who attended.',
  },
];

const BEFORE_YOU_BOOK = [
  'What are our educators actually finding difficult right now?',
  'Does this professional learning connect to an identified service or educator need?',
  'Will educators understand the reason behind the strategies being recommended?',
  'Can the learning be applied to our own rooms, routines and children?',
  'Will our team have opportunities to revisit the learning after trying it?',
  'How will we know whether educator practice has actually changed?',
];

const FAQS = [
  {
    question:
      'What is early childhood professional development?',
    answer:
      'Early childhood professional development includes learning that strengthens educator knowledge, skills, confidence and professional judgement. It can include workshops, mentoring, reflective practice, online learning and whole-team professional learning.',
  },
  {
    question:
      'What are useful professional development topics for early childhood educators?',
    answer:
      'Useful topics can include emotional regulation, co-regulation, executive function, sensory processing, movement, transitions, participation, behaviour support, inclusion and reflective practice.',
  },
  {
    question:
      'Is online professional development effective for early childhood educators?',
    answer:
      'Online professional learning can be effective when it is practical, relevant and supported by implementation and reflection. The delivery format matters less than whether educators can connect the learning to everyday practice.',
  },
  {
    question:
      'Should professional development be delivered to the whole team?',
    answer:
      'Whole-team professional learning can be particularly useful when a service wants shared language and more consistent practice. It also makes it easier for leaders to continue the conversation after the initial learning.',
  },
  {
    question:
      'How can leaders make professional development more useful?',
    answer:
      'Start with an identified need, give educators time to trial what they have learned, revisit the topic and create opportunities for team reflection rather than moving immediately to the next subject.',
  },
];

export default function EarlyChildhoodProfessionalDevelopmentPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              Early childhood professional development
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Professional development early childhood educators can actually use
            </h1>

            <p className="mt-5 max-w-3xl text-lg font-bold leading-relaxed text-[#F5EFE4]">
              The return on professional learning is what happens after the
              session finishes.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC]">
              Good early childhood professional development should do more than
              leave educators with a notebook full of ideas. It should help them
              understand what they are seeing, make better decisions in the
              moment and build confidence across everyday routines.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              That becomes particularly important around emotional regulation,
              transitions, sensory overload, participation, behaviour and the
              moments when children need adults to co-regulate with them.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Explore Regulator Champions
              </Link>

              <Link
                href="/director-review"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Tell me what your team needs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ROI / QUICK TEST */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-6 sm:p-7">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
              A simple test before booking PD
            </span>

            <p className="mt-3 max-w-4xl text-xl font-extrabold leading-relaxed text-[#1C3B34]">
              Will this professional learning help my educators make better
              decisions next Monday?
            </p>

            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#53645D]">
              If the answer is difficult to explain, the learning may still be
              interesting, but the return on your professional development
              investment may be harder to see.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT GOOD PD SHOULD DO */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Choosing professional development
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                The best PD helps educators think differently in real
                situations.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                Early childhood educators work in dynamic environments. A
                strategy that works beautifully for one child, room or routine
                may not work in exactly the same way somewhere else.
              </p>

              <p>
                That is why strong professional development should build
                understanding and professional judgement rather than simply
                provide a list of activities to copy.
              </p>

              <p>
                Educators need enough knowledge to understand why an approach
                may help and enough confidence to recognise when it needs to be
                adapted.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Professional development topics
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              What early childhood teams are often trying to strengthen.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {PD_TOPICS.map((topic) => {
              const card = (
                <>
                  <div className="mb-4 h-1 w-10 rounded-full bg-[#C29F60]" />

                  <h3 className="text-lg font-extrabold text-[#1C3B34]">
                    {topic.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                    {topic.text}
                  </p>

                  {topic.href && (
                    <span className="mt-4 inline-flex text-xs font-extrabold text-[#9A793D]">
                      Read the guide →
                    </span>
                  )}
                </>
              );

              return topic.href ? (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
                >
                  {card}
                </Link>
              ) : (
                <article
                  key={topic.title}
                  className="rounded-3xl border border-[#E6E2DC] bg-white p-6"
                >
                  {card}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ONE OFF VS CAPACITY */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
              Beyond one-off training
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Professional development has more impact when implementation is
              part of the learning.
            </h2>
          </div>

          <div className="mx-auto mt-9 grid max-w-5xl gap-5 md:grid-cols-2">
            <article className="rounded-4xl border border-white/10 bg-white/5 p-7">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#C8D6D0]">
                One-off information
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-white">
                “That was a great session.”
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[#C8D6D0]">
                Educators hear useful ideas, take notes and return to work, but
                may be left to work out by themselves how those ideas fit their
                rooms, routines and current pressures.
              </p>
            </article>

            <article className="rounded-4xl border-2 border-[#C29F60] bg-[#294C43] p-7">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#E4C98E]">
                Capacity-building learning
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-white">
                “We tried this. Here is what we noticed.”
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-[#D8E1DC]">
                Educators learn, apply, reflect, adjust and revisit the topic so
                the knowledge gradually becomes part of everyday practice.
              </p>
            </article>
          </div>

          <div className="mt-7 text-center">
            <Link
              href="/educator-capacity-building"
              className="inline-flex text-sm font-extrabold text-[#E4C98E] underline decoration-[#E4C98E]/40 underline-offset-4"
            >
              Read the Educator Capacity Building Guide
            </Link>
          </div>
        </div>
      </section>

      {/* GOOD PD */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              What practical PD looks like
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Six signs your professional learning has a better chance of
              changing practice.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {GOOD_PD_SIGNS.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6"
              >
                <h3 className="text-lg font-extrabold text-[#1C3B34]">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHOLE TEAM */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                Whole-service professional learning
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Professional development has more influence when the team can
                talk about it together.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                When one educator attends training, they can return enthusiastic
                and still struggle to influence what happens across the wider
                service.
              </p>

              <p>
                Whole-team professional learning gives educators shared
                language and gives leaders a stronger foundation for reflection
                and implementation conversations.
              </p>

              <p>
                This becomes particularly important for regulation and
                co-regulation because a child may interact with many different
                educators across the week.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BEFORE YOU BOOK */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Before you book PD
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
                Questions directors and educational leaders can ask.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                These questions can help you distinguish between professional
                learning that sounds interesting and learning that is more
                likely to support your current service priorities.
              </p>
            </div>

            <div className="space-y-3">
              {BEFORE_YOU_BOOK.map((question, index) => (
                <div
                  key={question}
                  className="flex gap-4 rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C29F60] text-xs font-extrabold text-[#1C3B34]">
                    {index + 1}
                  </span>

                  <p className="pt-1 text-sm font-semibold leading-relaxed text-[#53645D]">
                    {question}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REGULATOR CHAMPIONS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
                Regulator Champions
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                A progressive whole-service pathway for regulation and
                co-regulation practice.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#D8E1DC]">
              <p>
                Regulator Champions was designed for early childhood teams that
                need more than another list of behaviour or regulation
                strategies.
              </p>

              <p>
                The Regulation Ladders progressively build educator
                understanding around what children&apos;s bodies may be
                communicating, what may sit underneath behaviour and how the
                environment and adult response can influence what happens next.
              </p>

              <p>
                Teams can apply the learning to real routines, reflect together
                and build a shared way of making decisions across the service.
              </p>
            </div>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="text-sm font-extrabold text-[#E4C98E]">
                01
              </span>

              <h3 className="mt-2 text-lg font-extrabold text-white">
                Developmentally informed
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#C8D6D0]">
                Connect regulation with sensory processing, movement, executive
                function and participation.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="text-sm font-extrabold text-[#E4C98E]">
                02
              </span>

              <h3 className="mt-2 text-lg font-extrabold text-white">
                Designed for real rooms
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#C8D6D0]">
                Apply learning to arrivals, transitions, group time, sensory
                overload, distress and other everyday pressure points.
              </p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="text-sm font-extrabold text-[#E4C98E]">
                03
              </span>

              <h3 className="mt-2 text-lg font-extrabold text-white">
                Built for reflection
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#C8D6D0]">
                Give educators time to notice, trial, review and make the next
                practical adjustment.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-8 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Funding early childhood professional development
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Looking at government-funded professional learning?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Services considering Regulator Champions can explore our
              dedicated information for Victorian School Readiness Funding and
              Queensland Kindy Uplift planning.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Link
              href="/school-readiness-funding"
              className="rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-7 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Victoria
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
                School Readiness Funding
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                Explore priority-area connections, pricing and procurement
                information for Victorian kindergarten services.
              </p>
            </Link>

            <Link
              href="/kindy-uplift"
              className="rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-7 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Queensland
              </span>

              <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
                Kindy Uplift
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                Explore Kindy Uplift priority-area connections, educator
                capability and procurement information.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
            Frequently asked questions
          </span>

          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
            Early childhood professional development FAQs
          </h2>

          <div className="mt-7 space-y-3">
            {FAQS.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-[#E6E2DC] bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-sm font-extrabold text-[#1C3B34]">
                  {item.question}
                </summary>

                <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* AUTHOR */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-7 sm:p-9">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              About the author
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
              Robyn Papworth
            </h2>

            <p className="mt-4 max-w-4xl text-sm leading-relaxed text-[#53645D]">
              Robyn is an Accredited Exercise Physiologist and Developmental
              Educator and the founder of Play Move Improve. Her work with early
              childhood educators focuses on making developmental, movement,
              sensory, regulation and executive-function knowledge practical
              within real learning environments.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Regulator Champions
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Looking for professional development your whole team can keep using?
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC]">
            Regulator Champions gives early childhood services a progressive
            pathway for strengthening educator confidence in regulation,
            co-regulation, sensory needs, participation and everyday
            decision-making.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Start with the 3 Ladder Preview
            </Link>

            <Link
              href="/proposal?plan=full"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View the Full 8 Ladder Pathway
            </Link>
          </div>

          <Link
            href="/director-review"
            className="mt-5 inline-flex text-sm font-bold text-[#E4C98E] underline decoration-[#E4C98E]/40 underline-offset-4"
          >
            Not sure which pathway fits your team?
          </Link>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="max-w-4xl text-[11px] leading-5 text-[#75827D]">
            This page provides general professional learning information for
            early childhood services. Professional development should be chosen
            in response to your educators, children, service context and
            identified improvement priorities.
          </p>
        </div>
      </section>
    </main>
  );
}