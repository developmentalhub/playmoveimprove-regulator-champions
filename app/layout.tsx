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

const PLAY_MOVE_IMPROVE_URL =
  'https://www.playmoveimprove.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: 'Regulator Champions',

  title: {
    default:
      'Regulator Champions | Early Childhood Regulation Support',
    template:
      '%s | Regulator Champions',
  },

  description:
    'Practical early childhood regulation support helping educators understand behaviour, notice what children may be communicating and decide what to try next. Use the Regulation Cards, recordings and deeper support in the way your team has capacity for.',

  keywords: [
    'Regulator Champions',
    'early childhood regulation',
    'early childhood regulation support',
    'early childhood co-regulation',
    'early childhood behaviour support',
    'behaviour support early childhood',
    'early childhood behaviour',
    'regulation cards early childhood',
    'sensory regulation children',
    'sensory processing early childhood',
    'early childhood educators',
    'early childhood professional learning',
    'educator professional development',
    'co-regulation educators',
    'early childhood regulation strategies',
    'early childhood transitions',
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

  category:
    'Early Childhood Professional Learning',

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
      'Regulator Champions | Practical Regulation Support for Early Childhood Teams',

    description:
      'Practical Regulation Cards, recordings and support helping early childhood teams work out what to notice and what to try when behaviour and regulation become difficult.',

    images: [
      {
        url: '/images/early-childhood-regulation-program.png',
        width: 1200,
        height: 630,
        alt: 'Two early childhood educators reviewing Regulator Champions regulation cards together',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Regulator Champions | Early Childhood Regulation Support',

    description:
      'Practical Regulation Cards, recordings and support helping early childhood teams know what to notice and what to try when behaviour becomes difficult.',

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
  children: React.ReactNode;
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
      'Practical regulation support for early childhood teams using Regulation Ladders, recordings and professional guidance to help educators understand behaviour and decide what to try next.',

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
      'Early childhood regulation support helping educators understand behaviour, read children’s body cues and decide what to try next in difficult everyday moments.',

    publisher: {
      '@id':
        `${SITE_URL}/#organization`,
    },

    creator: {
      '@id':
        `${SITE_URL}/#robyn-papworth`,
    },

    inLanguage:
      'en-AU',
  };

  return (
    <html lang="en-AU">
      <body className={inter.className}>
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

        <div className="flex min-h-screen flex-col">
          <Navbar />

          <div className="flex-1">
            {children}
          </div>

          <Footer />
        </div>
      </body>
    </html>
  );
}