'use client';

import { useState } from 'react';

type Props = {
  reportId: string;
  reportName: string;
  action: (
    formData: FormData,
  ) => void | Promise<void>;
};

export default function DeleteProfessionalReportButton({
  reportId,
  reportName,
  action,
}: Props) {
  const [confirming, setConfirming] =
    useState(false);

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() =>
          setConfirming(true)
        }
        className="text-xs font-bold text-rose-700 underline-offset-4 hover:underline"
      >
        Delete report
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
      <p className="text-sm font-bold text-rose-900">
        Delete “{reportName}”?
      </p>

      <p className="mt-2 text-xs leading-5 text-rose-800">
        This removes the saved report
        from your Regulator Champions
        account. Your original learning,
        takeaways, reflections and
        certificates will not be deleted.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <form action={action}>
          <input
            type="hidden"
            name="reportId"
            value={reportId}
          />

          <button
            type="submit"
            className="rounded-xl bg-rose-700 px-4 py-2 text-xs font-bold text-white"
          >
            Yes, delete report
          </button>
        </form>

        <button
          type="button"
          onClick={() =>
            setConfirming(false)
          }
          className="rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-800"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}