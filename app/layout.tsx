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

  applicationName:
    'Regulator Champions',

  title: {
    default:
      'Regulator Champions | Ongoing Regulation Support for Early Childhood Teams',
    template:
      '%s | Regulator Champions',
  },

  description:
    'Regulator Champions gives early childhood teams practical Regulation Ladders, monthly coaching, recordings and ongoing support so educators know what to notice, what to try and where to go when they are still unsure.',

  keywords: [
    'Regulator Champions',
    'early childhood regulation support',
    'early childhood co-regulation',
    'early childhood behaviour support',
    'sensory regulation children',
    'sensory processing early childhood',
    'educator professional learning',
    'early childhood professional development',
    'educator coaching',
    'co-regulation educators',
    'educator confidence',
    'responsive practice early childhood',
    'whole service professional learning',
    'early childhood transitions',
    'early childhood regulation strategies',
    'monthly educator coaching',
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
    siteName:
      'Regulator Champions',

    title:
      'Regulator Champions | Ongoing Support for Early Childhood Teams',

    description:
      'Practical Regulation Ladders, monthly coaching, recordings and ongoing support to help educators know what to notice, what to try and where to go when they are still unsure.',

    images: [
      {
        url: '/images/safe-touch-early-childhood.png',
        width: 1200,
        height: 630,
        alt: 'Early childhood educator providing calm and responsive support to a child',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',

    title:
      'Regulator Champions | Ongoing Support for Early Childhood Teams',

    description:
      'Practical Regulation Ladders, monthly coaching, recordings and ongoing support for early childhood educators.',

    images: [
      '/images/safe-touch-early-childhood.png',
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
      'Ongoing regulation support for early childhood teams using practical Regulation Ladders, monthly coaching, recordings and professional guidance.',

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
      'Ongoing early childhood regulation support helping educators know what to notice, what to try and where to go when they need further support.',

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