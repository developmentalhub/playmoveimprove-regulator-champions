'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error';

type ReviewResponse = {
  success?: boolean;
  error?: string;
};

const leadershipCapacityOptions = [
  'Feeling well supported and able to plan proactively',
  'Managing overall, but regularly responding to unexpected pressures',
  'Frequently stretched and finding it difficult to move beyond immediate issues',
];

const teamConsistencyOptions = [
  'Generally consistent across rooms and shifts',
  'Some shared practice, but noticeable differences between rooms',
  'Significant differences in language, expectations or responses across the team',
];

const familyCommunicationOptions = [
  'Generally positive and collaborative',
  'Some routines require frequent reassurance or explanation',
  'Several family conversations currently feel difficult or sensitive',
];

export default function DirectorReviewPage() {
  const [directorName, setDirectorName] = useState('');
  const [directorEmail, setDirectorEmail] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [phone, setPhone] = useState('');

  const [leadershipCapacity, setLeadershipCapacity] = useState('');
  const [leadershipNotes, setLeadershipNotes] = useState('');

  const [teamConsistency, setTeamConsistency] = useState('');
  const [teamPressurePoints, setTeamPressurePoints] = useState('');

  const [familyCommunication, setFamilyCommunication] = useState('');
  const [familySupportNotes, setFamilySupportNotes] = useState('');

  const [babiesPatterns, setBabiesPatterns] = useState('');
  const [toddlerPatterns, setToddlerPatterns] = useState('');
  const [preschoolPatterns, setPreschoolPatterns] = useState('');

  const [priorityRoutines, setPriorityRoutines] = useState<string[]>([]);
  const [topPriority, setTopPriority] = useState('');

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');

  const togglePriorityRoutine = (routine: string) => {
    setPriorityRoutines((current) =>
      current.includes(routine)
        ? current.filter((item) => item !== routine)
        : [...current, routine],
    );
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmissionStatus('idle');
    setSubmissionMessage('');

    if (!leadershipCapacity) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Select the option that best describes your current leadership capacity.',
      );
      return;
    }

    if (!teamConsistency) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Select the option that best describes current team consistency.',
      );
      return;
    }

    if (!familyCommunication) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Select the option that best describes current family communication.',
      );
      return;
    }

    if (topPriority.trim().length < 30) {
      setSubmissionStatus('error');
      setSubmissionMessage(
        'Please add a little more detail about the most important outcome for your service.',
      );
      return;
    }

    setSubmissionStatus('submitting');

    try {
      const response = await fetch('/api/director-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          directorName: directorName.trim(),
          directorEmail: directorEmail.trim().toLowerCase(),
          serviceName: serviceName.trim(),
          phone: phone.trim(),

          leadershipCapacity,
          leadershipNotes: leadershipNotes.trim(),

          teamConsistency,
          teamPressurePoints: teamPressurePoints.trim(),

          familyCommunication,
          familySupportNotes: familySupportNotes.trim(),

          babiesPatterns: babiesPatterns.trim(),
          toddlerPatterns: toddlerPatterns.trim(),
          preschoolPatterns: preschoolPatterns.trim(),

          priorityRoutines,
          topPriority: topPriority.trim(),
        }),
      });

      let responseData: ReviewResponse = {};

      try {
        responseData = (await response.json()) as ReviewResponse;
      } catch {
        responseData = {};
      }

      if (!response.ok || !responseData.success) {
        throw new Error(
          responseData.error ??
            'Your starting-point review could not be submitted.',
        );
      }

      setSubmissionStatus('success');
      setSubmissionMessage(
        'Your centre starting-point review has been submitted securely.',
      );
    } catch (error) {
      console.error('Director review submission failed:', error);

      setSubmissionStatus('error');
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : 'Your starting-point review could not be submitted. Please try again.',
      );
    }
  };

  const resetForm = () => {
    setDirectorName('');
    setDirectorEmail('');
    setServiceName('');
    setPhone('');

    setLeadershipCapacity('');
    setLeadershipNotes('');

    setTeamConsistency('');
    setTeamPressurePoints('');

    setFamilyCommunication('');
    setFamilySupportNotes('');

    setBabiesPatterns('');
    setToddlerPatterns('');
    setPreschoolPatterns('');

    setPriorityRoutines([]);
    setTopPriority('');

    setSubmissionStatus('idle');
    setSubmissionMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-16 font-sans text-slate-800">
      <header className="sticky top-0 z-40 border-b border-teal-700 bg-teal-800 px-6 py-5 text-white shadow-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-200">
              Play Move Improve
            </span>

            <h1 className="text-lg font-bold md:text-xl">
              Centre Starting-Point Review
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

      <main className="mx-auto max-w-3xl space-y-8 p-4 md:p-8">
        <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-800">
            Director and Leadership Team
          </span>

          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Help Us Understand Your Service Before the Pathway Begins
          </h2>

          <p className="text-sm leading-relaxed text-slate-600 md:text-base">
            This review helps Robyn understand the routines, team pressures and
            professional learning priorities currently affecting your service.
            It is designed to establish a practical starting point, not to rate
            your centre or assess individual educators.
          </p>

          <div className="rounded-2xl border border-teal-200 bg-teal-50 p-4">
            <p className="text-sm leading-relaxed text-teal-950">
              Please describe broad service patterns only. Do not include
              children’s or family members’ names, dates of birth, diagnoses,
              incident details or other identifying information.
            </p>
          </div>

          <p className="text-xs leading-relaxed text-slate-500">
            Allow approximately 8 to 12 minutes to complete this review.
          </p>
        </section>

        {submissionStatus === 'success' ? (
          <section
            role="status"
            className="space-y-5 rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center text-emerald-950 shadow-sm"
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-800">
              ✓
            </div>

            <h2 className="text-xl font-bold">
              Starting-Point Review Received
            </h2>

            <p className="mx-auto max-w-xl text-sm leading-relaxed">
              Thank you, <strong>{directorName}</strong>. The review for{' '}
              <strong>{serviceName}</strong> has been submitted.
            </p>

            <p className="mx-auto max-w-xl text-sm leading-relaxed">
              Robyn will use this information to understand broad centre
              priorities and shape the professional learning pathway. It will
              not be treated as a formal assessment of your service or staff.
            </p>

            <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
              <Link
                href="/portal"
                className="rounded-xl bg-teal-700 px-6 py-3 text-sm font-bold text-white shadow transition hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
              >
                Open the Training Hub
              </Link>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-emerald-300 bg-white px-6 py-3 text-sm font-bold text-emerald-900 transition hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:ring-offset-2"
              >
                Submit Another Review
              </button>
            </div>
          </section>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {submissionStatus === 'error' && (
              <div
                role="alert"
                className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm leading-relaxed text-rose-900"
              >
                <strong className="block">
                  Your review has not been submitted.
                </strong>

                <span>{submissionMessage}</span>
              </div>
            )}

            <FormSection
              number="1"
              title="Leadership and Service Details"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  id="directorName"
                  label="Director or Leader Name"
                  required
                >
                  <input
                    id="directorName"
                    name="directorName"
                    type="text"
                    autoComplete="name"
                    required
                    value={directorName}
                    onChange={(event) =>
                      setDirectorName(event.target.value)
                    }
                    placeholder="e.g. Rachel Adams"
                    className={inputClassName}
                  />
                </FormField>

                <FormField
                  id="directorEmail"
                  label="Work Email Address"
                  required
                >
                  <input
                    id="directorEmail"
                    name="directorEmail"
                    type="email"
                    autoComplete="email"
                    required
                    value={directorEmail}
                    onChange={(event) =>
                      setDirectorEmail(event.target.value)
                    }
                    placeholder="director@yourcentre.com.au"
                    className={inputClassName}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  id="serviceName"
                  label="Centre or Service Name"
                  required
                >
                  <input
                    id="serviceName"
                    name="serviceName"
                    type="text"
                    required
                    value={serviceName}
                    onChange={(event) =>
                      setServiceName(event.target.value)
                    }
                    placeholder="e.g. Crestwood Early Learning"
                    className={inputClassName}
                  />
                </FormField>

                <FormField
                  id="phone"
                  label="Contact Phone Number"
                  optional
                >
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="0400 000 000"
                    className={inputClassName}
                  />
                </FormField>
              </div>
            </FormSection>

            <FormSection
              number="2"
              title="Current Leadership Capacity"
            >
              <FormField
                id="leadershipCapacity"
                label="Which option best describes your current leadership capacity?"
                required
              >
                <select
                  id="leadershipCapacity"
                  name="leadershipCapacity"
                  required
                  value={leadershipCapacity}
                  onChange={(event) =>
                    setLeadershipCapacity(event.target.value)
                  }
                  className={inputClassName}
                >
                  <option value="">Select one option</option>

                  {leadershipCapacityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="leadershipNotes"
                label="Which situations currently take the most leadership time or attention?"
                optional
              >
                <textarea
                  id="leadershipNotes"
                  name="leadershipNotes"
                  rows={4}
                  value={leadershipNotes}
                  onChange={(event) =>
                    setLeadershipNotes(event.target.value)
                  }
                  placeholder="For example: stepping into rooms during breaks, responding to repeated transition difficulties, supporting new educators or managing inconsistent expectations."
                  className={inputClassName}
                />
              </FormField>
            </FormSection>

            <FormSection
              number="3"
              title="Team Consistency and Professional Learning"
            >
              <FormField
                id="teamConsistency"
                label="How consistent are regulation approaches across your rooms and shifts?"
                required
              >
                <select
                  id="teamConsistency"
                  name="teamConsistency"
                  required
                  value={teamConsistency}
                  onChange={(event) =>
                    setTeamConsistency(event.target.value)
                  }
                  className={inputClassName}
                >
                  <option value="">Select one option</option>

                  {teamConsistencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="teamPressurePoints"
                label="Where do educators appear to need the most shared support?"
                optional
              >
                <textarea
                  id="teamPressurePoints"
                  name="teamPressurePoints"
                  rows={4}
                  value={teamPressurePoints}
                  onChange={(event) =>
                    setTeamPressurePoints(event.target.value)
                  }
                  placeholder="For example: arrivals, mat time, pack-up, lunch routines, rough play, shift handovers or differing expectations between educators."
                  className={inputClassName}
                />
              </FormField>
            </FormSection>

            <FormSection
              number="4"
              title="Family Communication"
            >
              <FormField
                id="familyCommunication"
                label="Which option best describes current family communication?"
                required
              >
                <select
                  id="familyCommunication"
                  name="familyCommunication"
                  required
                  value={familyCommunication}
                  onChange={(event) =>
                    setFamilyCommunication(event.target.value)
                  }
                  className={inputClassName}
                >
                  <option value="">Select one option</option>

                  {familyCommunicationOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="familySupportNotes"
                label="Which family conversations would your team benefit from approaching with greater confidence?"
                optional
              >
                <textarea
                  id="familySupportNotes"
                  name="familySupportNotes"
                  rows={4}
                  value={familySupportNotes}
                  onChange={(event) =>
                    setFamilySupportNotes(event.target.value)
                  }
                  placeholder="Describe the general type of conversation only. Do not include family names or individual circumstances."
                  className={inputClassName}
                />
              </FormField>
            </FormSection>

            <FormSection
              number="5"
              title="Patterns Across Age Groups"
            >
              <p className="text-sm leading-relaxed text-slate-600">
                Complete the areas relevant to your service. Describe broad
                patterns rather than individual children.
              </p>

              <FormField
                id="babiesPatterns"
                label="Babies and Nursery"
                optional
              >
                <textarea
                  id="babiesPatterns"
                  name="babiesPatterns"
                  rows={3}
                  value={babiesPatterns}
                  onChange={(event) =>
                    setBabiesPatterns(event.target.value)
                  }
                  placeholder="For example: arrival distress, busy room noise, difficulty settling between routines or educators feeling unsure how much stimulation to offer."
                  className={inputClassName}
                />
              </FormField>

              <FormField
                id="toddlerPatterns"
                label="Toddlers"
                optional
              >
                <textarea
                  id="toddlerPatterns"
                  name="toddlerPatterns"
                  rows={3}
                  value={toddlerPatterns}
                  onChange={(event) =>
                    setToddlerPatterns(event.target.value)
                  }
                  placeholder="For example: biting, throwing, mealtime protests, waiting difficulties, physical play or transition distress."
                  className={inputClassName}
                />
              </FormField>

              <FormField
                id="preschoolPatterns"
                label="Preschool and Kindergarten"
                optional
              >
                <textarea
                  id="preschoolPatterns"
                  name="preschoolPatterns"
                  rows={3}
                  value={preschoolPatterns}
                  onChange={(event) =>
                    setPreschoolPatterns(event.target.value)
                  }
                  placeholder="For example: group participation, rough play, pack-up, peer conflict, instruction overload or late-day fatigue."
                  className={inputClassName}
                />
              </FormField>
            </FormSection>

            <FormSection
              number="6"
              title="Priority Routines"
            >
              <p className="text-sm leading-relaxed text-slate-600">
                Select any routines that would benefit from a more consistent
                team approach.
              </p>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  'Educator self-regulation and preparation',
                  'Drop-offs and arrivals',
                  'Mat time and group participation',
                  'Throwing, crashing and play schemas',
                  'Transitions between activities',
                  'Rough and physical play',
                  'Pack-up routines',
                  'Following instructions and impulse control',
                  'Family communication',
                  'Consistency across shifts',
                ].map((routine) => {
                  const selected = priorityRoutines.includes(routine);

                  return (
                    <label
                      key={routine}
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-sm leading-relaxed transition ${
                        selected
                          ? 'border-teal-400 bg-teal-50 text-teal-950'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => togglePriorityRoutine(routine)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-teal-700 focus:ring-teal-600"
                      />

                      <span>{routine}</span>
                    </label>
                  );
                })}
              </div>
            </FormSection>

            <FormSection
              number="7"
              title="Most Important Outcome"
            >
              <FormField
                id="topPriority"
                label="At the end of 12 months, what meaningful change would you most like to see across your service?"
                required
              >
                <textarea
                  id="topPriority"
                  name="topPriority"
                  rows={5}
                  required
                  value={topPriority}
                  onChange={(event) =>
                    setTopPriority(event.target.value)
                  }
                  placeholder="For example: educators using a more consistent approach during difficult routines, with leaders spending less time repeating the same guidance."
                  className={inputClassName}
                />
              </FormField>
            </FormSection>

            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm leading-relaxed text-amber-950">
                By submitting this form, you confirm that the responses contain
                general service information only and do not identify individual
                children or families.
              </p>
            </div>

            <button
              type="submit"
              disabled={submissionStatus === 'submitting'}
              className="w-full rounded-2xl bg-teal-700 py-4 text-sm font-bold text-white shadow transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:ring-offset-2"
            >
              {submissionStatus === 'submitting'
                ? 'Submitting Review...'
                : 'Submit Centre Starting-Point Review'}
            </button>
          </form>
        )}
      </main>
    </div>
  );
}

const inputClassName =
  'w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600';

type FormSectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
};

function FormSection({
  number,
  title,
  children,
}: FormSectionProps) {
  return (
    <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-800 text-xs font-bold text-white">
          {number}
        </span>

        <h2 className="text-base font-bold text-slate-900">
          {title}
        </h2>
      </div>

      {children}
    </section>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  children: React.ReactNode;
};

function FormField({
  id,
  label,
  required,
  optional,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-bold text-slate-700"
      >
        {label}

        {required && (
          <span className="ml-1 text-rose-700">*</span>
        )}

        {optional && (
          <span className="ml-1 font-normal text-slate-400">
            (optional)
          </span>
        )}
      </label>

      {children}
    </div>
  );
}