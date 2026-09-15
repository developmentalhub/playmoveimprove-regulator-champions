'use client';

import React, {
  FormEvent,
  useState,
} from 'react';
import Link from 'next/link';

type FormStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

type ApiResponse = {
  success?: boolean;
  message?: string;
  downloadUrl?: string;
};

const GUIDE_FEATURES = [
  {
    title: 'Pause',
    text:
      'Notice your own reaction, uncertainty or urgency before deciding what the child needs from you.',
  },
  {
    title: 'Notice',
    text:
      'Look at what this individual child is communicating through their body, behaviour and proximity.',
  },
  {
    title: 'Respond',
    text:
      'Choose a thoughtful response that keeps warmth, safety and professional boundaries together.',
  },
];

const GUIDE_CONTENT = [
  {
    title: 'Child cues',
    text:
      'Think about what the individual child is communicating rather than relying on a blanket rule about physical comfort.',
  },
  {
    title: 'Educator awareness',
    text:
      'Notice when fear, rushing, uncertainty or previous experiences may be shaping the adult response.',
  },
  {
    title: 'Professional boundaries',
    text:
      'Keep physical contact purposeful, appropriate, responsive to the child and consistent with your organisation’s expectations and local requirements.',
  },
  {
    title: 'Team reflection',
    text:
      'Use the guide to create clearer conversations about what safe, warm and responsive care looks like in your own setting.',
  },
];

const BROADER_MOMENTS = [
  {
    title: 'A child freezes at drop-off',
    text:
      'Is this refusal, uncertainty, overwhelm, separation distress or a child whose body needs more time?',
  },
  {
    title:
      'A child cannot stay with group time',
    text:
      'Are we looking only at behaviour, or also considering movement, sensory needs, attention and participation?',
  },
  {
    title:
      'The room becomes louder late in the day',
    text:
      'Do we keep adding instructions, or notice that children and educators may both be running out of capacity?',
  },
];

