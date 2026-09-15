import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title:
    'Download Your Vagus Nerve Activity Cards | Play Move Improve',
  description:
    'Access your Play Move Improve Vagus Nerve Activity Cards after purchase.',
  robots: {
    index: false,
    follow: false,
  },
};

const PDF_URL =
  '/pdf/vagus-nerve-activity-cards.pdf';

export default function VagusNerveCardsDownloadPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <section className="bg-[#1C3B34] text-white">
        <div className="mx-auto max-w-4xl px-5 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold text-[#E4C98E]">
            Play Move Improve
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            Your Vagus Nerve Activity Cards are ready
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-[#D8E1DC]">
            Thank you for purchasing the Vagus Nerve Activity Cards. I have created these so you can use them in whichever way is easiest for you and your team, whether that means printing them double-sided and keeping them somewhere educators can reach for them during the day, or simply opening the PDF on your phone or tablet when you want some inspiration.
          </p>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34]">
              Choose how you would like to use the cards
            </h2>

            <p className="mt-5 text-[17px] leading-8 text-[#53645D]">
              The collection includes playful breathing, sound, movement, sensory and body-awareness activities that you can introduce during ordinary parts of the day, rather than waiting until a child is already overwhelmed. I would encourage you to start with one or two ideas that feel relevant to the children in front of you, introduce them while everybody is relatively settled, and notice how different children respond.
            </p>
          </div>

          <div className="mt-10 border-y border-[#D8CFC2]">
            <div className="py-7">
              <h3 className="text-2xl font-extrabold text-[#1C3B34]">
                Download the PDF
              </h3>

              <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#53645D]">
                Download a copy to your computer or device so you can keep it, print it double-sided and return to it whenever you need it.
              </p>

              <a
                href={PDF_URL}
                download
                className="mt-6 inline-flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#29483F]"
              >
                Download the Activity Cards
              </a>
            </div>

            <div className="border-t border-[#D8CFC2] py-7">
              <h3 className="text-2xl font-extrabold text-[#1C3B34]">
                Prefer to scroll through them?
              </h3>

              <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#53645D]">
                You can also open the full PDF in your browser and scroll through the cards on your phone, tablet or computer without printing anything.
              </p>

              <a
                href={PDF_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-14 items-center justify-center rounded-2xl border border-[#1C3B34] px-7 py-4 text-base font-extrabold text-[#1C3B34] transition hover:bg-[#1C3B34] hover:text-white"
              >
                Open the Cards on My Device
              </a>
            </div>
          </div>

          <div className="mt-12 rounded-3xl bg-[#FAF5EC] p-7 sm:p-9">
            <h2 className="text-2xl font-extrabold text-[#1C3B34]">
              A small suggestion before you begin
            </h2>

            <p className="mt-4 text-[17px] leading-8 text-[#53645D]">
              You do not need to work through these cards in order, and I would not try to introduce all of the activities at once. Pick the idea that makes you think of a child, a transition or a moment in your room, try it when there is enough capacity for play and connection, and then watch what happens to the child&apos;s breathing, movement, posture, voice and engagement.
            </p>

            <p className="mt-5 text-[17px] leading-8 text-[#53645D]">
              The activity itself is only part of the value. What you notice about the child while you are using it is often the part that teaches us the most.
            </p>
          </div>

          <div className="mt-12 border-t border-[#D8CFC2] pt-8">
            <h2 className="text-2xl font-extrabold text-[#1C3B34]">
              Want to revisit the free training?
            </h2>

            <p className="mt-3 max-w-3xl text-[17px] leading-8 text-[#53645D]">
              The full vagus nerve and nervous system training remains available for free, so you can return to the video whenever you want to understand more about the thinking behind the activities.
            </p>

            <Link
              href="/blog/vagus-nerve-regulation-activities"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#C29F60] px-6 py-3 text-sm font-extrabold text-[#1C3B34] transition hover:bg-[#FAF5EC]"
            >
              Return to the Vagus Nerve Article
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#1C3B34] py-10 text-white">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <p className="max-w-3xl text-sm leading-6 text-[#D8E1DC]">
            These resources are designed for general education and professional learning. Every child will respond differently to sensory, movement and breathing experiences, so continue to use your knowledge of the individual child, their developmental needs and any relevant health or safety considerations.
          </p>
        </div>
      </section>
    </main>
  );
}