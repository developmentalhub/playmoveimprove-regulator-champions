import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  "https://playmoveimprove-regulator-champions.vercel.app";

export const metadata: Metadata = {
  title:
    "Early Childhood Co-Regulation Professional Learning | Regulator Champions",

  description:
    "Whole-service professional learning helping early childhood educators notice what children's bodies are communicating, understand behaviour, strengthen co-regulation and respond with greater confidence in everyday moments.",

  keywords: [
    "Regulator Champions",
    "early childhood co-regulation",
    "early childhood regulation",
    "educator professional learning",
    "behaviour support early childhood",
    "sensory regulation children",
    "co-regulation educators",
    "early childhood behaviour",
    "educator confidence",
    "School Readiness Funding",
    "Kindy Uplift",
    "early childhood professional development",
    "whole service professional learning",
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
      "Early Childhood Co-Regulation Professional Learning | Regulator Champions",
    description:
      "Practical whole-service professional learning helping educators notice children's body-based signs earlier, understand what may be happening beneath behaviour and respond through confident co-regulation.",
    images: [
      {
        url: "/images/feed/01_babies_room.png",
        width: 1200,
        height: 630,
        alt: "Early childhood educators supporting children through co-regulation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Early Childhood Co-Regulation Professional Learning | Regulator Champions",
    description:
      "Whole-service professional learning for early childhood educators building stronger noticing, co-regulation and responsive practice.",
    images: ["/images/feed/01_babies_room.png"],
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
      "Exercise Physiologist and Developmental Educator",
    worksFor: {
      "@id": `${siteUrl}/#organization`,
    },
    knowsAbout: [
      "Early childhood co-regulation",
      "Child development",
      "Sensory processing",
      "Movement development",
      "Educator professional learning",
      "Early childhood behaviour",
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
      "Whole-service professional learning for early childhood educators supporting regulation, co-regulation, sensory needs and responsive practice.",
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
      "Whole-service professional learning helping early childhood educators understand children's body-based signs, sensory needs, behaviour and co-regulation across everyday routines.",
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