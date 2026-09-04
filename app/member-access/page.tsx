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
        searchParams.get('returnTo'),
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
              accessCode: cleanCode,
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

  if (isCheckingExistingAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6">
        <div className="space-y-4 text-center">
          <div
            className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#1C3B34] border-t-transparent"
            aria-label="Checking member access"
          />

          <p className="text-base font-semibold text-[#657B6C]">
            Checking member access…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C3B34]">
      <main className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT */}
        <section className="flex items-center bg-[#1C3B34] px-6 py-12 text-white sm:px-10 lg:px-14">
          <div className="max-w-2xl">
            <p className="text-base font-semibold text-[#E4C98E]">
              Regulator Champions
            </p>

            <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
              Come in when you need help making sense of what is happening in the room.
            </h1>

            <p className="mt-6 text-xl leading-relaxed text-[#D8E1DC]">
              The Member Hub is here so your team can return to the Regulation Ladders, practical resources and recordings when something is difficult, rather than trying to remember everything from one training session.
            </p>

            <p className="mt-4 text-lg leading-relaxed text-[#C8D6D0]">
              You do not need to work through everything in order. Start with the situation that is actually happening for your team.
            </p>

            <div className="mt-9 border-y border-white/20">
              <MemberUseRow
                title="Something keeps happening"
                text="Choose the Regulation Ladder that sounds closest to the situation your team is dealing with."
              />

              <MemberUseRow
                title="You want another idea"
                text="Use the educator, manager or family cards to look at the same situation from a different perspective."
              />

              <MemberUseRow
                title="You have more time later"
                text="Return to a recording or practical resource when there is enough space to think more deeply."
              />

              <MemberUseRow
                title="You are still unsure"
                text="Submit a de-identified question for Robyn to consider or join a live session when that is useful."
              />
            </div>
          </div>
        </section>

        {/* RIGHT */}
        <section className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
          <div className="w-full max-w-lg">
            <p className="text-base font-semibold text-[#9A793D]">
              Member Login
            </p>

            <h2 className="mt-2 text-3xl font-extrabold text-[#1C3B34] sm:text-4xl">
              Open your service hub.
            </h2>

            <p className="mt-4 text-lg leading-relaxed text-[#65736D]">
              Enter the access code supplied to your service. Authorised educators in the same service can use the shared service code to open the Member Hub.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 border-y border-[#E5DED4] bg-white py-7"
            >
              <label
                htmlFor="member-access-code"
                className="block text-base font-extrabold text-[#1C3B34]"
              >
                Service access code
              </label>

              <p className="mt-2 text-sm leading-relaxed text-[#65736D]">
                Your director or service leader should have received this when your service joined Regulator Champions.
              </p>

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
                onChange={(event) =>
                  setAccessCode(
                    event.target.value,
                  )
                }
                className="mt-4 min-h-14 w-full rounded-2xl border-2 border-[#D8D4CE] bg-white p-4 text-lg text-[#1C3B34] outline-none transition focus:border-[#657B6C] focus:ring-2 focus:ring-[#D8E3DE]"
              />

              {errorMessage && (
                <p
                  role="alert"
                  className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold leading-relaxed text-rose-700"
                >
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#1C3B34] px-6 py-4 text-base font-extrabold text-white transition hover:bg-[#294E45] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Checking access…'
                  : 'Open my Member Hub'}
              </button>
            </form>

            {/* NEW MEMBERS */}
            <div className="mt-7">
              <h3 className="text-xl font-extrabold text-[#1C3B34]">
                New to Regulator Champions?
              </h3>

              <p className="mt-3 text-base leading-relaxed text-[#65736D]">
                You do not need to explore everything on your first visit. Once you are inside, start with the Regulation Ladder that sounds closest to what is happening in your room, or open a recording if that is what your team needs today.
              </p>

              <p className="mt-3 text-base leading-relaxed text-[#65736D]">
                There is no expectation that every educator moves through the hub at the same pace.
              </p>
            </div>

            <div className="mt-7 border-t border-[#E5DED4] pt-6">
              <p className="text-sm leading-relaxed text-[#657B6C]">
                Access is for participating services and their authorised educator teams. Please keep your service code within your team.
              </p>

              <Link
                href="/pricing"
                className="mt-4 inline-flex text-sm font-semibold text-[#1C3B34] underline-offset-4 hover:underline"
              >
                Looking for Regulator Champions options?
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function MemberUseRow({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="border-b border-white/20 py-5 last:border-b-0">
      <h3 className="text-lg font-extrabold text-white">
        {title}
      </h3>

      <p className="mt-2 text-base leading-relaxed text-[#C8D6D0]">
        {text}
      </p>
    </div>
  );
}

function MemberAccessFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6">
      <div className="space-y-4 text-center">
        <div
          className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#1C3B34] border-t-transparent"
          aria-label="Loading member access"
        />

        <p className="text-base font-semibold text-[#657B6C]">
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