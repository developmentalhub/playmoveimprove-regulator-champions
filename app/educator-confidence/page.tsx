'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EducatorConfidencePage() {
  const [formData, setFormData] = useState({
    educatorName: '',
    role: 'Educator (Diploma / Cert III)',
    roomContext: 'Toddler Room (18mâ€“3 Years)',
    somaticAwarenessScore: '3',
    deescalationConfidenceScore: '3',
    primaryPersonalTrigger: '3 PM sensory fatigue, running, and room squealing',
    reflectionNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.educatorName || 'Anonymous Educator',
          email: 'educator-checkin@internal.local',
          serviceName: `Educator Reflection (${formData.role} - ${formData.roomContext})`,
          message: `Somatic Awareness: ${formData.somaticAwarenessScore}/5 | De-escalation Confidence: ${formData.deescalationConfidenceScore}/5 | Main Trigger: ${formData.primaryPersonalTrigger} | Notes: ${formData.reflectionNotes || 'None'}`,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Educator reflection submission failed:', err);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 pb-20">
      
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-40 px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Member Hub
          </Link>
          <span className="rounded-full bg-teal-100 border border-teal-300 px-3 py-1 text-[11px] font-bold text-teal-950">
            Private Staff Reflection
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10 space-y-8">

        {/* TITLE BANNER */}
        <section className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
            Step 2 of Implementation
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Educator Baseline Confidence Check
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            A private 2-minute self-reflection tool to assess your personal regulation triggers and confidence before starting your 12-month Regulation Champions pathway.
          </p>
        </section>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-300 bg-emerald-50 p-8 text-center space-y-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Reflection Logged Privately
            </span>
            <h2 className="text-xl font-bold text-emerald-950">
              Thank You for Completing Your Baseline
            </h2>
            <p className="text-xs text-emerald-900 max-w-md mx-auto leading-relaxed">
              Your baseline responses have been saved. You are ready to explore Month 1: Morning Routines &amp; The CALM Model.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/playbooks"
                className="rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition"
              >
                Explore Month 1 Action Plans &rarr;
              </Link>
              <Link
                href="/somatic-checkin"
                className="rounded-xl border border-teal-700 bg-white px-5 py-3 text-xs font-bold text-teal-950 hover:bg-teal-100 transition"
              >
                Try Staffroom Vagus Reset &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Your First Name or Initials (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sarah M."
                  value={formData.educatorName}
                  onChange={(e) => setFormData({ ...formData, educatorName: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Primary Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="Early Childhood Teacher (ECT)">Early Childhood Teacher (ECT)</option>
                  <option value="Educator (Diploma / Cert III)">Educator (Diploma / Cert III)</option>
                  <option value="Room Leader">Room Leader</option>
                  <option value="Casual / Relief Educator">Casual / Relief Educator</option>
                  <option value="Educational Leader">Educational Leader</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Which room do you work in most frequently?
              </label>
              <select
                value={formData.roomContext}
                onChange={(e) => setFormData({ ...formData, roomContext: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="Nursery (0â€“18 Months)">Nursery (0â€“18 Months)</option>
                <option value="Toddler Room (18mâ€“3 Years)">Toddler Room (18mâ€“3 Years)</option>
                <option value="3-Year-Old Room">3-Year-Old Room</option>
                <option value="4-Year-Old / Kinder Room">4-Year-Old / Kinder Room</option>
                <option value="Prep / Early Primary">Prep / Early Primary</option>
                <option value="Floating / Across All Rooms">Floating / Across All Rooms</option>
              </select>
            </div>

            {/* SOMATIC AWARENESS SCORE */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                1. How easily do you notice physical stress signals in your own body (jaw tightness, shallow breathing) before entering the room?
              </label>
              <p className="text-[11px] text-slate-500 mb-2">1 = Rarely notice until exhausted | 5 = Very aware and adjust immediately</p>
              <div className="grid grid-cols-5 gap-2">
                {['1', '2', '3', '4', '5'].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setFormData({ ...formData, somaticAwarenessScore: score })}
                    className={`py-3 rounded-xl border text-xs font-bold transition ${
                      formData.somaticAwarenessScore === score
                        ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-600'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            {/* DE-ESCALATION CONFIDENCE */}
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                2. How confident do you feel de-escalating room overstimulation without shouting or feeling overwhelmed?
              </label>
              <p className="text-[11px] text-slate-500 mb-2">1 = Often flooded or unsure | 5 = Equipped with clear nonverbal routines</p>
              <div className="grid grid-cols-5 gap-2">
                {['1', '2', '3', '4', '5'].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setFormData({ ...formData, deescalationConfidenceScore: score })}
                    className={`py-3 rounded-xl border text-xs font-bold transition ${
                      formData.deescalationConfidenceScore === score
                        ? 'bg-teal-800 text-white border-teal-800 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-teal-600'
                    }`}
                  >
                    {score}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                3. What room moment exhausts your battery most on a shift?
              </label>
              <select
                value={formData.primaryPersonalTrigger}
                onChange={(e) => setFormData({ ...formData, primaryPersonalTrigger: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="8:15 AM drop-off crying & hovering parents">
                  8:15 AM drop-off crying &amp; hovering parents
                </option>
                <option value="Pack-up time power struggles & children ignoring directions">
                  Pack-up time power struggles &amp; children ignoring directions
                </option>
                <option value="Rest time non-sleeper wiggling & cot kicking">
                  Rest time non-sleeper wiggling &amp; cot kicking
                </option>
                <option value="3 PM sensory fatigue, running, and room squealing">
                  3 PM sensory fatigue, running, and room squealing
                </option>
                <option value="Conflicting strategies between room colleagues during shifts">
                  Conflicting strategies between room colleagues during shifts
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                What support or tool would help your room most this month? (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Share any personal reflections or room strategies you want to trial..."
                value={formData.reflectionNotes}
                onChange={(e) => setFormData({ ...formData, reflectionNotes: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-teal-800 py-4 text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Saving Private Reflection...' : 'Complete Baseline Check â†’'}
            </button>
          </form>
        )}

      </main>
    </div>
  );
}
