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

export const communityHealthWorker = z.string();
export type communityHealthWorker = z.infer<typeof communityHealthWorker>;

export const coeqFilters = z.object({
    patientStatus: z.array(patientStatus),
    conditionIdentifiedBy: z.array(conditionIdentifiedBy),
    communityHealthWorker: z.array(communityHealthWorker),
    patientAgeRange: z.array(patientAgeRange),
});

export type CoeqFilters = z.infer<typeof coeqFilters>;

export const coeqSort = z.object({
    field: sortableFields,
    sort: z.enum(model.sortOrder),
});

export type CoeqSort = z.infer<typeof coeqSort>;

export const coeqPageRequestBody = z.object({
    filters: z.optional(coeqFilters),
    //TODO: Não faz sentido que os filtros sejam opcionais e o resto não.
    //      Podemos definir valores default caso estes parametros não venham, e usá-los, como vamos fazer no filtro.
    sorting: coeqSort,
    search: z.string(),
});

export type CoeqPageRequestBody = z.infer<typeof coeqPageRequestBody>;

//TODO: Retornar tamanho da página, e alterar o front para usar esse campo
export type CoeqPageResponse = {
    page: Array<CoeqDiabetesAcfItem>;
    totalRows: number;
};

export type CoeqFiltersResponse = {
    filters: CoeqFilters;
};
