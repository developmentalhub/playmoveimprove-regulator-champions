import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Co-Regulation in Early Childhood | Practical Educator Guide',
  description:
    'A practical early childhood educator guide to co-regulation, emotional regulation, adult responses, sensory load, transitions and whole-team practice.',
  alternates: {
    canonical: '/co-regulation-early-childhood',
  },
  openGraph: {
    title: 'Co-Regulation in Early Childhood | Practical Educator Guide',
    description:
      'Understand what co-regulation looks like in early childhood settings and how educators can support children through relationship, environment, language and predictable responses.',
    url: '/co-regulation-early-childhood',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Co-Regulation in Early Childhood: A Practical Guide for Educators',
  description:
    'A practical guide for early childhood educators supporting co-regulation through relationship, environment, language, sensory awareness and whole-team practice.',
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
      'https://playmoveimprove-regulator-champions.vercel.app/co-regulation-early-childhood',
  },
};

export default function CoRegulationEarlyChildhoodPage() {
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
            Co-Regulation in Early Childhood
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            Co-regulation is not about making children calm on command. It is
            the support adults provide through relationship, environment,
            language, pacing and predictable responses while children are still
            developing their own regulation skills.
          </p>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-teal-100 md:text-base">
            In practice, co-regulation often starts with what the adult notices,
            changes and communicates before expecting the child to do something
            different.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl space-y-14 px-6 py-12">
        {/* DEFINITION */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              What Co-Regulation Means
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Children learn regulation through supported experiences
            </h2>

            <p className="text-sm leading-relaxed text-slate-700">
              Young children are still developing the ability to notice internal
              states, stop an impulse, shift attention, cope with change and
              recover after frustration.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              Co-regulation is the temporary support an adult provides while
              those abilities are still emerging. The adult may change their
              tone, reduce language, adjust the environment, slow the pace,
              provide a predictable cue or help the child take the next
              manageable step.
            </p>

            <p className="text-sm leading-relaxed text-slate-700">
              Over time, repeated experiences of being supported through
              difficult moments can help children build more independent
              regulation skills.
            </p>
          </div>

          <aside className="rounded-3xl border border-amber-300 bg-amber-50 p-6">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-800">
              Important Distinction
            </span>

            <p className="mt-3 text-lg font-extrabold leading-snug text-slate-900">
              Co-regulation is support, not control
            </p>

            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              The aim is not to suppress emotion or force immediate compliance.
              The aim is to help the child remain connected enough to
              participate, recover and learn.
            </p>
          </aside>
        </section>

        {/* WHAT IT LOOKS LIKE */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              What Co-Regulation Looks Like
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Practical co-regulation strategies for educators
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              [
                'Slow your pace',
                'Move and speak more deliberately instead of matching the speed of an escalating moment.',
              ],
              [
                'Use fewer words',
                'Long explanations can add demand when a child is already overwhelmed. Keep language short and clear.',
              ],
              [
                'Adjust the environment',
                'Reduce crowding, noise, visual demand or unnecessary social pressure before asking the child to manage more.',
              ],
              [
                'Lower physical intensity',
                'Consider adult height, distance and body position so you can stay available without crowding or looming.',
              ],
              [
                'Offer a predictable next step',
                'Children often cope better when they know what is happening now and what comes next.',
              ],
              [
                'Allow movement when helpful',
                'Some children regulate more effectively when movement is part of the response rather than something they are expected to stop immediately.',
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

        {/* NOT JUST CALMING */}
        <section className="rounded-3xl bg-slate-900 p-6 text-white md:p-9">
          <span className="block text-xs font-bold uppercase tracking-wider text-amber-300">
            Beyond Calming Strategies
          </span>

          <h2 className="mt-2 text-2xl font-extrabold">
            Co-regulation is bigger than breathing cards and calm corners
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-slate-300">
            Breathing activities, sensory tools and quiet spaces can be useful,
            but they are only part of the picture. A child may still struggle if
            the room remains too noisy, instructions keep coming too quickly or
            adults respond inconsistently.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'A strategy can be helpful',
                'But timing, adult support and environmental demand still matter.',
              ],
              [
                'A calm corner can be useful',
                'But it should not become a place children are sent away to manage alone.',
              ],
              [
                'Breathing can help',
                'But asking for controlled breathing during peak distress may add another demand.',
              ],
              [
                'Visual supports can help',
                'But they work best when adults use them consistently and the child understands what they mean.',
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

        {/* ADULT STATE */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              The Adult Starting Point
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Educator awareness is part of co-regulation
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed text-slate-700">
                Educators do not need to be perfectly calm before they support a
                child. They do benefit from noticing when their own stress is
                making them speak faster, add more words, move more abruptly or
                become less flexible.
              </p>

              <p className="text-sm leading-relaxed text-slate-700">
                A small amount of adult self-awareness can change the whole
                interaction. Slowing down, softening the voice or asking a
                colleague for brief support may create enough space to respond
                more deliberately.
              </p>

              <Link
                href="/somatic-checkin"
                className="inline-flex rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-900"
              >
                Try the Free Somatic Check-In →
              </Link>
            </div>

            <div className="rounded-3xl border border-teal-200 bg-teal-50 p-6">
              <strong className="block text-sm font-bold text-teal-950">
                Co-regulation does not require perfection
              </strong>

              <p className="mt-3 text-xs leading-relaxed text-teal-900">
                Repair matters too. Educators can acknowledge when a moment did
                not go well, reconnect and try again. Children learn from those
                experiences as well.
              </p>
            </div>
          </div>
        </section>

        {/* TRANSITIONS */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Co-Regulation During Transitions
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Transitions reveal how much regulation demand a routine creates
          </h2>

          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-700">
            Pack-up, arrivals, group time, handovers and moving indoors or
            outdoors all require children to stop one thing, hold information,
            shift attention, cope with change and respond to adult expectations.
          </p>

          <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-700">
            When a transition repeatedly leads to distress, it is worth looking
            at the routine itself rather than assuming the child simply needs
            more reminders.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              [
                'Can we give more warning?',
                'A predictable cue may reduce the sudden demand of stopping an activity.',
              ],
              [
                'Can we reduce instructions?',
                'One clear step can be easier to process than several directions delivered at once.',
              ],
              [
                'Can movement be part of the transition?',
                'Walking, carrying or helping with a purposeful task can support some children to shift more successfully.',
              ],
              [
                'Can the adult response be more consistent?',
                'Shared cues and expectations reduce the need for children to decode different adult systems.',
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

        {/* WHOLE TEAM */}
        <section className="space-y-6">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Whole-Team Co-Regulation
            </span>

            <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
              Consistency does not mean every educator responds identically
            </h2>
          </div>

          <p className="max-w-4xl text-sm leading-relaxed text-slate-700">
            Good co-regulation is responsive, so educators will not always use
            the same words or the same strategy. What matters is that the team
            shares enough understanding to make decisions from the same
            principles.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              [
                'Shared language',
                'Educators understand concepts such as load, co-regulation, executive function and environmental demand.',
              ],
              [
                'Shared principles',
                'The team knows that reducing unnecessary demand and staying relational come before adding more instructions.',
              ],
              [
                'Shared reflection',
                'Staff can discuss what happened without blaming the child or the educator.',
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

        {/* RELATED CONTENT */}
        <section className="rounded-3xl border border-teal-300 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Related Educator Guides
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-teal-950">
            Continue building your team's regulation knowledge
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/emotional-regulation-early-childhood"
              className="rounded-xl bg-teal-800 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Emotional Regulation Guide →
            </Link>

            <Link
              href="/educator-capacity-building"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Educator Capacity Building →
            </Link>

            <Link
              href="/free-guide"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Free Regulation Guide →
            </Link>

            <Link
              href="/early-childhood-professional-development"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Early Childhood PD Guide →
            </Link>
          </div>
        </section>

        {/* FUNDING */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Funding Co-Regulation Professional Learning
          </span>

          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            Looking for a funded professional learning pathway?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-700">
            Services may be able to use early childhood funding where
            co-regulation, emotional regulation, executive function or educator
            capability are identified priorities.
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
              Co-regulation FAQs for early childhood educators
            </h2>
          </div>

          <div className="space-y-3">
            {[
              [
                'What is co-regulation in early childhood?',
                'Co-regulation is the support an adult provides while a child is developing their own regulation skills. It can include relationship, language, environment, predictability, pacing and responsive guidance.',
              ],
              [
                'How is co-regulation different from self-regulation?',
                'Self-regulation describes the child’s developing ability to manage internal states and behaviour more independently. Co-regulation is the support another person provides while those abilities are still developing.',
              ],
              [
                'Is co-regulation the same as calming a child down?',
                'No. Co-regulation may help a child settle, but the broader goal is to support connection, participation, recovery and learning rather than simply reduce visible emotion.',
              ],
              [
                'Can co-regulation include boundaries and limits?',
                'Yes. Co-regulation can include clear boundaries. The difference is that the adult communicates and supports the boundary in a way that considers the child’s current state and capacity.',
              ],
              [
                'Why is whole-team consistency important?',
                'Children interact with multiple educators. Shared principles can reduce confusion and help the child experience more predictable support across rooms and routines.',
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
            childhood teams focuses on emotional regulation, movement, sensory
            processing, executive function and practical co-regulation within
            everyday learning environments.
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
                Build co-regulation practice across the whole team
              </h2>

              <p className="mt-2 max-w-2xl text-xs leading-relaxed text-teal-100">
                Regulator Champions is a progressive professional learning and
                coaching pathway for early childhood services building shared
                regulation practice.
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