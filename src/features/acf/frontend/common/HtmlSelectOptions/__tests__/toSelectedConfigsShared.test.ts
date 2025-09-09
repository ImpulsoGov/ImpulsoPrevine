import { toHtmlSelectOptions } from "..";

describe("selectOptions", () => {
    it("transforma valores em objetos { value, label }", () => {
        const input = ["A", "B"];
        const result = toHtmlSelectOptions(input);
        expect(result).toEqual([
            { value: "A", label: "A" },
            { value: "B", label: "B" },
        ]);
    });
});
