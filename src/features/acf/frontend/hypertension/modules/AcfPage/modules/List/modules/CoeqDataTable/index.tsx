"use client";
import { DataTable } from "@features/acf/frontend/common/DataTable";
import { coeqColumns } from "./consts";
import * as service from "./service";
import { TableWrapperWithNameCpfCnsCellStyle } from "../common/RenderPatientNameCpfCns";

export type { CoeqAppliedFilters } from "./model";

export const CoeqDataTable: React.FC = () => {
    return (
        <TableWrapperWithNameCpfCnsCellStyle>
            <DataTable
                columns={coeqColumns}
                serviceGetPage={service.getCoeqPage}
            />
        </TableWrapperWithNameCpfCnsCellStyle>
    );
};
