import type { NextRequest } from "next/server";

export { catchErrors } from "./modules/CatchErrors";

export type Context = {
    params: Promise<unknown>;
};

export type Handler = (
    request: NextRequest,
    context?: Context
) => Promise<Response>;
