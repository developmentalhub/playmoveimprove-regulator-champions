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
  const searchParams =
    useSearchParams();

  const returnTo = useMemo(
    () =>
      getSafeReturnPath(
        searchParams.get(
          'returnTo',
        ),
      ),
    [searchParams],
  );

  const [
    accessCode,
    setAccessCode,
  ] = useState('');

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
          const response =
            await fetch(
              '/api/access-status',
              {
                method: 'GET',
                cache: 'no-store',
              },
            );

          let result: AccessStatusResponse =
            {};

          try {
            result =
              (await response.json()) as AccessStatusResponse;
          } catch {
            result = {};
          }

          if (!isMounted) {
            return;
          }

          if (
            response.ok &&
            result.success === true &&
            result.hasAccess === true
          ) {
            router.replace(
              returnTo,
            );

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
      const response =
        await fetch(
          '/api/validate-access',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/json',
            },

            body: JSON.stringify({
              accessCode:
                cleanCode,
            }),
          },
        );

      let result: ValidateAccessResponse =
        {};

      try {
        result =
          (await response.json()) as ValidateAccessResponse;
      } catch {
        result = {};
      }

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

      /*
       * Confirm that the newly created
       * signed member cookie can be read
       * before sending the educator into
       * the member portal.
       */
      const statusResponse =
        await fetch(
          '/api/access-status',
          {
            method: 'GET',
            cache: 'no-store',
          },
        );

      let statusResult: AccessStatusResponse =
        {};

      try {
        statusResult =
          (await statusResponse.json()) as AccessStatusResponse;
      } catch {
        statusResult = {};
      }

      if (
        !statusResponse.ok ||
        statusResult.success !==
          true ||
        statusResult.hasAccess !==
          true
      ) {
        setErrorMessage(
          'Your code was accepted, but the secure member session could not be confirmed. Please try again.',
        );

        return;
      }

      setAccessCode('');

      router.replace(
        returnTo,
      );

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
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6">
        <div className="space-y-4 text-center">
          <div
            className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#1C3B34] border-t-transparent"
            aria-label="Checking member access"
          />

          <p className="text-xs font-semibold text-[#657B6C]">
            Checking member
            access…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-6 py-12 font-sans text-[#1C3B34]">
      <main className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <section className="w-full space-y-6 rounded-3xl border border-[#E6E2DC] bg-white p-8 text-center shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D8E3DE] bg-[#EEF3F0] text-[#1C3B34]">
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
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#C29F60]">
              Regulator Champions
            </span>

            <h1 className="text-2xl font-bold text-[#1C3B34]">
              Member Access
            </h1>

            <p className="text-sm leading-relaxed text-[#657B6C]">
              Enter the service
              access code supplied
              to your centre to
              open your Regulator
              Champions member
              space.
            </p>
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="member-access-code"
                className="mb-1 block text-[10px] font-black uppercase tracking-wider text-[#657B6C]"
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
                autoCapitalize="characters"
                spellCheck={false}
                placeholder="Enter your access code"
                value={accessCode}
                onChange={(
                  event,
                ) =>
                  setAccessCode(
                    event.target
                      .value,
                  )
                }
                className="w-full rounded-xl border border-[#D8D4CE] bg-white p-3.5 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C] focus:ring-2 focus:ring-[#D8E3DE]"
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
              disabled={
                isSubmitting
              }
              className="w-full rounded-2xl bg-[#1C3B34] py-3.5 text-sm font-bold text-white transition hover:bg-[#294E45] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Checking access…'
                : 'Open Member Hub →'}
            </button>
          </form>

          <div className="space-y-3 border-t border-[#E6E2DC] pt-5">
            <p className="text-xs leading-relaxed text-[#657B6C]">
              Access is provided
              to participating
              services. Keep your
              service code within
              your authorised
              educator team.
            </p>

            <Link
              href="/proposal?plan=preview"
              className="inline-block text-xs font-bold text-[#1C3B34] underline-offset-4 hover:underline"
            >
              Need Regulator
              Champions access?
              View program options
              →
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

function MemberAccessFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6">
      <div className="space-y-4 text-center">
        <div
          className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-[#1C3B34] border-t-transparent"
          aria-label="Loading member access"
        />

        <p className="text-xs font-semibold text-[#657B6C]">
          Loading member
          access…
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