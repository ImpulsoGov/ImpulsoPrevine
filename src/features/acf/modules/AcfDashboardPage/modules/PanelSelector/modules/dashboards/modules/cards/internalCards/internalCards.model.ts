export type DiabetesAcfInternalCardsHealthIndicatorType = "TOTAL_COM_DIABETES" | "EXAME_E_CONSULTA_EM_DIA"
 | "DIAGNOSTICO_AUTORREFERIDO" | "DIAGNOSTICO_CLINICO";

export type InternalCardDBDataItem = {
    valor: number;
    descricao: string;
}

export type InternalCardDataItem = {
    value: number;
    healthIndicator: DiabetesAcfInternalCardsHealthIndicatorType;
}
