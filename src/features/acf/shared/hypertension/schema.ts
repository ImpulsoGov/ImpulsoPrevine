import { z } from "zod/v4";
import * as model from "@/features/acf/shared/hypertension/model";

export const careTeamName = z.string();
export type CareTeamName = z.infer<typeof careTeamName>;

export const microArea = z.string();
export type MicroArea = z.infer<typeof microArea>;

export const appointmentStatusByQuarter = z.number();
export type AppointmentStatusByQuarter = z.infer<
    typeof appointmentStatusByQuarter
>;

export const latestExamRequestStatusByQuarter = z.number();
export type LatestExamRequestStatusByQuarter = z.infer<
    typeof latestExamRequestStatusByQuarter
>;

export const patientAgeRange = z.number();
export type PatientAgeRange = z.infer<typeof patientAgeRange>;

export const sharedFilters = z.object({
    microArea: z.array(microArea),
    appointmentStatusByQuarter: z.array(appointmentStatusByQuarter),
    latestExamRequestStatusByQuarter: z.array(latestExamRequestStatusByQuarter),
    patientAgeRange: z.array(patientAgeRange),
});

export type SharedFilters = z.infer<typeof sharedFilters>;

export const coeqFilters = z.object({ ...sharedFilters.shape });

export type CoeqFilters = z.infer<typeof coeqFilters>;

export const coapsFilters = z.object({
    ...sharedFilters.shape,
    careTeamName: z.array(careTeamName),
});

export type CoapsFilters = z.infer<typeof coapsFilters>;

export type CoeqFiltersResponse = {
    filters: CoeqFilters;
};

export type CoapsFiltersResponse = {
    filters: CoapsFilters;
};

//TODO: Pensar se existe alguma forma de evitar isso
export type FilterResponses = CoapsFilters | CoeqFilters;

export const sortableFieldsCoeq = z.enum(model.sortableFieldCoeq);
export const sortableFieldsCoaps = z.enum(model.sortableFieldCoaps);

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
