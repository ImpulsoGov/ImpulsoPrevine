import { unificarSituacaoPorIndicadores } from "@/helpers/inicio/unificarSituacaoPorIndicadores";
import { InicioAPSRequest } from "@/services/inicio/inicioAPS";
import { InicioEquipeRequest } from "@/services/inicio/inicioEquipe";
import { PROFILE_ID } from "@/types/profile";
import InicioPage from "@app/inicio/page";
import { render, screen } from "@testing-library/react";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";

// Mocks para as dependências
jest.mock("next/dynamic", () => () => {
    const mod = require("@app/inicio/Inicio");
    return mod.Inicio;
});

jest.mock("next-auth", () => ({
    getServerSession: jest.fn(),
}));

jest.mock("@services/inicio/inicioAPS", () => ({
    InicioAPSRequest: jest.fn(),
}));

jest.mock("@services/inicio/inicioEquipe", () => ({
    InicioEquipeRequest: jest.fn(),
}));

jest.mock("@helpers/inicio/unificarSituacaoPorIndicadores", () => ({
    unificarSituacaoPorIndicadores: jest.fn(),
}));

jest.mock("@app/inicio/AuthError", () => ({
    AuthErrorPage: jest.fn(() => (
        <div data-testid="auth-error">Auth Error</div>
    )),
}));

jest.mock("@app/inicio/SupportError", () => ({
    SupportError: jest.fn(() => (
        <div data-testid="support-error">Support Error</div>
    )),
}));

jest.mock("@app/inicio/Inicio", () => ({
    Inicio: jest.fn(() => (
        <div data-testid="inicio-component">Inicio Component</div>
    )),
}));

const user = {
    municipio_id_sus: "123",
    access_token: "token",
};

describe("InicioPage", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renderiza AuthErrorPage quando a sessão é null", async () => {
        // Simula ausência de sessão
        (getServerSession as jest.Mock).mockResolvedValue(null);

        const pageElement = await InicioPage();
        render(pageElement);

        expect(screen.getByTestId("auth-error")).toBeInTheDocument();
    });

    test("renderiza SupportError quando unificarSituacaoPorIndicadores é null", async () => {
        // Simula sessão com usuário e perfis APS
        (getServerSession as jest.Mock).mockResolvedValue({
            user: { ...user, perfis: [PROFILE_ID.COAPS] },
        });
        (InicioAPSRequest as jest.Mock).mockResolvedValue([{ some: "data" }]);
        // Simula falha ao unificar dados
        (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue(null);

        const pageElement = await InicioPage();
        render(pageElement);

        expect(screen.getByTestId("support-error")).toBeInTheDocument();
    });

    test("renderiza Inicio quando unificarSituacaoPorIndicadores retorna dados válidos para perfil APS", async () => {
        const validData = { indicator: "value" };

        (getServerSession as jest.Mock).mockResolvedValue({
            user: { ...user, perfis: [PROFILE_ID.COAPS] },
        });
        const clientSession = {
            user: {
                id: "xxxxxxxx",
                nome: "usuarioNome",
                mail: "usuario@mail.com",
                cargo: "impulser",
                municipio: "Impulsolandia - BR",
                equipe: "equipe1",
                municipio_id_sus: "1111111",
                perfis: [5, 8],
                access_token: "token",
            },
            status: "authenticated",
            expires: "1",
        };
        (InicioAPSRequest as jest.Mock).mockResolvedValue([{ some: "data" }]);
        (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue(
            validData,
        );

        const pageElement = await InicioPage();
        render(
            <SessionProvider session={clientSession}>
                {pageElement}
            </SessionProvider>,
        );

        expect(screen.getByTestId("inicio-component")).toBeInTheDocument();
    });

    test("renderiza Inicio quando unificarSituacaoPorIndicadores retorna dados válidos para perfil Equipe", async () => {
        const validData = { indicator: "value" };

        (getServerSession as jest.Mock).mockResolvedValue({
            user: { ...user, perfis: [PROFILE_ID.COEQ], equipe: "equipe1" },
        });
        (InicioEquipeRequest as jest.Mock).mockResolvedValue([
            { some: "data" },
        ]);
        (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue(
            validData,
        );

        const pageElement = await InicioPage();
        render(pageElement);

        expect(screen.getByTestId("inicio-component")).toBeInTheDocument();
    });

    test("deve renderizar SupportError quando unificarSituacaoPorIndicadores retorna objeto vazio", async () => {
        // Configura a sessão com usuário e perfil válido (por exemplo, perfil APS)
        (getServerSession as jest.Mock).mockResolvedValue({
            user: { ...user, perfis: [5] },
        });

        // Simula o retorno válido do request APS
        (InicioAPSRequest as jest.Mock).mockResolvedValue([{ some: "data" }]);

        // Simula que unificarSituacaoPorIndicadores retorna um objeto vazio
        (unificarSituacaoPorIndicadores as jest.Mock).mockResolvedValue({});

        // Obtém o elemento retornado pela função assíncrona
        const pageElement = await InicioPage();
        render(pageElement);

        // Verifica se o componente SupportError foi renderizado
        expect(screen.getByTestId("support-error")).toBeInTheDocument();
    });
});
