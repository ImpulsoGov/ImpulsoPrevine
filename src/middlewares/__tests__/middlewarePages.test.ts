/**
 * @jest-environment node
 */
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { isMunicipioMigrado } from "@features/common/shared/municipiosMigrados";
import { middlewarePages } from "../middlewarePages";

jest.mock("next-auth/jwt");
// Factory em vez de automock: sem ela o jest carrega o módulo real só para
// descobrir o formato, e com ele o build server do Sentry, que não resolve aqui.
jest.mock("@features/common/shared/municipiosMigrados", () => ({
    isMunicipioMigrado: jest.fn(),
}));

const getTokenMock = getToken as jest.MockedFunction<typeof getToken>;
const isMunicipioMigradoMock = isMunicipioMigrado as jest.MockedFunction<
    typeof isMunicipioMigrado
>;

const PORTAL = "https://portal.impulsogov.org/inicio";

const navegacao = (path: string): NextRequest =>
    new NextRequest(`https://ip.impulsogov.org${path}`, {
        headers: { "sec-fetch-mode": "navigate" },
    });

const prefetch = (path: string): NextRequest =>
    new NextRequest(`https://ip.impulsogov.org${path}`, {
        headers: { "sec-fetch-mode": "navigate", RSC: "1" },
    });

describe("middlewarePages: redirecionamento para o Portal", () => {
    beforeEach(() => {
        process.env.PORTAL_IMPULSO_URL = PORTAL;
        getTokenMock.mockResolvedValue({
            user: { municipio_id_sus: "350190" },
        } as unknown as Awaited<ReturnType<typeof getToken>>);
    });

    it("manda o município migrado para o Portal, marcando a origem", async () => {
        isMunicipioMigradoMock.mockResolvedValue(true);

        const resposta = await middlewarePages(navegacao("/inicio"));

        expect(resposta.status).toBe(307);
        expect(resposta.headers.get("location")).toBe(
            `${PORTAL}?usuario_do_ip=true`
        );
    });

    it("deixa o município não migrado seguir no IP", async () => {
        isMunicipioMigradoMock.mockResolvedValue(false);

        const resposta = await middlewarePages(navegacao("/inicio"));

        expect(resposta.headers.get("location")).toBeNull();
    });

    it("não redireciona prefetch: só navegação de verdade", async () => {
        isMunicipioMigradoMock.mockResolvedValue(true);

        const resposta = await middlewarePages(prefetch("/inicio"));

        expect(resposta.headers.get("location")).toBeNull();
        expect(isMunicipioMigradoMock).not.toHaveBeenCalled();
    });

    it("não consulta o mapa de quem não está logado", async () => {
        getTokenMock.mockResolvedValue(null);

        await middlewarePages(navegacao("/inicio"));

        expect(isMunicipioMigradoMock).not.toHaveBeenCalled();
    });

    it("segue no IP quando falta a URL do Portal", async () => {
        delete process.env.PORTAL_IMPULSO_URL;
        isMunicipioMigradoMock.mockResolvedValue(true);

        const resposta = await middlewarePages(navegacao("/inicio"));

        expect(resposta.headers.get("location")).toBeNull();
    });
});
