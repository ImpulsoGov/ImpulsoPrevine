import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { MunicipalityIdSus } from "../../diabetesNewProgram";
import {
    municipalityIdSusFromCookie,
    municipalityIdSusFromHeader,
} from "../getMunicipalityIdSus/getMunicipalityIdSus";

export const identify = async ({
    headers,
    cookies,
}: {
    headers: Headers;
    cookies: ReadonlyRequestCookies;
}): Promise<MunicipalityIdSus> => {
    const authHeader = headers.get("authorization");
    const secret = process.env.NEXTAUTH_SECRET || "";
    return authHeader
        ? await municipalityIdSusFromHeader(authHeader, secret)
        : await municipalityIdSusFromCookie(cookies, secret);
};
