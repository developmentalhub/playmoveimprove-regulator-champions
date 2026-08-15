'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { practiceScenarios } from '../../lib/practiceScenarios';

type SubmissionStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

export default function FreeRegulationToolsPage() {
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [roomCategory, setRoomCategory] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [privacyConfirmed, setPrivacyConfirmed] =
    useState(false);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');

  const [submissionMessage, setSubmissionMessage] =
    useState('');

  const handleQuestionSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanedName = authorName.trim();
    const cleanedQuestion = questionText.trim();

    setSubmissionMessage('');

    if (!cleanedName || !cleanedQuestion) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Add your name and general topic before submitting.',
      );
      return;
    }

    if (cleanedQuestion.length < 20) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Please add a little more detail about the general topic.',
      );
      return;
    }

    if (!privacyConfirmed) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Please confirm that you have not included identifying child or family information.',
      );
      return;
    }

    setSubmissionStatus('submitting');

    try {
      const response = await fetch('/api/community-topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          authorName: cleanedName,
          authorRole,
          serviceName,
          roomCategory,
          questionText: cleanedQuestion,
          privacyConfirmed: true,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            'Your topic could not be submitted.',
        );
      }

      setSubmissionStatus('success');
      setSubmissionMessage(
        'Thank you. Your suggestion has been added to the private topic queue for consideration.',
      );

      setQuestionText('');
      setPrivacyConfirmed(false);
    } catch (error) {
      console.error(
        'Topic suggestion submission failed:',
        error,
      );

      setSubmissionStatus('error');
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : 'Your topic could not be submitted. Please try again.',
      );
    }
  };

  const resetForm = () => {
    setSubmissionStatus('idle');
    setSubmissionMessage('');
    setQuestionText('');
    setPrivacyConfirmed(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 font-sans text-slate-800">
      <header className="border-b border-teal-700 bg-teal-800 px-6 py-6 text-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-200">
              Play Move Improve
            </span>

            <span className="text-xl font-bold md:text-2xl">
              Free Regulation Tools
            </span>
          </div>

          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-teal-100 transition hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            Return Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-16 p-4 md:p-8">
        {/* INTRODUCTION */}
        <section className="mx-auto max-w-3xl space-y-4 text-center">
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
            Start With a Practical Check
          </span>

          <h1 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Free Regulation Tools for Early Childhood Educators
          </h1>

          <h2 className="text-lg font-bold text-teal-900 md:text-xl">
            Notice What May Be Adding Pressure to the Room
          </h2>

          <p className="text-sm leading-relaxed text-slate-600 md:text-base">
            These free reflective tools help early childhood teams
            consider their environment, routines, movement
            opportunities and adult responses. They are designed as
            professional learning prompts, not child assessments.
          </p>
        </section>

        {/* FREE TOOLS */}
        <section className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="flex flex-col justify-between space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">
                  Room Layout and Movement
                </span>

                <h3 className="text-lg font-bold text-slate-900">
                  Classroom Screening Tool
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  Consider furniture placement, busy pathways,
                  bottlenecks and spaces where children may regularly
                  collide, wait or become overwhelmed.
                </p>
              </div>

              <a
                href="https://classroom-screening-tool.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-teal-700 py-3.5 text-center text-sm font-bold text-white shadow transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
              >
                Open the Room Layout Check
              </a>
            </article>

            <article className="flex flex-col justify-between space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">
                  Sensory Environment and Routines
                </span>

                <h3 className="text-lg font-bold text-slate-900">
                  Environment Check
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  A professional observation tool used by Play Move
                  Improve during service-based environmental review.
                  It is not intended to diagnose children or replace
                  individual assessment.
                </p>
              </div>

              <a
                href="https://playmoveimprove-environment-check.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-teal-700 py-3.5 text-center text-sm font-bold text-white shadow transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
              >
                Open the Environment Check
              </a>
            </article>

            <article className="flex flex-col justify-between space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="space-y-3">
                <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">
                  Educator Practice and Movement
                </span>

                <h3 className="text-lg font-bold text-slate-900">
                  Play Move Improve Check
                </h3>

                <p className="text-sm leading-relaxed text-slate-600">
                  A structured observation tool for noticing patterns
                  across movement, participation and classroom routines.
                  Avoid entering names, initials or other identifying
                  child information unless the tool has a clearly
                  documented secure purpose and privacy process.
                </p>
              </div>

              <a
                href="https://playmoveimprove-check.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-xl bg-teal-700 py-3.5 text-center text-sm font-bold text-white shadow transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
              >
                Open the Practice Check
              </a>
            </article>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
            <strong className="block text-sm font-bold text-amber-950">
              Protect child and family privacy when using observation tools
            </strong>

            <p className="mt-2 text-sm leading-relaxed text-amber-950">
              Keep free online reflection tools focused on room patterns,
              routines, environments and educator practice. Do not enter
              children&apos;s names, initials, dates of birth, diagnoses,
              medical information or other identifying details unless a
              specific secure process has been established for that purpose.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-sm leading-relaxed text-slate-600">
              These tools provide general professional reflection
              only. They do not diagnose a child or replace individual
              assessment by an appropriately qualified professional.
            </p>
          </div>
        </section>

        {/* PRACTICE SCENARIOS */}
        <section className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
              Reflective Practice Scenarios
            </span>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Real Room Moments to Explore With Your Team
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              Work through familiar early childhood situations by
              comparing the common response with a more reflective,
              regulation-informed approach.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7">
            {practiceScenarios.map((scenario, index) => (
              <article
                key={scenario.id}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  <div className="relative min-h-64 overflow-hidden bg-slate-100 lg:col-span-4 lg:min-h-full">
                    <img
                      src={scenario.image}
                      alt={scenario.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                      <span className="rounded-full bg-teal-900 px-3 py-1 text-xs font-bold text-white shadow">
                        Scenario {index + 1}
                      </span>

                      <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-teal-900 shadow">
                        {scenario.ageGroup}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6 p-6 md:p-8 lg:col-span-8">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900 md:text-2xl">
                        {scenario.title}
                      </h3>

                      <p className="text-sm font-medium leading-relaxed text-slate-600">
                        {scenario.summary}
                      </p>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                      <strong className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        The Situation
                      </strong>

                      <p className="text-sm leading-relaxed text-slate-700">
                        {scenario.situation}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="space-y-2 rounded-2xl border border-rose-200 bg-rose-50 p-5">
                        <strong className="block text-xs font-bold uppercase tracking-wider text-rose-900">
                          Common Response
                        </strong>

                        <p className="text-sm leading-relaxed text-rose-950">
                          {scenario.commonResponse}
                        </p>
                      </div>

                      <div className="space-y-2 rounded-2xl border border-teal-200 bg-teal-50 p-5">
                        <strong className="block text-xs font-bold uppercase tracking-wider text-teal-900">
                          More Reflective Response
                        </strong>

                        <p className="text-sm leading-relaxed text-teal-950">
                          {scenario.reflectiveResponse}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                      <strong className="block text-xs font-bold uppercase tracking-wider text-amber-900">
                        Why It Matters
                      </strong>

                      <p className="text-sm leading-relaxed text-amber-950">
                        {scenario.whyItMatters}
                      </p>
                    </div>

                    <div className="space-y-2 rounded-2xl bg-teal-900 p-5 text-white">
                      <strong className="block text-xs font-bold uppercase tracking-wider text-teal-200">
                        Discuss With Your Team
                      </strong>

                      <p className="text-sm font-semibold leading-relaxed text-white">
                        {scenario.reflectionPrompt}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-teal-200 bg-teal-50 p-6 md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Related Free Learning
          </span>

          <h2 className="mt-1 text-2xl font-bold text-teal-950">
            Continue exploring regulation and co-regulation
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Link
              href="/free-guide"
              className="rounded-xl bg-teal-800 px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-teal-900"
            >
              Free Regulation Guide →
            </Link>

            <Link
              href="/somatic-checkin"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Somatic Check-In →
            </Link>

            <Link
              href="/co-regulation-early-childhood"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Co-Regulation Guide →
            </Link>

            <Link
              href="/emotional-regulation-early-childhood"
              className="rounded-xl border border-teal-300 bg-white px-4 py-3 text-center text-xs font-bold text-teal-950 transition hover:bg-teal-100"
            >
              Emotional Regulation Guide →
            </Link>
          </div>
        </section>

        {/* SOCIAL */}
        <section className="rounded-3xl bg-teal-900 p-8 text-white md:p-12">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <span className="inline-block rounded-full bg-teal-800 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-teal-200">
              More Practical Ideas
            </span>

            <h2 className="text-2xl font-bold md:text-3xl">
              Follow Play Move Improve
            </h2>

            <p className="text-sm leading-relaxed text-teal-100">
              Explore practical regulation, movement and
              child-development ideas through Robyn’s social content
              and video demonstrations.
            </p>

            <a
              href="https://www.instagram.com/playmoveimprove"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-teal-950 shadow transition hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-teal-900"
            >
              Visit @playmoveimprove on Instagram
            </a>
          </div>
        </section>

        <section className="rounded-3xl bg-slate-900 p-7 text-center text-white md:p-9">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Regulator Champions
          </span>

          <h2 className="mt-2 text-2xl font-bold">
            Want to take these ideas into whole-team practice?
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-300">
            Start with the 3-Ladder Preview for $1,790 including GST and six
            months of access, or choose the full 8-Ladder pathway for $4,790
            including GST and 12 months of access.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="rounded-xl bg-amber-400 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-300"
            >
              3-Ladder Preview — $1,790 →
            </Link>

            <Link
              href="/proposal?plan=full"
              className="rounded-xl border border-slate-600 bg-slate-800 px-5 py-3 text-xs font-bold text-white transition hover:bg-slate-700"
            >
              Full 8-Ladder Pathway — $4,790 →
            </Link>
          </div>
        </section>

        {/* TOPIC SUGGESTION */}
        <section className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
              Help Shape Future Learning
            </span>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Suggest a General Regulation Topic
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              Submit a general question for possible inclusion in a
              future public resource, social post or Regulator
              Champions learning topic. Individual advice or a
              personal response is not guaranteed.
            </p>
          </div>

          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            {submissionStatus === 'success' ? (
              <div
                role="status"
                className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center text-emerald-950"
              >
                <h3 className="text-lg font-bold">
                  Topic suggestion received
                </h3>

                <p className="text-sm leading-relaxed">
                  {submissionMessage}
                </p>

                <p className="text-sm leading-relaxed">
                  Suggestions are reviewed privately. They are not
                  automatically published with your name or centre
                  details.
                </p>

                <button
                  type="button"
                  onClick={resetForm}
                  className="font-bold text-teal-800 underline"
                >
                  Suggest another topic
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleQuestionSubmit}
                className="space-y-5"
              >
                {submissionStatus === 'error' && (
                  <div
                    role="alert"
                    className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-900"
                  >
                    {submissionMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="authorName"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Your Name
                    </label>

                    <input
                      id="authorName"
                      name="authorName"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={150}
                      value={authorName}
                      onChange={(event) =>
                        setAuthorName(event.target.value)
                      }
                      placeholder="e.g. Sarah"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="authorRole"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Your Role
                    </label>

                    <select
                      id="authorRole"
                      name="authorRole"
                      value={authorRole}
                      onChange={(event) =>
                        setAuthorRole(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      <option value="">Select your role</option>
                      <option value="Educator">Educator</option>
                      <option value="Room Leader">Room Leader</option>
                      <option value="Early Childhood Teacher">
                        Early Childhood Teacher
                      </option>
                      <option value="Educational Leader">
                        Educational Leader
                      </option>
                      <option value="Centre Director">
                        Centre Director
                      </option>
                      <option value="Approved Provider">
                        Approved Provider
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="serviceName"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Centre Name (Optional)
                    </label>

                    <input
                      id="serviceName"
                      name="serviceName"
                      type="text"
                      maxLength={200}
                      value={serviceName}
                      onChange={(event) =>
                        setServiceName(event.target.value)
                      }
                      placeholder="Your service name"
                      className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="roomCategory"
                      className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                    >
                      Relevant Area (Optional)
                    </label>

                    <select
                      id="roomCategory"
                      name="roomCategory"
                      value={roomCategory}
                      onChange={(event) =>
                        setRoomCategory(event.target.value)
                      }
                      className="w-full rounded-xl border border-slate-300 bg-white px-3 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                    >
                      <option value="">Select an area</option>
                      <option value="Babies and Nursery">
                        Babies and Nursery
                      </option>
                      <option value="Toddlers">
                        Toddlers
                      </option>
                      <option value="Preschool and Kindergarten">
                        Preschool and Kindergarten
                      </option>
                      <option value="Whole Centre">
                        Whole Centre
                      </option>
                      <option value="Leadership">
                        Leadership
                      </option>
                      <option value="Family Communication">
                        Family Communication
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="questionText"
                    className="mb-1 block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    General Topic or Question
                  </label>

                  <textarea
                    id="questionText"
                    name="questionText"
                    rows={5}
                    required
                    minLength={20}
                    maxLength={2000}
                    value={questionText}
                    onChange={(event) =>
                      setQuestionText(event.target.value)
                    }
                    placeholder="Describe the general routine or regulation topic you would like Robyn to consider. Do not include identifying information."
                    className="w-full rounded-xl border border-slate-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-teal-600"
                  />
                </div>

                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <label className="flex items-start gap-3 text-sm leading-relaxed text-amber-950">
                    <input
                      type="checkbox"
                      checked={privacyConfirmed}
                      onChange={(event) =>
                        setPrivacyConfirmed(
                          event.target.checked,
                        )
                      }
                      className="mt-1 h-4 w-4 rounded border-amber-400 text-teal-700 focus:ring-teal-600"
                    />

                    <span>
                      I confirm that I have not included children’s or
                      families’ names, dates of birth, diagnoses or
                      other identifying information.
                    </span>
                  </label>
                </div>

                <p className="text-xs leading-relaxed text-slate-500">
                  Submissions are reviewed privately and are not
                  automatically published. Play Move Improve may rewrite
                  or combine general themes before using them in public
                  educational content. Information submitted here is
                  handled in accordance with the{' '}
                  <Link
                    href="/privacy"
                    className="font-bold text-teal-800 underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>

                <button
                  type="submit"
                  disabled={
                    submissionStatus === 'submitting'
                  }
                  className="w-full rounded-xl bg-teal-700 py-3.5 text-sm font-bold text-white shadow transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
                >
                  {submissionStatus === 'submitting'
                    ? 'Submitting Topic...'
                    : 'Submit a Topic Suggestion'}
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}