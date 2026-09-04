import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  "https://playmoveimprove-regulator-champions.vercel.app";

export const metadata: Metadata = {
  title:
    "Regulator Champions | Early Childhood Regulation & Behaviour Support",

  description:
    "Practical regulation support for early childhood teams. Use Regulation Cards, recordings and ongoing support to work out what to notice and what to try when behaviour becomes difficult.",

  keywords: [
    "Regulator Champions",
    "early childhood regulation",
    "early childhood regulation support",
    "early childhood co-regulation",
    "behaviour support early childhood",
    "early childhood behaviour",
    "regulation cards early childhood",
    "early childhood educators",
    "sensory regulation children",
    "sensory processing early childhood",
    "early childhood professional learning",
    "educator professional development",
    "educator coaching",
    "early childhood behaviour strategies",
    "early childhood transitions",
    "whole service professional learning",
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
      "When Behaviour Keeps Happening, Help Your Team Know What to Try Next",
    description:
      "Regulator Champions helps early childhood teams notice what may be happening underneath behaviour, use practical Regulation Cards and choose thoughtful responses in real early childhood moments.",
    images: [
      {
        url: "/images/early-childhood-regulation-program.png",
        width: 1200,
        height: 630,
        alt: "Two early childhood educators reviewing Regulator Champions regulation cards together",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Regulator Champions | Early Childhood Regulation Support",
    description:
      "Practical Regulation Cards, recordings and support helping early childhood teams work out what to notice and what to try when behaviour becomes difficult.",
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
      "Early childhood behaviour",
      "Sensory processing",
      "Child development",
      "Movement development",
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
      "Practical early childhood regulation support helping educators understand behaviour, notice children's body cues and decide what to try next in difficult everyday moments.",
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
      "An early childhood regulation support program using practical Regulation Ladders, recordings and ongoing support to help educators, managers and families understand behaviour, notice what may be contributing and decide what to try next.",
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    audience: [
      {
        "@type": "EducationalAudience",
        educationalRole: "early childhood educator",
      },
      {
        "@type": "Audience",
        audienceType:
          "Early childhood directors and educational leaders",
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "Australia",
    },
    serviceType:
      "Early childhood regulation support and professional learning",
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