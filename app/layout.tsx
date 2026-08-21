import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://playmoveimprove-regulator-champions.vercel.app';

const PLAY_MOVE_IMPROVE_URL = 'https://www.playmoveimprove.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: 'Regulator Champions',

  title: {
    default:
      'Regulator Champions | Early Childhood Co-Regulation Professional Learning',
    template: '%s | Regulator Champions',
  },

  description:
    'Whole-service early childhood professional learning helping educators notice what children’s bodies are communicating, understand behaviour and sensory needs, strengthen co-regulation and respond with greater confidence in everyday moments.',

  keywords: [
    'Regulator Champions',
    'early childhood co-regulation',
    'early childhood regulation',
    'co-regulation educators',
    'early childhood professional learning',
    'early childhood professional development',
    'educator professional learning',
    'early childhood behaviour support',
    'sensory regulation children',
    'sensory processing early childhood',
    'educator confidence',
    'responsive practice early childhood',
    'whole service professional learning',
    'School Readiness Funding',
    'Kindy Uplift',
    'National Quality Standard',
    'Play Move Improve',
    'Robyn Papworth',
  ],

  authors: [
    {
      name: 'Robyn Papworth',
      url: PLAY_MOVE_IMPROVE_URL,
    },
  ],

  creator: 'Robyn Papworth',
  publisher: 'Play Move Improve',

  category: 'Early Childhood Professional Learning',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: SITE_URL,
    siteName: 'Regulator Champions',
    title:
      'Regulator Champions | Early Childhood Co-Regulation Professional Learning',
    description:
      'Practical whole-service professional learning helping early childhood teams notice body-based signs earlier, understand what may be happening beneath behaviour and respond through thoughtful co-regulation.',
    images: [
      {
        url: '/images/feed/01_babies_room.png',
        width: 1200,
        height: 630,
        alt: 'Regulator Champions early childhood co-regulation professional learning',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Regulator Champions | Early Childhood Co-Regulation Professional Learning',
    description:
      'Whole-service professional learning helping early childhood educators strengthen noticing, co-regulation and responsive practice.',
    images: ['/images/feed/01_babies_room.png'],
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organisationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'Regulator Champions',
    url: SITE_URL,
    description:
      'Whole-service professional learning for early childhood educators supporting regulation, co-regulation, sensory needs, behaviour and responsive practice.',
    founder: {
      '@id': `${SITE_URL}/#robyn-papworth`,
    },
    parentOrganization: {
      '@type': 'Organization',
      '@id': `${PLAY_MOVE_IMPROVE_URL}/#organization`,
      name: 'Play Move Improve',
      url: PLAY_MOVE_IMPROVE_URL,
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#robyn-papworth`,
    name: 'Robyn Papworth',
    jobTitle: 'Exercise Physiologist and Developmental Educator',
    url: PLAY_MOVE_IMPROVE_URL,
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    knowsAbout: [
      'Early childhood co-regulation',
      'Early childhood regulation',
      'Sensory processing',
      'Child development',
      'Movement development',
      'Gross motor development',
      'Primitive reflexes',
      'Executive function',
      'Early childhood behaviour',
      'Educator professional learning',
      'Responsive practice',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Regulator Champions',
    url: SITE_URL,
    description:
      'Whole-service early childhood professional learning helping educators notice children’s body-based signs, understand behaviour and sensory needs, and strengthen co-regulation practice.',
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    creator: {
      '@id': `${SITE_URL}/#robyn-papworth`,
    },
    inLanguage: 'en-AU',
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    '@id': `${SITE_URL}/#regulator-champions-course`,
    name: 'Regulator Champions',
    description:
      'A whole-service professional learning pathway helping early childhood educators strengthen noticing, co-regulation, sensory understanding and responsive practice through practical learning ladders and implementation resources.',
    url: SITE_URL,
    provider: {
      '@id': `${SITE_URL}/#organization`,
    },
    creator: {
      '@id': `${SITE_URL}/#robyn-papworth`,
    },
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Early childhood educator',
    },
    educationalLevel: 'Professional learning',
    inLanguage: 'en-AU',
  };

  return (
    <html lang="en-AU">
      <body className={inter.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(courseSchema),
          }}
        />

        <div className="flex min-h-screen flex-col">
          <Navbar />

          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}