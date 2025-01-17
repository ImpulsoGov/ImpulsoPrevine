export const baseURL = () => {
    if(process.env.VERCEL_ENV == 'production') return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    if(process.env.VERCEL_ENV == 'preview') return `https://${process.env.VERCEL_BRANCH_URL}`
    if(process.env.ENV == 'dev') return `http://${process.env.VERCEL_BRANCH_URL}`
    return 'http://localhost:3000'
}