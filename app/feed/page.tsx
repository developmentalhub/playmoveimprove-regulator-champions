'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Filter =
  | 'all'
  | 'transitions'
  | 'environment'
  | 'connection'
  | 'reflection';

const PRACTICE_SCENARIOS = [
  {
    id: 1,
    category: 'transitions',
    tag: 'Transitions',
    title: 'The room gets louder just before group time',
    situation:
      'Children have just come inside. Several are moving quickly between spaces, one child is calling loudly across the room and another is bumping into peers while educators begin asking everyone to sit on the mat.',
    notice: [
      'The transition happened quickly.',
      'The room is already noisy before the group experience begins.',
      'Several children are still seeking movement.',
      'Educators are beginning to add more verbal instructions.',
    ],
    consider:
      'Before deciding that children are not listening, consider whether their bodies have had enough time and support to shift from active movement into a quieter group expectation.',
    tryNext:
      'Slow the transition. Reduce unnecessary talking, create more physical space around the mat and give children a brief movement or heavy-work opportunity before expecting them to settle.',
    reflection:
      'Did changing the transition reduce the amount of repeated prompting needed from educators?',
  },
  {
    id: 2,
    category: 'connection',
    tag: 'Drop-off',
    title: 'A child freezes at the doorway',
    situation:
      'A child arrives holding tightly to their parent and stops at the entrance. The educator encourages them to come inside, but the child does not move and begins looking down at the floor.',
    notice: [
      'The child is not moving towards the room.',
      'Their body appears still rather than actively resistant.',
      'The doorway is busy with other families arriving.',
      'The adult response is becoming more directive.',
    ],
    consider:
      'Instead of assuming the child is refusing to separate, consider whether the doorway itself, the social demand or the speed of the transition may be overwhelming.',
    tryNext:
      'Reduce the number of words being used, lower your physical position, give the child more time and consider whether a familiar arrival anchor could make entering the room feel more predictable.',
    reflection:
      'What changed when the adult reduced pressure and allowed more time for the child to enter?',
  },
  {
    id: 3,
    category: 'environment',
    tag: 'Environment',
    title: 'One corner of the room keeps becoming chaotic',
    situation:
      'The construction area regularly becomes crowded. Children are stepping over resources, knocking over structures and becoming frustrated with each other even though educators have reminded them several times to play carefully.',
    notice: [
      'The difficulty keeps happening in the same physical area.',
      'There are several popular resources competing for limited floor space.',
      'Children are moving through the area to reach another part of the room.',
      'Repeated verbal reminders have not solved the problem.',
    ],
    consider:
      'When the same behaviour keeps appearing in the same place, the environment deserves as much attention as the children using it.',
    tryNext:
      'Look at traffic flow, the amount of available floor space and where high-interest resources are positioned. Trial one environmental change before adding another rule.',
    reflection:
      'Did changing the space alter the behaviour without needing additional adult correction?',
  },
  {
    id: 4,
    category: 'reflection',
    tag: 'Educator reflection',
    title: 'The child calms down with one educator but not another',
    situation:
      'A child frequently becomes distressed during transitions. One educator seems able to help them recover quickly, while another educator finds the same child becomes increasingly upset.',
    notice: [
      'The child is experiencing the same routine.',
      'The adult responses are different.',
      'One educator may use fewer words or a slower pace.',
      'The child may be responding to differences in proximity, tone or timing.',
    ],
    consider:
      'This is an opportunity to reflect on practice without blaming either educator. The useful question is what the child may be responding to differently.',
    tryNext:
      'Compare the two interactions. Look at body position, voice, amount of language, timing, expectations and how quickly each adult moves in to solve the problem.',
    reflection:
      'What can the team learn from the interaction that is working well?',
  },
  {
    id: 5,
    category: 'transitions',
    tag: 'Pack-up',
    title: 'Pack-up time turns into repeated reminders',
    situation:
      'Educators announce pack-up and several children continue playing. Instructions become louder and more frequent while some children begin rushing around putting items away without knowing where they belong.',
    notice: [
      'Children are being asked to stop a preferred activity suddenly.',
      'The room becomes busier as everyone starts moving at once.',
      'Some children may not know what “pack up” means in practical steps.',
      'Adults are increasing language as the room becomes more dysregulated.',
    ],
    consider:
      'What looks like non-compliance may also involve difficulty shifting attention, understanding the task, coping with interruption or organising several steps at once.',
    tryNext:
      'Give an earlier warning, break the task into smaller actions and reduce the amount of language. Consider whether different children need different ways to enter the transition.',
    reflection:
      'Which children needed less adult prompting when the transition became more predictable?',
  },
  {
    id: 6,
    category: 'connection',
    tag: 'Comfort',
    title: 'A distressed child reaches towards an educator',
    situation:
      'A child is crying after separation from their parent and reaches both arms towards a familiar educator. The educator hesitates because they are worried about whether offering physical comfort is appropriate.',
    notice: [
      'The child is actively seeking connection.',
      'The educator is experiencing uncertainty.',
      'The interaction is happening during a vulnerable transition.',
      'The child’s individual communication and service expectations both matter.',
    ],
    consider:
      'Good safeguarding and warm, responsive care do not need to be treated as opposites. The purpose, context, child cues, boundaries and service policies all belong in the decision.',
    tryNext:
      'Pause long enough to consider the individual child and the context rather than reacting automatically from either fear or habit.',
    reflection:
      'How can your team create clearer shared expectations around safe, appropriate comforting responses?',
  },
];

