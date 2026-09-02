import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  "https://playmoveimprove-regulator-champions.vercel.app";

export const metadata: Metadata = {
  title:
    "Regulator Champions | Ongoing Regulation Support for Early Childhood Teams",

  description:
    "Regulator Champions gives early childhood teams practical Regulation Ladders, monthly coaching, recordings and ongoing support so educators know what to notice, what to try and where to go when they are still unsure.",

  keywords: [
    "Regulator Champions",
    "early childhood regulation support",
    "early childhood co-regulation",
    "behaviour support early childhood",
    "early childhood professional learning",
    "educator coaching",
    "early childhood regulation",
    "educator confidence",
    "whole service professional learning",
    "regulation strategies early childhood",
    "early childhood behaviour support",
    "sensory regulation children",
    "early childhood transitions",
    "monthly educator coaching",
    "School Readiness Funding",
    "Kindy Uplift",
    "Play Move Improve",
    "Robyn Papworth",
  ],

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Regulator Champions",
    title:
      "Regulator Champions | Practical Support When Educators Are Still Unsure",

    description:
      "Help your early childhood team know what to notice, what to try and where to go when a regulation or behaviour situation is difficult.",

    images: [
      {
        url: "/images/safe-touch-early-childhood.png",
        width: 1200,
        height: 630,
        alt: "Early childhood educator providing calm and responsive support to a child",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Regulator Champions | Ongoing Support for Early Childhood Teams",

    description:
      "Practical Regulation Ladders, monthly coaching, recordings and ongoing support for early childhood educators.",

    images: [
      "/images/safe-touch-early-childhood.png",
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

    name: "Regulator Champions",
    url: siteUrl,

    parentOrganization: {
      "@type": "Organization",
      name: "Play Move Improve",
      url: "https://www.playmoveimprove.com",
    },

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
      "Accredited Exercise Physiologist and Developmental Educator",

    worksFor: {
      "@id": `${siteUrl}/#organization`,
    },

    knowsAbout: [
      "Early childhood regulation",
      "Early childhood co-regulation",
      "Child development",
      "Sensory processing",
      "Movement development",
      "Early childhood behaviour",
      "Educator professional learning",
      "Executive function",
      "Gross motor development",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,

    name: "Regulator Champions",
    url: siteUrl,

    description:
      "Ongoing regulation support for early childhood teams, with practical Regulation Ladders, monthly coaching, recordings and access to professional guidance when educators are unsure what to try next.",

    publisher: {
      "@id": `${siteUrl}/#organization`,
    },

    inLanguage: "en-AU",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#regulator-champions-service`,

    name: "Regulator Champions",

    description:
      "A whole-service early childhood professional learning and regulation support program helping educators know what to notice, what to try and where to go when they need further support.",

    provider: {
      "@id": `${siteUrl}/#organization`,
    },

    audience: {
      "@type": "EducationalAudience",
      educationalRole:
        "early childhood educator",
    },

    areaServed: {
      "@type": "Country",
      name: "Australia",
    },

    serviceType:
      "Early childhood professional learning and regulation support",

    url: siteUrl,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            organisationSchema,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            personSchema,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            websiteSchema,
          ),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema,
          ),
        }}
      />

      <HomePageClient />
    </>
  );
}