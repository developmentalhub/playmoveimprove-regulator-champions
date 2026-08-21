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
      'A practical guide for early childhood leaders who want professional learning to create real changes in educator confidence, co-regulation, reflective practice and everyday room decisions.',
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
  inLanguage: 'en-AU',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id':
      'https://playmoveimprove-regulator-champions.vercel.app/educator-capacity-building',
  },
};

const CAPACITY_SIGNS = [
  {
    title: 'Educators notice earlier',
    text: 'Teams begin recognising changes in body language, participation, sensory load, movement and emotional capacity before behaviour escalates.',
  },
  {
    title: 'Educators ask better questions',
    text: 'Instead of moving immediately to “How do we stop this?”, the team becomes more likely to ask what may be contributing to the difficulty.',
  },
  {
    title: 'Responses become more thoughtful',
    text: 'Educators consider the environment, transition, expectations and adult response rather than relying only on consequences or repeated instructions.',
  },
  {
    title: 'Teams use shared language',
    text: 'Educators can talk about regulation, sensory demand, executive function, participation and co-regulation using a common frame of reference.',
  },
  {
    title: 'Reflection changes practice',
    text: 'Professional reflection moves beyond describing what happened and starts influencing what the team will do differently next time.',
  },
  {
    title: 'Leadership can see implementation',
    text: 'Directors and educational leaders can identify actual changes in room practice rather than relying only on attendance certificates.',
  },
];

