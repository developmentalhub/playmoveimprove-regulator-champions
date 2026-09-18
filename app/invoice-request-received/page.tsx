export default function InvoiceRequestReceivedPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-10 text-[#12362F] md:px-6 md:py-16">
      <section className="mx-auto max-w-2xl">
        <div className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm md:p-10">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            Play Move Improve
          </span>

          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Your invoice request has been received
          </h1>

          <p className="mt-5 text-base leading-8 text-[#526A60] md:text-lg">
            Thanks for sending through your Regulator Champions details.
            I&apos;ve received your request and will prepare the tax invoice
            using the information you provided.
          </p>

          <div className="mt-8 rounded-3xl bg-[#FAF5EC] p-6">
            <h2 className="text-xl font-bold text-[#12362F]">
              What happens next
            </h2>

            <div className="mt-5 space-y-5">
              <div>
                <p className="font-bold text-[#12362F]">
                  1. I prepare your invoice
                </p>

                <p className="mt-1 text-sm leading-7 text-[#5E6D67]">
                  Your invoice will be prepared manually so your service,
                  funding and billing details are correct.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#12362F]">
                  2. The invoice is sent to your billing contact
                </p>

                <p className="mt-1 text-sm leading-7 text-[#5E6D67]">
                  If you supplied a separate billing email, the invoice will
                  be sent there. Otherwise it will be sent to the manager
                  email provided.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#12362F]">
                  3. Your service access is activated after payment
                </p>

                <p className="mt-1 text-sm leading-7 text-[#5E6D67]">
                  Once payment has been received, the manager account and
                  Regulator Champions service access will be activated.
                </p>
              </div>

              <div>
                <p className="font-bold text-[#12362F]">
                  4. Your manager receives their login setup
                </p>

                <p className="mt-1 text-sm leading-7 text-[#5E6D67]">
                  The manager will receive a secure password setup email and
                  can then invite up to 15 educators from the service.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-[#E5DED4] p-6">
            <h2 className="text-lg font-bold text-[#12362F]">
              Need to add something?
            </h2>

            <p className="mt-2 text-sm leading-7 text-[#5E6D67]">
              If you realise you need to change a billing detail or add
              information for your service, you can email Robyn directly.
            </p>

            <a
              href="mailto:robyn@playmoveimprove.com.au?subject=Regulator%20Champions%20invoice%20request"
              className="mt-5 inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#D8D2C9] bg-white px-5 py-3 text-sm font-extrabold text-[#12362F]"
            >
              Email Robyn
            </a>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="/"
              className="flex min-h-14 flex-1 items-center justify-center rounded-2xl bg-[#12362F] px-6 py-3 text-center text-sm font-extrabold text-white"
            >
              Return to Regulator Champions
            </a>

            <a
              href="/member-access"
              className="flex min-h-14 flex-1 items-center justify-center rounded-2xl border border-[#D8D2C9] bg-white px-6 py-3 text-center text-sm font-extrabold text-[#12362F]"
            >
              Member login
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}