import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
// import {
//     municipalityIdSusFromCookie,
//     municipalityIdSusFromHeader,
// } from "./logic";
import type { MunicipalityIdSus } from "./model";
import { propertyFromCookie, propertyFromHeader } from "../logic";
export { buildDecide } from "../logic";
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
        ? ((await propertyFromHeader(
              authHeader,
              secret,
              "municipio"
          )) as MunicipalityIdSus)
        : ((await propertyFromCookie(
              cookies,
              secret,
              "municipio_id_sus"
          )) as MunicipalityIdSus);
};
