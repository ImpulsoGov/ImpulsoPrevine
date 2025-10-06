import { SearchToolBar } from "@/features/acf/frontend/common/SearchToolBar";
import { WithFilters } from "@/features/acf/frontend/common/WithFilters";
import { WithPagination } from "@/features/acf/frontend/common/WithPagination";
import { WithSearch } from "@/features/acf/frontend/common/WithSearch";
import { WithSorting } from "@/features/acf/frontend/common/WithSorting";
import React, { useState } from "react";
import type { CoeqAppliedFilters } from "./modules/CoeqDataTable";
import { CoeqDataTable } from "./modules/CoeqDataTable";
import { CoeqFiltersBar } from "./modules/CoeqFiltersBar";
import { CurrentQuadrimester } from "../common/CurrentQuadrimester";
import { FilterHint } from "../common/FilterHint";

import { ListCoeq } from ".";
import { PrintTable } from "@/features/acf/frontend/common/Print";
import { PrintModal } from "@/features/acf/frontend/common/PrintModal";
import {
    coeqColumns,
    coeqLabelsModal,
    printListProps,
} from "./modules/Print/consts";
import { getCoeqData } from "./modules/Print/service";
import { WithCustomPrint } from "@/features/acf/frontend/common/WithCustomPrint";
import { WithPrintModal } from "@/features/acf/frontend/common/WithPrintModal";
import { orderPrintGroups } from "./logic";
import { WithFiltersBar } from "@/features/acf/frontend/common/WithFiltersBar";

type ContentCoeqProps = {
    isPrintEnabled: boolean;
};

//TODO: Pensar se faz sentido que isso fique aqui mesmo
const initialSelectedValuesCoeq: CoeqAppliedFilters = {
    microAreaName: [],
    patientAgeRange: "",
    goodPracticesStatusByQuarter: "",
    medicalRecordUpdated: "",
};

export const ContentCoeq: React.FC<ContentCoeqProps> = ({ isPrintEnabled }) => {
    const [shouldRenderPrintTable, setShouldRenderPrintTable] = useState(false);
    return (
        <>
            <ListCoeq>
                <WithPrintModal>
                    <WithCustomPrint orderGroup={orderPrintGroups}>
                        <CurrentQuadrimester />
                        <WithFilters
                            initialSelectedValues={initialSelectedValuesCoeq}
                        >
                            <WithSearch
                                SearchComponent={SearchToolBar}
                                isPrintEnabled={isPrintEnabled}
                                propTriggerPrintWithoutModal={
                                    printListProps.propTriggerPrintWithoutModal
                                }
                                setShouldRenderPrintTable={
                                    setShouldRenderPrintTable
                                }
                            >
                                <hr style={{ width: "100%" }} />
                                <WithSorting>
                                    <FilterHint />
                                    <WithFiltersBar FiltersBar={CoeqFiltersBar}>
                                        <WithPagination>
                                            <CoeqDataTable />
                                            <PrintModal
                                                modalLabels={coeqLabelsModal}
                                                setShouldRenderPrintTable={
                                                    setShouldRenderPrintTable
                                                }
                                            />
                                            {shouldRenderPrintTable && (
                                                <PrintTable
                                                    columns={coeqColumns}
                                                    serviceGetData={getCoeqData}
                                                    setShouldRenderPrintTable={
                                                        setShouldRenderPrintTable
                                                    }
                                                    printListProps={
                                                        printListProps
                                                    }
                                                />
                                            )}
                                        </WithPagination>
                                    </WithFiltersBar>
                                </WithSorting>
                            </WithSearch>
                        </WithFilters>
                    </WithCustomPrint>
                </WithPrintModal>
            </ListCoeq>
        </>
    );
};
