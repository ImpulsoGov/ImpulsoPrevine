import type { NextApiRequest } from "next";

export const origemPermitida = (req: NextApiRequest) => {
	if (process.env.ENV === "development") return true;
	const allowedOrigins = process.env.ALLOWED_ORIGINS_PROD;
	if (!allowedOrigins) return false;
	if (!req.headers.origin || !allowedOrigins.includes(req.headers.origin))
		return false;
	return true;
};
