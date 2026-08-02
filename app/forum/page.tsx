'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

const sampleTopics = [
  {
    id: 'transitions',
    category: 'Transitions',
    question:
      'Why does a child appear settled during play but become distressed when it is time to move to lunch?',
    insight:
      'The difficulty may not be the lunch routine itself. The child may be struggling to stop an activity, shift attention, process several instructions and organise their body for the next step. Reducing language, adding predictable cues and giving the child a meaningful transition role may support participation.',
  },
  {
    id: 'mat-time',
    category: 'Group Experiences',
    question:
      'Does listening always need to look like sitting still during mat time?',
    insight:
      'Children may listen while changing position, holding an object, standing nearby or briefly moving away and returning. Participation can be supported by adjusting the length, movement opportunities and expectations of the group experience.',
  },
  {
    id: 'rough-play',
    category: 'Rough and Physical Play',
    question:
      'How can educators support rough play without allowing children to hurt each other?',
    insight:
      'Strong movement and physical play can meet developmental and sensory needs. Educators can create clear boundaries around consent, body signals, safe spaces, stopping rules and what kinds of contact are appropriate.',
  },
];

export default function FreeRegulationToolsPage() {
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [roomCategory, setRoomCategory] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [privacyConfirmed, setPrivacyConfirmed] = useState(false);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

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

    if (!supabase) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'The topic form is not connected yet. Check the Supabase environment variables.',
      );
      return;
    }

    setSubmissionStatus('submitting');

    const { error } = await supabase.from('community_questions').insert({
      author_name: cleanedName,
      role: authorRole || null,
      service_name: serviceName.trim() || null,
      category: roomCategory || null,
      question: cleanedQuestion,
      publication_status: 'pending',
    });

    if (error) {
      console.error('Topic suggestion submission failed:', error);

      setSubmissionStatus('error');
      setSubmissionMessage(
        'Your topic could not be submitted. Please try again or contact Robyn if the problem continues.',
      );
      return;
    }

    setSubmissionStatus('success');
    setSubmissionMessage(
      'Thank you. Your suggestion has been added to the private topic queue for consideration.',
    );

    setQuestionText('');
    setPrivacyConfirmed(false);
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

            <h1 className="text-xl font-bold md:text-2xl">
              Free Regulation Tools
            </h1>
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

          <h2 className="text-2xl font-bold text-slate-900 md:text-4xl">
            Notice What May Be Adding Pressure to the Room
          </h2>

          <p className="text-sm leading-relaxed text-slate-600 md:text-base">
            These free reflective tools help early childhood teams consider
            their environment, routines, movement opportunities and adult
            responses. They are designed as professional learning prompts, not
            child assessments.
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
                  Consider furniture placement, busy pathways, bottlenecks and
                  spaces where children may regularly collide, wait or become
                  overwhelmed.
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
                  Reflect on noise, visual load, lighting, waiting, transitions
                  and environmental demands that may be making participation
                  harder.
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
                  Reflect on adult presence, regulation language and the
                  movement opportunities available to children throughout the
                  day.
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

          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-center">
            <p className="text-sm leading-relaxed text-slate-600">
              These tools provide general professional reflection only. They do
              not diagnose a child or replace individual assessment by an
              appropriately qualified professional.
            </p>
          </div>
        </section>

        {/* SAMPLE LEARNING TOPICS */}
        <section className="space-y-8">
          <div className="mx-auto max-w-3xl space-y-3 text-center">
            <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
              Practical Examples
            </span>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Sample Regulation Learning Topics
            </h2>

            <p className="text-sm leading-relaxed text-slate-600 md:text-base">
              These general examples show how familiar room challenges can be
              explored through development, regulation and practical change.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {sampleTopics.map((topic) => (
              <article
                key={topic.id}
                className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-800">
                  {topic.category}
                </span>

                <h3 className="text-base font-bold leading-relaxed text-slate-900">
                  {topic.question}
                </h3>

                <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
                  <p className="text-sm leading-relaxed text-teal-950">
                    {topic.insight}
                  </p>
                </div>
              </article>
            ))}
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
              Explore practical regulation, movement and child-development
              ideas through Robyn’s social content and video demonstrations.
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
              Submit a general question for possible inclusion in a future
              public resource, social post or Regulator Champions learning
              topic. Individual advice or a personal response is not
              guaranteed.
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
                  Suggestions are reviewed privately. They are not automatically
                  published with your name or centre details.
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
                      <option value="Toddlers">Toddlers</option>
                      <option value="Preschool and Kindergarten">
                        Preschool and Kindergarten
                      </option>
                      <option value="Whole Centre">
                        Whole Centre
                      </option>
                      <option value="Leadership">Leadership</option>
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
                        setPrivacyConfirmed(event.target.checked)
                      }
                      className="mt-1 h-4 w-4 rounded border-amber-400 text-teal-700 focus:ring-teal-600"
                    />

                    <span>
                      I confirm that I have not included children’s or
                      families’ names, dates of birth, diagnoses or other
                      identifying information.
                    </span>
                  </label>
                </div>

                <p className="text-xs leading-relaxed text-slate-500">
                  Submissions are reviewed privately and are not automatically
                  published. Play Move Improve may rewrite or combine general
                  themes before using them in public educational content.
                </p>

                <button
                  type="submit"
                  disabled={submissionStatus === 'submitting'}
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