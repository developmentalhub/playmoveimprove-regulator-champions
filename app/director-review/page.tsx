'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';

type SubmissionStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

type ProgramOption =
  | 'preview'
  | 'full'
  | 'unsure';

type DirectorEnquiryForm = {
  directorName: string;
  email: string;
  serviceName: string;
  phone: string;
  roomCount: string;
  primaryPressurePoint: string;
  programOption: ProgramOption;
  notes: string;
};

const initialFormData: DirectorEnquiryForm = {
  directorName: '',
  email: '',
  serviceName: '',
  phone: '',
  roomCount: '3-4 Rooms',
  primaryPressurePoint:
    'Drop-off, separation and difficult morning transitions',
  programOption: 'unsure',
  notes: '',
};

const PRESSURE_POINTS = [
  {
    value:
      'Drop-off, separation and difficult morning transitions',
    label:
      'Drop-off, separation and difficult morning transitions',
  },
  {
    value:
      'Children becoming overwhelmed during transitions',
    label:
      'Children becoming overwhelmed during transitions',
  },
  {
    value:
      'Group times and difficulty participating',
    label:
      'Group times and difficulty participating',
  },
  {
    value:
      'Sensory overload, noise and busy room environments',
    label:
      'Sensory overload, noise and busy room environments',
  },
  {
    value:
      'Escalation, shutdown or big emotional responses',
    label:
      'Escalation, shutdown or big emotional responses',
  },
  {
    value:
      'Educators unsure how to respond consistently',
    label:
      'Educators unsure how to respond consistently',
  },
  {
    value:
      'Comfort, connection and professional boundaries',
    label:
      'Comfort, connection and professional boundaries',
  },
  {
    value:
      'Several of these concerns',
    label:
      'Several of these concerns',
  },
  {
    value: 'Other',
    label: 'Something else',
  },
];

