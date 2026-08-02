'use client';

import {
  FormEvent,
  useEffect,
  useState,
} from 'react';

type EducatorTrialFeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type SubmissionState =
  | 'idle'
  | 'submitting'
  | 'success'
  | 'error';

export default function EducatorTrialFeedbackModal({
  isOpen,
  onClose,
}: EducatorTrialFeedbackModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [contentTried, setContentTried] = useState('');
  const [usefulFeedback, setUsefulFeedback] =
    useState('');
  const [unclearFeedback, setUnclearFeedback] =
    useState('');
  const [
    improvementFeedback,
    setImprovementFeedback,
  ] = useState('');

  const [
    wouldUseWithTeam,
    setWouldUseWithTeam,
  ] = useState('');

  const [
    contactPermission,
    setContactPermission,
  ] = useState(false);

  const [submissionState, setSubmissionState] =
    useState<SubmissionState>('idle');

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener(
        'keydown',
        handleEscape,
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setName('');
    setEmail('');
    setRole('');
    setServiceName('');
    setAgeGroup('');
    setContentTried('');
    setUsefulFeedback('');
    setUnclearFeedback('');
    setImprovementFeedback('');
    setWouldUseWithTeam('');
    setContactPermission(false);
    setSubmissionState('idle');
    setMessage('');
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setSubmissionState('submitting');
    setMessage('');

    try {
      const response = await fetch(
        '/api/educator-trial-feedback',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            feedbackType: 'overall',
            pagePath: '/educator-trial',
            contentType: 'overall_trial',
            contentId: 'ladder-1-free-trial',
            contentTitle:
              'Ladder 1 Free Educator Trial',

            name,
            email,
            role,
            serviceName,
            ageGroup,
            contentTried,
            usefulFeedback,
            unclearFeedback,
            improvementFeedback,

            wouldUseWithTeam:
              wouldUseWithTeam === 'yes'
                ? true
                : wouldUseWithTeam === 'no'
                  ? false
                  : null,

            contactPermission,
          }),
        },
      );

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(
          result.error ||
            'Your feedback could not be submitted.',
        );
      }

      setSubmissionState('success');
      setMessage(
        result.message ||
          'Thank you. Your feedback has been received.',
      );
    } catch (error) {
      setSubmissionState('error');

      setMessage(
        error instanceof Error
          ? error.message
          : 'Your feedback could not be submitted.',
      );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="educator-feedback-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-5 sm:px-7">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">
              Educator Trial Feedback
            </span>

            <h2
              id="educator-feedback-title"
              className="mt-1 text-xl font-bold text-slate-950"
            >
              Tell Us What You Thought
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close feedback form"
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>

        {submissionState === 'success' ? (
          <div className="space-y-5 p-6 text-center sm:p-8">
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-7">
              <h3 className="text-xl font-bold text-emerald-950">
                Feedback received
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-emerald-900">
                {message}
              </p>
            </div>

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  resetForm();
                  onClose();
                }}
                className="rounded-xl bg-teal-800 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-900"
              >
                Return to the Trial
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Submit More Feedback
              </button>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-5 sm:p-7"
          >
            {submissionState === 'error' && (
              <div
                role="alert"
                className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm leading-relaxed text-rose-900"
              >
                {message}
              </div>
            )}

            <p className="text-sm leading-relaxed text-slate-600">
              Your feedback will help Play Move Improve
              understand what educators find useful, what
              needs more explanation and how future
              Regulation Ladders should be presented.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="trial-name"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Your Name
                </label>

                <input
                  id="trial-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
                />
              </div>

              <div>
                <label
                  htmlFor="trial-role"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Your Role
                </label>

                <select
                  id="trial-role"
                  value={role}
                  onChange={(event) =>
                    setRole(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
                >
                  <option value="">
                    Select your role
                  </option>
                  <option value="Educator">
                    Educator
                  </option>
                  <option value="Room Leader">
                    Room Leader
                  </option>
                  <option value="Early Childhood Teacher">
                    Early Childhood Teacher
                  </option>
                  <option value="Educational Leader">
                    Educational Leader
                  </option>
                  <option value="Centre Director">
                    Centre Director
                  </option>
                  <option value="Approved Provider">
                    Approved Provider
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="trial-service"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Centre Name, Optional
                </label>

                <input
                  id="trial-service"
                  type="text"
                  value={serviceName}
                  onChange={(event) =>
                    setServiceName(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
                />
              </div>

              <div>
                <label
                  htmlFor="trial-age-group"
                  className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Room or Age Group
                </label>

                <select
                  id="trial-age-group"
                  value={ageGroup}
                  onChange={(event) =>
                    setAgeGroup(event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
                >
                  <option value="">
                    Select an area
                  </option>
                  <option value="Babies and Nursery">
                    Babies and Nursery
                  </option>
                  <option value="Toddlers">
                    Toddlers
                  </option>
                  <option value="Preschool and Kindergarten">
                    Preschool and Kindergarten
                  </option>
                  <option value="Whole Centre">
                    Whole Centre
                  </option>
                  <option value="Leadership">
                    Leadership
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="trial-content"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Which Content Did You Try?
              </label>

              <textarea
                id="trial-content"
                rows={3}
                value={contentTried}
                onChange={(event) =>
                  setContentTried(event.target.value)
                }
                placeholder="For example: Ladder 1 rungs 1 to 4, the rough play scenario, or the printable educator cards."
                className="w-full rounded-xl border border-slate-300 p-3.5 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div>
              <label
                htmlFor="trial-useful"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                What Was Useful?
              </label>

              <textarea
                id="trial-useful"
                rows={4}
                required
                value={usefulFeedback}
                onChange={(event) =>
                  setUsefulFeedback(event.target.value)
                }
                placeholder="Tell us what felt practical, relevant or easy to use."
                className="w-full rounded-xl border border-slate-300 p-3.5 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div>
              <label
                htmlFor="trial-unclear"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                What Felt Unclear?
              </label>

              <textarea
                id="trial-unclear"
                rows={3}
                value={unclearFeedback}
                onChange={(event) =>
                  setUnclearFeedback(event.target.value)
                }
                placeholder="Tell us where you needed more explanation or a clearer example."
                className="w-full rounded-xl border border-slate-300 p-3.5 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div>
              <label
                htmlFor="trial-improvement"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                What Would Make This Easier to Use?
              </label>

              <textarea
                id="trial-improvement"
                rows={3}
                value={improvementFeedback}
                onChange={(event) =>
                  setImprovementFeedback(
                    event.target.value,
                  )
                }
                placeholder="For example: shorter text, more videos, room examples, printable prompts or team discussion questions."
                className="w-full rounded-xl border border-slate-300 p-3.5 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
              />
            </div>

            <div>
              <label
                htmlFor="trial-team-use"
                className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
              >
                Would You Use This With Your Team?
              </label>

              <select
                id="trial-team-use"
                value={wouldUseWithTeam}
                onChange={(event) =>
                  setWouldUseWithTeam(event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
              >
                <option value="">
                  Select an answer
                </option>
                <option value="yes">Yes</option>
                <option value="no">Not yet</option>
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
                <input
                  type="checkbox"
                  checked={contactPermission}
                  onChange={(event) =>
                    setContactPermission(
                      event.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 rounded border-slate-400 text-teal-700 focus:ring-teal-600"
                />

                <span>
                  Play Move Improve may contact me about my
                  feedback.
                </span>
              </label>

              {contactPermission && (
                <div className="mt-4">
                  <label
                    htmlFor="trial-email"
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700"
                  >
                    Email Address
                  </label>

                  <input
                    id="trial-email"
                    type="email"
                    required={contactPermission}
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-200"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={
                submissionState === 'submitting'
              }
              className="w-full rounded-xl bg-teal-800 px-6 py-3.5 text-sm font-bold text-white shadow transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submissionState === 'submitting'
                ? 'Submitting Feedback...'
                : 'Submit Feedback'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}