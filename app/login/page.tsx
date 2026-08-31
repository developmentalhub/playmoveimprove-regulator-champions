import { redirect } from 'next/navigation';

type PageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

function getSafeReturnPath(
  value: string | undefined,
): string {
  if (!value) {
    return '/portal';
  }

  if (
    !value.startsWith('/') ||
    value.startsWith('//') ||
    value.includes('://')
  ) {
    return '/portal';
  }

  return value;
}

export default async function LoginPage({
  searchParams,
}: PageProps) {
  const params =
    await searchParams;

  const returnTo =
    getSafeReturnPath(
      params.returnTo,
    );

  redirect(
    `/member-access?returnTo=${encodeURIComponent(
      returnTo,
    )}`,
  );
}