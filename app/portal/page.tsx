'use client';

import Link from 'next/link';
import React, { FormEvent, useState } from 'react';

import MemberSignOutButton from '@/components/MemberSignOutButton';
import ProgressSummary from '@/components/feed/ProgressSummary';
import RegulationLadders from '@/components/feed/RegulationLadders';

type HubView =
  | 'monthly'
  | 'resources'
  | 'recordings'
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

const NAV_ITEMS: {
  value: HubView;
  title: string;
  description: string;
}[] = [
  {
    value: 'monthly',
    title: 'This Month',
    description: 'Start here',
  },
  {
    value: 'resources',
    title: 'Resources',
    description: 'Print and use',
  },
  {
    value: 'recordings',
    title: 'Recordings',
    description: 'Watch when it suits',
  },
  {
    value: 'ladders',
    title: 'Regulation Ladders',
    description: 'Work through a situation',
  },
  {
    value: 'family',
    title: 'Family Bridge',
    description: 'Share with families',
  },
  {
    value: 'progress',
    title: 'My Progress',
    description: 'Review your learning',
  },
];

export default function MemberPortalPage() {
  const [hubView, setHubView] =
    useState<HubView>('monthly');

  const [userEmail, setUserEmail] =
    useState('');

  const [
    openingResource,
    setOpeningResource,
  ] = useState<string | null>(null);

  const [resourceError, setResourceError] =
    useState('');

  const [copiedCard, setCopiedCard] =
    useState<string | null>(null);

  const [whatNoticing, setWhatNoticing] =
    useState('');

  const [whatTried, setWhatTried] =
    useState('');

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

  const [
    preferredDays,
    setPreferredDays,
  ] = useState<string[]>([]);

  const [
    preferredTimes,
    setPreferredTimes,
  ] = useState<string[]>([]);

  const [otherTime, setOtherTime] =
    useState('');

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

  const [voteMessage, setVoteMessage] =
    useState('');

  const cleanedEmail =
    userEmail.trim().toLowerCase();

  const toggleDay = (day: string) => {
    setPreferredDays((current) =>
      current.includes(day)
        ? current.filter(
            (item) => item !== day,
          )
        : [...current, day],
    );
  };

  const toggleTime = (time: string) => {
    setPreferredTimes((current) =>
      current.includes(time)
        ? current.filter(
            (item) => item !== time,
          )
        : [...current, time],
    );
  };

  const handleQuestionSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setQuestionStatus('idle');
    setQuestionMessage('');

    if (whatNoticing.trim().length < 10) {
      setQuestionStatus('error');
      setQuestionMessage(
        'Please tell me a little more about what you are noticing.',
      );
      return;
    }

    if (!questionFirstName.trim()) {
      setQuestionStatus('error');
      setQuestionMessage(
        'Please add your first name.',
      );
      return;
    }

    setQuestionStatus('submitting');

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
            whatTried: whatTried.trim(),
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

  const handleVoteSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setVoteStatus('idle');
    setVoteMessage('');

    if (preferredDays.length === 0) {
      setVoteStatus('error');
      setVoteMessage(
        'Please choose at least one preferred day.',
      );
      return;
    }

    if (preferredTimes.length === 0) {
      setVoteStatus('error');
      setVoteMessage(
        'Please choose at least one preferred time.',
      );
      return;
    }

    if (
      preferredTimes.includes('Other') &&
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
            otherTime: otherTime.trim(),
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

  const openMemberResource = async (
    file: string,
  ) => {
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

  const copyFamilyCard = async (
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
      console.error('Copy failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-20 text-[#1C3B34]">
      {/* PORTAL HEADER */}
      <header className="sticky top-0 z-40 border-b border-[#E5DED4] bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <div>
            <span className="block text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
              Regulator Champions
            </span>

            <h1 className="mt-1 text-xl font-extrabold text-[#1C3B34] sm:text-2xl">
              Educator Hub
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/platform/educator"
              className="hidden min-h-12 items-center rounded-2xl bg-[#657B6C] px-5 py-3 text-base font-bold text-white transition hover:bg-[#53665A] sm:flex"
            >
              Floor Deck
            </Link>

            <MemberSignOutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-5 py-8 sm:px-6 sm:py-10">

        {/* WELCOME */}
        <section className="overflow-hidden rounded-4xl bg-[#1C3B34] text-white shadow-lg">
          <div className="grid lg:grid-cols-[1.25fr_0.75fr]">
            <div className="p-7 sm:p-10">
              <span className="inline-flex rounded-full bg-[#C29F60] px-4 py-2 text-sm font-extrabold text-[#1C3B34]">
                Your place to start
              </span>

              <h2 className="mt-6 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
                Notice something. Try something. Come back when you need help.
              </h2>

              <p className="mt-6 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
                You do not need to work through
                everything at once. Start with
                whatever is making today harder
                for your team.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setHubView('monthly')
                  }
                  className="min-h-14 rounded-2xl bg-[#C29F60] px-6 py-4 text-base font-extrabold text-[#1C3B34]"
                >
                  Start with this month
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setHubView('ladders')
                  }
                  className="min-h-14 rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-base font-bold text-white"
                >
                  Open Regulation Ladders
                </button>
              </div>
            </div>

            <div className="bg-[#16332D] p-7 sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                Remember
              </span>

              <div className="mt-5 space-y-5">
                <QuickReminder
                  number="1"
                  title="Notice"
                  text="What is the child’s body telling you?"
                />

                <QuickReminder
                  number="2"
                  title="Get curious"
                  text="What might be making this moment hard?"
                />

                <QuickReminder
                  number="3"
                  title="Try"
                  text="Make one thoughtful adjustment."
                />

                <QuickReminder
                  number="4"
                  title="Reflect"
                  text="What changed after you responded differently?"
                />
              </div>

              <Link
                href="/platform/manager"
                className="mt-8 flex min-h-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-center text-base font-bold text-white transition hover:bg-white/10"
              >
                Manager QIP Dashboard
              </Link>
            </div>
          </div>
        </section>

        {/* HUB NAVIGATION */}
        <nav
          aria-label="Regulator Champions member hub"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6"
        >
          {NAV_ITEMS.map((item) => (
            <HubButton
              key={item.value}
              active={hubView === item.value}
              title={item.title}
              description={item.description}
              onClick={() =>
                setHubView(item.value)
              }
            />
          ))}
        </nav>

        {/* MONTHLY HUB */}
        {hubView === 'monthly' && (
          <div className="space-y-8">

            {/* THIS MONTH */}
            <section className="overflow-hidden rounded-4xl border border-[#E5DED4] bg-white shadow-sm">
              <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
                <div className="p-7 sm:p-10">
                  <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                    September focus
                  </span>

                  <h2 className="mt-3 text-4xl font-extrabold text-[#1C3B34] sm:text-5xl">
                    Notice Before We React
                  </h2>

                  <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#53645D]">
                    This month we are practising
                    one thing: noticing what
                    happens in the child&apos;s
                    body before deciding what
                    their behaviour means.
                  </p>

                  <div className="mt-8 rounded-3xl bg-[#FAF5EC] p-6">
                    <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#657B6C]">
                      Try this
                    </span>

                    <p className="mt-3 text-lg leading-relaxed text-[#53645D]">
                      Choose one child or one
                      recurring part of the day
                      that often becomes
                      difficult. Before trying
                      to stop the behaviour,
                      notice:
                    </p>

                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {[
                        'What happens to their movement?',
                        'What happens to their voice?',
                        'What changes in their posture?',
                        'Can they still process your words?',
                        'What happened immediately beforehand?',
                        'What changes when you slow down?',
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex gap-3 rounded-2xl bg-white p-4"
                        >
                          <span className="font-extrabold text-[#C29F60]">
                            ✓
                          </span>

                          <p className="text-base font-bold leading-relaxed text-[#2B3833]">
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <p className="mt-6 text-xl font-extrabold text-[#1C3B34]">
                    You do not need to solve
                    everything. Notice first.
                  </p>
                </div>

                <div className="flex flex-col justify-center bg-[#1C3B34] p-7 text-white sm:p-9">
                  <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                    This month&apos;s tool
                  </span>

                  <h3 className="mt-4 text-3xl font-extrabold leading-tight">
                    What Is the Child&apos;s Body Telling Me?
                  </h3>

                  <p className="mt-4 text-lg leading-relaxed text-[#D8E1DC]">
                    A simple two-page noticing
                    checklist to use before
                    behaviour becomes the whole
                    story.
                  </p>

                  <a
                    href="/pdf/What-Is-the-Childs-Body-Telling-Me.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 flex min-h-14 items-center justify-center rounded-2xl bg-[#C29F60] px-6 py-4 text-center text-base font-extrabold text-[#1C3B34]"
                  >
                    Open the checklist
                  </a>
                </div>
              </div>
            </section>

            {/* SESSION STATUS */}
            <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                Monthly coaching
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
                September: Notice Before We React
              </h2>

              <div className="mt-6 rounded-3xl border border-[#E5DED4] bg-[#FAF8F5] p-6">
                <p className="text-lg font-extrabold text-[#1C3B34]">
                  Date being chosen by our
                  founding Regulator Champion
                  teams.
                </p>

                <p className="mt-2 text-base leading-relaxed text-[#65736D]">
                  Vote below. The confirmed
                  date will appear here once
                  responses have been reviewed.
                </p>
              </div>
            </section>

            {/* VOTE */}
            <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 shadow-sm sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                Help choose the session time
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
                What actually works for your team?
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#53645D]">
                Choose every day and time that
                could realistically work. I
                will use the most popular
                combination for our first
                monthly session.
              </p>

              {voteStatus === 'success' ? (
                <SuccessBox
                  title="Thank you. Your preferences are in."
                  text="I’ll compare the responses across participating teams before confirming the September session."
                  buttonLabel="Submit another response"
                  onClick={() => {
                    setVoteStatus('idle');
                    setPreferredDays([]);
                    setPreferredTimes([]);
                    setOtherTime('');
                    setAttendancePreference('');
                  }}
                />
              ) : (
                <form
                  onSubmit={handleVoteSubmit}
                  className="mt-8 space-y-8"
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
                              toggleTime(time)
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
                        onChange={(event) =>
                          setOtherTime(
                            event.target.value,
                          )
                        }
                        placeholder="Tell me another time that works"
                        className="mt-4 min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base text-[#1C3B34] outline-none focus:border-[#657B6C]"
                      />
                    )}
                  </FormGroup>

                  <FormGroup label="How would you usually attend?">
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
                      value={voteFirstName}
                      onChange={(event) =>
                        setVoteFirstName(
                          event.target.value,
                        )
                      }
                      className="min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-white px-5 py-4 text-base text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  {voteStatus === 'error' && (
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

            {/* RECORDING NOTE */}
            <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 shadow-sm sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                Cannot get educators off the floor?
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
                You do not have to attend live.
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                Each monthly coaching session will be recorded and added to the
                Recordings area of this Member Hub. Educators can watch later
                when staffing, ratios and floor coverage allow.
              </p>

              <button
                type="button"
                onClick={() => setHubView('recordings')}
                className="mt-6 min-h-14 rounded-2xl bg-[#1C3B34] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#284E45]"
              >
                Open Recordings
              </button>
            </section>

            {/* ASK ROBYN */}
            <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
                Ask Robyn
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
                Stuck on something happening in your room?
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#53645D]">
                Send through the situation.
                You do not need to have the
                answer first. These real
                questions help shape our
                monthly coaching.
              </p>

              <div className="mt-6 rounded-3xl border border-[#C29F60]/50 bg-[#FAF5EC] p-5">
                <strong className="text-lg text-[#1C3B34]">
                  Keep children and families
                  de-identified.
                </strong>

                <p className="mt-2 text-base leading-relaxed text-[#53645D]">
                  Do not include children&apos;s
                  names, dates of birth, family
                  names or other identifying
                  information.
                </p>
              </div>

              {questionStatus ===
              'success' ? (
                <SuccessBox
                  title="Thank you. I’ve got it."
                  text="Your question can help shape an upcoming Regulator Champions conversation. Any discussion will remain de-identified."
                  buttonLabel="Ask another question"
                  onClick={() =>
                    setQuestionStatus('idle')
                  }
                />
              ) : (
                <form
                  onSubmit={
                    handleQuestionSubmit
                  }
                  className="mt-8 space-y-6"
                >
                  <FormField
                    label="What are you noticing?"
                    required
                  >
                    <textarea
                      required
                      rows={6}
                      value={whatNoticing}
                      onChange={(event) =>
                        setWhatNoticing(
                          event.target.value,
                        )
                      }
                      placeholder="Describe the broad situation or pattern you are noticing..."
                      className="w-full resize-y rounded-2xl border-2 border-[#E5DED4] bg-[#FAF8F5] px-5 py-4 text-base leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  <FormField
                    label="What have you already tried?"
                    helper="Optional"
                  >
                    <textarea
                      rows={4}
                      value={whatTried}
                      onChange={(event) =>
                        setWhatTried(
                          event.target.value,
                        )
                      }
                      placeholder="What has your team tried so far?"
                      className="w-full resize-y rounded-2xl border-2 border-[#E5DED4] bg-[#FAF8F5] px-5 py-4 text-base leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
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
                      onChange={(event) =>
                        setWhatHelpUnderstanding(
                          event.target.value,
                        )
                      }
                      placeholder="What feels confusing or what would you like unpacked?"
                      className="w-full resize-y rounded-2xl border-2 border-[#E5DED4] bg-[#FAF8F5] px-5 py-4 text-base leading-relaxed text-[#1C3B34] outline-none focus:border-[#657B6C]"
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
                      onChange={(event) =>
                        setQuestionFirstName(
                          event.target.value,
                        )
                      }
                      className="min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-[#FAF8F5] px-5 py-4 text-base text-[#1C3B34] outline-none focus:border-[#657B6C]"
                    />
                  </FormField>

                  {questionStatus ===
                    'error' && (
                    <ErrorBox>
                      {questionMessage}
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

        {/* RECORDINGS */}
        {hubView === 'recordings' && (
          <div className="space-y-8">
            <SectionIntro
              eyebrow="Monthly Coaching Recordings"
              title="Watch when your team has time."
              text="Live attendance is optional. Each monthly coaching session will be added here so educators can catch up when staffing and floor coverage allow."
            />

            <section className="rounded-4xl border-2 border-[#C29F60]/50 bg-[#FAF5EC] p-7 shadow-sm sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                Recording library
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
                Your first recording will appear here after the first monthly coaching session.
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                There are no recordings yet because the first Regulator Champions
                monthly coaching session has not run. Once sessions begin, each
                recording will be added here with the topic and a short explanation
                of what the session helps educators work through.
              </p>

              <div className="mt-7 grid gap-4 md:grid-cols-3">
                <RecordingFeature
                  title="Watch later"
                  text="Educators can catch up when they are able to step away from the floor."
                />

                <RecordingFeature
                  title="Revisit a topic"
                  text="Return to a session when the same type of situation appears again."
                />

                <RecordingFeature
                  title="Keep asking questions"
                  text="If the recording does not answer the situation, send a private question to Robyn through This Month."
                />
              </div>
            </section>

            <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#657B6C]">
                First monthly topic
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
                Notice Before We React
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[#53645D]">
                Once the September coaching session has been held, its recording
                can be placed here for your team to watch and revisit.
              </p>

              <button
                type="button"
                onClick={() => setHubView('monthly')}
                className="mt-6 min-h-14 rounded-2xl bg-[#657B6C] px-7 py-4 text-base font-extrabold text-white transition hover:bg-[#53665A]"
              >
                Go to This Month
              </button>
            </section>
          </div>
        )}

        {/* RESOURCES */}
        {hubView === 'resources' && (
          <div className="space-y-8">
            <SectionIntro
              eyebrow="Resource Library"
              title="Find something useful for the room today."
              text="Open the tools, cards and reflection resources your team can use without having to work through a long course first."
            />

            <EmailBox
              value={userEmail}
              onChange={setUserEmail}
            />

            <div className="grid gap-5 md:grid-cols-3">
              <ResourceCard
                eyebrow="Ladder 1"
                title="Morning Action Plans"
                text="Practical prompts for arrivals, drop-off handovers and transition setups."
                href="/playbooks"
                button="Open Action Plans"
              />

              <ResourceCard
                eyebrow="Practice Leadership"
                title="NQS & QIP Matrix"
                text="Connect professional learning and floor practice with NQS elements and QIP evidence."
                href="/nqs-mapping"
                button="Open NQS Matrix"
              />
            </div>

            <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#9A793D]">
                Printable Vault
              </span>

              <h2 className="mt-3 text-3xl font-extrabold text-[#1C3B34]">
                Print it. Put it in the room. Use it.
              </h2>

              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <a
                  href="/pdf/Morning-Routine-Ladder-Printable-Cards-Educators.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-16 items-center justify-center rounded-2xl bg-[#1C3B34] px-5 py-4 text-center text-base font-extrabold text-white"
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
                    openingResource !== null
                  }
                  className="min-h-16 rounded-2xl bg-[#C29F60] px-5 py-4 text-base font-extrabold text-[#1C3B34] disabled:opacity-50"
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
                    openingResource !== null
                  }
                  className="min-h-16 rounded-2xl bg-[#657B6C] px-5 py-4 text-base font-extrabold text-white disabled:opacity-50"
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
                    openingResource !== null
                  }
                  className="min-h-16 rounded-2xl border-2 border-[#E5DED4] bg-[#FAF8F5] px-5 py-4 text-base font-extrabold text-[#1C3B34] disabled:opacity-50"
                >
                  {openingResource ===
                  'Morning-Routine-Ladder-Printable-Cards-Parents.pdf'
                    ? 'Opening…'
                    : 'Family Handover Cards'}
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
          </div>
        )}

        {/* LADDERS */}
        {hubView === 'ladders' && (
          <div className="space-y-8">
            <SectionIntro
              eyebrow="Regulation Ladders"
              title="Work through the situation that is hard right now."
              text="Use the ladders to slow down the moment, notice what may be happening and choose what to try next."
            />

            <EmailBox
              value={userEmail}
              onChange={setUserEmail}
            />

            <div className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm sm:p-8">
              <RegulationLadders
                userEmail={cleanedEmail}
              />
            </div>
          </div>
        )}

        {/* FAMILY BRIDGE */}
        {hubView === 'family' && (
          <div className="space-y-8">
            <section className="rounded-4xl bg-[#1C3B34] p-7 text-white shadow-lg sm:p-9">
              <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
                Family Bridge
              </span>

              <h2 className="mt-3 text-4xl font-extrabold">
                Make family conversations easier.
              </h2>

              <p className="mt-5 max-w-3xl text-xl leading-relaxed text-[#D8E1DC]">
                Choose a message that reflects
                what your team is practising,
                copy it into your usual family
                communication platform and
                invite the family to share what
                they notice too.
              </p>
            </section>

            <section className="grid gap-5 md:grid-cols-2">
              {FAMILY_BRIDGE_CARDS.map(
                (card) => (
                  <article
                    key={card.title}
                    className="flex flex-col justify-between rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm"
                  >
                    <div>
                      <span className="inline-flex rounded-full bg-[#FAF5EC] px-3 py-1.5 text-sm font-extrabold text-[#9A793D]">
                        {card.category}
                      </span>

                      <h3 className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
                        {card.title}
                      </h3>

                      <div className="mt-5 rounded-3xl bg-[#FAF8F5] p-5">
                        <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
                          Share with the family
                        </span>

                        <p className="mt-3 text-lg font-medium leading-relaxed text-[#2B3833]">
                          {card.educatorMessage}
                        </p>
                      </div>

                      <div className="mt-5 border-l-4 border-[#C29F60] pl-5">
                        <span className="text-sm font-extrabold uppercase tracking-widest text-[#657B6C]">
                          Ask them
                        </span>

                        <p className="mt-2 text-lg leading-relaxed text-[#53645D]">
                          {card.familyQuestion}
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
                      className="mt-6 min-h-14 w-full rounded-2xl bg-[#1C3B34] px-5 py-4 text-base font-extrabold text-white"
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

            <section className="rounded-4xl border border-[#C29F60]/50 bg-[#FAF5EC] p-7">
              <h3 className="text-2xl font-extrabold text-[#1C3B34]">
                These are conversation starters,
                not instructions for families.
              </h3>

              <p className="mt-3 max-w-4xl text-lg leading-relaxed text-[#53645D]">
                Families know their child in
                contexts educators do not see.
                Their responses can help your
                team understand patterns,
                preferences, strengths and what
                already works outside the
                service.
              </p>
            </section>
          </div>
        )}

        {/* PROGRESS */}
        {hubView === 'progress' && (
          <div className="space-y-8">
            <SectionIntro
              eyebrow="My Progress"
              title="See what you have explored and reflected on."
              text="Enter your work email so your saved learning and reflections can be matched to you."
            />

            <EmailBox
              value={userEmail}
              onChange={setUserEmail}
            />

            <div className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm sm:p-8">
              <ProgressSummary
                userEmail={cleanedEmail}
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
      className={`min-h-24 rounded-3xl border-2 p-5 text-left transition ${
        active
          ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-md'
          : 'border-[#E5DED4] bg-white text-[#1C3B34] hover:border-[#657B6C]'
      }`}
    >
      <span className="block text-lg font-extrabold">
        {title}
      </span>

      <span
        className={`mt-1 block text-sm ${
          active
            ? 'text-[#D8E1DC]'
            : 'text-[#65736D]'
        }`}
      >
        {description}
      </span>
    </button>
  );
}

function QuickReminder({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C29F60] font-extrabold text-[#1C3B34]">
        {number}
      </span>

      <div>
        <strong className="text-lg text-white">
          {title}
        </strong>

        <p className="mt-1 text-base leading-relaxed text-[#C8D6D0]">
          {text}
        </p>
      </div>
    </div>
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
      className={`min-h-14 rounded-2xl border-2 px-5 py-4 text-left text-base font-bold transition ${
        active
          ? 'border-[#1C3B34] bg-[#1C3B34] text-white shadow-sm'
          : 'border-[#E5DED4] bg-white text-[#1C3B34] hover:border-[#657B6C]'
      }`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-xs ${
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
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-4xl bg-[#1C3B34] p-7 text-white shadow-lg sm:p-9">
      <span className="text-sm font-extrabold uppercase tracking-[0.14em] text-[#E4C98E]">
        {eyebrow}
      </span>

      <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
        {title}
      </h2>

      <p className="mt-5 max-w-4xl text-xl leading-relaxed text-[#D8E1DC]">
        {text}
      </p>
    </section>
  );
}

function EmailBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <section className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        Your work email
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#65736D]">
        This matches saved progress and
        reflection notes to you.
      </p>

      <input
        type="email"
        inputMode="email"
        autoComplete="email"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder="educator@service.com.au"
        className="mt-5 min-h-14 w-full rounded-2xl border-2 border-[#E5DED4] bg-[#FAF8F5] px-5 py-4 text-base font-medium text-[#1C3B34] outline-none focus:border-[#657B6C]"
      />
    </section>
  );
}

function ResourceCard({
  eyebrow,
  title,
  text,
  href,
  button,
}: {
  eyebrow: string;
  title: string;
  text: string;
  href: string;
  button: string;
}) {
  return (
    <article className="flex flex-col justify-between rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm">
      <div>
        <span className="text-sm font-extrabold uppercase tracking-[0.12em] text-[#9A793D]">
          {eyebrow}
        </span>

        <h3 className="mt-3 text-2xl font-extrabold text-[#1C3B34]">
          {title}
        </h3>

        <p className="mt-3 text-lg leading-relaxed text-[#65736D]">
          {text}
        </p>
      </div>

      <Link
        href={href}
        className="mt-6 flex min-h-14 items-center justify-center rounded-2xl bg-[#1C3B34] px-5 py-4 text-center text-base font-extrabold text-white"
      >
        {button}
      </Link>
    </article>
  );
}

function RecordingFeature({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <article className="rounded-3xl border border-[#E5DED4] bg-white p-6">
      <h3 className="text-xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 text-base leading-relaxed text-[#65736D]">
        {text}
      </p>
    </article>
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
      className="mt-8 rounded-3xl border-2 border-[#A8C5B7] bg-[#F0F7F3] p-7"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl font-extrabold text-[#1C3B34]">
        ✓
      </div>

      <h3 className="mt-4 text-2xl font-extrabold text-[#1C3B34]">
        {title}
      </h3>

      <p className="mt-3 max-w-3xl text-lg leading-relaxed text-[#53645D]">
        {text}
      </p>

      <button
        type="button"
        onClick={onClick}
        className="mt-5 text-base font-extrabold text-[#657B6C] underline-offset-4 hover:underline"
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
      className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-base font-bold leading-relaxed text-rose-800"
    >
      {children}
    </p>
  );
}