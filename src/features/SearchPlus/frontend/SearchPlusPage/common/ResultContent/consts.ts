import { breastAndUterusCareColumns } from "../../breastAndUterusCare";
import type { ColumnsProps, SearchPlusItem } from "./model";

type Lists = "breastAndUterusCare";

export const columns: Record<Lists, Array<ColumnsProps<SearchPlusItem>>> = {
    breastAndUterusCare: breastAndUterusCareColumns,
};
