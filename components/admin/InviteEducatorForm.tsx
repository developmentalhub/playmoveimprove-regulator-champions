'use client';

import {
  useActionState,
} from 'react';

type ActionState = {
  success?: boolean;
  message?: string;
};

type Props = {
  serviceId: string;
  seatsUsed: number;
  seatLimit: number;
  action: (
    previousState: ActionState,
    formData: FormData,
  ) => Promise<ActionState>;
};

const initialState: ActionState = {};

export default function InviteEducatorForm({
  serviceId,
  seatsUsed,
  seatLimit,
  action,
}: Props) {
  const [
    state,
    formAction,
    pending,
  ] = useActionState(
    action,
    initialState,
  );

  const serviceFull =
    seatsUsed >= seatLimit;

  return (
    <div className="rounded-4xl border border-[#E6E2DC] bg-white p-6 shadow-sm md:p-8">
      <div>
        <p className="text-xs font-black uppercase tracking-wider text-[#C29F60]">
          Add team member
        </p>

        <h2 className="mt-2 text-2xl font-bold">
          Invite an educator
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-7 text-[#657B6C]">
          The educator will receive their
          personal invitation by email.
          Sending an invitation does not use
          a seat. A seat is counted when they
          activate their account.
        </p>
      </div>

      {serviceFull ? (
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-900">
          All {seatLimit} seats are currently
          in use. Remove an educator before
          inviting another person.
        </div>
      ) : (
        <form
          action={formAction}
          className="mt-6"
        >
          <input
            type="hidden"
            name="serviceId"
            value={serviceId}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Educator name
              </span>

              <input
                type="text"
                name="educatorName"
                placeholder="Optional"
                className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-bold">
                Educator email
              </span>

              <input
                type="email"
                name="educatorEmail"
                required
                placeholder="educator@example.com"
                className="min-h-14 w-full rounded-xl border border-[#D8D2C9] bg-white px-4 text-base outline-none focus:border-[#C29F60] focus:ring-2 focus:ring-[#C29F60]/20"
              />
            </label>
          </div>

          {state.message ? (
            <div
              className={`mt-4 rounded-xl px-4 py-3 text-sm font-semibold ${
                state.success
                  ? 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                  : 'border border-rose-200 bg-rose-50 text-rose-800'
              }`}
            >
              {state.message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-5 min-h-13 rounded-xl bg-[#1C3B34] px-6 py-3 text-sm font-extrabold text-white transition hover:bg-[#29483F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending
              ? 'Sending invitation…'
              : 'Send educator invitation'}
          </button>
        </form>
      )}
    </div>
  );
}