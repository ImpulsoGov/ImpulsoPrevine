import { decide } from "..";

describe("decide", () => {
    it("retorna true se municipalityIdSus estiver na lista de permitidos", () => {
        const hasResult = decide({ entities: "111111" });
        expect(hasResult).toBe(true);
    });

    it("retorna false se municipalityIdSus não estiver na lista de permitidos", () => {
        const hasResult = decide({ entities: "999999" });
        expect(hasResult).toBe(false);
    });

    it("retorna false se municipalityIdSus for undefined", () => {
        const hasResult = decide({ entities: undefined });
        expect(hasResult).toBe(false);
    });
});
