"use client";
import * as service from "./service";
import { Caption } from "@/features/acf/frontend/common/Caption";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { coeqColumns, captionData } from "./consts";

export type { CoeqAppliedFilters } from "./model";
export { coeqColumns };
export const CoeqDataTable: React.FC = () => {
    return (
        <>
            <DataTable
                columns={coeqColumns}
                serviceGetPage={service.getCoeqPage}
            />
            <Caption title={captionData.title} items={captionData.items} />
        </>
    );
};
