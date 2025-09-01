import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React, { useRef } from "react";
import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";
import type { CoeqAppliedFilters } from "./modules/CoeqDataTable";
import { coeqColumns, CoeqDataTable } from "./modules/CoeqDataTable";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import { CurrentQuadrimester } from "../common/CurrentQuadrimester";
import { FilterHint } from "../common/FilterHint";

import { ListCoeq } from ".";
import { PrintTable } from "@/features/acf/frontend/common/Print";
import { PrintModal } from "@/features/acf/frontend/common/PrintModal";
import { coeqLabelsModal } from "./modules/Print/consts";
import { getCoeqData } from "./modules/Print/service";

type ContentCoeqProps = {
    list: AcfDashboardType;
    isPrintEnabled: boolean;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValuesCoeq: CoeqAppliedFilters = {
    microAreaName: [],
    appointmentStatusByQuarter: [],
    latestExamRequestStatusByQuarter: [],
    patientAgeRange: "",
};

export const ContentCoeq: React.FC<ContentCoeqProps> = ({
    list,
    isPrintEnabled,
}) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <>
            <ListCoeq list={list}>
                <CurrentQuadrimester />
                <WithSearch
                    SearchComponent={SearchToolBar}
                    isPrintEnabled={isPrintEnabled}
                >
                    <hr style={{ width: "100%" }} />
                    <WithSorting>
                        <FilterHint />
                        <WithFilters
                            initialSelectedValues={initialSelectedValuesCoeq}
                            FiltersBar={CoeqFiltersBar}
                        >
                            <WithPagination>
                                <CoeqDataTable />
                                <PrintModal
                                    modalLabels={coeqLabelsModal}
                                    ref={ref}
                                >
                                    <PrintTable
                                        columns={coeqColumns}
                                        serviceGetData={getCoeqData}
                                        ref={ref}
                                    />
                                </PrintModal>
                            </WithPagination>
                        </WithFilters>
                    </WithSorting>
                </WithSearch>
            </ListCoeq>
        </>
    );
};
