'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function DirectorReviewPage() {
  const [formData, setFormData] = useState({
    directorName: '',
    email: '',
    serviceName: '',
    roomCount: '3-4 Rooms',
    primaryPressurePoint: 'Drop-off separation distress & morning room volume',
    staffConfidenceScore: '3',
    qipPriority: 'QA5 - Supporting child self-regulation & co-regulation',
    notes: '',
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
          fullName: formData.directorName,
          email: formData.email,
          serviceName: `Director Review: ${formData.serviceName}`,
          message: `Rooms: ${formData.roomCount} | Main Issue: ${formData.primaryPressurePoint} | Staff Confidence: ${formData.staffConfidenceScore}/5 | QIP Focus: ${formData.qipPriority} | Notes: ${formData.notes}`,
        }),
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Director review submission failed:', err);
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
            href="/portal"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Member Hub
          </Link>
          <span className="rounded-full bg-amber-100 border border-amber-300 px-3 py-1 text-[11px] font-bold text-amber-950">
            Baseline Intake
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-10 space-y-8">

        {/* TITLE BANNER */}
        <section className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-800 block">
            Step 1 of Implementation
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Director Starting-Point Review
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Help us map your centre&apos;s current pressure points and QIP goals so we can tailor your service&apos;s 12-month Regulation Champions pathway.
          </p>
        </section>

        {submitted ? (
          <div className="rounded-3xl border border-emerald-300 bg-emerald-50 p-8 text-center space-y-4 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Review Submitted Successfully
            </span>
            <h2 className="text-xl font-bold text-emerald-950">
              Thank You, {formData.directorName}
            </h2>
            <p className="text-xs text-emerald-900 max-w-md mx-auto leading-relaxed">
              Your baseline profile for <strong>{formData.serviceName}</strong> has been logged. Your team can now complete their private 2-minute confidence checks.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/educator-confidence"
                className="rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition"
              >
                Go to Educator Confidence Check &rarr;
              </Link>
              <Link
                href="/portal"
                className="rounded-xl border border-teal-700 bg-white px-5 py-3 text-xs font-bold text-teal-950 hover:bg-teal-100 transition"
              >
                Return to Member Hub
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-6 md:p-8 shadow-sm space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Director / Nominated Supervisor Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.directorName}
                  onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Work Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="director@centre.com.au"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Centre / Service Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sunshine Early Learning"
                  value={formData.serviceName}
                  onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                  Total Active Rooms
                </label>
                <select
                  value={formData.roomCount}
                  onChange={(e) => setFormData({ ...formData, roomCount: e.target.value })}
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
                >
                  <option value="1-2 Rooms">1–2 Rooms</option>
                  <option value="3-4 Rooms">3–4 Rooms</option>
                  <option value="5-6 Rooms">5–6 Rooms</option>
                  <option value="7+ Rooms">7+ Rooms (Multi-site)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                What is your centre&apos;s biggest daily pressure point right now?
              </label>
              <select
                value={formData.primaryPressurePoint}
                onChange={(e) => setFormData({ ...formData, primaryPressurePoint: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="Drop-off separation distress & morning room volume">
                  Drop-off separation distress &amp; morning room volume
                </option>
                <option value="Pack-up time power struggles & instruction refusal">
                  Pack-up time power struggles &amp; instruction refusal
                </option>
                <option value="Rest time restlessness & non-sleeper body regulation">
                  Rest time restlessness &amp; non-sleeper body regulation
                </option>
                <option value="3 PM sensory fatigue, room running, and squealing spikes">
                  3 PM sensory fatigue, room running, and squealing spikes
                </option>
                <option value="Inconsistent strategies between permanent and casual staff">
                  Inconsistent strategies between permanent and casual staff
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                How confident is your team in co-regulating dysregulated behaviors? (1 = Low, 5 = Very High)
              </label>
              <div className="grid grid-cols-5 gap-2">
                {['1', '2', '3', '4', '5'].map((score) => (
                  <button
                    key={score}
                    type="button"
                    onClick={() => setFormData({ ...formData, staffConfidenceScore: score })}
                    className={`py-3 rounded-xl border text-xs font-bold transition ${
                      formData.staffConfidenceScore === score
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
                Current QIP Priority Focus
              </label>
              <input
                type="text"
                value={formData.qipPriority}
                onChange={(e) => setFormData({ ...formData, qipPriority: e.target.value })}
                placeholder="e.g. QA5 - Relationships with Children"
                className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-700 mb-1">
                Additional Notes or Specific Room Context (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Include details about upcoming Assessment & Rating dates or specific room challenges..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-xl border border-slate-300 p-3 text-xs outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-teal-800 py-4 text-xs font-bold text-white shadow-xs hover:bg-teal-900 transition disabled:opacity-60"
            >
              {isSubmitting ? 'Saving Review Profile...' : 'Save Director Starting-Point Profile →'}
            </button>
          </form>
        )}

      </main>
    </div>
  );
}