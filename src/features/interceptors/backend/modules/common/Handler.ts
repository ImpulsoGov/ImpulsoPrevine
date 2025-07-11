import type { NextRequest } from "next/server";

export type HandlerWithContext<TContext> = (
    request: NextRequest,
    context: TContext
) => Promise<Response>;

export type HandlerWithoutContext = (request: NextRequest) => Promise<Response>;

export type Handler<TContext> =
    | HandlerWithContext<TContext>
    | HandlerWithoutContext;
