'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

type QualityArea = 'qa2' | 'qa5';

type AssessmentFields = {
  context: string;
  noticed: string;
  response: string;
  evidence: string;
  reflection: string;
  nextStep: string;
};

type ElementOption = {
  id: string;
  qualityArea: QualityArea;
  element: string;
  title: string;
  descriptor: string;
  practicePrompt: string;
};

const ELEMENTS: ElementOption[] = [
  {
    id: '2.1.1',
    qualityArea: 'qa2',
    element: 'Element 2.1.1',
    title: 'Wellbeing and comfort',
    descriptor:
      'Each child’s wellbeing and comfort is provided for, including appropriate opportunities to meet each child’s need for sleep, rest and relaxation.',
    practicePrompt:
      'Think about how educators notice distress, fatigue, sensory load, physical comfort and individual regulation needs.',
  },
  {
    id: '2.2.3',
    qualityArea: 'qa2',
    element: 'Element 2.2.3',
    title: 'Child safety and protection',
    descriptor:
      'Management, educators and staff are aware of their roles and responsibilities regarding child safety, including the need to identify and respond to every child at risk of abuse or neglect.',
    practicePrompt:
      'Think about professional boundaries, safe touch, safeguarding responsibilities, escalation pathways and how staff make safe decisions.',
  },
  {
    id: '5.1.1',
    qualityArea: 'qa5',
    element: 'Element 5.1.1',
    title: 'Positive educator to child interactions',
    descriptor:
      'Responsive and meaningful interactions build trusting relationships which engage and support each child to feel secure, confident and included.',
    practicePrompt:
      'Think about educator tone, pace, proximity, responsiveness, connection and what happens when a child becomes distressed.',
  },
  {
    id: '5.1.2',
    qualityArea: 'qa5',
    element: 'Element 5.1.2',
    title: 'Dignity and rights of the child',
    descriptor: 'The dignity and rights of every child are maintained.',
    practicePrompt:
      'Think about consent, choice, respectful language, bodily autonomy, privacy and whether children are being heard during difficult moments.',
  },
  {
    id: '5.2.2',
    qualityArea: 'qa5',
    element: 'Element 5.2.2',
    title: 'Self-regulation',
    descriptor:
      'Each child is supported to regulate their own behaviour, respond appropriately to the behaviour of others and communicate effectively to resolve conflicts.',
    practicePrompt:
      'Think about how educators scaffold regulation rather than expecting young children to manage difficult moments independently.',
  },
];

const EMPTY_FIELDS: AssessmentFields = {
  context: '',
  noticed: '',
  response: '',
  evidence: '',
  reflection: '',
  nextStep: '',
};

