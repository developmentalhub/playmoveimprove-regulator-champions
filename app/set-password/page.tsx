'use client';

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import {
  createRcBrowserClient,
} from '@/lib/rcAuth';

type PageState =
  | 'checking'
  | 'ready'
  | 'saving'
  | 'success'
  | 'invalid';

export default function SetPasswordPage() {
  const router =
    useRouter();

  const supabase =
    useMemo(
      () =>
        createRcBrowserClient(),
      [],
    );

  const [
    pageState,
    setPageState,
  ] =
    useState<PageState>(
      'checking',
    );

  const [
    password,
    setPassword,
  ] =
    useState('');

  const [
    confirmPassword,
    setConfirmPassword,
  ] =
    useState('');

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState('');

  useEffect(() => {
    let cancelled =
      false;

    async function prepareRecoverySession() {
      try {
        const url =
          new URL(
            window.location.href,
          );

        /*
         * Supabase PKCE recovery links
         * normally arrive with ?code=...
         */
        const code =
          url.searchParams.get(
            'code',
          );

        if (code) {
          const {
            error:
              exchangeError,
          } =
            await supabase.auth
              .exchangeCodeForSession(
                code,
              );

          if (
            exchangeError
          ) {
            console.error(
              'Password recovery code exchange failed:',
              exchangeError,
            );
          } else {
            /*
             * Remove the one-time
             * recovery code from the
             * address bar after use.
             */
            window.history.replaceState(
              {},
              '',
              '/set-password',
            );
          }
        }

        /*
         * Support older Supabase
         * recovery URLs that provide
         * tokens in the URL hash.
         */
        const hash =
          new URLSearchParams(
            window.location.hash
              .replace(
                /^#/,
                '',
              ),
          );

        const accessToken =
          hash.get(
            'access_token',
          );

        const refreshToken =
          hash.get(
            'refresh_token',
          );

        if (
          accessToken &&
          refreshToken
        ) {
          const {
            error:
              sessionError,
          } =
            await supabase.auth
              .setSession({
                access_token:
                  accessToken,
                refresh_token:
                  refreshToken,
              });

          if (
            sessionError
          ) {
            console.error(
              'Password recovery session could not be established:',
              sessionError,
            );
          } else {
            window.history.replaceState(
              {},
              '',
              '/set-password',
            );
          }
        }

        const {
          data,
          error:
            sessionLookupError,
        } =
          await supabase.auth
            .getSession();

        if (
          sessionLookupError
        ) {
          console.error(
            'Could not check password recovery session:',
            sessionLookupError,
          );
        }

        if (cancelled) {
          return;
        }

        if (
          data.session
        ) {
          setPageState(
            'ready',
          );
          return;
        }

        /*
         * Some Supabase recovery
         * redirects complete their
         * session asynchronously.
         * Give the auth client a
         * brief chance to finish.
         */
        await new Promise(
          (resolve) =>
            setTimeout(
              resolve,
              500,
            ),
        );

        const {
          data:
            secondCheck,
        } =
          await supabase.auth
            .getSession();

        if (cancelled) {
          return;
        }

        if (
          secondCheck.session
        ) {
          setPageState(
            'ready',
          );
        } else {
          setPageState(
            'invalid',
          );
        }
      } catch (error) {
        console.error(
          'Password setup page failed:',
          error,
        );

        if (!cancelled) {
          setPageState(
            'invalid',
          );
        }
      }
    }

    const {
      data:
        authListener,
    } =
      supabase.auth
        .onAuthStateChange(
          (
            event,
            session,
          ) => {
            if (
              cancelled
            ) {
              return;
            }

            if (
              (
                event ===
                  'PASSWORD_RECOVERY' ||
                event ===
                  'SIGNED_IN'
              ) &&
              session
            ) {
              setPageState(
                'ready',
              );
            }
          },
        );

    prepareRecoverySession();

    return () => {
      cancelled =
        true;

      authListener
        .subscription
        .unsubscribe();
    };
  }, [
    supabase,
  ]);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setErrorMessage('');

    if (
      password.length <
      8
    ) {
      setErrorMessage(
        'Please choose a password with at least 8 characters.',
      );
      return;
    }

    if (
      password !==
      confirmPassword
    ) {
      setErrorMessage(
        'The two passwords do not match.',
      );
      return;
    }

    setPageState(
      'saving',
    );

    try {
      const {
        error,
      } =
        await supabase.auth
          .updateUser({
            password,
          });

      if (error) {
        console.error(
          'Password update failed:',
          error,
        );

        setErrorMessage(
          error.message ||
            'Your password could not be saved. Please request a new password link and try again.',
        );

        setPageState(
          'ready',
        );

        return;
      }

      setPageState(
        'success',
      );

      setTimeout(
        () => {
          router.replace(
            '/portal',
          );

          router.refresh();
        },
        900,
      );
    } catch (error) {
      console.error(
        'Unexpected password update error:',
        error,
      );

      setErrorMessage(
        'Your password could not be saved. Please try again.',
      );

      setPageState(
        'ready',
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-4 py-10 text-[#12362F] md:px-6 md:py-16">
      <section className="mx-auto max-w-xl">
        <div className="rounded-4xl border border-[#E5DED4] bg-white p-6 shadow-sm md:p-10">
          <div className="mb-8">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
              Play Move Improve
            </span>

            <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
              Set your Regulator
              Champions password
            </h1>

            <p className="mt-4 text-base leading-7 text-[#5E6D67]">
              Choose the password
              you&apos;ll use to
              access your Regulator
              Champions account.
            </p>
          </div>

          {pageState ===
            'checking' && (
            <div className="rounded-2xl bg-[#FAF5EC] p-5 text-sm font-semibold text-[#526A60]">
              Checking your secure
              password link…
            </div>
          )}

          {pageState ===
            'invalid' && (
            <div className="space-y-5">
              <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <h2 className="text-lg font-bold text-[#12362F]">
                  This password link
                  has expired or
                  cannot be used.
                </h2>

                <p className="mt-2 text-sm leading-7 text-[#5E6D67]">
                  Password setup
                  links are secure
                  one-time links. You
                  can request another
                  password email from
                  the login page.
                </p>
              </div>

              <a
                href="/member-access"
                className="flex min-h-14 w-full items-center justify-center rounded-2xl bg-[#12362F] px-6 py-3 text-center text-sm font-extrabold text-white"
              >
                Go to login
              </a>
            </div>
          )}

          {(pageState ===
            'ready' ||
            pageState ===
              'saving') && (
            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-5"
            >
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-bold text-[#12362F]"
                >
                  New password
                </label>

                <input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={
                    password
                  }
                  onChange={(
                    event,
                  ) =>
                    setPassword(
                      event
                        .target
                        .value,
                    )
                  }
                  required
                  minLength={
                    8
                  }
                  disabled={
                    pageState ===
                    'saving'
                  }
                  className="min-h-14 w-full rounded-2xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] focus:border-[#C29F60] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
                />

                <p className="mt-2 text-xs text-[#6B7772]">
                  Use at least 8
                  characters.
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-bold text-[#12362F]"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={
                    confirmPassword
                  }
                  onChange={(
                    event,
                  ) =>
                    setConfirmPassword(
                      event
                        .target
                        .value,
                    )
                  }
                  required
                  minLength={
                    8
                  }
                  disabled={
                    pageState ===
                    'saving'
                  }
                  className="min-h-14 w-full rounded-2xl border border-[#D8D2C9] bg-white px-4 text-base text-[#12362F] focus:border-[#C29F60] focus:outline-none focus:ring-2 focus:ring-[#E0BC68]"
                />
              </div>

              {errorMessage && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm font-semibold text-rose-700">
                  {
                    errorMessage
                  }
                </div>
              )}

              <button
                type="submit"
                disabled={
                  pageState ===
                  'saving'
                }
                className="min-h-14 w-full rounded-2xl bg-[#12362F] px-6 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pageState ===
                'saving'
                  ? 'Saving password…'
                  : 'Save password and continue'}
              </button>
            </form>
          )}

          {pageState ===
            'success' && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <h2 className="text-xl font-bold text-emerald-900">
                Your password is
                ready.
              </h2>

              <p className="mt-2 text-sm leading-7 text-emerald-800">
                Taking you to your
                Regulator Champions
                dashboard…
              </p>
            </div>
          )}
        </div>

        <p className="mt-5 text-center text-xs leading-6 text-[#6B7772]">
          Regulator Champions
          Program · Play Move
          Improve
        </p>
      </section>
    </main>
  );
}