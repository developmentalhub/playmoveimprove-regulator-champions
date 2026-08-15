'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function EducatorConfidencePage() {
  const [formData, setFormData] = useState({
    educatorName: '',
    educatorEmail: '',
    centreName: '',
    educatorRole: 'Educator (Diploma / Cert III)',
    roomContext: 'Toddler Room (18m–3 Years)',
    bodyAwareness: '3',
    strategyConfidence: '3',
    primaryPersonalTrigger:
      '3 PM sensory fatigue, running, and room squealing',
    learningGoal: '',
    supportPreference: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/educator-confidence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          educatorName: formData.educatorName,
          educatorEmail: formData.educatorEmail,
          centreName: formData.centreName,
          educatorRole: formData.educatorRole,

          bodyAwareness: formData.bodyAwareness,
          bodyNoticeText: null,

          challengingRoutines: [
            formData.primaryPersonalTrigger,
          ],

          roomPressureText:
            `Primary room context: ${formData.roomContext}`,

          selectedStrategies: [],

          strategyConfidence:
            formData.strategyConfidence,

          learningGoal: formData.learningGoal,

          supportPreference:
            formData.supportPreference,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            'Your reflection could not be submitted.',
        );
      }

      setSubmitted(true);
    } catch (err) {
      console.error(
        'Educator reflection submission failed:',
        err,
      );

      alert(
        err instanceof Error
          ? err.message
          : 'Your reflection could not be submitted. Please try again.',
      );
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
            Private Professional Reflection
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
            A private 2-minute self-reflection to help you notice your current regulation awareness, confidence and professional learning priorities before beginning Regulator Champions.
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
              Your baseline responses have been saved. You can now begin exploring the first Regulation Ladder and the CALM framework.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/playbooks"
                className="rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition"
              >
                Explore Regulation Action Plans &rarr;
              </Link>
              <Link
                href="/somatic-checkin"
                className="rounded-xl border border-teal-700 bg-white px-5 py-3 text-xs font-bold text-teal-950 hover:bg-teal-100 transition"
              >
                Try the Somatic Check-In &rarr;
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-6"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                  Your Name *
                </label>

                <input
                  type="text"
                  required
                  maxLength={150}
                  autoComplete="name"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.educatorName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educatorName: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                  Work Email *
                </label>

                <input
                  type="email"
                  required
                  maxLength={254}
                  autoComplete="email"
                  placeholder="educator@service.com.au"
                  value={formData.educatorEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educatorEmail: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                  Centre or Service Name *
                </label>

                <input
                  type="text"
                  required
                  maxLength={200}
                  placeholder="e.g. Sunshine Early Learning"
                  value={formData.centreName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      centreName: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                  Primary Role *
                </label>

                <select
                  value={formData.educatorRole}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      educatorRole: e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="Early Childhood Teacher (ECT)">
                    Early Childhood Teacher (ECT)
                  </option>
                  <option value="Educator (Diploma / Cert III)">
                    Educator (Diploma / Cert III)
                  </option>
                  <option value="Room Leader">Room Leader</option>
                  <option value="Casual / Relief Educator">
                    Casual / Relief Educator
                  </option>
                  <option value="Educational Leader">
                    Educational Leader
                  </option>
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
                <option value="Nursery (0–18 Months)">Nursery (0–18 Months)</option>
                <option value="Toddler Room (18m–3 Years)">Toddler Room (18m–3 Years)</option>
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
                    onClick={() => setFormData({ ...formData, bodyAwareness: score })}
                    className={`py-3 rounded-xl border text-xs font-bold transition ${
                      formData.bodyAwareness === score
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
                    onClick={() => setFormData({ ...formData, strategyConfidence: score })}
                    className={`py-3 rounded-xl border text-xs font-bold transition ${
                      formData.strategyConfidence === score
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
              <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                What would you most like to feel more confident with? *
              </label>

              <textarea
                rows={4}
                required
                minLength={20}
                maxLength={2000}
                placeholder="For example, I would like more confidence supporting transitions without adding more instructions when children are already overwhelmed."
                value={formData.learningGoal}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    learningGoal: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-bold uppercase text-slate-700">
                What type of support would be most useful? (Optional)
              </label>

              <select
                value={formData.supportPreference}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    supportPreference: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="">No preference yet</option>
                <option value="Practical room strategies">
                  Practical room strategies
                </option>
                <option value="Reflective coaching">
                  Reflective coaching
                </option>
                <option value="Team discussion prompts">
                  Team discussion prompts
                </option>
                <option value="Printable reminders">
                  Printable reminders
                </option>
              </select>
            </div>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-relaxed text-amber-950">
              <strong className="block font-bold">
                Keep this reflection about your own professional practice.
              </strong>

              <p className="mt-1">
                Do not enter children&apos;s names, family names, dates of
                birth, diagnoses, medical information or other identifying
                details. Describe general routines and professional learning
                needs only.
              </p>

              <p className="mt-2">
                Individual responses are treated as private professional
                reflections and are handled in accordance with the{' '}
                <Link
                  href="/privacy"
                  className="font-bold underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-teal-800 py-4 text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Saving Private Reflection...' : 'Complete Baseline Check →'}
            </button>
          </form>
        )}

      </main>
    </div>
  );
}