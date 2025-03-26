import type { NextRequest } from "next/server";
import { middlewareAPIRoutes } from "./middlewares/middlewareAPIRoutes";
import { middlewarePages } from "./middlewares/middlewarePages";

export async function middleware(request: NextRequest) {
    const url = request.nextUrl;
    return url.pathname.startsWith("/api")
        ? middlewareAPIRoutes(request)
        : middlewarePages(request);
}
