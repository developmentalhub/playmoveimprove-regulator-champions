import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Early Childhood Regulation, Behaviour & Practice Articles | Regulator Champions',

  description:
    'Free early childhood articles and training about regulation, behaviour, co-regulation, sensory needs, movement, participation, educator judgement and everyday practice.',

  alternates: {
    canonical: '/blog',
  },

  openGraph: {
    title:
      'Early Childhood Regulation, Behaviour & Practice Articles | Regulator Champions',
    description:
      'Thoughtful, practical articles for early childhood educators and child care leaders about regulation, behaviour, co-regulation, sensory needs, movement, participation and child development.',
    url: '/blog',
    type: 'website',
  },
};

const practiceArticles = [
  {
    slug:
      '/blog/regulation-training-but-same-behaviour',
    title:
      'When Your Team Has Already Done Regulation Training, But the Same Problems Keep Returning',
    category:
      'Regulation and professional learning',
    description:
      'Why knowing regulation theory does not always help educators decide what to do when the same difficult situations keep returning in the room.',
  },
  {
    slug:
      '/blog/co-regulation-in-a-busy-early-childhood-room',
    title:
      'What Does Co-Regulation Actually Look Like in a Busy Early Childhood Room?',
    category:
      'Co-regulation',
    description:
      'What co-regulation can look like when the room is noisy, several children need support and educators are trying to hold safety, connection and routines at the same time.',
  },
  {
    slug:
      '/blog/why-the-same-behaviour-strategy-does-not-work-for-every-child',
    title:
      'Why the Same Behaviour Strategy Does Not Work for Every Child',
    category:
      'Behaviour and educator judgement',
    description:
      'The same visible behaviour can be happening for very different reasons, which is why strategy lists can only take educators so far.',
  },
  {
    slug:
      '/blog/what-does-educator-capacity-building-mean-in-early-childhood',
    title:
      'What Does Educator Capacity Building Actually Mean in Early Childhood?',
    category:
      'Educator capacity',
    description:
      'Capacity building becomes meaningful when knowledge turns into stronger observation, reflection, professional judgement and everyday decision-making.',
  },
  {
    slug:
      '/blog/professional-development-that-changes-early-childhood-practice',
    title:
      'What Makes Professional Development Actually Change Early Childhood Practice?',
    category:
      'Professional development',
    description:
      'Why the most important part of professional learning often happens after the webinar or training session has finished.',
  },
  {
    slug:
      '/blog/using-professional-learning-in-your-quality-improvement-plan',
    title:
      'Using Professional Learning Within Your Quality Improvement Plan',
    category:
      'Quality improvement',
    description:
      'How professional learning, reflective practice and the everyday situations educators are already discussing can become part of meaningful quality improvement.',
  },
];

const fundingArticles = [
  {
    slug:
      '/blog/start-strong-2026-quality-uplift-nsw',
    title:
      'Start Strong 2026: What Does Quality Uplift Mean for NSW Early Childhood Services?',
    category:
      'New South Wales',
    description:
      'A practical look at quality uplift, professional learning and educator capability within the current NSW Start Strong context.',
  },
  {
    slug:
      '/blog/preparing-educators-for-3-year-old-preschool-south-australia',
    title:
      'Preparing Educators for 3-Year-Old Preschool in South Australia',
    category:
      'South Australia',
    description:
      'What the rollout of 3-year-old preschool may mean for transitions, participation, co-regulation, environments and professional learning.',
  },
];

