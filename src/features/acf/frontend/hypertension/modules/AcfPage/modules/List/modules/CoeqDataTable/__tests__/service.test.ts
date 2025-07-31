import type * as schema from "@/features/acf/shared/diabetes/schema";
import { describe, expect, it } from "@jest/globals";
import type { GridSortItem } from "@mui/x-data-grid";
import type { HypertensionCoeqAppliedFilters } from "../model";
import { bodyBuilder } from "../service";

describe("bodyBuilder", () => {
    it("deve retornar um objeto vazio se nenhum parametro existir", () => {
        const result = bodyBuilder(null, null, null);
        expect(result).toEqual({});
    });

    it("deve incluir sorting", () => {
        const sorting: GridSortItem = {
            field: "patientName",
            sort: "asc",
        };

        const result = bodyBuilder(sorting, null, null);

        expect(result).toEqual({
            sorting: sorting as schema.CoapsSort,
        });
    });

    it("deve incluir searchString", () => {
        const searchString = "João";

        const result = bodyBuilder(null, null, searchString);

        expect(result).toEqual({
            search: searchString,
        });
    });

    it("deve incluir filtros, traduzindo conditionIdentifiedBy para um Array", () => {
        const appliedFilters: HypertensionCoeqAppliedFilters = {
            communityHealthWorker: ["worker1", "worker2"],
            patientStatus: ["Apenas a consulta a fazer"],
            conditionIdentifiedBy: "Autorreferida",
            patientAgeRange: ["Entre 18 e 24 anos"],
        };

        const result = bodyBuilder(null, appliedFilters, null);

        expect(result).toEqual({
            filters: {
                ...appliedFilters,
                conditionIdentifiedBy: ["Autorreferida"],
            },
        });
    });

    it("deve traduzir conditionIdentifiedBy vazia como []", () => {
        const appliedFilters: HypertensionCoeqAppliedFilters = {
            communityHealthWorker: [],
            patientStatus: [],
            conditionIdentifiedBy: "",
            patientAgeRange: [],
        };

        const result = bodyBuilder(null, appliedFilters, null);

        expect(result).toEqual({
            filters: {
                ...appliedFilters,
                conditionIdentifiedBy: [],
            },
        });
    });

    it("deve adicionar todos os parametros se passados", () => {
        const sorting: GridSortItem = {
            field: "patientName",
            sort: "desc",
        };
        const appliedFilters: HypertensionCoeqAppliedFilters = {
            communityHealthWorker: ["Abdias"],
            patientStatus: [
                "Apenas a consulta a fazer",
                "Apenas a solicitação de hemoglobina a fazer",
            ],
            conditionIdentifiedBy: "Diagnóstico Clínico",
            patientAgeRange: ["Entre 18 e 24 anos", "Entre 25 e 34 anos"],
            careTeamName: ["Rosa"],
        };

        const searchString = "Maria";

        const result = bodyBuilder(sorting, appliedFilters, searchString);

        expect(result).toEqual({
            sorting: sorting as schema.CoapsSort,
            search: searchString,
            filters: {
                ...appliedFilters,
                conditionIdentifiedBy: ["Diagnóstico Clínico"],
            },
        });
    });
});
