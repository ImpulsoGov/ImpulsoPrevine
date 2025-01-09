import { CardsDataResponse } from '@/services/lista-nominal/cards';
import { CardProps } from '@impulsogov/design-system/dist/molecules/Card/Card';

export type CardDetails = Omit<CardProps, 'value'>;
export type CardDetailsMap = Record<string, CardDetails>;

export function getCardsProps(
  details: CardDetailsMap,
  data: CardsDataResponse[]
) {
  return data.map<CardProps>((card) => {
    const cardDetails = details[card.descricao];
    return {
      ...cardDetails,
      value: card.valor.toString(),
    };
  });
}
