"use client";
import * as service from "./service";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { Caption } from "@/features/acf/frontend/common/Caption";
import {
    captionData,
    coapsColumnsAlpha,
    coapsColumnsBeta,
    fciCaptionData,
} from "./consts";

export type { CoapsAppliedFilters } from "./model";
export { coapsColumnsAlpha as coapsColumns, service };
type Props = { isPrintEnabled: boolean };
export const CoapsDataTable: React.FC<Props> = ({ isPrintEnabled }) => {
    return (
        <>
            <DataTable
                columns={isPrintEnabled ? coapsColumnsBeta : coapsColumnsAlpha}
                serviceGetPage={service.getCoapsPage}
            />
            <Caption
                title={fciCaptionData.title}
                items={fciCaptionData.items}
            />
            <Caption title={captionData.title} items={captionData.items} />
        </>
    );
};
