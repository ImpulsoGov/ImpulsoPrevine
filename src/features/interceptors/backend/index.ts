import type { TokenPayload } from "@/utils/token";
// import type { RouteModuleHandleContext } from "next/dist/server/route-modules/route-module";
import type { NextRequest } from "next/server";

export { catchErrors } from "./modules/CatchErrors";
export { accessPayload } from "./modules/AccessPayload";

export type NextRequestWithPayload = NextRequest & {
    payload: TokenPayload;
};

export type Params = Record<string, string | Array<string> | undefined>;

export type Context<TParams extends Params> = {
    params: Promise<TParams>;
};

export type HandlerWithContext<TParams extends Params> = (
    request: NextRequestWithPayload,
    context: Context<TParams>
) => Promise<Response>;

export type HandlerWithoutContext = (
    request: NextRequestWithPayload
) => Promise<Response>;

export type Handler<TParams extends Params> =
    | HandlerWithContext<TParams>
    | HandlerWithoutContext;
