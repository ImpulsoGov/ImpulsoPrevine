import type * as schema from "@/features/acf/shared/hypertension/schema";
import { describe, expect, it } from "@jest/globals";
import type { GridSortItem } from "@mui/x-data-grid";
import type { CoeqAppliedFilters } from "../model";
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

    it("deve incluir filtros, traduzindo patientAgeRange para um Array", () => {
        const appliedFilters: CoeqAppliedFilters = {
            microAreaName: ["worker1", "worker2"],
            appointmentStatusByQuarter: ["Nunca Realizado", "Em dia"],
            latestExamRequestStatusByQuarter: [
                "Vence dentro de Q1",
                "Atrasada",
            ],
            patientAgeRange: "60 anos ou mais",
        };

        const result = bodyBuilder(null, appliedFilters, null);

        expect(result).toEqual({
            filters: {
                ...appliedFilters,
                patientAgeRange: ["60 anos ou mais"],
            },
        });
    });

    it("deve traduzir patientAgeRange vazia como []", () => {
        const appliedFilters: CoeqAppliedFilters = {
            microAreaName: [],
            appointmentStatusByQuarter: [],
            latestExamRequestStatusByQuarter: [],
            patientAgeRange: "",
        };

        const result = bodyBuilder(null, appliedFilters, null);

        expect(result).toEqual({
            filters: {
                ...appliedFilters,
                patientAgeRange: [],
            },
        });
    });

    it("deve adicionar todos os parametros se passados", () => {
        const sorting: GridSortItem = {
            field: "patientName",
            sort: "desc",
        };
        const appliedFilters: CoeqAppliedFilters = {
            microAreaName: ["Abdias"],
            appointmentStatusByQuarter: ["Nunca Realizado", "Em dia"],
            latestExamRequestStatusByQuarter: [
                "Vence dentro de Q1",
                "Atrasada",
            ],
            patientAgeRange: "60 anos ou mais",
        };

        const searchString = "Maria";

        const result = bodyBuilder(sorting, appliedFilters, searchString);

        expect(result).toEqual({
            sorting: sorting as schema.CoapsSort,
            search: searchString,
            filters: {
                ...appliedFilters,
                patientAgeRange: ["60 anos ou mais"],
            },
        });
    });
});
