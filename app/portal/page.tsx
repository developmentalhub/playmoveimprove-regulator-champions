'use client';

import Link from 'next/link';
import React, {
  FormEvent,
  useState,
} from 'react';

import MemberSignOutButton from '@/components/MemberSignOutButton';
import ProgressSummary from '@/components/feed/ProgressSummary';
import RegulationLadders from '@/components/feed/RegulationLadders';

type HubView =
  | 'ladders'
  | 'resources'
  | 'recordings'
  | 'support'
  | 'family'
  | 'reflections';

type SubmissionStatus =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

type FamilyBridgeCard = {
  category: string;
  title: string;
  educatorMessage: string;
  familyQuestion: string;
};

type ApiResponse = {
  success?: boolean;
  error?: string;
};

const SESSION_DAY_OPTIONS = [
  'Tuesday',
  'Wednesday',
  'Thursday',
];

const SESSION_TIME_OPTIONS = [
  '10:00 am',
  '12:00 pm',
  '1:00 pm',
  '3:30 pm',
  '4:00 pm',
  'Other',
];

const ATTENDANCE_OPTIONS = [
  'Live individually',
  'Live with colleagues',
  'Recording afterwards',
  'A mixture depending on the month',
];

const FAMILY_BRIDGE_CARDS: FamilyBridgeCard[] =
  [
    {
      category: 'Drop-off',
      title: 'Keep the goodbye predictable',
      educatorMessage:
        'Today we are practising a warm, short goodbye so your child knows what happens next.',
      familyQuestion:
        'Is there anything that usually helps your child separate more comfortably at home or elsewhere?',
    },
    {
      category: 'Drop-off',
      title: 'Give the body time',
      educatorMessage:
        'Your child may need a little time to watch, settle and feel safe before joining in.',
      familyQuestion:
        'Have you noticed whether your child prefers to watch first when entering busy places?',
    },
    {
      category: 'Connection',
      title: 'Use something familiar',
      educatorMessage:
        'We are using familiar words and routines today to help the transition into the room feel smaller.',
      familyQuestion:
        'Are there words, songs or routines your child finds especially reassuring at home?',
    },
    {
      category: 'Transitions',
      title:
        'Prepare before changing activities',
      educatorMessage:
        'We are giving your child an early warning before transitions so their body has time to adjust.',
      familyQuestion:
        'What helps when your child needs to stop one activity and move to another at home?',
    },
    {
      category: 'Participation',
      title:
        'Joining does not always mean sitting',
      educatorMessage:
        'We are helping your child participate without expecting their body to stay completely still.',
      familyQuestion:
        'When your child is listening closely at home, what does their body usually look like?',
    },
    {
      category: 'Sensory',
      title: 'Notice the busy moments',
      educatorMessage:
        'We are noticing when noise and activity become harder for your child and adjusting support earlier.',
      familyQuestion:
        'Are there particular sounds, crowds or busy environments your child finds difficult outside the service?',
    },
    {
      category: 'Co-regulation',
      title:
        'Connect before adding demands',
      educatorMessage:
        'When things feel hard today, we are slowing down and reconnecting before giving another instruction.',
      familyQuestion:
        'What usually helps your child reconnect with you when they are upset or overwhelmed?',
    },
    {
      category: 'Movement',
      title:
        'Movement can help participation',
      educatorMessage:
        'We are offering purposeful movement before expecting longer periods of sitting, listening or waiting.',
      familyQuestion:
        'Does your child naturally seek movement before quieter activities at home?',
    },
    {
      category: 'End of day',
      title:
        'Expect less when capacity is low',
      educatorMessage:
        'Late in the day we are reducing unnecessary demands when children are showing us they are tired.',
      familyQuestion:
        'What do you notice in your child when they have reached the end of their capacity?',
    },
  ];

const NAV_ITEMS: {
  value: HubView;
  title: string;
  description: string;
}[] = [
  {
    value: 'ladders',
    title: 'Regulation Ladders',
    description: 'Start with the situation',
  },
  {
    value: 'resources',
    title: 'Practical Resources',
    description: 'Print and use',
  },
  {
    value: 'recordings',
    title: 'Recordings',
    description: 'Watch when it suits',
  },
  {
    value: 'support',
    title: 'Support & Questions',
    description: 'Ask or join live',
  },
  {
    value: 'family',
    title: 'Family Bridge',
    description: 'Talk with families',
  },
  {
    value: 'reflections',
    title: 'Reflections',
    description: 'Optional deeper work',
  },
];

