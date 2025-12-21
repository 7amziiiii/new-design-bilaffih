import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Add specific brand colors if extracted later, otherwise use Tailwind defaults
                brand: {
                    black: '#000000',
                    dark: '#111111',
                    accent: '#ffffff',
                }
            },
        },
    },
    plugins: [],
};
export default config;
