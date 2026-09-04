'use client';

import React, {
  useMemo,
  useState,
} from 'react';

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

  const [
    capacity,
    setCapacity,
  ] = useState<string | null>(null);

  const [
    roomFactor,
    setRoomFactor,
  ] = useState<string | null>(null);

  const [note, setNote] =
    useState('');

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    saved,
    setSaved,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  const selectedLadder =
    availableLadders.find(
      (ladder) =>
        ladder.id ===
        selectedLadderId,
    ) ?? availableLadders[0];

  const selectedRung =
    selectedLadder?.rungs.find(
      (rung) =>
        rung.number ===
        selectedRungNumber,
    ) ??
    selectedLadder?.rungs[0];

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
    setSelectedLadderId(
      ladder.id,
    );

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

  const handleSave =
    async () => {
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
            factor.id ===
            roomFactor,
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
        const response =
          await fetch(
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
                  summaryParts.join(
                    ' ',
                  ),
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
        console.error(
          saveError,
        );

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
      <section className="border-y border-[#E5DED4] bg-white py-7">
        <p className="text-lg text-[#65736D]">
          No Regulation Ladders are available yet.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      {/* HOW TO USE */}
      <section className="border-b border-[#D8CFC2] pb-8">
        <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
          You are not trying to complete a ladder.
        </h2>

        <p className="mt-5 max-w-4xl text-xl leading-relaxed text-[#53645D]">
          Use a Regulation Ladder when something feels difficult. Choose the situation that sounds closest, open the rung that feels useful, try one idea and notice what changes.
        </p>

        <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#65736D]">
          You can come back to the same rung more than once, move to another rung, or leave the ladder altogether if it does not fit what you are seeing.
        </p>

        <div className="mt-7 border-l-4 border-[#C29F60] pl-5">
          <p className="text-lg font-extrabold leading-relaxed text-[#1C3B34]">
            The goal is not to make the behaviour disappear as quickly as possible.
          </p>

          <p className="mt-2 text-lg leading-relaxed text-[#53645D]">
            The goal is to understand more about what may be happening, respond thoughtfully and notice what helps this child in this context.
          </p>
        </div>
      </section>

      {/* CHOOSE LADDER */}
      <section>
        <h3 className="text-3xl font-extrabold text-[#1C3B34]">
          What feels closest to what is happening?
        </h3>

        <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
          Choose the ladder that sounds most useful for the situation your team is dealing with. You do not need to diagnose the child or be certain why the behaviour is happening before you begin.
        </p>

        <div className="mt-7 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    selectLadder(
                      ladder,
                    )
                  }
                  aria-pressed={
                    isSelected
                  }
                  className={`border-t-2 p-6 text-left transition ${
                    isSelected
                      ? 'border-[#1C3B34] bg-[#F1F4F2]'
                      : 'border-[#D8CFC2] bg-white hover:bg-[#FAF8F5]'
                  }`}
                >
                  <h4 className="text-2xl font-extrabold text-[#1C3B34]">
                    {
                      ladder.title
                    }
                  </h4>

                  <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
                    {
                      ladder.subtitle
                    }
                  </p>

                  {isSelected && (
                    <p className="mt-4 text-sm font-semibold text-[#657B6C]">
                      Currently open
                    </p>
                  )}
                </button>
              );
            },
          )}
        </div>
      </section>

      {/* ACTIVE LADDER */}
      <section className="border-y border-[#D8CFC2] bg-white">
        {/* INTRO */}
        <div className="border-b border-[#D8CFC2] bg-[#FAF8F5] p-7 sm:p-9">
          <h3 className="text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
            {selectedLadder.title}
          </h3>

          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#65736D]">
            {
              selectedLadder.description
            }
          </p>

          <p className="mt-6 max-w-4xl text-lg font-semibold leading-relaxed text-[#1C3B34]">
            Look through the ideas below and open the one that feels most relevant. You do not need to begin with the first rung or work through every rung.
          </p>

          {/* PRINTABLES */}
          <div className="mt-8 border-t border-[#D8CFC2] pt-6">
            <h4 className="text-xl font-extrabold text-[#1C3B34]">
              Prefer printed cards?
            </h4>

            <p className="mt-2 max-w-3xl text-base leading-relaxed text-[#65736D]">
              Use the educator, manager or family card set if something physical in the room is easier for your team to return to.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              {selectedLadder.printables
                .educator && (
                <a
                  href={
                    selectedLadder
                      .printables
                      .educator
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#1C3B34] px-5 py-3 text-base font-semibold text-white"
                >
                  Educator Cards
                </a>
              )}

              {selectedLadder.printables
                .manager && (
                <a
                  href={
                    selectedLadder
                      .printables
                      .manager
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-5 py-3 text-base font-semibold text-[#1C3B34]"
                >
                  Manager Cards
                </a>
              )}

              {selectedLadder.printables
                .family && (
                <a
                  href={
                    selectedLadder
                      .printables
                      .family
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#C29F60] bg-[#FAF5EC] px-5 py-3 text-base font-semibold text-[#7E632F]"
                >
                  Family Cards
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RUNG CHOOSER */}
        <div className="border-b border-[#D8CFC2] p-7 sm:p-9">
          <h3 className="text-2xl font-extrabold text-[#1C3B34]">
            Choose the idea you want to look at.
          </h3>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            The numbers are simply there to help you move between ideas. They are not a sequence you have to complete.
          </p>

          <div className="mt-6 -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-3">
            {selectedLadder.rungs.map(
              (rung) => {
                const isSelected =
                  rung.number ===
                  selectedRung.number;

                return (
                  <button
                    key={
                      rung.number
                    }
                    type="button"
                    onClick={() =>
                      selectRung(
                        rung,
                      )
                    }
                    aria-pressed={
                      isSelected
                    }
                    className={`min-h-12 min-w-12 shrink-0 snap-start rounded-xl border px-4 text-base font-semibold transition ${
                      isSelected
                        ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                        : 'border-[#D8CFC2] bg-white text-[#65736D] hover:border-[#657B6C]'
                    }`}
                  >
                    {rung.number}
                  </button>
                );
              },
            )}
          </div>
        </div>

        {/* ACTIVE RUNG */}
        <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-[#F4F1EA]">
            <div className="aspect-4/3 overflow-hidden">
              <img
                src={
                  selectedRung.image
                }
                alt={
                  selectedRung.title
                }
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="p-7 sm:p-9">
            <h4 className="text-3xl font-extrabold leading-tight text-[#1C3B34]">
              {
                selectedRung.title
              }
            </h4>

            <p className="mt-4 text-xl font-semibold leading-relaxed text-[#2B3833]">
              {
                selectedRung.focus
              }
            </p>

            <div className="mt-7 border-l-4 border-[#C29F60] pl-5">
              <p className="text-sm font-semibold text-[#9A793D]">
                Something to try
              </p>

              <p className="mt-3 text-lg leading-relaxed text-[#2B3833]">
                {
                  selectedRung.practicePrompt
                }
              </p>
            </div>

            <div className="mt-7 border-t border-[#D8CFC2] pt-6">
              <p className="text-sm font-semibold text-[#657B6C]">
                Something to notice afterwards
              </p>

              <p className="mt-3 text-lg font-semibold leading-relaxed text-[#1C3B34]">
                {
                  selectedRung.reflectionQuestion
                }
              </p>
            </div>

            <div className="mt-7 bg-[#F1F4F2] p-5">
              <p className="text-base font-extrabold text-[#1C3B34]">
                Try not to only ask, “Did the behaviour stop?”
              </p>

              <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
                You might also notice whether the child softened, slowed down, reconnected, tolerated the transition, processed your words, stayed nearby or recovered more easily.
              </p>
            </div>
          </div>
        </div>

        {/* OPTIONAL REFLECTION */}
        <div className="border-t border-[#D8CFC2] bg-[#FAF8F5] p-7 sm:p-9">
          <h4 className="text-3xl font-extrabold text-[#1C3B34]">
            Want to save a quick reflection?
          </h4>

          <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#65736D]">
            This part is optional. If something stood out, you can save a short note so you or your team can return to what you noticed later.
          </p>

          <div className="mt-8">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              How were you travelling in that moment?
            </p>

            <p className="mt-2 text-base text-[#65736D]">
              Choose the option that feels closest.
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {CAPACITY_OPTIONS.map(
                (option) => {
                  const isSelected =
                    capacity ===
                    option.id;

                  return (
                    <button
                      key={
                        option.id
                      }
                      type="button"
                      onClick={() => {
                        setCapacity(
                          option.id,
                        );

                        setSaved(
                          false,
                        );

                        setError('');
                      }}
                      aria-pressed={
                        isSelected
                      }
                      className={`min-h-16 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition ${
                        isSelected
                          ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                          : 'border-[#E5DED4] bg-white text-[#2B3833] hover:border-[#657B6C]'
                      }`}
                    >
                      {
                        option.label
                      }
                    </button>
                  );
                },
              )}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-lg font-extrabold text-[#1C3B34]">
              Was anything adding pressure to the room?
            </p>

            <p className="mt-2 text-base text-[#65736D]">
              Optional. Choose one if something stood out.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {ROOM_FACTORS.map(
                (factor) => {
                  const isSelected =
                    roomFactor ===
                    factor.id;

                  return (
                    <button
                      key={
                        factor.id
                      }
                      type="button"
                      onClick={() => {
                        setRoomFactor(
                          roomFactor ===
                            factor.id
                            ? null
                            : factor.id,
                        );

                        setSaved(
                          false,
                        );
                      }}
                      aria-pressed={
                        isSelected
                      }
                      className={`min-h-12 rounded-2xl border px-5 py-3 text-base font-semibold transition ${
                        isSelected
                          ? 'border-[#657B6C] bg-[#657B6C] text-white'
                          : 'border-[#D8CFC2] bg-white text-[#2B3833]'
                      }`}
                    >
                      {
                        factor.label
                      }
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
              One short observation is enough. You might write what changed, what seemed to help, or something your team wants to try again.
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
            <div className="mt-5 max-w-3xl border-l-4 border-red-300 bg-red-50 p-4 text-base font-semibold text-red-700">
              {error}
            </div>
          )}

          {saved && (
            <div className="mt-5 max-w-3xl border-l-4 border-[#657B6C] bg-[#F1F4F2] p-5">
              <p className="text-lg font-extrabold text-[#1C3B34]">
                Reflection saved.
              </p>

              <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                You can try the same idea again, choose another rung, talk about what you noticed with your team, or simply leave it here for now.
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="mt-6 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? 'Saving…'
              : 'Save this reflection'}
          </button>
        </div>
      </section>

      {/* WHAT NEXT */}
      <section className="border-t border-[#D8CFC2] pt-7">
        <h3 className="text-2xl font-extrabold text-[#1C3B34]">
          What next?
        </h3>

        <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#53645D]">
          There is no required next step. You might repeat the same idea, choose another rung, talk with your team about what changed, or bring a de-identified question into the Support & Questions area of the Member Hub.
        </p>
      </section>
    </div>
  );
}