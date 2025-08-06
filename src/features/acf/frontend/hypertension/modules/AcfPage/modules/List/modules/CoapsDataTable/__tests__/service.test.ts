import type * as schema from "@/features/acf/shared/hypertension/schema";
import { describe, expect, it } from "@jest/globals";
import type { GridSortItem } from "@mui/x-data-grid";
import type { HypertensionCoapsAppliedFilters } from "../model";
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
        const appliedFilters: HypertensionCoapsAppliedFilters = {
            microAreaName: ["worker1", "worker2"],
            appointmentStatusByQuarter: ["Nunca Realizado", "Em dia"],
            latestExamRequestStatusByQuarter: [
                "Vence dentro de Q1",
                "Atrasada",
            ],
            patientAgeRange: "50 a 59 anos",
            careTeamName: ["team1", "team2"],
        };

        const result = bodyBuilder(null, appliedFilters, null);

        expect(result).toEqual({
            filters: {
                ...appliedFilters,
                patientAgeRange: ["50 a 59 anos"],
            },
        });
    });

    it("deve traduzir patientAgeRange vazia como []", () => {
        const appliedFilters: HypertensionCoapsAppliedFilters = {
            microAreaName: [],
            appointmentStatusByQuarter: [],
            latestExamRequestStatusByQuarter: [],
            patientAgeRange: "",
            careTeamName: [],
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
        const appliedFilters: HypertensionCoapsAppliedFilters = {
            microAreaName: ["Abdias"],
            appointmentStatusByQuarter: ["Nunca Realizado", "Em dia"],
            latestExamRequestStatusByQuarter: [
                "Vence dentro de Q1",
                "Atrasada",
            ],
            patientAgeRange: "60 anos ou mais",
            careTeamName: ["Rosa"],
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
