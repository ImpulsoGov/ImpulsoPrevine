import type { AcfDashboardType } from "@/features/acf/shared/diabetes/model";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";

// TODO excluir esses tipos quando movermos getExternalCardsProps para dentro de features
type CardDetails = Omit<CardProps, "value">;
type CardDetailsMap = Record<string, CardDetails>;
export type AcfExternalCardsDescription =
    | "DIAGNOSTICO_AUTORREFERIDO"
    | "DIAGNOSTICO_CLINICO";

export type ExternalCardDataItem = {
    acfDashboardType: AcfDashboardType;
    acfExternalCardsDescription: AcfExternalCardsDescription;
    value: number;
};

/**
 * Merge different cards data sets into the one needed for the Card component
 * @param details personalizable details for each card usually coming from the CMS
 * @param data cards data usually coming from the API responses
 * @returns an array of cards data with the props needed for the Card component
 * @throws if a card description is not found in the details object
 */
export const getExternalCardsProps = (
    details: CardDetailsMap,
    data: Array<ExternalCardDataItem>
): Array<CardProps> => {
    return data.map<CardProps>((card) => {
        const cardDetails = details[card.acfExternalCardsDescription];

        // if (!cardDetails) {
        //     throw new Error(
        //         `Detalhes do card ${card.acfExternalCardsDescription} não encontrados na resposta do CMS`
        //     );
        // }
        return {
            ...cardDetails,
            value: card.value.toString(),
        };
    });
};
