import { z } from "zod/v4";
import type { DiabetesAcfItem } from "./model";
import * as model from "./model";

export const patientStatus = z.enum(model.patientStatus);
export type PatientStatus = z.infer<typeof patientStatus>;

export const conditionIdentifiedBy = z.enum(model.conditionIdentifiedBy);
export type ConditionIdentifiedBy = z.infer<typeof conditionIdentifiedBy>;

export const sortableFields = z.enum(model.sortableField);

export type SortableFields = z.infer<typeof sortableFields>;

export const patientAgeRange = z.enum(model.patientAgeRange);
export type PatientAgeRange = z.infer<typeof patientAgeRange>;

export const filterParams = z.object({
    patientStatus: z.optional(z.array(patientStatus)),
    conditionIdentifiedBy: z.optional(z.array(conditionIdentifiedBy)),
    visitantCommunityHealthWorker: z.optional(z.array(z.string())),
    patientAgeRange: z.optional(z.array(patientAgeRange)),
});

export type FilterParams = z.infer<typeof filterParams>;

export const sortingParams = z.object({
    field: sortableFields,
    sort: z.enum(model.sortOrder),
});

export type SortingParams = z.infer<typeof sortingParams>;

export const requestBody = z.object({
    filters: z.optional(filterParams),
    sorting: sortingParams,
    search: z.string(),
});

export type RequestBody = z.infer<typeof requestBody>;

//TODO: Retornar tamanho da página, e alterar o front para usar esse campo
export type Response = {
    page: Array<DiabetesAcfItem>;
    totalRows: number;
};
