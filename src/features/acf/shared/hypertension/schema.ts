import * as model from "@/features/acf/shared/hypertension/model";
import { z } from "zod/v4";

export const careTeamName = z.string();
export type CareTeamName = z.infer<typeof careTeamName>;

export const microArea = z.string().nullable();
export type MicroArea = z.infer<typeof microArea>;

export const appointmentStatusByQuarter = z.enum(
    model.appointmentStatusByQuarterTexts
);
export type AppointmentStatusByQuarter = z.infer<
    typeof appointmentStatusByQuarter
>;

export const latestExamRequestStatusByQuarter = z.enum(
    model.latestExamRequestStatusByQuarterTexts
);
export type LatestExamRequestStatusByQuarter = z.infer<
    typeof latestExamRequestStatusByQuarter
>;
export const medicalRecordUpdated = z.enum(model.medicalRecordUpdatedTexts);
export type MedicalRecordUpdated = z.infer<typeof medicalRecordUpdated>;
export const patientAgeRange = z.enum(model.patientAgeRangeTexts);
export type PatientAgeRange = z.infer<typeof patientAgeRange>;

export const goodPracticesStatusByQuarter = z.enum(
    model.goodPracticesStatusByQuarterTexts
);
export type GoodPracticesStatusByQuarter = z.infer<
    typeof goodPracticesStatusByQuarter
>;

export const sharedFilters = z.object({
    microAreaName: z.array(microArea),
    appointmentStatusByQuarter: z.array(appointmentStatusByQuarter),
    latestExamRequestStatusByQuarter: z.array(latestExamRequestStatusByQuarter),
    patientAgeRange: z.array(patientAgeRange),
    goodPracticesStatusByQuarter: z.array(goodPracticesStatusByQuarter),
    medicalRecordUpdated: z.array(medicalRecordUpdated),
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

export type PageResponse = {
    page: Array<model.HypertensionAcfItem>;
    totalRows: number;
};
export type DataResponse = Array<model.HypertensionAcfItem>;
