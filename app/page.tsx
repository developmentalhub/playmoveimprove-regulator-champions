import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  "https://playmoveimprove-regulator-champions.vercel.app";

export const metadata: Metadata = {
  title:
    "Regulator Champions | Regulation Support for Early Childhood Teams",

  description:
    "Regulator Champions helps early childhood educators understand what children's behaviour and bodies may be communicating, notice regulation needs earlier, and feel more confident deciding what to try next.",

  keywords: [
    "Regulator Champions",
    "early childhood regulation support",
    "early childhood co-regulation",
    "behaviour support early childhood",
    "child regulation early childhood",
    "sensory regulation children",
    "early childhood professional learning",
    "educator coaching",
    "early childhood behaviour",
    "educator confidence",
    "whole service professional learning",
    "early childhood transitions",
    "early childhood behaviour strategies",
    "sensory processing early childhood",
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
      "Regulator Champions | Help Educators Know What to Try When Regulation Is Hard",
    description:
      "Practical whole-service support helping early childhood educators notice what may be happening underneath behaviour, understand regulation needs and make more confident decisions about what to try next.",
    images: [
      {
        url: "/images/watercolour-dropoff.png",
        width: 1200,
        height: 630,
        alt: "Early childhood educator supporting a child during a difficult regulation moment",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Regulator Champions | Regulation Support for Early Childhood Teams",
    description:
      "Help educators understand what a child's behaviour and body may be communicating, notice regulation needs earlier and know what to try next.",
    images: ["/images/watercolour-dropoff.png"],
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
      "Practical early childhood regulation support helping educators notice what children's bodies and behaviour may be communicating, understand regulation needs and choose thoughtful responses when situations become difficult.",
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
      "A whole-service early childhood professional learning and regulation support program helping educators understand what may sit underneath behaviour, notice regulation needs earlier, strengthen co-regulation and decide what to try next in everyday situations.",
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
      "Early childhood professional learning and regulation support",
    url: siteUrl,
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
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <HomePageClient />
    </>
  );
}
