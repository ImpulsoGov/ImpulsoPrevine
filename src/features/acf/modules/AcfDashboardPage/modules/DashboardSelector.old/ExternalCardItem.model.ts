
export type AcfDashboardType = "HIPERTENSAO" | "DIABETES";    
export type DiabetesAcfExternalCardsDescriptionType = "DIAGNOSTICO_AUTORREFERIDO" | "DIAGNOSTICO_CLINICO"

export type ExternalCardItem = ExternalCardDataItem &{
    municipalitySusID: string,
    teamIne: string,
}

export type ExternalCardDataItem = {
    acfDashboardType: AcfDashboardType,
    acfExternalCardsDescription: DiabetesAcfExternalCardsDescriptionType;
    value: number;
} 
