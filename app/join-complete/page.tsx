'use client';

import {
  Suspense,
  useEffect,
  useState,
} from 'react';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import {
  createRcBrowserClient,
} from '@/lib/rcAuthClient';

function JoinCompleteContent() {
  const router =
    useRouter();

  const searchParams =
    useSearchParams();

  const [
    message,
    setMessage,
  ] = useState(
    'Opening your Regulator Champions account…',
  );

  useEffect(() => {
    async function finishJoin() {
      const email =
        searchParams.get(
          'email',
        );

      const password =
        searchParams.get(
          'password',
        );

      if (
        !email ||
        !password
      ) {
        setMessage(
          'Your account could not be opened. Please return to the login page.',
        );

        return;
      }

      const supabase =
        createRcBrowserClient();

      const {
        error,
      } =
        await supabase.auth.signInWithPassword(
          {
            email,
            password,
          },
        );

      if (error) {
        console.error(
          'Join completion sign-in failed:',
          error,
        );

        setMessage(
          'Your account has been created, but we could not sign you in automatically. Please use the login page.',
        );

        return;
      }

      router.replace(
        '/platform/educator/dashboard',
      );

      router.refresh();
    }

    void finishJoin();
  }, [
    router,
    searchParams,
  ]);

  return (
    <main className="min-h-screen bg-[#FAF8F5] px-5 py-16 text-[#232150]">
      <div className="mx-auto max-w-xl rounded-3xl border border-[#E4E1EA] bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#87317E]">
          Regulator Champions
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Setting up your access
        </h1>

        <p className="mt-4 leading-7 text-[#575570]">
          {message}
        </p>
      </div>
    </main>
  );
}

export default function JoinCompletePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#FAF8F5] px-5 py-16 text-[#232150]">
          <div className="mx-auto max-w-xl rounded-3xl border border-[#E4E1EA] bg-white p-8 text-center shadow-sm">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#87317E]">
              Regulator Champions
            </p>

            <h1 className="mt-4 text-3xl font-bold">
              Setting up your access
            </h1>

            <p className="mt-4 leading-7 text-[#575570]">
              Opening your account…
            </p>
          </div>
        </main>
      }
    >
      <JoinCompleteContent />
    </Suspense>
  );
}