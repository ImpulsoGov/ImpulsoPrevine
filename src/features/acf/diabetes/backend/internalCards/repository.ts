import { prisma } from "@prisma/prismaClient";
import {
    DiabetesAcfInternalCardsHealthIndicator,
    type InternalCardDBDataItem,
} from "../model";

export type MunicipalitySusIdAndTeamIne = {
    municipio_id_sus: string;
    equipe_ine_cadastro: string;
};

export const totalPatientsWithDiabetes = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusIdAndTeamIne,
            },
        }
    );
};

export const totalPatientsWithExamsAndAppointment = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusIdAndTeamIne,
                prazo_proxima_consulta: "Em dia",
                prazo_proxima_solicitacao_hemoglobina: "Em dia",
            },
        }
    );
};

export const totalPatientsSelfDiagnosed = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusIdAndTeamIne,
                identificacao_condicao_diabetes: "Autorreferida",
            },
        }
    );
};

export const totalPatientsWithClinicalDiagnosis = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusIdAndTeamIne,
                identificacao_condicao_diabetes: "Diagnóstico Clínico",
            },
        }
    );
};

export const internalCardsDataForTeam = async (
    teamIne: string,
    municipalitySusID: string
): Promise<ReadonlyArray<InternalCardDBDataItem>> => {
    const municipalitySusIDAndTeamIne = {
        municipio_id_sus: municipalitySusID,
        equipe_ine_cadastro: teamIne,
    };

    return [
        {
            valor: await totalPatientsWithDiabetes(municipalitySusIDAndTeamIne),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.TOTAL_COM_DIABETES,
        },
        {
            valor: await totalPatientsWithExamsAndAppointment(
                municipalitySusIDAndTeamIne
            ),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.EXAME_E_CONSULTA_EM_DIA,
        },
        {
            valor: await totalPatientsSelfDiagnosed(
                municipalitySusIDAndTeamIne
            ),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_AUTORREFERIDO,
        },
        {
            valor: await totalPatientsWithClinicalDiagnosis(
                municipalitySusIDAndTeamIne
            ),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_CLINICO,
        },
    ];
};
//Gostariamos de ter esse tipo mais restrito? Com o número de chars exato do id_sus?
export type MunicipalitySusIdOnly = {
    municipio_id_sus: string;
};

export const totalPatientsWithDiabetesByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusId,
            },
        }
    );
};

export const totalPatientsWithExamsAndAppointmentByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusId,
                prazo_proxima_consulta: "Em dia",
                prazo_proxima_solicitacao_hemoglobina: "Em dia",
            },
        }
    );
};

export const totalPatientsSelfDiagnosedByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusId,
                identificacao_condicao_diabetes: "Autorreferida",
            },
        }
    );
};

export const totalPatientsWithClinicalDiagnosisByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.count(
        {
            where: {
                ...municipalitySusId,
                identificacao_condicao_diabetes: "Diagnóstico Clínico",
            },
        }
    );
};

export const internalCardsDataForAps = async (
    municipalitySusID: string
): Promise<ReadonlyArray<InternalCardDBDataItem>> => {
    const municipalitySusIdObj = {
        municipio_id_sus: municipalitySusID,
    };
    // Essas funçoes poderiam sofrer overload ao invés de serem reescritas? O comportamento do overload seria o mesmo de uma prop opcional?
    return [
        {
            valor: await totalPatientsWithDiabetesByMunicipality(
                municipalitySusIdObj
            ),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.TOTAL_COM_DIABETES,
        },
        {
            valor: await totalPatientsWithExamsAndAppointmentByMunicipality(
                municipalitySusIdObj
            ),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.EXAME_E_CONSULTA_EM_DIA,
        },
        {
            valor: await totalPatientsSelfDiagnosedByMunicipality(
                municipalitySusIdObj
            ),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_AUTORREFERIDO,
        },
        {
            valor: await totalPatientsWithClinicalDiagnosisByMunicipality(
                municipalitySusIdObj
            ),
            descricao:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_CLINICO,
        },
    ];
};
