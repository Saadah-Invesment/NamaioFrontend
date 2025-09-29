"use client";
import { useRouter } from "next/navigation";
import { FiGlobe } from "react-icons/fi";

export default function LanguageSelector({ className = "" }: { className?: string }) {
  const router = useRouter();

  const languages = [
    { code: "en", label: "English" },
    { code: "ar", label: "العربية" },
    { code: "hi", label: "हिंदी" },
    { code: "ur", label: "اردو" },
    { code: "fr", label: "Français" },
    { code: "de", label: "Deutsch" },
    { code: "es", label: "Español" },
  ];

  const handleChange = (code: string) => {
    if (!code) return;
    // reload page at new locale
    const path = window.location.pathname.replace(/^\/[a-z]{2}(\/|$)/, "/"); 
    router.push(`/${code}${path}`);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <FiGlobe className="w-5 h-5" />
      <select
        defaultValue="en"
        onChange={(e) => handleChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-600 bg-gray-900 text-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <option value="">Select Language</option>
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
}