export default function DirectorReviewPage() {
  const [formData, setFormData] =
    useState<DirectorEnquiryForm>(
      initialFormData,
    );

  const [
    submissionStatus,
    setSubmissionStatus,
  ] = useState<SubmissionStatus>('idle');

  const [
    submissionMessage,
    setSubmissionMessage,
  ] = useState('');

  const updateField = (
    field: keyof DirectorEnquiryForm,
    value: string,
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const programOptionLabel = (
    option: ProgramOption,
  ) => {
    if (option === 'preview') {
      return '6-Month Preview ($1,790 AUD)';
    }

    if (option === 'full') {
      return '12-Month Regulator Champions ($4,790 AUD)';
    }

    return 'Not sure yet';
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmissionStatus('submitting');
    setSubmissionMessage('');

    try {
      const response = await fetch(
        '/api/director-review',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify({
            formType:
              'public_director_enquiry',

            directorName:
              formData.directorName,

            directorEmail:
              formData.email,

            serviceName:
              formData.serviceName,

            phone:
              formData.phone,

            roomCount:
              formData.roomCount,

            primaryPressurePoint:
              formData.primaryPressurePoint,

            notes: [
              `Regulator Champions option being considered: ${programOptionLabel(
                formData.programOption,
              )}`,
              formData.notes,
            ]
              .filter(Boolean)
              .join('\n\n'),
          }),
        },
      );

      const result =
        await response.json();

      if (
        !response.ok ||
        !result.success
      ) {
        throw new Error(
          result.error ||
            'Your enquiry could not be submitted.',
        );
      }

      setSubmissionStatus('success');

      setSubmissionMessage(
        'Thanks. Your enquiry has been received. I can now look at what your team is experiencing and help you decide whether the 6-Month Preview, 12-Month Regulator Champions option or another starting point makes the most sense.',
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
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 sm:py-20 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-base font-semibold text-[#E4C98E]">
              For directors, owners and early childhood leaders
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              You do not need to work out the answer before you contact me.
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              Tell me what keeps coming back to you, and I can help you work out whether Regulator Champions is actually a useful fit.
            </p>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              You might be dealing with difficult drop-offs, repeated transition problems, children struggling to participate, sensory overload, big emotional responses or educators who are all trying hard but responding in quite different ways.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              You do not need to diagnose the problem, prepare a report or know which package you want. A short description of what your team is experiencing is enough for me to start.
            </p>
          </div>

          <div className="overflow-hidden rounded-4xl border border-white/15 bg-white/5 p-3 shadow-2xl">
            <Image
              src="/images/regulation-training-for-educators.png"
              alt="Early childhood educators exploring practical regulation ideas together"
              width={1400}
              height={1000}
              priority
              sizes="(max-width: 1024px) 100vw, 52vw"
              className="h-auto w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className="border-b border-[#E6E2DC] bg-[#E8D39D]">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-6">
          <div className="grid gap-7 md:grid-cols-3">
            <div className="border-t border-[#A88A52] pt-5">
              <h2 className="text-xl font-extrabold">
                Keep it simple
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[#45564F]">
                You do not need to prepare documents or complete a long assessment before enquiring.
              </p>
            </div>

            <div className="border-t border-[#A88A52] pt-5">
              <h2 className="text-xl font-extrabold">
                Keep it team-level
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[#45564F]">
                Tell me about room patterns, routines and educator priorities rather than identifiable information about individual children.
              </p>
            </div>

            <div className="border-t border-[#A88A52] pt-5">
              <h2 className="text-xl font-extrabold">
                No sales call required
              </h2>

              <p className="mt-3 text-base leading-relaxed text-[#45564F]">
                I can respond with the information or starting point that looks most relevant. Enquiring does not commit you to anything.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* A LITTLE CONTEXT */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                You may already know the pattern
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Sometimes the clue is the situation that keeps returning to leadership.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                It may be the room that keeps asking for help with the same transition. The educator who says they have tried everything. The child whose participation becomes difficult at the same point each day. Or the staff meeting that keeps circling back to regulation and behaviour without the team feeling any clearer about what to do next.
              </p>

              <p>
                Those patterns do not automatically mean your service needs Regulator Champions. They do give us a useful place to begin the conversation, because professional learning is much more valuable when it starts with something your educators are genuinely experiencing.
              </p>

              <p className="font-semibold text-[#1C3B34]">
                You can tell me the pattern. You do not need to arrive with the solution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM AREA */}
      <section className="bg-[#FAF8F5] py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-5 sm:px-6">
          {submissionStatus ===
          'success' ? (
            <section className="border-l-4 border-[#C29F60] bg-white p-7 shadow-sm sm:p-10">
              <p className="text-sm font-semibold text-[#657B6C]">
                Enquiry received
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Thanks,{' '}
                {formData.directorName}.
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#53645D]">
                {submissionMessage}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {formData.programOption !==
                  'unsure' && (
                  <Link
                    href={`/proposal?plan=${formData.programOption}`}
                    className="flex min-h-12 items-center justify-center rounded-xl bg-[#C29F60] px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
                  >
                    View selected proposal
                  </Link>
                )}

                <Link
                  href="/"
                  className="flex min-h-12 items-center justify-center rounded-xl border border-[#D8D0C4] bg-[#FAF8F5] px-6 py-3 text-sm font-bold text-[#1C3B34] transition hover:bg-white"
                >
                  Return to Regulator Champions
                </Link>
              </div>
            </section>
          ) : (
            <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
              {/* LEFT */}
              <aside>
                <p className="text-sm font-semibold text-[#657B6C]">
                  What I want to understand
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                  What keeps becoming difficult for your team?
                </h2>

                <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
                  I am not looking for polished answers. I want to know what your educators are actually finding hard so I can see whether the resources and support inside Regulator Champions match that need.
                </p>

                <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
                  Sometimes that is regulation knowledge. Sometimes the team understands the theory but struggles to apply it in busy rooms. Sometimes the biggest need is shared language, more confident reflection or a practical way to stop the same difficult situation being approached from scratch every time.
                </p>

                <div className="mt-8 border-t border-[#D8CFC2] pt-5">
                  <p className="font-extrabold">
                    Already know what you want?
                  </p>

                  <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                    You can skip this form and look directly at the six-month and twelve-month program options.
                  </p>

                  <Link
                    href="/proposal"
                    className="mt-4 inline-flex font-extrabold text-[#7A6032] underline decoration-[#C29F60] decoration-2 underline-offset-4"
                  >
                    View pricing and program options
                  </Link>
                </div>

                <div className="mt-8 border-t border-[#D8CFC2] pt-5">
                  <p className="font-extrabold">
                    Want to see how I think first?
                  </p>

                  <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                    The free Regulation Ladder gives you a practical example of how the approach widens the conversation beyond one behaviour or one strategy.
                  </p>

                  <Link
                    href="/playbooks"
                    className="mt-4 inline-flex font-extrabold text-[#7A6032] underline decoration-[#C29F60] decoration-2 underline-offset-4"
                  >
                    Open the Free Regulation Ladder
                  </Link>
                </div>
              </aside>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="border-t-4 border-[#C29F60] bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="border-b border-[#E6E2DC] pb-5">
                  <p className="text-sm font-semibold text-[#9A793D]">
                    Short team enquiry
                  </p>

                  <h2 className="mt-2 text-2xl font-extrabold">
                    Tell me a little about your organisation.
                  </h2>

                  <p className="mt-2 text-base leading-relaxed text-[#6A7873]">
                    This should only take a couple of minutes. If you are unsure about an answer, choose the closest option and keep moving.
                  </p>
                </div>

                {submissionStatus ===
                  'error' && (
                  <div
                    role="alert"
                    className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-800"
                  >
                    {submissionMessage}
                  </div>
                )}

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <FormField
                    id="directorName"
                    label="Your name"
                    value={
                      formData.directorName
                    }
                    onChange={(value) =>
                      updateField(
                        'directorName',
                        value,
                      )
                    }
                    autoComplete="name"
                    required
                  />

                  <FormField
                    id="email"
                    label="Work email"
                    value={formData.email}
                    onChange={(value) =>
                      updateField(
                        'email',
                        value,
                      )
                    }
                    type="email"
                    autoComplete="email"
                    placeholder="name@organisation.com"
                    required
                  />

                  <FormField
                    id="serviceName"
                    label="Organisation / centre name"
                    value={
                      formData.serviceName
                    }
                    onChange={(value) =>
                      updateField(
                        'serviceName',
                        value,
                      )
                    }
                    autoComplete="organization"
                    required
                  />

                  <FormField
                    id="phone"
                    label="Phone"
                    optional
                    value={formData.phone}
                    onChange={(value) =>
                      updateField(
                        'phone',
                        value,
                      )
                    }
                    type="tel"
                    autoComplete="tel"
                  />
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="roomCount"
                    className="mb-1.5 block text-sm font-bold"
                  >
                    Approximately how large is your organisation?
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
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                  >
                    <option value="1-2 Rooms">
                      1–2 rooms / classrooms
                    </option>

                    <option value="3-4 Rooms">
                      3–4 rooms / classrooms
                    </option>

                    <option value="5-6 Rooms">
                      5–6 rooms / classrooms
                    </option>

                    <option value="7+ Rooms">
                      7+ rooms / classrooms
                    </option>

                    <option value="Multi-site organisation">
                      Multi-site organisation
                    </option>
                  </select>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="primaryPressurePoint"
                    className="mb-1.5 block text-sm font-bold"
                  >
                    What is currently one of your biggest pressure points?
                  </label>

                  <select
                    id="primaryPressurePoint"
                    name="primaryPressurePoint"
                    value={
                      formData.primaryPressurePoint
                    }
                    onChange={(event) =>
                      updateField(
                        'primaryPressurePoint',
                        event.target.value,
                      )
                    }
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                  >
                    {PRESSURE_POINTS.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="programOption"
                    className="mb-1.5 block text-sm font-bold"
                  >
                    Which option are you currently considering?
                  </label>

                  <select
                    id="programOption"
                    name="programOption"
                    value={
                      formData.programOption
                    }
                    onChange={(event) =>
                      updateField(
                        'programOption',
                        event.target
                          .value as ProgramOption,
                      )
                    }
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                  >
                    <option value="unsure">
                      I&apos;m not sure yet
                    </option>

                    <option value="preview">
                      6-Month Preview — $1,790 AUD
                    </option>

                    <option value="full">
                      12-Month Regulator Champions — $4,790 AUD
                    </option>
                  </select>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    The six-month option gives your team a meaningful implementation period without committing to a full year. The twelve-month option provides more time to revisit the learning, recordings and ongoing support as different needs emerge.
                  </p>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="notes"
                    className="mb-1.5 block text-sm font-bold"
                  >
                    Anything else you want me to know?
                    <span className="ml-1 font-normal text-[#8A9691]">
                      optional
                    </span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={5}
                    maxLength={2000}
                    placeholder="For example, what keeps happening in a room, what your educators are unsure about, or what you would like to feel easier across the team."
                    value={formData.notes}
                    onChange={(event) =>
                      updateField(
                        'notes',
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition placeholder:text-[#8A9691] focus:border-[#657B6C]"
                  />
                </div>

                {/* PRIVACY */}
                <div className="mt-5 border-l-4 border-[#C29F60] bg-[#FAF5EC] p-4">
                  <strong className="block text-sm font-extrabold">
                    Please keep this team-level only.
                  </strong>

                  <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                    Please do not include children&apos;s names, family names, dates of birth, diagnoses, medical information or other identifying details. Room patterns, routines and educator priorities are enough.
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                    Information submitted through this form is handled in accordance with the{' '}
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
                  disabled={
                    submissionStatus ===
                    'submitting'
                  }
                  className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submissionStatus ===
                  'submitting'
                    ? 'Sending your enquiry...'
                    : 'Send my enquiry'}
                </button>

                <p className="mt-4 text-center text-sm leading-relaxed text-[#6A7873]">
                  Sending this form does not enrol your organisation or commit you to purchasing Regulator Champions.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* PROGRAM BRIDGE */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <p className="text-sm font-semibold text-[#E4C98E]">
            Regulator Champions
          </p>

          <h2 className="mt-3 max-w-4xl text-3xl font-extrabold tracking-tight sm:text-4xl">
            The goal is not to give your educators more strategies to remember.
          </h2>

          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
            It is to help your team notice what is happening earlier, understand what may sit underneath behaviour and become more confident deciding what might be useful to try next.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/proposal"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white bg-white px-6 py-3.5 text-sm font-extrabold text-[#1C3B34]"
            >
              View Program Options
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FormField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  autoComplete,
  placeholder,
  required = false,
  optional = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-bold"
      >
        {label}

        {optional && (
          <span className="ml-1 font-normal text-[#8A9691]">
            optional
          </span>
        )}
      </label>

      <input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        maxLength={
          type === 'email'
            ? 254
            : id === 'serviceName'
              ? 200
              : 150
        }
        placeholder={placeholder}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition placeholder:text-[#8A9691] focus:border-[#657B6C]"
      />
    </div>
  );
}