import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'What Does Co-Regulation Look Like in a Busy Early Childhood Room?',
  description:
    'A practical early childhood article about what co-regulation can look like during busy, noisy and emotionally demanding moments in child care and kindergarten settings.',
  alternates: {
    canonical:
      '/blog/co-regulation-in-a-busy-early-childhood-room',
  },
};

export default function CoRegulationBusyRoomPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <article className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
        <p className="text-sm font-extrabold text-[#9A793D]">
          Co-regulation in early childhood
        </p>

        <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          What does co-regulation actually look like in a busy early childhood room?
        </h1>

        <p className="mt-6 text-xl leading-relaxed text-[#53645D]">
          Co-regulation can sound quite simple when we talk about it in training. Stay calm. Connect with the child. Use a warm voice. Help them feel safe.
        </p>

        <p className="mt-5 text-xl leading-relaxed text-[#53645D]">
          The reality is much messier when an educator is supporting one child while several others are moving around the room, someone is crying near the door, another child is asking for help and the group routine is still expected to continue.
        </p>

        <p className="mt-5 text-xl font-extrabold leading-relaxed">
          Co-regulation is not the absence of pressure. It is what the adult brings into the relationship while that pressure is happening.
        </p>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            The adult nervous system is part of the interaction
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Children are constantly experiencing the adults around them through voice, facial expression, movement, proximity, pace and touch.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            An educator can be saying the right words while their body is communicating urgency. We might be repeating “you&apos;re okay” while speaking quickly, leaning over the child, moving them along or trying to solve the situation before we have really noticed what is happening.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            This does not mean educators need to be perfectly calm. Early childhood work can be physically and emotionally demanding. It means becoming more aware of what our own body may be adding to the moment.
          </p>
        </section>

        <section className="mt-14 border-y border-[#D8CFC2] py-10">
          <h2 className="text-3xl font-extrabold leading-tight">
            Sometimes co-regulation means doing less, not more
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            When a child is overwhelmed, adults can understandably start adding more language, more instructions and more attempts to fix the situation.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            But a child who is already struggling to process what is happening may not need another explanation. They may need fewer words, more time, a quieter space, movement, a predictable adult nearby or a reduced demand.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            The useful question is not simply “How do I calm this child down?” It is “What is this child able to process right now?”
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Co-regulation can happen while the rest of the room keeps moving
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            One of the reasons educators can feel unsure about co-regulation is that examples often happen in quiet one-to-one situations. Real early childhood rooms rarely look like that.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Co-regulation might look like an educator lowering themselves beside a child for thirty seconds while another educator keeps the group moving. It might be walking alongside a child instead of insisting they return immediately to the mat. It might be offering a job such as carrying something, pouring water or helping set up rather than continuing a verbal battle.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Sometimes it is the smallest change in the adult response that tells the child, “I am with you, and we can work this out together.”
          </p>
        </section>

        <section className="mt-14 bg-[#F1ECE4] p-7 sm:p-9">
          <h2 className="text-3xl font-extrabold leading-tight">
            What can educators notice in themselves?
          </h2>

          <div className="mt-8 border-t border-[#D8CFC2]">
            {[
              'Am I speaking faster because I am stressed?',
              'Am I giving the child more language than they can process right now?',
              'Am I standing over them when I could change my position?',
              'Am I trying to return them to the routine before they are ready?',
              'Am I becoming more rigid because the room feels out of control?',
              'Could another educator support the wider group while I stay with this child for a moment?',
            ].map((question) => (
              <div
                key={question}
                className="border-b border-[#D8CFC2] py-5"
              >
                <p className="text-lg font-semibold leading-relaxed text-[#29483F]">
                  {question}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            Co-regulation does not mean removing every boundary
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            Supporting regulation does not mean allowing unsafe behaviour, avoiding every difficult demand or making sure children never become upset.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Children still need boundaries, safety and adults who can make decisions. The difference is that we can hold those boundaries while still being curious about what the child is experiencing.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            We can stop hitting while also noticing that the child is overloaded. We can prevent a child from running through a gate while also recognising that their body may be in a strong flight response. Safety and co-regulation can exist at the same time.
          </p>
        </section>

        <section className="mt-14">
          <h2 className="text-3xl font-extrabold leading-tight">
            This is why teams need more than one co-regulation strategy
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-[#53645D]">
            A script cannot tell an educator exactly what every child will need in every situation.
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            What helps more is developing a shared way of noticing. What is happening in the child&apos;s body? What is happening in the environment? What is the adult communicating? What demand is being placed on the child? What changed just before the behaviour?
          </p>

          <p className="mt-4 text-lg leading-relaxed text-[#53645D]">
            Those questions give educators somewhere to start when the strategy they planned does not fit the child standing in front of them.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/playbooks"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
            >
              Try the Free Regulation Ladder
            </Link>

            <Link
              href="/co-regulation-early-childhood"
              className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] bg-white px-7 py-4 text-base font-extrabold text-[#1C3B34]"
            >
              Explore Co-Regulation Professional Learning
            </Link>
          </div>
        </section>

        <section className="mt-14 border-t border-[#D8CFC2] pt-10">
          <h2 className="text-2xl font-extrabold">
            Related reading
          </h2>

          <div className="mt-6 space-y-4">
            <Link
              href="/blog/regulation-training-but-same-behaviour"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              When regulation training has not changed practice
            </Link>

            <Link
              href="/emotional-regulation-early-childhood"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              Emotional regulation in early childhood
            </Link>

            <Link
              href="/educator-capacity-building"
              className="block text-lg font-bold text-[#8A6F3E] underline underline-offset-4"
            >
              Educator capacity building
            </Link>
          </div>
        </section>
      </article>
    </main>
  );
}