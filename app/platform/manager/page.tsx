'use client';

import React, {
  useMemo,
  useState,
} from 'react';
import Link from 'next/link';

type QualityArea =
  | 'qa2'
  | 'qa5';

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
    title:
      'Positive educator to child interactions',
    descriptor:
      'Responsive and meaningful interactions build trusting relationships which engage and support each child to feel secure, confident and included.',
    practicePrompt:
      'Think about educator tone, pace, proximity, responsiveness, connection and what happens when a child becomes distressed.',
  },
  {
    id: '5.1.2',
    qualityArea: 'qa5',
    element: 'Element 5.1.2',
    title:
      'Dignity and rights of the child',
    descriptor:
      'The dignity and rights of every child are maintained.',
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

const MANAGER_STEPS = [
  {
    number: '1',
    title: 'Choose the practice area',
    text: 'Start with the NQS element that best matches the real situation your team has been discussing.',
  },
  {
    number: '2',
    title: 'Describe what happened',
    text: 'Record what educators actually saw, heard and tried before worrying about polished QIP wording.',
  },
  {
    number: '3',
    title: 'Look for evidence',
    text: 'Identify what can genuinely support the reflection, such as observations, meeting notes or family feedback.',
  },
  {
    number: '4',
    title: 'Reflect critically',
    text: 'Ask what the experience changed in your team’s thinking or assumptions.',
  },
  {
    number: '5',
    title: 'Choose a next step',
    text: 'Decide what your team will trial, review or revisit next.',
  },
];

export default function ManagerDashboardPage() {
  const [
    qualityArea,
    setQualityArea,
  ] =
    useState<QualityArea>('qa5');

  const [
    selectedElementId,
    setSelectedElementId,
  ] =
    useState('5.1.1');

  const [fields, setFields] =
    useState<AssessmentFields>(
      EMPTY_FIELDS,
    );

  const [copied, setCopied] =
    useState(false);

  const availableElements =
    ELEMENTS.filter(
      (item) =>
        item.qualityArea ===
        qualityArea,
    );

  const selectedElement =
    ELEMENTS.find(
      (item) =>
        item.id ===
        selectedElementId,
    ) ??
    ELEMENTS.find(
      (item) =>
        item.qualityArea ===
        qualityArea,
    ) ??
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

  const handleQualityAreaChange = (
    qa: QualityArea,
  ) => {
    setQualityArea(qa);

    const firstElement =
      ELEMENTS.find(
        (item) =>
          item.qualityArea === qa,
      );

    if (firstElement) {
      setSelectedElementId(
        firstElement.id,
      );
    }
  };

  const generatedText =
    useMemo(() => {
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

      if (
        fields.reflection.trim()
      ) {
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
    Boolean(
      fields.noticed.trim() ||
        fields.response.trim() ||
        fields.evidence.trim() ||
        fields.reflection.trim() ||
        fields.nextStep.trim(),
    );

  const copyGeneratedText =
    async () => {
      if (!hasMeaningfulContent) {
        return;
      }

      try {
        await navigator.clipboard.writeText(
          generatedText,
        );

        setCopied(true);

        window.setTimeout(() => {
          setCopied(false);
        }, 1800);
      } catch (error) {
        console.error(
          'Copy failed:',
          error,
        );
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
    <div className="min-h-screen bg-[#FAF8F5] pb-20 text-[#1C3B34] print:bg-white print:p-0">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E5DED4] bg-white/95 shadow-sm backdrop-blur-md print:static print:border-none print:bg-white print:shadow-none">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 print:px-0">
          <div>
            <span className="block text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Regulator Champions
            </span>

            <h1 className="mt-1 text-xl font-extrabold text-[#1C3B34] sm:text-2xl">
              Manager Practice Hub
            </h1>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <Link
              href="/portal"
              className="flex min-h-12 items-center rounded-2xl border-2 border-[#E5DED4] bg-white px-4 py-3 text-sm font-bold text-[#1C3B34] transition hover:border-[#657B6C]"
            >
              Member Hub
            </Link>

            <Link
              href="/platform/educator"
              className="hidden min-h-12 items-center rounded-2xl bg-[#657B6C] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#53665A] sm:flex"
            >
              Floor Deck
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-9 px-5 py-8 sm:px-6 sm:py-10 print:px-0 print:py-4">

        {/* INTRO */}
        <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white shadow-lg print:rounded-none print:border-b-2 print:border-black print:bg-white print:text-black print:shadow-none">
          <div className="p-7 sm:p-10 print:px-0">
            <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34] print:hidden">
              For directors and educational
              leaders
            </span>

            <h2 className="mt-5 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl print:text-black">
              Turn real practice into useful
              team reflection and QIP evidence.
            </h2>

            <p className="mt-5 max-w-4xl text-xl leading-relaxed text-[#D8E1DC] print:text-black">
              Start with something that
              actually happened in your
              service. This tool helps you
              organise what your team noticed,
              what changed and what you want
              to do next.
            </p>

            <div className="mt-7 rounded-3xl border border-white/10 bg-white/5 p-6 print:border-gray-300 print:bg-white">
              <p className="text-lg font-extrabold text-[#E4C98E] print:text-black">
                Do not start by trying to
                write impressive QIP language.
              </p>

              <p className="mt-2 max-w-3xl text-lg leading-relaxed text-[#D8E1DC] print:text-black">
                Start with the real room,
                the real educators and the
                real change in practice.
              </p>
            </div>
          </div>
        </section>

        {/* HOW TO USE */}
        <section className="print:hidden">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            How to use this manager tool
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Work through one real practice
            issue at a time.
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MANAGER_STEPS.map(
              (step) => (
                <article
                  key={step.number}
                  className="rounded-3xl border border-[#E5DED4] bg-white p-5 shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C29F60] font-extrabold text-[#1C3B34]">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-xl font-extrabold text-[#1C3B34]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                    {step.text}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>

        {/* IMPORTANT NOTE */}
        <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-6 sm:p-7 print:border-gray-300 print:bg-white">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C29F60] text-base font-extrabold text-[#1C3B34] print:border print:border-black print:bg-white">
              QIP
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-[#1C3B34]">
                This tool organises your
                evidence. It does not create
                evidence for you.
              </h2>

              <p className="mt-2 max-w-4xl text-base leading-relaxed text-[#53645D]">
                Your final self-assessment
                should reflect what genuinely
                happened in your service and
                what your team can explain,
                demonstrate or point to.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 1 */}
        <section>
          <span className="inline-flex rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-extrabold text-[#9A793D] print:hidden">
            Step 1
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            What area of practice are you
            reviewing?
          </h2>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            Choose the area that feels
            closest. You can always create
            another reflection for a
            different element later.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 print:hidden">
            <button
              type="button"
              onClick={() =>
                handleQualityAreaChange(
                  'qa2',
                )
              }
              className={`rounded-3xl border-2 p-6 text-left transition ${
                qualityArea === 'qa2'
                  ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                  : 'border-[#E5DED4] bg-white text-[#1C3B34] hover:border-[#657B6C]'
              }`}
            >
              <span
                className={`text-sm font-extrabold uppercase tracking-[0.12em] ${
                  qualityArea === 'qa2'
                    ? 'text-[#E4C98E]'
                    : 'text-[#9A793D]'
                }`}
              >
                Quality Area 2
              </span>

              <span className="mt-3 block text-2xl font-extrabold">
                Children&apos;s health and
                safety
              </span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleQualityAreaChange(
                  'qa5',
                )
              }
              className={`rounded-3xl border-2 p-6 text-left transition ${
                qualityArea === 'qa5'
                  ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
                  : 'border-[#E5DED4] bg-white text-[#1C3B34] hover:border-[#657B6C]'
              }`}
            >
              <span
                className={`text-sm font-extrabold uppercase tracking-[0.12em] ${
                  qualityArea === 'qa5'
                    ? 'text-[#E4C98E]'
                    : 'text-[#9A793D]'
                }`}
              >
                Quality Area 5
              </span>

              <span className="mt-3 block text-2xl font-extrabold">
                Relationships with children
              </span>
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3 print:hidden">
            {availableElements.map(
              (item) => {
                const selected =
                  selectedElementId ===
                  item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setSelectedElementId(
                        item.id,
                      )
                    }
                    className={`rounded-3xl border-2 p-5 text-left transition ${
                      selected
                        ? 'border-[#C29F60] bg-[#FAF5EC] shadow-sm'
                        : 'border-[#E5DED4] bg-white hover:border-[#657B6C]'
                    }`}
                  >
                    <span className="text-sm font-extrabold uppercase tracking-[0.1em] text-[#657B6C]">
                      {item.element}
                    </span>

                    <span className="mt-2 block text-xl font-extrabold text-[#1C3B34]">
                      {item.title}
                    </span>
                  </button>
                );
              },
            )}
          </div>

          {/* SELECTED ELEMENT */}
          <div className="mt-6 rounded-4xl border-2 border-[#657B6C] bg-[#F1F4F2] p-6 sm:p-7 print:border-black print:bg-white">
            <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
              {qualityArea === 'qa2'
                ? 'Quality Area 2'
                : 'Quality Area 5'}{' '}
              · {selectedElement.element}
            </span>

            <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
              {selectedElement.title}
            </h3>

            <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#2B3833]">
              {selectedElement.descriptor}
            </p>

            <div className="mt-5 rounded-3xl bg-white p-5">
              <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                Regulator Champions lens
              </span>

              <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                {selectedElement.practicePrompt}
              </p>
            </div>
          </div>
        </section>

        {/* STEP 2 */}
        <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm sm:p-9">
          <span className="inline-flex rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-extrabold text-[#9A793D] print:hidden">
            Step 2
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Start with what actually happened.
          </h2>

          <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            Do not write this as if you are
            trying to impress an assessor.
            Write it as if you are explaining
            the situation to another educator.
          </p>

          <div className="mt-8 space-y-8">

            <ReflectionField
              number="1"
              title="What routine, room or situation were you reviewing?"
              helper="Name the real context. For example: morning drop-off, mat time, transitions, rest time or late afternoon."
              example="We reviewed our morning drop-off routine in the preschool room..."
              value={fields.context}
              onChange={(value) =>
                updateField(
                  'context',
                  value,
                )
              }
            />

            <ReflectionField
              number="2"
              title="What did educators actually notice?"
              helper="Describe what you could see or hear before interpreting why it was happening."
              example="Several children became quieter, held tightly to their parent and stopped responding when the entry area became busy..."
              value={fields.noticed}
              onChange={(value) =>
                updateField(
                  'noticed',
                  value,
                )
              }
              accent
            />

            <ReflectionField
              number="3"
              title="What did the team change or try?"
              helper="Record the practice change itself rather than what you hoped would happen."
              example="We changed the arrival setup, reduced repeated verbal prompts and allocated one educator to remain available for slower handovers..."
              value={fields.response}
              onChange={(value) =>
                updateField(
                  'response',
                  value,
                )
              }
            />
          </div>
        </section>

        {/* STEP 3 */}
        <section className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7 sm:p-9">
          <span className="inline-flex rounded-full bg-[#1C3B34] px-4 py-2 text-sm font-extrabold text-white print:hidden">
            Step 3
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            What evidence can your team
            genuinely point to?
          </h2>

          <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            Evidence does not need to be
            complicated. It needs to be real.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 print:hidden">
            {[
              'Educator reflections',
              'Room or team meeting notes',
              'Family feedback',
              'Observations or documented environment changes',
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl bg-white p-5"
              >
                <p className="text-lg font-bold leading-relaxed text-[#2B3833]">
                  {item}
                </p>
              </div>
            ))}
          </div>

          <label className="mt-7 block">
            <span className="text-xl font-extrabold text-[#1C3B34]">
              What evidence do you actually
              have?
            </span>

            <span className="mt-2 block text-base leading-relaxed text-[#65736D]">
              Only include evidence that
              exists and that your team could
              locate or explain.
            </span>

            <textarea
              value={fields.evidence}
              onChange={(event) =>
                updateField(
                  'evidence',
                  event.target.value,
                )
              }
              rows={4}
              placeholder="Educator reflection notes from 12 August, discussion recorded at the room meeting, and feedback from three families..."
              className="mt-4 w-full rounded-2xl border-2 border-[#E5DED4] bg-white p-5 text-base leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
            />
          </label>
        </section>

        {/* STEP 4 */}
        <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 sm:p-9">
          <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34] print:hidden">
            Step 4
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            What did this make your team
            reconsider?
          </h2>

          <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            This is the part that turns a
            description of activity into
            critical reflection.
          </p>

          <div className="mt-6 rounded-3xl bg-white p-6">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              Useful critical reflection
              might sound like:
            </p>

            <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
              “We realised we had been
              interpreting delayed entry as
              reluctance to separate, rather
              than considering the sensory
              and social load at the doorway.”
            </p>
          </div>

          <label className="mt-7 block">
            <span className="text-xl font-extrabold text-[#1C3B34]">
              What did your team learn or
              reconsider?
            </span>

            <textarea
              value={fields.reflection}
              onChange={(event) =>
                updateField(
                  'reflection',
                  event.target.value,
                )
              }
              rows={4}
              placeholder="We had been interpreting delayed entry as reluctance to separate rather than considering the sensory and social load at the doorway..."
              className="mt-4 w-full rounded-2xl border-2 border-[#E5DED4] bg-white p-5 text-base leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
            />
          </label>
        </section>

        {/* STEP 5 */}
        <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm sm:p-9">
          <span className="inline-flex rounded-full bg-[#F1F4F2] px-4 py-2 text-sm font-extrabold text-[#657B6C] print:hidden">
            Step 5
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            What will your team do next?
          </h2>

          <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            Make the next step small enough
            that your team can actually
            trial it and specific enough
            that you can review it later.
          </p>

          <div className="mt-6 rounded-3xl bg-[#F1F4F2] p-6">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              A useful next step has three
              parts:
            </p>

            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <MiniStep
                title="What?"
                text="What exactly will change?"
              />

              <MiniStep
                title="How long?"
                text="How long will you trial it?"
              />

              <MiniStep
                title="Review how?"
                text="How will you know whether it helped?"
              />
            </div>
          </div>

          <label className="mt-7 block">
            <span className="text-xl font-extrabold text-[#1C3B34]">
              What is the next action?
            </span>

            <textarea
              value={fields.nextStep}
              onChange={(event) =>
                updateField(
                  'nextStep',
                  event.target.value,
                )
              }
              rows={4}
              placeholder="Trial the revised arrival approach for three weeks, gather family feedback and review the pattern at our next room meeting..."
              className="mt-4 w-full rounded-2xl border-2 border-[#E5DED4] bg-white p-5 text-base leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C]"
            />
          </label>
        </section>

        {/* DRAFT */}
        <section>
          <span className="inline-flex rounded-full bg-[#1C3B34] px-4 py-2 text-sm font-extrabold text-white print:hidden">
            Step 6
          </span>

          <h2 className="mt-4 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            Turn your reflection into usable
            self-assessment wording.
          </h2>

          <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            The draft below simply organises
            what you entered. Read it back
            and make sure it still sounds
            like your service.
          </p>

          <div className="mt-6 rounded-4xl border-2 border-[#C29F60] bg-[#FAF5EC] p-6 sm:p-8 print:border-black print:bg-white">
            <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
              {selectedElement.element} ·{' '}
              {selectedElement.title}
            </span>

            <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
              Draft self-assessment
              reflection
            </h3>

            {!hasMeaningfulContent ? (
              <div className="mt-6 rounded-3xl border border-[#E5DED4] bg-white p-6">
                <p className="text-lg leading-relaxed text-[#65736D]">
                  Add your team&apos;s real
                  observations above. Your
                  draft will build here as
                  you type.
                </p>
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-[#E5DED4] bg-white p-6">
                <p className="text-lg leading-8 text-[#2B3833]">
                  {generatedText}
                </p>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3 print:hidden sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  void copyGeneratedText()
                }
                disabled={
                  !hasMeaningfulContent
                }
                className="flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {copied
                  ? 'Copied'
                  : 'Copy self-assessment text'}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                disabled={
                  !hasMeaningfulContent
                }
                className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-[#657B6C] bg-white px-6 py-4 text-base font-bold text-[#1C3B34] disabled:opacity-40"
              >
                Print reflection
              </button>

              <button
                type="button"
                onClick={
                  clearAssessment
                }
                className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-[#E5DED4] bg-white px-6 py-4 text-base font-bold text-[#65736D]"
              >
                Clear
              </button>
            </div>
          </div>
        </section>

        {/* CHECK */}
        <section className="rounded-4xl bg-[#1C3B34] p-7 text-white sm:p-9 print:border print:border-black print:bg-white print:text-black">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E] print:text-black">
            Before putting this into your QIP
          </span>

          <h2 className="mt-3 text-3xl font-extrabold">
            Can your team point to the real
            practice behind these words?
          </h2>

          <div className="mt-7 grid gap-4 sm:grid-cols-2">
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
                className="rounded-3xl border border-white/10 bg-white/5 p-5 print:border-gray-300 print:bg-white"
              >
                <p className="text-lg font-medium leading-relaxed text-white print:text-black">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT NEXT */}
        <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 sm:p-9 print:hidden">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            What happens after this?
          </span>

          <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
            The reflection is useful only if
            it changes what happens next.
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NextAction
              title="Share"
              text="Bring the reflection back to the educators involved."
            />

            <NextAction
              title="Trial"
              text="Use the agreed practice change in the room."
            />

            <NextAction
              title="Review"
              text="Come back to the evidence after the agreed period."
            />

            <NextAction
              title="Ask"
              text="Bring unresolved patterns into the Monthly Hub or coaching session."
            />
          </div>
        </section>

        {/* FOOTER */}
        <section className="border-t border-[#E5DED4] pt-6">
          <p className="text-sm leading-relaxed text-[#65736D]">
            Regulator Champions supports
            professional reflection and
            practice development. Services
            remain responsible for ensuring
            their QIP, self-assessment
            records and evidence accurately
            reflect their own practice and
            current regulatory
            requirements.
          </p>
        </section>
      </main>
    </div>
  );
}

function ReflectionField({
  number,
  title,
  helper,
  example,
  value,
  onChange,
  accent = false,
}: {
  number: string;
  title: string;
  helper: string;
  example: string;
  value: string;
  onChange: (value: string) => void;
  accent?: boolean;
}) {
  return (
    <label className="block">
      <div className="flex items-start gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-extrabold ${
            accent
              ? 'bg-[#C29F60] text-[#1C3B34]'
              : 'bg-[#F1F4F2] text-[#657B6C]'
          }`}
        >
          {number}
        </span>

        <div>
          <span className="block text-xl font-extrabold text-[#1C3B34]">
            {title}
          </span>

          <span className="mt-2 block text-base leading-relaxed text-[#65736D]">
            {helper}
          </span>
        </div>
      </div>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        rows={4}
        placeholder={example}
        className={`mt-4 w-full rounded-2xl border-2 p-5 text-base leading-relaxed text-[#1C3B34] outline-none transition placeholder:text-[#9AA5A0] focus:border-[#657B6C] ${
          accent
            ? 'border-[#C29F60]/40 bg-[#FAF5EC]'
            : 'border-[#E5DED4] bg-[#FAF8F5]'
        }`}
      />
    </label>
  );
}

function MiniStep({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-4">
      <h3 className="text-lg font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </div>
  );
}

function NextAction({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl bg-white p-5">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </article>
  );
}