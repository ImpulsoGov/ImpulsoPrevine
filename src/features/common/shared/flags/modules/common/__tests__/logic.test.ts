import { buildDecide } from "../logic";

describe("buildDecide", () => {
    it("retorna true se a entity está incluida em allowList", () => {
        const allowList = ["joao", "dan", "tai"];
        const decide = buildDecide<string>(allowList);

        expect(decide({ entities: "joao" })).toBe(true);
    });

    it("retorna false se a entity não está em allowList", () => {
        const allowList = [1, 2, 3];
        const decide = buildDecide<number>(allowList);

        expect(decide({ entities: 4 })).toBe(false);
        expect(decide({ entities: 0 })).toBe(false);
    });

    it("retorna false se a entity for undefined", () => {
        const allowList = ["joao", "dan", "tai"];
        const decide = buildDecide<string>(allowList);

        expect(decide({})).toBe(false);
        expect(decide({ entities: undefined })).toBe(false);
    });
});
