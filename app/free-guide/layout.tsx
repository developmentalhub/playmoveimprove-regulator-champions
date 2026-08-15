import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Emotional Regulation Guide for Early Childhood Educators',
  description:
    'Free 10-step emotional regulation and co-regulation guide for early childhood educators. Build educator self-awareness, reflective practice and practical regulation support with Play Move Improve.',

  alternates: {
    canonical: '/free-guide',
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: '/free-guide',
    siteName: 'Regulator Champions by Play Move Improve',
    title: 'Free Emotional Regulation Guide for Early Childhood Educators',
    description:
      'A free 10-rung professional learning guide helping early childhood educators explore emotional regulation, co-regulation, educator self-awareness and reflective practice.',
    images: [
      {
        url: '/images/ladders/ladder1_rung01.png',
        alt: 'Free emotional regulation guide for early childhood educators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Free Emotional Regulation Guide for Early Childhood Educators',
    description:
      'Free practical co-regulation and emotional regulation professional learning for early childhood educators.',
    images: ['/images/ladders/ladder1_rung01.png'],
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