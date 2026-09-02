import Link from 'next/link';

export default function SafeTouchHomepageSection() {
  return (
    <section className="bg-[#FAF5EC] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* GUIDE PREVIEW */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-md overflow-hidden rounded-4xl border border-[#E1D8C8] bg-white shadow-xl">
              <div className="border-b border-[#E9E3DA] bg-[#FFFDFC] px-7 py-8 text-center">
                <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#657B6C]">
                  Free educator guide
                </p>

                <h3 className="mt-3 text-4xl font-extrabold leading-tight text-[#1C3B34]">
                  Can I Still Comfort a
                  Distressed Child?
                </h3>

                <div className="mx-auto mt-5 h-px w-20 bg-[#C29F60]" />

                <p className="mt-5 text-lg font-bold leading-relaxed text-[#9A793D]">
                  A practical guide for
                  educators trying to
                  balance warmth, safety
                  and professional
                  boundaries.
                </p>
              </div>

              <div className="p-6 sm:p-7">
                <p className="mb-4 text-lg font-extrabold text-[#1C3B34]">
                  Before I offer comforting
                  touch, I can ask:
                </p>

                <div>
                  <ChecklistItem>
                    What is happening for
                    this child right now?
                  </ChecklistItem>

                  <ChecklistItem>
                    Is the child moving
                    towards connection?
                  </ChecklistItem>

                  <ChecklistItem>
                    What is their body
                    telling me once contact
                    begins?
                  </ChecklistItem>

                  <ChecklistItem>
                    What is the purpose of
                    the touch?
                  </ChecklistItem>

                  <ChecklistItem>
                    Does this response make
                    sense for this child and
                    this situation?
                  </ChecklistItem>

                  <ChecklistItem>
                    Is there a less
                    intrusive response that
                    may work just as well?
                  </ChecklistItem>
                </div>
              </div>

              <div className="bg-[#F6F1E8] px-6 py-5 text-center">
                <p className="text-base font-bold text-[#657B6C]">
                  Includes a printable
                  reflection checklist for
                  early childhood teams
                </p>
              </div>
            </div>
          </div>

          {/* COPY */}
          <div className="lg:col-span-7">
            <span className="text-sm font-extrabold uppercase tracking-[0.16em] text-[#9A793D]">
              A place to start
            </span>

            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-[#1C3B34] sm:text-5xl">
              If my free resources have
              helped your team, I want you
              to keep using them.
            </h2>

            <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#53645D]">
              Sometimes a checklist, a
              reflection question or one
              practical idea is exactly
              what an educator needs to
              see a situation differently.
            </p>

            <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#53645D]">
              The Safe Touch guide is one
              example. It helps educators
              slow down and think about the
              child, their body, the
              context and the purpose of
              the response before deciding
              what to do.
            </p>

            <div className="mt-8 rounded-4xl border-l-4 border-[#C29F60] bg-white p-7 shadow-sm">
              <p className="text-2xl font-extrabold leading-relaxed text-[#1C3B34]">
                Sometimes the free resource
                is enough.
              </p>

              <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                Regulator Champions is
                there when your team needs
                somewhere to keep going.
              </p>
            </div>

            <div className="mt-8 rounded-4xl bg-[#1C3B34] p-7 text-white">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                The difference
              </span>

              <h3 className="mt-3 text-3xl font-extrabold">
                “We have noticed it. What do
                we actually try now?”
              </h3>

              <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                That is where Regulator
                Champions comes in. Your
                educators can use a
                Regulation Ladder, try one
                response, reflect on what
                changed and ask Robyn when
                they are still unsure.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/free-guide"
                className="flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white shadow-sm transition hover:bg-[#284E45]"
              >
                Get the free Safe Touch guide
              </Link>

              <Link
                href="/proposal?plan=preview"
                className="flex min-h-14 items-center justify-center rounded-2xl border-2 border-[#C29F60] bg-white px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#FAF8F5]"
              >
                See Regulator Champions
              </Link>
            </div>
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
    <div className="flex items-start gap-4 border-b border-[#EEE8DF] py-4 last:border-b-0">
      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C29F60] text-sm font-extrabold text-[#1C3B34]">
        ✓
      </span>

      <p className="text-lg font-bold leading-relaxed text-[#2B3833]">
        {children}
      </p>
    </div>
  );
}