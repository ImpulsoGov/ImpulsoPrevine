import { matchesRoute } from "../";

describe("matchesRoute", () => {
    it("retorna true se currentPath for exatamente igual a um dos paths", () => {
        const paths = ["/home", "/about", "/contact"];
        const currentPath = "/about";
        expect(matchesRoute(paths, currentPath)).toBe(true);
    });

    it('retorna true se currentPath começar com um dos paths seguido de "/"', () => {
        const paths = ["/blog", "/docs"];
        const currentPath = "/blog/post-1";
        expect(matchesRoute(paths, currentPath)).toBe(true);
    });

    it("retorna false se currentPath não for igual nem começar com nenhum dos paths", () => {
        const paths = ["/home", "/about"];
        const currentPath = "/contact";
        expect(matchesRoute(paths, currentPath)).toBe(false);
    });

    it('retorna false para coincidência parcial que não segue "/"', () => {
        const paths = ["/app"];
        const currentPath = "/application"; // não deve passar
        expect(matchesRoute(paths, currentPath)).toBe(false);
    });

    it("retorna false se paths estiver vazio", () => {
        const paths: Array<string> = [];
        const currentPath = "/any";
        expect(matchesRoute(paths, currentPath)).toBe(false);
    });
});
