import type { AcfDashboardType } from "@/features/acf/frontend/common/AcfDashboard";

export const propPrintGroupingCoapsFunction = (
    listName: keyof AcfDashboardType
): string => {
    const propPrintGroupingByDashboardType = {
        diabetes: "equipe_nome",
        hypertension: "equipe_nome",
    };
    return propPrintGroupingByDashboardType[listName];
};
export const propPrintGroupingCoeqFunction = (
    listName: keyof AcfDashboardType
): string => {
    const propPrintGroupingByDashboardType = {
        diabetes: "acs_nome_cadastro",
        hypertension: "acs_nome_cadastro",
    };
    return propPrintGroupingByDashboardType[listName];
};
