'use client';

import {
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import {
  createRcBrowserClient,
} from '@/lib/rcAuthClient';

export default function MemberSignOutButton() {
  const router =
    useRouter();

  const [
    isSigningOut,
    setIsSigningOut,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState('');

  async function handleSignOut() {
    setIsSigningOut(true);
    setError('');

    try {
      const supabase =
        createRcBrowserClient();

      const {
        error:
          signOutError,
      } =
        await supabase.auth
          .signOut();

      if (signOutError) {
        throw signOutError;
      }

      router.replace(
        '/member-access',
      );

      router.refresh();
    } catch (
      signOutError
    ) {
      console.error(
        'Member sign out failed:',
        signOutError,
      );

      setError(
        'Member access could not be cleared. Please try again.',
      );

      setIsSigningOut(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={
          handleSignOut
        }
        disabled={
          isSigningOut
        }
        className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-2 text-sm font-bold text-[#12362F] transition hover:bg-[#F6F2EC] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSigningOut
          ? 'Signing out…'
          : 'Sign out'}
      </button>

      {error ? (
        <p className="mt-2 max-w-xs text-xs font-semibold text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}