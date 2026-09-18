'use client';

import {
  useState,
} from 'react';

type Props = {
  inviteId: string;
  serviceId: string;
  educatorName: string | null;
  educatorEmail: string | null;
  inviteUrl: string;
  createdLabel: string;

  resendAction: (
    formData: FormData,
  ) => void | Promise<void>;

  cancelAction: (
    formData: FormData,
  ) => void | Promise<void>;

  editEmailAction: (
    formData: FormData,
  ) => void | Promise<void>;
};

export default function ManagerPendingInviteCard({
  inviteId,
  serviceId,
  educatorName,
  educatorEmail,
  inviteUrl,
  createdLabel,
  resendAction,
  cancelAction,
  editEmailAction,
}: Props) {
  const [
    copied,
    setCopied,
  ] = useState(false);

  const [
    editing,
    setEditing,
  ] = useState(false);

  const copyInviteLink =
    async () => {
      try {
        await navigator.clipboard
          .writeText(
            inviteUrl,
          );

        setCopied(true);

        window.setTimeout(
          () => {
            setCopied(
              false,
            );
          },
          1800,
        );
      } catch (error) {
        console.error(
          'Could not copy invitation link:',
          error,
        );
      }
    };

  return (
    <article className="rounded-3xl border border-[#E6E2DC] bg-white p-5">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-bold">
            {educatorName ||
              'Name not added'}
          </p>

          <p className="mt-1 wrap-break-word text-sm text-[#657B6C]">
            {educatorEmail ||
              'Email not added'}
          </p>

          <p className="mt-2 text-xs text-[#8B918D]">
            Invited{' '}
            {createdLabel}
          </p>
        </div>

        <div className="w-full max-w-xl">
          <div className="rounded-2xl bg-[#FAF8F5] p-4">
            <p className="text-[10px] font-black uppercase tracking-wider text-[#9A793D]">
              Invitation link
            </p>

            <p className="mt-2 wrap-break-word text-xs leading-5 text-[#526D63]">
              {inviteUrl}
            </p>

            <button
              type="button"
              onClick={
                copyInviteLink
              }
              className="mt-3 text-xs font-extrabold text-[#8A6F3E]"
            >
              {copied
                ? 'Link copied'
                : 'Copy invitation link'}
            </button>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <form
              action={
                resendAction
              }
            >
              <input
                type="hidden"
                name="inviteId"
                value={
                  inviteId
                }
              />

              <input
                type="hidden"
                name="serviceId"
                value={
                  serviceId
                }
              />

              <button
                type="submit"
                className="rounded-xl bg-[#1C3B34] px-4 py-2.5 text-xs font-bold text-white"
              >
                Resend email
              </button>
            </form>

            <button
              type="button"
              onClick={() =>
                setEditing(
                  (current) =>
                    !current,
                )
              }
              className="rounded-xl border border-[#D8D2C9] bg-white px-4 py-2.5 text-xs font-bold text-[#657B6C]"
            >
              {editing
                ? 'Close edit'
                : 'Edit email'}
            </button>

            <form
              action={
                cancelAction
              }
            >
              <input
                type="hidden"
                name="inviteId"
                value={
                  inviteId
                }
              />

              <input
                type="hidden"
                name="serviceId"
                value={
                  serviceId
                }
              />

              <button
                type="submit"
                className="rounded-xl border border-rose-200 bg-white px-4 py-2.5 text-xs font-bold text-rose-700"
              >
                Cancel invite
              </button>
            </form>
          </div>

          {editing ? (
            <form
              action={
                editEmailAction
              }
              className="mt-4 rounded-2xl border border-[#E6E2DC] bg-[#FAF8F5] p-4"
            >
              <input
                type="hidden"
                name="inviteId"
                value={
                  inviteId
                }
              />

              <input
                type="hidden"
                name="serviceId"
                value={
                  serviceId
                }
              />

              <label className="block">
                <span className="text-xs font-bold text-[#657B6C]">
                  Update pending email
                </span>

                <input
                  type="email"
                  required
                  name="educatorEmail"
                  defaultValue={
                    educatorEmail ||
                    ''
                  }
                  className="mt-2 min-h-11 w-full rounded-xl border border-[#D8D2C9] bg-white px-3 text-sm outline-none focus:border-[#C29F60]"
                />
              </label>

              <button
                type="submit"
                className="mt-3 rounded-xl bg-[#657B6C] px-4 py-2.5 text-xs font-bold text-white"
              >
                Save email
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </article>
  );
}