export default function MemberPortalPage() {
  const [hubView, setHubView] =
    useState<HubView>('ladders');

  const [userEmail, setUserEmail] =
    useState('');

  const [
    openingResource,
    setOpeningResource,
  ] = useState<string | null>(null);

  const [
    resourceError,
    setResourceError,
  ] = useState('');

  const [
    copiedCard,
    setCopiedCard,
  ] = useState<string | null>(null);

  const [
    whatNoticing,
    setWhatNoticing,
  ] = useState('');

  const [
    whatTried,
    setWhatTried,
  ] = useState('');

  const [
    whatHelpUnderstanding,
    setWhatHelpUnderstanding,
  ] = useState('');

  const [
    questionFirstName,
    setQuestionFirstName,
  ] = useState('');

  const [
    questionStatus,
    setQuestionStatus,
  ] =
    useState<SubmissionStatus>('idle');

  const [
    questionMessage,
    setQuestionMessage,
  ] = useState('');

  const [
    preferredDays,
    setPreferredDays,
  ] = useState<string[]>([]);

  const [
    preferredTimes,
    setPreferredTimes,
  ] = useState<string[]>([]);

  const [
    otherTime,
    setOtherTime,
  ] = useState('');

  const [
    attendancePreference,
    setAttendancePreference,
  ] = useState('');

  const [
    voteFirstName,
    setVoteFirstName,
  ] = useState('');

  const [
    voteStatus,
    setVoteStatus,
  ] =
    useState<SubmissionStatus>('idle');

  const [
    voteMessage,
    setVoteMessage,
  ] = useState('');

  const cleanedEmail =
    userEmail.trim().toLowerCase();

  const toggleDay = (
    day: string,
  ) => {
    setPreferredDays((current) =>
      current.includes(day)
        ? current.filter(
            (item) => item !== day,
          )
        : [...current, day],
    );
  };

  const toggleTime = (
    time: string,
  ) => {
    setPreferredTimes((current) =>
      current.includes(time)
        ? current.filter(
            (item) => item !== time,
          )
        : [...current, time],
    );
  };

  const handleQuestionSubmit =
    async (
      event: FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      setQuestionStatus('idle');
      setQuestionMessage('');

      if (
        whatNoticing.trim().length < 10
      ) {
        setQuestionStatus('error');
        setQuestionMessage(
          'Please tell me a little more about what you are noticing.',
        );
        return;
      }

      if (
        !questionFirstName.trim()
      ) {
        setQuestionStatus('error');
        setQuestionMessage(
          'Please add your first name.',
        );
        return;
      }

      setQuestionStatus('submitting');

      try {
        const response =
          await fetch(
            '/api/monthly-question',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify({
                whatNoticing:
                  whatNoticing.trim(),
                whatTried:
                  whatTried.trim(),
                whatHelpUnderstanding:
                  whatHelpUnderstanding.trim(),
                firstName:
                  questionFirstName.trim(),
              }),
            },
          );

        let result: ApiResponse = {};

        try {
          result =
            (await response.json()) as ApiResponse;
        } catch {
          result = {};
        }

        if (
          !response.ok ||
          result.success !== true
        ) {
          throw new Error(
            result.error ??
              'Your question could not be submitted.',
          );
        }

        setQuestionStatus('success');
        setQuestionMessage(
          'Thank you. I’ve got it.',
        );

        setWhatNoticing('');
        setWhatTried('');
        setWhatHelpUnderstanding('');
      } catch (error) {
        console.error(
          'Monthly question submission failed:',
          error,
        );

        setQuestionStatus('error');

        setQuestionMessage(
          error instanceof Error
            ? error.message
            : 'Your question could not be submitted. Please try again.',
        );
      }
    };

  const handleVoteSubmit =
    async (
      event: FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      setVoteStatus('idle');
      setVoteMessage('');

      if (
        preferredDays.length === 0
      ) {
        setVoteStatus('error');
        setVoteMessage(
          'Please choose at least one preferred day.',
        );
        return;
      }

      if (
        preferredTimes.length === 0
      ) {
        setVoteStatus('error');
        setVoteMessage(
          'Please choose at least one preferred time.',
        );
        return;
      }

      if (
        preferredTimes.includes(
          'Other',
        ) &&
        !otherTime.trim()
      ) {
        setVoteStatus('error');
        setVoteMessage(
          'Please tell me what other time usually works for your team.',
        );
        return;
      }

      if (
        !attendancePreference
      ) {
        setVoteStatus('error');
        setVoteMessage(
          'Please tell me how you would usually attend.',
        );
        return;
      }

      if (!voteFirstName.trim()) {
        setVoteStatus('error');
        setVoteMessage(
          'Please add your first name.',
        );
        return;
      }

      setVoteStatus('submitting');

      try {
        const response =
          await fetch(
            '/api/monthly-session-vote',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify({
                preferredDays,
                preferredTimes,
                otherTime:
                  otherTime.trim(),
                attendancePreference,
                firstName:
                  voteFirstName.trim(),
              }),
            },
          );

        let result: ApiResponse = {};

        try {
          result =
            (await response.json()) as ApiResponse;
        } catch {
          result = {};
        }

        if (
          !response.ok ||
          result.success !== true
        ) {
          throw new Error(
            result.error ??
              'Your session preferences could not be submitted.',
          );
        }

        setVoteStatus('success');

        setVoteMessage(
          'Thank you. Your preferences have been received.',
        );
      } catch (error) {
        console.error(
          'Monthly session vote failed:',
          error,
        );

        setVoteStatus('error');

        setVoteMessage(
          error instanceof Error
            ? error.message
            : 'Your session preferences could not be submitted. Please try again.',
        );
      }
    };

  const openMemberResource =
    async (file: string) => {
      setOpeningResource(file);
      setResourceError('');

      try {
        const response =
          await fetch(
            '/api/member-resource',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify({
                file,
              }),
            },
          );

        const result =
          (await response.json()) as {
            success?: boolean;
            url?: string;
            error?: string;
          };

        if (
          !response.ok ||
          result.success !== true ||
          !result.url
        ) {
          throw new Error(
            result.error ??
              'The member resource could not be opened.',
          );
        }

        window.open(
          result.url,
          '_blank',
          'noopener,noreferrer',
        );
      } catch (error) {
        console.error(
          'Member resource open failed:',
          error,
        );

        setResourceError(
          error instanceof Error
            ? error.message
            : 'The member resource could not be opened. Please try again.',
        );
      } finally {
        setOpeningResource(null);
      }
    };

  const copyFamilyCard =
    async (
      card: FamilyBridgeCard,
    ) => {
      const copyText =
        `${card.educatorMessage}

A question for you:
${card.familyQuestion}`;

      try {
        await navigator.clipboard.writeText(
          copyText,
        );

        setCopiedCard(card.title);

        window.setTimeout(() => {
          setCopiedCard(
            (current) =>
              current === card.title
                ? null
                : current,
          );
        }, 1800);
      } catch (error) {
        console.error(
          'Copy failed:',
          error,
        );
      }
    };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 text-[#1C3B34]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E5DED4] bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <p className="text-sm font-semibold text-[#9A793D]">
              Regulator Champions
            </p>

            <h1 className="mt-1 text-xl font-extrabold text-[#1C3B34] sm:text-2xl">
              Member Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/platform/educator"
              className="hidden min-h-11 items-center rounded-xl border border-[#D8D0C4] px-4 py-2 text-sm font-semibold text-[#1C3B34] transition hover:bg-[#F3EEE7] sm:flex"
            >
              Open Floor Deck
            </Link>

            <MemberSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-6 sm:py-10">
        {/* WELCOME */}
        <section className="border-b border-[#D8CFC2] pb-9">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <h2 className="max-w-4xl text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl lg:text-5xl">
                What is happening in your room today?
              </h2>

              <p className="mt-5 max-w-4xl text-xl leading-relaxed text-[#53645D]">
                You do not need to work through this hub from beginning to end. Start with the situation your team is trying to understand, use something practical, and come back to the recordings or support when you have more time.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setHubView('ladders')
                  }
                  className="min-h-13 rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white"
                >
                  Open Regulation Ladders
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setHubView('resources')
                  }
                  className="min-h-13 rounded-2xl border border-[#1C3B34] px-6 py-3 text-base font-semibold text-[#1C3B34]"
                >
                  Find a practical resource
                </button>
              </div>
            </div>

            <div className="border-l-0 border-[#D8CFC2] lg:border-l lg:pl-8">
              <p className="text-lg font-extrabold text-[#1C3B34]">
                A useful place to begin
              </p>

              <p className="mt-3 leading-relaxed text-[#53645D]">
                Notice what the child&apos;s body is doing, get curious about what may be making the moment harder, make one thoughtful adjustment, then notice what changes.
              </p>

              <Link
                href="/platform/manager"
                className="mt-5 inline-flex text-sm font-semibold text-[#657B6C] underline-offset-4 hover:underline"
              >
                Looking for manager and QIP tools?
              </Link>
            </div>
          </div>
        </section>

        {/* NAVIGATION */}
        <nav
          aria-label="Regulator Champions member hub"
          className="grid gap-2 border-b border-[#D8CFC2] pb-6 sm:grid-cols-2 lg:grid-cols-6"
        >
          {NAV_ITEMS.map((item) => (
            <HubButton
              key={item.value}
              active={
                hubView === item.value
              }
              title={item.title}
              description={
                item.description
              }
              onClick={() =>
                setHubView(item.value)
              }
            />
          ))}
        </nav>

        {/* REGULATION LADDERS */}
        {hubView === 'ladders' && (
          <div className="space-y-8">
            <SectionIntro
              title="Start with the situation that is hard right now."
              text="Choose the Regulation Ladder that sounds closest to what your team is seeing. The purpose is not to find the perfect answer. It is to slow the moment down enough to notice what may be happening and choose something worth trying."
            />

            <EmailBox
              value={userEmail}
              onChange={setUserEmail}
            />

            <section className="border-y border-[#D8CFC2] bg-white py-7 sm:px-7">
              <RegulationLadders
                userEmail={cleanedEmail}
              />
            </section>
          </div>
        )}

        {/* RESOURCES */}
        {hubView === 'resources' && (
          <div className="space-y-8">
            <SectionIntro
              title="Find something useful for the room today."
              text="These resources are here to be picked up and used. You do not need to complete anything first."
            />

            <section className="bg-white p-7 sm:p-9">
              <h2 className="text-3xl font-extrabold text-[#1C3B34]">
                Printable resources
              </h2>

              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                Print what is useful, keep it somewhere educators can actually reach it, and return to it when the same kind of situation happens again.
              </p>

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <a
                  href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-t border-[#D8CFC2] py-5 text-left"
                >
                  <strong className="text-lg text-[#1C3B34]">
                    Educator Regulation Cards
                  </strong>

                  <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                    Practical prompts educators can use in the room.
                  </p>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
                    )
                  }
                  disabled={
                    openingResource !== null
                  }
                  className="border-t border-[#D8CFC2] py-5 text-left disabled:opacity-50"
                >
                  <strong className="text-lg text-[#1C3B34]">
                    Manager Regulation Cards
                  </strong>

                  <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                    Prompts for thinking about routines, environment and team support.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
                    )
                  }
                  disabled={
                    openingResource !== null
                  }
                  className="border-t border-[#D8CFC2] py-5 text-left disabled:opacity-50"
                >
                  <strong className="text-lg text-[#1C3B34]">
                    Family Regulation Cards
                  </strong>

                  <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                    Related prompts that can support conversations with families.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Calm-Posters.pdf',
                    )
                  }
                  disabled={
                    openingResource !== null
                  }
                  className="border-t border-[#D8CFC2] py-5 text-left disabled:opacity-50"
                >
                  <strong className="text-lg text-[#1C3B34]">
                    CALM room posters
                  </strong>

                  <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                    A visual reminder for slowing down and thinking through difficult moments.
                  </p>
                </button>
              </div>

              {resourceError && (
                <div className="mt-5">
                  <ErrorBox>
                    {resourceError}
                  </ErrorBox>
                </div>
              )}
            </section>

            <section className="border-t border-[#D8CFC2] pt-7">
              <h2 className="text-2xl font-extrabold text-[#1C3B34]">
                Useful extras for leaders
              </h2>

              <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#53645D]">
                These are here when they are useful. They are not the reason educators need to use Regulator Champions.
              </p>

              <div className="mt-5 flex flex-wrap gap-5">
                <Link
                  href="/nqs-mapping"
                  className="font-semibold text-[#1C3B34] underline-offset-4 hover:underline"
                >
                  NQS and QIP mapping
                </Link>

                <Link
                  href="/platform/manager"
                  className="font-semibold text-[#1C3B34] underline-offset-4 hover:underline"
                >
                  Manager tools
                </Link>

                <Link
                  href="/playbooks"
                  className="font-semibold text-[#1C3B34] underline-offset-4 hover:underline"
                >
                  Action plans
                </Link>
              </div>
            </section>
          </div>
        )}

        {/* RECORDINGS */}
        {hubView ===
          'recordings' && (
          <div className="space-y-8">
            <SectionIntro
              title="Watch when your team has the time and headspace."
              text="Live attendance is optional. Recordings are here so educators can return to a topic during planning time, a team meeting or whenever floor coverage actually allows."
            />

            <section className="border-y border-[#D8CFC2] bg-white py-8 sm:px-7">
              <h2 className="text-3xl font-extrabold text-[#1C3B34]">
                Recording library
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                The first Regulator Champions live session has not run yet, so there are no recordings in the library at the moment. As sessions are held, each recording will be added here with the topic and a short explanation of what it may help your team think through.
              </p>

              <div className="mt-8 border-t border-[#D8CFC2]">
                <SimpleRow
                  title="Watch later"
                  text="There is no expectation that educators leave the floor to attend every session live."
                />

                <SimpleRow
                  title="Return when the issue appears again"
                  text="A recording can be revisited months later if the same kind of situation starts happening in another room."
                />

                <SimpleRow
                  title="Use the part you need"
                  text="Your team does not need to watch the recording library in order."
                />
              </div>
            </section>

            <section className="border-t border-[#D8CFC2] pt-7">
              <p className="text-base font-semibold text-[#9A793D]">
                First discussion topic
              </p>

              <h2 className="mt-2 text-3xl font-extrabold text-[#1C3B34]">
                Notice Before We React
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#53645D]">
                The first discussion will look at what happens in a child&apos;s body before we decide what their behaviour means. Once the session has run, the recording can be added here.
              </p>

              <button
                type="button"
                onClick={() =>
                  setHubView('support')
                }
                className="mt-6 text-base font-semibold text-[#1C3B34] underline-offset-4 hover:underline"
              >
                See live session information
              </button>
            </section>
          </div>
        )}

        {/* SUPPORT */}
        {hubView === 'support' && (
          <div className="space-y-10">
            <SectionIntro
              title="Come back when the first idea does not quite fit."
              text="You can submit a de-identified situation for Robyn to consider, join the live discussion when that is useful, or wait for the recording. This is support for shared learning and reflection rather than individual clinical advice about a named child."
            />

            {/* CURRENT FOCUS */}
            <section className="grid gap-8 border-y border-[#D8CFC2] bg-white py-8 sm:px-7 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-base font-semibold text-[#9A793D]">
                  September focus
                </p>

                <h2 className="mt-2 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
                  Notice Before We React
                </h2>

                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-[#53645D]">
                  Before trying to stop a behaviour, spend a moment noticing what is changing in the child&apos;s movement, voice, posture, processing and response to the environment.
                </p>

                <div className="mt-6 border-l-4 border-[#C29F60] pl-5">
                  <p className="text-lg font-semibold leading-relaxed text-[#1C3B34]">
                    You do not need to solve everything. Notice first.
                  </p>
                </div>
              </div>

              <div className="border-t border-[#D8CFC2] pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                <h3 className="text-xl font-extrabold text-[#1C3B34]">
                  What Is the Child&apos;s Body Telling Me?
                </h3>

                <p className="mt-3 leading-relaxed text-[#53645D]">
                  A simple two-page noticing checklist you can use before behaviour becomes the whole story.
                </p>

                <a
                  href="/pdf/What-Is-the-Childs-Body-Telling-Me.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex font-semibold text-[#1C3B34] underline-offset-4 hover:underline"
                >
                  Open the checklist
                </a>
              </div>
            </section>

            {/* LIVE SESSION */}
            <section>
              <h2 className="text-3xl font-extrabold text-[#1C3B34]">
                Live session timing
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                The first session date is being chosen with participating services. If live attendance is useful for your team, choose the days and times that could realistically work. If it is not, choosing “Recording afterwards” is completely fine.
              </p>

              {voteStatus ===
              'success' ? (
                <SuccessBox
                  title="Thank you. Your preferences are in."
                  text="I’ll compare the responses across participating teams before confirming the September session."
                  buttonLabel="Submit another response"
                  onClick={() => {
                    setVoteStatus(
                      'idle',
                    );
                    setPreferredDays(
                      [],
                    );
                    setPreferredTimes(
                      [],
                    );
                    setOtherTime('');
                    setAttendancePreference(
                      '',
                    );
                  }}
                />
              ) : (
                <form
                  onSubmit={
                    handleVoteSubmit
                  }
                  className="mt-7 max-w-4xl space-y-8 border-t border-[#D8CFC2] pt-7"
                >
                  <FormGroup
                    label="Which days could work?"
                    helper="Choose as many as you like."
                  >
                    <div className="grid gap-3 sm:grid-cols-3">
                      {SESSION_DAY_OPTIONS.map(
                        (day) => (
                          <SelectionButton
                            key={day}
                            active={preferredDays.includes(
                              day,
                            )}
                            label={day}
                            onClick={() =>
                              toggleDay(
                                day,
                              )
                            }
                          />
                        ),
                      )}
                    </div>
                  </FormGroup>

                  <FormGroup
                    label="Which times could work?"
                    helper="Choose as many as you like."
                  >
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {SESSION_TIME_OPTIONS.map(
                        (time) => (
                          <SelectionButton
                            key={time}
                            active={preferredTimes.includes(
                              time,
                            )}
                            label={time}
                            onClick={() =>
                              toggleTime(
                                time,
                              )
                            }
                          />
                        ),
                      )}
                    </div>

                    {preferredTimes.includes(
                      'Other',
                    ) && (
                      <input
                        type="text"
                        value={otherTime}
                        onChange={(
                          event,
                        ) =>
                          setOtherTime(
                            event.target
                              .value,
                          )
                        }
                        placeholder="Tell me another time that works"
                        className="mt-4 min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base text-[#1C3B34] outline-none focus:border-[#657B6C]"
                      />
                    )}
                  </FormGroup>

                  <FormGroup label="How would you usually use the session?">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {ATTENDANCE_OPTIONS.map(
                        (option) => (
                          <SelectionButton
                            key={option}
                            active={
                              attendancePreference ===
                              option
                            }
                            label={option}
                            onClick={() =>
                              setAttendancePreference(
                                option,
                              )
                            }
                          />
                        ),
                      )}
                    </div>
                  </FormGroup>

                  <FormField
                    label="Your first name"
                    required
                  >
                    <input
                      type="text"
                      required
                      value={
                        voteFirstName
                      }
                      onChange={(
                        event,
                      ) =>
                        setVoteFirstName(
                          event.target
                            .value,
                        )
                      }
                      className="min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  {voteStatus ===
                    'error' && (
                    <ErrorBox>
                      {voteMessage}
                    </ErrorBox>
                  )}

                  <button
                    type="submit"
                    disabled={
                      voteStatus ===
                      'submitting'
                    }
                    className="min-h-14 rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#284E45] disabled:opacity-60"
                  >
                    {voteStatus ===
                    'submitting'
                      ? 'Sending…'
                      : 'Submit my preferences'}
                  </button>
                </form>
              )}
            </section>

            {/* ASK ROBYN */}
            <section className="border-t border-[#D8CFC2] pt-9">
              <h2 className="text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
                Stuck on something happening in your room?
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                Send through the broad situation and what your team is noticing. These questions can help Robyn understand what participating services are getting stuck on and shape future discussions, recordings and resources.
              </p>

              <div className="mt-6 border-l-4 border-[#C29F60] pl-5">
                <p className="font-extrabold text-[#1C3B34]">
                  Keep children and families de-identified.
                </p>

                <p className="mt-2 max-w-3xl leading-relaxed text-[#53645D]">
                  Do not include children&apos;s names, dates of birth, family names or other identifying information.
                </p>
              </div>

              {questionStatus ===
              'success' ? (
                <SuccessBox
                  title="Thank you. I’ve got it."
                  text="Your question can help shape an upcoming Regulator Champions conversation. Any discussion will remain de-identified."
                  buttonLabel="Ask another question"
                  onClick={() =>
                    setQuestionStatus(
                      'idle',
                    )
                  }
                />
              ) : (
                <form
                  onSubmit={
                    handleQuestionSubmit
                  }
                  className="mt-8 max-w-4xl space-y-6"
                >
                  <FormField
                    label="What are you noticing?"
                    required
                  >
                    <textarea
                      required
                      rows={6}
                      value={
                        whatNoticing
                      }
                      onChange={(
                        event,
                      ) =>
                        setWhatNoticing(
                          event.target
                            .value,
                        )
                      }
                      placeholder="Describe the broad situation or pattern you are noticing..."
                      className="w-full resize-y rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  <FormField
                    label="What have you already tried?"
                    helper="Optional"
                  >
                    <textarea
                      rows={4}
                      value={whatTried}
                      onChange={(
                        event,
                      ) =>
                        setWhatTried(
                          event.target
                            .value,
                        )
                      }
                      placeholder="What has your team tried so far?"
                      className="w-full resize-y rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  <FormField
                    label="What would you like help understanding?"
                    helper="Optional"
                  >
                    <textarea
                      rows={4}
                      value={
                        whatHelpUnderstanding
                      }
                      onChange={(
                        event,
                      ) =>
                        setWhatHelpUnderstanding(
                          event.target
                            .value,
                        )
                      }
                      placeholder="What feels confusing or what would you like unpacked?"
                      className="w-full resize-y rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  <FormField
                    label="Your first name"
                    required
                  >
                    <input
                      type="text"
                      required
                      value={
                        questionFirstName
                      }
                      onChange={(
                        event,
                      ) =>
                        setQuestionFirstName(
                          event.target
                            .value,
                        )
                      }
                      className="min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  {questionStatus ===
                    'error' && (
                    <ErrorBox>
                      {
                        questionMessage
                      }
                    </ErrorBox>
                  )}

                  <button
                    type="submit"
                    disabled={
                      questionStatus ===
                      'submitting'
                    }
                    className="min-h-14 rounded-2xl bg-[#657B6C] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#53665A] disabled:opacity-60"
                  >
                    {questionStatus ===
                    'submitting'
                      ? 'Sending…'
                      : 'Send my question to Robyn'}
                  </button>
                </form>
              )}
            </section>
          </div>
        )}

        {/* FAMILY BRIDGE */}
        {hubView === 'family' && (
          <div className="space-y-8">
            <SectionIntro
              title="Use families as another source of information, not another group to instruct."
              text="These prompts are designed to make it easier to explain what your team is noticing and invite families to tell you what they see in other parts of the child’s life."
            />

            <section className="grid gap-x-8 gap-y-10 md:grid-cols-2">
              {FAMILY_BRIDGE_CARDS.map(
                (card) => (
                  <article
                    key={card.title}
                    className="border-t border-[#D8CFC2] pt-6"
                  >
                    <p className="text-sm font-semibold text-[#9A793D]">
                      {card.category}
                    </p>

                    <h3 className="mt-2 text-2xl font-extrabold text-[#1C3B34]">
                      {card.title}
                    </h3>

                    <div className="mt-5">
                      <p className="text-sm font-semibold text-[#657B6C]">
                        Something you could say
                      </p>

                      <p className="mt-2 text-lg leading-relaxed text-[#2B3833]">
                        {
                          card.educatorMessage
                        }
                      </p>
                    </div>

                    <div className="mt-5 border-l-4 border-[#C29F60] pl-5">
                      <p className="text-sm font-semibold text-[#657B6C]">
                        Something you could ask
                      </p>

                      <p className="mt-2 text-lg leading-relaxed text-[#53645D]">
                        {
                          card.familyQuestion
                        }
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        void copyFamilyCard(
                          card,
                        )
                      }
                      className="mt-6 text-base font-semibold text-[#1C3B34] underline-offset-4 hover:underline"
                    >
                      {copiedCard ===
                      card.title
                        ? 'Message copied'
                        : 'Copy family message'}
                    </button>
                  </article>
                ),
              )}
            </section>

            <section className="border-t border-[#D8CFC2] pt-7">
              <h3 className="text-2xl font-extrabold text-[#1C3B34]">
                These are conversation starters, not instructions for families.
              </h3>

              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                Families know their child in contexts educators do not see. Their responses may help your team notice patterns, preferences, strengths and things that already work outside the service.
              </p>
            </section>
          </div>
        )}

        {/* REFLECTIONS */}
        {hubView ===
          'reflections' && (
          <div className="space-y-8">
            <SectionIntro
              title="Keep a record if reflection is useful for you."
              text="This area is optional. You can use Regulator Champions without tracking progress or completing a recognition pathway."
            />

            <div className="border-l-4 border-[#C29F60] pl-6">
              <h2 className="text-2xl font-extrabold text-[#1C3B34]">
                Want formal recognition later?
              </h2>

              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                Educators who choose to complete the fuller recognition pathway can use their saved reflections and practical work as part of that process. Nothing in this section needs to be completed before you can use the Regulation Ladders, recordings or resources.
              </p>
            </div>

            <EmailBox
              value={userEmail}
              onChange={setUserEmail}
              reflectionMode
            />

            <section className="border-y border-[#D8CFC2] bg-white py-7 sm:px-7">
              <ProgressSummary
                userEmail={cleanedEmail}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  );
}

