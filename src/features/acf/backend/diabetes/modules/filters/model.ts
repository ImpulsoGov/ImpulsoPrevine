import type { DiabetesAcfItem } from "@features/acf/shared/diabetes/model";

//TODO: sumir com esse arquivo, esses tipos podem ir pra dentro dos módulos
export type FiltersOptions = {
    //TODO: Este nome está errado. No DB nós usamos o acs_nome_cadastro, e não o acs que faz as visitas. Precisamos renomear.
    visitantCommunityHealthWorker: ReadonlyArray<
        DiabetesAcfItem["visitantCommunityHealthWorker"]
    >;
    patientStatus: ReadonlyArray<DiabetesAcfItem["patientStatus"]>;
    conditionIdentifiedBy: ReadonlyArray<
        DiabetesAcfItem["conditionIdentifiedBy"]
    >;
    patientAgeRange: ReadonlyArray<DiabetesAcfItem["patientAgeRange"]>;
};
