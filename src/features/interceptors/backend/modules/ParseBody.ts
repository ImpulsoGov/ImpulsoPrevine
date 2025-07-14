import type { z } from "zod/v4";
import type { Handler } from "./common/Handler";
import type { NextRequest } from "next/server";

type ContextWithParsedBody<TContext, TSchema extends z.ZodType> = TContext & {
    parsedBody: TSchema;
};

type Interceptor<TContext, TSchema extends z.ZodType> = (
    handler: Handler<TContext>
) => Handler<ContextWithParsedBody<TContext, TSchema>>;

export const parseBody = <TContext, TSchema extends z.ZodType>(
    schema: TSchema
): Interceptor<TContext, TSchema> => {
    return (handler: Handler<TContext>) => {
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
