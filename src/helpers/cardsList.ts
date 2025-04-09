import type { ExternalCardDataItem } from "@/features/acf/modules/AcfDashboardPage/modules/PanelSelector/modules/externalCards/externalCards.model";
import type { CardProps } from "@impulsogov/design-system/dist/molecules/Card/Card";
export type CardDetails = Omit<CardProps, "value">;
export type CardDetailsMap = Record<string, CardDetails>;

/**
 * Merge different cards data sets into the one needed for the Card component
 * @param details personalizable details for each card usually coming from the CMS
 * @param data cards data usually coming from the API response
 * @returns an array of cards data with the props needed for the Card component
 * @throws if a card description is not found in the details object
 */
export function getCardsProps(
    details: CardDetailsMap,
    data: ExternalCardDataItem[],
) {
    return data.map<CardProps>((card) => {
        const cardDetails = details[card.acfExternalCardsDescription];

        if (!cardDetails) {
            throw new Error(
                `Detalhes do card ${card.acfExternalCardsDescription} não encontrados na resposta do CMS`,
            );
        }

        return {
            ...cardDetails,
            value: card.value?.toString() ?? "-",
        };
    });
}
