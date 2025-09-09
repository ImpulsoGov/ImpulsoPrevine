import { SplitByProp, getTitle, orderSplitData, OrderedSplitByProp } from "..";

import type { HypertensionAcfItem } from "@/features/acf/shared/hypertension/model";
import type { GridSortItem } from "@mui/x-data-grid";

import { mockColumns, mockData } from "./data";

describe("SplitByProp", () => {
    it("agrupa corretamente os itens pela propriedade microAreaName", () => {
        const result = SplitByProp(mockData, "microAreaName");

        const keys = Object.keys(result);
        expect(keys).toContain("Microárea 1");
        expect(keys).toContain("Microárea 2");
        expect(result["Microárea 1"].data).toHaveLength(1);
        expect(result["Microárea 2"].data).toHaveLength(1);
    });

    it("aplica titleFormatter corretamente", () => {
        const result = SplitByProp(
            mockData,
            "microAreaName",
            mockColumns[3].titleFormatter
        );

        expect(result["Microárea 1"].title).toBe("Microárea 1");
        expect(result["Microárea 2"].title).toBe("Microárea 2");
    });

    it("usa valor cru quando não houver titleFormatter", () => {
        const result = SplitByProp(mockData, "patientAgeRange");
        expect(result["20 a 59 (Adulto)"].title).toBe("20 a 59 (Adulto)");
    });

    it("retorna objeto vazio se dados forem vazios", () => {
        const result = SplitByProp<HypertensionAcfItem>([], "microAreaName");
        expect(result).toEqual({});
    });
});

describe("getTitle", () => {
    it("retorna titleFormatter para coluna existente", () => {
        const result = getTitle(mockColumns, "microAreaName");
        expect(result).toBeInstanceOf(Function);
        expect(result?.("Microárea X")).toBe("Microárea X");
    });

    it("retorna undefined para coluna inexistente", () => {
        const result = getTitle(mockColumns, "municipalityName");
        expect(result).toBeUndefined();
    });
});

describe("orderSplitData", () => {
    it("ordena itens dentro de cada grupo por propriedade fornecida", () => {
        const grouped = SplitByProp(mockData, "microAreaName");
        const order: GridSortItem = { field: "patientAge", sort: "asc" };

        const result = orderSplitData(grouped, "microAreaName", order);

        Object.values(result).forEach((group) => {
            const ages = group.data.map((d) => d.patientAge);
            const sorted = [...ages].sort((a, b) => a - b);
            expect(ages).toEqual(sorted);
        });
    });

    it("ordena descendente quando especificado", () => {
        const grouped = SplitByProp(mockData, "microAreaName");
        const order: GridSortItem = { field: "patientAge", sort: "desc" };

        const result = orderSplitData(grouped, "microAreaName", order);

        Object.values(result).forEach((group) => {
            const ages = group.data.map((d) => d.patientAge);
            const sorted = [...ages].sort((a, b) => b - a);
            expect(ages).toEqual(sorted);
        });
    });

    it("não altera o objeto original (imutabilidade)", () => {
        const grouped = SplitByProp(mockData, "microAreaName");
        const cloneBefore = JSON.stringify(grouped);

        orderSplitData(grouped, "microAreaName", {
            field: "patientAge",
            sort: "asc",
        });

        expect(JSON.stringify(grouped)).toBe(cloneBefore);
    });
});

describe("OrderedSplitByProp", () => {
    it("retorna agrupado sem ordenar quando orderByKey = true", () => {
        const result = OrderedSplitByProp(
            mockData,
            "microAreaName",
            mockColumns,
            true,
            { field: "patientAge", sort: "asc" }
        );

        expect(Object.keys(result)).toContain("Microárea 1");
        expect(Object.keys(result)).toContain("Microárea 2");
    });

    it("retorna agrupado e ordenado quando orderByKey = false", () => {
        const result = OrderedSplitByProp(
            mockData,
            "microAreaName",
            mockColumns,
            false,
            { field: "patientAge", sort: "asc" }
        );

        Object.values(result).forEach((group) => {
            const ages = group.data.map((d) => d.patientAge);
            const sorted = [...ages].sort((a, b) => a - b);
            expect(ages).toEqual(sorted);
        });
    });

    it("mantém imutabilidade do agrupamento original", () => {
        const originalGrouped = SplitByProp(mockData, "microAreaName");
        const cloneBefore = JSON.stringify(originalGrouped);

        OrderedSplitByProp(mockData, "microAreaName", mockColumns, false, {
            field: "patientAge",
            sort: "asc",
        });

        expect(JSON.stringify(originalGrouped)).toBe(cloneBefore);
    });
});
