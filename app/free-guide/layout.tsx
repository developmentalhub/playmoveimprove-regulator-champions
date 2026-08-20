import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Safe Touch & Co-Regulation Guide for Early Childhood Educators',
  description:
    'Free 19-page guide on safe, appropriate touch and co-regulation in ECEC. Navigate ACECQA child safety updates with confidence and eliminate fear around physical comfort.',

  alternates: {
    canonical: '/free-guide',
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/free-guide',
    siteName: 'Regulator Champions by Play Move Improve',
    title: 'Free Safe Touch & Co-Regulation Guide for Early Childhood Educators',
    description:
      'A free 19-page professional learning guide helping early childhood educators navigate child safety regulations, appropriate touch, and trauma-informed co-regulation.',
    images: [
      {
        url: '/images/feed/safe-touch-early-childhood.png',
        alt: 'Free safe touch and co-regulation guide for early childhood educators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Free Safe Touch & Co-Regulation Guide for Early Childhood Educators',
    description:
      'Free practical guide on safe touch, ACECQA compliance, and emotional co-regulation for early childhood educators.',
    images: ['/images/feed/safe-touch-early-childhood.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function FreeGuideLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}