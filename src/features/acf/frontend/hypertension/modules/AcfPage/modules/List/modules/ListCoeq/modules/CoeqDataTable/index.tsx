"use client";
import * as service from "./service";
import { Caption } from "@/features/acf/frontend/common/Caption";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import {
    captionData,
    coeqColumns,
    fciCaptionData,
    columnGroupingModel,
    customSx,
} from "./consts";

export type { CoeqAppliedFilters } from "./model";
export { coeqColumns };

export const CoeqDataTable: React.FC = () => {
    return (
        <>
            <DataTable
                columns={coeqColumns}
                serviceGetPage={service.getCoeqPage}
                columnGroupingModel={columnGroupingModel}
                customSx={customSx}
            />
            <Caption
                title={fciCaptionData.title}
                items={fciCaptionData.items}
            />
            <Caption title={captionData.title} items={captionData.items} />
        </>
    );
};
