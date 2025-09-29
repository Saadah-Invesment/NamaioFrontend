import { ITestimonial } from "@/types";
import { siteDetails } from "./siteDetails";

export const testimonials: ITestimonial[] = [
  {
    name: "John Smith",
    role: "Crypto Trader",
    message: `${siteDetails.siteName} made automated trading effortless. I used to spend hours watching charts — now Tezcai does it all, and better. I’ve seen consistent profits with zero stress.`,
    // avatar: "/images/testimonial-1.webp",
  },
  {
    name: "Jane Doe",
    role: "Software Engineer",
    message: `What I love about ${siteDetails.siteName} is the transparency. The live dashboard shows exactly what's happening. Every trade, every move — I’m always in the loop, without doing the work.`,
    // avatar: "/images/testimonial-2.webp",
  },
  {
    name: "Emily Johnson",
    role: "Day Trader",
    message: `${siteDetails.siteName} detects high-volatility trades before I even spot them. It’s like having a full-time trading assistant that never sleeps.`,
    // avatar: "/images/testimonial-3.webp",
  },
];
