import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'South Australia Early Childhood Professional Development | 3-Year-Old Preschool',

  description:
    'Professional development for South Australian early childhood services focused on regulation, educator capacity, quality improvement and the rollout of 3-year-old preschool.',

  alternates: {
    canonical:
      '/south-australia-early-childhood-professional-development',
  },

  openGraph: {
    title:
      'South Australia Early Childhood Professional Development | Regulator Champions',
    description:
      'Practical professional learning for South Australian preschools and early childhood services focused on regulation, educator capacity and quality improvement.',
    url:
      '/south-australia-early-childhood-professional-development',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name:
        'Is South Australia rolling out preschool for 3-year-olds?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Yes. South Australia is progressively rolling out universal 3-year-old preschool from 2026 through to 2032 across government and non-government early childhood settings.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Is funding available for professional development in South Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Some South Australian early childhood initiatives include funding that may support professional development. Eligibility and permitted expenditure depend on the service, funding stream and current conditions.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Is Regulator Champions approved by the South Australian Government?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Regulator Champions is an independent professional learning program provided by Play Move Improve. No South Australian Government endorsement or approval is claimed.',
      },
    },
    {
      '@type': 'Question',
      name:
        'How can Regulator Champions support early childhood quality improvement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Regulator Champions supports educator reflection, co-regulation, participation, transitions, sensory awareness and whole-team consistency, which may contribute to broader quality improvement and reflective practice.',
      },
    },
  ],
};

const PRACTICE_POINTS = [
  {
    title: 'Co-regulation',
    text:
      "Helping educators understand how adult responses, relationships and expectations influence children's capacity to participate and recover.",
  },
  {
    title: 'Supporting younger children',
    text:
      'Looking at how developmental capacity, movement, communication and sensory needs influence participation during the early preschool years.',
  },
  {
    title: 'Transitions',
    text:
      'Helping teams examine drop-off, pack-up, group routines and movement between environments rather than only responding once behaviour escalates.',
  },
  {
    title: 'Educator capacity',
    text:
      'Strengthening team judgement so educators can reflect, adapt and make thoughtful decisions without every difficult situation returning to the director.',
  },
  {
    title: 'Environment',
    text:
      'Considering noise, crowding, waiting, room layout and sensory demand as part of the regulation picture.',
  },
  {
    title: 'Whole-team consistency',
    text:
      'Building shared principles so different educators can respond flexibly without children receiving completely contradictory approaches.',
  },
];

