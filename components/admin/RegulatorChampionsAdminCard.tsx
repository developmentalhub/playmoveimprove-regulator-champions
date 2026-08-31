import Link from 'next/link';

export default function RegulatorChampionsAdminCard() {
  return (
    <section className="rounded-3xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-[#FAF5EC] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#9A7941]">
            Regulator Champions
          </span>

          <h2 className="mt-4 text-2xl font-bold text-[#1C3B34]">
            Monthly member conversations
          </h2>

          <p className="mt-2 text-sm leading-relaxed text-[#657B6C]">
            Review educator questions, see which session days and times are most
            popular, and check how teams are planning to attend the monthly
            Regulator Champions session.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-xl bg-[#EEF3F0] px-3 py-2 text-xs font-semibold text-[#1C3B34]">
              Educator questions
            </span>

            <span className="rounded-xl bg-[#FAF5EC] px-3 py-2 text-xs font-semibold text-[#1C3B34]">
              Session voting
            </span>
          </div>
        </div>

        <Link
          href="/admin/regulator-champions"
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-2xl bg-[#1C3B34] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#294E45]"
        >
          Open Regulator Champions →
        </Link>
      </div>
    </section>
  );
}