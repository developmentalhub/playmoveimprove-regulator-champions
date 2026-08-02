'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [quoteForm, setQuoteForm] = useState({
    fullName: '',
    email: '',
    serviceName: '',
    fundingSource: 'Kindy Uplift / SRF Funding',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteForm),
      });

      if (response.ok) {
        setQuoteSubmitted(true);
      } else {
        setQuoteSubmitted(true);
      }
    } catch (err) {
      console.error('Quote submit error:', err);
      setQuoteSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-teal-950 px-6 pb-16 pt-12 text-white md:pb-24 md:pt-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* HERO LEFT TEXT */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-700/80 bg-teal-900/80 px-3.5 py-1 text-xs font-bold text-amber-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></span>
              Whole-Centre Regulation Capability Platform
            </div>

            <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Turn Room Overstimulation Into Co-Regulated Calm
            </h1>

            <p className="max-w-2xl text-xs leading-relaxed text-teal-100 md:text-sm">
              A 12-month annual site membership designed for busy early
              childhood educators. Access scenario action plans,
              physical room posters, interactive somatic check-ins, and
              NQS audit evidence in under 15 minutes a week.
            </p>

            {/* HERO CTA BUTTONS */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/proposal"
                className="rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-md transition hover:bg-amber-300"
              >
                Print Official Proposal &amp; Quote ($4,790) &rarr;
              </Link>

              <Link
                href="/playbooks"
                className="rounded-xl border border-teal-700 bg-teal-900/60 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-teal-800"
              >
                Explore Ladder 1 Action Plans &rarr;
              </Link>
            </div>

            {/* QUICK STATS STRIP */}
            <div className="grid grid-cols-3 gap-4 border-t border-teal-800/80 pt-6 text-xs">
              <div>
                <strong className="block text-lg font-extrabold text-amber-300">
                  8 Ladders
                </strong>

                <span className="text-[11px] text-teal-200">
                  Staged Curriculum
                </span>
              </div>

              <div>
                <strong className="block text-lg font-extrabold text-amber-300">
                  12 Months
                </strong>

                <span className="text-[11px] text-teal-200">
                  Progressive Pathway
                </span>
              </div>

              <div>
                <strong className="block text-lg font-extrabold text-amber-300">
                  NQS QA1–7
                </strong>

                <span className="text-[11px] text-teal-200">
                  A&amp;R Audit Evidence
                </span>
              </div>
            </div>
          </div>

          {/* HERO RIGHT FEATURED WATERCOLOUR ARTWORK */}
          <div className="relative lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-teal-800 bg-teal-900 p-2 shadow-2xl">
              <img
                src="/images/feed/01_babies_room.png"
                alt="Co-regulated Early Childhood Environment"
                className="max-h-96 h-auto w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl space-y-16 px-6 py-12">

        {/* RESTORED: DYSREGULATION SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Dysregulation Does Not Stay With the Child
          </h2>

          <p className="text-sm leading-relaxed text-slate-700">
            When a child is overwhelmed, stress can spread through the
            whole room. Without a shared understanding, educators may
            respond from different expectations, experiences and levels
            of stress. One educator absorbs the emotional pressure,
            another pushes for compliance, and the team can quickly
            become reactive.
          </p>

          <p className="text-sm leading-relaxed text-slate-700">
            This does not mean your educators do not care. It often
            means they are tired, under-supported and trying to respond
            without a shared understanding of child development and
            regulation.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Understand Without Carrying It All
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Help educators understand what a child or family may
                need without carrying every difficult moment
                emotionally.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Reflective Mindsets
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Help educators examine their assumptions during
                challenging routines rather than relying only on
                instinct when pressure is high.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Confident Room Leadership
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Help room leaders guide routines with greater
                consistency, calm and shared expectations.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Greater Consistency Across Shifts
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Reduce mismatched responses during shift changes,
                handovers and breaks by giving the whole service a
                shared regulation language.
              </p>
            </div>
          </div>
        </section>

        {/* QUICK ACCESS TOOL PIPELINE (unchanged) */}
        <section className="space-y-4">
          <div className="space-y-1 text-center">
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
              15-Minute Planning Break Tools
            </span>

            <h2 className="text-2xl font-extrabold text-slate-900">
              Interactive Tools Ready for Your Team
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/learning-journey"
              className="flex flex-col justify-between space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-teal-600"
            >
              <div className="space-y-2">
                <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900">
                  Step 1
                </span>

                <strong className="block text-sm font-bold text-slate-900">
                  Guided Learning Journey
                </strong>

                <p className="text-xs leading-relaxed text-slate-600">
                  Toggle between Styled vs. Substance views and tap
                  15-word strategy cards.
                </p>
              </div>

              <span className="text-xs font-bold text-teal-800">
                Start Journey &rarr;
              </span>
            </Link>

            <Link
              href="/playbooks"
              className="flex flex-col justify-between space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-teal-600"
            >
              <div className="space-y-2">
                <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900">
                  Step 2
                </span>

                <strong className="block text-sm font-bold text-slate-900">
                  Ladder 1 Action Plans
                </strong>

                <p className="text-xs leading-relaxed text-slate-600">
                  Morning drop-off, staffroom reset, and arrival
                  routine action plans available now.
                </p>
              </div>

              <span className="text-xs font-bold text-teal-800">
                View Ladder 1 &rarr;
              </span>
            </Link>

            <Link
              href="/somatic-checkin"
              className="flex flex-col justify-between space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-teal-600"
            >
              <div className="space-y-2">
                <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900">
                  Step 3
                </span>

                <strong className="block text-sm font-bold text-slate-900">
                  Somatic Vagus Nerve Reset
                </strong>

                <p className="text-xs leading-relaxed text-slate-600">
                  Interactive 60-second staffroom check-in to log body
                  tension and sensory anchors.
                </p>
              </div>

              <span className="text-xs font-bold text-teal-800">
                Launch Somatic Tool &rarr;
              </span>
            </Link>

            <Link
              href="/nqs-mapping"
              className="flex flex-col justify-between space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs transition hover:border-teal-600"
            >
              <div className="space-y-2">
                <span className="rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-900">
                  Step 4
                </span>

                <strong className="block text-sm font-bold text-slate-900">
                  NQS Evidence &amp; QIP Wording
                </strong>

                <p className="text-xs leading-relaxed text-slate-600">
                  Copy pre-formatted self-assessment text directly
                  into your service QIP.
                </p>
              </div>

              <span className="text-xs font-bold text-teal-800">
                Copy QIP Evidence &rarr;
              </span>
            </Link>
          </div>
        </section>

        {/* RESTORED: HOW THE PATHWAY WORKS */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold text-slate-900">
              How the Regulator Champions Pathway Works
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              A structured 12-month pathway that turns regulation
              learning into practical changes across everyday centre
              routines.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                n: 1,
                t: 'Centre Starting-Point Review',
                d: 'The director shares broad room patterns, leadership pressures and team goals so the pathway can respond to the service\u2019s actual priorities.',
              },
              {
                n: 2,
                t: 'Educator Confidence Check',
                d: 'Educators privately reflect on their current confidence, sensory awareness, stress responses and regulation practice. Individual answers are not shared with directors.',
              },
              {
                n: 3,
                t: 'Ladder-Specific Learning',
                d: 'Educators access focused teaching, practical examples and self-paced recordings connected to common daily routines.',
              },
              {
                n: 4,
                t: 'Apply It in the Room',
                d: 'Participating educators complete practical Regulation in Action Projects and trial meaningful changes in real centre routines.',
              },
              {
                n: 5,
                t: 'Structured Review and Feedback',
                d: 'Automated check-ins guide routine submissions. Work requiring further reflection or expert judgement is referred to Robyn for personal review.',
              },
              {
                n: 6,
                t: 'Recognised Achievement',
                d: 'Completed ladders contribute towards individual Regulator Champion recognition and visible whole-centre progress.',
              },
            ].map((step) => (
              <div
                key={step.n}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <span className="mb-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-white">
                  {step.n}
                </span>
                <strong className="block text-sm font-bold text-slate-900">
                  {step.t}
                </strong>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 12-MONTH CONTINUUM PATHWAY PREVIEW (unchanged) */}
        <section className="space-y-6 rounded-3xl border border-teal-200 bg-teal-50 p-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-teal-200 pb-4 sm:flex-row sm:items-center">
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-teal-900">
                Eight Regulation Ladders
              </span>

              <h2 className="text-xl font-extrabold text-teal-950">
                12-Month Sequential Curriculum Overview
              </h2>
            </div>

            <Link
              href="/playbooks"
              className="rounded-xl bg-teal-800 px-4 py-2 text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Open Ladder 1 &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2 rounded-2xl border border-teal-300 bg-white p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Ladder 1 Available Now
              </span>

              <strong className="block text-sm font-bold text-slate-900">
                Morning Routines &amp; CALM Foundations
              </strong>

              <p className="text-xs leading-relaxed text-slate-600">
                Staffroom preparation, morning arrivals, drop-off
                separation, adult pacing, and calm room foundations.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-teal-200 bg-white p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Ladders 2 to 4 Releasing Progressively
              </span>

              <strong className="block text-sm font-bold text-slate-900">
                Escalation, Participation &amp; Schema Decoding
              </strong>

              <p className="text-xs leading-relaxed text-slate-600">
                EASE escalation practices, mat-time participation,
                heavy-work play zones, and safe responses to repeated
                movement patterns.
              </p>
            </div>

            <div className="space-y-2 rounded-2xl border border-teal-200 bg-white p-5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Ladders 5 to 8 Releasing Progressively
              </span>

              <strong className="block text-sm font-bold text-slate-900">
                Transitions, Fatigue &amp; Embedded Practice
              </strong>

              <p className="text-xs leading-relaxed text-slate-600">
                Pack-up pressure, afternoon fatigue, family
                communication, team consistency, and service-wide
                implementation.
              </p>
            </div>
          </div>

          <p className="text-xs leading-relaxed text-teal-900">
            New ladder content is released progressively across the
            12-month membership as your team completes each stage. This
            deliberate pacing prevents educators and families from
            being overwhelmed with too much information at once.
          </p>

          <p className="text-xs leading-relaxed text-teal-900">
            Each ladder is supported by two practical frameworks: CALM
            for everyday regulation and EASE for escalation-specific
            moments.
          </p>
        </section>

        {/* RESTORED: LEARNING THAT MUST SHOW UP IN PRACTICE */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold text-slate-900">
              Learning That Must Show Up in Practice
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              Educators do not achieve a ladder simply by watching a
              recording or repeating the right words. They are asked
              to understand the issue, change something practical,
              reflect on the result and show how the learning
              influenced their actions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Understand It
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Explain what may be happening for the child and why
                the routine is difficult.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Apply It
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Change something practical in the environment, routine,
                language or educator response.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Reflect on It
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Describe what was tried, what was noticed and what
                should change next time.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <strong className="block text-sm font-bold text-slate-900">
                Show the Change
              </strong>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Provide structured evidence from real practice rather
                than only a correct answer.
              </p>
            </div>
          </div>
        </section>

        {/* RESTORED: PRIVATE REFLECTION / LEADER PRESSURE / RECOGNITION / FOUNDER */}
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-extrabold text-slate-900">
            Private Reflection, Shared Participation, Visible
            Achievement
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Educator confidence responses remain private between the
            educator and Robyn. The centre can still share the ladder
            it is working on, involve teams and families in practical
            projects, and celebrate positive improvements together.
          </p>
          <p className="text-sm leading-relaxed text-slate-700">
            Families contribute insight and celebrate progress. They
            are not asked to assess educators, and an educator does not
            fail because a family chooses not to respond.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Meaningful Recognition
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">
            Lighten the Regulation Pressures You Carry as a Leader
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            The Centre Starting-Point Review and Educator Confidence
            Check help identify common pressures and learning needs
            across the team. Instead of repeatedly explaining the same
            strategies or mediating room friction, leaders gain a
            structured pathway that builds shared understanding over
            time.
          </p>
        </section>

        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8">
          <h2 className="text-xl font-extrabold text-slate-900">
            Regulator Champion Recognition Is Personally Reviewed
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            Individual ladder achievements build towards the full
            eight-topic pathway. Before Regulator Champion recognition
            is awarded, Robyn personally reviews the educator&rsquo;s
            body of work, practical projects and evidence of reflective
            practice.
          </p>
          <p className="text-xs italic leading-relaxed text-slate-500">
            Recognition is issued by Play Move Improve and is not a
            nationally recognised qualification.
          </p>

          <div className="mt-4 flex items-start gap-4 border-t border-slate-100 pt-6">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-teal-800 text-sm font-bold text-white">
              RP
            </div>
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                Program Founder and Mentor
              </span>
              <strong className="block text-sm font-bold text-slate-900">
                Created by Robyn Papworth
              </strong>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">
                Paediatric Exercise Physiologist and Master-qualified
                Developmental Educator. Robyn has trained and supported
                early childhood educators across Australia, helping
                teams translate complex regulation, sensory, movement
                and developmental concepts into practical strategies
                for real rooms and real routines.
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Regulator Champions was created after Robyn repeatedly
                saw caring educators facing the same regulation
                pressures without a shared pathway for turning advice
                into consistent centre practice.
              </p>
            </div>
          </div>
        </section>

        {/* INSTANT QUOTE GENERATOR FOR DIRECTORS (unchanged) */}
        <section className="space-y-6 rounded-3xl bg-teal-950 p-8 text-white shadow-xl md:p-10">
          <div className="max-w-2xl space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider text-amber-300">
              Annual Site Membership ($4,790 Incl. GST)
            </span>

            <h2 className="text-2xl font-extrabold md:text-3xl">
              Request an Official Centre Proposal &amp; Invoice
            </h2>

            <p className="text-xs leading-relaxed text-teal-100">
              Submit your centre details below to receive an official
              proposal document formatted for Approved Provider
              approval and Kindy Uplift / SRF funding acquittal.
            </p>
          </div>

          {quoteSubmitted ? (
            <div className="space-y-3 rounded-2xl border border-teal-700 bg-teal-900 p-6 text-center">
              <strong className="block text-sm font-bold text-amber-300">
                Proposal Request Received
              </strong>

              <p className="mx-auto max-w-md text-xs text-teal-100">
                Thank you! Your details have been logged. You can view
                and print your formal proposal pack right now below.
              </p>

              <Link
                href="/proposal"
                className="inline-block rounded-xl bg-amber-400 px-6 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
              >
                Open Printable Proposal Pack ($4,790) &rarr;
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleQuoteSubmit}
              className="max-w-2xl space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-teal-300">
                    Director / Contact Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={quoteForm.fullName}
                    onChange={(e) =>
                      setQuoteForm({
                        ...quoteForm,
                        fullName: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white placeholder-teal-400 outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-teal-300">
                    Work Email Address *
                  </label>

                  <input
                    type="email"
                    required
                    placeholder="director@centre.com.au"
                    value={quoteForm.email}
                    onChange={(e) =>
                      setQuoteForm({
                        ...quoteForm,
                        email: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white placeholder-teal-400 outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-teal-300">
                    Centre / Service Name *
                  </label>

                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunshine Early Learning"
                    value={quoteForm.serviceName}
                    onChange={(e) =>
                      setQuoteForm({
                        ...quoteForm,
                        serviceName: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white placeholder-teal-400 outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-teal-300">
                    Funding Pathway
                  </label>

                  <select
                    value={quoteForm.fundingSource}
                    onChange={(e) =>
                      setQuoteForm({
                        ...quoteForm,
                        fundingSource: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-teal-800 bg-teal-900/90 p-3 text-xs text-white outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value="Kindy Uplift / SRF Funding">
                      Kindy Uplift / SRF Funding
                    </option>

                    <option value="Annual Operational PD Budget">
                      Annual Operational PD Budget
                    </option>

                    <option value="Inclusion Support Funding">
                      Inclusion Support Allocation
                    </option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-2xl bg-amber-400 py-4 text-xs font-bold text-slate-950 shadow-md transition hover:bg-amber-300 disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Generating Proposal Request...'
                  : 'Request Formal $4,790 Site Proposal Pack →'}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  );
}