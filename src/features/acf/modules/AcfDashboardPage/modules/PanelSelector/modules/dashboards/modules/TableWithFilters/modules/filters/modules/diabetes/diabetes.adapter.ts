import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from '@prisma/client';
import type { DiabetesFilterItem, DiabetesFilterOptions, DiabetesFilterOptionsDB} from './diabetes.model';
import type { ConditionIdentifiedBy, PatientStatus } from '../../../PaginatedTable/modules/DataTable/modules/diabetes/diabetes.model';

/**
 * Tranforma.
 * @param data - The data from the database.
 * @returns The adapted data for the filter options.
 */
export const diabetesAcfFilterDataAdapter = (
    data: readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]
): DiabetesFilterItem => {
    const diabetesFilterItens: DiabetesFilterItem = {
        patientStatus: [],
        conditionIdentifiedBy: [],
        visitantCommunityHealthWorker: [],
    }
    const groupedItems = aggregateDistinctValues(data)
    // TODO: corrigir atualização dos valores
    for (const [key, value] of Object.entries(groupedItems)) {
        if (key === "status_usuario") diabetesFilterItens.patientStatus = value as PatientStatus[]
        if (key === "identificacao_condicao_diabetes") diabetesFilterItens.conditionIdentifiedBy = value as ConditionIdentifiedBy[]
        if (key === "acs_nome_cadastro") diabetesFilterItens.visitantCommunityHealthWorker = value as string[]
    }
    return diabetesFilterItens;
}

/**
 * Collects distinct values from the data and groups them by their keys.
 * @param data - The data from the database.
 * @returns An object with the distinct values grouped by their keys.
 */
const aggregateDistinctValues = (data: readonly impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[]): Record<string, Array<string | number | boolean | Date | null>> =>{
    const groupedData = data.reduce((acc: Record<string, Set<string | number | boolean | Date | null>>, obj) => {
      for (const [key, val] of Object.entries(obj)) {
        if (!acc[key]) acc[key] = new Set();
        acc[key].add(val);
      }
      return acc;
    }, {});
  
    const distinctObj = Object.fromEntries(
      Object.entries(groupedData).map(([key, set]) => [key, Array.from(set)])
    );
    return distinctObj;
}

export const filterDbtoModelOptions: Record<DiabetesFilterOptions, DiabetesFilterOptionsDB> = {
    patientStatus: "status_usuario",
    conditionIdentifiedBy: "identificacao_condicao_diabetes",
    visitantCommunityHealthWorker: "acs_nome_cadastro",
}

export const modelToDB = (item: DiabetesFilterOptions[]) : DiabetesFilterOptionsDB[]=>{
    return item.map((filterItem) => filterDbtoModelOptions[filterItem])
}