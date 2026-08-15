'use client';

import Link from 'next/link';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';
import {
  FormEvent,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from 'react';

type ValidateAccessResponse = {
  success?: boolean;
  error?: string;
};

type AccessStatusResponse = {
  success?: boolean;
  hasAccess?: boolean;
};

function getSafeReturnPath(
  value: string | null,
): string {
  if (!value) {
    return '/portal';
  }

  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('://')
  ) {
    return '/portal';
  }

  return value;
}

function MemberAccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnTo = useMemo(
    () =>
      getSafeReturnPath(
        searchParams.get('returnTo'),
      ),
    [searchParams],
  );

  const [accessCode, setAccessCode] =
    useState('');

  const [
    isCheckingExistingAccess,
    setIsCheckingExistingAccess,
  ] = useState(true);

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');

  useEffect(() => {
    let isMounted = true;

    const checkExistingAccess =
      async () => {
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

          if (
            response.ok &&
            result.success === true &&
            result.hasAccess === true
          ) {
            router.replace(returnTo);
            return;
          }
        } catch (error) {
          console.error(
            'Existing member access check failed:',
            error,
          );
        } finally {
          if (isMounted) {
            setIsCheckingExistingAccess(
              false,
            );
          }
        }
      };

    void checkExistingAccess();

    return () => {
      isMounted = false;
    };
  }, [returnTo, router]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const cleanCode =
      accessCode.trim();

    if (!cleanCode) {
      setErrorMessage(
        'Please enter your service access code.',
      );

      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(
        '/api/validate-access',
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
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
            'That access code was not recognised. Please check the code supplied to your service.',
        );

        return;
      }

      const statusResponse =
        await fetch(
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

      setAccessCode('');

      router.replace(returnTo);
      router.refresh();
    } catch (error) {
      console.error(
        'Member access submission failed:',
        error,
      );

      setErrorMessage(
        'We could not check your access code. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (
    isCheckingExistingAccess
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] px-6">
        <div className="space-y-4 text-center">
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-teal-800 border-t-transparent"
            aria-label="Checking member access"
          />

          <p className="text-xs font-semibold text-slate-500">
            Checking member access…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-6 py-12 font-sans text-slate-800">
      <main className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <section className="w-full space-y-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-md">
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

          <div className="space-y-2">
            <span className="block text-[10px] font-bold uppercase tracking-widest text-teal-800">
              Regulator Champions
            </span>

            <h1 className="text-2xl font-extrabold text-slate-900">
              Member Access
            </h1>

            <p className="text-sm leading-relaxed text-slate-600">
              Enter the service access code supplied to your centre to open your Regulator Champions member resources.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="member-access-code"
                className="mb-1 block text-[10px] font-bold uppercase tracking-wider text-slate-700"
              >
                Service Access Code
              </label>

              <input
                id="member-access-code"
                name="member-access-code"
                type="password"
                required
                maxLength={100}
                autoComplete="off"
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(event) =>
                  setAccessCode(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-3.5 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-teal-700"
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
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-teal-800 py-3.5 text-sm font-bold text-white transition hover:bg-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Checking access…'
                : 'Open Member Resources →'}
            </button>
          </form>

          <div className="space-y-3 border-t border-slate-100 pt-5">
            <p className="text-xs leading-relaxed text-slate-500">
              Access is provided to participating services. Keep your service code within your authorised educator team.
            </p>

            <Link
              href="/proposal?plan=preview"
              className="inline-block text-xs font-bold text-teal-800 hover:underline"
            >
              Need Regulator Champions access? View program options →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function MemberAccessFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7] px-6">
      <div className="space-y-4 text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-teal-800 border-t-transparent"
          aria-label="Loading member access"
        />

        <p className="text-xs font-semibold text-slate-500">
          Loading member access…
        </p>
      </div>
    </div>
  );
}

export default function MemberAccessPage() {
  return (
    <Suspense
      fallback={
        <MemberAccessFallback />
      }
    >
      <MemberAccessContent />
    </Suspense>
  );
}