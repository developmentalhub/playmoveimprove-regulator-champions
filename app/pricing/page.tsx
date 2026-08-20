'use client';

import React from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Room Leader Pass',
      tag: 'Individual Educator',
      price: '$290',
      period: 'per year (GST Inc)',
      description: 'Designed for room leaders wanting personal access to floor tools and self-reflection logs.',
      features: [
        'Full access to Educator Floor Action Decks',
        'Printable pocket strategy cards for transitions',
        'Personal practice reflection log access',
        'Trauma-informed co-regulation guides'
      ],
      ctaText: 'Join as Room Educator',
      ctaLink: '/educator-trial',
      featured: false
    },
    {
      name: '3-Ladder Preview Pathway',
      tag: 'Whole-Service 6 Months',
      price: '$1,790',
      period: 'for 6 months (GST Inc)',
      description: 'Ideal entry pathway for services launching core morning routines and initial QIP evidence mapping.',
      features: [
        'Unlimited staff access across all service rooms',
        'Covers Ladders 1 to 3 (Morning, EASE & Transitions)',
        'Manager QIP Evidence Engine & NQS Mapping',
        'Print-ready A3 CALM Room Posters & Cards',
        'Eligible for State Funding Grant Acquittals'
      ],
      ctaText: 'Request Service Invoice ($1,790)',
      ctaLink: '/proposal?plan=preview',
      featured: false
    },
    {
      name: 'Full 8-Ladder Complete License',
      tag: 'Best Value • Grant Approved',
      price: '$4,790',
      period: 'for 12 months (GST Inc)',
      description: 'Complete 12-month transformation across all 8 Co-Regulation Ladders for your entire team.',
      features: [
        'Unlimited staff access across all service rooms',
        'Full access to all 8 Co-Regulation Ladders',
        'Complete Manager QIP Self-Assessment Engine',
        'Weekly 1-click Parent Newsletter Blurbs (QA 6.1.1)',
        'Staffroom Somatic Body Scan & Reset Modules',
        '100% Acquittable under QLD Uplift, VIC SRF & NSW QLE'
      ],
      ctaText: 'Request Service Invoice ($4,790)',
      ctaLink: '/proposal?plan=full',
      featured: true
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
          <div className="flex items-center gap-3">
            <Link
              href="/kindy-uplift"
              className="text-xs font-bold text-[#C29F60] hover:underline"
            >
              State Grant Guide
            </Link>
            <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
              Program Pricing
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {/* Banner */}
        <section className="bg-[#1C3B34] text-white p-6 md:p-10 rounded-3xl border-2 border-[#1C3B34] shadow-sm space-y-3 text-center max-w-3xl mx-auto">
          <span className="text-xs font-black uppercase tracking-wider text-[#C29F60] block">
            Flexible Service Licensing
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-white leading-tight">
            Simple, Transparent Program Pricing
          </h1>
          <p className="text-xs md:text-sm text-white/90 font-light leading-relaxed">
            Equip your educators with trauma-informed floor tools, satisfy NQS regulatory requirements, and acquit via state funding grants.
          </p>
        </section>

        {/* Pricing Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border-2 shadow-sm flex flex-col justify-between space-y-6 transition-all ${
                tier.featured
                  ? 'bg-[#1C3B34] text-white border-[#1C3B34] ring-2 ring-[#C29F60]'
                  : 'bg-white text-[#1C3B34] border-[#E6E2DC]'
              }`}
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                      tier.featured
                        ? 'bg-[#C29F60] text-[#1C3B34]'
                        : 'bg-[#FAF5EC] border border-[#C29F60]/40 text-[#1C3B34]'
                    }`}
                  >
                    {tier.tag}
                  </span>
                </div>

                <div>
                  <h2 className={`text-xl font-serif font-bold ${tier.featured ? 'text-white' : 'text-[#1C3B34]'}`}>
                    {tier.name}
                  </h2>
                  <div className="pt-2 flex items-baseline gap-1">
                    <span className={`text-3xl font-serif font-bold ${tier.featured ? 'text-white' : 'text-[#1C3B34]'}`}>
                      {tier.price}
                    </span>
                    <span className={`text-xs font-medium ${tier.featured ? 'text-white/80' : 'text-[#657B6C]'}`}>
                      {tier.period}
                    </span>
                  </div>
                </div>

                <p className={`text-xs font-medium leading-relaxed ${tier.featured ? 'text-white/90' : 'text-[#2B3833]'}`}>
                  {tier.description}
                </p>

                <div className="pt-2 border-t border-current/10 space-y-2">
                  <span className={`text-[10px] font-black uppercase tracking-wider block ${tier.featured ? 'text-[#C29F60]' : 'text-[#657B6C]'}`}>
                    Key Inclusions
                  </span>
                  <ul className="space-y-2 text-xs font-medium">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <span className={tier.featured ? 'text-[#C29F60]' : 'text-[#C29F60]'}>✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={tier.ctaLink}
                className={`w-full py-3.5 px-4 text-center font-bold rounded-2xl text-xs transition-all min-h-12 flex items-center justify-center shadow-sm ${
                  tier.featured
                    ? 'bg-[#C29F60] text-[#1C3B34] hover:bg-opacity-90'
                    : 'bg-[#1C3B34] text-white hover:bg-opacity-90'
                }`}
              >
                {tier.ctaText}
              </Link>
            </div>
          ))}
        </section>

        {/* State Funding Banner */}
        <section className="bg-[#FAF5EC] border-2 border-[#C29F60] p-6 md:p-8 rounded-3xl space-y-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-left">
            <span className="text-xs font-black uppercase text-[#C29F60] block">
              State Government Grants
            </span>
            <h3 className="text-xl font-serif font-bold text-[#1C3B34]">
              Paying via Kindy Uplift, SRF, or QLE Funding?
            </h3>
            <p className="text-xs text-[#2B3833] max-w-xl font-medium leading-relaxed">
              We provide formal tax quotes, ABN details, and pre-written plan justification copy to submit directly to your state funding portal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Link
              href="/kindy-uplift"
              className="py-3.5 px-6 bg-[#1C3B34] text-white text-center font-bold rounded-2xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm whitespace-nowrap"
            >
              View Grant Guide
            </Link>
            <Link
              href="/quote"
              className="py-3.5 px-6 bg-[#C29F60] text-[#1C3B34] text-center font-bold rounded-2xl text-xs hover:bg-opacity-90 transition-all min-h-12 flex items-center justify-center shadow-sm whitespace-nowrap"
            >
              Generate Tax Quote
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}