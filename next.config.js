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
