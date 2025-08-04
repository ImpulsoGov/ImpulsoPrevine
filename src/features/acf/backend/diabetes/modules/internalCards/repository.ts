import { prisma } from "@prisma/serviceLayer/prismaClient";
import {
    DiabetesAcfInternalCardsHealthIndicator,
    type InternalCardDataItem,
} from "./model";

export type MunicipalitySusIdAndTeamIne = {
    municipalitySusId: string;
    careTeamIne: string;
};

export const totalPatientsWithDiabetes = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusIdAndTeamIne,
        },
    });
};

export const totalPatientsWithExamsAndAppointment = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusIdAndTeamIne,
            nextAppointmentDueDate: "Em dia",
            hemoglobinTestDueDate: "Em dia",
        },
    });
};

export const totalPatientsSelfDiagnosed = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusIdAndTeamIne,
            conditionIdentifiedBy: "Autorreferida",
        },
    });
};

export const totalPatientsWithClinicalDiagnosis = async (
    municipalitySusIdAndTeamIne: MunicipalitySusIdAndTeamIne
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusIdAndTeamIne,
            conditionIdentifiedBy: "Diagnóstico Clínico",
        },
    });
};

export const internalCardsDataForTeam = async (
    teamIne: string,
    municipalitySusId: string
): Promise<ReadonlyArray<InternalCardDataItem>> => {
    const municipalitySusIdAndTeamIne = {
        municipalitySusId: municipalitySusId,
        careTeamIne: teamIne,
    };

    return [
        {
            value: await totalPatientsWithDiabetes(municipalitySusIdAndTeamIne),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.TOTAL_COM_DIABETES,
        },
        {
            value: await totalPatientsWithExamsAndAppointment(
                municipalitySusIdAndTeamIne
            ),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.EXAME_E_CONSULTA_EM_DIA,
        },
        {
            value: await totalPatientsSelfDiagnosed(
                municipalitySusIdAndTeamIne
            ),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_AUTORREFERIDO,
        },
        {
            value: await totalPatientsWithClinicalDiagnosis(
                municipalitySusIdAndTeamIne
            ),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_CLINICO,
        },
    ];
};
//Gostariamos de ter esse tipo mais restrito? Com o número de chars exato do id_sus?
export type MunicipalitySusIdOnly = {
    municipalitySusId: string;
};

export const totalPatientsWithDiabetesByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusId,
        },
    });
};

export const totalPatientsWithExamsAndAppointmentByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusId,
            nextAppointmentDueDate: "Em dia",
            hemoglobinTestDueDate: "Em dia",
        },
    });
};

export const totalPatientsSelfDiagnosedByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusId,
            conditionIdentifiedBy: "Autorreferida",
        },
    });
};

export const totalPatientsWithClinicalDiagnosisByMunicipality = async (
    municipalitySusId: MunicipalitySusIdOnly
): Promise<number> => {
    return await prisma.diabetesAcfItem.count({
        where: {
            ...municipalitySusId,
            conditionIdentifiedBy: "Diagnóstico Clínico",
        },
    });
};

export const internalCardsDataForAps = async (
    municipalitySusId: string
): Promise<ReadonlyArray<InternalCardDataItem>> => {
    const municipalitySusIdObj = {
        municipalitySusId: municipalitySusId,
    };
    // Essas funçoes poderiam sofrer overload ao invés de serem reescritas? O comportamento do overload seria o mesmo de uma prop opcional?
    return [
        {
            value: await totalPatientsWithDiabetesByMunicipality(
                municipalitySusIdObj
            ),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.TOTAL_COM_DIABETES,
        },
        {
            value: await totalPatientsWithExamsAndAppointmentByMunicipality(
                municipalitySusIdObj
            ),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.EXAME_E_CONSULTA_EM_DIA,
        },
        {
            value: await totalPatientsSelfDiagnosedByMunicipality(
                municipalitySusIdObj
            ),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_AUTORREFERIDO,
        },
        {
            value: await totalPatientsWithClinicalDiagnosisByMunicipality(
                municipalitySusIdObj
            ),
            healthIndicator:
                DiabetesAcfInternalCardsHealthIndicator.DIAGNOSTICO_CLINICO,
        },
    ];
};
