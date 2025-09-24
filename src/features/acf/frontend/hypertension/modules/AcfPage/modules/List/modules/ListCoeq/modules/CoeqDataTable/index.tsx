"use client";
import * as service from "./service";
import { Caption } from "@/features/acf/frontend/common/Caption";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import {
    coeqColumnsAlpha,
    captionData,
    coeqColumnsBeta,
    fciCaptionData,
    columnGroupingModel,
    customSx,
} from "./consts";

export type { CoeqAppliedFilters } from "./model";
export { coeqColumnsAlpha as coeqColumns };
type Props = { isPrintEnabled: boolean };
export const CoeqDataTable: React.FC<Props> = ({ isPrintEnabled }) => {
    return (
        <>
            <DataTable
                columns={isPrintEnabled ? coeqColumnsBeta : coeqColumnsAlpha}
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