const FILTERS: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All scenarios' },
  { id: 'transitions', label: 'Transitions' },
  { id: 'environment', label: 'Environment' },
  { id: 'connection', label: 'Connection' },
  { id: 'reflection', label: 'Educator reflection' },
];

export default function FeedPage() {
  const [activeFilter, setActiveFilter] =
    useState<Filter>('all');

  const filteredScenarios =
    activeFilter === 'all'
      ? PRACTICE_SCENARIOS
      : PRACTICE_SCENARIOS.filter(
          (scenario) =>
            scenario.category === activeFilter,
        );

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              Regulator Champions practice scenarios
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Before we react, what else might be
              happening here?
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg">
              Real early childhood moments rarely fit
              neatly into one strategy. These
              scenarios are designed to help
              educators slow the moment down, notice
              more and think about what they might
              try next.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              They are not model answers. They are
              conversation starters for teams who
              want to strengthen professional
              judgement, co-regulation and reflective
              practice.
            </p>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6">
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                01
              </span>

              <h2 className="mt-2 text-lg font-extrabold">
                Notice
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                What can we actually see in the
                child, educator and environment?
              </p>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                02
              </span>

              <h2 className="mt-2 text-lg font-extrabold">
                Consider
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                What might be sitting underneath the
                behaviour or difficulty?
              </p>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                03
              </span>

              <h2 className="mt-2 text-lg font-extrabold">
                Try and review
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Make one thoughtful change, then
                notice what happens afterwards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FILTERS */}
      <section className="bg-[#FAF8F5] pt-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() =>
                  setActiveFilter(filter.id)
                }
                className={`min-h-11 rounded-full border px-4 py-2 text-xs font-bold transition ${
                  activeFilter === filter.id
                    ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                    : 'border-[#D8D0C4] bg-white text-[#53645D] hover:border-[#657B6C]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIOS */}
      <section className="bg-[#FAF8F5] py-10 sm:py-14">
        <div className="mx-auto max-w-7xl space-y-6 px-5 sm:px-6">
          {filteredScenarios.map((scenario) => (
            <article
              key={scenario.id}
              className="overflow-hidden rounded-4xl border border-[#E6E2DC] bg-white shadow-sm"
            >
              <div className="grid lg:grid-cols-[0.34fr_0.66fr]">
                {/* LEFT */}
                <div className="bg-[#1C3B34] p-6 text-white sm:p-8">
                  <span className="inline-flex rounded-full bg-[#C29F60] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#1C3B34]">
                    {scenario.tag}
                  </span>

                  <h2 className="mt-5 text-2xl font-extrabold leading-tight">
                    {scenario.title}
                  </h2>

                  <p className="mt-5 text-sm leading-relaxed text-[#D8E1DC]">
                    {scenario.situation}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="space-y-6 p-6 sm:p-8">
                  <section>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                      First, what can we notice?
                    </span>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                      {scenario.notice.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-4"
                        >
                          <p className="text-sm leading-relaxed text-[#53645D]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="rounded-3xl bg-[#FAF5EC] p-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                      Consider
                    </span>

                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[#1C3B34]">
                      {scenario.consider}
                    </p>
                  </section>

                  <section className="rounded-3xl border border-[#D7E2DC] bg-[#F1F5F2] p-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                      Something you could try
                    </span>

                    <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                      {scenario.tryNext}
                    </p>
                  </section>

                  <section className="border-t border-[#E6E2DC] pt-5">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                      Bring this back to your team
                    </span>

                    <p className="mt-2 text-base font-extrabold leading-relaxed text-[#1C3B34]">
                      {scenario.reflection}
                    </p>
                  </section>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* WHY THIS IS DIFFERENT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Not a behaviour recipe book
              </span>

              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
                The answer should not always be
                another strategy.
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#53645D]">
              <p>
                When educators are under pressure,
                it is very easy to move straight from
                behaviour to intervention. The child
                is running, so we stop the running.
                The child will not sit, so we remind
                them to sit. The child is crying, so
                we try to make the crying stop.
              </p>

              <p>
                Regulator Champions asks educators to
                get curious about the moment before
                deciding what needs fixing. Sometimes
                the useful change sits with the
                environment. Sometimes it is the
                transition. Sometimes the child needs
                support, and sometimes the adult
                response is part of what deserves
                reflection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NQS BRIDGE */}
      <section className="bg-[#FAF5EC] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                For directors and educational leaders
              </span>

              <h2 className="mt-3 text-2xl font-extrabold text-[#1C3B34] sm:text-3xl">
                Turn the scenario into genuine
                critical reflection.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#53645D]">
                Use one scenario in a team meeting,
                compare it with something happening
                in your own service, decide what you
                want to trial and then return to what
                changed.
              </p>
            </div>

            <Link
              href="/nqs-mapping"
              className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
            >
              Explore NQS & QIP reflection
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
            These scenarios are the conversation.
            The ladders build the practice.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D8E1DC]">
            Regulator Champions gives your whole
            service a structured pathway for
            strengthening co-regulation, educator
            judgement and more thoughtful responses
            across everyday routines.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              View the 3 Ladder Preview
            </Link>

            <Link
              href="/"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore Regulator Champions
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <p className="max-w-4xl text-[11px] leading-5 text-[#75827D]">
            These scenarios are professional
            reflection examples only. They are not
            individual clinical advice and do not
            replace service policies, safeguarding
            requirements, professional judgement or
            the individual needs of a child.
          </p>
        </div>
      </section>
    </main>
  );
}