const natureArticles = [
  {
    slug:
      '/blog/children-slow-down-notice-world',
    number: '01',
    title:
      'Are Our Children Losing the Ability to Slow Down and Notice the World Around Them?',
    description:
      'What happens when children become so used to moving towards the next thing that sitting outside, hearing a bird, noticing the clouds or sharing an ordinary conversation no longer seems to hold them for very long?',
    focus:
      'Attention, regulation and nature connection',
  },
  {
    slug:
      '/blog/children-care-for-worms-nature',
    number: '02',
    title:
      'Before We Teach Children to Care for the Planet, Do They Know How to Care for a Worm?',
    description:
      'A reflection on worms, snails, plants and the small everyday experiences through which children begin learning gentleness, responsibility and respect for other living things.',
    focus:
      'Empathy, impulse control and caring for living things',
  },
  {
    slug:
      '/blog/children-respect-gardens-nature',
    number: '03',
    title:
      'Our Gardens Should Not Just Be Somewhere Children Run Through',
    description:
      'Why children need enough time in familiar natural places to notice what changes, develop affection for where they are and begin treating gardens as living environments rather than scenery.',
    focus:
      'Place connection, gardens and body awareness',
  },
];

const specificPracticeArticles = [
  {
    slug:
      '/blog/safe-touch-early-childhood',
    title:
      'Safe Touch in Early Childhood: When Educators Start Second-Guessing Comfort',
    category:
      'Safe touch and responsive care',
    description:
      'For teams who are genuinely uncertain about comforting distressed children, this article looks at child cues, professional boundaries and thoughtful responsive care without suggesting that every service has this concern.',
  },
  {
    slug:
      '/blog/before-i-offer-comforting-touch-checklist',
    title:
      'Before I Offer Comforting Touch: A Quick Reflection Checklist for ECEC Educators',
    category:
      'Educator reflection',
    description:
      'A short reflection framework for teams that want to think more carefully about child cues, context, professional boundaries and safe responsive care.',
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#E4C98E]">
              Free articles and training for early childhood teams
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              The questions I keep coming back to when behaviour, regulation and everyday practice become complicated
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              This is where I write about the things I keep noticing in early childhood rooms, including the small body cues that can appear before behaviour escalates, why movement matters, what co-regulation actually looks like when a room is busy, and how we can become more curious about what a child may be communicating before reaching for another strategy.
            </p>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#BFD0C8]">
              Some articles come from research, some from conversations with educators, some from my work as an Exercise Physiologist and Developmental Educator, and many begin with a small moment involving a child that I cannot quite stop thinking about.
            </p>
          </div>
        </div>
      </section>

      {/* FREE REGULATION LADDER */}
      <section className="bg-[#E8D39D] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-4xl">
              <p className="text-sm font-extrabold text-[#6E5426]">
                Want something practical before you keep reading?
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34]">
                Try a free Regulation Ladder
              </h2>

              <p className="mt-4 text-lg leading-8 text-[#374C45]">
                The articles explain the thinking behind my work. The Regulation Ladders are designed to help teams use that thinking when a difficult situation is actually happening. Open the free example and see how educators, managers and families can look at the same moment from different perspectives before deciding what to try next.
              </p>
            </div>

            <Link
              href="/playbooks"
              className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
            >
              View the Free Regulation Ladder
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRACTICE ARTICLES */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Regulation, behaviour and professional practice
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Start with the situations your team keeps coming back to
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              These articles look at the gap between knowing the theory and making a decision in a real early childhood room. They are written for teams who want to become better at noticing, reflecting and adapting rather than simply collecting more strategies.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#D8CFC2] border-y border-[#D8CFC2]">
            {practiceArticles.map((article) => (
              <Link
                key={article.slug}
                href={article.slug}
                className="group block py-7"
              >
                <p className="text-sm font-extrabold text-[#9A793D]">
                  {article.category}
                </p>

                <h3 className="mt-2 max-w-4xl text-2xl font-extrabold leading-snug text-[#1C3B34] transition group-hover:text-[#657B6C]">
                  {article.title}
                </h3>

                <p className="mt-3 max-w-4xl text-base leading-7 text-[#6A7873]">
                  {article.description}
                </p>

                <span className="mt-4 inline-flex text-sm font-extrabold text-[#8A6F3E]">
                  Read the article
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATE / FUNDING ARTICLES */}
      <section className="bg-[#F7F3ED] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Funding, reform and quality improvement
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                Professional learning within changing state systems
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                Funding and reform language can change quickly. These articles connect current state initiatives with practical questions about educator capability, professional learning and quality improvement without assuming that every service has the same eligibility or funding conditions.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              {fundingArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={article.slug}
                  className="group block border-b border-[#D8CFC2] py-7"
                >
                  <p className="text-sm font-extrabold text-[#9A793D]">
                    {article.category}
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold leading-snug text-[#1C3B34] transition group-hover:text-[#657B6C]">
                    {article.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-[#6A7873]">
                    {article.description}
                  </p>

                  <span className="mt-4 inline-flex text-sm font-extrabold text-[#8A6F3E]">
                    Read the article
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TRAINING */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Featured free training
              </p>

              <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                The Vagus Nerve, Children&apos;s Regulation and the Playful Activities I Use in Early Childhood
              </h2>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-[#53645D]">
                When a child appears to move from coping to overwhelmed very quickly, I often wonder what was happening in their body before the behaviour became obvious to us. This article explores the vagus nerve and parasympathetic nervous system within that much bigger picture, without treating either of them as a magic switch for regulation.
              </p>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-[#53645D]">
                I have also included my full training video for free, where I talk through the window of tolerance, early body cues, my own lived experience of childhood trauma, and the playful breathing, sound, movement and sensory activities I use with young children.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/blog/vagus-nerve-regulation-activities"
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F]"
                >
                  Read the Article and Watch the Training
                </Link>

                <a
                  href="https://buy.stripe.com/14AbIUgaeb9C0Vze549fW0d"
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-6 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
                >
                  Get the Activity Cards for $14 AUD
                </a>
              </div>
            </div>

            <div className="border-y border-[#D8CFC2] py-8 lg:border-y-0 lg:border-l lg:py-0 lg:pl-10">
              <p className="text-xl font-extrabold leading-8 text-[#1C3B34]">
                When someone tells me a child goes from zero to one hundred, I often wonder whether that child was actually already sitting at eighty.
              </p>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                The larger behaviour may be the first thing that catches our attention, but it is not always the first thing that changed. Squinting, chewing clothing, touching the face, hiding, moving faster, becoming louder or suddenly struggling to process language may have been telling us something much earlier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE FIRST */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Start with what your team is already talking about
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                You do not need to read these articles in order.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                If your educators are talking about behaviour, start there. If group time keeps becoming difficult, think about participation and movement. If a child seems to become overwhelmed very quickly, begin with body cues and regulation.
              </p>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                I would rather an article help your team have one useful conversation about a real situation than become another piece of professional learning everybody saves and never returns to.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              <TopicRow
                title="Behaviour and regulation"
                text="Look underneath what is visible and consider arousal, sensory load, movement, connection, predictability and what happened before the behaviour."
                href="/emotional-regulation-early-childhood"
              />

              <TopicRow
                title="Co-regulation"
                text="Think about the adult nervous system too, including voice, pace, proximity, language, expectations and what the child is experiencing within the interaction."
                href="/co-regulation-early-childhood"
              />

              <TopicRow
                title="Educator judgement"
                text="Move beyond collecting more strategies and help educators become more confident at noticing, reflecting and deciding what to try next."
                href="/educator-capacity-building"
              />

              <TopicRow
                title="Professional development"
                text="Explore what makes early childhood professional learning more likely to influence real practice rather than becoming another one-off session."
                href="/early-childhood-professional-development"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NATURE SERIES */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Children, nature and the ability to notice
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              A series that began with some very ordinary moments outside
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              These articles began after watching children struggle to remain on a picnic rug for a short conversation, seeing one child become excited about an aeroplane that almost nobody else looked up to notice, and watching worms being handled without much awareness that these tiny living things needed care.
            </p>

            <p className="mt-4 text-lg leading-8 text-[#53645D]">
              None of those moments made me think that children were uncaring or that something was wrong with them. They made me wonder about the amount of stimulation surrounding childhood, how little empty space is left in many children&apos;s days, and what may be lost when we become so accustomed to moving immediately towards whatever comes next.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#D8CFC2] border-y border-[#D8CFC2]">
            {natureArticles.map((article) => (
              <Link
                key={article.slug}
                href={article.slug}
                className="group grid gap-4 py-7 transition md:grid-cols-[60px_1fr_auto] md:items-start md:gap-6"
              >
                <span className="text-sm font-extrabold text-[#9A793D]">
                  {article.number}
                </span>

                <div>
                  <p className="text-sm font-extrabold text-[#657B6C]">
                    {article.focus}
                  </p>

                  <h3 className="mt-2 text-2xl font-extrabold leading-snug text-[#1C3B34] transition group-hover:text-[#657B6C]">
                    {article.title}
                  </h3>

                  <p className="mt-3 max-w-4xl text-base leading-7 text-[#6A7873]">
                    {article.description}
                  </p>
                </div>

                <span className="text-sm font-extrabold text-[#8A6F3E] md:pt-8">
                  Read article
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-[#1C3B34] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="max-w-4xl text-2xl font-extrabold leading-relaxed tracking-tight sm:text-3xl">
            “Perhaps there are times when children do not need another strategy added to their day. Perhaps we need to become better at noticing what is already happening around them and inside their body.”
          </p>

          <p className="mt-5 text-sm text-[#BFD0C8]">
            Robyn Papworth
          </p>
        </div>
      </section>

      {/* SPECIFIC PRACTICE QUESTIONS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Specific practice questions
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Resources that may be useful for some teams, but not every team
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              Some services have told me their educators are second-guessing physical comfort after child-safety training. Other services feel completely confident in this area and do not see it as a current need. These resources are here for the teams who are actually having that conversation.
            </p>
          </div>

          <div className="mt-10 divide-y divide-[#D8CFC2] border-y border-[#D8CFC2]">
            {specificPracticeArticles.map(
              (article) => (
                <Link
                  key={article.slug}
                  href={article.slug}
                  className="group block py-7"
                >
                  <p className="text-sm font-extrabold text-[#9A793D]">
                    {article.category}
                  </p>

                  <h3 className="mt-2 max-w-4xl text-2xl font-extrabold leading-snug text-[#1C3B34] transition group-hover:text-[#657B6C]">
                    {article.title}
                  </h3>

                  <p className="mt-3 max-w-4xl text-base leading-7 text-[#6A7873]">
                    {article.description}
                  </p>

                  <span className="mt-4 inline-flex text-sm font-extrabold text-[#8A6F3E]">
                    Read the article
                  </span>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* PROGRAM CONNECTION */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Regulator Champions
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Reading can start the conversation, but teams still need help making decisions in the room.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#53645D]">
                Regulator Champions takes the same noticing-first approach into practical Regulation Ladders, recordings, questions and implementation support, so educators are not simply left with another article, webinar or list of strategies and expected to work everything out alone.
              </p>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                Some teams begin with the cards. Others want the broader six-month or twelve-month program. The important part is starting with what your educators are actually dealing with rather than asking them to complete learning that has no connection to the room they are standing in.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/playbooks"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#29483F]"
                >
                  Try the Free Regulation Ladder
                </Link>

                <Link
                  href="/#full-program"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
                >
                  Explore the Full Program
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TopicRow({
  title,
  text,
  href,
}: {
  title: string;
  text: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block border-b border-[#D8CFC2] py-6"
    >
      <h3 className="text-2xl font-extrabold text-[#1C3B34] transition group-hover:text-[#657B6C]">
        {title}
      </h3>

      <p className="mt-3 text-base leading-7 text-[#53645D]">
        {text}
      </p>

      <span className="mt-3 inline-flex text-sm font-extrabold text-[#8A6F3E]">
        Explore this topic
      </span>
    </Link>
  );
}