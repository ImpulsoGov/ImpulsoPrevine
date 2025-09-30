import type * as model from "@/features/acf/shared/hypertension/model";
import type * as db from "@prisma/client";

export type SharedFiltersOptionsDb = {
    microAreaName: ReadonlyArray<db.HypertensionAcfItem["microAreaName"]>;
    patientAgeRange: ReadonlyArray<model.PatientAgeRangeCode>;
    goodPracticesStatusByQuarter: ReadonlyArray<model.GoodPracticesStatusByQuarterCode>;
    isMedicalRecordUpdated: ReadonlyArray<
        db.HypertensionAcfItem["isMedicalRecordUpdated"]
    >;
};

export type FiltersOptionsDbCoeq = SharedFiltersOptionsDb;

export type FiltersOptionsDbCoaps = SharedFiltersOptionsDb & {
    careTeamName: ReadonlyArray<db.HypertensionAcfItem["careTeamName"]>;
};
