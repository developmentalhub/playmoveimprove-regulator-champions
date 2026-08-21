import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Emotional Regulation in Early Childhood | Regulator Champions',

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
      'A practical guide for early childhood educators who want to understand what may sit underneath behaviour and support regulation through connection, environment and thoughtful adult responses.',
    url: '/emotional-regulation-early-childhood',
    type: 'article',
  },
};

const SIGNS_TO_NOTICE = [
  {
    title: 'The child suddenly gets louder',
    text: 'Volume can increase when excitement, sensory load, fatigue or emotional demand is building. The useful question is not only how to quieten the child, but what changed before the volume increased.',
  },
  {
    title: 'The child starts running',
    text: 'Running can be playful, impulsive, sensory seeking, avoidance, excitement or an attempt to regulate through movement. Context matters.',
  },
  {
    title: 'The child becomes very still',
    text: 'Regulation difficulties do not always look busy. A child who freezes, withdraws, stops speaking or becomes unusually compliant may also be overwhelmed.',
  },
  {
    title: 'Everything becomes a refusal',
    text: 'Repeated “no”, dropping to the floor or avoiding instructions may appear behavioural, but can also emerge when the child no longer has enough capacity for another demand.',
  },
  {
    title: 'Small problems become very big',
    text: 'When a nervous system is already carrying a high load, a seemingly minor frustration can become the final demand the child cannot manage.',
  },
  {
    title: 'The child cannot return to the group',
    text: 'Recovery can take time. A child may look calmer before their attention, flexibility and social participation are genuinely available again.',
  },
];

