import type { BreastAndUterusCareCsvRow } from "@/features/SearchPlus/frontend/SearchPlusPage/modules/common/carePathways/modules/breastAndUterusCare";
import type { PregnancyAndPuerperiumCareCsvRow } from "../../../common/carePathways/modules/pregnancyAndPuerperiumCare/model";

//TODO: Este módulo não deveria estar importando coisas de linhas de cuidado específicas
export type CsvRow =
    | BreastAndUterusCareCsvRow
    | PregnancyAndPuerperiumCareCsvRow;
