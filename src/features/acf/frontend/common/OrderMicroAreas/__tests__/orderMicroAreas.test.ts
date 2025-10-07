import { orderMicroAreas } from "..";

const microAreas = ["Área 2", "Área 01", "Área 03", "Área B", "área 12"];

describe("orderMicroAreas", () => {
    it("Deve pôr as microáreas em ordem alfabética", () => {
        const list = [...microAreas];
        const sortedList = list.sort(orderMicroAreas);

        expect(sortedList).toEqual([
            "Área 01",
            "Área 2",
            "Área 03",
            "área 12",
            "Área B",
        ]);
    });

    it("Deve pôr as microáreas em ordem alfabética, deixando 'FA' no final", () => {
        const list = ["FA", ...microAreas];
        const sortedList = list.sort(orderMicroAreas);

        expect(sortedList).toEqual([
            "Área 01",
            "Área 2",
            "Área 03",
            "área 12",
            "Área B",
            "FA",
        ]);
    });

    it("Deve pôr as microáreas em ordem alfabética, deixando 'null' no final", () => {
        const list = ["null", ...microAreas];
        const sortedList = list.sort(orderMicroAreas);

        expect(sortedList).toEqual([
            "Área 01",
            "Área 2",
            "Área 03",
            "área 12",
            "Área B",
            "null",
        ]);
    });

    it("Deve pôr 'FA' antes de 'null' quando 'null' está no começo e 'FA' no final", () => {
        const list = ["null", ...microAreas, "FA"];
        const sortedList = list.sort(orderMicroAreas);

        expect(sortedList).toEqual([
            "Área 01",
            "Área 2",
            "Área 03",
            "área 12",
            "Área B",
            "FA",
            "null",
        ]);
    });

    it("Deve pôr 'FA' antes de 'null' quando 'FA' está no começo e 'null' no final", () => {
        const list = ["FA", ...microAreas, "null"];
        const sortedList = list.sort(orderMicroAreas);

        expect(sortedList).toEqual([
            "Área 01",
            "Área 2",
            "Área 03",
            "área 12",
            "Área B",
            "FA",
            "null",
        ]);
    });

    it("Deve pôr 'FA' antes de 'null' quando 'null' está seguido de 'FA'", () => {
        const list = ["null", "FA", ...microAreas];
        const sortedList = list.sort(orderMicroAreas);

        expect(sortedList).toEqual([
            "Área 01",
            "Área 2",
            "Área 03",
            "área 12",
            "Área B",
            "FA",
            "null",
        ]);
    });

    it("Deve pôr 'FA' antes de 'null' quando 'FA' está seguido de 'null'", () => {
        const list = [...microAreas, "FA", "null"];
        const sortedList = list.sort(orderMicroAreas);

        expect(sortedList).toEqual([
            "Área 01",
            "Área 2",
            "Área 03",
            "área 12",
            "Área B",
            "FA",
            "null",
        ]);
    });
});
