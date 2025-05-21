import { prisma } from "@prisma/prismaClient";
import { DiabetesAcfInternalCardsHealthIndicator, type InternalCardDBDataItem } from "../model";

export type MunicipalitySusIdAndTeamIne = {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    municipio_id_sus: string;
    // biome-ignore lint/style/useNamingConvention: <explanation>
    equipe_ine_cadastro: string;
}

export const totalPatientsWithDiabetes = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIdAndTeamIne,
        },
    })
}

export const totalPatientsWithExamsAndAppointment = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIdAndTeamIne,
            // biome-ignore lint/style/useNamingConvention: <explanation>
            prazo_proxima_consulta: "Em dia",
            // biome-ignore lint/style/useNamingConvention: <explanation>
            prazo_proxima_solicitacao_hemoglobina: "Em dia"
        },
    })
}

export const totalPatientsSelfDiagnosed = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIdAndTeamIne,
            // biome-ignore lint/style/useNamingConvention: <explanation>
            identificacao_condicao_diabetes: "Autorreferida"
        },
    })
}

export const totalPatientsWithClinicalDiagnosis = async (municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count({
        where: {
            ...municipalitySusIdAndTeamIne,
            // biome-ignore lint/style/useNamingConvention: <explanation>
            identificacao_condicao_diabetes: "Diagnóstico Clínico"
        },
    })
}

export const internalCardsDataForTeam = async (
    teamIne: string,
    municipalitySusID: string,
): Promise<ReadonlyArray<InternalCardDBDataItem>> => {
    const municipalitySusIDAndTeamIne = {
        // biome-ignore lint/style/useNamingConvention: <explanation>
        municipio_id_sus: municipalitySusID,
        // biome-ignore lint/style/useNamingConvention: <explanation>
        equipe_ine_cadastro: teamIne
    }

    return [
        {
            valor: await totalPatientsWithDiabetes(municipalitySusIDAndTeamIne),
            descricao: DiabetesAcfInternalCardsHealthIndicator.TOTAL_COM_DIABETES
        },
        {
            valor: await totalPatientsWithExamsAndAppointment(municipalitySusIDAndTeamIne),
            descricao: DiabetesAcfInternalCardsHealthIndicator.EXAME_E_CONSULTA_EM_DIA
        },
        {
            valor: await totalPatientsSelfDiagnosed(municipalitySusIDAndTeamIne),
            descricao: DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_AUTORREFERIDO
        },
        {
            valor: await totalPatientsWithClinicalDiagnosis(municipalitySusIDAndTeamIne),
            descricao: DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_CLINICO
        },
    ]
}
