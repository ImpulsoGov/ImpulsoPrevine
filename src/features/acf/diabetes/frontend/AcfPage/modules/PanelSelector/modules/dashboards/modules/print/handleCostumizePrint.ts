// import type { AcfDashboardType } from "@/features/acf/modules/AcfDashboardPage/types";
// import { larguraColunasHipertensaoEquipePaisagem, larguraColunasHipertensaoEquipeRetrato, larguraColunasHipertensaoPaisagem, larguraColunasHipertensaoRetrato } from "@/helpers/larguraColunasHipertensao";
// import { type ExtendedPrintTableProps, VALORES_AGRUPAMENTO_IMPRESSAO, customizePrint } from "@/helpers/lista-nominal/impressao/handlePrint";
// import { type FilterItem, isFilterApplied } from "@/services/lista-nominal/ListaNominal";
// import { PROFILE_ID, type ProfileIdValue } from "@/types/profile";
// import { onlyAppliedFilters } from "@/utils/onlyAppliedFilters";
// import type { PrintStatesType } from "../../List";
// import { filtersLabels } from "../filters/filtersLabels";
// import { columns } from "../table/modules/diabetes/columns";
// // import { diabetesAcfPrintDataForTeamController } from "./diabetes/print.controller";
// import type { DiabetesAcfPrintItem } from "./diabetes/print.model";

// export type PrintOptions = {
//   agrupamento: string;
//   separacaoGrupoPorFolha: boolean;
//   ordenacao: boolean;
// };

// export type TableDataPrintType = {
//     data: DiabetesAcfPrintItem; //TODO: adicionar os models das outras listas. 
// };
// export const handleCostumizePrint = async (
//     options: PrintOptions,
//     list: AcfDashboardType,
//     userProfiles: ProfileIdValue[], 
//     _municipalitySusID: string,
//     _TeamIne: string,  
//     _printStates: PrintStatesType,
//     closePrintModal: () => void,
//     tableData: TableDataPrintType,
//     data: DiabetesAcfPrintItem[],
//     value: FilterItem,
//     propPrintGrouping: string,
// ): Promise<void> => {
//   const props: ExtendedPrintTableProps = {
//       data: data ?? [],
//       columns: columns,
//       list: list,
//       appliedFilters: isFilterApplied(value)
//           ? onlyAppliedFilters(value)
//           : {},
//       latestProductionDate: new Date(
//           String(tableData.data.mostRecentProductionRecordDate),
//       ).toLocaleDateString("pt-BR"),
//       fontFamily: "sans-serif",
//       dataSplit:
//           options.agrupamento === VALORES_AGRUPAMENTO_IMPRESSAO.sim,
//       pageSplit: options.separacaoGrupoPorFolha,
//       orderByProp: options.ordenacao,
//       printColumnsWidth: {
//           landscape: userProfiles.includes(PROFILE_ID.COEQ)
//               ? larguraColunasHipertensaoEquipePaisagem
//               : larguraColunasHipertensaoPaisagem,
//           portrait: userProfiles.includes(PROFILE_ID.COEQ)
//               ? larguraColunasHipertensaoEquipeRetrato
//               : larguraColunasHipertensaoRetrato,
//       },
//       verticalDivider: [2, 4, 6],
//       propPrintGrouping: propPrintGrouping,
//       filtersLabels: filtersLabels,
//   };
//   customizePrint(options, closePrintModal, props);
// };