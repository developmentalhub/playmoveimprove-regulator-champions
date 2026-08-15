'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface PasscodeGateProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

type AccessStatusResponse = {
  success?: boolean;
  hasAccess?: boolean;
};

type ValidateAccessResponse = {
  success?: boolean;
  error?: string;
};

export default function PasscodeGate({
  children,
  title = 'Member Hub Access Code Required',
  subtitle = 'Enter your centre access code to unlock your member resources.',
}: PasscodeGateProps) {
  const [isUnlocked, setIsUnlocked] =
    useState<boolean | null>(null);

  const [passcode, setPasscode] =
    useState('');

  const [errorMessage, setErrorMessage] =
    useState('');

  const [isChecking, setIsChecking] =
    useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkExistingAccess = async () => {
      try {
        const response = await fetch(
          '/api/access-status',
          {
            method: 'GET',
            cache: 'no-store',
          },
        );

        const result =
          (await response.json()) as AccessStatusResponse;

        if (!isMounted) {
          return;
        }

        setIsUnlocked(
          response.ok &&
            result.success === true &&
            result.hasAccess === true,
        );
      } catch (error) {
        console.error(
          'Member access status check failed:',
          error,
        );

        if (isMounted) {
          setIsUnlocked(false);
        }
      }
    };

    void checkExistingAccess();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleUnlock = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanCode = passcode.trim();

    if (!cleanCode) {
      setErrorMessage(
        'Please enter your centre access code.',
      );

      return;
    }

    setIsChecking(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        '/api/validate-access',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            accessCode: cleanCode,
          }),
        },
      );

      const result =
        (await response.json()) as ValidateAccessResponse;

      if (
        !response.ok ||
        result.success !== true
      ) {
        setErrorMessage(
          result.error ||
            'That access code was not recognised. Please check your code or contact your Centre Director.',
        );

        return;
      }

      const statusResponse = await fetch(
        '/api/access-status',
        {
          method: 'GET',
          cache: 'no-store',
        },
      );

      const statusResult =
        (await statusResponse.json()) as AccessStatusResponse;

      if (
        !statusResponse.ok ||
        statusResult.success !== true ||
        statusResult.hasAccess !== true
      ) {
        setErrorMessage(
          'Your code was accepted, but the secure member session could not be confirmed. Please try again.',
        );

        return;
      }

      setIsUnlocked(true);
      setPasscode('');
    } catch (error) {
      console.error(
        'Member access unlock failed:',
        error,
      );

      setErrorMessage(
        'We could not check your access code. Please try again.',
      );
    } finally {
      setIsChecking(false);
    }
  };

  if (isUnlocked === null) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FDFBF7]">
        <div
          className="h-8 w-8 animate-spin rounded-full border-4 border-teal-800 border-t-transparent"
          aria-label="Checking member access"
        />
      </div>
    );
  }

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-[75vh] items-center justify-center bg-[#FDFBF7] px-6 py-12">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-md">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-200 bg-teal-50 text-teal-800">
          <svg
            className="h-7 w-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <div className="space-y-1">
          <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
            Member Area
          </span>

          <h1 className="text-xl font-extrabold text-slate-900">
            {title}
          </h1>

          <p className="text-xs leading-relaxed text-slate-600">
            {subtitle}
          </p>
        </div>

        <form
          onSubmit={handleUnlock}
          className="space-y-4 text-left"
        >
          <div>
            <label
              htmlFor="centre-access-code"
              className="mb-1 block text-[10px] font-bold uppercase text-slate-700"
            >
              Centre Access Code
            </label>

            <input
              id="centre-access-code"
              name="centre-access-code"
              type="password"
              required
              maxLength={100}
              autoComplete="off"
              placeholder="Enter your access code"
              value={passcode}
              onChange={(event) =>
                setPasscode(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-300 p-3.5 text-xs text-slate-900 outline-none focus:ring-2 focus:ring-teal-700"
            />
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold leading-relaxed text-rose-700"
            >
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isChecking}
            className="w-full rounded-2xl bg-teal-800 py-3.5 text-xs font-bold text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isChecking
              ? 'Checking access…'
              : 'Unlock Member Content →'}
          </button>
        </form>

        <div className="space-y-2 border-t border-slate-100 pt-4">
          <p className="text-[11px] text-slate-500">
            Need an access code for your service?
          </p>

          <Link
            href="/proposal?plan=preview"
            className="inline-block text-xs font-bold text-teal-800 hover:underline"
          >
            View Regulator Champions options →
          </Link>
        </div>
      </div>
    </div>
  );
}