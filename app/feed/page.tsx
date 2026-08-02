'use client';

import React from 'react';
import Link from 'next/link';

// 100% Exact match to your public/images/feed/ folder
const FEED_POSTS = [
  {
    id: 1,
    title: 'Babies Room (0–18 Months)',
    image: '/images/feed/01_babies_room.png',
    tag: 'Nursery Context',
    caption: 'When volume rises in the nursery, lower your physical height before speaking. Pacing your vocal tone regulates infant stress faster than rushing between cots.',
    actionStep: 'Anchor your lower body to the floor before comforting multiple infants.',
  },
  {
    id: 2,
    title: 'Toddler Room (18 Months–3 Years)',
    image: '/images/feed/02_toddler_room.png',
    tag: 'Toddler Impulse',
    caption: 'Biting and toy snatching spike when room transitions lack physical boundaries. Use flat hand spatial cues rather than shouting across the room.',
    actionStep: 'Introduce heavy carrying jobs before room transitions.',
  },
  {
    id: 3,
    title: '3-Year-Old Room',
    image: '/images/feed/03_3yo_room.png',
    tag: 'Turn-Taking Hotspot',
    caption: 'Frustration over toy sharing signals motor overload. Give active 3-year-olds proprioceptive joint resistance prior to structured group activities.',
    actionStep: 'Pacing joint resistance reduces door bottlenecks.',
  },
  {
    id: 4,
    title: '4-Year-Old / Kinder Room',
    image: '/images/feed/04_4yo_room.png',
    tag: '11:45 AM Pre-Lunch',
    caption: 'Cumulative morning cognitive load peaks before lunch. Dim lighting and shift from open-ended play to structured table tasks before meltdowns start.',
    actionStep: 'Lower room acoustics 15 minutes before lunch setup.',
  },
  {
    id: 5,
    title: 'Prep & School Transitions',
    image: '/images/feed/05_prep_transition.png',
    tag: 'Transition Anxiety',
    caption: 'Single-file line-ups trigger personal space anxiety. Replace rigid doorway lines with staggered, low-arousal arrival rituals.',
    actionStep: 'Use proximity anchors at the cloakroom entryway.',
  },
  {
    id: 6,
    title: 'Early Primary (Grades 1–2)',
    image: '/images/feed/06_early_primary.png',
    tag: 'Postural Fatigue',
    caption: 'Fidgeting during table work is often postural fatigue. Provide vertical writing surfaces or floor work options to sustain focus.',
    actionStep: 'Allow alternative sitting postures during fine motor tasks.',
  },
  {
    id: 7,
    title: 'Upper Primary (Grades 3–4)',
    image: '/images/feed/07_upper_primary.png',
    tag: 'Shame Protection',
    caption: 'Head-on-desk refusal stems from peer shame during dysregulation. Use discreet nonverbal role cards rather than public warnings.',
    actionStep: 'Protect child dignity with nonverbal reset options.',
  },
  {
    id: 8,
    title: 'Transition Hotspots',
    image: '/images/feed/08_transitions.png',
    tag: 'Doorway Bottlenecks',
    caption: 'Moving from outdoor play to washrooms causes crowded crowding. Use visual floor markers and rhythmic hand pacing to stagger entry.',
    actionStep: 'Stagger group entry by 90-second intervals.',
  },
  {
    id: 9,
    title: 'Outdoor & Unstructured Play',
    image: '/images/feed/09_outdoor_play.png',
    tag: 'Rough Play Boundaries',
    caption: 'Channel crashing and boundary running into structured heavy-work zones like pushing, climbing, and lifting heavy tires safely.',
    actionStep: 'Set clear physical zones for high-energy play.',
  },
  {
    id: 10,
    title: 'Group & Mat Time',
    image: '/images/feed/10_mat_time.png',
    tag: 'Somatic Sitting',
    caption: 'Participation does not require total body stillness. Integrate fidget props and active somatic movement directly into story time.',
    actionStep: 'Recognise active listening body language.',
  },
];

export default function FeedPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-24">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 py-4">
        <div className="mx-auto flex max-w-xl items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
              Play Move Improve
            </span>
            <h1 className="text-base font-extrabold text-slate-900">
              CALM Visual Scenario Feed
            </h1>
          </div>
          <Link
            href="/proposal"
            className="rounded-xl bg-amber-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-amber-300 transition"
          >
            Proposal &amp; Quote ($4,790)
          </Link>
        </div>
      </header>

      {/* FEED DECK */}
      <main className="mx-auto max-w-md px-4 pt-6 space-y-8">

        {FEED_POSTS.map((post) => (
          <article
            key={post.id}
            className="rounded-3xl border border-slate-200 bg-white shadow-xs overflow-hidden"
          >
            {/* POST HEADER */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-800 text-[10px] font-bold text-white">
                  {post.id}
                </div>
                <div>
                  <strong className="block text-xs font-bold text-slate-900 leading-tight">
                    {post.title}
                  </strong>
                  <span className="text-[10px] text-slate-500">{post.tag}</span>
                </div>
              </div>
            </div>

            {/* FULL WATERCOLOUR IMAGE */}
            <div className="relative w-full bg-slate-100 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* POST CAPTION */}
            <div className="p-5 space-y-3">
              <p className="text-xs leading-relaxed text-slate-700 font-medium">
                {post.caption}
              </p>

              <div className="rounded-2xl bg-teal-50 border border-teal-200 p-3 text-[11px] font-bold text-teal-950">
                Action Step: {post.actionStep}
              </div>
            </div>
          </article>
        ))}

        {/* BOTTOM CALL TO ACTION */}
        <div className="rounded-3xl bg-teal-900 p-6 text-center text-white space-y-3">
          <h3 className="text-base font-bold">Want All 8 Printable Routine Ladders?</h3>
          <p className="text-xs text-teal-100 max-w-xs mx-auto leading-relaxed">
            Get physical A3 room posters, video demonstrations, and site-wide access for your service.
          </p>
          <Link
            href="/proposal"
            className="inline-block rounded-xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 hover:bg-amber-300 transition shadow-xs"
          >
            Get $4,790 Centre Quote &amp; Proposal &rarr;
          </Link>
        </div>

      </main>
    </div>
  );
}