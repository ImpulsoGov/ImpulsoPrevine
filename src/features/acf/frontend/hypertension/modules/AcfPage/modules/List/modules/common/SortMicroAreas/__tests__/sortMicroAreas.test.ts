import { sortMicroAreas } from "..";

describe("sortMicroAreas", () => {
    it("deve ordenar corretamente quando ambos são números", () => {
        const data = [
            { label: "dez", value: 10 },
            { label: "dois", value: 2 },
            { label: "sete", value: 7 },
        ];
        data.sort(sortMicroAreas);
        expect(data.map((i) => i.value)).toEqual([2, 7, 10]);
    });

    it("deve ordenar números antes de strings", () => {
        const data = [
            { label: "fa", value: "fa" },
            { label: "dez", value: 10 },
            { label: "sete", value: 7 },
        ];
        data.sort(sortMicroAreas);
        expect(data.map((i) => i.value)).toEqual([7, 10, "fa"]);
    });

    it("deve ordenar strings quando ambos são strings", () => {
        const data = [
            { label: "fa", value: "fa" },
            { label: "ab", value: "ab" },
            { label: "zz", value: "zz" },
        ];
        data.sort(sortMicroAreas);
        expect(data.map((i) => i.value)).toEqual(["ab", "fa", "zz"]);
    });

    it("deve ordenar corretamente dataay de number e string", () => {
        const data = [
            { label: "fa", value: "fa" },
            { label: "dois", value: 2 },
            { label: "oito", value: 8 },
            { label: "sete", value: 7 },
        ];
        data.sort(sortMicroAreas);
        expect(data.map((i) => i.value)).toEqual([2, 7, 8, "fa"]);
    });
});
