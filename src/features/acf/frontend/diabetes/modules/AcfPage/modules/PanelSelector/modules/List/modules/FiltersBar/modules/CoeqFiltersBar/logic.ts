import type * as schema from "@/features/acf/shared/diabetes/schema";
import { toSelectConfigsShared } from "../../logic";
import type { SelectConfig } from "../common/SelectConfig";

// export type FilterOptions =
//     | Array<CommunityHealthWorker>
//     | Array<PatientStatus>
//     | Array<ConditionIdentifiedBy>
//     | Array<PatientAgeRange>;

export const toSelectConfigsCoeq = (
    filtersValues: schema.CoeqFilters
): Array<SelectConfig> => {
    return [...toSelectConfigsShared(filtersValues)];
};

// export const searchParamsToSelectedValuesCoeq = (
//     searchParams: URLSearchParams
// ): PossibleSelectedFilterSets => {
//     const patientsStatus: Array<schema.PatientStatus> = (searchParams
//         .get("patientStatus")
//         ?.split(",") ?? []) as Array<schema.PatientStatus>;
//     const ranges = (searchParams.get("patientAgeRange")?.split(",") ??
//         []) as Array<schema.PatientAgeRange>;
//     return {
//         communityHealthWorker:
//             searchParams.get("communityHealthWorker")?.split(",") ?? [],
//         patientStatus: onlyValidFilterValues(
//             patientsStatus,
//             schema.patientStatus
//         ),
//         conditionIdentifiedBy: (searchParams
//             .get("conditionIdentifiedBy")
//             ?.split(",")[0] ?? "") as schema.ConditionIdentifiedBy,
//         patientAgeRange: onlyValidFilterValues(ranges, schema.patientAgeRange),
//     };
// };
