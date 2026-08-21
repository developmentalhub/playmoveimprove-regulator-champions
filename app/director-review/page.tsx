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
      return '3 Ladder Preview ($1,790 incl. GST)';
    }

    if (option === 'full') {
      return 'Full 8 Ladder Pathway ($4,790 incl. GST)';
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
              `Regulator Champions pathway being considered: ${programOptionLabel(
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
        'Thanks. Your service enquiry has been received. Robyn can now look at what your team is experiencing and help you decide whether the 3 Ladder Preview or Full 8 Ladder Pathway is the more sensible starting point.',
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
            <span className="inline-flex rounded-full border border-[#C29F60]/40 bg-[#C29F60]/10 px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest text-[#E4C98E]">
              For directors and service leaders
            </span>

            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Not sure which Regulator
              Champions pathway is right for
              your service?
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#D8E1DC] sm:text-lg">
              Tell me what your educators
              are finding difficult at the
              moment. You do not need to know
              exactly what you want before
              getting in touch.
            </p>

            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#BFD0C8]">
              This is simply a short
              service-level enquiry so I can
              understand the pressure points
              you are seeing and whether
              Regulator Champions looks like
              the right fit.
            </p>
          </div>
        </div>
      </section>

      {/* REASSURANCE */}
      <section className="border-b border-[#E6E2DC] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Keep it simple
              </span>

              <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                You do not need to prepare
                documents or complete a long
                assessment before enquiring.
              </p>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                Service level only
              </span>

              <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                Tell me about room patterns
                and educator priorities, not
                individual children.
              </p>
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#9A793D]">
                No sales call required
              </span>

              <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                I can respond with the most
                relevant information and next
                step for your service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM AREA */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          {submissionStatus ===
          'success' ? (
            <section className="rounded-4xl border border-[#B9D1C5] bg-white p-7 text-center shadow-sm sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF4F0] text-xl font-extrabold text-[#1C3B34]">
                ✓
              </div>

              <span className="mt-5 block text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                Enquiry received
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
                Thanks,{' '}
                {formData.directorName}.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#53645D]">
                {submissionMessage}
              </p>

              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
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
                  Return to Regulator
                  Champions
                </Link>
              </div>
            </section>
          ) : (
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
              {/* LEFT CONTEXT */}
              <aside>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
                  What I want to understand
                </span>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1C3B34]">
                  What is becoming difficult
                  in your rooms?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                  Regulator Champions works
                  best when it starts with
                  something educators are
                  genuinely experiencing,
                  rather than professional
                  learning being chosen
                  because a funding deadline
                  is approaching.
                </p>

                <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                  You might be seeing
                  difficult drop-offs,
                  dysregulated transitions,
                  children struggling to
                  participate, sensory
                  overload or a team that is
                  no longer confident about
                  how to respond consistently.
                </p>

                <div className="mt-6 rounded-3xl bg-[#FAF5EC] p-5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9A793D]">
                    You can also skip this
                    form
                  </span>

                  <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                    If you already know which
                    pathway you want, you can
                    go straight to the
                    proposal page.
                  </p>

                  <Link
                    href="/proposal"
                    className="mt-4 inline-flex text-sm font-extrabold text-[#1C3B34]"
                  >
                    View pricing and proposal
                    →
                  </Link>
                </div>
              </aside>

              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="border-b border-[#E6E2DC] pb-5">
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#9A793D]">
                    Short service enquiry
                  </span>

                  <h2 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                    Tell me a little about
                    your service.
                  </h2>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    Most directors can
                    complete this in a couple
                    of minutes.
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
                  <div>
                    <label
                      htmlFor="directorName"
                      className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                    >
                      Your name
                    </label>

                    <input
                      id="directorName"
                      name="directorName"
                      type="text"
                      required
                      autoComplete="name"
                      maxLength={150}
                      value={
                        formData.directorName
                      }
                      onChange={(event) =>
                        updateField(
                          'directorName',
                          event.target.value,
                        )
                      }
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                    >
                      Work email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      maxLength={254}
                      placeholder="director@service.com.au"
                      value={formData.email}
                      onChange={(event) =>
                        updateField(
                          'email',
                          event.target.value,
                        )
                      }
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition placeholder:text-[#8A9691] focus:border-[#657B6C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="serviceName"
                      className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                    >
                      Service name
                    </label>

                    <input
                      id="serviceName"
                      name="serviceName"
                      type="text"
                      required
                      autoComplete="organization"
                      maxLength={200}
                      value={
                        formData.serviceName
                      }
                      onChange={(event) =>
                        updateField(
                          'serviceName',
                          event.target.value,
                        )
                      }
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                    >
                      Phone
                      <span className="ml-1 font-normal text-[#8A9691]">
                        optional
                      </span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      maxLength={50}
                      value={formData.phone}
                      onChange={(event) =>
                        updateField(
                          'phone',
                          event.target.value,
                        )
                      }
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="roomCount"
                    className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                  >
                    Approximately how many
                    rooms does your service
                    have?
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
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                  >
                    <option value="1-2 Rooms">
                      1–2 rooms
                    </option>

                    <option value="3-4 Rooms">
                      3–4 rooms
                    </option>

                    <option value="5-6 Rooms">
                      5–6 rooms
                    </option>

                    <option value="7+ Rooms">
                      7+ rooms
                    </option>

                    <option value="Multi-site organisation">
                      Multi-site organisation
                    </option>
                  </select>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="primaryPressurePoint"
                    className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                  >
                    What is currently one of
                    your biggest pressure
                    points?
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
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
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
                    className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                  >
                    Which pathway are you
                    currently considering?
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
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                  >
                    <option value="unsure">
                      I&apos;m not sure yet
                    </option>

                    <option value="preview">
                      3 Ladder Preview —
                      $1,790 incl. GST
                    </option>

                    <option value="full">
                      Full 8 Ladder Pathway —
                      $4,790 incl. GST
                    </option>
                  </select>

                  <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                    The Preview provides six
                    months of whole-service
                    access. The Full 8 Ladder
                    Pathway provides 12
                    months.
                  </p>
                </div>

                <div className="mt-5">
                  <label
                    htmlFor="notes"
                    className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                  >
                    Anything else you want me
                    to know?
                    <span className="ml-1 font-normal text-[#8A9691]">
                      optional
                    </span>
                  </label>

                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    maxLength={2000}
                    placeholder="For example, what your educators are finding difficult, an identified professional learning priority or what you would like to see change across the service."
                    value={formData.notes}
                    onChange={(event) =>
                      updateField(
                        'notes',
                        event.target.value,
                      )
                    }
                    className="w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition placeholder:text-[#8A9691] focus:border-[#657B6C]"
                  />
                </div>

                {/* PRIVACY */}
                <div className="mt-5 rounded-2xl border border-[#C29F60]/35 bg-[#FAF5EC] p-4">
                  <strong className="block text-xs font-extrabold text-[#1C3B34]">
                    Please keep this
                    service-level only.
                  </strong>

                  <p className="mt-2 text-xs leading-relaxed text-[#53645D]">
                    Please do not include
                    children&apos;s names,
                    family names, dates of
                    birth, diagnoses, medical
                    information or other
                    identifying details. Room
                    patterns, routines and
                    educator priorities are
                    enough.
                  </p>

                  <p className="mt-2 text-xs leading-relaxed text-[#53645D]">
                    Information submitted
                    through this form is
                    handled in accordance
                    with the{' '}
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
                  className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submissionStatus ===
                  'submitting'
                    ? 'Sending your enquiry...'
                    : 'Send my service enquiry'}
                </button>

                <p className="mt-4 text-center text-xs leading-relaxed text-[#6A7873]">
                  Sending this form does not
                  enrol your service or
                  commit you to purchasing
                  Regulator Champions.
                </p>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* PROGRAM BRIDGE */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-5xl px-5 text-center sm:px-6">
          <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#E4C98E]">
            Regulator Champions
          </span>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            The goal is not to give your
            educators more strategies to
            remember.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#D8E1DC]">
            It is to help your team notice
            what is happening earlier,
            understand what may sit
            underneath behaviour and make
            more thoughtful decisions
            together.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              View the 3 Ladder Preview
            </Link>

            <Link
              href="/"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore Regulator Champions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}