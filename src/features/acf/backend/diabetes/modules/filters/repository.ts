import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
} from "@/features/acf/shared/diabetes/model";
import { type diabetesAcf } from "@prisma/client";
import { prisma } from "@prisma/prismaClient";
import type { FiltersOptionsCoaps, FiltersOptionsCoeq } from "./model";

const fieldOptionsCoeq = async <TField extends keyof diabetesAcf>(
    field: TField,
    municipalitySusId: string,
    teamIne: string
): Promise<ReadonlyArray<diabetesAcf[TField]>> => {
    const result = await prisma.diabetesAcf.findMany({
        select: {
            [field]: true,
        },
        distinct: [field],
        where: {
            municipalitySusId: municipalitySusId,
            careTeamIne: teamIne,
        },
    });
    return result.map((item) => item[field]);
};

const fieldOptionsCoaps = async <TField extends keyof diabetesAcf>(
    field: TField,
    municipalitySusId: string
): Promise<ReadonlyArray<diabetesAcf[TField]>> => {
    const result = await prisma.diabetesAcf.findMany({
        select: {
            [field]: true,
        },
        distinct: [field],
        where: {
            municipalitySusId: municipalitySusId,
        },
    });
    return result.map((item) => item[field]);
};

export const coeqFilterOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<FiltersOptionsCoeq> => {
    const communityHealthWorker = await fieldOptionsCoeq(
        "communityHealthWorker",
        municipalitySusId,
        teamIne
    );

    const patientStatus = await fieldOptionsCoeq(
        "patientStatus",
        municipalitySusId,
        teamIne
    );
    const conditionIdentifiedBy = await fieldOptionsCoeq(
        "conditionIdentifiedBy",
        municipalitySusId,
        teamIne
    );
    const patientAgeRange = await fieldOptionsCoeq(
        "patientAgeRange",
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
        "communityHealthWorker",
        municipalitySusId
    );

    const patientStatus = await fieldOptionsCoaps(
        "patientStatus",
        municipalitySusId
    );
    const conditionIdentifiedBy = await fieldOptionsCoaps(
        "conditionIdentifiedBy",
        municipalitySusId
    );
    const patientAgeRange = await fieldOptionsCoaps(
        "patientAgeRange",
        municipalitySusId
    );

    const careTeamName = await fieldOptionsCoaps(
        "careTeamName",
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
