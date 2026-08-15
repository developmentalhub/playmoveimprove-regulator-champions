'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type ProgramOption = 'preview' | 'full';

export default function QuoteRequestPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [providerLegalName, setProviderLegalName] = useState('');
  const [fundingSource, setFundingSource] = useState('VIC School Readiness Funding (SRF)');
  const [programOption, setProgramOption] = useState<ProgramOption>('preview');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
        throw new Error(data.error || 'Failed to submit quote request.');
      }

      // Redirect to proposal page with plan pre-selected
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        window.location.href = `/proposal?plan=${programOption}`;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800">
      {/* HEADER BAR */}
      <header className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            ← Back to Home
          </Link>

          <span className="text-xs font-semibold text-slate-500">
            Regulator Champions Quote Engine
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs md:p-10">
          <div className="border-b border-slate-200 pb-6">
            <span className="block text-xs font-bold uppercase tracking-widest text-teal-800">
              Instant Service Quote Generator
            </span>
            <h1 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
              Request an Official Funding Quote &amp; Proposal
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-slate-600">
              Provide your centre details below to generate a formatted tax quote for Victorian SRF, Queensland Kindy Uplift, or internal purchase order approvals.
            </p>
          </div>

          {errorMsg && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-800">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6 text-xs">
            {/* PROGRAM SELECTION */}
            <div className="space-y-2">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                1. Select Program Option *
              </label>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setProgramOption('preview')}
                  className={`rounded-2xl border p-4 text-left transition ${
                    programOption === 'preview'
                      ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase text-amber-800">
                    2026 Entry Level
                  </span>
                  <strong className="block text-sm font-extrabold text-slate-900">
                    3-Ladder Preview ($1,790)
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    Incl. GST • 6 months site access
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setProgramOption('full')}
                  className={`rounded-2xl border p-4 text-left transition ${
                    programOption === 'full'
                      ? 'border-teal-700 bg-teal-50 ring-2 ring-teal-200'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase text-teal-800">
                    Best Value
                  </span>
                  <strong className="block text-sm font-extrabold text-slate-900">
                    Full 8 Ladders ($4,790)
                  </strong>
                  <span className="text-[11px] text-slate-500">
                    Incl. GST • 12 months site licence
                  </span>
                </button>
              </div>
            </div>

            {/* CONTACT DETAILS */}
            <div className="space-y-4">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                2. Director &amp; Service Information
              </label>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-slate-700">
                    Full Name / Nominated Supervisor *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-teal-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director@service.com.au"
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-teal-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0400 000 000"
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-teal-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-700">
                    Centre / Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Sunshine Early Learning Centre"
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-teal-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block font-semibold text-slate-700">
                    Approved Provider / Legal Entity
                  </label>
                  <input
                    type="text"
                    value={providerLegalName}
                    onChange={(e) => setProviderLegalName(e.target.value)}
                    placeholder="e.g. Sunshine ELC Pty Ltd"
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-teal-800 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-semibold text-slate-700">
                    Funding Stream
                  </label>
                  <select
                    value={fundingSource}
                    onChange={(e) => setFundingSource(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-teal-800 focus:outline-none"
                  >
                    <option value="VIC School Readiness Funding (SRF)">
                      VIC School Readiness Funding (SRF)
                    </option>
                    <option value="QLD Kindy Uplift">QLD Kindy Uplift</option>
                    <option value="NSW Quality Learning Environments">
                      NSW Quality Learning Environments
                    </option>
                    <option value="General Professional Learning Budget">
                      General Professional Learning Budget
                    </option>
                    <option value="Multi-Service / Area Manager Budget">
                      Multi-Service / Area Manager Budget
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700">
                  Additional Notes or Multi-Site Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Include any specific PO requirements or indicate if you are seeking a multi-service quote..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-xs focus:border-teal-800 focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-2xl bg-amber-400 py-4 text-xs font-extrabold text-slate-950 transition hover:bg-amber-300 disabled:opacity-50"
              >
                {loading
                  ? 'Generating Your Official Proposal...'
                  : 'Generate Official Proposal & Quote →'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}