'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-16 font-sans text-slate-800">
      <header className="border-b border-teal-700 bg-teal-800 px-6 py-6 text-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-200">
              Play Move Improve
            </span>
            <h1 className="text-xl font-bold md:text-2xl">
              Regulator Champions Terms of Service
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-teal-100 transition hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
          >
            Return Home
          </Link>
        </div>
      </header>

      <main className="mx-auto my-8 max-w-4xl space-y-8 rounded-3xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-700 shadow-sm md:p-12">
        <div>
          <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-teal-800">
            Service Agreement and Site Licence
          </span>

          <h2 className="text-2xl font-bold text-slate-900">
            Terms of Service
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Current as at August 2026
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-950">
          <strong>Important:</strong> These terms apply to purchases and use of
          the Regulator Champions platform and professional learning program.
          Nothing in these terms excludes rights that cannot lawfully be
          excluded under the Australian Consumer Law.
        </div>

        <hr className="border-slate-200" />

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            1. Program Provider
          </h3>

          <p>
            Regulator Champions is provided by Play Move Improve, operated by
            Robyn Papworth, ABN 17 415 190 263.
          </p>

          <p>
            References to “Play Move Improve”, “we”, “us” or “our” in these
            terms refer to the program provider. References to “service”,
            “centre”, “you” or “your” refer to the purchasing early childhood
            service or approved provider.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            2. Program Options, Fees, Term and Activation
          </h3>

          <p>
            Regulator Champions is available as either a{' '}
            <strong>3-Ladder Preview</strong> or the{' '}
            <strong>Full 8-Ladder Site Membership</strong> for one designated
            early childhood service location.
          </p>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <strong className="block text-amber-950">
                3-Ladder Preview — $1,790 including GST
              </strong>

              <p className="mt-2 text-sm">
                Includes six months of site access and progressive access to
                Ladders 1 to 3, together with the platform inclusions described
                in the applicable proposal or quote.
              </p>

              <p className="mt-2 text-sm">
                The Preview does not automatically include Ladders 4 to 8.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-200 bg-teal-50 p-5">
              <strong className="block text-teal-950">
                Full 8-Ladder Site Membership — $4,790 including GST
              </strong>

              <p className="mt-2 text-sm">
                Includes 12 months of site access and the complete eight-ladder
                pathway, with ladder content released progressively throughout
                the membership term.
              </p>

              <p className="mt-2 text-sm">
                The full upfront option is the lower total price for completing
                all eight ladders.
              </p>
            </div>
          </div>

          <p>
            A service that purchases the 3-Ladder Preview may later choose to
            continue into Ladders 4 to 8. The standard continuation price is{' '}
            <strong>$4,000 including GST</strong>. Preview services are currently
            offered a <strong>20% continuation discount</strong>, reducing the
            continuation price to <strong>$3,200 including GST</strong>.
          </p>

          <p>
            If both stages are purchased, the combined staged cost is{' '}
            <strong>$4,990 including GST</strong>. The Full 8-Ladder Site
            Membership purchased upfront is therefore $200 less than completing
            the pathway in two stages.
          </p>

          <p>
            The continuation discount is available only to the service that
            purchased the Preview and cannot be transferred to another service
            location. Unless a written quote states otherwise, the continuation
            offer must be accepted while the service's Preview access remains
            active or within 30 days after the Preview term ends.
          </p>

          <p>
            The applicable term begins when access details are issued following
            payment, or when another written purchase-order arrangement has
            been accepted by Play Move Improve.
          </p>

          <p>
            Preview access remains active for six months. Full membership access
            remains active for 12 months. If a Preview service purchases the
            continuation stage, its access will be extended so the service can
            complete the full pathway in accordance with the continuation quote
            or written confirmation.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            3. Site Licence and Permitted Users
          </h3>

          <p>
            Each site licence covers one designated physical early childhood
            service location.
          </p>

          <p>
            Employees, casual educators and leaders working at that location
            may access the program during the active membership term, subject
            to the service managing access appropriately.
          </p>

          <p>
            Multi-site providers require a separate licence or written
            multi-site agreement for each additional physical service
            location.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            4. Access Security
          </h3>

          <p>
            Access codes, login details, recordings and downloadable resources
            are provided for internal use by the subscribing service.
          </p>

          <p>
            Services must not share access with another centre, external
            organisation, personal network, public forum or unrelated third
            party.
          </p>

          <p>
            The service must notify Play Move Improve promptly if it believes
            access details have been lost, copied or used without authority.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            5. Intellectual Property and Internal Use
          </h3>

          <p>
            The Regulator Champions name, Regulation Ladders, recordings,
            written resources, project templates, visual materials, framework
            names and platform content remain the intellectual property of
            Play Move Improve or its licensors.
          </p>

          <p>
            During an active membership, the service receives a limited,
            non-exclusive, non-transferable licence to view, print and use
            supplied resources internally for professional learning and
            centre-based implementation.
          </p>

          <p>The service must not:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>sell or sublicense program materials</li>
            <li>upload resources to public websites or shared public drives</li>
            <li>remove copyright or ownership notices</li>
            <li>
              reproduce the program as its own commercial training product
            </li>
            <li>
              use recordings or materials to train staff at an unlicensed
              service location
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            6. Program Content and Delivery
          </h3>

          <p>The program may include:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Regulation Ladder learning content</li>
            <li>recorded professional learning sessions</li>
            <li>live ladder-specific webinars or reflective sessions</li>
            <li>educator reflection tools</li>
            <li>centre-based projects</li>
            <li>structured automated feedback</li>
            <li>expert review where indicated</li>
            <li>resources for team and family participation</li>
          </ul>

          <p>
            Preview services receive the content and supports allocated to
            Ladders 1 to 3 during their six-month term. Full-membership services,
            and Preview services that later purchase continuation, receive the
            complete eight-ladder pathway in accordance with the applicable
            release schedule.
          </p>

          <p>
            The timing, format and sequence of live sessions may change in
            response to member needs, facilitator availability and program
            development.
          </p>

          <p>
            Where reasonably practicable, recordings or alternative learning
            materials will be provided when a live session is rescheduled.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            7. Service Responsibilities
          </h3>

          <p>The subscribing service is responsible for:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              providing educators with appropriate time and support to
              participate
            </li>
            <li>maintaining lawful staffing and supervision arrangements</li>
            <li>
              determining whether a strategy is appropriate within its own
              policies, context and regulatory obligations
            </li>
            <li>managing workplace conduct and persistent staff refusal</li>
            <li>
              maintaining responsibility for child safety, supervision and
              family communication
            </li>
            <li>
              ensuring that no identifying child or family information is
              submitted
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            8. Renewals
          </h3>

          <p>
            Neither the Preview nor the Full 8-Ladder Site Membership
            automatically renews unless the service has expressly agreed to
            automatic renewal in writing.
          </p>

          <p>
            Purchasing the 3-Ladder Preview does not create an obligation to
            purchase the continuation stage. Continuation into Ladders 4 to 8
            requires a separate purchase, accepted quote or written
            purchase-order arrangement.
          </p>

          <p>
            Play Move Improve may contact the service before the end of the
            membership term with renewal information and the price applying to
            the next term.
          </p>

          <p>
            The service is not required to renew after the current membership
            expires.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            9. Cancellation and Refunds
          </h3>

          <p>
            Because both program options provide access to digital intellectual
            property, professional learning content and centre-wide resources,
            a change of mind does not automatically entitle the service to a
            refund after access has been issued.
          </p>

          <p>
            A Preview service that decides not to continue into Ladders 4 to 8
            is not entitled to a refund of the Preview fee merely because it
            chooses not to purchase the continuation stage.
          </p>

          <p>
            Refunds, cancellations or other remedies will still be provided
            where required under the Australian Consumer Law or another
            applicable law.
          </p>

          <p>
            Requests must be submitted in writing and should explain the reason
            for the request, the date of purchase and any relevant service
            issue.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            10. Australian Consumer Law
          </h3>

          <p>
            Our services come with guarantees that cannot be excluded under the
            Australian Consumer Law where that law applies.
          </p>

          <p>
            Nothing in these terms is intended to exclude, restrict or modify a
            consumer guarantee, right or remedy that cannot lawfully be
            excluded, restricted or modified.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            11. Recognition and Certificates
          </h3>

          <p>
            Individual ladder achievements may be issued when the relevant
            participation and reflection requirements are completed.
          </p>

          <p>
            Full Regulator Champion recognition requires completion of the
            required pathway and personal final review by Robyn Papworth.
          </p>

          <p>
            Recognition and certificates are issued by Play Move Improve as
            evidence of participation in professional learning and applied
            reflective practice.
          </p>

          <p>
            They are not nationally recognised training qualifications, VET
            credentials, higher education qualifications, professional
            registrations or allied health certifications.
          </p>

          <p>
            Play Move Improve may request further reflection or evidence before
            recognition is awarded.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            12. Professional Learning Scope
          </h3>

          <p>
            Regulator Champions provides professional learning, reflective
            practice and general educational frameworks for early childhood
            staff.
          </p>

          <p>It does not provide:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>individual child diagnosis</li>
            <li>medical or psychological advice</li>
            <li>occupational therapy assessment</li>
            <li>individualised treatment plans</li>
            <li>legal advice</li>
            <li>formal workplace investigation</li>
          </ul>

          <p>
            Services should seek appropriate allied health, medical, legal,
            regulatory or workplace advice when required.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            13. SRF, Kindy Uplift and Other Funding
          </h3>

          <p>
            Victorian services may engage Play Move Improve coaching through
            School Readiness Funding where the service selects coaching that
            addresses its identified priorities, educator capability needs and
            applicable SRF planning requirements.
          </p>

          <p>
            Play Move Improve's online coaching services are included in the
            Kindy Uplift catalogue for Queensland services. A service may
            consider those coaching services where they align with its identified
            Kindy Uplift priorities, planning and implementation needs.
          </p>

          <p>
            References on this website, in proposals or in program materials to
            School Readiness Funding or Kindy Uplift describe potential funding
            pathways only. They do not mean that Play Move Improve is endorsed
            by the Victorian or Queensland Department of Education.
          </p>

          <p>
            The purchasing service remains responsible for its funding plan,
            internal approval, supplier due diligence, purchase-order process,
            record keeping, reporting and acquittal obligations.
          </p>

          <p>
            Play Move Improve does not guarantee that a particular service will
            receive funding, have sufficient funding remaining, obtain internal
            purchasing approval or have expenditure accepted during acquittal.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            14. No Guarantee of Specific Outcomes
          </h3>

          <p>
            The program is designed to support educator learning, shared
            language, reflective practice and greater consistency.
          </p>

          <p>
            Outcomes depend on factors outside Play Move Improve’s control,
            including service leadership, staff participation, implementation,
            staffing, family circumstances and the individual needs of
            children.
          </p>

          <p>
            Play Move Improve does not guarantee specific child-development,
            staff-retention, behaviour, compliance, funding or workforce
            outcomes.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            15. Privacy and Confidentiality
          </h3>

          <p>
            Personal information is handled in accordance with the{' '}
            <Link
              href="/privacy"
              className="font-bold text-teal-700 underline hover:text-teal-900"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <p>
            Educators and centre leaders must not enter identifying child or
            family details into any reflection, project, form or community
            feature.
          </p>

          <p>Do not submit information such as:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>children’s or family members’ full names</li>
            <li>dates of birth</li>
            <li>addresses</li>
            <li>photographs</li>
            <li>medical record numbers</li>
            <li>
              combinations of details that could reasonably identify a person
            </li>
          </ul>

          <p>
            The service remains responsible for protecting confidential
            information held within its own systems and workplace.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            16. Automated Review and Expert Review
          </h3>

          <p>
            Some educator submissions may be checked using automated systems
            against structured completion and reflection criteria.
          </p>

          <p>
            Automated feedback does not constitute child assessment, clinical
            advice or confirmation that a strategy is appropriate in every
            circumstance.
          </p>

          <p>
            Submissions may be referred to Robyn for personal review where
            further reflection, clarification, safety consideration or expert
            judgement is required.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            17. Suspension and Termination
          </h3>

          <p>
            Play Move Improve may suspend access while investigating suspected
            misuse, security concerns or material breaches of these terms.
          </p>

          <p>
            Access may be terminated for serious or repeated conduct including:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>unauthorised sharing of access credentials</li>
            <li>commercial redistribution of resources</li>
            <li>deliberate infringement of intellectual property</li>
            <li>malicious, threatening or abusive platform use</li>
            <li>attempts to compromise platform security</li>
          </ul>

          <p>
            Where appropriate, Play Move Improve will provide notice and a
            reasonable opportunity to remedy the breach before termination.
            Immediate suspension may occur where safety, security or serious
            misuse is involved.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            18. Availability and Technical Issues
          </h3>

          <p>
            Play Move Improve will take reasonable steps to keep the platform
            available, but uninterrupted access cannot be guaranteed.
          </p>

          <p>
            Temporary interruptions may occur because of maintenance,
            third-party hosting, internet outages, security updates or events
            outside our reasonable control.
          </p>

          <p>
            Where a significant platform issue prevents access for an extended
            period, Play Move Improve will take reasonable steps to restore
            access or provide an appropriate alternative.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            19. Liability
          </h3>

          <p>
            To the extent permitted by law, Play Move Improve is not liable for
            indirect or consequential loss arising from use of the platform.
          </p>

          <p>
            This limitation does not apply to liability that cannot lawfully be
            excluded or limited, including applicable rights under the
            Australian Consumer Law.
          </p>

          <p>
            The service remains responsible for workplace decisions, child
            supervision, implementation choices, policy compliance and
            decisions made using program information.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            20. Changes to These Terms
          </h3>

          <p>
            Play Move Improve may update these terms to reflect changes to the
            program, technology, law or business operations.
          </p>

          <p>
            Material changes affecting an active paid membership will be
            communicated using the service contact details held by Play Move
            Improve.
          </p>

          <p>
            Changes will not remove rights that have already accrued under
            applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            21. Governing Law
          </h3>

          <p>
            These terms are governed by the laws of Victoria, Australia.
          </p>

          <p>
            The parties submit to the jurisdiction of the courts and tribunals
            with authority to hear disputes arising in Victoria, subject to any
            rights that apply under Australian Consumer Law or other applicable
            legislation.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            22. Dispute Resolution
          </h3>

          <p>
            A party with a concern should first provide written notice
            describing the issue and the outcome sought.
          </p>

          <p>
            Both parties agree to make a genuine attempt to resolve the matter
            through direct written discussion before commencing formal
            proceedings, except where urgent relief is required.
          </p>

          <div className="space-y-1 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-slate-800">
            <p className="font-bold text-teal-950">Play Move Improve</p>
            <p>
              <strong>ABN:</strong> 17 415 190 263
            </p>
            <p>
              <strong>Contact:</strong> Robyn Papworth
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:robyn@playmoveimprove.com.au"
                className="font-semibold text-teal-800 underline"
              >
                robyn@playmoveimprove.com.au
              </a>
            </p>
            <p>
              <strong>Website:</strong> playmoveimprove.com.au
            </p>
          </div>
        </section>
      </main>

      <footer className="mx-auto max-w-4xl px-6 pt-4 text-center text-xs text-slate-400">
        Play Move Improve • Regulator Champions
      </footer>
    </div>
  );
}