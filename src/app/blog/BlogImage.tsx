'use client'
import TezcaiLogo from "@/components/Logo/TezcaiLogo";
import { useState } from "react";
export const BlogImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-40 bg-gray-700 flex items-center justify-center">
        <TezcaiLogo />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-40 object-cover"
      onError={() => setError(true)}
    />
  );
};