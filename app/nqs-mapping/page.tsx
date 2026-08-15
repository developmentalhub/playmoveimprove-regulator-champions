'use client';

import Link from 'next/link';
import { useState } from 'react';
import MemberSignOutButton from '../../components/MemberSignOutButton';

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
      'Reflect on how regulation-aware routines, movement opportunities, environmental adjustments and intentional educator responses are incorporated into everyday planning and practice.',
    qipWording:
      'Our service is strengthening intentional teaching by reflecting on how routines, environments, movement opportunities and educator responses support children’s participation, wellbeing and learning.',
  },
  {
    qaNumber: 'QA 4',
    qaTitle: 'Staffing Arrangements',
    element: 'Elements 4.1.1 & 4.2.2',
    focus: 'Organisation of Educators & Professional Practice',
    evidence:
      'Build shared language and reflective practice across room teams, handovers, relief staffing and professional learning so educators can respond more consistently while still using professional judgement.',
    qipWording:
      'Educators participate in structured professional reflection and shared learning through the Regulator Champions pathway to strengthen team communication, professional practice and consistency across everyday routines.',
  },
  {
    qaNumber: 'QA 5',
    qaTitle: 'Relationships with Children',
    element: 'Elements 5.1.1, 5.1.2 & 5.2.2',
    focus: 'Positive Interactions, Dignity & Self-Regulation Support',
    evidence:
      'Reflect on adult tone, language, body position, environmental demand and predictable support during difficult moments, while maintaining each child’s dignity and safety.',
    qipWording:
      'Educators use the CALM Framework to reflect on room demand, possible influences on behaviour, relational connection and the effectiveness of adult responses while supporting children’s developing regulation skills.',
  },
  {
    qaNumber: 'QA 6',
    qaTitle: 'Collaborative Partnerships',
    element: 'Elements 6.1.1 & 6.1.2',
    focus: 'Family Engagement, Respect & Arrival Transitions',
    evidence:
      'Review how families are welcomed, how their knowledge and views are heard, and how arrival and separation routines can be made more predictable and respectful.',
    qipWording:
      'Our service is reviewing arrival and handover practices to strengthen respectful communication with families, recognise family knowledge and support more predictable transitions into the learning environment.',
  },
  {
    qaNumber: 'QA 7',
    qaTitle: 'Governance & Leadership',
    element: 'Elements 7.1.2 & 7.2.1',
    focus: 'Management Systems, Self-Assessment & Continuous Improvement',
    evidence:
      'Use service-level starting-point reviews, educator reflection and ongoing professional learning records to identify priorities, monitor implementation and inform continuous improvement discussions.',
    qipWording:
      'Service leadership uses structured reflection, educator feedback and professional learning evidence to identify regulation-related priorities, review implementation and inform the service’s ongoing self-assessment and quality improvement process.',
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
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3">
          <Link
            href="/portal"
            className="text-xs font-bold text-teal-800 transition hover:text-teal-900"
          >
            &larr; Back to Member Hub
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
            >
              Print NQS Reflection Matrix
            </button>

            <MemberSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-6 py-8 print:space-y-6 print:px-0 print:py-0">
        <section className="mx-auto max-w-3xl space-y-3 text-center print:max-w-none print:text-left">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            National Quality Standard Reflection Support
          </span>

          <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            Regulator Champions NQS Mapping &amp; QIP Reflection Matrix
          </h1>

          <p className="text-xs leading-relaxed text-slate-600 md:text-sm">
            Use this matrix to help connect Regulator Champions professional
            learning with relevant National Quality Standard elements and your
            service&apos;s own self-assessment, reflection and Quality
            Improvement Plan discussions.
          </p>
        </section>

        <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <strong className="block text-xs font-bold uppercase tracking-wider text-amber-950">
            Important NQS Note
          </strong>

          <p className="mt-2 text-xs leading-relaxed text-amber-950">
            This page is a professional reflection and planning aid. Participation
            in Regulator Champions does not itself demonstrate that an NQS
            element is met. Services should only include QIP statements and
            evidence that accurately reflect their own current practice,
            implementation, reflection and outcomes.
          </p>
        </section>

        <section className="space-y-2 rounded-2xl border border-teal-200 bg-teal-50 p-5 print:hidden">
          <strong className="block text-xs font-bold uppercase tracking-wider text-teal-950">
            Suggested QIP Reflection Wording
          </strong>

          <p className="text-xs leading-relaxed text-teal-900">
            Use the copy buttons below as a starting point. Adapt the wording so
            it describes what your service has actually observed, implemented,
            reviewed or identified as an improvement priority.
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
                    Relevant Practice Focus
                  </strong>

                  <p className="font-bold text-slate-800">{item.focus}</p>

                  <p className="mt-2 leading-relaxed text-slate-600">
                    {item.evidence}
                  </p>
                </div>

                <div className="flex flex-col justify-between space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div>
                    <strong className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      Suggested QIP Starting Point
                    </strong>

                    <p className="mt-1 italic leading-relaxed text-slate-700">
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
                        : 'Copy Suggested Text →'}
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 print:hidden md:p-8">
          <span className="block text-xs font-bold uppercase tracking-wider text-teal-800">
            Useful Evidence to Keep
          </span>

          <h2 className="mt-1 text-xl font-bold text-slate-900">
            Show the learning process, not just the resource
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              'Educator reflection notes and identified priorities',
              'Team meeting or professional learning discussion records',
              'Examples of changes trialled in routines or environments',
              'Family feedback where it is relevant to the improvement focus',
              'Leadership review of what changed and what still needs work',
              'Updated QIP notes that reflect your service’s actual progress',
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl border border-slate-200 bg-[#FDFBF7] p-4 text-xs leading-relaxed text-slate-700"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl bg-teal-900 p-8 text-center text-white print:hidden">
          <span className="block text-[10px] font-bold uppercase tracking-wider text-amber-300">
            Program &amp; Procurement
          </span>

          <h2 className="text-xl font-bold">
            Need a Formal Proposal or Purchase Order Quote?
          </h2>

          <p className="mx-auto max-w-lg text-xs leading-relaxed text-teal-100">
            Regulator Champions is available as a 3-Ladder Preview for $1,790
            including GST or the full 8-Ladder pathway for $4,790 including GST.
            Your service can attach its own NQS and QIP planning documentation
            to internal funding or procurement records where relevant.
          </p>

          <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
            <Link
              href="/proposal?plan=preview"
              className="rounded-xl bg-amber-400 px-6 py-3.5 text-xs font-bold text-slate-950 shadow-xs transition hover:bg-amber-300"
            >
              3-Ladder Preview — $1,790 &rarr;
            </Link>

            <Link
              href="/proposal?plan=full"
              className="rounded-xl border border-teal-700 bg-teal-800/80 px-6 py-3.5 text-xs font-bold text-white transition hover:bg-teal-800"
            >
              Full 8-Ladder Pathway — $4,790 &rarr;
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs leading-relaxed text-slate-600 print:border-slate-300">
          <strong className="block text-slate-800">
            NQS mapping disclaimer
          </strong>

          <p className="mt-1">
            This mapping is provided by Play Move Improve as a professional
            learning support resource. It is not an ACECQA endorsement,
            regulatory determination or guarantee of an Assessment and Rating
            outcome. Services remain responsible for ensuring their QIP and
            evidence accurately represent their own practice.
          </p>
        </section>
      </main>
    </div>
  );
}