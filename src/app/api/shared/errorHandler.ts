import { ZodError } from "zod/v4";
import { BadRequestError, AuthenticationError } from "./errors";

export const errorHandler = (error: unknown): Response => {
    console.error(error);
    if (error instanceof ZodError) {
        return Response.json({ message: error.message }, { status: 400 });
    }
    if (error instanceof BadRequestError) {
        return Response.json({ message: error.message }, { status: 400 });
    }

    if (error instanceof AuthenticationError) {
        return Response.json({ message: error.message }, { status: 401 });
    }

    return Response.json(
        {
            message: "Erro ao consultar dados",
            detail: (error as Error).message,
        },
        { status: 500 }
    );
};
