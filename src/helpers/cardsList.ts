import { CardsDataResponse } from '@/services/lista-nominal/cards';
import { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';

export type CardDetails = Omit<CardProps, 'value'>;
export type CardDetailsMap = Record<string, CardDetails>;

/**
 * Transforms card data from API and CMS into Card component properties.
 *
 * @remarks
 * Merges card details from a CMS with card data from an API response, creating a standardized
 * array of card properties suitable for rendering Card components.
 *
 * @param details - A map of customizable card details, typically sourced from a CMS
 * @param data - An array of card data responses from an API
 * @returns An array of card properties formatted for the Card component
 *
 * @throws {Error} If details for a card's description cannot be found in the details map
 *
 * @example
 * ```typescript
 * const cardDetails = {
 *   'Special Card': { title: 'Special Card', description: 'Unique offer' },
 *   'Premium Card': { title: 'Premium Card', description: 'Exclusive benefits' }
 * };
 * const apiData = [
 *   { descricao: 'Special Card', valor: 100 },
 *   { descricao: 'Premium Card', valor: 250 }
 * ];
 * const cardProps = getCardsProps(cardDetails, apiData);
 * ```
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
