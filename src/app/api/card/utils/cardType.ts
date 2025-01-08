import { BadRequestError } from '../../errorHandler';
import externalCards from '../dataExternalCards.json';
import internalCards from '../dataInternalCards.json';

export type CardType = 'external' | 'internal';

export type CardsData = {
  municipio_id_sus: string;
  equipe_ine: string;
  lista: string;
  descricao: string;
  valor: number;
}

export const VALID_CARD_TYPES = ['external', 'internal'];

export const DATA_BY_TYPE: Record<string, CardsData[]> = {
  external: externalCards,
  internal: internalCards,
}

export function validateCardType(type: CardType): void {
  if (!VALID_CARD_TYPES.includes(type)) {
    throw new BadRequestError('Tipo de card deve ser "external" ou "internal"');
  }
}

export function getDataByType(type: CardType): CardsData[] {
  return DATA_BY_TYPE[type];
}
