'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function FreeGuidePage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  const extraResources = [
    {
      title: 'Educator Morning Routine Strategy Cards',
      description: 'Printable pocket cards for room entry thresholds, arrival handovers, and transition resets.',
      link: '/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf',
      tag: 'Printable Cards'
    },
    {
      title: 'Manager Leadership Coaching Cards',
      description: '15-word team discussion triggers and QIP self-assessment reflection prompts for directors.',
      link: '/pdf/Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
      tag: 'Leadership Resource'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>
          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Free ECEC Resources
          </span>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-8">
        
        {/* Featured Lead Magnet Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-10 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
              Featured 19-Page ECEC Lead Resource
            </span>
            <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
              Can I Still Comfort a Distressed Child? Safe, Appropriate Touch in Early Childhood
            </h1>
            <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
              A practical guide by Robyn Papworth to help educators navigate child safety regulations, eliminate fear around physical comfort, and maintain warm co-regulation on the floor.
            </p>
          </div>

          <div className="bg-white/10 p-5 rounded-2xl max-w-2xl space-y-2 text-xs text-white/90">
            <div className="flex items-center gap-2">
              <span className="text-[#C29F60] font-black">Active</span>
              <span>ACECQA reporting standards and National Quality Standard (QA 2 & QA 7) breakdowns</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C29F60] font-black">Active</span>
              <span>3-step Pause, Notice, Respond floor framework for drop-offs and distress</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#C29F60] font-black">Active</span>
              <span>Staffroom team discussion prompts to align room practices across your service</span>
            </div>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="max-w-md space-y-3">
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
                Download Free 19-Page PDF Guide
              </button>
            </form>
          ) : (
            <div className="max-w-md p-5 bg-[#FAF5EC] border-2 border-[#C29F60] rounded-2xl text-center space-y-3 text-[#1C3B34]">
              <span className="text-xs font-black uppercase text-[#C29F60] block">
                Guide Unlocked
              </span>
              <p className="text-sm font-bold">
                Thank you. Your copy is ready for download.
              </p>
              <a
                href="/pdf/Safe-Touch-Early-Childhood-Guide.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex py-3.5 px-6 bg-[#1C3B34] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 items-center justify-center shadow-sm w-full"
              >
                Open PDF Guide Directly
              </a>
            </div>
          )}

          <p className="text-[11px] text-white/60 font-medium">
            Checked for regulatory accuracy as of August 2026. Zero spam.
          </p>
        </section>

        {/* Read Related Blog Article Callout */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 md:p-8 rounded-3xl space-y-4">
          <div className="flex justify-between items-center border-b border-[#C29F60]/30 pb-3">
            <span className="text-xs font-black uppercase text-[#C29F60]">
              Practice Leadership Blog
            </span>
            <span className="text-xs font-bold text-[#1C3B34] bg-white px-3 py-1 rounded-full border border-[#E6E2DC]">
              Article Included
            </span>
          </div>

          <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34]">
            The Heartbreak of Second-Guessing a Hug
          </h2>

          <p className="text-sm font-medium leading-relaxed text-[#2B3833]">
            Read the article exploring how child safety reforms have left compassionate early childhood educators hesitating during acute child distress, and how we move from fear back to intentional practice.
          </p>

          <Link
            href="/blog/safe-touch-early-childhood"
            className="inline-flex py-3.5 px-6 bg-[#1C3B34] text-white font-bold rounded-2xl text-sm hover:bg-opacity-90 transition-all min-h-12 items-center justify-center shadow-sm"
          >
            Read Full Article
          </Link>
        </section>

        {/* Additional Free Resource Downloads */}
        <section className="space-y-4">
          <h2 className="text-lg font-serif font-bold text-[#1C3B34]">
            Additional Free Floor Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {extraResources.map((res, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]">
                      {res.tag}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#1C3B34]">
                    {res.title}
                  </h3>
                  <p className="text-xs font-medium text-[#6A7873] leading-relaxed">
                    {res.description}
                  </p>
                </div>

                <a
                  href={res.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#657B6C] text-white font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm"
                >
                  Download PDF Cards
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}