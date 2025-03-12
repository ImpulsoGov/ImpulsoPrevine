import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import { PageHeader } from "./PageHeader";
import { UnitTable } from "./UnitTable";
import type { ExtendedGridColDef } from "./UnitTable";
import type { DataItem } from "@/utils/FilterData";

export type NoSplitProps = {
    data: DataItem[],
    header: {
        appliedFilters: FilterItem,
        latestProductionDate: string,
        list: string,
    },
    table: {
        columns: ExtendedGridColDef[],
        auxiliaryLists?: Record<string, Record<string, string>>,
        verticalDivider: number[],
        printColumnsWidth: {
            landscape: Record<string, string>,
            portrait: Record<string, string>,
        }
    },
    fontFamily?: string,
    printLegend?: string[],
}

export const NoSplit =({
    data,
    header,
    table,
    fontFamily="sans-serif",
    printLegend
}: NoSplitProps)=>{
    return(
      <div
        style={{
          marginBottom : "30px",
          pageBreakAfter : "always",
          pageBreakInside : "avoid",
          display : "flex",
          flexDirection : "column",
          gap : "16px",
        }}
      >
        <PageHeader 
          appliedFilters={header.appliedFilters}
          latestProductionDate={header.latestProductionDate}
          list={header.list}
          fontFamily = {fontFamily}
          printLegend={printLegend}
        />
        <UnitTable
          data = {data}
          columns = {table.columns}
          auxiliaryLists = {table.auxiliaryLists}
          verticalDivider={table.verticalDivider}
          fontFamily = {fontFamily}
          columnsWidth={table.printColumnsWidth.landscape}
          layoutOrientation="landscape"
        />
        <UnitTable
          data = {data}
          columns = {table.columns}
          auxiliaryLists = {table.auxiliaryLists}
          verticalDivider={table.verticalDivider}
          fontFamily = {fontFamily}
          columnsWidth={table.printColumnsWidth.portrait}
          layoutOrientation="portrait"
        />
      </div>
)} 