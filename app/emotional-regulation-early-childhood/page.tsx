import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Emotional Regulation in Early Childhood | Educator Strategies',

  description:
    'Understand emotional regulation in early childhood through a practical educator lens. Learn what children may be communicating through behaviour, sensory overload, shutdown, movement and stress responses.',

  alternates: {
    canonical:
      '/emotional-regulation-early-childhood',
  },

  openGraph: {
    title:
      'Emotional Regulation in Early Childhood | Regulator Champions',
    description:
      'A practical guide for early childhood educators, child care staff and preschool teachers who want to understand what may sit underneath behaviour and support regulation through connection, environment and thoughtful adult responses.',
    url: '/emotional-regulation-early-childhood',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Emotional Regulation in Early Childhood: What Is the Child’s Body Telling Us?',
  description:
    'A practical guide for early childhood educators looking beyond behaviour to consider regulation, sensory load, environment, adult responses and co-regulation.',
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
      'https://playmoveimprove-regulator-champions.vercel.app/emotional-regulation-early-childhood',
  },
};

const SIGNS_TO_NOTICE = [
  {
    title: 'The child suddenly gets louder',
    text:
      'Volume can increase when excitement, sensory load, fatigue or emotional demand is building. The useful question is not only how to quieten the child, but what changed before the volume increased.',
  },
  {
    title: 'The child starts running',
    text:
      'Running can be playful, impulsive, sensory seeking, avoidance, excitement or an attempt to regulate through movement. Context matters.',
  },
  {
    title: 'The child becomes very still',
    text:
      'Regulation difficulties do not always look busy. A child who freezes, withdraws, stops speaking or becomes unusually compliant may also be overwhelmed.',
  },
  {
    title: 'Everything becomes a refusal',
    text:
      'Repeated “no”, dropping to the floor or avoiding instructions may appear behavioural, but can also emerge when the child no longer has enough capacity for another demand.',
  },
  {
    title: 'Small problems become very big',
    text:
      'When a child is already carrying a high load, a seemingly minor frustration can become the final demand they cannot manage.',
  },
  {
    title: 'The child cannot return to the group',
    text:
      'Recovery can take time. A child may look calmer before their attention, flexibility and social participation are genuinely available again.',
  },
];

const THREE_PLACES = [
  {
    number: '01',
    title: 'The child',
    text:
      'What is their body communicating? Consider movement, breathing, posture, facial expression, voice, proximity, attention and changes from their usual behaviour.',
  },
  {
    number: '02',
    title: 'The environment',
    text:
      'What is happening around them? Noise, crowding, transitions, visual load, waiting, unpredictable routines and competing sensory information can all matter.',
  },
  {
    number: '03',
    title: 'The adult response',
    text:
      'What happens when we enter the moment? Our pace, voice, amount of language, physical position and urgency can either reduce or add to the demand.',
  },
];

const PRACTICE_EXAMPLES = [
  {
    situation:
      'A child keeps leaving group time.',
    reaction:
      '“Come back and sit down. Everyone else is sitting.”',
    noticing:
      'Is the group too long? Does the child need movement? Are they following the language? Is sitting still actually required for participation?',
  },
  {
    situation:
      'A child pushes another child during pack-up.',
    reaction:
      '“We do not push. Say sorry.”',
    noticing:
      'Was the room crowded? Was the transition sudden? Was the child trying to move through a bottleneck? Had their capacity already dropped?',
  },
  {
    situation:
      'A child screams when their parent leaves.',
    reaction:
      '“Mum will be back later. Come and play.”',
    noticing:
      'What does their body need first? More time, less language, proximity, a familiar routine, movement, comfort or a quieter arrival?',
  },
];

