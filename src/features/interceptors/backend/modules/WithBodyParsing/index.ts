import type { NextRequest } from "next/server";
import type { z } from "zod";
import type { Handler, HandlerWithContext } from "../common/Handler";

type ContextWithParsedBody<TContext, TSchema extends z.ZodType> = TContext & {
    parsedBody: TSchema;
};

export const withBodyParsing = <TSchema extends z.ZodType>(schema: TSchema) => {
    return <TContext>(
        handler: Handler<TContext>
    ): HandlerWithContext<ContextWithParsedBody<TContext, TSchema>> => {
        return async (
            request: NextRequest,
            context: ContextWithParsedBody<TContext, TSchema>
        ): Promise<Response> => {
            const body: unknown = await request.json();
            const parsedBody = schema.parse(body) as TSchema;
            context.parsedBody = parsedBody;

            return handler(request, context);
        };
    };
};
