import type { Metadata } from "next";
import HomePageClient from "@/components/HomePageClient";

const siteUrl =
  "https://playmoveimprove-regulator-champions.vercel.app";

export const metadata: Metadata = {
  title:
    "Early Childhood Regulation & Behaviour Support | Regulator Champions",

  description:
    "Practical regulation and behaviour support for early childhood teams, child care centres and preschool programs. Regulation Ladders, professional development, recordings and ongoing support for educators and directors.",

  keywords: [
    "Regulator Champions",
    "early childhood regulation",
    "early childhood regulation support",
    "early childhood co-regulation",
    "behaviour support early childhood",
    "child care behaviour support",
    "challenging behaviour child care",
    "challenging behavior child care",
    "preschool behaviour support",
    "preschool behavior support",
    "child care professional development",
    "early childhood professional development",
    "professional development for preschool teachers",
    "professional development for child care staff",
    "child care director professional development",
    "social emotional development preschool",
    "teacher child interactions",
    "co-regulation preschool",
    "regulation cards early childhood",
    "Regulation Ladders",
    "sensory processing early childhood",
    "executive function preschool",
    "early childhood transitions",
    "quality improvement child care",
    "QRIS professional development",
    "Developmentally Appropriate Practice",
    "NAEYC professional development",
    "Quality Improvement Plan",
    "QIP early childhood",
    "School Readiness Funding",
    "SRF Victoria",
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
      "Regulator Champions helps early childhood teams notice what may be happening underneath behaviour, use practical Regulation Ladders and make more thoughtful decisions in everyday child care and preschool settings.",
    images: [
      {
        url: "/images/early-childhood-regulation-program.png",
        width: 1200,
        height: 630,
        alt: "Two early childhood educators reviewing Regulator Champions Regulation Cards together",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Regulator Champions | Early Childhood Regulation & Behaviour Support",
    description:
      "Practical Regulation Ladders, professional development, recordings and support for early childhood educators, child care directors and preschool teams.",
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
      "Child care behaviour support",
      "Sensory processing",
      "Child development",
      "Movement development",
      "Educator professional learning",
      "Executive function",
      "Social emotional development",
      "Teacher-child interactions",
      "Early childhood participation",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: "Regulator Champions",
    url: siteUrl,
    description:
      "Practical early childhood regulation and behaviour support helping educators and child care teams understand behaviour, notice children's body cues and decide what to try next.",
    publisher: {
      "@id": `${siteUrl}/#organization`,
    },
    inLanguage: "en",
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#regulator-champions-service`,
    name: "Regulator Champions",
    description:
      "An early childhood regulation and behaviour support program using practical Regulation Ladders, professional development, recordings and ongoing support to help educators, directors, managers and families notice what may be contributing to difficult moments and decide what to try next.",
    provider: {
      "@id": `${siteUrl}/#organization`,
    },
    audience: [
      {
        "@type": "EducationalAudience",
        educationalRole:
          "early childhood educator",
      },
      {
        "@type": "Audience",
        audienceType:
          "Child care owners, directors and preschool leaders",
      },
      {
        "@type": "Audience",
        audienceType:
          "Early childhood educational leaders and managers",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "Australia",
      },
      {
        "@type": "Country",
        name: "United States",
      },
    ],
    serviceType:
      "Early childhood regulation support and professional development",
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