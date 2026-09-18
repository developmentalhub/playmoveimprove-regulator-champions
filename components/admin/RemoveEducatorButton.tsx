'use client';

import { useState } from 'react';

type Props = {
  memberId: string;
  serviceId: string;
  educatorName: string;
  action: (
    formData: FormData,
  ) => void | Promise<void>;
};

export default function RemoveEducatorButton({
  memberId,
  serviceId,
  educatorName,
  action,
}: Props) {
  const [showConfirm, setShowConfirm] =
    useState(false);

  if (!showConfirm) {
    return (
      <button
        type="button"
        onClick={() =>
          setShowConfirm(true)
        }
        className="rounded-xl border border-rose-200 bg-white px-4 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
      >
        Remove
      </button>
    );
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-4 md:w-[360px]">
      <p className="text-sm font-bold text-rose-900">
        Remove {educatorName}?
      </p>

      <p className="mt-2 text-xs leading-5 text-rose-800">
        Removing this educator will end
        their access to Regulator Champions
        and free up their seat for another
        team member. Their completed CPD
        history and certificates will remain
        in your service records.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <form action={action}>
          <input
            type="hidden"
            name="memberId"
            value={memberId}
          />

          <input
            type="hidden"
            name="serviceId"
            value={serviceId}
          />

          <button
            type="submit"
            className="rounded-xl bg-rose-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-rose-800"
          >
            Yes, remove educator
          </button>
        </form>

        <button
          type="button"
          onClick={() =>
            setShowConfirm(false)
          }
          className="rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}