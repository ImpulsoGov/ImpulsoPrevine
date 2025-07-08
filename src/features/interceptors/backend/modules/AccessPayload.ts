import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { Context, HandlerWithPayload, NextRequestWithPayload } from "..";

export const accessPayload = (
    handler: HandlerWithPayload
): HandlerWithPayload => {
    return async (
        request: NextRequestWithPayload,
        context?: Context
    ): Promise<Response> => {
        const token = getToken(request.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;

        request.payload = payload;

        return handler(request, context);
    };
};
