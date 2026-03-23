import { LocalDate } from "@js-joda/core";
import { parseDtpaDoseDates } from "..";

describe("parseDtpaDoseDates", () => {
    it("deve retornar um array vazio quando a string de doses estiver vazia", () => {
        const result = parseDtpaDoseDates("");
        expect(result).toEqual([]);
    });

    it("deve retornar um array vazio quando a string de doses for inválida", () => {
        const result = parseDtpaDoseDates("invalid|data");
        expect(result).toEqual([]);
    });

    it("deve retornar um array de LocalDate para doses válidas", () => {
        const result = parseDtpaDoseDates(
            "D - 28/01/2026 - Vacina dTpa adulto (dTpa)  | REF - 22/01/2026 - Vacina dTpa adulto (dTpa)"
        );
        expect(result).toEqual(
            ["2026-01-28", "2026-01-22"].map((date) => LocalDate.parse(date))
        );
    });
});
