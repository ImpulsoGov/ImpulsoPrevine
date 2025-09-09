import type { NextRequest } from "next/server";
import type { z } from "zod/v4";
import type { Handler, HandlerWithContext } from "../common/Handler";

type ContextWithParsedBody<TContext, TSchema extends z.ZodType> = TContext & {
    parsedBody: z.infer<TSchema>;
};

//TODO: Este interceptor só funciona se for o primeiro no compose.
//      Precisamos descobrir o que tá rolando, pra não fazer o parse do body em casos em que o request não deveria passar
export const withBodyParsing = <TSchema extends z.ZodType>(schema: TSchema) => {
    return <TContext>(
        handler: Handler<TContext>
    ): HandlerWithContext<ContextWithParsedBody<TContext, TSchema>> => {
        return async (
            request: NextRequest,
            context: ContextWithParsedBody<TContext, TSchema>
        ): Promise<Response> => {
            const body: unknown = await request.json();
            const parsedBody = schema.parse(body);
            context.parsedBody = parsedBody;

            return handler(request, context);
        };
    };
};
