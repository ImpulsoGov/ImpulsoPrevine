import { z } from "zod";

export const patientStatus = z.enum([
    "Apenas a consulta a fazer",
    "Apenas o exame a fazer",
    "Consulta e exame a fazer",
    "Consulta e exame em dia"
])

export type PatientStatus = z.infer<typeof patientStatus>;

export const conditionIdentifiedBy = z.enum([ 
    "Diagnóstico clínico", 
    "Autorreferido"
]);

export type ConditionIdentifiedBy = z.infer<typeof conditionIdentifiedBy>;

export const patientAgeRange = z.enum([ 
    "Menos de 17 anos " ,
    "Entre 18 e 24 anos" , 
    "Entre 25 e 34 anos" , 
    "Entre 35 e 44 anos" , 
    "Entre 45 e 54 anos" , 
    "Entre 55 e 65 anos" , 
    "65 anos ou mais"
])

export type PatientAgeRange = z.infer<typeof patientAgeRange>;

export const filterParams = z.object({
    municipalitySusID: z.string(),
    teamIne: z.string(),
    patientStatus: z.optional(patientStatus),
    conditionIdentifiedBy: z.optional(conditionIdentifiedBy),
    visitantCommunityHealthWorker: z.optional(z.string()),
    patientAgeRange: z.optional(patientAgeRange),
})

export type FilterParams = z.infer<typeof filterParams>;

export const paginationParams = z.object({
    page: z.number().nonnegative(),
    pageSize: z.number().nonnegative(),
})

export type PaginationParams = z.infer<typeof paginationParams>;

export const queryParams = z.object({
    pagination: paginationParams,
    filters: z.optional(filterParams),
})

export type QueryParams = z.infer<typeof queryParams>;

