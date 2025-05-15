export const DiabetesAcfInternalCardsHealthIndicator = {
    TOTAL_COM_DIABETES: "TOTAL_COM_DIABETES",
    EXAME_E_CONSULTA_EM_DIA: "EXAME_E_CONSULTA_EM_DIA",
    DIAGNOSTICO_AUTORREFERIDO: "DIAGNOSTICO_AUTORREFERIDO",
    DIAGNOSTICO_CLINICO: "DIAGNOSTICO_CLINICO",
} as const;

export type DiabetesInternalCardsId = typeof DiabetesAcfInternalCardsHealthIndicator;
export type DiabetesInternalCardsKey = keyof DiabetesInternalCardsId;
export type DiabetesInternalCardsValue = DiabetesInternalCardsId[DiabetesInternalCardsKey];

export type InternalCardDBDataItem = {
    valor: number;
    descricao: DiabetesInternalCardsValue;
}

export type InternalCardDataItem = {
    value: number;
    healthIndicator: DiabetesInternalCardsValue;
}
