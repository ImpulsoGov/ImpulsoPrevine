const withTM = require('next-transpile-modules')(['@impulsogov/design-system','echarts','echarts-for-react','react-echarts-wrapper']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
  redirects: async ()=>{
    return [
      {
        source: '/social-medias/linkedin',
        destination: 'https://www.linkedin.com/company/impulsogov/',
        permanent: true
      },
      {
        source: '/social-medias/instagram',
        destination: 'https://www.instagram.com/impulsogov/',
        permanent: true
      },
      {
        source: '/social-medias/twitter',
        destination: 'https://twitter.com/impulsogov',
        permanent: true
      }


    ]
  }
})


// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "impulsogov",
    project: "javascript-nextjs",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
