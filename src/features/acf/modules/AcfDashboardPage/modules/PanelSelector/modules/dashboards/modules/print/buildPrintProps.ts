import type { PrintTableProps } from "@/componentes/unmounted/lista-nominal/print/PrintTable";
import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import { larguraColunasHipertensaoEquipePaisagem, larguraColunasHipertensaoEquipeRetrato, larguraColunasHipertensaoPaisagem, larguraColunasHipertensaoRetrato } from "@/helpers/larguraColunasHipertensao";
import type { FilterItem } from "@/services/lista-nominal/ListaNominal";
import { PROFILE_ID, type ProfileIdValue } from "@/types/profile";
import { filtersLabels } from "../filters/filtersLabels";
import type { DiabetesAcfPrintItem } from "./diabetes/print.model";
import { diabetesColumns } from "../table/modules/diabetes/modules/columns/columns";

export const buildPrintProps = (
  list: AcfDashboardType,
  tableData: DiabetesAcfPrintItem[],
  userProfiles: ProfileIdValue[],
  value: FilterItem,
): PrintTableProps => {
  const props: PrintTableProps = {
    data: tableData,
    columns: diabetesColumns,
    list: list,
    appliedFilters: value,
    latestProductionDate: String(tableData[0].mostRecentProductionRecordDate),
    fontFamily: "sans-serif",
    dataSplit: false,
    pageSplit: false,
    printColumnsWidth: {
        landscape: userProfiles.includes(PROFILE_ID.COEQ)
            ? larguraColunasHipertensaoEquipePaisagem
            : larguraColunasHipertensaoPaisagem,
        portrait: userProfiles.includes(PROFILE_ID.COEQ)
            ? larguraColunasHipertensaoEquipeRetrato
            : larguraColunasHipertensaoRetrato,
    },
    verticalDivider: [2, 4, 6],
    propPrintGrouping: userProfiles.includes(PROFILE_ID.COEQ)
        ? "acs_nome_cadastro"
        : "equipe_nome",
    filtersLabels: filtersLabels,
  };

  return props;
}