const THREE_PLACES = [
  {
    number: '01',
    title: 'The child',
    text: 'What is their body communicating? Consider movement, breathing, posture, facial expression, voice, proximity, attention and changes from their usual behaviour.',
  },
  {
    number: '02',
    title: 'The environment',
    text: 'What is happening around them? Noise, crowding, transitions, visual load, waiting, unpredictable routines and competing sensory information can all matter.',
  },
  {
    number: '03',
    title: 'The adult response',
    text: 'What happens when we enter the moment? Our pace, voice, amount of language, physical position and urgency can either reduce or add to the demand.',
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
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              Emotional regulation in early childhood
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Before we ask a child to calm down, what is their body telling us?
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg">
              Emotional regulation is often talked about as though it is a skill
              a child should simply be able to use when things get difficult.
              In early childhood, it is much more relational than that.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              Young children are still developing the ability to manage strong
              feelings, sensory information, impulses, transitions and
              frustration. They often need adults to notice what is happening
              before expecting them to manage it alone.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Explore the 3 Ladder Preview
              </Link>

              <Link
                href="/feed"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Explore practice scenarios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-6 sm:p-7">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
              Regulation is not the same as being quiet
            </span>

            <p className="mt-3 max-w-4xl text-sm leading-relaxed text-[#53645D]">
              A child can be quiet and overwhelmed. A child can be moving and
              regulated. A child can follow an instruction while disconnected,
              frozen or trying very hard to hold themselves together. Looking
              only at whether behaviour appears calm can cause us to miss what
              is actually happening.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT REGULATION MEANS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Start here
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                Emotional regulation is the ability to respond and recover, not
                the absence of emotion.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                Children do not need to be calm all day. They need opportunities
                to experience excitement, frustration, disappointment,
                uncertainty and strong feelings while gradually learning what
                helps them remain connected and recover.
              </p>

              <p>
                In early childhood, that learning happens with other people.
                Adults lend children regulation through predictable
                relationships, thoughtful environments, body-based support and
                responses that match the child&apos;s current capacity.
              </p>

              <p>
                This is why co-regulation matters. Before self-regulation is
                reliable, children depend heavily on adults to help make
                difficult moments manageable enough for learning to occur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIGNS */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              What might regulation difficulty look like?
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Look for changes in the body, not just “challenging behaviour”.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              There is no single behaviour that proves a child is dysregulated.
              The pattern, context and change from that child&apos;s usual
              presentation are much more useful.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SIGNS_TO_NOTICE.map((item) => (
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

      {/* THREE PLACES */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
              Before choosing a strategy
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Look in three places.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D8E1DC]">
              Regulation is rarely only about the child. The environment and
              adult response are part of the picture too.
            </p>
          </div>

          <div className="mx-auto mt-9 grid max-w-6xl gap-4 md:grid-cols-3">
            {THREE_PLACES.map((item) => (
              <article
                key={item.number}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <span className="text-sm font-extrabold text-[#E4C98E]">
                  {item.number}
                </span>

                <h3 className="mt-2 text-xl font-extrabold text-white">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#C8D6D0]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* REAL EXAMPLES */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto mb-10 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Everyday examples
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Change the question before changing the child.
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              The aim is not to avoid boundaries or expectations. It is to make
              sure we understand the moment well enough to choose an appropriate
              response.
            </p>
          </div>

          <div className="space-y-5">
            {PRACTICE_EXAMPLES.map((example) => (
              <article
                key={example.situation}
                className="overflow-hidden rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5]"
              >
                <div className="grid lg:grid-cols-3">
                  <div className="p-6 sm:p-7">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                      What we see
                    </span>

                    <p className="mt-3 text-lg font-extrabold leading-relaxed text-[#1C3B34]">
                      {example.situation}
                    </p>
                  </div>

                  <div className="border-t border-[#E6E2DC] p-6 sm:p-7 lg:border-l lg:border-t-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                      The quick reaction
                    </span>

                    <p className="mt-3 text-sm font-semibold leading-relaxed text-[#53645D]">
                      {example.reaction}
                    </p>
                  </div>

                  <div className="border-t border-[#E6E2DC] bg-[#FAF5EC] p-6 sm:p-7 lg:border-l lg:border-t-0">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                      What else could we notice?
                    </span>

                    <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                      {example.noticing}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CALM DOWN STRATEGIES FAIL */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                Why strategies sometimes fail
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                A breathing exercise is not useful just because we call it a
                regulation strategy.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                Educators can end up with long lists of “calm-down strategies”
                that are offered regardless of why the child is struggling.
                Breathing, squeezing, heavy work, quiet spaces and sensory tools
                can all be useful in the right context, but none of them are
                universal answers.
              </p>

              <p>
                A child who is distressed by separation may need connection. A
                child who has been sitting for too long may need movement. A
                child overwhelmed by noise may need the environment changed. A
                child whose capacity has dropped may simply need fewer demands.
              </p>

              <p>
                Regulator Champions focuses on helping educators understand the
                moment first so the strategy is chosen for a reason.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CO-REGULATION */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              The adult matters too
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              Co-regulation is not something we do to a child.
            </h2>

            <p className="mt-5 text-base leading-relaxed text-[#53645D]">
              It is a relationship. Children notice our face, posture, voice,
              proximity, rhythm and emotional state. That does not mean an
              educator must remain perfectly calm all day. It means the adult is
              part of the regulation environment and deserves to be considered
              when reflecting on difficult moments.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6">
                <h3 className="text-lg font-extrabold text-[#1C3B34]">
                  More words are not always more support
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                  When a child is overloaded, repeatedly explaining,
                  questioning and reminding can increase the amount they need to
                  process.
                </p>
              </div>

              <div className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6">
                <h3 className="text-lg font-extrabold text-[#1C3B34]">
                  Connection does not remove boundaries
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                  We can remain warm and connected while still holding limits,
                  protecting safety and helping children participate in the
                  expectations of the setting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL LINKS */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/co-regulation-early-childhood"
              className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Read next
              </span>

              <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                Co-regulation in early childhood
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Explore why the adult-child relationship matters so much when
                regulation is still developing.
              </p>
            </Link>

            <Link
              href="/feed"
              className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Use with your team
              </span>

              <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                Practice scenarios
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Work through realistic room moments and practise noticing
                before reacting.
              </p>
            </Link>

            <Link
              href="/nqs-mapping"
              className="rounded-3xl border border-[#E6E2DC] bg-white p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                For leaders
              </span>

              <h3 className="mt-3 text-xl font-extrabold text-[#1C3B34]">
                NQS & QIP reflection
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Connect professional learning with critical reflection and
                service improvement.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* PROGRAM CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Regulator Champions
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Help your educators understand what is happening before behaviour
            escalates.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D8E1DC]">
            Regulator Champions gives whole teams a structured way to build
            confidence around regulation, co-regulation, sensory needs,
            participation and educator decision-making.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Start with 3 Ladders
            </Link>

            <Link
              href="/proposal?plan=full"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View the Full 8 Ladder Pathway
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="max-w-4xl text-[11px] leading-5 text-[#75827D]">
            This page provides general professional learning information for
            early childhood educators. It is not individual clinical advice and
            should not be used to diagnose a child or assume that a particular
            behaviour has one specific cause.
          </p>
        </div>
      </section>
    </main>
  );
}