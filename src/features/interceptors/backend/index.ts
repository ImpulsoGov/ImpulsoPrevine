import type { NextRequest } from "next/server";

export { catchErrors } from "./modules/CatchErrors";
export { withUser } from "./modules/WithUser";
export { compose } from "./modules/Compose";

// TODO: mover esse tipo pra outro lugar
export type User = {
    municipalitySusId: string;
    teamIne: string;
    profiles: Array<number>;
};

export type HandlerWithContext<TContext> = (
    request: NextRequest,
    context: TContext
) => Promise<Response>;

export type HandlerWithoutContext = (request: NextRequest) => Promise<Response>;

export type Handler<TContext> =
    | HandlerWithContext<TContext>
    | HandlerWithoutContext;
