import { z } from "zod";
import type { DiabetesAcfItem } from "./model";

export const patientStatus = z.enum([
    "Consulta e solicitação de hemoglobina a fazer",
    "Apenas a consulta a fazer",
    "Apenas a solicitação de hemoglobina a fazer",
    "Consulta e solicitação de hemoglobina em dia",
]);

export type PatientStatus = z.infer<typeof patientStatus>;

export const conditionIdentifiedBy = z.enum([ 
    "Diagnóstico Clínico", 
    "Autorreferida"
]);

export type ConditionIdentifiedBy = z.infer<typeof conditionIdentifiedBy>;

export const patientAgeRange = z.enum([ 
    "Menos de 17 anos" ,
    "Entre 18 e 24 anos" , 
    "Entre 25 e 34 anos" , 
    "Entre 35 e 44 anos" , 
    "Entre 45 e 54 anos" , 
    "Entre 55 e 65 anos" , 
    "65 anos ou mais"
])

export type PatientAgeRange = z.infer<typeof patientAgeRange>;

export const filterParams = z.object({
    //TODO: Adicionar arrays onde fizer sentido
    //TODO: Pq não enviar sempre arrays ao invés de às vezes mandar um item singular e às vezes um array?
    patientStatus: z.optional(z.array(patientStatus)),
    conditionIdentifiedBy: z.optional(z.array(conditionIdentifiedBy)),
    visitantCommunityHealthWorker: z.optional(z.array(z.string())),
    patientAgeRange: z.optional(z.array(patientAgeRange)),
})

export type FilterParams = z.infer<typeof filterParams>;

export const requestBody = z.object({
    filters: z.optional(filterParams),
})

export type RequestBody = z.infer<typeof requestBody>;

export type Response = {
    //TODO: A gente deveria estar usando o model aqui?
    page: DiabetesAcfItem[];
    totalRows: number;
}
