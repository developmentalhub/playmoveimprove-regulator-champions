import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Professional Development for US Child Care Teams | Regulator Champions',

  description:
    'Practical professional development for US child care centers, preschool programs, directors and early childhood educators working on co-regulation, challenging behavior, teacher-child interactions, participation and quality improvement.',

  alternates: {
    canonical: '/us-early-childhood-quality',
  },

  openGraph: {
    title:
      'Professional Development for US Child Care Teams | Regulator Champions',
    description:
      'Practical whole-team professional development for child care owners, directors and educators who want regulation training to translate into everyday classroom decisions.',
    url: '/us-early-childhood-quality',
    type: 'website',
  },
};

const DIRECTOR_PRESSURES = [
  {
    title:
      'Your teachers already know a lot, but the same situations keep coming back',
    text:
      'Your team may already have completed training on behavior, trauma, sensory processing, social-emotional development or co-regulation, yet educators can still feel unsure about what to do when a real situation unfolds differently from the examples used in training.',
  },
  {
    title:
      'Different adults are interpreting the same behavior differently',
    text:
      'One teacher may see defiance, another may notice overwhelm, another may immediately redirect and another may give the child more space. Different perspectives are not automatically a problem, but teams need a useful way to think together rather than relying only on individual instinct.',
  },
  {
    title:
      'Professional development needs to fit around the reality of child care',
    text:
      'Staffing, ratios, planning time and competing responsibilities can make it difficult for every educator to attend lengthy training at the same time. Practical resources need to remain useful after the professional development session has finished.',
  },
  {
    title:
      'You want professional learning to become part of classroom practice',
    text:
      'Completing a course or attending a webinar does not automatically tell a director what educators are noticing, discussing or trying afterwards. Regulator Champions is designed to keep the learning connected to situations the team is actually experiencing.',
  },
];

const SHARED_QUESTIONS = [
  'What are we actually noticing before we decide what this behavior means?',
  'What was happening in the room before this became difficult?',
  'What is the child’s movement, posture, voice or engagement telling us?',
  'What demand is this moment placing on the child?',
  'Could the environment, routine or adult response be increasing the pressure?',
  'What is one thoughtful change we could try and then observe?',
];

const QUALITY_CONNECTIONS = [
  {
    title: 'Relationships',
    text:
      'Regulator Champions asks educators to look closely at what is happening between the adult and child during difficult moments, including tone, pace, proximity, expectations, connection and the cues the child is giving back.',
  },
  {
    title: 'Developmentally Appropriate Practice',
    text:
      'The program encourages teams to consider development, the individual child and the social and cultural context before deciding what a behavior means or what response may be useful.',
  },
  {
    title: 'Family partnerships',
    text:
      'Families can contribute what they know about the child, their routines, preferences, strengths and experiences so educators are not expected to understand a difficult situation in isolation.',
  },
  {
    title: 'Continuous quality improvement',
    text:
      'Directors and educational leaders can use recurring classroom situations as meaningful starting points for reflection, staff discussion and professional learning rather than choosing improvement topics that are disconnected from everyday practice.',
  },
];

const PRACTICE_AREAS = [
  'Co-regulation',
  'Challenging behavior',
  'Teacher-child interactions',
  'Social-emotional development',
  'Sensory and movement needs',
  'Executive functioning',
  'Transitions and group experiences',
  'Participation and inclusion',
  'Family communication',
  'Staff reflection and professional development',
];

export default function USEarlyChildhoodQualityPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-base font-semibold text-[#E4C98E]">
              For US child care owners, directors and early childhood teams
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              When your teachers understand the theory but still need help deciding what to try in the classroom.
            </h1>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
              Regulator Champions helps early childhood teams slow difficult situations down, notice what may be contributing to the behavior and decide together what might be worth changing before simply reaching for another strategy.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#BFD0C8]">
              It was created in Australia, but the program is built around questions that are familiar to child care teams everywhere: how adults respond, what the child may be communicating, what the environment is asking of them, and how a team can develop a more consistent way of thinking together.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/playbooks"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                See a Free Regulation Ladder
              </Link>

              <Link
                href="/director-review"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-white px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#F3EEE7]"
              >
                Tell Me About Your Team
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-3 shadow-xl">
            <Image
              src="/images/educator-pair-with-child-regulation-support.jpg"
              alt="Early childhood educators using Regulation Ladder cards together during team planning"
              width={1400}
              height={1050}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="h-auto w-full rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* DIRECTOR PRESSURES */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                What directors are often trying to solve
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                The difficult part is not always finding more professional development.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                The harder question is how professional learning becomes useful when a teacher is standing in a busy classroom and the child in front of them is not responding the way the textbook example suggested they would.
              </p>

              <div className="mt-8 overflow-hidden rounded-3xl bg-[#FAF5EC] p-3">
                <Image
                  src="/images/cards/card8-transition.png"
                  alt="Watercolour early childhood illustration showing an educator supporting a child through a transition"
                  width={900}
                  height={900}
                  loading="lazy"
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>
            </div>

            <div className="border-t border-[#D8CFC2]">
              {DIRECTOR_PRESSURES.map((item) => (
                <div
                  key={item.title}
                  className="border-b border-[#D8CFC2] py-6"
                >
                  <h3 className="text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-7 text-[#53645D]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHARED THINKING */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
  <div className="overflow-hidden rounded-3xl bg-white/10 p-3">
    <Image
      src="/images/ladders/ladder2_rung05.png"
      alt="Watercolour illustration from a Regulator Champions Regulation Ladder"
      width={800}
      height={1000}
      priority
      className="aspect-4/5 w-full rounded-2xl object-cover"
    />
  </div>

  <div className="mt-10 overflow-hidden rounded-3xl bg-white/10 p-3">
    <Image
      src="/images/ladders/ladder1_rung08.png"
      alt="Watercolour illustration from a Regulator Champions Regulation Ladder"
      width={800}
      height={1000}
      priority
      className="aspect-4/5 w-full rounded-2xl object-cover"
    />
  </div>
</div>
            </div>

            <div className="order-1 lg:order-2">
              <p className="text-sm font-extrabold text-[#9A793D]">
                A shared way of thinking
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                The goal is not for every teacher to respond in exactly the same way.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Children, educators and classrooms are too different for a single scripted response to fit every situation. What can become more consistent is the way a team pauses, notices and talks about what may be happening before deciding what to try.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Instead of a difficult moment beginning and ending with “How do we stop this behavior?”, Regulator Champions helps educators widen the conversation so they can consider the child, the context, the environment and the adult response together.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-x-10 md:grid-cols-2">
            {SHARED_QUESTIONS.map((question) => (
              <div
                key={question}
                className="border-t border-[#D8CFC2] py-5"
              >
                <p className="text-lg font-extrabold leading-relaxed text-[#29483F]">
                  “{question}”
                </p>
              </div>
            ))}
          </div>

          <p className="mt-7 max-w-5xl text-lg leading-relaxed text-[#53645D]">
            This does not mean ignoring unsafe behavior, removing boundaries or assuming every challenge has a sensory or regulation explanation. It means giving teachers a process for looking more carefully before deciding what the response should be.
          </p>
        </div>
      </section>

      {/* REGULATION LADDERS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Regulation Ladders
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Give teachers somewhere practical to start when the same situation keeps repeating.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Each Regulation Ladder focuses on an everyday early childhood challenge and brings together educator, leadership and family perspectives. It does not tell a teacher that one behavior always means one thing. Instead, the cards provide prompts that help the adults around the child widen the lens, notice patterns and decide what may be worth trying.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                A team might use a card during planning time, bring one into a staff meeting, discuss it after a difficult morning or keep the relevant cards somewhere educators can reach them when the same situation begins appearing again.
              </p>

              <div className="mt-7 border-l-4 border-[#C29F60] pl-6">
                <p className="text-xl font-extrabold">
                  One Regulation Ladder includes 30 practical cards.
                </p>

                <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                  Ten prompts are written for educators, ten for managers or leaders and ten for families, so the same situation can be considered from the different roles surrounding the child.
                </p>
              </div>

              <Link
                href="/playbooks"
                className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
              >
                Open the Free Regulation Ladder
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-3xl bg-[#FAF5EC] p-2">
                <Image
                  src="/images/ladders/ladder1_rung08.png"
                  alt="Watercolour early childhood Regulation Ladder illustration"
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-4/5 w-full rounded-2xl object-cover"
                />
              </div>

              <div className="mt-10 overflow-hidden rounded-3xl bg-[#FAF5EC] p-2">
                <Image
                  src="/images/ladders/ladder3_rung04.png"
                  alt="Watercolour early childhood Regulation Ladder illustration"
                  width={800}
                  height={1000}
                  loading="lazy"
                  className="aspect-4/5 w-full rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPLEMENTATION */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="overflow-hidden rounded-3xl bg-white p-3">
              <Image
                src="/images/cards/card6-rhythm.png"
                alt="Watercolour illustration showing rhythm and movement as part of early childhood regulation support"
                width={900}
                height={900}
                loading="lazy"
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold text-[#E4C98E]">
              From professional development into practice
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Your teachers do not need another course they have to hurry through.
            </h2>

            <div className="mt-6 space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                Educators can begin with the practical resources connected to something that is already happening in their classroom, then return to recordings, questions and deeper learning when they actually have the time and capacity to do so.
              </p>

              <p>
                Live attendance is not required for every educator. A director can use a Regulation Ladder in a staff conversation, an individual educator can return to a recording later, and a team can submit a de-identified question when the first idea does not quite fit what they are seeing.
              </p>

              <p className="font-semibold text-white">
                The program is intended to become something the team can return to as different situations arise, rather than professional development that disappears once the training session is over.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIX MONTH */}
      <section className="bg-[#F3EEE7] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                A lower-risk way to begin
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                You do not need to commit your center for a full year just to see whether this approach fits your team.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                The 6-Month Preview is a genuine whole-team starting point. It gives your educators time to begin with the Regulation Ladders currently available, use them in real classroom situations, return to recordings when there is capacity, ask questions and begin working out whether this way of approaching regulation and behavior is useful within your program.
              </p>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                You do not need to assume Regulator Champions will solve every challenging behavior before deciding whether it has value. Children will still have difficult transitions, become frustrated, need movement, struggle with demands and have days when their capacity is low.
              </p>

              <p className="mt-5 text-xl font-extrabold leading-relaxed">
                The more useful question is whether having a shared process for noticing, discussing and responding to those recurring situations would be useful for your teachers and leaders.
              </p>
            </div>

            <div>
              <div className="overflow-hidden rounded-3xl bg-white p-3 shadow-sm">
                <Image
                  src="/images/cards/welcome-anchor.png"
                  alt="Watercolour illustration showing a warm early childhood connection moment"
                  width={900}
                  height={900}
                  loading="lazy"
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>

              <div className="mt-7 border-y border-[#CFC5B7] py-7">
                <p className="text-sm font-extrabold text-[#9A793D]">
                  6-Month Preview
                </p>

                <p className="mt-2 text-4xl font-extrabold">
                  $1,790 AUD
                </p>

                <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                  Whole-team access for six months, including the Regulation Ladders currently available, practical resources, recordings, private question submissions and implementation support.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                  Pricing is shown in Australian dollars. If your US organization requires purchasing or international payment information, you can contact Robyn before making any commitment.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/proposal?plan=preview"
                    className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
                  >
                    View the 6-Month Proposal
                  </Link>

                  <Link
                    href="/director-review"
                    className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#F5F0E7]"
                  >
                    Ask About Your Team First
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* US FRAMEWORKS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Connections with US early childhood practice
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Regulator Champions is not a US accreditation program, but the thinking connects with familiar areas of quality early childhood practice.
              </h2>

              <div className="mt-8 overflow-hidden rounded-3xl bg-[#FAF5EC] p-3">
                <Image
                  src="/images/cards/card9-attachment.png"
                  alt="Watercolour illustration showing connection between an educator and child"
                  width={900}
                  height={900}
                  loading="lazy"
                  className="h-auto w-full rounded-2xl object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                NAEYC&apos;s current Early Childhood Program Standards provide a framework around quality early childhood programs, while Developmentally Appropriate Practice supports intentional professional decision-making. Regulator Champions is an independent program, but there are useful connections in areas such as relationships, family partnerships, educator decision-making and ongoing improvement.
              </p>

              <div className="mt-7 flex flex-wrap gap-5 text-sm font-semibold">
                <a
                  href="https://www.naeyc.org/resources/position-statements/early-childhood-program-standards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#C29F60] decoration-2 underline-offset-4"
                >
                  NAEYC Early Childhood Program Standards
                </a>

                <a
                  href="https://www.naeyc.org/resources/position-statements/dap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[#C29F60] decoration-2 underline-offset-4"
                >
                  Developmentally Appropriate Practice
                </a>
              </div>

              <div className="mt-10 grid gap-x-10 md:grid-cols-2">
                {QUALITY_CONNECTIONS.map((item) => (
                  <div
                    key={item.title}
                    className="border-t border-[#D8CFC2] py-6"
                  >
                    <h3 className="text-xl font-extrabold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-base leading-7 text-[#53645D]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAP */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="overflow-hidden rounded-3xl bg-white p-3">
              <Image
                src="/images/cards/card3-environment.png"
                alt="Watercolour illustration of an early childhood learning environment"
                width={900}
                height={900}
                loading="lazy"
                className="h-auto w-full rounded-2xl object-cover"
              />
            </div>
          </div>

          <div>
            <p className="text-sm font-extrabold text-[#9A793D]">
              Developmentally Appropriate Practice
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
              Good decision-making asks us to look at more than the behavior we can see.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              NAEYC describes three core considerations that inform Developmentally Appropriate Practice: commonality in children&apos;s development and learning, individuality, and the context in which development and learning occur.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              That is not the same thing as Regulator Champions, but the decision-making principle is compatible with the way Regulation Ladders are used. Rather than moving directly from a behavior to a consequence or predetermined strategy, educators are encouraged to consider development, the individual child, the environment and context before deciding what may be worth changing.
            </p>
          </div>
        </div>
      </section>

      {/* QRIS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                QRIS and state quality systems
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                Your state or local quality system may use different language and requirements.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                Quality Rating and Improvement Systems are not identical across the United States, so Regulator Champions does not claim universal QRIS alignment or automatic professional development approval.
              </p>

              <p>
                Directors can consider how areas such as professional development, teacher-child interactions, family engagement, inclusion, classroom practice and continuous quality improvement relate to the specific requirements or goals that apply within their own state and program.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                What your team can work on
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                The professional learning sits inside situations teachers are already dealing with.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                These areas are not intended to become another checklist of topics your team has to complete. They are areas that may become relevant as educators work through real classroom situations.
              </p>
            </div>

            <div className="grid gap-x-10 sm:grid-cols-2">
              {PRACTICE_AREAS.map((area) => (
                <div
                  key={area}
                  className="border-t border-[#D8CFC2] py-4"
                >
                  <p className="text-lg font-semibold">
                    {area}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CREATED IN AUSTRALIA */}
      <section className="border-y border-[#E5DED4] bg-[#F7F3ED] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Created in Australia
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                You do not need to use Australian curriculum or quality frameworks to use the core program.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                I am based in Australia, so some optional pages on this website refer to Australian quality and funding systems. Those sit separately from the core Regulator Champions professional learning.
              </p>

              <p>
                US child care centers can use the Regulation Ladders, recordings, questions and professional learning within their own local context. Your organization remains responsible for determining whether particular learning meets state licensing, training-hour, accreditation or quality-system requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm font-semibold text-[#E4C98E]">
            You do not have to decide yet
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Tell me what keeps becoming difficult in your classrooms and I can help you work out where I would start.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            If the Regulation Cards alone look like enough for your team, that may be the right place to begin. If your educators need a longer period of shared learning and support, we can look at the six or twelve-month Regulator Champions options instead.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/director-review"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Tell Me About Your Team
            </Link>

            <Link
              href="/proposal?plan=preview"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-white px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#F3EEE7]"
            >
              View the 6-Month Option
            </Link>
          </div>
        </div>
      </section>

      {/* FRAMEWORK NOTE */}
      <section className="border-t border-[#E5DED4] bg-white py-9">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-sm leading-7 text-[#6B7772]">
            Regulator Champions is an independent professional learning program and is not affiliated with or endorsed by NAEYC or any state or local Quality Rating and Improvement System. It does not confer NAEYC accreditation, state licensing approval or professional development hours unless separately confirmed by the relevant authority. Programs remain responsible for determining how professional learning connects with their own licensing, accreditation, funding and quality improvement requirements.
          </p>
        </div>
      </section>
    </main>
  );
}