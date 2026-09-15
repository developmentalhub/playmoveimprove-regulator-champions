import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Educator Capacity Building in Early Childhood | Regulator Champions',

  description:
    'Learn what educator capacity building means in early childhood and how professional learning can strengthen regulation, co-regulation, reflective practice, team consistency and educator confidence.',

  alternates: {
    canonical: '/educator-capacity-building',
  },

  openGraph: {
    title:
      'Educator Capacity Building in Early Childhood | Regulator Champions',
    description:
      'A practical guide for early childhood leaders who want professional learning to create real changes in educator confidence, co-regulation, reflective practice and everyday decisions.',
    url: '/educator-capacity-building',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Educator Capacity Building in Early Childhood: From Professional Learning to Practice Change',
  description:
    'A practical guide for early childhood leaders building educator capability through professional learning, reflection, co-regulation and whole-team implementation.',
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
      'https://playmoveimprove-regulator-champions.vercel.app/educator-capacity-building',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:
        'What does educator capacity building mean in early childhood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Educator capacity building means strengthening the knowledge, judgement, confidence and practical skills educators use in everyday work. The aim is not simply to provide more information, but to help educators apply learning more effectively in real situations.',
      },
    },
    {
      '@type': 'Question',
      name:
        'How is capacity building different from a one-off professional development session?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'A professional development session can contribute to capacity building, but capacity building also involves implementation, reflection, discussion and opportunities to revisit what has been learned over time.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Why is whole-team professional learning important?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Children interact with multiple educators. Shared professional learning can create more consistent language, principles and decision-making while still allowing educators to respond to individual children.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Can educator capacity building support behaviour guidance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. Capacity building can strengthen the way educators interpret behaviour, notice environmental and developmental factors, use co-regulation and choose responses that match the situation rather than relying on one standard behaviour strategy.',
      },
    },
  ],
};

const CAPACITY_SIGNS = [
  {
    title: 'Educators notice earlier',
    text:
      'Teams begin recognising changes in body language, participation, sensory load, movement and emotional capacity before behaviour escalates.',
  },
  {
    title: 'Educators ask better questions',
    text:
      'Instead of moving immediately to “How do we stop this?”, the team becomes more likely to ask what may be contributing to the difficulty.',
  },
  {
    title: 'Responses become more thoughtful',
    text:
      'Educators consider the environment, transition, expectations and adult response rather than relying only on consequences or repeated instructions.',
  },
  {
    title: 'Teams use shared language',
    text:
      'Educators can talk about regulation, sensory demand, executive function, participation and co-regulation using a common frame of reference.',
  },
  {
    title: 'Reflection changes practice',
    text:
      'Professional reflection moves beyond describing what happened and starts influencing what the team will do differently next time.',
  },
  {
    title: 'Leadership can see implementation',
    text:
      'Directors and educational leaders can identify actual changes in everyday practice rather than relying only on attendance certificates.',
  },
];

const WHY_PD_FAILS = [
  {
    title: 'Too much information at once',
    text:
      'A long training session may contain excellent information, but educators can struggle to decide what is most important to use the next morning.',
  },
  {
    title: 'No link to real pressure points',
    text:
      'Professional learning can feel interesting without changing practice if it is not connected to the transitions, behaviour and participation challenges educators actually experience.',
  },
  {
    title: 'Everyone interprets it differently',
    text:
      'When educators return to separate rooms without shared discussion, the same training can lead to very different approaches across a team.',
  },
  {
    title: 'No time to revisit the learning',
    text:
      'Without reflection and follow-up, new information is easily replaced by the urgency of everyday routines.',
  },
];

const LEADERSHIP_QUESTIONS = [
  'What are our educators repeatedly finding difficult?',
  'What do we want educators to notice that they may currently be missing?',
  'What would we like them to understand differently?',
  'What changes should we expect to see in everyday practice?',
  'How will educators have time to discuss and revisit the learning?',
  'How will we know whether professional learning has actually built capability?',
];

const FAQS = [
  {
    question:
      'What does educator capacity building mean in early childhood?',
    answer:
      'Educator capacity building means strengthening the knowledge, judgement, confidence and practical skills educators use in everyday work. The aim is not simply to provide more information, but to help educators apply learning more effectively in real situations.',
  },
  {
    question:
      'How is capacity building different from a one-off professional development session?',
    answer:
      'A professional development session can contribute to capacity building, but capacity building also involves implementation, reflection, discussion and opportunities to revisit what has been learned over time.',
  },
  {
    question:
      'Why is whole-team professional learning important?',
    answer:
      'Children interact with multiple educators. Shared professional learning can create more consistent language, principles and decision-making while still allowing educators to respond to individual children.',
  },
  {
    question:
      'Can educator capacity building support behaviour guidance?',
    answer:
      'Yes. Capacity building can strengthen the way educators interpret behaviour, notice environmental and developmental factors, use co-regulation and choose responses that match the situation rather than relying on one standard behaviour strategy.',
  },
];

