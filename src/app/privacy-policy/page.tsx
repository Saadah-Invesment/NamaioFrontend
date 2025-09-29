import type { Metadata } from "next";
import PrivacyPolicy from "./PrivacyPolicy";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// move your UI into a client component

export const metadata: Metadata = {
  title: "Privacy Policy | Tezcai",
  description:
    "Read Tezcai’s Privacy Policy to understand how we collect, use, and protect your personal data while using our smart trading platform.",
  alternates: {
    canonical: "/privacy-policy", // becomes https://tezcai.com/privacy-policy
  },
};


export default function PrivacyPolicyPage() {
return (  <div>
    <Header />
    <PrivacyPolicy />
    <br />
    <Footer />
  </div>);
}
