'use client';

import Link from 'next/link';
import {
  useState,
} from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] =
    useState('');

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    message,
    setMessage,
  ] = useState('');

  const [
    error,
    setError,
  ] = useState('');

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage('');
    setError('');

    try {
      const cleanedEmail =
        email
          .trim()
          .toLowerCase();

      if (
        !cleanedEmail ||
        !cleanedEmail.includes('@')
      ) {
        setError(
          'Please enter a valid email address.',
        );

        return;
      }

      const response =
        await fetch(
          '/api/rc-auth/forgot-password',
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json',
            },
            body: JSON.stringify({
              email:
                cleanedEmail,
            }),
          },
        );

      const result =
        await response
          .json()
          .catch(() => null);

      if (
        !response.ok ||
        !result?.success
      ) {
        setError(
          result?.error ||
            'We could not send the password reset email. Please try again.',
        );

        return;
      }

      setMessage(
        result.message ||
          'Check your email for your secure password reset link.',
      );
    } catch (
      submitError
    ) {
      console.error(
        'Password reset error:',
        submitError,
      );

      setError(
        'Something went wrong. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-12 text-[#12362F] sm:py-16">
      <section className="mx-auto max-w-xl">
        <div className="rounded-4xl border border-[#E5DED4] bg-white p-7 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
            Play Move Improve
          </p>

          <p className="mt-2 text-sm font-bold text-[#8A6F3E]">
            Regulator Champions Program
          </p>

          <h1 className="mt-5 text-3xl font-extrabold sm:text-4xl">
            Reset your password
          </h1>

          <p className="mt-4 leading-7 text-[#5E6D67]">
            Enter the email address connected to your Regulator Champions account and we&apos;ll send you a secure link to choose a new password.
          </p>

          {message ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm font-semibold text-emerald-800">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm font-semibold text-rose-800">
              {error}
            </div>
          ) : null}

          <form
            onSubmit={
              handleSubmit
            }
            className="mt-7 space-y-5"
          >
            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Email address
              </span>

              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(
                  event,
                ) =>
                  setEmail(
                    event.target
                      .value,
                  )
                }
                className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
              />
            </label>

            <button
              type="submit"
              disabled={
                isSubmitting
              }
              className="min-h-14 w-full rounded-2xl bg-[#12362F] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Sending reset link…'
                : 'Send password reset link'}
            </button>
          </form>

          <div className="mt-7 border-t border-[#E5DED4] pt-6">
            <Link
              href="/member-access"
              className="text-sm font-extrabold text-[#8A6F3E]"
            >
              ← Back to login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}