'use client'

import NamaioLogo from "@/components/Logo/NamaioLogo";
import { useState } from "react";
export const BlogImage: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-40 bg-background flex items-center justify-center">
        <NamaioLogo />
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