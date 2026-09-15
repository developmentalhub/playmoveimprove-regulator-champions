'use client';

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
        'Thanks. Your enquiry has been received. Robyn can now look at what your team is experiencing and help you decide whether the 6-Month Preview, 12-Month Regulator Champions option or another starting point makes the most sense.',
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
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
          <div className="max-w-4xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              For directors, owners and early childhood leaders
            </p>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Not sure whether Regulator Champions is the right fit for your team?
            </h1>

            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#D8E1DC]">
              Tell me what your educators are finding difficult at the moment. You do not need to know exactly what you want before getting in touch.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#BFD0C8]">
              This is a short team-level enquiry so I can understand the patterns you are seeing and whether Regulator Champions, the Regulation Cards or another starting point looks most useful.
            </p>
          </div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-9 sm:px-6">
          <div className="grid gap-7 sm:grid-cols-3">
            <div className="border-t border-[#D8CFC2] pt-5">
              <h2 className="text-lg font-extrabold">
                Keep it simple
              </h2>

              <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                You do not need to prepare documents or complete a long assessment before enquiring.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2] pt-5">
              <h2 className="text-lg font-extrabold">
                Team level only
              </h2>

              <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                Tell me about room patterns, routines and educator priorities rather than identifiable information about individual children.
              </p>
            </div>

            <div className="border-t border-[#D8CFC2] pt-5">
              <h2 className="text-lg font-extrabold">
                No sales call required
              </h2>

              <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                I can respond with the most relevant information or next step for your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM AREA */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          {submissionStatus ===
          'success' ? (
            <section className="border-l-4 border-[#C29F60] bg-white p-7 sm:p-10">
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
            <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
              {/* LEFT */}
              <aside>
                <p className="text-sm font-semibold text-[#657B6C]">
                  What I want to understand
                </p>

                <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                  What keeps becoming difficult for your team?
                </h2>

                <p className="mt-5 text-base leading-relaxed text-[#53645D]">
                  Regulator Champions works best when professional learning starts with something educators are genuinely experiencing rather than simply choosing another training topic.
                </p>

                <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                  You might be seeing difficult drop-offs, dysregulated transitions, children struggling to participate, sensory overload, repeated escalation or educators who are no longer confident about how to respond consistently.
                </p>

                <div className="mt-7 border-t border-[#D8CFC2] pt-5">
                  <p className="font-extrabold">
                    Already know what you want?
                  </p>

                  <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                    You can skip this form and go directly to the program proposal page.
                  </p>

                  <Link
                    href="/proposal"
                    className="mt-4 inline-flex font-extrabold text-[#9A793D] underline decoration-[#C29F60] decoration-2 underline-offset-4"
                  >
                    View pricing and proposal
                  </Link>
                </div>

                <div className="mt-7 border-t border-[#D8CFC2] pt-5">
                  <p className="font-extrabold">
                    Want to see the approach first?
                  </p>

                  <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                    The free Regulation Ladder lets you see the educator, leadership and family perspectives before deciding whether you need the broader program.
                  </p>

                  <Link
                    href="/playbooks"
                    className="mt-4 inline-flex font-extrabold text-[#9A793D] underline decoration-[#C29F60] decoration-2 underline-offset-4"
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
                    Most directors can complete this in a couple of minutes.
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
                    The six-month option is a smaller starting point. The twelve-month option gives your team longer to return to the Regulation Ladders, recordings and ongoing support.
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
                    placeholder="For example, what your educators are finding difficult, an identified professional learning priority or what you would like to see change across the team."
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
            It is to help your team notice what is happening earlier, understand what may sit underneath behaviour and make more thoughtful decisions together.
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
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
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