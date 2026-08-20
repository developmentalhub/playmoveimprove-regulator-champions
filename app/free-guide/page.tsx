'use client';

import React, { FormEvent, useState } from 'react';
import Link from 'next/link';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

type ApiResponse = {
  success?: boolean;
  message?: string;
  downloadUrl?: string;
};

export default function FreeGuidePage() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(
    '/pdf/Safe-Touch-Early-Childhood-Guide.pdf',
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus('submitting');
    setMessage('');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get('name') || ''),
      email: String(formData.get('email') || ''),
      organisationName: String(formData.get('organisationName') || ''),
      role: String(formData.get('role') || ''),
      consentToContact: formData.get('consentToContact') === 'yes',
      guide: 'safe-touch-early-childhood',
    };

    try {
      const response = await fetch('/api/download-lead-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ApiResponse;

      if (!response.ok || result.success !== true) {
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
      console.error('Free guide request failed:', error);

      setStatus('error');

      setMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.',
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 font-sans text-[#1C3B34]">
      <header className="sticky top-0 z-40 border-b border-[#E6E2DC] bg-white/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
          <Link
            href="/"
            className="flex min-h-12 items-center text-sm font-bold text-[#657B6C] transition hover:text-[#1C3B34]"
          >
            Play Move Improve
          </Link>

          <span className="rounded-full border border-[#C29F60]/50 bg-[#FAF5EC] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#1C3B34]">
            Free educator guide
          </span>
        </div>
      </header>

      <main>
        <section className="bg-[#1C3B34] text-white">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-18">
            <div>
              <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#1C3B34]">
                Free practical guide for early childhood teams
              </span>

              <h1 className="mt-6 max-w-3xl text-4xl font-black leading-[1.08] tracking-tight text-white md:text-5xl">
                Can I still comfort a distressed child?
              </h1>

              <p className="mt-4 max-w-3xl text-xl font-bold leading-relaxed text-[#F5EFE4]">
                Safe, appropriate touch in early childhood
              </p>

              <p className="mt-6 max-w-3xl text-base leading-7 text-white/85 md:text-lg">
                I wrote this guide after hearing more educators second-guessing
                what to do when a child is crying, reaching for comfort or
                struggling through a difficult moment.
              </p>

              <p className="mt-4 max-w-3xl text-base leading-7 text-white/85">
                It is designed to help teams think more clearly about warm,
                responsive care while keeping child safety, professional
                boundaries and the individual child at the centre of the
                decision.
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <GuideFeature
                  title="Pause"
                  text="Notice your own reaction before moving in."
                />

                <GuideFeature
                  title="Notice"
                  text="Read what the child is communicating."
                />

                <GuideFeature
                  title="Respond"
                  text="Choose a thoughtful and appropriate response."
                />
              </div>
            </div>

            <div
              id="download"
              className="rounded-3xl border border-white/15 bg-white p-6 text-[#1C3B34] shadow-2xl md:p-8"
            >
              {status !== 'success' ? (
                <>
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
                    Get the free guide
                  </span>

                  <h2 className="mt-2 text-2xl font-black leading-tight text-[#1C3B34]">
                    Send me the guide
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#6A7873]">
                    Complete the short form and both free resources will be
                    available immediately.
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-6 space-y-4"
                  >
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                      >
                        Your name
                      </label>

                      <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
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
                        autoComplete="email"
                        required
                        placeholder="you@yourservice.com.au"
                        className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition placeholder:text-[#8A9691] focus:border-[#657B6C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="organisationName"
                        className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
                      >
                        Service or organisation
                        <span className="ml-1 font-normal text-[#8A9691]">
                          optional
                        </span>
                      </label>

                      <input
                        id="organisationName"
                        name="organisationName"
                        type="text"
                        autoComplete="organization"
                        className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="role"
                        className="mb-1.5 block text-xs font-bold text-[#1C3B34]"
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
                        className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C]"
                      >
                        <option value="">Choose if relevant</option>
                        <option value="Educator">Educator</option>
                        <option value="Room Leader">Room Leader</option>
                        <option value="Educational Leader">
                          Educational Leader
                        </option>
                        <option value="Director">Director</option>
                        <option value="Approved Provider">
                          Approved Provider
                        </option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-[#FAF8F5] p-4">
                      <input
                        type="checkbox"
                        name="consentToContact"
                        value="yes"
                        className="mt-1 h-4 w-4 shrink-0 accent-[#1C3B34]"
                      />

                      <span className="text-xs leading-5 text-[#53645D]">
                        I would also like occasional practical early childhood
                        resources and professional learning updates from Play
                        Move Improve.
                      </span>
                    </label>

                    {status === 'error' && (
                      <div
                        role="alert"
                        className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700"
                      >
                        {message}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="flex min-h-14 w-full items-center justify-center rounded-xl bg-[#C29F60] px-5 py-3 text-sm font-black text-[#1C3B34] transition hover:bg-[#D1B477] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {status === 'submitting'
                        ? 'Preparing your guide...'
                        : 'Get the free guide'}
                    </button>
                  </form>

                  <p className="mt-4 text-[10px] leading-relaxed text-[#8A9691]">
                    Your details are used to provide the requested resource.
                    Marketing updates are optional.
                  </p>
                </>
              ) : (
                <div className="py-2 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF4F0] text-2xl font-black text-[#1C3B34]">
                    ✓
                  </div>

                  <span className="mt-5 block text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
                    Your resources are ready
                  </span>

                  <h2 className="mt-2 text-2xl font-black text-[#1C3B34]">
                    Start with the full guide
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-[#6A7873]">
                    {message}
                  </p>

                  <div className="mt-6 space-y-3">
                    <a
                      href={downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-14 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-black text-white transition hover:bg-[#284E45]"
                    >
                      Open the full Safe Touch guide
                    </a>

                    <a
                      href="/pdf/Before-I-Offer-Comforting-Touch-Checklist.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-14 w-full items-center justify-center rounded-xl border-2 border-[#C29F60] bg-[#FAF5EC] px-5 py-3 text-sm font-black text-[#1C3B34] transition hover:bg-[#F3E8D3]"
                    >
                      Open the printable checklist
                    </a>
                  </div>

                  <p className="mt-5 text-xs leading-5 text-[#6A7873]">
                    Save both PDFs somewhere your team can easily find them
                    again.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8 lg:py-18">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
              Inside the guide
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight text-[#1C3B34]">
              Written for the moments that are difficult to reduce to a policy
              sentence.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#53645D]">
              A child is crying at drop-off. Another child reaches towards a
              trusted educator. A team member is unsure whether offering
              physical comfort is still appropriate. These are the moments this
              guide is designed to help teams think through.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ContentCard
              title="Child cues"
              text="Think about what the individual child is communicating rather than relying on a blanket rule."
            />

            <ContentCard
              title="Educator awareness"
              text="Notice when fear, rushing or uncertainty may be influencing the adult response."
            />

            <ContentCard
              title="Professional boundaries"
              text="Keep physical contact purposeful, appropriate, visible and consistent with service expectations."
            />

            <ContentCard
              title="Team reflection"
              text="Use the guide to create clearer conversations about what safe, warm and responsive care looks like."
            />
          </div>
        </section>

        <section className="bg-[#FAF5EC]">
          <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
                Read the story behind the guide
              </span>

              <h2 className="mt-3 text-2xl font-black text-[#1C3B34]">
                The heartbreak of second-guessing a hug
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#53645D]">
                Why are caring educators suddenly questioning interactions that
                once felt natural, and how do we protect children without
                becoming afraid of responsive care?
              </p>
            </div>

            <Link
              href="/blog/safe-touch-early-childhood"
              className="flex min-h-14 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#284E45]"
            >
              Read the article
            </Link>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <div className="rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 md:p-9">
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                For service leaders
              </span>

              <h2 className="mt-3 text-2xl font-black text-[#1C3B34]">
                If this is a conversation your whole team needs to have
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#53645D]">
                Regulator Champions is the broader Play Move Improve practice
                pathway for services wanting to strengthen co-regulation,
                educator decision-making and reflective practice across
                everyday room moments.
              </p>

              <Link
                href="/"
                className="mt-5 inline-flex min-h-12 items-center justify-center rounded-xl bg-[#657B6C] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#53665A]"
              >
                Explore Regulator Champions
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="border-t border-[#E6E2DC] pt-6">
            <p className="max-w-4xl text-[11px] leading-5 text-[#75827D]">
              This resource supports professional reflection and team
              discussion. It is not legal advice and does not replace your
              service policies, Approved Provider guidance or the requirements
              that apply to your service. Regulatory information in the guide
              was checked in August 2026.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function GuideFeature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 p-4">
      <span className="text-lg text-[#C29F60]">✿</span>

      <h3 className="mt-1 text-sm font-black text-white">{title}</h3>

      <p className="mt-1 text-xs leading-5 text-white/75">{text}</p>
    </div>
  );
}

function ContentCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-2xl border border-[#E6E2DC] bg-white p-5">
      <span className="text-lg text-[#C29F60]">✿</span>

      <h3 className="mt-2 text-sm font-black text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-[#6A7873]">
        {text}
      </p>
    </article>
  );
}