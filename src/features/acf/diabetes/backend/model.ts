import type { DiabetesAcfItem } from "../common/model";

export type Filters = {
    visitantCommunityHealthWorker: DiabetesAcfItem["visitantCommunityHealthWorker"][];
    patientStatus: DiabetesAcfItem["patientStatus"][];
    conditionIdentifiedBy: DiabetesAcfItem["conditionIdentifiedBy"][];
    patientAgeRange: DiabetesAcfItem["patientAgeRange"][];
};