export default function ManagerDashboardPage() {
  const [qualityArea, setQualityArea] = useState<QualityArea>('qa5');
  const [selectedElementId, setSelectedElementId] = useState('5.1.1');
  const [fields, setFields] = useState<AssessmentFields>(EMPTY_FIELDS);
  const [copied, setCopied] = useState(false);

  const availableElements = ELEMENTS.filter(
    (item) => item.qualityArea === qualityArea,
  );

  const selectedElement =
    ELEMENTS.find((item) => item.id === selectedElementId) ??
    ELEMENTS.find((item) => item.qualityArea === qualityArea) ??
    ELEMENTS[0];

  const updateField = (
    field: keyof AssessmentFields,
    value: string,
  ) => {
    setFields((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleQualityAreaChange = (qa: QualityArea) => {
    setQualityArea(qa);

    const firstElement = ELEMENTS.find(
      (item) => item.qualityArea === qa,
    );

    if (firstElement) {
      setSelectedElementId(firstElement.id);
    }
  };

  const generatedText = useMemo(() => {
    const sections: string[] = [];

    if (fields.context.trim()) {
      sections.push(
        `As part of our self-assessment in relation to ${selectedElement.element} (${selectedElement.title}), our team reflected on ${fields.context.trim()}.`,
      );
    } else {
      sections.push(
        `As part of our self-assessment in relation to ${selectedElement.element} (${selectedElement.title}), our team reviewed current educator practice.`,
      );
    }

    if (fields.noticed.trim()) {
      sections.push(
        `Through this reflection, educators noticed that ${fields.noticed.trim()}.`,
      );
    }

    if (fields.response.trim()) {
      sections.push(
        `In response, the team ${fields.response.trim()}.`,
      );
    }

    if (fields.evidence.trim()) {
      sections.push(
        `Evidence informing this reflection includes ${fields.evidence.trim()}.`,
      );
    }

    if (fields.reflection.trim()) {
      sections.push(
        `Our reflection identified that ${fields.reflection.trim()}.`,
      );
    }

    if (fields.nextStep.trim()) {
      sections.push(
        `Our next step is to ${fields.nextStep.trim()}.`,
      );
    }

    return sections.join(' ');
  }, [fields, selectedElement]);

  const hasMeaningfulContent =
    fields.noticed.trim() ||
    fields.response.trim() ||
    fields.evidence.trim() ||
    fields.reflection.trim() ||
    fields.nextStep.trim();

  const copyGeneratedText = async () => {
    if (!hasMeaningfulContent) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };

  const clearAssessment = () => {
    setFields(EMPTY_FIELDS);
    setCopied(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-4 py-6 font-sans text-[#1C3B34] print:bg-white print:p-0 md:px-8 md:py-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-4xl border-2 border-[#E6E2DC] bg-white shadow-sm print:border-none print:shadow-none">
        {/* HEADER */}
        <header className="bg-[#1C3B34] p-6 text-white print:border-b-2 print:border-black print:bg-white print:p-0 print:pb-5 print:text-black md:p-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <span className="inline-flex rounded-full bg-[#C29F60] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#1C3B34] print:hidden">
                Manager Practice Tool
              </span>

              <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-white print:text-black md:text-3xl">
                QIP Self-Assessment Builder
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 print:text-gray-700">
                Turn real room observations, team reflection and practice
                changes into clear self-assessment notes for Quality Areas 2
                and 5.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 print:hidden">
              <Link
                href="/portal"
                className="flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Back to Service Hub
              </Link>

              <Link
                href="/platform/educator"
                className="flex min-h-12 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                Floor Deck
              </Link>
            </div>
          </div>
        </header>

        <main className="space-y-8 p-5 sm:p-6 md:p-8">
          {/* IMPORTANT NOTE */}
          <section className="rounded-3xl border border-[#C29F60]/50 bg-[#FAF5EC] p-5 print:border-gray-300">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C29F60] text-sm font-black text-[#1C3B34] print:border print:border-black print:bg-white">
                QIP
              </div>

              <div>
                <h2 className="text-sm font-extrabold text-[#1C3B34]">
                  Start with what actually happened in your service.
                </h2>

                <p className="mt-1 text-xs leading-relaxed text-[#53645D]">
                  This tool helps organise your own observations and reflection.
                  It does not create evidence for you and does not determine
                  whether your service meets or exceeds the National Quality
                  Standard.
                </p>
              </div>
            </div>
          </section>

          {/* STEP 1 */}
          <section className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
                Step 1
              </span>

              <h2 className="mt-1 text-xl font-extrabold text-[#1C3B34]">
                Which area are you reflecting on?
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 print:hidden">
              <button
                type="button"
                onClick={() => handleQualityAreaChange('qa2')}
                className={`min-h-12 rounded-2xl border-2 p-5 text-left transition ${
                  qualityArea === 'qa2'
                    ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
                    : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
                }`}
              >
                <span className="block text-xs font-black uppercase tracking-widest text-[#C29F60]">
                  Quality Area 2
                </span>

                <span className="mt-1 block text-lg font-extrabold">
                  Children&apos;s health and safety
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleQualityAreaChange('qa5')}
                className={`min-h-12 rounded-2xl border-2 p-5 text-left transition ${
                  qualityArea === 'qa5'
                    ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
                    : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
                }`}
              >
                <span className="block text-xs font-black uppercase tracking-widest text-[#C29F60]">
                  Quality Area 5
                </span>

                <span className="mt-1 block text-lg font-extrabold">
                  Relationships with children
                </span>
              </button>
            </div>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 print:hidden">
              {availableElements.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedElementId(item.id)}
                  className={`min-h-12 rounded-2xl border-2 p-4 text-left transition ${
                    selectedElementId === item.id
                      ? 'border-[#C29F60] bg-[#FAF5EC]'
                      : 'border-[#E6E2DC] bg-white hover:border-[#657B6C]'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#657B6C]">
                    {item.element}
                  </span>

                  <span className="mt-1 block text-sm font-extrabold text-[#1C3B34]">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            {/* CURRENT NQS ELEMENT */}
            <div className="rounded-3xl border-2 border-[#657B6C] bg-[#F1F4F2] p-5 print:border-black print:bg-white">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#657B6C]">
                    {qualityArea === 'qa2'
                      ? 'Quality Area 2'
                      : 'Quality Area 5'}{' '}
                    · {selectedElement.element}
                  </span>

                  <h3 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
                    {selectedElement.title}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-sm leading-relaxed text-[#2B3833]">
                {selectedElement.descriptor}
              </p>

              <div className="mt-4 rounded-2xl bg-white p-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C29F60]">
                  Regulator Champions reflection lens
                </span>

                <p className="mt-1 text-xs leading-relaxed text-[#53645D]">
                  {selectedElement.practicePrompt}
                </p>
              </div>
            </div>
          </section>

          {/* STEP 2 */}
          <section className="space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
                Step 2
              </span>

              <h2 className="mt-1 text-xl font-extrabold text-[#1C3B34]">
                Record what your team actually noticed.
              </h2>

              <p className="mt-1 text-sm leading-relaxed text-[#6A7873]">
                Short, specific observations are more useful than trying to
                write polished QIP language immediately.
              </p>
            </div>

            <div className="grid gap-5">
              {/* CONTEXT */}
              <label className="block">
                <span className="text-sm font-extrabold text-[#1C3B34]">
                  What routine, room or situation were you reviewing?
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
                  For example: morning drop-off, mat time, transitions, lunch,
                  rest time or late afternoon.
                </span>

                <textarea
                  value={fields.context}
                  onChange={(event) =>
                    updateField('context', event.target.value)
                  }
                  rows={2}
                  placeholder="We reviewed our morning drop-off routine in the preschool room..."
                  className="mt-2 w-full rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-4 text-sm leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
                />
              </label>

              {/* NOTICED */}
              <label className="block">
                <span className="text-sm font-extrabold text-[#1C3B34]">
                  What did educators notice?
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
                  Describe what you could see or hear before interpreting why
                  it was happening.
                </span>

                <textarea
                  value={fields.noticed}
                  onChange={(event) =>
                    updateField('noticed', event.target.value)
                  }
                  rows={3}
                  placeholder="several children became quieter, held tightly to their parent and stopped responding when the entry area became busy..."
                  className="mt-2 w-full rounded-2xl border-2 border-[#E6E2DC] bg-white p-4 text-sm leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
                />
              </label>

              {/* RESPONSE */}
              <label className="block">
                <span className="text-sm font-extrabold text-[#1C3B34]">
                  What did the team change or try?
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
                  Record the practice change rather than what you hoped would
                  happen.
                </span>

                <textarea
                  value={fields.response}
                  onChange={(event) =>
                    updateField('response', event.target.value)
                  }
                  rows={3}
                  placeholder="changed the arrival setup, reduced repeated verbal prompts and allocated one educator to remain available for slower handovers..."
                  className="mt-2 w-full rounded-2xl border-2 border-[#E6E2DC] bg-white p-4 text-sm leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
                />
              </label>

              {/* EVIDENCE */}
              <label className="block">
                <span className="text-sm font-extrabold text-[#1C3B34]">
                  What evidence do you actually have?
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
                  This might include educator reflections, meeting notes,
                  observations, family feedback, photographs of environment
                  changes or documented practice discussions.
                </span>

                <textarea
                  value={fields.evidence}
                  onChange={(event) =>
                    updateField('evidence', event.target.value)
                  }
                  rows={3}
                  placeholder="educator reflection notes from 12 August, discussion recorded at the room meeting, and feedback from three families..."
                  className="mt-2 w-full rounded-2xl border-2 border-[#E6E2DC] bg-white p-4 text-sm leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
                />
              </label>

              {/* CRITICAL REFLECTION */}
              <label className="block">
                <span className="text-sm font-extrabold text-[#1C3B34]">
                  What did this make the team reconsider?
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
                  This is where you move beyond describing an activity and
                  reflect on assumptions, expectations or previous practice.
                </span>

                <textarea
                  value={fields.reflection}
                  onChange={(event) =>
                    updateField('reflection', event.target.value)
                  }
                  rows={3}
                  placeholder="we had been interpreting delayed entry as reluctance to separate rather than considering the sensory and social load at the doorway..."
                  className="mt-2 w-full rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF5EC] p-4 text-sm leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
                />
              </label>

              {/* NEXT STEP */}
              <label className="block">
                <span className="text-sm font-extrabold text-[#1C3B34]">
                  What will you do next?
                </span>

                <span className="mt-1 block text-xs leading-relaxed text-[#6A7873]">
                  Make this observable enough that your team can come back and
                  review whether it made a difference.
                </span>

                <textarea
                  value={fields.nextStep}
                  onChange={(event) =>
                    updateField('nextStep', event.target.value)
                  }
                  rows={3}
                  placeholder="trial the revised arrival approach for three weeks, gather family feedback and review the pattern at our next room meeting..."
                  className="mt-2 w-full rounded-2xl border-2 border-[#E6E2DC] bg-white p-4 text-sm leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
                />
              </label>
            </div>
          </section>

          {/* STEP 3 */}
          <section className="space-y-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
                Step 3
              </span>

              <h2 className="mt-1 text-xl font-extrabold text-[#1C3B34]">
                Turn the reflection into a usable self-assessment note.
              </h2>
            </div>

            <div className="rounded-3xl border-2 border-[#C29F60] bg-[#FAF5EC] p-5 sm:p-6 print:border-black print:bg-white">
              <div className="border-b border-[#C29F60]/30 pb-4 print:border-gray-300">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#9A793D]">
                  {selectedElement.element} · {selectedElement.title}
                </span>

                <h3 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
                  Draft self-assessment reflection
                </h3>
              </div>

              {!hasMeaningfulContent ? (
                <div className="mt-5 rounded-2xl border border-[#E6E2DC] bg-white p-5">
                  <p className="text-sm leading-relaxed text-[#6A7873]">
                    Add your team&apos;s observations above. Your draft will
                    build here as you type.
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-2xl border border-[#E6E2DC] bg-white p-5">
                  <p className="text-sm leading-7 text-[#2B3833]">
                    {generatedText}
                  </p>
                </div>
              )}

              <div className="mt-4 flex flex-col gap-3 print:hidden sm:flex-row">
                <button
                  type="button"
                  onClick={() => void copyGeneratedText()}
                  disabled={!hasMeaningfulContent}
                  className="flex min-h-12 flex-1 items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {copied ? 'Copied to clipboard' : 'Copy self-assessment text'}
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  disabled={!hasMeaningfulContent}
                  className="flex min-h-12 items-center justify-center rounded-xl border-2 border-[#657B6C] bg-white px-5 py-3 text-sm font-bold text-[#1C3B34] transition hover:bg-[#F1F4F2] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Print reflection
                </button>

                <button
                  type="button"
                  onClick={clearAssessment}
                  className="flex min-h-12 items-center justify-center rounded-xl border-2 border-[#E6E2DC] bg-white px-5 py-3 text-sm font-bold text-[#6A7873] transition hover:border-[#657B6C]"
                >
                  Clear
                </button>
              </div>
            </div>
          </section>

          {/* REFLECTION CHECK */}
          <section className="rounded-3xl bg-[#1C3B34] p-6 text-white print:border print:border-black print:bg-white print:text-black">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E4C98E] print:text-black">
              Before adding this to your QIP
            </span>

            <h2 className="mt-2 text-xl font-extrabold">
              Can your team point to the evidence behind the words?
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                'Does this describe something that actually occurred?',
                'Could an educator explain this practice in their own words?',
                'Have you included evidence rather than only an intention?',
                'Does the reflection show what the team learned or reconsidered?',
                'Is the next step specific enough to review later?',
                'Would families or children recognise this practice in the room?',
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 print:border-gray-300"
                >
                  <p className="text-xs font-medium leading-relaxed text-white/90 print:text-black">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* FOOTER NOTE */}
          <section className="border-t border-[#E6E2DC] pt-5">
            <p className="text-xs leading-relaxed text-[#6A7873]">
              Regulator Champions supports professional reflection and practice
              development. Services remain responsible for ensuring their QIP,
              self-assessment records and evidence accurately reflect their own
              practice and current regulatory requirements.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}