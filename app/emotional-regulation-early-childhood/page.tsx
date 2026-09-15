import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Emotional Regulation in Early Childhood | Practical Support for Educators',

  description:
    'A practical early childhood guide to emotional regulation, helping educators notice what children may be communicating through behaviour, movement, shutdown, overwhelm and transitions, and decide what to try next.',

  alternates: {
    canonical: '/emotional-regulation-early-childhood',
  },

  openGraph: {
    title:
      'Emotional Regulation in Early Childhood | Practical Support for Educators',
    description:
      'Explore emotional regulation in early childhood, including what behaviour may be communicating, how to notice body cues earlier and what thoughtful support can look like in practice.',
    url: '/emotional-regulation-early-childhood',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Emotional Regulation in Early Childhood: What Educators May Be Missing',
  description:
    'A practical early childhood guide helping educators understand emotional regulation, notice body-based signs earlier and respond more thoughtfully in everyday situations.',
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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:
        'What is emotional regulation in early childhood?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Emotional regulation in early childhood refers to the developing ability to manage feelings, recover from frustration, cope with change and remain engaged enough to participate in everyday life. Young children often still need significant adult support while these skills are developing.',
      },
    },
    {
      '@type': 'Question',
      name:
        'What does emotional dysregulation look like in young children?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Emotional dysregulation can look like yelling, running, hitting, hiding, refusing, becoming unusually still, withdrawing from play, struggling to transition or finding it hard to recover after a challenge. It does not always look loud or disruptive.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Why do some children struggle more than others?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Children differ in temperament, sensory processing, developmental skills, life experiences, sleep, stress levels, communication abilities and the amount of demand placed on them. Emotional regulation difficulties usually reflect multiple contributing factors rather than one simple cause.',
      },
    },
    {
      '@type': 'Question',
      name:
        'What can educators do when a child is struggling?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Educators can notice body cues earlier, reduce unnecessary demand, change the environment, slow their own pace, use fewer words, support transitions more predictably and reflect on what may be happening underneath the behaviour rather than only reacting to the behaviour itself.',
      },
    },
  ],
};

const BODY_CUES = [
  {
    title: 'Movement changes',
    text:
      'Some children move more when regulation is becoming difficult. They may pace, run, crash, climb, fidget, wander or seem unable to stay with the group in the way adults were expecting.',
  },
  {
    title: 'Voice changes',
    text:
      'You may notice voices becoming louder, sharper, more repetitive or more urgent. For other children, speech may reduce and they may stop using words effectively when the demand becomes too high.',
  },
  {
    title: 'Attention changes',
    text:
      'A child may appear distracted, scattered, stuck on one detail or unable to shift into the next part of the routine. This can look like disobedience from the outside, but it may actually reflect overload.',
  },
  {
    title: 'Connection changes',
    text:
      'Some children move away, avoid eye contact, hide under furniture, turn their bodies away or become more controlling in play because connection feels harder to manage in that moment.',
  },
];

const WHAT_TO_TRY = [
  {
    title: 'Notice earlier',
    text:
      'The earlier adults notice a change in the child’s body, participation or communication, the less likely the support is to become reactive and rushed.',
  },
  {
    title: 'Reduce the load',
    text:
      'Sometimes the most effective support is not adding a calming strategy but reducing noise, crowding, waiting, language or social pressure so the situation becomes more manageable.',
  },
  {
    title: 'Change the expectation',
    text:
      'If a child cannot manage the task in the way it is currently being asked of them, we may need to adjust how participation looks before expecting success.',
  },
  {
    title: 'Support the transition',
    text:
      'Many emotional regulation difficulties emerge around stopping, waiting, moving, separating or shifting attention, so improving transitions often improves regulation.',
  },
  {
    title: 'Reflect as a team',
    text:
      'When the same behaviour keeps happening, it helps to ask what the adults are noticing, what has already been tried and what may need to change around the child, not only within the child.',
  },
];

