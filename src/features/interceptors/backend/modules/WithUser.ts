import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { User } from "..";
import type { Handler } from "./common/Handler";
import type { NextRequest } from "next/server";

type ContextWithUser<TContext> = TContext & {
    user: User;
};

// TODO: retornar sempre HandlerWithContext?
export const withUser = <TContext>(
    handler: Handler<TContext>
): Handler<ContextWithUser<TContext>> => {
    return async (
        request: NextRequest,
        context: ContextWithUser<TContext>
    ): Promise<Response> => {
        const token = getToken(request.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;

        // TODO: usar Object.assign para não alterar o parâmetro
        context.user = {
            municipalitySusId: payload.municipio,
            teamIne: payload.equipe,
            profiles: payload.perfis,
        };

        return handler(request, context);
    };
};