export default function FreeGuidePage() {
  const [status, setStatus] =
    useState<FormStatus>('idle');

  const [message, setMessage] =
    useState('');

  const [downloadUrl, setDownloadUrl] =
    useState(
      '/pdf/Safe-Touch-Early-Childhood-Guide.pdf',
    );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setStatus('submitting');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(
        formData.get('name') || '',
      ),

      email: String(
        formData.get('email') || '',
      ),

      organisationName: String(
        formData.get('organisationName') ||
          '',
      ),

      role: String(
        formData.get('role') || '',
      ),

      consentToContact:
        formData.get('consentToContact') ===
        'yes',

      guide:
        'safe-touch-early-childhood',
    };

    try {
      const response = await fetch(
        '/api/download-lead-guide',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(payload),
        },
      );

      const result =
        (await response.json()) as ApiResponse;

      if (
        !response.ok ||
        result.success !== true
      ) {
        throw new Error(
          result.message ||
            'Your guide could not be prepared. Please try again.',
        );
      }

      setDownloadUrl(
        result.downloadUrl ||
          '/pdf/Safe-Touch-Early-Childhood-Guide.pdf',
      );

      setMessage(
        result.message ||
          'Thank you. Your guide and printable checklist are ready.',
      );

      setStatus('success');
      form.reset();
    } catch (error) {
      console.error(
        'Free guide request failed:',
        error,
      );

      setStatus('error');

      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      {/* HERO */}
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 md:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div>
            <p className="text-base font-semibold text-[#E4C98E]">
              Free guide for early childhood teams
            </p>

            <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.06] tracking-tight sm:text-5xl">
              Can I still comfort a distressed child?
            </h1>

            <p className="mt-5 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
              A thoughtful guide to safe,
              appropriate touch in early
              childhood.
            </p>

            <p className="mt-6 max-w-3xl text-lg leading-7 text-[#D8E1DC]">
              I wrote this after hearing more
              educators second-guess what to do
              when a child is crying, reaching
              for comfort or struggling through
              a difficult moment.
            </p>

            <p className="mt-4 max-w-3xl text-base leading-7 text-[#D8E1DC]">
              Protecting children matters. So
              does remaining emotionally
              available to them. This guide
              helps teams think about how
              safety, professional boundaries,
              the individual child and warm
              responsive care can sit alongside
              each other.
            </p>

            <div className="mt-9 border-y border-white/20 md:grid md:grid-cols-3">
              {GUIDE_FEATURES.map(
                (feature, index) => (
                  <div
                    key={feature.title}
                    className={`py-6 md:px-5 ${
                      index > 0
                        ? 'border-t border-white/20 md:border-l md:border-t-0'
                        : ''
                    }`}
                  >
                    <h2 className="text-xl font-extrabold">
                      {feature.title}
                    </h2>

                    <p className="mt-3 text-base leading-relaxed text-[#C8D6D0]">
                      {feature.text}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* DOWNLOAD */}
          <div
            id="download"
            className="border-t-4 border-[#C29F60] bg-white p-6 text-[#1C3B34] shadow-xl sm:p-8"
          >
            {status !== 'success' ? (
              <>
                <p className="text-sm font-semibold text-[#9A793D]">
                  Get the free resource
                </p>

                <h2 className="mt-2 text-2xl font-extrabold leading-tight">
                  Send me the guide
                </h2>

                <p className="mt-3 text-base leading-6 text-[#6A7873]">
                  Complete the short form and
                  you can open both the full
                  guide and printable staff
                  checklist immediately.
                </p>

                <form
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-4"
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-bold"
                    >
                      Your name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-bold"
                    >
                      Work email
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@yourorganisation.com"
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition placeholder:text-[#8A9691] focus:border-[#657B6C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="organisationName"
                      className="mb-1.5 block text-sm font-bold"
                    >
                      Centre or organisation
                      <span className="ml-1 font-normal text-[#8A9691]">
                        optional
                      </span>
                    </label>

                    <input
                      id="organisationName"
                      name="organisationName"
                      type="text"
                      autoComplete="organization"
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="role"
                      className="mb-1.5 block text-sm font-bold"
                    >
                      Your role
                      <span className="ml-1 font-normal text-[#8A9691]">
                        optional
                      </span>
                    </label>

                    <select
                      id="role"
                      name="role"
                      defaultValue=""
                      className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-base text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                    >
                      <option value="">
                        Choose if relevant
                      </option>

                      <option value="Educator">
                        Educator / Teacher
                      </option>

                      <option value="Room Leader">
                        Room / Classroom Leader
                      </option>

                      <option value="Educational Leader">
                        Educational Leader
                      </option>

                      <option value="Director">
                        Director
                      </option>

                      <option value="Owner or Provider">
                        Owner / Provider
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  <label className="flex cursor-pointer items-start gap-3 bg-[#FAF8F5] p-4">
                    <input
                      type="checkbox"
                      name="consentToContact"
                      value="yes"
                      className="mt-1 h-4 w-4 shrink-0 accent-[#1C3B34]"
                    />

                    <span className="text-sm leading-5 text-[#53645D]">
                      I would also like
                      occasional practical early
                      childhood resources and
                      professional learning
                      updates from Play Move
                      Improve.
                    </span>
                  </label>

                  {status === 'error' && (
                    <div
                      role="alert"
                      className="border border-rose-200 bg-rose-50 p-3 text-sm font-bold text-rose-700"
                    >
                      {message}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={
                      status === 'submitting'
                    }
                    className="flex min-h-14 w-full items-center justify-center rounded-xl bg-[#C29F60] px-5 py-3 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status ===
                    'submitting'
                      ? 'Preparing your guide...'
                      : 'Get the free guide'}
                  </button>
                </form>

                <p className="mt-4 text-xs leading-relaxed text-[#8A9691]">
                  Your details are used to
                  provide the resource you
                  requested. Marketing updates
                  are optional.
                </p>
              </>
            ) : (
              <div className="py-2">
                <p className="text-sm font-semibold text-[#9A793D]">
                  Your resources are ready
                </p>

                <h2 className="mt-2 text-2xl font-extrabold">
                  Start with the full guide
                </h2>

                <p className="mt-3 text-base leading-6 text-[#6A7873]">
                  {message}
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-14 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
                  >
                    Open the Safe Touch guide
                  </a>

                  <a
                    href="/pdf/Before-I-Offer-Comforting-Touch-Checklist.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-14 w-full items-center justify-center rounded-xl border-2 border-[#C29F60] bg-[#FAF5EC] px-5 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#F3E8D3]"
                  >
                    Open the printable checklist
                  </a>
                </div>

                <div className="mt-7 border-t border-[#E6E2DC] pt-6">
                  <p className="text-sm font-extrabold">
                    Want something your team
                    can use for broader
                    regulation moments too?
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                    The Free Regulation Ladder
                    looks at participation from
                    educator, manager and family
                    perspectives.
                  </p>

                  <Link
                    href="/playbooks"
                    className="mt-4 inline-flex font-extrabold text-[#9A793D] underline decoration-[#C29F60] decoration-2 underline-offset-4"
                  >
                    Open the Free Regulation
                    Ladder
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* WHY THIS GUIDE EXISTS */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                Why this conversation matters
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                I do not want good educators
                becoming afraid of connection.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#53645D]">
              <p>
                Safeguarding conversations are
                important. Children need adults
                who understand boundaries,
                consent, visibility and
                professional responsibility.
              </p>

              <p>
                But I am also hearing educators
                describe moments where fear has
                started replacing professional
                judgement. A distressed child
                reaches towards them and instead
                of first noticing what the child
                may need, they are wondering
                whether comforting them could
                get them into trouble.
              </p>

              <p>
                I think we need room for a more
                thoughtful conversation than
                either “never touch children” or
                “do what feels natural”. The
                individual child, the context,
                the purpose of the interaction,
                organisational expectations,
                local requirements and the
                educator&apos;s professional
                judgement all matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* INSIDE GUIDE */}
      <section className="bg-[#FAF8F5] py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#9A793D]">
              Inside the guide
            </p>

            <h2 className="mt-3 text-3xl font-extrabold leading-tight">
              Written for moments that are
              difficult to reduce to one policy
              sentence.
            </h2>

            <p className="mt-5 text-lg leading-7 text-[#53645D]">
              A child is crying at drop-off.
              Another reaches towards a trusted
              educator. A team member is unsure
              whether physical comfort is
              appropriate. These are the kinds
              of moments this guide is designed
              to help teams think through.
            </p>
          </div>

          <div className="mt-9 grid gap-x-10 md:grid-cols-2">
            {GUIDE_CONTENT.map((item) => (
              <article
                key={item.title}
                className="border-t border-[#D8CFC2] py-6"
              >
                <h3 className="text-xl font-extrabold">
                  {item.title}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#53645D]">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PRIMARY BRIDGE */}
      <section className="bg-[#1C3B34] py-14 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-semibold text-[#E4C98E]">
                The guide is one conversation
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Most difficult moments are not
                really about touch.
              </h2>
            </div>

            <div className="space-y-5 text-lg leading-relaxed text-[#D8E1DC]">
              <p>
                More often, educators are
                trying to work out what to do
                when a child freezes at
                drop-off, cannot stay with the
                group, becomes overwhelmed,
                starts running, throws, bites,
                shuts down or reaches the end
                of their capacity.
              </p>

              <p>
                That is the broader question
                behind Regulator Champions:
                what do we notice before we
                decide what the child needs to
                do differently?
              </p>
            </div>
          </div>

          <div className="mt-10 border-y border-white/20 md:grid md:grid-cols-3">
            {BROADER_MOMENTS.map(
              (item, index) => (
                <div
                  key={item.title}
                  className={`py-6 md:px-6 ${
                    index > 0
                      ? 'border-t border-white/20 md:border-l md:border-t-0'
                      : ''
                  }`}
                >
                  <h3 className="text-xl font-extrabold">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-base leading-relaxed text-[#C8D6D0]">
                    {item.text}
                  </p>
                </div>
              ),
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-3.5 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#D1B477]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/#full-program"
              className="flex min-h-12 items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Explore Regulator Champions
            </Link>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <section className="bg-[#FAF5EC] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-[#9A793D]">
                Read the story behind the guide
              </p>

              <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
                The heartbreak of
                second-guessing a hug
              </h2>

              <p className="mt-3 text-base leading-6 text-[#53645D]">
                Why are caring educators
                questioning interactions that
                once felt natural, and how do
                we protect children without
                becoming afraid of responsive
                care?
              </p>
            </div>

            <Link
              href="/blog/safe-touch-early-childhood"
              className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
            >
              Read the article
            </Link>
          </div>
        </div>
      </section>

      {/* BROADER SUPPORT */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold text-[#657B6C]">
                For early childhood leaders
              </p>

              <h2 className="mt-3 text-3xl font-extrabold tracking-tight">
                If your team needs more than
                one conversation about touch.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-relaxed text-[#53645D]">
                Regulator Champions is broader
                whole-team support for teams
                wanting to strengthen
                co-regulation, educator
                confidence, reflection and
                everyday responses across many
                different pressure points.
              </p>

              <p className="mt-4 text-base leading-relaxed text-[#53645D]">
                You can start with the free
                Regulation Ladder first. If the
                approach is useful, six-month
                and twelve-month program
                options are available.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/playbooks"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
                >
                  Open the Free Regulation
                  Ladder
                </Link>

                <Link
                  href="/proposal"
                  className="flex min-h-12 items-center justify-center rounded-xl border border-[#D8D0C4] bg-[#FAF8F5] px-6 py-3 text-sm font-bold text-[#1C3B34] transition hover:bg-white"
                >
                  View Program Options
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white pb-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="border-t border-[#E6E2DC] pt-6">
            <p className="max-w-4xl text-xs leading-5 text-[#75827D]">
              This resource supports
              professional reflection and team
              discussion. It is not legal
              advice and does not replace your
              organisation&apos;s policies,
              provider or leadership guidance,
              safeguarding requirements,
              licensing requirements or other
              requirements that apply in your
              location. Regulatory information
              in the guide was checked in
              August 2026.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}