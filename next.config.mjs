import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const isDev = process.env.ENV === "development";

const nextConfig = {
    redirects: async () => {
        return [
            {
                source: "/social-medias/linkedin",
                destination: "https://www.linkedin.com/company/impulsogov/",
                permanent: true,
            },
            {
                source: "/social-medias/instagram",
                destination: "https://www.instagram.com/impulsogov/",
                permanent: true,
            },
            {
                source: "/social-medias/twitter",
                destination: "https://twitter.com/impulsogov",
                permanent: true,
            },
        ];
    },
    experimental: {
        turbo: {
            resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs"],
            cache: {
                enabled: true,
                path: "./.turbo-cache",
            },
        },
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.graphassets.com",
                pathname: "/**",
            },
        ],
    },
    // TODO remover esse configuração quando não houver mais erros de linter
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default isDev
    ? nextConfig
    : withSentryConfig(nextConfig, {
        org: "impulsogov",
        project: "impulso-previne",
        silent: !process.env.CI,
        widenClientFileUpload: true,
        reactComponentAnnotation: {
            enabled: true,
        },
        tunnelRoute: "/monitoring",
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
    });
