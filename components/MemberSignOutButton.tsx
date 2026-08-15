'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function MemberSignOutButton() {
  const router = useRouter();

  const [isSigningOut, setIsSigningOut] =
    useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      const response = await fetch(
        '/api/member-signout',
        {
          method: 'POST',
        },
      );

      const result = await response.json();

      if (
        !response.ok ||
        result.success !== true
      ) {
        throw new Error(
          result.error ||
            'Member access could not be cleared.',
        );
      }

      router.replace('/member-access');
      router.refresh();
    } catch (error) {
      console.error(
        'Member sign-out failed:',
        error,
      );

      alert(
        'Member access could not be cleared. Please try again.',
      );
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={isSigningOut}
      className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:border-teal-700 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSigningOut
        ? 'Signing out…'
        : 'Sign out of member access'}
    </button>
  );
}