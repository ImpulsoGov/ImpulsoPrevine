import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
    propertyFromHeader,
    propertyFromCookie,
} from "@/features/common/shared/auth";
import type { UserId } from "./model";
export { buildDecide } from "../logic";

export const identify = async ({
    headers,
    cookies,
}: {
    headers: Headers;
    cookies: ReadonlyRequestCookies;
}): Promise<UserId> => {
    const authHeader = headers.get("authorization");
    const secret = process.env.NEXTAUTH_SECRET || "";
    return authHeader
        ? ((await propertyFromHeader(authHeader, secret, "id")) as UserId)
        : ((await propertyFromCookie(cookies, secret, "id")) as UserId);
};
