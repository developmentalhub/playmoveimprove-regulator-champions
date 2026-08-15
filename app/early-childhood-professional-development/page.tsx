import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Early Childhood Professional Development | Practical Educator PD',
  description:
    'Early childhood professional development for educators and leaders, with practical coaching in emotional regulation, co-regulation, executive function, sensory support and whole-team implementation.',
  alternates: {
    canonical: '/early-childhood-professional-development',
  },
  openGraph: {
    title: 'Early Childhood Professional Development | Play Move Improve',
    description:
      'Practical early childhood professional development that helps educators turn regulation, co-regulation and executive-function learning into everyday practice.',
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
    'A practical guide to choosing early childhood professional development that supports educator confidence, reflection, coaching and whole-team implementation.',
  author: {
    '@type': 'Person',
    name: 'Robyn Papworth',
    jobTitle: 'Accredited Exercise Physiologist and Developmental Educator',
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

export default function EarlyChildhoodProfessionalDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* HERO */}
      <section className="bg-teal-950 px-6 py-14 text-white md:py-20">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex rounded-full border border-amber-400/50 bg-amber-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Early Childhood Professional Learning
          </span>

          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl">
            Early Childhood Professional Development That Educators Can Actually Use
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            Good professional development should do more than leave educators
            with a notebook full of ideas. It should help them understand what
            they are seeing, make better decisions in the moment and build
            confidence across everyday routines.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            That matters most in the difficult parts of the day: transitions,
            emotional escalation, group times, sensory overload, participation
            challenges and moments when children need adults to co-regulate with
            them.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-14 px-6 py-12">
        {/* WHAT GOOD PD SHOULD DO */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Choosing Professional Development
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900">
              The best PD helps educators think differently in real situations
            </h2>

            <p className="text-sm leading-relaxed text-slate-700">
              Early childhood educators work in dynamic environments. A strategy
              that works beautifully for one child, one room or one routine may
              not work in exactly the same way somewhere else.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              That is why strong professional development should build
              understanding and professional judgement, not only provide a list
              of activities to copy.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              Educators need enough knowledge to understand the reason behind a
              strategy and enough reflection to know when to adapt it.
            </p>
          </div>

          <aside className="rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              A Simple Test
            </span>

            <p className="mt-3 text-lg font-extrabold leading-snug text-slate-900">
              Will this PD help my educators make better decisions next Monday?
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              If the answer is not clear, the learning may still be interesting,
              but it may not yet be practical enough.
            </p>
          </aside>
        </section>

        {/* COMMON SEARCH TOPICS */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Professional Development Topics
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              What early childhood teams are often trying to strengthen
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                'Emotional regulation',
                'Understanding what dysregulation can look like and how adult responses can support children before, during and after difficult moments.',
              ],
              [
                'Co-regulation',
                'Building educator confidence in using relationship, environment, language and predictability to support regulation.',
              ],
              [
                'Executive function',
                'Supporting impulse control, working memory, flexibility, persistence and attention within everyday routines.',
              ],
              [
                'Sensory-informed practice',
                'Recognising when noise, movement, touch, crowding or physical state may be increasing a child’s load.',
              ],
              [
                'Transitions and routines',
                'Reducing unnecessary stress around pack-up, arrivals, group times and movement between activities.',
              ],
              [
                'Whole-team consistency',
                'Helping educators use shared language and principles without expecting every adult to respond in exactly the same way.',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <strong className="block text-sm font-bold text-slate-900">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ONE OFF VS CAPACITY */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white md:p-9">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-300">
            Beyond One-Off Training
          </span>

          <h2 className="mt-2 text-2xl font-extrabold">
            Professional development is stronger when implementation is part of the learning
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-5">
              <strong className="block text-sm font-bold text-white">
                One-off information
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-300">
                Educators hear useful ideas, but may be left to work out on their
                own how those ideas fit their rooms, routines and current
                pressures.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-700 bg-teal-900 p-5">
              <strong className="block text-sm font-bold text-white">
                Capacity-building professional learning
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-teal-100">
                Educators learn, trial, reflect, adjust and build confidence over
                time so the knowledge becomes part of their everyday practice.
              </p>
            </div>
          </div>

          <Link
            href="/educator-capacity-building"
            className="mt-6 inline-flex text-sm font-bold text-amber-300 underline decoration-amber-400/50 underline-offset-4 hover:text-amber-200"
          >
            Read the Educator Capacity Building Guide →
          </Link>
        </section>

        {/* PRACTICAL PD */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              What Practical PD Looks Like
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Professional learning should connect to what educators are already seeing
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'Start with a real pressure point',
                'Choose a routine or recurring difficulty the team genuinely wants to improve.',
              ],
              [
                'Teach the underlying reason',
                'Help educators understand the developmental, sensory or regulation reason behind the strategy.',
              ],
              [
                'Choose one realistic change',
                'A small change that can be trialled tomorrow is often more useful than ten ideas that never get implemented.',
              ],
              [
                'Notice what happens',
                'Encourage educators to observe the child, the environment and their own response rather than judging success too quickly.',
              ],
              [
                'Reflect as a team',
                'Discuss what helped, what changed and where the approach needs to be adjusted.',
              ],
              [
                'Build from there',
                'Use the reflection to decide the next professional learning goal instead of immediately moving to a new topic.',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <strong className="block text-sm font-bold text-slate-900">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EMOTIONAL REGULATION LINK */}
        <section className="rounded-3xl border border-teal-300 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Popular Professional Learning Topic
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-teal-950">
            Emotional regulation and co-regulation
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-teal-900">
            Emotional regulation is one of the areas where educators often need
            more than a list of calming activities. Teams benefit from
            understanding what can increase a child’s regulation load, what
            co-regulation actually looks like and why timing matters.
          </p>

          <Link
            href="/emotional-regulation-early-childhood"
            className="mt-5 inline-flex rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-900"
          >
            Read the Emotional Regulation Guide →
          </Link>
        </section>

        {/* WHOLE TEAM */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Whole-Service Learning
            </span>

            <h2 className="mt-2 text-xl font-extrabold text-slate-900">
              Professional development has more impact when the team can talk about it together
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700">
              When only one educator attends training, that person can return
              enthusiastic but still struggle to influence the wider service.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              Whole-team professional learning creates shared language and gives
              leaders a stronger foundation for reflection, mentoring and
              implementation conversations.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              This is especially important for regulation support because
              children may interact with several educators across rooms, shifts
              and routines.
            </p>
          </div>
        </section>

        {/* WHAT TO ASK BEFORE BOOKING */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Before You Book PD
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Questions directors and educational leaders can ask
            </h2>
          </div>

          <div className="space-y-3">
            {[
              'Does this topic connect to an identified service or educator need?',
              'Will educators understand the reason behind the recommended strategies?',
              'Is there a way to apply the learning to our own rooms and routines?',
              'Will our team have opportunities to reflect after trying the approach?',
              'Does the learning build confidence and judgement, or mainly provide information?',
              'Can this professional development connect to our Quality Improvement Plan or funded professional learning goals?',
            ].map((question) => (
              <div
                key={question}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <p className="text-sm font-semibold text-slate-800">{question}</p>
              </div>
            ))}
          </div>
        </section>

        {/* REGULATOR CHAMPIONS */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Regulator Champions
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Progressive professional development for regulation and co-regulation
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-700">
            Regulator Champions is a whole-service professional learning and
            coaching pathway created by Play Move Improve. Instead of presenting
            all eight Regulation Ladders at once, the program releases learning
            progressively so educators have time to practise, reflect and embed
            each stage.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              [
                'Developmentally informed',
                'The learning connects regulation with sensory processing, movement, executive function and participation.',
              ],
              [
                'Designed for real rooms',
                'Educators apply learning to common pressure points rather than relying on hypothetical examples alone.',
              ],
              [
                'Built for reflection',
                'The pathway encourages teams to notice, trial, review and make the next practical adjustment.',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5"
              >
                <strong className="block text-sm font-bold text-slate-900">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FUNDING */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Funding Early Childhood Professional Development
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Looking for a funding pathway?
            </h2>
          </div>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            Some early childhood services can use government-funded professional
            learning or coaching allocations where the program aligns with their
            identified priorities and funding requirements.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Link
              href="/school-readiness-funding"
              className="rounded-2xl border border-teal-300 bg-teal-50 p-5 transition hover:bg-teal-100"
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Victoria
              </span>
              <strong className="mt-1 block text-lg font-extrabold text-teal-950">
                School Readiness Funding Coaching
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-teal-900">
                Read the procurement, coaching and proposal information for
                Victorian services.
              </p>
            </Link>

            <Link
              href="/kindy-uplift"
              className="rounded-2xl border border-amber-300 bg-amber-50 p-5 transition hover:bg-amber-100"
            >
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Queensland
              </span>
              <strong className="mt-1 block text-lg font-extrabold text-amber-950">
                Kindy Uplift
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                Read the Kindy Uplift priority alignment, supplier and
                procurement information.
              </p>
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Common Questions
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Early childhood professional development FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {[
              [
                'What is early childhood professional development?',
                'Early childhood professional development includes learning that strengthens educator knowledge, skills, confidence and professional practice. It can include workshops, coaching, reflective practice, mentoring, online learning and whole-team professional learning.',
              ],
              [
                'What are useful professional development topics for early childhood educators?',
                'Common areas include emotional regulation, co-regulation, executive function, inclusion, sensory processing, movement, transitions, participation, behaviour support and reflective practice.',
              ],
              [
                'Is online professional development effective for early childhood educators?',
                'Online learning can be effective when it is practical, relevant and supported by reflection or implementation. The delivery format matters less than whether educators can connect the learning to their everyday practice.',
              ],
              [
                'What is the difference between a webinar and coaching?',
                'A webinar primarily delivers information. Coaching is more interactive and usually includes goal setting, reflection, feedback and discussion about how learning applies to a specific service or educator context.',
              ],
              [
                'How can leaders make professional development more useful?',
                'Choose learning that connects to an identified service need, give educators time to trial the ideas, revisit the topic after implementation and create opportunities for team reflection.',
              ],
            ].map(([question, answer]) => (
              <details
                key={question}
                className="group rounded-2xl border border-slate-200 bg-white p-5"
              >
                <summary className="cursor-pointer list-none text-sm font-bold text-slate-900">
                  {question}
                </summary>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* AUTHOR */}
        <section className="rounded-3xl border border-slate-200 bg-[#F7F3EC] p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            About the Author
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-slate-900">
            Robyn Papworth
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Robyn is an Accredited Exercise Physiologist and Developmental
            Educator and the founder of Play Move Improve. She works with early
            childhood educators to make developmental, movement, sensory,
            regulation and executive-function knowledge practical within real
            learning environments.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-teal-950 p-7 text-white md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Professional Learning With Play Move Improve
              </span>

              <h2 className="mt-1 text-2xl font-extrabold">
                Want professional development that continues after the training session?
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-teal-100">
                Regulator Champions gives early childhood services a progressive
                pathway for building educator capability in regulation,
                co-regulation and everyday implementation.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/proposal?plan=preview"
                className="rounded-xl bg-amber-400 px-5 py-3 text-center text-xs font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Start With 3 Ladders →
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-teal-700 bg-teal-900 px-5 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-800"
              >
                Explore Regulator Champions →
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}