import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Before I Offer Comforting Touch | Early Childhood Reflection Checklist',

  description:
    'A practical reflection checklist for early childhood educators who want to think through child cues, purpose, professional boundaries and appropriate comforting touch.',

  alternates: {
    canonical:
      '/blog/before-i-offer-comforting-touch-checklist',
  },

  openGraph: {
    title:
      'Before I Offer Comforting Touch | Early Childhood Reflection Checklist',
    description:
      'A practical reflection tool for early childhood teams who are genuinely having questions about appropriate comforting touch.',
    url:
      '/blog/before-i-offer-comforting-touch-checklist',
    type: 'article',
  },
};

const checklistQuestions = [
  {
    step: '1',
    title: 'What is happening for this child right now?',
    detail:
      'Are they distressed, hurt, overwhelmed, seeking reassurance, needing help to move safely, or simply wanting closeness?',
  },
  {
    step: '2',
    title: 'Is the child moving towards connection?',
    detail:
      'Are they reaching for me, leaning in, holding out their hand, asking to be picked up, or showing another sign that closeness is welcome?',
  },
  {
    step: '3',
    title:
      'What is their body telling me once contact begins?',
    detail:
      'Are they softening and settling, or are they stiffening, pulling away, turning their face or trying to move out of the interaction?',
  },
  {
    step: '4',
    title: 'What is the purpose of the touch?',
    detail:
      'Is it supporting comfort, safety, care or wellbeing, or am I responding this way simply because it is what I usually do?',
  },
  {
    step: '5',
    title:
      'Does the contact make sense for this child and this situation?',
    detail:
      'Consider their age, developmental stage, communication style, individual needs and what is happening around them.',
  },
  {
    step: '6',
    title:
      'Is there a less intrusive response that may work just as well?',
    detail:
      'Sometimes sitting nearby, offering a hand, reducing language, changing the environment or giving more space may be enough.',
  },
  {
    step: '7',
    title: 'Is there an immediate safety risk?',
    detail:
      'If the child or somebody else may be hurt, safety becomes the priority. Any physical intervention should follow the requirements, policies and guidance that apply in your setting.',
  },
  {
    step: '8',
    title:
      'Could I clearly explain why I responded this way?',
    detail:
      'Would the purpose of the interaction make sense to another educator, leader or family member observing it?',
  },
  {
    step: '9',
    title: 'Do I need to adjust or stop?',
    detail:
      'Keep noticing the child throughout the interaction because what they need, or what they are communicating, can change quickly.',
  },
];

export default function ComfortingTouchChecklistPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-white border-b border-[#E6E2DC]">
        <div className="mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
          <Link
            href="/blog"
            className="text-sm font-bold text-[#657B6C] transition hover:text-[#1C3B34]"
          >
            Back to articles
          </Link>

          <p className="mt-8 text-sm font-semibold text-[#9A793D]">
            A reflection tool for teams who need it
          </p>

          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Before I offer comforting touch
          </h1>

          <p className="mt-5 max-w-3xl text-xl font-semibold leading-relaxed text-[#53645D]">
            A simple checklist for educators who are genuinely second-guessing how to respond when a distressed child seeks physical comfort.
          </p>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#6A7873]">
            Many early childhood teams already feel confident in this area and may not need this resource at all. This checklist is here for teams that are having questions about child cues, purpose, professional boundaries and how to remain warm and responsive without acting automatically.
          </p>

          <p className="mt-5 text-sm font-semibold text-[#657B6C]">
            By Robyn Papworth
          </p>

          <div className="mt-8 overflow-hidden">
            <img
              src="/images/feed/comforting-touch-checklist.png"
              alt="Before I offer comforting touch reflection checklist for early childhood educators"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="space-y-6 text-lg leading-relaxed text-[#53645D]">
            <p>
              When a child is distressed or seeking connection, there is not always time to mentally work through a long policy document before responding.
            </p>

            <p>
              But there can still be a short moment of professional reflection. What is the child communicating? Why am I considering touch? Is the contact welcome? Is there another response that may meet the same need?
            </p>

            <p>
              For me, the simplest anchor is:
            </p>

            <div className="border-l-4 border-[#C29F60] bg-[#FAF5EC] p-6">
              <p className="text-2xl font-extrabold text-[#1C3B34]">
                Pause. Notice. Respond.
              </p>

              <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                Not because every comforting interaction requires a nine-point mental checklist, but because pausing for a moment can stop fear, habit or urgency from making the decision for us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CHECKLIST */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#9A793D]">
              The reflection questions
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Nine things you can think about when touch feels less straightforward.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              These are prompts for reflection rather than a compliance test. Your organisation&apos;s policies, safeguarding procedures and local requirements still apply.
            </p>
          </div>

          <div className="mt-10 border-y border-[#D8CFC2]">
            {checklistQuestions.map(
              (item) => (
                <div
                  key={item.step}
                  className="grid gap-3 border-b border-[#D8CFC2] py-6 last:border-b-0 md:grid-cols-[60px_1fr]"
                >
                  <span className="text-lg font-extrabold text-[#9A793D]">
                    {item.step}
                  </span>

                  <div>
                    <h3 className="text-xl font-extrabold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* DOWNLOAD */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                Want a copy for your team?
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Print the one-page checklist.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#D8E1DC]">
                If this is a conversation your educators are currently having, you can print the reflection checklist and use it during a team discussion.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#BFD0C8]">
                If your team already feels confident about appropriate touch and professional boundaries, there is no need to create another area of concern.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/pdf/Before-I-Offer-Comforting-Touch-Checklist.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#C29F60] px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
                >
                  Open the Printable Checklist
                </a>

                <Link
                  href="/free-guide"
                  className="flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10"
                >
                  Read the Full Safe Touch Guide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROADER REGULATION BRIDGE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                If this is not the issue in your rooms
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start with the behaviour or regulation moment your team keeps getting stuck on.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                Your educators may be far more concerned about children struggling at drop-off, group participation, noisy transitions, sensory overload, biting, running, shutdown or repeated escalation.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                The Free Regulation Ladder is a better starting point for those broader questions. It helps educators, leaders and families look at the same situation from different perspectives before deciding what to try next.
              </p>

              <Link
                href="/playbooks"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
              >
                Try the Free Regulation Ladder
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED ARTICLE */}
      <section className="bg-[#FAF5EC] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9A793D]">
                More context
              </p>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                Safe touch in early childhood
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                Read more about why some educators are second-guessing comforting touch, while many other teams remain confident and may not need additional support in this area.
              </p>
            </div>

            <Link
              href="/blog/safe-touch-early-childhood"
              className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
            >
              Read the Article
            </Link>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-8">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <p className="max-w-4xl text-xs leading-5 text-[#75827D]">
            This resource supports professional reflection and team discussion. It is not legal advice and does not replace your organisation&apos;s policies, safeguarding procedures, provider or leadership guidance, licensing requirements, regulatory guidance or other requirements that apply in your location.
          </p>
        </div>
      </section>
    </main>
  );
}