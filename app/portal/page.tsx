'use client';

import React, {
  FormEvent,
  useState,
} from 'react';
import Link from 'next/link';

import MemberSignOutButton from '@/components/MemberSignOutButton';
import ProgressSummary from '@/components/feed/ProgressSummary';
import RegulationLadders from '@/components/feed/RegulationLadders';

type HubView =
  | 'monthly'
  | 'resources'
  | 'ladders'
  | 'family'
  | 'progress';

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

const MONTHLY_SESSIONS = [
  {
    month: 'September',
    date: 'Date being chosen by our founding Regulator Champion teams',
    time: '',
    topic: 'Notice Before We React',
  },
];

const FAMILY_BRIDGE_CARDS: FamilyBridgeCard[] = [
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
    title: 'Prepare before changing activities',
    educatorMessage:
      'We are giving your child an early warning before transitions so their body has time to adjust.',
    familyQuestion:
      'What helps when your child needs to stop one activity and move to another at home?',
  },
  {
    category: 'Participation',
    title: 'Joining does not always mean sitting',
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
    title: 'Connect before adding demands',
    educatorMessage:
      'When things feel hard today, we are slowing down and reconnecting before giving another instruction.',
    familyQuestion:
      'What usually helps your child reconnect with you when they are upset or overwhelmed?',
  },
  {
    category: 'Movement',
    title: 'Movement can help participation',
    educatorMessage:
      'We are offering purposeful movement before expecting longer periods of sitting, listening or waiting.',
    familyQuestion:
      'Does your child naturally seek movement before quieter activities at home?',
  },
  {
    category: 'End of day',
    title: 'Expect less when capacity is low',
    educatorMessage:
      'Late in the day we are reducing unnecessary demands when children are showing us they are tired.',
    familyQuestion:
      'What do you notice in your child when they have reached the end of their capacity?',
  },
];

