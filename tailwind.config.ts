import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Satoshi','ui-sans-serif','system-ui']
      },
       backdropBlur: {
        xs: '2px',
        sm: '4px',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",

        "pyellow": "var(--pyellow)",
        "brown": "var(--brown)",
        "lightgrey": "var(--lightgrey)",
        "success": "var(--success)",
        "error": "var(--error)",

        "primary-accent": "var(--primary-accent)",
        "foreground-accent": "var(--foreground-accent)",
        "hero-background": "var(--hero-background)",

      },
    },
  },
  plugins: [],
};
export default config;
