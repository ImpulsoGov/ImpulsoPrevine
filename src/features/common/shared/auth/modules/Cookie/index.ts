import { decode } from "next-auth/jwt";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type {
    CookieToken,
    UserProperty,
} from "../../../flags/modules/common/model"; //TODO: alterar para import de caminho absoluto

export const propertyFromCookie = async (
    cookies: ReadonlyRequestCookies | undefined,
    secret: string,
    propertyName: keyof CookieToken["user"]
): Promise<UserProperty | undefined> => {
    const isDev = process.env.ENV === "development";
    const cookieName = isDev
        ? "next-auth.session-token"
        : "__Secure-next-auth.session-token";
    const token = cookies?.get(cookieName)?.value;
    const decoded = await decode({
        token: token,
        secret: secret,
    });
    if (!decoded) return undefined;
    const tokenDecoded = decoded as CookieToken;
    return tokenDecoded.user[propertyName];
};
