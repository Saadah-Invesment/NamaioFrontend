import type { Metadata } from "next";
import CompanyPageComponrnt from "./CompanyPage";
import Script from "next/script";
// move your UI into a client component

export const metadata: Metadata = {
  title: "About Tezcai | Our Company, Vision & Mission",
  description:
    "Discover Tezcai’s story, vision, and mission. Learn how our automated crypto trading platform empowers traders with smart, data-driven strategies.",
  alternates: {
    canonical: "/company",
  },
};


const companySchema = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: "https://tezcai.com/company",
    name: "About Tezcai",
    description: "Learn about Tezcai — our vision, mission, values, and what drives us.",
    mainEntity: {
      "@id": "https://tezcai.com#organization"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Tezcai's vision?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To become the most trusted name in AI-driven trading technology, empowering individuals and institutions worldwide with intelligent tools that deliver results consistently, securely, and transparently."
        }
      },
      {
        "@type": "Question",
        name: "What is Tezcai's mission?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To simplify trading with intuitive Smart Software solutions, empower clients with automation that saves time, minimizes risk, and maximizes opportunity; set new benchmarks of trust and transparency; and continuously innovate to keep users ahead of the market."
        }
      },
      {
        "@type": "Question",
        name: "What are Tezcai's core values?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Integrity, Excellence, Innovation, Trust, Accessibility, and Growth."
        }
      }
    ]
  }
];



export default function CompanyPage() {
  return <><Script
    id="ld-company"
    type="application/ld+json"
    strategy="afterInteractive"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(companySchema) }}
  />
    <CompanyPageComponrnt />
  </>;
}
