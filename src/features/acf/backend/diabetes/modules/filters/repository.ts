import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
} from "@/features/acf/shared/diabetes/model";
import { type impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import { prisma } from "@prisma/prismaClient";
import type { FiltersOptionsCoaps, FiltersOptionsCoeq } from "./model";

async function fieldOptionsCoeq<
    TField extends
        keyof impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
>(
    field: TField,
    municipalitySusId: string,
    teamIne: string
): Promise<
    ReadonlyArray<
        impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[TField]
    >
> {
    const result =
        await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
            {
                select: {
                    [field]: true,
                },
                distinct: [field],
                where: {
                    municipio_id_sus: municipalitySusId,
                    equipe_ine_cadastro: teamIne,
                },
            }
        );
    return result.map((item) => item[field]);
}

async function fieldOptionsCoaps<
    TField extends
        keyof impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos,
>(
    field: TField,
    municipalitySusId: string
): Promise<
    ReadonlyArray<
        impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos[TField]
    >
> {
    const result =
        await prisma.impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos.findMany(
            {
                select: {
                    [field]: true,
                },
                distinct: [field],
                where: {
                    municipio_id_sus: municipalitySusId,
                },
            }
        );
    return result.map((item) => item[field]);
}

export const coeqFilterOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<FiltersOptionsCoeq> => {
    const communityHealthWorker = await fieldOptionsCoeq(
        "acs_nome_cadastro",
        municipalitySusId,
        teamIne
    );

    const patientStatus = await fieldOptionsCoeq(
        "status_usuario",
        municipalitySusId,
        teamIne
    );
    const conditionIdentifiedBy = await fieldOptionsCoeq(
        "identificacao_condicao_diabetes",
        municipalitySusId,
        teamIne
    );
    const patientAgeRange = await fieldOptionsCoeq(
        "cidadao_faixa_etaria",
        municipalitySusId,
        teamIne
    );

    return {
        communityHealthWorker: communityHealthWorker.map(
            (field) => field || ""
        ),
        patientStatus: patientStatus.map((field) => field as PatientStatus),
        conditionIdentifiedBy: conditionIdentifiedBy.map(
            (field) => field as ConditionIdentifiedBy
        ),
        patientAgeRange: patientAgeRange.map(
            (field) => field as PatientAgeRange
        ),
    };
};

export const coapsFilterOptions = async (
    municipalitySusId: string
): Promise<FiltersOptionsCoaps> => {
    const communityHealthWorker = await fieldOptionsCoaps(
        "acs_nome_cadastro",
        municipalitySusId
    );

    const patientStatus = await fieldOptionsCoaps(
        "status_usuario",
        municipalitySusId
    );
    const conditionIdentifiedBy = await fieldOptionsCoaps(
        "identificacao_condicao_diabetes",
        municipalitySusId
    );
    const patientAgeRange = await fieldOptionsCoaps(
        "cidadao_faixa_etaria",
        municipalitySusId
    );

    const careTeamName = await fieldOptionsCoaps(
        "equipe_nome_cadastro",
        municipalitySusId
    );

    return {
        communityHealthWorker: communityHealthWorker.map(
            (field) => field || ""
        ),
        patientStatus: patientStatus.map((field) => field as PatientStatus),
        conditionIdentifiedBy: conditionIdentifiedBy.map(
            (field) => field as ConditionIdentifiedBy
        ),
        patientAgeRange: patientAgeRange.map(
            (field) => field as PatientAgeRange
        ),
        careTeamName: careTeamName.map((field) => field || ""),
    };
};
