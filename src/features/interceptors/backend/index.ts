import type { TokenPayload } from "@/utils/token";
import type { NextRequest } from "next/server";

export { catchErrors } from "./modules/CatchErrors";
export { accessPayload } from "./modules/AccessPayload";

export type Context = {
    params: Promise<unknown>;
};

export type Handler = (
    request: NextRequest,
    context?: Context
) => Promise<Response>;

export type HandlerWithPayload = (
    request: NextRequest,
    context?: Context,
    payload?: TokenPayload
) => Promise<Response>;
