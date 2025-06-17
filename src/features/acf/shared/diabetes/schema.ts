import { z } from "zod/v4";
import type { DiabetesAcfItem as CoeqDiabetesAcfItem } from "./model";
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

export const CommunityHealthWorker = z.string();
export type CommunityHealthWorker = z.infer<typeof CommunityHealthWorker>;

export const coeqFilters = z.object({
    patientStatus: z.array(patientStatus),
    conditionIdentifiedBy: z.array(conditionIdentifiedBy),
    communityHealthWorker: z.array(CommunityHealthWorker),
    patientAgeRange: z.array(patientAgeRange),
});

export type CoeqFilters = z.infer<typeof coeqFilters>;

export const coapsFilters = z.object({
    ...coeqFilters.shape,
    careTeamIne: z.array(z.string()),
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
    //TODO: Não faz sentido que os filtros sejam opcionais e o resto não.
    //      Podemos definir valores default caso estes parametros não venham, e usá-los, como vamos fazer no filtro.
    sorting: coeqSort,
    search: z.string(),
});

export type CoeqPageRequestBody = z.infer<typeof coeqPageRequestBody>;

// TODO criar um schema com os dados compoartilhado entre coaps e coeq
export const coapsPageRequestBody = z.object({
    filters: z.optional(coapsFilters),
    //TODO: Não faz sentido que os filtros sejam opcionais e o resto não.
    //      Podemos definir valores default caso estes parametros não venham, e usá-los, como vamos fazer no filtro.
    sorting: coapsSort,
    search: z.string(),
});

export type CoapsPageRequestBody = z.infer<typeof coapsPageRequestBody>;

//TODO: Retornar tamanho da página, e alterar o front para usar esse campo
export type CoeqPageResponse = {
    page: Array<CoeqDiabetesAcfItem>;
    totalRows: number;
};

export type CoeqFiltersResponse = {
    filters: CoeqFilters;
};
