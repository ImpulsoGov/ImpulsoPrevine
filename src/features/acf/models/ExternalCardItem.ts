
export type AcfDashboardType = "HIPERTENSAO" | "DIABETES";    
export type DiabetesAcfExternalCardsDescriptionType = "DIAGNOSTICO_AUTORREFERIDO" | "DIAGNOSTICO_CLINICO"

export type ExternalCardItem = {
    municipalitySusID: string,
    teamIne: string,
    value: string,
    acfDashboardType: AcfDashboardType,
    acfExternalCardsDescription: DiabetesAcfExternalCardsDescriptionType // | HipertensionAcfExternalCardsDescriptionType
}