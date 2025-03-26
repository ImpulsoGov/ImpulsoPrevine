import { ordenarGrupos } from "@helpers/lista-nominal/impressao/OrderGroups";
import { PageHeader } from "./PageHeader";
import { UnitTable } from "./UnitTable";
import type { PrintColumnsWidthProps } from "./PrintTable";
import type { GridColDef } from "@mui/x-data-grid";
import type { DataItem } from "@/utils/FilterData";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";

export type MultipleTeamsPerPageProps = {
    teamSplit: Record<string, DataItem[]>;
    header: {
        appliedFilters: FilterItem;
        filtersLabels: Record<string, string>;
        latestProductionDate: string;
        list: string;
    };
    tables: {
        columns: GridColDef[];
        auxiliaryLists?: Record<string, Record<string, string>>;
        verticalDivider: number[];
        printColumnsWidth: PrintColumnsWidthProps;
    };
    fontFamily?: string;
    printLegend?: string[];
};

export const MultipleTeamsPerPage = ({
    teamSplit,
    header,
    tables,
    fontFamily = "sans-serif",
    printLegend,
}: MultipleTeamsPerPageProps) => {
    return (
        <div key="multiple-teams-per-page">
            <PageHeader
                key="page-header"
                appliedFilters={header.appliedFilters}
                filtersLabels={header.filtersLabels}
                latestProductionDate={header.latestProductionDate}
                list={header.list}
                fontFamily={fontFamily}
                printLegend={printLegend}
            />
            {Object.keys(teamSplit)
                .sort(ordenarGrupos)
                .map((record, index) => {
                    return (
                        <div key={`${record + index}`}>
                            <div key={`${record + index}`}>
                                <p
                                    style={{
                                        fontSize: "11px",
                                        fontFamily: `${fontFamily}, sans-serif`,
                                        marginTop: "40px",
                                        marginBottom: "17px",
                                    }}
                                >
                                    <b>{record}</b>
                                </p>
                                <UnitTable
                                    data={teamSplit[record]}
                                    columns={tables.columns}
                                    auxiliaryLists={tables.auxiliaryLists}
                                    verticalDivider={tables.verticalDivider}
                                    fontFamily={fontFamily}
                                    columnsWidth={
                                        tables.printColumnsWidth.portrait
                                    }
                                    layoutOrientation="portrait"
                                />
                                <UnitTable
                                    data={teamSplit[record]}
                                    columns={tables.columns}
                                    auxiliaryLists={tables.auxiliaryLists}
                                    verticalDivider={tables.verticalDivider}
                                    fontFamily={fontFamily}
                                    columnsWidth={
                                        tables.printColumnsWidth.landscape
                                    }
                                    layoutOrientation="landscape"
                                />
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};
