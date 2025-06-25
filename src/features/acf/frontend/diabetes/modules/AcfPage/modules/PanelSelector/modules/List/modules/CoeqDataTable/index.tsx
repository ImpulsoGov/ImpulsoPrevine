"use client";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { coeqColumns } from "./consts";
import * as service from "./service";

export type { AppliedFiltersCoeq } from "./model";

export const CoeqDataTable: React.FC = () => {
    return (
        <DataTable columns={coeqColumns} serviceGetPage={service.getCoeqPage} />
    );
};
