import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";

export const propPrintGroupingCoapsFunction = (
    listName: AcfDashboardType
): string => {
    const propPrintGroupingByDashboardType = {
        diabetes: "equipe_nome",
        hypertension: "equipe_nome",
    };
    return propPrintGroupingByDashboardType[listName];
};
export const propPrintGroupingCoeqFunction = (
    listName: AcfDashboardType
): string => {
    const propPrintGroupingByDashboardType = {
        diabetes: "acs_nome_cadastro",
        hypertension: "acs_nome_cadastro",
    };
    return propPrintGroupingByDashboardType[listName];
};
