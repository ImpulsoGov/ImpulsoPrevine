import { ordenarGrupos } from "@helpers/lista-nominal/impressao/OrderGroups";
import { PageHeader } from "./PageHeader";
import { UnitTable } from "./UnitTable";
import type { PrintColumnsWidthProps } from "./PrintTable";
import type { GridColDef } from '@mui/x-data-grid';
import type { DataItem } from '@/utils/FilterData';
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";

export type SingleTeamPerPageProps = {
    teamSplit: Record<string, DataItem[]>,
    header: {
        appliedFilters: FilterItem,
        latestProductionDate: string,
        list: string
    },
    tables: {
        columns: GridColDef[],
        auxiliaryLists?: Record<string, Record<string,string>>,
        verticalDivider: number[],
        printColumnsWidth: PrintColumnsWidthProps
    },
    fontFamily?: string,
    printLegend?: string[]
}

export const SingleTeamPerPage = ({
  teamSplit,
  header,
  tables,
  fontFamily="sans-serif",
  printLegend
}: SingleTeamPerPageProps)=>{
    return(
        Object.keys(teamSplit).sort(ordenarGrupos).map((record,index)=>{
            return( 
            <>
              <div 
                key={`${record+index}`} 
                style={{
                  pageBreakAfter : "always",
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
                <>
                  <p style={{
                    fontSize : "11px",
                    fontFamily: `${fontFamily}, sans-serif`,
                    marginTop : "16px",
                    marginBottom : "0px"
                  }}><b>{record}</b></p>
                  <UnitTable
                    data = {teamSplit[record]}
                    columns = {tables.columns}
                    auxiliaryLists = {tables.auxiliaryLists}
                    verticalDivider={tables.verticalDivider}
                    fontFamily = {fontFamily}
                    columnsWidth={tables.printColumnsWidth.portrait}
                    layoutOrientation="portrait"
                    />
                  <UnitTable
                    data = {teamSplit[record]}
                    columns = {tables.columns}
                    auxiliaryLists = {tables.auxiliaryLists}
                    verticalDivider={tables.verticalDivider}
                    fontFamily = {fontFamily}
                    columnsWidth={tables.printColumnsWidth.landscape}
                    layoutOrientation="landscape"
                  />
                </>
              </div>
            </>
          )})
    )
}