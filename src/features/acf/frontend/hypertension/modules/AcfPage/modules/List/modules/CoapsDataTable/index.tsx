"use client";
import { TableWrapperWithNameCpfCnsCellStyle } from "../common/RenderPatientNameCpfCns";
import { coapsColumns } from "./consts";
import * as service from "./service";

import { DataTable } from "@features/acf/frontend/common/DataTable";

export type { CoapsAppliedFilters } from "./model";

export const CoapsDataTable: React.FC = () => {
    return (
        <TableWrapperWithNameCpfCnsCellStyle>
            <DataTable
                columns={coapsColumns}
                serviceGetPage={service.getCoapsPage}
            />
        </TableWrapperWithNameCpfCnsCellStyle>
    );
};
