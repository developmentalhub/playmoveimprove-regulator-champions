import Link from 'next/link';

export default function SafeTouchHomepageSection() {
  return (
    <section className="bg-[#FAF5EC] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* CHECKLIST PREVIEW */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md overflow-hidden rounded-4xl border border-[#E1D8C8] bg-white shadow-lg">
              <div className="border-b border-[#E9E3DA] bg-[#FFFDFC] px-6 py-7 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#657B6C]">
                  Before I Offer
                </p>

                <h3 className="mt-1 text-3xl font-black leading-tight text-[#1C3B34]">
                  Comforting Touch
                </h3>

                <div className="mx-auto mt-4 h-px w-20 bg-[#C29F60]" />

                <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-[#9A793D]">
                  A quick reflection checklist
                </p>
              </div>

              <div className="space-y-0 p-5 sm:p-6">
                <ChecklistItem>
                  What is happening for this child right now?
                </ChecklistItem>

                <ChecklistItem>
                  Is the child moving towards connection?
                </ChecklistItem>

                <ChecklistItem>
                  What is their body telling me once contact begins?
                </ChecklistItem>

                <ChecklistItem>
                  What is the purpose of the touch?
                </ChecklistItem>

                <ChecklistItem>
                  Does the contact make sense for this child and this situation?
                </ChecklistItem>

                <ChecklistItem>
                  Is there a less intrusive response that may work just as well?
                </ChecklistItem>
              </div>

              <div className="bg-[#F6F1E8] px-6 py-4 text-center">
                <p className="text-[11px] font-bold text-[#657B6C]">
                  Free printable for early childhood teams
                </p>
              </div>
            </div>
          </div>

          {/* COPY */}
          <div className="lg:col-span-7">
            <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#657B6C]">
              Start with one difficult question
            </span>

            <h2 className="mt-2 max-w-2xl text-3xl font-extrabold tracking-tight text-[#1C3B34] sm:text-4xl">
              “Can I still comfort a distressed child?”
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#53645D]">
              Many educators are trying to balance child safety,
              professional boundaries and the very human need to
              respond warmly when a child is distressed.
            </p>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#53645D]">
              The answer is rarely found in one blanket rule. We
              need to notice the child, the context, their cues,
              what is happening around them and whether the
              response we are offering makes sense in that moment.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/free-guide"
                className="flex min-h-14 items-center justify-center rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-[#284E45]"
              >
                Get the free Safe Touch guide
              </Link>

              <Link
                href="/blog/before-i-offer-comforting-touch-checklist"
                className="flex min-h-14 items-center justify-center rounded-xl border-2 border-[#C29F60] bg-white px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
              >
                Read the checklist article
              </Link>
            </div>

            <p className="mt-4 max-w-xl text-xs leading-relaxed text-[#75827D]">
              The free download includes the full Safe Touch guide
              and the printable Before I Offer Comforting Touch
              checklist.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChecklistItem({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 border-b border-[#EEE8DF] py-3.5 last:border-b-0">
      <span className="mt-0.5 text-lg leading-none text-[#C29F60]">
        ✿
      </span>

      <p className="text-sm font-bold leading-5 text-[#2B3833]">
        {children}
      </p>
    </div>
  );
}