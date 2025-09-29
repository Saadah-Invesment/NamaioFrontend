import { MetadataRoute } from "next";

const BASE_URL = "https://tezcai.com";

// Static pages with SEO hints
const staticPages: { path: string; priority: number; changefreq: string }[] = [
  { path: "", priority: 1.0, changefreq: "daily" },
  { path: "pricing", priority: 0.8, changefreq: "monthly" },
  { path: "how-it-works", priority: 0.8, changefreq: "monthly" },
  { path: "faq", priority: 0.7, changefreq: "monthly" },
  { path: "faq/general-faq", priority: 0.7, changefreq: "monthly" },
  { path: "faq/affiliate-faq", priority: 0.7, changefreq: "monthly" },
  { path: "faq/profit-sharing-faq", priority: 0.7, changefreq: "monthly" },
  { path: "faq/signal-faq", priority: 0.7, changefreq: "monthly" },
  { path: "company", priority: 0.7, changefreq: "monthly" },
  { path: "affiliate", priority: 0.7, changefreq: "monthly" },
  { path: "terms-and-conditions", priority: 0.5, changefreq: "yearly" },
  { path: "privacy-policy", priority: 0.5, changefreq: "yearly" },
  { path: "risk-disclosure", priority: 0.5, changefreq: "yearly" },
  { path: "help-center", priority: 0.6, changefreq: "monthly" },
  { path: "tutorial", priority: 0.6, changefreq: "monthly" },
  { path: "blog", priority: 0.6, changefreq: "monthly" },
  { path: "benchmark", priority: 0.6, changefreq: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticPages.map((page) => ({
    url: `${BASE_URL}/${page.path}`,
    lastModified: new Date(),
    changefreq: page.changefreq,
    priority: page.priority,
  }));
}
