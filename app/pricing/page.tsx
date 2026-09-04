'use client';

import Link from 'next/link';

const REGULATION_CARDS_URL =
  'https://playmoveimprove.com.au/products/regulation-cards-for-early-childhood-teams';

const PROGRAM_OPTIONS = [
  {
    name: '6-Month Preview',
    price: '$1,790',
    period: 'including GST',
    description:
      'A smaller whole-service introduction for teams who want the current Regulation Ladders, recordings, questions and support without committing to a full year straight away.',
    includes:
      'Includes the three Regulation Ladders currently available, educator, manager and family cards, recordings as they are added, Ask Robyn questions, monthly support and practical implementation resources.',
    href: '/proposal?plan=preview',
    button: 'View 6-Month Preview',
  },
  {
    name: '12-Month Regulator Champions',
    price: '$4,790',
    period: 'including GST',
    description:
      'Year-round support for services that want to keep returning to the program as different behaviour and regulation challenges arise across the year.',
    includes:
      'Includes the Regulation Ladders, recordings, Ask Robyn support, live sessions when useful, implementation resources and new member content as the program develops.',
    href: '/proposal?plan=full',
    button: 'View 12-Month Program',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <header className="border-b border-[#E5DED4] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <Link
            href="/"
            className="text-sm font-semibold text-[#657B6C] transition hover:text-[#1C3B34]"
          >
            Back to home
          </Link>

          <Link
            href="/member-access"
            className="text-sm font-semibold text-[#657B6C] transition hover:text-[#1C3B34]"
          >
            Member Login
          </Link>
        </div>
      </header>

      <main>
        {/* INTRO */}
        <section className="bg-[#1C3B34] text-white">
          <div className="mx-auto max-w-6xl px-6 py-14 sm:py-18">
            <h1 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              Start with what your team actually has capacity for.
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-relaxed text-[#D8E1DC]">
              Some services want practical Regulation Cards they can pick up and use straight away. Others want recordings they can return to in their own time, or ongoing support when the same situations keep coming back.
            </p>

            <p className="mt-4 max-w-4xl text-xl leading-relaxed text-[#D8E1DC]">
              You do not have to begin with the biggest option. Regulator Champions is designed so your team can start where it makes sense and go deeper when you are ready.
            </p>
          </div>
        </section>

        {/* CARDS ONLY */}
        <section className="bg-white py-14 sm:py-18">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Just want the Regulation Cards?
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                That is completely fine. You can purchase the Regulation Cards separately and use them with your team without joining the broader Regulator Champions program.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                Each Regulation Ladder focuses on one everyday early childhood challenge and includes 10 educator cards, 10 manager cards and 10 family cards, giving the people around the child different prompts that relate to the role they actually have.
              </p>

              <a
                href={REGULATION_CARDS_URL}
                className="mt-7 inline-flex min-h-13 items-center justify-center rounded-2xl border border-[#1C3B34] px-6 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
              >
                View the Regulation Cards
              </a>
            </div>

            <div className="border-l-0 border-[#D8CFC2] lg:border-l lg:pl-10">
              <p className="text-xl font-extrabold text-[#1C3B34]">
                One Regulation Ladder gives your service 30 practical cards around one shared challenge.
              </p>

              <div className="mt-6 border-y border-[#D8CFC2]">
                <InfoRow
                  title="Educators"
                  text="Prompts for what to notice and what might be worth trying in the room."
                />

                <InfoRow
                  title="Managers"
                  text="Prompts for thinking about routines, environment, expectations, resources and team support."
                />

                <InfoRow
                  title="Families"
                  text="Related ideas that can help make sense of what may be happening outside the service."
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHY MORE SUPPORT */}
        <section className="bg-[#F3EEE7] py-14 sm:py-18">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
              The difficult part is rarely knowing another strategy.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-[#53645D]">
              Most early childhood teams have already attended professional learning about behaviour, regulation or co-regulation. The harder part is knowing what that looks like when one child is screaming, another is running away, someone else needs your help and the strategy that worked yesterday is not helping today.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              That is where the broader Regulator Champions program becomes useful. It gives your team somewhere to return when the first idea does not fit, when educators are seeing the situation differently, or when the question is no longer “What strategy do we know?” but “What might actually be happening here?”
            </p>
          </div>
        </section>

        {/* RECORDINGS */}
        <section className="bg-white py-14 sm:py-18">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Learn when your team actually has the capacity.
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Professional learning should not feel like another thing educators have to squeeze into an already exhausting week.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                Regulator Champions includes recordings and practical learning that teams can return to when they have the time and headspace. Live support is available for services who want it, but your educators do not need to attend every session live to get value from the program.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2]">
              <CapacityRow
                title="Use the resources now"
                text="Begin with the Regulation Ladder that relates to the challenge your team is dealing with."
              />

              <CapacityRow
                title="Watch when you have time"
                text="Use recordings during planning time, team meetings or whenever educators have the capacity to take more in."
              />

              <CapacityRow
                title="Ask when you are unsure"
                text="Services in the broader program can submit de-identified situations and questions for Robyn to consider."
              />

              <CapacityRow
                title="Go deeper when you are ready"
                text="Use live support, additional resources and optional recognition if those things are useful for your team."
              />
            </div>
          </div>
        </section>

        {/* OPTIONS */}
        <section className="bg-[#FAF5EC] py-14 sm:py-18">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-4xl">
              <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                If your service wants more than the cards
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                The broader Regulator Champions options are for services that want to keep using the card system while also having recordings, questions, implementation support and access to deeper learning across the year.
              </p>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2">
              {PROGRAM_OPTIONS.map((option) => (
                <ProgramOption
                  key={option.name}
                  option={option}
                />
              ))}
            </div>
          </div>
        </section>

        {/* OPTIONAL RECOGNITION */}
        <section className="bg-white py-14 sm:py-18">
          <div className="mx-auto max-w-5xl px-6">
            <div className="border-l-4 border-[#E0BC68] pl-6 sm:pl-8">
              <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
                Want formal recognition as well?
              </h2>

              <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                Educators who choose to complete the full pathway can submit their reflections and practical work for review by Robyn.
              </p>

              <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                This is optional. Your team can still use the Regulation Ladders, resources and recordings without completing the recognition pathway.
              </p>
            </div>
          </div>
        </section>

        {/* FUNDING */}
        <section className="border-y border-[#E5DED4] bg-[#F7F3ED] py-12">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-[#1C3B34]">
                Need information for leadership or funding discussions?
              </h2>

              <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                We can provide program information and formal quotes for services to consider alongside their own professional learning priorities, improvement planning and current funding eligibility requirements.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/school-readiness-funding"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-center font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
              >
                Victorian funding information
              </Link>

              <Link
                href="/kindy-uplift"
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-center font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
              >
                Queensland funding information
              </Link>
            </div>
          </div>
        </section>

        {/* FINAL */}
        <section className="bg-[#1C3B34] py-14 text-white sm:py-18">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl">
              Tell me what&apos;s happening in your rooms.
            </h2>

            <p className="mt-5 max-w-4xl text-xl leading-relaxed text-[#D8E1DC]">
              If you&apos;re not sure whether the cards are enough or whether your team would benefit from the broader Regulator Champions program, you do not need to work that out from a pricing table.
            </p>

            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#D8E1DC]">
              Tell me what your educators keep getting stuck on and we can work out where I would start.
            </p>

            <a
              href="mailto:robyn@playmoveimprove.com.au?subject=Regulator%20Champions%20team%20enquiry"
              className="mt-7 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] transition hover:bg-[#EDCD82]"
            >
              Talk to Robyn about our team
            </a>

            <div className="mt-10 border-t border-white/20 pt-7">
              <p className="text-lg font-extrabold text-white">
                Already ready for the full program?
              </p>

              <Link
                href="/proposal?plan=full"
                className="mt-4 inline-flex text-base font-semibold text-[#F0D99A] transition hover:text-white"
              >
                Request a centre proposal
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function InfoRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="grid gap-2 border-t border-[#D8CFC2] py-5 first:border-t-0 sm:grid-cols-[120px_1fr]">
      <p className="font-extrabold text-[#1C3B34]">
        {title}
      </p>

      <p className="leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function CapacityRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-[#D8CFC2] py-5">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function ProgramOption({
  option,
}: {
  option: {
    name: string;
    price: string;
    period: string;
    description: string;
    includes: string;
    href: string;
    button: string;
  };
}) {
  return (
    <article className="border-t border-[#D8CFC2] pt-6">
      <h3 className="text-2xl font-extrabold text-[#1C3B34]">
        {option.name}
      </h3>

      <p className="mt-4 text-4xl font-extrabold text-[#1C3B34]">
        {option.price}
      </p>

      <p className="mt-1 text-base text-[#6B7772]">
        {option.period}
      </p>

      <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
        {option.description}
      </p>

      <p className="mt-4 text-base leading-relaxed text-[#53645D]">
        {option.includes}
      </p>

      <Link
        href={option.href}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] px-5 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
      >
        {option.button}
      </Link>
    </article>
  );
}