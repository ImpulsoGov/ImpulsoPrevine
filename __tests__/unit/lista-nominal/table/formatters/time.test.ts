import { formatDate } from "@/common/time";

describe("formatDate", () => {
    it("deve formatar uma data corretamente no formato dd/mm/aa", () => {
        const date = new Date("2023-10-05");
        expect(formatDate(date)).toBe("05/10/23");
    });

    it("deve lidar corretamente com datas no início do mês e do ano em diferentes fusos", () => {
        const date = new Date("2023-01-01T15:00:00+03:00");
        expect(formatDate(date)).toBe("01/01/23");
    });

    it("deve lidar corretamente com datas no final do mês e do ano", () => {
        const date = new Date("2023-12-31T00:00:00Z");
        expect(formatDate(date)).toBe("31/12/23");
    });

    it("deve lidar com anos anteriores a 2000", () => {
        const date = new Date("1999-07-15T00:00:00Z");
        expect(formatDate(date)).toBe("15/07/99");
    });

});
