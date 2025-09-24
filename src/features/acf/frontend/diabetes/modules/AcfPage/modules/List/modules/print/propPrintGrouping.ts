import type { AcfDashboardType } from "@/features/acf/frontend/common/DashboardType";

export const propPrintGroupingCoapsFunction = (
    listName: AcfDashboardType
): string => {
    const propPrintGroupingByDashboardType = {
        cuidado_da_pessoa_com_diabetes: "equipe_nome",
        cuidado_da_pessoa_com_hipertensao: "equipe_nome",
    };
    return propPrintGroupingByDashboardType[listName];
};
export const propPrintGroupingCoeqFunction = (
    listName: AcfDashboardType
): string => {
    const propPrintGroupingByDashboardType = {
        cuidado_da_pessoa_com_diabetes: "acs_nome_cadastro",
        cuidado_da_pessoa_com_hipertensao: "acs_nome_cadastro",
    };
    return propPrintGroupingByDashboardType[listName];
};
