'use client';

import {
  FormEvent,
  Suspense,
  useMemo,
  useState,
} from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import {
  createRcBrowserClient,
} from '@/lib/rcAuthClient';

function getSafeReturnPath(
  value: string | null,
) {
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
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const returnTo =
    useMemo(
      () =>
        getSafeReturnPath(
          searchParams.get(
            'returnTo',
          ),
        ),
      [searchParams],
    );

  const [
    email,
    setEmail,
  ] = useState('');

  const [
    password,
    setPassword,
  ] = useState('');

  const [
    errorMessage,
    setErrorMessage,
  ] = useState('');

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  const handleSubmit =
    async (
      event:
        FormEvent<HTMLFormElement>,
    ) => {
      event.preventDefault();

      setErrorMessage('');
      setIsSubmitting(true);

      try {
        const supabase =
          createRcBrowserClient();

        const {
          data,
          error,
        } =
          await supabase.auth
            .signInWithPassword({
              email:
                email
                  .trim()
                  .toLowerCase(),
              password,
            });

        if (
          error ||
          !data.user
        ) {
          setErrorMessage(
            'That email or password was not recognised.',
          );

          return;
        }

        const response =
          await fetch(
            '/api/rc-auth/check',
            {
              method: 'POST',
              headers: {
                'Content-Type':
                  'application/json',
              },
              body: JSON.stringify({
                accessToken:
                  data.session
                    ?.access_token,
              }),
            },
          );

        const result =
          (await response.json()) as {
            success?: boolean;
            error?: string;
            role?:
              | 'manager'
              | 'educator';
          };

        if (
          !response.ok ||
          result.success !== true
        ) {
          await supabase.auth
            .signOut();

          setErrorMessage(
            result.error ||
              'Your Regulator Champions access could not be confirmed.',
          );

          return;
        }

        router.replace(
          returnTo,
        );

        router.refresh();
      } catch (error) {
        console.error(
          'Regulator Champions login failed:',
          error,
        );

        setErrorMessage(
          'We could not log you in. Please try again.',
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-12 text-[#1C3B34]">
      <section className="mx-auto grid min-h-[80vh] max-w-6xl overflow-hidden rounded-4xl border border-[#E6E2DC] bg-white shadow-sm lg:grid-cols-[1fr_0.9fr]">
        <div className="flex items-center bg-[#1C3B34] p-8 text-white sm:p-12">
          <div className="max-w-xl">
            <p className="text-sm font-bold text-[#F0D99A]">
              Play Move Improve
            </p>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Regulator Champions Program
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#D8E1DC]">
              Your individual login
              keeps your professional
              learning, reflections,
              certificates and service
              progress together in one
              place.
            </p>

            <div className="mt-8 space-y-4 border-t border-white/20 pt-7 text-sm leading-6 text-[#C9D8D2]">
              <p>
                Return to current
                learning topics and
                recordings.
              </p>

              <p>
                Save your own key
                takeaways and
                reflections.
              </p>

              <p>
                Download your CPD
                certificates and
                Professional Learning
                Reports.
              </p>

              <p>
                Access practical
                Regulator Champions
                resources for your
                service.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center p-7 sm:p-10 lg:p-12">
          <div className="w-full">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Member login
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Welcome back
            </h2>

            <p className="mt-3 text-base leading-7 text-[#657B6C]">
              Use the email and password
              connected to your
              Regulator Champions
              account.
            </p>

            <form
              onSubmit={
                handleSubmit
              }
              className="mt-8 space-y-5"
            >
              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Email
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
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold">
                  Password
                </span>

                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={
                    password
                  }
                  onChange={(
                    event,
                  ) =>
                    setPassword(
                      event.target
                        .value,
                    )
                  }
                  className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
                />
              </label>

              {errorMessage ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-800">
                  {
                    errorMessage
                  }
                </div>
              ) : null}

              <button
                type="submit"
                disabled={
                  isSubmitting
                }
                className="min-h-14 w-full rounded-2xl bg-[#1C3B34] px-6 py-3 text-base font-extrabold text-white transition hover:bg-[#29483F] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting
                  ? 'Logging in…'
                  : 'Open my Regulator Champions account'}
              </button>
            </form>

            <div className="mt-7 border-t border-[#E6E2DC] pt-6">
              <p className="text-sm leading-6 text-[#657B6C]">
                New educator? Use the
                invitation link sent by
                your service manager to
                create your account.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function LoadingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F5]">
      <p className="font-semibold text-[#657B6C]">
        Loading…
      </p>
    </main>
  );
}

export default function MemberAccessPage() {
  return (
    <Suspense
      fallback={
        <LoadingPage />
      }
    >
      <MemberAccessContent />
    </Suspense>
  );
}