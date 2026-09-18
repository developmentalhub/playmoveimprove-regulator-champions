import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  "https://playmoveimprove-regulator-champions.vercel.app";

export const metadata: Metadata = {
  title:
    "Play Move Improve | Regulator Champions Program 2027",

  description:
    "A 12-month professional learning and implementation program for early childhood teams. Regulator Champions combines practical educator training, co-regulation strategies, family voice, QIP documentation and 18 hours of professional development.",

  keywords: [
    "Play Move Improve",
    "Regulator Champions",
    "early childhood professional development",
    "early childhood regulation",
    "co-regulation early childhood",
    "early childhood behaviour support",
    "educator professional learning",
    "Quality Improvement Plan",
    "QIP early childhood",
    "family engagement early childhood",
    "School Readiness Funding",
    "SRF Victoria",
    "Preschool Boost",
    "Kindy Uplift",
    "sensory processing early childhood",
    "executive function preschool",
    "vagus nerve early childhood",
    "interoception early childhood",
    "vestibular processing",
    "proprioception",
    "play schemas",
    "neuroplasticity children",
    "neurodivergence early childhood",
    "biophilic early childhood environments",
    "early childhood transitions",
    "educator capacity building",
    "Robyn Papworth",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Play Move Improve",
    title:
      "Play Move Improve | Regulator Champions Program 2027",
    description:
      "A year of practical professional learning, reflection, family engagement and QIP evidence for early childhood teams of up to 15 educators.",
    images: [
      {
        url: "/images/early-childhood-regulation-program.png",
        width: 1200,
        height: 630,
        alt: "Play Move Improve Regulator Champions professional learning program for early childhood teams",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Play Move Improve | Regulator Champions Program 2027",
    description:
      "A 12-month early childhood professional learning program for whole teams, including practical resources, family voice, QIP evidence and 18 CPD hours.",
    images: [
      "/images/early-childhood-regulation-program.png",
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function HomePage() {
  const organisationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "Play Move Improve",
    url: siteUrl,
    founder: {
      "@id": `${siteUrl}/#robyn-papworth`,
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#robyn-papworth`,
    name: "Robyn Papworth",
    jobTitle:
      "Developmental Educator and Certified Trainer",
    worksFor: {
      "@id": `${siteUrl}/#organization`,
    },
    knowsAbout: [
      "Early childhood development",
      "Co-regulation",
      "Sensory processing",
      "Executive function",
      "Neuroplasticity",
      "Movement development",
      "Play development",
      "Educator professional learning",
      "Early childhood participation",
      "Family engagement",
      "Quality improvement in early childhood",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Play Move Improve",
    url: siteUrl,
    description:
      "Professional learning and practical implementation support for early childhood educators and teams.",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-AU",
  };

  const programSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#regulator-champions`,
    name: "Regulator Champions Program 2027",
    description:
      "A 12-month professional learning and implementation program for early childhood teams of up to 15 educators, including live and self-paced learning, practical resources, reflection, certificates, family voice and Quality Improvement Plan documentation.",
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "early childhood educator",
    },
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    serviceType:
      "Early childhood professional development and team capacity building",
    url: siteUrl,
    offers: [
      {
        "@type": "Offer",
        name: "2027 Early Bird Digital",
        price: "4790",
        priceCurrency: "AUD",
        availability: "https://schema.org/InStock",
        validThrough: "2026-12-31",
      },
      {
        "@type": "Offer",
        name: "2027 Premium Program",
        price: "5990",
        priceCurrency: "AUD",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <>
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
          __html: JSON.stringify(programSchema),
        }}
      />

      <HomePageClient />
    </>
  );
}