import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
} from "@/features/acf/shared/diabetes/model";
import type { impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import { prisma } from "@prisma/prismaClient";
import type { FiltersOptions } from "./model";

const communityHealthWorkerOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<
    ReadonlyArray<
        Pick<
            impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
            "acs_nome_cadastro"
        >
    >
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            select: {
                acs_nome_cadastro: true,
            },
            distinct: ["acs_nome_cadastro"],
            where: {
                municipio_id_sus: municipalitySusId,
                equipe_ine_cadastro: teamIne,
            },
        }
    );
};

const patientStatusOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<
    ReadonlyArray<
        Pick<
            impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
            "status_usuario"
        >
    >
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            select: {
                status_usuario: true,
            },
            distinct: ["status_usuario"],
            where: {
                municipio_id_sus: municipalitySusId,
                equipe_ine_cadastro: teamIne,
            },
        }
    );
};

const conditionIdentifiedByOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<
    ReadonlyArray<
        Pick<
            impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
            "identificacao_condicao_diabetes"
        >
    >
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            select: {
                identificacao_condicao_diabetes: true,
            },
            distinct: ["identificacao_condicao_diabetes"],
            where: {
                municipio_id_sus: municipalitySusId,
                equipe_ine_cadastro: teamIne,
            },
        }
    );
};

const patientAgeRangeOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<
    ReadonlyArray<
        Pick<
            impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
            "cidadao_faixa_etaria"
        >
    >
> => {
    return await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
        {
            select: {
                cidadao_faixa_etaria: true,
            },
            distinct: ["cidadao_faixa_etaria"],
            where: {
                municipio_id_sus: municipalitySusId,
                equipe_ine_cadastro: teamIne,
            },
        }
    );
};

//TODO: Arrumar o nome
export const coeqFilterOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<FiltersOptions> => {
    const visitantCommunityHealthWorker = await communityHealthWorkerOptions(
        municipalitySusId,
        teamIne
    );
    const patientStatus = await patientStatusOptions(
        municipalitySusId,
        teamIne
    );
    const conditionIdentifiedBy = await conditionIdentifiedByOptions(
        municipalitySusId,
        teamIne
    );
    const patientAgeRange = await patientAgeRangeOptions(
        municipalitySusId,
        teamIne
    );

    return {
        visitantCommunityHealthWorker: visitantCommunityHealthWorker.map(
            (field) => field.acs_nome_cadastro || ""
        ),
        patientStatus: patientStatus.map(
            (field) => field.status_usuario as PatientStatus
        ),
        conditionIdentifiedBy: conditionIdentifiedBy.map(
            (field) =>
                field.identificacao_condicao_diabetes as ConditionIdentifiedBy
        ),
        patientAgeRange: patientAgeRange.map(
            (field) => field.cidadao_faixa_etaria as PatientAgeRange
        ),
    };
};
