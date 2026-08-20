'use client';

import React from 'react';
import { knowledgeCards } from '@/data/ladder1-cards';

interface KnowledgeCardModalProps {
  activeCard: string | null;
  onClose: () => void;
}

export default function KnowledgeCardModal({
  activeCard,
  onClose,
}: KnowledgeCardModalProps) {
  if (!activeCard || !knowledgeCards[activeCard]) return null;

  const card = knowledgeCards[activeCard];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/65 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-t-4xl bg-white shadow-2xl sm:rounded-4xl">
        {/* IMAGE */}
        <div className="relative h-52 w-full border-b border-[#E6E2DC] bg-[#F4F1EA]">
          <img
            src={card.image}
            alt={card.title}
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#1C3B34]/70 via-transparent to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex min-h-12 items-center justify-center rounded-full bg-white/95 px-4 text-xs font-bold text-[#1C3B34] shadow"
          >
            Close
          </button>

          <div className="absolute inset-x-5 bottom-5">
            <span className="inline-flex rounded-full bg-[#C29F60] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1C3B34]">
              Why this matters
            </span>

            <h3 className="mt-2 text-xl font-extrabold leading-tight text-white">
              {card.title}
            </h3>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-4 p-5 sm:p-6">
          <section className="rounded-2xl bg-[#F1F4F2] p-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#657B6C]">
              The idea
            </span>

            <p className="mt-2 text-sm leading-relaxed text-[#2B3833]">
              {card.rationale}
            </p>
          </section>

          <section className="rounded-2xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-4">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#9A793D]">
              Try this
            </span>

            <p className="mt-2 text-sm font-bold leading-relaxed text-[#1C3B34]">
              {card.action}
            </p>
          </section>

          <button
            type="button"
            onClick={onClose}
            className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-sm font-extrabold text-white transition hover:bg-[#284E45]"
          >
            Back to reflection
          </button>
        </div>
      </div>
    </div>
  );
}