import { SplitByTeam } from "@helpers/lista-nominal/impressao/SplitByTeam";
import { MultipleTeamsPerPage } from "./MultipleTeamsPerPage";
import { SingleTeamPerPage } from "./SingleTeamPerPage";
import { NoSplit } from "./NoSplit";
import type { DataItem } from '@/utils/FilterData';
import type { GridColDef } from '@mui/x-data-grid';
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";

export type PrintColumnsWidthProps = {
  portrait: Record<string,string>,
  landscape: Record<string,string>,
}

export type PrintTableProps = {
    data: DataItem[],
    columns: GridColDef[],
    list: string,
    appliedFilters: FilterItem,
    dataSplit: boolean,
    pageSplit: boolean,
    latestProductionDate: string,
    auxiliaryLists?: Record<string, Record<string,string>>,
    printColumnsWidth: PrintColumnsWidthProps,
    verticalDivider: number[],
    fontFamily: string,
    propPrintGrouping: string,
    printLegend?: string[]
}

export const PrintTable = ({ 
    data, 
    columns, 
    list,
    appliedFilters,
    dataSplit, 
    pageSplit, 
    latestProductionDate,
    auxiliaryLists,
    printColumnsWidth,
    verticalDivider,
    fontFamily="sans-serif",
    propPrintGrouping,
    printLegend
  }: PrintTableProps) => {
    const teamSplit = SplitByTeam(data,propPrintGrouping)
    console.log(pageSplit, dataSplit)
    return (
      <div 
        key="print-table"
        className="largura"
        style={{
          fontFamily: `${fontFamily}, sans-serif`,
        }}
      >
        {
          dataSplit && !pageSplit &&
          <MultipleTeamsPerPage
            teamSplit={teamSplit}
            header={{
              appliedFilters : appliedFilters,
              latestProductionDate : latestProductionDate,
              list : list
            }}
            printLegend={printLegend}
            tables={{
              columns: columns,
              auxiliaryLists: auxiliaryLists,
              printColumnsWidth: printColumnsWidth,
              verticalDivider: verticalDivider
            }}
            fontFamily={fontFamily}
          />
        }
        {
          pageSplit && dataSplit &&
          <SingleTeamPerPage
            teamSplit={teamSplit}
            header={{
              appliedFilters: appliedFilters,
              latestProductionDate: latestProductionDate,
              list: list
            }}
            printLegend={printLegend}
            tables={{
              columns : columns,
              auxiliaryLists: auxiliaryLists,
              printColumnsWidth: printColumnsWidth,
              verticalDivider: verticalDivider
            }}
            fontFamily={fontFamily}
          />
        }
        {
          !(dataSplit || pageSplit) &&
          <NoSplit
            data={data}
            header={{
              appliedFilters : appliedFilters,
              latestProductionDate : latestProductionDate,
              list : list
            }}
            printLegend={printLegend}
            table={{
              columns: columns,
              auxiliaryLists: auxiliaryLists,
              printColumnsWidth: printColumnsWidth,
              verticalDivider: verticalDivider
            }}
            fontFamily={fontFamily}
          />
        }
      </div>
    );
  };

