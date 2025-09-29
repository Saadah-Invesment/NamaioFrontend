import React from 'react';
import Link from 'next/link';

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  icon?: React.ReactNode;
  onClick?: () => void;
  target?: string;
  rel?: string;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  href,
  children,
  className = '',
  variant = 'primary',
  icon,
  onClick,
  target,
  rel,
}) => {
  const baseClasses = 'group relative inline-flex items-center px-6 py-3 font-semibold rounded-xl transition-all duration-300 ';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-600 to-green-800 hover:from-blue-700 hover:to-green-900 text-white',
    secondary: 'bg-transparent border-2 border-blue-500 hover:border-blue-400 text-blue-400 hover:text-white',
  };

  const glowEffect = variant === 'primary' ? (
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400 to-green-800 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
  ) : null;

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClasses[variant]} ${className} flex items-center justify-center`}
      onClick={onClick}
      target={target}
      rel={rel}
    >
      {glowEffect}
      <span className="relative flex items-center gap-2">
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    </Link>
  );
};

export default GradientButton;