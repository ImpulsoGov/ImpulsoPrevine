import type { NextRequest } from "next/server";

const municipiosMigrados = [
    "111111",
    // TODO: códigos SUS dos municípios migrados para o PortalImpulso
];

export const isMunicipioMigrado = (municipioIdSus: string): boolean =>
    municipiosMigrados.includes(municipioIdSus);

export const buildPortalImpulsoUrl = (baseUrl: string): URL | null => {
    if (!baseUrl) return null;
    try {
        const url = new URL(baseUrl);
        url.searchParams.set("usuario_do_ip", "true");
        return url;
    } catch {
        return null;
    }
};

export const isNavigation = (request: NextRequest): boolean =>
    request.headers.get("RSC") !== "1" &&
    request.headers.get("next-router-prefetch") !== "1" &&
    request.headers.get("sec-fetch-mode") === "navigate";
