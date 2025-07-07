import { checkPath } from "../";

describe("checkPath", () => {
    it("retorna true se currentPath for exatamente igual a um dos paths", () => {
        const paths = ["/home", "/about", "/contact"];
        const currentPath = "/about";
        expect(checkPath(paths, currentPath)).toBe(true);
    });

    it('retorna true se currentPath começar com um dos paths seguido de "/"', () => {
        const paths = ["/blog", "/docs"];
        const currentPath = "/blog/post-1";
        expect(checkPath(paths, currentPath)).toBe(true);
    });

    it("retorna false se currentPath não for igual nem começar com nenhum dos paths", () => {
        const paths = ["/home", "/about"];
        const currentPath = "/contact";
        expect(checkPath(paths, currentPath)).toBe(false);
    });

    it('retorna false para coincidência parcial que não segue "/"', () => {
        const paths = ["/app"];
        const currentPath = "/application"; // não deve passar
        expect(checkPath(paths, currentPath)).toBe(false);
    });

    it("retorna false se paths estiver vazio", () => {
        const paths: Array<string> = [];
        const currentPath = "/any";
        expect(checkPath(paths, currentPath)).toBe(false);
    });
});
