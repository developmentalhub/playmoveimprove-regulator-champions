'use client';

import Link from 'next/link';
import { useState } from 'react';

const LADDER_ONE_RUNGS = [
  {
    number: 1,
    title: 'Notice Your Starting Point',
    image: '/images/ladders/ladder1_rung01.png',
    focus:
      'Begin by noticing your current energy, tension and emotional load.',
    practicePrompt:
      'Before entering the room, pause for a few seconds. Notice your shoulders, jaw, breathing and the speed of your thoughts without trying to judge or immediately change them.',
    reflectionQuestion:
      'What did you notice about your body and energy before beginning?',
  },
  {
    number: 2,
    title: 'Choose What You Need',
    image: '/images/ladders/ladder1_rung02.png',
    focus:
      'Use a small action that supports the state you need for the next part of the day.',
    practicePrompt:
      'Choose one realistic support before entering the room. This may be quiet, fresh air, water, slower breathing, movement or a brief conversation with a colleague.',
    reflectionQuestion:
      'What support did you choose, and why did it suit your needs?',
  },
  {
    number: 3,
    title: 'Prepare for a Pressure Point',
    image: '/images/ladders/ladder1_rung03.png',
    focus:
      'Identify one routine that is likely to place extra demand on you.',
    practicePrompt:
      'Choose one predictable pressure point such as arrivals, lunch, pack-up or staff handover. Decide in advance what will help you respond with less urgency.',
    reflectionQuestion:
      'Which routine did you prepare for, and what was your plan?',
  },
  {
    number: 4,
    title: 'Enter the Room Deliberately',
    image: '/images/ladders/ladder1_rung04.png',
    focus:
      'Notice the difference between rushing into the room and entering with awareness.',
    practicePrompt:
      'As you enter, slow down enough to observe the room before giving instructions or taking over a situation.',
    reflectionQuestion:
      'What did you notice when you paused before responding?',
  },
  {
    number: 5,
    title: 'Match Before You Guide',
    image: '/images/ladders/ladder1_rung05.png',
    focus:
      'Respond to the child’s current state before expecting them to move immediately into yours.',
    practicePrompt:
      'Notice whether the child is energetic, hesitant, distressed or withdrawn. Adjust your volume, pace, body position and amount of language before guiding the next step.',
    reflectionQuestion:
      'What did you change about your own approach?',
  },
  {
    number: 6,
    title: 'Reduce Unnecessary Language',
    image: '/images/ladders/ladder1_rung06.png',
    focus:
      'Notice when your own stress causes you to add more words.',
    practicePrompt:
      'During one difficult moment, reduce your response to one clear sentence or instruction. Allow processing time before speaking again.',
    reflectionQuestion:
      'What happened when you used fewer words?',
  },
  {
    number: 7,
    title: 'Check Your Body Position',
    image: '/images/ladders/ladder1_rung07.png',
    focus:
      'Consider how adult height, distance and movement may affect the interaction.',
    practicePrompt:
      'Choose a position that allows you to remain available without crowding or looming over the child. Maintain supervision and safety throughout.',
    reflectionQuestion:
      'How did your body position influence the interaction?',
  },
  {
    number: 8,
    title: 'Notice When You Are Carrying Too Much',
    image: '/images/ladders/ladder1_rung08.png',
    focus:
      'Identify when empathy has shifted into emotional overload.',
    practicePrompt:
      'During a demanding interaction, notice whether you are trying to solve everything at once or carrying the feelings of the child, family and team.',
    reflectionQuestion:
      'What pressure were you carrying that did not need to be solved immediately?',
  },
  {
    number: 9,
    title: 'Use a Brief Reset',
    image: '/images/ladders/ladder1_rung09.png',
    focus:
      'Practise returning to the room after a difficult moment without needing a perfect break.',
    practicePrompt:
      'Use a brief realistic reset such as water, fresh air, stretching your hands, relaxing your shoulders or asking a colleague for one minute of support.',
    reflectionQuestion:
      'Which reset was available to you, and what changed afterwards?',
  },
  {
    number: 10,
    title: 'Reflect Without Blame',
    image: '/images/ladders/ladder1_rung10.png',
    focus:
      'Review the day as information rather than proof that you succeeded or failed.',
    practicePrompt:
      'Choose one difficult moment and identify what increased the pressure, what helped and what you would change next time.',
    reflectionQuestion:
      'What will you repeat or adjust during the next similar situation?',
  },
];

