import type { Metadata } from 'next';
import HomePageClient from '@/components/HomePageClient';

export const metadata: Metadata = {
  title:
    'Early Childhood Co-Regulation Professional Learning | Regulator Champions',

  description:
    'Whole-centre early childhood professional learning and coaching for regulation, co-regulation, educator capability, executive function, School Readiness Funding and Kindy Uplift. Explore Regulator Champions by Play Move Improve.',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    url: '/',
    title:
      'Early Childhood Co-Regulation Professional Learning | Regulator Champions',
    description:
      'Practical whole-centre professional learning helping early childhood teams strengthen regulation and co-regulation practice, educator capability and everyday room responses.',
    images: [
      {
        url: '/images/feed/01_babies_room.png',
        alt: 'Early childhood co-regulation professional learning for educators',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Early Childhood Co-Regulation Professional Learning | Regulator Champions',
    description:
      'Whole-centre professional learning for early childhood educators building stronger regulation, co-regulation and executive-function support.',
    images: ['/images/feed/01_babies_room.png'],
  },
};

export default function HomePage() {
  return <HomePageClient />;
}