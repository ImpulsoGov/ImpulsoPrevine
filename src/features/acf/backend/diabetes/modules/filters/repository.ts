import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
} from "@/features/acf/shared/diabetes/model";
import { type impulso_previne_dados_nominais___painel_enfermeiras_lista_nominal_diabeticos } from "@prisma/client";
import { prisma } from "@prisma/prismaClient";
import type { FiltersOptions } from "./model";

async function fieldOptions<
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

export const coeqFilterOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<FiltersOptions> => {
    const visitantCommunityHealthWorker = await fieldOptions(
        "acs_nome_cadastro",
        municipalitySusId,
        teamIne
    );

    const patientStatus = await fieldOptions(
        "status_usuario",
        municipalitySusId,
        teamIne
    );
    const conditionIdentifiedBy = await fieldOptions(
        "identificacao_condicao_diabetes",
        municipalitySusId,
        teamIne
    );
    const patientAgeRange = await fieldOptions(
        "cidadao_faixa_etaria",
        municipalitySusId,
        teamIne
    );

    return {
        visitantCommunityHealthWorker: visitantCommunityHealthWorker.map(
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
