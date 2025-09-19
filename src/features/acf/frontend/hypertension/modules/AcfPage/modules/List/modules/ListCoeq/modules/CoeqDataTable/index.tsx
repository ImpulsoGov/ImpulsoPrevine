"use client";
import * as service from "./service";
import { Caption } from "@/features/acf/frontend/common/Caption";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { coeqColumns, captionData, coeqColumnsBeta } from "./consts";

export type { CoeqAppliedFilters } from "./model";
export { coeqColumns };
type Props = { isPrintEnabled: boolean };
export const CoeqDataTable: React.FC<Props> = ({ isPrintEnabled }) => {
    return (
        <>
            <DataTable
                columns={isPrintEnabled ? coeqColumnsBeta : coeqColumns}
                serviceGetPage={service.getCoeqPage}
            />
            <Caption title={captionData.title} items={captionData.items} />
        </>
    );
};
