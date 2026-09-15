import type { Metadata } from 'next';
import Link from 'next/link';

const VAGUS_CARDS_PAYMENT_URL =
  'https://buy.stripe.com/14AbIUgaeb9C0Vze549fW0d';

export const metadata: Metadata = {
  title:
    'Vagus Nerve Activities for Children | Regulation Through Play',

  description:
    'Practical early childhood activities using breathing, sound, movement, sensory play and body awareness, with a careful explanation of the vagus nerve, parasympathetic nervous system and regulation.',

  alternates: {
    canonical:
      '/blog/vagus-nerve-regulation-activities',
  },

  openGraph: {
    title:
      'Vagus Nerve Activities for Children | Regulation Through Play',
    description:
      'Robyn Papworth explores the vagus nerve, children’s regulation and playful activities using breath, sound, movement, body awareness and sensory experiences.',
    url:
      '/blog/vagus-nerve-regulation-activities',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Vagus Nerve Activities for Children: Regulation Through Play',
  description:
    'A practical article for early childhood educators about the vagus nerve, parasympathetic nervous system, regulation and playful activities using breath, sound, movement and sensory experiences.',
  author: {
    '@type': 'Person',
    name: 'Robyn Papworth',
    jobTitle:
      'Accredited Exercise Physiologist and Developmental Educator',
  },
  publisher: {
    '@type': 'Organization',
    name:
      'Regulator Champions by Play Move Improve',
  },
  inLanguage: 'en',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id':
      'https://playmoveimprove-regulator-champions.vercel.app/blog/vagus-nerve-regulation-activities',
  },
};

const videoSchema = {
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name:
    'Parasympathetic Nervous System and Regulation in Early Childhood',
  description:
    'Robyn Papworth explains the window of tolerance, nervous system regulation and practical breathing, movement, sound and sensory activities for young children.',
  thumbnailUrl:
    'https://img.youtube.com/vi/ondgjOSxDx8/maxresdefault.jpg',
  embedUrl:
    'https://www.youtube.com/embed/ondgjOSxDx8',
};

export default function VagusNerveRegulationActivitiesPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            videoSchema,
          ),
        }}
      />

      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:px-6 sm:py-20">
          <Link
            href="/blog"
            className="text-sm font-bold text-[#E4C98E] transition hover:text-white"
          >
            Back to articles
          </Link>

          <p className="mt-8 text-sm font-semibold text-[#E4C98E]">
            Nervous system, regulation and play
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            The Vagus Nerve, Children&apos;s Regulation and the Playful Activities I Use in Early Childhood
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            When a child seems to move very quickly from coping to running, throwing, hiding, pushing, crying or being unable to hear another instruction, it can feel as though the behaviour appeared from nowhere. Quite often, however, smaller changes were happening in the child&apos;s body long before we reached that point.
          </p>

          <p className="mt-6 text-sm font-semibold text-[#BFD0C8]">
            Robyn Papworth, Accredited Exercise Physiologist and Developmental Educator
          </p>
        </div>
      </section>

      {/* ARTICLE INTRO */}
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="space-y-7 text-lg leading-8 text-[#46554F]">
            <p>
              One of the things I have spoken about with early childhood teams for many years is the importance of noticing smaller changes before we immediately move into correcting behaviour.
            </p>

            <p>
              A child may begin rubbing their face, pulling at their clothing, chewing something, clenching their hands, becoming louder, hiding in a smaller space, seeking more movement or suddenly finding it much harder to process what we are saying before the larger behaviour appears.
            </p>

            <p>
              These are the moments that interest me most, because rather than waiting until a child is completely overwhelmed and then asking how we can calm them down, I would much rather we become better at noticing what their body may have been communicating earlier and thinking about whether there was something we could change in the environment, interaction or activity.
            </p>

            <p>
              I often explain regulation using the idea of a river. There are times when we are moving through a calmer section where we can look around, connect with other people, listen, think, play and cope with small frustrations. Then there are the rapids, where our body is working much harder and our attention becomes much narrower because getting through that moment has become the priority.
            </p>

            <p>
              Children do not all have the same amount of space in that calmer part of the river, and their capacity is not exactly the same every day either. Temperament, sensory needs, sleep, relationships, stress, illness, life experiences, the environment and what happened before they even walked through the door can all change how much they have available.
            </p>

            <div className="my-10 border-l-4 border-[#C29F60] bg-[#FAF5EC] p-7 sm:p-9">
              <p className="text-xl font-extrabold leading-8 text-[#1C3B34] sm:text-2xl">
                When somebody tells me that a child goes from zero to one hundred, I often wonder whether that child was actually already sitting at eighty before the behaviour became obvious to the adults around them.
              </p>
            </div>

            <h2 className="pt-5 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              What happens before the big behaviour?
            </h2>

            <p>
              Before a child reaches the point where we are seeing the behaviour that worries us, there are often smaller body cues that are incredibly easy to miss when we are managing a busy room.
            </p>

            <p>
              A child might start touching their face more, pulling at their collar, chewing their sleeve, tightening their fists, changing the way they move, becoming much louder or becoming unusually quiet. They may seek upside-down movement, hide under furniture, climb higher, move faster or suddenly struggle to respond to language that they would normally understand.
            </p>

            <p>
              I do not look at these signs because I expect educators to prevent every difficult emotion or challenging moment. Children are meant to become frustrated, excited, angry, tired and overwhelmed at times, just as adults do.
            </p>

            <p>
              What I want us to become more confident at doing is noticing when the child may be moving towards the edge of what they can manage and offering support while there is still enough capacity for connection.
            </p>

            <h2 className="pt-5 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Why I do not want regulation to become another instruction
            </h2>

            <p>
              This topic is professional for me, but it is also personal. I grew up with childhood trauma, so I know what it can feel like when your nervous system is already carrying a great deal and somebody gives you one more instruction to follow.
            </p>

            <p>
              When I was already overwhelmed, somebody telling me to calm down or take ten deep breaths was unlikely to be the thing that suddenly helped my body feel connected again.
            </p>

            <p>
              Music was different. I played the clarinet for years and I did not think of it as a regulation strategy at the time. I simply knew that I loved it and often felt different while I was playing.
            </p>

            <p>
              Looking back now, I can see that I was naturally taking deeper breaths, controlling my exhalation, using the muscles around my mouth and throat, concentrating on rhythm and sound and staying connected to something that mattered to me, all without somebody standing beside me repeatedly reminding me that I needed to breathe.
            </p>

            <p>
              That experience has shaped the way I introduce regulation activities to young children. I do not want a child to feel as though every time they become overwhelmed they are removed from their friends and given a special exercise because their body has become a problem.
            </p>

            <p>
              I would much rather weave these experiences through play and everyday routines so that buzzing, blowing, singing, squeezing, moving and noticing our body are things everybody gets to experience.
            </p>
          </div>
        </div>
      </article>

      {/* VIDEO */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#9A793D]">
            Free educator training
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Watch the full nervous system training for free
          </h2>

          <p className="mt-5 max-w-4xl text-lg leading-8 text-[#53645D]">
            I have made the full training available here because I would rather educators understand the thinking underneath these activities than simply collect another list of calming strategies.
          </p>

          <p className="mt-4 max-w-4xl text-lg leading-8 text-[#53645D]">
            In the recording I talk through the window of tolerance, body cues that may appear before children become overwhelmed, my own lived experience of regulation and trauma, and the playful breathing, sound, sensory and movement ideas I use with young children.
          </p>

          <div className="mt-8 overflow-hidden border border-[#D8CFC2] bg-black">
            <div className="relative aspect-video w-full">
              <iframe
                src="https://www.youtube.com/embed/ondgjOSxDx8"
                title="Parasympathetic nervous system and regulation in early childhood"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>

          <p className="mt-5 max-w-4xl text-sm leading-6 text-[#65736D]">
            You do not need to watch the whole session in one sitting. You may want to watch part of it during a team meeting, pause when something sounds familiar and talk together about where you are already noticing that pattern.
          </p>
        </div>
      </section>

      {/* VAGUS EXPLANATION */}
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="space-y-7 text-lg leading-8 text-[#46554F]">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34]">
              So where does the vagus nerve fit into this?
            </h2>

            <p>
              The vagus nerve is one part of a much bigger nervous system. It is involved in communication between the brain and many areas of the body, including systems involved in heart rate, breathing and digestion.
            </p>

            <p>
              When people talk about vagus nerve activities online, the language can sometimes become much more definite than I am comfortable with. No single activity is a magic switch that instantly regulates a child, and I would be cautious about describing one playful activity as though it directly “activates” or “stimulates” the vagus nerve in a predictable way.
            </p>

            <p>
              What I find more useful is looking at what is happening during these experiences. A child may be extending their exhalation, using their voice, feeling vibration around their mouth and throat, moving their body, receiving proprioceptive or vestibular input, paying attention to an internal sensation or sharing an enjoyable moment with another person.
            </p>

            <p>
              Those experiences can form part of a much broader approach to regulation and co-regulation. The vagus nerve gives us one piece of the physiological story, rather than the whole explanation.
            </p>

            <p>
              I also do not want educators trying twenty strategies at once. I would much rather you choose one idea, introduce it when the children are relatively settled, allow it to become familiar and then watch what happens.
            </p>

            <p>
              Some children will be drawn to an activity immediately, some will want to observe first and some will clearly show you that a particular activity does not feel good for their body. All of that information is useful.
            </p>

            <ActivitySection
              title="Buzz like a bee"
            >
              <p>
                One of the easiest examples is buzzing like a bee because you do not need special equipment and the activity already makes sense to a young child.
              </p>

              <p>
                You might use a toy bee, a picture or simply pretend together, then take a comfortable breath in and make a long buzzing sound while breathing out.
              </p>

              <p>
                From the child&apos;s point of view they are pretending to be a bee. Underneath the play they may naturally extend their exhalation and experience vibration around their lips, mouth and throat.
              </p>

              <p>
                I would introduce this during play, arrival or a transition rather than waiting until somebody is already extremely distressed and presenting it as something they now have to do because they are dysregulated.
              </p>
            </ActivitySection>

            <ActivitySection
              title="Blow something instead of repeatedly telling children to breathe"
            >
              <p>
                Bubbles, feathers and pinwheels are some of my favourite ways of bringing breathing into play because the child receives immediate feedback from what they are doing.
              </p>

              <p>
                A fast breath produces one kind of response, while a slower and more controlled exhalation changes the way a bubble, feather or pinwheel moves.
              </p>

              <p>
                The breathing now has a playful purpose, which can be much more engaging for a young child than being asked to sit still and practise breathing for no meaningful reason.
              </p>

              <p>
                We can also begin adding body-awareness language by wondering together whether the child can feel the air leaving their mouth or whether they notice anything different in their body afterwards.
              </p>
            </ActivitySection>

            <ActivitySection
              title="Use sound and vibration"
            >
              <p>
                I also use lots of sound because children can experiment with buzzing like a bee, hissing like a snake, making a gentle dinosaur roar, humming, singing and using different voices without feeling as though they are completing a formal regulation exercise.
              </p>

              <p>
                The playful sound gives us an opportunity to use breath and voice together while the child experiences different sensations around their face, throat and chest.
              </p>

              <p>
                Sometimes I will ask where they can feel the buzzing or whether they can make the sound long and smooth. I am not looking for a perfect answer. I am giving children repeated experiences of noticing their body while they are still connected, playful and interested.
              </p>
            </ActivitySection>

            <ActivitySection
              title="Regulation does not always mean getting still"
            >
              <p>
                This is an area where early childhood regulation conversations can become too narrow. Sometimes a child does not need another quiet activity at all.
              </p>

              <p>
                Their body may need movement, effort, pressure or a change in position before they are ready for anything slower.
              </p>

              <p>
                Frog jumps, animal walks, rolling, wall push-ups, ball activities, reaching the arms wide, squeezing a cushion or curling the whole body into a small shape and opening it again can provide very different movement and body-awareness experiences.
              </p>

              <p>
                Rather than deciding that movement means a child is becoming more dysregulated, I want us to stay curious about whether purposeful movement may actually be helping them organise themselves.
              </p>

              <p>
                The child who cannot sit for a breathing activity may happily jump like a frog, push against the wall and then return to the group with more capacity than they had before. That gives us far more useful information than repeatedly asking them to sit still because we have decided that calm must look quiet.
              </p>
            </ActivitySection>
          </div>
        </div>
      </article>

      {/* CARDS */}
      <section
        id="vagus-cards"
        className="bg-[#1C3B34] py-14 text-white sm:py-20"
      >
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#E4C98E]">
            Printable activity cards
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl">
            Want the ideas beside you instead of trying to remember them all?
          </h2>

          <div className="mt-6 max-w-4xl space-y-5 text-lg leading-8 text-[#D8E1DC]">
            <p>
              I have turned the activities into a 21-page Vagus Nerve Activity Card collection that you can keep on your phone or tablet or print double-sided so the visual activity prompt and practical information are easy for your team to pick up and use.
            </p>

            <p>
              The collection includes Buzz Like a Bee, Spin Breathing, Blow Bubbles, Belly Breathing, Roar Like a Dinosaur, Teddy Squeeze, Blow a Feather, Fast and Slow Wall Push Ups, Spray Mist, Frog Leaps, Dance Like a Monkey, Cross-Body Ear Tracing, Hiss Like a Snake, Trace Ball on a Line and Breathing with a Pinwheel, alongside other movement and body-awareness activities.
            </p>

            <p>
              I have kept the price at $14 AUD because I want this to remain something an individual educator, parent or child care owner can pick up without needing to turn it into a major professional learning purchase.
            </p>
          </div>

          <a
            href={VAGUS_CARDS_PAYMENT_URL}
            className="mt-8 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#E0BC68] px-7 py-4 text-base font-extrabold text-[#102E28] transition hover:bg-[#EDCD82]"
          >
            Get the Vagus Nerve Activity Cards for $14 AUD
          </a>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-[#BFD0C8]">
            Instant PDF access after purchase. Keep the cards on your device or print them for your room or team planning space.
          </p>
        </div>
      </section>

      {/* TIMING */}
      <article className="bg-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="space-y-7 text-lg leading-8 text-[#46554F]">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Try these activities before the difficult moment arrives
            </h2>

            <p>
              One of the biggest changes I encourage educators to make is to stop saving regulation activities only for the moment when a child has already reached the point of screaming, running, hitting, hiding or refusing everything being offered to them.
            </p>

            <p>
              By that stage, their capacity to process another instruction or try something unfamiliar may be very limited.
            </p>

            <p>
              I would rather introduce these activities during easier parts of the child&apos;s day, when they are still available for connection and can discover what the activity feels like without the pressure of somebody expecting it to fix their behaviour.
            </p>

            <p>
              A bee can become part of arrival, bubbles can come out after a highly active outdoor experience, animal walks can become part of a transition and humming or singing can simply be something the whole group does together.
            </p>

            <p>
              When the activity is already familiar, we are then much more likely to notice whether the child begins to seek it themselves or whether a gentle invitation from an adult feels supportive when their capacity is starting to change.
            </p>

            <h2 className="pt-5 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              The adult nervous system is part of the room as well
            </h2>

            <p>
              As much as I talk about what the child&apos;s body may be communicating, we also need to notice ourselves.
            </p>

            <p>
              An educator who has been interrupted twenty times, has three children needing support, is worried about staffing and has not had a break is also bringing a nervous system into that interaction.
            </p>

            <p>
              Sometimes the most useful regulation support is not another activity for the child at all. It may be the adult slowing their voice, reducing the amount of language they are using, giving more processing time, moving closer without immediately adding another demand, changing where the interaction is happening or noticing that the whole room has become too loud and busy.
            </p>

            <p>
              Co-regulation is relational, which means we cannot keep looking only at what is happening inside the child while ignoring the adults, routines, spaces and expectations surrounding them.
            </p>

            <h2 className="pt-5 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              I would rather you notice than rush to fix
            </h2>

            <p>
              The part of these activities that matters most to me is not whether we can confidently say that we have activated or stimulated a particular nerve.
            </p>

            <p>
              I am much more interested in what happens when we slow down enough to watch the child and become curious about whether something has changed.
            </p>

            <p>
              Did their shoulders soften after buzzing? Did they come closer to the group after moving? Did their voice change? Could they process your words more easily? Did they stay nearby instead of running away? Did a child who normally refuses a breathing activity happily blow a feather because nobody framed it as something they had to do in order to calm down?
            </p>

            <p>
              Those observations help us understand the child rather than simply collecting another twenty regulation activities and reaching for the same strategy every time behaviour becomes difficult.
            </p>

            <div className="my-10 border-l-4 border-[#C29F60] bg-[#FAF5EC] p-7 sm:p-9">
              <p className="text-xl font-extrabold leading-8 text-[#1C3B34] sm:text-2xl">
                The goal is not to create children who remain calm all day. The goal is to help children experience different states while staying connected to safe adults and gradually developing more ways of moving through those states.
              </p>
            </div>

            <p>
              What settles one child may irritate another. What helps beautifully in the morning may not be useful late in the afternoon, and what works with one group may need to be changed for the next.
            </p>

            <p>
              That is why I always want observation and relationship to sit above the strategy itself.
            </p>

            <p>
              If you take one thing away from the training and activity cards, I hope it is not simply a longer list of things to do with children. I hope it is a greater curiosity about the smaller signals their bodies are giving us and a little more confidence to respond before behaviour becomes the only thing anybody can see.
            </p>
          </div>
        </div>
      </article>

      {/* FREE LADDER BRIDGE */}
      <section className="bg-[#E8D39D] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
            <div className="max-w-4xl">
              <p className="text-sm font-extrabold text-[#6E5426]">
                Move from activities to professional judgement
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight">
                See how the same noticing-first approach works in a real regulation moment.
              </h2>

              <p className="mt-4 text-lg leading-8 text-[#374C45]">
                The Free Regulation Ladder shows how educators, managers and families can look at the same participation difficulty from different perspectives before deciding what to change or try next.
              </p>
            </div>

            <Link
              href="/playbooks"
              className="inline-flex min-h-14 shrink-0 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
            >
              Try the Free Regulation Ladder
            </Link>
          </div>
        </div>
      </section>

      {/* RC CONNECTION */}
      <section className="bg-[#FAF5EC] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#9A793D]">
                Regulator Champions
              </p>

              <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
                The strategy is useful, but learning what to notice is even more important.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-[#53645D]">
                This is the same thinking that sits underneath Regulator Champions. I do not want educators to be given another list of strategies and then left to work out which one to use when a real child is struggling in a real room.
              </p>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                I want teams to become more confident at noticing what may be happening underneath behaviour, considering what the environment and adults may be contributing, and choosing something thoughtful to try next.
              </p>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                Sometimes that may be a playful breathing or movement activity. At other times the more useful change may be making a transition more predictable, reducing language, changing the environment, giving the child more movement before group time or helping the adults around the child respond more consistently.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/playbooks"
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
                >
                  Try the Free Regulation Ladder
                </Link>

                <Link
                  href="/#full-program"
                  className="flex min-h-12 items-center justify-center rounded-2xl border border-[#C29F60] bg-white px-6 py-3.5 text-sm font-bold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
                >
                  Explore Regulator Champions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="border-t border-[#E6E2DC] bg-white py-9">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="text-xs leading-5 text-[#75827D]">
            This article and video are provided for general education and professional learning. Activities involving breathing, sound, movement and sensory input affect children differently and should not be presented as a treatment, a guaranteed way to reduce distress or a predictable method of activating the vagus nerve. They do not replace individual medical or allied health advice when this is required. Consider each child&apos;s developmental, sensory, communication, health and safety needs when choosing activities.
          </p>
        </div>
      </section>
    </main>
  );
}

function ActivitySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="pt-5">
      <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34]">
        {title}
      </h2>

      <div className="mt-6 space-y-7">
        {children}
      </div>
    </section>
  );
}