const FAQS = [
  {
    question:
      'What is emotional regulation in early childhood?',
    answer:
      'Emotional regulation in early childhood is the developing ability to manage feelings, recover from frustration, cope with change and remain engaged enough to participate in everyday life. Young children often still need significant adult support while these skills are developing.',
  },
  {
    question:
      'What does emotional dysregulation look like in young children?',
    answer:
      'It can look like yelling, running, hitting, refusing, hiding, shutting down, becoming very still, leaving the group or finding it hard to recover after a challenge. It does not always look loud or disruptive.',
  },
  {
    question:
      'Is emotional regulation only about calming a child down?',
    answer:
      'No. It is also about participation, recovery, flexibility, communication and whether the child can remain connected enough to learn and be with others.',
  },
  {
    question:
      'Why might a child seem fine one moment and then suddenly fall apart?',
    answer:
      'What looks sudden is often the point where accumulated demand has become too much. Sensory load, transitions, waiting, hunger, fatigue, social pressure or a build-up of smaller stresses may all contribute.',
  },
  {
    question:
      'What should educators do first?',
    answer:
      'Begin by noticing what the child’s body, participation and environment are showing you. Then ask what part of the situation can be made more manageable before expecting the child to do something differently.',
  },
];

export default function EmotionalRegulationEarlyChildhoodPage() {
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-base font-semibold text-[#E4C98E]">
              Practical guide for early childhood educators
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Emotional regulation in early childhood
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              When behaviour becomes difficult, the most useful question is often not how to stop it, but what the child may be communicating through it.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Emotional regulation is not simply about whether a child looks calm. It is about whether they can stay connected enough to participate, cope with change, move through frustration, recover after stress and manage the ordinary demands of early childhood life with growing support and skill.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              Children show us a great deal through their bodies before a situation becomes big, and the earlier educators notice those signs, the more thoughtful and effective their response can become.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/playbooks"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Try a Free Regulation Ladder
              </Link>

              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white bg-white px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3EEE7]"
              >
                Explore Regulator Champions
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
            <Image
              src="/images/educator-noticing-child-body-cues.jpg"
              alt="Educator thoughtfully noticing a child's body cues in an early childhood room while other educators continue supporting children nearby"
              width={1400}
              height={1000}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* QUICK REFRAME */}
      <section className="border-b border-[#E6E2DC] bg-[#E8D39D]">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="border-l-4 border-[#8A6F3E] pl-6">
            <p className="text-sm font-semibold text-[#6E5426]">
              A useful reframe
            </p>

            <p className="mt-3 max-w-4xl text-xl font-extrabold leading-relaxed">
              Emotional regulation difficulties do not always begin at the moment of visible behaviour. They often begin earlier, in the child’s body, attention, movement, sensory experience or capacity to manage what the environment is asking of them.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT IS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#657B6C]">
              What emotional regulation means
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Emotional regulation is about far more than appearing settled.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                In early childhood, emotional regulation involves a child’s developing ability to cope with disappointment, hold onto a plan, wait, recover after frustration, manage the demands of group life and keep returning to connection and participation even when things do not go smoothly.
              </p>

              <p>
                Because these abilities are still developing, many children need adult support while moving through big feelings, changing routines, noisy rooms, social conflict, separation, tiredness or sensory overload. That is why it helps to think less in terms of “good behaviour” and “bad behaviour” and more in terms of what the child’s system may be able to manage in that moment.
              </p>

              <p>
                When we start there, we are far more likely to notice what the child needs before we simply react to what the child is doing.
              </p>
            </div>
          </div>

          <aside className="border-l-4 border-[#C29F60] bg-[#FAF5EC] p-7">
            <p className="text-sm font-semibold text-[#9A793D]">
              Important to remember
            </p>

            <h3 className="mt-3 text-2xl font-extrabold">
              Regulation is developmental.
            </h3>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Children are not meant to regulate like small adults. They are learning over time, and their capacity will vary across the day, across environments and across different types of demand.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              This is one reason a child may cope beautifully in one moment and struggle in the next without that being a sign of manipulation or deliberate defiance.
            </p>
          </aside>
        </div>
      </section>

      {/* NOT ALWAYS QUIET */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
          <div className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white p-3 shadow-sm">
            <Image
              src="/images/child-moving-while-regulated-early-childhood.jpg"
              alt="Young child moving purposefully through an early childhood environment while an educator observes supportively and other educators supervise nearby"
              width={1400}
              height={1000}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#9A793D]">
              Regulation does not always look quiet
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              A child can be moving a lot and still be participating well.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              One of the easiest traps in early childhood is assuming that stillness equals regulation and movement equals dysregulation. For some children, movement is part of how they organise themselves, stay engaged, process sensory input and remain available for connection.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              That means the question is not always whether the child is still. It is often whether the child is connected, purposeful, safe and able to keep participating in a way their body can manage.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Looking at emotional regulation through that wider lens can change how adults interpret children who fidget, pace, carry, wander, build, climb or need movement woven into the routine.
            </p>
          </div>
        </div>
      </section>

      {/* BODY TELLING US */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              What is the child’s body telling us?
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Before behaviour becomes big, the body is often already telling a story.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Some children become louder and more chaotic, while others become quiet, avoidant or unusually still. Both can be signs that regulation is becoming harder. This is why noticing early changes matters so much.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {BODY_CUES.map((item) => (
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

      {/* QUIET CHILD */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                The child we may miss
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Emotional regulation difficulties do not always look disruptive.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                In many teams, the child who runs, yells or resists is noticed quickly because their difficulty affects the group. The child who becomes unusually quiet, drifts away, watches from the edge, hides, shuts down or stops participating can be much easier to miss.
              </p>

              <p>
                Yet these children may also be telling us that the load has become too much. They may need support just as much as the child whose struggle is louder and more visible.
              </p>

              <p className="font-semibold text-white">
                A child does not need to be disruptive for us to ask whether the environment, the demand or the pace of the day is becoming hard to manage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ENVIRONMENT MATTERS */}
      <section className="bg-[#F1ECE4] py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#9A793D]">
              Looking wider than the child
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sometimes the environment is carrying more of the problem than we realise.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Transitions, crowded doorways, noisy spaces, long waiting, rapid instructions and sudden changes can all increase emotional load. When a child struggles at the same point each day, it is worth looking carefully at the routine itself rather than assuming the child just needs firmer behaviour management.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              This does not mean we lower expectations endlessly. It means we become more curious about what is making success difficult and more thoughtful about how to adjust the demands around the child.
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-[#DDD5C9] bg-white p-3 shadow-sm">
            <Image
              src="/images/educator-noticing-crowded-transition.jpg"
              alt="Educators noticing that a crowded transition is contributing to a child's emotional overload in an early childhood service"
              width={1400}
              height={1000}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHAT TO TRY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              What educators can try
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Emotional regulation support becomes more useful when adults widen the lens.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              There is rarely one strategy that solves every difficult moment. More often, it is the quality of noticing, reflection and adaptation that makes the difference over time.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {WHAT_TO_TRY.map((item) => (
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

      {/* FREE LADDER CTA */}
      <section className="bg-[#E8D39D] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#6E5426]">
                If you want something practical
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start with the free Regulation Ladder.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#45564F]">
                If your team is trying to work out what to notice and what to try when behaviour keeps repeating, the free Regulation Ladder is a simple way to begin. It helps educators, leaders and families look at the same situation from different angles rather than reaching too quickly for one explanation.
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
              Related early childhood support pages
            </h2>
          </div>

          <div className="border-t border-[#D8CFC2]">
            <RelatedLink
              href="/co-regulation-early-childhood"
              title="Co-regulation in early childhood"
              text="Explore how adult responses, environment and relationship influence a child's ability to stay connected and participate."
            />

            <RelatedLink
              href="/educator-capacity-building"
              title="Educator capacity building"
              text="Look at how teams can strengthen judgement, reflection and confidence rather than simply collecting more strategies."
            />

            <RelatedLink
              href="/early-childhood-professional-development"
              title="Early childhood professional development"
              text="Explore what type of professional learning is more likely to influence everyday educator practice."
            />
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
            Emotional regulation FAQs
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
            When the same behaviours keep happening, it helps to give educators a way to think more clearly, notice more effectively and work out what to try next together.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Regulator Champions is designed to support that process through practical Regulation Ladders, useful examples, recordings and broader professional learning support for teams that want to go further.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white bg-white px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              Explore the 6-Month Preview
            </Link>
          </div>
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