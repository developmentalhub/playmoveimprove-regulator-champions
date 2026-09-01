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
      'Regulator Champions | Practical Regulation Support for Early Childhood Teams',
    template: '%s | Regulator Champions',
  },

  description:
    'Regulator Champions helps early childhood educators understand what children’s behaviour and bodies may be communicating, respond with greater confidence and build more consistent co-regulation practice across the whole service.',

  keywords: [
    'Regulator Champions',
    'early childhood regulation support',
    'early childhood co-regulation',
    'early childhood behaviour support',
    'sensory regulation children',
    'sensory processing early childhood',
    'educator professional learning',
    'early childhood professional development',
    'co-regulation educators',
    'educator confidence',
    'responsive practice early childhood',
    'whole service professional learning',
    'early childhood transitions',
    'early childhood behaviour strategies',
    'early childhood sensory strategies',
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
      'Regulator Champions | Know What to Try When a Child Is Struggling',
    description:
      'Practical whole-service support helping early childhood educators notice what may be happening underneath behaviour, understand regulation needs and know what to try next.',
    images: [
      {
        url: '/images/feed/05_prep_transition.png',
        width: 1200,
        height: 630,
        alt: 'Early childhood educator supporting a child during a difficult transition',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Regulator Champions | Practical Regulation Support for Educators',
    description:
      'Help your early childhood team understand behaviour, notice regulation needs and respond with more confidence and consistency.',
    images: ['/images/feed/05_prep_transition.png'],
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
      'Practical whole-service regulation support helping early childhood educators understand behaviour, strengthen co-regulation and respond with more confidence in everyday situations.',
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
    jobTitle:
      'Accredited Exercise Physiologist and Developmental Educator',
    url: PLAY_MOVE_IMPROVE_URL,
    worksFor: {
      '@id': `${SITE_URL}/#organization`,
    },
    knowsAbout: [
      'Early childhood regulation',
      'Early childhood co-regulation',
      'Early childhood behaviour',
      'Sensory processing',
      'Child development',
      'Movement development',
      'Gross motor development',
      'Executive function',
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
      'Practical early childhood regulation support helping educators notice what may be happening underneath behaviour, understand children’s body-based signs and choose thoughtful responses.',
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
      'A whole-service professional learning pathway helping early childhood educators notice body-based signs, understand what may sit underneath behaviour, strengthen co-regulation and know what to try next in everyday situations.',
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