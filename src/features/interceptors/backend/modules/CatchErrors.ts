import { AuthenticationError } from "@/utils/token";
import { ZodError } from "zod/v4";
import type { Context, Handler, NextRequestWithUser, Params } from "..";

export const catchErrors = <TParams extends Params>(
    handler: Handler<TParams>
): Handler<TParams> => {
    return async (request: NextRequestWithUser, context: Context<TParams>) => {
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
