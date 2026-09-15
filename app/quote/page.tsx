'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type ProgramOption = 'preview' | 'full';

export default function QuoteRequestPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceName, setServiceName] =
    useState('');
  const [
    providerLegalName,
    setProviderLegalName,
  ] = useState('');
  const [fundingSource, setFundingSource] =
    useState(
      'VIC School Readiness Funding (SRF)',
    );
  const [programOption, setProgramOption] =
    useState<ProgramOption>('preview');
  const [message, setMessage] = useState('');

  const [loading, setLoading] =
    useState(false);
  const [errorMsg, setErrorMsg] =
    useState<string | null>(null);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          serviceName,
          providerLegalName,
          fundingSource,
          programOption,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error ||
            'Failed to submit quote request.',
        );
      }

      if (data.redirectUrl) {
        window.location.href =
          data.redirectUrl;
      } else {
        window.location.href = `/proposal?plan=${programOption}`;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg(
          'An unexpected error occurred. Please try again.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 font-sans text-[#1C3B34]">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b-2 border-[#E6E2DC] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center gap-1 text-sm font-bold text-[#657B6C] hover:text-[#1C3B34]"
          >
            Back to Home
          </Link>

          <span className="rounded-full border border-[#C29F60] bg-[#FAF5EC] px-3 py-1 text-xs font-black text-[#1C3B34]">
            Request a Quote
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-6 px-4 py-6">
        <div className="space-y-6 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
          <div className="space-y-2 border-b border-[#FAF8F5] pb-4">
            <span className="block text-xs font-bold tracking-wide text-[#9A793D]">
              Regulator Champions
            </span>

            <h1 className="text-2xl font-bold text-[#1C3B34] md:text-3xl">
              Request a Formal Quote and Proposal
            </h1>

            <p className="text-sm leading-relaxed text-[#6A7873]">
              Add your service details below and we will prepare the relevant proposal information for your organisation, whether you are using an early childhood funding stream or your general professional learning budget.
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-sm font-bold text-rose-900">
              {errorMsg}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 text-sm font-medium"
          >
            {/* Program Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-[#1C3B34]">
                1. Select a program option
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() =>
                    setProgramOption('preview')
                  }
                  className={`flex min-h-32 flex-col justify-between rounded-2xl border-2 p-4 text-left transition-all ${
                    programOption === 'preview'
                      ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                      : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
                  }`}
                >
                  <span
                    className={`block text-xs font-bold ${
                      programOption ===
                      'preview'
                        ? 'text-[#E4C98E]'
                        : 'text-[#657B6C]'
                    }`}
                  >
                    6-month option
                  </span>

                  <strong className="block text-base font-bold">
                    6-Month Preview
                  </strong>

                  <span
                    className={`block text-sm ${
                      programOption ===
                      'preview'
                        ? 'text-white/80'
                        : 'text-[#6A7873]'
                    }`}
                  >
                    $1,790 AUD including GST
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setProgramOption('full')
                  }
                  className={`flex min-h-32 flex-col justify-between rounded-2xl border-2 p-4 text-left transition-all ${
                    programOption === 'full'
                      ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                      : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
                  }`}
                >
                  <span
                    className={`block text-xs font-bold ${
                      programOption === 'full'
                        ? 'text-[#E4C98E]'
                        : 'text-[#657B6C]'
                    }`}
                  >
                    12-month option
                  </span>

                  <strong className="block text-base font-bold">
                    12-Month Regulator Champions
                  </strong>

                  <span
                    className={`block text-sm ${
                      programOption === 'full'
                        ? 'text-white/80'
                        : 'text-[#6A7873]'
                    }`}
                  >
                    $4,790 AUD including GST
                  </span>
                </button>
              </div>

              <p className="pt-2 text-sm leading-relaxed text-[#6A7873]">
                The six-month option gives your team a meaningful implementation period without committing to a full year. The twelve-month option provides more time to revisit the Regulation Ladders, recordings and ongoing support as different needs emerge.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <label className="block text-sm font-bold text-[#1C3B34]">
                2. Director and service information
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Full name / nominated supervisor *
                  </label>

                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) =>
                      setFullName(
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Sarah Jenkins"
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-3 text-sm outline-none focus:border-[#657B6C]"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Email address *
                  </label>

                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="director@service.com.au"
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-3 text-sm outline-none focus:border-[#657B6C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    placeholder="0400 000 000"
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-3 text-sm outline-none focus:border-[#657B6C]"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Centre / service name *
                  </label>

                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) =>
                      setServiceName(
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Sunshine Early Learning Centre"
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-3 text-sm outline-none focus:border-[#657B6C]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Approved provider / legal entity
                  </label>

                  <input
                    type="text"
                    value={
                      providerLegalName
                    }
                    onChange={(e) =>
                      setProviderLegalName(
                        e.target.value,
                      )
                    }
                    placeholder="e.g. Sunshine ELC Pty Ltd"
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-3 text-sm outline-none focus:border-[#657B6C]"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Funding or budget source
                  </label>

                  <select
                    value={fundingSource}
                    onChange={(e) =>
                      setFundingSource(
                        e.target.value,
                      )
                    }
                    className="min-h-12 w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-3 text-sm outline-none focus:border-[#657B6C]"
                  >
                    <option value="VIC School Readiness Funding (SRF)">
                      VIC School Readiness Funding (SRF)
                    </option>

                    <option value="QLD Kindy Uplift">
                      QLD Kindy Uplift
                    </option>

                    <option value="General Professional Learning Budget">
                      General Professional Learning Budget
                    </option>

<option value="SA Early Childhood Professional Development / 3-Year-Old Preschool">
  SA Early Childhood Professional Development / 3-Year-Old Preschool
</option>

                    <option value="Multi-Service / Area Manager Budget">
                      Multi-Service / Area Manager Budget
                    </option>

                    <option value="Other / Not Sure">
                      Other / Not Sure
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block font-bold text-[#1C3B34]">
                  Additional notes or multi-site details
                </label>

                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) =>
                    setMessage(e.target.value)
                  }
                  placeholder="Include any purchase order requirements, multi-service details or anything else you would like included in the proposal."
                  className="w-full rounded-xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-3 text-sm outline-none focus:border-[#657B6C]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="flex min-h-12 w-full items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-sm font-bold text-[#1C3B34] shadow-sm transition-all hover:bg-[#D1B477] disabled:opacity-50"
              >
                {loading
                  ? 'Preparing your proposal...'
                  : 'Request Formal Proposal and Quote'}
              </button>
            </div>

            <p className="text-center text-xs leading-relaxed text-[#6A7873]">
              Submitting this form does not enrol your organisation or commit you to purchasing Regulator Champions.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}