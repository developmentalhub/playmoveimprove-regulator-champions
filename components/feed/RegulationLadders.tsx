'use client';

import React, { useMemo, useState } from 'react';

import {
  regulationLadders,
  type RegulationLadder,
  type RegulationLadderRung,
} from '@/lib/regulationLadders';

interface RegulationLaddersProps {
  userEmail?: string;
}

type CapacityOption = {
  id: string;
  label: string;
};

type RoomFactor = {
  id: string;
  label: string;
};

const CAPACITY_OPTIONS: CapacityOption[] = [
  {
    id: 'steady',
    label: 'I felt fairly steady',
  },
  {
    id: 'pressure',
    label: 'I could feel pressure building',
  },
  {
    id: 'low',
    label: 'I was running low too',
  },
];

const ROOM_FACTORS: RoomFactor[] = [
  {
    id: 'noise',
    label: 'Noise',
  },
  {
    id: 'crowding',
    label: 'Crowding',
  },
  {
    id: 'waiting',
    label: 'Waiting',
  },
  {
    id: 'fatigue',
    label: 'Fatigue',
  },
];

const HOW_TO_USE_STEPS = [
  {
    number: '1',
    title: 'Choose what is hard',
    text: 'Pick the ladder that sounds closest to the situation happening in your room.',
  },
  {
    number: '2',
    title: 'Choose one rung',
    text: 'You do not need to work through the whole ladder. Start with one practical idea.',
  },
  {
    number: '3',
    title: 'Try it',
    text: 'Use the practice prompt during a real moment with a child or group.',
  },
  {
    number: '4',
    title: 'Watch what changes',
    text: 'Notice the child, the environment and your own response. Success is not only whether the behaviour stopped.',
  },
  {
    number: '5',
    title: 'Reflect briefly',
    text: 'Save one quick observation so you and your team can build on what you noticed.',
  },
];

