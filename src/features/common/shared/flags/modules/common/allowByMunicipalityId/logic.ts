import { decodeToken } from "@/utils/token";
import { decode } from "next-auth/jwt";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { CookieToken, MunicipalityIdSus } from "./model";

export const municipalityIdSusFromHeader = async (
    authHeader: string,
    secret: string
): Promise<string | undefined> => {
    const tokenHeader = authHeader.split(" ")[1];
    try {
        const secretUint8 = new TextEncoder().encode(secret);
        const decodedToken = await decodeToken(tokenHeader, secretUint8);
        if (typeof decodedToken.payload.municipio !== "string")
            return undefined;
        return decodedToken.payload.municipio as MunicipalityIdSus;
    } catch (_error) {
        return undefined;
    }
};

export const municipalityIdSusFromCookie = async (
    cookies: ReadonlyRequestCookies | undefined,
    secret: string
): Promise<string | undefined> => {
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
    return tokenDecoded.user.municipio_id_sus;
};
