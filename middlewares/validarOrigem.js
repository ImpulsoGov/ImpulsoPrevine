export const origemPermitida = (req) => {
    if(process.env.ENV === 'dev') return true;
    const allowedOrigins =  process.env.ALLOWED_ORIGINS_PROD;
    if (!allowedOrigins.includes(req.headers.origin)) return false;
    return true;
}