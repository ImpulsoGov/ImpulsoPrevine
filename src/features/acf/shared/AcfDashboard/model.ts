export type AcfDashboardType = "hypertension" | "diabetes";
export type LineOfCare =
    | "cuidado_da_pessoa_com_hipertensao"
    | "cuidado_da_pessoa_com_diabetes";
export type ListTypeToLineOfCare = Record<AcfDashboardType, LineOfCare>;