export default function RegulationLadders({
  userEmail = '',
}: RegulationLaddersProps) {
  const availableLadders = useMemo(
    () =>
      regulationLadders.filter(
        (ladder) =>
          ladder.availability ===
          'available',
      ),
    [],
  );

  const launchingSoonLadders = useMemo(
    () =>
      regulationLadders.filter(
        (ladder) =>
          ladder.availability ===
          'launching-soon',
      ),
    [],
  );

  const comingSoonLadders = useMemo(
    () =>
      regulationLadders.filter(
        (ladder) =>
          ladder.availability ===
          'in-development',
      ),
    [],
  );

  const [
    selectedLadderId,
    setSelectedLadderId,
  ] = useState(
    availableLadders[0]?.id ?? '',
  );

  const [
    selectedRungNumber,
    setSelectedRungNumber,
  ] = useState(1);

  const [capacity, setCapacity] =
    useState<string | null>(null);

  const [roomFactor, setRoomFactor] =
    useState<string | null>(null);

  const [note, setNote] =
    useState('');

  const [saving, setSaving] =
    useState(false);

  const [saved, setSaved] =
    useState(false);

  const [error, setError] =
    useState('');

  const selectedLadder =
    availableLadders.find(
      (ladder) =>
        ladder.id === selectedLadderId,
    ) ?? availableLadders[0];

  const selectedRung =
    selectedLadder?.rungs.find(
      (rung) =>
        rung.number ===
        selectedRungNumber,
    ) ?? selectedLadder?.rungs[0];

  const resetReflection = () => {
    setCapacity(null);
    setRoomFactor(null);
    setNote('');
    setSaved(false);
    setError('');
  };

  const selectLadder = (
    ladder: RegulationLadder,
  ) => {
    setSelectedLadderId(ladder.id);
    setSelectedRungNumber(1);
    resetReflection();
  };

  const selectRung = (
    rung: RegulationLadderRung,
  ) => {
    setSelectedRungNumber(
      rung.number,
    );
    resetReflection();
  };

  const handleSave = async () => {
    if (
      !selectedLadder ||
      !selectedRung
    ) {
      return;
    }

    if (!capacity) {
      setError(
        'Choose the option that feels closest first.',
      );
      return;
    }

    setSaving(true);
    setSaved(false);
    setError('');

    const capacityLabel =
      CAPACITY_OPTIONS.find(
        (option) =>
          option.id === capacity,
      )?.label ?? capacity;

    const factorLabel =
      ROOM_FACTORS.find(
        (factor) =>
          factor.id === roomFactor,
      )?.label ?? roomFactor;

    const summaryParts = [
      `Educator reflection: ${capacityLabel}.`,
      factorLabel
        ? `Room factor noticed: ${factorLabel}.`
        : '',
      note.trim()
        ? `Note: ${note.trim()}`
        : '',
    ].filter(Boolean);

    try {
      const response = await fetch(
        '/api/ladder-rung',
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json',
          },
          body: JSON.stringify({
            userEmail,
            ladderId:
              selectedLadder.id,
            ladderTitle:
              selectedLadder.title,
            rungNumber:
              selectedRung.number,
            rungTitle:
              selectedRung.title,
            tankLevel:
              capacityLabel,
            primaryStressor:
              factorLabel || '',
            notes:
              summaryParts.join(' '),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          'Unable to save reflection',
        );
      }

      setSaved(true);
    } catch (saveError) {
      console.error(saveError);

      setError(
        'This reflection could not be saved. Please try again.',
      );
    } finally {
      setSaving(false);
    }
  };

  if (
    !selectedLadder ||
    !selectedRung
  ) {
    return (
      <section className="rounded-4xl border border-[#E5DED4] bg-white p-7">
        <p className="text-lg text-[#65736D]">
          No regulation ladders are
          available yet.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-10">

      {/* HOW TO USE THE LADDERS */}
      <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white shadow-lg">
        <div className="p-7 sm:p-9">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
            How to use a Regulation Ladder
          </span>

          <h2 className="mt-3 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl">
            You are not trying to complete
            the ladder.
          </h2>

          <p className="mt-5 max-w-4xl text-xl leading-relaxed text-[#D8E1DC]">
            Use it when something feels
            difficult. Choose one rung,
            try one idea and notice what
            happens.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {HOW_TO_USE_STEPS.map(
              (step) => (
                <article
                  key={step.number}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C29F60] text-base font-extrabold text-[#1C3B34]">
                    {step.number}
                  </span>

                  <h3 className="mt-4 text-lg font-extrabold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-base leading-relaxed text-[#C8D6D0]">
                    {step.text}
                  </p>
                </article>
              ),
            )}
          </div>

          <div className="mt-7 rounded-3xl border border-[#C29F60]/40 bg-[#C29F60]/10 p-5">
            <p className="text-lg font-extrabold text-[#E4C98E]">
              The goal is not to make the
              behaviour disappear as quickly
              as possible.
            </p>

            <p className="mt-2 text-lg leading-relaxed text-[#D8E1DC]">
              The goal is to understand more,
              respond thoughtfully and learn
              what helps this child in this
              context.
            </p>
          </div>
        </div>
      </section>

      {/* STEP 1 */}
      <section>
        <div className="mb-5">
          <span className="inline-flex rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-extrabold text-[#9A793D]">
            Step 1
          </span>

          <h3 className="mt-4 text-3xl font-extrabold text-[#1C3B34]">
            What is hard right now?
          </h3>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            Choose the ladder that sounds
            closest to what your team is
            dealing with. You do not need
            to diagnose the child or be
            certain why it is happening.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {availableLadders.map(
            (ladder) => {
              const isSelected =
                ladder.id ===
                selectedLadder.id;

              return (
                <button
                  key={ladder.id}
                  type="button"
                  onClick={() =>
                    selectLadder(ladder)
                  }
                  className={`min-h-48 rounded-4xl border-2 p-6 text-left transition ${
                    isSelected
                      ? 'border-[#1C3B34] bg-[#F1F4F2] shadow-md'
                      : 'border-[#E5DED4] bg-white hover:border-[#657B6C]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-base font-extrabold ${
                        isSelected
                          ? 'bg-[#1C3B34] text-white'
                          : 'bg-[#FAF5EC] text-[#1C3B34]'
                      }`}
                    >
                      {ladder.number}
                    </span>

                    {isSelected && (
                      <span className="rounded-full bg-[#1C3B34] px-4 py-2 text-sm font-extrabold text-white">
                        Selected
                      </span>
                    )}
                  </div>

                  <h4 className="mt-5 text-2xl font-extrabold text-[#1C3B34]">
                    {ladder.title}
                  </h4>

                  <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
                    {ladder.subtitle}
                  </p>
                </button>
              );
            },
          )}
        </div>
      </section>

      {/* ACTIVE LADDER */}
      <section className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white shadow-sm">

        {/* LADDER INTRO */}
        <div className="border-b border-[#E5DED4] bg-[#FAF8F5] p-7 sm:p-9">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            You chose Ladder{' '}
            {selectedLadder.number}
          </span>

          <h3 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            {selectedLadder.title}
          </h3>

          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            {selectedLadder.description}
          </p>

          <div className="mt-7 rounded-3xl bg-white p-5">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              What do I do now?
            </p>

            <p className="mt-2 text-base leading-relaxed text-[#65736D]">
              Look through the rung numbers
              below. Open one. Read the
              practical suggestion. Try it
              during a real moment. Then
              come back and reflect.
            </p>
          </div>

          {/* PRINTABLE CARDS */}
          <div className="mt-7">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
              Optional printable support
            </p>

            <p className="mt-2 text-base leading-relaxed text-[#65736D]">
              These are here if your team
              prefers something printed in
              the room. You do not need
              them to use the ladder.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {selectedLadder.printables
                .educator && (
                <a
                  href={
                    selectedLadder
                      .printables.educator
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-5 py-3 text-base font-bold text-white transition hover:bg-[#284E45]"
                >
                  Educator Cards
                </a>
              )}

              {selectedLadder.printables
                .manager && (
                <a
                  href={
                    selectedLadder
                      .printables.manager
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-[#1C3B34] bg-white px-5 py-3 text-base font-bold text-[#1C3B34]"
                >
                  Manager Cards
                </a>
              )}

              {selectedLadder.printables
                .family && (
                <a
                  href={
                    selectedLadder
                      .printables.family
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-[#C29F60] bg-[#FAF5EC] px-5 py-3 text-base font-bold text-[#7E632F]"
                >
                  Family Cards
                </a>
              )}
            </div>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="border-b border-[#E5DED4] p-7 sm:p-9">
          <span className="inline-flex rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-extrabold text-[#9A793D]">
            Step 2
          </span>

          <h3 className="mt-4 text-3xl font-extrabold text-[#1C3B34]">
            Choose one rung.
          </h3>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            You do not need to begin at
            rung one, finish every rung or
            move through them in one day.
            Choose the rung that feels most
            useful right now.
          </p>

          <div className="mt-6 flex items-center justify-between gap-4">
            <p className="text-base font-bold text-[#65736D]">
              Currently viewing rung{' '}
              {selectedRung.number} of{' '}
              {selectedLadder.rungs.length}
            </p>
          </div>

          <div className="mt-5 -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-3">
            {selectedLadder.rungs.map(
              (rung) => {
                const isSelected =
                  rung.number ===
                  selectedRung.number;

                return (
                  <button
                    key={rung.number}
                    type="button"
                    onClick={() =>
                      selectRung(rung)
                    }
                    className={`min-h-14 min-w-14 shrink-0 snap-start rounded-2xl border-2 px-5 text-base font-extrabold transition ${
                      isSelected
                        ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                        : 'border-[#E5DED4] bg-white text-[#65736D] hover:border-[#657B6C]'
                    }`}
                  >
                    {rung.number}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* STEP 3 */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#F4F1EA]">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={selectedRung.image}
                alt={selectedRung.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="p-7 sm:p-9">
            <span className="inline-flex rounded-full bg-[#FAF5EC] px-4 py-2 text-sm font-extrabold text-[#9A793D]">
              Step 3 · Try this rung
            </span>

            <h4 className="mt-4 text-3xl font-extrabold leading-tight text-[#1C3B34]">
              {selectedRung.title}
            </h4>

            <p className="mt-4 text-xl font-bold leading-relaxed text-[#2B3833]">
              {selectedRung.focus}
            </p>

            <div className="mt-7 rounded-3xl border-l-4 border-[#C29F60] bg-[#FAF5EC] p-6">
              <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
                What to try
              </span>

              <p className="mt-3 text-lg leading-relaxed text-[#2B3833]">
                {selectedRung.practicePrompt}
              </p>
            </div>

            <div className="mt-5 rounded-3xl bg-[#F1F4F2] p-6">
              <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
                Step 4 · Watch what happens
              </span>

              <p className="mt-3 text-lg font-bold leading-relaxed text-[#1C3B34]">
                {selectedRung.reflectionQuestion}
              </p>
            </div>

            <div className="mt-5 rounded-3xl border border-[#E5DED4] bg-white p-5">
              <p className="text-base font-extrabold text-[#1C3B34]">
                Do not only ask:
              </p>

              <p className="mt-1 text-lg text-[#65736D]">
                “Did the behaviour stop?”
              </p>

              <p className="mt-4 text-base font-extrabold text-[#1C3B34]">
                Also notice:
              </p>

              <p className="mt-1 text-lg leading-relaxed text-[#65736D]">
                Did the child soften, slow
                down, reconnect, tolerate the
                transition, process your
                words, stay nearby or recover
                more easily?
              </p>
            </div>
          </div>
        </div>

        {/* STEP 5 REFLECTION */}
        <div className="border-t border-[#E5DED4] bg-[#FAF8F5] p-7 sm:p-9">
          <span className="inline-flex rounded-full bg-[#1C3B34] px-4 py-2 text-sm font-extrabold text-white">
            Step 5
          </span>

          <h4 className="mt-4 text-3xl font-extrabold text-[#1C3B34]">
            Take 30 seconds to reflect.
          </h4>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            This is not a test. You are
            simply capturing what was
            happening so your team can learn
            from the moment.
          </p>

          <div className="mt-8">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              How were you travelling in
              that moment?
            </p>

            <p className="mt-2 text-base text-[#65736D]">
              Choose the closest match.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {CAPACITY_OPTIONS.map(
                (option) => {
                  const isSelected =
                    capacity === option.id;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setCapacity(
                          option.id,
                        );
                        setSaved(false);
                        setError('');
                      }}
                      className={`min-h-16 rounded-2xl border-2 px-5 py-4 text-left text-base font-bold transition ${
                        isSelected
                          ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                          : 'border-[#E5DED4] bg-white text-[#2B3833] hover:border-[#657B6C]'
                      }`}
                    >
                      {option.label}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              Was anything adding pressure
              to the room?
            </p>

            <p className="mt-2 text-base text-[#65736D]">
              Optional. Choose one if it
              stood out.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {ROOM_FACTORS.map(
                (factor) => {
                  const isSelected =
                    roomFactor ===
                    factor.id;

                  return (
                    <button
                      key={factor.id}
                      type="button"
                      onClick={() => {
                        setRoomFactor(
                          roomFactor ===
                            factor.id
                            ? null
                            : factor.id,
                        );

                        setSaved(false);
                      }}
                      className={`min-h-14 rounded-2xl border-2 px-5 py-3 text-base font-bold transition ${
                        isSelected
                          ? 'border-[#657B6C] bg-[#657B6C] text-white'
                          : 'border-[#E5DED4] bg-white text-[#2B3833]'
                      }`}
                    >
                      {factor.label}
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="mt-8 max-w-3xl">
            <label
              htmlFor="ladder-note"
              className="text-lg font-extrabold text-[#1C3B34]"
            >
              Anything worth remembering?
            </label>

            <p className="mt-2 text-base leading-relaxed text-[#65736D]">
              One short observation is
              enough. For example: “He
              stayed close instead of
              running away when I stopped
              repeating the instruction.”
            </p>

            <textarea
              id="ladder-note"
              value={note}
              onChange={(event) => {
                setNote(
                  event.target.value.slice(
                    0,
                    160,
                  ),
                );
                setSaved(false);
              }}
              maxLength={160}
              rows={3}
              placeholder="Optional. One short note is enough."
              className="mt-4 w-full resize-none rounded-2xl border-2 border-[#E5DED4] bg-white p-5 text-base leading-relaxed text-[#2B3833] outline-none transition placeholder:text-[#9AA49F] focus:border-[#657B6C]"
            />

            <div className="mt-2 text-right text-sm text-[#8A9691]">
              {note.length}/160
            </div>
          </div>

          {error && (
            <div className="mt-5 max-w-3xl rounded-2xl border border-red-200 bg-red-50 p-4 text-base font-bold text-red-700">
              {error}
            </div>
          )}

          {saved && (
            <div className="mt-5 max-w-3xl rounded-2xl border border-[#657B6C]/30 bg-[#F1F4F2] p-5">
              <p className="text-lg font-extrabold text-[#1C3B34]">
                Saved to your practice log.
              </p>

              <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                Now decide what makes sense:
                repeat this rung, try another
                rung, discuss it with your
                team or bring the situation
                to monthly coaching.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="mt-6 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {saving
              ? 'Saving…'
              : 'Save my reflection'}
          </button>
        </div>
      </section>

      {/* WHAT NEXT */}
      <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 sm:p-9">
        <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
          What do I do next?
        </span>

        <h3 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
          You have four good options.
        </h3>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NextStepCard
            title="Repeat"
            text="Try the same rung again in a similar moment."
          />

          <NextStepCard
            title="Move"
            text="Choose another rung if this one did not fit the situation."
          />

          <NextStepCard
            title="Talk"
            text="Bring what you noticed into a team reflection."
          />

          <NextStepCard
            title="Ask"
            text="Send the situation to Robyn through the Monthly Hub."
          />
        </div>
      </section>

      {/* LAUNCHING SOON */}
      {launchingSoonLadders.length >
        0 && (
        <section>
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
            Next ladder
          </span>

          <h3 className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
            Launching soon
          </h3>

          <div className="mt-5 space-y-4">
            {launchingSoonLadders.map(
              (ladder) => (
                <article
                  key={ladder.id}
                  className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7"
                >
                  <span className="text-sm font-extrabold text-[#9A793D]">
                    Ladder {ladder.number}
                  </span>

                  <h4 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                    {ladder.title}
                  </h4>

                  <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
                    {ladder.description}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>
      )}

      {/* COMING SOON */}
      {comingSoonLadders.length > 0 && (
        <section className="rounded-4xl border border-[#E5DED4] bg-[#FAF8F5] p-7">
          <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
            Growing practice library
          </span>

          <h3 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
            More real-life situations are
            being added.
          </h3>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            New ladders will expand the
            situations your team can work
            through over time.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonLadders.map(
              (ladder) => (
                <article
                  key={ladder.id}
                  className="rounded-3xl border border-[#E5DED4] bg-white p-5"
                >
                  <span className="text-sm font-extrabold text-[#9A793D]">
                    Coming soon
                  </span>

                  <h4 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                    {ladder.shortTitle}
                  </h4>

                  <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                    {ladder.subtitle}
                  </p>
                </article>
              ),
            )}
          </div>
        </section>
      )}
    </div>
  );
}

function NextStepCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl bg-white p-5">
      <h4 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h4>

      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </article>
  );
}