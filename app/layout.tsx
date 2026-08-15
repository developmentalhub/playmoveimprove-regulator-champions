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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: 'Regulator Champions',

  title: {
    default:
      'Regulator Champions | Early Childhood Co-Regulation Coaching',
    template: '%s | Regulator Champions',
  },

  description:
    'Whole-centre early childhood coaching and professional learning from Play Move Improve, helping educators build confident, consistent co-regulation practice through practical Regulation Ladders, reflective coaching and everyday room strategies.',

  authors: [
    {
      name: 'Robyn Papworth',
      url: 'https://www.playmoveimprove.com.au',
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
    url: '/',
    siteName: 'Regulator Champions by Play Move Improve',
    title:
      'Regulator Champions | Early Childhood Co-Regulation Coaching',
    description:
      'A whole-centre professional learning and coaching pathway helping early childhood educators build shared co-regulation practice through practical Regulation Ladders, reflection and everyday room strategies.',
    images: [
      {
        url: '/images/feed/01_babies_room.png',
        alt: 'Regulator Champions early childhood co-regulation professional learning',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title:
      'Regulator Champions | Early Childhood Co-Regulation Coaching',
    description:
      'Whole-centre professional learning and coaching for early childhood teams building confident, consistent co-regulation practice.',
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
  return (
    <html lang="en-AU">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col">
          <Navbar />

          <div className="flex-1">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}