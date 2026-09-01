import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  "https://playmoveimprove-regulator-champions.vercel.app";

export const metadata: Metadata = {
  title:
    "Regulator Champions | Practical Regulation Support for Early Childhood Teams",

  description:
    "Regulator Champions helps early childhood educators understand what children's behaviour and bodies may be communicating, respond with greater confidence, strengthen co-regulation and build more consistent practice across the whole service.",

  keywords: [
    "Regulator Champions",
    "early childhood regulation support",
    "early childhood co-regulation",
    "behaviour support early childhood",
    "sensory regulation children",
    "educator professional learning",
    "early childhood behaviour",
    "co-regulation educators",
    "educator confidence",
    "whole service professional learning",
    "early childhood transitions",
    "early childhood behaviour strategies",
    "early childhood sensory strategies",
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
      "Regulator Champions | Know What to Try When a Child Is Struggling",
    description:
      "Practical whole-service support helping educators notice what may be happening underneath behaviour, understand regulation needs and know what to try next.",
    images: [
      {
        url: "/images/feed/05_prep_transition.png",
        width: 1200,
        height: 630,
        alt: "Early childhood educator supporting a child during a difficult transition",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Regulator Champions | Practical Regulation Support for Educators",
    description:
      "Help your early childhood team understand behaviour, notice regulation needs and respond with more confidence and consistency.",
    images: ["/images/feed/05_prep_transition.png"],
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
      "Practical whole-service regulation support helping early childhood educators understand behaviour, strengthen co-regulation and know what to try when a child is struggling.",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en-AU",
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Regulator Champions",
    description:
      "Whole-service professional learning and practical regulation support helping early childhood educators notice body-based signs, understand what may sit underneath behaviour, strengthen co-regulation and respond more confidently in everyday situations.",
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    educationalLevel:
      "Early childhood educator professional learning",
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "early childhood educator",
    },
    inLanguage: "en-AU",
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
          __html: JSON.stringify(courseSchema),
        }}
      />

      <HomePageClient />
    </>
  );
}