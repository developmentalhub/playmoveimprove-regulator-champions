import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'NSW Early Childhood Professional Development | Start Strong & Quality Uplift',

  description:
    'Professional development for NSW early childhood services focused on regulation, educator capacity and quality improvement. Explore how Regulator Champions may support Start Strong, NQS and quality uplift priorities.',

  alternates: {
    canonical:
      '/nsw-early-childhood-professional-development',
  },

  openGraph: {
    title:
      'NSW Early Childhood Professional Development | Regulator Champions',
    description:
      'Practical professional learning for NSW early childhood teams focused on regulation, educator capacity, NQS and quality improvement.',
    url:
      '/nsw-early-childhood-professional-development',
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
        'Can NSW Start Strong funding be used for professional development?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'The 2026 Start Strong for Long Day Care guidelines include professional development and further study as examples of activities that can support educator capability uplift. Services should always check the current funding guidelines and their own eligibility before committing funds.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Is Regulator Champions approved by the NSW Government?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Regulator Champions is an independent professional learning program by Play Move Improve. It is not presented as a NSW Government endorsed or approved program. Services should determine whether the program aligns with their own funding and quality improvement priorities.',
      },
    },
    {
      '@type': 'Question',
      name:
        'Can Regulator Champions support NQS quality improvement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'Regulator Champions is designed to support educator reflection, co-regulation, participation, responsive practice and whole-team consistency, which may support broader quality improvement discussions and NQS planning.',
      },
    },
    {
      '@type': 'Question',
      name:
        'What happens to Start Strong funding in 2027?',
      acceptedAnswer: {
        '@type': 'Answer',
        text:
          'NSW has announced new funding arrangements from 1 January 2027. Universal Preschool Funding will replace Start Strong for Community Preschools. Services should check the latest NSW Department of Education guidance as new program details are released.',
      },
    },
  ],
};

export default function NSWEarlyChildhoodProfessionalDevelopmentPage() {
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
              New South Wales early childhood services
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Early childhood professional development in NSW
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              Practical professional learning for services working on regulation, educator capacity, quality uplift and everyday practice.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Regulator Champions helps early childhood teams work out what to notice and what to try when behaviour, regulation, transitions and participation become difficult.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              For NSW services, this may sit alongside broader quality improvement, professional learning and Start Strong priorities, depending on your service type, funding arrangements and current goals.
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

      {/* NSW CONTEXT */}
      <section className="border-b border-[#E6E2DC] bg-[#E8D39D]">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="border-l-4 border-[#8A6F3E] pl-6">
            <p className="text-sm font-semibold text-[#6E5426]">
              NSW quality and funding context
            </p>

            <p className="mt-3 max-w-4xl text-xl font-extrabold leading-relaxed">
              In 2026, Start Strong continues to place a strong emphasis on quality uplift and improved outcomes for children.
            </p>

            <p className="mt-3 max-w-4xl text-base leading-relaxed text-[#45564F]">
              The way individual services can use funding depends on the specific Start Strong stream, service type and current guidelines, so professional learning decisions should always be checked against your own funding agreement.
            </p>
          </div>
        </div>
      </section>

      {/* START STRONG */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Start Strong 2026
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Professional development can form part of quality and capability uplift.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                The 2026 Start Strong for Long Day Care guidelines include support for capability uplift of early childhood teachers and educators through professional development and further study.
              </p>

              <p>
                The program also identifies quality uplift as a key objective, with a particular focus on ensuring children have access to high-quality early childhood education programs.
              </p>

              <p>
                For community preschools, quality uplift is also embedded within the 2026 Start Strong program, with professional learning included among the supports that may be used to strengthen practice.
              </p>

              <p className="font-semibold text-[#1C3B34]">
                This does not mean every professional learning provider or program is automatically eligible for Start Strong expenditure. Your service should always check the current NSW Department of Education guidelines and its own funding requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT RC SUPPORTS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold text-[#9A793D]">
              Where Regulator Champions may fit
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              The focus is not another one-off behaviour training session.
            </h2>

            <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
              Regulator Champions is designed for services that want educators to become more confident noticing what may sit underneath behaviour, reflecting on difficult moments and deciding what to try next together.
            </p>
          </div>

          <div className="mt-10 grid gap-x-10 md:grid-cols-2">
            <PracticePoint
              title="Co-regulation"
              text="Helping educators understand how adult responses, relationships, expectations and environment can influence a child's capacity to participate and recover."
            />

            <PracticePoint
              title="Transitions and participation"
              text="Looking at routines such as drop-off, pack-up, group time and movement between spaces rather than treating every difficulty as an individual behaviour problem."
            />

            <PracticePoint
              title="Educator capacity"
              text="Giving teams a shared way to notice, reflect and adapt so every difficult moment does not need to return to the director for an answer."
            />

            <PracticePoint
              title="Quality improvement conversations"
              text="Supporting reflective discussion about everyday practice, team consistency and what may need to change across the environment or adult response."
            />
          </div>
        </div>
      </section>

      {/* NQS */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                NQS and quality uplift
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Regulation work can support a much broader quality conversation.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                Difficult behaviour rarely sits neatly inside one Quality Area. Regulation can involve relationships, environment, program decisions, educator practice, leadership, family communication and the way teams reflect together.
              </p>

              <p>
                That is why Regulator Champions is designed as whole-team professional learning rather than simply a collection of child-focused strategies.
              </p>

              <p>
                Services can use the learning to support their own reflective practice and quality improvement discussions, while continuing to make their own decisions about how that work connects to their NQS priorities and Quality Improvement Plan.
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

      {/* 2027 */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Looking ahead to 2027
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                NSW early childhood funding is changing.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                The NSW Government has announced new funding arrangements from 1 January 2027.
              </p>

              <p>
                Universal Preschool Funding will replace Start Strong for Community Preschools, while further details about 2027 funding arrangements are being released through updated program guidelines.
              </p>

              <p>
                If your service is planning professional learning across 2026 and 2027, it is worth checking the latest NSW Department of Education information before allocating future funding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICAL START */}
      <section className="bg-[#E8D39D] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#6E5426]">
                Want to see the approach first?
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
              Services can begin with a six-month implementation period or choose the twelve-month Regulator Champions option for longer-term access and support.
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
                A longer implementation pathway giving teams more time to revisit the Regulation Ladders, recordings and support as different situations emerge.
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
              A note about NSW funding
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Regulator Champions is an independent professional learning program provided by Play Move Improve. Play Move Improve does not claim NSW Government endorsement, approval or guaranteed eligibility under Start Strong or any other funding program.
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              Funding rules can vary by program, service type and year. Before purchasing, services should review the current NSW Department of Education program guidelines and confirm that the proposed expenditure is appropriate for their own funding arrangements.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <h2 className="max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            Want to work out whether Regulator Champions fits your NSW service?
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

function PracticePoint({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="border-t border-[#D8CFC2] py-6">
      <h3 className="text-xl font-extrabold">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </article>
  );
}