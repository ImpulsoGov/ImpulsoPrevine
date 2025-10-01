"use client";
import * as service from "./service";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { Caption } from "@/features/acf/frontend/common/Caption";
import {
    captionData,
    coapsColumns,
    fciCaptionData,
    columnGroupingModel,
    customSx,
} from "./consts";

export type { CoapsAppliedFilters } from "./model";
export { coapsColumns, service };
export const CoapsDataTable: React.FC = () => {
    return (
        <>
            <DataTable
                columns={coapsColumns}
                columnGroupingModel={columnGroupingModel}
                serviceGetPage={service.getCoapsPage}
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
