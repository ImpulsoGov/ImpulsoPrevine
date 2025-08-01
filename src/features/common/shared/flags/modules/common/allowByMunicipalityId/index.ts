import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
    municipalityIdSusFromCookie,
    municipalityIdSusFromHeader,
} from "./logic";
import type { MunicipalityIdSus } from "./model";

export type { MunicipalityIdSus } from "./model";

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

type DecideFn = (decideParams: { entities?: MunicipalityIdSus }) => boolean;

export const buildDecide = (allowList: Array<MunicipalityIdSus>): DecideFn => {
    return ({
        entities: municipalityIdSus,
    }: {
        entities?: MunicipalityIdSus;
    }): boolean => {
        return !!municipalityIdSus && allowList.includes(municipalityIdSus);
    };
};
