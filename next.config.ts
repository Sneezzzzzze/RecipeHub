import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", 'img.spoonacular.com'], // ✅ Allow Google profile images
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
