import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Are Children Losing the Ability to Slow Down and Notice? | Regulator Champions',

  description:
    'What happens when children struggle to slow down, notice birds, clouds, conversations and the natural world around them? Explore nature connection, attention, regulation and childhood wellbeing.',

  alternates: {
    canonical: '/blog/children-slow-down-notice-world',
  },

  openGraph: {
    title:
      'Are Children Losing the Ability to Slow Down and Notice the World Around Them?',
    description:
      'A reflective look at childhood busyness, nature connection, attention, nervous system flexibility and why ordinary moments outside still matter.',
    url: '/blog/children-slow-down-notice-world',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Are Our Children Losing the Ability to Slow Down and Notice the World Around Them?',
  description:
    'A reflective article about children, nature connection, attention, slowing down, nervous system flexibility and the value of ordinary outdoor experiences.',
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
      'https://playmoveimprove-regulator-champions.vercel.app/blog/children-slow-down-notice-world',
  },
};

export default function ChildrenSlowDownNoticeWorldPage() {
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
            Nature, attention and regulation
          </span>

          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Are Our Children Losing the Ability to Slow Down and Notice the
            World Around Them?
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            I have been thinking about what happens when children become so used
            to moving towards the next thing that simply sitting outside,
            noticing a bird or sharing a conversation no longer seems to hold
            their attention for very long.
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
              There was a moment recently that I have not been able to stop
              thinking about, because it was so ordinary that I could easily
              have missed it if I had been busy organising the next activity
              myself. We were sitting outside together on a picnic rug having a
              snack, surrounded by the sort of environment we often say we want
              children to experience more of. There were birds around us, a
              breeze moving across our skin, sunshine, grass underneath us and
              enough time for everybody to simply eat, talk and be together for
              a few minutes, yet some of the children seemed to find it
              incredibly difficult to remain inside that moment for any length
              of time.
            </p>

            <p>
              Within what felt like no time at all, somebody needed to stand up
              and find a toy, somebody had wandered away from the group,
              somebody was already looking for what was happening next, and
              maintaining even a short conversation while eating seemed
              unexpectedly difficult. I was not watching children who needed a
              movement break after being forced to sit for too long, and I
              certainly was not wishing they would all become quieter or more
              compliant. I have spent years encouraging adults to understand
              that children need movement. What struck me was the difficulty
              moving in the opposite direction. It was as though their bodies
              had become so accustomed to seeking the next source of stimulation
              that simply being outside together did not feel like enough.
            </p>

            <p>
              Then one little boy looked into the sky and noticed an aeroplane.
              He was genuinely excited by it and began trying to show the other
              children, but almost nobody looked up. They were already absorbed
              in whatever was pulling their attention elsewhere, and this little
              invitation he was offering them quietly disappeared. The
              aeroplane itself was not important, of course, but what happened
              underneath that moment felt important to me. He had noticed
              something in the wider world, become curious about it and then
              tried to draw another person into his experience. In his own
              small way, he was saying, “Come and see what I can see,” and I
              found myself thinking about how much human development sits inside
              something as simple as that.
            </p>

            <p>
              When another person points to the sky and we follow their gaze, we
              are sharing attention. When we pause long enough to hear a bird
              call and wonder where it came from, we are practising sustained
              attention without anybody formally teaching it. When we notice
              that the breeze has changed or that the clouds suddenly look
              different, we are registering sensory information from the
              environment and allowing our attention to move beyond whatever
              immediate task has been placed in front of us. These experiences
              can seem insignificant because there is no obvious product at the
              end of them, but perhaps that is partly why they matter.
            </p>

            <div className="my-10 rounded-4xl border border-[#C29F60]/40 bg-[#FAF5EC] p-7 sm:p-9">
              <p className="text-xl font-extrabold leading-8 text-[#1C3B34] sm:text-2xl">
                What happens when childhood becomes so busy, so stimulating and
                so full of the next thing that these quieter forms of noticing
                begin to happen less often?
              </p>
            </div>

            <p>
              Our children are growing up in a world where something else is
              almost always available. There is another activity, another toy,
              another show, another game, another appointment, another organised
              experience, another destination or another piece of information
              competing for their attention. Families are busy because life
              itself has become busy, and educators are working in environments
              where there can be enormous pressure to keep children engaged,
              entertained, learning, transitioning and moving through the day. I
              do not believe anybody deliberately decided that childhood should
              become this full. I think it happened gradually, until constant
              activity began to feel normal and the spaces in between began to
              feel uncomfortable.
            </p>

            <p>
              The difficult question for me is what children may be getting
              fewer opportunities to practise while we fill so much of that
              space for them. We talk a great deal about mindfulness with
              children now, yet mindfulness can easily become another
              adult-directed task. We sit children down and ask them to take
              three breaths, notice their feelings, use a regulation card or
              listen to a scripted exercise, and while all of those things can
              have value, I sometimes wonder whether we are trying to teach
              children in five-minute activities what childhood itself can
              provide much more naturally through long stretches of ordinary
              time.
            </p>

            <p>
              Being in the moment is not only about knowing how to breathe
              slowly. It is the capacity to stay with an experience long enough
              to notice it changing. It is hearing the second bird call after
              the first one. It is following the aeroplane until it disappears
              behind a cloud. It is remaining beside another person long enough
              for a conversation to develop rather than immediately needing
              something new. It is noticing that your own body has changed after
              running, that you are warm now, that you are thirsty, that your
              breathing feels different, or that sitting quietly suddenly feels
              comfortable after a period of movement.
            </p>

            <h2 className="pt-6 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Regulation is not the same as being still
            </h2>

            <p>
              This is where I think our conversation about regulation needs to
              become broader. Regulation is often reduced to the question of how
              we calm children down once they are already overwhelmed, yet
              healthy regulation is much more about flexibility than permanent
              calmness. Children should be able to move fast, become excited,
              climb, shout, explore and throw themselves wholeheartedly into
              play, but gradually we also want them to experience the other side
              of that rhythm. We want their bodies to know what it feels like to
              slow again, to orient towards a sound, to sit near another person,
              to recover after excitement and to remain connected to what is
              happening around them.
            </p>

            <p>
              Nature offers an unusual setting in which that can occur because
              it gives children sensory information without necessarily placing
              constant demands on them. Leaves are moving but are not asking the
              child to respond. Clouds are changing without becoming another
              instruction. Birds appear and disappear. Wind changes direction.
              Light moves across the ground. The environment is alive and full
              of information, but much of it can simply be noticed rather than
              completed.
            </p>

            <p>
              Research examining nature exposure in children and young people
              has increasingly explored this relationship between natural
              environments, attention, wellbeing and physiological arousal.
              Experimental studies have reported modest benefits for some areas
              of attention and executive functioning, while more recent research
              into nervous-system responses has identified patterns associated
              with lower sympathetic activity and higher parasympathetic
              activity during some forms of nature exposure. This does not mean
              that taking a child outside automatically regulates them, and the
              researchers themselves are clear that this area of science is
              still developing, but it does give us good reason to consider
              natural environments as more than simply somewhere children go to
              burn off energy.
            </p>

            <h2 className="pt-6 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Children need opportunities to practise shifting gears
            </h2>

            <p>
              The part that matters most to me is the ability to move between
              states. I do not want children who spend their day in one
              artificially calm state, because that is not how healthy
              development works. I want children who can run hard, laugh loudly,
              become excited, immerse themselves in play and then gradually
              learn that their body can move in another direction as well. They
              can stop because they heard something interesting, settle beside
              someone after a period of movement, watch something long enough to
              see what happens next, and notice how their own body feels as
              their energy changes.
            </p>

            <p>
              This flexibility is much closer to what I think we should mean
              when we talk about regulation. Regulation is not a child looking
              calm enough for the adults around them. It is a developing ability
              to experience different levels of energy, emotion and sensory
              demand while gradually learning how to move between them and
              remain connected to themselves, to other people and to their
              environment.
            </p>

            <p>
              This is why I do not want our response to children's growing
              busyness to become another carefully structured nature
              curriculum. We can take children outside and make nature every bit
              as busy and adult-directed as the rest of their day by giving them
              scavenger hunts, lists of objects to collect, worksheets to
              complete and activities that need to produce something at the end.
              There is nothing wrong with those experiences in moderation, but
              they are not the only way children learn to connect with the
              natural world.
            </p>

            <p>
              Sometimes I think the more important experience is simply having
              enough time for something unplanned to become interesting. We can
              have the snack outside without an activity attached to it. We can
              stop walking because one child heard something in a tree. We can
              admit that we do not know what kind of bird it is and listen
              together to see whether it calls again. We can lie on the grass
              and notice whether the clouds are moving quickly or slowly. We can
              feel the difference between the sunny part of the garden and the
              shaded part without turning it into a formal lesson.
            </p>

            <p>
              Those moments can look as though nothing particularly educational
              is happening, but perhaps something very important is happening.
              The child is discovering that ordinary experiences are worth
              attending to, that they do not need constant novelty in order for
              the world to remain interesting, and that another person's
              attention can become an invitation rather than an interruption.
            </p>
          </div>
        </div>
      </article>

      {/* REGULATOR CHAMPIONS CONNECTION */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
            Why this matters within Regulator Champions
          </span>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
            Nature and mind-body connection are deliberately woven through our
            regulation work.
          </h2>

          <div className="mt-6 max-w-4xl space-y-5 text-[17px] leading-8 text-[#53645D]">
            <p>
              We are fortunate that much of our Regulator Champions work happens
              amongst nature, and I do not want those surroundings to simply
              become a beautiful background to the program. The natural
              environment gives us opportunities to notice what regulation
              actually feels like inside the body, because children can
              experience vigorous movement and stillness, warmth and shade,
              effort and recovery, loud play and quiet listening within the same
              environment.
            </p>

            <p>
              One of the Regulation Ladders places a strong emphasis on
              mind-body connection because I want educators to think beyond what
              happens once a child has already reached the point of distress.
              We want children to gradually become more aware of what their body
              is communicating while they are living their day, and we want
              adults to become better at noticing those signals before behaviour
              becomes the only thing anybody can see.
            </p>

            <p>
              When a child feels the warmth of the sun on their skin, notices
              their breathing after running, turns towards an unexpected bird
              call or realises that sitting quietly feels different after active
              play, movement, sensation, attention and emotion are all
              interacting together. That is a much richer picture of
              mind-body connection than simply teaching a child a breathing
              exercise and hoping they remember it when everything becomes
              difficult.
            </p>

            <p>
              The aim is not to create children who are always calm. It is to
              help children develop enough flexibility and connection that they
              can experience the full range of childhood while still gradually
              learning how to notice themselves, notice other people and notice
              the world around them.
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
              I keep thinking about the little boy and the aeroplane
            </h2>

            <p>
              Out of everything I watched that day, that may be the image that
              stays with me. A little boy looked up, noticed something and
              wanted the people around him to share it. What he was offering was
              not really information about an aeroplane. He was offering a
              shared moment, and for a few seconds he was asking another person
              to come into his experience and see what he could see.
            </p>

            <p>
              Childhood needs enough breathing room for some of those
              invitations to be accepted. Children need enough space to hear
              another person, enough quiet to notice when something changes,
              enough time for a conversation to continue, and enough ordinary
              moments that the world does not have to become spectacular before
              it deserves their attention.
            </p>

            <p>
              We spend enormous amounts of time discussing what else children
              need, what programs we should introduce, what strategies educators
              should learn and what resources families should provide, yet
              perhaps there are moments when what children need is not something
              else added to their day. Perhaps they need enough time for the
              world they are already standing in to become interesting again,
              enough quiet for a bird to interrupt them, enough space to notice
              how their body feels, and enough opportunity to remain inside an
              ordinary moment without immediately needing to replace it with
              something else.
            </p>

            <p>
              I do not think children have chosen to become disconnected, and I
              do not think parents or educators have deliberately taken this
              away from them. We are all living inside a culture that has become
              incredibly busy and incredibly good at filling empty space, and
              perhaps we are only beginning to understand what some of that
              empty space was quietly doing for us.
            </p>

            <p className="font-semibold text-[#1C3B34]">
              Sometimes protecting childhood may be as simple as leaving enough
              time for a child to look up, for somebody else to look too, and
              for neither of them to need to rush towards whatever comes next.
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
              Kankaanpää, S. and colleagues.{' '}
              <em>
                The impacts of nature connectedness on children&apos;s
                well-being: Systematic literature review.
              </em>{' '}
              Journal of Environmental Psychology, 2023. The review reported
              broadly positive relationships between children&apos;s nature
              connectedness and wellbeing while also identifying variation in
              research methods and the need for stronger longitudinal research.
            </p>

            <p>
              Stevenson, M. P. and colleagues.{' '}
              <em>
                Benefits of nature exposure on cognitive functioning in
                children and adolescents: A systematic review and meta-analysis.
              </em>{' '}
              Journal of Environmental Psychology, 2024. Experimental evidence
              identified small positive effects of nature exposure for some
              aspects of attention and executive functioning.
            </p>

            <p>
              <em>
                A systematic review of the impacts of nature exposure on the
                nervous system in children and youth.
              </em>{' '}
              Journal of Environmental Psychology, 2025. The review identified
              emerging evidence of changes in sympathetic and parasympathetic
              nervous-system activity and attentional processing during some
              forms of nature exposure, while emphasising that this remains a
              developing area of research.
            </p>
          </div>

          <p className="mt-7 text-[11px] leading-5 text-[#75827D]">
            This article discusses general developmental and professional
            learning concepts. Nature experiences affect children differently
            and should not be presented as a treatment or guaranteed strategy
            for regulation, attention or wellbeing.
          </p>
        </div>
      </section>

      {/* NEXT ARTICLE */}
      <section className="bg-[#1C3B34] py-12 text-white">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Continue the nature series
          </span>

          <h2 className="mt-3 max-w-3xl text-2xl font-extrabold sm:text-3xl">
            Before We Teach Children to Care for the Planet, Do They Know How
            to Care for a Worm?
          </h2>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#D8E1DC]">
            The next article explores gentleness, empathy and why learning to
            care for worms, snails, plants and gardens may be an important part
            of children&apos;s relationship with the natural world.
          </p>

          <Link
            href="/blog/children-care-for-worms-nature"
            className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
          >
            Read the next article
          </Link>
        </div>
      </section>
    </main>
  );
}