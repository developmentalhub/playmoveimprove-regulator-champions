import type { Metadata } from 'next';
import Image from 'next/image';
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
      'Directors and educational leaders can identify actual changes in room practice rather than relying only on attendance certificates.',
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
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.94fr_1.06fr] lg:items-center">
          <div>
            <p className="text-base font-semibold text-[#E4C98E]">
              Early childhood leadership
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Build educators who can think through difficult moments, not just wait for the next strategy.
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              Professional learning should change what educators notice, not just what they know.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Educator capacity building is about strengthening the knowledge, confidence and professional judgement educators can draw on when a real child, in a real room, is doing something that does not fit neatly into the training notes.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              For directors and educational leaders, the goal is gradually having fewer situations where the whole answer has to come from you.
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
                Explore the 6-Month Preview
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
            <Image
              src="/images/educational-leader-coaching-in-room.jpg"
              alt="Educational leader coaching an early childhood educator while observing children in a real classroom"
              width={1400}
              height={1000}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* QUICK DEFINITION */}
      <section className="border-b border-[#E6E2DC] bg-[#E8D39D]">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="border-l-4 border-[#8A6F3E] pl-6">
            <p className="text-sm font-semibold text-[#6E5426]">
              What is educator capacity building?
            </p>

            <p className="mt-3 max-w-4xl text-2xl font-extrabold leading-relaxed">
              It is helping educators become increasingly able to notice, interpret, decide and adapt without needing somebody else to prescribe every next step.
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
                An educator may understand the definition of co-regulation and still feel unsure when a child is screaming at drop-off, running around the room during pack-up or unable to join group time.
              </p>

              <p>
                Capacity develops when knowledge becomes usable. Educators need opportunities to connect ideas with real children, real rooms, real routines and the limitations of a busy early childhood setting.
              </p>

              <p>
                That means professional learning needs to help educators recognise when an idea matters, what they should look for, and how they might adapt their response when the first strategy does not work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHANGE THE ENVIRONMENT */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white p-3 shadow-sm">
            <Image
              src="/images/educator-changing-environment-for-child.jpg"
              alt="Early childhood educator adjusting the environment to better support a child while other children continue playing nearby"
              width={1400}
              height={1000}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#9A793D]">
              From strategy to judgement
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Sometimes the more capable response is changing the environment rather than asking the child to try harder.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Imagine an educator noticing that one child repeatedly loses control during a crowded transition. A strategy-only approach might give them a calming activity to use afterwards.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Capacity building asks them to look earlier. Is the pathway crowded? Is the instruction too broad? Is the child waiting too long? Would moving a piece of furniture, reducing the group size, changing the timing or giving the child something purposeful to carry reduce the demand before the difficult moment begins?
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              The educator is no longer simply remembering a strategy. They are interpreting what is happening and making a professional adjustment.
            </p>
          </div>
        </div>
      </section>

      {/* SIGNS CAPACITY */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-10 max-w-4xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              What improvement can look like
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Six signs professional learning is actually building educator capacity.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              The strongest evidence is not always another certificate. Often it is what begins changing in the questions educators ask, the adjustments they make and the conversations you hear across the service.
            </p>
          </div>

          <div className="grid gap-x-10 md:grid-cols-2">
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

      {/* REFLECTION IN PRACTICE */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold text-[#E4C98E]">
              Reflection in practice
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Reflection is more useful when educators still remember what the moment actually felt like.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#D8E1DC]">
              A reflective conversation does not always need to wait until a formal meeting. Two educators can notice something during indoor play, quietly compare what they saw, and decide whether there is a small environmental or interaction change worth trying.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
              The important part is that the conversation moves beyond “that was difficult” and towards “what was happening, what did we notice, what changed when we responded differently, and what should we try next?”
            </p>

            <p className="mt-5 text-xl font-extrabold leading-relaxed">
              That is how reflection starts becoming practice change.
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-xl">
            <Image
              src="/images/educators-reflecting-during-indoor-play.jpg"
              alt="Two early childhood educators reflecting together during indoor play while other educators remain engaged with children"
              width={1400}
              height={1000}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="bg-[#F1ECE4] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                For directors and educational leaders
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start professional learning with the problem you actually need to solve.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                When you are already carrying staffing, families, incidents, inclusion, documentation and everyday operational pressure, you do not need professional learning that creates another project for you to manage.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                It is more useful to begin with what keeps landing back on your desk and work backwards from there.
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

      {/* DIRECTOR VIEW */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-[#FAF5EC] p-3 shadow-sm">
            <Image
              src="/images/director-observing-team-practice.jpg"
              alt="Early childhood director observing educators and children during everyday practice"
              width={1400}
              height={1000}
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#657B6C]">
              What leaders can look for
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              You should eventually be able to see the learning without asking who finished the module.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Perhaps an educator notices overload earlier and lowers the demand. Perhaps two educators use similar language when a child becomes distressed. Perhaps a room changes the way a transition is organised because the team has recognised where the pressure is building.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              Capacity building becomes visible when knowledge begins influencing the environment, interactions, team conversations and everyday decisions.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              It does not mean every educator will respond identically. It means there is a stronger shared understanding underneath the different professional decisions they make.
            </p>
          </div>
        </div>
      </section>

      {/* REGULATOR CHAMPIONS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
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
                Regulation Ladders give teams a shared starting point for thinking about regulation, co-regulation, sensory needs, participation, transitions and the adult role.
              </p>

              <p>
                Educators can read one idea, try it, notice what happens, talk about it together and return to deeper learning when they have the capacity.
              </p>
            </div>
          </div>

          <div className="mt-10 border-y border-[#D8CFC2] md:grid md:grid-cols-3">
            <CapacityStep
              number="01"
              title="Notice"
              text="Recognise what may be happening in the child, environment, routine or interaction."
            />

            <CapacityStep
              number="02"
              title="Try"
              text="Make one practical adjustment rather than overwhelming the team with ten new strategies."
              divided
            />

            <CapacityStep
              number="03"
              title="Reflect"
              text="Return to what happened, what changed and what may be useful to try next."
              divided
            />
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#29483F]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/proposal?plan=preview"
              className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              Explore the 6-Month Preview
            </Link>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#657B6C]">
            Related professional learning
          </p>

          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Explore the ideas behind educator capacity.
          </h2>

          <div className="mt-8 border-t border-[#D8CFC2]">
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
              text="Explore how to choose professional learning that educators can carry back into everyday practice."
            />
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-[#F7F3ED] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9A793D]">
                Funding educator capability
              </p>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Is educator capability part of your service improvement priorities?
              </h2>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                Australian services can explore the information below when considering whether professional learning may align with their identified priorities and relevant funding requirements.
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
                className="flex min-h-12 items-center justify-center rounded-xl border border-[#D8D0C4] bg-white px-5 py-3 text-sm font-bold text-[#1C3B34]"
              >
                Queensland Kindy Uplift
              </Link>
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

      {/* CONVERSION */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#E4C98E]">
            Regulator Champions
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            If the same situations keep coming back to leadership, build more of the problem-solving into the team.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Start with the free Regulation Ladder, or explore the six-month Regulator Champions option if your team needs a more supported period to use the ideas, ask questions and build shared practice.
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
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white bg-white px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              View the 6-Month Preview
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="max-w-4xl text-xs leading-5 text-[#75827D]">
            This page provides general professional learning information for early childhood services. Professional learning should be selected and implemented in response to the needs of your educators, children and service context.
          </p>
        </div>
      </section>
    </main>
  );
}

function CapacityStep({
  number,
  title,
  text,
  divided = false,
}: {
  number: string;
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
      <p className="text-sm font-extrabold text-[#9A793D]">
        {number}
      </p>

      <h3 className="mt-2 text-xl font-extrabold">
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