import { CardsDataResponse } from '@/services/lista-nominal/cards';
import { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';

export type CardDetails = Omit<CardProps, 'value'>;
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
  data: CardsDataResponse[]
) {
  return data.map<CardProps>((card) => {
    const cardDetails = details[card.descricao];

    if (!cardDetails) {
      throw new Error(`Detalhes do card ${card.descricao} não encontrados na resposta do CMS`);
    }

    return {
      ...cardDetails,
      value: card.valor?.toString(),
    };
  });
}
