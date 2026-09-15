import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Early Childhood Professional Development | Educator & Child Care Training',

  description:
    'Practical early childhood professional development for educators, child care staff, preschool teachers and leaders. Explore regulation, co-regulation, sensory processing, executive function, behaviour support and whole-team implementation.',

  alternates: {
    canonical:
      '/early-childhood-professional-development',
  },

  openGraph: {
    title:
      'Early Childhood Professional Development | Regulator Champions',
    description:
      'Practical professional learning for early childhood educators, child care teams and preschool staff that strengthens regulation, co-regulation, educator judgement and whole-team practice.',
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
  inLanguage: 'en',
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
        text:
          'Early childhood professional development includes learning that strengthens educator knowledge, confidence, judgement and everyday practice. It can include workshops, mentoring, reflective practice, online learning and whole-team professional learning.',
      },
    },
    {
      '@type': 'Question',
      name:
        'What are useful professional development topics for early childhood educators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Useful topics can include emotional regulation, co-regulation, executive function, sensory processing, inclusion, movement, transitions, participation, behaviour support and reflective practice.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Is online professional development effective for early childhood educators?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Online professional learning can be useful when it is practical, relevant and connected to implementation and reflection. The key question is whether educators can apply the learning to everyday practice.',
      },
    },
    {
      '@type': 'Question',
      name:
        'How can leaders make early childhood professional development more useful?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Choose professional learning that responds to an identified need, give educators opportunities to trial the ideas, revisit the learning and create time for team reflection.',
      },
    },
  ],
};

const PD_TOPICS = [
  {
    title: 'Emotional regulation',
    text:
      'Help educators recognise what dysregulation can look like and consider what children may need before, during and after difficult moments.',
    href:
      '/emotional-regulation-early-childhood',
  },
  {
    title: 'Co-regulation',
    text:
      'Strengthen the way adults use relationship, language, pacing, environment and predictable support while children develop regulation skills.',
    href:
      '/co-regulation-early-childhood',
  },
  {
    title: 'Executive function',
    text:
      'Build understanding of impulse control, working memory, flexible thinking, persistence, attention and the demands hidden inside everyday routines.',
  },
  {
    title: 'Sensory-informed practice',
    text:
      'Recognise when noise, movement, touch, visual load, crowding or physical state may be increasing the demands placed on a child.',
  },
  {
    title: 'Transitions and participation',
    text:
      'Look more closely at arrivals, pack-up, group time and movement between activities instead of assuming repeated difficulty is simply non-compliance.',
  },
  {
    title: 'Educator capacity building',
    text:
      'Move beyond giving educators more strategies and strengthen their confidence, reflection and professional judgement.',
    href:
      '/educator-capacity-building',
  },
];

const GOOD_PD_SIGNS = [
  {
    title: 'It starts with an actual need',
    text:
      'The topic connects directly with something educators or children are currently experiencing.',
  },
  {
    title: 'It explains the why',
    text:
      'Educators understand the developmental, sensory or regulation reasoning rather than only being handed another activity or strategy.',
  },
  {
    title: 'It fits real rooms',
    text:
      'The learning makes sense within noisy, busy and imperfect early childhood environments.',
  },
  {
    title: 'It leaves room for judgement',
    text:
      'Educators learn principles they can adapt rather than being told that one response will work for every child.',
  },
  {
    title: 'It includes implementation',
    text:
      'Teams have an opportunity to try the learning, discuss what happened and decide what should change next.',
  },
  {
    title: 'It builds shared practice',
    text:
      'The learning can become part of team conversations rather than sitting with the one educator who attended.',
  },
];

