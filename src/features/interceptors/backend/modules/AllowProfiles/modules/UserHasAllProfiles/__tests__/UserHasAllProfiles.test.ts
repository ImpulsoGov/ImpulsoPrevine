import { userHasAllProfiles } from "..";

describe("userHasAllProfiles", () => {
    it("retorna true se o usuário possui todos os perfis", () => {
        expect(userHasAllProfiles([5, 2, 8], [5, 2])).toBe(true);
    });

    it("retorna true se o usuário possui exatamente os perfis necessários", () => {
        expect(userHasAllProfiles([8, 2], [8, 2])).toBe(true);
    });

    it("retorna false se o usuário não possui todos os perfis", () => {
        expect(userHasAllProfiles([9, 2], [9, 2, 5])).toBe(false);
    });

    it("retorna true se a lista de perfis necessários está vazia", () => {
        expect(userHasAllProfiles([5, 2, 8], [])).toBe(true);
    });

    it("retorna false se o usuário não possui nenhum perfil", () => {
        expect(userHasAllProfiles([], [8])).toBe(false);
    });

    it("retorna true se ambas as listas estão vazias", () => {
        expect(userHasAllProfiles([], [])).toBe(true);
    });

    it("retorna false se perfis do usuário não batem com os necessários", () => {
        expect(userHasAllProfiles([8, 5], [9, 2])).toBe(false);
    });
});
