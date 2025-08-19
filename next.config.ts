import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import withVercelToolbarPlugin from "@vercel/toolbar/plugins/next";

const withVercelToolbar: (config: NextConfig) => NextConfig =
    withVercelToolbarPlugin();

/** @type {import('next').NextConfig} */
const isDev = process.env.ENV === "development";

const nextConfig: NextConfig = {
    //eslint-disable-next-line @typescript-eslint/require-await
    redirects: async () => {
        return [
            {
                source: "/apoio",
                destination:
                    "http://49147153.hs-sites.com/apoio-aos-munic%C3%ADpios-impulsogov",
                permanent: true,
            },

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
    turbopack: {
        resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".mjs"],
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "media.graphassets.com",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "sa-east-1.graphassets.com",
                pathname: "/**",
            },
        ],
    },
    // TODO remover esse configuração quando não houver mais erros de linter
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default isDev
    ? withVercelToolbar(nextConfig)
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
