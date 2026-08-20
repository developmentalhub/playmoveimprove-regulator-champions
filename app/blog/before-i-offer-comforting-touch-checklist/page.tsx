'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ComfortingTouchChecklistPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const checklistQuestions = [
    {
      step: '1. Child State',
      question: 'What is happening for this child right now?',
      detail: 'Are they distressed, hurt, overwhelmed, seeking reassurance, needing help to move safely, or simply wanting closeness?'
    },
    {
      step: '2. Connection Signal',
      question: 'Is the child moving towards connection?',
      detail: 'Are they reaching for me, leaning in, holding out their hand, asking to be picked up, or showing another clear sign that closeness is welcome?'
    },
    {
      step: '3. Somatic Response',
      question: 'What is their body telling me once contact begins?',
      detail: 'Are they softening and settling, or are they stiffening, pulling away, turning their face, or trying to move out of the interaction?'
    },
    {
      step: '4. Purpose of Touch',
      question: 'What is the purpose of the touch?',
      detail: 'Is it helping with comfort, safety, care, or wellbeing, or am I doing it from habit because this is how I usually respond?'
    },
    {
      step: '5. Context & Developmental Stage',
      question: 'Does the contact make sense for this child and this situation?',
      detail: 'Consider their age, developmental stage, communication style, individual needs, and what is happening around them.'
    },
    {
      step: '6. Alternative Options',
      question: 'Is there a less intrusive response that may work just as well?',
      detail: 'Sometimes sitting nearby, offering a hand, reducing language, changing the environment, or giving more space may be enough.'
    },
    {
      step: '7. Safety Assessment',
      question: 'Is there an immediate safety risk?',
      detail: 'If the child or someone else may be hurt, safety becomes the priority and physical intervention may be necessary, using only the support needed to interrupt the danger.'
    },
    {
      step: '8. Professional Boundaries',
      question: 'Would this interaction make sense to another educator or family member observing it?',
      detail: 'Could I clearly explain why I responded in this way to support the child’s wellbeing?'
    },
    {
      step: '9. Real-Time Adjustment',
      question: 'Do I need to adjust or stop?',
      detail: 'Keep noticing the child throughout the interaction, because what they need can change quickly.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Reflection Checklist
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <article className="space-y-8">
          
          {/* Header */}
          <header className="space-y-4 border-b-2 border-[#E6E2DC] pb-8">
            <div className="flex items-center gap-2">
              <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Staffroom Reflection Tool
              </span>
              <span className="text-xs text-[#657B6C] font-bold">
                By Robyn Papworth
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-[#1C3B34] leading-tight">
              Before I Offer Comforting Touch: A Quick Reflection Checklist for ECEC Educators
            </h1>

            <p className="text-base md:text-lg text-[#2B3833] font-medium leading-relaxed">
              Safe practice is not about avoiding connection[cite: 2]. It is about making thoughtful, child-centred decisions in the moment[cite: 2]. Use this 9-step reflection framework to guide room interactions[cite: 2].
            </p>

            {/* Featured Image */}
            <div className="pt-4">
              <img
                src="/images/feed/comforting-touch-checklist.png"
                alt="Before I offer comforting touch reflection checklist for early childhood educators"
                className="w-full h-auto rounded-3xl border-2 border-[#E6E2DC] shadow-sm object-cover max-h-120"
              />
            </div>
          </header>

          {/* Article Introduction */}
          <section className="space-y-4 text-sm md:text-base text-[#2B3833] leading-relaxed">
            <p>
              When a child is distressed or seeking connection, educators must move quickly while remaining mindful of professional boundaries and regulatory expectations[cite: 1, 2]. There is no single right answer for every situation, but taking a moment to notice can help you make thoughtful, child-centred decisions[cite: 2].
            </p>

            <div className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 rounded-3xl space-y-2 text-center">
              <span className="text-xs font-black uppercase text-[#C29F60] tracking-wider block">
                Core Practice Anchor
              </span>
              <p className="text-lg md:text-xl font-serif font-bold text-[#1C3B34]">
                Pause. Notice. Then Respond[cite: 2].
              </p>
            </div>
          </section>

          {/* Checklist Questions Grid */}
          <section className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#1C3B34]">
              The 9 Reflection Questions
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {checklistQuestions.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-2 hover:border-[#657B6C] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]">
                      {item.step}
                    </span>
                    <h3 className="text-base font-bold text-[#1C3B34]">
                      {item.question}[cite: 2]
                    </h3>
                    <p className="text-xs font-medium text-[#2B3833] leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E6E2DC]">
                      {item.detail}[cite: 2]
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Lead Capture Box */}
          <aside className="mt-12 bg-[#1C3B34] text-white p-6 md:p-10 rounded-3xl border-2 border-[#1C3B34] shadow-md space-y-6">
            <div className="space-y-2 text-center max-w-2xl mx-auto">
              <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
                Printable Staffroom Resource
              </span>
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-white">
                Download the 1-Page Printable Checklist PDF
              </h3>
              <p className="text-xs md:text-sm text-white/90 font-light leading-relaxed">
                Print this high-contrast reflection poster for your staffroom wall, room lanyards, or team meeting agendas[cite: 2].
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl max-w-xl mx-auto space-y-2 text-xs text-white/80">
              <div className="flex items-center gap-2">
                <span className="text-[#C29F60] font-black">Active</span>
                <span>Pause, Notice, Respond decision framework[cite: 2]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C29F60] font-black">Active</span>
                <span>ACECQA-aligned reflection prompts for room teams[cite: 2]</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#C29F60] font-black">Active</span>
                <span>Print-ready 1-page A4 format[cite: 2]</span>
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
                  Download Free Checklist PDF
                </button>
              </form>
            ) : (
              <div className="max-w-md mx-auto p-6 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-2xl text-center space-y-4 text-[#1C3B34]">
                <div className="border-b border-[#C29F60]/30 pb-2">
                  <span className="text-xs font-black uppercase text-[#C29F60] block">
                    Checklist Unlocked
                  </span>
                  <h4 className="text-base font-bold">Your PDF Download is Ready</h4>
                </div>

                <a
                  href="/pdf/Before-I-Offer-Comforting-Touch-Checklist.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex py-3.5 px-6 bg-[#657B6C] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 items-center justify-center shadow-sm w-full"
                >
                  Open Printable Checklist PDF
                </a>

                <div className="pt-2 border-t border-[#C29F60]/30 space-y-2">
                  <span className="text-xs font-bold block text-[#1C3B34]">
                    Need Full Program Licensing for Your Centre?
                  </span>
                  <Link
                    href="/proposal"
                    className="inline-flex py-3.5 px-6 bg-[#1C3B34] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 items-center justify-center shadow-sm w-full"
                  >
                    Request Official Funding Quote
                  </Link>
                </div>
              </div>
            )}

            <p className="text-[11px] text-center text-white/60 font-medium">
              Checked for ECEC compliance accuracy as of August 2026[cite: 2]. Zero spam. Unsubscribe anytime.
            </p>
          </aside>

        </article>
      </main>
    </div>
  );
}