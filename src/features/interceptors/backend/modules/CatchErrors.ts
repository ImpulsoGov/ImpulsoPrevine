import { AuthenticationError } from "@/utils/token";
import { ZodError } from "zod/v4";
import type { Handler, HandlerWithContext } from "./common/Handler";
import type { NextRequest } from "next/server";

export const catchErrors = <TContext>(
    handler: Handler<TContext>
): HandlerWithContext<TContext> => {
    return async (request: NextRequest, context: TContext) => {
        return handler(request, context).catch((error: unknown) => {
            console.error(error);
            if (error instanceof ZodError) {
                return Response.json(
                    { message: error.message },
                    { status: 400 }
                );
            }

            if (error instanceof AuthenticationError) {
                return Response.json(
                    { message: error.message },
                    { status: 401 }
                );
            }

            return Response.json(
                {
                    message: "Erro ao consultar dados",
                    detail: (error as Error).message,
                },
                { status: 500 }
            );
        });
    };
};
