import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emotional Regulation in Early Childhood | Educator Guide',
  description:
    'A practical early childhood educator guide to emotional regulation, co-regulation, sensory load, executive function and supporting children through everyday kindergarten routines.',
  alternates: {
    canonical: '/emotional-regulation-early-childhood',
  },
  openGraph: {
    title: 'Emotional Regulation in Early Childhood | Educator Guide',
    description:
      'Practical guidance for early childhood educators supporting emotional regulation, co-regulation and executive function in everyday kindergarten routines.',
    url: '/emotional-regulation-early-childhood',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Emotional Regulation in Early Childhood: A Practical Guide for Educators',
  description:
    'A practical guide for early childhood educators supporting emotional regulation, co-regulation, sensory load and executive function in kindergarten settings.',
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
      'https://playmoveimprove-regulator-champions.vercel.app/emotional-regulation-early-childhood',
  },
};

export default function EmotionalRegulationEarlyChildhoodPage() {
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
            Early Childhood Educator Guide
          </span>

          <h1 className="mt-5 max-w-4xl text-3xl font-extrabold leading-tight md:text-5xl">
            Emotional Regulation in Early Childhood
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            Emotional regulation is not simply a child learning to “calm down”.
            It develops through repeated experiences of being supported,
            understood and guided by adults who can read what is happening
            beneath the behaviour.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            For early childhood educators, that means looking at the child, the
            environment, the routine and the adult response together.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-14 px-6 py-12">
        {/* INTRO */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              What Educators Need to Know
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Emotional regulation develops through co-regulation first
            </h2>

            <p className="text-sm leading-relaxed text-slate-700">
              Young children are still developing the brain networks and
              executive-function skills needed to notice emotions, manage
              impulses, shift attention, tolerate frustration and return to a
              more settled state.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              That is why co-regulation matters. Before children can reliably
              regulate themselves, they often need an adult to help make the
              environment feel safer, reduce unnecessary demands, provide
              predictable cues and stay steady enough to support the next step.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              This does not mean removing every limit or avoiding every difficult
              experience. It means helping children remain connected enough to
              participate, learn and gradually build their own regulation skills.
            </p>
          </div>

          <aside className="rounded-3xl border border-teal-200 bg-teal-50 p-6">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
              A Useful Question
            </span>

            <p className="mt-3 text-lg font-extrabold leading-snug text-teal-950">
              Instead of asking, “How do I stop this behaviour?”
            </p>

            <p className="mt-3 text-sm leading-relaxed text-teal-900">
              Try asking, “What is making this moment harder for this child, and
              what support would help them participate more successfully?”
            </p>
          </aside>
        </section>

        {/* SIGNS */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              What Emotional Dysregulation Can Look Like
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              It does not always look like a meltdown
            </h2>
          </div>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            In early childhood settings, dysregulation can show up in very
            different ways. Some children become louder and more physical.
            Others become quiet, avoidant or unusually passive. Educators often
            notice the behaviour first, but the underlying regulation load can be
            easy to miss.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                'Escalation',
                'Shouting, hitting, throwing, pushing, running away or rapid emotional escalation.',
              ],
              [
                'Shutdown',
                'Going very quiet, hiding, refusing to engage, lying on the floor or appearing disconnected.',
              ],
              [
                'Constant movement',
                'Climbing, crashing, touching, pacing, wriggling or repeatedly leaving the group.',
              ],
              [
                'Difficulty with transitions',
                'Becoming distressed when an activity ends, resisting pack-up or struggling to move between spaces.',
              ],
              [
                'Impulse-control challenges',
                'Acting before thinking, grabbing, interrupting or struggling to wait even when the child knows the expectation.',
              ],
              [
                'Low frustration tolerance',
                'Giving up quickly, becoming distressed by mistakes or finding small changes unexpectedly difficult.',
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

        {/* BEHAVIOUR */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white md:p-9">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-300">
            Look Beyond Behaviour
          </span>

          <h2 className="mt-2 text-2xl font-extrabold">
            Behaviour is often the last thing we see, not the first thing that happened
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'Sensory load',
                'Noise, movement, touch, visual clutter, temperature, crowding or a busy room can increase the effort required to stay organised.',
              ],
              [
                'Executive-function demands',
                'Waiting, stopping, shifting attention, remembering instructions and coping with changes all place demands on developing executive-function skills.',
              ],
              [
                'Physical state',
                'Fatigue, hunger, illness, toileting needs and low movement opportunities can change how much regulation capacity a child has available.',
              ],
              [
                'Relationship and predictability',
                'Children often manage difficult moments better when they know what is happening, who will help and what comes next.',
              ],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-700 bg-slate-800 p-5"
              >
                <strong className="block text-sm font-bold text-white">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-slate-300">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* COREGULATION */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Co-Regulation in Early Childhood
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              What co-regulation can look like in practice
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'Reduce unnecessary language',
                'When a child is already overwhelmed, long explanations can add more demand. Use short, calm, predictable language.',
              ],
              [
                'Change the environment first',
                'Move away from noise, reduce crowding, create more space or lower the number of competing demands before expecting the child to respond.',
              ],
              [
                'Offer a clear next step',
                'Children often cope better when the adult makes the next action obvious and manageable rather than giving multiple choices or instructions.',
              ],
              [
                'Use movement intentionally',
                'Some children regulate more successfully when they are allowed to move, push, carry, walk or change position rather than being expected to stay still.',
              ],
              [
                'Stay relational',
                'A calm adult presence, predictable tone and familiar routine can make it easier for a child to reconnect after an emotional peak.',
              ],
              [
                'Reflect afterwards',
                'Once everyone is settled, educators can look at what happened before the escalation and consider what could be changed next time.',
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

        {/* CALM */}
        <section className="rounded-3xl border border-teal-300 bg-teal-50 p-6 md:p-9">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            The CALM Framework
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-teal-950">
            A simple way for teams to slow the moment down
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-teal-900">
            Regulator Champions uses the CALM framework to help educators look
            beyond the immediate behaviour and make more deliberate decisions.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['C', 'Check the Room', 'What in the environment may be increasing the child’s load?'],
              ['A', 'Assess the Why', 'What might the behaviour be communicating in this moment?'],
              ['L', 'Lead with Connection', 'How can the adult make the next step feel safe and achievable?'],
              ['M', 'Monitor and Note', 'What changed, what helped and what should the team remember next time?'],
            ].map(([letter, title, description]) => (
              <div
                key={letter}
                className="rounded-2xl border border-teal-200 bg-white p-5"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-teal-800 text-sm font-extrabold text-white">
                  {letter}
                </span>
                <strong className="mt-3 block text-sm font-bold text-teal-950">
                  {title}
                </strong>
                <p className="mt-2 text-xs leading-relaxed text-teal-900">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WHY ONE OFF PD */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Educator Capacity Building
            </span>
            <h2 className="mt-2 text-xl font-extrabold text-slate-900">
              Knowing what to do is different from being able to do it in a busy room
            </h2>
          </div>

          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-slate-700">
              A one-off emotional regulation workshop can give educators useful
              ideas, but implementation becomes difficult when the room is busy,
              staff responses differ or the strategy does not work the first
              time.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              Capacity building is stronger when educators have time to learn,
              try something, notice what happened, talk about it and make the
              next adjustment. That is why Regulator Champions is structured as
              a progressive coaching and professional learning pathway rather
              than a single information session.
            </p>

            <Link
              href="/educator-capacity-building"
              className="inline-flex text-sm font-bold text-teal-800 underline decoration-teal-300 underline-offset-4 hover:text-teal-950"
            >
              Read more about educator capacity building →
            </Link>
          </div>
        </section>

        {/* WHOLE TEAM */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Whole-Team Practice
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Emotional regulation support becomes harder when every adult responds differently
            </h2>
          </div>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            Children often move between educators, rooms, routines and shifts
            across the week. If one educator offers movement, another insists on
            sitting still, another uses a visual cue and another responds only
            after behaviour escalates, the child is also having to adapt to four
            different systems.
          </p>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            Whole-service professional learning does not require every educator
            to respond identically. It creates enough shared understanding that
            the team can recognise common regulation needs, use consistent
            language and make decisions from the same underlying framework.
          </p>
        </section>

        {/* FAQ */}
        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Common Questions
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Emotional regulation questions educators often ask
            </h2>
          </div>

          <div className="space-y-3">
            {[
              [
                'What is emotional regulation in early childhood?',
                'Emotional regulation is the developing ability to notice, manage and recover from emotional states. In young children it develops gradually and is strongly supported by co-regulation with responsive adults.',
              ],
              [
                'What is the difference between regulation and co-regulation?',
                'Regulation refers to how a person manages their internal state. Co-regulation is the support another person provides through relationship, environment, language, predictability and responsive guidance.',
              ],
              [
                'Why does a child behave well in one room but struggle in another?',
                'Different rooms can place very different sensory, social and executive-function demands on a child. Noise, transitions, staff responses, group size and routine predictability can all change how much regulation effort is required.',
              ],
              [
                'Should educators use calming strategies during a meltdown?',
                'Sometimes, but timing matters. When a child is highly overwhelmed, reducing demands, keeping language simple and providing a steady adult presence may be more useful than asking the child to complete a breathing or reflection activity.',
              ],
              [
                'Does emotional regulation professional development help educators?',
                'Professional development can help when it builds shared understanding and is followed by opportunities to practise, reflect and adjust. Information alone does not guarantee that new approaches will become part of everyday practice.',
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

        {/* FUNDING LINKS */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Funding Professional Learning
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Looking for funding to build educator capability?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Regulator Champions may fit within early childhood funding pathways
            where a service has identified emotional regulation,
            co-regulation, executive function or educator capability as a
            priority.
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
            childhood teams focuses on helping educators understand movement,
            sensory processing, regulation, executive function and children's
            participation in everyday learning environments.
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
                Build emotional regulation practice across the whole team
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-teal-100">
                Regulator Champions gives early childhood teams a progressive
                pathway for building shared co-regulation practice, reflective
                coaching and more consistent responses across everyday routines.
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