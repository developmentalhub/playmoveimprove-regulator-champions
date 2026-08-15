import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Educator Capacity Building in Early Childhood | Practical Guide',
  description:
    'A practical guide to educator capacity building in early childhood, including coaching, reflective practice, implementation, professional development and whole-team capability.',
  alternates: {
    canonical: '/educator-capacity-building',
  },
  openGraph: {
    title: 'Educator Capacity Building in Early Childhood',
    description:
      'How early childhood services can move beyond one-off professional development and build lasting educator capability through coaching, reflection and implementation.',
    url: '/educator-capacity-building',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Educator Capacity Building in Early Childhood: Moving Beyond One-Off Professional Development',
  description:
    'A practical guide to educator capacity building in early childhood services, with a focus on coaching, reflection, implementation and whole-team practice.',
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
      'https://playmoveimprove-regulator-champions.vercel.app/educator-capacity-building',
  },
};

export default function EducatorCapacityBuildingPage() {
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
            Early Childhood Leadership Guide
          </span>

          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl">
            Educator Capacity Building in Early Childhood
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            Professional development is valuable, but information alone does not
            always change practice. Educator capacity building is about helping
            teams understand, apply, reflect on and strengthen their practice
            over time.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            For early childhood leaders, the question is not only “What training
            should we book?” It is also “What will help this learning show up in
            the room next week?”
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-14 px-6 py-12">
        {/* DEFINITION */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              What Capacity Building Means
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Capacity building is more than attending professional development
            </h2>

            <p className="text-sm leading-relaxed text-slate-700">
              Educator capacity building strengthens the knowledge, confidence,
              judgement and practical skills educators use in their everyday
              work. It is not simply the transfer of information from an expert
              to a team.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              Strong capacity building gives educators opportunities to learn,
              apply new ideas, notice what happens, reflect with colleagues,
              receive feedback and make the next adjustment.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              The goal is not for educators to memorise a strategy. The goal is
              for them to become more confident making good decisions when the
              exact situation changes.
            </p>
          </div>

          <aside className="rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              A Leadership Question
            </span>

            <p className="mt-3 text-lg font-extrabold leading-snug text-slate-900">
              If the presenter disappeared tomorrow, would our team still know
              what to do?
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              That is a useful test of whether professional learning is building
              genuine capability or simply delivering information.
            </p>
          </aside>
        </section>

        {/* WHY ONE OFF PD FALLS SHORT */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Why One-Off PD Can Fall Short
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Knowing something is different from using it under pressure
            </h2>
          </div>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            Educators may leave a workshop feeling inspired and still find
            themselves returning to old habits when the room is noisy, staffing
            is stretched or a child escalates quickly. That does not mean the
            training failed. It often means implementation was not supported
            enough.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                'Too much information at once',
                'A full day of content can be difficult to translate into clear next steps once educators return to a busy service.',
              ],
              [
                'No shared implementation plan',
                'Different educators may interpret the same training differently, which can leave children experiencing inconsistent responses.',
              ],
              [
                'No follow-up reflection',
                'Without time to discuss what worked and what did not, teams can abandon useful ideas too early or keep using strategies that are not helping.',
              ],
              [
                'No room for context',
                'Generic advice may not fit the service’s routines, staffing, children, environment or current priorities.',
              ],
              [
                'Confidence does not change immediately',
                'Some educators need repeated opportunities to practise a new approach before it feels natural enough to use under pressure.',
              ],
              [
                'Leadership is left carrying the change',
                'When implementation is not built into the learning process, directors and educational leaders can end up trying to recreate the training themselves.',
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

        {/* CORE ELEMENTS */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white md:p-9">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-300">
            What Strong Capacity Building Includes
          </span>

          <h2 className="mt-2 text-2xl font-extrabold">
            Five elements that help professional learning become practice
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {[
              ['1', 'Relevant learning', 'The content connects directly to a real need in the service.'],
              ['2', 'Small next steps', 'Educators know what they are trying differently this week, not someday.'],
              ['3', 'Practice', 'Teams have opportunities to use the approach in everyday routines.'],
              ['4', 'Reflection', 'Educators notice what changed and what still feels difficult.'],
              ['5', 'Feedback and adjustment', 'The next action is shaped by what actually happened in practice.'],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-xs font-extrabold text-slate-950">
                  {number}
                </span>
                <strong className="mt-3 block text-sm font-bold text-white">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COACHING */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Coaching and Reflective Practice
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Why coaching can strengthen educator professional development
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-700">
                Coaching gives educators space to think about their own
                practice rather than only listen to someone else describe good
                practice.
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                A useful coaching process may include identifying a pressure
                point, choosing a realistic goal, trialling a change, observing
                what happens and reflecting on the next step.
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                This is especially useful in areas such as emotional regulation,
                co-regulation, sensory support and executive function, where the
                “right” response depends heavily on the child, the environment
                and the timing of the moment.
              </p>
            </div>

            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6">
              <strong className="block text-sm font-bold text-teal-950">
                Coaching is not about catching educators doing something wrong
              </strong>

              <p className="mt-3 text-xs leading-relaxed text-teal-900">
                Capacity building works best when reflection feels safe enough
                for educators to say, “That did not work. What could I try
                differently next time?”
              </p>
            </div>
          </div>
        </section>

        {/* EXAMPLE */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            A Practical Example
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            What capacity building can look like around emotional regulation
          </h2>

          <div className="mt-6 space-y-4">
            {[
              [
                'Week 1',
                'The team notices that transitions from outdoor play to group time are a common pressure point.',
              ],
              [
                'Week 2',
                'Educators trial one change, such as reducing verbal instructions and introducing a more predictable transition cue.',
              ],
              [
                'Week 3',
                'The team reflects on which children responded differently and where the routine still became difficult.',
              ],
              [
                'Week 4',
                'Educators adjust the environment or adult response rather than adding another generic strategy.',
              ],
              [
                'Following weeks',
                'The team builds a shared understanding of what helps, what does not and how to respond more consistently.',
              ],
            ].map(([label, description]) => (
              <div
                key={label}
                className="grid grid-cols-1 gap-2 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-5 sm:grid-cols-[110px_1fr]"
              >
                <strong className="text-sm font-bold text-teal-900">
                  {label}
                </strong>
                <p className="text-xs leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              For Directors and Educational Leaders
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              How to tell whether professional development is building capacity
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'Educators can explain the why',
                'Staff can describe the reasoning behind a strategy rather than simply repeating a scripted response.',
              ],
              [
                'Practice becomes more consistent',
                'The team begins using shared language and similar principles even when individual responses still vary.',
              ],
              [
                'Reflection becomes more specific',
                'Educators move from “that child had a bad day” to noticing environmental demands, timing, adult responses and patterns.',
              ],
              [
                'Confidence grows',
                'Educators are more willing to adjust their practice and less dependent on a leader solving every difficult moment.',
              ],
              [
                'New staff can enter the system',
                'The service has a shared approach that can be explained and modelled instead of relying on knowledge held by one experienced educator.',
              ],
              [
                'The learning connects to improvement planning',
                'Professional learning decisions can be linked to identified service priorities, reflection and evidence of implementation.',
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

        {/* RELATED TOPIC */}
        <section className="rounded-3xl border border-teal-300 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Related Educator Guide
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-teal-950">
            Building capacity around emotional regulation and co-regulation
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-teal-900">
            Emotional regulation is a good example of why professional learning
            needs more than a list of calming activities. Educators benefit from
            understanding what may be driving the moment and how their own
            response, the environment and the routine can change what happens
            next.
          </p>

          <Link
            href="/emotional-regulation-early-childhood"
            className="mt-5 inline-flex rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-900"
          >
            Read the Emotional Regulation Guide →
          </Link>
        </section>

        {/* REGULATOR CHAMPIONS */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Regulator Champions
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              A capacity-building pathway for early childhood teams
            </h2>
          </div>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            Regulator Champions was designed around the idea that educator
            capability grows progressively. Teams move through Regulation
            Ladders, reflective coaching and practical application rather than
            receiving the entire learning pathway at once.
          </p>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            The program focuses on co-regulation, educator reflection, sensory
            and developmental understanding, everyday room pressure points and
            whole-service consistency.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              [
                'Progressive learning',
                'Content is staged so educators have time to practise and embed each step.',
              ],
              [
                'Whole-team language',
                'Leaders and educators work from the same underlying regulation framework.',
              ],
              [
                'Reflective application',
                'Teams connect learning to real routines, pressure points and implementation decisions.',
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

        {/* FUNDING */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Funding Educator Capacity Building
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Funding pathways for early childhood professional learning
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Services may be able to fund coaching and professional learning
            through programs that support educator capability where the work
            aligns with the service's identified priorities and funding
            requirements.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/school-readiness-funding"
              className="rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Victorian School Readiness Funding →
            </Link>

            <Link
              href="/kindy-uplift"
              className="rounded-xl border border-teal-300 bg-teal-50 px-5 py-3 text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Queensland Kindy Uplift →
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
              Educator capacity building FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {[
              [
                'What is educator capacity building in early childhood?',
                'Educator capacity building is the process of strengthening educators’ knowledge, confidence, judgement and practical skills so they can apply learning independently within everyday practice.',
              ],
              [
                'How is capacity building different from professional development?',
                'Professional development is one way to support capacity building. Capacity building is broader because it includes implementation, reflection, feedback and the development of ongoing capability over time.',
              ],
              [
                'Why is coaching useful for early childhood educators?',
                'Coaching can help educators connect learning to their actual rooms, routines and challenges. It creates opportunities to set goals, reflect on practice, receive feedback and make realistic adjustments.',
              ],
              [
                'Does capacity building need to involve the whole team?',
                'Not always, but whole-team learning can be especially useful when a service is trying to create more consistent practice across rooms, shifts and educators.',
              ],
              [
                'What professional development topics work well with a capacity-building approach?',
                'Topics that involve judgement and implementation, such as emotional regulation, co-regulation, executive function, inclusion, sensory support and transitions, often benefit from ongoing reflection rather than one-off information alone.',
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
            Educator and the founder of Play Move Improve. Her work with early
            childhood teams focuses on translating developmental, movement,
            sensory, regulation and executive-function knowledge into practical
            educator capability.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-teal-950 p-7 text-white md:p-10">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
                Regulator Champions
              </span>

              <h2 className="mt-1 text-2xl font-extrabold">
                Build capability instead of adding another one-off workshop
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-teal-100">
                Start with the 3-Ladder Preview or choose the full eight-ladder
                pathway for whole-service professional learning and coaching.
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