export const propPrintGroupingCoapsFunction = (
    listName: "diabetes" | "hypertension"
): string => {
    const propPrintGroupingByDashboardType = {
        diabetes: "equipe_nome",
        hypertension: "equipe_nome",
    };
    return propPrintGroupingByDashboardType[listName];
};
export const propPrintGroupingCoeqFunction = (
    listName: "diabetes" | "hypertension"
): string => {
    const propPrintGroupingByDashboardType = {
        diabetes: "acs_nome_cadastro",
        hypertension: "acs_nome_cadastro",
    };
    return propPrintGroupingByDashboardType[listName];
};
