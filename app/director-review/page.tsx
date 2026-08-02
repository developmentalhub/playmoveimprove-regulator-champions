'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

type SubmissionStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

type DirectorEnquiryForm = {
  directorName: string;
  email: string;
  serviceName: string;
  phone: string;
  roomCount: string;
  primaryPressurePoint: string;
  notes: string;
};

const initialFormData: DirectorEnquiryForm = {
  directorName: '',
  email: '',
  serviceName: '',
  phone: '',
  roomCount: '3-4 Rooms',
  primaryPressurePoint:
    'Drop-off separation distress and morning room volume',
  notes: '',
};

export default function DirectorReviewPage() {
  const [formData, setFormData] =
    useState<DirectorEnquiryForm>(initialFormData);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');

  const [submissionMessage, setSubmissionMessage] =
    useState('');

  const updateField = (
    field: keyof DirectorEnquiryForm,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmissionStatus('submitting');
    setSubmissionMessage('');

    try {
      const response = await fetch('/api/director-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'public_director_enquiry',
          directorName: formData.directorName,
          directorEmail: formData.email,
          serviceName: formData.serviceName,
          phone: formData.phone,
          roomCount: formData.roomCount,
          primaryPressurePoint:
            formData.primaryPressurePoint,
          notes: formData.notes,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            'Your enquiry could not be submitted.',
        );
      }

      setSubmissionStatus('success');
      setSubmissionMessage(
        'Thank you. Your enquiry has been received and Play Move Improve can now prepare the most relevant next step for your service.',
      );
    } catch (error) {
      console.error(
        'Director enquiry submission failed:',
        error,
      );

      setSubmissionStatus('error');
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : 'Your enquiry could not be submitted. Please try again.',
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Home
          </Link>

          <span className="rounded-full border border-amber-300 bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-950">
            Short Director Enquiry
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-8 px-6 py-10">
        <section className="space-y-3 text-center">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Explore Regulator Champions
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Request a Regulator Champions Proposal
          </h1>

          <p className="mx-auto max-w-xl text-sm leading-relaxed text-slate-600">
            Tell us a little about your service and the room
            pressure you are currently experiencing. This is a
            short enquiry, not the full onboarding review.
          </p>

          <p className="text-xs font-semibold text-teal-800">
            Takes approximately two minutes.
          </p>
        </section>

        {submissionStatus === 'success' ? (
          <section className="space-y-5 rounded-3xl border border-emerald-300 bg-emerald-50 p-8 text-center shadow-sm">
            <span className="block text-xs font-bold uppercase tracking-wider text-emerald-800">
              Enquiry Received
            </span>

            <h2 className="text-xl font-bold text-emerald-950">
              Thank You, {formData.directorName}
            </h2>

            <p className="mx-auto max-w-md text-sm leading-relaxed text-emerald-900">
              {submissionMessage}
            </p>

            <p className="mx-auto max-w-md text-xs leading-relaxed text-emerald-800">
              You have not started the longer Centre
              Starting-Point Review. That onboarding review is
              completed after a service joins the program.
            </p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Link
                href="/proposal"
                className="rounded-xl bg-teal-800 px-5 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-teal-900"
              >
                View Program Proposal &rarr;
              </Link>

              <Link
                href="/"
                className="rounded-xl border border-teal-700 bg-white px-5 py-3 text-xs font-bold text-teal-950 transition hover:bg-teal-100"
              >
                Return to Home
              </Link>
            </div>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
          >
            {submissionStatus === 'error' && (
              <div
                role="alert"
                className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-900"
              >
                {submissionMessage}
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="directorName"
                  className="mb-1 block text-[11px] font-bold uppercase text-slate-700"
                >
                  Director or Nominated Supervisor *
                </label>

                <input
                  id="directorName"
                  name="directorName"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.directorName}
                  onChange={(event) =>
                    updateField(
                      'directorName',
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-[11px] font-bold uppercase text-slate-700"
                >
                  Work Email Address *
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="director@centre.com.au"
                  value={formData.email}
                  onChange={(event) =>
                    updateField('email', event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="serviceName"
                  className="mb-1 block text-[11px] font-bold uppercase text-slate-700"
                >
                  Centre or Service Name *
                </label>

                <input
                  id="serviceName"
                  name="serviceName"
                  type="text"
                  required
                  placeholder="e.g. Sunshine Early Learning"
                  value={formData.serviceName}
                  onChange={(event) =>
                    updateField(
                      'serviceName',
                      event.target.value,
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-[11px] font-bold uppercase text-slate-700"
                >
                  Phone Number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Optional"
                  value={formData.phone}
                  onChange={(event) =>
                    updateField('phone', event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="roomCount"
                className="mb-1 block text-[11px] font-bold uppercase text-slate-700"
              >
                Number of Active Rooms
              </label>

              <select
                id="roomCount"
                name="roomCount"
                value={formData.roomCount}
                onChange={(event) =>
                  updateField(
                    'roomCount',
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="1-2 Rooms">1–2 Rooms</option>
                <option value="3-4 Rooms">3–4 Rooms</option>
                <option value="5-6 Rooms">5–6 Rooms</option>
                <option value="7+ Rooms">
                  7+ Rooms or Multi-site
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="primaryPressurePoint"
                className="mb-1 block text-[11px] font-bold uppercase text-slate-700"
              >
                What is your biggest daily pressure point?
              </label>

              <select
                id="primaryPressurePoint"
                name="primaryPressurePoint"
                value={formData.primaryPressurePoint}
                onChange={(event) =>
                  updateField(
                    'primaryPressurePoint',
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="Drop-off separation distress and morning room volume">
                  Drop-off separation distress and morning
                  room volume
                </option>

                <option value="Pack-up transitions and instruction refusal">
                  Pack-up transitions and instruction refusal
                </option>

                <option value="Rest-time regulation and non-sleeper participation">
                  Rest-time regulation and non-sleeper
                  participation
                </option>

                <option value="Afternoon sensory fatigue, running and noise">
                  Afternoon sensory fatigue, running and noise
                </option>

                <option value="Inconsistent strategies across the educator team">
                  Inconsistent strategies across the educator
                  team
                </option>

                <option value="Other">
                  Other or several combined concerns
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="mb-1 block text-[11px] font-bold uppercase text-slate-700"
              >
                Anything Else We Should Know?
              </label>

              <textarea
                id="notes"
                name="notes"
                rows={3}
                placeholder="Optional. Add a short note about your service, current priorities or upcoming Assessment and Rating visit."
                value={formData.notes}
                onChange={(event) =>
                  updateField('notes', event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            <button
              type="submit"
              disabled={submissionStatus === 'submitting'}
              className="w-full rounded-2xl bg-teal-800 py-4 text-sm font-bold text-white shadow-xs transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submissionStatus === 'submitting'
                ? 'Sending Enquiry...'
                : 'Request My Centre Proposal →'}
            </button>

            <p className="text-center text-xs leading-relaxed text-slate-500">
              The detailed Centre Starting-Point Review is
              completed later by services that join the
              12-month pathway.
            </p>
          </form>
        )}
      </main>
    </div>
  );
}