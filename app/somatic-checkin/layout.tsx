import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Somatic Check-In for Early Childhood Educators',
  description:
    'Free somatic check-in for early childhood educators to notice body tension, stress signals, sensory needs and prepare for more intentional co-regulation in the room.',

  alternates: {
    canonical: '/somatic-checkin',
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/somatic-checkin',
    siteName: 'Regulator Champions by Play Move Improve',
    title: 'Somatic Check-In for Early Childhood Educators',
    description:
      'A free educator self-regulation tool for noticing body tension, sensory needs and stress before returning to the room and supporting children through co-regulation.',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Somatic Check-In for Early Childhood Educators',
    description:
      'Free educator self-regulation and body-awareness tool for early childhood teams.',
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function SomaticCheckinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}