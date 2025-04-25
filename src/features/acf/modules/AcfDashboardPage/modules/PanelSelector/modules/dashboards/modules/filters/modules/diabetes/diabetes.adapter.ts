import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { ConditionIdentifiedBy, PatientStatus } from '../../../table/modules/diabetes/DiabetesAcfItem.model';
import type { DiabetesFilterItem} from './diabetes.model';

export const diabetesAcfFilterDataAdapter = (
    data: readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]
): DiabetesFilterItem[] => {
    return data
    .map<DiabetesFilterItem>((item) => ({
        patientStatus: item.status_usuario as PatientStatus,
        conditionIdentifiedBy: item.identificacao_condicao_diabetes as ConditionIdentifiedBy,
        visitantCommunityHealthWorker: item.acs_nome_cadastro,
    }))
}