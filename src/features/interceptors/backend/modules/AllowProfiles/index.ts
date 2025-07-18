import type { NextRequest } from "next/server";
import type { Handler, HandlerWithContext } from "../common/Handler";
import type { ProfileIdValue } from "@/types/profile";
import { AuthorizationError } from "@/features/errors/backend";
import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import { userHasAllProfiles } from "./modules/UserHasAllProfiles";

export const allowProfiles = (profiles: Array<ProfileIdValue>) => {
    return <TContext>(
        handler: Handler<TContext>
    ): HandlerWithContext<TContext> => {
        return async (
            request: NextRequest,
            context: TContext
        ): Promise<Response> => {
            const token = getToken(request.headers);
            const secret = getEncodedSecret();
            const {
                payload: { perfis: userProfiles },
            } = (await decodeToken(token, secret)) as JWTToken;
            const isUserAllowed = userHasAllProfiles(userProfiles, profiles);

            if (!isUserAllowed) {
                throw new AuthorizationError(
                    "Usuário não autorizado a acessar esta rota"
                );
            }

            return handler(request, context);
        };
    };
};
