import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import SiteChrome from '@/components/SiteChrome';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://playmoveimprove-regulator-champions.vercel.app';

const PLAY_MOVE_IMPROVE_URL =
  'https://www.playmoveimprove.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName:
    'Regulator Champions',

  title: {
    default:
      'Regulator Champions | Early Childhood Regulation & Behaviour Support',
    template:
      '%s | Regulator Champions',
  },

  description:
    'Practical regulation and behaviour support for early childhood teams, child care centres and preschool programs. Regulation Ladders, professional development, recordings and ongoing support for educators, directors and families.',

  keywords: [
    'Regulator Champions',
    'early childhood regulation',
    'early childhood regulation support',
    'early childhood co-regulation',
    'early childhood behaviour support',
    'child care behaviour support',
    'child care behavior support',
    'challenging behaviour child care',
    'challenging behavior child care',
    'preschool behaviour support',
    'preschool behavior support',
    'child care professional development',
    'early childhood professional development',
    'professional development for preschool teachers',
    'professional development for child care staff',
    'child care director professional development',
    'teacher child interactions',
    'social emotional development preschool',
    'co-regulation preschool',
    'regulation cards early childhood',
    'Regulation Ladders',
    'sensory regulation children',
    'sensory processing early childhood',
    'executive function preschool',
    'early childhood transitions',
    'quality improvement child care',
    'QRIS',
    'Developmentally Appropriate Practice',
    'NAEYC',
    'Quality Improvement Plan',
    'QIP early childhood',
    'National Quality Standard',
    'School Readiness Funding',
    'SRF Victoria',
    'Kindy Uplift',
    'Play Move Improve',
    'Robyn Papworth',
  ],

  authors: [
    {
      name: 'Robyn Papworth',
      url: PLAY_MOVE_IMPROVE_URL,
    },
  ],

  creator:
    'Robyn Papworth',

  publisher:
    'Play Move Improve',

  category:
    'Early Childhood Professional Development',

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      'max-image-preview':
        'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: [
      'en_AU',
    ],

    url: SITE_URL,

    siteName:
      'Regulator Champions',

    title:
      'Regulator Champions | Practical Regulation Support for Early Childhood Teams',

    description:
      'Practical Regulation Ladders, professional development, recordings and support helping early childhood teams work out what to notice and what to try when behaviour and regulation become difficult.',

    images: [
      {
        url:
          '/images/early-childhood-regulation-program.png',

        width: 1200,
        height: 630,

        alt:
          'Early childhood educators reviewing Regulator Champions Regulation Cards together',
      },
    ],
  },

  twitter: {
    card:
      'summary_large_image',

    title:
      'Regulator Champions | Early Childhood Regulation Support',

    description:
      'Practical Regulation Ladders, professional development and support for early childhood educators, child care directors and preschool teams.',

    images: [
      '/images/early-childhood-regulation-program.png',
    ],
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
  children:
    React.ReactNode;
}>) {
  const organisationSchema = {
    '@context':
      'https://schema.org',

    '@type':
      'Organization',

    '@id':
      `${SITE_URL}/#organization`,

    name:
      'Regulator Champions',

    url:
      SITE_URL,

    description:
      'Practical regulation and behaviour support for early childhood teams using Regulation Ladders, professional development, recordings and ongoing guidance to help educators understand behaviour and decide what to try next.',

    founder: {
      '@id':
        `${SITE_URL}/#robyn-papworth`,
    },

    parentOrganization: {
      '@type':
        'Organization',

      '@id':
        `${PLAY_MOVE_IMPROVE_URL}/#organization`,

      name:
        'Play Move Improve',

      url:
        PLAY_MOVE_IMPROVE_URL,
    },

    areaServed: [
      {
        '@type':
          'Country',

        name:
          'Australia',
      },
      {
        '@type':
          'Country',

        name:
          'United States',
      },
    ],
  };

  const personSchema = {
    '@context':
      'https://schema.org',

    '@type':
      'Person',

    '@id':
      `${SITE_URL}/#robyn-papworth`,

    name:
      'Robyn Papworth',

    jobTitle:
      'Accredited Exercise Physiologist and Developmental Educator',

    url:
      PLAY_MOVE_IMPROVE_URL,

    worksFor: {
      '@id':
        `${SITE_URL}/#organization`,
    },

    knowsAbout: [
      'Early childhood regulation',
      'Early childhood co-regulation',
      'Early childhood behaviour',
      'Child care behaviour support',
      'Sensory processing',
      'Child development',
      'Movement development',
      'Executive function',
      'Social emotional development',
      'Teacher-child interactions',
      'Early childhood participation',
      'Educator professional development',
      'Responsive practice',
    ],
  };

  const websiteSchema = {
    '@context':
      'https://schema.org',

    '@type':
      'WebSite',

    '@id':
      `${SITE_URL}/#website`,

    name:
      'Regulator Champions',

    url:
      SITE_URL,

    description:
      'Early childhood regulation and behaviour support helping educators understand behaviour, notice children’s body cues and decide what to try next in difficult everyday moments.',

    publisher: {
      '@id':
        `${SITE_URL}/#organization`,
    },

    creator: {
      '@id':
        `${SITE_URL}/#robyn-papworth`,
    },

    inLanguage:
      'en',
  };

  return (
    <html lang="en">
      <body
        className={
          inter.className
        }
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                organisationSchema,
              ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                personSchema,
              ),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html:
              JSON.stringify(
                websiteSchema,
              ),
          }}
        />

        <SiteChrome>
          {children}
        </SiteChrome>

        <Analytics />
      </body>
    </html>
  );
}