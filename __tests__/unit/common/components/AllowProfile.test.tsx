import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AllowProfile } from "@/features/common/components/AllowProfile";
import { getServerSession, type Session } from "next-auth";
import { PROFILE_ID } from "@/types/profile";

jest.mock("next-auth", () => {
    return {
        getServerSession: jest.fn(),
    };
});
const mockGetServerSession = getServerSession as jest.Mock;

// Elementos de teste para error e children
const DummyError: React.FC = () => (
    <div data-testid="error">Erro: acesso negado</div>
);
const DummyChild: React.FC = () => (
    <div data-testid="child">Conteúdo permitido</div>
);

const user = {
    id: "e9b07b5c-4e51-4324-a5e2-93f3cf09a330",
    nome: "Usuário Teste",
    mail: "usuario@mail.com",
    cargo: "Cargo Teste",
    municipio: "Impulsolandia",
    equipe: "Equipe Teste",
    municipio_id_sus: "111111",
    access_token: "token",
};

describe("AllowProfile", () => {
    it("deve renderizar os children quando o usuário possui o perfil requerido", async () => {
        const allowedUser: Session["user"] = { ...user, perfis: [2, 5, 8] };
        mockGetServerSession.mockResolvedValue({
            user: allowedUser,
        });
        const allowedProfile = PROFILE_ID.impulser;
        const result = await AllowProfile({
            error: <DummyError />,
            profileID: allowedProfile,
            children: <DummyChild />,
        });
        render(result);

        // Verifica se o conteúdo permitido está presente e o erro não
        await waitFor(() => {
            expect(screen.getByTestId("child")).toBeInTheDocument();
        });
        await waitFor(() => {
            expect(screen.queryByTestId("error")).not.toBeInTheDocument();
        });
    });

    it("deve renderizar o erro quando o usuário não possui o perfil requerido", async () => {
        const notAllowedUser = { ...user, perfis: [2, 8] };
        const allowedProfile = PROFILE_ID.impulser;
        mockGetServerSession.mockResolvedValue({
            user: notAllowedUser,
        });
        const result = await AllowProfile({
            error: <DummyError />,
            profileID: allowedProfile,
            children: <DummyChild />,
        });
        render(result);
        // Verifica se o erro está presente e o conteúdo permitido não
        expect(screen.getByTestId("error")).toBeInTheDocument();
        expect(screen.queryByTestId("child")).not.toBeInTheDocument();
    });
});

it("deve renderizar o erro quando o usuário não possui o perfis atribuidos", async () => {
    const notAllowedUser = { ...user, perfis: [] };
    const allowedProfile = PROFILE_ID.impulser;
    mockGetServerSession.mockResolvedValue({
        user: notAllowedUser,
    });
    const result = await AllowProfile({
        error: <DummyError />,
        profileID: allowedProfile,
        children: <DummyChild />,
    });
    render(result);
    // Verifica se o erro está presente e o conteúdo permitido não
    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.queryByTestId("child")).not.toBeInTheDocument();
});
