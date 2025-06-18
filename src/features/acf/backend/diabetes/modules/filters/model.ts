import type { DiabetesAcfItem } from "@features/acf/shared/diabetes/model";

//TODO: sumir com esse arquivo, esses tipos podem ir pra dentro dos módulos
export type FiltersOptionsCoeq = {
    communityHealthWorker: ReadonlyArray<
        DiabetesAcfItem["communityHealthWorker"]
    >;
    patientStatus: ReadonlyArray<DiabetesAcfItem["patientStatus"]>;
    conditionIdentifiedBy: ReadonlyArray<
        DiabetesAcfItem["conditionIdentifiedBy"]
    >;
    patientAgeRange: ReadonlyArray<DiabetesAcfItem["patientAgeRange"]>;
};

export type FiltersOptionsCoaps = {
    communityHealthWorker: ReadonlyArray<
        DiabetesAcfItem["communityHealthWorker"]
    >;
    patientStatus: ReadonlyArray<DiabetesAcfItem["patientStatus"]>;
    conditionIdentifiedBy: ReadonlyArray<
        DiabetesAcfItem["conditionIdentifiedBy"]
    >;
    patientAgeRange: ReadonlyArray<DiabetesAcfItem["patientAgeRange"]>;
    careTeamName: ReadonlyArray<DiabetesAcfItem["careTeamName"]>;
};
