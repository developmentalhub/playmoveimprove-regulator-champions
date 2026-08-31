import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Early Childhood Regulation, Nature Play & Practice Articles | Regulator Champions',

  description:
    'Read evidence-informed articles for parents, educators and early childhood leaders about co-regulation, nature play, slowing down, emotional regulation, safe touch, child development and reflective practice.',

  alternates: {
    canonical: '/blog',
  },

  openGraph: {
    title:
      'Early Childhood Regulation, Nature Play & Practice Articles | Regulator Champions',
    description:
      'Thoughtful articles about regulation, nature connection, child development, co-regulation, safe touch and everyday early childhood practice.',
    url: '/blog',
    type: 'website',
  },
};

const natureArticles = [
  {
    slug: '/blog/children-slow-down-notice-world',
    number: '01',
    title:
      'Are Our Children Losing the Ability to Slow Down and Notice the World Around Them?',
    description:
      'What happens when children become so used to moving towards the next thing that sitting outside, hearing a bird, noticing the clouds or sharing an ordinary conversation no longer seems to hold them for very long?',
    focus:
      'Slowing down, attention, nervous system flexibility and nature connection',
  },
  {
    slug: '/blog/children-care-for-worms-nature',
    number: '02',
    title:
      'Before We Teach Children to Care for the Planet, Do They Know How to Care for a Worm?',
    description:
      'A reflection on worms, snails, plants and the small everyday experiences through which children begin learning gentleness, responsibility and respect for other living things.',
    focus:
      'Empathy, stewardship, impulse control and caring for living things',
  },
  {
    slug: '/blog/children-respect-gardens-nature',
    number: '03',
    title:
      'Our Gardens Should Not Just Be Somewhere Children Run Through',
    description:
      'Why children need enough time in familiar natural places to notice what changes, develop affection for where they are and begin treating gardens as living environments rather than scenery.',
    focus:
      'Place connection, mindfulness, gardens and mind-body awareness',
  },
];

