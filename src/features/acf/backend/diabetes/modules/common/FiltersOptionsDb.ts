import type * as model from "@/features/acf/shared/diabetes/model";
import type * as db from "@prisma/client";

export type SharedFiltersOptionsDb = {
    microAreaName: ReadonlyArray<db.DiabetesAcfItem["microAreaName"]>;
    patientAgeRange: ReadonlyArray<model.PatientAgeRangeCode>;
    goodPracticesStatusByQuarter: ReadonlyArray<model.GoodPracticesStatusByQuarterCode>;
    isMedicalRecordUpdated: ReadonlyArray<
        db.DiabetesAcfItem["isMedicalRecordUpdated"]
    >;
};

export type FiltersOptionsDbCoeq = SharedFiltersOptionsDb;

export type FiltersOptionsDbCoaps = SharedFiltersOptionsDb & {
    careTeamName: ReadonlyArray<db.DiabetesAcfItem["careTeamName"]>;
};