const BEFORE_YOU_BOOK = [
  'What are our educators actually finding difficult right now?',
  'Does this professional learning connect to an identified team or program need?',
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
      'Online professional learning can be useful when it is practical, relevant and supported by implementation and reflection. The delivery format matters less than whether educators can connect the learning to everyday practice.',
  },
  {
    question:
      'Should professional development be delivered to the whole team?',
    answer:
      'Whole-team professional learning can be particularly useful when an organisation wants shared language and more consistent practice. It also makes it easier for leaders to continue the conversation after the initial learning.',
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
              Early childhood professional development
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Professional development early childhood educators can actually use.
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              The return on professional learning is what happens after the session finishes.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Good professional development should do more than leave educators with a notebook full of ideas. It should help them understand what they are seeing, make better decisions in difficult moments and build confidence across everyday routines.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              That becomes particularly important around emotional regulation, transitions, sensory overload, participation, behaviour and the moments when children need adults to co-regulate with them.
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

      {/* QUICK TEST */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <p className="text-sm font-semibold text-[#9A793D]">
              A simple question before booking professional development
            </p>

            <p className="mt-3 max-w-4xl text-2xl font-extrabold leading-relaxed">
              Will this learning help my educators make better decisions next week?
            </p>

            <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#53645D]">
              If the answer is difficult to explain, the learning may still be interesting, but it may be harder to see how it will change everyday practice.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT GOOD PD SHOULD DO */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Choosing professional development
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                The best professional learning helps educators think differently in real situations.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                Early childhood educators work in dynamic environments. A strategy that works beautifully for one child, room or routine may not work in exactly the same way somewhere else.
              </p>

              <p>
                Strong professional development therefore needs to build understanding and professional judgement rather than simply provide another list of activities to copy.
              </p>

              <p>
                Educators need enough knowledge to understand why an approach may help, and enough confidence to recognise when something needs to be adapted for the child, group or environment in front of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Professional development topics
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              What early childhood teams are often trying to strengthen.
            </h2>
          </div>

          <div className="grid gap-x-10 md:grid-cols-2">
            {PD_TOPICS.map((topic) => {
              const content = (
                <>
                  <h3 className="text-xl font-extrabold">
                    {topic.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                    {topic.text}
                  </p>

                  {topic.href && (
                    <span className="mt-4 inline-flex text-sm font-bold text-[#9A793D]">
                      Read more
                    </span>
                  )}
                </>
              );

              return topic.href ? (
                <Link
                  key={topic.title}
                  href={topic.href}
                  className="border-t border-[#D8CFC2] py-6 transition hover:border-[#C29F60]"
                >
                  {content}
                </Link>
              ) : (
                <article
                  key={topic.title}
                  className="border-t border-[#D8CFC2] py-6"
                >
                  {content}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                Beyond one-off training
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Professional development has more impact when implementation is part of the learning.
              </h2>
            </div>

            <div className="space-y-6">
              <div className="border-t border-white/20 pt-5">
                <h3 className="text-2xl font-extrabold">
                  “That was a great session.”
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#C8D6D0]">
                  Educators hear useful ideas, take notes and return to work, but may be left to work out by themselves how those ideas fit their rooms, routines and current pressures.
                </p>
              </div>

              <div className="border-t border-[#C29F60] pt-5">
                <h3 className="text-2xl font-extrabold text-[#E4C98E]">
                  “We tried this. Here is what we noticed.”
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#D8E1DC]">
                  Educators learn, apply, reflect, adjust and revisit the topic so the knowledge gradually becomes part of everyday practice.
                </p>
              </div>

              <Link
                href="/educator-capacity-building"
                className="inline-flex text-sm font-extrabold text-[#E4C98E] underline decoration-[#E4C98E]/40 underline-offset-4"
              >
                Read the Educator Capacity Building Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GOOD PD */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              What practical professional development looks like
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Six signs your professional learning has a better chance of changing practice.
            </h2>
          </div>

          <div className="grid gap-x-10 md:grid-cols-2">
            {GOOD_PD_SIGNS.map((item) => (
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
            ))}
          </div>
        </div>
      </section>

      {/* WHOLE TEAM */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                Whole-team professional learning
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Professional development has more influence when the team can talk about it together.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                When one educator attends training, they can return enthusiastic and still struggle to influence what happens across the wider team.
              </p>

              <p>
                Whole-team professional learning gives educators shared language and gives leaders a stronger foundation for reflection and implementation conversations.
              </p>

              <p>
                This becomes particularly important for regulation and co-regulation because a child may interact with many different educators across the week.
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
              <p className="text-sm font-semibold text-[#657B6C]">
                Before you book professional development
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                Questions directors and educational leaders can ask.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                These questions can help you distinguish between professional learning that sounds interesting and learning that is more likely to support your current priorities.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              {BEFORE_YOU_BOOK.map(
                (question, index) => (
                  <div
                    key={question}
                    className="grid grid-cols-[auto_1fr] gap-4 border-b border-[#D8CFC2] py-5"
                  >
                    <span className="font-extrabold text-[#9A793D]">
                      {index + 1}.
                    </span>

                    <p className="text-base font-semibold leading-relaxed text-[#53645D]">
                      {question}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REGULATOR CHAMPIONS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                Regulator Champions
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Ongoing support for teams that need more than another list of regulation strategies.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                Regulator Champions helps early childhood teams notice what may be happening underneath behaviour, think about the environment and adult response, and decide what might be worth trying next.
              </p>

              <p>
                Regulation Ladders provide a practical starting point, while recordings, reflection resources and ongoing support help teams go deeper when they have the capacity.
              </p>

              <p>
                The aim is not for every educator to complete another large course. It is to give the team something useful to return to when real situations arise.
              </p>
            </div>
          </div>

          <div className="mt-10 border-y border-white/20 md:grid md:grid-cols-3">
            <ProgramPoint
              title="Developmentally informed"
              text="Connect regulation with sensory processing, movement, executive function and participation."
            />

            <ProgramPoint
              title="Designed for real rooms"
              text="Apply learning to arrivals, transitions, group experiences, sensory overload, distress and other everyday pressure points."
              divided
            />

            <ProgramPoint
              title="Built for reflection"
              text="Give educators time to notice, trial, review and make the next practical adjustment."
              divided
            />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/proposal?plan=preview"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-white/20 px-6 py-3.5 text-sm font-bold text-white"
            >
              View Program Options
            </Link>
          </div>
        </div>
      </section>

      {/* LOCATION PATHWAYS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Quality and professional learning pathways
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                Looking at how this fits your local early childhood system?
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                The core professional learning can be used internationally. These pages explain some of the quality, professional development and funding language that may be relevant where your team is based.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              <LocationLink
                href="/us-early-childhood-quality"
                title="United States"
                text="Professional development, NAEYC, Developmentally Appropriate Practice and quality improvement."
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
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#657B6C]">
            Frequently asked questions
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Early childhood professional development FAQs
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
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl border-l-4 border-[#C29F60] pl-6">
            <p className="text-sm font-semibold text-[#657B6C]">
              About Robyn
            </p>

            <h2 className="mt-2 text-2xl font-extrabold">
              Robyn Papworth
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Robyn is an Accredited Exercise Physiologist and Developmental Educator and the founder of Play Move Improve. Her work with early childhood educators focuses on making developmental, movement, sensory, regulation and executive-function knowledge practical within real learning environments.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Looking for professional development your whole team can keep using?
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Start with a free Regulation Ladder to see how the approach works, or explore the six-month and twelve-month Regulator Champions options for whole-team support.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              Open the Free Regulation Ladder
            </Link>

            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white"
            >
              View Program Options
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="max-w-4xl text-xs leading-5 text-[#75827D]">
            This page provides general professional learning information for early childhood teams. Professional development should be chosen in response to your educators, children, local requirements and identified improvement priorities.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProgramPoint({
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