export default function SouthAustraliaEarlyChildhoodProfessionalDevelopmentPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              South Australian early childhood services
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Early childhood professional development in South Australia
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              Practical regulation and educator capacity building for preschools and long day care services preparing for a changing early childhood landscape.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              South Australia is progressively rolling out universal 3-year-old preschool from 2026 through to 2032 across government and non-government early childhood settings.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              Regulator Champions supports early childhood teams to strengthen regulation knowledge, educator judgement and whole-team practice as services respond to younger cohorts, changing environments and growing expectations around quality teaching and learning.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/playbooks"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
              >
                Try the Free Regulation Ladder
              </Link>

              <Link
                href="/proposal?plan=preview"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-white bg-white px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3EEE7]"
              >
                Explore Regulator Champions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SA CONTEXT */}
      <section className="border-b border-[#E6E2DC] bg-[#E8D39D]">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="border-l-4 border-[#8A6F3E] pl-6">
            <p className="text-sm font-semibold text-[#6E5426]">
              A major early childhood reform
            </p>

            <p className="mt-3 max-w-4xl text-xl font-extrabold leading-relaxed">
              The 3-year-old preschool rollout is not only an expansion of places. It also brings a significant workforce, practice and quality-development challenge.
            </p>

            <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#45564F]">
              South Australia is investing in the expansion of preschool access alongside workforce growth and quality teaching and learning.
            </p>
          </div>
        </div>
      </section>

      {/* 3YO ROLLOUT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                3-year-old preschool
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Younger children can change what educators need to notice.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                Universal 3-year-old preschool is being introduced progressively across South Australia, beginning in 2026 and expanding over the following years.
              </p>

              <p>
                For services, this creates opportunities to think carefully about how younger children experience transitions, group expectations, separation, communication, sensory load and participation.
              </p>

              <p>
                A strategy that works well for a five-year-old may not be developmentally appropriate for a three-year-old who is still building the foundational skills needed to manage waiting, shifting attention, impulse control and emotional recovery.
              </p>

              <p className="font-semibold text-[#1C3B34]">
                Professional development becomes most useful when it helps educators adjust practice to the developmental capacity of the children actually in front of them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#9A793D]">
              Professional development and readiness funding
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Some services involved in the rollout have received funding that can support professional development.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Government preschools participating in the initial 3-year-old preschool rollout have received readiness support that can be used across areas such as professional development, resources, equipment and environmental preparation.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
              This does not mean every South Australian service has access to the same funding, or that Regulator Champions is automatically an eligible purchase. Funding eligibility depends on the service, the funding stream and the relevant conditions.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT RC SUPPORTS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Where Regulator Champions may fit
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The focus is on helping educators make better decisions in real rooms.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Regulator Champions is designed for teams who want to move beyond collecting more isolated strategies and instead strengthen how educators notice, reflect and respond together.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            {PRACTICE_POINTS.map((item) => (
              <article
                key={item.title}
                className="border-t border-[#D8CFC2] py-6"
              >
                <h3 className="text-xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                Quality improvement
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Regulation work can become part of a much wider conversation about quality.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                South Australia&apos;s early childhood reform includes a strong focus on workforce capability and quality teaching and learning alongside the expansion of 3-year-old preschool.
              </p>

              <p>
                Regulation is connected to far more than behaviour management. It can influence relationships, participation, environments, transitions, learning opportunities and the way educators respond when children find everyday demands difficult.
              </p>

              <p>
                Regulator Champions gives teams practical material they can use within their own reflective practice and quality improvement processes rather than prescribing a single response for every child.
              </p>

              <Link
                href="/nqs-mapping"
                className="inline-flex font-bold text-[#E4C98E] underline decoration-[#E4C98E] decoration-2 underline-offset-4"
              >
                Explore the NQS mapping
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WORKFORCE */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Workforce capability
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Professional learning is part of South Australia&apos;s changing early childhood landscape.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                The expansion of preschool access brings increased attention to workforce preparation, professional learning and the quality of early childhood teaching practice.
              </p>

              <p>
                For individual services, that can mean thinking carefully about what educators need to understand as younger children enter preschool programs and how teams can develop shared approaches rather than relying on one-off strategies.
              </p>

              <p>
                Regulator Champions can sit alongside broader professional learning as an independent option for teams wanting a stronger focus on regulation, co-regulation, participation and practical decision-making.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FREE LADDER */}
      <section className="bg-[#E8D39D] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#6E5426]">
                See the approach before buying
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Start with the free Regulation Ladder.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#45564F]">
                The free Regulation Ladder gives your team an example of how educator, leadership and family perspectives can be brought together around one difficult situation before deciding what to try next.
              </p>

              <Link
                href="/playbooks"
                className="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
              >
                Open the Free Regulation Ladder
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM OPTIONS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#657B6C]">
              Regulator Champions
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Whole-team implementation options
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Services can begin with a six-month implementation period or choose twelve months for more time to revisit the learning as different needs emerge.
            </p>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div className="border-t-4 border-[#C29F60] bg-[#FAF8F5] p-7">
              <p className="text-sm font-semibold text-[#9A793D]">
                6-Month Preview
              </p>

              <h3 className="mt-2 text-3xl font-extrabold">
                $1,790 AUD
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                A meaningful implementation period for teams wanting to begin using the Regulator Champions approach without committing to a full year.
              </p>

              <Link
                href="/proposal?plan=preview"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white"
              >
                View 6-Month Option
              </Link>
            </div>

            <div className="border-t-4 border-[#1C3B34] bg-[#FAF8F5] p-7">
              <p className="text-sm font-semibold text-[#657B6C]">
                12-Month Regulator Champions
              </p>

              <h3 className="mt-2 text-3xl font-extrabold">
                $4,790 AUD
              </h3>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                A longer implementation period giving teams more time to revisit the Regulation Ladders, recordings and support across the year.
              </p>

              <Link
                href="/proposal?plan=full"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white"
              >
                View 12-Month Option
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FUNDING DISCLAIMER */}
      <section className="bg-[#FAF5EC] py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="border-l-4 border-[#C29F60] pl-6">
            <h2 className="text-2xl font-extrabold">
              A note about South Australian funding
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Regulator Champions is an independent professional learning program provided by Play Move Improve. Play Move Improve does not claim South Australian Government endorsement, approval or guaranteed eligibility under any funding program.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Funding arrangements differ between government preschools, long day care services, partner providers and individual reform initiatives. Services should review their current funding conditions and confirm that professional learning expenditure is appropriate before purchasing.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Want to work out whether Regulator Champions fits your South Australian service?
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            Tell me what your educators are finding difficult at the moment and I can help you work out whether the six-month option, twelve-month program or another starting point makes the most sense.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/director-review"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              Tell Me What Your Team Needs
            </Link>

            <Link
              href="/quote"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white bg-white px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              Request a Formal Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}