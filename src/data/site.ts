import { PERSONAL_INFO } from "@/data/portfolioData";

/** Canonical site URL. Override with NEXT_PUBLIC_SITE_URL when the domain changes. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://aroobaalamkhan.com").replace(/\/$/, "");

export const SITE_NAME = "Arooba Alam Khan Portfolio";

/** schema.org Person, used on the home page. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: PERSONAL_INFO.name,
  url: SITE_URL,
  jobTitle: PERSONAL_INFO.title,
  description: PERSONAL_INFO.about,
  image: `${SITE_URL}/arooba-hero.png`,
  alumniOf: "Sir Syed University of Engineering & Technology",
  knowsAbout: [
    "Next.js",
    "React",
    "Node.js",
    "Python",
    "PHP",
    "AI chatbots",
    "SaaS dashboards",
    "E-commerce development",
  ],
  sameAs: [PERSONAL_INFO.socialLinks.linkedin, PERSONAL_INFO.socialLinks.upwork],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};
