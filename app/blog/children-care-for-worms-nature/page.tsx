import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Teaching Children to Care for Worms, Snails and Nature | Regulator Champions',

  description:
    'Why being gentle with worms, snails, plants and gardens matters. Explore how nature play can support empathy, respect, self-regulation and children’s connection with the living world.',

  alternates: {
    canonical:
      '/blog/children-care-for-worms-nature',
  },

  openGraph: {
    title:
      'Before We Teach Children to Care for the Planet, Do They Know How to Care for a Worm?',
    description:
      'A reflective article about children, nature play, empathy, gentleness, stewardship and learning to care for the living world close to home.',
    url: '/blog/children-care-for-worms-nature',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Before We Teach Children to Care for the Planet, Do They Know How to Care for a Worm?',
  description:
    'A reflective article about children, nature play, empathy, gentleness, stewardship and learning to care for worms, snails, plants and gardens.',
  author: {
    '@type': 'Person',
    name: 'Robyn Papworth',
    jobTitle:
      'Accredited Exercise Physiologist and Developmental Educator',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Regulator Champions by Play Move Improve',
  },
  inLanguage: 'en-AU',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id':
      'https://playmoveimprove-regulator-champions.vercel.app/blog/children-care-for-worms-nature',
  },
};

export default function ChildrenCareForWormsNaturePage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema),
        }}
      />

      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
          <Link
            href="/"
            className="text-xs font-bold text-[#E4C98E] transition hover:text-white"
          >
            Regulator Champions
          </Link>

          <span className="mt-6 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Nature, empathy and connection
          </span>

          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Before We Teach Children to Care for the Planet, Do They Know How
            to Care for a Worm?
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            I watched children pick up worms recently and found myself thinking
            about how much we expect children to understand about kindness,
            empathy and the environment before we have really shown them how to
            care for the living things directly in front of them.
          </p>

          <div className="mt-7 flex flex-wrap gap-3 text-xs font-bold text-[#BFD0C8]">
            <span>Robyn Papworth</span>
            <span>•</span>
            <span>Regulator Champions</span>
            <span>•</span>
            <span>Nature Play</span>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
          <div className="space-y-7 text-[17px] leading-8 text-[#46554F]">
            <p>
              I watched children pick up worms recently, and the experience
              stayed with me far longer than I expected because what I was
              seeing was not cruelty, and it was not children deliberately
              trying to hurt something. They were fascinated, curious and
              excited to have found something alive in the soil, yet the worms
              were being carried around and passed between hands almost in the
              same way a child might handle a loose piece of paper or a small
              toy. What seemed to be missing was the understanding that this
              little creature had needs of its own, that it had come from
              somewhere, that it relied on moisture and soil to survive, and
              that our excitement about finding it did not mean we could forget
              that it needed to be returned somewhere safe.
            </p>

            <p>
              I remember feeling surprisingly emotional watching that moment
              unfold because I realised how easily adults can assume that
              children will simply know how to care for living things. We talk
              about children being kind, gentle and respectful as though these
              qualities appear automatically, yet so much of what children
              understand about care is learned through repeated experiences with
              the adults around them. A child does not automatically know that
              a worm will dry out if it is left sitting in the sun, that a snail
              has not appeared in the garden for the purpose of becoming a toy,
              or that a small plant that is repeatedly pulled out of the soil
              will eventually stop growing.
            </p>

            <p>
              They learn because somebody slows down enough to explain it in a
              way that makes the living thing matter. We might say, “This worm
              needs the damp soil, so let’s put it back where we found it,” or
              “We can look at this snail for a little while and then we need to
              return it somewhere safe,” and these comments may seem incredibly
              simple, yet they gradually teach children that their own curiosity
              exists alongside responsibility.
            </p>

            <p>
              This is what I keep thinking about when we talk about teaching
              children to care for the environment. We often begin with very big
              ideas such as recycling, reducing waste, saving water, protecting
              wildlife or caring for the planet, and all of those conversations
              are important, but I wonder whether we sometimes begin too far
              away from the child’s actual experience. The concept of
              protecting the planet is enormous for a young child, while the
              understanding that the worm in their hand needs to return to damp
              soil is immediate, tangible and real.
            </p>

            <div className="my-10 rounded-4xl border border-[#C29F60]/40 bg-[#FAF5EC] p-7 sm:p-9">
              <p className="text-xl font-extrabold leading-8 text-[#1C3B34] sm:text-2xl">
                Before a child can care deeply about something as abstract as
                “the environment”, perhaps they need the opportunity to care
                about the living world that is already within reach.
              </p>
            </div>

            <p>
              A child who learns to put a rock back because insects live
              underneath it is beginning to understand habitat in a way that no
              worksheet can replicate. A child who watches a snail move through
              the garden and resists the urge to keep picking it up is beginning
              to understand that being interested in another living thing does
              not mean we are entitled to control it. A child who learns that
              some flowers can remain on the plant because bees and other
              insects may need them is beginning to see that the garden exists
              for more than just human enjoyment.
            </p>

            <p>
              These are such ordinary experiences, but they carry important
              lessons about perspective, responsibility and restraint. The child
              begins to recognise that another living thing has needs that are
              different from their own, and that what they choose to do can
              affect something more vulnerable than themselves. In that sense,
              being gentle with a worm is not only a lesson about nature. It is
              also an early lesson in thinking beyond your own immediate wants.
            </p>

            <h2 className="pt-6 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Children learn what deserves care by watching us
            </h2>

            <p>
              I think children notice much more than we sometimes realise about
              the way adults interact with the natural world. If an adult
              automatically crushes an insect because it is inconvenient,
              children notice. If we tear plants apart without thought, they
              notice. If we lift a log, discover a collection of tiny creatures
              underneath it and then carefully replace the log because it is
              somebody else’s shelter, they notice that too.
            </p>

            <p>
              None of this requires adults to become experts in ecology. We do
              not need to know the scientific name of every worm, bird, plant or
              insect in order to teach respect. In some ways, I think it can be
              incredibly powerful for children to hear an adult say, “I don’t
              know what that is, but we can look closely and make sure we are
              gentle with it.” That response communicates that knowledge is
              useful, but care does not have to wait until we know everything.
            </p>

            <p>
              What matters is the message underneath our behaviour: this living
              thing is worthy of consideration even when it cannot speak to us,
              entertain us or give us anything in return.
            </p>

            <p>
              I think this is also why gardens are such valuable places for
              young children. A garden is full of living things that respond
              slowly and quietly to what happens around them. Plants do not
              scream when a child pulls them apart. Worms cannot tell us they
              are becoming dry. A snail cannot explain that constant handling is
              stressful. The child has to learn to notice more subtle
              information and, with adult guidance, begin to respond before
              damage becomes obvious.
            </p>

            <p>
              This is very different from many of the fast feedback systems
              children experience elsewhere. A screen responds immediately. A
              toy makes a noise. A game rewards or corrects. Nature often gives
              much quieter feedback, which means children may need adults to
              help them interpret what they are seeing until they gradually
              begin to notice for themselves.
            </p>

            <h2 className="pt-6 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Respecting nature does not mean stopping children from touching it
            </h2>

            <p>
              I also think it is important that this conversation does not
              become another reason to tell children not to touch anything. I
              want children to touch nature. I want them digging in soil,
              collecting sticks, feeling bark, finding worms, turning over
              leaves, looking underneath logs, jumping into puddles and
              discovering the tiny creatures that many adults walk straight
              past.
            </p>

            <p>
              Children learn through their bodies, and we should not confuse
              respect for nature with keeping children physically separated from
              it. The learning sits in helping children understand how to
              interact closely without assuming that everything they discover
              exists for them to take, keep, squeeze, pull apart or remove.
            </p>

            <p>
              We can say yes to the exploration while still teaching care. “Yes,
              you can hold the worm, and let’s use very gentle hands.” “Yes, we
              can look underneath the log, and then we need to put it back.”
              “Yes, you can smell the flowers, and we are going to leave these
              ones growing.” These are not complicated lessons, yet repeated
              over months and years they begin to form a very different
              relationship between the child and the natural world.
            </p>

            <p>
              In many ways, this is what stewardship begins to look like in
              early childhood. It is not a child being able to define
              sustainability. It is a child who knows that their actions matter
              in a place that is shared with other living things.
            </p>

            <h2 className="pt-6 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              The beginning of empathy may sometimes look very small
            </h2>

            <p>
              When we think about empathy, we often imagine children comforting
              another person, noticing sadness or understanding somebody else’s
              feelings. Those are important expressions of empathy, but I think
              nature gives children another way to practise the beginnings of
              perspective-taking because they have to consider needs that are
              completely different from their own.
            </p>

            <p>
              The child may want to hold the worm for another ten minutes, but
              the worm needs to return to the soil. The child may want to pick
              every flower because they are beautiful, but the plant needs some
              of those flowers to remain. The child may want to take the snail
              home, but the snail belongs in the environment where it was found.
              In each case, the child is learning that wanting something is not
              the only consideration.
            </p>

            <p>
              That is a profoundly useful lesson in childhood because so much of
              self-regulation eventually involves being able to pause long
              enough to consider information beyond the immediate impulse. The
              child does not have to stop being excited or curious. They simply
              learn that excitement can exist alongside gentleness, and that
              curiosity can exist alongside care.
            </p>

            <p>
              Research on children’s environmental behaviour supports the idea
              that direct contact with nature and meaningful experiences in
              natural environments are important influences in the development
              of nature connection and environmentally caring behaviour. The
              research does not suggest that simply putting a child outside
              automatically creates empathy or stewardship, because family,
              culture, education and social values all play a role, but it does
              suggest that children’s relationships with nature are shaped
              through experience rather than through information alone.
            </p>

            <p>
              This is why I think we need to be careful not to reduce
              environmental learning to posters, recycling bins and annual
              sustainability activities. Those things can have value, but they
              become much more meaningful when children already have a lived
              relationship with the natural environment around them.
            </p>

            <p>
              A child who has never really cared about a worm may understand the
              words “protect biodiversity”, but the child who has learned to
              return worms carefully to the soil already understands something
              important about what those words are trying to protect.
            </p>
          </div>
        </div>
      </article>

      {/* REGULATOR CHAMPIONS */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
            Why this belongs within Regulator Champions
          </span>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
            Regulation is also about learning to pause before we act.
          </h2>

          <div className="mt-6 max-w-4xl space-y-5 text-[17px] leading-8 text-[#53645D]">
            <p>
              Within Regulator Champions, we keep returning to the idea that
              regulation should not be reduced to making children calmer or
              teaching them a collection of strategies to use after something
              has already gone wrong. We are interested in the growing capacity
              to notice, pause, respond and remain connected to what is
              happening inside the body and around it.
            </p>

            <p>
              Nature gives children incredibly meaningful opportunities to
              practise those skills. A child who slows their hand before
              grabbing a snail, who notices that the worm needs to return to
              damp soil, or who chooses to step around a new plant rather than
              running straight through it is bringing awareness, impulse
              control, sensory information and care together in a real moment.
            </p>

            <p>
              This is also why our program places such a strong emphasis on
              nature and mind-body connection. We want educators to see
              regulation as something children build across their whole day,
              through relationships, movement, sensory experiences, attention
              and their interactions with the environment, rather than as a
              separate skill that only becomes relevant once a child is already
              overwhelmed.
            </p>

            <p>
              When children learn to interact gently with the natural world,
              they are not only learning about worms or gardens. They are
              learning something about themselves as participants in a wider
              world, where their actions affect other living things and where
              care matters even when there is no immediate reward for showing
              it.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
            >
              Explore Regulator Champions
            </Link>

            <Link
              href="/feed"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-[#C29F60] bg-white px-6 py-3.5 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
            >
              Explore practice scenarios
            </Link>
          </div>
        </div>
      </section>

      {/* CLOSING */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="space-y-7 text-[17px] leading-8 text-[#46554F]">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Perhaps caring for the planet needs to begin much closer to home
            </h2>

            <p>
              I think we sometimes rush children towards enormous environmental
              concepts before giving them enough time to form a relationship
              with the small pieces of nature around them. We want them to care
              about forests, oceans, endangered species and climate, and of
              course I want that too, but there is something incredibly
              important about beginning with what the child can touch, notice
              and care for today.
            </p>

            <p>
              This worm matters. This snail matters. This plant matters. This
              patch of garden matters. The child may not yet understand the
              enormous systems connecting all of these living things, but they
              can begin to understand that the world is shared and that their
              own actions have consequences inside it.
            </p>

            <p>
              I do not think we need to make children feel guilty about nature,
              and I certainly do not want young children carrying the emotional
              weight of environmental problems that adults themselves are still
              struggling to solve. I want something much gentler than that. I
              want children to develop affection for the living world, because
              care built through relationship has a very different quality from
              care taught through fear.
            </p>

            <p>
              We can begin by letting them discover things, by getting our hands
              dirty alongside them, by showing them how much life exists in an
              ordinary garden, and by helping them understand that finding
              something beautiful or interesting does not mean we have to own
              it, move it or change it.
            </p>

            <p className="font-semibold text-[#1C3B34]">
              Sometimes kindness begins with something as small as opening a
              child’s hand, placing a worm gently back into the damp soil and
              saying, “This is where it needs to be.”
            </p>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="border-t border-[#E6E2DC] bg-[#FAF8F5] py-12">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
            Research and further reading
          </span>

          <h2 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
            References
          </h2>

          <div className="mt-6 space-y-5 text-sm leading-6 text-[#53645D]">
            <p>
              Ernst, J., McAllister, K. and colleagues.{' '}
              <em>
                Contributions to Sustainability through Young Children&apos;s
                Nature Play: A Systematic Review.
              </em>{' '}
              Sustainability, 2021. Across the reviewed studies, reported
              outcomes of nature play included connection with nature,
              stewardship and compassionate care for plants and wildlife,
              alongside self-regulation and prosocial development.
            </p>

            <p>
              Ardoin, N. M. and Bowers, A. W.{' '}
              <em>
                Early childhood environmental education: A systematic review of
                the research literature.
              </em>{' '}
              Educational Research Review, 2020. The review identified
              nature-rich experiences, play and movement as prominent features
              of early childhood environmental education and reported both
              affective and cognitive learning outcomes.
            </p>

            <p>
              <em>
                Children&apos;s pro-environmental behaviour: A systematic review
                of the literature.
              </em>{' '}
              Journal of Cleaner Production, 2024. The review identified direct
              contact with nature among the factors associated with
              pro-environmental behaviour in children, alongside family,
              educational and social influences.
            </p>
          </div>

          <p className="mt-7 text-[11px] leading-5 text-[#75827D]">
            This article discusses general developmental and educational
            concepts. Children should be supported to interact with natural
            environments in ways that are appropriate to their age, abilities,
            service policies and the safety of both children and wildlife.
          </p>
        </div>
      </section>

      {/* SERIES NAV */}
      <section className="bg-[#1C3B34] py-12 text-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Continue the nature series
          </span>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/blog/children-slow-down-notice-world"
              className="rounded-3xl border border-white/15 bg-white/5 p-6 transition hover:bg-white/10"
            >
              <span className="text-xs font-bold text-[#E4C98E]">
                Previous article
              </span>

              <h2 className="mt-2 text-xl font-extrabold">
                Are Our Children Losing the Ability to Slow Down and Notice the
                World Around Them?
              </h2>
            </Link>

            <Link
              href="/blog/children-respect-gardens-nature"
              className="rounded-3xl bg-[#C29F60] p-6 text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              <span className="text-xs font-bold">
                Next article
              </span>

              <h2 className="mt-2 text-xl font-extrabold">
                Our Gardens Should Not Just Be Somewhere Children Run Through
              </h2>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}