export default function FreeGuidePage() {
  const [currentRungIndex, setCurrentRungIndex] = useState(0);

  const currentRung = LADDER_ONE_RUNGS[currentRungIndex];
  const totalRungs = LADDER_ONE_RUNGS.length;
  const isFirstRung = currentRungIndex === 0;
  const isLastRung = currentRungIndex === totalRungs - 1;

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            ← Home
          </Link>

          <span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-950">
            Ladder 1 Available Now
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-xl space-y-6 px-4 py-8">
        <section className="space-y-2 text-center">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Regulation Ladder 1
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Free Emotional Regulation Guide for Early Childhood Educators
          </h1>

          <p className="text-sm leading-relaxed text-slate-600">
            Regulated Educator, Regulated Room is a free 10-rung professional
            learning guide designed to help educators notice how their own
            stress, sensory needs, preparation and adult responses can influence
            co-regulation in the room.
          </p>
        </section>

        <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Free Early Childhood Regulation Resource
            </span>

            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              Why educator regulation matters before we ask children to regulate
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-slate-700">
            Young children often rely on adults to help them manage big
            emotions, transitions, sensory overload, frustration and change.
            That support is easier when educators can also notice what is
            happening in their own body, pace, voice and decision making.
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            This free guide begins with the educator rather than the child. Each
            rung gives you one small practice to try in a real early childhood
            setting, followed by a reflection question to help you notice what
            changed.
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            It is designed for early childhood educators, room leaders,
            educational leaders and directors who want practical professional
            learning around emotional regulation, co-regulation and whole-team
            consistency.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            [
              '10 practical rungs',
              'Work through one small educator practice at a time rather than trying to change everything at once.',
            ],
            [
              'Real-room application',
              'Use the prompts around arrivals, pack-up, staff handover, difficult interactions and everyday pressure points.',
            ],
            [
              'Reflective learning',
              'Each rung includes a question that helps you notice what happened and what you may adjust next time.',
            ],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-[#F7F3EC] p-5"
            >
              <strong className="block text-sm font-bold text-slate-900">
                {title}
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                {description}
              </p>
            </div>
          ))}
        </section>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>
              Rung {currentRung.number} of {totalRungs}
            </span>

            <span>Ladder 1</span>
          </div>

          <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-teal-700 transition-all duration-300"
              style={{
                width: `${((currentRungIndex + 1) / totalRungs) * 100}%`,
              }}
            />
          </div>
        </div>

        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-md">
          <div className="relative w-full bg-slate-100">
            <img
              src={currentRung.image}
              alt={`Rung ${currentRung.number}: ${currentRung.title}`}
              className="max-h-80 h-auto w-full object-cover"
            />
          </div>

          <div className="space-y-5 p-6">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
                Rung {currentRung.number} of {totalRungs}
              </span>

              <h2 className="mt-0.5 text-xl font-extrabold text-slate-900">
                {currentRung.title}
              </h2>
            </div>

            <div className="space-y-2">
              <strong className="block text-xs font-bold uppercase tracking-wider text-teal-900">
                Focus
              </strong>

              <p className="text-sm font-medium leading-relaxed text-slate-700">
                {currentRung.focus}
              </p>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <strong className="block text-xs font-bold uppercase tracking-wider text-amber-950">
                Practice
              </strong>

              <p className="mt-1 text-sm leading-relaxed text-amber-950">
                {currentRung.practicePrompt}
              </p>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
              <strong className="block text-xs font-bold uppercase tracking-wider text-teal-950">
                Reflect
              </strong>

              <p className="mt-1 text-sm leading-relaxed text-teal-950">
                {currentRung.reflectionQuestion}
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                disabled={isFirstRung}
                onClick={() =>
                  setCurrentRungIndex((previous) => previous - 1)
                }
                className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                ← Previous
              </button>

              {!isLastRung ? (
                <button
                  type="button"
                  onClick={() =>
                    setCurrentRungIndex((previous) => previous + 1)
                  }
                  className="rounded-xl bg-teal-800 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-teal-900"
                >
                  Next Rung →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentRungIndex(0)}
                  className="rounded-xl bg-emerald-700 px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-emerald-800"
                >
                  Restart Ladder ↺
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-center text-xs font-bold uppercase tracking-wider text-slate-700">
            Jump to a Rung
          </h2>

          <div className="mt-4 grid grid-cols-5 gap-2">
            {LADDER_ONE_RUNGS.map((rung, index) => {
              const isActive = index === currentRungIndex;

              return (
                <button
                  key={rung.number}
                  type="button"
                  onClick={() => setCurrentRungIndex(index)}
                  aria-label={`Open Rung ${rung.number}: ${rung.title}`}
                  className={`rounded-xl border px-2 py-2.5 text-xs font-bold transition ${
                    isActive
                      ? 'border-teal-800 bg-teal-800 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-teal-600'
                  }`}
                >
                  {rung.number}
                </button>
              );
            })}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-teal-200 bg-teal-50 p-6">
          <div className="space-y-1 text-center">
            <h2 className="text-sm font-bold text-teal-950">
              Printable PDF Card Packs
            </h2>

            <p className="text-xs leading-relaxed text-teal-900">
              Download the matching cards for educators, managers and
              families, along with the CALM room posters.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2.5 pt-1 sm:grid-cols-2">
            <a
              href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-teal-800 px-3.5 py-2.5 text-center text-xs font-bold text-white shadow-xs transition hover:bg-teal-900"
            >
              Educator Routine Cards →
            </a>

            <a
              href="/pdf/Calm-Posters.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-amber-400 px-3.5 py-2.5 text-center text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
            >
              CALM Room Posters →
            </a>

            <a
              href="/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-teal-700 bg-white px-3.5 py-2.5 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Manager / Director Cards →
            </a>

            <a
              href="/pdf/Morning-Routine-Ladder-Printable-Cards-Parents.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-teal-700 bg-white px-3.5 py-2.5 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Parent &amp; Family Cards →
            </a>
          </div>
        </section>

        <section className="rounded-3xl border border-teal-300 bg-teal-50 p-6">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Related Learning
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-teal-950">
            Go deeper into emotional regulation and co-regulation
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-teal-900">
            Ladder 1 focuses on the educator starting point. These related
            guides explain more about emotional regulation, co-regulation and
            why professional learning works best when teams have time to apply
            and reflect.
          </p>

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
              href="/somatic-checkin"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Free Somatic Check-In →
            </Link>

            <Link
              href="/early-childhood-professional-development"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Early Childhood PD Guide →
            </Link>
          </div>
        </section>

        <section className="space-y-5">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              Common Questions
            </span>

            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              Free emotional regulation guide FAQs
            </h2>
          </div>

          <div className="space-y-3">
            {[
              [
                'Who is this free guide for?',
                'The guide is designed for early childhood educators, room leaders, educational leaders and directors who want practical reflection around emotional regulation, co-regulation and educator self-awareness.',
              ],
              [
                'Is this a child behaviour program?',
                'No. Ladder 1 begins with educator awareness and professional practice. It does not diagnose children or provide an individual behaviour treatment plan.',
              ],
              [
                'How long does the guide take?',
                'You can move through all 10 rungs in one sitting or use one rung at a time across several days. The value comes from trying the practice in a real setting and reflecting on what happened.',
              ],
              [
                'What is co-regulation?',
                'Co-regulation is the support an adult provides through relationship, environment, language, pace, predictability and responsive guidance while a child is still developing their own regulation skills.',
              ],
              [
                'Can a whole team use this guide?',
                'Yes. Services can use the guide as a shared professional learning conversation, provided educators still have space to reflect honestly rather than treating the prompts as a performance assessment.',
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

        <section className="rounded-3xl border border-slate-200 bg-[#F7F3EC] p-6">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            About the Author
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-slate-900">
            Robyn Papworth
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Robyn is an Accredited Exercise Physiologist and Developmental
            Educator and the founder of Play Move Improve. Her work with early
            childhood teams focuses on movement, sensory processing, emotional
            regulation, executive function and practical co-regulation within
            everyday learning environments.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-teal-900 p-6 text-center text-white">
          <h3 className="text-base font-bold">
            Want to Continue Beyond the Free Guide?
          </h3>

          <p className="mx-auto max-w-sm text-xs leading-relaxed text-teal-100">
            Regulator Champions extends this learning into a progressive
            whole-service pathway. Start with the 3-Ladder Preview for $1,790
            including GST, or choose the full eight-ladder pathway for $4,790
            including GST.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="inline-block rounded-xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
            >
              Start With 3 Ladders ($1,790) →
            </Link>

            <Link
              href="/proposal?plan=full"
              className="inline-block rounded-xl border border-teal-700 bg-teal-800 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-700"
            >
              Full 8-Ladder Proposal ($4,790) →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}