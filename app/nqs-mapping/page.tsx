'use client';

import Link from 'next/link';
import { useState } from 'react';

type NQSElement = {
  qaNumber: string;
  qaTitle: string;
  element: string;
  focus: string;
  evidence: string;
  qipWording: string;
};

const NQS_ELEMENTS: NQSElement[] = [
  {
    qaNumber: 'QA 1',
    qaTitle: 'Educational Program & Practice',
    element: 'Elements 1.1.1 & 1.2.1',
    focus: 'Approved Learning Framework & Intentional Teaching',
    evidence:
      'Embedding somatic movement routines, sensory transition cues and schema recognition into daily room planning and group transitions.',
    qipWording:
      "Our service utilises the CALM Framework and 10 Scenario Action Plans to support children's self-regulation, ensuring daily routines reflect intentional, sensory-informed pedagogy.",
  },
  {
    qaNumber: 'QA 4',
    qaTitle: 'Staffing Arrangements',
    element: 'Elements 4.1.1 & 4.2.2',
    focus: 'Organisation of Staff & Professional Teamwork',
    evidence:
      'Establishing a shared regulation language across room shifts, casual cover and meal breaks to reduce mismatched behavioural responses.',
    qipWording:
      'Educators participate in 15-minute non-contact planning reflections through the Regulator Champions Pathway to maintain team alignment and consistent room co-regulation practices.',
  },
  {
    qaNumber: 'QA 5',
    qaTitle: 'Relationships with Children',
    element: 'Elements 5.1.1, 5.1.2 & 5.2.2',
    focus: 'Positive Interactions & Co-Regulation Support',
    evidence:
      'Moving away from disciplinary shouting or isolated time-outs towards lowered adult body height, calm proximity anchoring and Stop Brain versus Safe Brain support.',
    qipWording:
      'Educators apply the CALM Framework, Check the Room, Assess the Why, Lead with Connection, Monitor and Note, alongside a safety-first check, to respond to overstimulation and room stress with consistency and care.',
  },
  {
    qaNumber: 'QA 6',
    qaTitle: 'Collaborative Partnerships',
    element: 'Elements 6.1.1 & 6.1.2',
    focus: 'Engagement with Families & Arrival Transitions',
    evidence:
      'Providing consistent family arrival rituals, calm drop-off handovers and structured communication slips for anxious families during morning separation.',
    qipWording:
      'Morning drop-off procedures incorporate structured separation rituals and calm family communication, supporting smooth transitions from home to the early learning environment.',
  },
  {
    qaNumber: 'QA 7',
    qaTitle: 'Governance & Leadership',
    element: 'Elements 7.1.2 & 7.2.1',
    focus: 'Continuous Improvement & Quality Improvement Plan',
    evidence:
      'Utilising structured Director Starting-Point Reviews and Educator Baseline Checks to track whole-centre capability growth over a 12-month period.',
    qipWording:
      'Service leadership monitors staff regulation confidence using structured baseline checks and an annual site-licensed professional development pathway.',
  },
];

export default function NQSMappingPage() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function handlePrint() {
    window.print();
  }

  function copyToClipboard(text: string, index: number) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedIndex(index);

        window.setTimeout(() => {
          setCopiedIndex(null);
        }, 2500);
      })
      .catch(() => {
        setCopiedIndex(null);
      });
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-20 font-sans text-slate-800 print:bg-white print:pb-0">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white px-6 py-4 print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Home
          </Link>

          <button
            type="button"
            onClick={handlePrint}
            className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
          >
            Print A&amp;R Evidence Folder &rarr;
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8 print:space-y-6 print:px-0 print:py-0">
        <section className="mx-auto max-w-2xl space-y-2 text-center print:max-w-none print:text-left">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            National Quality Framework Evidence
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            National Quality Standard Mapping Matrix
          </h1>

          <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
            Use this audit-ready matrix to document your centre&apos;s
            regulation capability progress for Assessment &amp; Rating visits
            and Quality Improvement Plan updates.
          </p>
        </section>

        <section className="space-y-2 rounded-2xl border border-teal-200 bg-teal-50 p-5 print:hidden">
          <strong className="block text-xs font-bold uppercase tracking-wider text-teal-950">
            Director &amp; Nominated Supervisor QIP Generator
          </strong>

          <p className="text-xs leading-relaxed text-teal-900">
            Select any Copy QIP Text button below to copy the suggested evidence
            wording directly into your service Quality Improvement Plan.
          </p>
        </section>

        <section className="space-y-6">
          {NQS_ELEMENTS.map((item, index) => (
            <article
              key={item.qaNumber}
              className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs print:break-inside-avoid print:border-slate-300 print:p-4 print:shadow-none md:p-8"
            >
              <div className="flex flex-col justify-between gap-2 border-b border-slate-100 pb-3 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <span className="rounded-xl bg-teal-800 px-3 py-1 text-xs font-bold text-white">
                    {item.qaNumber}
                  </span>

                  <h2 className="text-base font-bold text-slate-900">
                    {item.qaTitle}
                  </h2>
                </div>

                <span className="text-xs font-semibold text-slate-500">
                  {item.element}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2">
                <div className="space-y-1 rounded-2xl border border-slate-200 bg-[#FDFBF7] p-4">
                  <strong className="block text-[10px] font-bold uppercase tracking-wider text-teal-900">
                    NQS Focus Area
                  </strong>

                  <p className="font-bold text-slate-800">{item.focus}</p>

                  <p className="mt-2 leading-relaxed text-slate-600">
                    {item.evidence}
                  </p>
                </div>

                <div className="flex flex-col justify-between space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <strong className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      Suggested QIP Evidence Wording
                    </strong>

                    <p className="mt-1 leading-relaxed text-slate-700 italic">
                      &quot;{item.qipWording}&quot;
                    </p>
                  </div>

                  <div className="pt-2 print:hidden">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(item.qipWording, index)}
                      className="rounded-xl bg-teal-800 px-3.5 py-2 text-[11px] font-bold text-white transition hover:bg-teal-900"
                    >
                      {copiedIndex === index
                        ? 'Text copied to clipboard'
                        : 'Copy QIP Text →'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-3xl bg-teal-900 p-8 text-center text-white print:hidden">
          <h2 className="text-xl font-bold">
            Need a Formal Invoice or Purchase Order Quote?
          </h2>

          <p className="mx-auto max-w-md text-xs leading-relaxed text-teal-100">
            Attach this NQS Mapping Matrix to your official $4,790 proposal pack
            for Approved Provider or Kindy Uplift funding approval.
          </p>

          <Link
            href="/proposal"
            className="inline-block rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
          >
            View &amp; Print $4,790 Proposal Pack &rarr;
          </Link>
        </section>
      </main>
    </div>
  );
}