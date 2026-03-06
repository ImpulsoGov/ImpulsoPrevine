import type { PregnancyAndPuerperiumCareItem } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare";

export type InputData = Pick<
    PregnancyAndPuerperiumCareItem,
    | "gestationalAgeByLastMenstrualPeriodWeeks"
    | "gestationalAgeByLastMenstrualPeriodDays"
    | "gestationalAgeByObstreticalUltrasoundWeeks"
    | "gestationalAgeByObstreticalUltrasoundDays"
>;

export type GestationalAge = {
    weeks: number | null;
    days: 0 | 1 | 2 | 3 | 4 | 5 | 6 | null;
};
