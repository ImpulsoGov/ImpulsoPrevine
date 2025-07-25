import { z } from "zod/v4";
import type { DiabetesAcfItem } from "./model";
import * as model from "./model";

export const patientStatus = z.enum(model.patientStatus);
export type PatientStatus = z.infer<typeof patientStatus>;

export const conditionIdentifiedBy = z.enum(model.conditionIdentifiedBy);
export type ConditionIdentifiedBy = z.infer<typeof conditionIdentifiedBy>;

export const sortableFieldsCoeq = z.enum(model.sortableFieldCoeq);
export const sortableFieldsCoaps = z.enum(model.sortableFieldCoaps);

export type SortableFieldsCoeq = z.infer<typeof sortableFieldsCoeq>;

export type SortableFieldsCoaps = z.infer<typeof sortableFieldsCoaps>;

export const patientAgeRange = z.enum(model.patientAgeRange);
export type PatientAgeRange = z.infer<typeof patientAgeRange>;

export const communityHealthWorker = z.string();
export type CommunityHealthWorker = z.infer<typeof communityHealthWorker>;

export const sharedFilters = z.object({
    patientStatus: z.array(patientStatus),
    conditionIdentifiedBy: z.array(conditionIdentifiedBy),
    communityHealthWorker: z.array(communityHealthWorker),
    patientAgeRange: z.array(patientAgeRange),
});

export type SharedFilters = z.infer<typeof sharedFilters>;

export const coeqFilters = z.object({ ...sharedFilters.shape });

export type CoeqFilters = z.infer<typeof coeqFilters>;

export const coapsFilters = z.object({
    ...sharedFilters.shape,
    careTeamName: z.array(z.string()),
});

export type CoapsFilters = z.infer<typeof coapsFilters>;

export const coeqSort = z.object({
    field: sortableFieldsCoeq,
    sort: z.enum(model.sortOrder),
});

export const coapsSort = z.object({
    field: sortableFieldsCoaps,
    sort: z.enum(model.sortOrder),
});

export type CoapsSort = z.infer<typeof coapsSort>;

export type CoeqSort = z.infer<typeof coeqSort>;

export const coeqPageRequestBody = z.object({
    filters: z.optional(coeqFilters),
    sorting: z.optional(coeqSort),
    search: z.optional(z.string()),
});

export type CoeqPageRequestBody = z.infer<typeof coeqPageRequestBody>;

// TODO criar um schema com os dados compoartilhado entre coaps e coeq
export const coapsPageRequestBody = z.object({
    filters: z.optional(coapsFilters),
    sorting: z.optional(coapsSort),
    search: z.optional(z.string()),
});

export type CoapsPageRequestBody = z.infer<typeof coapsPageRequestBody>;

//TODO: Retornar tamanho da página, e alterar o front para usar esse campo
export type PageResponse = {
    page: Array<DiabetesAcfItem>;
    totalRows: number;
};

export type CoeqFiltersResponse = {
    filters: CoeqFilters;
};

export type CoapsFiltersResponse = {
    filters: CoapsFilters;
};

//TODO: Pensar se existe alguma forma de evitar isso
export type FilterResponses = CoapsFilters | CoeqFilters;
