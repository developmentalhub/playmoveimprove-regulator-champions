'use client';

import React from 'react';

interface Option {
  id: string;
  label: string;
}

interface ReflectionCardProps {
  badge: string;
  title: string;
  scienceKey: string;
  description: string;
  options: Option[];
  selectedOption: string | null;
  onSelectOption: (label: string) => void;
  onOpenScience: (key: string) => void;
  cardStyleClass?: string;
}

export default function ReflectionCard({
  badge,
  title,
  scienceKey,
  description,
  options,
  selectedOption,
  onSelectOption,
  onOpenScience,
  cardStyleClass = 'bg-[#FAF5EC] border-2 border-[#C29F60]/40',
}: ReflectionCardProps) {
  return (
    <section
      className={`space-y-4 rounded-3xl p-5 shadow-sm ${cardStyleClass}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="block text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
            {badge}
          </span>

          <h3 className="mt-1 text-lg font-extrabold leading-snug text-[#1C3B34]">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={() => onOpenScience(scienceKey)}
          className="flex min-h-12 shrink-0 items-center justify-center rounded-xl border border-[#C29F60] bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wider text-[#9A793D] transition hover:bg-[#FAF5EC]"
        >
          Why?
        </button>
      </div>

      <p className="text-xs leading-relaxed text-[#6A7873]">
        {description}
      </p>

      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selectedOption === option.label;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelectOption(option.label)}
              className={`min-h-14 rounded-2xl border-2 px-4 py-3 text-left text-xs font-bold leading-snug transition ${
                isSelected
                  ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
                  : 'border-[#E6E2DC] bg-white text-[#2B3833] hover:border-[#657B6C]'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span>{option.label}</span>

                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] ${
                    isSelected
                      ? 'border-white/40 bg-white/10 text-white'
                      : 'border-[#D7D2CB] text-[#657B6C]'
                  }`}
                >
                  {isSelected ? '✓' : ''}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selectedOption && (
        <div className="animate-in fade-in rounded-2xl border border-[#657B6C]/30 bg-white p-4 duration-200">
          <span className="block text-[9px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
            You noticed
          </span>

          <p className="mt-1 text-sm font-bold leading-relaxed text-[#1C3B34]">
            {selectedOption}
          </p>
        </div>
      )}
    </section>
  );
}