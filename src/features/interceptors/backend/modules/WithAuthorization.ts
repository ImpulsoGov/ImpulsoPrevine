import type { NextRequest } from "next/server";
import type { Handler, HandlerWithContext } from "./common/Handler";
import type { ProfileIdValue } from "@/types/profile";
import type { ContextWithUser } from "./WithUser";
import { AuthorizationError } from "@/features/errors/backend";

export const withAuthorization = (
    authorizedProfiles: Array<ProfileIdValue>
) => {
    return <TContext>(
        handler: Handler<ContextWithUser<TContext>>
    ): HandlerWithContext<ContextWithUser<TContext>> => {
        return async (
            request: NextRequest,
            context: ContextWithUser<TContext>
        ): Promise<Response> => {
            const userProfiles = context.user.profiles;
            const isUserAuthorized = authorizedProfiles.every((profile) =>
                userProfiles.includes(profile)
            );

            if (!isUserAuthorized) {
                throw new AuthorizationError(
                    "Usuário não autorizado a acessar esta rota"
                );
            }

            return handler(request, context);
        };
    };
};
