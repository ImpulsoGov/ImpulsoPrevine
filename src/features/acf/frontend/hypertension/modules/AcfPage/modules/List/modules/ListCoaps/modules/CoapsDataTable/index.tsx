"use client";
import * as service from "./service";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { Caption } from "@/features/acf/frontend/common/Caption";
import {
    captionData,
    coapsColumnsAlpha,
    coapsColumnsBeta,
    fciCaptionData,
    columnGroupingModel,
} from "./consts";

export type { CoapsAppliedFilters } from "./model";
export { coapsColumnsAlpha as coapsColumns, service };
type Props = { isPrintEnabled: boolean };
export const CoapsDataTable: React.FC<Props> = ({ isPrintEnabled }) => {
    return (
        <>
            <DataTable
                columns={isPrintEnabled ? coapsColumnsBeta : coapsColumnsAlpha}
                columnGroupingModel={columnGroupingModel}
                serviceGetPage={service.getCoapsPage}
                customSx={{
                    "& .LowerHeader[aria-colindex='3'],& .LowerHeader[aria-colindex='5'],& .LowerHeader[aria-colindex='7'],& .LowerHeader[aria-colindex='9'],& .LowerHeader[aria-colindex='11']":
                        {
                            borderRight: "1px solid #ACACAC",
                        },
                }}
            />
            <Caption
                title={fciCaptionData.title}
                items={fciCaptionData.items}
            />
            <Caption title={captionData.title} items={captionData.items} />
        </>
    );
};
