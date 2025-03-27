import dadosPublicosPage from "@/app/analise/page";
import { PROFILE_ID } from "@/types/profile";
import { render, screen } from "@testing-library/react";
import { SessionProvider } from "next-auth/react";

// Mocks para as dependências
jest.mock("next/dynamic", () => () => {
    const mod = require("@/app/analise/Analise");
    return mod.Analise;
});

jest.mock("@/app/analise/Analise", () => ({
    Analise: jest.fn(() => (
        <div data-testid="analise-component">Analise Component</div>
    )),
}));

const clientSession = {
    user: {
        id: "xxxxxxxx",
        nome: "usuarioNome",
        mail: "usuario@mail.com",
        cargo: "impulser",
        municipio: "Impulsolandia - BR",
        equipe: "equipe1",
        municipio_id_sus: "1111111",
        perfis: [PROFILE_ID.impulser, PROFILE_ID.COAPS],
        access_token: "token",
    },
    status: "authenticated",
    expires: "1",
};

describe("dadosPublicos", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renderiza dados públicos quando o usuário não está logado", () => {
        // Simula ausência de sessão
        const pageElement = dadosPublicosPage();
        render(<SessionProvider session={null}>{pageElement}</SessionProvider>);

        expect(screen.getByTestId("analise-component")).toBeInTheDocument();
    });

    test("renderiza página de dados públicos quando o usuário está logado", () => {
        const pageElement = dadosPublicosPage();
        render(
            <SessionProvider session={clientSession}>
                {pageElement}
            </SessionProvider>,
        );

        expect(screen.getByTestId("analise-component")).toBeInTheDocument();
    });
});
