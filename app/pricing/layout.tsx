import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulator Champions Membership Pricing | ECEC Co-Regulation',
  description:
    'Explore membership plans for individual educators and whole early childhood services. Access co-regulation ladders, room reset decks, and QIP evidence generators.',

  alternates: {
    canonical: '/pricing',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}