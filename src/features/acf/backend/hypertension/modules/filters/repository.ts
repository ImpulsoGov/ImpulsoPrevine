import type { HypertensionAcfItem, Prisma } from ".prisma/client";
import { prisma } from "@prisma/prismaClient";
import type { FiltersOptionsDbCoaps, FiltersOptionsDbCoeq } from "./model";

const fieldOptions = async <TField extends keyof HypertensionAcfItem>(
    field: TField,
    whereFields: Prisma.HypertensionAcfItemWhereInput
): Promise<ReadonlyArray<HypertensionAcfItem[TField]>> => {
    const result = await prisma.hypertensionAcfItem.findMany({
        select: {
            [field]: true,
        },
        distinct: [field],
        where: whereFields,
    });
    return result.map((item) => item[field]);
};

export const coeqFilterOptions = async (
    municipalitySusId: string,
    teamIne: string
): Promise<FiltersOptionsDbCoeq> => {
    const whereFields = {
        municipalitySusId: municipalitySusId,
        careTeamIne: teamIne,
    };

    const microAreaName = await fieldOptions("microAreaName", whereFields);

    const appointmentStatusByQuarter = await fieldOptions(
        "appointmentStatusByQuarter",
        whereFields
    );

    const latestExamRequestStatusByQuarter = await fieldOptions(
        "latestExamRequestStatusByQuarter",
        whereFields
    );

    const patientAgeRange = await fieldOptions("patientAgeRange", whereFields);

    return {
        microAreaName: microAreaName,
        appointmentStatusByQuarter: appointmentStatusByQuarter,
        latestExamRequestStatusByQuarter: latestExamRequestStatusByQuarter,
        patientAgeRange: patientAgeRange,
    };
};

export const coapsFilterOptions = async (
    municipalitySusId: string
): Promise<FiltersOptionsDbCoaps> => {
    const whereFields = {
        municipalitySusId: municipalitySusId,
    };
    const careTeamName = await fieldOptions("careTeamName", whereFields);
    const microAreaName = await fieldOptions("microAreaName", whereFields);
    const appointmentStatusByQuarter = await fieldOptions(
        "appointmentStatusByQuarter",
        whereFields
    );
    const latestExamRequestStatusByQuarter = await fieldOptions(
        "latestExamRequestStatusByQuarter",
        whereFields
    );
    const patientAgeRange = await fieldOptions("patientAgeRange", whereFields);

    return {
        careTeamName: careTeamName,
        microAreaName: microAreaName,
        appointmentStatusByQuarter: appointmentStatusByQuarter,
        latestExamRequestStatusByQuarter: latestExamRequestStatusByQuarter,
        patientAgeRange: patientAgeRange,
    };
};
