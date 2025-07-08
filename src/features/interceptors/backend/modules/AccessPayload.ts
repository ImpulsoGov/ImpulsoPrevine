import type { JWTToken } from "@/utils/token";
import { decodeToken, getEncodedSecret, getToken } from "@/utils/token";
import type { Context, Handler, HandlerWithPayload } from "..";
import type { NextRequest } from "next/server";

export const accessPayload = (handler: HandlerWithPayload): Handler => {
    return async (
        request: NextRequest,
        context?: Context
    ): Promise<Response> => {
        const token = getToken(request.headers);
        const secret = getEncodedSecret();
        const { payload } = (await decodeToken(token, secret)) as JWTToken;

        return handler(request, context, payload);
    };
};