function HubButton({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-l-2 px-4 py-3 text-left transition ${
        active
          ? 'border-[#1C3B34] bg-[#F0ECE5]'
          : 'border-transparent hover:bg-white'
      }`}
    >
      <span className="block text-base font-extrabold text-[#1C3B34]">
        {title}
      </span>

      <span className="mt-1 block text-sm leading-relaxed text-[#65736D]">
        {description}
      </span>
    </button>
  );
}

function SelectionButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`min-h-14 rounded-2xl border-2 px-5 py-4 text-left text-base font-semibold transition ${
        active
          ? 'border-[#1C3B34] bg-[#1C3B34] text-white'
          : 'border-[#E5DED4] bg-white text-[#1C3B34] hover:border-[#657B6C]'
      }`}
    >
      {label}
    </button>
  );
}

function FormGroup({
  label,
  helper,
  children,
}: {
  label: string;
  helper?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="text-lg font-extrabold text-[#1C3B34]">
        {label}
      </legend>

      {helper && (
        <p className="mb-4 mt-1 text-base text-[#65736D]">
          {helper}
        </p>
      )}

      {!helper && (
        <div className="h-4" />
      )}

      {children}
    </fieldset>
  );
}

function FormField({
  label,
  helper,
  required = false,
  children,
}: {
  label: string;
  helper?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-3 flex flex-wrap items-center gap-2 text-lg font-extrabold text-[#1C3B34]">
        {label}

        {required && (
          <span className="text-[#9A793D]">
            *
          </span>
        )}

        {helper && (
          <span className="text-base font-normal text-[#65736D]">
            {helper}
          </span>
        )}
      </span>

      {children}
    </label>
  );
}

function SectionIntro({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="max-w-5xl">
      <h2 className="text-3xl font-extrabold leading-tight text-[#1C3B34] sm:text-4xl">
        {title}
      </h2>

      <p className="mt-5 text-xl leading-relaxed text-[#53645D]">
        {text}
      </p>
    </section>
  );
}

function EmailBox({
  value,
  onChange,
  reflectionMode = false,
}: {
  value: string;
  onChange: (value: string) => void;
  reflectionMode?: boolean;
}) {
  return (
    <section className="max-w-2xl border-t border-[#D8CFC2] pt-6">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        Your work email
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
        {reflectionMode
          ? 'Enter your work email if you want to see reflections and activity saved against your profile.'
          : 'Some member tools use your work email to match saved notes and reflections to you.'}
      </p>

      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value,
          )
        }
        placeholder="educator@service.com.au"
        className="mt-5 min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base font-medium text-[#1C3B34] outline-none focus:border-[#657B6C]"
      />
    </section>
  );
}

function SimpleRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-[#D8CFC2] py-5">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function SuccessBox({
  title,
  text,
  buttonLabel,
  onClick,
}: {
  title: string;
  text: string;
  buttonLabel: string;
  onClick: () => void;
}) {
  return (
    <div
      role="status"
      className="mt-8 border-l-4 border-[#7EA18F] bg-[#F0F7F3] p-6"
    >
      <h3 className="text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#53645D]">
        {text}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 text-base font-semibold text-[#657B6C] underline-offset-4 hover:underline"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

function ErrorBox({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p
      role="alert"
      className="border-l-4 border-rose-300 bg-rose-50 p-5 text-base font-semibold leading-relaxed text-rose-800"
    >
      {children}
    </p>
  );
}