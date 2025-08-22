import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { propertyFromCookie } from "@/features/common/shared/auth";
import type { UserId } from "./model";
import { safePropertyFromHeader } from "../safePropertyFromHeader";
export { buildDecide } from "../buildDecide";

export const identify = async ({
    headers,
    cookies,
}: {
    headers: Headers;
    cookies: ReadonlyRequestCookies;
}): Promise<UserId | undefined> => {
    const authHeader = headers.get("authorization");
    const secret = process.env.NEXTAUTH_SECRET || "";
    return authHeader
        ? ((await safePropertyFromHeader(authHeader, secret, "id")) as UserId)
        : ((await propertyFromCookie(cookies, secret, "id")) as UserId);
};
