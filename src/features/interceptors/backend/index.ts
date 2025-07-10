// import type { RouteModuleHandleContext } from "next/dist/server/route-modules/route-module";
import type { NextRequest } from "next/server";

export { catchErrors } from "./modules/CatchErrors";
export { withUser } from "./modules/WithUser";
export { compose } from "./modules/Compose";

export type NextRequestWithUser = NextRequest & {
    user: {
        municipalitySusId: string;
        teamIne: string;
        profiles: Array<number>;
    };
};

export type Params = Record<string, string | Array<string> | undefined>;

export type Context<TParams extends Params> = {
    params: Promise<TParams>;
};

export type HandlerWithContext<TParams extends Params> = (
    request: NextRequestWithUser,
    context: Context<TParams>
) => Promise<Response>;

export type HandlerWithoutContext = (
    request: NextRequestWithUser
) => Promise<Response>;

export type Handler<TParams extends Params> =
    | HandlerWithContext<TParams>
    | HandlerWithoutContext;
