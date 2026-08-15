import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Early Childhood Regulation Scenarios | Educator Examples',
  description:
    'Practical early childhood regulation and co-regulation scenarios for babies, toddlers, kindergarten and primary settings. Explore educator responses, transitions, sensory load and participation.',
  alternates: {
    canonical: '/feed',
  },
  openGraph: {
    title: 'Early Childhood Regulation Scenarios | Educator Examples',
    description:
      'Explore practical regulation and co-regulation examples across nursery, toddler, kindergarten and primary learning environments.',
    url: '/feed',
    type: 'website',
    images: [
      {
        url: '/images/feed/01_babies_room.png',
        alt: 'Early childhood regulation scenario for educators',
      },
    ],
  },
};

const FEED_POSTS = [
  {
    id: 1,
    title: 'Babies Room (0–18 Months)',
    image: '/images/feed/01_babies_room.png',
    tag: 'Nursery Context',
    caption:
      'When the nursery becomes busy or noisy, try slowing your own movement and lowering your physical height before speaking. A quieter, more predictable adult response can make the interaction feel less rushed.',
    actionStep:
      'Pause, lower your body position and use a steady voice before moving between several children.',
  },
  {
    id: 2,
    title: 'Toddler Room (18 Months–3 Years)',
    image: '/images/feed/02_toddler_room.png',
    tag: 'Toddler Transitions',
    caption:
      'Toy grabbing, biting or pushing can become more common when toddlers are tired, crowded, frustrated or moving through a difficult transition. Look at the environment and the demand before adding more verbal correction.',
    actionStep:
      'Create clearer space around the transition and give one simple next step at a time.',
  },
  {
    id: 3,
    title: '3-Year-Old Room',
    image: '/images/feed/03_3yo_room.png',
    tag: 'Turn-Taking Pressure',
    caption:
      'Sharing and waiting can place a lot of demand on a three-year-old who is already excited, tired or frustrated. Movement before a more structured activity may be useful for some children, but it should be offered as support rather than used as a required calming technique.',
    actionStep:
      'Try a short purposeful movement job before a routine that usually involves a lot of waiting.',
  },
  {
    id: 4,
    title: '4-Year-Old / Kinder Room',
    image: '/images/feed/04_4yo_room.png',
    tag: 'Pre-Lunch Load',
    caption:
      'By late morning, some children may be carrying the combined load of noise, social interaction, movement, waiting and repeated instructions. Before assuming a child needs firmer limits, consider whether the room itself can become a little easier to manage.',
    actionStep:
      'Reduce unnecessary noise, visual clutter or instructions before the lunch transition.',
  },
  {
    id: 5,
    title: 'Prep & School Transitions',
    image: '/images/feed/05_prep_transition.png',
    tag: 'Transition Support',
    caption:
      'Line-ups and busy doorway transitions can be difficult for children who find waiting, close proximity or sudden changes challenging. A staggered transition or clear visual place to wait may reduce unnecessary pressure.',
    actionStep:
      'Trial smaller groups or staggered entry rather than moving the whole group through one doorway at once.',
  },
  {
    id: 6,
    title: 'Early Primary (Grades 1–2)',
    image: '/images/feed/06_early_primary.png',
    tag: 'Movement & Posture',
    caption:
      'Fidgeting during table work does not automatically mean a child is not listening. Some children may benefit from a different working position, a short movement break or an alternative writing surface.',
    actionStep:
      'Offer an appropriate standing, floor or vertical-work option and notice whether participation changes.',
  },
  {
    id: 7,
    title: 'Upper Primary (Grades 3–4)',
    image: '/images/feed/07_upper_primary.png',
    tag: 'Protecting Dignity',
    caption:
      'When a child withdraws, puts their head down or refuses publicly, avoid assuming you know the reason. A discreet check-in or nonverbal option can protect dignity while giving the child space to communicate what they need.',
    actionStep:
      'Use a private cue or quiet check-in before giving a public correction.',
  },
  {
    id: 8,
    title: 'Transition Hotspots',
    image: '/images/feed/08_transitions.png',
    tag: 'Doorway Bottlenecks',
    caption:
      'Doorways, bathrooms and handwashing areas can quickly become crowded during group transitions. The environment may be creating more demand than the children can comfortably manage at once.',
    actionStep:
      'Reduce the number of children moving through the transition at the same time.',
  },
  {
    id: 9,
    title: 'Outdoor & Unstructured Play',
    image: '/images/feed/09_outdoor_play.png',
    tag: 'High-Energy Play',
    caption:
      'Running, crashing, climbing and rough-and-tumble play can serve many different purposes for children. Rather than treating all high-energy movement as a problem, create clear boundaries for where and how active play can happen safely.',
    actionStep:
      'Define a safe high-energy play zone with clear limits that educators can use consistently.',
  },
  {
    id: 10,
    title: 'Group & Mat Time',
    image: '/images/feed/10_mat_time.png',
    tag: 'Participation',
    caption:
      'Participation does not always look like a perfectly still body. Some children listen more successfully when they can change position, hold an appropriate fidget or sit slightly apart from the main group.',
    actionStep:
      'Notice whether a child is engaged before correcting their body position.',
  },
];

const pageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Early Childhood Regulation Scenarios',
  description:
    'A collection of practical regulation and co-regulation scenarios for educators across early childhood and primary learning settings.',
  url: 'https://playmoveimprove-regulator-champions.vercel.app/feed',
  author: {
    '@type': 'Person',
    name: 'Robyn Papworth',
    jobTitle: 'Accredited Exercise Physiologist and Developmental Educator',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Play Move Improve',
  },
  inLanguage: 'en-AU',
};

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 font-sans text-slate-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pageSchema),
        }}
      />

      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
              Play Move Improve
            </span>

            <span className="text-base font-extrabold text-slate-900">
              Regulation Scenario Library
            </span>
          </div>

          <Link
            href="/proposal?plan=preview"
            className="rounded-xl bg-amber-400 px-3.5 py-2 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
          >
            View Program Options
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-10 px-4 pt-8 sm:px-6">
        <section className="mx-auto max-w-2xl space-y-4 text-center">
          <span className="inline-block rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800">
            Free Educator Examples
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-slate-950 md:text-4xl">
            Early Childhood Regulation and Co-Regulation Scenarios
          </h1>

          <p className="text-sm leading-relaxed text-slate-600">
            Ten practical examples for thinking about what may be happening
            around a child before immediately asking them to behave differently.
            Use these scenarios to reflect on adult responses, environmental
            demand, movement, transitions and participation.
          </p>

          <p className="text-sm leading-relaxed text-slate-600">
            These examples are prompts for educator reflection rather than
            explanations of why an individual child behaves in a particular
            way. Children can respond very differently to the same environment,
            routine or sensory experience.
          </p>
        </section>

        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Before You Begin
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-teal-950">
            Look for patterns without assuming a cause
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-teal-900">
            A child who runs, withdraws, bites, fidgets or refuses may be
            communicating many different things. Instead of deciding what the
            behaviour means from one observation, notice the routine, timing,
            environment, adult response and what happened before and after.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/co-regulation-early-childhood"
              className="rounded-xl bg-teal-800 px-4 py-3 text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Read the Co-Regulation Guide →
            </Link>

            <Link
              href="/emotional-regulation-early-childhood"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Emotional Regulation Guide →
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-md space-y-8">
          {FEED_POSTS.map((post) => (
            <article
              key={post.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-800 text-[10px] font-bold text-white">
                    {post.id}
                  </div>

                  <div>
                    <h2 className="block text-xs font-bold leading-tight text-slate-900">
                      {post.title}
                    </h2>

                    <span className="text-[10px] text-slate-500">
                      {post.tag}
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative w-full overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={`${post.title} regulation scenario for educators`}
                  loading="lazy"
                  className="h-auto w-full object-cover"
                />
              </div>

              <div className="space-y-3 p-5">
                <p className="text-xs font-medium leading-relaxed text-slate-700">
                  {post.caption}
                </p>

                <div className="rounded-2xl border border-teal-200 bg-teal-50 p-3 text-[11px] font-bold leading-relaxed text-teal-950">
                  Try this: {post.actionStep}
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Continue Learning
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-slate-950">
            Free regulation tools for educators
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            These scenario cards are only one way to explore regulation
            practice. You can also work through the free Ladder 1 guide or use
            the Somatic Check-In before returning to a demanding room.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/free-guide"
              className="rounded-xl bg-teal-800 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Free Regulation Guide →
            </Link>

            <Link
              href="/somatic-checkin"
              className="rounded-xl border border-teal-300 bg-teal-50 px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Somatic Check-In →
            </Link>

            <Link
              href="/educator-capacity-building"
              className="rounded-xl border border-slate-200 bg-[#FDFBF7] px-4 py-3 text-center text-xs font-bold text-slate-800 transition hover:bg-slate-100"
            >
              Educator Capacity Building →
            </Link>

            <Link
              href="/early-childhood-professional-development"
              className="rounded-xl border border-slate-200 bg-[#FDFBF7] px-4 py-3 text-center text-xs font-bold text-slate-800 transition hover:bg-slate-100"
            >
              Early Childhood PD →
            </Link>
          </div>
        </section>

        <section className="rounded-3xl bg-teal-950 p-7 text-center text-white md:p-9">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Regulator Champions
          </span>

          <h2 className="mt-2 text-2xl font-extrabold">
            Want to build this thinking across your whole team?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-teal-100">
            Start with the 3-Ladder Preview for $1,790 including GST and six
            months of access, or choose the full 8-Ladder pathway for $4,790
            including GST and 12 months of access.
          </p>

          <p className="mx-auto mt-3 max-w-lg text-xs leading-relaxed text-teal-200">
            The ladders are introduced progressively so educators have time to
            practise, discuss and apply each stage rather than receiving
            everything at once.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="rounded-xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
            >
              3-Ladder Preview — $1,790 →
            </Link>

            <Link
              href="/proposal?plan=full"
              className="rounded-xl border border-teal-700 bg-teal-900 px-5 py-3 text-xs font-bold text-white transition hover:bg-teal-800"
            >
              Full 8-Ladder Pathway — $4,790 →
            </Link>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-[#F7F3EC] p-6">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            About the Author
          </span>

          <h2 className="mt-1 text-xl font-extrabold text-slate-900">
            Robyn Papworth
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            Robyn is an Accredited Exercise Physiologist and Developmental
            Educator and the founder of Play Move Improve. Her work with
            educators focuses on movement, sensory processing, emotional
            regulation, executive function and practical co-regulation in
            everyday learning environments.
          </p>
        </section>
      </main>
    </div>
  );
}