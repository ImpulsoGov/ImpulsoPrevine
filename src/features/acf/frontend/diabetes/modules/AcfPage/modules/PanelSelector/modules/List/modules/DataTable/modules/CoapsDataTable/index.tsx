"use client";
import { coapsColumns } from "./consts";
import * as service from "./service";

import { DataTable } from "../common/DataTable";

export type { AppliedFiltersCoaps } from "./model";

export const CoapsDataTable: React.FC = () => {
    return (
        <DataTable
            columns={coapsColumns}
            serviceGetPage={service.getCoapsPage}
        />
    );
};
