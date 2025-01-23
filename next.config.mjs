import { withSentryConfig } from '@sentry/nextjs';
/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'dev';

const nextConfig = {
    redirects: async () => {
      return [
        {
          source: '/social-medias/linkedin',
          destination: 'https://www.linkedin.com/company/impulsogov/',
          permanent: true,
        },
        {
          source: '/social-medias/instagram',
          destination: 'https://www.instagram.com/impulsogov/',
          permanent: true,
        },
        {
          source: '/social-medias/twitter',
          destination: 'https://twitter.com/impulsogov',
          permanent: true,
        },
      ];
    },
    experimental: {
      turbo: {
        resolveExtensions: [
          '.tsx',
          '.ts',
          '.jsx',
          '.js',
          '.mjs',
        ],
        cache:{
          enabled: true,
          path: './.turbo-cache',
        }
      }
    },
};

export default 
  isDev ?
  nextConfig :
  withSentryConfig(nextConfig, {
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
