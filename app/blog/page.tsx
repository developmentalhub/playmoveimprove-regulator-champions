'use client';

import React from 'react';
import Link from 'next/link';

export default function BlogIndexPage() {
  const articles = [
    {
      slug: '/blog/safe-touch-early-childhood',
      title: 'The Heartbreak of Second-Guessing a Hug: Why Safe Touch Needs Humanity, Not Just Legislation',
      category: 'Trauma-Informed ECEC Practice',
      author: 'Robyn Papworth',
      description: 'How child safety reforms have left compassionate early childhood educators hesitating in moments of acute child distress, and how we move from fear to thoughtful, intentional practice.',
      image: '/images/feed/safe-touch-early-childhood.png',
      pdfLink: '/pdf/Safe-Touch-Early-Childhood-Guide.pdf',
      pdfTag: '19-Page ECEC Guide'
    },
    {
      slug: '/blog/before-i-offer-comforting-touch-checklist',
      title: 'Before I Offer Comforting Touch: A Quick Reflection Checklist for ECEC Educators',
      category: 'Staffroom Reflection Tool',
      author: 'Robyn Papworth',
      description: 'A 9-step reflection framework to help room teams pause, notice, and respond thoughtfully before offering physical comfort or stepping in during distress.',
      image: '/images/feed/comforting-touch-checklist.png',
      pdfLink: '/pdf/Before-I-Offer-Comforting-Touch-Checklist.pdf',
      pdfTag: 'Printable 1-Page Checklist'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <Link
              href="/free-guide"
              className="text-xs font-bold text-[#C29F60] hover:underline"
            >
              Free Resource Hub
            </Link>
            <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
              Practice Blog
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-8 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Evidence & Practice Articles
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Practice Leadership & ECEC Child Safety Articles
          </h1>
          <p className="text-sm md:text-base text-white/90 font-light leading-relaxed max-w-2xl">
            Practical articles, trauma-informed reflection tools, and regulatory breakdowns designed for early childhood educators and service directors.
          </p>
        </section>

        {/* Articles List */}
        <section className="space-y-6">
          {articles.map((item, idx) => (
            <article
              key={idx}
              className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-6 hover:border-[#657B6C] transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto rounded-2xl border border-[#E6E2DC] object-cover max-h-64"
                />
              </div>

              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold text-[#657B6C]">
                    By {item.author}
                  </span>
                </div>

                <h2 className="text-xl md:text-2xl font-serif font-bold text-[#1C3B34] leading-snug">
                  <Link href={item.slug} className="hover:text-[#657B6C] transition-all">
                    {item.title}
                  </Link>
                </h2>

                <p className="text-xs md:text-sm font-medium text-[#2B3833] leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={item.slug}
                    className="py-3 px-5 bg-[#1C3B34] text-white text-center font-bold rounded-xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center flex-1 shadow-sm"
                  >
                    Read Full Article
                  </Link>
                  <a
                    href={item.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-5 bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-center font-bold rounded-xl text-xs hover:bg-white transition-all min-h-12 flex items-center justify-center flex-1"
                  >
                    Download {item.pdfTag}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Paid Program Upgrade CTA */}
        <section className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-4 text-center">
          <span className="text-xs font-black uppercase text-[#C29F60] block tracking-wider">
            Whole-Service Program Access
          </span>
          <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
            Ready to Equip Your Whole Centre with Co-Regulation Tools?
          </h3>
          <p className="text-xs text-[#6A7873] max-w-xl mx-auto leading-relaxed">
            Get 12-month access to all Regulation Ladders, printable room strategy cards, manager QIP self-assessment generators, and staffroom somatic reset routines.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Link
              href="/pricing"
              className="py-3.5 px-6 bg-[#1C3B34] text-white font-bold rounded-2xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center flex-1 shadow-sm"
            >
              View Membership Plans
            </Link>
            <Link
              href="/proposal"
              className="py-3.5 px-6 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center flex-1 shadow-sm"
            >
              Request Service Invoice
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}