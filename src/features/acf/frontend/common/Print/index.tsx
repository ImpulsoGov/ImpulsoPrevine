import type { GridColDef } from "@mui/x-data-grid";
import { RenderPrint } from "./RenderPrint";
import type { AppliedFilters } from "../WithFilters";
import type { PageResponses } from "@/features/acf/shared/schema";
import type { ServiceGetPage } from "./modules/PrintTable/container";
import { PrintTable } from "./modules/PrintTable";

const PRINT_ESCALE = "1";

export const Print = (
    // columns: Array<GridColDef>,
    // service: ServiceGetPage<AppliedFilters, PageResponses>
    stringfiedComponent: string
): void => {
    // const PrintTableMounted = (
    //     <PrintTable
    //         columns={columns}
    //         serviceGetPage={service}
    //         key="print-table-child"
    //     />
    // );
    console.log("aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    RenderPrint(PRINT_ESCALE, stringfiedComponent);
};
