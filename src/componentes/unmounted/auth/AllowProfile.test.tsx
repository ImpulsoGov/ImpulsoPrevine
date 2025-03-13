import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AllowProfile } from "@componentes/unmounted/auth/AllowProfile";
import type { Session } from "next-auth";
import type { ImpulserProfileID } from "@/types/profile";

// Elementos de teste para error e children
const DummyError = () => <div data-testid="error">Erro: acesso negado</div>
const DummyChild = () => <div data-testid="child">Conteúdo permitido</div>

describe("AllowProfile", () => {
  it("deve renderizar os children quando o usuário possui o perfil requerido", () => {
    const user : Session['user'] = {
      id: "e9b07b5c-4e51-4324-a5e2-93f3cf09a330",
      nome: "Usuário Teste",
      mail: "usuario@mail.com",
      cargo: "Cargo Teste",
      municipio: "Impulsolandia",
      equipe: "Equipe Teste",
      municipio_id_sus: "111111",
      perfis: [2,5,8],
      access_token: "token",
    };
    const profileAllowed: ImpulserProfileID = 5 
    render(
      <AllowProfile user={user} error={<DummyError />} profileID={profileAllowed}>
        <DummyChild />
      </AllowProfile>
    )
    // Verifica se o conteúdo permitido está presente e o erro não
    expect(screen.getByTestId("child")).toBeInTheDocument()
    expect(screen.queryByTestId("error")).not.toBeInTheDocument()
  })

  it("deve renderizar o erro quando o usuário não possui o perfil requerido", () => {
    const user : Session['user'] = {
      id: "e9b07b5c-4e51-4324-a5e2-93f3cf09a330",
      nome: "Usuário Teste",
      mail: "usuario@mail.com",
      cargo: "Cargo Teste",
      municipio: "Impulsolandia",
      equipe: "Equipe Teste",
      municipio_id_sus: "111111",
      perfis: [2,8],
      access_token: "token",
    };
    const profileAllowed: ImpulserProfileID = 5 
    render(
      <AllowProfile user={user} error={<DummyError />} profileID={profileAllowed}>
        <DummyChild />
      </AllowProfile>
    )
    // Verifica se o erro está presente e o conteúdo permitido não
    expect(screen.getByTestId("error")).toBeInTheDocument()
    expect(screen.queryByTestId("child")).not.toBeInTheDocument()
  })
})
