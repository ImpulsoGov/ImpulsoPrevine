import type { AcfDashboardType } from "@/features/acf/diabetes/common/model"


export const propPrintGroupingCoapsFunction = (listName: AcfDashboardType): string=> {
    const propPrintGroupingByDashboardType = {
        DIABETES :  "equipe_nome",
        HIPERTENSAO :  "equipe_nome",

    }
    return propPrintGroupingByDashboardType[listName]
}
export const propPrintGroupingCoeqFunction = (listName: AcfDashboardType): string=> {
    const propPrintGroupingByDashboardType = {
        DIABETES :  "acs_nome_cadastro",
        HIPERTENSAO :  "acs_nome_cadastro",

    }
    return propPrintGroupingByDashboardType[listName]
}