export default function EducatorCapacityBuildingPage() {
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
              Early childhood leadership
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Educator capacity building in early childhood
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              Professional learning should change what educators notice, not just what they know.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Educator capacity building is about strengthening the knowledge, confidence and professional judgement educators can draw on in real moments with children.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              The return on professional learning comes when educators start noticing earlier, discussing situations differently and making more thoughtful decisions in everyday practice.
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

      {/* QUICK DEFINITION */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <p className="text-sm font-semibold text-[#9A793D]">
              What is educator capacity building?
            </p>

            <p className="mt-3 max-w-4xl text-lg font-semibold leading-relaxed">
              Educator capacity building is the process of strengthening educators&apos; knowledge, confidence, professional judgement and practical ability so they can respond more effectively to children, families and everyday teaching situations.
            </p>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE VS CAPABILITY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                The difference that matters
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Knowing about regulation is not the same as knowing what to do at 4:20 in the afternoon.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                An educator may understand the definition of co-regulation and still feel unsure when a child is screaming at drop-off, running around during pack-up or refusing to join group time.
              </p>

              <p>
                Capacity develops when knowledge becomes usable. Educators need opportunities to connect ideas with real children, real rooms, real routines and the constraints of a busy early childhood setting.
              </p>

              <p>
                Good professional learning therefore needs to do more than explain a concept. It needs to help educators recognise when the concept matters and what it could change in practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              What improvement can look like
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Six signs professional learning is actually building educator capacity.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              The strongest evidence is not always another certificate. Look at what starts changing in conversations, decisions and everyday practice.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {CAPACITY_SIGNS.map((item) => (
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

      {/* IMPLEMENTATION GAP */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                The implementation gap
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Why good professional development sometimes changes very little.
              </h2>
            </div>

            <div className="border-t border-white/20">
              {WHY_PD_FAILS.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-white/20 py-5"
                >
                  <h3 className="text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-base leading-relaxed text-[#C8D6D0]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REAL EXAMPLE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              A simple example
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The difference between giving educators a strategy and building their judgement.
            </h2>
          </div>

          <div className="mt-9 border-y border-[#D8CFC2] md:grid md:grid-cols-2">
            <div className="py-7 md:pr-8">
              <p className="text-sm font-semibold text-[#657B6C]">
                Strategy only
              </p>

              <h3 className="mt-3 text-2xl font-extrabold">
                “Use a movement break before group time.”
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                The educator now has another activity to remember. It may work sometimes and fail completely at other times.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2] py-7 md:border-l md:border-t-0 md:pl-8">
              <p className="text-sm font-semibold text-[#9A793D]">
                Capacity building
              </p>

              <h3 className="mt-3 text-2xl font-extrabold">
                “What is the child&apos;s body telling us before group time?”
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                The educator can now look at movement needs, sensory load, attention, transition demands, fatigue and the environment before deciding whether movement is actually the useful response.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                For directors and educational leaders
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start professional learning with the problem you actually need to solve.
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                Choosing professional learning becomes easier when the team can clearly articulate the capability gap first.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              {LEADERSHIP_QUESTIONS.map(
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
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                The Regulator Champions approach
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Build the ability to notice before adding more strategies.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                Regulator Champions was built around a simple problem. Educators are often given more strategies when what they actually need is greater confidence understanding the moment in front of them.
              </p>

              <p>
                Regulation Ladders help teams build shared understanding around regulation, co-regulation, sensory needs, participation, transitions and the adult role.
              </p>

              <p>
                Teams can then apply the learning to real situations, reflect on what happened and return to the support when another difficult moment arises.
              </p>
            </div>
          </div>

          <div className="mt-10 border-y border-[#D8CFC2] md:grid md:grid-cols-3">
            <ProgramStep
              title="Learn"
              text="Build shared understanding around one area of everyday regulation practice."
            />

            <ProgramStep
              title="Apply"
              text="Connect the learning with real routines, children, environments and educator experiences."
              divided
            />

            <ProgramStep
              title="Reflect"
              text="Return to what happened, what changed and what the team wants to keep developing."
              divided
            />
          </div>

          <div className="mt-8">
            <Link
              href="/playbooks"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
            >
              See a Free Regulation Ladder
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED CONTENT */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Related professional learning
            </p>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Explore the ideas behind educator capacity.
            </h2>
          </div>

          <div className="mt-7 border-t border-[#D8CFC2]">
            <RelatedLink
              href="/co-regulation-early-childhood"
              title="Co-regulation in early childhood"
              text="Understand the role adults, relationships and environments play while children develop regulation skills."
            />

            <RelatedLink
              href="/emotional-regulation-early-childhood"
              title="Emotional regulation in early childhood"
              text="Explore what children may be communicating through movement, overload, shutdown and strong emotional responses."
            />

            <RelatedLink
              href="/early-childhood-professional-development"
              title="Early childhood professional development"
              text="Explore what makes professional learning more likely to influence everyday educator practice."
            />
          </div>
        </div>
      </section>

      {/* LOCATION PATHWAYS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Quality and professional learning pathways
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Looking at educator capability within your local early childhood system?
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                The core Regulator Champions program can be used internationally. These pages explain some of the quality, professional development and funding language that may be relevant where your team is based.
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
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#657B6C]">
            Frequently asked questions
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
            Educator capacity building FAQs
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

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Build educator confidence around the moments your team is actually finding difficult.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Regulator Champions gives early childhood teams practical Regulation Ladders, recordings, reflection resources and ongoing support so professional learning can keep being used after the initial session finishes.
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
            This page provides general professional learning information for early childhood teams. Professional learning should be selected and implemented in response to the needs of your educators, children, local requirements and organisational context.
          </p>
        </div>
      </section>
    </main>
  );
}

function ProgramStep({
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
          ? 'border-t border-[#D8CFC2] md:border-l md:border-t-0'
          : ''
      }`}
    >
      <h3 className="text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#53645D]">
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