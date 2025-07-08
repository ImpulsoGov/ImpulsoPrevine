import { AuthenticationError } from "@/utils/token";
import type { NextRequest } from "next/server";
import { ZodError } from "zod";

type Context = {
    params: Promise<unknown>;
};

type Handler = (request: NextRequest, context?: Context) => Promise<Response>;

export const catchErrors = (handler: Handler): Handler => {
    return async (request: NextRequest, context?: Context) => {
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