export default function EmotionalRegulationPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html:
            JSON.stringify(articleSchema),
        }}
      />

      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              Emotional regulation in early childhood
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Before we ask a child to calm down, what is their body telling us?
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Emotional regulation is often talked about as though it is a skill a child should simply be able to use when things get difficult. In early childhood, it is much more relational than that.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              Young children are still developing the ability to manage strong feelings, sensory information, impulses, transitions and frustration. They often need adults to notice what is happening before expecting them to manage it alone.
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

      {/* POSITIONING */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <p className="text-sm font-semibold text-[#9A793D]">
              Regulation is not the same as being quiet
            </p>

            <p className="mt-3 max-w-4xl text-lg font-semibold leading-relaxed">
              A child can be quiet and overwhelmed. A child can be moving and regulated. A child can follow an instruction while disconnected, frozen or trying very hard to hold themselves together.
            </p>

            <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#53645D]">
              Looking only at whether behaviour appears calm can cause us to miss what is actually happening.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT REGULATION MEANS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Start here
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Emotional regulation is the ability to respond and recover, not the absence of emotion.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                Children do not need to be calm all day. They need opportunities to experience excitement, frustration, disappointment, uncertainty and strong feelings while gradually learning what helps them remain connected and recover.
              </p>

              <p>
                In early childhood, that learning happens with other people. Adults support children through predictable relationships, thoughtful environments, body-based experiences and responses that match the child&apos;s current capacity.
              </p>

              <p>
                This is why co-regulation matters. Before self-regulation becomes more reliable, children often depend on adults to help make difficult moments manageable enough for participation and learning to occur.
              </p>

              <Link
                href="/co-regulation-early-childhood"
                className="inline-flex font-bold text-[#9A793D] underline decoration-[#C29F60] decoration-2 underline-offset-4"
              >
                Read the co-regulation guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              What might regulation difficulty look like?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Look for changes in the body, not just “challenging behaviour”.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              There is no single behaviour that proves a child is dysregulated. The pattern, context and change from that child&apos;s usual presentation are much more useful.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {SIGNS_TO_NOTICE.map((item) => (
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

      {/* THREE PLACES */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#E4C98E]">
              Before choosing a strategy
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Look in three places.
            </h2>

            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#D8E1DC]">
              Regulation is rarely only about the child. The environment and adult response are part of the picture too.
            </p>
          </div>

          <div className="mt-10 border-y border-white/20 md:grid md:grid-cols-3">
            {THREE_PLACES.map(
              (item, index) => (
                <div
                  key={item.number}
                  className={`py-6 md:px-6 ${
                    index > 0
                      ? 'border-t border-white/20 md:border-l md:border-t-0'
                      : ''
                  }`}
                >
                  <span className="text-sm font-extrabold text-[#E4C98E]">
                    {item.number}
                  </span>

                  <h3 className="mt-2 text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#C8D6D0]">
                    {item.text}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* REAL EXAMPLES */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Everyday examples
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Change the question before changing the child.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              The aim is not to avoid boundaries or expectations. It is to understand the moment well enough to choose an appropriate response.
            </p>
          </div>

          <div className="mt-10 border-t border-[#D8CFC2]">
            {PRACTICE_EXAMPLES.map(
              (example) => (
                <article
                  key={example.situation}
                  className="border-b border-[#D8CFC2] py-7"
                >
                  <div className="grid gap-6 lg:grid-cols-3">
                    <div>
                      <p className="text-sm font-semibold text-[#657B6C]">
                        What we see
                      </p>

                      <p className="mt-2 text-lg font-extrabold leading-relaxed">
                        {example.situation}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#9A793D]">
                        The quick reaction
                      </p>

                      <p className="mt-2 text-base font-semibold leading-relaxed text-[#53645D]">
                        {example.reaction}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-[#9A793D]">
                        What else could we notice?
                      </p>

                      <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                        {example.noticing}
                      </p>
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* WHY STRATEGIES FAIL */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                Why strategies sometimes fail
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                A breathing exercise is not useful just because we call it a regulation strategy.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                Educators can end up with long lists of “calm-down strategies” that are offered regardless of why the child is struggling. Breathing, squeezing, heavy work, quiet spaces and sensory tools can all be useful in the right context, but none of them are universal answers.
              </p>

              <p>
                A child distressed by separation may need connection. A child who has been sitting for too long may need movement. A child overwhelmed by noise may need the environment changed. A child whose capacity has dropped may simply need fewer demands.
              </p>

              <p className="font-semibold text-[#1C3B34]">
                Regulator Champions focuses on helping educators understand the moment first so the strategy is chosen for a reason.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CO-REGULATION */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                The adult matters too
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Co-regulation is not something we do to a child.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                It is relational. Children notice our face, posture, voice, proximity, rhythm and emotional state. That does not mean an educator must remain perfectly calm all day. It means the adult is part of the regulation environment and deserves to be considered when reflecting on difficult moments.
              </p>

              <div className="mt-7 border-t border-[#D8CFC2]">
                <ReflectionPoint
                  title="More words are not always more support"
                  text="When a child is overloaded, repeatedly explaining, questioning and reminding can increase the amount they need to process."
                />

                <ReflectionPoint
                  title="Connection does not remove boundaries"
                  text="We can remain warm and connected while still holding limits, protecting safety and helping children participate in the expectations of the setting."
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
                Try the approach with your team
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                See how the same situation looks from more than one perspective.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                The free Regulation Ladder includes educator, manager and family perspectives so teams can practise looking beyond the behaviour before deciding what to try next.
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

      {/* RELATED */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Keep exploring
            </p>

            <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
              Related early childhood regulation resources
            </h2>
          </div>

          <div className="mt-7 border-t border-[#D8CFC2]">
            <RelatedLink
              href="/co-regulation-early-childhood"
              title="Co-regulation in early childhood"
              text="Explore how relationship, adult responses, environment and expectations influence difficult moments."
            />

            <RelatedLink
              href="/early-childhood-professional-development"
              title="Early childhood professional development"
              text="Explore professional learning that is designed to change what educators notice and do in everyday practice."
            />

            <RelatedLink
              href="/blog"
              title="Articles and free training"
              text="Find more practical regulation, child development and educator learning resources."
            />
          </div>
        </div>
      </section>

      {/* LOCATION PATHWAYS */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Quality and professional learning pathways
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Looking at how regulation professional learning fits your local early childhood system?
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                These pages provide additional information for teams working within different quality, funding and professional development systems.
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
              Robyn is an Accredited Exercise Physiologist and Developmental Educator and the founder of Play Move Improve. Her work with early childhood teams focuses on regulation, movement, sensory processing, executive function, participation and practical co-regulation within everyday learning environments.
            </p>
          </div>
        </div>
      </section>

      {/* PROGRAM CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Help your educators understand what may be happening before behaviour escalates.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Regulator Champions helps early childhood teams notice what may sit underneath behaviour, look at the environment and adult response, and decide what to try next together.
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

function ReflectionPoint({
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