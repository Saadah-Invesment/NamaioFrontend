import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
  {
    question: `Is ${siteDetails.siteName} secure?`,
    answer:
      "Absolutely. We use bank-level encryption and secure APIs to protect your data. Tezcai never stores your exchange credentials and supports two-factor authentication for extra protection.",
  },
  {
    question: `Can I use ${siteDetails.siteName} on multiple devices?`,
    answer:
      `${siteDetails.siteName} syncs seamlessly across desktop, tablet, and mobile devices, so you can manage your trading from anywhere in real time.`,
  },
  {
    question: 'Do I need trading experience to use Tezcai?',
    answer:
      "Not at all! Tezcai is built for everyone — whether you're a beginner or a pro. Just set your preferences, and our AI will handle the rest.",
  },
  {
    question: 'How does Tezcai choose when to trade?',
    answer:
      "Tezcai continuously scans market conditions and identifies top volatility signals. It then executes trades based on your configured strategy and risk profile.",
  },
  {
    question: 'What if I need help using the platform?',
    answer:
      "Our expert support team is available 24/7 via email and live chat. You’ll also find in-app tutorials and step-by-step guides to walk you through every feature.",
  },
];
