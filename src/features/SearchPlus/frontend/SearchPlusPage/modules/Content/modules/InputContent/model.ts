import type { BreastAndUterusCareCsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/BreastAndUterusCare";
import type { PregnancyAndPuerperiumCareCsvRow } from "@features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/PregnancyAndPuerperiumCare/model";

//TODO: Este módulo não deveria estar importando coisas de linhas de cuidado específicas
export type CsvRow =
    | BreastAndUterusCareCsvRow
    | PregnancyAndPuerperiumCareCsvRow;
