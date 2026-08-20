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

export default function RegulationLadders({
  userEmail = '',
}: RegulationLaddersProps) {
  const availableLadders = useMemo(
    () =>
      regulationLadders.filter(
        (ladder) => ladder.availability === 'available',
      ),
    [],
  );

  const launchingSoonLadders = useMemo(
    () =>
      regulationLadders.filter(
        (ladder) => ladder.availability === 'launching-soon',
      ),
    [],
  );

  const comingSoonLadders = useMemo(
    () =>
      regulationLadders.filter(
        (ladder) => ladder.availability === 'in-development',
      ),
    [],
  );

  const [selectedLadderId, setSelectedLadderId] = useState(
    availableLadders[0]?.id ?? '',
  );

  const [selectedRungNumber, setSelectedRungNumber] = useState(1);

  const [capacity, setCapacity] = useState<string | null>(null);
  const [roomFactor, setRoomFactor] = useState<string | null>(null);
  const [note, setNote] = useState('');

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const selectedLadder =
    availableLadders.find(
      (ladder) => ladder.id === selectedLadderId,
    ) ?? availableLadders[0];

  const selectedRung =
    selectedLadder?.rungs.find(
      (rung) => rung.number === selectedRungNumber,
    ) ?? selectedLadder?.rungs[0];

  const selectLadder = (ladder: RegulationLadder) => {
    setSelectedLadderId(ladder.id);
    setSelectedRungNumber(1);
    resetReflection();
  };

  const selectRung = (rung: RegulationLadderRung) => {
    setSelectedRungNumber(rung.number);
    resetReflection();
  };

  const resetReflection = () => {
    setCapacity(null);
    setRoomFactor(null);
    setNote('');
    setSaved(false);
    setError('');
  };

  const handleSave = async () => {
    if (!selectedLadder || !selectedRung) return;

    if (!capacity) {
      setError('Choose the option that feels closest first.');
      return;
    }

    setSaving(true);
    setSaved(false);
    setError('');

    const capacityLabel =
      CAPACITY_OPTIONS.find((option) => option.id === capacity)?.label ??
      capacity;

    const factorLabel =
      ROOM_FACTORS.find((factor) => factor.id === roomFactor)?.label ??
      roomFactor;

    const summaryParts = [
      `Educator reflection: ${capacityLabel}.`,
      factorLabel ? `Room factor noticed: ${factorLabel}.` : '',
      note.trim() ? `Note: ${note.trim()}` : '',
    ].filter(Boolean);

    try {
      const response = await fetch('/api/ladder-rung', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          ladderId: selectedLadder.id,
          ladderTitle: selectedLadder.title,
          rungNumber: selectedRung.number,
          rungTitle: selectedRung.title,
          tankLevel: capacityLabel,
          primaryStressor: factorLabel || '',
          notes: summaryParts.join(' '),
        }),
      });

      if (!response.ok) {
        throw new Error('Unable to save reflection');
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

  if (!selectedLadder || !selectedRung) {
    return (
      <section className="rounded-3xl border border-[#E6E2DC] bg-white p-6">
        <p className="text-sm text-[#6A7873]">
          No regulation ladders are available yet.
        </p>
      </section>
    );
  }

  return (
    <div className="space-y-10">
      {/* INTRO */}
      <section className="overflow-hidden rounded-3xl bg-[#1C3B34] text-white">
        <div className="p-6 sm:p-8">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D8C28D]">
            Regulator Champions
          </span>

          <h2 className="mt-2 max-w-2xl text-2xl font-extrabold leading-tight sm:text-3xl">
            Practice Ladders
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
            Start with one rung. Try it in real practice, notice what
            happens and save a quick reflection.
          </p>

          <div className="mt-5 inline-flex rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white/90">
            Notice → Try → Watch → Reflect
          </div>
        </div>
      </section>

      {/* AVAILABLE NOW */}
      <section>
        <div className="mb-4">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
            Available now
          </span>

          <h3 className="mt-1 text-xl font-extrabold text-[#1C3B34]">
            Choose a practice ladder
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {availableLadders.map((ladder) => {
            const isSelected = ladder.id === selectedLadder.id;

            return (
              <button
                key={ladder.id}
                type="button"
                onClick={() => selectLadder(ladder)}
                className={`min-h-40 rounded-3xl border-2 p-5 text-left transition ${
                  isSelected
                    ? 'border-[#1C3B34] bg-[#F1F4F2] shadow-sm'
                    : 'border-[#E6E2DC] bg-white hover:border-[#657B6C]'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black ${
                      isSelected
                        ? 'bg-[#1C3B34] text-white'
                        : 'bg-[#FAF5EC] text-[#1C3B34]'
                    }`}
                  >
                    {ladder.number}
                  </span>

                  {isSelected && (
                    <span className="rounded-full bg-[#1C3B34] px-3 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                      Open
                    </span>
                  )}
                </div>

                <h4 className="mt-4 text-lg font-extrabold text-[#1C3B34]">
                  {ladder.title}
                </h4>

                <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                  {ladder.subtitle}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ACTIVE LADDER */}
      <section className="overflow-hidden rounded-3xl border border-[#E6E2DC] bg-white shadow-sm">
        <div className="border-b border-[#E6E2DC] bg-[#FAF8F5] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
                Ladder {selectedLadder.number}
              </span>

              <h3 className="mt-1 text-2xl font-extrabold text-[#1C3B34]">
                {selectedLadder.title}
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#6A7873]">
                {selectedLadder.description}
              </p>
            </div>
          </div>

          {/* PRINTABLE CARDS */}
          <div className="mt-5">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#657B6C]">
              Printable cards
            </p>

            <div className="flex flex-wrap gap-2">
              {selectedLadder.printables.educator && (
                <a
                  href={selectedLadder.printables.educator}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#284E45]"
                >
                  Educator Cards
                </a>
              )}

              {selectedLadder.printables.manager && (
                <a
                  href={selectedLadder.printables.manager}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-xl border border-[#1C3B34] bg-white px-4 py-2 text-xs font-bold text-[#1C3B34] transition hover:bg-[#F1F4F2]"
                >
                  Manager Cards
                </a>
              )}

              {selectedLadder.printables.family && (
                <a
                  href={selectedLadder.printables.family}
                  target="_blank"
                  rel="noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-xl border border-[#C29F60] bg-[#FAF5EC] px-4 py-2 text-xs font-bold text-[#7E632F] transition hover:bg-[#F5EBD8]"
                >
                  Family Cards
                </a>
              )}
            </div>
          </div>
        </div>

        {/* RUNG SELECTOR */}
        <div className="border-b border-[#E6E2DC] p-5 sm:p-6">
          <div className="mb-3 flex items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                Choose a rung
              </span>

              <p className="mt-1 text-xs text-[#6A7873]">
                You do not need to complete them all at once.
              </p>
            </div>

            <span className="shrink-0 text-xs font-bold text-[#657B6C]">
              {selectedRung.number} of {selectedLadder.rungs.length}
            </span>
          </div>

          <div className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2">
            {selectedLadder.rungs.map((rung) => {
              const isSelected = rung.number === selectedRung.number;

              return (
                <button
                  key={rung.number}
                  type="button"
                  onClick={() => selectRung(rung)}
                  className={`min-h-12 min-w-12 shrink-0 snap-start rounded-xl border px-4 text-xs font-black transition ${
                    isSelected
                      ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                      : 'border-[#E6E2DC] bg-white text-[#657B6C] hover:border-[#657B6C]'
                  }`}
                >
                  {rung.number}
                </button>
              );
            })}
          </div>
        </div>

        {/* RUNG CONTENT */}
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

          <div className="p-5 sm:p-7">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
              Rung {selectedRung.number}
            </span>

            <h4 className="mt-1 text-2xl font-extrabold leading-tight text-[#1C3B34]">
              {selectedRung.title}
            </h4>

            <p className="mt-3 text-sm font-bold leading-relaxed text-[#2B3833]">
              {selectedRung.focus}
            </p>

            <div className="mt-5 rounded-2xl bg-[#FAF5EC] p-4">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
                Try this
              </span>

              <p className="mt-2 text-sm leading-relaxed text-[#2B3833]">
                {selectedRung.practicePrompt}
              </p>
            </div>

            <div className="mt-4 rounded-2xl bg-[#F1F4F2] p-4">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
                Notice
              </span>

              <p className="mt-2 text-sm font-bold leading-relaxed text-[#1C3B34]">
                {selectedRung.reflectionQuestion}
              </p>
            </div>
          </div>
        </div>

        {/* QUICK REFLECTION */}
        <div className="border-t border-[#E6E2DC] bg-[#FAF8F5] p-5 sm:p-7">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
              30 second reflection
            </span>

            <h4 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
              How were you travelling in that moment?
            </h4>

            <p className="mt-1 text-xs leading-relaxed text-[#6A7873]">
              Tap the closest match. There is no perfect answer.
            </p>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              {CAPACITY_OPTIONS.map((option) => {
                const isSelected = capacity === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => {
                      setCapacity(option.id);
                      setSaved(false);
                      setError('');
                    }}
                    className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left text-xs font-bold transition ${
                      isSelected
                        ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
                        : 'border-[#E6E2DC] bg-white text-[#2B3833] hover:border-[#657B6C]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <p className="text-xs font-bold text-[#1C3B34]">
                Was anything adding pressure?
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {ROOM_FACTORS.map((factor) => {
                  const isSelected = roomFactor === factor.id;

                  return (
                    <button
                      key={factor.id}
                      type="button"
                      onClick={() => {
                        setRoomFactor(
                          roomFactor === factor.id ? null : factor.id,
                        );
                        setSaved(false);
                      }}
                      className={`min-h-12 rounded-xl border px-4 py-2 text-xs font-bold transition ${
                        isSelected
                          ? 'border-[#657B6C] bg-[#657B6C] text-white'
                          : 'border-[#E6E2DC] bg-white text-[#2B3833]'
                      }`}
                    >
                      {factor.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="ladder-note"
                className="text-xs font-bold text-[#1C3B34]"
              >
                Anything worth remembering?
              </label>

              <textarea
                id="ladder-note"
                value={note}
                onChange={(event) => {
                  setNote(event.target.value.slice(0, 160));
                  setSaved(false);
                }}
                maxLength={160}
                rows={2}
                placeholder="Optional. One short note is enough."
                className="mt-2 w-full resize-none rounded-2xl border border-[#E6E2DC] bg-white p-4 text-sm text-[#2B3833] outline-none transition placeholder:text-[#9AA49F] focus:border-[#657B6C]"
              />

              <div className="mt-1 text-right text-[10px] text-[#8A9691]">
                {note.length}/160
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                {error}
              </div>
            )}

            {saved && (
              <div className="mt-4 rounded-xl border border-[#657B6C]/30 bg-[#F1F4F2] p-3 text-xs font-bold text-[#1C3B34]">
                Saved to your practice log.
              </div>
            )}

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-5 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {saving ? 'Saving...' : 'Save to my practice log'}
            </button>
          </div>
        </div>
      </section>

      {/* LAUNCHING SOON */}
      {launchingSoonLadders.length > 0 && (
        <section>
          <div className="mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#C29F60]">
              Next ladder
            </span>

            <h3 className="mt-1 text-xl font-extrabold text-[#1C3B34]">
              Launching soon
            </h3>
          </div>

          {launchingSoonLadders.map((ladder) => (
            <div
              key={ladder.id}
              className="relative overflow-hidden rounded-3xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-6"
            >
              <div className="absolute right-0 top-0 rounded-bl-2xl bg-[#C29F60] px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#1C3B34]">
                In development
              </div>

              <div className="max-w-2xl pr-16">
                <span className="text-xs font-black text-[#9A793D]">
                  Ladder {ladder.number}
                </span>

                <h4 className="mt-2 text-xl font-extrabold text-[#1C3B34]">
                  {ladder.title}
                </h4>

                <p className="mt-2 text-sm leading-relaxed text-[#6A7873]">
                  {ladder.description}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* COMING SOON */}
      {comingSoonLadders.length > 0 && (
        <section className="rounded-3xl border border-[#E6E2DC] bg-[#FAF8F5] p-5 sm:p-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
              Growing library
            </span>

            <h3 className="mt-1 text-lg font-extrabold text-[#1C3B34]">
              More practice ladders are coming
            </h3>

            <p className="mt-2 max-w-2xl text-xs leading-relaxed text-[#6A7873]">
              New ladders will be added as the Regulator Champions
              practice library grows.
            </p>
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {comingSoonLadders.map((ladder) => (
              <div
                key={ladder.id}
                className="rounded-2xl border border-[#E6E2DC] bg-white p-4"
              >
                <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[#9A793D]">
                  Coming soon
                </span>

                <h4 className="mt-1 text-sm font-extrabold text-[#1C3B34]">
                  {ladder.shortTitle}
                </h4>

                <p className="mt-1 text-[11px] leading-relaxed text-[#6A7873]">
                  {ladder.subtitle}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}