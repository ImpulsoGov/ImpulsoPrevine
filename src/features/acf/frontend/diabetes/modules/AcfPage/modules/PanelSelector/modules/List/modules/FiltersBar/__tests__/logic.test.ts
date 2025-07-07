import * as z from "zod/v4";
import { onlyValidFilterValues, toHtmlSelectOptions } from "../logic";

// Mocks
const mockPatientStatusEnum = z.enum(["Em dia", "A fazer"]);

describe("onlyValidFilterValues", () => {
    it("filtra valores válidos de acordo com schema zod", () => {
        const input = ["Em dia", "Inválido"] as Array<unknown>;
        const result = onlyValidFilterValues(input, mockPatientStatusEnum);
        expect(result).toEqual(["Em dia"]);
    });
});

describe("selectOptions", () => {
    it("transforma valores em objetos { value, label }", () => {
        const input = ["A", "B"];
        const result = toHtmlSelectOptions(
            input as Parameters<typeof toHtmlSelectOptions>[0]
        );
        expect(result).toEqual([
            { value: "A", label: "A" },
            { value: "B", label: "B" },
        ]);
    });
});
