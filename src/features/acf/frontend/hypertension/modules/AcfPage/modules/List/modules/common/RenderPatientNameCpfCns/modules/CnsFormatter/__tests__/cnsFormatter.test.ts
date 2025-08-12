import { cnsFormatter } from "..";

describe("cnsFormatter", () => {
    it("deve formatar corretamente um CNS com 15 dígitos", () => {
        const cns = "123456789012345";
        const formattedCns = cnsFormatter(cns);
        expect(formattedCns).toBe("123 4567 8901 2345");
    });

    it("deve formatar corretamente um CNS com menos de 15 dígitos", () => {
        const cns = "12345678901234";
        const formattedCns = cnsFormatter(cns);
        expect(formattedCns).toBe("123 4567 8901 234");
    });

    it("deve formatar um CNS com mais de 15 dígitos ignorando os dígitos extra", () => {
        const cns = "123456789012345678";
        const formattedCns = cnsFormatter(cns);
        expect(formattedCns).toBe("123 4567 8901 2345");
    });

    it("deve lidar com strings vazias", () => {
        const cns = "";
        const formattedCns = cnsFormatter(cns);
        expect(formattedCns).toBe("   ");
    });
});
