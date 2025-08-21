import { decodeToken } from "@/utils/token";
import { decode } from "next-auth/jwt";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { CookieToken } from "../model";
import type { Payload } from "@utils/token";
import type { PayloadProperty, UserProperty } from "./model";

export const propertyFromHeader = async (
    authHeader: string,
    secret: string,
    propertyName: Extract<keyof Payload, string>
): Promise<PayloadProperty | undefined> => {
    const tokenHeader = authHeader.split(" ")[1];
    if (!tokenHeader) {
        return undefined;
    }
    try {
        const secretUint8 = new TextEncoder().encode(secret);
        const decodedToken = await decodeToken(tokenHeader, secretUint8);
        const payload = decodedToken.payload as Payload;
        if (propertyName in payload) {
            return payload[propertyName];
        }
        return undefined;
    } catch (_error) {
        return undefined;
    }
};

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
