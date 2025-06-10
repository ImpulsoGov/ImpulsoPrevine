import { z } from "zod/v4";
import type { DiabetesAcfItem as CoeqDiabetesAcfItem } from "./model";
import * as model from "./model";

export const patientStatus = z.enum(model.patientStatus);
export type PatientStatus = z.infer<typeof patientStatus>;

export const conditionIdentifiedBy = z.enum(model.conditionIdentifiedBy);
export type ConditionIdentifiedBy = z.infer<typeof conditionIdentifiedBy>;

export const sortableFields = z.enum(model.sortableField);

export type SortableFields = z.infer<typeof sortableFields>;

export const patientAgeRange = z.enum(model.patientAgeRange);
export type PatientAgeRange = z.infer<typeof patientAgeRange>;

export const visitantCommunityHealthWorker = z.string();
export type VisitantCommunityHealthWorker = z.infer<
    typeof visitantCommunityHealthWorker
>;

export const coeqFilters = z.object({
    patientStatus: z.array(patientStatus),
    conditionIdentifiedBy: z.array(conditionIdentifiedBy),
    visitantCommunityHealthWorker: z.array(visitantCommunityHealthWorker),
    patientAgeRange: z.array(patientAgeRange),
});

export type CoeqFilters = z.infer<typeof coeqFilters>;

export const coeqSort = z.object({
    field: sortableFields,
    sort: z.enum(model.sortOrder),
});

export type CoeqSort = z.infer<typeof coeqSort>;

export const pageRequestBody = z.object({
    filters: z.optional(coeqFilters),
    sorting: coeqSort,
    search: z.string(),
});

export type CoeqPageRequestBody = z.infer<typeof pageRequestBody>;

//TODO: Retornar tamanho da página, e alterar o front para usar esse campo
export type CoeqPageResponse = {
    page: Array<CoeqDiabetesAcfItem>;
    totalRows: number;
};

export type CoeqFiltersResponse = {
    filters: CoeqFilters;
};
