'use client';

import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-16 text-[#1C3B34]">
      <header className="border-b border-white/10 bg-[#1C3B34] px-6 py-6 text-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <span className="block text-sm font-bold uppercase tracking-widest text-[#E4C98E]">
              Play Move Improve
            </span>

            <h1 className="mt-1 text-xl font-extrabold text-white md:text-2xl">
              Regulator Champions Terms of Service
            </h1>
          </div>

          <Link
            href="/"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/10"
          >
            Return Home
          </Link>
        </div>
      </header>

      <main className="mx-auto my-8 max-w-4xl space-y-8 rounded-4xl border border-[#E5DED4] bg-white p-6 text-base leading-relaxed text-[#53645D] shadow-sm md:p-12">
        <div>
          <span className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#9A793D]">
            Service Agreement and Site Licence
          </span>

          <h2 className="text-3xl font-extrabold text-[#1C3B34]">
            Terms of Service
          </h2>

          <p className="mt-2 text-sm text-[#65736D]">
            Current as at September 2026
          </p>
        </div>

        <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-5 text-[#1C3B34]">
          <strong>Important:</strong>{' '}
          These terms apply to purchases and use of the
          Regulator Champions platform and professional learning
          service. Nothing in these terms excludes rights that
          cannot lawfully be excluded under the Australian
          Consumer Law.
        </div>

        <hr className="border-[#E5DED4]" />

        {/* 1 */}
        <TermsSection title="1. Program Provider">
          <p>
            Regulator Champions is provided by Play Move Improve,
            operated by Robyn Papworth, ABN 17 415 190 263.
          </p>

          <p>
            References to “Play Move Improve”, “we”, “us” or “our”
            in these terms refer to the program provider.
            References to “service”, “centre”, “you” or “your”
            refer to the purchasing early childhood service or
            approved provider.
          </p>
        </TermsSection>

        {/* 2 */}
        <TermsSection title="2. Program Options, Fees, Term and Activation">
          <p>
            Regulator Champions is currently available as two
            whole-service options for one designated early
            childhood service location.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-[#C29F60]/40 bg-[#FAF5EC] p-5">
              <strong className="block text-lg text-[#1C3B34]">
                6-Month Preview — $1,790 including GST
              </strong>

              <p className="mt-3">
                Includes six months of whole-service access to the
                Regulation Ladders and support features included
                in the Preview at the time of purchase, together
                with monthly coaching and other inclusions
                described in the applicable proposal or quote.
              </p>
            </div>

            <div className="rounded-3xl border border-[#A8C5B7] bg-[#F0F7F3] p-5">
              <strong className="block text-lg text-[#1C3B34]">
                12-Month Regulator Champions — $4,790 including GST
              </strong>

              <p className="mt-3">
                Includes 12 months of whole-service access to
                Regulator Champions, including the Regulation
                Ladders available during the membership term,
                monthly coaching, Ask Robyn support, recordings
                and other inclusions described in the applicable
                proposal or quote.
              </p>
            </div>
          </div>

          <p>
            The applicable membership term begins when access
            details are issued following payment, or when another
            written purchase-order arrangement has been accepted
            by Play Move Improve.
          </p>

          <p>
            Preview access remains active for six months.
            Twelve-month membership access remains active for
            12 months.
          </p>

          <p>
            The specific inclusions applying to a purchase are
            those described on the website, proposal, invoice or
            written quote at the time the purchase is accepted.
          </p>
        </TermsSection>

        {/* 3 */}
        <TermsSection title="3. Site Licence and Permitted Users">
          <p>
            Each site licence covers one designated physical early
            childhood service location unless a written
            multi-service agreement states otherwise.
          </p>

          <p>
            Employees, casual educators, room leaders,
            educational leaders and managers working at that
            location may access the program during the active
            membership term, subject to the service managing
            access appropriately.
          </p>

          <p>
            Multi-site providers require a separate licence or
            written multi-site agreement for additional service
            locations.
          </p>
        </TermsSection>

        {/* 4 */}
        <TermsSection title="4. Access Security">
          <p>
            Access codes, login details, recordings and
            downloadable resources are provided for internal use
            by the subscribing service.
          </p>

          <p>
            Services must not share access with another centre,
            external organisation, personal network, public forum
            or unrelated third party.
          </p>

          <p>
            The service must notify Play Move Improve promptly if
            it believes access details have been lost, copied or
            used without authority.
          </p>
        </TermsSection>

        {/* 5 */}
        <TermsSection title="5. Intellectual Property and Internal Use">
          <p>
            The Regulator Champions name, Regulation Ladders,
            recordings, written resources, templates, visual
            materials, framework names and platform content remain
            the intellectual property of Play Move Improve or its
            licensors.
          </p>

          <p>
            During an active membership, the service receives a
            limited, non-exclusive and non-transferable licence to
            view, print and use supplied resources internally for
            professional learning and service-based
            implementation.
          </p>

          <p>The service must not:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>sell or sublicense program materials</li>
            <li>
              upload resources to public websites or publicly
              accessible drives
            </li>
            <li>remove copyright or ownership notices</li>
            <li>
              reproduce Regulator Champions as its own commercial
              training product
            </li>
            <li>
              use recordings or materials to train staff at an
              unlicensed service location
            </li>
          </ul>
        </TermsSection>

        {/* 6 */}
        <TermsSection title="6. Program Content and Delivery">
          <p>Regulator Champions may include:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>Regulation Ladders</li>
            <li>Educator Floor Deck tools</li>
            <li>monthly live coaching sessions</li>
            <li>recordings of monthly coaching sessions</li>
            <li>private Ask Robyn question submissions</li>
            <li>educator reflection and progress tools</li>
            <li>manager and QIP reflection support</li>
            <li>family communication resources</li>
            <li>printable implementation resources</li>
            <li>
              additional professional learning resources added
              during the membership term
            </li>
          </ul>

          <p>
            Regulator Champions is an evolving professional
            learning service. New resources, Regulation Ladders
            and support features may be added during a membership
            term.
          </p>

          <p>
            A membership does not guarantee that a particular
            number of new Regulation Ladders, resources or tools
            will be released during the membership period unless
            that number has been specifically included in a
            written quote or agreement.
          </p>

          <p>
            The timing, format and topic of monthly coaching may
            change in response to educator questions, member
            needs, facilitator availability and program
            development.
          </p>

          <p>
            Live attendance is not required. Where a monthly
            coaching session is recorded successfully, the
            recording will be made available to active members
            through the Member Hub or another secure member
            location.
          </p>

          <p>
            Technical problems, privacy concerns or other
            reasonable circumstances may occasionally prevent a
            particular live session from being recorded. Where
            practicable, Play Move Improve may provide alternative
            learning material or a replacement resource.
          </p>
        </TermsSection>

        {/* 7 */}
        <TermsSection title="7. Ask Robyn and Monthly Coaching">
          <p>
            Regulator Champions provides members with
            opportunities to submit general, de-identified
            practice questions for consideration by Robyn.
          </p>

          <p>
            Submitted questions may be used to help shape monthly
            coaching topics and professional learning
            conversations.
          </p>

          <p>
            Submission of a question does not guarantee an
            immediate individual response, private consultation or
            one-to-one case review.
          </p>

          <p>
            Questions may instead be addressed within monthly
            coaching, future resources or other Regulator
            Champions professional learning.
          </p>

          <p>
            Members must not include identifying child or family
            information when submitting questions.
          </p>
        </TermsSection>

        {/* 8 */}
        <TermsSection title="8. Service Responsibilities">
          <p>The subscribing service is responsible for:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              providing educators with reasonable opportunities
              to engage with the program
            </li>
            <li>
              maintaining lawful staffing and supervision
              arrangements
            </li>
            <li>
              determining whether a strategy is appropriate
              within its own policies, context and regulatory
              obligations
            </li>
            <li>
              maintaining responsibility for child safety,
              supervision and family communication
            </li>
            <li>
              ensuring that identifying child or family
              information is not submitted through member forms
            </li>
            <li>
              ensuring access credentials remain within the
              authorised service team
            </li>
          </ul>

          <p>
            Regulator Champions is designed to fit around busy
            early childhood practice. Individual educators are
            not required to attend every live coaching session.
            Services may choose to use recordings during team
            meetings, planning time or other suitable professional
            learning opportunities.
          </p>
        </TermsSection>

        {/* 9 */}
        <TermsSection title="9. Renewals">
          <p>
            Neither the 6-Month Preview nor the 12-Month
            Regulator Champions membership automatically renews
            unless the service has expressly agreed to automatic
            renewal in writing.
          </p>

          <p>
            Purchasing the 6-Month Preview does not create an
            obligation to purchase a further membership.
          </p>

          <p>
            Play Move Improve may contact the service before the
            end of the membership term with information about
            continuing or renewing.
          </p>

          <p>
            Any future membership price or inclusion may differ
            from the price or inclusions applying to the current
            term.
          </p>
        </TermsSection>

        {/* 10 */}
        <TermsSection title="10. Cancellation and Refunds">
          <p>
            Because membership provides access to digital
            intellectual property, professional learning,
            recordings, online tools and whole-service resources,
            a change of mind does not automatically entitle the
            purchasing service to a refund after access has been
            issued.
          </p>

          <p>
            Choosing not to continue after a 6-Month Preview does
            not entitle the service to a refund of the Preview
            fee.
          </p>

          <p>
            Refunds, cancellations or other remedies will still
            be provided where required under the Australian
            Consumer Law or another applicable law.
          </p>

          <p>
            Requests should be submitted in writing and include
            the date of purchase, service name and relevant
            details about the issue.
          </p>
        </TermsSection>

        {/* 11 */}
        <TermsSection title="11. Australian Consumer Law">
          <p>
            Our services come with guarantees that cannot be
            excluded under the Australian Consumer Law where that
            law applies.
          </p>

          <p>
            Nothing in these terms is intended to exclude,
            restrict or modify a consumer guarantee, right or
            remedy that cannot lawfully be excluded, restricted
            or modified.
          </p>
        </TermsSection>

        {/* 12 */}
        <TermsSection title="12. Professional Learning and Recognition">
          <p>
            Regulator Champions is professional learning and
            practice support for early childhood educators and
            services.
          </p>

          <p>
            Play Move Improve may provide participation records,
            certificates or other recognition for professional
            learning completed through the program where
            applicable.
          </p>

          <p>
            Any recognition or certificate issued by Play Move
            Improve is evidence of participation in professional
            learning or reflective practice only.
          </p>

          <p>
            It is not a nationally recognised training
            qualification, VET credential, higher education
            qualification, professional registration or allied
            health certification.
          </p>
        </TermsSection>

        {/* 13 */}
        <TermsSection title="13. Professional Learning Scope">
          <p>
            Regulator Champions provides professional learning,
            reflective practice and general educational guidance
            for early childhood staff.
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
            Services should seek appropriate allied health,
            medical, legal, regulatory or workplace advice when
            required.
          </p>
        </TermsSection>

        {/* 14 */}
        <TermsSection title="14. Funding">
          <p>
            References to School Readiness Funding, Kindy Uplift
            or other funding pathways are provided to help
            services consider whether Regulator Champions may
            align with their identified professional learning and
            service improvement priorities.
          </p>

          <p>
            Funding availability, supplier arrangements,
            eligibility requirements and permitted expenditure
            can change.
          </p>

          <p>
            The purchasing service remains responsible for
            checking current funding requirements, obtaining
            internal approval, completing supplier due diligence,
            arranging purchase orders and meeting record keeping,
            reporting and acquittal obligations.
          </p>

          <p>
            Play Move Improve does not guarantee that a particular
            service will receive funding, have sufficient funding
            available, obtain purchasing approval or have an
            expense accepted during acquittal.
          </p>
        </TermsSection>

        {/* 15 */}
        <TermsSection title="15. No Guarantee of Specific Outcomes">
          <p>
            Regulator Champions is designed to support educator
            learning, shared language, reflective practice and
            greater consistency.
          </p>

          <p>
            Outcomes depend on factors outside Play Move
            Improve&apos;s control, including service leadership,
            educator participation, implementation, staffing,
            family circumstances and the individual needs of
            children.
          </p>

          <p>
            Play Move Improve does not guarantee specific child
            development, behaviour, staff retention, compliance,
            funding or workforce outcomes.
          </p>
        </TermsSection>

        {/* 16 */}
        <TermsSection title="16. Privacy and Confidentiality">
          <p>
            Personal information is handled in accordance with
            the{' '}
            <Link
              href="/privacy"
              className="font-bold text-[#1C3B34] underline hover:text-[#657B6C]"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <p>
            Educators and service leaders must not enter
            identifying child or family details into Ask Robyn
            submissions, reflections, forms or other member
            features.
          </p>

          <p>Do not submit information such as:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>children&apos;s or family members&apos; full names</li>
            <li>dates of birth</li>
            <li>addresses</li>
            <li>photographs</li>
            <li>medical record numbers</li>
            <li>
              combinations of information that could reasonably
              identify a child or family
            </li>
          </ul>

          <p>
            The service remains responsible for protecting
            confidential information held within its own systems
            and workplace.
          </p>
        </TermsSection>

        {/* 17 */}
        <TermsSection title="17. Automated Tools and Expert Review">
          <p>
            Some platform features may use automated systems to
            organise, summarise or support educator reflection.
          </p>

          <p>
            Automated outputs do not constitute child assessment,
            diagnosis, clinical advice, legal advice or
            confirmation that a strategy is appropriate in every
            circumstance.
          </p>

          <p>
            Where a member submits a question through Ask Robyn,
            the response or professional learning provided is
            general in nature and must be considered alongside the
            service&apos;s own context, policies and professional
            responsibilities.
          </p>
        </TermsSection>

        {/* 18 */}
        <TermsSection title="18. Suspension and Termination">
          <p>
            Play Move Improve may suspend access while
            investigating suspected misuse, security concerns or
            material breaches of these terms.
          </p>

          <p>
            Access may be terminated for serious or repeated
            conduct including:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              unauthorised sharing of access credentials
            </li>
            <li>
              commercial redistribution of resources
            </li>
            <li>
              deliberate infringement of intellectual property
            </li>
            <li>
              malicious, threatening or abusive platform use
            </li>
            <li>
              attempts to compromise platform security
            </li>
          </ul>

          <p>
            Where appropriate, Play Move Improve will provide
            notice and a reasonable opportunity to remedy the
            breach before termination. Immediate suspension may
            occur where safety, security or serious misuse is
            involved.
          </p>
        </TermsSection>

        {/* 19 */}
        <TermsSection title="19. Availability and Technical Issues">
          <p>
            Play Move Improve will take reasonable steps to keep
            the platform available, but uninterrupted access
            cannot be guaranteed.
          </p>

          <p>
            Temporary interruptions may occur because of
            maintenance, third-party hosting, internet outages,
            security updates or events outside our reasonable
            control.
          </p>

          <p>
            Where a significant platform issue prevents access
            for an extended period, Play Move Improve will take
            reasonable steps to restore access or provide an
            appropriate alternative.
          </p>
        </TermsSection>

        {/* 20 */}
        <TermsSection title="20. Liability">
          <p>
            To the extent permitted by law, Play Move Improve is
            not liable for indirect or consequential loss arising
            from use of the platform.
          </p>

          <p>
            This limitation does not apply to liability that
            cannot lawfully be excluded or limited, including
            applicable rights under the Australian Consumer Law.
          </p>

          <p>
            The service remains responsible for workplace
            decisions, child supervision, implementation choices,
            policy compliance and decisions made using program
            information.
          </p>
        </TermsSection>

        {/* 21 */}
        <TermsSection title="21. Changes to the Program or These Terms">
          <p>
            Play Move Improve may update the platform, program
            inclusions or these terms to reflect member needs,
            program development, technology, law or business
            operations.
          </p>

          <p>
            Material changes that significantly affect an active
            paid membership will be communicated using the service
            contact details held by Play Move Improve.
          </p>

          <p>
            Changes will not remove rights that have already
            accrued under applicable law.
          </p>
        </TermsSection>

        {/* 22 */}
        <TermsSection title="22. Governing Law">
          <p>
            These terms are governed by the laws of Victoria,
            Australia.
          </p>

          <p>
            The parties submit to the jurisdiction of the courts
            and tribunals with authority to hear disputes arising
            in Victoria, subject to any rights that apply under
            Australian Consumer Law or other applicable
            legislation.
          </p>
        </TermsSection>

        {/* 23 */}
        <TermsSection title="23. Dispute Resolution">
          <p>
            A party with a concern should first provide written
            notice describing the issue and the outcome sought.
          </p>

          <p>
            Both parties agree to make a genuine attempt to
            resolve the matter through direct written discussion
            before commencing formal proceedings, except where
            urgent relief is required.
          </p>

          <div className="space-y-2 rounded-3xl border border-[#A8C5B7] bg-[#F0F7F3] p-5 text-[#1C3B34]">
            <p className="font-extrabold">
              Play Move Improve
            </p>

            <p>
              <strong>ABN:</strong>{' '}
              17 415 190 263
            </p>

            <p>
              <strong>Contact:</strong>{' '}
              Robyn Papworth
            </p>

            <p>
              <strong>Email:</strong>{' '}
              <a
                href="mailto:robyn@playmoveimprove.com.au"
                className="font-bold underline"
              >
                robyn@playmoveimprove.com.au
              </a>
            </p>

            <p>
              <strong>Website:</strong>{' '}
              playmoveimprove.com
            </p>
          </div>
        </TermsSection>
      </main>

      <footer className="mx-auto max-w-4xl px-6 pt-4 text-center text-sm text-[#65736D]">
        Play Move Improve · Regulator Champions
      </footer>
    </div>
  );
}

function TermsSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 border-t border-[#E5DED4] pt-7">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}