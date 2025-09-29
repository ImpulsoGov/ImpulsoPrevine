import type { DiabetesAcfItem, Prisma } from ".prisma/client";
import { prisma } from "@prisma/prismaClient";
import type {
    FiltersOptionsDbCoaps,
    FiltersOptionsDbCoeq,
} from "../common/FiltersOptionsDb";
import type {
    GoodPracticesStatusByQuarterCode,
    PatientAgeRangeCode,
} from "@/features/acf/shared/diabetes/model";

const fieldOptions = async <TField extends keyof DiabetesAcfItem>(
    field: TField,
    whereFields: Prisma.DiabetesAcfItemWhereInput
): Promise<ReadonlyArray<DiabetesAcfItem[TField]>> => {
    const result = await prisma.diabetesAcfItem.findMany({
        select: {
            [field]: true,
        },
        distinct: [field],
        where: whereFields,
        orderBy: {
            [field]: "asc",
        },
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
    const patientAgeRange = await fieldOptions("patientAgeRange", whereFields);
    const goodPracticesStatusByQuarter = await fieldOptions(
        "goodPracticesStatusByQuarter",
        whereFields
    );
    const isMedicalRecordUpdated = await fieldOptions(
        "isMedicalRecordUpdated",
        whereFields
    );

    return {
        microAreaName: microAreaName,
        patientAgeRange: patientAgeRange as ReadonlyArray<PatientAgeRangeCode>,
        goodPracticesStatusByQuarter:
            goodPracticesStatusByQuarter as ReadonlyArray<GoodPracticesStatusByQuarterCode>,
        isMedicalRecordUpdated: isMedicalRecordUpdated,
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

    const patientAgeRange = await fieldOptions("patientAgeRange", whereFields);

    const goodPracticesStatusByQuarter = await fieldOptions(
        "goodPracticesStatusByQuarter",
        whereFields
    );

    const isMedicalRecordUpdated = await fieldOptions(
        "isMedicalRecordUpdated",
        whereFields
    );

    return {
        careTeamName: careTeamName,
        microAreaName: microAreaName,
        patientAgeRange: patientAgeRange as ReadonlyArray<PatientAgeRangeCode>,
        goodPracticesStatusByQuarter:
            goodPracticesStatusByQuarter as ReadonlyArray<GoodPracticesStatusByQuarterCode>,
        isMedicalRecordUpdated: isMedicalRecordUpdated,
    };
};
