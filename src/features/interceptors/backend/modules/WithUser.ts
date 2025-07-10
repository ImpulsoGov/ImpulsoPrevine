import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { Context, Handler, NextRequestWithUser, Params } from "..";

// TODO: retornar sempre HandlerWithContext?
export const withUser = <TParams extends Params>(
    handler: Handler<TParams>
): Handler<TParams> => {
    return async (
        request: NextRequestWithUser,
        context: Context<TParams>
    ): Promise<Response> => {
        const token = getToken(request.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;

        request.user = {
            municipalitySusId: payload.municipio,
            teamIne: payload.equipe,
            profiles: payload.perfis,
        };

        return handler(request, context);
    };
};
