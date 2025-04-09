import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
import { larguraColunasHipertensaoEquipePaisagem, larguraColunasHipertensaoEquipeRetrato, larguraColunasHipertensaoPaisagem, larguraColunasHipertensaoRetrato } from "@/helpers/larguraColunasHipertensao";
import { type ExtendedPrintTableProps, VALORES_AGRUPAMENTO_IMPRESSAO, customizePrint } from "@/helpers/lista-nominal/impressao/handlePrint";
import { isFilterApplied } from "@/services/lista-nominal/ListaNominal";
import { PROFILE_ID, type ProfileIdValue } from "@/types/profile";
import { onlyAppliedFilters } from "@/utils/onlyAppliedFilters";
import type { PrintStatesType } from "../../List";
import { columns } from "../table/modules/diabetes/columns";
import { diabetesAcfPrintDataForTeamController } from "./diabetes/print.controller";

export type PrintOptions = {
  agrupamento: string;
  separacaoGrupoPorFolha: boolean;
  ordenacao: boolean;
};

export const handleCostumizePrint = async (
    options: PrintOptions,
    list: AcfDashboardType,
    userProfiles: ProfileIdValue[], 
    municipalitySusID: string,
    TeamIne: string,  
    printStates: PrintStatesType,
    closePrintModal: () => void,
    tableData,
    value,
    propPrintGrouping,
    filtersLabels,
): Promise<void> => {
  const data = await diabetesAcfPrintDataForTeamController(municipalitySusID, TeamIne); //Trocar pelo controller que ainda será criado
  const props: ExtendedPrintTableProps = {
      data: data ?? [],
      columns: columns,
      list: list,
      appliedFilters: isFilterApplied(value)
          ? onlyAppliedFilters(value)
          : {},
      latestProductionDate: new Date(
          String(tableData.data[0].atualizacao_data),
      ).toLocaleDateString("pt-BR"),
      fontFamily: "sans-serif",
      dataSplit:
          options.agrupamento === VALORES_AGRUPAMENTO_IMPRESSAO.sim,
      pageSplit: options.separacaoGrupoPorFolha,
      orderByProp: options.ordenacao,
      printColumnsWidth: {
          landscape: userProfiles.includes(PROFILE_ID.COEQ)
              ? larguraColunasHipertensaoEquipePaisagem
              : larguraColunasHipertensaoPaisagem,
          portrait: userProfiles.includes(PROFILE_ID.COEQ)
              ? larguraColunasHipertensaoEquipeRetrato
              : larguraColunasHipertensaoRetrato,
      },
      verticalDivider: [2, 4, 6],
      propPrintGrouping: propPrintGrouping,
      filtersLabels: filtersLabels,
  };
  customizePrint(options, closePrintModal, props);
};