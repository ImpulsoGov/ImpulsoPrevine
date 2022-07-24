const withTM = require('next-transpile-modules')(['@impulsogov/design-system']);

module.exports = withTM({
  reactStrictMode: true,
  swcMinify: true,
})
