'use client';

import Link from 'next/link';

export default function SafeTouchBlogPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* ARTICLE HEADER */}
      <section className="bg-white border-b border-[#E6E2DC]">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
          <Link
            href="/blog"
            className="text-sm font-bold text-[#657B6C] transition hover:text-[#1C3B34]"
          >
            Back to articles
          </Link>

          <p className="mt-8 text-sm font-semibold text-[#9A793D]">
            Safe touch and responsive care
          </p>

          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Safe touch in early childhood: when educators start second-guessing comfort
          </h1>

          <p className="mt-5 max-w-3xl text-xl font-semibold leading-relaxed text-[#53645D]">
            Not every early childhood team is worried about this.
            Some services feel very confident about appropriate touch,
            professional boundaries and comforting distressed children.
            Others have told me that recent child-safety training has
            left educators wondering whether interactions they once felt
            comfortable with are still appropriate.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6A7873]">
            This article is for those teams. It is not suggesting that
            safe touch is a widespread problem across early childhood.
            It is simply a resource for educators and leaders who are
            trying to hold child safety, professional judgement and warm,
            responsive care together.
          </p>

          <p className="mt-5 text-sm font-semibold text-[#657B6C]">
            By Robyn Papworth
          </p>

          <div className="mt-8 overflow-hidden">
            <img
              src="/images/feed/safe-touch-early-childhood.png"
              alt="Early childhood educator considering safe, appropriate comforting touch"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="space-y-7 text-lg leading-relaxed text-[#2B3833]">
            <p>
              I first started thinking more deeply about this after
              hearing from educators who had completed child-safety
              training and then found themselves questioning what to do
              in very ordinary moments of distress.
            </p>

            <p>
              A child cries at drop-off and reaches towards a trusted
              educator. Another child falls and immediately seeks
              physical comfort. An educator wants to respond warmly,
              but hesitates because they are trying to make sure their
              actions remain appropriate, visible and professionally
              defensible.
            </p>

            <p>
              At the same time, I have also spoken with services that
              are not finding this difficult at all. Their teams feel
              confident about when touch is appropriate, how to respond
              to a child&apos;s cues and where professional boundaries
              sit.
            </p>

            <div className="border-l-4 border-[#C29F60] bg-[#FAF5EC] p-6">
              <p className="text-xl font-extrabold leading-relaxed text-[#1C3B34]">
                That distinction matters. We do not need to create fear
                where there is already thoughtful, confident practice.
              </p>
            </div>

            <h2 className="pt-5 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Child safety and warmth do not have to sit on opposite sides
            </h2>

            <p>
              Strong safeguarding practice matters. Children need adults
              who understand professional boundaries, consent, visibility,
              organisational expectations and their responsibilities when
              something does not feel right.
            </p>

            <p>
              But a child-safe environment should not require educators
              to become emotionally distant from children who are upset,
              frightened or seeking reassurance.
            </p>

            <p>
              The more useful question is often not simply,
              <strong> “Am I allowed to touch this child?”</strong> It is:
              <strong> “What is this child communicating, what is the
              purpose of my response, and is the contact appropriate in
              this context?”</strong>
            </p>

            <h2 className="pt-5 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Start with the child&apos;s cues
            </h2>

            <p>
              Physical comfort should not be something adults impose
              because they personally prefer closeness. The child&apos;s
              body gives us useful information.
            </p>

            <div className="border-y border-[#D8CFC2]">
              <ReflectionPoint
                title="The child moves closer"
                text="They may be seeking proximity, reassurance or physical comfort. Notice whether they are actively approaching the educator, reaching, leaning in or otherwise inviting closeness."
              />

              <ReflectionPoint
                title="The child pulls away"
                text="Turning away, stiffening, moving backwards or trying to leave are important cues that the adult should reduce or stop physical contact unless immediate safety requires otherwise."
              />

              <ReflectionPoint
                title="The child is overwhelmed"
                text="A distressed child may not be able to answer a series of questions about what they want. Educators still need to observe body language, context, safety and the least intrusive response that helps."
              />
            </div>

            <h2 className="pt-5 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Appropriate touch is also about purpose
            </h2>

            <p>
              The same type of physical contact can mean very different
              things depending on why it is happening and how the child
              responds.
            </p>

            <p>
              Briefly comforting a distressed child who approaches a
              familiar educator is different from repeatedly encouraging
              physical closeness that the child has not sought.
              Supporting a child physically to prevent an immediate
              safety risk is different from using physical contact
              primarily to force compliance.
            </p>

            <p>
              This is why blanket rules are often difficult to apply to
              every real-world interaction. Educators need policies and
              safeguarding expectations, but they also need enough
              professional judgement to interpret the situation in front
              of them.
            </p>

            <h2 className="pt-5 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              A simple way to think through the moment
            </h2>

            <p>
              When a team is feeling uncertain, I use a very simple
              sequence: <strong>Pause, Notice, Respond.</strong>
            </p>

            <div className="border-y border-[#D8CFC2]">
              <ReflectionPoint
                title="Pause"
                text="Notice your own reaction first. Are you rushing, frightened of getting it wrong, feeling pressure to stop the crying quickly, or responding automatically?"
              />

              <ReflectionPoint
                title="Notice"
                text="Look at the child. Are they moving towards you or away? What is happening in their face, posture, voice and movement? What happened immediately before this moment?"
              />

              <ReflectionPoint
                title="Respond"
                text="Choose a response that supports the child while remaining purposeful, appropriate, visible and consistent with your organisation’s expectations and the requirements that apply where you work."
              />
            </div>

            <h2 className="pt-5 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Your team may not need this resource
            </h2>

            <p>
              If your educators already feel clear and confident about
              safe touch, comforting children and professional
              boundaries, I would not manufacture a problem that is not
              there.
            </p>

            <p>
              There may be far more pressing professional learning needs
              in your rooms right now: difficult drop-offs, transitions
              that repeatedly escalate, children struggling to
              participate, sensory overload, biting, running, shutdown,
              group-time expectations or educators feeling unsure what
              sits underneath repeated behaviour.
            </p>

            <p>
              Those are the broader regulation questions I am spending
              much more of my time helping teams work through.
            </p>
          </div>
        </div>
      </article>

      {/* SAFE TOUCH GUIDE */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                If this is an issue in your team
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Download the Safe Touch guide.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                I created <strong>Can I Still Comfort a Distressed Child?</strong>{' '}
                for teams that genuinely are having this conversation.
                It includes practical reflection around child cues,
                professional boundaries, safe responsive care and a
                printable staff checklist.
              </p>

              <Link
                href="/free-guide"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
              >
                View the Free Safe Touch Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BROADER NEED */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                If touch is not your team&apos;s issue
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start with the difficult moments that keep repeating.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#D8E1DC]">
                A child freezes at drop-off. Another cannot stay with the
                group. Someone keeps running, throwing, biting or
                becoming overwhelmed when the room gets busy.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                The Free Regulation Ladder shows how educators, leaders
                and families can look beyond the behaviour and consider
                what may need to change before deciding what to try next.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/playbooks"
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
                >
                  Try the Free Regulation Ladder
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
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <p className="max-w-4xl text-xs leading-5 text-[#75827D]">
            This article supports professional reflection and team
            discussion. It is not legal advice and does not replace your
            organisation&apos;s policies, safeguarding procedures,
            licensing requirements, regulatory guidance or other
            requirements that apply in your location.
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
    <div className="border-b border-[#D8CFC2] py-6 last:border-b-0">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
  );
}