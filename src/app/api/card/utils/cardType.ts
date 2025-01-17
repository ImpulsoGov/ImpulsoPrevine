import externalCards from '../dataExternalCards.json';
import internalCards from '../dataInternalCards.json';
import { InvalidCardTypeError } from './errors';

export type CardType = 'external' | 'internal';

export type CardsData = {
  municipio_id_sus: string;
  equipe_ine: string;
  lista: string;
  descricao: string;
  valor: number;
}

export const VALID_CARD_TYPES = ['external', 'internal'];

export const DATA_BY_TYPE: Record<CardType, CardsData[]> = {
  external: externalCards,
  internal: internalCards,
}

export function validateCardType(type: string): asserts type is CardType {
  if (!VALID_CARD_TYPES.includes(type)) {
    throw new InvalidCardTypeError('Tipo de card deve ser `external` ou `internal`');
  }
}

export function getDataByType(type: CardType): CardsData[] {
  const data = DATA_BY_TYPE[type];

  if (!data) {
    throw new InvalidCardTypeError(`Dados não encontrados para o tipo de card: ${type}`);
  }

  return data;
}
