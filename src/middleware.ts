import { type NextRequest } from "next/server";
import { middlewareAPIRoutes } from "./middlewares/middlewareAPIRoutes";
import { middlewarePages } from "./middlewares/middlewarePages";

export const middleware = async (request: NextRequest): Promise<Response> => {
    const url = request.nextUrl;
    return url.pathname.startsWith("/api")
        ? middlewareAPIRoutes(request)
        : middlewarePages(request);
};
