'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SafeTouchBlogPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Practice Leadership
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-8">
          
          {/* Article Header */}
          <header className="space-y-4 border-b-2 border-[#E6E2DC] pb-8">
            <div className="flex items-center gap-2">
              <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Trauma-Informed ECEC Practice
              </span>
              <span className="text-xs text-[#657B6C] font-bold">
                By Robyn Papworth
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1C3B34] leading-tight">
              The Heartbreak of Second-Guessing a Hug: Why Safe Touch Needs Humanity, Not Just Legislation
            </h1>

            <p className="text-base md:text-lg text-[#2B3833] font-medium leading-relaxed">
              How child safety reforms have left compassionate early childhood educators hesitating in moments of acute child distress, and how we move from fear to thoughtful, intentional practice[cite: 1].
            </p>

            {/* Featured Article Image */}
            <div className="pt-4">
              <img
                src="/images/feed/safe-touch-early-childhood.png"
                alt="Safe touch and appropriate comfort in early childhood education"
                className="w-full h-auto rounded-3xl border-2 border-[#E6E2DC] shadow-sm object-cover max-h-120"
              />
            </div>
          </header>

          {/* Article Body Content */}
          <section className="space-y-6 text-sm md:text-base text-[#2B3833] leading-relaxed">
            <p>
              Over the past year, a quiet anxiety has settled into early childhood rooms across Australia[cite: 1]. Experienced, dedicated educators—the professionals who have spent years learning, teaching, and applying trauma-informed care—have started second-guessing moments that once felt natural, responsive, and deeply connected[cite: 1].
            </p>

            <p>
              When a distressed three-year-old reaches both arms toward a familiar adult at morning drop-off, the educator’s first instinct is no longer automatically to offer comfort[cite: 1]. Instead, a wave of internal hesitation hits: <em>Am I still allowed to pick them up? What if another adult misinterprets this? Could I be doing the wrong thing?</em>[cite: 1]
            </p>

            <div className="bg-[#FAF5EC] border-l-4 border-[#C29F60] p-6 rounded-r-2xl my-6 space-y-2">
              <p className="font-serif text-base md:text-lg font-bold text-[#1C3B34]">
                "These questions are not being asked by educators who do not care about child safety. In most cases, it is the complete opposite. They are being asked by educators who care so deeply about doing the right thing that they have started second-guessing interactions that once felt natural, responsive, and connected."[cite: 1]
              </p>
              <span className="text-xs font-bold text-[#657B6C] block uppercase tracking-wider">
                — Robyn Papworth, Developmental Educator & Accredited Exercise Physiologist[cite: 1]
              </span>
            </div>

            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34] pt-4">
              What Has Actually Changed in ECEC Regulation?
            </h2>

            <p>
              It is easy for multiple regulatory updates to blend into a heavy, overarching feeling of fear[cite: 1]. Separating the exact policy shifts helps bring clarity back to everyday floor decisions[cite: 1]:
            </p>

            <ul className="list-disc pl-6 space-y-2 font-medium">
              <li>
                <strong>1 September 2025:</strong> Approved providers were required to notify their regulatory authority within 24 hours of incidents or allegations of physical or sexual abuse involving a child, shortened from the previous seven-day timeframe[cite: 1].
              </li>
              <li>
                <strong>1 January 2026:</strong> The National Quality Standard strengthened its explicit focus on child safety in Quality Areas 2 and 7[cite: 1]. Element 2.2.3 became <em>Child Safety and Protection</em>, emphasizing explicit responsibilities in identifying and responding to risk[cite: 1]. Quality Area 7 was updated to ensure governance and systems actively maintain a child-safe culture[cite: 1].
              </li>
              <li>
                <strong>February 2026:</strong> National Law amendments reinforced that the safety, rights, and best interests of children must be the paramount consideration in all ECEC decisions[cite: 1].
              </li>
            </ul>

            <p>
              Strengthened safeguarding is designed to make adults more intentional in their relationships with children, not to replace warm co-regulation with cold, clinical distance[cite: 1]. Young children do not understand legislative updates[cite: 1]. They communicate through body posture, facial expressions, and physical proximity[cite: 1]. Decades of developmental science prove that developing brains rely on responsive back-and-forth connection to learn trust and safety[cite: 1].
            </p>

            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34] pt-4">
              Appropriate Touch Has Not Disappeared
            </h2>

            <p>
              Current regulatory guidelines state that physical contact forms an essential part of professional care when it is child-led, purposeful, connected to health and wellbeing, and visible within the normal room environment[cite: 1].
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="bg-[#FAF8F5] border-2 border-[#E6E2DC] p-5 rounded-2xl space-y-2">
                <span className="text-xs font-black text-[#657B6C] uppercase tracking-wider block">
                  Purposeful & Appropriate Touch[cite: 1]
                </span>
                <p className="text-xs leading-relaxed font-medium">
                  A child falls outside, becomes upset, and runs toward an educator with arms raised[cite: 1]. The educator crouches down, offers a brief cuddle, checks for injury, and stays nearby while the child settles[cite: 1]. Contact is child-initiated, purposeful, and directly addresses a clear need[cite: 1].
                </p>
              </div>

              <div className="bg-[#FAF8F5] border-2 border-[#E6E2DC] p-5 rounded-2xl space-y-2">
                <span className="text-xs font-black text-rose-800 uppercase tracking-wider block">
                  Inappropriate Touch[cite: 1]
                </span>
                <p className="text-xs leading-relaxed font-medium">
                  Repeatedly encouraging lap sitting when a child has not sought physical closeness, using physical touch primarily to force compliance, or continuing physical contact after a child stiffens, turns away, or tries to pull back[cite: 1].
                </p>
              </div>
            </div>

            <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34] pt-4">
              The Practical Framework: Pause, Notice, Respond
            </h2>

            <p>
              In fast-moving room environments, educators cannot mental-check a lengthy policy document during acute distress[cite: 1]. Instead, teams can rely on a simple 3-step cognitive anchor[cite: 1]:
            </p>

            <ol className="list-decimal pl-6 space-y-3 font-medium">
              <li>
                <strong>Pause:</strong> Take one breath, soften your shoulders, and lower your voice[cite: 1]. Become aware of your own nervous system reaction before moving in, ensuring you respond to the child rather than out of fear or haste[cite: 1].
              </li>
              <li>
                <strong>Notice:</strong> Observe what the child is communicating through body, movement, and posture[cite: 1]. Are they seeking closeness, reaching out, pulling away, or requiring immediate physical support to manage safety?[cite: 1]
              </li>
              <li>
                <strong>Respond:</strong> Choose the least intrusive response that meets the child's needs and maintains room safety[cite: 1]. Adjust instantly if the child's body language signals that they need space[cite: 1].
              </li>
            </ol>
          </section>

          {/* Lead Capture Box */}
          <aside className="mt-12 bg-[#1C3B34] text-white p-6 md:p-10 rounded-3xl border-2 border-[#1C3B34] shadow-md space-y-6">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
                Free Downloadable Guide & Staffroom Resource[cite: 1]
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                Can I Still Comfort a Distressed Child?
              </h3>
              <p className="text-xs md:text-sm text-white/90 font-light leading-relaxed">
                Download the complete 19-page practical guide by Robyn Papworth[cite: 1]. Designed to help early childhood teams navigate child safety regulations without losing warm, trauma-informed connection[cite: 1].
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl max-w-xl mx-auto space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-[#C29F60] font-black">Active</span>
                <span>ACECQA reporting and National Quality Standard (QA 2 & QA 7) breakdowns[cite: 1]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C29F60] font-black">Active</span>
                <span>Practical decision steps for drop-off stress, safety risks, and physical intervention[cite: 1]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C29F60] font-black">Active</span>
                <span>Team discussion prompts to eliminate educator fear and build shared room standards[cite: 1]</span>
              </div>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email address"
                  className="w-full p-4 rounded-2xl border-2 border-[#E6E2DC] text-sm text-[#1C3B34] font-medium outline-none focus:border-[#C29F60] bg-[#FAF8F5]"
                />
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm min-h-12 flex items-center justify-center"
                >
                  Download Free 19-Page Guide (PDF)
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto p-4 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-2xl text-center space-y-3 text-[#1C3B34]">
                <span className="text-xs font-black uppercase text-[#C29F60] block">
                  Guide Ready
                </span>
                <p className="text-sm font-bold">
                  Thank you! Your copy is ready for download.
                </p>
                <a
                  href="/pdf/Safe-Touch-Early-Childhood-Guide.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex py-3 px-6 bg-[#1C3B34] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 items-center justify-center shadow-sm w-full"
                >
                  Open PDF Guide Directly
                </a>
              </div>
            )}

            <p className="text-[11px] text-center text-white/60 font-medium">
              Checked for ECEC compliance accuracy as of August 2026[cite: 1]. Zero spam. Unsubscribe anytime.
            </p>
          </aside>

        </article>
      </main>
    </div>
  );
}