'use client';

import { usePathname } from 'next/navigation';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname =
    usePathname();

  const isPrivatePlatform =
    pathname === '/platform' ||
    pathname.startsWith(
      '/platform/',
    );

  /*
   * Logged-in managers and educators
   * use their own platform navigation.
   * They should not also see the
   * public website navbar and footer.
   */
  if (isPrivatePlatform) {
    return (
      <div className="min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        {children}
      </div>

      <Footer />
    </div>
  );
}