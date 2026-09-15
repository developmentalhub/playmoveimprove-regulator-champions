import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Free Regulation Ladder for Early Childhood Teams | Regulator Champions',

  description:
    'See a free Regulator Champions Regulation Ladder for early childhood educators, managers and families, with practical prompts for looking underneath behaviour and participation before deciding what to try next.',

  alternates: {
    canonical: '/playbooks',
  },

  openGraph: {
    title:
      'Free Regulation Ladder for Early Childhood Teams | Regulator Champions',
    description:
      'Open a free Regulation Ladder sample and see how educators, managers and families can look at the same early childhood challenge from different perspectives.',
    url: '/playbooks',
    type: 'website',
  },
};

const EDUCATOR_PDF =
  '/pdf/educators-ladder-3.pdf';

const MANAGER_PDF =
  '/pdf/managers-ladder-3.pdf';

const FAMILY_PDF =
  '/pdf/families-ladder-3.pdf';

const REGULATION_CARDS_URL =
  'https://playmoveimprove.com.au/products/regulation-cards-for-early-childhood-teams';

export default function PlaybooksPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-base font-semibold text-[#E4C98E]">
              Free Regulation Ladder sample
            </p>

            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              See how one difficult moment can look completely different depending on who is looking at it.
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              Regulator Champions is built around a simple idea: before we rush to stop a behaviour, add another strategy or assume a child is refusing to participate, we need to become better at noticing what may be happening underneath the moment.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
              This free sample shows you one complete Regulation Ladder from three perspectives, because an educator standing beside the child, a manager looking at the environment and a family who knows the child outside the centre may each notice something useful that the others cannot see.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#free-ladder"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] transition hover:bg-[#EDCD82]"
              >
                Open the Free Regulation Ladder
              </a>

              <Link
                href="/"
                className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-white/25 bg-white/5 px-7 py-4 text-base font-extrabold text-white transition hover:bg-white/10"
              >
                See How Regulator Champions Works
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-xl">
            <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-xl">
              <Image
                src="/images/ladders/ladder3_rung06.png"
                alt="Example Regulator Champions Regulation Ladder card"
                width={900}
                height={1100}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="h-auto w-full rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHAT THIS SAMPLE IS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm font-extrabold text-[#9A793D]">
            The sample ladder
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
            Participation Beyond Sitting
          </h2>

          <p className="mt-6 max-w-4xl text-lg leading-8 text-[#53645D]">
            This ladder looks at participation because one of the patterns I continue to see in early childhood is that sitting still can quietly become our main measure of whether a child is listening, learning or belonging. A child who moves away from the group, lies on the floor, needs something in their hands or joins from the edge can quickly be seen as refusing to participate, even when their body may be telling us something much more useful.
          </p>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-[#53645D]">
            The aim of the ladder is not to remove expectations or suggest that every form of participation should look different for every child. It is to help the adults around the child pause long enough to ask whether the expectation, environment, sensory load, movement needs or adult response may need to be considered before we decide that the problem sits entirely within the child.
          </p>

          <div className="mt-10 border-y border-[#D8CFC2]">
            <PerspectiveRow
              role="Educator"
              question="What am I noticing in the moment, and what could I change in the way I am supporting participation?"
              text="The educator cards focus on the child in front of you, what their body may be communicating and what small changes could be tried in the room."
            />

            <PerspectiveRow
              role="Manager"
              question="What might the environment, routine or expectations be contributing?"
              text="The manager cards widen the lens so the team can think about room setup, group expectations, routines and whether educators have enough support to respond consistently."
            />

            <PerspectiveRow
              role="Family"
              question="What does this child show us outside the early childhood setting?"
              text="The family cards create space for information that may not be visible during the day, including the child's preferences, movement needs, communication and what participation looks like in other environments."
            />
          </div>
        </div>
      </section>

      {/* FREE DOWNLOADS */}
      <section
        id="free-ladder"
        className="scroll-mt-24 bg-[#FAF5EC] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-extrabold text-[#9A793D]">
              Open the full sample
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Use the perspective that is most useful to you, or open all three and compare what each person is being asked to notice.
            </h2>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              You do not need to enter your email address or join the program to view this sample. Each printable opens as a PDF, so you can read it on your device, print it for a team discussion or share the relevant version with another person involved in supporting the child.
            </p>
          </div>

          <div className="mt-10 border-y border-[#D8CFC2]">
            <DownloadRow
              title="For educators"
              description="Use this version when you want to look closely at what is happening during the interaction and consider what could be changed in the room."
              href={EDUCATOR_PDF}
              button="Open Educator Cards"
            />

            <DownloadRow
              title="For managers and leaders"
              description="Use this version to think about the environment, team consistency, routines and the expectations surrounding participation."
              href={MANAGER_PDF}
              button="Open Manager Cards"
            />

            <DownloadRow
              title="For families"
              description="Use this version to bring the family's knowledge of the child into the conversation rather than expecting the early childhood team to work everything out alone."
              href={FAMILY_PDF}
              button="Open Family Cards"
            />
          </div>
        </div>
      </section>

      {/* HOW TO USE IT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-extrabold text-[#9A793D]">
              How I would use it with a team
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              Do not try to complete the whole ladder in one meeting.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[#53645D]">
            <p>
              I would start with the actual child or situation your team is already thinking about and choose the card that makes you pause because it sounds familiar. Talk about what you are noticing, decide on one realistic change and then give yourselves enough time to see whether anything shifts.
            </p>

            <p>
              What you notice afterwards matters just as much as whether the behaviour stops. A child may stay with the group slightly longer, move closer to the educator, accept an invitation more easily, recover more quickly or need fewer repeated instructions, and those smaller changes can tell us that we are beginning to understand the situation differently.
            </p>

            <p>
              If nothing changes, that is useful information as well. It tells us that the first idea may not have matched what the child needed and gives the team somewhere more thoughtful to go next than simply adding another strategy on top.
            </p>
          </div>
        </div>
      </section>

      {/* WHY THREE PERSPECTIVES */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                Why three versions?
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Difficult situations rarely belong to one person to solve.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-8 text-[#D8E1DC]">
              <p>
                An educator may be noticing that the child leaves every time group time becomes noisy, while a manager may see that the room layout makes it difficult for the child to join from the edge. A family may then explain that the child listens beautifully at home while moving, drawing or lying on the floor.
              </p>

              <p>
                None of those people necessarily has the whole answer on their own. When the perspectives are brought together, the team has a much better chance of understanding what participation might look like for that child and deciding what is worth trying next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAID CARDS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-center">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                Want more Regulation Ladders without joining the full program?
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                You can start with the practical cards.
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                Some teams do not have the capacity for another professional learning program right now, and that is exactly why the Regulation Cards can also be purchased separately. You can begin with the practical resources, use them in the situations that are already creating pressure and decide later whether your team needs anything more.
              </p>

              <a
                href={REGULATION_CARDS_URL}
                className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
              >
                Explore the Regulation Cards
              </a>
            </div>

            <div className="border-l-0 border-[#D8CFC2] lg:border-l lg:pl-10">
              <p className="text-xl font-extrabold leading-8 text-[#1C3B34]">
                The cards are not designed to give you a perfect answer for every child.
              </p>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                They are designed to help teams ask better questions before everybody becomes stuck in the same cycle of behaviour, correction, escalation and frustration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FULL PROGRAM */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-extrabold text-[#9A793D]">
                When your team wants more support
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Regulator Champions goes beyond the cards.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#53645D]">
                The broader program gives teams somewhere to keep building the thinking behind the Regulation Ladders through recordings, questions, practical resources, implementation support and live learning when those things are useful.
              </p>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                The aim is not to make educators complete more content. It is to help the team become more confident at noticing what may be happening underneath behaviour and deciding what to try when the same difficult moments keep returning.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/#full-program"
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F]"
                >
                  Explore the Full Program
                </Link>

                <a
                  href="mailto:robyn@playmoveimprove.com.au?subject=Regulator%20Champions%20team%20enquiry"
                  className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-6 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
                >
                  Talk to Robyn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE NOTE */}
      <section className="border-t border-[#E5DED4] bg-white py-10">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-sm leading-7 text-[#6B7772]">
            Regulation Ladders are practical reflection and professional learning resources, not individual assessment or treatment tools. Continue to use your knowledge of the child, family information, service policies, safeguarding responsibilities and relevant professional advice when deciding what support is appropriate.
          </p>
        </div>
      </section>
    </main>
  );
}

function PerspectiveRow({
  role,
  question,
  text,
}: {
  role: string;
  question: string;
  text: string;
}) {
  return (
    <div className="grid gap-4 border-b border-[#D8CFC2] py-7 first:border-t-0 md:grid-cols-[150px_1fr] md:gap-8">
      <p className="text-lg font-extrabold text-[#9A793D]">
        {role}
      </p>

      <div>
        <h3 className="text-xl font-extrabold leading-7 text-[#1C3B34]">
          {question}
        </h3>

        <p className="mt-3 text-base leading-7 text-[#53645D]">
          {text}
        </p>
      </div>
    </div>
  );
}

function DownloadRow({
  title,
  description,
  href,
  button,
}: {
  title: string;
  description: string;
  href: string;
  button: string;
}) {
  return (
    <div className="grid gap-5 border-b border-[#D8CFC2] py-7 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
      <div>
        <h3 className="text-2xl font-extrabold text-[#1C3B34]">
          {title}
        </h3>

        <p className="mt-3 max-w-3xl text-base leading-7 text-[#53645D]">
          {description}
        </p>
      </div>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-6 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
      >
        {button}
      </a>
    </div>
  );
}