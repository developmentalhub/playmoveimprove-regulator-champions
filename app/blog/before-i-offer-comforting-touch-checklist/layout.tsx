import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Before I Offer Comforting Touch Checklist | ECEC Staffroom Tool',
  description:
    'A 9-step reflection checklist for early childhood educators navigating physical comfort, safety risks, and ACECQA compliance on the floor.',

  alternates: {
    canonical: '/blog/before-i-offer-comforting-touch-checklist',
  },

  openGraph: {
    type: 'article',
    locale: 'en_AU',
    url: '/blog/before-i-offer-comforting-touch-checklist',
    siteName: 'Regulator Champions by Play Move Improve',
    title: 'Before I Offer Comforting Touch Checklist for ECEC Educators',
    description:
      'Pause. Notice. Then Respond. A practical 9-step reflection guide for early childhood teams navigating physical comfort and child safety regulations.',
    images: [
      {
        url: '/images/feed/comforting-touch-checklist.png',
        alt: 'Before I offer comforting touch reflection checklist for early childhood educators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Before I Offer Comforting Touch Checklist for ECEC Educators',
    description:
      'Practical 9-step staffroom reflection checklist for safe, appropriate touch and co-regulation in early childhood education.',
    images: ['/images/feed/comforting-touch-checklist.png'],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ComfortingTouchChecklistLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}