import Link from 'next/link';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { timingSafeEqual } from 'node:crypto';

export const dynamic = 'force-dynamic';

type PageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function passwordsMatch(
  submittedPassword: string,
  savedPassword: string,
) {
  const submitted = Buffer.from(
    submittedPassword,
    'utf8',
  );

  const saved = Buffer.from(
    savedPassword,
    'utf8',
  );

  if (
    submitted.length !== saved.length
  ) {
    return false;
  }

  return timingSafeEqual(
    submitted,
    saved,
  );
}

export default async function RegulatorChampionsAdminLoginPage({
  searchParams,
}: PageProps) {
  const adminToken =
    process.env.REGULATOR_ADMIN_TOKEN;

  if (!adminToken) {
    throw new Error(
      'REGULATOR_ADMIN_TOKEN has not been configured.',
    );
  }

  const cookieStore =
    await cookies();

  const existingSession =
    cookieStore.get(
      'regulator_admin_session',
    )?.value;

  /*
   * If Robyn already has a valid
   * admin session, go directly
   * to the private dashboard.
   */
  if (
    existingSession &&
    existingSession === adminToken
  ) {
    redirect(
      '/admin/regulator-champions',
    );
  }

  const params =
    await searchParams;

  async function loginAdmin(
    formData: FormData,
  ) {
    'use server';

    const submittedPassword =
      String(
        formData.get(
          'adminPassword',
        ) ?? '',
      ).trim();

    const savedAdminToken =
      process.env.REGULATOR_ADMIN_TOKEN;

    if (!savedAdminToken) {
      throw new Error(
        'REGULATOR_ADMIN_TOKEN has not been configured.',
      );
    }

    if (
      !submittedPassword ||
      !passwordsMatch(
        submittedPassword,
        savedAdminToken,
      )
    ) {
      redirect(
        '/admin/regulator-champions/login?error=1',
      );
    }

    const loginCookieStore =
      await cookies();

    loginCookieStore.set(
      'regulator_admin_session',
      savedAdminToken,
      {
        httpOnly: true,
        secure:
          process.env.NODE_ENV ===
          'production',
        sameSite: 'strict',
        path: '/',
        maxAge:
          60 * 60 * 8,
      },
    );

    redirect(
      '/admin/regulator-champions',
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] px-6 py-12 font-sans text-[#1C3B34]">
      <main className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <section className="w-full space-y-6 rounded-3xl border border-[#E6E2DC] bg-white p-8 text-center shadow-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D8E3DE] bg-[#EEF3F0] text-[#1C3B34]">
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#C29F60]">
              Regulator Champions
            </span>

            <h1 className="text-2xl font-bold text-[#1C3B34]">
              Robyn Admin
            </h1>

            <p className="text-sm leading-relaxed text-[#657B6C]">
              Private access to
              educator questions,
              monthly session votes
              and Regulator Champions
              administration.
            </p>
          </div>

          <form
            action={loginAdmin}
            className="space-y-4 text-left"
          >
            <div>
              <label
                htmlFor="admin-password"
                className="mb-1 block text-[10px] font-black uppercase tracking-wider text-[#657B6C]"
              >
                Admin Password
              </label>

              <input
                id="admin-password"
                name="adminPassword"
                type="password"
                required
                maxLength={200}
                autoComplete="current-password"
                placeholder="Enter your private admin password"
                className="w-full rounded-xl border border-[#D8D4CE] bg-white p-3.5 text-sm text-[#1C3B34] outline-none transition focus:border-[#657B6C] focus:ring-2 focus:ring-[#D8E3DE]"
              />
            </div>

            {params.error ===
              '1' && (
              <p
                role="alert"
                className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold leading-relaxed text-rose-700"
              >
                That admin password
                was not recognised.
                Please try again.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-2xl bg-[#1C3B34] py-3.5 text-sm font-bold text-white transition hover:bg-[#294E45]"
            >
              Open Admin Dashboard →
            </button>
          </form>

          <div className="border-t border-[#E6E2DC] pt-5">
            <p className="text-xs leading-relaxed text-[#657B6C]">
              This login is separate
              from educator service
              access.
            </p>

            <Link
              href="/"
              className="mt-3 inline-block text-xs font-bold text-[#657B6C] hover:underline"
            >
              ← Return to website
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}