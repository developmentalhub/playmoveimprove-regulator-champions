'use client';

import {
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

export default function JoinCompletePage() {
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
        sessionStorage.getItem(
          'rc_join_password',
        );

      if (
        !email ||
        !password
      ) {
        router.replace(
          '/member-access',
        );

        return;
      }

      const supabase =
        createRcBrowserClient();

      const {
        error,
      } =
        await supabase.auth
          .signInWithPassword({
            email,
            password,
          });

      sessionStorage.removeItem(
        'rc_join_password',
      );

      if (error) {
        console.error(
          'Automatic educator login failed:',
          error,
        );

        setMessage(
          'Your account was created. Please sign in to continue.',
        );

        setTimeout(() => {
          router.replace(
            `/member-access?email=${encodeURIComponent(
              email,
            )}`,
          );
        }, 1200);

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
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F5] px-6 text-[#1C3B34]">
      <div className="max-w-md text-center">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#C29F60]">
          Play Move Improve
        </p>

        <h1 className="mt-4 text-3xl font-bold">
          Welcome to Regulator Champions
        </h1>

        <p className="mt-4 leading-7 text-[#657B6C]">
          {message}
        </p>
      </div>
    </main>
  );
}