const practiceArticles = [
  {
    slug: '/blog/safe-touch-early-childhood',
    title:
      'The Heartbreak of Second-Guessing a Hug: Why Safe Touch Needs Humanity, Not Just Legislation',
    category: 'Safe touch and co-regulation',
    description:
      'Why compassionate early childhood educators can find themselves hesitating in moments of child distress, and how safeguarding, professional judgement and warm responsive care can exist together.',
    image:
      '/images/feed/safe-touch-early-childhood.png',
    pdfLink:
      '/pdf/Safe-Touch-Early-Childhood-Guide.pdf',
    pdfTag: '19-Page ECEC Guide',
  },
  {
    slug:
      '/blog/before-i-offer-comforting-touch-checklist',
    title:
      'Before I Offer Comforting Touch: A Quick Reflection Checklist for ECEC Educators',
    category: 'Educator reflection',
    description:
      'A practical reflection framework to help room teams pause, notice the child and consider context, boundaries and professional judgement before responding with physical comfort.',
    image:
      '/images/feed/comforting-touch-checklist.png',
    pdfLink:
      '/pdf/Before-I-Offer-Comforting-Touch-Checklist.pdf',
    pdfTag: 'Printable Checklist',
  },
];

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              Regulator Champions articles
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Thoughtful conversations about children,
              regulation and the world around them
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg">
              This is where I explore the questions that
              often sit underneath everyday early
              childhood practice, including why children
              are finding it harder to slow down, how
              nature can support mind-body connection,
              what behaviour may be communicating, and
              how educators can remain warm, responsive
              and thoughtful when situations become
              difficult.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              These articles are written for educators,
              service leaders and parents who want to
              understand children more deeply rather than
              simply collect another list of strategies.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED NATURE SERIES */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                Featured series
              </span>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-[#1C3B34] sm:text-4xl">
                Children, nature and the ability to
                notice
              </h2>

              <p className="mt-5 text-base leading-relaxed text-[#53645D]">
                I began writing this series after
                watching children struggle to remain on
                a picnic rug for a short conversation,
                seeing a little boy point towards an
                aeroplane that almost nobody else
                noticed, and watching worms being picked
                up with very little understanding that
                these tiny creatures needed care.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                None of those moments meant that the
                children were uncaring or that something
                was inherently wrong with them. They
                made me wonder instead about the
                childhood we are building around
                children, how little empty space is left
                in their days, and whether direct
                connection with nature may be one of the
                experiences we need to protect more
                deliberately.
              </p>

              <div className="mt-6 rounded-3xl bg-[#FAF5EC] p-5">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                  Why this belongs in Regulator Champions
                </span>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  Nature and mind-body connection are
                  deliberately woven through our
                  Regulation Ladders because regulation
                  is not only about what happens once a
                  child becomes overwhelmed. It also
                  involves learning to notice the body,
                  shift between different levels of
                  energy, share attention with another
                  person and remain connected to the
                  environment around us.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {natureArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={article.slug}
                  className="group block rounded-4xl border border-[#E6E2DC] bg-[#FAF8F5] p-6 transition hover:border-[#C29F60] hover:bg-white sm:p-7"
                >
                  <div className="flex gap-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#C29F60] text-sm font-extrabold text-[#1C3B34]">
                      {article.number}
                    </span>

                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#657B6C]">
                        {article.focus}
                      </span>

                      <h3 className="mt-2 text-xl font-extrabold leading-snug text-[#1C3B34] transition group-hover:text-[#657B6C] sm:text-2xl">
                        {article.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                        {article.description}
                      </p>

                      <span className="mt-4 inline-flex text-xs font-extrabold text-[#9A793D]">
                        Read the article →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QUOTE / POSITIONING */}
      <section className="bg-[#1C3B34] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <p className="text-2xl font-extrabold leading-relaxed tracking-tight sm:text-3xl">
            “Perhaps children need enough time for the
            world they are already standing in to become
            interesting again.”
          </p>

          <p className="mt-4 text-sm text-[#BFD0C8]">
            Robyn Papworth, Regulator Champions
          </p>
        </div>
      </section>

      {/* PRACTICE ARTICLES */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-9 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Regulation, connection and educator practice
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              More conversations for early childhood
              teams
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#53645D]">
              These articles explore the moments where
              regulation, relationships, child safety
              and professional judgement meet, with
              practical resources that teams can use to
              continue the conversation together.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {practiceArticles.map((item) => (
              <article
                key={item.slug}
                className="overflow-hidden rounded-4xl border border-[#E6E2DC] bg-white shadow-sm"
              >
                <div className="aspect-16/8 overflow-hidden bg-[#F0ECE6]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-6 sm:p-7">
                  <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#FAF5EC] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-[#1C3B34]">
                    {item.category}
                  </span>

                  <h3 className="mt-4 text-2xl font-extrabold leading-snug text-[#1C3B34]">
                    <Link
                      href={item.slug}
                      className="transition hover:text-[#657B6C]"
                    >
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mt-4 text-sm leading-relaxed text-[#6A7873]">
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href={item.slug}
                      className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
                    >
                      Read the article
                    </Link>

                    <a
                      href={item.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-12 flex-1 items-center justify-center rounded-xl border border-[#C29F60] bg-[#FAF5EC] px-5 py-3 text-center text-sm font-bold text-[#1C3B34] transition hover:bg-white"
                    >
                      Download {item.pdfTag}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE CORE TOPICS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="mb-8 max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Build the bigger picture
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
              Explore the ideas behind Regulator
              Champions
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              href="/emotional-regulation-early-childhood"
              className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Emotional regulation
              </span>

              <h3 className="mt-3 text-xl font-extrabold">
                What is the child&apos;s body telling us?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Look beyond visible behaviour and
                consider movement, sensory load,
                shutdown, attention and emotional
                capacity.
              </p>
            </Link>

            <Link
              href="/co-regulation-early-childhood"
              className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Co-regulation
              </span>

              <h3 className="mt-3 text-xl font-extrabold">
                What do children need from adults?
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Explore how relationships, language,
                pace, environment and adult responses
                support developing regulation.
              </p>
            </Link>

            <Link
              href="/educator-capacity-building"
              className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-6 transition hover:border-[#C29F60]"
            >
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Educator capability
              </span>

              <h3 className="mt-3 text-xl font-extrabold">
                Build judgement, not just strategy lists
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                Help educators turn professional
                learning into better noticing, shared
                reflection and more thoughtful everyday
                decisions.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* FREE GUIDE */}
      <section className="bg-[#FAF5EC] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-7 rounded-4xl border border-[#C29F60]/35 bg-white p-7 lg:grid-cols-[1fr_auto] lg:items-center sm:p-9">
            <div className="max-w-3xl">
              <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                Free educator resource
              </span>

              <h2 className="mt-3 text-2xl font-extrabold text-[#1C3B34] sm:text-3xl">
                Can I still comfort a distressed child?
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                Download our free guide exploring safe,
                appropriate comforting touch,
                professional judgement, boundaries and
                why safeguarding and warm responsive
                care do not need to become competing
                ideas.
              </p>
            </div>

            <Link
              href="/free-guide"
              className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
            >
              Download the free guide
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
            Reading can start the conversation.
            Regulator Champions helps your whole team
            keep building the practice.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC]">
            The Regulation Ladders help early childhood
            teams build shared understanding around
            regulation, co-regulation, sensory needs,
            mind-body connection, participation and
            everyday professional judgement, with
            learning that can be applied to what
            educators are actually experiencing in
            their rooms.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Start with the 3 Ladder Preview
            </Link>

            <Link
              href="/proposal?plan=full"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              View the Full 8 Ladder Pathway
            </Link>
          </div>

          <Link
            href="/director-review"
            className="mt-5 inline-flex text-sm font-bold text-[#E4C98E] underline decoration-[#E4C98E]/40 underline-offset-4"
          >
            Not sure which pathway fits your service?
          </Link>
        </div>
      </section>
    </main>
  );
}