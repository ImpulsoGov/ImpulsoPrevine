import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types"
import type { InternalCardDBDataItem } from "./internalCards.model"
const data: InternalCardDBDataItem[] = [
  {
      "municipio_id_sus": "111111",
      "ine": "0000098574",
      "lista": "DIABETES",
      "descricao": "TOTAL_COM_DIABETES",
      "valor": 37
  },
  {
      "municipio_id_sus": "111111",
      "ine": "0000098574",
      "lista": "DIABETES",
      "descricao": "EXAME_E_CONSULTA_EM_DIA",
      "valor": 45
  },
  {
      "municipio_id_sus": "111111",
      "ine": "0000098574",
      "lista": "DIABETES",
      "descricao": "DIAGNOSTICO_AUTORREFERIDO",
      "valor": 52
  },
  {
      "municipio_id_sus": "111111",
      "ine": "0000098574",
      "lista": "DIABETES",
      "descricao": "DIAGNOSTICO_CLINICO",
      "valor": 52
  },
  {
      "municipio_id_sus": "140015",
      "ine": "0001590324",
      "lista": "DIABETES",
      "descricao": "TOTAL_COM_DIABETES",
      "valor": 73
  },
  {
      "municipio_id_sus": "140015",
      "ine": "0001590324",
      "lista": "DIABETES",
      "descricao": "EXAME_E_CONSULTA_EM_DIA",
      "valor": 54
  },
  {
      "municipio_id_sus": "140015",
      "ine": "0001590324",
      "lista": "DIABETES",
      "descricao": "DIAGNOSTICO_AUTORREFERIDO",
      "valor": 25
  },
  {
      "municipio_id_sus": "140015",
      "ine": "0001590324",
      "lista": "DIABETES",
      "descricao": "DIAGNOSTICO_CLINICO",
      "valor": 25
  }
]

export const internalCardsDataForTeam = (
    listName: AcfDashboardType,
    teamIne: string,
    municipalitySusID: string,
): InternalCardDBDataItem[]=>{
    return data.filter((item: InternalCardDBDataItem): boolean => (
        item.lista.toLocaleUpperCase() === listName.toLocaleUpperCase() 
        && item.municipio_id_sus === municipalitySusID 
        && item.ine === teamIne
    ))
}
