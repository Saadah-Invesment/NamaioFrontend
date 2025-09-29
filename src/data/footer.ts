import { IMenuItem, ISocials } from "@/types";

export const footerDetails: {
  subheading: string;
  quickLinks: IMenuItem[];
  email: string;
  telephone: string;
  socials: ISocials;
} = {
  subheading: "Tezcai is a product of Saadah Investment LLC — empowering investors through automated, AI-driven trading technology.",
  quickLinks: [
    {
      text: "Features",
      url: "#features"
    },
    {
      text: "Pricing",
      url: "#pricing"
    },
    {
      text: "Testimonials",
      url: "#testimonials"
    }
  ],
  email: 'gm@saadah-investment.com',
  telephone: '+971 (0) 569957775',
  socials: {
    twitter: 'https://twitter.com/Twitter',
    facebook: 'https://facebook.com',
    linkedin: 'https://www.linkedin.com',
    instagram: 'https://www.instagram.com',
  }
};
