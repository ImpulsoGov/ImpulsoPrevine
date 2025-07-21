import { userHasAnyAllowedProfile } from "..";

describe("userHasAnyAllowedProfile", () => {
    it("retorna true se o usuário possui todos os perfis permitidos", () => {
        expect(userHasAnyAllowedProfile([5, 2, 8], [5, 2])).toBe(true);
    });

    it("retorna true se o usuário possui exatamente os perfis permitidos", () => {
        expect(userHasAnyAllowedProfile([8, 2], [8, 2])).toBe(true);
    });

    it("retorna true se o usuário possui algum dos perfis permitidos", () => {
        expect(userHasAnyAllowedProfile([9, 2], [9, 2, 5])).toBe(true);
    });

    it("retorna true se a lista de perfis permitidos está vazia", () => {
        expect(userHasAnyAllowedProfile([5, 2, 8], [])).toBe(true);
    });

    it("retorna false se o usuário não possui nenhum perfil", () => {
        expect(userHasAnyAllowedProfile([], [8])).toBe(false);
    });

    it("retorna true se ambas as listas estão vazias", () => {
        expect(userHasAnyAllowedProfile([], [])).toBe(true);
    });

    it("retorna false se perfis do usuário não batem com os necessários", () => {
        expect(userHasAnyAllowedProfile([8, 5], [9, 2])).toBe(false);
    });
});
