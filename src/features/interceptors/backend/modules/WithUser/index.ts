import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { Handler, HandlerWithContext } from "../common/Handler";
import type { NextRequest } from "next/server";

export type User = {
    municipalitySusId: string;
    teamIne: string;
    profiles: Array<number>;
};

export type ContextWithUser<TContext> = TContext & {
    user: User;
};

export const withUser = <TContext>(
    handler: Handler<TContext>
): HandlerWithContext<ContextWithUser<TContext>> => {
    return async (
        request: NextRequest,
        context: ContextWithUser<TContext>
    ): Promise<Response> => {
        const token = getToken(request.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;

        context.user = {
            municipalitySusId: payload.municipio,
            teamIne: payload.equipe,
            profiles: payload.perfis,
        };

        return handler(request, context);
    };
};
