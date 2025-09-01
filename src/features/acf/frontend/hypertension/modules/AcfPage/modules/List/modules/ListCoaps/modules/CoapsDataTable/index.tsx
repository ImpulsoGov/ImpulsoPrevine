"use client";
import * as service from "./service";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { Caption } from "@/features/acf/frontend/common/Caption";
import { captionData, coapsColumns } from "./consts";

export type { CoapsAppliedFilters } from "./model";
export { coapsColumns, service };

export const CoapsDataTable: React.FC = () => {
    return (
        <>
            <DataTable
                columns={coapsColumns}
                serviceGetPage={service.getCoapsPage}
            />
            <Caption title={captionData.title} items={captionData.items} />
        </>
    );
};
