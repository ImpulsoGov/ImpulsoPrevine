"use client";
import * as service from "./service";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { Caption } from "@/features/acf/frontend/common/Caption";
import { captionData, coapsColumnsAlpha, coapsColumnsBeta } from "./consts";

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
            <Caption title={captionData.title} items={captionData.items} />
        </>
    );
};
