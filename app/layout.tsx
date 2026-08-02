import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Regulator Champions | Whole-Centre Co-Regulation Platform',
  description:
    'A 12-month annual site membership for early childhood services. Access 10 scenario action plans, physical room posters, interactive somatic resets, and NQS audit evidence.',
  openGraph: {
    title: 'Regulator Champions | Play Move Improve',
    description:
      'Turn room overstimulation into co-regulated calm. Context-specific scenario action plans and NQS compliance mapping for ECE services.',
    images: ['/images/feed/01_babies_room.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#FDFBF7] text-slate-800 antialiased min-h-screen flex flex-col justify-between`}>
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}