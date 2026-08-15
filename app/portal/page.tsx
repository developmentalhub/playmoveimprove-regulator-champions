'use client';

import Link from 'next/link';
import { useState } from 'react';

import MemberSignOutButton from '@/components/MemberSignOutButton';
import ProgressSummary from '@/components/feed/ProgressSummary';
import RegulationLadders from '@/components/feed/RegulationLadders';

type HubView = 'resources' | 'ladders' | 'progress';

export default function MemberPortalPage() {
  const [userEmail, setUserEmail] = useState('');
  const [hubView, setHubView] = useState<HubView>('resources');
  const [openingResource, setOpeningResource] = useState<string | null>(null);
  const [resourceError, setResourceError] = useState('');

  const cleanedEmail = userEmail.trim().toLowerCase();

  const openMemberResource = async (file: string) => {
    setOpeningResource(file);
    setResourceError('');

    try {
      const response = await fetch('/api/member-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        url?: string;
        error?: string;
      };

      if (!response.ok || result.success !== true || !result.url) {
        throw new Error(
          result.error ?? 'The member resource could not be opened.',
        );
      }

      window.open(result.url, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Member resource open failed:', error);
      setResourceError(
        error instanceof Error
          ? error.message
          : 'The member resource could not be opened. Please try again.',
      );
    } finally {
      setOpeningResource(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
              Play Move Improve
            </span>

            <h1 className="text-base font-extrabold text-slate-900">
              Regulator Champions Member Hub
            </h1>
          </div>

          <MemberSignOutButton />
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
        <section className="space-y-4 rounded-3xl bg-teal-950 p-8 text-white shadow-md">
          <span className="inline-block rounded-full bg-amber-400 px-3 py-1 text-[10px] font-bold text-slate-950">
            Service Member Access
          </span>

          <h2 className="text-2xl font-extrabold md:text-3xl">
            Welcome to Your Regulator Champions Hub
          </h2>

          <p className="max-w-2xl text-xs leading-relaxed text-teal-100 md:text-sm">
            Use this hub to move between your available Regulation Ladders,
            action plans, team reflection tools and printable resources.
            Content is introduced progressively so your team has time to
            practise, discuss and apply each stage.
          </p>
        </section>

        <section className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-teal-950">
            Start With the Current Learning
          </strong>

          <p className="mt-2 text-xs leading-relaxed text-teal-900">
            Begin with Ladder 1 and use the action plans during real routines.
            The aim is not to complete resources quickly. Give educators time
            to trial a practice, reflect on what happened and build shared
            language before moving forward.
          </p>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="max-w-2xl">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
              Practice Hub
            </span>

            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              Regulation Ladders and Learning Progress
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Enter your own work email before saving reflections. Please do not
              use a child or family email address and do not include identifying
              child or family information in your reflections.
            </p>
          </div>

          <label
            htmlFor="practice-email"
            className="mt-5 block text-xs font-bold text-slate-700"
          >
            Your work email
          </label>

          <input
            id="practice-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={userEmail}
            onChange={(event) => setUserEmail(event.target.value)}
            placeholder="educator@service.com.au"
            className="mt-2 w-full max-w-xl rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-100"
          />

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Your email is used to match your saved ladder progress. It is not
            displayed publicly.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => setHubView('resources')}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 ${
                hubView === 'resources'
                  ? 'bg-teal-800 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Member Resources
            </button>

            <button
              type="button"
              onClick={() => setHubView('ladders')}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 ${
                hubView === 'ladders'
                  ? 'bg-teal-800 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              Regulation Ladders
            </button>

            <button
              type="button"
              onClick={() => setHubView('progress')}
              className={`rounded-xl px-4 py-3 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2 ${
                hubView === 'progress'
                  ? 'bg-teal-800 text-white'
                  : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              My Progress
            </button>
          </div>
        </section>

        {hubView === 'resources' && (
          <>
            <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <article className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                    Ladder 1 Foundation
                  </span>

                  <h2 className="text-base font-bold text-slate-900">
                    Morning Routine Action Plans
                  </h2>

                  <p className="text-xs leading-relaxed text-slate-600">
                    Practical prompts for arrivals, family handovers, room
                    transitions, educator preparation and morning participation.
                  </p>
                </div>

                <Link
                  href="/playbooks"
                  className="inline-block pt-2 text-xs font-bold text-teal-800 hover:underline"
                >
                  Open Action Plans &rarr;
                </Link>
              </article>

              <article className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                    Ladder 2 Learning
                  </span>

                  <h2 className="text-base font-bold text-slate-900">
                    EASE Model &amp; Escalation Practices
                  </h2>

                  <p className="text-xs leading-relaxed text-slate-600">
                    Explore environmental load, relational support, sensory and
                    movement needs, and adult responses during high-demand moments.
                  </p>
                </div>

                <Link
                  href="/month-2-ease"
                  className="inline-block pt-2 text-xs font-bold text-teal-800 hover:underline"
                >
                  Open EASE Learning &rarr;
                </Link>
              </article>

              <article className="flex flex-col justify-between space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                <div className="space-y-3">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                    Leadership Reflection
                  </span>

                  <h2 className="text-base font-bold text-slate-900">
                    NQS &amp; QIP Reflection Matrix
                  </h2>

                  <p className="text-xs leading-relaxed text-slate-600">
                    Connect professional learning with relevant NQS elements and
                    develop QIP wording that reflects your service&apos;s actual
                    practice and improvement priorities.
                  </p>
                </div>

                <Link
                  href="/nqs-mapping"
                  className="inline-block pt-2 text-xs font-bold text-teal-800 hover:underline"
                >
                  Open NQS Reflection Matrix &rarr;
                </Link>
              </article>
            </section>

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Guided Learning
                </span>

                <h2 className="mt-1 text-base font-bold text-slate-900">
                  Learning Journey
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Work through the observation activity, interactive strategy cards
                  and printable resources in a simple guided sequence.
                </p>

                <Link
                  href="/learning-journey"
                  className="mt-4 inline-block text-xs font-bold text-teal-800 hover:underline"
                >
                  Open Learning Journey &rarr;
                </Link>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Educator Reflection
                </span>

                <h2 className="mt-1 text-base font-bold text-slate-900">
                  Educator Confidence Check
                </h2>

                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  Complete a professional reflection about current confidence,
                  room pressure points and learning priorities.
                </p>

                <Link
                  href="/educator-confidence"
                  className="mt-4 inline-block text-xs font-bold text-teal-800 hover:underline"
                >
                  Open Confidence Check &rarr;
                </Link>
              </article>
            </section>

            <section className="space-y-4 rounded-3xl border border-teal-200 bg-teal-50 p-6">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-teal-800">
                  Printable Resources
                </span>

                <h2 className="mt-1 text-sm font-bold text-teal-950">
                  Room Poster &amp; Card Vault
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-relaxed text-teal-900">
                  Use these resources as prompts for team practice and reflection.
                  Adapt how they are used to suit your service context and current
                  learning stage.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-teal-800 p-3 text-center text-xs font-bold text-white transition hover:bg-teal-900"
                >
                  Educator Routine Cards
                </a>

                <button
                  type="button"
                  onClick={() => void openMemberResource('Calm-Posters.pdf')}
                  disabled={openingResource !== null}
                  className="rounded-xl bg-amber-400 p-3 text-center text-xs font-bold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {openingResource === 'Calm-Posters.pdf'
                    ? 'Opening…'
                    : 'CALM Room Posters'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
                    )
                  }
                  disabled={openingResource !== null}
                  className="rounded-xl border border-teal-700 bg-white p-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {openingResource ===
                  'Morning-Routine-Ladder-Printable-Cards-Managers.pdf'
                    ? 'Opening…'
                    : 'Manager Strategy Cards'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
                    )
                  }
                  disabled={openingResource !== null}
                  className="rounded-xl border border-teal-700 bg-white p-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {openingResource ===
                  'Morning-Routine-Ladder-Printable-Cards-Parents.pdf'
                    ? 'Opening…'
                    : 'Family Handover Cards'}
                </button>
              </div>

              {resourceError && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold leading-relaxed text-rose-700"
                >
                  {resourceError}
                </p>
              )}
            </section>
          </>
        )}

        {hubView === 'ladders' && (
          <RegulationLadders userEmail={cleanedEmail} />
        )}

        {hubView === 'progress' && (
          <ProgressSummary userEmail={cleanedEmail} />
        )}

        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-amber-950">
            Member Resource Reminder
          </strong>

          <p className="mt-2 text-xs leading-relaxed text-amber-950">
            Regulator Champions resources are provided for use by the
            participating service and its authorised educator team. Please do
            not share your service access code or member-only downloads outside
            your authorised service team.
          </p>
        </section>
      </main>
    </div>
  );
}