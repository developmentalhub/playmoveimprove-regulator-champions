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
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34] font-sans pb-20">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b-2 border-[#E6E2DC] px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/"
            className="text-sm font-bold text-[#657B6C] hover:text-[#1C3B34] flex items-center gap-1"
          >
            Back to Home
          </Link>

          <span className="bg-[#FAF5EC] border border-[#C29F60] text-[#1C3B34] text-xs font-black px-3 py-1 rounded-full uppercase">
            Quote Generator
          </span>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border-2 border-[#E6E2DC] shadow-sm space-y-6">
          <div className="border-b border-[#FAF8F5] pb-4 space-y-2">
            <span className="text-xs font-black uppercase text-[#C29F60] block tracking-wider">
              Instant Service Quote Generator
            </span>
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1C3B34]">
              Request an Official Funding Quote & Proposal
            </h1>
            <p className="text-xs text-[#6A7873] leading-relaxed">
              Provide your centre details below to generate a formatted tax quote for Victorian SRF, Queensland Kindy Uplift, or internal purchase order approvals.
            </p>
          </div>

          {errorMsg && (
            <div className="rounded-2xl border-2 border-rose-200 bg-rose-50 p-4 text-xs font-bold text-rose-900">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-medium">
            
            {/* Program Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C3B34]">
                1. Select Program Option *
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setProgramOption('preview')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all min-h-12 flex flex-col justify-between ${
                    programOption === 'preview'
                      ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                      : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase block ${programOption === 'preview' ? 'text-[#C29F60]' : 'text-[#657B6C]'}`}>
                    2026 Entry Level
                  </span>
                  <strong className="block text-sm font-serif font-bold">
                    3-Ladder Preview ($1,790)
                  </strong>
                  <span className={`text-[11px] block ${programOption === 'preview' ? 'text-white/80' : 'text-[#6A7873]'}`}>
                    Incl. GST | 6 months site access
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setProgramOption('full')}
                  className={`p-4 rounded-2xl border-2 text-left transition-all min-h-12 flex flex-col justify-between ${
                    programOption === 'full'
                      ? 'bg-[#1C3B34] text-white border-[#1C3B34] shadow-md'
                      : 'bg-white text-[#1C3B34] border-[#E6E2DC] hover:border-[#657B6C]'
                  }`}
                >
                  <span className={`text-[10px] font-black uppercase block ${programOption === 'full' ? 'text-[#C29F60]' : 'text-[#657B6C]'}`}>
                    Best Value
                  </span>
                  <strong className="block text-sm font-serif font-bold">
                    Full 8 Ladders ($4,790)
                  </strong>
                  <span className={`text-[11px] block ${programOption === 'full' ? 'text-white/80' : 'text-[#6A7873]'}`}>
                    Incl. GST | 12 months site licence
                  </span>
                </button>
              </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1C3B34]">
                2. Director & Service Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Full Name / Nominated Supervisor *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full rounded-xl border-2 border-[#E6E2DC] p-3 text-xs focus:border-[#657B6C] outline-none bg-[#FAF8F5] min-h-12"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="director@service.com.au"
                    className="w-full rounded-xl border-2 border-[#E6E2DC] p-3 text-xs focus:border-[#657B6C] outline-none bg-[#FAF8F5] min-h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0400 000 000"
                    className="w-full rounded-xl border-2 border-[#E6E2DC] p-3 text-xs focus:border-[#657B6C] outline-none bg-[#FAF8F5] min-h-12"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Centre / Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    placeholder="e.g. Sunshine Early Learning Centre"
                    className="w-full rounded-xl border-2 border-[#E6E2DC] p-3 text-xs focus:border-[#657B6C] outline-none bg-[#FAF8F5] min-h-12"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Approved Provider / Legal Entity
                  </label>
                  <input
                    type="text"
                    value={providerLegalName}
                    onChange={(e) => setProviderLegalName(e.target.value)}
                    placeholder="e.g. Sunshine ELC Pty Ltd"
                    className="w-full rounded-xl border-2 border-[#E6E2DC] p-3 text-xs focus:border-[#657B6C] outline-none bg-[#FAF8F5] min-h-12"
                  />
                </div>

                <div>
                  <label className="mb-1 block font-bold text-[#1C3B34]">
                    Funding Stream
                  </label>
                  <select
                    value={fundingSource}
                    onChange={(e) => setFundingSource(e.target.value)}
                    className="w-full rounded-xl border-2 border-[#E6E2DC] p-3 text-xs focus:border-[#657B6C] outline-none bg-[#FAF8F5] min-h-12"
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
                <label className="mb-1 block font-bold text-[#1C3B34]">
                  Additional Notes or Multi-Site Details
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Include any specific PO requirements or indicate if you are seeking a multi-service quote..."
                  className="w-full rounded-xl border-2 border-[#E6E2DC] p-3 text-xs focus:border-[#657B6C] outline-none bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#C29F60] text-[#1C3B34] font-bold rounded-2xl hover:bg-opacity-90 transition-all text-sm shadow-sm min-h-12 flex items-center justify-center disabled:opacity-50"
              >
                {loading
                  ? 'Generating Your Official Proposal...'
                  : 'Generate Official Proposal & Quote'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}