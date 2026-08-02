'use client';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-16 font-sans text-slate-800">
      <header className="border-b border-teal-700 bg-teal-800 px-6 py-6 text-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-200">
              Play Move Improve
            </span>

            <h1 className="text-xl font-bold md:text-2xl">
              Regulator Champions Privacy Policy
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
            Information Handling and Educator Privacy
          </span>

          <h2 className="text-2xl font-bold text-slate-900">
            Privacy Policy
          </h2>

          <p className="mt-1 text-xs text-slate-500">
            Current as at July 2026
          </p>
        </div>

        <div className="rounded-2xl border border-amber-300 bg-amber-50 p-5 text-sm text-amber-950">
          <strong className="block font-bold text-amber-950">
            Do not enter identifying child or family information
          </strong>

          <p className="mt-2 leading-relaxed">
            Forms, reflections and project submissions must describe general
            room, routine or professional-practice patterns only. Do not include
            children’s or family members’ names, dates of birth, addresses,
            photographs, medical identifiers or combinations of details that
            could reasonably identify them.
          </p>
        </div>

        <hr className="border-slate-200" />

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            1. About This Policy
          </h3>

          <p>
            This policy explains how Play Move Improve, operated by Robyn
            Papworth, ABN 17 415 190 263, collects, uses, stores and discloses
            personal information through the Regulator Champions website,
            professional learning platform and associated services.
          </p>

          <p>
            We aim to manage personal information carefully, transparently and
            consistently with privacy obligations that apply to our operations.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            2. Information We May Collect
          </h3>

          <p>Depending on how you use the service, we may collect:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>Contact information:</strong> your name, work email
              address, telephone number, role and organisation.
            </li>

            <li>
              <strong>Service information:</strong> centre name, approved
              provider details, service location, purchasing information and
              possible funding source.
            </li>

            <li>
              <strong>Centre Starting-Point Review information:</strong> broad
              descriptions of team pressures, room routines, implementation
              needs and professional learning priorities.
            </li>

            <li>
              <strong>Educator Confidence Check responses:</strong> private
              professional reflections about confidence, sensory awareness,
              stress responses and current regulation practice.
            </li>

            <li>
              <strong>Learning and project information:</strong> ladder
              progress, reflection entries, submitted projects, participation
              records and recognition evidence.
            </li>

            <li>
              <strong>Enquiry and support information:</strong> questions,
              proposal requests, correspondence and topic suggestions.
            </li>

            <li>
              <strong>Technical information:</strong> information ordinarily
              generated when a website is used, such as browser type, device
              information, approximate location based on internet connection,
              access time and diagnostic logs.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            3. Information We Do Not Intentionally Collect
          </h3>

          <p>
            Regulator Champions is not designed to hold individual child
            records, family case notes, medical records or diagnostic reports.
          </p>

          <p>Users must not submit:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>children’s or family members’ full names</li>
            <li>dates of birth or home addresses</li>
            <li>photographs, videos or audio recordings of children</li>
            <li>medical, therapy or diagnostic documents</li>
            <li>identifiable incident reports</li>
            <li>
              information about a family’s health, finances, legal matters or
              private circumstances
            </li>
          </ul>

          <p>
            If identifiable child or family information is submitted
            unintentionally, contact us promptly so we can assess whether it
            should be removed.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            4. How We Use Information
          </h3>

          <p>We may use collected information to:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>respond to enquiries and prepare centre proposals</li>
            <li>create and administer service access</li>
            <li>deliver Regulation Ladder learning and resources</li>
            <li>record participation and learning progress</li>
            <li>provide structured feedback on reflections and projects</li>
            <li>identify common professional learning themes</li>
            <li>review final Regulator Champion applications</li>
            <li>improve program content and website functionality</li>
            <li>send operational messages relating to membership</li>
            <li>maintain platform security and investigate misuse</li>
            <li>meet legal, taxation and record-keeping obligations</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            5. Educator Confidence Check Privacy
          </h3>

          <p>
            The Educator Regulation Confidence Check is a private professional
            learning reflection. It is not intended to operate as a formal
            employee performance assessment.
          </p>

          <p>
            Individual educator answers may be accessed by Robyn Papworth and
            authorised personnel who require access to administer, secure or
            support the platform.
          </p>

          <p>
            Individual answers, named reflection entries and verbatim educator
            responses are not routinely provided to centre directors or
            approved providers.
          </p>

          <p>
            Directors may receive broad, de-identified or aggregated themes
            intended to guide centre-wide professional learning. For example, a
            report may identify that transitions are a common pressure point
            across the team without naming individual educators or reproducing
            their answers.
          </p>

          <p>
            Information may be disclosed where required by law, where necessary
            to respond to an immediate safety concern, or where the educator has
            authorised disclosure.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            6. Automated Processing and Feedback
          </h3>

          <p>
            Some forms and learning submissions may be processed using
            automated rules or software to check whether required fields are
            complete, identify common themes, calculate participation measures
            or determine whether further reflection is required.
          </p>

          <p>
            Automated feedback may identify elements such as observation,
            action, reflection and consistency. It does not provide a child
            diagnosis, clinical assessment or guarantee that a strategy is
            appropriate in every situation.
          </p>

          <p>
            Submissions may be referred to Robyn for personal review where they
            contain uncertainty, potential safety concerns, sensitive content
            or issues requiring professional judgement.
          </p>

          <p>
            If artificial intelligence services are introduced to analyse
            educator submissions, this policy and the relevant collection
            notice will be updated to explain the provider, purpose and
            safeguards before that processing begins.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            7. Service Providers
          </h3>

          <p>
            We may use third-party providers to operate and support the
            platform. These may include:
          </p>

          <ul className="list-disc space-y-2 pl-6">
            <li>website hosting and deployment providers</li>
            <li>database and authentication providers</li>
            <li>email delivery providers</li>
            <li>payment, accounting or invoicing services</li>
            <li>website security and diagnostic services</li>
            <li>professional advisers where reasonably necessary</li>
          </ul>

          <p>
            At the time of this policy, website, database or email functions may
            use providers including Vercel, Supabase and Resend.
          </p>

          <p>
            Providers receive only the information reasonably required to
            perform their contracted function and handle information subject to
            their own terms, privacy policies and technical infrastructure.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            8. Storage and Overseas Processing
          </h3>

          <p>
            Personal information may be stored or processed using cloud
            infrastructure operated by service providers in Australia or other
            countries.
          </p>

          <p>
            The exact location may depend on the infrastructure region selected
            for the service and the locations used by providers for backups,
            support, security, email delivery or content distribution.
          </p>

          <p>
            We take reasonable steps when selecting and configuring providers
            and do not claim that all information remains exclusively within
            Australia unless this has been specifically confirmed for the
            relevant service.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            9. Data Security
          </h3>

          <p>
            We take reasonable administrative and technical steps to protect
            personal information from misuse, loss, interference, unauthorised
            access, modification or disclosure.
          </p>

          <p>Measures may include:</p>

          <ul className="list-disc space-y-2 pl-6">
            <li>restricted administrative access</li>
            <li>authentication and access controls</li>
            <li>encrypted connections</li>
            <li>secure cloud infrastructure</li>
            <li>software updates and security monitoring</li>
            <li>backups and recovery procedures where configured</li>
          </ul>

          <p>
            No internet-based service can guarantee absolute security. Users
            must also protect their access codes and notify us if they believe
            their access has been compromised.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            10. Retention and Deletion
          </h3>

          <p>
            We retain personal information only for as long as reasonably
            required for the purpose for which it was collected, to administer
            the membership, maintain appropriate business records, resolve
            disputes or satisfy legal obligations.
          </p>

          <p>
            Educator learning records may ordinarily be retained during the
            centre’s active membership and for a reasonable period afterwards
            to support completion records, recognition review, renewal or
            returning membership.
          </p>

          <p>
            Information that is no longer reasonably required will be deleted,
            de-identified or archived where practicable, subject to legal,
            backup and record-keeping requirements.
          </p>

          <p>
            A service or individual may request deletion, although some records
            may need to be retained where required by law or for legitimate
            administrative purposes.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            11. Access and Correction
          </h3>

          <p>
            You may request access to personal information we hold about you or
            ask us to correct information that is inaccurate, out of date,
            incomplete, irrelevant or misleading.
          </p>

          <p>
            We may need to verify your identity before providing access,
            changing information or deleting records.
          </p>

          <p>
            In some circumstances, access or deletion may be limited where
            required or permitted by law, where it would affect another
            person’s privacy, or where information must be retained for
            legitimate record-keeping purposes.
          </p>

          <p>
            Requests should be emailed to{' '}
            <a
              href="mailto:robyn@playmoveimprove.com.au"
              className="font-semibold text-teal-800 underline"
            >
              robyn@playmoveimprove.com.au
            </a>
            . We will respond within a reasonable period.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            12. Email Communications
          </h3>

          <p>
            We may send operational emails concerning enquiries, proposals,
            membership access, webinar information, service updates, security
            matters and learning participation.
          </p>

          <p>
            Promotional emails will include a way to unsubscribe where
            required. Unsubscribing from marketing does not prevent necessary
            administrative or membership communications.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            13. Website Analytics and Cookies
          </h3>

          <p>
            The website may use essential browser storage, cookies or similar
            technologies to maintain access, remember preferences, protect
            forms and understand general website performance.
          </p>

          <p>
            If additional analytics, advertising or tracking tools are added,
            this policy and any required consent notices will be updated.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            14. Data Breaches
          </h3>

          <p>
            If we become aware of suspected unauthorised access, disclosure or
            loss of personal information, we will investigate the incident,
            take reasonable containment steps and assess the likely impact.
          </p>

          <p>
            Where notification is required under applicable law, affected
            individuals and the relevant regulator will be notified in
            accordance with those requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            15. Privacy Questions and Complaints
          </h3>

          <p>
            Contact us if you have a question, concern or complaint about how
            your information has been handled.
          </p>

          <p>
            Please provide enough information for us to understand and
            investigate the issue. We will acknowledge the concern and work
            towards a reasonable response.
          </p>

          <div className="space-y-1 rounded-2xl border border-teal-200 bg-teal-50 p-5 text-slate-800">
            <p className="font-bold text-teal-950">
              Play Move Improve
            </p>

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

        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900">
            16. Changes to This Policy
          </h3>

          <p>
            We may update this policy when the program, technology, service
            providers or legal requirements change.
          </p>

          <p>
            The current version will be published on this page with its
            effective date. Material changes affecting active members may also
            be communicated using the contact details held for the service.
          </p>
        </section>
      </main>

      <footer className="mx-auto max-w-4xl px-6 pt-4 text-center text-xs text-slate-400">
        Play Move Improve • Regulator Champions
      </footer>
    </div>
  );
}