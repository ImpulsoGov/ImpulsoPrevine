import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { NextRequest } from "next/server";
import type { Handler, HandlerWithContext } from "../common/Handler";

export type User = {
    municipalitySusId: string;
    teamIne: string;
    profiles: Array<number>;
};

export type ContextWithUser<TContext> = TContext & {
    user: User;
};

export const withUser = <TContext>(
    handler: Handler<ContextWithUser<TContext>>
): HandlerWithContext<TContext> => {
    return async (
        request: NextRequest,
        context: TContext
    ): Promise<Response> => {
        const token = getToken(request.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;

        const contextWithUser: ContextWithUser<TContext> = {
            ...context,
            user: {
                municipalitySusId: payload.municipio,
                teamIne: payload.equipe,
                profiles: payload.perfis,
            },
        };

        return handler(request, contextWithUser);
    };
};
