import type { InternalCardDBDataItem } from "./internalCards.model"
import { totalPatientsSelfDiagnosed, totalPatientsWithClinicalDiagnosis, totalPatientsWithDiabetes, totalPatientsWithExamsAndAppointment } from "./internalCards.queries"

export const internalCardsDataForTeam = async(
    teamIne: string,
    municipalitySusID: string,
): Promise<readonly InternalCardDBDataItem[]> =>{
    const municipalitySusIDAndTeamIne = {
        municipio_id_sus: municipalitySusID,
        equipe_ine_cadastro: teamIne
    }

    return [
        {
            valor: await totalPatientsWithDiabetes(municipalitySusIDAndTeamIne),
            descricao: "TOTAL_COM_DIABETES"
        },
        {
            valor: await totalPatientsWithExamsAndAppointment(municipalitySusIDAndTeamIne),
            descricao: "EXAME_E_CONSULTA_EM_DIA"
        },
        {
            valor: await totalPatientsSelfDiagnosed(municipalitySusIDAndTeamIne),
            descricao: "DIAGNOSTICO_AUTORREFERIDO"
        },
        {
            valor: await totalPatientsWithClinicalDiagnosis(municipalitySusIDAndTeamIne),
            descricao: "DIAGNOSTICO_CLINICO"
        },
    ]
}
