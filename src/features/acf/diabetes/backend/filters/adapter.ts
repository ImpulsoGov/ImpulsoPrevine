import type {
    ConditionIdentifiedBy,
    PatientAgeRange,
    PatientStatus,
} from "@/features/acf/diabetes/common/model";
import type {
    FilterOptionsDb,
    FiltersOptions,
} from "../../../backend/diabetes/model";

// TODO mudar esses tipos para não serem hard coded
export type DiabetesFilterOptions =
    | "visitantCommunityHealthWorker"
    | "patientStatus"
    | "conditionIdentifiedBy"
    | "patientAgeRange";

type DiabetesFilterOptionsDB =
    | "acs_nome_cadastro"
    | "status_usuario"
    | "identificacao_condicao_diabetes"
    | "cidadao_faixa_etaria";

/**
 * Tranforma.
 * @param data - The data from the database.
 * @returns The adapted data for the filter options.
 */
export const filtersOptionsDbToModel = (
    data: ReadonlyArray<FilterOptionsDb>
): FiltersOptions => {
    const diabetesFilterItens: FiltersOptions = {
        patientStatus: [],
        conditionIdentifiedBy: [],
        visitantCommunityHealthWorker: [],
        patientAgeRange: [],
    };
    const groupedItems = aggregateDistinctValues(data);
    // TODO: corrigir atualização dos valores
    for (const [key, value] of Object.entries(groupedItems)) {
        if (key === "status_usuario")
            diabetesFilterItens.patientStatus = value as Array<PatientStatus>;
        if (key === "identificacao_condicao_diabetes")
            diabetesFilterItens.conditionIdentifiedBy =
                value as Array<ConditionIdentifiedBy>;
        if (key === "acs_nome_cadastro")
            diabetesFilterItens.visitantCommunityHealthWorker =
                value as Array<string>;
        if (key === "cidadao_faixa_etaria")
            diabetesFilterItens.patientAgeRange =
                value as Array<PatientAgeRange>;
    }
    return diabetesFilterItens;
};

/**
 * Collects distinct values from the data and groups them by their keys.
 * @param data - The data from the database.
 * @returns An object with the distinct values grouped by their keys.
 */
const aggregateDistinctValues = (
    data: ReadonlyArray<FilterOptionsDb>
): Record<string, Array<string | number | boolean | Date | null>> => {
    const groupedData = data.reduce(
        (
            acc: Record<string, Set<string | number | boolean | Date | null>>,
            obj
        ) => {
            for (const [key, val] of Object.entries(obj)) {
                // Essa função será removida em breve, por isso o erro de linter foi ignorado
                // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
                if (!acc[key]) acc[key] = new Set();
                acc[key].add(val);
            }
            return acc;
        },
        {}
    );

    const distinctObj = Object.fromEntries(
        Object.entries(groupedData).map(([key, set]) => [key, Array.from(set)])
    );
    return distinctObj;
};

const filterDbtoModelOptions: Record<
    DiabetesFilterOptions,
    DiabetesFilterOptionsDB
> = {
    patientStatus: "status_usuario",
    conditionIdentifiedBy: "identificacao_condicao_diabetes",
    visitantCommunityHealthWorker: "acs_nome_cadastro",
    patientAgeRange: "cidadao_faixa_etaria",
};

export const modelToDB = (
    item: Array<DiabetesFilterOptions>
): Array<DiabetesFilterOptionsDB> => {
    return item.map((filterItem) => filterDbtoModelOptions[filterItem]);
};