const WHY_PD_FAILS = [
  {
    title: 'Too much information at once',
    text: 'A long training session may contain excellent information, but educators can struggle to decide what is most important to use the next morning.',
  },
  {
    title: 'No link to real room pressure points',
    text: 'Professional learning can feel interesting without changing practice if it is not connected to the transitions, behaviour and participation challenges educators actually experience.',
  },
  {
    title: 'Everyone interprets it differently',
    text: 'When educators return to separate rooms without shared discussion, the same training can lead to very different approaches across the service.',
  },
  {
    title: 'No time to revisit the learning',
    text: 'Without reflection and follow-up, new information is easily replaced by the urgency of everyday routines.',
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
      'Children interact with multiple educators across a service. Shared professional learning can create more consistent language, principles and decision-making while still allowing educators to respond to individual children.',
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
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              Early childhood leadership
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Educator capacity building in early childhood
            </h1>

            <p className="mt-5 max-w-3xl text-lg font-bold leading-relaxed text-[#F5EFE4]">
              Professional learning should change what educators notice, not
              just what they know.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC]">
              Educator capacity building is about strengthening the knowledge,
              confidence and professional judgement educators can draw on in
              real moments with children.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              For early childhood services, the return on professional learning
              comes when educators start noticing earlier, discussing situations
              differently and making more thoughtful decisions in everyday
              practice.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Explore the 3 Ladder Preview
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

      {/* QUICK DEFINITION */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-6 sm:p-7">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
              What is educator capacity building?
            </span>

            <p className="mt-3 max-w-4xl text-base font-semibold leading-relaxed text-[#1C3B34]">
              Educator capacity building is the process of strengthening
              educators&apos; knowledge, confidence, professional judgement and
              practical ability so they can respond more effectively to
              children, families and everyday teaching situations.
            </p>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE VS CAPABILITY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                The difference that matters
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Knowing about regulation is not the same as knowing what to do
                at 4:20 in the afternoon.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                An educator may understand the definition of co-regulation and
                still feel unsure when a child is screaming at drop-off, running
                around the room during pack-up or refusing to join group time.
              </p>

              <p>
                Capacity develops when knowledge becomes usable. Educators need
                opportunities to connect ideas with real children, real rooms,
                real routines and the constraints of a busy early childhood
                setting.
              </p>

              <p>
                That is why good professional learning needs to do more than
                explain a concept. It needs to help educators recognise when the
                concept matters and what it could change in practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNS CAPACITY IS BUILDING */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              What improvement can look like
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Six signs professional learning is actually building educator
              capacity.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              The strongest evidence is not always another certificate. Look at
              what starts changing in conversations and room practice.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {CAPACITY_SIGNS.map((item) => (
              <article
                key={item.title}
                className="rounded-3xl border border-[#E6E2DC] bg-white p-6"
              >
                <div className="mb-4 h-1 w-10 rounded-full bg-[#C29F60]" />

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

      {/* WHY PD FAILS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
                The implementation gap
              </span>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Why good professional development sometimes changes very
                little.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {WHY_PD_FAILS.map((item) => (
                <article
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  <h3 className="text-lg font-extrabold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#C8D6D0]">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REAL EXAMPLE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              A simple example
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              The difference between giving educators a strategy and building
              their judgement.
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <article className="rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-7">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#657B6C]">
                  Strategy only
                </span>

                <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                  “Use a movement break before group time.”
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#6A7873]">
                  The educator now has another activity to remember. It may work
                  sometimes and fail completely at other times.
                </p>
              </article>

              <article className="rounded-4xl border-2 border-[#C29F60] bg-[#FAF5EC] p-7">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                  Capacity building
                </span>

                <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                  “What is the child&apos;s body telling us before group time?”
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                  The educator can now look at movement needs, sensory load,
                  attention, transition demands, fatigue and the environment
                  before deciding whether movement is actually the useful
                  response.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                For directors and educational leaders
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Start professional learning with the problem you actually need
                to solve.
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                Choosing professional learning becomes easier when the service
                can clearly articulate the capability gap first.
              </p>
            </div>

            <div className="space-y-3">
              {LEADERSHIP_QUESTIONS.map((question, index) => (
                <div
                  key={question}
                  className="flex gap-4 rounded-2xl border border-[#E6E2DC] bg-white p-5"
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
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                The Regulator Champions approach
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Build the ability to notice before adding more strategies.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                Regulator Champions was built around a simple problem. Educators
                are often given more strategies when what they actually need is
                greater confidence understanding the moment in front of them.
              </p>

              <p>
                The Regulation Ladders help teams progressively build shared
                understanding around regulation, co-regulation, sensory needs,
                participation, transitions and the adult role.
              </p>

              <p>
                That means the professional learning can be discussed, applied
                and revisited instead of being delivered once and forgotten.
              </p>
            </div>
          </div>

          <div className="mt-9 grid gap-4 md:grid-cols-3">
            <article className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6">
              <span className="text-sm font-extrabold text-[#C29F60]">
                01
              </span>

              <h3 className="mt-2 text-lg font-extrabold text-[#1C3B34]">
                Learn
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Build shared understanding around one area of everyday
                regulation practice.
              </p>
            </article>

            <article className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6">
              <span className="text-sm font-extrabold text-[#C29F60]">
                02
              </span>

              <h3 className="mt-2 text-lg font-extrabold text-[#1C3B34]">
                Apply
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Connect the learning with real routines, children, environments
                and educator experiences.
              </p>
            </article>

            <article className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6">
              <span className="text-sm font-extrabold text-[#C29F60]">
                03
              </span>

              <h3 className="mt-2 text-lg font-extrabold text-[#1C3B34]">
                Reflect
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Return to what happened, what changed and what the team wants to
                keep developing.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* INTERNAL SEO LINKS */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-7">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Related professional learning
            </span>

            <h2 className="mt-2 text-2xl font-extrabold text-[#1C3B34] sm:text-3xl">
              Explore the ideas behind educator capacity.
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/co-regulation-early-childhood"
              className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Co-regulation
              </span>

              <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                Co-regulation in early childhood
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Understand the role adults, relationships and environments play
                while children develop regulation skills.
              </p>
            </Link>

            <Link
              href="/emotional-regulation-early-childhood"
              className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Emotional regulation
              </span>

              <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                Emotional regulation in early childhood
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Explore what children may be communicating through movement,
                overload, shutdown and strong emotional responses.
              </p>
            </Link>

            <Link
              href="/feed"
              className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Practice
              </span>

              <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                Early childhood practice scenarios
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Give your team realistic scenarios for practising reflective
                professional judgement.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="rounded-4xl border border-[#E6E2DC] bg-[#FAF5EC] p-7 sm:p-9">
            <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                  Funding educator capability
                </span>

                <h2 className="mt-3 text-2xl font-extrabold text-[#1C3B34] sm:text-3xl">
                  Is educator capability part of your service improvement plan?
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  Services considering Regulator Champions can explore our
                  information for Victorian School Readiness Funding and
                  Queensland Kindy Uplift planning.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/school-readiness-funding"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
                >
                  Victorian SRF information
                </Link>

                <Link
                  href="/kindy-uplift"
                  className="flex min-h-12 items-center justify-center rounded-xl border border-[#D8D0C4] bg-white px-5 py-3 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
                >
                  Queensland Kindy Uplift
                </Link>
              </div>
            </div>
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
            Educator capacity building FAQs
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

      {/* CONVERSION */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Regulator Champions
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Build educator confidence around the moments your team is actually
            finding difficult.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC]">
            Regulator Champions gives early childhood services a progressive
            whole-team pathway for strengthening regulation knowledge,
            professional judgement and everyday practice.
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
            Not sure which pathway fits your service?
          </Link>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="max-w-4xl text-[11px] leading-5 text-[#75827D]">
            This page provides general professional learning information for
            early childhood services. Professional learning should be selected
            and implemented in response to the needs of your educators,
            children and service context.
          </p>
        </div>
      </section>
    </main>
  );
}