import type { InternalCardDBDataItem } from "./internalCards.model"
import { prisma } from "@prisma/prismaClient"

export const internalCardsDataForTeam = async(
    teamIne: string,
    municipalitySusID: string,
): Promise<readonly InternalCardDBDataItem[]> =>{
    const municipalitySusIDAndTeamIne = {
        municipio_id_sus: municipalitySusID,
        equipe_ine_cadastro: teamIne
    }
    const TOTAL_COM_DIABETES = await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIDAndTeamIne,
        },
    })
    const EXAME_E_CONSULTA_EM_DIA = await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIDAndTeamIne,
            prazo_proxima_consulta: "Em dia",
            prazo_proxima_solicitacao_hemoglobina: "Em dia"
        },
    })
    const DIAGNOSTICO_AUTORREFERIDO = await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIDAndTeamIne,
            identificacao_condicao_diabetes: "Autorreferida"
        },
    })
    const DIAGNOSTICO_CLINICO = await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIDAndTeamIne,
            identificacao_condicao_diabetes: "Diagnóstico Clínico"
        },
    })

    return [
        {
            valor: TOTAL_COM_DIABETES,
            descricao: "TOTAL_COM_DIABETES"
        },
        {
            valor: EXAME_E_CONSULTA_EM_DIA,
            descricao: "EXAME_E_CONSULTA_EM_DIA"
        },
        {
            valor: DIAGNOSTICO_AUTORREFERIDO,
            descricao: "DIAGNOSTICO_AUTORREFERIDO"
        },
        {
            valor: DIAGNOSTICO_CLINICO,
            descricao: "DIAGNOSTICO_CLINICO"
        },
    ]
}