export default function MemberPortalPage() {
  const [userEmail, setUserEmail] =
    useState('');

  const [hubView, setHubView] =
    useState<HubView>('monthly');

  const [
    openingResource,
    setOpeningResource,
  ] = useState<string | null>(null);

  const [
    resourceError,
    setResourceError,
  ] = useState('');

  const [copiedCard, setCopiedCard] =
    useState<string | null>(null);

  /*
   * MONTHLY QUESTION FORM
   */

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
  ] = useState<SubmissionStatus>('idle');

  const [
    questionMessage,
    setQuestionMessage,
  ] = useState('');

  /*
   * SESSION VOTING FORM
   */

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
  ] = useState<SubmissionStatus>('idle');

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

      setQuestionStatus(
        'submitting',
      );

      try {
        const response = await fetch(
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

      if (!attendancePreference) {
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
        const response = await fetch(
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
        const response = await fetch(
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
      const copyText = `${card.educatorMessage}

A question for you:
${card.familyQuestion}`;

      try {
        await navigator.clipboard.writeText(
          copyText,
        );

        setCopiedCard(card.title);

        window.setTimeout(() => {
          setCopiedCard((current) =>
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
    <div className="min-h-screen bg-[#FAF8F5] pb-20 font-sans text-[#1C3B34]">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b-2 border-[#E6E2DC] bg-white px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <div>
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#C29F60]">
              Regulator Champions
            </span>

            <h1 className="text-base font-bold text-[#1C3B34] md:text-lg">
              Service Practice Hub
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/platform/educator"
              className="hidden min-h-12 items-center rounded-xl bg-[#657B6C] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#53665A] sm:flex"
            >
              Floor Deck
            </Link>

            <MemberSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-8 px-4 py-6">
        {/* WELCOME */}
        <section className="rounded-4xl border-2 border-[#1C3B34] bg-[#1C3B34] p-6 text-white shadow-sm md:p-8">
          <div className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <span className="inline-block rounded-full bg-[#C29F60] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#1C3B34]">
                Your Regulator Champions Space
              </span>

              <h2 className="mt-4 max-w-2xl text-2xl font-bold leading-tight text-white md:text-4xl">
                Notice. Ask. Try. Come
                back and talk about what
                happened.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 md:text-base">
                Regulator Champions is
                designed to stay connected
                to the real moments
                happening in your rooms.
                Use this space throughout
                the month, not just when
                you are completing
                training.
              </p>
            </div>

            <Link
              href="/platform/manager"
              className="flex min-h-12 items-center rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/20"
            >
              Manager QIP Dashboard
            </Link>
          </div>
        </section>

        {/* MAIN NAVIGATION */}
        <nav
          aria-label="Regulator Champions member hub"
          className="grid grid-cols-2 gap-3 text-sm font-bold md:grid-cols-3 lg:grid-cols-5"
        >
          <HubButton
            active={
              hubView === 'monthly'
            }
            label="Monthly Hub"
            onClick={() =>
              setHubView('monthly')
            }
          />

          <HubButton
            active={
              hubView === 'resources'
            }
            label="Resources"
            onClick={() =>
              setHubView('resources')
            }
          />

          <HubButton
            active={
              hubView === 'ladders'
            }
            label="Regulation Ladders"
            onClick={() =>
              setHubView('ladders')
            }
          />

          <HubButton
            active={
              hubView === 'family'
            }
            label="Family Bridge"
            onClick={() =>
              setHubView('family')
            }
          />

          <HubButton
            active={
              hubView === 'progress'
            }
            label="My Progress"
            onClick={() =>
              setHubView('progress')
            }
          />
        </nav>

        {/* MONTHLY HUB */}
        {hubView === 'monthly' && (
          <div className="space-y-8">
            {/* MONTH INTRO */}
            <section className="overflow-hidden rounded-4xl border-2 border-[#E6E2DC] bg-white shadow-sm">
              <div className="bg-[#FAF5EC] p-6 md:p-8">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#9A793D]">
                  September in
                  Regulator Champions
                </span>

                <h2 className="mt-3 text-3xl font-bold leading-tight text-[#1C3B34] md:text-4xl">
                  Notice Before We React
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#53645D]">
                  This month we are
                  practising one thing:
                  noticing the
                  child&apos;s body before
                  deciding what the
                  behaviour means.
                </p>
              </div>

              <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
                <div className="p-6 md:p-8">
                  <span className="text-xs font-black uppercase tracking-widest text-[#657B6C]">
                    Try it in your room
                    this month
                  </span>

                  <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                    Choose one child or
                    one recurring part of
                    the day where things
                    tend to become
                    difficult. Instead of
                    immediately changing
                    the behaviour, spend
                    some time noticing
                    what changes in the
                    child&apos;s body
                    first.
                  </p>

                  <div className="mt-5 space-y-2 border-l-4 border-[#C29F60] pl-5 text-sm font-semibold leading-relaxed text-[#1C3B34]">
                    <p>
                      What happens to their
                      movement?
                    </p>

                    <p>
                      Their voice?
                    </p>

                    <p>
                      Their posture?
                    </p>

                    <p>
                      Their ability to
                      process your words?
                    </p>

                    <p>
                      What happened
                      immediately
                      beforehand?
                    </p>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-[#53645D]">
                    You do not need to
                    solve everything.
                  </p>

                  <p className="mt-2 font-bold text-[#1C3B34]">
                    Notice first. Bring
                    your questions with
                    you. We will build
                    from there.
                  </p>
                </div>

                <div className="flex flex-col justify-center bg-[#1C3B34] p-6 text-white md:p-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#E4C98E]">
                    This month&apos;s
                    practical resource
                  </span>

                  <h3 className="mt-3 text-2xl font-bold leading-tight text-white">
                    What Is the
                    Child&apos;s Body
                    Telling Me?
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    A two-page noticing
                    checklist for
                    educators to use
                    before behaviour
                    becomes the whole
                    story.
                  </p>

                  <a
                    href="/pdf/What-Is-the-Childs-Body-Telling-Me.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-5 py-3 text-center text-sm font-bold text-[#1C3B34] transition hover:bg-[#D1B477]"
                  >
                    Open the Two-Page
                    Checklist
                  </a>

                </div>
              </div>
            </section>

            {/* MONTHLY SCHEDULE */}
            <section className="rounded-4xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#C29F60]">
                  Monthly Sessions
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#1C3B34] md:text-3xl">
                  What&apos;s coming up
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-[#6A7873]">
                  Your live session date
                  will appear here as
                  soon as this
                  month&apos;s voting is
                  complete.
                </p>
              </div>

              <div className="mt-6 space-y-3">
                {MONTHLY_SESSIONS.map(
                  (session) => (
                    <article
                      key={`${session.month}-${session.topic}`}
                      className="grid gap-4 rounded-3xl border-2 border-[#E6E2DC] bg-[#FAF8F5] p-5 md:grid-cols-[150px_1fr] md:p-6"
                    >
                      <div>
                        <span className="text-xs font-black uppercase tracking-widest text-[#9A793D]">
                          {session.month}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-[#1C3B34]">
                          {
                            session.topic
                          }
                        </h3>

                        <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                          {session.date}
                          {session.time
                            ? ` · ${session.time}`
                            : ''}
                        </p>
                      </div>
                    </article>
                  ),
                )}
              </div>
            </section>

            {/* VOTING */}
            <section className="rounded-4xl border-2 border-[#C29F60]/60 bg-[#FAF5EC] p-6 shadow-sm md:p-8">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#9A793D]">
                  September Schedule
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#1C3B34] md:text-3xl">
                  Help Us Choose Our First
                  Monthly Session
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                  Our first Regulator
                  Champions monthly
                  session will be held
                  towards the end of
                  September.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  Rather than choosing a
                  time that suits me and
                  hoping educators can
                  attend, I would like our
                  first Regulator
                  Champion teams to help
                  shape the schedule.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  Tell me which days and
                  times are most
                  realistic for your
                  team. I will look at
                  the responses at the
                  end of this week and
                  choose the option that
                  works for the greatest
                  number of educators.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  The confirmed September
                  date and our ongoing
                  monthly schedule will
                  then appear here.
                </p>
              </div>

              {voteStatus ===
              'success' ? (
                <div
                  role="status"
                  className="mt-7 rounded-3xl border-2 border-[#A8C5B7] bg-white p-6"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E7F1EC] font-black text-[#1C3B34]">
                    ✓
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#1C3B34]">
                    Thank you.
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#53645D]">
                    Your preferences have
                    been received. I will
                    compare responses
                    across our founding
                    Regulator Champion
                    teams before
                    confirming the
                    September session.
                  </p>

                  <button
                    type="button"
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
                    className="mt-5 text-sm font-bold text-[#657B6C] underline-offset-4 hover:underline"
                  >
                    Submit another
                    response
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={
                    handleVoteSubmit
                  }
                  className="mt-7 space-y-7"
                >
                  <FormGroup
                    label="Which days could work for your team?"
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
                              toggleDay(day)
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
                        value={
                          otherTime
                        }
                        onChange={(
                          event,
                        ) =>
                          setOtherTime(
                            event
                              .target
                              .value,
                          )
                        }
                        placeholder="Tell me another time that usually works"
                        className="mt-3 min-h-12 w-full rounded-2xl border-2 border-[#E6E2DC] bg-white px-4 py-3 text-sm text-[#1C3B34] outline-none focus:border-[#657B6C]"
                      />
                    )}
                  </FormGroup>

                  <FormGroup label="How would you usually attend?">
                    <div className="grid gap-3 md:grid-cols-2">
                      {ATTENDANCE_OPTIONS.map(
                        (option) => (
                          <SelectionButton
                            key={option}
                            active={
                              attendancePreference ===
                              option
                            }
                            label={
                              option
                            }
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

                  <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
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
                            event
                              .target
                              .value,
                          )
                        }
                        className="min-h-12 w-full rounded-2xl border-2 border-[#E6E2DC] bg-white px-4 py-3 text-sm text-[#1C3B34] outline-none focus:border-[#657B6C]"
                      />
                    </FormField>

                    <div className="rounded-2xl border border-[#D9D2C8] bg-white/70 p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#9A793D]">
                        Your service
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                        Your response will automatically be matched to the service connected to your Regulator Champions access code.
                      </p>
                    </div>
                  </div>

                  {voteStatus ===
                    'error' && (
                    <p
                      role="alert"
                      className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold leading-relaxed text-rose-800"
                    >
                      {voteMessage}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      voteStatus ===
                      'submitting'
                    }
                    className="min-h-12 rounded-2xl bg-[#1C3B34] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#284E45] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {voteStatus ===
                    'submitting'
                      ? 'Sending preferences…'
                      : 'Submit My Preferences'}
                  </button>
                </form>
              )}
            </section>

            {/* ASK A QUESTION */}
            <section className="rounded-4xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
              <div className="max-w-3xl">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#657B6C]">
                  Ask Robyn
                </span>

                <h2 className="mt-2 text-2xl font-bold text-[#1C3B34] md:text-3xl">
                  What are you noticing in
                  your room?
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-[#53645D]">
                  Regulator Champions is
                  designed to grow from
                  the real moments
                  happening in early
                  childhood settings, so
                  throughout the month I
                  would love you to send
                  through the situations
                  you are finding
                  difficult, confusing or
                  interesting.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  Maybe a child is
                  suddenly hiding during
                  transitions. Maybe rough
                  play is increasing.
                  Maybe your team is
                  unsure when to step in,
                  when to wait, or why a
                  strategy that usually
                  works has stopped
                  working.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[#53645D]">
                  Send your question below
                  and I will use the
                  themes coming through
                  from Regulator Champion
                  teams to shape our next
                  monthly session.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#C29F60]/60 bg-[#FAF5EC] p-5">
                <strong className="block text-sm text-[#1C3B34]">
                  Keep children and
                  families de-identified.
                </strong>

                <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                  Please do not include
                  children&apos;s names,
                  dates of birth, family
                  names or other
                  identifying
                  information.
                </p>
              </div>

              {questionStatus ===
              'success' ? (
                <div
                  role="status"
                  className="mt-7 rounded-3xl border-2 border-[#A8C5B7] bg-[#F0F7F3] p-6 md:p-7"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white font-black text-[#1C3B34]">
                    ✓
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#1C3B34]">
                    Thank you. I&apos;ve
                    got it.
                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#53645D]">
                    Your question will
                    help shape an
                    upcoming Regulator
                    Champions
                    conversation.
                    Questions may be
                    discussed in a
                    de-identified way so
                    we can all learn from
                    the patterns showing
                    up across our rooms.
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      setQuestionStatus(
                        'idle',
                      )
                    }
                    className="mt-5 text-sm font-bold text-[#657B6C] underline-offset-4 hover:underline"
                  >
                    Ask another question
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={
                    handleQuestionSubmit
                  }
                  className="mt-7 space-y-5"
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
                      className="w-full resize-y rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-sm leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
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
                      className="w-full resize-y rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-sm leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
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
                      placeholder="What feels confusing or what would you like us to unpack together?"
                      className="w-full resize-y rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-sm leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  <div className="grid gap-4 sm:grid-cols-[1fr_1.2fr]">
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
                            event
                              .target
                              .value,
                          )
                        }
                        className="min-h-12 w-full rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3 text-sm text-[#1C3B34] outline-none focus:border-[#657B6C]"
                      />
                    </FormField>

                    <div className="rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-[#9A793D]">
                        Your service
                      </p>

                      <p className="mt-2 text-sm leading-relaxed text-[#53645D]">
                        Your question will automatically be matched to the service connected to your Regulator Champions access code.
                      </p>
                    </div>
                  </div>

                  {questionStatus ===
                    'error' && (
                    <p
                      role="alert"
                      className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold leading-relaxed text-rose-800"
                    >
                      {
                        questionMessage
                      }
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={
                      questionStatus ===
                      'submitting'
                    }
                    className="min-h-12 rounded-2xl bg-[#657B6C] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#53665A] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {questionStatus ===
                    'submitting'
                      ? 'Sending your question…'
                      : 'Submit my question'}
                  </button>
                </form>
              )}
            </section>
          </div>
        )}

        {/* MEMBER RESOURCES */}
        {hubView === 'resources' && (
          <div className="space-y-6">
            {/* EMAIL MATCHING */}
            <section className="space-y-3 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
              <div>
                <h3 className="text-base font-bold text-[#1C3B34]">
                  Work email for
                  reflection matching
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-[#6A7873]">
                  Enter your work email
                  to match saved ladder
                  progress and QIP
                  reflection notes.
                </p>
              </div>

              <input
                id="practice-email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={userEmail}
                onChange={(event) =>
                  setUserEmail(
                    event.target.value,
                  )
                }
                placeholder="educator@service.com.au"
                className="min-h-12 w-full rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-sm font-medium text-[#1C3B34] outline-none focus:border-[#657B6C]"
              />
            </section>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
                <div>
                  <span className="block text-xs font-black uppercase text-[#C29F60]">
                    Ladder 1 Foundation
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                    Morning Action Plans
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                    Prompts for arrivals,
                    drop-off handovers and
                    transition setups.
                  </p>
                </div>

                <Link
                  href="/playbooks"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#657B6C] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#53665A]"
                >
                  Open Action Plans
                </Link>
              </div>

              <div className="flex flex-col justify-between space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
                <div>
                  <span className="block text-xs font-black uppercase text-[#657B6C]">
                    Ladder 2 Learning
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                    EASE Model Practices
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                    Reduce sensory load
                    and respond earlier
                    when pressure is
                    building.
                  </p>
                </div>

                <Link
                  href="/month-2-ease"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#657B6C] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#53665A]"
                >
                  Open EASE Model
                </Link>
              </div>

              <div className="flex flex-col justify-between space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
                <div>
                  <span className="block text-xs font-black uppercase text-[#1C3B34]">
                    Practice Leadership
                  </span>

                  <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                    NQS &amp; QIP Matrix
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#6A7873]">
                    Connect professional
                    learning and floor
                    practice with NQS
                    elements and QIP
                    evidence.
                  </p>
                </div>

                <Link
                  href="/nqs-mapping"
                  className="flex min-h-12 items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-center text-xs font-bold text-white transition hover:bg-[#284E45]"
                >
                  Open NQS Matrix
                </Link>
              </div>
            </div>

            {/* PRINTABLE VAULT */}
            <div className="space-y-4 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
              <div>
                <span className="mb-1 block text-xs font-black uppercase text-[#C29F60]">
                  Printable Vault
                </span>

                <h3 className="text-xl font-bold text-[#1C3B34]">
                  Room posters and
                  strategy card downloads
                </h3>

                <p className="mt-1 text-xs leading-relaxed text-[#6A7873]">
                  Open print-ready
                  resources for educator
                  rooms, leadership
                  conversations and
                  family continuity.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                <a
                  href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#1C3B34] px-4 py-3.5 text-center text-xs font-bold text-white transition hover:bg-[#284E45]"
                >
                  Educator Routine Cards
                </a>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Calm-Posters.pdf',
                    )
                  }
                  disabled={
                    openingResource !==
                    null
                  }
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#C29F60] px-4 py-3.5 text-center text-xs font-bold text-[#1C3B34] transition hover:bg-[#D1B477] disabled:opacity-50"
                >
                  {openingResource ===
                  'Calm-Posters.pdf'
                    ? 'Opening…'
                    : 'CALM Room Posters'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Managers.pdf',
                    )
                  }
                  disabled={
                    openingResource !==
                    null
                  }
                  className="flex min-h-12 items-center justify-center rounded-2xl bg-[#657B6C] px-4 py-3.5 text-center text-xs font-bold text-white transition hover:bg-[#53665A] disabled:opacity-50"
                >
                  {openingResource ===
                  'Morning-Routine-Ladder-Printable-Cards-Managers.pdf'
                    ? 'Opening…'
                    : 'Manager Strategy Cards'}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    void openMemberResource(
                      'Morning-Routine-Ladder-Printable-Cards-Parents.pdf',
                    )
                  }
                  disabled={
                    openingResource !==
                    null
                  }
                  className="flex min-h-12 items-center justify-center rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-center text-xs font-bold text-[#1C3B34] transition hover:border-[#657B6C] disabled:opacity-50"
                >
                  {openingResource ===
                  'Morning-Routine-Ladder-Printable-Cards-Parents.pdf'
                    ? 'Opening…'
                    : 'Family Handover Cards'}
                </button>
              </div>

              {resourceError && (
                <p className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-bold text-rose-700">
                  {resourceError}
                </p>
              )}
            </div>
          </div>
        )}

        {/* REGULATION LADDERS */}
        {hubView === 'ladders' && (
          <div className="space-y-5">
            <section className="space-y-3 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1C3B34]">
                Work email for saved
                progress
              </h3>

              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={userEmail}
                onChange={(event) =>
                  setUserEmail(
                    event.target.value,
                  )
                }
                placeholder="educator@service.com.au"
                className="min-h-12 w-full rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-sm font-medium text-[#1C3B34] outline-none focus:border-[#657B6C]"
              />
            </section>

            <div className="rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
              <RegulationLadders
                userEmail={
                  cleanedEmail
                }
              />
            </div>
          </div>
        )}

        {/* FAMILY BRIDGE */}
        {hubView === 'family' && (
          <div className="space-y-6">
            <section className="rounded-3xl bg-[#1C3B34] p-6 text-white md:p-8">
              <span className="text-xs font-black uppercase tracking-widest text-[#E4C98E]">
                Family Bridge
              </span>

              <h2 className="mt-2 text-2xl font-bold md:text-3xl">
                Keep the message short.
                Keep the conversation
                two-way.
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#D8E1DC]">
                Choose a message that
                reflects what educators
                are practising today.
                Copy it into your usual
                family communication
                platform, then invite the
                family to share what they
                notice too.
              </p>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="block text-[10px] font-black uppercase tracking-widest text-[#E4C98E]">
                  NQS practice connection
                </span>

                <p className="mt-1 text-xs leading-relaxed text-[#D8E1DC]">
                  Supports Quality Area 6
                  by strengthening
                  respectful, two-way
                  communication and
                  inviting families to
                  contribute knowledge
                  about their child.
                </p>
              </div>
            </section>

            <section className="grid gap-4 md:grid-cols-2">
              {FAMILY_BRIDGE_CARDS.map(
                (card) => (
                  <article
                    key={card.title}
                    className="flex flex-col justify-between rounded-3xl border-2 border-[#E6E2DC] bg-white p-5 shadow-sm"
                  >
                    <div>
                      <span className="inline-flex rounded-full bg-[#FAF5EC] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#9A793D]">
                        {card.category}
                      </span>

                      <h3 className="mt-3 text-lg font-bold text-[#1C3B34]">
                        {card.title}
                      </h3>

                      <div className="mt-4 rounded-2xl bg-[#FAF8F5] p-4">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#657B6C]">
                          Share with the
                          family
                        </span>

                        <p className="mt-2 text-sm font-medium leading-relaxed text-[#2B3833]">
                          {
                            card.educatorMessage
                          }
                        </p>
                      </div>

                      <div className="mt-3 border-l-4 border-[#C29F60] pl-4">
                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#657B6C]">
                          Invite their
                          knowledge
                        </span>

                        <p className="mt-1 text-sm leading-relaxed text-[#53645D]">
                          {
                            card.familyQuestion
                          }
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        void copyFamilyCard(
                          card,
                        )
                      }
                      className="mt-5 flex min-h-12 w-full items-center justify-center rounded-xl bg-[#1C3B34] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#284E45]"
                    >
                      {copiedCard ===
                      card.title
                        ? 'Copied'
                        : 'Copy family message'}
                    </button>
                  </article>
                ),
              )}
            </section>

            <section className="rounded-3xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-6">
              <span className="text-xs font-black uppercase tracking-widest text-[#9A793D]">
                Important practice note
              </span>

              <h3 className="mt-2 text-lg font-bold text-[#1C3B34]">
                These are conversation
                starters, not
                instructions for
                families.
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#53645D]">
                Families know their
                child in contexts
                educators do not see.
                Their responses can help
                the team understand
                patterns, preferences,
                strengths and what
                already works outside
                the service.
              </p>
            </section>
          </div>
        )}

        {/* PROGRESS */}
        {hubView === 'progress' && (
          <div className="space-y-5">
            <section className="space-y-3 rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
              <h3 className="text-base font-bold text-[#1C3B34]">
                Work email for saved
                progress
              </h3>

              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                value={userEmail}
                onChange={(event) =>
                  setUserEmail(
                    event.target.value,
                  )
                }
                placeholder="educator@service.com.au"
                className="min-h-12 w-full rounded-2xl border-2 border-[#E6E2DC] bg-[#FAF8F5] px-4 py-3.5 text-sm font-medium text-[#1C3B34] outline-none focus:border-[#657B6C]"
              />
            </section>

            <div className="rounded-3xl border-2 border-[#E6E2DC] bg-white p-6 shadow-sm">
              <ProgressSummary
                userEmail={
                  cleanedEmail
                }
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function HubButton({
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
      className={`flex min-h-12 items-center justify-between rounded-2xl border-2 px-4 py-4 text-left transition ${
        active
          ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
          : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
      }`}
    >
      <span>{label}</span>

      {active && (
        <span className="ml-2 text-[#C29F60]">
          ●
        </span>
      )}
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
      className={`min-h-12 rounded-2xl border-2 px-4 py-3 text-left text-sm font-bold transition ${
        active
          ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
          : 'border-[#E6E2DC] bg-white text-[#1C3B34] hover:border-[#657B6C]'
      }`}
    >
      <span className="flex items-center gap-2">
        <span
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 text-[10px] ${
            active
              ? 'border-[#C29F60] bg-[#C29F60] text-[#1C3B34]'
              : 'border-[#CFC8BD] bg-white'
          }`}
        >
          {active ? '✓' : ''}
        </span>

        {label}
      </span>
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
      <legend className="text-sm font-bold text-[#1C3B34]">
        {label}
      </legend>

      {helper && (
        <p className="mb-3 mt-1 text-xs text-[#6A7873]">
          {helper}
        </p>
      )}

      {!helper && (
        <div className="h-3" />
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
      <span className="mb-2 flex items-center gap-2 text-sm font-bold text-[#1C3B34]">
        {label}

        {required && (
          <span className="text-[#9A793D]">
            *
          </span>
        )}

        {helper && (
          <span className="text-xs font-normal text-[#6A7873]">
            {helper}
          </span>
        )}
      </span>

      {children}
    </label>
  );
}