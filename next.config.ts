import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
                port: '', // Optional, leave empty if not using a specific port
                pathname: '/**', // Match any path under this hostname
            },
            {
                protocol: 'https',
                hostname: 'img.spoonacular.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'cmubvhgmlnwyoyyashvr.supabase.co',
                port: '',
                pathname: '/storage/v1/object/public/profile_images/**', // Match your Supabase storage path
            },
        ],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
