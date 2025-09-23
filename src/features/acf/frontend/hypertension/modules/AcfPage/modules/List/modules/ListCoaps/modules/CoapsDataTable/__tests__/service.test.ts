import type * as schema from "@/features/acf/shared/hypertension/schema";
import { describe, expect, it } from "@jest/globals";
import type { GridSortItem } from "@mui/x-data-grid";
import type { CoapsAppliedFilters } from "../model";
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
        const appliedFilters: CoapsAppliedFilters = {
            microAreaName: ["worker1", "worker2"],
            appointmentStatusByQuarter: ["Nunca realizado", "Em dia"],
            latestExamRequestStatusByQuarter: [
                "Vence dentro do Q1",
                "Atrasada",
            ],
            patientAgeRange: "20 a 59 (Adulto)",
            careTeamName: ["team1", "team2"],
            goodPracticesStatusByQuarter: "",
            medicalRecordUpdated: "",
        };

        const result = bodyBuilder(null, appliedFilters, null);

        expect(result).toEqual({
            filters: {
                ...appliedFilters,
                patientAgeRange: ["20 a 59 (Adulto)"],
                goodPracticesStatusByQuarter: [],
                medicalRecordUpdated: [],
            },
        });
    });

    it("deve traduzir patientAgeRange vazia como []", () => {
        const appliedFilters: CoapsAppliedFilters = {
            microAreaName: [],
            appointmentStatusByQuarter: [],
            latestExamRequestStatusByQuarter: [],
            patientAgeRange: "",
            careTeamName: [],
            goodPracticesStatusByQuarter: "Pelo menos uma a fazer",
            medicalRecordUpdated: "Atualizada",
        };

        const result = bodyBuilder(null, appliedFilters, null);

        expect(result).toEqual({
            filters: {
                ...appliedFilters,
                patientAgeRange: [],
                goodPracticesStatusByQuarter: ["Pelo menos uma a fazer"],
                medicalRecordUpdated: ["Atualizada"],
            },
        });
    });

    it("deve adicionar todos os parametros se passados", () => {
        const sorting: GridSortItem = {
            field: "patientName",
            sort: "desc",
        };
        const appliedFilters: CoapsAppliedFilters = {
            microAreaName: ["Abdias"],
            appointmentStatusByQuarter: ["Nunca realizado", "Em dia"],
            latestExamRequestStatusByQuarter: [
                "Vence dentro do Q1",
                "Atrasada",
            ],
            patientAgeRange: "60 ou mais (Idoso)",
            careTeamName: ["Rosa"],
            goodPracticesStatusByQuarter: "Pelo menos uma a fazer",
            medicalRecordUpdated: "Atualizada",
        };

        const searchString = "Maria";

        const result = bodyBuilder(sorting, appliedFilters, searchString);

        expect(result).toEqual({
            sorting: sorting as schema.CoapsSort,
            search: searchString,
            filters: {
                ...appliedFilters,
                patientAgeRange: ["60 ou mais (Idoso)"],
                goodPracticesStatusByQuarter: ["Pelo menos uma a fazer"],
                medicalRecordUpdated: ["Atualizada"],
            },
        });
    });
});
