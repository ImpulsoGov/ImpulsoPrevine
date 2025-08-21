import { decodeToken } from "@/utils/token";
import { decode } from "next-auth/jwt";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { CookieToken } from "../model";
import type { Payload } from "@utils/token";

type PayloadProperty = Payload[keyof Payload];
export const propertyFromHeader = async (
    authHeader: string,
    secret: string,
    propertyName: keyof Payload
): Promise<PayloadProperty | undefined> => {
    const tokenHeader = authHeader.split(" ")[1];
    try {
        const secretUint8 = new TextEncoder().encode(secret);
        const decodedToken = await decodeToken(tokenHeader, secretUint8);
        const payload = decodedToken.payload as Payload;
        return payload[propertyName];
    } catch (_error) {
        return undefined;
    }
};

type UserProperty = CookieToken["user"][keyof CookieToken["user"]];

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
