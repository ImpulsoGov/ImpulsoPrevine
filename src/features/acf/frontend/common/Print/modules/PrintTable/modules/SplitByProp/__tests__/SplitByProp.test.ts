import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import { SplitByProp, orderSplitData, OrderedSplitByProp } from "..";
import { mockData, mockColumns } from "./__mocks__/data";
import type { GridSortItem } from "@mui/x-data-grid";

describe("SplitByProp", () => {
    it("deve agrupar os dados por uma propriedade simples", () => {
        const result = SplitByProp(mockData, "patientAgeRange");

        expect(Object.keys(result)).toContain("20 a 59 (Adulto)");
        expect(Object.keys(result)).toContain("60 ou mais (Idoso)");
        expect(Object.keys(result)).toContain("0 a 10 (Criança)");

        expect(result["20 a 59 (Adulto)"].data.length).toBeGreaterThan(0);
        expect(result["60 ou mais (Idoso)"].data.length).toBeGreaterThan(0);
    });

    it("deve aplicar titleFormatter quando disponível", () => {
        const result = SplitByProp<HypertensionAcfItem>(
            mockData,
            "microAreaName",
            mockColumns[3].titleFormatter
        );

        const keys = Object.keys(result);
        keys.forEach((key) => {
            expect(result[key].title).toEqual(
                mockColumns[3].titleFormatter?.(key)
            );
        });
    });
});

describe("orderSplitData", () => {
    it("ordena os grupos internamente por propPrintGrouping e depois pelo campo informado", () => {
        const splitByProp = SplitByProp(mockData, "patientAgeRange");

        const order: GridSortItem = {
            field: "patientName",
            sort: "asc",
        };

        const result = orderSplitData(splitByProp, "patientAgeRange", order);

        const grupoAdulto = result["20 a 59 (Adulto)"].data.map(
            (item) => item.patientName
        );

        // Deve estar em ordem alfabética
        const sorted = [...grupoAdulto].sort();
        expect(grupoAdulto).toEqual(sorted);
    });
});

describe("OrderedSplitByProp", () => {
    it("quando shouldOrderByKey = false, deve apenas retornar o splitByProp (sem ordenação extra)", () => {
        const result = OrderedSplitByProp(
            mockData,
            "patientAgeRange",
            undefined,
            mockColumns,
            false,
            { field: "patientName", sort: "asc" }
        );

        expect(Object.keys(result)).toContain("20 a 59 (Adulto)");
        expect(result["20 a 59 (Adulto)"].title).toBe("20 a 59 (Adulto)");
    });

    it("quando shouldOrderByKey = true, deve retornar os grupos ordenados", () => {
        const result = OrderedSplitByProp(
            mockData,
            "patientAgeRange",
            "patientAgeRange",
            mockColumns,
            true,
            { field: "patientName", sort: "asc" }
        );

        const grupoAdulto = result["20 a 59 (Adulto)"].data.map(
            (item) => item.patientName
        );

        const sorted = [...grupoAdulto].sort();
        expect(grupoAdulto).toEqual(sorted);
    });
});
